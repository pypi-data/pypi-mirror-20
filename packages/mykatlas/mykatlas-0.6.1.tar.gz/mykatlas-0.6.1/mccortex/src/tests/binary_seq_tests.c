#include "global.h"
#include "all_tests.h"
#include "binary_seq.h"

#define NTESTS 200
#define TLEN 256 /* power of two */

#define int2cmp(i) ((i) < 0 ? -1 : (i > 0))

static void _binary_seq_cmp_test(const char *aa, size_t lena,
                                 const char *bb, size_t lenb,
                                 int cmp)
{
  uint8_t a[100], b[100];
  size_t i;
  int cmp1, cmp2;
  for(i = 0; i < 100; i++) { a[i] = i; b[i] = 256-i; } // random assignment
  binary_seq_from_str(aa, lena, a);
  binary_seq_from_str(bb, lenb, b);
  cmp1 = binary_seqs_cmp(a,lena,b,lenb);
  cmp2 = binary_seqs_cmp(b,lenb,a,lena);
  cmp1 = int2cmp(cmp1);
  cmp2 = int2cmp(cmp2);
  TASSERT2(cmp1 ==  cmp, "Got '%.*s' '%.*s' %i", (int)lena, aa, (int)lenb, bb, cmp);
  TASSERT2(cmp2 == -cmp, "Got '%.*s' '%.*s' %i", (int)lena, aa, (int)lenb, bb, cmp);
}

static void test_binary_seq_cmp()
{
  _binary_seq_cmp_test("A",1,"",0,1);
  _binary_seq_cmp_test("",0,"",0,0);

  const char seq[] = "AGCGATCCGA";
  size_t i, j, len = strlen(seq);

  for(i = 0; i <= len; i++) {
    for(j = 0; j <= len; j++) {
      _binary_seq_cmp_test(seq, i, seq, j, (i < j ? -1 : (i > j)));
    }
  }
}

static void test_binary_seq_rev_cmp()
{
  test_status("binary_seq_reverse_complement() binary_seq_to_str()");

  uint8_t data[TLEN], tmp[TLEN];
  char str[4*TLEN+1], rev[4*TLEN+1], restore[4*TLEN+1];
  size_t i, j, k, nbases;

  for(i = 0; i < NTESTS; i++)
  {
    // Get random sequence, mask top byte, convert to string
    rand_bytes(data, TLEN);
    nbases = rand() & (4*TLEN-1);
    binary_seq_to_str(data, nbases, str);

    // Reverse complement, convert to string
    memcpy(tmp, data, TLEN);
    binary_seq_reverse_complement(tmp, nbases);
    binary_seq_to_str(tmp, nbases, rev);

    // Check strings match
    for(j = 0, k = nbases-1; j < nbases; j++, k--)
      TASSERT(str[j] == dna_char_complement(rev[k]));

    // Reverse complement again, check we get back same binary_seq+string
    binary_seq_reverse_complement(tmp, nbases);
    binary_seq_to_str(tmp, nbases, restore);
    TASSERT(memcmp(data, tmp, TLEN) == 0);
    TASSERT(strncmp(str, restore, nbases) == 0);
  }
}

static void _binary_seq_str_test(const char *seq)
{
  size_t len = strlen(seq);
  char str[len+1];
  uint8_t data[len+1];

  binary_seq_from_str(seq, len, data);
  binary_seq_to_str(data, len, str);
  TASSERT2(strcmp(seq, str) == 0, "1: '%s' vs '%s'", seq, str);
}

static void test_binary_seq_str()
{
  test_status("Testing binary_seq_[to|from]_str()");

  _binary_seq_str_test("");
  _binary_seq_str_test("A");
  _binary_seq_str_test("C");
  _binary_seq_str_test("G");
  _binary_seq_str_test("T");
  _binary_seq_str_test("AAAAAA");
  _binary_seq_str_test("TATACATA");
  _binary_seq_str_test("AGACAATCAGAG");
  _binary_seq_str_test("TTTTTTTTTTTTTTTT");

  // random tests
  char str[TLEN];
  size_t i, nbases;

  for(i = 0; i < NTESTS; i++) {
    nbases = rand() & (TLEN-1);
    rand_bases(str, nbases);
    str[nbases] = '\0';
    _binary_seq_str_test(str);
  }
}

