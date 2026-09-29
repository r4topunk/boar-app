# Deep answers: language and citations

TL;DR:
- **Language.** A Portuguese question answered in multi-pass mode came back in English. None of the multi-pass prompts says which language to answer in. **Fixed**: the synthesis now gets the owner's own `PT_ANSWER_LANGUAGE` line, as the single-pass prompt already does.
- **Citations.** A multi-pass answer can lose all its `[n]` for several reasons. Some are model behavior and some are engine rules. Which one hit the reported case can only be told from that answer's `receipt.reasonCodes`. The engine-side fixes change CT-1 behavior, so they are **proposed** here for the owner, not implemented.

Line numbers are at `feat/retrieval-progress` HEAD.

## 1. Language

Both reported questions go multi-pass on the iPhone 13 (no usable deep model there). The PT trekking question classifies as `compare` and is not health (`isHealthQuestion` = false), so it is not forced to single pass. `isPortugueseQuestion` = true.

Root cause: the multi-pass path has no language rule anywhere.
- `src/services/orchestrator.ts:87-91` decomposition: an English instruction ("Break this research question…", system "You plan research."). A 1.5B/3B model writes English sub-questions.
- `src/services/orchestrator.ts:119-123` sub-answers: an English system prompt and English source passages, so the sub-answers are English.
- `src/services/orchestrator.ts:143-147` synthesis: an English system prompt, English perspectives, and no language line, so the answer is English.
- `src/routing/answer.ts` `runMultipass(...)` call: before this fix it passed neither `styleReminder` nor the PT line. The single-pass path adds `PT_ANSWER_LANGUAGE` to `styleReminder` (answer.ts, "A PT question, in Portuguese, next to it", gate bc7db6d), but that value is only used by the single-pass prompt builders.

Fix (implemented): `ResearchOptions.answerLanguage`. `answer.ts:1087` sets it to `PT_ANSWER_LANGUAGE` for a PT question. The synthesis puts it after its input as `(…)`, the way `styleSection` places the single-pass reminder. The decomposition and sub-answer prompts are unchanged, so the sub-questions and every retrieval stay identical (tested).

Needs the owner's call: **sub-questions in the question's language.** The decomposition's English output is also the retrieval query for each sub-question. `orchestrator.ts:190-192` relies on it: "the decomposition usually rephrases a PT question's sub-questions in English, which match the English sources". PT sub-questions would change what is retrieved. Options:
- (a) Keep English sub-questions for retrieval and ask the decomposition for a PT label per line, for display only (`detail.subQuestion`).
- (b) Show the English sub-questions as they are. This is today's behavior.

Also not passed to multi-pass: the tone's `ctx.styleReminder` and the `todayLine`.

## 2. Citations ("Explain how the greenhouse effect works in detail", 3 parts, sources Greenhouse effect + Climate change, answer uncited)

Where a multi-pass `[n]` can be lost:

| # | Mechanism | Where | Evidence |
|---|---|---|---|
| C1 | The model writes no `[n]` in the synthesis. The synthesis never sees the sources, only the perspectives, and a 1.5B often drops the brackets while rewriting. | orchestrator.ts:143-147 | Model behavior. The receipt has `grounding:uncited-warning` and no `citations:removed-*`. |
| C2 | CT-1 checks the synthesis against the **compressed** sub-question bodies (600-token budget, orchestrator.ts:188). Single pass checks the full chunk (`raw.find`, answer.ts:1164). In multi-pass `raw` is empty (answer.ts:788; retrieval runs inside the orchestrator). | answer.ts:1163-1164 | Probe on the bundled corpus: the same sentence has 0.82 support against full "Climate change" but 0.64 against its compressed body. Other sentences fall under the 0.5 bar. |
| C3 | Synthesis sentences merge several perspectives ("…stronger, which leads to climate change and rising temperatures [1][2]"). Each `[n]` is judged against the whole mixed sentence. | citations.ts:79-95 | Probe: `[1]` removed at 0.31 support. |
| C4 | The inverse of CT-1 (attribution, which puts back an `[n]` a source supports at 0.75) is skipped for multi-pass (`guarded` false, answer.ts:835 and answer.ts:1213). A dropped or missing `[n]` is never restored, unlike in single pass. | answer.ts:1213 | Code. |
| C5 | A PT synthesis against English sources: CT-1 keyword support is about 0.18, so every `[n]` goes (the same as single-pass PT; the cross-language exception 5fa5d96 was reverted). **The language fix above makes this case more frequent.** | citations.ts | Probe: "O efeito estufa ocorre quando… [1]" has 0.18 support, so it is removed. |

Single-pass greenhouse, uncited: 35ba849 (28/09, FILLER words) fixed exactly the 4B's greenhouse paraphrase losing `[1]`. If the build that was tested predates it, that is the likely cause. Otherwise C1 or C3.

**Diagnose first (free):** read that answer's `receipt.reasonCodes` (usage details, or the execution telemetry export).
- `citations:removed-1-2` means CT-1 removed them (C2, C3 or C5).
- No `citations:*` but `grounding:uncited-warning` means the model wrote none (C1).

Proposed fixes (owner's call; none touches retrieval, order or numbering):
- **P1 (C2).** `ResearchResult` also returns the full retrieved chunks of the cited sources, and answer.ts uses them for the CT-1 and attribution lookups, as single pass does. This keeps more correct `[n]` and still rejects unsupported ones.
- **P2 (C4).** Run `attributeCitations` on multi-pass answers too: the same 0.75 bar, never without support.
- **P3 (C1).** In the synthesis instruction, ask for "each sentence ends with the [n] of the perspective it comes from". This is a prompt change, so it should be gated.
- **P4 (C5).** A PT answer's CT-1 could compare against the question's English search terms or lexicon names. This reopens 5fa5d96, so the owner has to decide.

## Measuring

There is no desktop pipeline eval without a model: `scripts/eval-device.mjs` drives the in-app eval on an Android device. Proposal for the Mac mini queue (not started): add the two questions above to the eval set, one PT deep and one EN deep, with an expected language and `cited.length > 0`. Run `npm run eval:device -- --help` for the flags, before and after P1+P2. Metrics: the share of answers in the question's language, the share of answers with ≥1 `[n]`, and `citations:removed-*` per answer.

Verification of the language fix: tsc clean; vitest adds 3 tests. The synthesis prompt ends with the line only when it is set. Decomposition and sub-answer prompts, sub-questions and citations are identical with and without it. answer.ts passes it for PT only.
