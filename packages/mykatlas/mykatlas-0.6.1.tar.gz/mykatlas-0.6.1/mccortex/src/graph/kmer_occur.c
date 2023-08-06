#include "global.h"
#include "kmer_occur.h"
#include "seq_reader.h"
#include "util.h"
#include "db_node.h"

//
// This file provides a datastore for loading sequences and recording where
// each kmer occurs in the sequences. Used in breakpoint_caller.c.
//

// Mostly used for debugging
void korun_print(KOccurRun run, size_t kmer_size, FILE *fout)
{
  const char strand[2] = "+-";
  size_t start, end;
  if(run.strand == STRAND_PLUS) {
    start = run.first;
    end = run.last+kmer_size-1;
  } else {
    start = run.first+kmer_size-1;
    end = run.last;
  }
  fprintf(fout, "offset:%zu:chromid:%zu:%zu-%zu:%c",
          (size_t)run.qoffset, (size_t)run.chrom,
          start, end, strand[run.strand]);
}

// Get string representation of multiple runs, comma separated
//   e.g. "chromid:1:17-5:-, chromid:1:37-47:+"
// Does not print new line
// Mostly used for debugging
void koruns_print(const KOccurRun *runs, size_t n, size_t kmer_size, FILE *fout)
{
  size_t i;
  if(n == 0) return;
  korun_print(runs[0], kmer_size, fout);
  for(i = 1; i < n; i++) {
    printf(", ");
    korun_print(runs[i], kmer_size, fout);
  }
}

void korun_gzprint(gzFile gzout, size_t kmer_size,
                   const KOGraph *kograph, KOccurRun korun,
                   size_t first_kmer_idx, size_t kmer_offset)
{
  const char strand[] = {'+','-'};
  const char *chrom = kograph_chrom(kograph,korun).name;
  ctx_assert(korun.first <= korun.last || korun.strand == STRAND_MINUS);
  // get end coord as inclusive coord as start-end
  // (Note: start may be greater than end if strand is minus)
  size_t start, end, qoffset;
  if(korun.strand == STRAND_PLUS) {
    start = korun.first+kmer_offset;
    end = korun.last+kmer_size-1;
  } else {
    start = korun.first+kmer_size-1-kmer_offset;
    end = korun.last;
  }
  qoffset = korun.qoffset - first_kmer_idx;
  // +1 to coords to convert to 1-based
  gzprintf(gzout, "%s:%zu-%zu:%c:%u",
           chrom, start+1, end+1, strand[korun.strand], qoffset+1);
}

void koruns_gzprint(gzFile gzout, size_t kmer_size, const KOGraph *kograph,
                    const KOccurRun *koruns, size_t n,
                    size_t first_kmer_idx, size_t kmer_offset)
{
  size_t i;
  if(n == 0) return;
  korun_gzprint(gzout, kmer_size, kograph, koruns[0], first_kmer_idx, kmer_offset);
  for(i = 1; i < n; i++) {
    gzputc(gzout, ',');
    korun_gzprint(gzout, kmer_size, kograph, koruns[i], first_kmer_idx, kmer_offset);
  }
}

// Sort KOccurRun by qoffset, chrom, first, last then strand
static int korun_cmp_qoffset(const void *aa, const void *bb)
{
  const KOccurRun *a = (const KOccurRun*)aa, *b = (const KOccurRun*)bb;
  if(a->qoffset != b->qoffset) return a->qoffset < b->qoffset ? -1 : 1;
  if(a->chrom != b->chrom) return a->chrom < b->chrom ? -1 : 1;
  if(a->first != b->first) return a->first < b->first ? -1 : 1;
  if(a->last != b->last) return a->last < b->last ? -1 : 1;
  return 0;
}

// Sort by query offset
void koruns_sort_by_qoffset(KOccurRun *runs, size_t n)
{
  qsort(runs, n, sizeof(KOccurRun), korun_cmp_qoffset);
}

