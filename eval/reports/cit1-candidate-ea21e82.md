# CIT-1: citations and context size, candidate-ea21e82

Answers with a citation ([n] in the text or done.cited), citations the engine added/removed after generation, and the mean retrieved context before → after compression (tokens, from the context:<before>-><after> reason code; answers without it, e.g. fixed or extractive ones, are not in the mean).

| Model · set | Answers | With a citation | [n] added | [n] removed | Mean context tokens before → after (answers) |
|---|---|---|---|---|---|
| 1.5B · s32 | 32 | 3% (1/32) | 0 | 6 | 737 → 239 (32) |
| 1.5B · suggestions (all EN+PT) | 8 | 63% (5/8) | 2 | 1 | 913 → 207 (7) |
| 1.5B · suggestions (offered) | 8 | 63% (5/8) | 2 | 1 | 913 → 207 (7) |
| 4B · s32 | 32 | 0% (0/32) | 0 | 11 | 737 → 239 (32) |
| 4B · suggestions (all EN+PT) | 8 | 50% (4/8) | 0 | 3 | 913 → 207 (7) |
| 4B · suggestions (offered) | 8 | 50% (4/8) | 0 | 3 | 913 → 207 (7) |

Regenerate with `node eval/scripts/cit1-report.mjs candidate-ea21e82`.
