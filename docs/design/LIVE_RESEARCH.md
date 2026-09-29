# Live research

TL;DR: while BOAR answers, the steps card shows which articles it found, under the searching step. You get one
quiet row per article, up to 3, then "+N". Rows grow in as `sources` events arrive, and they never reorder or
leave. When the first words stream, the card gives way to the text as before (SEND-MOTION D3), and the articles
stay visible as one line under the text: the strip that replaced "Found N passages". When the answer is done, the
strip crossfades into the sources card, so each list shows in one place at a time. Deep Research names the part
it is on, and the sub-question when the engine sends it.

Code: `src/ui/chat/liveResearch.ts` (pure: articles, marks, strip rules, spoken label), `AssistantMessage.tsx`
(`ArticleRows`, `StepsCard`, `LiveSourcesStrip`), `presentation.ts` (`generatingSteps`, `stageLine`,
`phaseAnnouncement`). Locale keys: `chat.research.*`, `chat.stage.partQuestion`, `chat.announce.answeringFrom`.

```sh
npx vitest run src/ui/chat/liveResearch.test.ts src/ui/chat/presentation.test.ts src/ui/chat/chatPerf.test.ts
```

## Audit (before this change)

| # | Where | Problem |
|---|---|---|
| 1 | `presentation.ts:259-264` (`generatingSteps`), `:21-24` (`stageLine`) | "Reading N sources" counted chunks. Three passages of one article read "Reading 3 sources". |
| 2 | `AssistantMessage.tsx:118-145` (`StepsCard`) | No article names anywhere while the answer runs. The only feedback was a count and a spinner, so you could not see what BOAR was researching. |
| 3 | `AssistantMessage.tsx:1181-1192` + `:1122` | Two counts of the same thing, with two nouns: the card said "Reading 4 sources…" and the block below it said "Found 6 passages". |
| 4 | `presentation.ts:423` (`stepsCardShown`) + `AssistantMessage.tsx:1186` | Once text streamed, the card left and only "Found N passages" was left. You could not see the sources until done. |
| 5 | `presentation.ts:27-31`, `routing/answer.ts:1069` | "Researching part n of m" was dead copy. The part arrives on `retrieving` (which maps to searching) and never on `synthesizing`, which carries no detail, so Deep Research said "Searching sources…" for every sub-question. |
| 6 | `presentation.ts:55-56` | VoiceOver heard "Answering" with nothing about what the answer rests on. The card is hidden from readers (correct: it is visual), so a reader had no way to learn the articles before done. |
| 7 | `AssistantMessage.tsx:1028` (pill) | A Deepen has no running clock. The header shows the first answer's receipt (hidden from readers while active). Kept as is: the deep section has its own steps card. Noted for the owner. |
| 8 | `StepsCard` memo (`:145`) | The memo compared only steps and ring. Any new prop needs an explicit comparison, or the card re-renders on every token. |

## Layout

```
 BOAR                               [⟳ Reading… · 4 s]   ← pill, unchanged (step · seconds → receipt)
 ╭──────────────────────────────────────────╮
 │ 🔍 Searching sources…                   ✓ │   ← step label: 1 line (a sub-question changes it in place)
 │    [W] Greenhouse effect                  │   ← article rows: mark + title, footnote, secondary, 1 line
 │    [W] Climate change                     │
 │    [W] Carbon dioxide                     │
 │    +2 more                                │   ← caption, only when more than 3
 │ 📖 Reading 5 sources…                  ⟳ │   ← counts articles
 │ ⚡ Writing the answer…                  · │
 ╰──────────────────────────────────────────╯

 …first words stream…
 The greenhouse effect is the process by which…▍
 ╭──────────────────────────────────────────╮
 │ 📖 Greenhouse effect · Climate change · C… +2 │ ← strip: names shrink first, "+N" never truncates
 ╰──────────────────────────────────────────╯
 …done → the strip crossfades (Swap) into the sources card (cited list, relevance bars).
```

- The rows sit in the label column of the searching step, so the check and ring stay on the label's first line,
  and the first row never opens a card-level gap.
- The mark is the source's initial in a `bg.raised` square the size of the icon, with `radius.xs`. User
  documents get `file-text`. There is no network favicon (offline app).
