#!/usr/bin/env perl

use strict;
use warnings;

use File::Basename;

# Use current directory to find modules
use FindBin;
use lib $FindBin::Bin;
use lib $FindBin::Bin . '/../libs/bioinf-perl/lib';

use CortexScripts; # mccortex_maxk
use CortexGraph;
use CortexLinks;
use FASTNFile;

sub print_usage
{
  for my $err (@_)
  {
    print STDERR "Error: $err\n";
  }

  print STDERR "" .
"Usage: ./cortex_to_graphviz.pl [options] <in.ctx> [...]
  Prints graphviz `dot' output.  Not to be used with large graphs!

  --points         Don't print kmer values, only points
  --simplify       Simplify supernodes
  --kmer <k>       Max kmer size used [default: 31]
  --path <in.ctp>  Load links from file
  --mark <in.fa>   Mark given kmers

  Example: ./cortex_to_graphviz.pl small.ctx > small.dot
           dot -Tpng small.dot > small.png\n";

  exit(-1);
}

my $use_points = 0;
my $simplify = 0;
my $kmer_size = 31;
my $ctp_path;
my $contig_path;

while(@ARGV > 1 && $ARGV[0] =~ /^-./) {
  if($ARGV[0] =~ /^-?-(P|[pP]oints?)$/) {
    shift(@ARGV);
    $use_points = 1;
  }
  elsif($ARGV[0] =~ /^-?-s(implify)?$/i) {
    shift(@ARGV);
    $simplify = 1;
  }
  elsif($ARGV[0] =~ /^-?-k(mer)?$/i) {
    my $arg = shift(@ARGV);
    $kmer_size = shift(@ARGV);
    if(!defined($kmer_size) || $kmer_size !~ /^\d+$/ || ($kmer_size % 2) == 0) {
      print_usage("$arg <k> requires an argument");
    }
  }
  elsif($ARGV[0] =~ /^-?-p(ath)?$/i) {
    my $arg = shift(@ARGV);
    $ctp_path = shift(@ARGV);
    if(!defined($ctp_path)) { print_usage("$arg <in.ctp> requires argument");}
  }
  elsif($ARGV[0] =~ /^-?-m(ark)?$/i) {
    my $arg = shift(@ARGV);
    $contig_path = shift(@ARGV);
    if(!defined($contig_path)) { print_usage("$arg <in.fa> requires argument");}
  }
  else { print_usage("Unknown option '$ARGV[0]'"); }
}

# Round kmer-size up to max kmer size supported by an executable
my $maxk = mccortex_maxk($kmer_size);

if(defined($ctp_path) && $simplify) {
  print_usage("--path <in> and --simplify are not supported together currently");
}

if(defined($contig_path) && $simplify) {
  print_usage("--mark <in> and --simplify are not supported together currently");
}

if(@ARGV != 1) { print_usage(); }
my @files = @ARGV;

my $cmd = dirname(__FILE__)."/../bin/mccortex$maxk";

if(!(-e $cmd)) {
  die("executable bin/mccortex$maxk doesn't exist -- did you compile for MAXK=$maxk?\n");
}
elsif(!(-x $cmd)) {
  die("bin/mccortex$maxk doesn't appear to be executable\n");
}

# graph file reader command
my $cmdline = "$cmd view --quiet --kmers @files";
my $in;
open($in, '-|', $cmdline) or die $!;

my %kmerlinks = (); # kmer->path string

# Read links
if(defined($ctp_path)) {
  my $ctp_fh = open_file($ctp_path);
  my $ctp_file = new CortexLinks($ctp_fh, $ctp_path);

  while(1) {
    my ($kmer, @links) = $ctp_file->next();
    if(!defined($kmer)) { last; }
    if(defined($kmerlinks{$kmer})) { die("Duplicate kmer: $kmer"); }
    $kmerlinks{$kmer} = ctp_path_to_str(@links);
  }
  close($ctp_fh);
}

my %marked_kmers = ();

if(defined($contig_path)) {
  my $fastn = open_fastn_file($contig_path);
  my ($title,$seq);
  while((($title,$seq) = $fastn->read_next()) && defined($title)) {
    my $len = length($seq);
    if($len < $kmer_size) { warn("len(seq) < k [$len < $kmer_size]"); }
    for(my $i = 0; $i + $kmer_size <= $len; $i++) {
      my $kmer = substr($seq, $i, $kmer_size);
      $kmer = kmer_key($kmer);
      $marked_kmers{$kmer} = 1;
    }
  }
  close_fastn_file($fastn);
}

# Print beggining of graphviz file
print "digraph G {\n";
print "  edge [dir=both arrowhead=none arrowtail=none]\n";
print "  node [".($use_points ? "shape=point label=none" : "shape=none")." ".
      'fontname="Courier New" fontsize=9]'."\n";

# Change fontname to "Courier New bold" to make bold

if($simplify)
{
  my $graph = new CortexGraph();
  my $num_cols;

  # Construct graph
  while(defined(my $line = <$in>))
  {
    my ($kmer, $covgs, $edges);
    ($kmer, $covgs, $edges, $num_cols) = parse_ctx_line($line);

    $graph->add_kmer($kmer);

    for(my $i = 0; $i < $num_cols; $i++)
    {
      my @edges_arr = split('', uc($edges->[$i]));

      for my $prev_edge (grep {$_ ne '.'} @edges_arr[0..3]) {
        $graph->add_edges_between(uc($prev_edge).substr($kmer,0,-1), $kmer);
      }

      for my $next_edge (grep {$_ ne '.'} @edges_arr[4..7]) {
        $graph->add_edges_between($kmer, substr($kmer,1).$next_edge);
      }
    }
  }

  # $graph->dump();
  # exit;

  # Get kmer size
  my $kmer_size = $graph->get_kmer_size();

  # print "kmer size: $kmer_size\n";

  # Simplify graph into supernodes
  # Hash of edge kmers -> supernodes
  my %super_graph = ();
  my @supernodes = ();

  for my $key (keys %$graph) {
    if(!defined($graph->{$key}->{'visited'})) {
      my $contig = $graph->get_supernode($key);
      $graph->mark_kmers_visited($contig);
      my $supernode = {'seq' => $contig};
      push(@supernodes, $supernode);
      my $key0 = kmer_key(substr($contig, 0, $kmer_size));
      my $key1 = kmer_key(substr($contig, -$kmer_size));
      $super_graph{$key0} = $supernode;
      $super_graph{$key1} = $supernode;
    }
  }

  # Print nodes
  for my $supernode (@supernodes) {
    print "  $supernode->{'seq'}\n";
  }

  # Print edges
  for my $supernode (@supernodes)
  {
    my $kmer0 = substr($supernode->{'seq'}, 0, $kmer_size);
    my $kmer1 = substr($supernode->{'seq'}, -$kmer_size);
    my ($key0, $key1) = map {kmer_key($_)} ($kmer0, $kmer1);
    my $reverse0 = get_orientation($kmer0, $key0);
    my $reverse1 = get_orientation($kmer1, $key1);

    my @prev_edges = $graph->get_edges($key0,!$reverse0);
    my @next_edges = $graph->get_edges($key1,$reverse1);

    # print "@prev_edges:$kmer0  $kmer1:@next_edges\n";

    for my $next (@next_edges) {
      my $kmer = substr($supernode->{'seq'},-$kmer_size+1).$next;
      my $next_supernode = $super_graph{kmer_key($kmer)};
      print_supernode($supernode, $next, $next_supernode, $kmer, 1);
    }

    for my $prev (@prev_edges) {
      my $kmer = revcmp($prev).substr($supernode->{'seq'},0,$kmer_size-1);
      my $prev_supernode = $super_graph{kmer_key($kmer)};
      print_supernode($supernode, $prev, $prev_supernode, $kmer, 0);
    }
  }
}
else
{
  # Not 'simplifying' contigs

  while(defined(my $line = <$in>))
  {
    my ($kmer, $covgs, $edges, $num_cols) = parse_ctx_line($line);
    if(defined($kmer))
    {
      my $num_edges_printed = 0;

      my @attr = ();

      if(defined($marked_kmers{$kmer})) { push(@attr, 'shape="box"'); }
      if(defined($kmerlinks{$kmer})) { push(@attr, 'label="'.$kmer.'\n'.$kmerlinks{$kmer}.'"'); }

      print "  $kmer".(@attr ? " [".join(' ', @attr)."]" : "")."\n";

      for(my $i = 0; $i < $num_cols; $i++)
      {
        for(my $base = 0; $base < 4; $base++)
        {
          if((my $edge = substr($edges->[$i], $base, 1)) ne ".")
          {
            my $prev_kmer = uc($edge) . substr($kmer,0,-1);
            my $right_base = substr($kmer,-1);
            dump_edge($prev_kmer, $right_base, 0);
            $num_edges_printed++;
          }
        }

        for(my $base = 4; $base < 8; $base++)
        {
          if((my $edge = substr($edges->[$i], $base, 1)) ne ".")
          {
            dump_edge($kmer, uc($edge), 1);
            $num_edges_printed++;
          }
        }
      }
    }
  }
}

close($in);

print "}\n";


sub parse_ctx_line
{
  my ($line) = @_;
  chomp($line);

  # Format:
  # <kmer> <covg0> <covg1> <edges0> <edges1>
  my ($kmer, @columns) = split(' ', $line);

  if($line =~ /Error/i || @columns < 2 || (scalar(@columns) & 1)) {
    die("Invalid line: $line\n");
  }

  my $num_cols = scalar(@columns) / 2;
  my $last_col = $num_cols-1;
  my @covgs = @columns[0..$last_col];
  my @edges = @columns[$num_cols..$#columns];

  # print STDERR "read: $kmer edges:[@edges] covgs:[@covgs]\n";

  return ($kmer, \@covgs, \@edges, $num_cols);
}

sub print_supernode
{
  my ($supernode,$rbase,$next_supernode,$kmer0,$going_right) = @_;

  my $kmer_size = length($kmer0);

  my $kmer1a = substr($next_supernode->{'seq'}, 0, $kmer_size);
  my $kmer1b = substr($next_supernode->{'seq'}, -$kmer_size);
  my ($key0,$key1a,$key1b) = map {kmer_key($_)} ($kmer0, $kmer1a, $kmer1b);

  my ($kmer1, $key1);
  if($key0 eq $key1a) { $kmer1 = $kmer1a; $key1 = $key1a; }
  elsif($key0 eq $key1b) { $kmer1 = $kmer1b; $key1 = $key1b; }
  else { die("Error: Mismatch in supernode edges"); }

  my $arrive_left = $kmer0 eq ($going_right ? $kmer1a : revcmp($kmer1a));

  if(($supernode->{'seq'} lt $next_supernode->{'seq'}) ||
     ($supernode->{'seq'} le $next_supernode->{'seq'} &&
      ($arrive_left != $going_right || $arrive_left && $going_right)))
  {
    my $from = $supernode->{'seq'};
    my $to = $next_supernode->{'seq'};
    print "  $from:" . ($going_right ? 'e' : 'w') . " -> " .
          "$to:"  . ($arrive_left ? 'w' : 'e') . "\n";
  }
}

sub dump_edge
{
  my ($kmer1, $rbase, $going_right) = @_;

  my $kmer2 = substr($kmer1, 1) . $rbase;

  my $key1 = kmer_key($kmer1);
  my $key2 = kmer_key($kmer2);

  my $rev1 = ($kmer1 ne $key1);
  my $rev2 = ($kmer2 ne $key2);

  # When doing right hand edges, do only those that go to left
  #                              or those to a greater key
  # When doing left hand edges, do only those that go to a greater key
  if(($going_right && $rev1 == $rev2) || ($rev1 != $rev2 && $key1 le $key2))
  {
    # Print a coloured edge for each colour that is in both nodes
    print "  $key1:" . ($rev1 ? 'w' : 'e') . " -> " .
            "$key2:" . ($rev2 ? 'e' : 'w') . "\n";
  }
}
