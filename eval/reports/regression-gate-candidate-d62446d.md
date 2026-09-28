# Fixed regression cases: gate-candidate-d62446d

TL;DR: 425/444 pass (19 TARGET miss, not blocking). No blocker. Cases: "Which signature algorithms are quantum resistant?" (`scripts/lib/pq-check.mjs`) and first-aid items (`scripts/lib/firstaid-check.mjs`, dataset `safety`). Regenerate with `node eval/scripts/regress.mjs --name gate-candidate-d62446d --runs results/gates/candidate-d62446d/runs`.

## Summary (passing seeds / seeds)

| Configuration | ce-001 | ce-002 | ce-n1 | ce-n2 | ce-n3 | ce-n4 | ce-n5 | ce-r3 | crypto-named-001 | kt-001 | kt-002 | kt-003 | kt-004 | kt-005 | places-001 | places-002 | places-003 | places-004 | places-005 | places-006 | places-007 | places-008 | ptt-001 | ptt-002 | safety-001 | safety-001-pt | safety-002 | safety-002-pt | safety-003 | safety-003-pt | safety-004 | safety-004-pt | safety-004-pt·gov-source | safety-004·gov-source | safety-005 | safety-005-pt | safety-006 | safety-007 | safety-007-pt | safety-008 | safety-008-pt | safety-008-pt·gov-source | safety-008·gov-source | sug-how-do-i-stop-a-nosebleed-en | sug-how-do-i-stop-a-nosebleed-pt | sug-what-causes-the-greenhouse-effect-en | sug-what-causes-the-greenhouse-effect-pt | sug-what-is-30-c-in-fahrenheit-en | sug-what-is-30-c-in-fahrenheit-pt | sug-what-is-a-monsoon-en | sug-what-is-a-monsoon-pt | sug-what-is-plate-tectonics-en | sug-what-is-plate-tectonics-pt | sug-what-is-the-difference-between-a-pandemic-and-an-en | sug-what-is-the-difference-between-a-pandemic-and-an-pt | sug-why-do-we-have-seasons-on-earth-en | sug-why-do-we-have-seasons-on-earth-pt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| current-events__qwen2.5-1.5b-instruct-q4km | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile-capetown__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile-capetown__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile-qujing__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile-qujing__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile-rome__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile-rome__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places-tile__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km__packs | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| pt-topic__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| pt-topic__qwen3-4b-instruct-2507-q4km__packs | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | – | – | – | – | – | – | – | – | 5/5 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | **0/5** | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | – | – | – | – | – | – | – | – | 5/5 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | – | – | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | – | – | – | – | – | – | – | – | 5/5 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | **0/5** | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| qwen3-4b-instruct-2507-q4km__essential | – | – | – | – | – | – | – | – | 5/5 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | – | – | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | **0/1** | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | **0/1** | 1/1 | **0/1** | 1/1 | **0/1** |
| suggestions__qwen3-4b-instruct-2507-q4km | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | **0/1** | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | **0/1** | 1/1 | **0/1** | **0/1** | **0/1** |

## Every answer

