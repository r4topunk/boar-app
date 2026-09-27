# s32 gate check: candidate-ee1f2b7 vs control-cc91653

TL;DR: 4B PASS · 1.5B FAIL. 4B: ratio within 3 points of the control on both judges and <= 2/32 refusals. 1.5B: correct-when-answering within 3 points and no more confident errors (refusal is a product decision, reported apart). Judges: jev. Regenerate with `node eval/scripts/s32-gate-check.mjs control-cc91653 candidate-ee1f2b7 --judges jev`.

## 4B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 0/32 | 4/32 |
| of which health, by design | 0 | 4 |
| Answered from memory after the guard dropped every source | 0 | 6 |
| Quality ratio (claude) | 0.64 | n/a |
| Quality ratio without the health refusals (claude) | 0.64 | n/a |
| Correct when answering (claude) | 75% | n/a |
| Confident errors (claude) | 6 | n/a |
| Quality ratio (jev) | 0.74 | 0.68 |
| Quality ratio without the health refusals (jev) | 0.74 | 0.71 |
| Correct when answering (jev) | 75% | 68% |
| Confident errors (jev) | 4 | 3 |

Verdict 4B: **PASS**

## 1.5B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 0/32 | 4/32 |
| of which health, by design | 0 | 4 |
| Answered from memory after the guard dropped every source | 0 | 6 |
| Quality ratio (claude) | 0.42 | n/a |
| Quality ratio without the health refusals (claude) | 0.42 | n/a |
| Correct when answering (claude) | 38% | n/a |
| Confident errors (claude) | 13 | n/a |
| Quality ratio (jev) | 0.53 | 0.52 |
| Quality ratio without the health refusals (jev) | 0.53 | 0.53 |
| Correct when answering (jev) | 41% | 36% |
| Confident errors (jev) | 12 | 12 |

Verdict 1.5B: **FAIL**
