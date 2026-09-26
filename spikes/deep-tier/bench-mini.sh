#!/usr/bin/env bash
# Deep-tier measurement matrix for one GGUF, run on the Mac mini (M4, 16GB).
# Usage: bench-mini.sh <model.gguf> <label> [configs...]
# Configs: lb-cpu lb-metal mmap s1500 s3000 s5000 s3000k6 (default: all)
# Needs: ~/boar/spikes/bmoe built at 74ba18f (see README.md in this dir).
# One job at a time: each config runs sequentially and finishes before the next.
set -euo pipefail

MODEL="$1"; LABEL="$2"; shift 2
CONFIGS=("${@:-lb-cpu lb-metal mmap s1500 s3000 s5000 s3000k6}")
CONFIGS=(${CONFIGS[@]})

BMOE="$HOME/boar/spikes/bmoe"
CLI="$BMOE/build-cpu/cli/bmoe-cli"   # CPU-only (GGML_METAL=OFF), like Android
LB_CPU="$BMOE/third_party/llama.cpp/build-cpu/bin/llama-bench"
LB_METAL="$BMOE/third_party/llama.cpp/build-metal/bin/llama-bench"
OUT="$HOME/boar/spikes/results/$LABEL"
PROMPT_FILE="$HOME/boar/spikes/rag-prompt.txt"
THREADS="${THREADS:-4}"   # phone-like: 4 big cores
NPRED="${NPRED:-128}"
mkdir -p "$OUT"

# ~1k-token RAG-shaped prompt (source text + question), fixed so runs are comparable.
if [ ! -f "$PROMPT_FILE" ]; then
  { echo "Use only the sources below to answer. Cite them as [1]."
    echo "[1] $(head -c 4200 "$BMOE/README.md" | tr '\n' ' ')"
    echo
    echo "Question: Explain how expert streaming lets a model larger than RAM run on a phone, and compare it with plain mmap loading."
  } > "$PROMPT_FILE"
fi

run() { # name, cmd...
  local name="$1"; shift
  echo "== $LABEL/$name: $*" | tee "$OUT/$name.log"
  { /usr/bin/time -l "$@"; } >>"$OUT/$name.log" 2>&1 || echo "EXIT=$?" >>"$OUT/$name.log"
  grep -E 'tok/s|TTFT|prefill:|generation:|mode:|maximum resident|peak memory footprint|EXIT=|\| *(pp|tg)[0-9]' "$OUT/$name.log" | grep -v BMOE_PROGRESS || true
}

stream() { # name cache [extra...]
  local name="$1" cache="$2"; shift 2
  run "$name" "$CLI" -m "$MODEL" -t "$THREADS" -n "$NPRED" -c 4096 --ubatch 512 \
    --chatml --no-think -p "$(cat "$PROMPT_FILE")" \
    --moe-stream --cache-mb "$cache" --io-threads 4 --overlap --dense-weights anon \
    --csv "$OUT/$name.csv" "$@"
}

for c in "${CONFIGS[@]}"; do
  case "$c" in
    lb-cpu)   run lb-cpu   "$LB_CPU"   -m "$MODEL" -t "$THREADS" -p 512 -n 128 -r 3 -ngl 0 -o md ;;
    lb-metal) run lb-metal "$LB_METAL" -m "$MODEL" -p 512 -n 128 -r 3 -ngl 99 -o md ;;
    mmap)     run mmap "$CLI" -m "$MODEL" -t "$THREADS" -n "$NPRED" -c 4096 --ubatch 512 \
                --chatml --no-think -p "$(cat "$PROMPT_FILE")" --csv "$OUT/mmap.csv" ;;
    s1500)    stream s1500 1500 ;;
    s3000)    stream s3000 3000 ;;
    s5000)    stream s5000 5000 ;;
    s3000k6)  stream s3000k6 3000 --n-expert-used 6 ;;
    # footprint diagnostics: is the ~10.8 GiB peak the prefill union of experts?
    fp-short) run fp-short "$CLI" -m "$MODEL" -t "$THREADS" -n 32 -c 4096 --chatml --no-think \
                -p "What is a mixture of experts?" --moe-stream --cache-mb 1500 --io-threads 4 \
                --overlap --dense-weights anon --csv "$OUT/fp-short.csv" ;;
    fp-ub64)  stream fp-ub64 1500 --ubatch 64 ;;
    *) echo "unknown config $c" >&2; exit 2 ;;
  esac
done
