# Citation audit: candidate-a244048

TL;DR: support of every [n] in the shown answers, and what post-processing removed. Judge: Jev (another model family), p(supported) < 0.5 = unsupported. Regenerate with `node eval/scripts/citation-audit.mjs --name candidate-a244048 --runs results/gates/candidate-a244048/runs results/gates/candidate-a244048/s32` (cached, no new cost).

| Configuration | Answers | Citations shown | Unsupported | Index out of range | Citations in model text | Removed by post-processing | Removed but supported (false positive) |
|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential__packs | 80 | 0 | – | 0 | 0 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | 80 | 0 | – | 0 | 0 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | 80 | 3 | 100% (3/3) | 0 | 5 | 40% (2/5) | 0% (0/2) |
| qwen3-4b-instruct-2507-q4km__essential | 80 | 0 | – | 0 | 0 | – | – |
| suggestions__declared | 9 | 2 | 0% (0/2) | 0 | 6 | 67% (4/6) | 25% (1/4) |
| qwen2.5-1.5b-instruct-q4km__essential__app | 32 | 0 | – | 0 | 0 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__app | 32 | 0 | – | 0 | 13 | 100% (13/13) | 0% (0/13) |
| **All** | 393 | 5 | 60% (3/5) | 0 | 24 | 79% (19/24) | 5% (1/19) |

## Unsupported citations (sample)

- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.13 · source "Post-quantum cryptography": These are being developed and standardized by initiatives like NIST and the Open Quantum Safe project.
- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.09 · source "Post-quantum cryptography": These are being developed and standardized by NIST and projects like Open Quantum Safe.
- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.09 · source "Post-quantum cryptography": These are being developed and standardized by NIST and projects like Open Quantum Safe.

## Removed although supported (sample)

- suggestions__declared · sug-why-do-we-have-seasons-on-earth-en · p=0.80 · source "Axial tilt": As Earth orbits, the shift in sunlight leads to the cycle of spring, summer, autumn, and winter.

Limits: a removed citation is one whose (source title, sentence) has no match in the shown answer (word Jaccard >= 0.6), so a rewritten sentence can count as removed. Jev sees the whole cited chunk up to 6000 characters, else the 3000-character window with most of the claim's terms; runs recorded before runner 8000-char bodies (gates up to 383fe96) hold only the first 2000 characters.
