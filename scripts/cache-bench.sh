#!/usr/bin/env bash
# v1.1 item 5: prefill per turn with llama.cpp's prompt cache, sources in system vs in the user turn.
set -euo pipefail
BIN="$HOME/boar/spikes/bmoe/third_party/llama.cpp/build-cpu/bin"; PORT=18095
OUT="$HOME/boar/spikes/results/cache-bench"; mkdir -p "$OUT"
SEQ="$HOME/boar/spikes/cache-seq.json"; REPS="${REPS:-3}"
: > "$OUT/results.jsonl"
for rep in $(seq 1 "$REPS"); do
for variant in before after; do
  "$BIN/llama-server" -m "$HOME/boar/shared-models/Qwen2.5-1.5B-Instruct-Q4_K_M.gguf" --jinja -t 4 -c 4096 -ngl 0 -np 1 --port $PORT --no-webui > "$OUT/server-$variant.log" 2>&1 &
  pid=$!
  for _ in $(seq 1 120); do curl -sf "http://127.0.0.1:$PORT/health" >/dev/null 2>&1 && break; sleep 1; done
  python3 - "$PORT" "$SEQ" "$variant" "$rep" >> "$OUT/results.jsonl" <<'PY'
import json, sys, urllib.request
port, seq, variant, rep = sys.argv[1:]
d = json.load(open(seq))
def post(path, body):
    req = urllib.request.Request(f"http://127.0.0.1:{port}{path}", data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
    return json.load(urllib.request.urlopen(req, timeout=600))
for n, msgs in enumerate(d[variant]):
    rendered = post("/apply-template", {"messages": msgs})["prompt"]
    r = post("/completion", {"prompt": rendered, "n_predict": 1, "temperature": 0, "cache_prompt": True})
    t = r["timings"]
    print(json.dumps({"variant": variant, "rep": int(rep), "turn": n + 1, "prompt_total": r.get("tokens_evaluated"),
                      "prompt_n": t["prompt_n"], "prompt_ms": round(t["prompt_ms"], 1), "cached": r.get("tokens_cached")}))
    # What the app's cache holds after answering: prompt + generated answer.
    post("/completion", {"prompt": rendered + d["answers"][n] + "<|im_end|>\n", "n_predict": 1, "temperature": 0, "cache_prompt": True})
PY
  kill $pid; wait $pid 2>/dev/null || true
done
done
python3 - "$OUT/results.jsonl" <<'PY'
import json, sys, statistics as st, collections
rows = [json.loads(l) for l in open(sys.argv[1])]
agg = collections.defaultdict(list)
for r in rows: agg[(r["variant"], r["turn"])].append(r)
print("turn | before: evaluated/total tok, prefill ms | after: evaluated/total tok, prefill ms")
tot = {"before": 0, "after": 0}
for turn in range(1, 7):
    cells = []
    for v in ("before", "after"):
        rs = agg[(v, turn)]
        ms = st.median(r["prompt_ms"] for r in rs); tot[v] += ms
        cells.append(f"{rs[0]['prompt_n']}/{rs[0]['prompt_total']} tok, {ms:.0f} ms")
    print(f"{turn} | {cells[0]} | {cells[1]}")
print(f"sum of median prefill ms, turns 1-6: before {tot['before']:.0f}, after {tot['after']:.0f}")
PY
