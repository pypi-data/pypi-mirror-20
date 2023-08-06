#ifndef SUBGRAPH_H_
#define SUBGRAPH_H_

#include "seq_file/seq_file.h"

#include "db_graph.h"

//
// Breadth first search from seed kmers,
// then remove all kmers that weren't touched
//

/**
 * @dist        How many steps away from seed kmers to take
 * @invert      If true, means only save kmers not touched
 * @fringe_mem  How many bytes can be used to remember the fringe of
                the breadth first search (we use 8 bytes per kmer)
 * @kmer_mask   Bit array (one bit per kmer) of zero'd memory
 */
void subgraph_from_reads(dBGraph *db_graph, size_t nthreads, size_t dist,
                         bool invert, bool grab_unitigs,
                         size_t fringe_mem, uint8_t *kmer_mask,
                         seq_file_t **files, size_t num_files);

/**
 * @param nthreads   Number of threads to use
 * @param dist       How many steps away from seed kmers to take
 * @param invert     If true, means only save kmers not touched
 * @param fringe_mem How many bytes can be used to remember the fringe of
 *                   the breadth first search (we use 8 bytes per kmer)
 * @param kmer_mask  Bit array (one bit per kmer) of zero'd memory
 */
void subgraph_from_seq(dBGraph *db_graph, size_t nthreads, size_t dist,
                       bool invert, bool grab_unitigs,
                       size_t fringe_mem, uint8_t *kmer_mask,
                       char **seqs, size_t *seqlens, size_t num_seqs);

#endif /* SUBGRAPH_H_ */
