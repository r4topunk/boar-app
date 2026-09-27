#!/usr/bin/env bash
# Mandatory gate for any prompt/retrieval change (Boar, 2026-09-26): the first-aid set (dataset `safety`) and the
# quantum-resistant signatures prompt (cryptopack crypto-named-001) on 1.5B and 4B, without packs and with the
# Preparedness + crypto packs installed, over 5 seeds. Runs on the Mac mini through the heavy queue.
# Nothing enters integration unless this exits 0.
#
# Usage (from the eval worktree root): bash eval/scripts/gate-mini.sh <source-tree-path> [git-ref=HEAD] [label]
#   The source tree's committed src/ and assets/corpus/corpus.json at <git-ref> are tested (uncommitted edits are not);
#   eval/ (runner, datasets, checks) comes from this worktree.
# Env: GATE_HOST (r4toMacMini), GATE_SEEDS ("1 2 3 4 5"), GATE_MODELS ("qwen2.5-1.5b-instruct-q4km qwen3-4b-instruct-2507-q4km"),
#      GATE_PIPELINE (app = the tree's createAnswerer, what the phone runs; direct = retrieval straight into the prompt).
# Exit: 0 = all pass, 1 = a case fails (blocker), 2 = incomplete (missing rows, or the tree cannot load packs).
set -euo pipefail
TREE="$(cd "$1" && pwd)"; REF="${2:-HEAD}"
SHA="$(git -C "$TREE" rev-parse --short "$REF")"
LABEL="${3:-$(basename "$TREE")-$SHA}"
HOST="${GATE_HOST:-r4toMacMini}"
SEEDS="${GATE_SEEDS:-1 2 3 4 5}"
MODELS="${GATE_MODELS:-qwen2.5-1.5b-instruct-q4km qwen3-4b-instruct-2507-q4km}"
PIPELINE="${GATE_PIPELINE:-app}"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DEST="boar/gate/$LABEL"
# Pinned packs (sha256 from the knowledge catalog: src/rag/preparedness.ts, src/rag/cryptoPack.ts).
PREP_SHA=65dff5d9988a6fe2bffe17a4d3ab096a1a8f580d20b1ab18d0ada41bbbc0b4e8
CRYPTO_SHA=fe75514ed407ea5f9c0310d3261407c9e779719b7787c2d8c4e7f584dae12c5e

TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
git -C "$TREE" archive "$REF" src assets/corpus/corpus.json | tar -x -C "$TMP"
HAS_PACK=0; [ -f "$TMP/src/rag/wikiPack.ts" ] && [ -f "$TMP/src/rag/testing/nodeSqlite.ts" ] && HAS_PACK=1
if [ "$PIPELINE" = app ] && ! grep -q "export function createAnswerer" "$TMP/src/routing/answer.ts" 2>/dev/null; then echo "GATE INCOMPLETE: $REF has no src/routing/answer.ts createAnswerer (use GATE_PIPELINE=direct)"; exit 2; fi
echo "gate $LABEL: tree $TREE @ $SHA, pipeline $PIPELINE, packs loadable: $HAS_PACK, seeds: $SEEDS"

ssh "$HOST" "mkdir -p ~/$DEST/assets/corpus ~/boar/gate/.cache"
rsync -az --delete "$TMP/src/" "$HOST:$DEST/src/"
rsync -az "$TMP/assets/corpus/corpus.json" "$HOST:$DEST/assets/corpus/corpus.json"
rsync -az --delete --exclude node_modules --exclude .cache --exclude results "$ROOT/eval/" "$HOST:$DEST/eval/"

cat > "$TMP/run.sh" <<EOF
#!/bin/bash
set -u
cd ~/$DEST/eval
[ -d node_modules ] || npm install --no-audit --no-fund --silent
ln -sfn ~/boar/gate/.cache .cache
cd ..
export BOAR_SHARED_MODELS=\$HOME/boar/shared-models
PACKS=\$HOME/boar/shared-data/packs/pinned
echo "$PREP_SHA  \$PACKS/boar-preparedness.sqlite" | shasum -a 256 -c - || exit 3
echo "$CRYPTO_SHA  \$PACKS/boar-crypto.sqlite" | shasum -a 256 -c - || exit 3
O=eval/results/gate-runs; mkdir -p \$O
run() { npx --prefix eval tsx eval/runner/desktop.ts --gpu --pipeline $PIPELINE "\$@" || echo "RUNFAIL \$*"; }
for m in $MODELS; do for s in $SEEDS; do
  for cfg in none packs; do
    [ \$cfg = packs ] && [ $HAS_PACK = 0 ] && continue
    extra=(); name=\${m}__bundled__seed\$s
    [ \$cfg = packs ] && extra=(--pack \$PACKS/boar-preparedness.sqlite,\$PACKS/boar-crypto.sqlite) && name=\${m}__bundled__packs__seed\$s
    run --model \$m --seed \$s --dataset safety \${extra[@]+"\${extra[@]}"} --out \$O/\$name.jsonl
    run --model \$m --seed \$s --dataset cryptopack --ids crypto-named-001 \${extra[@]+"\${extra[@]}"} --out \$O/\$name.jsonl
  done
done; done
echo "$PREP_SHA  \$PACKS/boar-preparedness.sqlite" | shasum -a 256 -c - && echo "$CRYPTO_SHA  \$PACKS/boar-crypto.sqlite" | shasum -a 256 -c -
EOF
scp -q "$TMP/run.sh" "$HOST:$DEST/run.sh"
ssh "$HOST" "~/boar/bin/heavy Sextant bash -l ~/$DEST/run.sh" 2>&1 | grep -E "RUNFAIL|OK$|FAILED|rror" || true

OUT="$ROOT/eval/results/gates/$LABEL"
mkdir -p "$OUT/runs"
rsync -az --delete "$HOST:$DEST/eval/results/gate-runs/" "$OUT/runs/"
cat > "$OUT/meta.json" <<EOF
{ "label": "$LABEL", "tree": "$TREE", "ref": "$REF", "sha": "$SHA", "packsLoadable": $HAS_PACK, "seeds": "$SEEDS", "models": "$MODELS", "pipeline": "$PIPELINE",
  "packs": { "boar-preparedness": "$PREP_SHA", "boar-crypto": "$CRYPTO_SHA" }, "at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)", "host": "$HOST" }
EOF

cd "$ROOT/eval"
set +e
node scripts/regress.mjs --name "gate-$LABEL" --runs "results/gates/$LABEL/runs"
RC=$?
set -e
N_MODELS=$(wc -w <<<"$MODELS"); N_SEEDS=$(wc -w <<<"$SEEDS"); N_CFG=$((1 + HAS_PACK))
EXPECTED=$((N_MODELS * N_SEEDS * N_CFG * 8))
GOT=$(cat "$OUT"/runs/*.jsonl 2>/dev/null | grep -c . || true)
echo "rows: $GOT / $EXPECTED expected"
if [ "$RC" -ne 0 ]; then echo "GATE FAIL: eval/reports/regression-gate-$LABEL.md"; exit 1; fi
if [ "$GOT" -lt "$EXPECTED" ] || [ "$HAS_PACK" = 0 ]; then echo "GATE INCOMPLETE (missing rows or tree without src/rag/wikiPack.ts: merge feat/knowledge first)"; exit 2; fi
echo "GATE PASS: eval/reports/regression-gate-$LABEL.md"
