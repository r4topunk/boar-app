# s32 gate check: candidate-2329dc0 vs control-cc91653

TL;DR: 4B PASS · 1.5B FAIL. 4B: ratio (health fixed answers excluded) within 3 points of the control and <= 2/32 knowledge refusals. 1.5B: correct-when-answering may not drop more than 5 points and confident errors may not rise (refusal is a product decision, reported apart). Health fixed answers are reported apart (decision a4644ef). Judges: jev. Regenerate with `node eval/scripts/s32-gate-check.mjs control-cc91653 candidate-2329dc0 --judges jev`.

## 4B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 0/32 | 4/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 0 | 4 |
| Answered from memory after the guard dropped every source | 0 | 6 |
| Quality ratio (claude) | 0.64 | n/a |
| Quality ratio without the health refusals (claude) | 0.64 | n/a |
| Correct when answering (claude) | 75% | n/a |
| Confident errors (claude) | 6 | n/a |
| Quality ratio (jev) | 0.74 | 0.70 |
| Quality ratio without the health refusals (jev) | 0.74 | 0.73 |
| Correct when answering (jev) | 75% | 71% |
| Confident errors (jev) | 4 | 1 |

Verdict 4B: **PASS**

## 1.5B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 0/32 | 4/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 0 | 4 |
| Answered from memory after the guard dropped every source | 0 | 6 |
| Quality ratio (claude) | 0.42 | n/a |
| Quality ratio without the health refusals (claude) | 0.42 | n/a |
| Correct when answering (claude) | 38% | n/a |
| Confident errors (claude) | 13 | n/a |
| Quality ratio (jev) | 0.53 | 0.52 |
| Quality ratio without the health refusals (jev) | 0.53 | 0.53 |
| Correct when answering (jev) | 41% | 36% |
| Confident errors (jev) | 12 | 13 |

Verdict 1.5B: **FAIL**
