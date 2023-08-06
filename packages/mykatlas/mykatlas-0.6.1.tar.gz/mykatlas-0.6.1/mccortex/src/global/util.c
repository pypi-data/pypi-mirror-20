#include "global.h"
#include "util.h"

#include <math.h>

#include "sort_r/sort_r.h"

const uint8_t rev_nibble_table[16]
  = {0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15};

const uint8_t nibble_popcount_table[16] = {0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4};

// Finds tag "seq=1,2,3" if tag is "seq="
//                ^--found, len = 5
// Return true if found, false otherwise
bool str_find_tag(const char *str, const char *tag,
                  const char **found, size_t *len)
{
  const char *tagptr, *txt;
  size_t taglen = strlen(tag);

  if((tagptr = strstr(str, tag)) == NULL) return false;
  txt = tagptr+taglen;

  *found = txt;
  *len = strendc(txt, ' ') - txt;

  return true;
}

const char* ctx_strnstr(const char *haystack, const char *needle, size_t hlen)
{
  size_t nlen = strlen(needle);
  if(nlen == 0) return haystack; // search string is empty

  char nc, hc;
  nc = *needle; needle++; nlen--; // take first char to find

  do
  {
    // Find a match for the first character
    do {
      if(hlen == 0 || (hc = *haystack) == '\0') return NULL;
      hlen--; haystack++;
    } while(hc != nc);

    // Check if we have run out of characters
    if(nlen > hlen) return NULL;

  } while(strncmp(needle, haystack, nlen) != 0);

  // s matched second char so need to de-increment
  return --haystack;
}

char strlastchar(const char *str) {
  if(!*str) return 0;
  while(*(str+1)) str++;
  return *str;
}

//
// Parsing
//

bool parse_entire_int(const char *str, int *result)
{
  char *strtol_last_char_ptr = NULL;
  if(!*str) return false;
  long tmp = strtol(str, &strtol_last_char_ptr, 10);
  if(tmp > INT_MAX || tmp < INT_MIN) return false;
  if(strtol_last_char_ptr == NULL || *strtol_last_char_ptr != '\0') return false;
  *result = (int)tmp;
  return true;
}

bool parse_entire_uint(const char *str, unsigned int *result)
{
  char *strtol_last_char_ptr = NULL;
  if(*str < '0' || *str > '9') return false;
  unsigned long tmp = strtoul(str, &strtol_last_char_ptr, 10);
  if(tmp > UINT_MAX) return false;
  if(strtol_last_char_ptr == NULL || *strtol_last_char_ptr != '\0') return false;
  *result = (unsigned int)tmp;
  return true;
}

bool parse_entire_ulong(const char *str, unsigned long *result)
{
  char *strtol_last_char_ptr = NULL;
  if(*str < '0' || *str > '9') return false;
  unsigned long tmp = strtoul(str, &strtol_last_char_ptr, 10);
  if(strtol_last_char_ptr == NULL || *strtol_last_char_ptr != '\0') return false;
  *result = tmp;
  return true;
}

bool parse_entire_double(const char *str, double *result)
{
  char *strtol_last_char_ptr = NULL;
  if(!*str) return false;
  double tmp = strtod(str, &strtol_last_char_ptr);
  if(strtol_last_char_ptr == NULL || *strtol_last_char_ptr != '\0') return false;
  *result = tmp;
  return true;
}

bool parse_entire_size(const char *str, size_t *result)
{
  char *strtol_last_char_ptr = NULL;
  if(*str < '0' || *str > '9') return false;
  unsigned long tmp = strtoul(str, &strtol_last_char_ptr, 10);
  if(tmp > SIZE_MAX) return false;
  if(strtol_last_char_ptr == NULL || *strtol_last_char_ptr != '\0') return false;
  *result = (size_t)tmp;
  return true;
}


// read comma separated doubles (no more than n) into `list`
// return number of elements read or <0 on error
int parse_list(void *list, size_t n, size_t el,
               void (*convert)(void *dst, const char *str, char **end),
               const char *str)
{
  if(!str) return 0;

  char *l = (char*)list, *dendptr = NULL;
  const char *end = str;
  size_t i = 0;

  for(; i < n && (end = strendc(str, ',')) > str; str = end+1)
  {
    convert(l+el*i, str, &dendptr);
    i++;
    if(dendptr != end) return -1;
    if(!*end) break;
  }

  return *end ? -1 : (int)i; // return -1 if still some entries left
}

