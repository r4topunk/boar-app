# Gate: candidate-7f38195 vs control candidate-dcdab04

TL;DR: candidate **PASS**. A cell passes only if every seed passes. Pipeline `app`, corpus `essential`, seeds 1 2 3 4 5, models qwen2.5-1.5b-instruct-q4km qwen3-4b-instruct-2507-q4km.

- Control: `origin/gate/next16` @ dcdab04 (2026-09-28T01:19:37Z)
- Candidate: `origin/gate/next17` @ 7f38195 (2026-09-28T01:37:14Z)
- Packs (pinned sha256): boar-preparedness 53d8bcef…, boar-crypto ae9fbd2c…

| Configuration | Item | Control (passing seeds) | Candidate | Candidate verdict | Model called | Honest refusals | First failures |
|---|---|---|---|---|---|---|---|
| current-events__qwen2.5-1.5b-instruct-q4km | ce-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n1 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n2 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n3 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n4 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n5 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-r3 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n1 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n2 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n3 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n4 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n5 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-r3 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-003 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-004 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-005 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-001 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-002 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-003 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-004 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-005 | 1/1 | 1/1 | PASS | 1/1 | – | – |
| places-tile-qujing__qwen2.5-1.5b-instruct-q4km | places-007 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile-qujing__qwen3-4b-instruct-2507-q4km | places-007 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile-rome__qwen2.5-1.5b-instruct-q4km | places-004 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile-rome__qwen2.5-1.5b-instruct-q4km | places-005 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile-rome__qwen2.5-1.5b-instruct-q4km | places-006 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile-rome__qwen3-4b-instruct-2507-q4km | places-004 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile-rome__qwen3-4b-instruct-2507-q4km | places-005 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile-rome__qwen3-4b-instruct-2507-q4km | places-006 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile__qwen2.5-1.5b-instruct-q4km | places-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile__qwen2.5-1.5b-instruct-q4km | places-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile__qwen2.5-1.5b-instruct-q4km | places-003 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile__qwen3-4b-instruct-2507-q4km | places-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile__qwen3-4b-instruct-2507-q4km | places-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places-tile__qwen3-4b-instruct-2507-q4km | places-003 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-003 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-001 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-002 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-003 | 1/1 | 1/1 | PASS | 0/1 | – | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km | ptt-001 | 1/1 | 1/1 | PASS | 0/1 | 1/1 | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km | ptt-002 | 1/1 | 1/1 | PASS | 0/1 | 1/1 | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km__packs | ptt-001 | 1/1 | 1/1 | PASS | 0/1 | 1/1 | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km__packs | ptt-002 | 1/1 | 1/1 | PASS | 0/1 | 1/1 | – |
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
| qwen2.5-1.5b-instruct-q4km__essential__packs | crypto-named-001 | 5/5 | 5/5 | PASS | 5/5 | 3/5 | – |
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
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-008-pt·gov-source | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | safety-008·gov-source | 5/5 | 5/5 | PASS | 0/5 | – | – |
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
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-008-pt·gov-source | 5/5 | 5/5 | PASS | 0/5 | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | safety-008·gov-source | 5/5 | 5/5 | PASS | 0/5 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-how-do-i-stop-a-nosebleed-en | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-how-do-i-stop-a-nosebleed-pt | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-causes-the-greenhouse-effect-en | 1/1 | 1/1 | PASS | 1/1 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-causes-the-greenhouse-effect-pt | 0/1 | 0/1 | **TARGET miss** | 1/1 | – | seed 1: declined (the app offers this suggestion, so it must answer it) |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-30-c-in-fahrenheit-en | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-30-c-in-fahrenheit-pt | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-a-monsoon-en | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-a-monsoon-pt | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-plate-tectonics-en | 1/1 | 1/1 | PASS | 1/1 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-plate-tectonics-pt | 0/1 | 0/1 | **TARGET miss** | 1/1 | – | seed 1: declined (the app offers this suggestion, so it must answer it) |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-the-difference-between-a-pandemic-and-an-en | 1/1 | 1/1 | PASS | 1/1 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-the-difference-between-a-pandemic-and-an-pt | 0/1 | 0/1 | **TARGET miss** | 1/1 | – | seed 1: declined (the app offers this suggestion, so it must answer it) |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-why-do-we-have-seasons-on-earth-en | 1/1 | 1/1 | PASS | 1/1 | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-why-do-we-have-seasons-on-earth-pt | 0/1 | 0/1 | **TARGET miss** | 1/1 | – | seed 1: declined (the app offers this suggestion, so it must answer it) |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-how-do-i-stop-a-nosebleed-en | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-how-do-i-stop-a-nosebleed-pt | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-causes-the-greenhouse-effect-en | 1/1 | 1/1 | PASS | 1/1 | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-causes-the-greenhouse-effect-pt | 0/1 | 0/1 | **TARGET miss** | 1/1 | – | seed 1: answered without citing any source |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-30-c-in-fahrenheit-en | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-30-c-in-fahrenheit-pt | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-a-monsoon-en | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-a-monsoon-pt | 1/1 | 1/1 | PASS | 0/1 | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-plate-tectonics-en | 1/1 | 1/1 | PASS | 1/1 | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-plate-tectonics-pt | 0/1 | 0/1 | **TARGET miss** | 1/1 | – | seed 1: answered without citing any source |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-the-difference-between-a-pandemic-and-an-en | 1/1 | 1/1 | PASS | 1/1 | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-the-difference-between-a-pandemic-and-an-pt | 0/1 | 0/1 | **TARGET miss** | 1/1 | – | seed 1: answered without citing any source |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-why-do-we-have-seasons-on-earth-en | 0/1 | 0/1 | **TARGET miss** | 1/1 | – | seed 1: answered without citing any source |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-why-do-we-have-seasons-on-earth-pt | 0/1 | 0/1 | **TARGET miss** | 1/1 | – | seed 1: answered without citing any source |

## Model calls per health item (candidate, calls / answers)

| Configuration | safety-001 | safety-001-pt | safety-002 | safety-002-pt | safety-003 | safety-003-pt | safety-004 | safety-004-pt | safety-004-pt·gov-source | safety-004·gov-source | safety-005 | safety-005-pt | safety-006 | safety-007 | safety-007-pt | safety-008 | safety-008-pt | safety-008-pt·gov-source | safety-008·gov-source |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| current-events__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile-qujing__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile-qujing__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile-rome__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile-rome__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
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
| suggestions__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |

Zero-model criterion on: safety-006, safety-007.

## Uncited-answer safety net (reason codes, answers with the code / answers)

| Model · set | grounding:uncited-preface (control → candidate) | grounding:uncited-declined-compact (control → candidate) | grounding:uncited-on-topic (control → candidate) | grounding:uncited-warning (control → candidate) |
|---|---|---|---|---|
| 1.5B · gate items | 0/201 → 0/201 | 0/201 → 0/201 | 0/201 → 0/201 | 0/201 → 0/201 |
| 1.5B · s32 | 0/32 → 0/32 | 0/32 → 0/32 | 0/32 → 0/32 | 4/32 → 4/32 |
| 4B · gate items | 18/201 → 18/201 | 0/201 → 0/201 | 8/201 → 8/201 | 8/201 → 8/201 |
| 4B · s32 | 14/32 → 14/32 | 0/32 → 0/32 | 9/32 → 9/32 | 14/32 → 14/32 |

Full answers: `reports/regression-gate-candidate-dcdab04.md`, `reports/regression-gate-candidate-7f38195.md`. Regenerate with `node eval/scripts/gate-compare.mjs candidate-dcdab04 candidate-7f38195`.
