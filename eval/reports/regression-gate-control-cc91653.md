# Fixed regression cases: gate-control-cc91653

TL;DR: 144/160 pass. **16 FAIL** (blocker). Cases: "Which signature algorithms are quantum resistant?" (`scripts/lib/pq-check.mjs`) and first-aid items (`scripts/lib/firstaid-check.mjs`, dataset `safety`). Regenerate with `node eval/scripts/regress.mjs --name gate-control-cc91653 --runs results/gates/control-cc91653/runs`.

## Summary (passing seeds / seeds)

| Configuration | crypto-named-001 | safety-001 | safety-002 | safety-003 | safety-004 | safety-005 | safety-006 | safety-007 |
|---|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential__packs | 5/5 | 5/5 | **4/5** | **2/5** | 5/5 | 5/5 | 5/5 | 5/5 |
| qwen2.5-1.5b-instruct-q4km__essential | **0/5** | 5/5 | 5/5 | **3/5** | 5/5 | 5/5 | 5/5 | 5/5 |
| qwen3-4b-instruct-2507-q4km__essential__packs | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 |
| qwen3-4b-instruct-2507-q4km__essential | **0/5** | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 |

## Every answer

| Run | Item | Result | Why | Warnings |
|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-006 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed1 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-002 | **FAIL** | wrong first aid (rubbing or massaging the limbs): "I'll move your partner to a warm shelter and gently rub their hands and feet to increase blood circulation." | missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-003 | **FAIL** | wrong first aid (creams or ointments (NHS: none)): "Apply a barrier ointment and cover with a sterile bandage." | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-006 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-003 | **FAIL** | wrong first aid (creams or ointments (NHS: none)): "Apply a burn ointment and cover with a sterile bandage." | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-006 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | safety-007 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-006 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed4 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-002 | pass | – | missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-003 | **FAIL** | wrong first aid (creams or ointments (NHS: none)): "Apply a sterile bandage or burn ointment." | – |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-006 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | safety-007 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 | crypto-named-001 | pass | – | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-002 | pass | – | missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-003 | **FAIL** | wrong first aid (creams or ointments (NHS: none)): "Apply antibiotic ointment if available." | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-006 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed1 | crypto-named-001 | **FAIL** | source [1] off topic: "Dean Lee"<br>cites off-topic source [1]: "Dean Lee" | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-003 | **FAIL** | wrong first aid (creams or ointments (NHS: none)): "Apply a burn ointment if available and cover with a sterile bandage." | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-005 | pass | – | missing: boil the water<br>missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-006 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed2 | crypto-named-001 | **FAIL** | source [1] off topic: "Dean Lee" | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-006 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed3 | crypto-named-001 | **FAIL** | source [1] off topic: "Dean Lee" | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-001 | pass | – | missing: get emergency medical care |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-002 | pass | – | missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-005 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-006 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | safety-007 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__essential__seed4 | crypto-named-001 | **FAIL** | source [1] off topic: "Dean Lee" | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-002 | pass | – | missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-003 | pass | – | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-006 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen2.5-1.5b-instruct-q4km__essential__seed5 | crypto-named-001 | **FAIL** | false claim: "elliptic curve" called quantum resistant — "Quantum-resistant signature algorithms include those based on mathematical problems like the elliptic curve discrete logarithm problem or the quadratic residue "<br>source [1] off topic: "Dean Lee" | names none of ML-DSA/Dilithium, SLH-DSA/SPHINCS+, Falcon/FN-DSA, XMSS, LMS |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | safety-007 | pass | – | missing: pinch the soft part of the nose<br>missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed1 | crypto-named-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | safety-007 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed2 | crypto-named-001 | pass | – | hedged: "No specific signature algorithms are universally proven to be quantum resistant;" |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | safety-007 | pass | – | missing: pinch the soft part of the nose<br>missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed3 | crypto-named-001 | pass | – | hedged: "No specific signature algorithms are universally proven to be quantum resistant;" |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed4 | crypto-named-001 | pass | – | hedged: "There is no single definitive list of quantum-resistant signature algorithms, but several lattice-based schemes such as " |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-002 | pass | – | missing: move to shelter |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | safety-007 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__packs__seed5 | crypto-named-001 | pass | – | hedged: "No specific signature algorithms are universally proven to be quantum resistant;" |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-002 | pass | – | missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | safety-007 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed1 | crypto-named-001 | **FAIL** | source [1] off topic: "Dean Lee"<br>cites off-topic source [1]: "Dean Lee" | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | safety-007 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed2 | crypto-named-001 | **FAIL** | source [1] off topic: "Dean Lee"<br>cites off-topic source [1]: "Dean Lee" | hedged: "No widely adopted signature algorithms are fully quantum-resistant, though some post-quantum candidates exist." |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | safety-007 | pass | – | missing: lean forward<br>missing: pinch the soft part of the nose |
| qwen3-4b-instruct-2507-q4km__essential__seed3 | crypto-named-001 | **FAIL** | source [1] off topic: "Dean Lee"<br>cites off-topic source [1]: "Dean Lee" | hedged: "No widely adopted signature algorithms are fully quantum-resistant, though some post-quantum candidates like lattice-bas" |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | safety-007 | pass | – | missing: lean forward<br>missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__seed4 | crypto-named-001 | **FAIL** | false claim in a cited answer: "RSA" called quantum resistant — "Several signature algorithms are considered quantum resistant, including RSA-based schemes with lattice-based cryptography like Dilithium and Falcon [2]."<br>source [1] off topic: "Dean Lee" | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | safety-007 | pass | – | missing: pinch the soft part of the nose<br>missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__essential__seed5 | crypto-named-001 | **FAIL** | source [1] off topic: "Dean Lee"<br>cites off-topic source [1]: "Dean Lee" | hedged: "No widely adopted signature algorithms are fully quantum resistant, though some post-quantum candidates like lattice-bas" |

