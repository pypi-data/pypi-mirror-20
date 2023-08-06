#include "global.h"
#include "commands.h"
#include "util.h"
#include "file_util.h"
#include "seq_reader.h"
#include "kmer_occur.h"
#include "seqout.h"

const char rmsubstr_usage[] =
"usage: "CMD" rmsubstr [options] <in.fa> [in2.fq ...]\n"
"\n"
"  Remove duplicate sequences and those that occur as substrings of others.\n"
"  Matching is case insensitive and includes matching reverse complement.\n"
"\n"
"  -h, --help            This help message\n"
"  -q, --quiet           Silence status output normally printed to STDERR\n"
"  -f, --force           Overwrite output files\n"
"  -o, --out <out.txt>   Save output [default: STDOUT]\n"
"  -m, --memory <mem>    Memory to use\n"
"  -n, --nkmers <kmers>  Number of hash table entries (e.g. 1G ~ 1 billion)\n"
"  -t, --threads <T>     Number of threads to use [default: "QUOTE_VALUE(DEFAULT_NTHREADS)"]\n"
"  -k, --kmer <kmer>     Kmer size must be odd ("QUOTE_VALUE(MAX_KMER_SIZE)" >= k >= "QUOTE_VALUE(MIN_KMER_SIZE)")\n"
"  -F, --format <f>      Output format may be: FASTA, FASTQ [default: FASTQ]\n"
"  -v, --invert          Only print strings that are substrings\n"
"\n";

static struct option longopts[] =
{
// General options
  {"help",         no_argument,       NULL, 'h'},
  {"out",          required_argument, NULL, 'o'},
  {"force",        no_argument,       NULL, 'f'},
  {"memory",       required_argument, NULL, 'm'},
  {"nkmers",       required_argument, NULL, 'n'},
  {"threads",      required_argument, NULL, 't'},
// command specific
  {"kmer",         required_argument, NULL, 'k'},
  {"format",       required_argument, NULL, 'F'},
  {"invert",       no_argument,       NULL, 'v'},
  {NULL, 0, NULL, 0}
};

#if MAX_KMER_SIZE == 31
#  define DEFAULT_KMER 31
#else
#  define DEFAULT_KMER MIN_KMER_SIZE
#endif

// Returns 1 if a read is a substring of ANY read in the list or a complete
// match with a read before it in the list. Returns <= 0 otherwise.
//  1 => is substr
//  0 => not substr
// -1 => not enough bases of ACGT
static int _is_substr(const ReadBuffer *rbuf, size_t idx,
                      const KOGraph *kograph, const dBGraph *db_graph)
{
  const size_t kmer_size = db_graph->kmer_size;
  const read_t *r = &rbuf->b[idx], *r2;
  size_t contig_start;

  contig_start = seq_contig_start(r, 0, kmer_size, 0, 0);
  if(contig_start >= r->seq.end) return -1; // No kmers in this sequence

  dBNode node = db_graph_find_str(db_graph, r->seq.b+contig_start);
  ctx_assert(node.key != HASH_NOT_FOUND);

  // expect at least one hit (for this read!)
  ctx_assert(kograph_occurs(kograph, node.key));
  KOccur *hit;

  for(hit = kograph_get(kograph, node.key); 1; hit++)
  {
    if(hit->chrom != idx)
    {
      r2 = &rbuf->b[hit->chrom];

      // A read is a duplicate (i.e. return 1) if it is a substring of ANY
      // read in the list or a complete match with a read before it in the list.
      // That is why we have: (hit->chrom < idx || r->seq.end < r2->seq.end)
      // since identical strings have equal length
      if(hit->chrom < idx || r->seq.end < r2->seq.end) {
        if(hit->orient == node.orient) {
          // potential FORWARD match
          if(hit->offset >= contig_start &&
             hit->offset + r->seq.end <= r2->seq.end &&
             strncasecmp(r->seq.b, r2->seq.b+hit->offset-contig_start, r->seq.end) == 0)
          {
            return 1;
          }
        }
        else {
          // potential REVERSE match
          // if read is '<NNNN>[kmer]<rem>' rX_rem is the number of chars after
          // the first valid kmer
          size_t r1_rem =  r->seq.end - (contig_start   + kmer_size);
          size_t r2_rem = r2->seq.end - (hit->offset + kmer_size);

          if(r1_rem <= hit->offset && r2_rem >= contig_start &&
             dna_revncasecmp(r->seq.b, r2->seq.b+hit->offset-r1_rem, r->seq.end) == 0)
          {
            return 1;
          }
        }
      }
    }

    if(!hit->next) break;
  }

  return 0;
}

