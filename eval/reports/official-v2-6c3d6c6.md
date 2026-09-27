# BOAR eval: v2 "Vitalik style" (official-v2-6c3d6c6)

TL;DR: the literal test from Vitalik's post. Food answers are scored objectively against OpenStreetMap; crypto and travel answers by the blind judge (Jev) against Opus + web search. Regenerate with `node eval/scripts/report-v2.mjs --judge jev --name official-v2-6c3d6c6 --systems qwen3-4b-instruct-2507-q4km__official-6c3d6c6,qwen2.5-1.5b-instruct-q4km__official-6c3d6c6`.

## Local food ("Tell me the best vegan restaurants in [city]")

An item passes when the answer names ≥ 3 distinct venues that exist in the OSM snapshot for that city and diet.

| System | Pass (n) | Located items passed | Mean verified venues | Deflects | Median s |
|---|---|---|---|---|---|
| Qwen2.5-1.5B-Instruct (Q4_K_M) | 0% (20) | 0/3 | 0.0 | 0% | 0.7 |
| Qwen3-4B-Instruct-2507 (Q4_K_M) | 0% (20) | 0/3 | 0.0 | 0% | 1.7 |
| Reference (Opus + web search) | 90% (20) | 2/3 | 4.8 | 0% | 37.3 |

## Crypto, travel, danger situations and math (blind judge: Jev, both orders)

Correct = judge correctness ≥ 4 of 5. Math also has an objective check: the answer contains the computed number.

| System | Crypto correct | Travel correct | Danger correct | Math correct (judge) | Math number right | Quality ratio vs ref (95% CI) | Win / tie / loss |
|---|---|---|---|---|---|---|---|
| Qwen2.5-1.5B-Instruct (Q4_K_M) | 10% (20) | 10% (10) | 0% (5) | 17% (6) | 3/6 | 0.41 (0.37–0.44) | 0% / 0% / 100% |
| Qwen3-4B-Instruct-2507 (Q4_K_M) | 30% (20) | 20% (10) | 0% (5) | 33% (6) | 3/6 | 0.49 (0.43–0.54) | 0% / 0% / 100% |
| Reference (Opus + web search) | – | – | – | – | 6/6 | 1.00 | – |

## The exact prompt from the post: "Which signature algorithms are quantum resistant?"

**Qwen2.5-1.5B-Instruct (Q4_K_M)** (judge correctness 1.5/5):

> Liboqs, an open source C library, aims to include several quantum-resistant signature schemes. These schemes are intended to provide quantum-safe key exchange algorithms. Liboqs will also integrate a test harness and benchmarking routines to evaluate performance. [2]

**Qwen3-4B-Instruct-2507 (Q4_K_M)** (judge correctness 3.5/5):

> There is no single definitive list of quantum-resistant signature algorithms, but several post-quantum signature schemes are considered strong candidates, such as Dilithium, Falcon, and SPHINCS+. These are being developed and standardized by NIST as part of the post-quantum cryptography initiative [2]. For example, SPHINCS+ is a hash-based signature scheme that is believed to be secure against quantum attacks.

## Per-item food results

| Item | City | Query | Qwen2.5-1.5B-Instruct (Q4_K_M) | Qwen3-4B-Instruct-2507 (Q4_K_M) | Reference |
|---|---|---|---|---|---|
| food-001 | Berlin | Tell me the best vegan restaurants in Berlin | 0 | 0 | 7 ✓ |
| food-002 | Lisbon | Tell me the best vegan restaurants in Lisbon | 0 | 0 | 7 ✓ |
| food-003 | Buenos Aires | Tell me the best vegan restaurants in Buenos Aires | 0 | 0 | 2 |
| food-004 | Singapore | Tell me the best vegan restaurants in Singapore | 0 | 0 | 5 ✓ |
| food-005 | Chiang Mai | Tell me the best vegan restaurants in Chiang Mai | 0 | 0 | 5 ✓ |
| food-006 | Tokyo | Tell me the best vegan restaurants in Tokyo | 0 | 0 | 7 ✓ |
| food-007 | Bangkok | Tell me the best vegan restaurants in Bangkok | 0 | 0 | 4 ✓ |
| food-008 | Istanbul | Tell me the best vegan restaurants in Istanbul | 0 | 0 | 6 ✓ |
| food-009 | Mexico City | Tell me the best vegan restaurants in Mexico City | 0 | 0 | 7 ✓ |
| food-010 | Taipei | Tell me the best vegan restaurants in Taipei | 0 | 0 | 4 ✓ |
| food-011 | Seoul | Tell me the best vegan restaurants in Seoul | 0 | 0 | 3 ✓ |
| food-012 | Prague | Tell me the best vegan restaurants in Prague | 0 | 0 | 9 ✓ |
| food-013 | Tbilisi | Where can I eat vegetarian food in Tbilisi? | 0 | 0 | 4 ✓ |
| food-014 | Kyoto | What are good vegetarian restaurants in Kyoto? | 0 | 0 | 3 ✓ |
| food-015 | Medellín | Recommend some vegetarian restaurants in Medellín | 0 | 0 | 4 ✓ |
| food-016 | Cape Town | Tell me the best vegan restaurants in Cape Town | 0 | 0 | 3 ✓ |
| food-017 | São Paulo | Quais são os melhores restaurantes veganos em São Paulo? | 0 | 0 | 4 ✓ |
| food-018 | Barcelona | Tell me the best vegan restaurants in the city I am currently in | 0 | 0 | 9 ✓ |
| food-019 | Hong Kong | Tell me the best vegan restaurants in the city I am currently in | 0 | 0 | 0 |
| food-020 | Denver | Tell me the best vegan restaurants near me | 0 | 0 | 4 ✓ |

## Notes

- BOAR today has no POI data and does not read the device location, so food items are expected to fail: this is the starting point for P1 (offline OSM POIs + GPS).
- A venue missing from OSM is unverified, not necessarily wrong; OSM coverage of `diet:*` tags varies by city (see counts in `dataset/gold/v2`).
- The reference gets the device coordinates for the 3 located items; BOAR's runner does not (the app does not use them yet).
- Judge and reference are both Claude (same-family limitation as in v1).
