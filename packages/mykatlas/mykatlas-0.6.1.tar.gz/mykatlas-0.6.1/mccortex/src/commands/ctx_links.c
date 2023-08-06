#include "global.h"
#include "commands.h"
#include "util.h"
#include "file_util.h"
#include "link_tree.h"
#include "gpath_reader.h"
#include "json_hdr.h"
#include "gpath_save.h"
#include "clean_graph.h"

#include "carrays/carrays.h" // gca_median_size()

#define DEFAULT_MAX_DIST 6
#define DEFAULT_MAX_COVG 100

const char links_usage[] =
"usage: "CMD" links [options] <in.ctp.gz>\n"
"\n"
"  Clean, minimise and list cortex links. Works on a stream of input only,\n"
"  so memory usage is very low.\n"
"\n"
"  -h,--help               This help message\n"
"  -q,--quiet              Silence status output normally printed to STDERR\n"
"  -f,--force              Overwrite output files\n"
"  -o,--out <out.ctp.gz>   Save output link file [default: STDOUT]\n"
"\n"
"  -L,--limit <N>          Only use links from first N kmers\n"
"\n"
"One or more of:\n"
"  -l,--list <out.txt>     List as CSV links\n"
"  -P,--plot <out.dot>     Plot last from limit\n"
"  -c,--clean <N>          Remove junction choices with coverage < N\n"
"  -T,--threshold <t.txt>  Calculate the cleaning threshold, write to file\n"
"  -H,--covg-hist <f.csv>  Write link coverage matrix to a csv file\n"
"  -D,--max-dist <max>     Set max dist when using --covg-hist ...\n"
"  -C,--max-covg <max>     Set max covg when using --covg-hist ...\n"
"\n";

static struct option longopts[] =
{
// General options
  {"help",         no_argument,       NULL, 'h'},
  {"out",          required_argument, NULL, 'o'},
  {"force",        no_argument,       NULL, 'f'},
// command specific
  {"list",         required_argument, NULL, 'l'},
  {"clean",        required_argument, NULL, 'c'},
  {"plot",         required_argument, NULL, 'P'},
  {"threshold",    required_argument, NULL, 'T'},
  {"covg-hist",    required_argument, NULL, 'H'},
  {"max-dist",     required_argument, NULL, 'D'},
  {"max-covg",     required_argument, NULL, 'C'},
//
  {"limit",        required_argument, NULL, 'L'},
  {NULL, 0, NULL, 0}
};

// Creates <base>.tmp.<rand>
static FILE* create_tmp_file(StrBuf *path, const char *base)
{
  size_t i;
  const size_t attempt_limit = 100;
  FILE *fh;

  for(i = 0; i < attempt_limit; i++) {
    size_t r = rand() % 9999;
    strbuf_reset(path);
    strbuf_sprintf(path, "%s.tmp.%04zu", base, r);
    if(!futil_file_exists(path->b)) break;
  }
  if(i == attempt_limit)
    die("Temporary files already exist (%zu tries): %s", attempt_limit, path->b);

  if((fh = futil_fopen_create(path->b, "r+")) == NULL) {
    die("Cannot write temporary file: %s [%s]", path->b, strerror(errno));
  }

  unlink(path->b); // Immediately unlink to hide temp file
  return fh;
}

static void print_suggest_cutoff(size_t hist_distsize, size_t hist_covgsize,
                                 uint64_t (*hists)[hist_covgsize],
                                 FILE *fh)
{
  size_t i, dist, median, nthresh_failed = 0;
  size_t cutoffs[hist_distsize], sumcovgs[hist_distsize];

  // Don't use dist[0] -- not informative
  memset(cutoffs, 0, sizeof(cutoffs));
  memset(sumcovgs, 0, sizeof(sumcovgs));

  for(dist = 1; dist < hist_distsize; dist++)
  {
    int t = cleaning_pick_kmer_threshold(hists[dist], hist_covgsize,
                                         NULL, NULL, NULL, NULL);
    if(t < 0) { nthresh_failed++; t = 0; }
    cutoffs[dist] = t;
    for(i = 0; i < hist_covgsize; i++) sumcovgs[dist] += hists[dist][i];
  }

  // Print cutoffs
  fprintf(fh, "sumcovgs=%zu", sumcovgs[1]);
  for(i = 2; i < hist_distsize; i++) fprintf(fh, ",%zu", sumcovgs[i]);
  fprintf(fh, "\ncutoffs=%zu", cutoffs[1]);
  for(i = 2; i < hist_distsize; i++) fprintf(fh, ",%zu", cutoffs[i]);
  fprintf(fh, "\n");

  median = gca_median_size(cutoffs+1, hist_distsize-1);

  fprintf(fh, "suggested_cutoff=%zu\n", median);

  if(nthresh_failed)
    warn("Threshold failed in %zu cases [default to 0]", nthresh_failed);
}

