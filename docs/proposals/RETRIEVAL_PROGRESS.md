# Retrieval progress: show the articles BOAR uses while it researches

TL;DR: a multi-pass (Deep Research) answer now sends each sub-question's sources as soon as that sub-question's retrieval is done, instead of once after every sub-answer has been written. Each `stage retrieving` also carries the sub-question's text. Nothing about retrieval changed: same chunks, same order, same gating, same final list, same `[n]` numbers. A single-pass answer is unchanged. Its `sources` event already comes before the model loads, and sending anything earlier would show passages that grounding later drops.

## What the engine emits today

Sourced question, single pass (`src/routing/answer.ts`, fast tier, quickFirst on):

| # | Event | When |
|---|---|---|
| 1 | `stage retrieving` (tier `instant`, or the generation tier when instant is off) | after model selection, before the search |
| - | (waiting for `knowledgeReady` on first boot) | |
| - | `retrieve()`: embedding, then lexical + semantic + format-1 packs + wiki packs in parallel; a PT question runs a second pass with the English names | this is where the time goes |
| - | filters: content, `compressContext`, topic grounding (`onSubject`), health filters | CPU only, milliseconds |
| 2 | `sources` (once, final, grounded) | right after the filters |
| 3 | `instant` (optional), sometimes followed by `done` (extractive) | |
| 4 | `stage loading_model`, then `stage prefill`, then `stage generating` (first token), then `token`s, then (`stage verifying`), then `done`, then (`deep_available`) | seconds to tens of seconds |

So a single-pass answer already shows its articles before the slow part (model load and prefill). The UI only needs to render the `sources` event when it arrives, not wait for `done`.

Multi-pass (`src/services/orchestrator.ts`), before this change:

```
stage retrieving (decomposing: an LLM call)
stage retrieving {index 0, count N} -> retrieve -> sub-answer 0 (LLM, ~300 tokens)
stage retrieving {index 1, count N} -> retrieve -> sub-answer 1 (LLM)
...
sources (all, once)        <- the first time the chat saw any article
stage synthesizing -> tokens -> done
```

After:

```
stage retrieving (decomposing)
stage retrieving {index 0, count N, subQuestion} -> retrieve -> sources [s1..sa]        -> stage retrieving {…, answering} -> sub-answer 0
stage retrieving {index 1, count N, subQuestion} -> retrieve -> sources [s1..sa..sb]    -> stage retrieving {…, answering} -> sub-answer 1
...
sources (final, same list as the last partial) -> stage synthesizing -> tokens -> done
```

## Event contract for the UI (`src/routing/events.ts`)

No new event type. Two additive, optional changes:

```ts
interface StageDetail {
  index?: number;
  count?: number;
  progress?: number;
  /** Multi-pass "retrieving" with index/count: the sub-question being researched (model-written text). */
  subQuestion?: string; // NEW, optional
  answering?: boolean; // NEW, optional: the sub-question's search is done and its sub-answer is being written (sent for every part, new sources or not)
}

// unchanged shape; widened timing
{ type: "sources"; answerId: string; tier: AnswerTier; sources: SourceChunk[] }
```

