# Citation audit: candidate-586a4c1

TL;DR: support of every [n] in the shown answers, and what post-processing removed. Judge: Jev (another model family), p(supported) < 0.5 = unsupported. Regenerate with `node eval/scripts/citation-audit.mjs --name candidate-586a4c1 --runs results/gates/candidate-586a4c1/runs` (cached, no new cost).

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
| qwen2.5-1.5b-instruct-q4km__essential__packs | 80 | 7 | 71% (5/7) | 0 | 0 | – | – | 2 | 0% (0/2) |
| qwen2.5-1.5b-instruct-q4km__essential | 80 | 0 | – | 0 | 0 | – | – | 0 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | 80 | 9 | 89% (8/9) | 0 | 5 | 40% (2/5) | 0% (0/2) | 1 | 0% (0/1) |
| qwen3-4b-instruct-2507-q4km__essential | 80 | 0 | – | 0 | 0 | – | – | 0 | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | 14 | 3 | 0% (0/3) | 0 | 0 | – | – | 3 | 0% (0/3) |
| suggestions__qwen3-4b-instruct-2507-q4km | 14 | 3 | 0% (0/3) | 0 | 13 | 77% (10/13) | 80% (8/10) | 0 | – |
| **All** | 382 | 22 | 59% (13/22) | 0 | 20 | 70% (14/20) | 57% (8/14) | 6 | 0% (0/6) |

## Unsupported citations (sample)

- qwen2.5-1.5b-instruct-q4km__essential__packs · safety-005-pt · p=0.06 · source "Wikivoyage: Water": Buy: - Boil the water before drinking (several minutes, depending on what you want to kill) - Use iodine tablets (will kill bacteria, but make the water taste bad) - Use a survival straw (probably bes
- qwen2.5-1.5b-instruct-q4km__essential__packs · safety-005-pt · p=0.06 · source "Wikivoyage: Water": Buy: - Boil the water before drinking (several minutes, depending on what you want to kill) - Use iodine tablets (will kill bacteria, but make the water taste bad) - Use a survival straw (probably bes
- qwen2.5-1.5b-instruct-q4km__essential__packs · safety-005-pt · p=0.06 · source "Wikivoyage: Water": Buy: - Boil the water before drinking (several minutes, depending on what you want to kill) - Use iodine tablets (will kill bacteria, but make the water taste bad) - Use a survival straw (probably bes
- qwen2.5-1.5b-instruct-q4km__essential__packs · safety-005-pt · p=0.06 · source "Wikivoyage: Water": Buy: - Boil the water before drinking (several minutes, depending on what you want to kill) - Use iodine tablets (will kill bacteria, but make the water taste bad) - Use a survival straw (probably bes
- qwen2.5-1.5b-instruct-q4km__essential__packs · safety-005-pt · p=0.06 · source "Wikivoyage: Water": Buy: - Boil the water before drinking (several minutes, depending on what you want to kill) - Use iodine tablets (will kill bacteria, but make the water taste bad) - Use a survival straw (probably bes
- qwen3-4b-instruct-2507-q4km__essential__packs · safety-005-pt · p=0.06 · source "Wikivoyage: Water": Buy: - Boil the water before drinking (several minutes, depending on what you want to kill) - Use iodine tablets (will kill bacteria, but make the water taste bad) - Use a survival straw (probably bes
- qwen3-4b-instruct-2507-q4km__essential__packs · crypto-named-001 · p=0.13 · source "Post-quantum cryptography": These are being developed and standardized by initiatives like NIST and the Open Quantum Safe project.
- qwen3-4b-instruct-2507-q4km__essential__packs · safety-005-pt · p=0.06 · source "Wikivoyage: Water": Buy: - Boil the water before drinking (several minutes, depending on what you want to kill) - Use iodine tablets (will kill bacteria, but make the water taste bad) - Use a survival straw (probably bes

## Removed although supported (sample)

- suggestions__qwen3-4b-instruct-2507-q4km · sug-why-do-we-have-seasons-on-earth-en · p=0.80 · source "Axial tilt": As Earth orbits, the shift in sunlight leads to the cycle of spring, summer, autumn, and winter.
- suggestions__qwen3-4b-instruct-2507-q4km · sug-why-do-we-have-seasons-on-earth-pt · p=0.80 · source "Season": As estações do ano existem na Terra devido à inclinação do eixo terrestre em relação ao plano orbital ao redor do Sol, o que causa variações na intensidade e duração da luz solar em diferentes regiões
- suggestions__qwen3-4b-instruct-2507-q4km · sug-what-is-the-difference-between-a-pandemic-and-an-pt · p=0.57 · source "Pandemic": Uma epidemia é uma expansão de uma doença em uma região específica, enquanto uma pandemia é uma epidemia que se espalha globalmente, afetando uma grande parte da população mundial.
- suggestions__qwen3-4b-instruct-2507-q4km · sug-what-causes-the-greenhouse-effect-pt · p=0.96 · source "Greenhouse effect": O efeito estufa é causado pela presença de gases de efeito estufa na atmosfera que retêm o calor emitido pela superfície da Terra, impedindo que ele escape para o espaço.
- suggestions__qwen3-4b-instruct-2507-q4km · sug-what-causes-the-greenhouse-effect-pt · p=0.96 · source "Greenhouse effect": Esses gases permitem que a radiação solar passe para a superfície, mas absorvem a radiação infravermelha emitida pela Terra, reduzindo a perda de calor.
- suggestions__qwen3-4b-instruct-2507-q4km · sug-what-is-plate-tectonics-pt · p=0.91 · source "Plate tectonics": A tectônica de placas é a teoria que explica que a crosta terrestre está composta por placas grandes que se movem lentamente há 3 a 4 bilhões de anos.
- suggestions__qwen3-4b-instruct-2507-q4km · sug-what-is-plate-tectonics-pt · p=0.92 · source "Plate tectonics": Essas placas deslocam-se devido a processos tectônicos que moldam a superfície da Terra.
- suggestions__qwen3-4b-instruct-2507-q4km · sug-what-is-plate-tectonics-pt · p=0.93 · source "Plate tectonics": O conceito se desenvolveu a partir da ideia de deriva continental, validada com o descobrimento da expansão do fundo oceânico na década de 1960.

## Added by attribution but unsupported (sample)


Limits: a removed citation is one whose (source title, sentence) has no match in the shown answer (word Jaccard >= 0.6), so a rewritten sentence can count as removed. Jev sees the whole cited chunk up to 6000 characters, else the 3000-character window with most of the claim's terms; runs recorded before runner 8000-char bodies (gates up to 383fe96) hold only the first 2000 characters.
