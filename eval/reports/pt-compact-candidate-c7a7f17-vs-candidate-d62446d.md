# Compacto (1.5B) in PT: candidate-c7a7f17 vs candidate-d62446d

TL;DR: **PASS**: candidate-d62446d has 3 model confident errors in PT vs control 3 (blocks above 5), 2 engine answers judged wrong vs control 2 (blocks above it); target <= 10: met. Answered without a cited source: 3 (control 3). Jev, 1.5B seed 42 with packs, 41 PT v2 items. Regenerate with `node eval/scripts/pt-compact-check.mjs candidate-c7a7f17 candidate-d62446d`.

| Gate | Judged | Refusals | Engine answers (calculator / excerpt / fixed; not counted) | Engine answers judged wrong | Model answers | Correct when answering | Confident errors | Answered without a cited source |
|---|---|---|---|---|---|---|---|---|
| candidate-c7a7f17 | 41 | 25 | 13 | 2 | 3 | 0% | **3** | 3 |
| candidate-d62446d | 41 | 25 | 13 | 2 | 3 | 0% | **3** | 3 |

- candidate-c7a7f17 confident errors: cry-019-pt, trv-006-pt, trv-008-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
- candidate-d62446d confident errors: cry-019-pt, trv-006-pt, trv-008-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
