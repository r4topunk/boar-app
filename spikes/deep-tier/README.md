# Spike: deep tier (MoE with experts streamed from flash)

TL;DR: this spike measures the "deep" tier candidates for [ADR 0001](../../docs/adr/0001-deep-tier.md). It does not touch `src/`.

| File | What it is |
|---|---|
| `SOTA.md` | State of the art, Sep/2026: models, quants, engines, n-gram memory. Every claim is sourced |
| `bench-mini.sh` | Measurement matrix for one GGUF (llama-bench mmap, bmoe mmap, bmoe streaming with capped cache) |
| `summarize.py` | Turns the per-token CSVs into the table used in the ADR |
| `results/` | Summaries of each run (the raw logs stay on the measurement machine) |

## Reproduce

Measurement machine: Mac mini M4 (4P+6E), 16 GB, macOS. Every run uses `-t 4`, like a phone's big cores, and CPU only.

```bash
# 1. engine: BigMoeOnEdge 74ba18f + llama.cpp fork 0e8c83e (Helldez, adds a ~25-line overlap hook)
git clone https://github.com/Helldez/BigMoeOnEdge.git ~/boar/spikes/bmoe
cd ~/boar/spikes/bmoe && git checkout 74ba18f && git submodule update --init --depth 50 third_party/llama.cpp
cmake -S . -B build-cpu -G Ninja -DCMAKE_BUILD_TYPE=Release -DGGML_METAL=OFF && cmake --build build-cpu --target bmoe-cli
cd third_party/llama.cpp
cmake -S . -B build-cpu   -G Ninja -DCMAKE_BUILD_TYPE=Release -DGGML_METAL=OFF -DLLAMA_CURL=OFF && cmake --build build-cpu   --target llama-bench
cmake -S . -B build-metal -G Ninja -DCMAKE_BUILD_TYPE=Release                   -DLLAMA_CURL=OFF && cmake --build build-metal --target llama-bench

# 2. model (sha256 96b9c0af5c77a4ecaabe3983175112b5ece763261c1ece12b2494b692a70dad7, same file as AndroidLM)
curl -L -o ~/boar/shared-models/Qwen3.6-35B-A3B-UD-Q2_K_XL.gguf \
  https://huggingface.co/unsloth/Qwen3.6-35B-A3B-GGUF/resolve/a483e9e6cbd595906af30beda3187c2663a1118c/Qwen3.6-35B-A3B-UD-Q2_K_XL.gguf  # pinned commit; removed from the mini 2026-09-26, see ADR §9

# 3. matrix (one job at a time), then summarize
bash bench-mini.sh ~/boar/shared-models/Qwen3.6-35B-A3B-UD-Q2_K_XL.gguf qwen36-q2kxl mmap s1500 s3000 s5000 s3000k6
python3 summarize.py ~/boar/spikes/results/qwen36-q2kxl
```

Pitfall we hit: building `bmoe-cli` with Metal on (the default on macOS) makes llama.cpp push the prefill matmuls to the GPU (`graph splits = 762 (with bs=512)`). That does not happen on Android and it inflates the footprint. Use `-DGGML_METAL=OFF`.
