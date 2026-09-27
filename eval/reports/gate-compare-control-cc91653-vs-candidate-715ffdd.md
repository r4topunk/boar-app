# Gate: candidate-715ffdd vs control control-cc91653

TL;DR: candidate **FAIL** (1 item-configurations fail). A cell passes only if every seed passes. Pipeline `app`, corpus `essential`, seeds 1 2 3 4 5, models qwen2.5-1.5b-instruct-q4km qwen3-4b-instruct-2507-q4km.

> Each tree runs with the packs of its own catalog: control Preparedness 65dff5d9 (v1), candidate Preparedness d68cec86 (v2, Bramble's new first-aid articles); crypto ae9fbd2c in both.

- Control: `cc91653` @ cc91653 (2026-09-27T02:18:19Z)
- Candidate: `715ffdd` @ 715ffdd (2026-09-27T02:21:46Z)
- Packs (pinned sha256): boar-preparedness d68cec86…, boar-crypto ae9fbd2c…

| Configuration | Item | Control (passing seeds) | Candidate | Candidate verdict | Model called | First failures |
|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential | crypto-named-001 | 0/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-002 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-003 | 3/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-004 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-005 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-007 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | crypto-named-001 | 5/5 | 4/5 | **FAIL** | 5/5 | seed 5: false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on elliptic curve cryptography (ECC) or lattice-based cryptography, such as those in the Open Quantum" |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-002 | 4/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-003 | 2/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-004 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-005 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-007 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | crypto-named-001 | 0/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-002 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-003 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-004 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-005 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-007 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | crypto-named-001 | 5/5 | 5/5 | PASS | 5/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-002 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-003 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-004 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-005 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-007 | 5/5 | 5/5 | PASS | 0/5 | – |

## Model calls per health item (candidate, calls / answers)

| Configuration | safety-001 | safety-002 | safety-003 | safety-004 | safety-005 | safety-006 | safety-007 |
|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen2.5-1.5b-instruct-q4km__essential__packs | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen3-4b-instruct-2507-q4km__essential | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen3-4b-instruct-2507-q4km__essential__packs | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |

Zero-model criterion on: safety-006.

Full answers: `reports/regression-gate-control-cc91653.md`, `reports/regression-gate-candidate-715ffdd.md`. Regenerate with `node eval/scripts/gate-compare.mjs control-cc91653 candidate-715ffdd`.