// Malloc's and returns chrom list - remember to free
// Returns NULL if num_reads == 0
static void generate_chrom_list(KOGraph *kograph,
                                const read_t *reads, size_t num_reads)
{
  kograph->chrom_name_buf = NULL;
  kograph->nchroms = num_reads;
  kograph->chroms = NULL;

  if(num_reads == 0) return;

  kograph->chroms = ctx_malloc(num_reads*sizeof(KOChrom));
  size_t i, name_len_sum = 0;

  // Concatenate names into one string
  for(i = 0; i < num_reads; i++) name_len_sum += reads[i].name.end + 1;
  kograph->chrom_name_buf = ctx_malloc(name_len_sum);
  char *names_concat = kograph->chrom_name_buf;

  for(i = 0; i < num_reads; i++)
  {
    kograph->chroms[i] = (KOChrom){.id = i,
                                   .length = reads[i].seq.end,
                                   .name = names_concat};

    memcpy(names_concat, reads[i].name.b, reads[i].name.end);
    names_concat[reads[i].name.end] = '\0';
    names_concat += reads[i].name.end+1;
  }
}

// Add missing kmers and edges to the graph whilst keeping track of the count
// of how many times each kmer in the graph is seen in sequence (with klists)
// Returns number of kmers added to the graph
// Threadsafe
static inline void add_ref_seq_to_graph_mt(const char *seq, size_t len,
                                           size_t ref_col,
                                           KONodeList *klists,
                                           dBGraph *db_graph)
{
  const size_t kmer_size = db_graph->kmer_size;
  size_t i;
  BinaryKmer bkmer;
  Nucleotide nuc;
  dBNode prev, curr;
  bool found;

  ctx_assert(len >= kmer_size);

  bkmer = binary_kmer_from_str(seq, kmer_size);
  prev = db_graph_find_or_add_node_mt(db_graph, bkmer, &found);
  db_graph_update_node_mt(db_graph, prev, ref_col);
  __sync_fetch_and_add((volatile uint64_t*)&klists[prev.key].kcount, 1); // kcount++

  for(i = kmer_size; i < len; i++, prev = curr)
  {
    nuc = dna_char_to_nuc(seq[i]);
    bkmer = binary_kmer_left_shift_add(bkmer, kmer_size, nuc);
    curr = db_graph_find_or_add_node_mt(db_graph, bkmer, &found);
    db_graph_update_node_mt(db_graph, curr, ref_col);
    __sync_fetch_and_add((volatile uint64_t*)&klists[curr.key].kcount, 1); // kcount++
    db_graph_add_edge_mt(db_graph, 0, prev, curr);
  }
}

// Add missing kmers and edges to the graph whilst keeping track of the count
// of how many times each kmer in the graph is seen in sequence (with klists)
// Returns number of kmers added to the graph
// Threadsafe
static inline void add_ref_read_to_graph_mt(const read_t *r, size_t ref_col,
                                            KONodeList *klists,
                                            dBGraph *db_graph)
{
  const size_t kmer_size = db_graph->kmer_size;
  size_t contig_start, contig_end, contig_len;
  size_t search_start = 0;

  if(r->seq.end < kmer_size) return;

  while((contig_start = seq_contig_start(r, search_start, kmer_size,
                                         0, 0)) < r->seq.end)
  {
    contig_end = seq_contig_end(r, contig_start, kmer_size, 0, 0, &search_start);

    contig_len = contig_end - contig_start;
    add_ref_seq_to_graph_mt(r->seq.b+contig_start, contig_len,
                            ref_col, klists, db_graph);
  }
}

// Same as above but don't add missing kmers
// Threadsafe
static inline void bkmer_update_counts_find_mt(BinaryKmer bkmer,
                                               KONodeList *klists,
                                               const dBGraph *db_graph)
{
  hkey_t hkey = hash_table_find(&db_graph->ht, bkmer);
  if(hkey != HASH_NOT_FOUND)
    __sync_fetch_and_add((volatile uint64_t*)&klists[hkey].kcount, 1); // kcount++
}

