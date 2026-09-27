# Compacto (1.5B) in PT: candidate-65d1bd1 vs candidate-bc7db6d

TL;DR: **PASS**: candidate-bc7db6d has 7 model confident errors in PT vs control 6 (blocks above 8), 2 engine answers judged wrong vs control 3 (blocks above it); target <= 10: met. Answered without a cited source: 8 (control 9). Jev, 1.5B seed 42 with packs, 41 PT v2 items. Regenerate with `node eval/scripts/pt-compact-check.mjs candidate-65d1bd1 candidate-bc7db6d`.

| Gate | Judged | Refusals | Engine answers (calculator / excerpt / fixed; not counted) | Engine answers judged wrong | Model answers | Correct when answering | Confident errors | Answered without a cited source |
|---|---|---|---|---|---|---|---|---|
| candidate-65d1bd1 | 41 | 17 | 13 | 3 | 11 | 9% | **6** | 9 |
| candidate-bc7db6d | 41 | 18 | 13 | 2 | 10 | 0% | **7** | 8 |

- candidate-65d1bd1 confident errors: cry-008-pt, cry-019-pt, cry-020-pt, trv-006-pt, trv-008-pt, trv-009-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-001-pt, dng-003-pt, dng-005-pt
- candidate-bc7db6d confident errors: cry-008-pt, cry-018-pt, cry-019-pt, cry-020-pt, trv-006-pt, trv-008-pt, trv-009-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
