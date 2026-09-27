# s32 gate check: candidate-be817b3 vs control-a8ee6bf

TL;DR: 4B PASS · 1.5B FAIL. 4B: ratio (health fixed answers excluded) within 3 points of the control and <= 2/32 knowledge refusals. 1.5B: correct-when-answering may not drop more than 5 points and confident errors may not rise by more than 2 (refusal is a product decision, reported apart). Health fixed answers are reported apart (decision a4644ef). Judges: jev. Regenerate with `node eval/scripts/s32-gate-check.mjs control-a8ee6bf candidate-be817b3 --judges jev`.

## 4B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 4/32 | 4/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 4 | 4 |
| Answered from memory after the guard dropped every source | 6 | 16 |
| Quality ratio (claude) | n/a | n/a |
| Quality ratio without the health refusals (claude) | n/a | n/a |
| Correct when answering (claude) | n/a | n/a |
| Confident errors (claude) | n/a | n/a |
| Quality ratio (jev) | 0.70 | 0.67 |
| Quality ratio without the health refusals (jev) | 0.73 | 0.71 |
| Correct when answering (jev) | 71% | 71% |
| Confident errors (jev) | 1 | 3 |

Verdict 4B: **PASS**

## 1.5B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 4/32 | 4/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 4 | 4 |
| Answered from memory after the guard dropped every source | 6 | 16 |
| Quality ratio (claude) | n/a | n/a |
| Quality ratio without the health refusals (claude) | n/a | n/a |
| Correct when answering (claude) | n/a | n/a |
| Confident errors (claude) | n/a | n/a |
| Quality ratio (jev) | 0.52 | 0.48 |
| Quality ratio without the health refusals (jev) | 0.53 | 0.49 |
| Correct when answering (jev) | 36% | 29% |
| Confident errors (jev) | 13 | 15 |

Verdict 1.5B: **FAIL**
