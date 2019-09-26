#!/bin/sh
# Retrives the version number and writes it to a json file

PACKAGE_VERSION=$(cat node_modules/@dvsa/mes-test-schema/package.json \
  | grep version  \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

jsonOutput="{ \"version\": \"$PACKAGE_VERSION\" }"
jsOutput="export const testSchemaVersion = \"$PACKAGE_VERSION\";"

echo $jsonOutput > test-schema-version.json
echo $jsOutput > test-schema-version.js

echo $jsonOutput, $jsOutput