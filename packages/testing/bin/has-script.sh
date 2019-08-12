#!/bin/sh

set -eo pipefail

command node -p "Object.keys(require('./package.json').scripts || {}).join('\n')" | grep -q "$1"