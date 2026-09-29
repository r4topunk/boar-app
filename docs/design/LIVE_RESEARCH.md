# Live research

TL;DR: while BOAR researches, the answer shows a timeline card. This is direction A, "linha do tempo", which
r4to picked from three animated mockups.

- **Status line.** A soft shimmer reads "Dividindo a pergunta…", then "Pesquisando parte 2 de 3", then
  "Lendo 4 artigos…". The article counter sits on the right, and a 3 pt ember bar underneath advances per part.
- **Parts.** Each part of the question is a node on a vertical line. The part's text is the sub-question when
  the engine sends it, otherwise "Parte 2 de 3". The articles sit under the part that found them. Each row has a
  badge, the title and one line of the passage, and it pops in when it arrives.
- **Single pass.** A normal answer uses the same card with one step and no numbering.
- **Collapse.** When the text starts, the card folds into a pill: "3 partes · 4 artigos ›" with stacked badges,
  or "4 artigos ›" for a single pass. Tapping the pill opens the finished timeline again. At done, the sources
  card below takes over as before.

Code: `src/ui/chat/liveResearch.ts` (pure: timeline fold, view, summary, badge tones),
`src/ui/chat/ResearchCard.tsx` (`ResearchPanel`, `TimelineCard`, `SummaryPill`), `AssistantMessage.tsx`
(`useTimeline`, where the panel goes). Locale keys: `chat.research.*`, `chat.announce.answeringFrom`.

```sh
npx vitest run src/ui/chat/liveResearch.test.ts src/ui/chat/chatPerf.test.ts src/ui/theme/motionSpec.test.ts
```

## History

- v1 (a4d3415..d731401) had article names under a 3-step checklist and a strip under the streaming text. On the
  iPhone, r4to found it "feia, simples demais": only a title line and "Pesquisando 1/3: …" were added.
- v2 (this spec) is the reference mockup's direction A (`research-directions.html`, object `A`,
  `.tl/.part/.node/.art/.summary/.stack`).
- The v1 audit still applies: "Reading N" counts articles, not passages; "part n of m" is read from the
  `retrieving` stage; one announcement per answer. Two v1 items are gone: the 3-step checklist and its "Lendo 1
  fonte" pending row, which confused the owner. `StepsSlot` and `stepsSlotHold` are removed as well; the card now
  folds into the pill instead of holding the slot.

## Layout (dark, 343 pt column)

```
 BOAR                                   [⟳ Searching… · 6 s]
 ╭────────────────────────────────────────────────╮  Card compact, radius card, surface
 │ Pesquisando parte 2 de 3  ✦shimmer   4 artigos │  caption semibold secondary · counter numeric
 │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬░░░░░░░░░░░░░░░░               │  3 pt bar: hairline track, ember fill
 │ (✓) Como o efeito estufa retém o calor?         │  node 18: done = ember fill + check
 │  │  ┌──────────────────────────────────────┐    │  row: raised, radius 10, pad 6/8
 │  │  │ [E] Efeito estufa                    │    │  badge 22, radius 6, stable soft tone
 │  │  │     O efeito estufa é o processo pe… │    │  passage: caption secondary, 1 line
 │  │  └──────────────────────────────────────┘    │
 │ (◎) Quais gases causam o efeito estufa?         │  active: ember ring + pulse
 │  │  [D] Dióxido de carbono …                    │
 │ ( ) Parte 3 de 3                                │  pending: hairline ring, secondary text
 ╰────────────────────────────────────────────────╯
 …first words → ( [E][R][D] 3 partes · 4 artigos › )   pill: surface, full radius, 36 tall
 O efeito estufa acontece porque…▍
```

- Node: `iconSm + xxs` (18) with a `focusRing` (2) border. The connector is 2 pt `line.hairline`, running from
  the node to the next node through the part's bottom padding (`sm + xxs`).
