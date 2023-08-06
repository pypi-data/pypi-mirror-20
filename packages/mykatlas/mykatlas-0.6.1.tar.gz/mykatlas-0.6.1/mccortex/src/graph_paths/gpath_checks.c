#include "global.h"
#include "gpath_checks.h"
#include "db_node.h"
#include "binary_seq.h"

typedef struct {
  size_t col, from_col;
  const char *name, *src;
} ColourSample;

static int _col_sample_cmp(const void *aa, const void *bb)
{
  const ColourSample *a = (const ColourSample *)aa;
  const ColourSample *b = (const ColourSample *)bb;
  if(a->col != b->col) return (a->col < b->col ? -1 : 1);
  return strcmp(a->name, b->name);
}

/**
 * Check we are only loading path files into the given colour. Calls die()
 * with error message on failure.
 */
void gpaths_only_for_colour(const GPathReader *gpfiles, size_t num_gpfiles,
                            size_t colour)
{
  size_t i;

  // Check each path file only loads one colour
  for(i = 0; i < num_gpfiles; i++) {
    if(file_filter_num(&gpfiles[i].fltr) > 1 ||
       file_filter_intocol(&gpfiles[i].fltr, 0) != colour)
    {
      die("Can only load paths into colour %zu [%s]",
          colour, file_filter_input(&gpfiles[i].fltr));
    }
  }
}

/*!
  Similar to path_file_reader.c:path_file_load_check()
  Check kmer size matches and sample names match
  @param pop_colour is not -1, colour `pop_colour` is excused from clashing names
*/
void graphs_gpaths_compatible(const GraphFileReader *graphs, size_t num_graphs,
                              const GPathReader *gpaths, size_t num_gpaths,
                              int32_t pop_colour)
{
  size_t g, p, kmer_size, kmer_size2;
  size_t ctx_max_cols = 0, ctp_max_cols = 0, colours_loaded = 0;
  uint64_t ctx_max_kmers = 0, ctp_max_kmers = 0;

  if(num_graphs) kmer_size = graphs[0].hdr.kmer_size;
  else if(num_gpaths) kmer_size = gpath_reader_get_kmer_size(&gpaths[0]);
  else return; // no graph or path files

  for(g = 0; g < num_graphs; g++) {
    kmer_size2 = graphs[g].hdr.kmer_size;
    if(kmer_size2 != kmer_size) {
      die("Kmer-size doesn't match between files [%zu vs %zu]: %s",
          kmer_size, kmer_size2, file_filter_input(&graphs[g].fltr));
    }
    ctx_max_cols = MAX2(ctx_max_cols, file_filter_into_ncols(&graphs[g].fltr));
    ctx_max_kmers = MAX2(ctx_max_kmers, graph_file_nkmers(&graphs[g]));
    colours_loaded += file_filter_num(&graphs[g].fltr);
  }

  for(p = 0; p < num_gpaths; p++) {
    kmer_size2 = gpath_reader_get_kmer_size(&gpaths[p]);
    if(kmer_size2 != kmer_size) {
      die("Kmer-size doesn't match between files [%zu vs %zu]: %s",
          kmer_size, kmer_size2, file_filter_input(&gpaths[p].fltr));
    }
    ctp_max_cols = MAX2(ctp_max_cols, file_filter_into_ncols(&gpaths[p].fltr));
    ctp_max_kmers = MAX2(ctp_max_kmers, gpath_reader_get_num_kmers(&gpaths[p]));
    colours_loaded += file_filter_num(&gpaths[p].fltr);
  }

  const FileFilter *fltr = (num_graphs ? &graphs[0].fltr : &gpaths[0].fltr);
  db_graph_check_kmer_size(kmer_size, file_filter_input(fltr));

  // ctx_max_kmers may be zero if reading from a stream
  if(ctx_max_kmers > 0 && ctp_max_kmers > ctx_max_kmers) {
    die("More kmers in path files than in graph files! (%zu > %zu)",
        (size_t)ctp_max_kmers, (size_t)ctx_max_kmers);
  }

  if(num_graphs > 0 && ctp_max_cols > ctx_max_cols) {
    die("More colours in path files than in graph files! (%zu > %zu)",
        ctp_max_cols, ctx_max_cols);
  }

  // Check sample names
  ColourSample *samples = ctx_calloc(colours_loaded, sizeof(ColourSample));

  size_t i;
  colours_loaded = 0;

  for(p = 0; p < num_gpaths; p++) {
    for(i = 0; i < file_filter_num(&gpaths[p].fltr); i++) {
      size_t pinto = file_filter_intocol(&gpaths[p].fltr, i);
      size_t pfrom = file_filter_fromcol(&gpaths[p].fltr, i);
      const char *pname = gpath_reader_get_sample_name(&gpaths[p], pfrom);
      samples[colours_loaded++]
        = (ColourSample){.col = pinto, .name = pname,
                         .src = file_filter_input(&gpaths[p].fltr),
                         .from_col = pfrom};
    }
  }

  for(g = 0; g < num_graphs; g++) {
    for(i = 0; i < file_filter_num(&graphs[g].fltr); i++) {
      size_t ginto = file_filter_intocol(&graphs[g].fltr, i);
      size_t gfrom = file_filter_fromcol(&graphs[g].fltr, i);
      const char *gname = graphs[g].hdr.ginfo[gfrom].sample_name.b;
      samples[colours_loaded++]
        = (ColourSample){.col = ginto, .name = gname,
                         .src = file_filter_input(&graphs[g].fltr),
                         .from_col = gfrom};
    }
  }

  // Sort by colour number than sample name
  qsort(samples, colours_loaded, sizeof(ColourSample), _col_sample_cmp);

  for(i = 0; i+1 < colours_loaded; i++) {
    if((int32_t)samples[i].col != pop_colour &&
       samples[i].col == samples[i+1].col &&
       strcmp(samples[i].name, samples[i+1].name) != 0)
    {
      die("Sample names don't match\n%s:%zu [%s]\n%s:%zu [%s]\n",
          samples[i].src, samples[i].from_col, samples[i].name,
          samples[i+1].src, samples[i+1].from_col, samples[i+1].name);
    }
  }

  ctx_free(samples);
}

