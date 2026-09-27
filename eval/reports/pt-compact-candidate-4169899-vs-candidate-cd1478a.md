# Compacto (1.5B) in PT: candidate-4169899 vs candidate-cd1478a

TL;DR: **PASS**: candidate-cd1478a has 4 model confident errors in PT vs control 5 (blocks above 7), 2 engine answers judged wrong vs control 2 (blocks above it); target <= 10: met. Answered without a cited source: 3 (control 7). Jev, 1.5B seed 42 with packs, 41 PT v2 items. Regenerate with `node eval/scripts/pt-compact-check.mjs candidate-4169899 candidate-cd1478a`.

| Gate | Judged | Refusals | Engine answers (calculator / excerpt / fixed; not counted) | Engine answers judged wrong | Model answers | Correct when answering | Confident errors | Answered without a cited source |
|---|---|---|---|---|---|---|---|---|
| candidate-4169899 | 41 | 19 | 13 | 2 | 9 | 0% | **5** | 7 |
| candidate-cd1478a | 41 | 24 | 13 | 2 | 4 | 0% | **4** | 3 |

- candidate-4169899 confident errors: cry-008-pt, cry-019-pt, cry-020-pt, trv-006-pt, trv-008-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
- candidate-cd1478a confident errors: cry-008-pt, cry-019-pt, trv-006-pt, trv-008-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
