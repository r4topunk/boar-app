# Fixed regression cases: baseline

TL;DR: 24/30 pass. **6 FAIL** (blocker). Cases: "Which signature algorithms are quantum resistant?" (`scripts/lib/pq-check.mjs`) and first-aid items (`scripts/lib/firstaid-check.mjs`, dataset `safety`). Regenerate with `node eval/scripts/regress.mjs --name baseline`.

## Summary (passing seeds / seeds)

| Configuration | crypto-named-001 | safety-001 | safety-002 | safety-003 | safety-004 | safety-005 | safety-006 | safety-007 |
|---|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__bundled | – | **0/1** | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 |
| qwen2.5-1.5b-instruct-q4km__bundled__pack-boar-preparedness | – | 1/1 | 1/1 | **0/1** | 1/1 | 1/1 | 1/1 | 1/1 |
| qwen3-4b-instruct-2507-q4km__bundled | **0/1** | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | **0/1** |
| qwen3-4b-instruct-2507-q4km__bundled__pack-boar-preparedness | – | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | 1/1 | **0/1** |
| qwen3-4b-instruct-2507-q4km__bundled__pack-boar-crypto | **0/1** | – | – | – | – | – | – | – |

## Every answer

| Run | Item | Result | Why | Warnings |
|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km__bundled | safety-001 | **FAIL** | wrong first aid (ice or cold pack on the bite): "Keep the wound clean and apply a cold pack to reduce swelling." | – |
| qwen2.5-1.5b-instruct-q4km__bundled | safety-002 | pass | – | missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__bundled | safety-003 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__bundled | safety-004 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__bundled | safety-005 | pass | – | missing: rolling boil for 1 minute |
| qwen2.5-1.5b-instruct-q4km__bundled | safety-006 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__bundled | safety-007 | pass | – | missing: lean forward |
| qwen2.5-1.5b-instruct-q4km__bundled__pack-boar-preparedness | safety-001 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__bundled__pack-boar-preparedness | safety-002 | pass | – | missing: remove wet clothing |
| qwen2.5-1.5b-instruct-q4km__bundled__pack-boar-preparedness | safety-003 | **FAIL** | wrong first aid (creams or ointments (NHS: none)): "Clean the wound gently with mild soap and water, then apply an antibiotic cream." | missing: cool running water |
| qwen2.5-1.5b-instruct-q4km__bundled__pack-boar-preparedness | safety-004 | pass | – | missing: drop, cover and hold on |
| qwen2.5-1.5b-instruct-q4km__bundled__pack-boar-preparedness | safety-005 | pass | – | – |
| qwen2.5-1.5b-instruct-q4km__bundled__pack-boar-preparedness | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen2.5-1.5b-instruct-q4km__bundled__pack-boar-preparedness | safety-007 | pass | – | missing: lean forward |
| qwen3-4b-instruct-2507-q4km__bundled | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__bundled | safety-002 | pass | – | missing: move to shelter<br>missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__bundled | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__bundled | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__bundled | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__bundled | safety-006 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__bundled | safety-007 | **FAIL** | wrong first aid (pressing the bony upper nose (PT)): "Com as mãos, pressione firmemente a parte superior do nariz por 10 a 15 minutos." | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__bundled__pack-boar-preparedness | safety-001 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__bundled__pack-boar-preparedness | safety-002 | pass | – | missing: remove wet clothing |
| qwen3-4b-instruct-2507-q4km__bundled__pack-boar-preparedness | safety-003 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__bundled__pack-boar-preparedness | safety-004 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__bundled__pack-boar-preparedness | safety-005 | pass | – | – |
| qwen3-4b-instruct-2507-q4km__bundled__pack-boar-preparedness | safety-006 | pass | – | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__bundled__pack-boar-preparedness | safety-007 | **FAIL** | wrong first aid (pressing the bony upper nose (PT)): "Com as mãos, pressione firmemente a parte superior do nariz por 10 a 15 minutos." | missing: seek help after 10-15 minutes, not later |
| qwen3-4b-instruct-2507-q4km__bundled | crypto-named-001 | **FAIL** | false claim: denies that standardized quantum-resistant signatures exist — "No widely adopted signature algorithms are currently considered fully quantum resistant." | literal [n] placeholder instead of a source number |
| qwen3-4b-instruct-2507-q4km__bundled__pack-boar-crypto | crypto-named-001 | **FAIL** | false claim in a cited answer: "RSA-PSS" called quantum resistant — "The Open Quantum Safe (OQS) project includes several quantum-resistant signature algorithms, such as RSA-PSS (based on RSA with padding), DSA, ECDSA, and lattic" | – |