struct ReadUpdateCounts {
  const read_t *r;
  KONodeList *klists;
  bool add_missing_kmers;
  size_t ref_col; // only used if add_missing_kmers is true
  dBGraph *db_graph;
};

// Multithreaded core function to store kmer occurances
// Also adds read to the graph if `add_missing_kmers` is true
static void read_update_counts(void *arg, size_t threadid)
{
  (void)threadid;
  struct ReadUpdateCounts data = *(struct ReadUpdateCounts*)arg;
  const read_t *r = data.r;

  if(data.add_missing_kmers) {
    add_ref_read_to_graph_mt(r, data.ref_col, data.klists, data.db_graph);
  }
  else {
    SeqLoadingStats stats;
    memset(&stats, 0, sizeof(stats));
    READ_TO_BKMERS(r, data.db_graph->kmer_size, 0, 0, &stats,
                   bkmer_update_counts_find_mt, data.klists, data.db_graph);
  }
}

static void bkmer_store_kmer_pos(BinaryKmer bkmer, KONodeList *klists,
                                 size_t chrom_id, uint64_t offset,
                                 const dBGraph *db_graph)
{
  // bkmers were already added to graph -> don't need to find_or_insert
  // if missing kmers weren't added then kmer might be missing -> skip
  dBNode node = db_graph_find(db_graph, bkmer);

  if(node.key != HASH_NOT_FOUND)
  {
    // set all next to 1, set last one in kmerlist to zero later
    KONodeList *kl = &klists[node.key];
    *kl->first = (KOccur){.chrom = chrom_id,
                          .offset = offset,
                          .orient = node.orient,
                          .next = 1};
    kl->first++;
  }
}

static void read_store_kmer_pos(const read_t *r, size_t chrom_id,
                                KONodeList *klists, const dBGraph *db_graph)
{
  const size_t kmer_size = db_graph->kmer_size;
  SeqLoadingStats stats;
  memset(&stats, 0, sizeof(stats));
  READ_TO_BKMERS(r, kmer_size, 0, 0, &stats, bkmer_store_kmer_pos,
                 klists, chrom_id, _offset, db_graph);
}

// Updates ginfo info add_missing_kmers is true
static void load_reads_count_kmers(const read_t *reads, size_t num_reads,
                                   bool add_missing_kmers, size_t ref_col,
                                   size_t num_threads,
                                   KONodeList *klists,
                                   dBGraph *db_graph)
{
  if(!num_reads) return;

  // 1. Loop through reads, add to graph and record kmer counts
  struct ReadUpdateCounts *updates;
  size_t i;

  updates = ctx_malloc(num_reads * sizeof(struct ReadUpdateCounts));

  for(i = 0; i < num_reads; i++) {
    updates[i] = (struct ReadUpdateCounts){.r = &reads[i],
                                           .klists = klists,
                                           .add_missing_kmers = add_missing_kmers,
                                           .ref_col = ref_col,
                                           .db_graph = db_graph};
  }

  util_run_threads(updates, num_reads, sizeof(struct ReadUpdateCounts),
                   num_threads, read_update_counts);

  ctx_free(updates);

  // Update ginfo
  if(add_missing_kmers) {
    SeqLoadingStats stats;
    memset(&stats, 0, sizeof(stats));
    stats.num_se_reads   = num_reads;
    stats.contigs_parsed = num_reads;
    for(i = 0; i < num_reads; i++) {
      stats.total_bases_read   += reads[i].seq.end;
      stats.total_bases_loaded += reads[i].seq.end;
    }
    graph_info_update_stats(&db_graph->ginfo[ref_col], &stats);
  }
}

