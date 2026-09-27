# s32 gate check: candidate-9ef80f9 vs candidate-be817b3-r2

TL;DR: 4B PASS · 1.5B PASS. 4B: ratio (health fixed answers excluded) within 3 points of the control and <= 2/32 knowledge refusals. 1.5B (Compacto): confident errors may not rise above the control; refusals and correct-when-answering are reported, not blocking. Health fixed answers are reported apart (decision a4644ef). Judges: jev. Regenerate with `node eval/scripts/s32-gate-check.mjs candidate-be817b3-r2 candidate-9ef80f9 --judges jev`.

## 4B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 4/32 | 4/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 4 | 4 |
| Answered from memory after the guard dropped every source | 16 | 18 |
| Quality ratio (claude) | n/a | n/a |
| Quality ratio without the health refusals (claude) | n/a | n/a |
| Correct when answering (claude) | n/a | n/a |
| Confident errors (claude) | n/a | n/a |
| Quality ratio (jev) | 0.67 | 0.68 |
| Quality ratio without the health refusals (jev) | 0.71 | 0.72 |
| Correct when answering (jev) | 71% | 71% |
| Confident errors (jev) | 3 | 3 |

Verdict 4B: **PASS**

## 1.5B

| | Control | Candidate |
|---|---|---|
| Refusals (all) | 25/32 | 22/32 |
| Health fixed answer ("no source + emergency", by design; not a refusal, not in the ratio) | 4 | 4 |
| Answered from memory after the guard dropped every source | 0 | 0 |
| Quality ratio (claude) | n/a | n/a |
| Quality ratio without the health refusals (claude) | n/a | n/a |
| Correct when answering (claude) | n/a | n/a |
| Confident errors (claude) | n/a | n/a |
| Quality ratio (jev) | 0.29 | 0.35 |
| Quality ratio without the health refusals (jev) | 0.27 | 0.34 |
| Correct when answering (jev) | 29% | 40% |
| Confident errors (jev) | 4 | 4 |

Verdict 1.5B: **PASS**
