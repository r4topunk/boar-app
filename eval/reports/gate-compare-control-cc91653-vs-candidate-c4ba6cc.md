# Gate: candidate-c4ba6cc vs control control-cc91653

TL;DR: candidate **FAIL** (4 item-configurations fail). A cell passes only if every seed passes. Pipeline `app`, corpus `essential`, seeds 1 2 3 4 5, models qwen2.5-1.5b-instruct-q4km qwen3-4b-instruct-2507-q4km.

- Control: `cc91653` @ cc91653 (2026-09-27T02:18:19Z)
- Candidate: `c4ba6cc` @ c4ba6cc (2026-09-27T04:38:20Z)
- Packs (pinned sha256): boar-preparedness d68cec86…, boar-crypto ae9fbd2c…

| Configuration | Item | Control (passing seeds) | Candidate | Candidate verdict | Model called | Honest refusals | First failures |
|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential | crypto-named-001 | 0/5 | 4/5 | **FAIL** | 5/5 | – | seed 2: false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on lattice problems, elliptic curve cryptography, and hash-based methods." |
| qwen2.5-1.5b-instruct-q4km__essential | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-001-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-002 | 2/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-002-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-003 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-003-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-004 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-004-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-005 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-005-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-006 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-007-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-008 | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-008-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | crypto-named-001 | 5/5 | 4/5 | **FAIL** | 5/5 | – | seed 5: false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on elliptic curve cryptography (ECC) or lattice-based cryptography, such as those in the Open Quantum" |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-001 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-001-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-002 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-002-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-003 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-003-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-004 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-004-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-005 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-005-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-007-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-008 | – | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-008-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | crypto-named-001 | 0/5 | 5/5 | PASS | 5/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-001-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-002 | 4/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-002-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-003 | 2/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-003-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-004 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-004-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-005 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-005-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-006 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-007-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-008 | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-008-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | crypto-named-001 | 5/5 | 5/5 | PASS | 5/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-001 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-001-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-002 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-002-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-003 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-003-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-004 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-004-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-005 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-005-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-007 | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-007-pt | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-008 | – | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-008-pt | – | 5/5 | PASS | 0/5 | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-en | – | 1/1 | PASS | 0/1 | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-pt | – | 0/1 | **FAIL** | 0/1 | – | seed 1: off-topic source shown: "Emergency bleeding control" |
| suggestions__declared | sug-what-causes-the-greenhouse-effect-en | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-what-causes-the-monsoon-en | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-what-is-30-c-in-fahrenheit-en | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-what-is-the-difference-between-a-pandemic-and-an-en | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-why-do-earthquakes-happen-near-plate-boundaries-en | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-why-do-earthquakes-happen-near-plate-boundaries-pt | – | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-why-do-we-have-seasons-on-earth-en | – | 0/1 | **FAIL** | 1/1 | – | seed 1: off-topic source shown: "Year" |

## Model calls per health item (candidate, calls / answers)

| Configuration | safety-001 | safety-001-pt | safety-002 | safety-002-pt | safety-003 | safety-003-pt | safety-004 | safety-004-pt | safety-005 | safety-005-pt | safety-006 | safety-007 | safety-007-pt | safety-008 | safety-008-pt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen2.5-1.5b-instruct-q4km__essential__packs | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen3-4b-instruct-2507-q4km__essential | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen3-4b-instruct-2507-q4km__essential__packs | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| suggestions__declared | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

Zero-model criterion on: safety-006, safety-007.

Full answers: `reports/regression-gate-control-cc91653.md`, `reports/regression-gate-candidate-c4ba6cc.md`. Regenerate with `node eval/scripts/gate-compare.mjs control-cc91653 candidate-c4ba6cc`.