int ctx_links(int argc, char **argv)
{
  size_t limit = 0;
  const char *link_out_path = NULL, *csv_out_path = NULL, *plot_out_path = NULL;
  const char *thresh_path = NULL, *hist_path = NULL;

  size_t hist_distsize = 0, hist_covgsize = 0;
  size_t cutoff = 0;
  bool clean = false;

  // Arg parsing
  char cmd[100];
  char shortopts[300];
  cmd_long_opts_to_short(longopts, shortopts, sizeof(shortopts));
  int c;

  while((c = getopt_long_only(argc, argv, shortopts, longopts, NULL)) != -1) {
    cmd_get_longopt_str(longopts, c, cmd, sizeof(cmd));
    switch(c) {
      case 0: /* flag set */ break;
      case 'h': cmd_print_usage(NULL); break;
      case 'o': cmd_check(!link_out_path, cmd); link_out_path = optarg; break;
      case 'f': cmd_check(!futil_get_force(), cmd); futil_set_force(true); break;
      case 'l': cmd_check(!csv_out_path, cmd); csv_out_path = optarg; break;
      case 'c': cmd_check(!cutoff, cmd); cutoff = cmd_size(cmd, optarg); clean = true; break;
      case 'L': cmd_check(!limit, cmd); limit = cmd_size(cmd, optarg); break;
      case 'P': cmd_check(!plot_out_path, cmd); plot_out_path = optarg; break;
      case 'T': cmd_check(!thresh_path, cmd); thresh_path = optarg; break;
      case 'H': cmd_check(!hist_path, cmd); hist_path = optarg; break;
      case 'C': cmd_check(!hist_covgsize, cmd); hist_covgsize = cmd_size(cmd, optarg); break;
      case 'D': cmd_check(!hist_distsize, cmd); hist_distsize = cmd_size(cmd, optarg); break;
      case ':': /* BADARG */
      case '?': /* BADCH getopt_long has already printed error */
        // cmd_print_usage(NULL);
        die("`"CMD" links -h` for help. Bad option: %s", argv[optind-1]);
      default: ctx_assert2(0, "shouldn't reach here: %c", c);
    }
  }

  if(hist_distsize && !hist_path) cmd_print_usage("--max-dist without --covg-hist");
  if(hist_covgsize && !hist_path) cmd_print_usage("--max-covg without --covg-hist");

  // Defaults
  if(!hist_distsize) hist_distsize = DEFAULT_MAX_DIST;
  if(!hist_covgsize) hist_covgsize = DEFAULT_MAX_COVG;

  if(optind + 1 != argc) cmd_print_usage("Wrong number of arguments");
  const char *ctp_path = argv[optind];

  bool list = (csv_out_path != NULL);
  bool plot = (plot_out_path != NULL);
  bool save = (link_out_path != NULL);
  bool hist_covg = (thresh_path != NULL || hist_path != NULL);

  size_t plot_kmer_idx = (limit == 0 ? 0 : limit - 1);

  if(clean && !save)
    cmd_print_usage("Need to give --out <out.ctp.gz> with --clean");

  if(!save && !list && !plot && !hist_covg)
    cmd_print_usage("Please specify one of --plot, --list or --clean");

  if(link_out_path && hist_covg && strcmp(link_out_path,"-") == 0)
    cmd_print_usage("Outputing both cleaning threshold (-T) and links (-o) to STDOUT!");

  // Open input file
  FILE *list_fh = NULL, *plot_fh = NULL, *link_tmp_fh = NULL;
  FILE *thresh_fh = NULL, *hist_fh = NULL;
  gzFile link_gz = NULL;

  // Check file don't exist or that we can overwrite
  // Will ignore if path is null
  bool err = false;
  err |= futil_check_outfile(csv_out_path);
  err |= futil_check_outfile(plot_out_path);
  err |= futil_check_outfile(link_out_path);
  err |= futil_check_outfile(thresh_path);
  err |= futil_check_outfile(hist_path);
  if(err) die("Use -f,--force to overwrite files");

  StrBuf link_tmp_path;
  strbuf_alloc(&link_tmp_path, 1024);

  GPathReader ctpin;
  memset(&ctpin, 0, sizeof(ctpin));
  gpath_reader_open(&ctpin, ctp_path);

  size_t ncols = file_filter_into_ncols(&ctpin.fltr);
  size_t kmer_size = gpath_reader_get_kmer_size(&ctpin);
  cJSON *newhdr = cJSON_Duplicate(ctpin.json, 1);

  if(ncols != 1) die("Can only clean a single colour at a time. Sorry.");

  uint64_t (*hists)[hist_covgsize] = NULL;

  if(hist_covg) {
    hists = ctx_calloc(hist_distsize, sizeof(hists[0]));
  }

  if(hist_path && (hist_fh = futil_fopen_create(hist_path, "w")) == NULL)
      die("Cannot open file: %s", hist_path);

  if(thresh_path && (thresh_fh = futil_fopen_create(thresh_path, "w")) == NULL)
      die("Cannot open file: %s", thresh_path);

  if(limit)
    status("Limiting to the first %zu kmers", limit);

  if(clean)
  {
    timestamp();
    message(" Cleaning coverage below %zu", cutoff);
    message("\n");
  }

  if(save)
  {
    // Check we can find the fields we need
    cJSON *links_json  = json_hdr_get(newhdr, "paths", cJSON_Object, link_out_path);
    cJSON *nkmers_json = json_hdr_get(links_json, "num_kmers_with_paths", cJSON_Number, link_out_path);
    cJSON *nlinks_json = json_hdr_get(links_json, "num_paths",            cJSON_Number, link_out_path);
    cJSON *nbytes_json = json_hdr_get(links_json, "path_bytes",           cJSON_Number, link_out_path);
    if(!nkmers_json || !nlinks_json || !nbytes_json)
      die("Cannot find required header entries");

    // Create a random temporary file
    link_tmp_fh = create_tmp_file(&link_tmp_path, link_out_path);

    status("Saving output to: %s", link_out_path);
    status("Temporary output: %s", link_tmp_path.b);

    // Open output file
    if((link_gz = futil_gzopen_create(link_out_path, "w")) == NULL)
      die("Cannot open output link file: %s", link_out_path);

    // Need to open output file first so we can get absolute path
    // Update the header to include this command
    json_hdr_add_curr_cmd(newhdr, link_out_path);
  }

  if(list)
  {
    status("Listing to %s", csv_out_path);
    if((list_fh = futil_fopen_create(csv_out_path, "w")) == NULL)
      die("Cannot open output CSV file %s", csv_out_path);

    // Print csv header
    fprintf(list_fh, "SeqLen,Covg\n");
  }

  if(plot)
  {
    status("Plotting kmer %zu to %s", plot_kmer_idx, plot_out_path);
    if((plot_fh = futil_fopen_create(plot_out_path, "w")) == NULL)
      die("Cannot open output .dot file %s", plot_out_path);
  }

  SizeBuffer countbuf, jposbuf;
  size_buf_alloc(&countbuf, 16);
  size_buf_alloc(&jposbuf, 1024);

  StrBuf kmerbuf, juncsbuf, seqbuf, outbuf;
  strbuf_alloc(&kmerbuf, 1024);
  strbuf_alloc(&juncsbuf, 1024);
  strbuf_alloc(&seqbuf, 1024);
  strbuf_alloc(&outbuf, 1024);

  bool link_fw;
  size_t njuncs;
  size_t knum, nlinks, num_links_exp = 0;

  LinkTree ltree;
  ltree_alloc(&ltree, kmer_size);

  LinkTreeStats tree_stats;
  memset(&tree_stats, 0, sizeof(tree_stats));
  size_t init_num_links = 0, num_links = 0;

  for(knum = 0; !limit || knum < limit; knum++)
  {
    ltree_reset(&ltree);
    if(!gpath_reader_read_kmer(&ctpin, &kmerbuf, &num_links_exp)) break;
    ctx_assert2(kmerbuf.end == kmer_size, "Kmer incorrect length %zu != %zu",
                kmerbuf.end, kmer_size);
    // status("kmer: %s", kmerbuf.b);

    for(nlinks = 0;
        gpath_reader_read_link(&ctpin, &link_fw, &njuncs,
                               &countbuf, &juncsbuf,
                               &seqbuf, &jposbuf);
        nlinks++)
    {
      ltree_add(&ltree, link_fw, countbuf.b[0], jposbuf.b,
                juncsbuf.b, seqbuf.b);
    }

    if(nlinks != num_links_exp)
      warn("Links count mismatch %zu != %zu", nlinks, num_links_exp);

    if(hist_covg)
    {
      ltree_update_covg_hists(&ltree, (uint64_t*)hists,
                              hist_distsize, hist_covgsize);
    }
    if(clean)
    {
      ltree_clean(&ltree, cutoff);
    }

    // Accumulate statistics
    ltree_get_stats(&ltree, &tree_stats);
    num_links = tree_stats.num_links - init_num_links;
    init_num_links = tree_stats.num_links;

    if(list)
    {
      ltree_write_list(&ltree, &outbuf);
      if(fwrite(outbuf.b, 1, outbuf.end, list_fh) != outbuf.end)
        die("Cannot write CSV file to: %s", csv_out_path);
      strbuf_reset(&outbuf);
    }
    if(save && num_links)
    {
      ltree_write_ctp(&ltree, kmerbuf.b, num_links, &outbuf);
      if(fwrite(outbuf.b, 1, outbuf.end, link_tmp_fh) != outbuf.end)
        die("Cannot write ctp file to: %s", link_tmp_path.b);
      strbuf_reset(&outbuf);
    }
    if(plot && knum == plot_kmer_idx)
    {
      status("Plotting tree...");
      ltree_write_dot(&ltree, &outbuf);
      if(fwrite(outbuf.b, 1, outbuf.end, plot_fh) != outbuf.end)
        die("Cannot write plot DOT file to: %s", plot_out_path);
      strbuf_reset(&outbuf);
    }
  }

  gpath_reader_close(&ctpin);

  cJSON *links_json = json_hdr_get(newhdr, "paths", cJSON_Object, link_out_path);
  cJSON *nkmers_json = json_hdr_get(links_json, "num_kmers_with_paths", cJSON_Number, link_out_path);
  cJSON *nlinks_json = json_hdr_get(links_json, "num_paths",            cJSON_Number, link_out_path);
  cJSON *nbytes_json = json_hdr_get(links_json, "path_bytes",           cJSON_Number, link_out_path);

  status("Number of kmers with links %li -> %zu", nkmers_json->valueint, tree_stats.num_trees_with_links);
  status("Number of links %li -> %zu", nlinks_json->valueint, tree_stats.num_links);
  status("Number of bytes %li -> %zu", nbytes_json->valueint, tree_stats.num_link_bytes);

  if(save)
  {
    // Update JSON
    nkmers_json->valuedouble = nkmers_json->valueint = tree_stats.num_trees_with_links;
    nlinks_json->valuedouble = nlinks_json->valueint = tree_stats.num_links;
    nbytes_json->valuedouble = nbytes_json->valueint = tree_stats.num_link_bytes;

    char *json_str = cJSON_Print(newhdr);
    if(gzputs(link_gz, json_str) != (int)strlen(json_str))
      die("Cannot write ctp file to: %s", link_out_path);
    free(json_str);

    gzputs(link_gz, "\n\n");
    gzputs(link_gz, ctp_explanation_comment);
    gzputs(link_gz, "\n");

    fseek(link_tmp_fh, 0, SEEK_SET);
    char *tmp = ctx_malloc(4*ONE_MEGABYTE);
    size_t s;
    while((s = fread(tmp, 1, 4*ONE_MEGABYTE, link_tmp_fh)) > 0) {
      if(gzwrite(link_gz, tmp, s) != (int)s)
        die("Cannot write to output: %s", link_out_path);
    }
    ctx_free(tmp);

    gzclose(link_gz);
    fclose(link_tmp_fh);
  }

  // Write histogram to file
  if(hist_fh)
  {
    size_t i, j;
    fprintf(hist_fh, "  ");
    for(j = 1; j < hist_covgsize; j++) fprintf(hist_fh, ",covg.%02zu", j);
    fprintf(hist_fh, "\n");
    for(i = 1; i < hist_distsize; i++) {
      fprintf(hist_fh, "dist.%02zu", i);
      for(j = 1; j < hist_covgsize; j++) {
        fprintf(hist_fh, ",%"PRIu64, hists[i][j]);
      }
      fprintf(hist_fh, "\n");
    }
  }

  if(thresh_fh)
  {
    // Use median of first five cutoffs
    print_suggest_cutoff(6, hist_covgsize, hists, thresh_fh);
  }

  if(hist_fh && hist_fh != stdout) fclose(hist_fh);

  if(list)
  {
    fclose(list_fh);
  }

  if(plot)
  {
    fclose(plot_fh);
  }

  ctx_free(hists);
  cJSON_Delete(newhdr);
  strbuf_dealloc(&link_tmp_path);
  ltree_dealloc(&ltree);
  size_buf_dealloc(&countbuf);
  size_buf_dealloc(&jposbuf);
  strbuf_dealloc(&kmerbuf);
  strbuf_dealloc(&juncsbuf);
  strbuf_dealloc(&seqbuf);
  strbuf_dealloc(&outbuf);

  return EXIT_SUCCESS;
}
