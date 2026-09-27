#!/usr/bin/env bash
# Mandatory gate for any prompt/retrieval change (Boar, 2026-09-26): the first-aid set (dataset `safety`) and the
# quantum-resistant signatures prompt (cryptopack crypto-named-001) on 1.5B and 4B, without packs and with the
# Preparedness + crypto packs of the tree's own catalog installed, over 5 seeds. Runs on the Mac mini through the heavy queue.
# Nothing enters integration unless this exits 0.
#
# Usage (from the eval worktree root): bash eval/scripts/gate-mini.sh <source-tree-path> [git-ref=HEAD] [label]
#   The source tree's committed src/ and assets/corpus/ at <git-ref> are tested (uncommitted edits are not);
#   eval/ (runner, datasets, checks) comes from this worktree.
# Env: GATE_HOST (r4toMacMini), GATE_SEEDS ("1 2 3 4 5"), GATE_MODELS ("qwen2.5-1.5b-instruct-q4km qwen3-4b-instruct-2507-q4km"),
#      GATE_CORPUS (essential = corpus + corpus-standard + corpus-full, the default install),
#      GATE_S32=1 also answers the v1 s32 questions (seed 42, no packs) into results/gates/<label>/s32/ for the judges,
#      GATE_PIPELINE (app = the tree's createAnswerer, what the phone runs; direct = retrieval straight into the prompt).
# Also the "suggestions" item (RT-1): the tree's empty-chat suggestions (src/i18n chat.suggestions, EN+PT) must have
# an on-topic source in the app's search top-3, without packs and with the packs (4B, seed 1: search is model-free).
# Exit: 0 = all pass, 1 = a case fails (blocker), 2 = incomplete (missing rows, or the tree cannot load packs).
set -euo pipefail
TREE="$(cd "$1" && pwd)"; REF="${2:-HEAD}"
SHA="$(git -C "$TREE" rev-parse --short "$REF")"
LABEL="${3:-$(basename "$TREE")-$SHA}"
HOST="${GATE_HOST:-r4toMacMini}"
SEEDS="${GATE_SEEDS:-1 2 3 4 5}"
MODELS="${GATE_MODELS:-qwen2.5-1.5b-instruct-q4km qwen3-4b-instruct-2507-q4km}"
PIPELINE="${GATE_PIPELINE:-app}"
CORPUS="${GATE_CORPUS:-essential}"
S32="${GATE_S32:-0}"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
S32_IDS="$(node -e 'console.log(require(process.argv[1]).ids.join(","))' "$ROOT/eval/dataset/subset.s32.v1.json")"
DEST="boar/gate/$LABEL"

TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
git -C "$TREE" archive "$REF" src assets/corpus | tar -x -C "$TMP"
HAS_PACK=0; [ -f "$TMP/src/rag/wikiPack.ts" ] && [ -f "$TMP/src/rag/testing/nodeSqlite.ts" ] && HAS_PACK=1
# Packs = what this tree's catalog installs (sha256 + pinned URL from src/rag/preparedness.ts and cryptoPack.ts),
# downloaded once per sha into ~/boar/shared-data/packs/pinned/<sha>/ and verified before and after the runs.
cat_field() { grep -oE "$2: \"[^\"]*\"" "$TMP/src/rag/$1.ts" 2>/dev/null | head -1 | cut -d'"' -f2; }
PREP_SHA="$(cat_field preparedness sha256)"; PREP_URL="$(cat_field preparedness sourceUrl)"
CRYPTO_SHA="$(cat_field cryptoPack sha256)"; CRYPTO_URL="$(cat_field cryptoPack sourceUrl)"
if [ "$HAS_PACK" = 1 ] && { [ -z "$PREP_SHA" ] || [ -z "$CRYPTO_SHA" ]; }; then echo "GATE INCOMPLETE: $REF has no preparedness/crypto pack in its catalog"; exit 2; fi
node "$ROOT/eval/scripts/extract-suggestions.mjs" "$TMP" "$TMP/questions.suggestions-gate.jsonl" >/dev/null
N_SUG=$(grep -c . "$TMP/questions.suggestions-gate.jsonl" || true)
SUG_MODEL=qwen3-4b-instruct-2507-q4km
if [ "$PIPELINE" = app ] && ! grep -q "export function createAnswerer" "$TMP/src/routing/answer.ts" 2>/dev/null; then echo "GATE INCOMPLETE: $REF has no src/routing/answer.ts createAnswerer (use GATE_PIPELINE=direct)"; exit 2; fi
echo "gate $LABEL: tree $TREE @ $SHA, pipeline $PIPELINE, packs loadable: $HAS_PACK, seeds: $SEEDS"

ssh "$HOST" "mkdir -p ~/$DEST/assets/corpus ~/boar/gate/.cache"
rsync -az --delete "$TMP/src/" "$HOST:$DEST/src/"
rsync -az --delete "$TMP/assets/corpus/" "$HOST:$DEST/assets/corpus/"
rsync -az --delete --exclude node_modules --exclude .cache --exclude results "$ROOT/eval/" "$HOST:$DEST/eval/"
scp -q "$TMP/questions.suggestions-gate.jsonl" "$HOST:$DEST/eval/dataset/questions.suggestions-gate.jsonl"

