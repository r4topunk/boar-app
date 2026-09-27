# Citation audit: candidate-ea21e82

TL;DR: support of every [n] in the shown answers, and what post-processing removed. Judge: Jev (another model family), p(supported) < 0.5 = unsupported. Regenerate with `node eval/scripts/citation-audit.mjs --name candidate-ea21e82 --runs results/gates/candidate-ea21e82/runs results/gates/candidate-ea21e82/s32` (cached, no new cost).

| Configuration | Answers | Citations shown | Unsupported | Index out of range | Citations in model text | Removed by post-processing | Removed but supported (false positive) | Added by attribution | Added but unsupported |
|---|---|---|---|---|---|---|---|---|---|
| current-events__qwen2.5-1.5b-instruct-q4km | 8 | 0 | – | 0 | 0 | – | – | 0 | – |
| current-events__qwen3-4b-instruct-2507-q4km | 8 | 0 | – | 0 | 1 | 100% (1/1) | 0% (0/1) | 0 | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | 5 | 0 | – | 0 | 0 | – | – | 0 | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | 5 | 0 | – | 0 | 1 | 100% (1/1) | 0% (0/1) | 0 | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km | 2 | 0 | – | 0 | 0 | – | – | 0 | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km__packs | 2 | 0 | – | 0 | 0 | – | – | 0 | – |
| pt-topic__qwen3-4b-instruct-2507-q4km | 2 | 0 | – | 0 | 0 | – | – | 0 | – |
| pt-topic__qwen3-4b-instruct-2507-q4km__packs | 2 | 0 | – | 0 | 0 | – | – | 0 | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | 80 | 2 | 0% (0/2) | 0 | 0 | – | – | 2 | 0% (0/2) |
| qwen2.5-1.5b-instruct-q4km__essential | 80 | 0 | – | 0 | 0 | – | – | 0 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | 80 | 4 | 75% (3/4) | 0 | 5 | 40% (2/5) | 0% (0/2) | 1 | 0% (0/1) |
| qwen3-4b-instruct-2507-q4km__essential | 80 | 0 | – | 0 | 0 | – | – | 0 | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | 8 | 2 | 0% (0/2) | 0 | 0 | – | – | 2 | 0% (0/2) |
| suggestions__qwen3-4b-instruct-2507-q4km | 8 | 2 | 0% (0/2) | 0 | 5 | 60% (3/5) | 0% (0/3) | 0 | – |
| qwen2.5-1.5b-instruct-q4km__essential__app | 32 | 0 | – | 0 | 0 | – | – | 0 | – |
| qwen3-4b-instruct-2507-q4km__essential__app | 32 | 0 | – | 0 | 8 | 100% (8/8) | 0% (0/8) | 0 | – |
| **All** | 434 | 10 | 30% (3/10) | 0 | 20 | 75% (15/20) | 0% (0/15) | 5 | 0% (0/5) |

## Unsupported citations (sample)

- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.13 · source "Post-quantum cryptography": These are being developed and standardized by initiatives like NIST and the Open Quantum Safe project.
- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.09 · source "Post-quantum cryptography": These are being developed and standardized by NIST and projects like Open Quantum Safe.
- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.09 · source "Post-quantum cryptography": These are being developed and standardized by NIST and projects like Open Quantum Safe.

## Removed although supported (sample)


## Added by attribution but unsupported (sample)


Limits: a removed citation is one whose (source title, sentence) has no match in the shown answer (word Jaccard >= 0.6), so a rewritten sentence can count as removed. Jev sees the whole cited chunk up to 6000 characters, else the 3000-character window with most of the claim's terms; runs recorded before runner 8000-char bodies (gates up to 383fe96) hold only the first 2000 characters.