- Part text: footnote, up to **2 lines** (not cut to one). Secondary when pending, primary when active or done.
- Articles: max 3 per part, then "+N more" (caption). Rows are only ever appended, deduped by docId.
- Badge: the title's initial on a DS soft tone (`accent`, `field`, `success`, `info`, via `toneColors`), picked
  by a stable hash of the docId (`badgeTone`).
- Single pass: one node labelled "Buscando no acervo deste celular", then "Busca no acervo deste celular" once
  done. There is no reading row; "Lendo N artigos…" only shows in the status line after the search.

## States

| State | Status line | Timeline | Pill / below |
|---|---|---|---|
| Searching, nothing yet (single) | Pesquisando no acervo… | 1 active node | – |
| Splitting (deep, empty detail) | Dividindo a pergunta… | 3 still placeholder lines (pending node + bar), never a single-pass step | bar at 0 |
| Part i of n, searching | Pesquisando parte i de n | nodes done / active (pulse) / pending; sub-question or "Parte i de n" | bar (i + ⅓)/n; pill "Buscando…" |
| Part i of n, its sources arrived (sub-answer being written) | Lendo a parte i de n… | active node calm (ring, no pulse) | bar (i + ⅔)/n; pill "Lendo…" |
| Part done with nothing new | – | one caption line "Nenhum artigo novo" (no row card) | – |
| Articles arriving (1 or many `sources` events) | counter grows | rows pop in under the part searching | – |
| Loading model / reading | Carregando o modelo… / Lendo N artigos… | every node done | bar full |
| Synthesizing / checking | Juntando tudo… / Conferindo… | every node done | – |
| Writing (first words) | – | card folds (fade, then its space closes) | pill grows in; text below |
| Pill tapped | – | read-only timeline (done state, readable by VoiceOver) | chevron › → ⌄ |
| Done | – | pill stays, collapsed | sources card (cited) below, as before |
| No sources / weak | Lendo… / Pensando… | step done + "Nenhum artigo sobre isso" | no pill (nothing to open) |
| Instant snippet only (`o que é monção?`) | usually never seen | – | no pill (no model answered) |
| Places | no card (its sources are places) | – | places card |
| Stopped / error | card folds | – | pill (if articles) + banner + sources card |
| Deepen | its own card in the "Resposta aprofundada" section, with only its new articles | | its own pill |

No list shows twice. While the card or the pill carries the articles, the "Found N passages" count card is not
shown. At done the sources card lists the cited ones, and the timeline stays folded unless you open it.

## "Resposta aprofundada" label

The engine sends a question the router puts on the deep tier as `tier: "deep"` from its first stage
(`routing/answer.ts:662` `genTier = gen?.tier`, `:791` `stage("retrieving", genTier)`). The UI rendered the deep
section, with its "Resposta aprofundada" overline and divider, whenever `answer.deep` existed
(`AssistantMessage.tsx`, the old `<Block shown={!!answer.deep}>`). A normal answer got the label from its first
second.

Now `deepSectionLabeled` makes that section a Deepen only: deep after fast. A deep-only answer renders as the
answer itself, with its research card and pill, its text, and its receipt by the name. It also gets the running
clock, which it never had before, because the pill showed the elapsed time only while `!answer.deep`.

## Motion (DS only)

- **Heights.** Every block that appears or leaves uses `Reveal`: rows, "+N", the card, the pill and the opened
  timeline. Heights move on the UI thread; a hidden block fades with its height kept, then closes under
  `animateNextLayout`. This is how the card folds while the pill grows above it and the text below slides.
- **Rows.** `entering({ pop: true })` is new in `theme/motion.ts`: the DS `enter` plus a scale from `POP_SCALE`
  (0.9, `motionSpec.ts`). Under reduce motion it is a fade only. Rows already present when a card mounts show in
  place (`rowGrows`).
