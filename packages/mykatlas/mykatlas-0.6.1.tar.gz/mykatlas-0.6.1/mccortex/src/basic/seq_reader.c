#include "global.h"
#include "seq_reader.h"
#include "util.h"
#include "file_util.h"
#include "dna.h"

#include "seq_file/seq_file.h"

const char *MP_DIR_STRS[] = {"FF", "FR", "RF", "RR"};

// Load all reads from files into a read buffer and close the seq_files
// Returns the number of reads loaded
size_t seq_load_all_reads(seq_file_t **seq_files, size_t num_files,
                          ReadBuffer *rbuf)
{
  status("Loading sequences...");

  size_t i, nreads = rbuf->len;
  read_t r;
  seq_read_alloc(&r);
  for(i = 0; i < num_files; i++) {
    status("  file: %s", seq_files[i]->path);
    while(seq_read_primary(seq_files[i], &r) > 0) {
      read_buf_push(rbuf, &r, 1); // copy read
      seq_read_alloc(&r); // allocate new read
    }
    seq_close(seq_files[i]);
  }
  seq_read_dealloc(&r);

  return rbuf->len - nreads;
}

// returns -1 if we cannot calc
int64_t seq_est_seq_bases(seq_file_t **files, size_t nfiles)
{
  size_t i;
  int64_t est_num_bases = 0;

  for(i = 0; i < nfiles; i++) {
    if(strcmp(files[i]->path,"-") != 0) {
      off_t fsize = futil_get_file_size(files[i]->path);
      if(fsize < 0) warn("Cannot get file size: %s", files[i]->path);
      else {
        if(seq_is_fastq(files[i]) || seq_is_sam(files[i])) fsize /= 2;
        if(futil_path_has_extension(files[i]->path,".gz")) fsize *= 4;
        est_num_bases += fsize;
      }
    }
    else return -1;
  }
  return est_num_bases;
}

// cut-offs:
//  > quality_cutoff valid
//  < homopolymer_cutoff valid

// Search for first valid kmer starting from position `offset`
// Returns index of first kmer or seqlen if no kmers
size_t seq_contig_start2(const char *seq, size_t seqlen,
                         const char *qual, size_t quallen,
                         size_t offset, size_t kmer_size,
                         uint8_t qual_cutoff, uint8_t hp_cutoff)
{
  if(!qual || !quallen) { qual = NULL; quallen = 0; }

  size_t kmerend, pos = offset;
  while((kmerend = pos+kmer_size) <= seqlen)
  {
    // Check for invalid bases
    size_t i = kmerend;
    while(i > pos && char_is_acgt(seq[i-1])) i--;

    if(i > pos) {
      pos = i;
      continue;
    }

    // Check for low qual values
    if(qual && qual_cutoff > 0)
    {
      i = MIN2(kmerend, quallen);
      while(i > pos && qual[i-1] > qual_cutoff) i--;

      if(i > pos) {
        pos = i;
        continue;
      }
    }

    // Check for homopolymer runs
    if(hp_cutoff > 0)
    {
      size_t run_length = 1;
      for(i = kmerend-1; i > pos; i--)
      {
        if(seq[i-1] == seq[i])
        {
          run_length++;
          if(run_length == (size_t)hp_cutoff) break;
        }
        else run_length = 1;
      }

      if(i > pos)
      {
        pos = i;
        continue;
      }
    }

    return pos;
  }

  return seqlen;
}

size_t seq_contig_start(const read_t *r, size_t offset, size_t kmer_size,
                        uint8_t qual_cutoff, uint8_t hp_cutoff)
{
  return seq_contig_start2(r->seq.b, r->seq.end, r->qual.b, r->qual.end,
                           offset, kmer_size, qual_cutoff, hp_cutoff);
}

