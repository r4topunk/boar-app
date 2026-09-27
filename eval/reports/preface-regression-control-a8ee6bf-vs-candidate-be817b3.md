# Uncited-answer net on s32: candidate-be817b3 vs control-a8ee6bf

TL;DR: 0 answer(s) got the net although they were correct and cited in the control (UX regression). Regenerate with `node eval/scripts/preface-regression.mjs control-a8ee6bf candidate-be817b3`.

## qwen3-4b-instruct-2507-q4km

Answers with the net: 5/32 — cost (correct in the control): **4**, gain (wrong in the control): **1**.
Answers without any [n]: control 32/32, candidate 32/32 (post-processing strips unsupported citations, so "no [n]" is most answers).

| Question | Code | Control: correct (Jev) | Control: cited [n] | Candidate: correct (Jev) | UX regression |
|---|---|---|---|---|---|
| exp-010 | uncited-preface | yes | no | no | no |
| cmp-002 | uncited-preface | yes | no | yes | no |
| syn-011 | uncited-preface | no | no | no | no |
| geo-008 | uncited-preface | yes | no | yes | no |
| lng-006 | uncited-preface | yes | no | yes | no |

## qwen2.5-1.5b-instruct-q4km

Answers with the net: 20/32 — cost (correct in the control): **8**, gain (wrong in the control): **12**.
Answers without any [n]: control 31/32, candidate 32/32 (post-processing strips unsupported citations, so "no [n]" is most answers).

| Question | Code | Control: correct (Jev) | Control: cited [n] | Candidate: correct (Jev) | UX regression |
|---|---|---|---|---|---|
| exp-005 | uncited-preface | yes | no | yes | no |
| exp-006 | uncited-preface | no | no | yes | no |
| exp-010 | uncited-preface | no | no | no | no |
| exp-011 | uncited-preface | yes | no | no | no |
| cmp-002 | uncited-preface | yes | no | yes | no |
| cmp-003 | uncited-preface | yes | no | no | no |
| cmp-008 | uncited-preface | no | no | no | no |
| cmp-009 | uncited-preface | yes | no | no | no |
| syn-003 | uncited-preface | no | no | no | no |
| syn-004 | uncited-preface | no | no | no | no |
| syn-011 | uncited-preface | no | no | no | no |
| syn-012 | uncited-preface | no | no | yes | no |
| mst-009 | uncited-preface | no | no | no | no |
| mst-011 | uncited-preface | yes | no | yes | no |
| geo-006 | uncited-preface | no | no | no | no |
| geo-008 | uncited-preface | no | no | no | no |
| geo-012 | uncited-preface | no | no | no | no |
| lng-001 | uncited-preface | yes | no | no | no |
| lng-006 | uncited-preface | yes | no | yes | no |
| h1b-001 | uncited-preface | no | no | no | no |
