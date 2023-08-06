[![safety](https://raw.githubusercontent.com/pyupio/safety/master/safety.png)](https://pyup.io/safety/)

[![PyPi](https://img.shields.io/pypi/v/safety.svg)](https://pypi.python.org/pypi/safety)
[![Travis](https://img.shields.io/travis/pyupio/safety.svg)](https://travis-ci.org/pyupio/safety)
[![Updates](https://pyup.io/repos/github/pyupio/safety/shield.svg)](https://pyup.io/repos/github/pyupio/safety/)

Safety checks your installed dependencies for known security vulnerabilities

# Installation

Install `safety` with pip

```bash
pip install safety
```

# Usage

To check your currently selected virtual environment for dependencies with known security
 vulnerabilites, run:

```bash
safety check
```

You should get a report similar to this:
```bash
╒══════════════════════════════════════════════════════════════════════════════╕
│                                                                              │
│                               /$$$$$$            /$$                         │
│                              /$$__  $$          | $$                         │
│           /$$$$$$$  /$$$$$$ | $$  \__//$$$$$$  /$$$$$$   /$$   /$$           │
│          /$$_____/ |____  $$| $$$$   /$$__  $$|_  $$_/  | $$  | $$           │
│         |  $$$$$$   /$$$$$$$| $$_/  | $$$$$$$$  | $$    | $$  | $$           │
│          \____  $$ /$$__  $$| $$    | $$_____/  | $$ /$$| $$  | $$           │
│          /$$$$$$$/|  $$$$$$$| $$    |  $$$$$$$  |  $$$$/|  $$$$$$$           │
│         |_______/  \_______/|__/     \_______/   \___/   \____  $$           │
│                                                          /$$  | $$           │
│                                                         |  $$$$$$/           │
│  by pyup.io                                              \______/            │
│                                                                              │
╞══════════════════════════════════════════════════════════════════════════════╡
│ REPORT                                                                       │
╞══════════════════════════════════════════════════════════════════════════════╡
│ No known security vulnerabilities found.                                     │
╘══════════════════════════════════════════════════════════════════════════════╛
```

Now, let's install something insecure:

```bash
pip install insecure-package
```
*Yeah, you can really install that.*

Run `safety check` again:
```bash
╒══════════════════════════════════════════════════════════════════════════════╕
│                                                                              │
│                               /$$$$$$            /$$                         │
│                              /$$__  $$          | $$                         │
│           /$$$$$$$  /$$$$$$ | $$  \__//$$$$$$  /$$$$$$   /$$   /$$           │
│          /$$_____/ |____  $$| $$$$   /$$__  $$|_  $$_/  | $$  | $$           │
│         |  $$$$$$   /$$$$$$$| $$_/  | $$$$$$$$  | $$    | $$  | $$           │
│          \____  $$ /$$__  $$| $$    | $$_____/  | $$ /$$| $$  | $$           │
│          /$$$$$$$/|  $$$$$$$| $$    |  $$$$$$$  |  $$$$/|  $$$$$$$           │
│         |_______/  \_______/|__/     \_______/   \___/   \____  $$           │
│                                                          /$$  | $$           │
│                                                         |  $$$$$$/           │
│  by pyup.io                                              \______/            │
│                                                                              │
╞══════════════════════════════════════════════════════════════════════════════╡
│ REPORT                                                                       │
╞══════════════════════════╤═══════════════╤═══════════════════╤═══════════════╡
│ package                  │ installed     │ affected          │ source        │
╞══════════════════════════╧═══════════════╧═══════════════════╧═══════════════╡
│ insecure-package         │ 0.1.0         │ <0.2.0            │ changelog     │
╘══════════════════════════╧═══════════════╧═══════════════════╧═══════════════╛
```

## From files
Just like pip, Safety is able to read local requirement files:

```bash
safety check -r requirements.txt
```

## From stdin
Safety is also able to read from stdin with the `--stdin` flag set.

To check a local requirements file, run:
```
cat requirements.txt | safety check --stdin
```

or the output of `pip freeze`:
```
pip freeze | safety check --stdin
```

or to check a single package:
```
echo "insecure-package==0.1" | safety check --stdin
```

## Travis

```
install:
  - pip install safety

script:
  - safety check
```

# How it Works


# Support

If you are using `safety` in one of your projects, please consider getting a paid
[pyup.io](https://pyup.io) account. This is what makes projects like this possible.


=======
History
=======

1.1.0 (2017-03-23)
------------------

* Compatablity release. Safety should now run on macOs, Linux and Windows with Python 2.7, 3.3-3.6.
 Python 2.6 support is available on a best-effort basis on Linux.

1.0.2 (2017-03-23)
------------------

* Fixed another error on Python 2. The fallback function for get_terminal_size wasn't working correctly.

1.0.1 (2017-03-23)
------------------

* Fixed an error on Python 2, FileNotFoundError was introduced in Python 3.

1.0.0 (2017-03-22)
------------------

* Added terminal size detection. Terminals with fewer than 80 columns should now display nicer reports.
* Added an option to load the database from the filesystem or a mirror that's reachable via http(s).
 This can be done by using the --db flag.
* Added an API Key option that uses pyup.io's vulnerability database.
* Added an option to cache the database locally for 2 hours. The default still is to not use the cache. Use the --cache flag.


0.6.0 (2017-03-10)
------------------

* Made the requirements parser more robust. The parser should no longer fail on editable requirements
  and requirements that are supplied by package URL.
* Running safety requires setuptools >= 16

0.5.1 (2016-11-08)
------------------

* Fixed a bug where not all requirement files were read correctly.

0.5.0 (2016-11-08)
------------------

* Added option to read requirements from files.

0.4.0 (2016-11-07)
------------------

* Filter out non-requirements when reading from stdin.

0.3.0 (2016-10-28)
------------------

* Added option to read from stdin.

0.2.2 (2016-10-21)
------------------

* Fix import errors on python 2.6 and 2.7.

0.2.1 (2016-10-21)
------------------

* Fix packaging bug.

0.2.0 (2016-10-20)
------------------

* Releasing first prototype.

0.1.0 (2016-10-19)
------------------

* First release on PyPI.