// *search_start is the next position to pass to seq_contig_start
size_t seq_contig_end2(const char *seq, size_t seqlen,
                       const char *qual, size_t quallen,
                       size_t contig_start, size_t kmer_size,
                       uint8_t qual_cutoff, uint8_t hp_cutoff,
                       size_t *search_start)
{
  if(!qual || !quallen) { qual = NULL; quallen = 0; }

  size_t contig_end = contig_start+kmer_size;

  size_t hp_run = 1;
  if(hp_cutoff > 0)
  {
    // Get the length of the hp run at the end of the current kmer
    // kmer won't contain a run longer than hp_run-1
    while(hp_run < contig_end && seq[contig_end-1-hp_run] == seq[contig_end-1])
      hp_run++;
  }

  for(; contig_end < seqlen; contig_end++)
  {
    if(!char_is_acgt(seq[contig_end]) ||
       (contig_end < quallen && qual[contig_end] < qual_cutoff))
    {
      break;
    }

    // Check hp
    if(hp_cutoff > 0)
    {
      if(seq[contig_end] == seq[contig_end-1])
      {
        hp_run++;
        if(hp_run >= (size_t)hp_cutoff) break;
      }
      else hp_run = 1;
    }
  }

  if(hp_cutoff > 0 && hp_run >= (size_t)hp_cutoff)
    *search_start = contig_end - (size_t)hp_cutoff + 1;
  else
    *search_start = contig_end;

  return contig_end;
}

// Returns the index after the last good base
// *search_start is the next position to pass to seq_contig_start
size_t seq_contig_end(const read_t *r, size_t contig_start, size_t kmer_size,
                      uint8_t qual_cutoff, uint8_t hp_cutoff,
                      size_t *search_start)
{
  return seq_contig_end2(r->seq.b, r->seq.end, r->qual.b, r->qual.end,
                         contig_start, kmer_size, qual_cutoff, hp_cutoff,
                         search_start);
}

// Warning bits
#define WFLAG_INVALID_BASE  1
#define WFLAG_QLEN_MISMATCH 2
#define WFLAG_QUAL_TOOSMALL 4
#define WFLAG_QUAL_TOOBIG   8

// Takes, updates and returns warnings that were printed
// Warnings are only printed once per file
static uint8_t check_new_read(const read_t *r, uint8_t qmin, uint8_t qmax,
                              const char *path, uint8_t warn_flags)
{
  // Test if we've already warned about issue (e.g. bad base) before checking
  if(!(warn_flags & WFLAG_INVALID_BASE))
  {
    const char *tmp;
    for(tmp = r->seq.b; char_is_acgtn(*tmp); tmp++) {}

    if(*tmp != '\0') {
      warn("Invalid base '%c' [read: %s; path: %s]\n", *tmp, r->name.b, path);
      warn_flags |= WFLAG_INVALID_BASE;
    }
  }

  // Check quality string
  if(r->qual.end > 0)
  {
    if(r->seq.end != r->qual.end && !(warn_flags & WFLAG_QLEN_MISMATCH))
    {
      warn("Quality string is not the same length as sequence [%i vs %i; read: %s; "
           "path: %s]", (int)r->qual.end, (int)r->seq.end, r->name.b, path);
      warn_flags |= WFLAG_QLEN_MISMATCH;
    }

    // Check out-of-range qual string
    if(!(warn_flags & WFLAG_QUAL_TOOSMALL) || !(warn_flags & WFLAG_QUAL_TOOBIG))
    {
      // In profiling this was found to be the fastest min/max method
      const uint8_t *tmp = (uint8_t*)r->qual.b;
      uint8_t min = *tmp, max = *tmp;

      for(++tmp; *tmp != '\0'; tmp++) {
        min = MIN2(min, *tmp);
        max = MAX2(max, *tmp);
      }

      if(min < qmin && !(warn_flags & WFLAG_QUAL_TOOSMALL))
      {
        warn("FASTQ qual too small [%i < %i..%i; read: %s; path: %s]",
             min, qmin, qmax, r->name.b, path);
        warn_flags |= WFLAG_QUAL_TOOSMALL;
      }
      if(max > qmax && !(warn_flags & WFLAG_QUAL_TOOBIG))
      {
        warn("FASTQ qual too big [%i > %i..%i; read: %s; path: %s]",
             max, qmin, qmax, r->name.b, path);
        warn_flags |= WFLAG_QUAL_TOOBIG;
      }
    }
  }

  // Return which warnings have been printed
  return warn_flags;
}

