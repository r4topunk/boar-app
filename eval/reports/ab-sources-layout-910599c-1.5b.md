# A/B: sources in the user turn vs in the system prompt — Qwen2.5-1.5B (v1.1 item 5)

TL;DR: **NO REGRESSION** on v1 s32 (Qwen2.5-1.5B, seed 42, same job and machine). A = `qwen2.5-1.5b-instruct-q4km__bundled__f737839-sources-system`, B = `qwen2.5-1.5b-instruct-q4km__bundled__910599c-sources-user`.

Pre-registered criterion (written before any judge ran): regression if the direct B-vs-A win score 95% CI lies entirely below 0.5, or B's correct-answer rate vs the reference is more than 10 points below A's.

| | A | B |
|---|---|---|
| Answers citing [1], [2]… | 13/32 | 0/32 |
| Answers with a literal "[n]" | 0/32 | 0/32 |
| Refusals ("the sources do not cover it", no answer) | 0/32 | 0/32 |
| Portuguese questions answered in English | 0/3 | 1/3 |

### Judge: Claude

Not run.

### Judge: Jev — no regression

Direct blind comparison B vs A (both orders, 32 questions): B wins 44%, ties 16%, loses 41%; win score 0.52 (95% CI 0.36–0.67); position-consistent 91%.

| vs reference | A: sources in system | B: sources in user turn |
|---|---|---|
| Correct answers (correctness ≥ 4) | 6% | 25% |
| Quality ratio (95% CI) | 0.51 (0.44–0.58) | 0.55 (0.49–0.60) |

Criterion: direct win-score CI entirely below 0.5 — not met; correct rate down more than 10 points — not met.

Scope: quality only. TTFT with prompt-cache reuse is measured by the engine owner (llama-server cache_prompt, multi-turn); this runner builds a fresh context per question.