/**
 * Create a KOGraph from given sequence reads
 * BEWARE: We add the reads to the graph if add_missing_kmers is true
 * db_graph->col_edges can be NULL even if we are adding kmers
 * @param add_missing_kmers  If true, add kmers to the graph in colour ref_col
 **/
KOGraph kograph_create(const read_t *reads, size_t num_reads,
                       bool add_missing_kmers, size_t ref_col,
                       size_t num_threads, dBGraph *db_graph)
{
  size_t i;

  status("[kograh] Adding reference annotations to the graph using %zu thread%s",
         num_threads, util_plural_str(num_threads));

  // If we are adding nodes, only have edges in one colour
  //  - it gets confusing otherwise (which colour would we add edges to?)
  ctx_assert(!add_missing_kmers || db_graph->num_edge_cols <= 1);
  ctx_assert(!add_missing_kmers || db_graph->bktlocks != NULL);

  // Check number of reads doesn't exceed max limit
  if(num_reads > KMER_OCCUR_MAX_CHROMS)
    die("More chromosomes than permitted (%zu > %i)",
        num_reads, KMER_OCCUR_MAX_CHROMS);

  // Check no read is too long
  for(i = 0; i < num_reads; i++)
    if(reads[i].seq.end > KMER_OCCUR_MAX_LEN)
      die("Read longer than limit (%zu > %zu; %zu: '%s')",
          reads[i].seq.end, KMER_OCCUR_MAX_LEN, i, reads[i].name.b);

  KOGraph kograph;
  memset(&kograph, 0, sizeof(KOGraph)); // initialise

  generate_chrom_list(&kograph, reads, num_reads);

  kograph.klists = ctx_calloc(db_graph->ht.capacity, sizeof(KONodeList));

  // 1. Loop through reads, add to graph and record kmer counts
  load_reads_count_kmers(reads, num_reads, add_missing_kmers, ref_col,
                         num_threads, kograph.klists, db_graph);

  status("[kograh] Consolidating annotations (single-threaded)");

  // 2. allocate a list for each kmer (some of length zero)
  uint64_t offset = 0, kcount, total_read_length = 0, total_kcount = 0;

  for(i = 0; i < db_graph->ht.capacity; i++)
    total_kcount += kograph.klists[i].kcount;

  // Sum lengths of reads
  for(i = 0; i < num_reads; i++)
    total_read_length += reads[i].seq.end;

  // total_kcount should be less than sum of read lengths, which is why we wait to
  // parse all reads before mallocing to reduce memory footprint
  ctx_assert(total_read_length == 0 || total_kcount < total_read_length);

  kograph.koccurs = total_kcount ? ctx_malloc(total_kcount * sizeof(KOccur)) : NULL;

  for(i = 0; i < db_graph->ht.capacity; i++)
  {
    // kcount/start are in a union -- can't use both
    kcount = kograph.klists[i].kcount;
    kograph.klists[i].first = kcount ? kograph.koccurs + offset : NULL;
    offset += kcount;
  }

  // Don't refer to klists[].kcount now -- only use klists[].start

  // 3. Loop through reads, record kmer pos
  //    Don't multithread this section, since we want reads to be added in order
  //    of read, and position in the read.
  if(total_kcount > 0) {
    for(i = 0; i < num_reads; i++) {
      read_store_kmer_pos(&reads[i], i, kograph.klists, db_graph);
    }
  }

  // 4. Rest pointers to point to the first item
  KOccur *ptr = kograph.koccurs;
  for(i = 0; i < db_graph->ht.capacity; i++) {
    if(kograph.klists[i].first != NULL) {
      (kograph.klists[i].first-1)->next = 0;
      SWAP(kograph.klists[i].first, ptr);
    }
  }

  return kograph;
}

void kograph_dealloc(KOGraph *kograph)
{
  ctx_free(kograph->chrom_name_buf);
  ctx_free(kograph->chroms);
  ctx_free(kograph->klists);
  ctx_free(kograph->koccurs);
}