// Load reads into a buffer and use them to guess the quality score offset
// Returns -1 if no quality scores
// Defaults to 0 if not recognisable (offset:33, min:33, max:126)
static inline int guess_fastq_format(seq_file_t *sf)
{
  // Detect fastq offset
  int min_qual = INT_MAX, max_qual = INT_MIN;
  int fmt = seq_guess_fastq_format(sf, &min_qual, &max_qual);

  // fmt == -1 if no quality scores found
  if(fmt == -1) {
    if(seq_is_fastq(sf) || seq_is_sam(sf) || seq_is_bam(sf))
      warn("Couldn't find qual scores in %s\n", sf->path);
    return -1;
  }

  status("%s: Qual scores: %s [offset: %i, range: [%i,%i], sample: [%i,%i]]\n",
         sf->path, FASTQ_FORMATS[fmt], FASTQ_OFFSET[fmt],
         FASTQ_MIN[fmt], FASTQ_MAX[fmt], min_qual, max_qual);


  // Test min and max fastq scores
  int qoffset = FASTQ_OFFSET[fmt], qmax = FASTQ_MAX[fmt];

  if(min_qual > qoffset + 20)
  {
    warn("Input file has min quality score %i but qoffset is set to %i: %s\n"
         "  Have you predefined an incorrect fastq offset? "
         "Or is cortex guessing it wrong?", min_qual, qoffset, sf->path);
  }
  else if(max_qual > qmax + 20)
  {
    warn("Input file has max quality score %i but expected qmax is to %i: %s\n"
         "  Have you predefined an incorrect fastq offset? "
         "Or is cortex guessing it wrong?", max_qual, qoffset, sf->path);
  }

  return fmt;
}

void seq_parse_interleaved_sf(seq_file_t *sf, uint8_t ascii_fq_offset,
                              read_t *r1, read_t *r2,
                              void (*read_func)(read_t *_r1, read_t *_r2,
                                                uint8_t _qoffset1,
                                                uint8_t _qoffset2,
                                                void *_ptr),
                              void *reader_ptr)
{
  status("[seq] Reading a (possibly) interleaved file (expect both S.E. & P.E. reads)");

  // Guess offset if needed
  uint8_t qoffset = ascii_fq_offset;
  uint8_t qmin = ascii_fq_offset, qmax = 126;
  int format;

  if(ascii_fq_offset == 0 && (format = guess_fastq_format(sf)) != -1)
  {
    qmin = (uint8_t)FASTQ_MIN[format];
    qmax = (uint8_t)FASTQ_MAX[format];
    qoffset = (uint8_t)FASTQ_OFFSET[format];
  }

  read_t *r[2] = {r1,r2};
  int ridx = 0, s;
  uint8_t warn_flags = 0;
  size_t num_se_reads = 0, num_pe_pairs = 0;

  while((s = seq_read_primary(sf, r[ridx])) > 0)
  {
    warn_flags = check_new_read(r[ridx], qmin, qmax, sf->path, warn_flags);

    if(ridx)
    {
      // ridx == 1
      if(seq_read_names_cmp(r[0]->name.b, r[1]->name.b) == 0) {
        // Either read may be the first in the pair if from SAM/BAM
        int r0 = (r[1]->from_sam && seq_read_bam(r[1])->core.flag & BAM_FREAD1);
        read_func(r[r0], r[!r0], qoffset, qoffset, reader_ptr);
        num_pe_pairs++;
        ridx = 0;
      } else {
        read_func(r[0], NULL, qoffset, 0, reader_ptr);
        num_se_reads++;
        SWAP(r[0], r[1]);
        ridx = 1;
      }
    }
    else ridx = 1;
  }

  // Process last read
  if(ridx == 1) {
    read_func(r[0], NULL, qoffset, 0, reader_ptr);
    num_se_reads++;
  }

  if(s < 0) warn("Input error: %s\n", sf->path);

  char num_se_reads_str[100], num_pe_pairs_str[100];
  ulong_to_str(num_pe_pairs, num_pe_pairs_str);
  ulong_to_str(num_se_reads, num_se_reads_str);
  status("[seq] Loaded %s reads and %s reads pairs (file: %s)",
         num_se_reads_str, num_pe_pairs_str, futil_inpath_str(sf->path));
}

