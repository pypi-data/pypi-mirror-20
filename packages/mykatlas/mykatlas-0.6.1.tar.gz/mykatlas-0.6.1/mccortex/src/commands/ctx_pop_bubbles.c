#include "global.h"
#include "commands.h"
#include "util.h"
#include "file_util.h"
#include "db_graph.h"
#include "graphs_load.h"
#include "graph_writer.h"
#include "gpath_reader.h"
#include "gpath_checks.h"
#include "prune_nodes.h"
#include "pop_bubbles.h"

const char pop_bubbles_usage[] =
"usage: "CMD" pop [options] <in.ctx> [in2.ctx ...]\n"
"\n"
"  Pop bubbles in the graph.\n"
"\n"
"  -h, --help            This help message\n"
"  -q, --quiet           Silence status output normally printed to STDERR\n"
"  -f, --force           Overwrite output files\n"
"  -o, --out <out.ctx>   Output file [required]\n"
"  -m, --memory <mem>    Memory to use\n"
"  -n, --nkmers <kmers>  Number of hash table entries (e.g. 1G ~ 1 billion)\n"
"  -t, --threads <T>     Number of threads to use [default: "QUOTE_VALUE(DEFAULT_NTHREADS)"]\n"
"  -C, --max-covg <C>    Only remove branches whose mean coverage is less than <C>\n"
"  -L, --max-len <L>     Only remove branches whose lengths are less than <L> kmers\n"
"  -D, --max-diff <D>    Only pop bubbles whose branch lengths are within <D> kmers\n"
"\n";

static struct option longopts[] =
{
// General options
  {"help",         no_argument,       NULL, 'h'},
  {"out",          required_argument, NULL, 'o'},
  {"memory",       required_argument, NULL, 'm'},
  {"nkmers",       required_argument, NULL, 'n'},
  {"threads",      required_argument, NULL, 't'},
  {"force",        no_argument,       NULL, 'f'},
  {"max-covg",     required_argument, NULL, 'C'},
  {"max-len",      required_argument, NULL, 'L'},
  {"max-diff",     required_argument, NULL, 'D'},
  {NULL, 0, NULL, 0}
};

