# BOAR vs frontier + web search: official evaluation

TL;DR: on the integrated app (integration `6c3d6c6`, 2026-09-27), the default model **Qwen3-4B keeps 59% of the quality of a frontier model with web search (95% CI 54–63%, Claude judge; 66%, 62–70%, with a second judge from another family) and answers in 2.6 s median instead of 22.9 s**, offline. The Compacto (Qwen2.5-1.5B) keeps 52% (Jev) in 0.8 s. Every health and disaster answer in the safety gate is correct in EN and PT (5 seeds, both models, with and without packs), and sourceless knowledge answers are refused rather than guessed.

Reproduce everything below from the committed data, without model calls: `npm --prefix eval run report:official`.

## Headline (v1, 96 research questions, 8 categories)

| System | Quality ratio vs reference (95% CI) | Correct answers | Median s per answer (p90) | Judged by |
|---|---|---|---|---|
| Qwen3-4B-Instruct-2507 Q4_K_M (default) | **0.59** (0.54–0.63) Claude · **0.66** (0.62–0.70) Jev | 67% Claude · 60% Jev | **2.6** (3.7) | Claude + Jev |
| Qwen2.5-1.5B-Instruct Q4_K_M (Compacto) | **0.52** (0.48–0.56) Jev | 28% Jev | **0.8** (1.3) | Jev |
| Reference: Claude Opus + WebSearch/WebFetch | 1.00 | 100% | 22.9 | – |

Source: [`official-v1-6c3d6c6.md`](./official-v1-6c3d6c6.md), judge agreement [`judges-v1-all-qwen3-4b-instruct-2507-q4km__official-6c3d6c6.md`](./judges-v1-all-qwen3-4b-instruct-2507-q4km__official-6c3d6c6.md).

## Who judged what

| Set | Items | Claude (Opus, blind pairwise) | Jev (typesafe-ai/jev, another family) |
|---|---|---|---|
| v1 research, Qwen3-4B | 96 | yes | yes |
| v1 research, Qwen2.5-1.5B | 96 | no (budget: Claude reserved for the headline) | yes |
| v2 Vitalik-style (crypto, travel, danger, math) | 41 × 2 models | no | yes |
| v2 local food | 20 × 2 models | objective (OpenStreetMap venues) | – |
| Crypto, 20 questions with the crypto pack | 20 | no | yes |
| Safety gate (first aid, disasters, quantum prompt, suggestions) | 8 EN + 7 PT items × 2 models × 5 seeds × 2 configs | deterministic checks, failures read by hand | – |

Where both judged (Qwen3-4B, v1, 96 questions) they agree on the winner in 99% of pairs (kappa 0.66) and on "correct / not correct" in 90% (r = 0.85 on correctness scores). Jev gives higher ratios than Claude (+7 points here) and slightly stricter correct/not-correct calls, so Jev-only numbers are comparable within this report but not directly to Claude numbers. Earlier calibration: both judges 75% exact against 20 hand labels ([`judges-v1-s32.md`](./judges-v1-s32.md)).

## By set

- **Vitalik-style (v2, Jev)** ([`official-v2-6c3d6c6.md`](./official-v2-6c3d6c6.md)): quality ratio 4B 0.49 (0.43–0.54), 1.5B 0.41 (0.37–0.44); crypto correct 30% / 10%, travel 20% / 10%. **Local food: 0% for both** (reference 90%), by construction: the evaluation does not install the offline places packs, so the app has no venue to cite.
- **Crypto, 20 questions, with the crypto pack (Jev)** ([`official-cryptopack-6c3d6c6.md`](./official-cryptopack-6c3d6c6.md)): 4B ratio 0.68 (0.59–0.77), 55% correct. Earlier A/B on the same questions: the pack takes named-concept questions from 10% to 60% correct ([`cryptopack-v1.md`](./cryptopack-v1.md)).
- **Answers from memory, without a source** ([`nosource.md`](./nosource.md)): the 1.5B is correct 3–7% of the time and wrong 64–83% (crypto and travel only); the product keeps refusing sourceless knowledge questions on the Compacto.
- **PT vs EN** (4B with packs, 41 v2 items, Jev): EN 0.55 vs PT 0.51 on the last measured candidate. **Measured without the PT lexicon; to be redone.** The gate copied only `assets/corpus` from the app tree, and the app's lexicon loader (`src/rag/ptLexiconAsset.ts`) silently falls back to an empty lexicon when `assets/lexicon/pt-en.json` is missing. So every PT answer in the gates up to d7de156 (safety-pt, pt-topic, PT suggestions, PT vs EN) ran without it. Fixed in the gate on 2026-09-27 (`9eb69c5`: it copies `assets/` and stops when a required asset is missing); the numbers will be redone on the control e0d842d. Retrieval (Bramble, 42 questions, with the lexicon, measured outside the gate): PT R@3 0.62, EN 0.21 (EN is the weak side).

## Safety gate (every prompt or retrieval change)

The integrated build passed the gate on candidate `a2bafb1` ([`regression-gate-candidate-a2bafb1.md`](./regression-gate-candidate-a2bafb1.md)): snakebite, hypothermia, burn, earthquake (indoors and "during"), flood water and nosebleed, in EN and PT, with and without the Preparedness v3 and crypto packs, 1.5B and 4B, 5 seeds each: 100% pass, health answers quote the source without calling the model, and every health and disaster answer ends with the emergency line. Known and accepted: the 1.5B names elliptic-curve cryptography as quantum resistant in 1 of 5 seeds; the 4B is the default where RAM allows. The gate runs the app's own retrieval code (`eval/runner/app-shims`), not a copy.

## Limits

- The main judge and the reference are both Claude; Jev (another family) is the check on self-preference and agrees closely (above). Jev alone judged the 1.5B, v2 and the crypto set.
- Latency is desktop (Mac mini M4, Metal), not phone; device numbers come from the device lab.
- One seed (42) for the quality numbers; the safety gate uses 5.
- Unsupported citations: 3 of the 5 citations shown in gate answers were not supported by the cited source (Jev); post-processing removes most unsupported ones from the model's text (19 of 24, 1 false positive) — open item for the engine.
- The reference is generated once (Opus + web search, 2026-09-26) and its answers are the key: a wrong reference would count against BOAR.
- PT answers in the safety gate and the PT vs EN numbers above were measured without the PT lexicon (see "By set"); the PT safety items passed even so, which the redone run will confirm.
- History: the first official numbers (runner without the app pipeline, 2026-09-26) are in [`official-v1.md`](./official-v1.md) (4B 59% Claude / 70% Jev, 5.7 s).
