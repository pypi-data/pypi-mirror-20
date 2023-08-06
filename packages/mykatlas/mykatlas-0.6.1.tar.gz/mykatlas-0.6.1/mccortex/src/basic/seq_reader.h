#ifndef SEQ_READER_H_
#define SEQ_READER_H_

#include <inttypes.h>
#include "cortex_types.h"

#include "seq_file/seq_file.h"

extern const char *MP_DIR_STRS[];

#include "madcrowlib/madcrow_buffer.h"
madcrow_buffer(read_buf, ReadBuffer, read_t);
madcrow_buffer(seq_file_ptr_buf, SeqFilePtrBuffer, seq_file_t*);

// Load all reads from files into a read buffer and close the seq_files
// Returns the number of reads loaded
size_t seq_load_all_reads(seq_file_t **seq_files, size_t num_files,
                          ReadBuffer *rbuf);

// returns -1 if we cannot calc
int64_t seq_est_seq_bases(seq_file_t **files, size_t nfiles);

// Search for first valid kmer starting from position `offset`
// Returns index of first kmer or seqlen if no kmers
size_t seq_contig_start2(const char *seq, size_t seqlen,
                         const char *qual, size_t quallen,
                         size_t offset, size_t kmer_size,
                         uint8_t qual_cutoff, uint8_t hp_cutoff);

// Returns index of first kmer or r->seq.end if no kmers
size_t seq_contig_start(const read_t *r, size_t offset, size_t kmer_size,
                        uint8_t qual_cutoff, uint8_t hp_cutoff);

// Returns the index after the last good base
size_t seq_contig_end2(const char *seq, size_t seqlen,
                       const char *qual, size_t quallen,
                       size_t contig_start, size_t kmer_size,
                       uint8_t qual_cutoff, uint8_t hp_cutoff,
                       size_t *search_start);

// Returns the index after the last good base
// *search_start is the next position to pass to seq_contig_start
size_t seq_contig_end(const read_t *r, size_t contig_start, size_t kmer_size,
                      uint8_t qual_cutoff, uint8_t hp_cutoff,
                      size_t *search_start);

void seq_parse_pe_sf(seq_file_t *sf1, seq_file_t *sf2, uint8_t ascii_fq_offset,
                     read_t *r1, read_t *r2,
                     void (*read_func)(read_t *_r1, read_t *_r2,
                                       uint8_t _qoffset1, uint8_t _qoffset2,
                                       void *_ptr),
                     void *reader_ptr);

void seq_parse_se_sf(seq_file_t *sf, uint8_t ascii_fq_offset,
                     read_t *r1,
                     void (*read_func)(read_t *_r1, read_t *_r2,
                                       uint8_t _qoffset1, uint8_t _qoffset2,
                                       void *_ptr),
                     void *reader_ptr);

void seq_parse_interleaved_sf(seq_file_t *sf, uint8_t ascii_fq_offset,
                              read_t *r1, read_t *r2,
                              void (*read_func)(read_t *_r1, read_t *_r2,
                                                uint8_t _qoffset1,
                                                uint8_t _qoffset2,
                                                void *_ptr),
                              void *reader_ptr);

void seq_parse_pe(const char *path1, const char *path2, uint8_t ascii_fq_offset,
                  read_t *r1, read_t *r2,
                  void (*read_func)(read_t *_r1, read_t *_r2,
                                    uint8_t _qoffset1, uint8_t _qoffset2,
                                    void *_ptr),
                  void *reader_ptr);

void seq_parse_se(const char *path, uint8_t ascii_fq_offset,
                  read_t *r1,
                  void (*read_func)(read_t *_r1, read_t *_r2,
                                    uint8_t _qoffset1, uint8_t _qoffset2,
                                    void *_ptr),
                  void *reader_ptr);

void seq_reader_orient_mp_FF_or_RR(read_t *r1, read_t *r2, ReadMateDir matedir);
void seq_reader_orient_mp_FF(read_t *r1, read_t *r2, ReadMateDir matedir);

static inline ReadMateDir seq_reader_orient_swap(ReadMateDir matedir) {
  ReadMateDir arr[4] = {READPAIR_FF, READPAIR_RF, READPAIR_FR, READPAIR_RR};
  return arr[(uint32_t)matedir];
}

//
// Load reference genome into hash
//

// Hash map of chromosome name -> sequence
#include "htslib/khash.h"
KHASH_MAP_INIT_STR(kChromHash, read_t*);
typedef khash_t(kChromHash) ChromHash;

#define chrom_hash_init() kh_init(kChromHash)
#define chrom_hash_destroy(genome) kh_destroy(kChromHash, genome)

static inline read_t* chrom_hash_fetch(const ChromHash *genome,
                                       const char *chrom_name)
{
  // Fetch chromosome
  khiter_t k = kh_get(kChromHash, genome, chrom_name);
  if(k == kh_end(genome)) die("Cannot find chrom [%s]", chrom_name);
  return kh_value(genome, k);
}

void chrom_hash_load2(seq_file_t **seq_files, size_t num_files,
                                 ReadBuffer *chroms, ChromHash *genome);

void chrom_hash_load(char const*const* paths, size_t num_files,
                     ReadBuffer *chroms, ChromHash *genome);

//
// Useful MACROs
//

// set qcutoff and hpcutoff to zero to ignore
#define READ_TO_BKMERS(r,kmer_size,qcutoff,hpcutoff,stats,func,...)            \
{                                                                              \
  (stats)->total_bases_read += (r)->seq.end;                                   \
  size_t _num_contigs = 0;                                                     \
  if((r)->seq.end >= (kmer_size)) {                                            \
    size_t _search_start = 0, _start, _end = 0, _base_i, _offset;              \
    BinaryKmer _bkmer; Nucleotide _nuc;                                        \
                                                                               \
    while((_start = seq_contig_start((r), _search_start, (kmer_size),          \
                                     (qcutoff),(hpcutoff))) < (r)->seq.end)    \
    {                                                                          \
      _end = seq_contig_end((r), _start, (kmer_size), (qcutoff), (hpcutoff),   \
                            &_search_start);                                   \
      _num_contigs++;                                                          \
      (stats)->total_bases_loaded += _end - _start;                            \
      (stats)->num_kmers_loaded += (_end - _start) + 1 - (kmer_size);          \
                                                                               \
      _bkmer = binary_kmer_from_str((r)->seq.b + _start, (kmer_size));         \
      _offset = _start;                                                        \
      func(_bkmer, ##__VA_ARGS__);                                             \
      _offset++;                                                               \
                                                                               \
      for(_base_i = _start+(kmer_size); _base_i < _end; _base_i++, _offset++)  \
      {                                                                        \
        _nuc = dna_char_to_nuc((r)->seq.b[_base_i]);                           \
        _bkmer = binary_kmer_left_shift_add(_bkmer, (kmer_size), _nuc);        \
        func(_bkmer, ##__VA_ARGS__);                                           \
      }                                                                        \
    }                                                                          \
    if(_num_contigs == 0) (stats)->num_bad_reads++;                            \
    else (stats)->num_good_reads++;                                            \
  }                                                                            \
}

#endif /* SEQ_READER_H_ */
