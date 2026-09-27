# Fixed case trv-007 (foreign word, script): candidate-39a2508

TL;DR: **FAIL** (reported): 2/3 answers give Thai "thank you" in Thai script or romanization, no Khmer; gender particle missing in 2. Regenerate with `node eval/scripts/foreign-word-check.mjs candidate-39a2508`.

- pt/v2-en · trv-007: pass [no gender particle (khrap / kha)]
- pt/v2-pt · trv-007-pt: **fail** (Khmer script in an answer about Thai; no Thai "thank you" (ขอบคุณ / khop khun)) [no gender particle (khrap / kha)]
- pt-compact/v2-pt · trv-007-pt: pass [declined]
