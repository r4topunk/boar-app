# ADR 0001: "deep" tier (MoE with experts streamed from flash)

- Status: **Deferred: out of v1.1** (Boar, 2026-09-26). Nothing in `src/` changes. The tier reopens only through one of the triggers in §9.
- Date: 2026-09-26
- Author: Caldera (spike/moe-deep)
- Related: `spikes/deep-tier/SOTA.md` (state of the art with sources), `spikes/deep-tier/README.md` (how to reproduce), `review/androidlm.md` (competitor)

## TL;DR

- **Outcome (2026-09-26): deferred.** The deep tier is out of v1.1. The measured model was removed from the mini to free disk, and it can be fetched again from the pinned URL in §9. The reopen triggers are in §9.
- **Recommendation: Qwen3.6-35B-A3B with expert streaming (BigMoeOnEdge) is the right deep-tier engine and model, but it does NOT go into the bounty submission now.** With the context the RAG uses today (~1.3k tokens), TTFT is 40–58 s even on a Mac mini M4, and on a phone the prefill is slower. That fails the speed bar Vitalik set ("much slower… than the models that can run on a laptop").
- Measured on the M4 (4 threads, CPU, 1,310-token prompt): streaming gives **6.3–7.3 tok/s of decode** (8.7 tok/s with k=6), **28–41 tok/s of prefill** and **TTFT 40–58 s**. It reads 18–93 MiB of flash per token (cache of 5000→1500 MiB). The dense weights are 1.63 GiB, the experts 9.80 GiB, and each token reads ~314 MiB when there is no cache.
- **Blocking risk found:** the process's peak footprint is **10.7 GiB with a 1.3k-token prompt** (5.95 GiB with 19 tokens), whatever the cache or ubatch. Prefill holds the union of experts. On iOS that is jetsam, and on 12 GB Android it risks an OOM kill. This has to be fixed before any integration.
- Engine: alternative C (bmoe in-process, patching llama.rn built from source), **Android first**. On iOS it only makes sense after the prefill fix, and Metal does not load the model (it failed even on the 16 GB mini).
- Minimal next step (closes the loop without touching `src/`): measure on a real 12 GB Android device the profile "≤400 tokens of context + ≤200 tokens of answer + k=6". If TTFT ≤15 s and total ≤60 s, open the integration. Otherwise the tier stays shelved and the effort goes to P1–P3.

## 0. North star: how Vitalik evaluates (2026-09-26)

