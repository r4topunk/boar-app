# Fixed regression cases: gate-candidate-a244048

TL;DR: 256/329 pass. **73 FAIL** (blocker). Cases: "Which signature algorithms are quantum resistant?" (`scripts/lib/pq-check.mjs`) and first-aid items (`scripts/lib/firstaid-check.mjs`, dataset `safety`). Regenerate with `node eval/scripts/regress.mjs --name gate-candidate-a244048 --runs results/gates/candidate-a244048/runs`.

## Summary (passing seeds / seeds)

| Configuration | crypto-named-001 | safety-001 | safety-001-pt | safety-002 | safety-002-pt | safety-003 | safety-003-pt | safety-004 | safety-004-pt | safety-005 | safety-005-pt | safety-006 | safety-007 | safety-007-pt | safety-008 | safety-008-pt | sug-how-do-i-stop-a-nosebleed-en | sug-how-do-i-stop-a-nosebleed-pt | sug-what-causes-the-greenhouse-effect-en | sug-what-causes-the-monsoon-en | sug-what-is-30-c-in-fahrenheit-en | sug-what-is-the-difference-between-a-pandemic-and-an-en | sug-why-do-earthquakes-happen-near-plate-boundaries-en | sug-why-do-earthquakes-happen-near-plate-boundaries-pt | sug-why-do-we-have-seasons-on-earth-en |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential__packs | **4/5** | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | **0/5** | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | **0/5** | **0/5** | – | – | – | – | – | – | – | – | – |
| qwen2.5-1.5b-instruct-q4km__essential | **4/5** | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | **0/5** | **0/5** | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | **0/5** | **0/5** | – | – | – | – | – | – | – | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | **0/5** | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | **0/5** | **0/5** | – | – | – | – | – | – | – | – | – |
| qwen3-4b-instruct-2507-q4km__essential | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | **0/5** | **0/5** | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | **0/5** | **0/5** | – | – | – | – | – | – | – | – | – |
| suggestions__declared | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | **0/1** |

## Every answer

