#Arguments (all are optional):
# MAXK=31
# RELEASE=1                  (release build)
# DEBUG=1                    (debug build)
# VERBOSE=1                  (compile to print all the things!)
# HASH=<CITY,LOOKUP3,XXHASH> (default hash function)
# RECOMPILE=1                (recompile all from source)
# NOLIBS=1                   (do not attempt to recompile library code)
# STRICT=1                   (compile with stricter CC warnings)

# Resolve some issues linking libz:
# e.g. for WTCHG cluster3
# 1) pass LIB_PATH=/usr/local/lib/ to compile on WTCHG cluster3
# 2) set LD_LIBRARY_PATH=/usr/local/lib/:$(LD_LIBRARY_PATH) before running

# Targets:
#  make
#  make clean
#  make all
#  make [mccortex|tables|debug|test]
#  make tests   <- run tests

# Use bash as shell
SHELL := /bin/bash

## Toggle Release Version
#
# RELEASE=1
# RECOMPILE=1
#
##

MAXK = 31
LOWK = $(word 1, $(shell echo 31 $(MAXK) | sort -n))
TEST_KMER=$(shell echo $$[(($(MAXK)+31)/32)*32 - 1])

ifneq ($(MAXK),$(TEST_KMER))
  KMERERROR=1
endif
ifneq ($(LOWK),31)
  KMERERROR=1
endif
ifdef KMERERROR
  $(error Invalid MAXK value '$(MAXK)'. Please choose from 31,63,95,..(32*n-1) [default: 31] $(TEST_KMER) $(LOWK))
endif

MAX_KMER_SIZE=$(MAXK)
MIN_KMER_SIZE=$(shell echo $$[$(MAX_KMER_SIZE)-30] | sed 's/^1$$/3/g')

# Use City hash instead of lookup3?
ifdef HASH
  ifeq ($(HASH),CITY)
    HASH_KEY_FLAGS=-DUSE_CITY_HASH=1
  else ifeq ($(HASH),XXHASH)
    HASH_KEY_FLAGS=-DUSE_XXHASH=1
  else ifeq ($(HASH),LOOKUP3)
    # default
  else
    $(error Please set HASH to a valid value HASH=<LOOKUP3,CITY,XXHASH>)
  endif
endif

# Library paths
# IDIR_GSL_HEADERS=libs/gsl-1.16
IDIR_HTS=libs/htslib
IDIR_STRS=libs/string_buffer
IDIR_SEQ=libs/seq_file
IDIR_ALIGN=libs/seq-align/src
IDIR_BITARR=libs/bit_array
IDIR_MSGPOOL=libs/msg-pool
IDIR_MISC=libs/misc

# LIB_GSL=libs/gsl-1.16/.libs/libgsl.a
LIB_HTS=libs/htslib/libhts.a
LIB_ALIGN=libs/seq-align/src/libalign.a
# LIB_STRS=libs/string_buffer/libstrbuf.a
LIB_STRS=libs/string_buffer/string_buffer.o
LIB_CARRAYS=libs/carrays/carrays.o

