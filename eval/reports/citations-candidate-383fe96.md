# Citation audit: candidate-383fe96

TL;DR: support of every [n] in the shown answers, and what post-processing removed. Judge: Jev (another model family), p(supported) < 0.5 = unsupported. Regenerate with `node eval/scripts/citation-audit.mjs --name candidate-383fe96 --runs results/gates/candidate-383fe96/runs results/gates/candidate-383fe96/s32` (cached, no new cost).

| Configuration | Answers | Citations shown | Unsupported | Index out of range | Citations in model text | Removed by post-processing | Removed but supported (false positive) |
|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential__packs | 45 | 0 | – | 0 | 0 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | 45 | 0 | – | 0 | 0 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | 45 | 3 | 100% (3/3) | 0 | 5 | 40% (2/5) | 0% (0/2) |
| qwen3-4b-instruct-2507-q4km__essential | 45 | 0 | – | 0 | 0 | – | – |
| suggestions__declared | 14 | 3 | 0% (0/3) | 0 | 10 | 70% (7/10) | 0% (0/7) |
| qwen2.5-1.5b-instruct-q4km__essential__app | 32 | 0 | – | 0 | 0 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__app | 32 | 0 | – | 0 | 11 | 100% (11/11) | 0% (0/11) |
| **All** | 258 | 6 | 50% (3/6) | 0 | 26 | 77% (20/26) | 0% (0/20) |

## Unsupported citations (sample)

- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.13 · source "Post-quantum cryptography": These are being developed and standardized by initiatives like NIST and the Open Quantum Safe project.
- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.09 · source "Post-quantum cryptography": These are being developed and standardized by NIST and projects like Open Quantum Safe.
- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.09 · source "Post-quantum cryptography": These are being developed and standardized by NIST and projects like Open Quantum Safe.

## Removed although supported (sample)


Limits: a removed citation is one whose (source title, sentence) has no match in the shown answer (word Jaccard >= 0.6), so a rewritten sentence can count as removed; Jev sees at most 2000 characters of each source.
