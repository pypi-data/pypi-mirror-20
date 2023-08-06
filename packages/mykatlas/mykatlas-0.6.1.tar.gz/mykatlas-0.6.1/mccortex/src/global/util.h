#ifndef UTIL_H_
#define UTIL_H_

//
// Macros
//

#define safe_frac(a,b)    ((b)>0 ? (double)(a) / (b) : 0.0)
#define safe_percent(a,b) ((b)>0 ? (100.0 * (a)) / (b) : 0.0)

#define MEDIAN(arr,len) \
        (!(len)?0:((len)&1?(arr)[(len)/2]:((arr)[(len)/2-1]+(arr)[(len)/2])/2.0))

//
// Number parsing
//

bool parse_entire_int(const char *str, int *result);
bool parse_entire_uint(const char *str, unsigned int *result);
bool parse_entire_ulong(const char *str, unsigned long *result);
bool parse_entire_double(const char *str, double *result);
bool parse_entire_size(const char *str, size_t *result);

// Parse comma-separated lists
int parse_list_doubles(double *list, size_t n, const char *str);
int parse_list_sizes(size_t *list, size_t n, const char *str);

//
// Bits
//
const uint8_t rev_nibble_table[16];
#define rev_nibble_lookup(x) ({ ctx_assert((unsigned)(x) < 16); rev_nibble_table[(unsigned)(x)]; })

extern const uint8_t nibble_popcount_table[16];

#define byte_popcount(x) (nibble_popcount_table[((x) >> 4) & 0xf] + \
                          nibble_popcount_table[(x) & 0xf])

char* bin64_to_str(uint64_t bits, unsigned int n, char *str);

//
// Strings
//

#define util_plural_str(n) ((n) == 1 ? "" : "s")

// Get a pointer to the next occurrence of c or the end of the string
static inline const char* strendc(const char *str, char c)
{
  while(*str && *str != c) str++;
  return str;
}

// Finds tag "seq=1,2,3" if tag is "seq="
//                ^--found, len = 5
// Return true if found, false otherwise
bool str_find_tag(const char *str, const char *tag,
                  const char **found, size_t *len);

// strnstr
const char* ctx_strnstr(const char *haystack, const char *needle, size_t haylen);

char strlastchar(const char *str);

//
// Numbers to string
//

bool bases_to_integer(const char *arg, size_t *bases);
bool mem_to_integer(const char *arg, size_t *bytes);

/**
 * Return number of digits required to represent `num` in base 10.
 * Examples:
 *   num_of_digits(0)   = 1
 *   num_of_digits(1)   = 1
 *   num_of_digits(10)  = 2
 *   num_of_digits(123) = 3
 */
size_t num_of_digits(size_t num);

#define ULONGSTRLEN 27
// result must be long enough for result + 1 ('\0'). Max length required is:
// strlen('18,446,744,073,709,551,615')+1 = 27 bytes
// returns pointer to result
char* ulong_to_str(unsigned long num, char* result);

// result must be long enough for result + 1 ('\0'). Max length required is:
// strlen('-9,223,372,036,854,775,808')+1 = 27 bytes
char* long_to_str(long num, char* result);

// result must be long enough for result + 1 ('\0').
// Max length required is: 26+1+decimals+1 = 28+decimals bytes
// strlen('-9,223,372,036,854,775,808') = 27
// strlen('.') = 1
// +1 for \0
char* double_to_str(double num, int decimals, char* str);

// str must be 26 + 3 + 1 + num decimals + 1 = 31+decimals bytes
// breakdown:
// strlen('18,446,744,073,709,551,615') = 26
// strlen(' GB') = 3
// strlen('.') = 1
// +1 for '\0'
char* bytes_to_str(unsigned long num, int decimals, char* str);

// Number to string using G to mean 10^9, M to mean 10^6 etc
char* num_to_str(double num, int decimals, char* str);

//
// Pretty printing
//
// @param linelen is number of characters in the line (30 is good default)
void util_print_nums(const char **titles, const size_t *nums,
                     size_t n, size_t linelen);

//
// Hexidecimal
//

// Generate null terminated string of length num-1
char* hex_rand_str(char *str, size_t num);

//
// Floats and Doubles
//

// http://www.devx.com/tips/Tip/42853
// static inline int my_isnan(double x) {
//   volatile double temp = x;
//   return temp != x;
// }
// static inline int my_isinf(double x) {
//   volatile double temp = x;
//   return ((temp == x) && ((temp - x) != 0.0));
// }

//
// Maths
//

static inline bool is_power_of_two(uint64_t x)
{
  return x && !(x & (x-1));
}

// prec should be 10**n where n is the number of decimal places you want
#define ndecplaces(x,prec) (((long)((double)(x)*(prec)+0.5))/(double)(prec))

float log_factorial(unsigned int number);
float log_factorial_ll(unsigned long long number);
unsigned long calculate_mean_ulong(unsigned long *array, unsigned long len);

// Returns -1 if no entries set
float find_hist_median(const size_t *arr, size_t arrlen);

// Greatest Common Divisor: largest integer that divides both a and b
uint32_t calc_GCD(uint32_t a, uint32_t b);

// sorted_arr must be a sorted array
size_t calc_N50(const size_t *sorted_arr, size_t n, size_t total);

//
// Time
//

// output of form: "10 days 23 hours 59 mins 59 secs"
// extreme: "-2147483647 days 23 hours 59 mins 59 secs",
// so str should be at least 42 bytes long
// returns number of bytes written
size_t seconds_to_str(unsigned long seconds, char *str);

//
// Multi-threading
//

// Do `nel` jobs with `nthreads` threads
// Blocks until all jobs finished
void util_run_threads(void *args, size_t nel, size_t elsize,
                      size_t nthreads, void (*func)(void *_arg, size_t _tid));

// Run `nthreads` in parallel, passes same argument to all threads
// Blocks until all jobs finished
void util_multi_thread(void *arg, size_t nthreads,
                       void (*func)(void *_arg, size_t _tid));

//
// Safe Counting (thread-safe + no overflow)
//

// Increment a uint8_t without overflow
static inline void safe_add_uint8_mt(volatile uint8_t *ptr, uint8_t add)
{
  ctx_assert(ptr != NULL);
  uint8_t v = *ptr, newv, curr;
  do {
    // Compare and swap returns the value of ptr before the operation
    curr = v;
    newv = MIN2((size_t)UINT8_MAX, (size_t)curr + add);
    if(curr == UINT8_MAX) break;
    v = __sync_val_compare_and_swap(ptr, curr, newv);
  }
  while(v != curr);
}

#define safe_incr_uint8(ptr) safe_add_uint8_mt(ptr,1)


static inline void safe_add_int32(int32_t *x, uint32_t c)
{
  uint64_t s = (uint64_t)*x + c;
  *x = MIN2(INT32_MAX, s);
}

#endif /* UTIL_H_ */
