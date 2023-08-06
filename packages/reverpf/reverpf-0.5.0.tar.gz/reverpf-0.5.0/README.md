# REVERPF

[![travis-ci][badge-travis]][travis]
[![coveralls-io][badge-coveralls]][coveralls]
[![Open issues][badge-issues]][issues]
[![License][badge-license]][license]

Reverse [Printf].

## I dont understand

Look this code (python):

```python
>>> print("%2d%2d" % (19, 81))
1981
```

Oh well, but what's happen if I need revert the number 1981 to original 19 and
81?:

```shell
$ echo "1981" | reverpf "%2d%2d"
|19|81
```

Of course, only works in fixed print.

## System requirements

* Python3

## Compatibility

I do not know if the printf of C is a standard, but it seems that the python
works the same.

## Instructions
### Installation

```shell
git clone https://github.com/penicolas/reverpf.git
cd reverpf
$ pip install -e .  # for developers
or
$ pip install .
```

Or run without install:

```shell
$ python -m reverpf.reverpf
# or
$ python reverpf.py
```

## Help
### Usage
```
usage: reverpf [-h] -f FORMAT [-i FILE] [-s SEPARATOR] [-v]

optional arguments:
  -h, --help            show this help message and exit
  -f FORMAT, --format FORMAT
                        Format from printf
  -i FILE, --input-file FILE
                        File input
  -s SEPARATOR, --separator SEPARATOR
                        Separator string
  -v, --version         show program's version number and exit
```

### Examples
```shell
# From stdin
$ echo "1981" | reverpf -f "%2d%2d"
;19;81;

# From file
$ reverpf -f "%2d%2d" -i file.txt -s "|"
|19|81|
```

## License

MIT

[Printf]:http://man.he.net/man3/printf
[bad-travis]:https://api.travis-ci.org/penicolas/reverpf.svg?branch=master
[badge-travis]:https://img.shields.io/travis/penicolas/reverpf.svg?style=flat-square
[badge-coveralls]:https://img.shields.io/coveralls/penicolas/reverpf.svg?style=flat-square
[badge-issues]:http://img.shields.io/github/issues/penicolas/reverpf.svg?style=flat-square
[badge-license]:http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[travis]:https://travis-ci.org/penicolas/reverpf
[coveralls]:https://coveralls.io/github/penicolas/reverpf
[heuristics]:https://github.com/penicolas/reverpf/issues/2
[issues]:https://github.com/penicolas/reverpf/issues
[license]:LICENSE
