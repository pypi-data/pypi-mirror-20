#!/bin/bash

# xtrace prints commands as we run them
set -euo pipefail
set -o xtrace

CTXDIR=../..
CTXK=$CTXDIR/bin/ctx
READSIM=$CTXDIR/libs/readsim/readsim
ALLREADS=$CTXDIR/libs/seq_file/scripts/perfect_covg.sh
STRCHK=$CTXDIR/libs/bioinf-perl/sim_mutations/sim_substrings.pl
CONTIG_STATS=$CTXDIR/libs/bioinf-perl/fastn_scripts/contig_stats.pl
LINK_PROC=$CTXDIR/scripts/cortex_links.pl
LINK_THRESH_SCRIPT=$CTXDIR/scripts/R/make_link_cutoffs.R
# DNACAT=$CTXDIR/libs/seq_file/bin/dnacat

REF=$CTXDIR/results/data/chr22/uniq_flanks/chr22.1Mbp.uniq.fa
ERR_PROFILE=$CTXDIR/results/data/PhiX/PhiX.1.fq.gz
READLEN=120
DEPTH=100
ERR_RATE=0.005 # 0.5% per base sequencing error

# How many contigs to pull out to find median walk distance
NSEED_MEDIAN_WALK=100

# Memory to use for each command
MEM=5G

#
# Finished configure
#

# Get executable for a given kmer size
getctx () {
  k="$1"
  echo "$CTXK"$[ ($k+31)/32*32-1 ];
}

kmers=$(echo 15 21 31 41 51 63 75 99)
nkmers=$(echo $kmers | tr ' ' '\n' | awk 'END{print NR}')

# create directories
for k in $kmers; do
  mkdir -p k$k/{,graphs,links,contigs,results,kmer_cleaning,link_cleaning}
  [ -x $(getctx $k) ] || ( echo "Please compile cortex with 'make MAXK=$[ ($k+31)/32*32-1 ]'" 1>&2 && false )
done

mkdir -p reads

# g = graph, l = links
# P = perfect, S = stochastic, E = stochastic+error
# raw = pre-cleaning, clean = after cleaning
# e.g. gPF.lPF.raw.ctp.gz

name_list=(gP.l0     gS.l0      gE.l0         gP.lP.raw  gS.lS.raw  gS.lS.clean gE.lE.clean    gS.lE.clean  gE.lS.clean)
glist=(    perf.ctx  stoch.ctx  stocherr.ctx  perf.ctx   stoch.ctx  stoch.ctx   stocherr.ctx   stoch.ctx    stocherr.ctx)
llist=(    ''        ''         ''            gP.lP.raw  gS.lS.raw  gS.lS.clean gE.lE.clean    gS.lE.clean  gE.lS.clean)
all_indices=$(echo {0..8})
plain_indices=$(echo {0..2})
link_indices=$(echo {3..8})

annot_list=$(for i in $plain_indices; do echo ${name_list[$i]}.plain; done;
             for i in $link_indices;  do echo ${name_list[$i]}.{links,string}; done)

# Generate reads
# Redirect stderr with 2>
[ ! -f reads/perf.fa.gz     ] && ($ALLREADS $READLEN $REF | gzip -c) > reads/perf.fa.gz 2> reads/perf.fa.gz.log
[ ! -f reads/stoch.fa.gz    ] && $READSIM -l $READLEN -r $REF -d $DEPTH -s reads/stoch             >& reads/stoch.fa.gz.log
[ ! -f reads/stocherr.fa.gz ] && $READSIM -l $READLEN -r $REF -d $DEPTH -e $ERR_RATE -s reads/stocherr >& reads/stocherr.fa.gz.log

# Cortex build k=$(K)
echo == Building cortex graphs ==