Guarantees:
- Single pass: exactly one `sources` event, after grounding. No change.
- Multi-pass: a `sources` event after each sub-question that found new sources, sent before that sub-question's generation, then the final one before `stage synthesizing`. A sub-question that adds nothing sends nothing.
- Each list is the full list so far, not a delta: the previous list plus new sources at the end. `sources[n-1]` never changes once sent, so replacing the list and merging it (today's `mergeSources` in `answerReducer.ts`) give the same result.
- The last `sources` event equals `AnswerResult.sources` and the list `done.cited` indexes into.
- Every source sent passed the per-sub-question topic filter (Quill 014c054). No off-topic passage is ever sent, partial or final.
- Multi-pass sources carry no `relevance` (sub-questions score on their own scales), as before.
- `detail.subQuestion` appears only on multi-pass `stage retrieving` events with `index/count`. The decomposing stage has none.

UI hints: show "Researching 2/3: <subQuestion>" from the deep tier's `detail`. Show the articles list from `state.sources` as it grows, with no reordering.

## Options evaluated and not taken

| Option | Why not (now) |
|---|---|
| Single pass: send retrieved chunks before grounding | Breaks the rule that no off-topic passage reaches the `sources` event (Quill 014c054). The titles would disappear again a few ms later. |
| Per-backend progress (bundled vs packs) inside `retrieve()` | Final order is preserved only after fusion and gating (600d1bd, 9b1996d), so only counts could be shown honestly. It also means plumbing a callback through the owner's `retrieve.ts`. No device numbers show that retrieval is long enough to need it: the eval evidence has no `retrievalMs`. Worth revisiting if `receipt.retrievalMs` on device is over ~1 s. |
| New `retrieval_progress` event | Not needed: the existing `sources` and `stage` events cover it, and the UI reducer already merges several `sources` events. |
| A `decomposing` stage name | Adding to `AnswerStageName` could break exhaustive label maps in the UI. It stays `retrieving` with no detail. |

Observation, not changed: a deepen that falls back to multi-pass gets `reuseSources`, but `runDeepResearch` retrieves again for each sub-question and does not use them.

## Verification

- `npx tsc --noEmit`: clean. `npx vitest run`: 2351 passed, 3 skipped (baseline 2345; 6 new tests).
- `orchestrator.test.ts`: event order (decomposing, researching 0, partial 0 before sub-answer 0, researching 1, partial 1 before sub-answer 1, final, synthesizing); every partial is a prefix of the next and of `citations`; the last partial equals `onSources` and `citations`; same citations, answer and prompts with and without the callback; no event for a sub-question with nothing new; no off-topic source in partial lists.
- `answer.test.ts`: event sequence with `detail.subQuestion`; `relevance` stripped from partial lists; `result.sources` and `cited` unchanged; folding the events through the chat's `answerReducer` gives exactly `result.sources`; single pass still sends one `sources` after `stage retrieving`.
- Timing (unit level, mocked engine: 200 ms per generation, 20 ms per retrieval, 3 sub-questions): first sources at 226 ms instead of 872 ms. First token and total are unchanged (1073 ms). Added cost per emission: ~1.4 µs (list length check plus relevance strip over 18 sources). On a phone a sub-answer is ~300 tokens, so the articles show up about one sub-answer generation after decomposition, instead of after all of them.

## Risks

- If a multi-pass answer stops or fails mid-way, the chat keeps the partial sources it was sent. `AnswerResult.sources` on error is unchanged (it never included them).
- `detail.subQuestion` is model-written text. Show it as is and never treat it as a source.

---

## PR description (ready to paste)

**Title:** feat(research): show each sub-question's sources while Deep Research runs

**Why.** The chat should show which articles BOAR is using while it researches. In a multi-pass answer the `sources` event came only after every sub-question had been retrieved *and answered by the model*, often tens of seconds after the articles were known. Single-pass answers already send their grounded sources before the model loads, so they need no change.

**What.**
- `runDeepResearch` gets an optional `onPartialSources(sources, {subQuestionIndex, subQuestionCount})` callback. It fires after each sub-question's retrieval and topic filter, before its generation, and only when the list grew. The list is the cumulative `mergeSources` output, so each list is a prefix of the next and of the final `citations`. `onSources` is unchanged.
- `ResearchProgress` and `StageDetail` get an optional `subQuestion` (the text being researched), sent on multi-pass `stage retrieving`.
- `answer.ts` sends each partial list as a normal `sources` event (relevance stripped, as for the final one).
- Contract docs updated (`events.ts`, `docs/ADAPTIVE_ROUTING.md`).

**What doesn't change.** Retrieval, gating (`gateByRelevance` before fusion), compression, the topic filter, the order and numbering of sources, prompts, citations, and single-pass events. No new event type, no new dependency, no UI change. The chat's reducer already merges several `sources` events by `chunkId`.

**How verified.** `tsc` clean; `vitest` 2351 passed. New tests check the event order, that every partial list is a prefix of the next and of the final one, that sources, answers and prompts are the same with and without the callback, that no off-topic source is sent, and that folding the events through `answerReducer` gives `result.sources`. With a mocked engine (3 sub-questions, 200 ms per generation), the first sources arrive at 226 ms instead of 872 ms, and first token and total time are unchanged. Overhead is ~1.4 µs per emission.
