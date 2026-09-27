# s32 gate check: integration-99eba00 vs candidate-a2bafb1

TL;DR: 4B PASS · 1.5B PASS. 4B: ratio (health fixed answers excluded) within 3 points of the control and <= 2/32 knowledge refusals. 1.5B: correct-when-answering may not drop more than 5 points and confident errors may not rise by more than 2 (refusal is a product decision, reported apart). Health fixed answers are reported apart (decision a4644ef). Judges: jev. Regenerate with `node eval/scripts/s32-gate-check.mjs candidate-a2bafb1 integration-99eba00 --judges jev`.

## 4B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 4/32 | 4/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 4 | 4 |
| Answered from memory after the guard dropped every source | 6 | 6 |
| Quality ratio (claude) | n/a | n/a |
| Quality ratio without the health refusals (claude) | n/a | n/a |
| Correct when answering (claude) | n/a | n/a |
| Confident errors (claude) | n/a | n/a |
| Quality ratio (jev) | 0.70 | 0.70 |
| Quality ratio without the health refusals (jev) | 0.73 | 0.73 |
| Correct when answering (jev) | 71% | 71% |
| Confident errors (jev) | 1 | 1 |

Verdict 4B: **PASS**

## 1.5B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 4/32 | 4/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 4 | 4 |
| Answered from memory after the guard dropped every source | 6 | 6 |
| Quality ratio (claude) | n/a | n/a |
| Quality ratio without the health refusals (claude) | n/a | n/a |
| Correct when answering (claude) | n/a | n/a |
| Confident errors (claude) | n/a | n/a |
| Quality ratio (jev) | 0.52 | 0.52 |
| Quality ratio without the health refusals (jev) | 0.53 | 0.53 |
| Correct when answering (jev) | 36% | 36% |
| Confident errors (jev) | 13 | 13 |

Verdict 1.5B: **PASS**
