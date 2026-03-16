#!/usr/bin/env bash
set -euo pipefail

if [ ! -d node_modules ]; then
  echo "[run-dev-and-check] node_modules missing. Run scripts/install-deps.sh first." >&2
  exit 2
fi

PORT="${PORT:-3000}"

npm run dev -- --hostname 0.0.0.0 --port "$PORT" >/tmp/shays-library-dev.log 2>&1 &
DEV_PID=$!
trap 'kill $DEV_PID >/dev/null 2>&1 || true' EXIT

for i in $(seq 1 60); do
  if curl -fsS "http://127.0.0.1:${PORT}" >/dev/null 2>&1; then
    echo "[run-dev-and-check] Dev server is up on :$PORT"
    exit 0
  fi
  sleep 1
done

echo "[run-dev-and-check] Dev server failed to start. Last log lines:" >&2
tail -n 80 /tmp/shays-library-dev.log >&2 || true
exit 1