/*!
  Update colours in graph files and path files - sample in 0, all others in 1
  @return number of colours to load (1 or 2: sample + [population optional])
 */
size_t gpath_load_sample_pop(GraphFileReader *gfiles, size_t num_gfiles,
                             GPathReader *gpfiles, size_t num_gpfiles,
                             size_t colour)
{
  size_t p, g, i, j;
  bool tgt_col_loaded = false, pop_col_loaded = false;
  FileFilter *fltr;

  // Update graph file colours
  for(g = 0; g < num_gfiles; g++) {
    fltr = &gfiles[g].fltr;
    for(i = 0; i < file_filter_num(fltr); i++) {
      if(file_filter_intocol(fltr,i) == colour) {
        file_filter_intocol(fltr,i) = 0;
        tgt_col_loaded = true;
      } else {
        file_filter_intocol(fltr,i) = 1;
        pop_col_loaded = true;
      }
    }
    file_filter_update(fltr);
  }

  if(!tgt_col_loaded)
    die("You didn't load any colours into --colour %zu", colour);

  // Update path files
  for(p = 0; p < num_gpfiles; p++) {
    fltr = &gpfiles[p].fltr;
    for(i = j = 0; i < file_filter_num(fltr); i++) {
      // only load paths that match given colour
      if(file_filter_intocol(fltr,i) == colour) {
        file_filter_intocol(fltr,i) = 0;
        fltr->filter.b[j++] = fltr->filter.b[i];
      }
    }
    file_filter_num(fltr) = j;
    file_filter_update(fltr);

    if(j == 0) {
      die("Path file does not provide any paths in colour %zu: %s",
          colour, file_filter_input(fltr));
    }
  }

  return (pop_col_loaded ? 2 : 1);
}

/**
 * Fetch sequence of nodes represented by a given path.
 * Note: doesn't reset nbuf before adding. Remember to reset nbuf before calling
 *       this function.
 *
 * @param jposbuf If not NULL, add indices of junctions to this buffer
 * @return number of nodes added to nbuf
 */
size_t gpath_fetch(dBNode node, const GPath *gpath,
                   dBNodeBuffer *nbuf, SizeBuffer *jposbuf,
                   size_t ctxcol, const dBGraph *db_graph)
{
  ctx_assert(node.orient == gpath->orient);

  size_t init_num_nodes = nbuf->len;
  size_t i, n, njuncs = 0; // number of junctions seen
  dBNode nodes[4];
  Nucleotide nucs[4];

  db_node_buf_add(nbuf, node);

  while(njuncs < gpath->num_juncs)
  {
    ctx_assert(node.key != HASH_NOT_FOUND);
    n = db_graph_next_nodes_in_col(db_graph, node, ctxcol, nodes, nucs);
    ctx_assert(n > 0);

    if(n > 1) {
      Nucleotide expbase = binary_seq_get(gpath->seq, njuncs);
      for(i = 0; i < n && nucs[i] != expbase; i++);
      ctx_assert(i < n);
      node = nodes[i];
      if(jposbuf) size_buf_add(jposbuf, nbuf->len-1); // index of last added node
      njuncs++;
    }
    else {
      node = nodes[0];
    }

    db_node_buf_add(nbuf, node);
  }

  return nbuf->len - init_num_nodes;
}

