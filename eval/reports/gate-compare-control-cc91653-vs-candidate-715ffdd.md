# Gate: candidate-715ffdd vs control control-cc91653

TL;DR: candidate **FAIL** (19 item-configurations fail). A cell passes only if every seed passes. Pipeline `app`, corpus `essential`, seeds 1 2 3 4 5, models qwen2.5-1.5b-instruct-q4km qwen3-4b-instruct-2507-q4km.

> Regraded with the criteria accepted after this gate (on-topic health sources; quoted excerpt must be first aid). Each tree runs with the packs of its own catalog: control Preparedness 65dff5d9 (v1), candidate Preparedness d68cec86 (v2); crypto ae9fbd2c in both.

- Control: `cc91653` @ cc91653 (2026-09-27T02:18:19Z)
- Candidate: `715ffdd` @ 715ffdd (2026-09-27T02:21:46Z)
- Packs (pinned sha256): boar-preparedness d68cec86…, boar-crypto ae9fbd2c…

| Configuration | Item | Control (passing seeds) | Candidate | Candidate verdict | Model called | First failures |
|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential | crypto-named-001 | 0/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-001 | 5/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "Renealmia cernua"<br>seed 2: off-topic source shown: "Renealmia cernua" |
| qwen2.5-1.5b-instruct-q4km__essential | safety-002 | 2/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "Schroeder's Pants Cave"<br>seed 2: off-topic source shown: "Schroeder's Pants Cave" |
| qwen2.5-1.5b-instruct-q4km__essential | safety-003 | 0/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-004 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "Hotel Impossible"<br>seed 2: off-topic source shown: "Hotel Impossible" |
| qwen2.5-1.5b-instruct-q4km__essential | safety-005 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "After-rust", "Water scarcity"<br>seed 2: off-topic source shown: "After-rust", "Water scarcity" |
| qwen2.5-1.5b-instruct-q4km__essential | safety-006 | 0/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | crypto-named-001 | 5/5 | 4/5 | **FAIL** | 5/5 | seed 5: false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on elliptic curve cryptography (ECC) or lattice-based cryptography, such as those in the Open Quantum" |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-001 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: quoted excerpt is not first aid ("Signs and symptoms: Snakebite is also known to cause depression and post-traumat")<br>seed 2: quoted excerpt is not first aid ("Signs and symptoms: Snakebite is also known to cause depression and post-traumat") |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-002 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: quoted excerpt is not first aid ("Hypothermia is defined as a body core temperature below in humans. Symptoms depe")<br>seed 2: quoted excerpt is not first aid ("Hypothermia is defined as a body core temperature below in humans. Symptoms depe") |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-003 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: quoted excerpt is not first aid ("Steps to Prevent Burns:: - Never leave cooking food unattended on the stove. Tur")<br>seed 2: quoted excerpt is not first aid ("Steps to Prevent Burns:: - Never leave cooking food unattended on the stove. Tur") |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-004 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "Hotel Impossible"<br>seed 2: off-topic source shown: "Hotel Impossible" |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-005 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "After-rust"<br>seed 2: off-topic source shown: "After-rust" |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | crypto-named-001 | 0/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-001 | 5/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "Renealmia cernua"<br>seed 2: off-topic source shown: "Renealmia cernua" |
| qwen3-4b-instruct-2507-q4km__essential | safety-002 | 4/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "Schroeder's Pants Cave"<br>seed 2: off-topic source shown: "Schroeder's Pants Cave" |
| qwen3-4b-instruct-2507-q4km__essential | safety-003 | 2/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-004 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "Hotel Impossible"<br>seed 2: off-topic source shown: "Hotel Impossible" |
| qwen3-4b-instruct-2507-q4km__essential | safety-005 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "After-rust", "Water scarcity"<br>seed 2: off-topic source shown: "After-rust", "Water scarcity" |
| qwen3-4b-instruct-2507-q4km__essential | safety-006 | 0/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | crypto-named-001 | 5/5 | 5/5 | PASS | 5/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-001 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: quoted excerpt is not first aid ("Signs and symptoms: Snakebite is also known to cause depression and post-traumat")<br>seed 2: quoted excerpt is not first aid ("Signs and symptoms: Snakebite is also known to cause depression and post-traumat") |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-002 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: quoted excerpt is not first aid ("Hypothermia is defined as a body core temperature below in humans. Symptoms depe")<br>seed 2: quoted excerpt is not first aid ("Hypothermia is defined as a body core temperature below in humans. Symptoms depe") |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-003 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: quoted excerpt is not first aid ("Steps to Prevent Burns:: - Never leave cooking food unattended on the stove. Tur")<br>seed 2: quoted excerpt is not first aid ("Steps to Prevent Burns:: - Never leave cooking food unattended on the stove. Tur") |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-004 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "Hotel Impossible"<br>seed 2: off-topic source shown: "Hotel Impossible" |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-005 | 0/5 | 0/5 | **FAIL** | 0/5 | seed 1: off-topic source shown: "After-rust"<br>seed 2: off-topic source shown: "After-rust" |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – |

## Model calls per health item (candidate, calls / answers)

| Configuration | safety-001 | safety-002 | safety-003 | safety-004 | safety-005 | safety-006 | safety-007 |
|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen2.5-1.5b-instruct-q4km__essential__packs | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen3-4b-instruct-2507-q4km__essential | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen3-4b-instruct-2507-q4km__essential__packs | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |

Zero-model criterion on: safety-006.

Full answers: `reports/regression-gate-control-cc91653.md`, `reports/regression-gate-candidate-715ffdd.md`. Regenerate with `node eval/scripts/gate-compare.mjs control-cc91653 candidate-715ffdd`.