int ctx_rmsubstr(int argc, char **argv)
{
  struct MemArgs memargs = MEM_ARGS_INIT;
  size_t kmer_size = 0, nthreads = 0;
  const char *output_file = NULL;
  seq_format fmt = SEQ_FMT_FASTA;
  bool invert = false;

  // Arg parsing
  char cmd[100], shortopts[100];
  cmd_long_opts_to_short(longopts, shortopts, sizeof(shortopts));
  int c;

  while((c = getopt_long_only(argc, argv, shortopts, longopts, NULL)) != -1) {
    cmd_get_longopt_str(longopts, c, cmd, sizeof(cmd));
    switch(c) {
      case 0: /* flag set */ break;
      case 'h': cmd_print_usage(NULL); break;
      case 'f': cmd_check(!futil_get_force(), cmd); futil_set_force(true); break;
      case 'o': cmd_check(!output_file, cmd); output_file = optarg; break;
      case 't': cmd_check(!nthreads, cmd); nthreads = cmd_uint32_nonzero(cmd, optarg); break;
      case 'm': cmd_mem_args_set_memory(&memargs, optarg); break;
      case 'n': cmd_mem_args_set_nkmers(&memargs, optarg); break;
      case 'k': cmd_check(!kmer_size,cmd); kmer_size = cmd_uint32(cmd, optarg); break;
      case 'F': cmd_check(fmt==SEQ_FMT_FASTA, cmd); fmt = cmd_parse_format(cmd, optarg); break;
      case 'v': cmd_check(!invert,cmd); invert = true; break;
      case ':': /* BADARG */
      case '?': /* BADCH getopt_long has already printed error */
        // cmd_print_usage(NULL);
        cmd_print_usage("`"CMD" rmsubstr -h` for help. Bad option: %s", argv[optind-1]);
      default: abort();
    }
  }

  // Defaults
  if(!nthreads) nthreads = DEFAULT_NTHREADS;
  if(!kmer_size) kmer_size = DEFAULT_KMER;

  if(!(kmer_size&1)) cmd_print_usage("Kmer size must be odd");
  if(kmer_size < MIN_KMER_SIZE) cmd_print_usage("Kmer size too small (recompile)");
  if(kmer_size > MAX_KMER_SIZE) cmd_print_usage("Kmer size too large (recompile?)");

  if(optind >= argc)
    cmd_print_usage("Please specify at least one input sequence file (.fq, .fq etc.)");

  size_t i, num_seq_files = argc - optind;
  char **seq_paths = argv + optind;
  seq_file_t **seq_files = ctx_calloc(num_seq_files, sizeof(seq_file_t*));

  for(i = 0; i < num_seq_files; i++)
    if((seq_files[i] = seq_open(seq_paths[i])) == NULL)
      die("Cannot read sequence file %s", seq_paths[i]);

  // Estimate number of bases
  // set to -1 if we cannot calc
  int64_t est_num_bases = seq_est_seq_bases(seq_files, num_seq_files);
  if(est_num_bases < 0) {
    warn("Cannot get file sizes, using pipes");
    est_num_bases = memargs.num_kmers * IDEAL_OCCUPANCY;
  }

  status("[memory] Estimated number of bases: %li", (long)est_num_bases);

  // Use file sizes to decide on memory

  //
  // Decide on memory
  //
  size_t bits_per_kmer, kmers_in_hash, graph_mem;

  bits_per_kmer = sizeof(BinaryKmer)*8 +
                  sizeof(KONodeList) + sizeof(KOccur) + // see kmer_occur.h
                  8; // 1 byte per kmer for each base to load sequence files

  kmers_in_hash = cmd_get_kmers_in_hash(memargs.mem_to_use,
                                        memargs.mem_to_use_set,
                                        memargs.num_kmers,
                                        memargs.num_kmers_set,
                                        bits_per_kmer,
                                        est_num_bases, est_num_bases,
                                        false, &graph_mem);

  cmd_check_mem_limit(memargs.mem_to_use, graph_mem);

  //
  // Open output file
  //
  if(output_file == NULL) output_file = "-";
  FILE *fout = futil_fopen_create(output_file, "w");

  //
  // Set up memory
  //
  dBGraph db_graph;
  db_graph_alloc(&db_graph, kmer_size, 1, 0, kmers_in_hash, DBG_ALLOC_BKTLOCKS);

  //
  // Load reference sequence into a read buffer
  //
  ReadBuffer rbuf;
  read_buf_alloc(&rbuf, 1024);
  seq_load_all_reads(seq_files, num_seq_files, &rbuf);

  // Check for reads too short
  for(i = 0; i < rbuf.len && rbuf.b[i].seq.end >= kmer_size; i++) {}
  if(i < rbuf.len)
    warn("Reads shorter than kmer size (%zu) will not be filtered", kmer_size);

  KOGraph kograph = kograph_create(rbuf.b, rbuf.len, true, 0,
                                   nthreads, &db_graph);

  size_t num_reads = rbuf.len, num_reads_printed = 0, num_bad_reads = 0;

  // Loop over reads printing those that are not substrings
  int ret;
  for(i = 0; i < rbuf.len; i++) {
    ret = _is_substr(&rbuf, i, &kograph, &db_graph);
    if(ret == -1) num_bad_reads++;
    else if((ret && invert) || (!ret && !invert)) {
      seqout_print_read(&rbuf.b[i], fmt, fout);
      num_reads_printed++;
    }
  }

  char num_reads_str[100], num_reads_printed_str[100], num_bad_reads_str[100];
  ulong_to_str(num_reads, num_reads_str);
  ulong_to_str(num_reads_printed, num_reads_printed_str);
  ulong_to_str(num_bad_reads, num_bad_reads_str);

  status("Printed %s / %s (%.1f%%) to %s",
         num_reads_printed_str, num_reads_str,
         !num_reads ? 0.0 : (100.0 * num_reads_printed) / num_reads,
         futil_outpath_str(output_file));

  if(num_bad_reads > 0) {
    status("Bad reads: %s / %s (%.1f%%) - no kmer {ACGT} of length %zu",
           num_bad_reads_str, num_reads_str,
           (100.0 * num_bad_reads) / num_reads,
           kmer_size);
  }

  fclose(fout);
  kograph_dealloc(&kograph);

  // Free sequence memory
  for(i = 0; i < rbuf.len; i++) seq_read_dealloc(&rbuf.b[i]);
  read_buf_dealloc(&rbuf);
  ctx_free(seq_files);

  db_graph_dealloc(&db_graph);

  return EXIT_SUCCESS;
}
