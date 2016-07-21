#!/bin/bash

set -e

mkdir -p reports

stb memory start qtbrowser
karma start || FAIL=$?
sleep 0.5
stb memory stop 1> reports/memory.csv

if [ "$FAIL" != "" ]
then
  exit $FAIL
fi
