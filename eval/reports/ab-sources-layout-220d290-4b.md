# A/B: sources in the user turn vs in the system prompt — Qwen3-4B (v1.1 item 5)

TL;DR: **REGRESSED (see judges below)** on v1 s32 (Qwen3-4B, seed 42, same job and machine). A = `qwen3-4b-instruct-2507-q4km__bundled__f737839-sources-system`, B = `qwen3-4b-instruct-2507-q4km__bundled__220d290-sources-user`.

Pre-registered criterion (written before any judge ran): regression if the direct B-vs-A win score 95% CI lies entirely below 0.5, or B's correct-answer rate vs the reference is more than 10 points below A's.

| | A | B |
|---|---|---|
| Answers citing [1], [2]… | 27/32 | 16/32 |
| Answers with a literal "[n]" | 0/32 | 0/32 |

### Judge: Claude

Not run.

### Judge: Jev — REGRESSED

Direct blind comparison B vs A (both orders, 32 questions): B wins 9%, ties 25%, loses 66%; win score 0.22 (95% CI 0.11–0.33); position-consistent 84%.

| vs reference | A: sources in system | B: sources in user turn |
|---|---|---|
| Correct answers (correctness ≥ 4) | 50% | 31% |
| Quality ratio (95% CI) | 0.73 (0.67–0.78) | 0.55 (0.47–0.63) |

Criterion: direct win-score CI entirely below 0.5 — met; correct rate down more than 10 points — met.

Scope: quality only. TTFT with prompt-cache reuse is measured by the engine owner (llama-server cache_prompt, multi-turn); this runner builds a fresh context per question.