int ctx_pop_bubbles(int argc, char **argv)
{
  size_t nthreads = 0;
  struct MemArgs memargs = MEM_ARGS_INIT;
  const char *out_path = NULL;
  int32_t max_covg  = -1; // max mean coverage to remove <=0 => ignore
  int32_t max_klen  = -1; // max length (kmers) to remove <=0 => ignore
  int32_t max_kdiff = -1; // max diff between bubble branch lengths <0 => ignore

  // Arg parsing
  char cmd[100];
  char shortopts[300];
  cmd_long_opts_to_short(longopts, shortopts, sizeof(shortopts));
  int c;

  // silence error messages from getopt_long
  // opterr = 0;

  while((c = getopt_long_only(argc, argv, shortopts, longopts, NULL)) != -1) {
    cmd_get_longopt_str(longopts, c, cmd, sizeof(cmd));
    switch(c) {
      case 0: /* flag set */ break;
      case 'h': cmd_print_usage(NULL); break;
      case 'o': cmd_check(!out_path, cmd); out_path = optarg; break;
      case 'f': cmd_check(!futil_get_force(), cmd); futil_set_force(true); break;
      case 't': cmd_check(!nthreads, cmd); nthreads = cmd_uint32_nonzero(cmd, optarg); break;
      case 'm': cmd_mem_args_set_memory(&memargs, optarg); break;
      case 'n': cmd_mem_args_set_nkmers(&memargs, optarg); break;
      case 'C': cmd_check(max_covg<0,  cmd); max_covg  = cmd_uint32(cmd, optarg); break;
      case 'L': cmd_check(max_klen<0,  cmd); max_klen  = cmd_uint32(cmd, optarg); break;
      case 'D': cmd_check(max_kdiff<0, cmd); max_kdiff = cmd_uint32(cmd, optarg); break;
      case ':': /* BADARG */
      case '?': /* BADCH getopt_long has already printed error */
        // cmd_print_usage(NULL);
        die("`"CMD" pop -h` for help. Bad option: %s", argv[optind-1]);
      default: abort();
    }
  }

  // Defaults for unset values
  if(out_path == NULL) out_path = "-";
  if(nthreads == 0) nthreads = DEFAULT_NTHREADS;

  if(optind >= argc) cmd_print_usage("Require input graph files (.ctx)");

  //
  // Open graph files
  //
  const size_t num_gfiles = argc - optind;
  char **graph_paths = argv + optind;
  ctx_assert(num_gfiles > 0);

  GraphFileReader *gfiles = ctx_calloc(num_gfiles, sizeof(GraphFileReader));
  size_t i, ncols, ctx_max_kmers = 0, ctx_sum_kmers = 0;

  ncols = graph_files_open(graph_paths, gfiles, num_gfiles,
                           &ctx_max_kmers, &ctx_sum_kmers);

  bool reread_graph_to_filter = (num_gfiles == 1 &&
                                 strcmp(file_filter_path(&gfiles[0].fltr),"-") != 0);

  if(reread_graph_to_filter) {
    file_filter_flatten(&gfiles[0].fltr, 0);
    ncols = 1;
  }

  // Check graphs are compatible
  graphs_gpaths_compatible(gfiles, num_gfiles, NULL, 0, -1);

  //
  // Decide on memory
  //
  size_t bits_per_kmer, kmers_in_hash, graph_mem;

  bits_per_kmer = sizeof(BinaryKmer)*8 +
                  sizeof(Covg)*8*ncols +
                  sizeof(Edges)*8*ncols +
                  2; // 1 bit for visited, 1 for removed

  kmers_in_hash = cmd_get_kmers_in_hash(memargs.mem_to_use,
                                        memargs.mem_to_use_set,
                                        memargs.num_kmers,
                                        memargs.num_kmers_set,
                                        bits_per_kmer,
                                        ctx_max_kmers, ctx_sum_kmers,
                                        false, &graph_mem);

  cmd_check_mem_limit(memargs.mem_to_use, graph_mem);

  // Check out_path is writable
  futil_create_output(out_path);

  // Allocate memory
  dBGraph db_graph;
  db_graph_alloc(&db_graph, gfiles[0].hdr.kmer_size, ncols, ncols,
                 kmers_in_hash,  DBG_ALLOC_EDGES | DBG_ALLOC_COVGS);

  size_t nkwords = roundup_bits2bytes(db_graph.ht.capacity);
  uint8_t *visited = ctx_calloc(1, nkwords);
  uint8_t *rmvbits  = ctx_calloc(1, nkwords);

  //
  // Load graphs
  //
  GraphLoadingPrefs gprefs = graph_loading_prefs(&db_graph);
  gprefs.empty_colours = true;

  for(i = 0; i < num_gfiles; i++) {
    graph_load(&gfiles[i], gprefs, NULL);
    graph_file_close(&gfiles[i]);
    gprefs.empty_colours = false;
  }
  ctx_free(gfiles);

  hash_table_print_stats(&db_graph.ht);

  PopBubblesPrefs prefs = {.max_rmv_covg = max_covg,
                           .max_rmv_klen = max_klen,
                           .max_rmv_kdiff = max_kdiff};
  size_t npopped = 0;
  char npopped_str[50];

  status("Popping bubbles...");
  npopped = pop_bubbles(&db_graph, nthreads, prefs, visited, rmvbits);
  ulong_to_str(npopped, npopped_str);
  status("Popped %s bubbles", npopped_str);

  size_t nkmers0 = db_graph.ht.num_kmers;
  status("Removing nodes...");
  for(i = 0; i < nkwords; i++) rmvbits[i] = ~rmvbits[i];
  prune_nodes_lacking_flag(nthreads, rmvbits, &db_graph);
  size_t nkmers1 = db_graph.ht.num_kmers;

  ctx_assert(nkmers1 <= nkmers0);
  char nkmers0str[50], nkmers1str[50], ndiffstr[50];
  ulong_to_str(nkmers0, nkmers0str);
  ulong_to_str(nkmers1, nkmers1str);
  ulong_to_str(nkmers0-nkmers1, ndiffstr);
  status("Number of kmers %s -> %s (-%s)", nkmers0str, nkmers1str, ndiffstr);

  if(reread_graph_to_filter)
  {
    status("Streaming filtered file to: %s\n", out_path);
    GraphFileReader gfile;
    memset(&gfile, 0, sizeof(GraphFileReader));
    graph_file_open(&gfile, graph_paths[0]);
    graph_writer_stream_mkhdr(out_path, &gfile, &db_graph,
                              db_graph.col_edges, NULL);
    graph_file_close(&gfile);
  }
  else
  {
    status("Saving to: %s\n", out_path);
    graph_writer_save_mkhdr(out_path, &db_graph, CTX_GRAPH_FILEFORMAT, NULL,
                          0, ncols);
  }

  ctx_free(visited);
  ctx_free(rmvbits);

  db_graph_dealloc(&db_graph);

  return EXIT_SUCCESS;
}
