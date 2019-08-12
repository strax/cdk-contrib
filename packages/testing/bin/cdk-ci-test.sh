#!/bin/sh

if has-script "test:tap"; then
  command npm --silent run-script test:tap | npx --quiet tap-xunit > test-results.xml
  echo "Wrote test results to $(pwd)/test-results.xml"
fi