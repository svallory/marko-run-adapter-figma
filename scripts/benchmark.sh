#!/bin/sh

cd playground

ADAPTER="static"
CONFIG="../tests/fixtures/vite.config.$ADAPTER.ts"

echo
echo ">> Benchmarking adapter: $ADAPTER"
echo "   config: $CONFIG"
time (marko-run build -c $CONFIG > /dev/null)

ADAPTER="figma"
CONFIG="../tests/fixtures/vite.config.$ADAPTER.ts"

echo "\n\n"
echo ">> Benchmarking adapter: $ADAPTER"
echo ">> config: $CONFIG"
time (marko-run build -c $CONFIG > /dev/null)
