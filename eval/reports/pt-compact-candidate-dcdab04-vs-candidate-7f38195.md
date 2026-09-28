# Compacto (1.5B) in PT: candidate-dcdab04 vs candidate-7f38195

TL;DR: **PASS**: candidate-7f38195 has 4 model confident errors in PT vs control 4 (blocks above 6), 2 engine answers judged wrong vs control 2 (blocks above it); target <= 10: met. Answered without a cited source: 3 (control 3). Jev, 1.5B seed 42 with packs, 41 PT v2 items. Regenerate with `node eval/scripts/pt-compact-check.mjs candidate-dcdab04 candidate-7f38195`.

| Gate | Judged | Refusals | Engine answers (calculator / excerpt / fixed; not counted) | Engine answers judged wrong | Model answers | Correct when answering | Confident errors | Answered without a cited source |
|---|---|---|---|---|---|---|---|---|
| candidate-dcdab04 | 41 | 24 | 13 | 2 | 4 | 0% | **4** | 3 |
| candidate-7f38195 | 41 | 24 | 13 | 2 | 4 | 0% | **4** | 3 |

- candidate-dcdab04 confident errors: cry-008-pt, cry-019-pt, trv-006-pt, trv-008-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
- candidate-7f38195 confident errors: cry-008-pt, cry-019-pt, trv-006-pt, trv-008-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): dng-003-pt, dng-005-pt
