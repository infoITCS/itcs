#!/bin/sh
set -e

echo "==> ITCS Plesk deployment started"
echo "PWD: $(pwd)"

NODE_BIN_DIR=""

if [ -x /opt/plesk/node/20/bin/npm ]; then
  NODE_BIN_DIR=/opt/plesk/node/20/bin
elif [ -x /opt/plesk/node/18/bin/npm ]; then
  NODE_BIN_DIR=/opt/plesk/node/18/bin
fi

if [ -z "$NODE_BIN_DIR" ] && [ -n "${HOME:-}" ] && [ -d "$HOME/nodevenv" ]; then
  for bin_dir in "$HOME"/nodevenv/*/bin "$HOME"/nodevenv/*/*/bin; do
    if [ -x "$bin_dir/npm" ]; then
      NODE_BIN_DIR="$bin_dir"
      break
    fi
  done
fi

if [ -z "$NODE_BIN_DIR" ]; then
  echo "ERROR: npm not found. Enable Node.js in Plesk first."
  exit 1
fi

export PATH="$NODE_BIN_DIR:$PATH"
export NODE_ENV=production
export NPM_CONFIG_PRODUCTION=false

echo "Using Node from: $NODE_BIN_DIR"
"$NODE_BIN_DIR/node" -v
"$NODE_BIN_DIR/npm" -v

"$NODE_BIN_DIR/npm" install
"$NODE_BIN_DIR/npm" run build

mkdir -p src/Backend/uploads tmp
touch tmp/restart.txt

echo "==> ITCS Plesk deployment finished"
