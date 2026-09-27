# s32 gate check: candidate-ea21e82 vs candidate-9ef80f9

TL;DR: 4B PASS · 1.5B FAIL. 4B: ratio (health fixed answers excluded) within 3 points of the control and <= 2/32 knowledge refusals. 1.5B (Compacto): confident errors may not rise above the control; refusals and correct-when-answering are reported, not blocking. Health fixed answers are reported apart (decision a4644ef). Judges: jev. Regenerate with `node eval/scripts/s32-gate-check.mjs candidate-9ef80f9 candidate-ea21e82 --judges jev`.

## 4B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 4/32 | 4/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 4 | 4 |
| Answered from memory after the guard dropped every source | 18 | 10 |
| Quality ratio (claude) | n/a | n/a |
| Quality ratio without the health refusals (claude) | n/a | n/a |
| Correct when answering (claude) | n/a | n/a |
| Confident errors (claude) | n/a | n/a |
| Quality ratio (jev) | 0.68 | 0.69 |
| Quality ratio without the health refusals (jev) | 0.72 | 0.73 |
| Correct when answering (jev) | 71% | 71% |
| Confident errors (jev) | 3 | 2 |

Verdict 4B: **PASS**

## 1.5B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 22/32 | 14/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 4 | 4 |
| Answered from memory after the guard dropped every source | 0 | 0 |
| Quality ratio (claude) | n/a | n/a |
| Quality ratio without the health refusals (claude) | n/a | n/a |
| Correct when answering (claude) | n/a | n/a |
| Confident errors (claude) | n/a | n/a |
| Quality ratio (jev) | 0.35 | 0.42 |
| Quality ratio without the health refusals (jev) | 0.34 | 0.42 |
| Correct when answering (jev) | 40% | 44% |
| Confident errors (jev) | 4 | 7 |

Verdict 1.5B: **FAIL**
