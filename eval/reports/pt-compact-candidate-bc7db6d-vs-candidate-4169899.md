# Compacto (1.5B) in PT: candidate-bc7db6d vs candidate-4169899

TL;DR: **PASS**: candidate-4169899 has 5 model confident errors in PT vs control 7 (blocks above 9), 2 engine answers judged wrong vs control 2 (blocks above it); target <= 10: met. Answered without a cited source: 7 (control 8). Jev, 1.5B seed 42 with packs, 41 PT v2 items. Regenerate with `node eval/scripts/pt-compact-check.mjs candidate-bc7db6d candidate-4169899`.

| Gate | Judged | Refusals | Engine answers (calculator / excerpt / fixed; not counted) | Engine answers judged wrong | Model answers | Correct when answering | Confident errors | Answered without a cited source |
|---|---|---|---|---|---|---|---|---|
| candidate-bc7db6d | 41 | 18 | 13 | 2 | 10 | 0% | **7** | 8 |
| candidate-4169899 | 41 | 19 | 13 | 2 | 9 | 0% | **5** | 7 |

- candidate-bc7db6d confident errors: cry-008-pt, cry-018-pt, cry-019-pt, cry-020-pt, trv-006-pt, trv-008-pt, trv-009-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
- candidate-4169899 confident errors: cry-008-pt, cry-019-pt, cry-020-pt, trv-006-pt, trv-008-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