void seq_parse_pe_sf(seq_file_t *sf1, seq_file_t *sf2, uint8_t ascii_fq_offset,
                     read_t *r1, read_t *r2,
                     void (*read_func)(read_t *_r1, read_t *_r2,
                                       uint8_t _qoffset1, uint8_t _qoffset2,
                                       void *_ptr),
                     void *reader_ptr)
{
  if(sf2 == NULL) {
    seq_parse_se_sf(sf1, ascii_fq_offset, r1, read_func, reader_ptr);
    return;
  }

  status("[seq] Parsing sequence files %s %s\n",
         futil_inpath_str(sf1->path), futil_inpath_str(sf2->path));
  // Guess offset if needed
  uint8_t qoffset1 = ascii_fq_offset, qoffset2 = ascii_fq_offset;
  uint8_t qmin1 = ascii_fq_offset, qmin2 = ascii_fq_offset;
  uint8_t qmax1 = 126, qmax2 = 126;

  if(ascii_fq_offset == 0)
  {
    int fmt1, fmt2;
    if((fmt1 = guess_fastq_format(sf1)) != -1) {
      qmin1 = (uint8_t)FASTQ_MIN[fmt1];
      qmax1 = (uint8_t)FASTQ_MAX[fmt1];
      qoffset1 = (uint8_t)FASTQ_OFFSET[fmt1];
    }
    if((fmt2 = guess_fastq_format(sf2)) != -1) {
      qmin2 = (uint8_t)FASTQ_MIN[fmt2];
      qmax2 = (uint8_t)FASTQ_MAX[fmt2];
      qoffset2 = (uint8_t)FASTQ_OFFSET[fmt2];
    }
  }

  // warn_flags keeps track of which of the error msgs have been printed
  // (only print each error msg once per file)
  uint8_t warn_flags = 0;
  int success1, success2;
  size_t num_pe_pairs = 0;

  while(1)
  {
    success1 = seq_read_primary(sf1, r1);
    success2 = seq_read_primary(sf2, r2);

    if(success1 < 0) warn("input error: %s", sf1->path);
    if(success2 < 0) warn("input error: %s", sf2->path);
    if(!success1 != !success2) {
      warn("Different number of reads in pe files [%s; %s]\n",
           sf1->path, sf2->path);
    }
    if(success1 <= 0 || success2 <= 0) break;

    // PE
    // We don't care about read orientation at this point
    warn_flags = check_new_read(r1, qmin1, qmax1, sf1->path, warn_flags);
    warn_flags = check_new_read(r2, qmin2, qmax2, sf2->path, warn_flags);
    read_func(r1, r2, qoffset1, qoffset2, reader_ptr);
    num_pe_pairs++;
  }

  char num_pe_pairs_str[100];
  ulong_to_str(num_pe_pairs, num_pe_pairs_str);
  status("[seq] Loaded %s read pairs (files: %s, %s)", num_pe_pairs_str,
         futil_inpath_str(sf1->path), futil_inpath_str(sf2->path));
}

void seq_parse_se_sf(seq_file_t *sf, uint8_t ascii_fq_offset,
                     read_t *r1,
                     void (*read_func)(read_t *r1, read_t *r2,
                                       uint8_t qoffset1, uint8_t qoffset2,
                                       void *ptr),
                     void *reader_ptr)
{
  status("[seq] Parsing sequence file %s", futil_inpath_str(sf->path));

  // Guess offset if needed
  uint8_t qoffset = ascii_fq_offset;
  uint8_t qmin = ascii_fq_offset, qmax = 126;
  int format;

  if(ascii_fq_offset == 0 && (format = guess_fastq_format(sf)) != -1)
  {
    qmin = (uint8_t)FASTQ_MIN[format];
    qmax = (uint8_t)FASTQ_MAX[format];
    qoffset = (uint8_t)FASTQ_OFFSET[format];
  }

  // warn_flags keeps track of which of the error msgs have been printed
  // (only print each error msg once per file)
  uint8_t warn_flags = 0;
  size_t num_se_reads = 0, num_pe_pairs = 0;
  int s;

  while((s = seq_read_primary(sf, r1)) > 0)
  {
    warn_flags = check_new_read(r1, qmin, qmax, sf->path, warn_flags);
    read_func(r1, NULL, qoffset, 0, reader_ptr);
    num_se_reads++;
  }

  if(s < 0) warn("Input error: %s\n", sf->path);

  char num_se_reads_str[100], num_pe_pairs_str[100];
  ulong_to_str(num_pe_pairs, num_pe_pairs_str);
  ulong_to_str(num_se_reads, num_se_reads_str);
  status("[seq] Loaded %s reads and %s reads pairs (file: %s)",
         num_se_reads_str, num_pe_pairs_str, futil_inpath_str(sf->path));
}