- **Bar.** `layoutProps(["width"])`. Nodes: `colorTransition(["borderColor", "backgroundColor"])`.
- **Shimmer and pulse.** One `Animated.loop` over `tokens.motion.loop.sweep` (`useAmbient`) drives both. The
  shimmer is a brighter copy of the status text seen through a sweeping window: two texts and opposite
  transforms, no mask library. The pulse is a ring scaling up and fading behind the active node. The loop runs
  only while the live card is on screen (`useAmbient(live && !reduceMotion)`), stops when the card folds at the
  first words, and never runs under reduce motion. The chatPerf guard pins this.
- There are no hand-written timings (`motionGuard.test.ts`).

## Accessibility

- The live card is visual only (`accessibilityElementsHidden`). One announcement per answer carries the research:
  "Respondendo com N fontes" (`phaseAnnouncement`, generating). Nothing is announced per row or per part.
- The pill is a button: "Pesquisa: 3 partes · 4 artigos", with a hint and `expanded` state. The opened timeline is
  readable text.
- Large text: part text wraps to 2 lines, rows are 1 + 1 lines, and badge letters are capped at 1.2×.

## Engine contract (final, feat/retrieval-progress; works on today's base too)

- Single pass: one `sources` event before loading_model/prefill. The rows show as soon as it lands, under the one
  step.
- Deep: one `sources` event per sub-question that found new ones, sent after its search and before its
  sub-answer, with the full list so far and new items at the end. Each new article goes to the part being
  searched when it arrives.
- On today's base, the multipass sends one `sources` event before synthesis, so every article lands under the
  last part.
- `StageDetail.subQuestion?: string` is read defensively (`partSignal`: string only, whitespace collapsed, blank
  ignored). The decompose stage is `retrieving` with an empty detail, which shows "Dividindo a pergunta…".
- Partial sources stay after a stop or error. The pill and the sources card show them.
- **Retrieval vs sub-answer.** The engine sends no event when a part's sub-answer starts. The orchestrator runs
  `onProgress("researching", i)`, then retrieve, then `onPartialSources` only if new sources were found, then the
  ~300-token sub-answer. The stage stays `retrieving` for the whole part (about 10 s on the iPhone), so the UI
  infers "reading part i" from that part's sources arriving (`TimelinePart.read`). A part that found nothing new
  sends nothing, and reads as searching until the next part starts. Proposal for the engine: a `generating` stage
  with the part's detail when a sub-answer starts, or `onPartialSources` even when nothing is new.
- **Pill.** The pill beside the name follows the same inference (`timelinePillStep`): "Lendo…" for a part past its
  search, "Escrevendo…" from synthesizing on (generatingSteps).
- **Splitting.** Before the split, the multipass does a first search (`retrieving`, no detail). That moment still
  shows the single-pass step briefly, because nothing tells the two apart yet.

## Not matched from the mockup (and why)

- **Shimmer gradient.** The mockup uses CSS `background-clip: text` with a muted → ink → ember → ink → muted
  gradient. RN has no text clip without a mask library (not a dependency here), so the shimmer is a hard-edged
  window of brighter text (primary over secondary), with no ember in the band.
- **Pop overshoot.** The mockup's pop uses `cubic-bezier(.2,.9,.3,1.2)`, which overshoots. The DS has no overshoot
  curve, so rows use the DS enter curve plus the 0.9 → 1 scale.
- **Pulse period.** The pulse shares the sweep loop (1.2 s) instead of the mockup's 1.4 s, so a single loop drives
  both.
- **Part text in Portuguese.** The engine writes sub-questions in English today. That is an engine item.
- **History.** Restored answers (another session) have no pill: which part found which article is not stored.
  Only answers asked in this mount keep their timeline. A row the list remounts mid-answer restarts its fold with
  what is on screen then.

## Proposals (not depended on)

- The `sources` events carry `tier` and the stages carry the part, but the reducer keeps neither. If it stored
  `{partIndex, chunkIds}` per sources event, the timeline could survive remounts and history.
