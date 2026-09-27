# s32 gate check: candidate-586a4c1 vs candidate-39a2508

TL;DR: 4B PASS · 1.5B PASS. 4B: ratio (health fixed answers excluded) within 3 points of the control and <= 2/32 knowledge refusals. 1.5B (Compacto): at most 10 confident errors (fixed ceiling); refusals and correct-when-answering are reported, not blocking. Health fixed answers are reported apart (decision a4644ef). Judges: jev. Regenerate with `node eval/scripts/s32-gate-check.mjs candidate-39a2508 candidate-586a4c1 --judges jev`.

## 4B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 4/32 | 4/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 4 | 4 |
| Answered from memory after the guard dropped every source | 14 | 14 |
| Quality ratio (claude) | n/a | n/a |
| Quality ratio without the health refusals (claude) | n/a | n/a |
| Correct when answering (claude) | n/a | n/a |
| Confident errors (claude) | n/a | n/a |
| Quality ratio (jev) | 0.64 | 0.64 |
| Quality ratio without the health refusals (jev) | 0.67 | 0.67 |
| Correct when answering (jev) | 61% | 61% |
| Confident errors (jev) | 5 | 5 |

Verdict 4B: **PASS**

## 1.5B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 27/32 | 27/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 4 | 4 |
| Answered from memory after the guard dropped every source | 0 | 0 |
| Quality ratio (claude) | n/a | n/a |
| Quality ratio without the health refusals (claude) | n/a | n/a |
| Correct when answering (claude) | n/a | n/a |
| Confident errors (claude) | n/a | n/a |
| Quality ratio (jev) | 0.29 | 0.29 |
| Quality ratio without the health refusals (jev) | 0.28 | 0.28 |
| Correct when answering (jev) | 20% | 20% |
| Confident errors (jev) | 3 | 3 |

Verdict 1.5B: **PASS**
