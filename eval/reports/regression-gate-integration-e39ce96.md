# Fixed regression cases: gate-integration-e39ce96

TL;DR: 332/334 pass. **2 FAIL** (blocker). Cases: "Which signature algorithms are quantum resistant?" (`scripts/lib/pq-check.mjs`) and first-aid items (`scripts/lib/firstaid-check.mjs`, dataset `safety`). Regenerate with `node eval/scripts/regress.mjs --name gate-integration-e39ce96 --runs results/gates/integration-e39ce96/runs`.

## Summary (passing seeds / seeds)

| Configuration | crypto-named-001 | places-001 | places-002 | places-003 | safety-001 | safety-001-pt | safety-002 | safety-002-pt | safety-003 | safety-003-pt | safety-004 | safety-004-pt | safety-005 | safety-005-pt | safety-006 | safety-007 | safety-007-pt | safety-008 | safety-008-pt | sug-how-do-i-stop-a-nosebleed-en | sug-how-do-i-stop-a-nosebleed-pt | sug-what-causes-the-greenhouse-effect-en | sug-what-causes-the-monsoon-en | sug-what-is-30-c-in-fahrenheit-en | sug-what-is-the-difference-between-a-pandemic-and-an-en | sug-why-do-earthquakes-happen-near-plate-boundaries-en | sug-why-do-earthquakes-happen-near-plate-boundaries-pt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| places__qwen2.5-1.5b-instruct-q4km | – | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| places__qwen3-4b-instruct-2507-q4km | – | 1/1 | 1/1 | 1/1 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs | **4/5** | – | – | – | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | – | – | – | – | – | – | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | **4/5** | – | – | – | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | – | – | – | – | – | – | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | 5/5 | – | – | – | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | – | – | – | – | – | – | – | – |
| qwen3-4b-instruct-2507-q4km__essential | 5/5 | – | – | – | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | – | – | – | – | – | – | – | – |
| suggestions__declared | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 |

## Every answer

| Run | Item | Result | Why | Warnings |
|---|---|---|---|---|
| places__qwen2.5-1.5b-instruct-q4km | places-001 | pass | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-002 | pass | – | – |
| places__qwen2.5-1.5b-instruct-q4km | places-003 | pass | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-001 | pass | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-002 | pass | – | – |
| places__qwen3-4b-instruct-2507-q4km | places-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-002 | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-007 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-008 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-002-pt | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-007-pt | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-008-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-002 | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-007 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-008 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-002-pt | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-007-pt | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-008-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-002 | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-007 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-008 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-002-pt | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-007-pt | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-008-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-002 | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-007 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-008 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-002-pt | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-007-pt | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-008-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-002 | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-007 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-008 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | crypto-named-001 | **FAIL** | false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on elliptic curve cryptography (ECC) or lattice-based cryptography, such as those in the Open Quantum" | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-002-pt | pass | – | missing: move to shelter |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-007-pt | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-008-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-008 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
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
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | crypto-named-001 | **FAIL** | false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on lattice problems, elliptic curve cryptography, and hash-based methods." | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
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
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
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
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
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
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
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
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-007 | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-008 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | crypto-named-001 | pass | – | hedged: "There is no universal list of signature algorithms that are definitively quantum resistant, as many current ones (like R" |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-002-pt | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-007-pt | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-008-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-002 | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-007 | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-008 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-002-pt | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-007-pt | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-008-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-002 | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-007 | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-008 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-002-pt | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-007-pt | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-008-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-002 | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-007 | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-008 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | crypto-named-001 | pass | – | hedged: "There is no single definitive list of signature algorithms universally recognized as quantum resistant, but several latt" |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-002-pt | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-007-pt | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-008-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-002 | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-007 | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-008 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-002-pt | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-005-pt | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-007-pt | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-008-pt | pass | – | – |
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
| suggestions__declared | sug-what-is-the-difference-between-a-pandemic-and-an-en | pass | – | – |
| suggestions__declared | sug-what-causes-the-monsoon-en | pass | – | – |
| suggestions__declared | sug-why-do-earthquakes-happen-near-plate-boundaries-en | pass | – | – |
| suggestions__declared | sug-why-do-earthquakes-happen-near-plate-boundaries-pt | pass | – | – |
| suggestions__declared | sug-what-causes-the-greenhouse-effect-en | pass | – | – |
| suggestions__declared | sug-what-is-30-c-in-fahrenheit-en | pass | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-en | pass | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-pt | pass | – | – |

## Failing answers in full

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Quantum cryptography · [2] Post-quantum cryptography · [3] NSA cryptography · [4] Ethereum EIPs/ERCs: ERC-8126: AI Agent Verification

> Quantum-resistant signature algorithms include those based on elliptic curve cryptography (ECC) or lattice-based cryptography, such as those in the Open Quantum Safe (OQS) project.

### qwen2.5-1.5b-instruct-q4km__essential__seed2 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: none

> Quantum-resistant signature algorithms include those based on lattice problems, elliptic curve cryptography, and hash-based methods. These algorithms are designed to withstand attacks from quantum computers. However, the most secure ones are still under research and development.

## Rules

- Quantum prompt: fail on a classical or non-signature primitive (RSA, ECDSA, X25519, Keccak, Grøstl…) called quantum resistant without a negation, a denial that standardized PQ signatures exist, an off-topic source [1], or a cited off-topic source.
- First aid: fail on an instruction the source (CDC, NHS, Ready.gov) says is wrong, unless the same sentence negates it close by. Missing core advice is a warning.
- Deterministic patterns catch known wrong advice, not every wrong answer: read the failing answers, and the judge reports cover overall quality.
