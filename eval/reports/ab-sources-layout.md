# A/B: sources in the user turn vs in the system prompt — Qwen2.5-1.5B (v1.1 item 5)

TL;DR: **NO REGRESSION** on v1 s32 (Qwen2.5-1.5B, seed 42, same job and machine). A = `qwen2.5-1.5b-instruct-q4km__bundled__sources-system`, B = `qwen2.5-1.5b-instruct-q4km__bundled__sources-user`.

Pre-registered criterion (written before any judge ran): regression if the direct B-vs-A win score 95% CI lies entirely below 0.5, or B's correct-answer rate vs the reference is more than 10 points below A's.

| | A | B |
|---|---|---|
| Answers citing [1], [2]… | 2/32 | 0/32 |
| Answers with a literal "[n]" | 4/32 | 0/32 |

### Judge: Claude — no regression

Direct blind comparison B vs A (both orders, 32 questions): B wins 44%, ties 22%, loses 34%; win score 0.55 (95% CI 0.39–0.70); position-consistent 88%.

Against-reference runs not available for this judge.

Criterion: direct win-score CI entirely below 0.5 — not met; correct rate down more than 10 points — not evaluated.

### Judge: Jev — no regression

Direct blind comparison B vs A (both orders, 32 questions): B wins 34%, ties 31%, loses 34%; win score 0.50 (95% CI 0.36–0.64); position-consistent 75%.

Against-reference runs not available for this judge.

Criterion: direct win-score CI entirely below 0.5 — not met; correct rate down more than 10 points — not evaluated.

Scope: quality only. TTFT with prompt-cache reuse is measured by the engine owner (llama-server cache_prompt, multi-turn); this runner builds a fresh context per question.