//
// Check for a run of kmers in the reference genome
//

/**
 * @param pickup if true, create new paths for kmers not used in a path
 * @param qoffset is only used is pickup is true, and is the offset in the query
 * @return number of new koruns
 */
static size_t korun_extend(KOccurRun *koruns, size_t nruns,
                           dBNode node, const KOccur *kolist,
                           KOccurRunBuffer *new_koruns, bool pickup,
                           size_t qoffset)
{
  size_t i, starti = 0, next, init_new_koruns = new_koruns->len;
  bool used, strand;

  if(!kolist) return 0;

  // By looping over kolist we return a sorted list (by chrom and offset)
  for(; 1; kolist++)
  {
    while(starti < nruns &&
          (koruns[starti].chrom < kolist->chrom ||
           koruns[starti].last+1 < kolist->offset))
    {
      starti++;
    }

    used = false;
    strand = kolist->orient == node.orient ? STRAND_PLUS : STRAND_MINUS;

    for(i = starti; i < nruns; i++)
    {
      if(koruns[i].chrom > kolist->chrom ||
         koruns[i].last > kolist->offset+1)
      {
        break;
      }
      else
      {
        // Sanity checks
        ctx_assert(koruns[i].chrom == kolist->chrom);
        ctx_assert(labs((long)koruns[i].last - kolist->offset) <= 1);

        next = (strand == STRAND_PLUS ? koruns[i].last+1 : koruns[i].last-1);

        if(next == kolist->offset) {
          korun_buf_add(new_koruns,
                           (KOccurRun){.chrom = koruns[i].chrom,
                                       .first = koruns[i].first,
                                       .last = kolist->offset,
                                       .qoffset = koruns[i].qoffset,
                                       .strand = strand,
                                       .used = false});

          koruns[i].used = true;
          used = true;
        }
      }
    }

    if(pickup && !used)
    {
      // Start new kmer run
      korun_buf_add(new_koruns,
                       (KOccurRun){.chrom = kolist->chrom,
                                   .first = kolist->offset,
                                   .last = kolist->offset,
                                   .qoffset = qoffset,
                                   .strand = strand,
                                   .used = false});
    }

    if(!kolist->next) break;
  }

  return new_koruns->len - init_new_koruns;
}

size_t kograph_count(const KOGraph *kograph, hkey_t hkey)
{
  const KOccur *kolist = kograph_get(kograph, hkey), *first = kolist;
  if(kolist) {
    while(kolist->next) { kolist++; }
    return first - kolist + 1;
  }
  return 0;
}

/**
 * Filter regions down to only those that stretch the whole distance
 * Does not reset either korun or runs_ended - only adds to runs_ended
 * @param korun list of existing runs
 * @param qoffset is used for offset of new runs starting
 */
void kograph_filter_extend(const KOGraph *kograph,
                           const dBNode *nodes, size_t num_nodes, bool forward,
                           size_t min_len, size_t qoffset,
                           KOccurRunBuffer *korun,
                           KOccurRunBuffer *koruns_tmp,
                           KOccurRunBuffer *runs_ended)
{
  const KOccur *kolist;
  size_t i, j;
  dBNode node;

  KOccurRunBuffer *runs0 = korun, *runs1 = koruns_tmp;

  for(i = 0; i < num_nodes; i++)
  {
    node = db_nodes_get(nodes, num_nodes, forward, i);
    kolist = kograph_get(kograph, node.key);
    korun_buf_reset(runs1);
    korun_extend(runs0->b, runs0->len, node, kolist, runs1, true, qoffset+i);

    // Store runs than have ended
    for(j = 0; j < runs0->len; j++) {
      if(!runs0->b[j].used && korun_len(runs0->b[j]) > min_len) {
        korun_buf_add(runs_ended, runs0->b[j]);
      }
    }

    SWAP(runs0, runs1);
  }

  if(runs0 != korun) SWAP(*runs0, *runs1);
}
