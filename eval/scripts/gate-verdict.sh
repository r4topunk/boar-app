#!/usr/bin/env bash
# Every check after a gate run, in one step: fixed regression cases, s32 (Jev judge + no-regression check), control
# comparison, uncited-answer net, CIT-1 citations and context, citation audit, PT vs EN. Prints one line per criterion
# and exits 0 = PASS, 1 = a blocking criterion fails. The accepted PQ case (1.5B names ECC in 1 of 5 seeds,
# Boar 2026-09-27) is reported, not blocking, while the control has it too.
# Usage (from the eval worktree root): bash eval/scripts/gate-verdict.sh <control-label> <candidate-label>
set -uo pipefail
C="$1"; K="$2"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
JUDGES=jev bash "$ROOT/eval/scripts/gate-s32-judge.sh" "$K" >/dev/null 2>&1 || echo "s32 judge: failed"
cd "$ROOT/eval"
FAIL=0
line() { printf '%-28s %s\n' "$1" "$2"; }

node scripts/regress.mjs --name "gate-$K" --runs "results/gates/$K/runs" >/dev/null 2>&1
BLOCK=$(grep "| \*\*FAIL\*\*" "reports/regression-gate-$K.md" | grep -v "crypto-named-001" | wc -l | tr -d ' ')
PQ=$(grep "| \*\*FAIL\*\*" "reports/regression-gate-$K.md" | grep -c "crypto-named-001")
PQC=$(grep "| \*\*FAIL\*\*" "reports/regression-gate-$C.md" 2>/dev/null | grep -c "crypto-named-001")
[ "$BLOCK" -gt 0 ] && FAIL=1
[ "$PQ" -gt "$PQC" ] && FAIL=1
line "fixed cases" "$([ "$BLOCK" = 0 ] && echo PASS || echo "FAIL ($BLOCK)") · PQ failures $PQ (control $PQC)$([ "$PQ" -gt "$PQC" ] && echo ' FAIL: more than the control')"

S32=$(node scripts/s32-gate-check.mjs "$C" "$K" --judges jev 2>/dev/null | grep '^TL;DR' | sed -E 's/TL;DR: //; s/\. (4B:|Regenerate).*//'); rc=$?
echo "$S32" | grep -q FAIL && FAIL=1; echo "$S32" | grep -q INCOMPLETE && FAIL=1
line "s32 (Jev)" "$S32"

node scripts/gate-compare.mjs "$C" "$K" --no-model safety-006,safety-007 >/dev/null 2>&1
line "compare vs control" "reports/gate-compare-$C-vs-$K.md"
line "uncited net (s32)" "$(node scripts/preface-regression.mjs "$C" "$K" 2>/dev/null | grep '^TL;DR' | sed -E 's/TL;DR: //; s/\. (4B:|Regenerate).*//')"
node scripts/cit1-report.mjs "$K" >/dev/null 2>&1; line "CIT-1" "reports/cit1-$K.md"
node scripts/citation-audit.mjs --name "$K" --runs "results/gates/$K/runs" >/dev/null 2>&1; line "citation audit" "reports/citations-$K.md"
PT=$(node scripts/pt-gap-check.mjs "$C" "$K" 2>/dev/null | grep '^TL;DR' | sed -E 's/TL;DR: //; s/ Jev, 4B.*//'); [ "${PIPESTATUS[0]}" = 0 ] || true
echo "$PT" | grep -q '\*\*FAIL' && FAIL=1
line "PT vs EN" "$PT"
DEN=$(node scripts/proposal-denial-check.mjs "$K" 2>/dev/null | grep '^TL;DR' | sed -E 's/TL;DR: //; s/ Regenerate.*//')
echo "$DEN" | grep -q '\*\*FAIL' && FAIL=1
line "EIP/ERC/BIP denial" "$DEN"
SCR=$(node scripts/screen-check.mjs "$K" 2>/dev/null | grep '^TL;DR' | sed -E 's/TL;DR: //; s/ Regenerate.*//')
echo "$SCR" | grep -q '\*\*FAIL' && FAIL=1
line "chat screen [n] (CIT-2)" "$SCR"
# SNIPPET_TOPIC=report: the off-topic passage case is reported without blocking (its first candidate, 3ccf7c0).
SNT=$(node scripts/snippet-topic-check.mjs "$K" 2>/dev/null | grep '^TL;DR' | sed -E 's/TL;DR: //; s/ Regenerate.*//')
[ "${SNIPPET_TOPIC:-block}" = block ] && echo "$SNT" | grep -q '\*\*FAIL' && FAIL=1
line "instant passage on topic" "$SNT$([ "${SNIPPET_TOPIC:-block}" = block ] || echo ' (reported, not blocking this run)')"
line "EIP PT (cited page)" "$(node scripts/eip-pt-check.mjs "$C" "$K" 2>/dev/null | grep '^TL;DR' | sed -E 's/TL;DR: //; s/ \(EIP-4844.*//') (target, reported)"
line "VERDICT" "$([ $FAIL = 0 ] && echo PASS || echo FAIL)"
exit $FAIL
