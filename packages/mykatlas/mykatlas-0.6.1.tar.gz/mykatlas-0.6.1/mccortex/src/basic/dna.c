#include "global.h"
#include "dna.h"
#include <ctype.h> // tolower()

const char dna_nuc_to_char_arr[4] = "ACGT";

// 0:Adenine, 1:Cytosine, 2:Guanine, 3:Thymine, 4:N 8:other
const Nucleotide dna_char_to_nuc_arr[256]
  = {8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,0,8,1,8,8,8,2,8,8,8,8,8,8,4,8, // A C G N
     8,8,8,8,3,8,8,8,8,8,8,8,8,8,8,8, // T
     8,0,8,1,8,8,8,2,8,8,8,8,8,8,4,8, // a c g n
     8,8,8,8,3,8,8,8,8,8,8,8,8,8,8,8, // t
     // 128-256
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
     8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8};

// 0:Adenine, 1:Cytosine, 2:Guanine, 3:Thymine, 4:other 8:invalid
const char dna_char_to_vcf_char[256]
  = {  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64,'A','N','C','N','N', // A C
     'N','G','N','N','N','N','N','N','N','N', // G N
     'N','N','N','N','T','N','N','N','N','N', // T
     'N', 91, 92, 93, 94, 95, 96,'A','N','C', // a c
     'N','N','N','G','N','N','N','N','N','N', // g
     'N','N','N','N','N','N','T','N','N','N', // n t
     'N','N','N',123,124,125,126,127,128,129,
     130,131,132,133,134,135,136,137,138,139,
     140,141,142,143,144,145,146,147,148,149,
     150,151,152,153,154,155,156,157,158,159,
     160,161,162,163,164,165,166,167,168,169,
     170,171,172,173,174,175,176,177,178,179,
     180,181,182,183,184,185,186,187,188,189,
     190,191,192,193,194,195,196,197,198,199,
     200,201,202,203,204,205,206,207,208,209,
     210,211,212,213,214,215,216,217,218,219,
     220,221,222,223,224,225,226,227,228,229,
     230,231,232,233,234,235,236,237,238,239,
     240,241,242,243,244,245,246,247,248,249,
     250,251,252,253,254,255};

const unsigned char dna_complement_char_arr[256]
  = {  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64,'T','B','G','D','E', // A C
     'F','C','H','I','J','K','L','M','N','O', // G N
     'P','Q','R','S','A','U','V','W','X','Y', // T
     'Z', 91, 92, 93, 94, 95, 96,'t','b','g', // a c
     'd','e','f','c','h','i','j','k','l','m', // g
     'n','o','p','q','r','s','a','u','v','w', // n t
     'x','y','z',123,124,125,126,127,128,129,
     130,131,132,133,134,135,136,137,138,139,
     140,141,142,143,144,145,146,147,148,149,
     150,151,152,153,154,155,156,157,158,159,
     160,161,162,163,164,165,166,167,168,169,
     170,171,172,173,174,175,176,177,178,179,
     180,181,182,183,184,185,186,187,188,189,
     190,191,192,193,194,195,196,197,198,199,
     200,201,202,203,204,205,206,207,208,209,
     210,211,212,213,214,215,216,217,218,219,
     220,221,222,223,224,225,226,227,228,229,
     230,231,232,233,234,235,236,237,238,239,
     240,241,242,243,244,245,246,247,248,249,
     250,251,252,253,254,255};

/**
 * Reverse complement a string, copying the result into a different memory
 * location. src,dst can point to the same string.
 * DOES NOT NULL TERMINATE DST
 *
 * @param length is the length in number of bases
 * @param dst characters read from dst
 * @param src result written to memory pointed to by src
 * @return pointer to dst
**/
char* dna_revcomp_str(char *dst, const char *src, size_t length)
{
  size_t i, j;
  char a, b;

  ctx_assert(strlen(src) >= length);

  if(length == 0) { return dst; }
  if(length == 1) { dst[0] = dna_char_complement(src[0]); return dst; }

  for(i = 0, j = length-1; i <= j; i++, j--) {
    a = dna_char_complement(src[i]);
    b = dna_char_complement(src[j]);
    dst[i] = b;
    dst[j] = a;
  }

  return dst;
}

// Generate a random dna str "ACGT" of length `len`, terminated with a \0 at
// position `len`. `str` must be at least of size `len`+1.
// Useful for testing
char* dna_rand_str(char *str, size_t len)
{
  const char bases[4] = "ACGT";
  size_t i, r = 0;

  if(len == 0) { str[0] = '\0'; return str; }

  for(i = 0; i < len; i++) {
    if((i & 15) == 0) r = (size_t)rand(); // 2 bits per cycle, 32 bits in rand()
    str[i] = bases[r&3];
    r >>= 2;
  }

  str[len] = '\0';

  return str;
}

// compare a with the reverse complement of b
int dna_revncasecmp(const char *a, const char *b, size_t len)
{
  ctx_assert(strlen(a) >= len);
  ctx_assert(strlen(b) >= len);

  size_t i, j;
  for(i = 0, j = len-1; i < len; i++, j--) {
    int cmp = (int)tolower(a[i]) - tolower(dna_complement_char_arr[(uint8_t)b[j]]);
    if(cmp) return cmp;
  }
  return 0;
}

// out must be at least 11 bytes long: "A, C, G, T"
size_t dna_bases_list_to_str(const bool bases[4], char *out)
{
  size_t i;
  char *str = out;
  const char seq[] = "ACGT";
  for(i = 0; i < 4; i++) {
    if(bases[i]) {
      if(str > out) { memcpy(str, ", ", 2); str += 2; }
      *str = seq[i];
      str++;
    }
  }
  *str = '\0';
  return str-out;
}
