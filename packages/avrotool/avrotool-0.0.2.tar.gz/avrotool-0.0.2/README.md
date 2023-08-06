# AvroTool

A python commandline tool to manipulate Avro files

## Installation

    pip install avrotool

Note: if you have build issues on OSX, try

    brew install snappy
    CPPFLAGS="-I/usr/local/include -L/usr/local/lib" pip install python-snappy
    pip install avrotool

## Usage (Basic)

To print the avro usage

    avro 
    avro -help, -h

To print detailed information about a command

    avro -help-command COMMAND

To print the version

    avro version


## Print Schema

To print the avro schema :

    avro schema -f AVRO_FILE (-format json|text)

## Extract Data

To extract named columns to STDOUT

    avro extract -f AVRO_FILE -columns a,b,c,d,e

## CHANGELOG

2017-03-19 0.0.1 Initial Prerelease.  `schema` and `extract` functionality only.