void seq_parse_pe(const char *path1, const char *path2, uint8_t ascii_fq_offset,
                  read_t *r1, read_t *r2,
                  void (*read_func)(read_t *_r1, read_t *_r2,
                                    uint8_t _qoffset1, uint8_t _qoffset2,
                                    void *_ptr),
                  void *reader_ptr)
{
  seq_file_t *sf1, *sf2;
  if((sf1 = seq_open(path1)) == NULL) die("Cannot open: %s", path1);
  if((sf2 = seq_open(path2)) == NULL) die("Cannot open: %s", path2);
  seq_parse_pe_sf(sf1, sf2, ascii_fq_offset, r1, r2, read_func, reader_ptr);
  seq_close(sf1);
  seq_close(sf2);
}

void seq_parse_se(const char *path, uint8_t ascii_fq_offset,
                  read_t *r1,
                  void (*read_func)(read_t *_r1, read_t *_r2,
                                    uint8_t _qoffset1, uint8_t _qoffset2,
                                    void *_ptr),
                  void *reader_ptr)
{
  seq_file_t *sf;
  if((sf = seq_open(path)) == NULL) die("Cannot open: %s", path);
  seq_parse_se_sf(sf, ascii_fq_offset, r1, read_func, reader_ptr);
  seq_close(sf);
}

void seq_reader_orient_mp_FF_or_RR(read_t *r1, read_t *r2, ReadMateDir matedir)
{
  ctx_assert(r1 != NULL);
  ctx_assert(r2 != NULL);
  switch(matedir) {
    case READPAIR_FF: return;
    case READPAIR_FR: seq_read_reverse_complement(r2); return;
    case READPAIR_RF: seq_read_reverse_complement(r1); return;
    case READPAIR_RR: return;
    default: ctx_assert2(0, "Invalid ReadMateDir value: %i", (int)matedir);
  }
  // ^default should be unreachable
}

void seq_reader_orient_mp_FF(read_t *r1, read_t *r2, ReadMateDir matedir)
{
  if(r1 && read_mate_r1(matedir)) seq_read_reverse_complement(r1);
  if(r2 && read_mate_r2(matedir)) seq_read_reverse_complement(r2);
}

// Create chrom->read genome hash
// `chroms` and `genome` must already be allocated
void chrom_hash_load2(seq_file_t **seq_files, size_t num_files,
                      ReadBuffer *chroms, ChromHash *genome)
{
  size_t i;
  khiter_t k;
  int hret;

  seq_load_all_reads(seq_files, num_files, chroms);

  for(i = 0; i < chroms->len; i++)
  {
    seq_read_to_uppercase(&chroms->b[i]);
    seq_read_truncate_name(&chroms->b[i]);
    if(strchr(chroms->b[i].name.b,':') != NULL)
      die("Please remove colons from chromosome names [%s]", chroms->b[i].name.b);
    k = kh_put(kChromHash, genome, chroms->b[i].name.b, &hret);
    if(hret == 0)
      warn("duplicate chromosome (take first only): '%s'", chroms->b[i].name.b);
    else
      kh_value(genome, k) = &chroms->b[i];
  }
}

void chrom_hash_load(char const*const* paths, size_t num_files,
                     ReadBuffer *chroms, ChromHash *genome)
{
  size_t i;

  seq_file_t **ref_files = ctx_malloc(num_files * sizeof(seq_file_t*));

  for(i = 0; i < num_files; i++)
    if((ref_files[i] = seq_open(paths[i])) == NULL)
      die("Cannot read sequence file: %s", paths[i]);

  chrom_hash_load2(ref_files, num_files, chroms, genome);

  ctx_free(ref_files);
}