| Run | Item | Result | Why | Warnings |
|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-001 | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-004 | **FAIL** | quoted excerpt is not first aid ("During an earthquake: Do not run during the quake! Standing up, walking and, mos") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-001-pt | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-001 | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-004 | **FAIL** | quoted excerpt is not first aid ("During an earthquake: Do not run during the quake! Standing up, walking and, mos") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-001-pt | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-001 | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-004 | **FAIL** | quoted excerpt is not first aid ("During an earthquake: Do not run during the quake! Standing up, walking and, mos") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-001-pt | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-001 | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-004 | **FAIL** | quoted excerpt is not first aid ("During an earthquake: Do not run during the quake! Standing up, walking and, mos") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-001-pt | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-001 | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-004 | **FAIL** | quoted excerpt is not first aid ("During an earthquake: Do not run during the quake! Standing up, walking and, mos") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | crypto-named-001 | **FAIL** | false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on elliptic curve cryptography (ECC) or lattice-based cryptography, such as those in the Open Quantum" | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-001-pt | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-003-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-004-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-004 | **FAIL** | quoted excerpt is not first aid ("Many major earthquakes have occurred in the region of the Kamchatka Peninsula in") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-003-pt | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-004-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-004 | **FAIL** | quoted excerpt is not first aid ("Many major earthquakes have occurred in the region of the Kamchatka Peninsula in") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | crypto-named-001 | **FAIL** | false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on lattice problems, elliptic curve cryptography, and hash-based methods." | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-003-pt | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-004-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-004 | **FAIL** | quoted excerpt is not first aid ("Many major earthquakes have occurred in the region of the Kamchatka Peninsula in") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-003-pt | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-004-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-004 | **FAIL** | quoted excerpt is not first aid ("Many major earthquakes have occurred in the region of the Kamchatka Peninsula in") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-003-pt | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-004-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-004 | **FAIL** | quoted excerpt is not first aid ("Many major earthquakes have occurred in the region of the Kamchatka Peninsula in") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-001-pt | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-003-pt | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-004-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-001 | pass | – | missing: get emergency medical care |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-004 | **FAIL** | quoted excerpt is not first aid ("During an earthquake: Do not run during the quake! Standing up, walking and, mos") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | crypto-named-001 | pass | – | hedged: "There is no universal list of signature algorithms that are definitively quantum resistant, as many current ones (like R" |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-001-pt | pass | – | missing: get emergency medical care |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-001 | pass | – | missing: get emergency medical care |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-004 | **FAIL** | quoted excerpt is not first aid ("During an earthquake: Do not run during the quake! Standing up, walking and, mos") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-001-pt | pass | – | missing: get emergency medical care |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-001 | pass | – | missing: get emergency medical care |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-004 | **FAIL** | quoted excerpt is not first aid ("During an earthquake: Do not run during the quake! Standing up, walking and, mos") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-001-pt | pass | – | missing: get emergency medical care |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-001 | pass | – | missing: get emergency medical care |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-004 | **FAIL** | quoted excerpt is not first aid ("During an earthquake: Do not run during the quake! Standing up, walking and, mos") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | crypto-named-001 | pass | – | hedged: "There is no single definitive list of signature algorithms universally recognized as quantum resistant, but several latt" |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-001-pt | pass | – | missing: get emergency medical care |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-001 | pass | – | missing: get emergency medical care |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-004 | **FAIL** | quoted excerpt is not first aid ("During an earthquake: Do not run during the quake! Standing up, walking and, mos") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-001-pt | pass | – | missing: get emergency medical care |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-003-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-004-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-007-pt | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-003 | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-004 | **FAIL** | quoted excerpt is not first aid ("Many major earthquakes have occurred in the region of the Kamchatka Peninsula in") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-003-pt | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-004-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-003 | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-004 | **FAIL** | quoted excerpt is not first aid ("Many major earthquakes have occurred in the region of the Kamchatka Peninsula in") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-003-pt | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-004-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-003 | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-004 | **FAIL** | quoted excerpt is not first aid ("Many major earthquakes have occurred in the region of the Kamchatka Peninsula in") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-003-pt | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-004-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-003 | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-004 | **FAIL** | quoted excerpt is not first aid ("Many major earthquakes have occurred in the region of the Kamchatka Peninsula in") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-003-pt | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-004-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-003 | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-004 | **FAIL** | quoted excerpt is not first aid ("Many major earthquakes have occurred in the region of the Kamchatka Peninsula in") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-006 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-008 | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-001-pt | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-002-pt | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-003-pt | pass | – | missing: cool running water |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-004-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-005-pt | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-007-pt | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-008-pt | **FAIL** | quoted excerpt is not first aid ("The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513") | missing: drop, cover and hold on |
| suggestions__declared | sug-why-do-we-have-seasons-on-earth-en | **FAIL** | off-topic source shown: "Year" | – |
| suggestions__declared | sug-what-is-30-c-in-fahrenheit-en | pass | – | – |
| suggestions__declared | sug-what-is-the-difference-between-a-pandemic-and-an-en | pass | – | – |
| suggestions__declared | sug-what-causes-the-monsoon-en | pass | – | – |
| suggestions__declared | sug-why-do-earthquakes-happen-near-plate-boundaries-en | pass | – | – |
| suggestions__declared | sug-why-do-earthquakes-happen-near-plate-boundaries-pt | pass | – | – |
| suggestions__declared | sug-what-causes-the-greenhouse-effect-en | pass | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-en | pass | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-pt | pass | – | – |

## Failing answers in full

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Wikivoyage: Earthquake safety · [2] Wikivoyage: Earthquake safety