//
// Integrity checks on graph+paths
//

// 1) check dBNode following `node` has indegree >1 in sample ctxcol
// 2) follow path, check each junction matches up with a node with outdegree >1
// col is graph colour
bool gpath_checks_path_col(dBNode node, const GPath *gpath,
                           size_t ctxcol, const dBGraph *db_graph)
{
  ctx_assert_ret(db_graph->num_edge_cols == db_graph->num_of_cols ||
                 db_graph->node_in_cols != NULL);

  BinaryKmer bkmer;
  Edges edges;
  dBNode nodes[4];
  Nucleotide nucs[4];
  size_t i, j, n, edgecol = db_graph->num_edge_cols > 1 ? ctxcol : 0;
  // length is kmers and junctions
  size_t klen, plen;

  // fprintf(stderr, " == graph_paths_check_valid()\n");

  for(klen = 0, plen = 0; plen < gpath->num_juncs; klen++)
  {
    bkmer = db_node_get_bkmer(db_graph, node.key);
    edges = db_node_get_edges(db_graph, node.key, edgecol);

    // Check this node is in this colour
    if(db_graph->node_in_cols != NULL) {
      ctx_assert_ret(db_node_has_col(db_graph, node.key, ctxcol));
    } else if(db_graph->col_covgs != NULL) {
      ctx_assert_ret(db_node_get_covg(db_graph, node.key, ctxcol) > 0);
    }

    #ifdef CTXVERBOSE
      char bkmerstr[MAX_KMER_SIZE+1];
      binary_kmer_to_str(bkmer, db_graph->kmer_size, bkmerstr);
      fprintf(stderr, "klen: %zu plen: %zu %zu:%i %s\n",
             klen, plen, (size_t)node.key, node.orient, bkmerstr);
    #endif

    if(klen == 1) {
      // Check nodes[1] has indegree > 1
      dBNode rnode = db_node_reverse(node);
      Edges backedges = db_node_edges_in_col(rnode, ctxcol, db_graph);
      int outdegree = edges_get_outdegree(backedges, rnode.orient);
      if(outdegree <= 1) {
        char bkstr[MAX_KMER_SIZE+1];
        binary_kmer_to_str(db_node_get_bkmer(db_graph, node.key), db_graph->kmer_size, bkstr);
        status("outdegree: %i col: %zu kmer: %s", (int)outdegree, ctxcol, bkstr);
      }
      ctx_assert_ret(outdegree > 1);
    }

    n = db_graph_next_nodes(db_graph, bkmer, node.orient,
                            edges, nodes, nucs);

    ctx_assert_ret(n > 0);

    // Reduce to nodes in our colour if edges limited
    if(db_graph->num_edge_cols == 1 && db_graph->node_in_cols != NULL) {
      for(i = 0, j = 0; i < n; i++) {
        if(db_node_has_col(db_graph, nodes[i].key, ctxcol)) {
          nodes[j] = nodes[i];
          nucs[j] = nucs[i];
          j++;
        }
      }
      n = j; // update number of next nodes
      ctx_assert_ret(n > 0);
    }

    // If fork check nucleotide
    if(n > 1) {
      Nucleotide expbase = binary_seq_get(gpath->seq, plen);

      for(i = 0; i < n && nucs[i] != expbase; i++);
      if(i == n) {
        fprintf(stderr, "plen: %zu expected: %c\n", plen, dna_nuc_to_char(expbase));
        fprintf(stderr, "Got: ");
        for(i = 0; i < n; i++) fprintf(stderr, " %c", dna_nuc_to_char(nucs[i]));
        fprintf(stderr, "\n");
      }
      ctx_assert_ret(i < n && nucs[i] == expbase);
      node = nodes[i];
      plen++;
    }
    else {
      node = nodes[0];
    }
  }

  // We exit before the last kmer, need to add it
  klen++;

  return true;
}