void convert_double(void *dst, const char *str, char **end)
{
  *(double*)dst = strtod(str, end);
}

void convert_size(void *dst, const char *str, char **end)
{
  unsigned long s = strtoul(str, end, 10);
  if(*end && *end > str) {
    if(s > SIZE_MAX) *end = (char*)str; // invalid value
    else *(size_t*)dst = s;
  }
}

// read comma separated doubles (no more than n) into `list`
// return number of elements read or <0 on error
int parse_list_doubles(double *list, size_t n, const char *str)
{
  return parse_list(list, n, sizeof(double), convert_double, str);
}

int parse_list_sizes(size_t *list, size_t n, const char *str)
{
  return parse_list(list, n, sizeof(size_t), convert_size, str);
}

//
// Bits
//

// str must be n+1 long
char* bin64_to_str(uint64_t bits, unsigned int n, char *str)
{
  ctx_assert(n <= 64);
  size_t i, shift = n-1;
  for(i = 0; i < n; i++, shift--) str[i] = '0'+((bits>>shift)&1);
  str[n] = '\0';
  return str;
}

//
// Strings
//

bool bases_to_integer(const char *arg, size_t *bases)
{
  char *endptr;
  double num = strtod(arg, &endptr);
  size_t unit = 0;
  if(endptr == arg) return false;
  if(strcasecmp(endptr,"G") == 0 || strcasecmp(endptr,"GB") == 0 ||
     strcasecmp(endptr,"Gbp") == 0) { unit = 1000000000; }
  if(strcasecmp(endptr,"M") == 0 || strcasecmp(endptr,"MB") == 0 ||
     strcasecmp(endptr,"Mbp") == 0) { unit = 1000000; }
  if(strcasecmp(endptr,"K") == 0 || strcasecmp(endptr,"KB") == 0 ||
     strcasecmp(endptr,"Kbp") == 0) { unit = 1000; }
  if(strcasecmp(endptr,"b") == 0 || *endptr == '\0') { unit = 1; }
  *bases = (size_t)(num * unit);
  return (unit > 0);
}

// Convert string to unit size e.g. KB -> 2^10, TB -> 2^40
// Returns 1 on sucess, 0 on failure
bool mem_to_integer(const char *arg, size_t *bytes)
{
  char *endptr;
  unsigned long num = strtoul(arg, &endptr, 10);
  if(endptr == arg) return false;
  if(strcasecmp(endptr,"T") == 0 || strcasecmp(endptr,"TB") == 0)
  { *bytes = num<<40; return true; }
  if(strcasecmp(endptr,"G") == 0 || strcasecmp(endptr,"GB") == 0)
  { *bytes = num<<30; return true; }
  if(strcasecmp(endptr,"M") == 0 || strcasecmp(endptr,"MB") == 0)
  { *bytes = num<<20; return true; }
  if(strcasecmp(endptr,"K") == 0 || strcasecmp(endptr,"KB") == 0)
  { *bytes = num<<10; return true; }
  if(*endptr != '\0') return false;
  *bytes = num;
  return true;
}

/* Formating Numbers */

/**
 * Return number of digits required to represent `num` in base 10.
 * Examples:
 *   num_of_digits(0)   = 1
 *   num_of_digits(1)   = 1
 *   num_of_digits(10)  = 2
 *   num_of_digits(123) = 3
 */
size_t num_of_digits(size_t num)
{
  size_t digits = 1;
  while(1) {
    if(num < 10) return digits;
    if(num < 100) return digits+1;
    if(num < 1000) return digits+2;
    if(num < 10000) return digits+3;
    num /= 10000;
    digits += 4;
  }
  return digits;
}

// result must be long enough for result + 1 ('\0'). Max length required is:
// strlen('18,446,744,073,709,551,615')+1 = 27
// returns pointer to result
char* ulong_to_str(unsigned long num, char *result)
{
  unsigned int digits = num_of_digits(num);
  unsigned int i, num_commas = (digits-1) / 3;
  char *p = result + digits + num_commas;
  *(p--) = '\0';

  for(i = 0; i < digits; i++, num /= 10) {
    if(i > 0 && i % 3 == 0) *(p--) = ',';
    *(p--) = '0' + (num % 10);
  }

  return result;
}

