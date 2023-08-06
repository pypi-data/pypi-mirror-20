## Toolbelt

### data and database utilities

![toolbelt](http://www.gusgusdesigns.co.uk/ekmps/shops/gusgusdesigns/images/pretend-toy-carpenters-tool-belt-from-bigjigs-391-p.jpg)

---

This repository provides the source code to the `toolbelt` tool, which is a command line client
written in Python that is used to administer systems administration tasks through a variety
of utilities that have been combined together into a single tool.

*Note: the initial components of this tool previously made up the `replicator`, `geocoder`, `shapeloader` and `load-gnaf` services*

### Overview

Run with `toolbelt` after install (it should be in your path)

Available commands:

* `shapeloader` - load directories of shapefiles into Postgresql with specific support for PSMA distributions (selecting subsets of data, based on bbox or states)
* `initdb` - initializes a database from SQL scripts (for use with `db-schema`)
* `initsearch` - intializes and builds indexes for Elastic Search based on a defined schema

### Install

This project is distributed on PyPi - the Python package management environment. It can be installed across all
platforms easily and usually with a single command (provided you don't require editing the source code)

*Note: this tool will soon be provided as a standalone binary and installer for all platforms using the PyInstaller library*

1. Setup on Mac OS X

Start with Homebrew:

```sh
$ brew install python
$ easy_install toolbelt
```

*Note: This will install toolbelt globally, the better option would be to install it into its own environment using `virtualenv`

2. Setup with Windows

Install [python for Windows](http://www.python.org/download/)

Open a command prompt and run:

```sh
> pip install eac-toolbelt
```

3. Run with Docker

Run the `estateagents/sysadmin` Docker image as a container:

```sh
$ docker run --rm -it estateagents/sysadmin
```

and then in the shell setup a virtual environment and install `eac-toolbelt`:

```sh
$ virtualenv .venv
$ source .venv/bin/activate
$ pip install eac-toolbelt
```

### Running

See the respective repositories in `db-schema` and `search-schema` on how to setup and run this tool in those scenarios.

### Commands

1. shapeloader - Loads Shapefile's into a Postgres or SQL Server database.
1. initdb - Initializes a database schema for Postgres or SQL Server from a set of definition files
1. initsearch - Initializes a search index on Elastic Search from a set of definition files
1. geocode - Geocode addresses using database queries or web service API's and update tables
1. replicate - Replicate one database to another (supports Postgres and SQL Server bidirectionally)
1. maplayer - Modify layer properties in Mapnik XML files (switch layers off and on, change credentials)

### environment files

Configuration is either loaded from the command line, from the environment or from a '.env' file in the current directory or in a parent directory.

Variables all begin with `TOOLBELT_` ex.

1. `TOOLBELT_SRC_DSN` - DSN string for the source database
1. `TOOLBELT_DEST_DSN` - DSN string for the destination database