for k in $kmers; do
  mkdir -p k$k/graphs
  [ ! -f k$k/graphs/perf.ctx         ] && `getctx $k` build -m $MEM -k $k --sample chr22_17M_18M --seq reads/perf.fa.gz     k$k/graphs/perf.ctx                >& k$k/graphs/perf.ctx.log

  if [ $k == 99 ]; then clean_thresh="--supernodes=3"; else clean_thresh=""; fi # Use auto threshold for k<99
  [ ! -f k$k/graphs/stocherr.raw.ctx ] && `getctx $k` build -m $MEM -k $k --sample chr22_17M_18M --seq reads/stocherr.fa.gz k$k/graphs/stocherr.raw.ctx                             >& k$k/graphs/stocherr.raw.ctx.log
  [ ! -f k$k/graphs/stocherr.ctx     ] && `getctx $k` clean -m $MEM $clean_thresh --covg-before k$k/graphs/stocherr.raw.covg.csv --out k$k/graphs/stocherr.ctx k$k/graphs/stocherr.raw.ctx >& k$k/graphs/stocherr.ctx.log

  thresh=$(cat k$k/graphs/stocherr.ctx.log | grep -m 1 'Removing supernodes with coverage < ' | grep -o '[0-9]*' | tail -1)
  [ ! -f k$k/graphs/stoch.raw.ctx    ] && `getctx $k` build -m $MEM -k $k --sample chr22_17M_18M --seq reads/stoch.fa.gz    k$k/graphs/stoch.raw.ctx                                                           >& k$k/graphs/stoch.raw.ctx.log
  [ ! -f k$k/graphs/stoch.ctx        ] && `getctx $k` clean -m $MEM --tips $[$k*2] --supernodes=$thresh --covg-before k$k/graphs/stoch.raw.covg.csv --out k$k/graphs/stoch.ctx k$k/graphs/stoch.raw.ctx >& k$k/graphs/stoch.ctx.log
done

echo == Read threading ==

for k in $kmers; do
  [ ! -f k$k/links/gP.lP.raw.ctp.gz ] && `getctx $k` thread -m $MEM --out k$k/links/gP.lP.raw.ctp.gz --seq reads/perf.fa.gz     k$k/graphs/perf.ctx     >& k$k/links/gP.lP.raw.ctp.gz.log
  [ ! -f k$k/links/gS.lS.raw.ctp.gz ] && `getctx $k` thread -m $MEM --out k$k/links/gS.lS.raw.ctp.gz --seq reads/stoch.fa.gz    k$k/graphs/stoch.ctx    >& k$k/links/gS.lS.raw.ctp.gz.log
  [ ! -f k$k/links/gE.lE.raw.ctp.gz ] && `getctx $k` thread -m $MEM --out k$k/links/gE.lE.raw.ctp.gz --seq reads/stocherr.fa.gz k$k/graphs/stocherr.ctx >& k$k/links/gE.lE.raw.ctp.gz.log

  [ ! -f k$k/links/gS.lE.raw.ctp.gz ] && `getctx $k` thread -m $MEM --out k$k/links/gS.lE.raw.ctp.gz --seq reads/stocherr.fa.gz k$k/graphs/stoch.ctx    >& k$k/links/gS.lE.raw.ctp.gz.log
  [ ! -f k$k/links/gE.lS.raw.ctp.gz ] && `getctx $k` thread -m $MEM --out k$k/links/gE.lS.raw.ctp.gz --seq reads/stoch.fa.gz    k$k/graphs/stocherr.ctx >& k$k/links/gE.lS.raw.ctp.gz.log
done

echo == Link Cleaning ==

for k in $kmers; do

  # Pick a threshold using stocherr links on stocherr graph
  if [ ! -f k$k/links/cleaning.txt ]; then
    # Generate table of first 1000 kmers with links
    $LINK_PROC list --limit 1000 <(gzip -fcd k$k/links/gE.lE.raw.ctp.gz) k$k/links/gE.lE.raw.ctp.gz.effcovg.csv k$k/links/gE.lE.raw.ctp.gz.links.csv >& k$k/links/gE.lE.raw.ctp.gz.links.csv.log
    R --slave --vanilla --quiet -f $LINK_THRESH_SCRIPT --args $k k$k/links/gE.lE.raw.ctp.gz.links.csv > k$k/links/cleaning.txt
  fi

  # Use this threshold for all graphs
  thresh=$(tail -1 k$k/links/cleaning.txt)

  for f in gP.lP gS.lS gE.lE gS.lE gE.lS; do
    if [ ! -f k$k/links/$f.clean.ctp.gz ]; then
      ($LINK_PROC clean <(gzip -fcd k$k/links/$f.raw.ctp.gz) $thresh | gzip -c) > k$k/links/$f.clean.ctp.gz 2> k$k/links/$f.clean.ctp.gz.log
    fi
  done
done

echo == Assembling contigs for N50 ==