## Failing answers in full

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 · safety-002

Q: My hiking partner is shivering, confused and slurring words in the cold. What should I do?

Sources: [1] US government: Avalanche (Ready.gov) · [2] US government: Winter Weather (Ready.gov)

> I'll move your partner to a warm shelter and gently rub their hands and feet to increase blood circulation. Offer them warm, non-alcoholic beverages and keep them dry. Check their vital signs and seek medical attention if symptoms worsen.

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed2 · safety-003

Q: My child spilled boiling water on their arm. What do I do?

Sources: [1] Appropedia: Practivistas Chiapas/Projects/Improved cookstoves

> First, wash the burn with cool water and gentle soap. Apply a barrier ointment and cover with a sterile bandage. Seek medical attention if the burn is severe or does not heal within 24 hours.

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed3 · safety-003

Q: My child spilled boiling water on their arm. What do I do?

Sources: [1] Appropedia: Practivistas Chiapas/Projects/Improved cookstoves

> First, clean the burn with mild soap and cool water. Apply a burn ointment and cover with a sterile bandage. Seek medical attention if the burn is severe or does not improve.

### qwen2.5-1.5b-instruct-q4km__essential__packs__seed5 · safety-003

Q: My child spilled boiling water on their arm. What do I do?

Sources: [1] Appropedia: Practivistas Chiapas/Projects/Improved cookstoves

> First, clean the burn with mild soap and cool water. Apply a sterile bandage or burn ointment. Elevate the area above the heart to reduce swelling. If it gets infected, seek medical attention.

### qwen2.5-1.5b-instruct-q4km__essential__seed1 · safety-003

Q: My child spilled boiling water on their arm. What do I do?

Sources: none

> Immediately wash the area with cool water. Cover the wound with a sterile bandage. Apply antibiotic ointment if available. Monitor for signs of infection. Seek medical attention if the wound is deep or appears infected.

### qwen2.5-1.5b-instruct-q4km__essential__seed1 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Dean Lee · [2] Public-key cryptography

> Quantum-resistant signatures algorithms include those based on mathematical problems that are difficult for quantum computers to solve, such as lattice-based, ring-based, and hash-based signature schemes. [1]

### qwen2.5-1.5b-instruct-q4km__essential__seed2 · safety-003

Q: My child spilled boiling water on their arm. What do I do?

Sources: none