// result must be long enough for result + 1 ('\0'). Max length required is:
// strlen('-9,223,372,036,854,775,808')+1 = 27
char* long_to_str(long num, char *result)
{
  if(num < 0) {
    result[0] = '-';
    result++;
    num = -num;
  }

  ulong_to_str((unsigned long)num, result);

  return result;
}

// result must be long enough for result + 1 ('\0').
// Max length required is: 26+1+decimals+1 = 28+decimals bytes
// strlen('-9,223,372,036,854,775,808') = 27
// strlen('.') = 1
// +1 for \0
char* double_to_str(double num, int decimals, char* str)
{
  if(isnan(num)) return strcpy(str, "NaN");
  else if(isinf(num)) return strcpy(str, "Inf");

  unsigned long whole_units = (unsigned long)num;
  num -= whole_units;

  char decstr[2+decimals+1];
  sprintf(decstr, "%.*lf", decimals, num);
  if(decstr[0] == '1') whole_units++;

  ulong_to_str(whole_units, str);

  if(decimals > 0)
  {
    size_t offset = strlen(str);
    strcpy(str+offset, decstr+1);
  }

  return str;
}

// Format a number
static inline char* units_to_str(double num, int decimals, char* str,
                                 const char **units, size_t nunits, size_t usize)
{
  ctx_assert(nunits > 0 && usize > 0);

  if(isnan(num)) { sprintf(str, "NaN%s", units[0]); return str; }
  else if(isinf(num)) { sprintf(str, "Inf%s", units[0]); return str; }

  size_t unit = 0;
  double num_tmp = num, num_of_units;

  while(num_tmp >= usize && unit+1 < nunits) { unit++; num_tmp /= usize; }

  num_of_units = num / pow(usize, unit);
  double_to_str(num_of_units, decimals, str);

  char *ptr = str+strlen(str)-1;
  if(decimals > 0) {
    // Trim excess zeros
    while(ptr > str && *ptr == '0') ptr--;
    if(*ptr == '.') ptr--;
  }
  strcpy(ptr+1, units[unit]);

  return str;
}

// str must be 26 + 3 + 1 + num decimals + 1 = 31+decimals bytes
// breakdown:
// strlen('18,446,744,073,709,551,615') = 26
// strlen(' GB') = 3
// strlen('.') = 1
// +1 for '\0'
char* bytes_to_str(unsigned long num, int decimals, char* str)
{
  const char *units[7] = {"B", "KB", "MB", "GB", "TB", "PB", "EB"};
  return units_to_str(num, decimals, str, units, 7, 1024);
}

// Number to string using G to mean 10^9, M to mean 10^6 etc
char* num_to_str(double num, int decimals, char* str)
{
  const char *units[4] = {"", "K", "M", "G"};
  return units_to_str(num, decimals, str, units, 4, 1000);
}


//
// Pretty printing
//

// @linelen is number of characters in the line (30 is good default)
void util_print_nums(const char **titles, const size_t *nums,
                     size_t n, size_t linelen)
{
  if(!linelen) linelen = 30;
  size_t i, titlelen, numlen, s;
  char numstr[50], padding[50];
  for(i = 0; i < n; i++)
  {
    ulong_to_str(nums[i], numstr);
    titlelen = strlen(titles[i]);
    numlen = strlen(numstr);
    if(titlelen + numlen < linelen) {
      s = linelen - (titlelen + numlen);
      memset(padding, ' ', s);
      padding[s] = '\0';
    } else {
      padding[0] = '\0';
    }
    status("  %s: %s%s", titles[i], padding, numstr);
  }
}

//
// Hexidecimal
//

static const char hex[17] = "0123456789abcdef";

// Generate null terminated string of length num-1
char* hex_rand_str(char *str, size_t num)
{
  if(num == 0) return NULL;
  ctx_assert2(is_power_of_two((uint64_t)RAND_MAX+1), "RAND_MAX not (2^n)-1");

  size_t i, r = 0, m = 0;
  // 4 bits per cycle, rand() is unknown size, max value: RAND_MAX
  // mask `m` indicates which rand `r` bits are set
  for(i = 0; i+1 < num; i++, r >>= 4, m >>= 4) {
    if((m & 0xf) < 0xf) { r = (size_t)rand(); m = (size_t)RAND_MAX; }
    str[i] = hex[r&0xf];
  }
  str[num-1] = '\0';
  return str;
}