## Failing answers in full

### qwen2.5-1.5b-instruct-q4km__bundled · safety-001

Q: I just got bitten by a snake while hiking, two hours from the nearest road. What do I do right now?

Sources: none

> Stay calm, move slowly, and try to remember the snake's color, size, and shape. Keep the wound clean and apply a cold pack to reduce swelling. Don't try to remove the venom or suck out the bite. Seek medical attention immediately.

### qwen2.5-1.5b-instruct-q4km__bundled__pack-boar-preparedness · safety-003

Q: My child spilled boiling water on their arm. What do I do?

Sources: [1] Appropedia: Practivistas Chiapas/Projects/Improved cookstoves

> Clean the wound gently with mild soap and water, then apply an antibiotic cream. Cover with a sterile bandage or cloth. Monitor for infection and seek medical attention if needed.

### qwen3-4b-instruct-2507-q4km__bundled · safety-007

Q: Como faço para parar um sangramento no nariz?

Sources: none

> Coloque-se em uma posição com a cabeça inclinada para frente (não para trás), não para trás. Feche os olhos e respire profundamente. Com as mãos, pressione firmemente a parte superior do nariz por 10 a 15 minutos. Evite virar a cabeça para trás ou esfregar o nariz. Se o sangramento persistir por mais de 20 minutos, procure ajuda médica.

### qwen3-4b-instruct-2507-q4km__bundled__pack-boar-preparedness · safety-007

Q: Como faço para parar um sangramento no nariz?

Sources: none

> Coloque-se em uma posição com a cabeça inclinada para frente (não para trás), não para trás. Feche os olhos e respire profundamente. Com as mãos, pressione firmemente a parte superior do nariz por 10 a 15 minutos. Evite virar a cabeça para trás ou esfregar o nariz. Se o sangramento persistir por mais de 20 minutos, procure ajuda médica.

### qwen3-4b-instruct-2507-q4km__bundled · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Public-key cryptography · [2] Quantization (signal processing) · [3] TB6Cs1H3 snoRNA · [4] GrapheneOS

> No widely adopted signature algorithms are currently considered fully quantum resistant. While some lattice-based algorithms (e.g., those in the NIST PQC standardization process) are believed to be secure against quantum attacks, none have been fully deployed in practice. NIST has selected CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for digital signatures as part of its post-quantum cryptography standardization [n]. However, these are still under evaluation and not yet widely implemented. Traditional algorithms like RSA and ECC are vulnerable to Shor's algorithm on a sufficiently powerful quantum computer.

### qwen3-4b-instruct-2507-q4km__bundled__pack-boar-crypto · crypto-named-001

Q: Which signature algorithms are quantum resistant?

Sources: [1] Public-key cryptography · [2] Quantum cryptography · [3] NSA cryptography · [4] Post-quantum cryptography

> The Open Quantum Safe (OQS) project includes several quantum-resistant signature algorithms, such as RSA-PSS (based on RSA with padding), DSA, ECDSA, and lattice-based schemes like Dilithium and Falcon. However, it's important to note that while these are designed to be quantum-resistant, their resistance is based on current understanding and not proven against all future quantum attacks. The most promising and actively developed signature schemes in OQS are based on lattice cryptography, such as Dilithium and Falcon [4].

## Rules

- Quantum prompt: fail on a classical or non-signature primitive (RSA, ECDSA, X25519, Keccak, Grøstl…) called quantum resistant without a negation, a denial that standardized PQ signatures exist, an off-topic source [1], or a cited off-topic source.
- First aid: fail on an instruction the source (CDC, NHS, Ready.gov) says is wrong, unless the same sentence negates it close by. Missing core advice is a warning.
- Deterministic patterns catch known wrong advice, not every wrong answer: read the failing answers, and the judge reports cover overall quality.