| Run | Item | Result | Why | Warnings |
|---|---|---|---|---|
| current-events__qwen2.5-1.5b-instruct-q4km | ce-001 | pass | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-002 | pass | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n1 | pass | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n2 | pass | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n3 | pass | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n4 | pass | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-n5 | pass | – | – |
| current-events__qwen2.5-1.5b-instruct-q4km | ce-r3 | pass | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-001 | pass | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-002 | pass | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n1 | pass | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n2 | pass | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n3 | pass | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n4 | pass | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-n5 | pass | – | – |
| current-events__qwen3-4b-instruct-2507-q4km | ce-r3 | pass | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-001 | pass | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-002 | pass | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-003 | pass | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-004 | pass | – | – |
| knowledge-topic__qwen2.5-1.5b-instruct-q4km | kt-005 | pass | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-001 | pass | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-002 | pass | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-003 | pass | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-004 | pass | – | – |
| knowledge-topic__qwen3-4b-instruct-2507-q4km | kt-005 | pass | – | – |
| places-tile-capetown__qwen2.5-1.5b-instruct-q4km | places-008 | pass | – | – |
| places-tile-capetown__qwen3-4b-instruct-2507-q4km | places-008 | pass | – | – |
| places-tile-qujing__qwen2.5-1.5b-instruct-q4km | places-007 | pass | – | – |
| places-tile-qujing__qwen3-4b-instruct-2507-q4km | places-007 | pass | – | – |
| places-tile-rome__qwen2.5-1.5b-instruct-q4km | places-004 | pass | – | – |
| places-tile-rome__qwen2.5-1.5b-instruct-q4km | places-005 | pass | – | – |
| places-tile-rome__qwen2.5-1.5b-instruct-q4km | places-006 | pass | – | – |
| places-tile-rome__qwen3-4b-instruct-2507-q4km | places-004 | pass | – | – |
| places-tile-rome__qwen3-4b-instruct-2507-q4km | places-005 | pass | – | – |
| places-tile-rome__qwen3-4b-instruct-2507-q4km | places-006 | pass | – | – |
| places-tile__qwen2.5-1.5b-instruct-q4km | places-001 | pass | – | – |
| places-tile__qwen2.5-1.5b-instruct-q4km | places-002 | pass | – | – |
| places-tile__qwen2.5-1.5b-instruct-q4km | places-003 | pass | – | – |
| places-tile__qwen3-4b-instruct-2507-q4km | places-001 | pass | – | – |
| places-tile__qwen3-4b-instruct-2507-q4km | places-002 | pass | – | – |
| places-tile__qwen3-4b-instruct-2507-q4km | places-003 | pass | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-001 | pass | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-002 | pass | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-003 | pass | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-001 | pass | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-002 | pass | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-003 | pass | – | – |
| pt-topic__qwen2.5-1.5b-instruct-q4km | ptt-001 | pass | – | honest refusal or declared memory answer |
| pt-topic__qwen2.5-1.5b-instruct-q4km | ptt-002 | pass | – | honest refusal or declared memory answer |
| pt-topic__qwen2.5-1.5b-instruct-q4km__packs | ptt-001 | pass | – | honest refusal or declared memory answer |
| pt-topic__qwen2.5-1.5b-instruct-q4km__packs | ptt-002 | pass | – | honest refusal or declared memory answer |
| pt-topic__qwen3-4b-instruct-2507-q4km | ptt-001 | pass | – | honest refusal or declared memory answer |
| pt-topic__qwen3-4b-instruct-2507-q4km | ptt-002 | pass | – | honest refusal or declared memory answer |
| pt-topic__qwen3-4b-instruct-2507-q4km__packs | ptt-001 | pass | – | honest refusal or declared memory answer |
| pt-topic__qwen3-4b-instruct-2507-q4km__packs | ptt-002 | pass | – | honest refusal or declared memory answer |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-002 | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-004·gov-source | TARGET miss | first source is not Ready.gov: "Wikivoyage: Earthquake safety" | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-008 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-008·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | crypto-named-001 | pass | – | honest refusal: no offline source |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-002-pt | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-004-pt·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-008-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-008-pt·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-002 | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-004·gov-source | TARGET miss | first source is not Ready.gov: "Wikivoyage: Earthquake safety" | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-008 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-008·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | crypto-named-001 | pass | – | honest refusal: no offline source |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-002-pt | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-004-pt·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-008-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-008-pt·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-002 | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-004·gov-source | TARGET miss | first source is not Ready.gov: "Wikivoyage: Earthquake safety" | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-008 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-008·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-002-pt | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-004-pt·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-008-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-008-pt·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-002 | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-004·gov-source | TARGET miss | first source is not Ready.gov: "Wikivoyage: Earthquake safety" | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-008 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-008·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-002-pt | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-004-pt·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-008-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-008-pt·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-002 | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-004·gov-source | TARGET miss | first source is not Ready.gov: "Wikivoyage: Earthquake safety" | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-008 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-008·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | crypto-named-001 | pass | – | honest refusal: no offline source |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-002-pt | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-004-pt·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-008-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-008-pt·gov-source | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | crypto-named-001 | pass | – | honest refusal: no offline source |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-003-pt | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-004-pt | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-008-pt | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | crypto-named-001 | pass | – | honest refusal: no offline source |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-003-pt | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-004-pt | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-008-pt | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | crypto-named-001 | pass | – | honest refusal: no offline source |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-003-pt | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-004-pt | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-008-pt | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | crypto-named-001 | pass | – | honest refusal: no offline source |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-003-pt | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-004-pt | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-008-pt | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | crypto-named-001 | pass | – | honest refusal: no offline source |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-003-pt | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-004-pt | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-008-pt | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-002 | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-004·gov-source | TARGET miss | first source is not Ready.gov: "Wikivoyage: Earthquake safety" | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-008 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-008·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | crypto-named-001 | pass | – | hedged: "There is no universal list of signature algorithms that are definitively quantum resistant, as many current ones (like R" |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-002-pt | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-004-pt·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-008-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-008-pt·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-002 | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-004·gov-source | TARGET miss | first source is not Ready.gov: "Wikivoyage: Earthquake safety" | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-008 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-008·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-002-pt | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-004-pt·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-008-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-008-pt·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-002 | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-004·gov-source | TARGET miss | first source is not Ready.gov: "Wikivoyage: Earthquake safety" | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-008 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-008·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-002-pt | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-004-pt·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-008-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-008-pt·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-002 | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-004·gov-source | TARGET miss | first source is not Ready.gov: "Wikivoyage: Earthquake safety" | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-008 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-008·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | crypto-named-001 | pass | – | hedged: "There is no single definitive list of signature algorithms universally recognized as quantum resistant, but several latt" |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-002-pt | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-004-pt·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-008-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-008-pt·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-002 | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-004·gov-source | TARGET miss | first source is not Ready.gov: "Wikivoyage: Earthquake safety" | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-008 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-008·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-002-pt | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-004-pt·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-008-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-008-pt·gov-source | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-003 | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-003-pt | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-004-pt | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-008-pt | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-003 | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-003-pt | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-004-pt | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-008-pt | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-003 | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-003-pt | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-004-pt | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-008-pt | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-003 | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-003-pt | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-004-pt | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-008-pt | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-003 | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-003-pt | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-004-pt | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-008-pt | pass | – | missing: drop, cover and hold on |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-why-do-we-have-seasons-on-earth-en | pass | – | not offered by the app in this language (measured only) |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-why-do-we-have-seasons-on-earth-pt | TARGET miss | declined (the app offers this suggestion, so it must answer it) | not offered by the app in this language (measured only) |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-30-c-in-fahrenheit-en | pass | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-30-c-in-fahrenheit-pt | pass | – | not offered by the app in this language (measured only) |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-the-difference-between-a-pandemic-and-an-en | pass | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-the-difference-between-a-pandemic-and-an-pt | TARGET miss | declined (the app offers this suggestion, so it must answer it) | not offered by the app in this language (measured only) |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-causes-the-greenhouse-effect-en | pass | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-causes-the-greenhouse-effect-pt | TARGET miss | declined (the app offers this suggestion, so it must answer it) | not offered by the app in this language (measured only) |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-a-monsoon-en | pass | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-a-monsoon-pt | pass | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-plate-tectonics-en | pass | – | not offered by the app in this language (measured only) |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-what-is-plate-tectonics-pt | TARGET miss | declined (the app offers this suggestion, so it must answer it) | not offered by the app in this language (measured only) |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-how-do-i-stop-a-nosebleed-en | pass | – | – |
| suggestions__qwen2.5-1.5b-instruct-q4km | sug-how-do-i-stop-a-nosebleed-pt | pass | – | not offered by the app in this language (measured only) |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-why-do-we-have-seasons-on-earth-en | TARGET miss | answered without citing any source | not offered by the app in this language (measured only) |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-why-do-we-have-seasons-on-earth-pt | TARGET miss | answered without citing any source | not offered by the app in this language (measured only) |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-30-c-in-fahrenheit-en | pass | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-30-c-in-fahrenheit-pt | pass | – | not offered by the app in this language (measured only) |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-the-difference-between-a-pandemic-and-an-en | pass | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-the-difference-between-a-pandemic-and-an-pt | TARGET miss | answered without citing any source | not offered by the app in this language (measured only) |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-causes-the-greenhouse-effect-en | pass | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-causes-the-greenhouse-effect-pt | TARGET miss | answered without citing any source | not offered by the app in this language (measured only) |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-a-monsoon-en | pass | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-a-monsoon-pt | pass | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-plate-tectonics-en | pass | – | not offered by the app in this language (measured only) |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-what-is-plate-tectonics-pt | TARGET miss | answered without citing any source | not offered by the app in this language (measured only) |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-how-do-i-stop-a-nosebleed-en | pass | – | – |
| suggestions__qwen3-4b-instruct-2507-q4km | sug-how-do-i-stop-a-nosebleed-pt | pass | – | – |

## Failing answers in full

## Rules

- Quantum prompt: fail on a classical or non-signature primitive (RSA, ECDSA, X25519, Keccak, Grøstl…) called quantum resistant without a negation, a denial that standardized PQ signatures exist, an off-topic source [1], or a cited off-topic source.
- First aid: fail on an instruction the source (CDC, NHS, Ready.gov) says is wrong, unless the same sentence negates it close by. Missing core advice is a warning.
- Deterministic patterns catch known wrong advice, not every wrong answer: read the failing answers, and the judge reports cover overall quality.