He tested BOAR, AndroidLM and Field Atlas ([post](https://x.com/VitalikButerin/status/2103762130554204651); full report in `review/ETH_NODE_INTEGRATION.md`):

> "Definitely getting much better than the one I tried to build myself 2 months ago. But also still **much slower and less effective at difficult questions than the models that can run on a laptop**."
>
> "It's weakest at specialized travel-related queries (eg. my eval is 'Tell me the best vegan restaurants in [city I am currently in]', unfortunately none of these performed well on that)"

What it means for the deep tier:

| Fact | Consequence for deep |
|---|---|
| The only MoE app (AndroidLM, Qwen3.6-35B-A3B) got the best answer, but took **~5 min** (answer 130 s at 3.2 tok/s + "source check" 162 s at 1.1 tok/s, per the screenshot). That is what "much slower" describes | **Quality without speed fails his test.** Deep must not repeat AndroidLM's profile: an answer ≥2 min is a loss, even when it is right |
| His reference is "models that can run on a laptop" (on his own machine he runs `qwen3.8-flash-next` next to 100+ GB of Wikipedia/Gutenberg/papers) | We will not match a laptop on speed. The bar we can beat is **quality per second compared with the other apps** |
| The literal eval (vegan restaurants in the current city) is **retrieval of local data** (OSM `diet:vegan`, Wikivoyage Eat), not model size | Deep does not solve the #1 failure. P1 (POI/OSM pack) comes first. Deep only enters when the fast tier is not enough |
| BOAR got the post-quantum question wrong because of **wrong retrieval** (RSA/factoring sources), not only because of the 1.5B model | A 35B on top of wrong sources still answers wrong. Retrieval quality (P3) is a prerequisite for deep being worth anything |

Hard rules for deep derived from this (they go into the success criteria, §7):
1. **Time budget per answer:** TTFT ≤15 s and full answer ≤60 s with ~200–250 tokens, i.e. **≥4 tok/s sustained with no thermal collapse**. No second pass at 1 tok/s (AndroidLM's "source check").
2. **Show the time** (P2): tok/s and seconds visible, answer streaming token by token, instant snippet already on screen while deep generates.
3. **Opt-in and routed:** deep only on "go deeper" or multi-step synthesis. Lookups and travel go to snippet/POI + fast tier.
4. If on a real device deep does not meet (1), **it does not go into the bounty submission**. It stays a flagged experiment. Zero effect on the critical path.

## 1. Objective

Give Boar an optional "go deeper" tier that answers the questions a 1–4B model gets wrong: synthesis, comparison and multi-step reasoning. It runs a MoE of ~35B total parameters and ~3B active, with the weights on flash and only the routed experts read per token. That is the direction Vitalik pointed at (big MoE, most of it on disk).

The tier is **optional** and routed. Most questions still go to the instant tier (extracted snippet) and the fast tier (medium model). Deep is only for "go deeper" or for multi-step synthesis detected by the router (Tusk's contract).

## 2. Constraints

| Constraint | Value | Source |
|---|---|---|
| RAM | ≤12 GB on the device (Android/GrapheneOS). In practice ~7–8 GB usable by one process | BOUNTY_31.md; AndroidLM measured ~7.9 GB of PSS on a Pixel 8 Pro |
| Disk | ≤50 GB **total** (app + models + corpus + indexes) | BOUNTY_31.md |
| Offline | Zero network during use | BOUNTY_31.md |
| Speed | "Usable for real lookups". Target for deep: **≥4 tok/s decode and TTFT ≤30 s** with ~1k tokens of sources | ESTRATEGIA.md (layered answer) |
| Stack | Expo SDK 57 + llama.rn (no rewrite) | Boar HQ, decision 2 |
| iOS | jetsam counts `phys_footprint` (anonymous memory). Clean mmap pages do not count. Practical limit on an 8 GB iPhone with `increased-memory-limit`: ~5–6 GB (UNKNOWN, Harbor) | Harbor |
| Licenses | Everything compatible with the MIT repo (Apache-2.0/MIT ok with a NOTICE) | — |

## 3. Candidates (short version; full table in SOTA.md)

| Model | Total/active | License | File used/proposed | Why |
|---|---|---|---|---|
| **Qwen3.6-35B-A3B** | 35B / 3B | Apache-2.0 | UD-Q2_K_XL 12.3 GB (measured here) → UD-IQ3_XXS 13.2 GB (proposed) | Best published quality in its class (MMLU-Pro 85.2, GPQA-D 86.0, **in thinking mode**). `qwen35moe` already in llama.rn and BigMoeOnEdge. Same file as AndroidLM, so it compares 1:1 |
| Gemma-4-26B-A4B | 25B / 3.8B | Apache-2.0 | UD-Q3_K_XL 12.9 GB | Plan B. Multilingual (PT-BR), 4.1 tok/s lossless on the BigMoeOnEdge phone |
| LFM2-24B-A2B | 24B / 2.3B | LFM Open License (>US$10M revenue needs an agreement) | IQ3_XXS 9.4 GB | Almost resident, so it is the likely iOS path. No public benchmarks |
| Qwen3.8-Flash-Next (n-gram) | 125B + 51B n-gram / 6B | Qwen Community | ≥72.5 GB | The Vitalik direction, but **does not fit in 50 GB**. Watchlist |

The quality-per-quant proxy (KLD, Qwen3.5-35B-A3B, Unsloth): Q2_K_XL 0.097 → IQ3_XXS 0.050 → Q4_K_XL 0.014. **IQ3_XXS halves the error for +1.1 GB.**

## 4. Measurements

Machine: **Mac mini M4 (4P+6E, 16 GB)**, macOS, CPU only (`GGML_METAL=OFF`), BigMoeOnEdge `74ba18f` + llama.cpp `0e8c83e`. Model **Qwen3.6-35B-A3B-UD-Q2_K_XL** (12,290,628,576 B, sha256 `96b9c0af5c77a4ecaabe3983175112b5ece763261c1ece12b2494b692a70dad7`, identical to AndroidLM's `manifest.json`). Fixed RAG-shaped prompt of **1,310 tokens**, 128 tokens of greedy decode, `--no-think`, `ctx 4096`, `ubatch 512`, `--overlap --dense-weights anon --io-threads 4`. Medians skip the first 8 tokens. Raw data: `spikes/deep-tier/results/` (CSV per token + `*.perf.txt` + `machine-state.txt`).

### 4.1 Main matrix (`-t 4`, 17:30–17:39, idledex bots paused, load 2.1 at the start)

| Config | Decode tok/s | ms/token (median) | Flash MiB/token | Cache hit % | Prefill tok/s | TTFT s | Peak footprint GiB |
|---|---:|---:|---:|---:|---:|---:|---:|
| mmap (whole model fits in the 16 GB page cache: **not** the phone scenario) | 11.3 | 83 | — | — | 14.4 | 100.0 | 0.42 (+8.4 GiB of file RSS) |
| streaming, cache 1500 MiB, k=8 | 6.7 | 137 | 92.6 | 32.6 | 41.0 | 39.9 | 10.79 |
| streaming, cache 3000 MiB, k=8 | **7.3** | 130 | 35.3 | 39.6 | 38.8 | 43.8 | 10.79 |
| streaming, cache 5000 MiB, k=8 | 6.3 | 135 | 17.8 | 43.2 | 27.7 | 57.7 | 10.79 |
| streaming, cache 3000 MiB, **k=6** (lossy, reproducible) | **8.7** | 102 | 23.1 | 35.8 | 36.5 | 46.2 | 10.32 |
| `llama-bench` stock CPU, mmap (reference) | tg128 **20.1** | — | — | — | pp512 **32.0** | — | 1.47 (+8.9 GiB of file RSS) |
| `llama-bench` Metal, `-ngl 99` | **fails** (`failed to decode prompt batch`): 11.4 GiB does not fit in the GPU working set of a 16 GB Mac | | | | | | |

### 4.2 Footprint diagnostic (`-t 4`, after the bots came back: only memory is valid here)

| Prompt | ubatch | Peak footprint GiB | Max RSS GiB |
|---|---:|---:|---:|
| 19 tokens | 512 | **5.95** | 5.23 |
| 1,310 tokens | 64 | **10.73** | 5.98 |
| 1,310 tokens | 512 (4.1) | **10.79** | 7.84 |

**Reading:** the peak grows with the **prompt length** and not with the ubatch. Prefill routes almost the whole bank (256 experts × 40 layers), and the engine holds that union in anonymous memory beyond the cache budget. Dense 1.63 + union ~9 GiB ≈ 10.8 GiB. UNKNOWN: whether it is only macOS accounting (F_NOCACHE staging), but AndroidLM limits the source prompt to ~1.0–1.3k tokens and runs with 0.9–1.3 GB left, which is consistent with a high peak.

### 4.3 First pass (`-t 2`, 17:15–17:25): kept for the record, **partly contaminated**

`mmap` ran from 17:15:40 to 17:18:04, **with** 2 bots at 100% of a P-core each: contaminated. The streaming runs came after the pause (17:18) but with swap growing from 5.6→7.3 GiB (paging during the run). s5000 was the most affected. Streaming, cache 1500: 6.1 tok/s, TTFT 71 s. Full table in `results/SUMMARY.md`.

### 4.4 What transfers to the phone (and what does not)

| Metric | Transfers? | Why |
|---|---|---|
| Flash MiB/token, cache hit %, expert/dense bytes | **Yes** | Depend on the model and the routing, not on the machine |
| Peak footprint with a long prompt | Probably (UNKNOWN on Android) | Engine behaviour, not the OS's |
| tok/s and TTFT | **No, only as an upper bound** | An M4 P-core is faster than the phone's X4/A720 cores; the M4 SSD is faster than UFS 4 |
| Cache hit % | Underestimated | 128 tokens after a cold prefill. In a warm session BigMoeOnEdge measures 56–92% on the phone |

**Phone projection, using the published measurements as ground truth** (AndroidLM on the Pixel 8 Pro with the same file: decode 4–6 tok/s, 3.7–4.5 when warm; prefill 24–30 tok/s; BigMoeOnEdge Q4_K_M: 5.0 tok/s lossless):

| Profile | Prefill | Decode | Estimated total | Passes (TTFT ≤15 s, total ≤60 s)? |
|---|---:|---:|---:|---|
| Today's RAG: 1.3k tokens of context, ~250 tokens of answer | 1300/27 ≈ **48 s** | 250/4.5 ≈ **56 s** | **~105 s** | ❌ (this is AndroidLM's profile) |
| Compressed context ≤400 tokens + answer ≤200 tokens, k=8 | 400/27 ≈ 15 s | 200/4.5 ≈ 44 s | ~60 s | ⚠️ borderline |
| Same + k=6 (+20–25% decode, lossy) + cached system prompt KV | ~12 s | 200/5.5 ≈ 36 s | **~50 s** | ✅ in theory: **needs device validation** |

Consequence: the deep tier can only pass with **short context and a short answer**. That depends on Tusk's work (sentence selection, <1.2k and ideally ≤400 tokens for deep) and on P3 (retrieval that finds the right source). Otherwise the 35B only makes a wrong answer slower.

## 5. Alternatives for the engine

| # | Alternative | Android | iOS | Effort | Risk |
|---|---|---|---|---|---|
| A | **Plain mmap in llama.rn** (no streaming) | Loads, but a 12 GB model on 12 GB devices turns into a fault storm: 0.1–2 tok/s and unstable, kills other apps (BigMoeOnEdge, phone) | Clean mmap pages do not count toward jetsam, but thrash the same way | S (only fix the RAM check, P0 in `boar.md`) | High: unusable speed |
| B | **BigMoeOnEdge as a subprocess** (the AndroidLM path): `libbmoe-cli.so` in `jniLibs`, spawned by an Expo module, JSON protocol over stdin (`--session`) | Works (AndroidLM proves it on a Pixel 8 Pro) | **Impossible**: iOS does not allow spawning executables | M (1–2 weeks) | Medium: a second copy of llama.cpp in the APK (~10 MB), and a process lifecycle to manage |
| C | **BigMoeOnEdge in-process, patching llama.rn** (build from source): add `core/` from bmoe (~11k lines of C++, Apache-2.0) to the llama.rn build, and in `rn-llama.cpp` (before `common_init_from_params`) set `use_mmap=true`, `no_extra_bufts=true`, `cb_eval=RouterHook` and install the expert source after load | Works | Works on CPU. The bmoe core is portable POSIX and the Darwin path already exists (`F_NOCACHE`) | L (2–4 weeks) | Medium-high: fork/patch of llama.rn; bmoe pins llama.cpp `0e8c83e` and llama.rn rc.4 is on `b11010` (needs a bump and the gates run again); repack off (slower prefill of dense weights); streamed experts only on CPU |
| D | **Separate Expo module with its own llama.cpp** (bmoe `Session` + chat template), alongside llama.rn | Works if the .so is loaded with hidden symbols | Symbol clash between two static llama.cpp copies in the same binary | M–L | High on iOS (ODR/symbol) |
| E | **Resident small MoE** (LFM2-24B-A2B IQ2_M 7.7 GB, Ling-mini-2.0 Q2_K 6.1 GB) on plain llama.rn | Works without an engine | Probably over the footprint limit (UNKNOWN) | S | Unmeasured quality; not "deep" |

### Details of C (the recommended path)

1. `llama.rn` with `rnllamaBuildFromSource=true` (Android, `gradle.properties`) and `RNLLAMA_BUILD_FROM_SOURCE=1` (iOS, Podfile), both of which already exist upstream.
2. Patch via `patch-package` (or a fork `r4topunk/llama.rn`):
   - `cmake/rnllama-sources.cmake` + `llama-rn.podspec`: compile `bmoe/core/src/{io,moe,engine/session-less}`. Only the pieces that do not own the model: router hook, expert source, dense-weights, platform_io.
   - `rn-llama.cpp::loadModel`: when `params.moe_stream` is set, force `use_mmap`, `no_extra_bufts` and `cb_eval`; after `common_init_from_params`, run bmoe's capture warm-up and bind the expert source.
   - Optional overlap hook (~25 lines in `ggml-cpu`): llama.rn already carries a patch on its vendored llama.cpp (`scripts/update-patch.sh`), and this goes in the same place.
3. JS: new `initLlama` params (`moeStream`, `expertCacheMb`, `denseWeights`) plus the telemetry (hit %, MiB/token) sent to the UI.
4. Cache sizing: `ram-monitor.getAvailableMemoryBytes()` (Harbor), which is `os_proc_available_memory` on iOS and `availMem` on Android, with a ceiling of 3000 MiB on 12 GB and 1500 MiB on 8 GB.
5. Gates: bmoe's byte-identity tests (tiny synthetic model) run in Boar's CI against the llama.rn build.

### License

- BigMoeOnEdge: **Apache-2.0** (verified in `LICENSE`). Can be used in the MIT Boar with a NOTICE and a note of changes (Apache §4).
- llama.rn: MIT. llama.cpp: MIT.
- If we port AndroidLM patches (e.g. the aarch64 IQ2/IQ3 kernels from ik_llama.cpp, MIT): NOTICE with attribution.
- Qwen3.6-35B-A3B: Apache-2.0. Gemma 4: Apache-2.0. LFM2: LFM Open License (restrictive above US$10M/year).

## 6. Decision (recommendation)

**Decisions (proposed; Boar reviews)**
1. **Model:** Qwen3.6-35B-A3B (Apache-2.0). Baseline quant UD-Q2_K_XL (the file measured here). Upgrade to **UD-IQ3_XXS (+1.1 GB, KLD ÷2)** only if Sextant measures a quality gain in no-think. Gemma-4-26B-A4B is plan B.
2. **Engine:** alternative **C** (BigMoeOnEdge in-process, patching llama.rn built from source), **Android first**. B (subprocess) is rejected because it closes off iOS. A (plain mmap) is rejected because of the fault storm.
3. **Not in the bounty submission** until it passes the criteria in §7 on a real 12 GB device. The deep tier does not compete for effort with P1 (POI/OSM), P2 (perceived speed) and P3 (right retrieval).
4. **iOS:** no integration until the prefill peak (§4.2) is fixed. With an 8 GB iPhone and a ~5–6 GB footprint limit, today's behaviour gets killed by jetsam.

**Options (to explore, in order)**
- a. Device run with no Boar code: BigMoeOnEdge's prebuilt APK/CLI (or AndroidLM's) on a 12 GB Android with the profile "≤400 tokens + ≤200 tokens, k=6". **This is the loop-closing experiment (effort S).**
- b. Chunked prefill with a staging limit (fix §4.2): upstream issue/PR in BigMoeOnEdge. Effort M, and it helps every engine user.
- c. AndroidLM's aarch64 IQ2_XS/IQ3_XXS kernels (port from ik_llama, MIT), halves the phone prefill (their note `2026-09-25-iqk-port.md`).
- d. KV reuse for the system prompt plus answer-first (AndroidLM's TTFT ~18 s).

**How to apply k=6 in the app (Tusk, 2026-09-26):** llama.rn does not expose `n-expert-used`/`kv_overrides` in JS (`src/types.ts`). There are two paths:
- (i) Integration C already adds the parameter in the patch (`--n-expert-used`). This is the preferred path, at no disk cost.
- (ii) Change `qwen35moe.expert_used_count=6` in the GGUF metadata. `gguf-set-metadata` edits the int field **in place**, so it does not need a 12 GB copy. It does change the SHA-256, which makes it a **derived artifact** with its own hash in the manifest (Ledger).
- Until then, **no copy is made**: the device test (a) uses `--n-expert-used 6` directly in the bmoe CLI.

Deep contract already applied by Tusk in PR #2 (`018cd4f`): 6 chunks compressed to 400 tokens, answer ≤200 tokens, `enable_thinking=false`, no speculative decoding, system prompt KV reused automatically by llama.rn (common prefix).

**Tasks (only if (a) passes)**
- [ ] Patch llama.rn (`rnllamaBuildFromSource=true` + patch-package) with the bmoe core and `initLlama({ moeStream, expertCacheMb, denseWeights })` (Tusk, src/inference).
- [ ] Separate, verified download of the deep model (Ledger, manifest with SHA-256).
- [ ] Route "go deeper" to deep with a time budget and the time shown (Tusk plus Quill for the UI).
- [ ] Eval of deep vs fast on Sextant's s32 (quality) plus p50/p90 time on the device (Piston).

## 7. Success criteria (objective definition of done for the next phase)

All measured on a **real 12 GB Android device** (Pixel 8/9 Pro class or equivalent), app in the foreground, device warm (3rd consecutive answer), a fixed set of 10 "go deeper" questions from Sextant's s32:

| # | Criterion | Target | How it is measured |
|---|---|---|---|
| 1 | TTFT (first visible token of the deep answer) | **p50 ≤15 s, p90 ≤25 s** | App telemetry / bmoe CSV |
| 2 | Total time of the deep answer | **p50 ≤60 s** | idem |
| 3 | Sustained decode | **≥4 tok/s** on the 3rd consecutive answer (thermal) | CSV `wall_ms` |
| 4 | Memory | Zero low-memory kills in 10 answers. Peak PSS ≤8 GB | `dumpsys meminfo` / bmoe CSV (`rss_anon_mib`) |
| 5 | Quality | Deep beats fast in the blind judge in ≥60% of the deep questions (s32, Sextant), with the same sources | Sextant |
| 6 | Disk | Deep model ≤13.2 GB. Everything (app + models + corpus + OSM) ≤50 GB | manifest |
| 7 | Reproducible | Model SHA-256 pinned, commands in `spikes/deep-tier/README.md` | review |

If 1–4 fail: **rollback** (below) and the tier stays out of the submission. If 5 fails: deep has no reason to exist, whatever the speed.

## 8. Rollback

- The tier is behind a flag (`deepTier.enabled`, off by default) and a separate download. Turning it off leaves the fast tier untouched.
- The llama.rn patch lives in `patches/` (patch-package). Rollback means removing the patch and going back to the prebuilt llama.rn (`rnllamaBuildFromSource=false`).
- The model lives in its own file (≤13.2 GB) and deleting it frees the disk. Corpus and indexes do not depend on it.
- Trigger for automatic rollback on the device: decode <2 tok/s for 3 consecutive answers, or a low-memory kill. The router falls back to the fast tier and marks deep as unavailable on that device.

## 9. Triggers to reopen

The tier stays shelved until **at least one** trigger below fires. Any of them restarts from §6 option (a) (device run), never from integration.

| # | Trigger | Why it changes the answer | Who notices |
|---|---|---|---|
| T1 | A real 12 GB Android device reaches the device lab (Pixel 8/9 Pro class) | §6 (a) can finally be run. It is the only missing measurement | Piston / Boar |
| T2 | BigMoeOnEdge (or llama.cpp upstream) ships a prefill with bounded staging, so the peak footprint on a ~1.3k-token prompt drops to ≤8 GiB | Removes the §4.2 blocker for Android and iOS | Caldera (watch upstream) |
| T3 | Sextant's s32 in no-think shows deep beating fast in ≥60% of the deep questions (§7 criterion 5) | Proves there is quality to buy. Without it, speed does not matter | Sextant |
| T4 | A MoE with ≤2B active params and quality ≥ Qwen3.6-35B-A3B no-think appears that fits in RAM (≤6 GB file), so no streaming is needed | The deep tier becomes an ordinary model swap for Tusk, not an engine project | Caldera / Sextant |
| T5 | The phone prefill for Qwen3.6 UD-Q2_K_XL reaches ≥100 tok/s (for example the iqk aarch64 kernels, §6 option c) | TTFT ≤15 s with 1.3k tokens becomes plausible without cutting the context to 400 | Caldera |
| T6 | Product decision: the bounty or the roadmap asks for a "go deeper" mode explicitly (after the 2026-10-24 scope freeze, v1.2 at the earliest) | Scope, not tech | Boar / user |

**Reopen checklist (in order, each step is a go/no-go):**
1. Ask Boar for disk (≥13 GB free on the mini, above the 20 GB floor) and fetch the model again with the pinned URL below. Check the sha256.
2. Rerun `bench-mini.sh` through the `heavy` queue with the same matrix (§4.1) to confirm that nothing regressed on the current BigMoeOnEdge commit.
3. Run §6 (a) on the device, then check §7 criteria 1–4. Only then open the §6 tasks.

**Artifact to re-fetch** (removed from `~/boar/shared-models/` on the mini on 2026-09-26 to free disk):
- `Qwen3.6-35B-A3B-UD-Q2_K_XL.gguf`, 12,290,628,576 B, sha256 `96b9c0af5c77a4ecaabe3983175112b5ece763261c1ece12b2494b692a70dad7`
- URL pinned to the Hugging Face commit (checked with the HF `paths-info` API on 2026-09-26; the LFS oid matches the sha256): `https://huggingface.co/unsloth/Qwen3.6-35B-A3B-GGUF/resolve/a483e9e6cbd595906af30beda3187c2663a1118c/Qwen3.6-35B-A3B-UD-Q2_K_XL.gguf`
- Still on the mini (small): the bmoe/llama.cpp builds in `~/boar/spikes/bmoe`, `~/boar/spikes/.venv`, `~/boar/spikes/results/`.

## UNKNOWN

- **tok/s and TTFT on a real phone** with our profile (≤400 tokens): only projected from AndroidLM/BigMoeOnEdge, not measured by us. There is no 12 GB Android in the device lab (confirm with Piston).
- Whether the 10.7 GiB footprint peak happens on Android the same way as on macOS (F_NOCACHE staging), and whether the kernel reclaims it without a kill.
- Deep's quality in no-think against frontier and against the fast tier: Sextant is running s32 (32 questions) with UD-Q2_K_XL. No number yet.
- Real quality gain of UD-IQ3_XXS over UD-Q2_K_XL on Qwen3.6 (only the Qwen3.5 KLD proxy). Not downloaded because the mini has no disk space.
- jetsam limit with `increased-memory-limit` per iPhone model (Harbor).
- Effort of the bmoe `0e8c83e` → llama.rn `b11010` bump (bmoe's gates must pass again on the new llama.cpp).
- Vitalik's original text of 2026-09-17 (X blocked it). The 2026-09-26 post was quoted from `review/ETH_NODE_INTEGRATION.md`.
- The M4 mmap scenario (11.3 tok/s) only reflects "the model fits in the page cache". Simulating a 12 GB phone with mmap was not possible on the shared mini (no memory balloon, so as not to hurt other jobs).