cat > "$TMP/run.sh" <<EOF
#!/bin/bash
set -u
cd ~/$DEST/eval
[ -d node_modules ] || npm install --no-audit --no-fund --silent
ln -sfn ~/boar/gate/.cache .cache
cd ..
export BOAR_SHARED_MODELS=\$HOME/boar/shared-models
PIN=\$HOME/boar/shared-data/packs/pinned
PREP=\$PIN/$PREP_SHA/boar-preparedness.sqlite; CRYPTO=\$PIN/$CRYPTO_SHA/boar-crypto.sqlite
if [ $HAS_PACK = 1 ]; then
  [ -f \$PREP ] || { mkdir -p \$(dirname \$PREP) && curl -sSfL -o \$PREP.part "$PREP_URL" && mv \$PREP.part \$PREP; }
  [ -f \$CRYPTO ] || { mkdir -p \$(dirname \$CRYPTO) && curl -sSfL -o \$CRYPTO.part "$CRYPTO_URL" && mv \$CRYPTO.part \$CRYPTO; }
  echo "$PREP_SHA  \$PREP" | shasum -a 256 -c - || exit 3
  echo "$CRYPTO_SHA  \$CRYPTO" | shasum -a 256 -c - || exit 3
fi
O=eval/results/gate-runs; mkdir -p \$O
run() { npx --prefix eval tsx eval/runner/desktop.ts --gpu --pipeline $PIPELINE --corpus $CORPUS "\$@" || echo "RUNFAIL \$*"; }
for m in $MODELS; do for s in $SEEDS; do
  for cfg in none packs; do
    [ \$cfg = packs ] && [ $HAS_PACK = 0 ] && continue
    extra=(); name=\${m}__${CORPUS}__seed\$s
    [ \$cfg = packs ] && extra=(--pack \$PREP,\$CRYPTO) && name=\${m}__${CORPUS}__packs__seed\$s
    run --model \$m --seed \$s --dataset safety \${extra[@]+"\${extra[@]}"} --out \$O/\$name.jsonl
    run --model \$m --seed \$s --dataset cryptopack --ids crypto-named-001 \${extra[@]+"\${extra[@]}"} --out \$O/\$name.jsonl
  done
done; done
for cfg in none packs; do
  [ \$cfg = packs ] && [ $HAS_PACK = 0 ] && continue
  extra=(); name=suggestions__${CORPUS}
  [ \$cfg = packs ] && extra=(--pack \$PREP,\$CRYPTO) && name=suggestions__${CORPUS}__packs
  run --model $SUG_MODEL --seed 1 --dataset suggestions-gate \${extra[@]+"\${extra[@]}"} --out \$O/\$name.jsonl
done
if [ $S32 = 1 ]; then mkdir -p eval/results/gate-s32; for m in $MODELS; do run --model \$m --seed 42 --dataset v1 --ids $S32_IDS --out eval/results/gate-s32/\${m}__${CORPUS}__app.jsonl; done; fi
[ $HAS_PACK = 0 ] || { echo "$PREP_SHA  \$PREP" | shasum -a 256 -c - && echo "$CRYPTO_SHA  \$CRYPTO" | shasum -a 256 -c -; }
EOF
scp -q "$TMP/run.sh" "$HOST:$DEST/run.sh"
ssh "$HOST" "~/boar/bin/heavy Sextant bash -l ~/$DEST/run.sh" 2>&1 | grep -E "RUNFAIL|OK$|FAILED|rror" || true

OUT="$ROOT/eval/results/gates/$LABEL"
mkdir -p "$OUT/runs"
rsync -az --delete "$HOST:$DEST/eval/results/gate-runs/" "$OUT/runs/"
[ "$S32" = 1 ] && mkdir -p "$OUT/s32" && rsync -az "$HOST:$DEST/eval/results/gate-s32/" "$OUT/s32/"
cat > "$OUT/meta.json" <<EOF
{ "label": "$LABEL", "tree": "$TREE", "ref": "$REF", "sha": "$SHA", "packsLoadable": $HAS_PACK, "seeds": "$SEEDS", "models": "$MODELS", "pipeline": "$PIPELINE", "corpus": "$CORPUS",
  "packs": { "boar-preparedness": "$PREP_SHA", "boar-crypto": "$CRYPTO_SHA" }, "packSource": "tree catalog", "at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)", "host": "$HOST" }
EOF

cd "$ROOT/eval"
set +e
node scripts/regress.mjs --name "gate-$LABEL" --runs "results/gates/$LABEL/runs"
RC=$?
set -e
N_MODELS=$(wc -w <<<"$MODELS"); N_SEEDS=$(wc -w <<<"$SEEDS"); N_CFG=$((1 + HAS_PACK))
EXPECTED=$((N_MODELS * N_SEEDS * N_CFG * 8 + N_SUG * N_CFG))
GOT=$(cat "$OUT"/runs/*.jsonl 2>/dev/null | grep -c . || true)
echo "rows: $GOT / $EXPECTED expected"
if [ "$RC" -ne 0 ]; then echo "GATE FAIL: eval/reports/regression-gate-$LABEL.md"; exit 1; fi
if [ "$GOT" -lt "$EXPECTED" ] || [ "$HAS_PACK" = 0 ]; then echo "GATE INCOMPLETE (missing rows or tree without src/rag/wikiPack.ts: merge feat/knowledge first)"; exit 2; fi
echo "GATE PASS: eval/reports/regression-gate-$LABEL.md"
