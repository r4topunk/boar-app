#!/usr/bin/env bash
# Audits an APK's network surface with scripts/audit-apk.py and writes a report anyone can reproduce
# (docs/OFFLINE_PROOF.md). Exit 1 unless:
# - the offline variant is NO-NETWORK-BY-CONSTRUCTION (no INTERNET permission, no Play Services or
#   tracker classes); the downloader variant only gets the report, since it needs the network by design,
# - with RELEASE=1, the APK is signed with the release key (check-release-apk.sh's RELEASE_SIGNER).
#
#   scripts/offline-proof.sh dist/boar-offline-1.1.0-arm64.apk
#   RELEASE=1 scripts/offline-proof.sh boar-offline-v1.1.0-arm64.apk
#   RELEASE_VARIANT=downloader scripts/offline-proof.sh boar-v1.1.0-arm64.apk
#   make offline-proof APK=path.apk [RELEASE_VARIANT=downloader] [RELEASE=1]
#
# Reports go to dist/offline-proof/<apk>.md and .json (OUT= to change). Needs python3 and the Android
# SDK build-tools (aapt2); no Java.
set -euo pipefail

apk=${1:?usage: $0 <app.apk>}
variant=${RELEASE_VARIANT:-offline}
[[ -f "$apk" ]] || { echo "not found: $apk" >&2; exit 2; }
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
out=${OUT:-$ROOT/dist/offline-proof}

args=("$apk" --out "$out")
if [[ "${RELEASE:-0}" == 1 ]]; then
  signer=$(sed -n 's/^RELEASE_SIGNER=\([0-9a-f]\{64\}\).*/\1/p' "$ROOT/scripts/check-release-apk.sh")
  [[ -n "$signer" ]] || { echo "no RELEASE_SIGNER in scripts/check-release-apk.sh" >&2; exit 2; }
  args+=(--expect-signer "$signer")
fi

status=0
python3 "$ROOT/scripts/audit-apk.py" "${args[@]}" || status=$?
stem=$(basename "$apk" .apk)
verdict=$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1]))["verdict"])' "$out/$stem.json")
echo "report: $out/$stem.md"

case "$status" in
  3) echo "FAIL: $apk is not signed with the release key" >&2; exit 1 ;;
  0|1) ;;
  *) exit "$status" ;;
esac
case "$variant" in
  offline)
    [[ "$verdict" == NO-NETWORK-BY-CONSTRUCTION ]] || { echo "FAIL: offline APK is $verdict" >&2; exit 1; } ;;
  downloader) ;;
  *) echo "RELEASE_VARIANT must be offline or downloader" >&2; exit 2 ;;
esac
echo "OK: $apk ($variant): $verdict$([[ "${RELEASE:-0}" == 1 ]] && echo ", signed with the release key")"