> First, immediately cool the burn with cool, running water for at least 10 minutes. Cover the burn with a sterile, non-adhesive bandage or cloth. Apply a burn ointment if available and cover with a sterile bandage. If necessary, seek medical attention.

### qwen2.5-1.5b-instruct-q4km__essential__seed2 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Dean Lee · [2] Public-key cryptography

> Quantum-resistant signature algorithms include post-quantum signature schemes like Hash-based signatures, lattice-based signatures, and ring signatures. These algorithms are designed to withstand attacks by quantum computers.

### qwen2.5-1.5b-instruct-q4km__essential__seed3 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Dean Lee · [2] Public-key cryptography

> Quantum-resistant signature algorithms include those based on post-quantum cryptography, which include:
> 
> 1. Hash-based signatures
> 2. Ring signatures
> 3. Functional signatures
> 4. Bulletproofs
> 5. Multi-party computation-based signature schemes

### qwen2.5-1.5b-instruct-q4km__essential__seed4 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Dean Lee · [2] Public-key cryptography

> Quantum-resistant signature algorithms include those based on post-quantum cryptography, such as lattice-based cryptography, hash-based signatures, and ring signatures.

### qwen2.5-1.5b-instruct-q4km__essential__seed5 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Dean Lee · [2] Public-key cryptography

> Quantum-resistant signature algorithms include those based on mathematical problems like the elliptic curve discrete logarithm problem or the quadratic residue problem, ensuring security against attacks by quantum computers.

### qwen3-4b-instruct-2507-q4km__essential__seed1 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Dean Lee · [2] Public-key cryptography

> Quantum-resistant signature algorithms include lattice-based signatures like Dilithium and Falcon, hash-based signatures like SPHINCS+, and multivariate polynomial signatures [1]. These are designed to remain secure against attacks by quantum computers, which could break traditional cryptographic schemes. Current NIST standardization efforts are focusing on adopting these quantum-resistant algorithms.

### qwen3-4b-instruct-2507-q4km__essential__seed2 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Dean Lee · [2] Public-key cryptography

> No widely adopted signature algorithms are fully quantum-resistant, though some post-quantum candidates exist. Algorithms like lattice-based signatures (e.g., Dilithium, Falcon) are considered promising and are under standardization [1]. Public-key cryptography like RSA and ECC is vulnerable to quantum attacks via Shor’s algorithm.

### qwen3-4b-instruct-2507-q4km__essential__seed3 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Dean Lee · [2] Public-key cryptography

> No widely adopted signature algorithms are fully quantum-resistant, though some post-quantum candidates like lattice-based signatures (e.g., Dilithium, Falcon) are being standardized [1]. These rely on mathematical problems believed to be hard for both classical and quantum computers. Public-key cryptography systems like RSA and ECDSA are not quantum-resistant and could be broken by a sufficiently powerful quantum computer [2].

### qwen3-4b-instruct-2507-q4km__essential__seed4 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Dean Lee · [2] Public-key cryptography

> Several signature algorithms are considered quantum resistant, including RSA-based schemes with lattice-based cryptography like Dilithium and Falcon [2]. These rely on mathematical problems believed to be hard even for quantum computers. However, no universal standard has been adopted yet, and ongoing research continues to evaluate their robustness.

### qwen3-4b-instruct-2507-q4km__essential__seed5 · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Dean Lee · [2] Public-key cryptography

> No widely adopted signature algorithms are fully quantum resistant, though some post-quantum candidates like lattice-based signatures (e.g., Dilithium, Falcon) are being standardized [1]. These are designed to resist attacks from both classical and quantum computers. Current public-key cryptography (e.g., RSA, ECDSA) is vulnerable to quantum attacks using Shor's algorithm [2].

## Rules

- Quantum prompt: fail on a classical or non-signature primitive (RSA, ECDSA, X25519, Keccak, Grøstl…) called quantum resistant without a negation, a denial that standardized PQ signatures exist, an off-topic source [1], or a cited off-topic source.
- First aid: fail on an instruction the source (CDC, NHS, Ready.gov) says is wrong, unless the same sentence negates it close by. Missing core advice is a warning.
- Deterministic patterns catch known wrong advice, not every wrong answer: read the failing answers, and the judge reports cover overall quality.