// Returns false on first error
bool gpath_checks_path(hkey_t hkey, const GPath *gpath, const dBGraph *db_graph)
{
  const GPathStore *gpstore = &db_graph->gpstore;
  size_t i, ncols = gpstore->gpset.ncols;

  dBNode node = {.key = hkey, .orient = gpath->orient};

  // Check at least one colour is set
  uint8_t *colset = gpath_get_colset(gpath, ncols), cumm = 0;
  for(i = 0; i < ncols; i++) cumm |= colset[i];
  ctx_assert(cumm != 0);

  // Check for each colour the path has
  for(i = 0; i < ncols; i++) {
    if(bitset_get(colset, i)) {
      ctx_assert(gpath_checks_path_col(node, gpath, i, db_graph));
    }
  }

  return true;
}

static int _kmer_check_paths(hkey_t hkey, const dBGraph *db_graph,
                             size_t *npaths_ptr, size_t *nkmers_ptr)
{
  const GPathStore *gpstore = &db_graph->gpstore;
  size_t num_gpaths = 0;
  GPath *gpath;

  for(gpath = gpstore->paths_all[hkey]; gpath != NULL; gpath = gpath->next)
  {
    ctx_assert_ret(gpath_checks_path(hkey, gpath, db_graph));
    num_gpaths++;
  }

  *npaths_ptr += num_gpaths;
  *nkmers_ptr += (num_gpaths > 0);

  return 0; // 0 => keep iterating
}

typedef struct
{
  const size_t nthreads;
  const dBGraph *db_graph;
  size_t num_gpaths, num_kmers;
} GPathChecking;

void _gpath_check_all_paths_thread(void *arg, size_t threadid)
{
  GPathChecking *ch = (GPathChecking*)arg;
  const dBGraph *db_graph = ch->db_graph;
  size_t num_gpaths = 0, num_kmers = 0;

  HASH_ITERATE_PART(&db_graph->ht, threadid, ch->nthreads,
                    _kmer_check_paths, db_graph, &num_gpaths, &num_kmers);

  __sync_fetch_and_add((size_t volatile*)&ch->num_gpaths, num_gpaths);
  __sync_fetch_and_add((size_t volatile*)&ch->num_kmers, num_kmers);
}

bool gpath_checks_all_paths(const dBGraph *db_graph, size_t nthreads)
{
  status("[GPathCheck] Running paths check...");

  GPathChecking checking = {.nthreads = nthreads,
                            .db_graph = db_graph,
                            .num_gpaths = 0, .num_kmers = 0};

  util_multi_thread(&checking, nthreads, _gpath_check_all_paths_thread);

  size_t num_gpaths = checking.num_gpaths;
  size_t num_kmers = checking.num_kmers;

  size_t act_num_gpaths = db_graph->gpstore.gpset.entries.len;
  size_t act_num_kmers = db_graph->gpstore.num_kmers_with_paths;

  ctx_assert_ret2(num_gpaths == act_num_gpaths, "%zu vs %zu", num_gpaths, act_num_gpaths);
  ctx_assert_ret2(num_kmers == act_num_kmers, "%zu vs %zu", num_kmers, act_num_kmers);

  return true;
}

// For debugging
static void _gpstore_update_counts(hkey_t hkey, const dBGraph *db_graph,
                                   size_t *nvisited_ptr, size_t *nkmers_ptr,
                                   size_t *npaths_ptr)
{
  const GPathStore *gpstore = &db_graph->gpstore;
  GPath *gpath = gpath_store_fetch(gpstore, hkey);
  size_t npaths = 0;

  (*nvisited_ptr)++;

  if(gpath == NULL) return;
  (*nkmers_ptr)++;

  // Count paths and coloured paths
  for(npaths = 0; gpath != NULL; gpath = gpath->next, npaths++) {}

  (*npaths_ptr) += npaths;
}

void gpath_checks_counts(const dBGraph *db_graph)
{
  const GPathStore *gpstore = &db_graph->gpstore;
  size_t nvisited = 0, nkmers = 0, npaths = 0;

  HASH_ITERATE(&db_graph->ht, _gpstore_update_counts,
               db_graph, &nvisited, &nkmers, &npaths);

  ctx_assert2(nvisited == db_graph->ht.num_kmers, "%zu vs %zu",
              nvisited, (size_t)db_graph->ht.num_kmers);
  ctx_assert2(nkmers == gpstore->num_kmers_with_paths, "%zu vs %zu",
              nkmers, (size_t)gpstore->num_kmers_with_paths);
  ctx_assert2(npaths == gpstore->gpset.entries.len, "%zu vs %zu",
              npaths, (size_t)gpstore->gpset.entries.len);
}
