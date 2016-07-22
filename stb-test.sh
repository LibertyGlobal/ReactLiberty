#!/bin/bash

set -e

mkdir -p reports

stb memory start qtbrowser
export STB_TEST=1
karma start || FAIL=$?
sleep 0.5
stb memory stop 1> reports/memory.csv

if [ "$FAIL" != "" ]
then
  exit $FAIL
fi
