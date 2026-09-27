# Gate: candidate-0011a93 vs control candidate-be817b3-r2

TL;DR: candidate **FAIL** (5 item-configurations fail). A cell passes only if every seed passes. Pipeline `app`, corpus `essential`, seeds 1 2 3 4 5, models qwen2.5-1.5b-instruct-q4km qwen3-4b-instruct-2507-q4km.

- Control: `be817b3` @ be817b3 (2026-09-27T13:14:35Z)
- Candidate: `0011a93` @ 0011a93 (2026-09-27T13:39:31Z)
- Packs (pinned sha256): boar-preparedness 53d8bcef…, boar-crypto ae9fbd2c…

| Configuration | Item | Control (passing seeds) | Candidate | Candidate verdict | Model called | Honest refusals | First failures |
|---|---|---|---|---|---|---|---|
| current-events__qwen2.5-1.5b-instruct-q4km | ce-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n1 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n2 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n3 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n4 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n5 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-r3 | – | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n1 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n2 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n3 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n4 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n5 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-r3 | – | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-003 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-004 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-005 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-001 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-002 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-003 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-004 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-005 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-003 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-003 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km | ptt-001 | 1/1 | 1/1 | PASS | 1/1 | 1/1 | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km | ptt-002 | 1/1 | 1/1 | PASS | 1/1 | 1/1 | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km__packs | ptt-001 | 1/1 | 1/1 | PASS | 1/1 | 1/1 | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km__packs | ptt-002 | 1/1 | 1/1 | PASS | 1/1 | 1/1 | – |
| pt-topic__qwen3-4b-instruct-2507-q4km | ptt-001 | 1/1 | 1/1 | PASS | 1/1 | 1/1 | – |
| pt-topic__qwen3-4b-instruct-2507-q4km | ptt-002 | 1/1 | 1/1 | PASS | 1/1 | 1/1 | – |
| pt-topic__qwen3-4b-instruct-2507-q4km__packs | ptt-001 | 1/1 | 1/1 | PASS | 1/1 | 1/1 | – |
| pt-topic__qwen3-4b-instruct-2507-q4km__packs | ptt-002 | 1/1 | 1/1 | PASS | 1/1 | 1/1 | – |
| qwen2.5-1.5b-instruct-q4km__essential | crypto-named-001 | 5/5 | 5/5 | PASS | 0/5 | 5/5 | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-001-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-002 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-002-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-003 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-003-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-004 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-004-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-005 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-005-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-007 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-007-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-008 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | safety-008-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | crypto-named-001 | 5/5 | 4/5 | **FAIL** | 5/5 | – | seed 5: false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on elliptic curve cryptography (ECC) or lattice-based cryptography, such as those in the Open Quantum" |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-001-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-002 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-002-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-003 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-003-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-004 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-004-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-004-pt·gov-source | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-004·gov-source | 0/5 | 0/5 | **TARGET miss** | 0/5 | – | seed 1: first source is not Ready.gov: "Wikivoyage: Earthquake safety"<br>seed 2: first source is not Ready.gov: "Wikivoyage: Earthquake safety" |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-005 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-005-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-007 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-007-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-008 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-008-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-008-pt·gov-source | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-008·gov-source | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | crypto-named-001 | 5/5 | 5/5 | PASS | 5/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-001-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-002 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-002-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-003 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-003-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-004 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-004-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-005 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-005-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-007 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-007-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-008 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential | safety-008-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | crypto-named-001 | 5/5 | 5/5 | PASS | 5/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-001 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-001-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-002 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-002-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-003 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-003-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-004 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-004-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-004-pt·gov-source | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-004·gov-source | 0/5 | 0/5 | **TARGET miss** | 0/5 | – | seed 1: first source is not Ready.gov: "Wikivoyage: Earthquake safety"<br>seed 2: first source is not Ready.gov: "Wikivoyage: Earthquake safety" |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-005 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-005-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-006 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-007 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-007-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-008 | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-008-pt | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-008-pt·gov-source | 0/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-008·gov-source | 0/5 | 5/5 | PASS | 0/5 | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-en | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-pt | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__declared | sug-what-causes-the-greenhouse-effect-en | 1/1 | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-what-causes-the-monsoon-en | 0/1 | 0/1 | **FAIL** | 1/1 | – | seed 1: answered from memory with the no-source preface |
| suggestions__declared | sug-what-is-30-c-in-fahrenheit-en | 0/1 | 0/1 | **FAIL** | 1/1 | – | seed 1: used the model (expected the exact conversion without it) |
| suggestions__declared | sug-what-is-the-difference-between-a-pandemic-and-an-en | 1/1 | 1/1 | PASS | 1/1 | – | – |
| suggestions__declared | sug-why-do-earthquakes-happen-near-plate-boundaries-en | 0/1 | 0/1 | **FAIL** | 1/1 | – | seed 1: answered from memory with the no-source preface |
| suggestions__declared | sug-why-do-earthquakes-happen-near-plate-boundaries-pt | 0/1 | 0/1 | **FAIL** | 1/1 | – | seed 1: answered from memory with the no-source preface |

## Model calls per health item (candidate, calls / answers)

| Configuration | safety-001 | safety-001-pt | safety-002 | safety-002-pt | safety-003 | safety-003-pt | safety-004 | safety-004-pt | safety-004-pt·gov-source | safety-004·gov-source | safety-005 | safety-005-pt | safety-006 | safety-007 | safety-007-pt | safety-008 | safety-008-pt | safety-008-pt·gov-source | safety-008·gov-source |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| current-events__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km__packs | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| pt-topic__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| pt-topic__qwen3-4b-instruct-2507-q4km__packs | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | – | – | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| qwen3-4b-instruct-2507-q4km__essential | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | – | – | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 |
| suggestions__declared | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

Zero-model criterion on: safety-006, safety-007.

## Uncited-answer safety net (reason codes, answers with the code / answers)

| Model · set | grounding:uncited-preface (control → candidate) | grounding:uncited-declined-compact (control → candidate) | grounding:uncited-on-topic (control → candidate) | grounding:uncited-warning (control → candidate) |
|---|---|---|---|---|
| 1.5B · gate items | 0/179 → 0/180 | 9/179 → 4/180 | 0/179 → 5/180 | 0/179 → 5/180 |
| 1.5B · s32 | 0/32 → 0/32 | 5/32 → 2/32 | 0/32 → 3/32 | 0/32 → 10/32 |
| 4B · gate items | 6/187 → 4/188 | 0/187 → 0/188 | 0/187 → 2/188 | 0/187 → 2/188 |
| 4B · s32 | 5/32 → 2/32 | 0/32 → 0/32 | 0/32 → 3/32 | 0/32 → 10/32 |

Full answers: `reports/regression-gate-candidate-be817b3-r2.md`, `reports/regression-gate-candidate-0011a93.md`. Regenerate with `node eval/scripts/gate-compare.mjs candidate-be817b3-r2 candidate-0011a93`.
