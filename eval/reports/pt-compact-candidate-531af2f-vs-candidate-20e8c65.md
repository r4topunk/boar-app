# Compacto (1.5B) in PT: candidate-531af2f vs candidate-20e8c65

TL;DR: **FAIL**: candidate-20e8c65 has 15 model confident errors in PT, 8 engine answers judged wrong; target <= 10: not met. Answered without a cited source: 22. Jev, 1.5B seed 42 with packs, 41 PT v2 items. Regenerate with `node eval/scripts/pt-compact-check.mjs candidate-531af2f candidate-20e8c65`.

| Gate | Judged | Refusals | Engine answers (calculator / excerpt / fixed; not counted) | Engine answers judged wrong | Model answers | Correct when answering | Confident errors | Answered without a cited source |
|---|---|---|---|---|---|---|---|---|
| candidate-531af2f | not run | | | | | | | |
| candidate-20e8c65 | 41 | 8 | 9 | 8 | 24 | 13% | **15** | 22 |

- candidate-20e8c65 confident errors: cry-002-pt, cry-004-pt, cry-005-pt, cry-008-pt, cry-011-pt, cry-013-pt, cry-014-pt, cry-017-pt, cry-019-pt, cry-020-pt, trv-006-pt, trv-008-pt, mth-001-pt, mth-002-pt, mth-005-pt; engine answers judged wrong (read them: a health excerpt may be right but partial): trv-001-pt, trv-009-pt, dng-001-pt, dng-003-pt, dng-004-pt, dng-005-pt, mth-003-pt, mth-006-pt
