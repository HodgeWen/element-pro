#!/bin/sh

set -e

pnpm i --frozen-lockfile
pnpm update:version

pnpm build

find dist/element-pro/packages -type d -name node_modules -print0 | xargs -0 -I {} rm -rf {}

cd dist/element-pro
npm publish --access public
cd -

echo "Publish completed"
