#!/usr/bin/env bash
set -euo pipefail

# Prefer modern proxy env names; avoid deprecated npm env key warning noise.
unset npm_config_http_proxy || true
unset npm_config_https_proxy || true

REGISTRY="${NPM_REGISTRY_URL:-https://registry.npmjs.org/}"

echo "[install-deps] Using registry: $REGISTRY"

npm config set registry "$REGISTRY" --location=project >/dev/null

if npm ping --registry "$REGISTRY" >/dev/null 2>&1; then
  echo "[install-deps] Registry reachable. Installing dependencies..."
  npm install
  echo "[install-deps] Done."
else
  echo "[install-deps] ERROR: Registry is unreachable or blocked: $REGISTRY" >&2
  echo "[install-deps] Try one of the following:" >&2
  echo "  1) Export NPM_REGISTRY_URL to your org mirror and rerun." >&2
  echo "  2) Ensure proxy allows package registry access." >&2
  echo "  3) Configure auth token for private registry (if required)." >&2
  exit 2
fi
