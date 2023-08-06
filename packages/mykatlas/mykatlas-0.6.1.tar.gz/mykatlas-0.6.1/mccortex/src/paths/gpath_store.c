#include "global.h"
#include "gpath_store.h"
#include "util.h"


// If num_paths != 0, we ensure at least num_paths capacity
// @split_linked_lists whether you intend to have traverse linked list and
//                     all linked list separate
void gpath_store_alloc(GPathStore *gpstore, size_t ncols, size_t graph_capacity,
                       size_t num_paths, size_t mem,
                       bool count_nseen, bool split_linked_lists)
{
  memset(gpstore, 0, sizeof(*gpstore));

  size_t store_mem = graph_capacity*sizeof(GPath*) * (split_linked_lists ? 2 : 1);
  if(store_mem > mem)
    die("Need at least %zu bytes (only got %zu bytes)", store_mem, mem);

  size_t gpset_mem = mem - store_mem;

  // Don't allow resizing - this allows use to the thread safe
  // and control memory usage (die when we fill up allowed memory)
  if(num_paths)
    gpath_set_alloc2(&gpstore->gpset, ncols, num_paths, gpset_mem, false, count_nseen);
  else
    gpath_set_alloc(&gpstore->gpset, ncols, gpset_mem, false, count_nseen);

  gpstore->graph_capacity = graph_capacity;

  // paths_traverse is always a subset of paths_all
  gpstore->paths_all = ctx_calloc(graph_capacity, sizeof(GPath*));
  gpstore->paths_traverse = gpstore->paths_all;
}

void gpath_store_dealloc(GPathStore *gpstore)
{
  gpath_set_dealloc(&gpstore->gpset);
  gpath_store_merge_read_write(gpstore);
  ctx_free(gpstore->paths_all);
  if(gpstore->paths_traverse != gpstore->paths_all) ctx_free(gpstore->paths_traverse);
  memset(gpstore, 0, sizeof(*gpstore));
}

void gpath_store_reset(GPathStore *gpstore)
{
  gpath_set_reset(&gpstore->gpset);
  gpstore->num_kmers_with_paths = gpstore->num_paths = gpstore->path_bytes = 0;
  memset(gpstore->paths_all, 0, gpstore->graph_capacity * sizeof(GPath*));
  if(gpstore->paths_traverse != gpstore->paths_all)
    ctx_free(gpstore->paths_traverse);
  gpstore->paths_traverse = gpstore->paths_all;
}

void gpath_store_print_stats(const GPathStore *gpstore)
{
  gpath_set_print_stats(&gpstore->gpset);

  char kmers_str[50], paths_str[50], bytes_str[50];
  ulong_to_str(gpstore->num_kmers_with_paths, kmers_str);
  ulong_to_str(gpstore->num_paths, paths_str);
  bytes_to_str(gpstore->path_bytes, 1, bytes_str);
  status("[GPathStore] kmers-with-paths: %s, num paths: %s, path-bytes: %s",
         kmers_str, paths_str, bytes_str);
}

void gpath_store_split_read_write(GPathStore *gpstore)
{
  if(gpstore->paths_traverse == gpstore->paths_all)
  {
    status("[GPathStore] Creating separate read/write GraphPath linked lists");
    if(gpstore->num_paths == 0)
    {
      gpstore->paths_traverse = NULL;
    }
    else
    {
      // Copy current paths over to path set to be updated
      status("[GPathStore]   (allocating new linked lists)");
      size_t mem = gpstore->graph_capacity * sizeof(GPath*);
      gpstore->paths_traverse = ctx_calloc(gpstore->graph_capacity, sizeof(GPath*));
      memcpy(gpstore->paths_traverse, gpstore->paths_all, mem);
    }
  }
}

void gpath_store_merge_read_write(GPathStore *gpstore)
{
  if(gpstore->paths_traverse != gpstore->paths_all)
  {
    status("[GPathStore] Merging read/write GraphPath linked lists");
    ctx_free(gpstore->paths_traverse); // does nothing if NULL
    gpstore->paths_traverse = gpstore->paths_all;
  }
}

GPath* gpath_store_fetch(const GPathStore *gpstore, hkey_t hkey)
{
  return gpstore->paths_all[hkey];
}

GPath* gpath_store_fetch_traverse(const GPathStore *gpstore, hkey_t hkey)
{
  return gpstore->paths_traverse[hkey];
}

// Update stats after removing a path
void gpstore_path_removal_update_stats(GPathStore *gpstore, GPath *gpath)
{
  // Update stats
  size_t nbytes = binary_seq_mem(gpath->num_juncs);
  __sync_fetch_and_sub((volatile uint64_t*)&gpstore->num_paths, 1);
  __sync_fetch_and_sub((volatile uint64_t*)&gpstore->path_bytes, nbytes);
}

// You do not need to acquire the kmer lock before calling this function
static void _gpstore_add_to_llist_mt(GPathStore *gpstore, hkey_t hkey, GPath *gpath)
{
  // Add to linked list
  ctx_assert(sizeof(size_t) == sizeof(GPath*));
  do {
    gpath->next = *(GPath *volatile const*)&gpstore->paths_all[hkey];
  }
  while(!__sync_bool_compare_and_swap((volatile size_t*)&gpstore->paths_all[hkey],
                                      (size_t)gpath->next, (size_t)gpath));

  // Update stats
  size_t nbytes = binary_seq_mem(gpath->num_juncs);
  size_t new_kmer = (gpath->next == NULL ? 1 : 0);
  __sync_fetch_and_add((volatile uint64_t*)&gpstore->num_kmers_with_paths, new_kmer);
  __sync_fetch_and_add((volatile uint64_t*)&gpstore->num_paths, 1);
  __sync_fetch_and_add((volatile uint64_t*)&gpstore->path_bytes, nbytes);
}

// Linear search to find a given path
GPath* gpstore_find(const GPathStore *gpstore, hkey_t hkey, GPathNew find)
{
  GPath *gpath = gpath_store_fetch(gpstore, hkey);
  for(; gpath != NULL; gpath = gpath->next)
    if(gpaths_are_equal(*gpath, find))
      return gpath;
  return NULL;
}

// Always adds new path. If newpath could be a duplicate, use gpathhash
// Note: it is not safe to call _add and _find_add simultaneously, since _add
//       avoids the use of locks.
GPath* gpath_store_add_mt(GPathStore *gpstore, hkey_t hkey, GPathNew newgpath)
{
  ctx_assert(newgpath.seq != NULL);

  GPath *gpath = gpath_set_add_mt(&gpstore->gpset, newgpath);
  _gpstore_add_to_llist_mt(gpstore, hkey, gpath);

  return gpath;
}

/*
// NOT USED ATM
// Linear time search to find or add a given path
// Note: it is not safe to call _add and _find_add simultaneously, since _add
//       avoids the use of locks.
GPath* gpath_store_find_add_mt(GPathStore *gpstore,
                               hkey_t hkey, GPathNew newgpath,
                               bool *found)
{
  ctx_assert(newgpath.seq != NULL);

  GPath *gpath;
  *found = true;

  // Get lock for kmer
  bitlock_yield_acquire(gpstore->kmer_locks, hkey);

  // Add if not found
  if((gpath = gpstore_find(gpstore, hkey, newgpath)) == NULL) {
    gpath = gpath_set_add_mt(&gpstore->gpset, newgpath);
    *found = false;
  }

  // Release kmer lock
  bitlock_release(gpstore->kmer_locks, hkey);

  _gpstore_add_to_llist_mt(gpstore, hkey, gpath);

  return gpath;
}
*/