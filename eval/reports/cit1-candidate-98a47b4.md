# CIT-1: citations and context size, candidate-98a47b4

Answers with a citation ([n] in the text or done.cited), citations the engine added/removed after generation, and the mean retrieved context before → after compression (tokens, from the context:<before>-><after> reason code; answers without it, e.g. fixed or extractive ones, are not in the mean).

| Model · set | Answers | With a citation | [n] added | [n] removed | Mean context tokens before → after (answers) |
|---|---|---|---|---|---|
| 1.5B · s32 | 32 | 3% (1/32) | 0 | 5 | 737 → 288 (32) |
| 1.5B · suggestions (all EN+PT) | 14 | 50% (7/14) | 3 | 0 | 838 → 282 (12) |
| 1.5B · suggestions (offered) | 5 | 80% (4/5) | 1 | 0 | 1201 → 380 (4) |
| 4B · s32 | 32 | 0% (0/32) | 0 | 11 | 737 → 288 (32) |
| 4B · suggestions (all EN+PT) | 14 | 43% (6/14) | 0 | 3 | 838 → 282 (12) |
| 4B · suggestions (offered) | 5 | 80% (4/5) | 0 | 0 | 1201 → 380 (4) |

Regenerate with `node eval/scripts/cit1-report.mjs candidate-98a47b4`.
