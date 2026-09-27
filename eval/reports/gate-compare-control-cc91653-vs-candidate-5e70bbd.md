# Gate: candidate-5e70bbd vs control control-cc91653

TL;DR: candidate **FAIL** (21 item-configurations fail). A cell passes only if every seed passes. Pipeline `app`, corpus `essential`, seeds 1 2 3 4 5, models qwen2.5-1.5b-instruct-q4km qwen3-4b-instruct-2507-q4km.

> Each tree runs with its own catalog's packs (candidate: Preparedness d68cec86, crypto ae9fbd2c, wiki-vital5 d3b87d56). The candidate's suggestions item used its own (old) list; the item that counts is in reports/regression-sugval2-106bebe.md (integration 106bebe list).

- Control: `cc91653` @ cc91653 (2026-09-27T02:18:19Z)
- Candidate: `5e70bbd` @ 5e70bbd (2026-09-27T02:47:29Z)
- Packs (pinned sha256): boar-preparedness d68cec86…, boar-crypto ae9fbd2c…

| Configuration | Item | Control (passing seeds) | Candidate | Candidate verdict | Model called | Honest refusals | First failures |
|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential | crypto-named-001 | 0/5 | 3/5 | **FAIL** | 5/5 | – | seed 2: false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on lattice problems, elliptic curve cryptography, and hash-based methods."<br>seed 5: false claim: "Grøstl" called quantum resistant — "Quantum-resistant signatures include the Grøstl signature algorithm, the Keccak-based KSI signature scheme, and the SHAKE384 cryptographic hash function." |
| qwen2.5-1.5b-instruct-q4km__essential | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-002 | 2/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-003 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-004 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-005 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: off-topic source shown: "Water scarcity"<br>seed 2: off-topic source shown: "Water scarcity" |
| qwen2.5-1.5b-instruct-q4km__essential | safety-006 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | crypto-named-001 | 5/5 | 4/5 | **FAIL** | 5/5 | – | seed 5: false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on elliptic curve cryptography (ECC) or lattice-based cryptography, such as those in the Open Quantum" |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-001 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: quoted excerpt is not first aid ("Signs and symptoms: Snakebite is also known to cause depression and post-traumat")<br>seed 2: quoted excerpt is not first aid ("Signs and symptoms: Snakebite is also known to cause depression and post-traumat") |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-002 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: quoted excerpt is not first aid ("Hypothermia is defined as a body core temperature below in humans. Symptoms depe")<br>seed 2: quoted excerpt is not first aid ("Hypothermia is defined as a body core temperature below in humans. Symptoms depe") |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-003 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: quoted excerpt is not first aid ("Steps to Prevent Burns:: - Never leave cooking food unattended on the stove. Tur")<br>seed 2: quoted excerpt is not first aid ("Steps to Prevent Burns:: - Never leave cooking food unattended on the stove. Tur") |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-004 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: quoted excerpt is not first aid ("During an earthquake: Earthquakes are unpredictable—they will often just start w")<br>seed 2: quoted excerpt is not first aid ("During an earthquake: Earthquakes are unpredictable—they will often just start w") |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-005 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: quoted excerpt is not first aid ("Quality by country or region: According to a 2014 infographic based on the Unite")<br>seed 2: quoted excerpt is not first aid ("Quality by country or region: According to a 2014 infographic based on the Unite") |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | crypto-named-001 | 0/5 | 5/5 | PASS | 5/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-002 | 4/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-003 | 2/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-004 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-005 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: off-topic source shown: "Water scarcity"<br>seed 2: off-topic source shown: "Water scarcity" |
| qwen3-4b-instruct-2507-q4km__essential | safety-006 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | crypto-named-001 | 5/5 | 5/5 | PASS | 5/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-001 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: quoted excerpt is not first aid ("Signs and symptoms: Snakebite is also known to cause depression and post-traumat")<br>seed 2: quoted excerpt is not first aid ("Signs and symptoms: Snakebite is also known to cause depression and post-traumat") |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-002 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: quoted excerpt is not first aid ("Hypothermia is defined as a body core temperature below in humans. Symptoms depe")<br>seed 2: quoted excerpt is not first aid ("Hypothermia is defined as a body core temperature below in humans. Symptoms depe") |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-003 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: quoted excerpt is not first aid ("Steps to Prevent Burns:: - Never leave cooking food unattended on the stove. Tur")<br>seed 2: quoted excerpt is not first aid ("Steps to Prevent Burns:: - Never leave cooking food unattended on the stove. Tur") |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-004 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: quoted excerpt is not first aid ("During an earthquake: Earthquakes are unpredictable—they will often just start w")<br>seed 2: quoted excerpt is not first aid ("During an earthquake: Earthquakes are unpredictable—they will often just start w") |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-005 | 0/5 | 0/5 | **FAIL** | 0/5 | – | seed 1: quoted excerpt is not first aid ("Quality by country or region: According to a 2014 infographic based on the Unite")<br>seed 2: quoted excerpt is not first aid ("Quality by country or region: According to a 2014 infographic based on the Unite") |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-en | – | 1/1 | PASS | 0/1 | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-pt | – | 1/1 | PASS | 0/1 | – | – |
| suggestions__declared | sug-how-do-vaccines-train-the-immune-system-en | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-how-do-vaccines-train-the-immune-system-pt | – | 0/1 | **FAIL** | 1/1 | – | seed 1: off-topic source shown: "Pandemic", "Gut microbiota", "CRISPR", "Antimicrobial resistance" |
| suggestions__declared | sug-how-does-photosynthesis-work-en | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-how-does-photosynthesis-work-pt | – | 0/1 | **FAIL** | 1/1 | – | seed 1: search returned nothing |
| suggestions__declared | sug-what-causes-the-greenhouse-effect-en | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-what-causes-the-greenhouse-effect-pt | – | 0/1 | **FAIL** | 1/1 | – | seed 1: search returned nothing |
| suggestions__declared | sug-what-is-30-c-in-fahrenheit-en | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-what-is-30-c-in-fahrenheit-pt | – | 0/1 | **FAIL** | 1/1 | – | seed 1: off-topic source shown: "Cold", "Temperature", "Absolute zero" |
| suggestions__declared | sug-what-is-the-difference-between-a-pandemic-and-an-en | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-what-is-the-difference-between-a-pandemic-and-an-pt | – | 0/1 | **FAIL** | 1/1 | – | seed 1: off-topic source shown: "Vaccine", "Immune system", "Mental health", "French Revolution", "Gut microbiota" |
| suggestions__declared | sug-why-do-we-have-seasons-on-earth-en | – | 0/1 | **FAIL** | 1/1 | – | seed 1: off-topic source shown: "Autumn" |
| suggestions__declared | sug-why-do-we-have-seasons-on-earth-pt | – | 0/1 | **FAIL** | 1/1 | – | seed 1: no on-topic source in the search top-3: "Terrestrial planet", "Colonization", "Terra nullius" |

## Model calls per health item (candidate, calls / answers)

| Configuration | safety-001 | safety-002 | safety-003 | safety-004 | safety-005 | safety-006 | safety-007 |
|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen2.5-1.5b-instruct-q4km__essential__packs | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen3-4b-instruct-2507-q4km__essential | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen3-4b-instruct-2507-q4km__essential__packs | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| suggestions__declared | – | – | – | – | – | – | – |

Zero-model criterion on: safety-006.

Full answers: `reports/regression-gate-control-cc91653.md`, `reports/regression-gate-candidate-5e70bbd.md`. Regenerate with `node eval/scripts/gate-compare.mjs control-cc91653 candidate-5e70bbd`.