MISC_SRCS=$(wildcard libs/misc/*.c)
MISC_HDRS=$(wildcard libs/misc/*.h)
MISC_OBJS=$(MISC_SRCS:.c=.o)

LIB_MISC=$(MISC_SRCS) libs/xxHash/xxhash.c
# LIB_MISC=$(MISC_OBJS)

ifdef LIB_PATH
	EXTRA_INCS := -I $(LIB_PATH) -L $(LIB_PATH)
endif

INCS=-I libs -I $(IDIR_HTS) $(EXTRA_INCS)

# Library linking
LIB_OBJS=$(LIB_MISC) $(LIB_STRS) $(LIB_CARRAYS) $(LIB_HTS) $(LIB_ALIGN) libs/cJSON/cJSON.o
LINK=-lpthread -lz -lm

# Preprocessor declarations
CPPFLAGS=$(HASH_KEY_FLAGS) -D_USESAM=1
KMERARGS=-DMIN_KMER_SIZE=$(MIN_KMER_SIZE) -DMAX_KMER_SIZE=$(MAX_KMER_SIZE)

# C Compiler flags
CFLAGS = -std=c99 -Wall -Wextra
# -fno-strict-aliasing
CFLAGS_USEFUL = -Wshadow -Wstrict-aliasing=2 \
	              -Winit-self -Wmissing-include-dirs \
	              -Wdiv-by-zero -Wsign-compare \
	              -Wmissing-noreturn -Wreturn-type \
	              -Wwrite-strings -Wundef -Wpointer-arith \
	              -Wfloat-equal -Wbad-function-cast

ifdef STRICT
	CFLAGS_STRICT = -Wcast-qual -fstack-protector-all
	ifneq (,$(findstring clang,$(COMPILER)))
		CFLAGS_STRICT := $(CFLAGS_STRICT) -fsanitize-undefined-trap-on-error
	endif
endif

CFLAGS := $(CFLAGS) $(CFLAGS_USEFUL) $(CFLAGS_STRICT)

PLATFORM := $(shell uname)
COMPILER := $(shell ($(CC) -v 2>&1) | tr A-Z a-z )

# If not debugging, add optimisations and -DNDEBUG=1 to turn off assert() calls
ifdef DEBUG
	OPT = -O0 -g -ggdb -gdwarf-2 -g3
else
	# Could add -DNDEBUG=1 here to turn off asserts
	OPT = -O3 -m64
endif

CFLAGS := $(OPT) $(CFLAGS)

ifdef VERBOSE
	CPPFLAGS := $(CPPFLAGS) -DCTXVERBOSE=1
endif

ifdef RELEASE
	RECOMPILE=1 -DNDEBUG=1
else
	CPPFLAGS := $(CPPFLAGS) -DCTXCHECKS=1
endif


KMER_OBJDIR=build/kmer$(MAXK)
KMER_SRCS=$(wildcard src/kmer/*.c)
KMER_HDRS=$(wildcard src/kmer/*.h) src/global/version.h
KMER_FILES=$(notdir $(KMER_SRCS))
KMER_OBJS=$(addprefix $(KMER_OBJDIR)/, $(KMER_FILES:.c=.o))

GLOBAL_OBJDIR=build/global
GLOBAL_SRCS=$(wildcard src/global/*.c)
GLOBAL_HDRS=$(wildcard src/global/*.h) src/global/version.h
GLOBAL_FILES=$(notdir $(GLOBAL_SRCS))
GLOBAL_OBJS=$(addprefix $(GLOBAL_OBJDIR)/, $(GLOBAL_FILES:.c=.o))

BASIC_OBJDIR=build/basic
BASIC_SRCS=$(wildcard src/basic/*.c)
BASIC_HDRS=$(wildcard src/basic/*.h)
BASIC_FILES=$(notdir $(BASIC_SRCS))
BASIC_OBJS=$(addprefix $(BASIC_OBJDIR)/, $(BASIC_FILES:.c=.o))

PATHS_OBJDIR=build/paths
PATHS_SRCS=$(wildcard src/paths/*.c)
PATHS_HDRS=$(wildcard src/paths/*.h)
PATHS_FILES=$(notdir $(PATHS_SRCS))
PATHS_OBJS=$(addprefix $(PATHS_OBJDIR)/, $(PATHS_FILES:.c=.o))

GRAPH_OBJDIR=build/graph$(MAXK)
GRAPH_SRCS=$(wildcard src/graph/*.c)
GRAPH_HDRS=$(wildcard src/graph/*.h)
GRAPH_FILES=$(notdir $(GRAPH_SRCS))
GRAPH_OBJS=$(addprefix $(GRAPH_OBJDIR)/, $(GRAPH_FILES:.c=.o))

GRAPH_PATHS_OBJDIR=build/graph_paths$(MAXK)
GRAPH_PATHS_SRCS=$(wildcard src/graph_paths/*.c)
GRAPH_PATHS_HDRS=$(wildcard src/graph_paths/*.h)
GRAPH_PATHS_FILES=$(notdir $(GRAPH_PATHS_SRCS))
GRAPH_PATHS_OBJS=$(addprefix $(GRAPH_PATHS_OBJDIR)/, $(GRAPH_PATHS_FILES:.c=.o))

DB_ALN_OBJDIR=build/alignment$(MAXK)
DB_ALN_SRCS=$(wildcard src/alignment/*.c)
DB_ALN_HDRS=$(wildcard src/alignment/*.h)
DB_ALN_FILES=$(notdir $(DB_ALN_SRCS))
DB_ALN_OBJS=$(addprefix $(DB_ALN_OBJDIR)/, $(DB_ALN_FILES:.c=.o))

TOOLS_OBJDIR=build/tools$(MAXK)
TOOLS_SRCS=$(wildcard src/tools/*.c)
TOOLS_HDRS=$(wildcard src/tools/*.h)
TOOLS_FILES=$(notdir $(TOOLS_SRCS))
TOOLS_OBJS=$(addprefix $(TOOLS_OBJDIR)/, $(TOOLS_FILES:.c=.o))

CMDS_OBJDIR=build/commands$(MAXK)
CMDS_SRCS=$(wildcard src/commands/*.c)
CMDS_HDRS=$(wildcard src/commands/*.h)
CMDS_FILES=$(notdir $(CMDS_SRCS))
CMDS_OBJS=$(addprefix $(CMDS_OBJDIR)/, $(CMDS_FILES:.c=.o))

TESTS_OBJDIR=build/tests$(MAXK)
TESTS_SRCS=$(wildcard src/tests/*.c)
TESTS_HDRS=$(wildcard src/tests/*.h)
TESTS_FILES=$(notdir $(TESTS_SRCS))
TESTS_OBJS=$(addprefix $(TESTS_OBJDIR)/, $(TESTS_FILES:.c=.o))

HDRS=$(GLOBAL_HDRS) $(BASIC_HDRS) $(PATHS_HDRS) $(GRAPH_HDRS) $(GRAPH_PATHS_HDRS) \
     $(DB_ALN_HDRS) $(TOOLS_HDRS) $(CMDS_HDRS)

DIRS=bin \
     $(KMER_OBJDIR) $(GLOBAL_OBJDIR) $(BASIC_OBJDIR) \
     $(PATHS_OBJDIR) $(GRAPH_OBJDIR) \
     $(GRAPH_PATHS_OBJDIR) $(DB_ALN_OBJDIR) $(TOOLS_OBJDIR) $(CMDS_OBJDIR) \
     $(TESTS_OBJDIR)

# DEPS dependencies that do not need to be re-built per target
ifdef NOLIBS
	DEPS=Makefile $(DIRS) $(LIB_OBJS)
else
	DEPS=Makefile $(DIRS) $(LIB_OBJS) libs-core
endif

REQ=

# RECOMPILE=1 to recompile all from source
ifdef RECOMPILE
	OBJS=$(CMDS_SRCS) $(TOOLS_SRCS) $(DB_ALN_SRCS) $(GRAPH_PATHS_SRCS) $(GRAPH_SRCS) $(PATHS_SRCS) $(BASIC_SRCS) $(GLOBAL_SRCS) $(KMER_SRCS) $(LIB_OBJS)
	TESTS_OBJS=$(TESTS_SRCS)
	REQ=force
else
	OBJS=$(CMDS_OBJS) $(TOOLS_OBJS) $(DB_ALN_OBJS) $(GRAPH_PATHS_OBJS) $(GRAPH_OBJS) $(PATHS_OBJS) $(BASIC_OBJS) $(GLOBAL_OBJS) $(KMER_OBJS) $(LIB_OBJS)
endif

.DEFAULT_GOAL := mccortex

all: mccortex tests tables libs-other

# Update libraries
libs-core:
	cd libs && $(MAKE) core

libs-other:
	cd libs && $(MAKE) other

# Run tests
test: tests
	./bin/tests$(MAXK)

# This Makefile mastery borrowed from htslib [https://github.com/samtools/htslib]
# If git repo, grab commit hash to use in version
# Force version.h to be remade if $(CTX_VERSION) has changed.
ifndef CTX_VERSION
ifneq "$(wildcard .git)" ""
CTX_VERSION := $(shell git describe --always --dirty)
# CTX_VERSION := $(shell git log --pretty=format:'%h' -n 1 --tags)
src/global/version.h: $(if $(wildcard src/global/version.h),$(if $(findstring "$(CTX_VERSION)",$(shell cat src/global/version.h)),,force))
endif
endif

src/global/version.h:
	echo '#define CTX_VERSION "$(CTX_VERSION)"' > $@

$(KMER_OBJDIR)/%.o: src/kmer/%.c $(KMER_HDRS) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) $(KMERARGS) -I src/kmer/ -I src/kmer/ $(INCS) -c $<

$(GLOBAL_OBJDIR)/%.o: src/global/%.c $(GLOBAL_HDRS) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) -I src/global/ -I src/kmer/ $(INCS) -c $<

$(BASIC_OBJDIR)/%.o: src/basic/%.c $(BASIC_HDRS) $(GLOBAL_HDRS) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) -c $<

$(PATHS_OBJDIR)/%.o: src/paths/%.c $(PATHS_HDRS) $(BASIC_HDRS) $(GLOBAL_HDRS) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) -I src/paths/ -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) -c $<

$(GRAPH_OBJDIR)/%.o: src/graph/%.c $(GRAPH_HDRS) $(BASIC_HDRS) $(GLOBAL_HDRS) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) $(KMERARGS) -I src/graph/ -I src/paths/ -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) -c $<

$(GRAPH_PATHS_OBJDIR)/%.o: src/graph_paths/%.c $(GRAPH_PATHS_HDRS) $(GRAPH_HDRS) $(BASIC_HDRS) $(GLOBAL_HDRS) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) $(KMERARGS) -I src/graph_paths/ -I src/graph/ -I src/paths/ -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) -c $<

$(DB_ALN_OBJDIR)/%.o: src/alignment/%.c $(DB_ALN_HDRS) $(GRAPH_HDRS) $(BASIC_HDRS) $(GLOBAL_HDRS) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) $(KMERARGS) -I src/alignment/ -I src/graph/ -I src/paths/ -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) -c $<

$(TOOLS_OBJDIR)/%.o: src/tools/%.c $(TOOLS_HDRS) $(GRAPH_HDRS) $(BASIC_HDRS) $(GLOBAL_HDRS) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) $(KMERARGS) -I src/tools/ -I src/alignment/ -I src/graph_paths/ -I src/graph/ -I src/paths/ -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) -c $<

$(CMDS_OBJDIR)/%.o: src/commands/%.c $(CMDS_HDRS) $(TOOLS_HDRS) $(GRAPH_HDRS) $(BASIC_HDRS) $(GLOBAL_HDRS) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) $(KMERARGS) -I src/commands/ -I src/tools/ -I src/alignment/ -I src/graph_paths/ -I src/graph/ -I src/paths/ -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) -c $<

$(TESTS_OBJDIR)/%.o: src/tests/%.c $(TESTS_HDRS) $(TOOLS_HDRS) $(GRAPH_HDRS) $(BASIC_HDRS) $(GLOBAL_HDRS) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) $(KMERARGS) -I src/tools/ -I src/alignment/ -I src/graph_paths/ -I src/graph/ -I src/paths/ -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) -c $<

# Misc library code
libs/misc/%.o: libs/misc/%.c libs/misc/%.h
	$(CC) -o libs/misc/$*.o $(CFLAGS) -c libs/misc/$*.c

libs/cJSON/cJSON.o: libs/cJSON/cJSON.c libs/cJSON/cJSON.h
	$(CC) -o $@ $(CFLAGS) -c $<

mccortex: bin/mccortex$(MAXK)
bin/mccortex$(MAXK): src/main/mccortex.c $(OBJS) $(HDRS) $(REQ) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) $(KMERARGS) -I src/commands/ -I src/tools/ -I src/alignment/ -I src/graph_paths/ -I src/graph/ -I src/paths/ -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) src/main/mccortex.c $(OBJS) $(LINK)

tests: bin/tests$(MAXK)
bin/tests$(MAXK): src/main/tests.c $(TESTS_OBJS) $(TESTS_HDRS) $(OBJS) $(HDRS) $(REQ) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) $(KMERARGS) -I src/tests/ -I src/commands/ -I src/tools/ -I src/alignment/ -I src/graph_paths/ -I src/graph/ -I src/paths/ -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) src/main/tests.c $(TESTS_OBJS) $(OBJS) $(LINK)

tables: bin/tables
bin/tables: src/main/tables.c | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $<

debug: bin/debug$(MAXK)
bin/debug$(MAXK): src/main/debug.c $(OBJS) $(HDRS) $(REQ) | $(DEPS)
	$(CC) -o $@ $(CFLAGS) $(CPPFLAGS) $(KMERARGS) -I src/commands/ -I src/tools/ -I src/alignment/ -I src/graph_paths/ -I src/graph/ -I src/paths/ -I src/basic/ -I src/global/ -I src/kmer/ $(INCS) src/main/debug.c $(OBJS) $(LINK)

# directories
$(DIRS):
	mkdir -p $@

# libraries
# This triggers the compiling of library dependencies for first install
$(LIB_OBJS): libs/string_buffer/string_buffer.h
libs/string_buffer/string_buffer.h:
	cd libs; make

clean:
	rm -rf bin build libs/misc/*.o libs/cJSON/*.o

force:

.PHONY: all clean mccortex test force libs
