#!/bin/bash

set -euo pipefail
set -o xtrace

if [ ! -d jelly-hash ]; then
  git clone https://github.com/noporpoise/jelly-hash.git
else
  cd jelly-hash && git pull && cd ..
fi

cd jelly-hash && make && cd ..

for T in 1 2 4
do
  # jellyhash takes the number of bits (-k)

  echo "Run JellyHash to flush cache"
  ./jelly-hash/speedtest -t $T -k 62 -l 22 -b 25 80000000 >& /dev/null

  echo "JellyHash hashtable with $T threads 80M entries"
  time ./jelly-hash/speedtest -t $T -k 62 -l 22 -b 25 80000000
  time ./jelly-hash/speedtest -t $T -k 62 -l 22 -b 25 80000000
  time ./jelly-hash/speedtest -t $T -k 62 -l 22 -b 25 80000000
  time ./jelly-hash/speedtest -t $T -k 62 -l 22 -b 25 80000000
  time ./jelly-hash/speedtest -t $T -k 62 -l 22 -b 25 80000000

  if [ "$1" != "--lowmem" ]; then
    echo "JellyHash hashtable with $T threads 800M entries"
    time ./jelly-hash/speedtest -t $T -k 62 -l 25 -b 32 800000000
    time ./jelly-hash/speedtest -t $T -k 62 -l 25 -b 32 800000000
    time ./jelly-hash/speedtest -t $T -k 62 -l 25 -b 32 800000000
    time ./jelly-hash/speedtest -t $T -k 62 -l 25 -b 32 800000000
    time ./jelly-hash/speedtest -t $T -k 62 -l 25 -b 32 800000000
  fi
done

for T in 0 1 2 4
do
  # echo "McCortex hashtable with $T threads"
  echo "Run McCortex to flush cache"
  ../../bin/mccortex31 hashtest -t $T -k 31 -m 2G -n 100M 80000000 >& /dev/null

  echo "McCortex hashtable with $T threads 80M entries"
  time ../../bin/mccortex31 hashtest -t $T -k 31 -m 2G -n 100M 80000000
  time ../../bin/mccortex31 hashtest -t $T -k 31 -m 2G -n 100M 80000000
  time ../../bin/mccortex31 hashtest -t $T -k 31 -m 2G -n 100M 80000000
  time ../../bin/mccortex31 hashtest -t $T -k 31 -m 2G -n 100M 80000000
  time ../../bin/mccortex31 hashtest -t $T -k 31 -m 2G -n 100M 80000000

  if [ "$1" != "--lowmem" ]; then
    echo "McCortex hashtable with $T threads 800M entries"
    time ../../bin/mccortex31 hashtest -t $T -k 31 -m 10G -n 1G 800000000
    time ../../bin/mccortex31 hashtest -t $T -k 31 -m 10G -n 1G 800000000
    time ../../bin/mccortex31 hashtest -t $T -k 31 -m 10G -n 1G 800000000
    time ../../bin/mccortex31 hashtest -t $T -k 31 -m 10G -n 1G 800000000
    time ../../bin/mccortex31 hashtest -t $T -k 31 -m 10G -n 1G 800000000
  fi
done

# grep '(^real|\[cmd\])'
