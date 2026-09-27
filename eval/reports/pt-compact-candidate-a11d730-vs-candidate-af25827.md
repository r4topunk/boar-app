# Compacto (1.5B) in PT: candidate-a11d730 vs candidate-af25827

TL;DR: **PASS**: candidate-af25827 has 6 model confident errors in PT vs control 6 (blocks above 8), 3 engine answers judged wrong vs control 6 (blocks above it); target <= 10: met. Answered without a cited source: 9 (control 10). Jev, 1.5B seed 42 with packs, 41 PT v2 items. Regenerate with `node eval/scripts/pt-compact-check.mjs candidate-a11d730 candidate-af25827`.

| Gate | Judged | Refusals | Engine answers (calculator / excerpt / fixed; not counted) | Engine answers judged wrong | Model answers | Correct when answering | Confident errors | Answered without a cited source |
|---|---|---|---|---|---|---|---|---|
| candidate-a11d730 | 41 | 16 | 13 | 6 | 12 | 8% | **6** | 10 |
| candidate-af25827 | 41 | 17 | 13 | 3 | 11 | 9% | **6** | 9 |

- candidate-a11d730 confident errors: cry-004-pt, cry-008-pt, cry-019-pt, cry-020-pt, trv-006-pt, trv-008-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): trv-001-pt, trv-009-pt, dng-001-pt, dng-003-pt, dng-004-pt, dng-005-pt
- candidate-af25827 confident errors: cry-008-pt, cry-019-pt, cry-020-pt, trv-006-pt, trv-008-pt, trv-009-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-001-pt, dng-003-pt, dng-005-pt
