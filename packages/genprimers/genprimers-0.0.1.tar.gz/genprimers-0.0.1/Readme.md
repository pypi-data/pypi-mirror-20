#Genprimers

Genprimers is a software aimed to produce PCR primers. Unlike other primers
programs, such as primer3, it is focused on generating specific primers for a
set the sequences (defined as targets) which are a subset of a greater set of
sequences (defined as the universe). This is very useful for example when we
have 16S amplicon experiments from ambiental samples, which have a lot of
different miroorganisms, and we are interested in detecting spefific *phylums*
or *clades*. Genprimers is also useful when we have to amplify a specific
biomarker of a subset of individuals belonging to a greater set of closely-
related microorganism.


#Prerequisites
* Bowtie 1
* Python 2.7
* Cython

For the moment, Bowtie 1 is necessary to run genprimers. In the future, this won't be necessary.

#How to install
## Automatic install
Genprimers is available in the Python pip repository
```
$ pip install genprimers
```
## Manual install
Clone the git repository in your local machine
```
$ git clone git@bitbucket.org:lbmg/genprimers.git
```
Enter to the cloned repository
```
$ cd genprimers
```
Install using the python install framework
```
$ python setup.py install
```

#Examples

## Generating the index for the universe

In order to run genprimers, the input FASTA file must be indexed with Bowtie
(for the moment)

```
$ bowtie-build universe.fna universe.fna
```

## Running genprimers

Assuming we already have the FASTA file of the universe indexed with bowtie
and a one-column file containing the IDs of a subset of sequences of the
universe we want to amplify (targets_ids.txt in this example), run genprimers
is as easy as:

```
$ genprimers primers universe.fna targets_ids.txt output_folder 
```

The list of targets IDs can be passed through the standard input

```
$ cat targets_ids.txt | genprimers primers universe.fna output_folder 
```

## Listing all the sequences in the Universe

In order to run Genprimers you need the IDs of the targets in the FASTA file
of the universe, but often we don't know those identifier. To list the IDs in
the universe, and their respectives descriptions, we can use the list command
from genprimers.

```
$ genprimers list unvierse.fna
```

We can filter the output list to report only those sequences belonging to some
class and then use that list to design primers. In the example below we list
all the sequences that fit the *Gluconobacter genus* description and produce
new primers for this subset:

```
$genprimers list universe.fna | grep Gluconobacter | cut -f1 | genprimers primer universe.fna output_prefix
```