# Used for N50
for k in $kmers; do
  for i in $plain_indices; do
    g=${glist[$i]}; o=${name_list[$i]}
    [ ! -f k$k/contigs/$o.plain.contigs.fa  ] && `getctx $k` contigs -m $MEM -o k$k/contigs/$o.plain.contigs.fa k$k/graphs/$g  >& k$k/contigs/$o.plain.contigs.fa.log
  done

  for i in $link_indices; do
    g=${glist[$i]}; o=${name_list[$i]}; l=${llist[$i]}
    [ ! -f k$k/contigs/$o.links.contigs.fa  ] && `getctx $k` contigs -m $MEM -o k$k/contigs/$o.links.contigs.fa                   --confid-step 0.95 -p k$k/links/$o.ctp.gz k$k/graphs/$g  >& k$k/contigs/$o.links.contigs.fa.log
    [ ! -f k$k/contigs/$o.string.contigs.fa ] && `getctx $k` contigs -m $MEM -o k$k/contigs/$o.string.contigs.fa --use-seed-paths --confid-step 0.95 -p k$k/links/$o.ctp.gz k$k/graphs/$g  >& k$k/contigs/$o.string.contigs.fa.log
  done

  # Remove duplicates in contigs
  for annot in $annot_list; do
    [ ! -f k$k/contigs/$annot.contigs.rmdup.fa ] && \
      `getctx $k` rmsubstr -k $k -m $MEM -o k$k/contigs/$annot.contigs.rmdup.fa k$k/contigs/$annot.contigs.fa >& k$k/contigs/$annot.rmdup.fa.log
  done
done

echo == Median walk distance ==

# Get median walk distance
# example: med_walk <kmer_size> <graph> [-p link_file.ctp]
med_walk() {
  k="$1"; g="$2"; pathargs="$3";
  ctx=$(getctx $k)
  dist=$($ctx contigs -m $MEM --reseed --ncontigs $NSEED_MEDIAN_WALK $pathargs $g 2>&1 | \
         grep -ioE 'Lengths:.*median: [0-9,]*' | grep -oE '[0-9,]+$' | tr -d ',')
  printf "med_walk,$dist\n"
}

for k in $kmers; do
  mkdir -p k$k/results
  for i in $plain_indices; do
    g=${glist[$i]}; o=${name_list[$i]}
    [ ! -f k$k/results/$o.plain.medwalk.txt  ] && med_walk $k k$k/graphs/$g ''                           > k$k/results/$o.plain.medwalk.txt
  done
  for i in $link_indices; do
    g=${glist[$i]}; o=${name_list[$i]}; l=${llist[$i]}
    [ ! -f k$k/results/$o.links.medwalk.txt  ] && med_walk $k k$k/graphs/$g "-p k$k/links/$l.ctp.gz"     > k$k/results/$o.links.medwalk.txt
    [ ! -f k$k/results/$o.string.medwalk.txt ] && cp k$k/results/$o.links.medwalk.txt k$k/results/$o.string.medwalk.txt
  done
done

echo == Contig stats ==

for k in $kmers; do
  mkdir -p k$k/results

  for annot in $annot_list; do
    [ ! -f k$k/results/$annot.contigs.rmdup.csv ] && \
      ( $CONTIG_STATS --print-csv k$k/contigs/$annot.contigs.rmdup.fa | \
        cat - k$k/results/$annot.medwalk.txt ) \
        > k$k/results/$annot.contigs.rmdup.csv
  done
done

# Combine CSV files to summarise statistics
echo == Merging CSV files ==

colidx=$(echo $(eval echo '{1,$[{1..'$nkmers'}*2]}') | tr ' ' ',');

for annot in $annot_list; do
  [ ! -f $annot.stats.csv ] && \
    (printf "metric,k%s\n" $(echo $kmers | sed 's/ /,k/g');
     printf "kmer,%s\n" $(echo $kmers | tr ' ' ',');
     paste -d, k*/results/$annot.contigs.rmdup.csv | \
     cut -d, -f $colidx - | tail -n +2) > $annot.stats.csv
done

# Stats
echo == Checking contig matches ==

for k in $kmers; do
  for annot in $annot_list; do
    [ ! -f k$k/results/$annot.contigs.rmdup.fa.txt ] && $STRCHK $k 0.1 k$k/contigs/$annot.contigs.rmdup.fa $REF >& k$k/results/$annot.contigs.rmdup.fa.txt
  done
done

# Now make plots with:
mkdir -p plots
echo Plot with:
files=$(for a in $annot_list; do echo $a'.stats.csv'; done)
echo "  " R --vanilla -f plot-results.R --args $files
