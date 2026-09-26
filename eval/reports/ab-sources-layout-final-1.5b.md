# A/B: sources in the user turn vs in the system prompt — Qwen2.5-1.5B (v1.1 item 5)

TL;DR: **NO REGRESSION** on v1 s32 (Qwen2.5-1.5B, seed 42, same job and machine). A = `qwen2.5-1.5b-instruct-q4km__bundled__f737839-sources-system`, B = `qwen2.5-1.5b-instruct-q4km__bundled__9dd5a20-sources-user`.

Pre-registered criterion (written before any judge ran): regression if the direct B-vs-A win score 95% CI lies entirely below 0.5, or B's correct-answer rate vs the reference is more than 10 points below A's.

| | A | B |
|---|---|---|
| Answers citing [1], [2]… | 13/32 | 1/32 |
| Answers with a literal "[n]" | 0/32 | 0/32 |

### Judge: Claude

Not run.

### Judge: Jev — no regression

Direct blind comparison B vs A (both orders, 32 questions): B wins 31%, ties 28%, loses 41%; win score 0.45 (95% CI 0.31–0.59); position-consistent 78%.

| vs reference | A: sources in system | B: sources in user turn |
|---|---|---|
| Correct answers (correctness ≥ 4) | 6% | 28% |
| Quality ratio (95% CI) | 0.51 (0.44–0.58) | 0.54 (0.47–0.61) |

Criterion: direct win-score CI entirely below 0.5 — not met; correct rate down more than 10 points — not met.

Scope: quality only. TTFT with prompt-cache reuse is measured by the engine owner (llama-server cache_prompt, multi-turn); this runner builds a fresh context per question.
