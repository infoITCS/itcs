#!/bin/bash
set -euo pipefail

echo "==> ITCS Plesk deployment started"

# Use Plesk Node.js if available
if [ -d "/opt/plesk/node" ]; then
  NODE_BIN="$(ls -d /opt/plesk/node/*/bin 2>/dev/null | sort -V | tail -n 1)"
  if [ -n "$NODE_BIN" ]; then
    export PATH="$NODE_BIN:$PATH"
  fi
fi

echo "Node: $(node -v)"
echo "NPM:  $(npm -v)"
echo "PWD:  $(pwd)"

export NODE_ENV=production
export NPM_CONFIG_PRODUCTION=false

npm install
npm run build

mkdir -p src/Backend/uploads tmp

# Restart Passenger / Node app on Plesk
touch tmp/restart.txt

echo "==> ITCS Plesk deployment finished"
