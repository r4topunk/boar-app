# CIT-1: citations and context size, candidate-c7a7f17

Answers with a citation ([n] in the text or done.cited), citations the engine added/removed after generation, and the mean retrieved context before → after compression (tokens, from the context:<before>-><after> reason code; answers without it, e.g. fixed or extractive ones, are not in the mean).

| Model · set | Answers | With a citation | [n] added | [n] removed | Duplicate [n] at a sentence end (CIT-2) | Mean context tokens before → after (answers) |
|---|---|---|---|---|---|---|
| 1.5B · s32 | 32 | 0% (0/32) | 0 | 6 | 0 | 748 → 278 (32) |
| 1.5B · suggestions (all EN+PT) | 14 | 57% (8/14) | 3 | 3 | 0 | 965 → 290 (12) |
| 1.5B · suggestions (offered) | 6 | 83% (5/6) | 1 | 0 | 0 | 956 → 191 (5) |
| 4B · s32 | 32 | 0% (0/32) | 0 | 11 | 0 | 748 → 278 (32) |
| 4B · suggestions (all EN+PT) | 14 | 50% (7/14) | 0 | 10 | 0 | 965 → 290 (12) |
| 4B · suggestions (offered) | 7 | 86% (6/7) | 0 | 0 | 0 | 1042 → 283 (6) |
| 4B · v2-en (packs) | 41 | 44% (18/41) | 5 | 6 | 0 | 855 → 365 (33) |
| 4B · v2-pt (packs) | 41 | 15% (6/41) | 0 | 40 | 0 | 900 → 393 (33) |

Regenerate with `node eval/scripts/cit1-report.mjs candidate-c7a7f17`.
