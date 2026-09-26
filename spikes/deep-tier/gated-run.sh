#!/usr/bin/env bash
# Wait for a quiet mini (swap < 1 GiB, 1-min load < 2), then run the whole matrix
# inside ONE ~/boar/bin/heavy invocation. The gate is re-checked after taking the
# lock, so a busy machine never produces numbers. Records the machine state next to them.
# Usage: gated-run.sh <model.gguf> <label> [configs...]
set -uo pipefail
MAX_SWAP_MB="${MAX_SWAP_MB:-1024}"; MAX_LOAD="${MAX_LOAD:-2}"  # raise it when known background load is accounted for (e.g. 5 with 2 pinned bots); MAX_WAIT_S="${MAX_WAIT_S:-14400}"

# Gate: no paging (swapouts/pageouts flat over 30 s) and load below MAX_LOAD.
# Swap that is merely *used* but idle does not perturb a run; active paging does.
quiet() {
  local a b load
  a=$(vm_stat | awk '/Swapouts|Pageouts/ {gsub("\\.","",$2); s+=$2} END{print s}')
  sleep 30
  b=$(vm_stat | awk '/Swapouts|Pageouts/ {gsub("\\.","",$2); s+=$2} END{print s}')
  load=$(sysctl -n vm.loadavg | awk '{print $2}')
  echo "$(date +%H:%M:%S) paged_out_30s=$((b-a)) load1=$load $(sysctl -n vm.swapusage)"
  [ $((b-a)) -eq 0 ] && awk -v l="$load" -v m="$MAX_LOAD" 'BEGIN{exit !(l<m)}'
}

if [ "${1:-}" = "--inside" ]; then
  shift
  # holding the lock, others' heavy jobs cannot start: wait for their tail to drain
  t0=$(date +%s)
  until quiet; do
    [ $(( $(date +%s) - t0 )) -gt "${INSIDE_WAIT_S:-1800}" ] && { echo "GATE FAILED inside lock, not measuring"; exit 3; }
    sleep 60
  done
  OUT="$HOME/boar/spikes/results/$2"; mkdir -p "$OUT"
  { date; uptime; sysctl vm.swapusage; memory_pressure | tail -1; ps -Ao %cpu,rss,comm -r | head -8; } > "$OUT/machine-state.txt"
  "$HOME/boar/spikes/bench-mini.sh" "$@"
  { echo "--- after"; date; uptime; sysctl vm.swapusage; } >> "$OUT/machine-state.txt"
  exit 0
fi

# queue first, gate inside the lock
exec "$HOME/boar/bin/heavy" Caldera "$0" --inside "$@"
