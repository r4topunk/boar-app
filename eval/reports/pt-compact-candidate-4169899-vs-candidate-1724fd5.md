# Compacto (1.5B) in PT: candidate-4169899 vs candidate-1724fd5

TL;DR: **FAIL**: candidate-1724fd5 has 9 model confident errors in PT vs control 5 (blocks above 7), 2 engine answers judged wrong vs control 2 (blocks above it); target <= 10: met. Answered without a cited source: 13 (control 7). Jev, 1.5B seed 42 with packs, 41 PT v2 items. Regenerate with `node eval/scripts/pt-compact-check.mjs candidate-4169899 candidate-1724fd5`.

| Gate | Judged | Refusals | Engine answers (calculator / excerpt / fixed; not counted) | Engine answers judged wrong | Model answers | Correct when answering | Confident errors | Answered without a cited source |
|---|---|---|---|---|---|---|---|---|
| candidate-4169899 | 41 | 19 | 13 | 2 | 9 | 0% | **5** | 7 |
| candidate-1724fd5 | 41 | 15 | 13 | 2 | 13 | 8% | **9** | 13 |

- candidate-4169899 confident errors: cry-008-pt, cry-019-pt, cry-020-pt, trv-006-pt, trv-008-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
- candidate-1724fd5 confident errors: cry-006-pt, cry-008-pt, cry-009-pt, cry-010-pt, cry-011-pt, cry-013-pt, cry-019-pt, trv-006-pt, trv-008-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
