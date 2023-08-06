#include "global.h"
#include "all_tests.h"
#include "db_graph.h"
#include "db_node.h"
#include "build_graph.h"

#include <math.h>

static Covg kmer_get_covg(const char *kmer, const dBGraph *db_graph)
{
  dBNode node = db_graph_find_str(db_graph, kmer);
  return db_node_get_covg(db_graph, node.key, 0);
}

void test_build_graph()
{
  test_status("Testing remove PCR duplicates in build_graph.c");

  // Construct 1 colour graph with kmer-size=11
  dBGraph graph;
  size_t kmer_size = 19, ncols = 1;

  db_graph_alloc(&graph, kmer_size, ncols, ncols, 1024,
                 DBG_ALLOC_EDGES | DBG_ALLOC_COVGS |
                 DBG_ALLOC_BKTLOCKS | DBG_ALLOC_READSTRT);

  read_t r1, r2;
  seq_read_alloc(&r1);
  seq_read_alloc(&r2);

  SeqLoadingStats stats;
  memset(&stats, 0, sizeof(stats));
  size_t total_seq = 0, contigs_loaded = 0;

  SeqLoadingPrefs prefs = {.fq_cutoff = 9, .hp_cutoff = 9,
                           .matedir = READPAIR_FF,
                           .colour = 0, .remove_pcr_dups = true};

  // Test loading empty reads are ok
  build_graph_from_reads_mt(&r1, &r2, 0, 0, &prefs, &stats, &graph);

  // Load a pair of reads
  seq_read_set(&r1, "CTACGATGTATGCTTAGCTGTTCCG");
  seq_read_set(&r2, "TAGAACGTTCCCTACACGTCCTATG");
  build_graph_from_reads_mt(&r1, &r2, 0, 0, &prefs, &stats, &graph);
  TASSERT(kmer_get_covg("CTACGATGTATGCTTAGCT", &graph) == 1);
  TASSERT(kmer_get_covg("TAGAACGTTCCCTACACGT", &graph) == 1);
  total_seq += r1.seq.end + r2.seq.end;
  contigs_loaded += 2;

  // Check we filter out a duplicate FF
  seq_read_set(&r1, "CTACGATGTATGCTTAGCTAATGAT");
  seq_read_set(&r2, "TAGAACGTTCCCTACACGTTGTTTG");
  build_graph_from_reads_mt(&r1, &r2, 0, 0, &prefs, &stats, &graph);
  TASSERT(kmer_get_covg("CTACGATGTATGCTTAGCT", &graph) == 1);
  TASSERT(kmer_get_covg("TAGAACGTTCCCTACACGT", &graph) == 1);

  // Check we filter out a duplicate FR
  // revcmp TAGAACGTTCCCTACACGT -> AGCTAAGCATACATCGTAG
  seq_read_set(&r1, "CTACGATGTATGCTTAGCTCCGAAG");
  seq_read_set(&r2, "AGACTAAGCTAAGCATACATCGTAG");
  prefs.matedir = READPAIR_FR;
  build_graph_from_reads_mt(&r1, &r2, 0, 0, &prefs, &stats, &graph);
  TASSERT(kmer_get_covg("CTACGATGTATGCTTAGCT", &graph) == 1);
  TASSERT(kmer_get_covg("TAGAACGTTCCCTACACGT", &graph) == 1);

  // Check we filter out a duplicate RF
  // revcmp CTACGATGTATGCTTAGCT -> ACGTGTAGGGAACGTTCTA
  seq_read_set(&r1, "AGGAGTTGTCTTCTAAGGAAACGTGTAGGGAACGTTCTA");
  seq_read_set(&r2, "TAGAACGTTCCCTACACGTTTTCCACGAGTTAATCTAAG");
  prefs.matedir = READPAIR_RF;
  build_graph_from_reads_mt(&r1, &r2, 0, 0, &prefs, &stats, &graph);
  TASSERT(kmer_get_covg("CTACGATGTATGCTTAGCT", &graph) == 1);
  TASSERT(kmer_get_covg("TAGAACGTTCCCTACACGT", &graph) == 1);

  // Check we filter out a duplicate RF
  // revcmp CTACGATGTATGCTTAGCT -> ACGTGTAGGGAACGTTCTA
  // revcmp TAGAACGTTCCCTACACGT -> AGCTAAGCATACATCGTAG
  seq_read_set(&r1, "AACCCTAAAAACGTGTAGGGAACGTTCTA");
  seq_read_set(&r2, "AATGCGTGTTAGCTAAGCATACATCGTAG");
  prefs.matedir = READPAIR_RR;
  build_graph_from_reads_mt(&r1, &r2, 0, 0, &prefs, &stats, &graph);
  TASSERT(kmer_get_covg("CTACGATGTATGCTTAGCT", &graph) == 1);
  TASSERT(kmer_get_covg("TAGAACGTTCCCTACACGT", &graph) == 1);

  // Check add a duplicate when filtering is turned off
  seq_read_set(&r1, "CTACGATGTATGCTTAGCTAATGAT");
  seq_read_set(&r2, "TAGAACGTTCCCTACACGTTGTTTG");
  prefs.matedir = READPAIR_FF;
  prefs.remove_pcr_dups = false;
  build_graph_from_reads_mt(&r1, &r2, 0, 0, &prefs, &stats, &graph);
  TASSERT(kmer_get_covg("CTACGATGTATGCTTAGCT", &graph) == 2);
  TASSERT(kmer_get_covg("TAGAACGTTCCCTACACGT", &graph) == 2);
  total_seq += r1.seq.end + r2.seq.end;
  contigs_loaded += 2;

  // Check SE duplicate removal with FF reads
  seq_read_set(&r1, "CTACGATGTATGCTTAGCTAGTGTGATATCCTCC");
  prefs.matedir = READPAIR_FF;
  prefs.remove_pcr_dups = true;
  build_graph_from_reads_mt(&r1, NULL, 0, 0, &prefs, &stats, &graph);
  TASSERT(kmer_get_covg("CTACGATGTATGCTTAGCT", &graph) == 2);

  // Check SE duplicate removal with RR reads
  seq_read_set(&r1, "GCGTTACCTACTGACAGCTAAGCATACATCGTAG");
  prefs.matedir = READPAIR_RR;
  prefs.remove_pcr_dups = true;
  build_graph_from_reads_mt(&r1, NULL, 0, 0, &prefs, &stats, &graph);
  TASSERT(kmer_get_covg("TAGAACGTTCCCTACACGT", &graph) == 2);

  // Check we don't filter out reads when kmers in opposite direction
  // revcmp CTACGATGTATGCTTAGCT -> ACGTGTAGGGAACGTTCTA
  // revcmp TAGAACGTTCCCTACACGT -> AGCTAAGCATACATCGTAG
  seq_read_set(&r1, "ACGTGTAGGGAACGTTCTA""CTTCTACCGGAGGAT");
  seq_read_set(&r2, "AGCTAAGCATACATCGTAG""TACAATGCACCCTCC");
  prefs.matedir = READPAIR_FF;
  prefs.remove_pcr_dups = true;
  build_graph_from_reads_mt(&r1, &r2, 0, 0, &prefs, &stats, &graph);
  TASSERT(kmer_get_covg("CTACGATGTATGCTTAGCT", &graph) == 3);
  TASSERT(kmer_get_covg("TAGAACGTTCCCTACACGT", &graph) == 3);
  total_seq += r1.seq.end + r2.seq.end;
  contigs_loaded += 2;

  // shouldn't work a second time
  // revcmp CTACGATGTATGCTTAGCT -> ACGTGTAGGGAACGTTCTA
  // revcmp TAGAACGTTCCCTACACGT -> AGCTAAGCATACATCGTAG
  seq_read_set(&r1, "ACGTGTAGGGAACGTTCTA""CTTCTACCGGAGGAT");
  seq_read_set(&r2, "AGCTAAGCATACATCGTAG""TACAATGCACCCTCC");
  prefs.matedir = READPAIR_FF;
  prefs.remove_pcr_dups = true;
  build_graph_from_reads_mt(&r1, &r2, 0, 0, &prefs, &stats, &graph);
  TASSERT(kmer_get_covg("CTACGATGTATGCTTAGCT", &graph) == 3);
  TASSERT(kmer_get_covg("TAGAACGTTCCCTACACGT", &graph) == 3);

  // Update statistics
  graph_info_update_stats(&graph.ginfo[0], &stats);

  double mean_read_length = ((double)total_seq/contigs_loaded)+0.5;

  size_t g_total_seq = graph.ginfo[0].total_sequence;
  size_t g_mean_read_length = graph.ginfo[0].mean_read_length;

  // test_status("g_total_seq: %zu total_seq: %zu", g_total_seq, total_seq);
  // test_status("g_mean_read_length: %zu mean_read_length: %f",
  //             g_mean_read_length, mean_read_length);

  TASSERT2(g_total_seq == total_seq, "%zu %zu", g_total_seq, total_seq);
  TASSERT(fabs(g_mean_read_length - mean_read_length) <= 0.5);

  seq_read_dealloc(&r1);
  seq_read_dealloc(&r2);

  db_graph_dealloc(&graph);
}