- One row per article (docId), first found first. `researchArticles` caps at `MAX_ARTICLES = 3`. There is no
  "+1 → 4th row" rule: a row that later made way for "+2" would leave, and that is a jump.
- A Deepen's card lists only what its own search appended (`sources` from the count at deep start). The first
  answer's articles are already in its sources card.

## States

| State | Card (search step) | Under the text | Pill | Announced |
|---|---|---|---|---|
| Searching, nothing yet | label + ring, no rows | nothing | Searching… · s | "Searching sources" |
| Articles arriving (1 or many `sources` events) | rows grow in, then "+N" | nothing (the card lists them) | Searching… | nothing |
| Reading (prefill / loading model) | search ✓, rows stay, "Reading N sources" ring | nothing | Reading… / Loading… | nothing |
| Deep sub-question | "Researching 2/3: <sub-question>" (or "part 2 of 3"), one line; rows = new articles | first answer + its sources card | receipt of the first answer | nothing |
| Writing / streaming | card gives way to text (D3) | strip: names · "+N" | Writing… · s | "Answering from N sources" (once) |
| Done | none | Swap → sources card (cited / related) | receipt | "Answer ready, N sources" |
| No sources / weak | search ✓ + "No article on this" (once flagged) | nothing (no sources) → weak note at end | as usual | "Answer ready, without a source…" |
| Instant snippet (`o que é monção?`) | usually never seen (done at once); if the model runs, as above | snippet card above; strip while writing | Searching… → receipt | ready |
| Health extract | card leaves at first extract words | strip | as usual | as usual |
| Places | no rows (its sources are places) | places card | as usual | "Answering" without a count |
| Stopped | card leaves (steps null while stopping) | sources card, all sources (no `cited`) | receipt | "Stopped" |
| Error / timeout | card leaves | banner, sources card if any | receipt | error (assertive) |
| Waiting library | library card, no steps | nothing | Preparing… | unchanged |

## Motion

- Rows: `Reveal` with `appear`. The height grows on the UI thread and the content fades in with the DS `enter`
  role. Under reduce motion, layout is instant and the fade is 90 ms (motionSpec). No hand-written timings, no
  stagger, no loop. The ring is still the chat's only loop, and it stops once text streams (chatPerf guard).
- Rows already present when the card mounts (a Deepen's, a recycled row) show in place (`rowGrows`).
- Rows are only appended. Titles never reorder, so an incremental engine reads as a list filling up.
- The handoff reuses SEND-MOTION: the card leaves with the crossfade's short half and the slot holds its height
  (`slotHold`). The strip's block grows below. At done, `Swap` crossfades the strip into the sources card.
- Search label: `numberOfLines={1}`, so a sub-question swapping in never changes the card's height.

## Accessibility

- The card stays hidden from readers (visual, as before). Nothing new is announced per article.
- One announcement per answer carries the articles: "Answering from N sources" (`generating` phase), once, never
  per event.
- The strip is one focus with `accessibilityRole="text"`: "Sources: A, B, C and 2 more". It is read when
  reached and never announced.
- Large text: rows and strip are one line each. The mark's letter is capped at 1.5×.

## Engine contract (final, feat/retrieval-progress; the UI works on today's base too)

- Single pass: one `sources` event after grounding, before loading_model/prefill/generating. The rows show as
  soon as it lands.
- Deep: one `sources` event per sub-question that found new ones, with the full list so far and new items at the
  end. `mergeSources` dedupes by chunkId and keeps order, so rows never move.
- `StageDetail.subQuestion?: string` on deep `retrieving` stages with index/count: read defensively (string,
  whitespace collapsed, blank ignored) → `chat.stage.partQuestion`. Without it: `chat.stage.part`.
- Partial sources stay after a stop or error. The sources card shows them (all, no `cited`).

## Proposals (not depended on)

- `sources` events already carry `tier`, but the reducer drops it. If it kept the index where a Deepen's sources
  start, the UI would not need `deepSourcesFrom`. A row remounted mid-deep currently lists fewer new articles
  (never wrong ones).
- "No article on this" relies on the `weak_sources` warning that a sourceless answer gets before generation
  (`routing/answer.ts:976-978`, `fromMemory`). The uncited-at-finish warning (`:729`) arrives at done, when the
  card is gone. That is fine: those answers have sources.