//
// Maths
//

// log(n!) = sum from i=1 to n, of (log(i))
float log_factorial(unsigned int number)
{
  unsigned int i;
  float ret = 0;
  for(i = 1; i <= number; i++) ret += log(i);
  return ret;
}

float log_factorial_ll(unsigned long long number)
{
  unsigned long long i;
  float ret = 0;
  for(i = 1; i <= number; i++) ret += log(i);
  return ret;
}

unsigned long calculate_mean_ulong(unsigned long *array, unsigned long len)
{
  unsigned long i, sum = 0, num = 0;

  for(i = 0; i < len; i++)
  {
    sum += i * array[i];
    num += array[i];
  }

  return num == 0 ? 0 : (sum / num);
}

// Returns -1 if no entries set
float find_hist_median(const size_t *arr, size_t arrlen)
{
  size_t i, nentries = 0;
  for(i = 0; i < arrlen; i++) nentries += arr[i];

  if(nentries == 0) return -1;

  size_t mid0 = (nentries-1)/2;
  size_t mid1 = mid0 + !(nentries&1);
  size_t key0, key1, cummulative = 0;

  // if odd number of values, mid0 == mid1, if even mid0+1 == mid1
  for(i = 0; i < arrlen; i++)
  {
    cummulative += arr[i];
    if(cummulative > mid0) {
      key0 = key1 = i;
      while(cummulative <= mid1) {
        key1++;
        cummulative += arr[key1];
      }
      return (key0 + key1) * 0.5;
    }
  }
  die("hist_median went bad");
}

// Get Greatest Common Divisor using binary GCD algorithm
// http://en.wikipedia.org/wiki/Binary_GCD_algorithm
uint32_t calc_GCD(uint32_t a, uint32_t b)
{
  uint32_t shift;

  if(a == 0) return b;
  if(b == 0) return a;

  // Find power of two divisor
  for(shift = 0; ((a | b) & 1) == 0; shift++) { a >>= 1; b >>= 1; }

  // Remove remaining factors of two from a - they are not common
  while((a & 1) == 0) a >>= 1;

  do
  {
    // Remove remaining factors of two from b - they are not common
    while((b & 1) == 0) b >>= 1;

    if(a > b) { SWAP(a, b); }
    b = b - a;
  }
  while(b != 0);

  return a << shift;
}

// sorted_arr must be a sorted array
size_t calc_N50(const size_t *sorted_arr, size_t n, size_t total)
{
  size_t i, sum = 0, half = total/2;

  if(n == 0 || half == 0) return 0;
  ctx_assert2(sorted_arr[0] <= sorted_arr[n-1], "Not sorted!");

  for(i = n; i > 0 && sum < half; i--)
    sum += sorted_arr[i-1];

  return sorted_arr[i];
}


//
// Time
//

// output of form: "10 days 23 hours 59 mins 59 secs"
// extreme: "-2147483647 days 23 hours 59 mins 59 secs",
// so str should be at least 42 bytes long
// returns number of bytes written
size_t seconds_to_str(unsigned long seconds, char *str)
{
  char *ptr = str;
  unsigned long days, hours, mins;
  days = seconds / (60 * 60 * 24);
  seconds -= days * (60 * 60 * 24);
  hours = seconds / (60 * 60);
  seconds -= hours * (60 * 60);
  mins = seconds / 60;
  seconds -= mins * 60;
  if(days > 0)
    ptr += sprintf(ptr, "%lu day%s ", days, util_plural_str(days));
  if(days+hours > 0)
    ptr += sprintf(ptr, "%lu hour%s ", hours, util_plural_str(hours));
  if(days+hours+mins > 0)
    ptr += sprintf(ptr, "%lu min%s ", mins, util_plural_str(mins));
  ptr += sprintf(ptr, "%lu sec%s", seconds, util_plural_str(seconds));
  return (size_t)(ptr - str);
}

//
// Multi-threading
//

typedef struct {
  void (*const func)(void *_arg, size_t _tid);
  void *const args;
  const size_t nel, elsize;
  volatile size_t next_job;
} ThreadedJobs;

typedef struct {
  pthread_t thread;
  ThreadedJobs *jobs;
  size_t curr_job, threadid;
} ThreadedWorker;

