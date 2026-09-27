# Boot performance (PERF-1): plan and measurements

TL;DR: on the iOS simulator the chat was usable ~23 s after a first boot, because the first llama.rn init of the process compiles the Metal library from source (GGML_METAL_EMBED_LIBRARY, ~22 s, under a lock the LLM init waits on). A warm boot takes 9-63 ms. The models run with n_gpu_layers 0, so Metal is set up for nothing. Plan: P1 chat usable at mount, and the experiment below.

## Measured (Harbor, 1717835 = integration 02e72b5 + [boot] marks, iPhone 16 simulator iOS 26.1)

| Stage | Cold, 1st boot after install (3 runs) | Warm |
|---|---|---|
| bootRoute (models, status, speeds, rank) | 76-88 ms | same |
| splash hide | +316 / +323 / +337 ms | ~0.9-1.0 s splash |
| LLM GGUF header + memory fit | 81-92 ms | |
| embedding.initLlama (bge, 1st init of the process) | 22.2 / 22.7 / 22.3 s | 9-63 ms |
| llm.initLlama | ends ~0.8 s after the embedder (waits on it) | |
| seedIfEmpty, empty DB (0/300 docs indexed) | 25.5 s (once) | COUNT only |
| chat.ready | ~49 s on the very first boot | |
| 1st answer after a cold boot (monsoon, 1.5B) | 14 s total, "started in 12 s", 24.4 tok/s | |

Source lines: shots/fidelity/1717835/boot-lines-long*.txt, boot-lines-ask.txt.

## Facts from the code

- `n_gpu_layers: 0` in LlamaEngine comes from the original scaffold (rferrari 6de5f30, "CPU-only for broad device compatibility; adjust per-device"), not from the iPhone 13 fallback.
- The embedder never sets n_gpu_layers: llama.rn's default (llama.cpp common, -1 = all layers) puts bge on Metal.
- Both inits ran concurrently; the Metal backend init serializes them.

## Plan

| # | Change | Owner | Status |
|---|---|---|---|
| P1 | Chat usable at mount; LLM/bge load in the background. answer() already loads on demand (loads are queued, a loaded model is skipped); instant snippet and places need no model. Status "preparing the model..." without blocking the input. | Quill (ChatScreen) + Tusk | asked |
| P2 | Seed: do not re-read and parse the JSON corpus packs when the COUNT already matches. | Bramble | proposed |
| P3 | bge on first need (lazy); keyword search works without it. | Bramble | proposed |
| E1 | Experiment perf/boot-cpu-devices 793c181: on iOS, an init with no GPU layers starts with devices ["CPU"] (no Metal init). Moves bge from Metal to CPU. | Tusk | Harbor measuring (sim: 2 cold boots + 1 answer) |
| E2 | iPhone 13 (Harbor, next day): CPU x GPU for the 1.5B and the 4B: ttft, tok/s, 1st-init time, and bge embed time. If the GPU is much faster, the fix is Metal with a precompiled library (build without GGML_METAL_EMBED_LIBRARY) instead of CPU. | Harbor + Tusk | planned |

Decision rule for E1/E2: adopt CPU-only if ttft and tok/s don't get worse than on Metal; otherwise precompiled Metal (E2).
