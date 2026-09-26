# A/B: sources in the user turn vs in the system prompt — Qwen3-4B (v1.1 item 5)

TL;DR: **REGRESSED (see judges below)** on v1 s32 (Qwen3-4B, seed 42, same job and machine). A = `qwen3-4b-instruct-2507-q4km__bundled__f737839-sources-system`, B = `qwen3-4b-instruct-2507-q4km__bundled__910599c-sources-user`.

Pre-registered criterion (written before any judge ran): regression if the direct B-vs-A win score 95% CI lies entirely below 0.5, or B's correct-answer rate vs the reference is more than 10 points below A's.

| | A | B |
|---|---|---|
| Answers citing [1], [2]… | 27/32 | 14/32 |
| Answers with a literal "[n]" | 0/32 | 0/32 |
| Refusals ("the sources do not cover it", no answer) | 0/32 | 3/32 |
| Portuguese questions answered in English | 0/3 | 1/3 |

### Judge: Claude

Not run.

### Judge: Jev — REGRESSED

Direct blind comparison B vs A (both orders, 32 questions): B wins 19%, ties 16%, loses 66%; win score 0.27 (95% CI 0.14–0.41); position-consistent 94%.

| vs reference | A: sources in system | B: sources in user turn |
|---|---|---|
| Correct answers (correctness ≥ 4) | 50% | 38% |
| Quality ratio (95% CI) | 0.73 (0.67–0.78) | 0.56 (0.48–0.65) |

Criterion: direct win-score CI entirely below 0.5 — met; correct rate down more than 10 points — met.

Scope: quality only. TTFT with prompt-cache reuse is measured by the engine owner (llama-server cache_prompt, multi-turn); this runner builds a fresh context per question.
