# ADR 0001: "deep" tier (MoE with experts streamed from flash)

- Status: **Proposed** (spike; nothing in `src/` changes until approved)
- Date: 2026-09-26
- Author: Caldera (spike/moe-deep)
- Related: `spikes/deep-tier/SOTA.md` (state of the art with sources), `spikes/deep-tier/README.md` (how to reproduce), `review/androidlm.md` (competitor)

## TL;DR

<!--TLDR-->

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

<!--MEASUREMENTS-->

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

<!--DECISION-->

## 7. Success criteria (objective definition of done for the next phase)

<!--CRITERIA-->

## 8. Rollback

- The tier is behind a flag (`deepTier.enabled`, off by default) and a separate download. Turning it off leaves the fast tier untouched.
- The llama.rn patch lives in `patches/` (patch-package). Rollback means removing the patch and going back to the prebuilt llama.rn (`rnllamaBuildFromSource=false`).
- The model lives in its own file (≤13.2 GB) and deleting it frees the disk. Corpus and indexes do not depend on it.
- Trigger for automatic rollback on the device: decode <2 tok/s for 3 consecutive answers, or a low-memory kill. The router falls back to the fast tier and marks deep as unavailable on that device.

## UNKNOWN

<!--UNKNOWN-->
