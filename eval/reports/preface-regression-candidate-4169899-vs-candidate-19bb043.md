# Uncited-answer net on s32: candidate-19bb043 vs candidate-4169899

TL;DR: 0 answer(s) got the net although they were correct and cited in the control (UX regression). Regenerate with `node eval/scripts/preface-regression.mjs candidate-4169899 candidate-19bb043`.

## qwen3-4b-instruct-2507-q4km

Answers with the net: 1/32 — cost (correct in the control): **0**, gain (wrong in the control): **1**.
Answers without any [n]: control 32/32, candidate 32/32 (post-processing strips unsupported citations, so "no [n]" is most answers).

| Question | Code | Control: correct (Jev) | Control: cited [n] | Candidate: correct (Jev) | UX regression |
|---|---|---|---|---|---|
| exp-010 | uncited-preface | no | no | no | no |

## qwen2.5-1.5b-instruct-q4km

Answers with the net: 0/32 — cost (correct in the control): **0**, gain (wrong in the control): **0**.
Answers without any [n]: control 31/32, candidate 31/32 (post-processing strips unsupported citations, so "no [n]" is most answers).