static void threaded_worker_sub(ThreadedWorker *wrkr)
{
  ThreadedJobs *jobs = wrkr->jobs;
  jobs->func((char*)jobs->args + wrkr->curr_job*jobs->elsize, wrkr->threadid);

  // try to get more work
  while(jobs->next_job < jobs->nel)
  {
    wrkr->curr_job = __sync_fetch_and_add(&jobs->next_job, 1);
    if(wrkr->curr_job >= jobs->nel) break;
    jobs->func((char*)jobs->args + wrkr->curr_job*jobs->elsize, wrkr->threadid);
  }
}

static __attribute__((noreturn)) void *threaded_worker(void *arg)
{
  ThreadedWorker *wrkr = (ThreadedWorker*)arg;
  threaded_worker_sub(wrkr);
  pthread_exit(NULL);
}

// Blocks until all jobs finished
void util_run_threads(void *args, size_t nel, size_t elsize,
                      size_t nthreads, void (*func)(void *_arg, size_t _tid))
{
  int rc;
  size_t i;
  ctx_assert(nthreads > 0);

  // Don't use more threads than elements
  nthreads = MIN2(nel, nthreads);

  if(nthreads == 1) {
    for(i = 0; i < nel; i++) func((char*)args + i*elsize, 0);
  }
  else
  {
    /* Initialize and set thread detached attribute */
    pthread_attr_t thread_attr;
    pthread_attr_init(&thread_attr);
    pthread_attr_setdetachstate(&thread_attr, PTHREAD_CREATE_JOINABLE);

    ThreadedJobs jobs = {.func = func, .args = args,
                         .nel = nel, .elsize = elsize,
                         .next_job = nthreads};

    ThreadedWorker *workers = ctx_malloc(sizeof(ThreadedWorker) * nthreads);

    for(i = 1; i < nthreads; i++) {
      workers[i] = (ThreadedWorker){.jobs = &jobs, .curr_job = i, .threadid = i};
      rc = pthread_create(&workers[i].thread, &thread_attr,
                          threaded_worker, (void*)&workers[i]);
      if(rc != 0) die("Creating thread failed");
    }

    // Last thread
    workers[0] = (ThreadedWorker){.jobs = &jobs, .curr_job = 0, .threadid = 0};
    threaded_worker_sub(&workers[0]);

    /* wait for other threads to complete */
    for(i = 1; i < nthreads; i++) {
      rc = pthread_join(workers[i].thread, NULL);
      if(rc != 0) die("Joining thread failed");
    }

    pthread_attr_destroy(&thread_attr);
    ctx_free(workers);
  }
}

typedef struct {
  pthread_t thread;
  const size_t threadid;
  void *const arg;
  void (*const func)(void *_arg, size_t _tid);
} SharedArgWorker;

static __attribute__((noreturn)) void *shared_arg_worker(void *arg)
{
  SharedArgWorker *wrkr = (SharedArgWorker*)arg;
  wrkr->func(wrkr->arg, wrkr->threadid);
  pthread_exit(NULL);
}

// Blocks until all jobs finished
void util_multi_thread(void *arg, size_t nthreads,
                       void (*func)(void *_arg, size_t _tid))
{
  int rc;
  size_t i;
  ctx_assert(nthreads > 0);

  if(nthreads == 1) {
    func(arg, 0);
  }
  else
  {
    /* Initialize and set thread detached attribute */
    pthread_attr_t thread_attr;
    pthread_attr_init(&thread_attr);
    pthread_attr_setdetachstate(&thread_attr, PTHREAD_CREATE_JOINABLE);

    SharedArgWorker *workers = ctx_calloc(nthreads, sizeof(SharedArgWorker));

    for(i = 1; i < nthreads; i++) {
      SharedArgWorker tmp = {.threadid = i, .func = func, .arg = arg};
      memcpy(&workers[i], &tmp, sizeof(tmp));
      rc = pthread_create(&workers[i].thread, &thread_attr,
                          shared_arg_worker, &workers[i]);
      if(rc != 0) die("Creating thread failed");
    }

    // Last thread
    func(arg, 0);

    /* wait for other threads to complete */
    for(i = 1; i < nthreads; i++) {
      rc = pthread_join(workers[i].thread, NULL);
      if(rc != 0) die("Joining thread failed");
    }

    pthread_attr_destroy(&thread_attr);
    ctx_free(workers);
  }
}
