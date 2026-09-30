#!/usr/bin/env bash
# Prints the network traffic Android's kernel has counted for one app (docs/OFFLINE_PROOF.md, "On a phone").
# Reads `dumpsys netstats detail`: the per-UID BPF counters since boot (mAppUidStatsMap) and the recorded
# per-UID history (UID stats). Exit 0 when both are empty for the app, 1 when it has traffic.
#
#   scripts/netstats-uid.sh team.sopa.aoair.offline     # expect: 0 bytes, exit 0
#   scripts/netstats-uid.sh team.sopa.aoair              # the downloader app: its downloads show up here
#
# ADB=/path/to/adb and ANDROID_SERIAL=<serial> are honoured. Needs USB debugging, not root.
set -euo pipefail

pkg=${1:?usage: $0 <package>}
adb=${ADB:-adb}
uid=$("$adb" shell pm list packages -U "$pkg" | tr -d '\r' | awk -v p="package:$pkg" '$1 == p { sub("uid:", "", $2); print $2 }')
[[ -n "$uid" ]] || { echo "$pkg is not installed" >&2; exit 2; }

"$adb" shell dumpsys netstats --poll >/dev/null 2>&1 || true   # flush pending counters into the history
dump=$("$adb" shell dumpsys netstats detail | tr -d '\r')

# mAppUidStatsMap rows: uid rxBytes rxPackets txBytes txPackets (every interface, loopback included).
live=$(awk -v u="$uid" '/^  mAppUidStatsMap:/ { f = 1; next } f && /^  m/ { f = 0 } f && $1 == u { print $2, $4 }' <<<"$dump")
rx=${live% *}; tx=${live#* }
[[ -n "$live" ]] || { rx=0; tx=0; }
# Recorded history entries for the uid (identity lines look like "uid=10148 set=DEFAULT tag=0x0").
hist=$(awk -v u="uid=$uid" '/^UID stats:/ { f = 1; next } /^UID tag stats:/ { f = 0 } f && index($0, u " ") { n++ } END { print n + 0 }' <<<"$dump")

echo "$pkg uid=$uid  since boot: rx=${rx} B tx=${tx} B  recorded history entries: $hist"
[[ "$rx" == 0 && "$tx" == 0 && "$hist" == 0 ]]
