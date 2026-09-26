#!/usr/bin/env bash
# Wait for a quiet mini (swap < 1 GiB, 1-min load < 2), then run the whole matrix
# inside ONE ~/boar/bin/heavy invocation. The gate is re-checked after taking the
# lock, so a busy machine never produces numbers. Records the machine state next to them.
# Usage: gated-run.sh <model.gguf> <label> [configs...]
set -uo pipefail
MAX_SWAP_MB="${MAX_SWAP_MB:-1024}"; MAX_LOAD="${MAX_LOAD:-2}"; MAX_WAIT_S="${MAX_WAIT_S:-14400}"

quiet() {
  local swap load
  swap=$(sysctl -n vm.swapusage | awk '{for(i=1;i<=NF;i++) if($i=="used") {gsub("M","",$(i+2)); print int($(i+2))}}')
  load=$(sysctl -n vm.loadavg | awk '{print $2}')
  echo "$(date +%H:%M:%S) swap_used_mb=$swap load1=$load"
  [ "$swap" -lt "$MAX_SWAP_MB" ] && awk -v l="$load" -v m="$MAX_LOAD" 'BEGIN{exit !(l<m)}'
}

if [ "${1:-}" = "--inside" ]; then
  shift
  quiet || { echo "GATE FAILED inside lock, not measuring"; exit 3; }
  OUT="$HOME/boar/spikes/results/$2"; mkdir -p "$OUT"
  { date; uptime; sysctl vm.swapusage; memory_pressure | tail -1; ps -Ao %cpu,rss,comm -r | head -8; } > "$OUT/machine-state.txt"
  "$HOME/boar/spikes/bench-mini.sh" "$@"
  { echo "--- after"; date; uptime; sysctl vm.swapusage; } >> "$OUT/machine-state.txt"
  exit 0
fi

start=$(date +%s)
until quiet; do
  [ $(( $(date +%s) - start )) -gt "$MAX_WAIT_S" ] && { echo "gave up waiting for a quiet machine"; exit 4; }
  sleep 60
done
exec "$HOME/boar/bin/heavy" Caldera "$0" --inside "$@"
