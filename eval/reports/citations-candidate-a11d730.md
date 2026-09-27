# Citation audit: candidate-a11d730

TL;DR: support of every [n] in the shown answers, and what post-processing removed. Judge: Jev (another model family), p(supported) < 0.5 = unsupported. Regenerate with `node eval/scripts/citation-audit.mjs --name candidate-a11d730 --runs results/gates/candidate-a11d730/runs` (cached, no new cost).

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
| suggestions__qwen2.5-1.5b-instruct-q4km | 14 | 3 | 0% (0/3) | 0 | 0 | – | – | 3 | 0% (0/3) |
| suggestions__qwen3-4b-instruct-2507-q4km | 14 | 3 | 0% (0/3) | 0 | 9 | 67% (6/9) | 50% (3/6) | 0 | – |
| **All** | 382 | 12 | 25% (3/12) | 0 | 16 | 63% (10/16) | 30% (3/10) | 6 | 0% (0/6) |

## Unsupported citations (sample)

- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.13 · source "Post-quantum cryptography": These are being developed and standardized by initiatives like NIST and the Open Quantum Safe project.
- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.09 · source "Post-quantum cryptography": These are being developed and standardized by NIST and projects like Open Quantum Safe.
- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.09 · source "Post-quantum cryptography": These are being developed and standardized by NIST and projects like Open Quantum Safe.

## Removed although supported (sample)

- suggestions__qwen3-4b-instruct-2507-q4km · sug-why-do-we-have-seasons-on-earth-en · p=0.80 · source "Axial tilt": As Earth orbits, the shift in sunlight leads to the cycle of spring, summer, autumn, and winter.
- suggestions__qwen3-4b-instruct-2507-q4km · sug-why-do-we-have-seasons-on-earth-pt · p=0.93 · source "Season": As estações do ano existem devido à inclinação do eixo da Terra em relação ao plano orbital ao redor do Sol.
- suggestions__qwen3-4b-instruct-2507-q4km · sug-why-do-we-have-seasons-on-earth-pt · p=0.71 · source "Season": Esse ângulo causa variações na quantidade de luz solar direta que chega à superfície em diferentes momentos do ano, resultando em mudanças de temperatura e condições climáticas.

## Added by attribution but unsupported (sample)


Limits: a removed citation is one whose (source title, sentence) has no match in the shown answer (word Jaccard >= 0.6), so a rewritten sentence can count as removed. Jev sees the whole cited chunk up to 6000 characters, else the 3000-character window with most of the claim's terms; runs recorded before runner 8000-char bodies (gates up to 383fe96) hold only the first 2000 characters.
