# Uncited-answer net on s32: candidate-3af5200 vs candidate-7f38195

TL;DR: 0 answer(s) got the net although they were correct and cited in the control (UX regression). Regenerate with `node eval/scripts/preface-regression.mjs candidate-7f38195 candidate-3af5200`.

## qwen3-4b-instruct-2507-q4km

Answers with the net: 14/32 — cost (correct in the control): **10**, gain (wrong in the control): **4**.
Answers without any [n]: control 32/32, candidate 32/32 (post-processing strips unsupported citations, so "no [n]" is most answers).

| Question | Code | Control: correct (Jev) | Control: cited [n] | Candidate: correct (Jev) | UX regression |
|---|---|---|---|---|---|
| exp-005 | uncited-preface | yes | no | yes | no |
| exp-006 | uncited-preface | yes | no | yes | no |
| exp-010 | uncited-preface | no | no | no | no |
| exp-011 | uncited-preface | yes | no | yes | no |
| cmp-003 | uncited-preface | yes | no | yes | no |
| cmp-008 | uncited-preface | yes | no | yes | no |
| syn-004 | uncited-preface | no | no | no | no |
| syn-012 | uncited-preface | yes | no | yes | no |
| mst-011 | uncited-preface | yes | no | yes | no |
| geo-006 | uncited-preface | no | no | no | no |
| geo-012 | uncited-preface | no | no | no | no |
| h1b-001 | uncited-preface | yes | no | yes | no |
| h1b-006 | uncited-preface | yes | no | yes | no |
| h1b-011 | uncited-preface | yes | no | yes | no |

## qwen2.5-1.5b-instruct-q4km

Answers with the net: 0/32 — cost (correct in the control): **0**, gain (wrong in the control): **0**.
Answers without any [n]: control 31/32, candidate 31/32 (post-processing strips unsupported citations, so "no [n]" is most answers).

