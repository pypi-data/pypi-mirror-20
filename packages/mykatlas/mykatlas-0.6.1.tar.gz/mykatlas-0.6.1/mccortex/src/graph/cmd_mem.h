#ifndef CMD_MEM_H_
#define CMD_MEM_H_

#include "cmd.h"

struct MemArgs
{
  bool num_kmers_set, mem_to_use_set;
  size_t num_kmers, mem_to_use;
  size_t min_kmers, max_kmers;
};

#define MEM_ARGS_INIT {.num_kmers_set = false, .num_kmers = DEFAULT_NKMERS, \
                       .mem_to_use_set = false, .mem_to_use = DEFAULT_MEM, \
                       .min_kmers = 0, .max_kmers = SIZE_MAX}

void cmd_mem_args_set_memory(struct MemArgs *mem, const char *arg);
void cmd_mem_args_set_nkmers(struct MemArgs *mem, const char *arg);

// If your command accepts -n <kmers> and -m <mem> this may be useful
//  `entry_bits` is memory per node, including hash table BinaryKmer
// Resulting graph_mem is always < args->mem_to_use
// min_num_kmers and max_num_kmers are kmers that need to be held in the graph
// (i.e. min_num_kmers/IDEAL_OCCUPANCY)
size_t cmd_get_kmers_in_hash(size_t mem_to_use, bool mem_to_use_set,
                             size_t num_kmers, bool num_kmers_set,
                             size_t entry_bits,
                             int64_t min_num_kmer_req,
                             int64_t max_num_kmers_req,
                             bool use_mem_limit, size_t *graph_mem_ptr);

// Check memory against args->mem_to_use and total RAM
void cmd_check_mem_limit(size_t mem_to_use, size_t mem_requested);

// Print memory being used
void cmd_print_mem(size_t mem_bytes, const char *name);

#endif /* CMD_MEM_H_ */
