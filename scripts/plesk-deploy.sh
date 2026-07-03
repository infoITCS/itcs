#!/bin/bash
set -uo pipefail

echo "==> ITCS Plesk deployment started"
echo "PWD:  $(pwd)"
echo "USER: $(whoami)"
echo "HOME: ${HOME:-not set}"

find_node_bin_dir() {
  local candidates=()

  if [ -d /opt/plesk/node ]; then
    while IFS= read -r bin_dir; do
      candidates+=("$bin_dir")
    done < <(ls -d /opt/plesk/node/*/bin 2>/dev/null | sort -Vr)
  fi

  if [ -n "${HOME:-}" ] && [ -d "$HOME/nodevenv" ]; then
    while IFS= read -r bin_dir; do
      candidates+=("$bin_dir")
    done < <(find "$HOME/nodevenv" -maxdepth 5 -type d -name bin 2>/dev/null | sort -Vr)
  fi

  candidates+=(
    "/opt/plesk/node/20/bin"
    "/opt/plesk/node/18/bin"
    "/usr/local/bin"
    "/usr/bin"
  )

  for bin_dir in "${candidates[@]}"; do
    if [ -x "$bin_dir/node" ] && [ -x "$bin_dir/npm" ]; then
      echo "$bin_dir"
      return 0
    fi
  done

  if command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
    dirname "$(command -v node)"
    return 0
  fi

  return 1
}

NODE_BIN_DIR="$(find_node_bin_dir)" || {
  echo ""
  echo "ERROR: node/npm not found on this server."
  echo "Fix: In Plesk go to Node.js -> enable Node.js for this domain -> choose version 20.x -> then click Deploy now again."
  exit 1
}

export PATH="$NODE_BIN_DIR:$PATH"
export NODE_ENV=production
export NPM_CONFIG_PRODUCTION=false

echo "Using Node from: $NODE_BIN_DIR"
echo "Node: $("$NODE_BIN_DIR/node" -v)"
echo "NPM:  $("$NODE_BIN_DIR/npm" -v)"

set -e
"$NODE_BIN_DIR/npm" install
"$NODE_BIN_DIR/npm" run build

mkdir -p src/Backend/uploads tmp
touch tmp/restart.txt

echo "==> ITCS Plesk deployment finished"
