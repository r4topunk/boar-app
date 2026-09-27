# Answers from memory, without a source (nosource)

TL;DR: v2 crypto and travel questions (30 EN + the same 30 in PT), `--corpus none`, answered from memory. Correct = judge correctness >= 4 of 5 (mean of both A/B orders), wrong = <= 1.5 (a false or nonsensical answer), partial = in between. Wilson 95% intervals. Regenerate with `node eval/scripts/nosource-report.mjs`.

## Jev

| Model | Lang | Seeds | Answers | Correct (95% CI) | Partial | Wrong / nonsense | PT answered in English |
|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km | EN | 3 | 90 | **6%** (2%–12%) | 30% | 64% | – |
| qwen2.5-1.5b-instruct-q4km | PT | 3 | 90 | **3%** (1%–9%) | 13% | 83% | 0% |
| qwen3-4b-instruct-2507-q4km | EN | 3 | 90 | **21%** (14%–31%) | 47% | 32% | – |
| qwen3-4b-instruct-2507-q4km | PT | 3 | 90 | **9%** (5%–17%) | 57% | 34% | 0% |

## Claude

| Model | Lang | Seeds | Answers | Correct (95% CI) | Partial | Wrong / nonsense | PT answered in English |
|---|---|---|---|---|---|---|---|
| qwen2.5-1.5b-instruct-q4km | EN | 1 | 30 | **7%** (2%–21%) | 13% | 80% | – |
| qwen2.5-1.5b-instruct-q4km | PT | 1 | 30 | **7%** (2%–21%) | 10% | 83% | 0% |

## Scope and decision

- **Scope: only crypto and travel knowledge questions** (v2), 30 per language. Other kinds (general science, history, how-to) were not measured and may do better from memory; do not generalize beyond these two categories.
- The judge compares each answer with the Opus + web search reference (PT answers against the English reference).
- Decision (Boar, 2026-09-27): the Compacto (1.5B) keeps refusing sourceless knowledge questions; the bar to revert was ~70% correct without a source.