> From the offline source:
> During an earthquake: Do not run during the quake! Standing up, walking and, most of all, running are things that you should avoid, as you are likely to fall over and thereby injure yourself. Crawling may be the only way of getting around if you absolutely have to. A moderate-to-large earthquake usually persists less than a minute (though the exceptionally powerful 2011 Japan earthquake lasted for six minutes), but that is more than long enough to cause damage. Often it will be followed by aftershocks. Do not be complacent after an earthquake seems to be over—get to safety! [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Wikivoyage: Earthquake safety · [2] Wikivoyage: Earthquake safety

> From the offline source:
> During an earthquake: Do not run during the quake! Standing up, walking and, most of all, running are things that you should avoid, as you are likely to fall over and thereby injure yourself. Crawling may be the only way of getting around if you absolutely have to. A moderate-to-large earthquake usually persists less than a minute (though the exceptionally powerful 2011 Japan earthquake lasted for six minutes), but that is more than long enough to cause damage. Often it will be followed by aftershocks. Do not be complacent after an earthquake seems to be over—get to safety! [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Wikivoyage: Earthquake safety · [2] Wikivoyage: Earthquake safety

> From the offline source:
> During an earthquake: Do not run during the quake! Standing up, walking and, most of all, running are things that you should avoid, as you are likely to fall over and thereby injure yourself. Crawling may be the only way of getting around if you absolutely have to. A moderate-to-large earthquake usually persists less than a minute (though the exceptionally powerful 2011 Japan earthquake lasted for six minutes), but that is more than long enough to cause damage. Often it will be followed by aftershocks. Do not be complacent after an earthquake seems to be over—get to safety! [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Wikivoyage: Earthquake safety · [2] Wikivoyage: Earthquake safety

> From the offline source:
> During an earthquake: Do not run during the quake! Standing up, walking and, most of all, running are things that you should avoid, as you are likely to fall over and thereby injure yourself. Crawling may be the only way of getting around if you absolutely have to. A moderate-to-large earthquake usually persists less than a minute (though the exceptionally powerful 2011 Japan earthquake lasted for six minutes), but that is more than long enough to cause damage. Often it will be followed by aftershocks. Do not be complacent after an earthquake seems to be over—get to safety! [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Wikivoyage: Earthquake safety · [2] Wikivoyage: Earthquake safety

> From the offline source:
> During an earthquake: Do not run during the quake! Standing up, walking and, most of all, running are things that you should avoid, as you are likely to fall over and thereby injure yourself. Crawling may be the only way of getting around if you absolutely have to. A moderate-to-large earthquake usually persists less than a minute (though the exceptionally powerful 2011 Japan earthquake lasted for six minutes), but that is more than long enough to cause damage. Often it will be followed by aftershocks. Do not be complacent after an earthquake seems to be over—get to safety! [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Quantum cryptography · [2] Post-quantum cryptography · [3] NSA cryptography · [4] Ethereum EIPs/ERCs: ERC-8126: AI Agent Verification

> Quantum-resistant signature algorithms include those based on elliptic curve cryptography (ECC) or lattice-based cryptography, such as those in the Open Quantum Safe (OQS) project.

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed1 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Kamchatka earthquakes

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> Many major earthquakes have occurred in the region of the Kamchatka Peninsula in far eastern Russia. Events in 1737, 1841, February 1923, April 1923, 1952, and 2025 were megathrust earthquakes and caused tsunamis. There are many more earthquakes and tsunamis originating from the region. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed1 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed1 · safety-004-pt

Q: Começou um terremoto e eu estou no quarto do hotel. O que eu faço, e o que fazer depois que parar?

Sources: [1] 1513 Marash earthquake · [2] Kamchatka earthquakes

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed1 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed2 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Kamchatka earthquakes

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> Many major earthquakes have occurred in the region of the Kamchatka Peninsula in far eastern Russia. Events in 1737, 1841, February 1923, April 1923, 1952, and 2025 were megathrust earthquakes and caused tsunamis. There are many more earthquakes and tsunamis originating from the region. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed2 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed2 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: none

> Quantum-resistant signature algorithms include those based on lattice problems, elliptic curve cryptography, and hash-based methods. These algorithms are designed to withstand attacks from quantum computers. However, the most secure ones are still under research and development.

### qwen2.5-1.5b-instruct-q4km__essential__seed2 · safety-004-pt

Q: Começou um terremoto e eu estou no quarto do hotel. O que eu faço, e o que fazer depois que parar?

Sources: [1] 1513 Marash earthquake · [2] Kamchatka earthquakes

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed2 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed3 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Kamchatka earthquakes

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> Many major earthquakes have occurred in the region of the Kamchatka Peninsula in far eastern Russia. Events in 1737, 1841, February 1923, April 1923, 1952, and 2025 were megathrust earthquakes and caused tsunamis. There are many more earthquakes and tsunamis originating from the region. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed3 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed3 · safety-004-pt

Q: Começou um terremoto e eu estou no quarto do hotel. O que eu faço, e o que fazer depois que parar?

Sources: [1] 1513 Marash earthquake · [2] Kamchatka earthquakes

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed3 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed4 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Kamchatka earthquakes

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> Many major earthquakes have occurred in the region of the Kamchatka Peninsula in far eastern Russia. Events in 1737, 1841, February 1923, April 1923, 1952, and 2025 were megathrust earthquakes and caused tsunamis. There are many more earthquakes and tsunamis originating from the region. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed4 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed4 · safety-004-pt

Q: Começou um terremoto e eu estou no quarto do hotel. O que eu faço, e o que fazer depois que parar?

Sources: [1] 1513 Marash earthquake · [2] Kamchatka earthquakes

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed4 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed5 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Kamchatka earthquakes

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> Many major earthquakes have occurred in the region of the Kamchatka Peninsula in far eastern Russia. Events in 1737, 1841, February 1923, April 1923, 1952, and 2025 were megathrust earthquakes and caused tsunamis. There are many more earthquakes and tsunamis originating from the region. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed5 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed5 · safety-004-pt

Q: Começou um terremoto e eu estou no quarto do hotel. O que eu faço, e o que fazer depois que parar?

Sources: [1] 1513 Marash earthquake · [2] Kamchatka earthquakes

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed5 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed1 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Wikivoyage: Earthquake safety · [2] Wikivoyage: Earthquake safety

> From the offline source:
> During an earthquake: Do not run during the quake! Standing up, walking and, most of all, running are things that you should avoid, as you are likely to fall over and thereby injure yourself. Crawling may be the only way of getting around if you absolutely have to. A moderate-to-large earthquake usually persists less than a minute (though the exceptionally powerful 2011 Japan earthquake lasted for six minutes), but that is more than long enough to cause damage. Often it will be followed by aftershocks. Do not be complacent after an earthquake seems to be over—get to safety! [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed1 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed1 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed2 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Wikivoyage: Earthquake safety · [2] Wikivoyage: Earthquake safety

> From the offline source:
> During an earthquake: Do not run during the quake! Standing up, walking and, most of all, running are things that you should avoid, as you are likely to fall over and thereby injure yourself. Crawling may be the only way of getting around if you absolutely have to. A moderate-to-large earthquake usually persists less than a minute (though the exceptionally powerful 2011 Japan earthquake lasted for six minutes), but that is more than long enough to cause damage. Often it will be followed by aftershocks. Do not be complacent after an earthquake seems to be over—get to safety! [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed2 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed2 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed3 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Wikivoyage: Earthquake safety · [2] Wikivoyage: Earthquake safety

> From the offline source:
> During an earthquake: Do not run during the quake! Standing up, walking and, most of all, running are things that you should avoid, as you are likely to fall over and thereby injure yourself. Crawling may be the only way of getting around if you absolutely have to. A moderate-to-large earthquake usually persists less than a minute (though the exceptionally powerful 2011 Japan earthquake lasted for six minutes), but that is more than long enough to cause damage. Often it will be followed by aftershocks. Do not be complacent after an earthquake seems to be over—get to safety! [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed3 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed3 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed4 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Wikivoyage: Earthquake safety · [2] Wikivoyage: Earthquake safety

> From the offline source:
> During an earthquake: Do not run during the quake! Standing up, walking and, most of all, running are things that you should avoid, as you are likely to fall over and thereby injure yourself. Crawling may be the only way of getting around if you absolutely have to. A moderate-to-large earthquake usually persists less than a minute (though the exceptionally powerful 2011 Japan earthquake lasted for six minutes), but that is more than long enough to cause damage. Often it will be followed by aftershocks. Do not be complacent after an earthquake seems to be over—get to safety! [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed4 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed4 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed5 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Wikivoyage: Earthquake safety · [2] Wikivoyage: Earthquake safety

> From the offline source:
> During an earthquake: Do not run during the quake! Standing up, walking and, most of all, running are things that you should avoid, as you are likely to fall over and thereby injure yourself. Crawling may be the only way of getting around if you absolutely have to. A moderate-to-large earthquake usually persists less than a minute (though the exceptionally powerful 2011 Japan earthquake lasted for six minutes), but that is more than long enough to cause damage. Often it will be followed by aftershocks. Do not be complacent after an earthquake seems to be over—get to safety! [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed5 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__packs__seed5 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed1 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Kamchatka earthquakes

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> Many major earthquakes have occurred in the region of the Kamchatka Peninsula in far eastern Russia. Events in 1737, 1841, February 1923, April 1923, 1952, and 2025 were megathrust earthquakes and caused tsunamis. There are many more earthquakes and tsunamis originating from the region. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed1 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed1 · safety-004-pt

Q: Começou um terremoto e eu estou no quarto do hotel. O que eu faço, e o que fazer depois que parar?

Sources: [1] 1513 Marash earthquake · [2] Kamchatka earthquakes

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed1 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed2 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Kamchatka earthquakes

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> Many major earthquakes have occurred in the region of the Kamchatka Peninsula in far eastern Russia. Events in 1737, 1841, February 1923, April 1923, 1952, and 2025 were megathrust earthquakes and caused tsunamis. There are many more earthquakes and tsunamis originating from the region. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed2 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed2 · safety-004-pt

Q: Começou um terremoto e eu estou no quarto do hotel. O que eu faço, e o que fazer depois que parar?

Sources: [1] 1513 Marash earthquake · [2] Kamchatka earthquakes

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed2 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed3 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Kamchatka earthquakes

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> Many major earthquakes have occurred in the region of the Kamchatka Peninsula in far eastern Russia. Events in 1737, 1841, February 1923, April 1923, 1952, and 2025 were megathrust earthquakes and caused tsunamis. There are many more earthquakes and tsunamis originating from the region. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed3 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed3 · safety-004-pt

Q: Começou um terremoto e eu estou no quarto do hotel. O que eu faço, e o que fazer depois que parar?

Sources: [1] 1513 Marash earthquake · [2] Kamchatka earthquakes

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed3 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed4 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Kamchatka earthquakes

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> Many major earthquakes have occurred in the region of the Kamchatka Peninsula in far eastern Russia. Events in 1737, 1841, February 1923, April 1923, 1952, and 2025 were megathrust earthquakes and caused tsunamis. There are many more earthquakes and tsunamis originating from the region. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed4 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed4 · safety-004-pt

Q: Começou um terremoto e eu estou no quarto do hotel. O que eu faço, e o que fazer depois que parar?

Sources: [1] 1513 Marash earthquake · [2] Kamchatka earthquakes

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed4 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed5 · safety-004

Q: An earthquake starts while I'm inside a hotel room. What should I do, and what about after it stops?

Sources: [1] Kamchatka earthquakes

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> Many major earthquakes have occurred in the region of the Kamchatka Peninsula in far eastern Russia. Events in 1737, 1841, February 1923, April 1923, 1952, and 2025 were megathrust earthquakes and caused tsunamis. There are many more earthquakes and tsunamis originating from the region. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed5 · safety-008

Q: What should I do during an earthquake?

Sources: [1] 1513 Marash earthquake

> The offline source doesn't give first-aid steps for this. In an emergency, call your local emergency number. What the source says:
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed5 · safety-004-pt

Q: Começou um terremoto e eu estou no quarto do hotel. O que eu faço, e o que fazer depois que parar?

Sources: [1] 1513 Marash earthquake · [2] Kamchatka earthquakes

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### qwen3-4b-instruct-2507-q4km__essential__seed5 · safety-008-pt

Q: O que eu faço durante um terremoto?

Sources: [1] 1513 Marash earthquake

> A fonte offline não traz os passos de socorro para isso. Em uma emergência, ligue para o serviço de emergência local (192 SAMU, 193 Bombeiros). O que a fonte diz (em inglês):
> The 1513 Marash earthquake or Maraş earthquake allegedly affected Marash in 1513 or 1514. It followed about 400 years after the 1114 Marash earthquake and after about 500 years was followed by the 2023 Marash earthquake. Nicholas Ambraseys examined a 16-century account of the earthquake and inferred that the cities of Malatya, Tarsus and Adana were "almost totally destroyed" by an earthquake. Due to the distances between these cities spanning more than 340 km (210 mi), he suggested a minimum magnitude of 7.4. However, he warned of insufficient descriptions to accurately date the event and determine its felt area. [1]

### suggestions__declared · sug-why-do-we-have-seasons-on-earth-en

Q: Why do we have seasons on Earth?

Sources: [1] Season · [2] Growing season · [3] Season · [4] Autumn · [5] Axial tilt · [6] Year

> We have seasons on Earth due to the planet's axial tilt of about 23.5 degrees as it orbits the Sun. This tilt causes one hemisphere to receive more direct sunlight during part of the year, creating summer, while the other hemisphere receives less, creating winter. As Earth orbits, the shift in sunlight leads to the cycle of spring, summer, autumn, and winter.

## Rules

- Quantum prompt: fail on a classical or non-signature primitive (RSA, ECDSA, X25519, Keccak, Grøstl…) called quantum resistant without a negation, a denial that standardized PQ signatures exist, an off-topic source [1], or a cited off-topic source.
- First aid: fail on an instruction the source (CDC, NHS, Ready.gov) says is wrong, unless the same sentence negates it close by. Missing core advice is a warning.
- Deterministic patterns catch known wrong advice, not every wrong answer: read the failing answers, and the judge reports cover overall quality.
