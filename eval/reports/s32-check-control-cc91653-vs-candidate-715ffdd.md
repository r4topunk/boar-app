# s32 gate check: candidate-715ffdd vs control-cc91653

TL;DR: 4B FAIL · 1.5B FAIL. 4B: ratio within 3 points of the control on both judges and <= 2/32 refusals. 1.5B: correct-when-answering within 3 points and no more confident errors (refusal is a product decision, reported apart). Judges: jev. Regenerate with `node eval/scripts/s32-gate-check.mjs control-cc91653 candidate-715ffdd --judges jev`.

## 4B

| | Control | Candidate |
|---|---|---|
| Refusals | 0/32 | 12/32 |
| Quality ratio (claude) | 0.64 | 0.51 |
| Correct when answering (claude) | 75% | 75% |
| Confident errors (claude) | 6 | 3 |
| Quality ratio (jev) | 0.74 | 0.53 |
| Correct when answering (jev) | 75% | 70% |
| Confident errors (jev) | 4 | 3 |

Verdict 4B: **FAIL**

## 1.5B

| | Control | Candidate |
|---|---|---|
| Refusals | 0/32 | 12/32 |
| Quality ratio (claude) | 0.42 | 0.37 |
| Correct when answering (claude) | 38% | 45% |
| Confident errors (claude) | 13 | 10 |
| Quality ratio (jev) | 0.53 | 0.38 |
| Correct when answering (jev) | 41% | 25% |
| Confident errors (jev) | 12 | 12 |

Verdict 1.5B: **FAIL**