static void test_binary_seq_cpy()
{
  test_status("Testing shift copy");

  uint8_t d0[10] = {0,0,0,0,0,0,0,0,0,0};
  uint8_t out[100];
  size_t i, j, shift, len;
  size_t t;

  // Shifting an array of zeros results in zeros
  // surrounding array should remain all ones
  memset(out, 0xff, 100);
  for(shift = 0; shift < 4; shift++) {
    binary_seq_cpy_fast(out+1, d0, shift, 15); // first 4 bytes
    TASSERT(out[0]==0xff);
    for(i = 1; i < 5; i++) TASSERT(out[i]==0);
    for(i = 5; i < 100; i++) TASSERT(out[i]==0xff);
  }

  // Random testing
  uint8_t in[TLEN], slow[TLEN], med[TLEN], fast[TLEN];
  char tmp1[TLEN*8+1], tmp2[TLEN*8+1];

  for(t = 0; t < NTESTS; t++) {
    memset(slow, 0xff, TLEN);
    memset(med,  0xff, TLEN);
    memset(fast, 0xff, TLEN);
    rand_bytes(in, TLEN);

    len = rand() % (TLEN/2+1);
    shift = rand() % 4;
    // printf("len: %zu shift: %zu\n", len, shift);

    binary_seq_cpy_slow(slow, in, shift, len);
    binary_seq_cpy_med(med, in, shift, len);
    binary_seq_cpy_fast(fast, in, shift, len);

    if(len > shift) {
      // Check with string method to be extra safe
      bitarr_tostr(in,   TLEN, tmp1);
      bitarr_tostr(slow, TLEN, tmp2);
      for(i = 8*TLEN-1; i != 8*TLEN-(len-shift)*2; i--)
        TASSERT(tmp1[i-shift*2] == tmp2[i]);
    }

    // Check all results match
    for(i = 0; i < TLEN && slow[i] == med[i]; i++);
    for(j = 0; j < TLEN && med[j] == fast[j]; j++);

    // Print output if arrays don't match
    if(i < TLEN || j < TLEN) {
      printf("len: %zu shift: %zu\n", len, shift);
      bitarr_tostr(in,   TLEN, tmp1); printf("in:  %s\n", tmp1);
      bitarr_tostr(slow, TLEN, tmp1); printf("slw: %s\n", tmp1);
      bitarr_tostr(med,  TLEN, tmp1); printf("med: %s\n", tmp1);
      bitarr_tostr(fast, TLEN, tmp1); printf("fst: %s\n", tmp1);
      printf("\n");
    }

    TASSERT(i == TLEN);
    TASSERT(j == TLEN);
  }
}

static void print_nucs(Nucleotide *nucs, size_t len) {
  size_t i;
  for(i = 0; i < len; i++) printf(" %u", (uint32_t)nucs[i]);
}

static void test_pack_unpack()
{
  test_status("Testing binary_seq_pack() / binary_seq_unpack()");

  uint8_t packed[TLEN];
  Nucleotide bases0[TLEN], bases1[TLEN];
  char str[8*TLEN+1];
  size_t i, t, len;

  // Run NTESTS
  // randomize bases0, pack into packed, unpack into bases1
  // compare bases0 vs bases1
  for(t = 0; t < NTESTS; t++) {
    len = rand() % (TLEN/2+1);
    rand_nucs(bases0, len);
    memset(packed, 0, TLEN);
    binary_seq_pack(packed, bases0, len);
    binary_seq_unpack(packed, bases1, len);

    for(i = 0; i < len && bases0[i] == bases1[i]; i++);

    // print output if input != output
    if(i != len) {
      bitarr_tostr(packed, (len*2+7)/8, str);
      printf("bases0: "); print_nucs(bases0, len); printf("\n");
      printf("bases1: "); print_nucs(bases1, len); printf("\n");
      printf("packed: %s\n", str);
    }

    TASSERT(i == len);
  }
}

static void _manual_test_pack_cpy_unpack(const char *seq, size_t len, size_t shift)
{
  TASSERT(len >= shift);
  size_t i, nbytes = binary_seq_mem(len), outlen = len - shift;
  Nucleotide bases[len], bases2[len];
  uint8_t packed[nbytes], packed2[nbytes];
  char seq2[len+1];

  // convert to bases
  for(i = 0; i < len; i++) bases[i] = dna_char_to_nuc(seq[i]);

  // bases -> packed
  binary_seq_pack(packed, bases, len);

  // shift cpy
  binary_seq_cpy(packed2, packed, shift, len);

  // packed -> bases
  binary_seq_unpack(packed2, bases2, outlen);

  // convert to char
  for(i = 0; i < outlen; i++) seq2[i] = dna_nuc_to_char(bases2[i]);
  seq2[outlen] = '\0';

  TASSERT2(strncmp(seq+shift, seq2, outlen) == 0, "in: %s\nout:%s\n", seq, seq2);
}

static void _test_pack_cpy_unpack_shifts(const char *seq, size_t len)
{
  size_t shift;
  for(shift = 0; shift <= len; shift++)
    _manual_test_pack_cpy_unpack(seq, len, shift);
}

static void test_pack_cpy_unpack()
{
  test_status("Testing pack()+cpy()+unpack()");

  _test_pack_cpy_unpack_shifts("CTA", 3);
  _test_pack_cpy_unpack_shifts("C", 1);
  _test_pack_cpy_unpack_shifts("CAGACAG", 7);
}

void test_binary_seq_functions()
{
  test_binary_seq_rev_cmp();
  test_binary_seq_str();
  test_binary_seq_cpy();
  test_binary_seq_cmp();
  test_pack_unpack();
  test_pack_cpy_unpack();
}
