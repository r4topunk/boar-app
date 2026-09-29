import { groupSources } from "./sourceLabel";

/**
 * What BOAR is researching, as the running answer shows it (docs/design/LIVE_RESEARCH.md, direction A
 * "timeline"): the parts of the question as a vertical timeline, and the articles under the part that
 * found them. Pure: the research card, its summary pill and the tests read it.
 *
 * The events carry no history (the reducer keeps the current stage and the merged sources), so the
 * timeline is a fold: each render folds what the answer shows now into what was seen before
 * (`foldTimeline`). Articles are only appended, to the part that was current when they arrived, so a
 * row never moves, whether the engine sends one `sources` event or one per sub-question.
 */

type Chunk = { docId: string; title: string; body?: string; source?: string; collectionId?: string | null };

/** The badge tones (DS soft tone + its text colour): one per article, stable (by its key). */
export const BADGE_TONES = ["accent", "field", "success", "info"] as const;
export type BadgeTone = (typeof BADGE_TONES)[number];

export interface ResearchArticle {
  /** The article (docId): the row's key. */
  key: string;
  title: string;
  /** The article's initial, for its badge. */
  initial: string;
  tone: BadgeTone;
  /** The first passage found, on one line (the row clamps it). */
  passage: string;
}

export interface TimelinePart {
  index: number;
  /** The sub-question (StageDetail.subQuestion, newer engines); absent: "Part i of n". */
  question?: string;
  /** Article keys, in the order they arrived. */
  articles: string[];
}

export interface Timeline {
  /** Deep Research split the question (the engine sent a part count); false: one implicit step. */
  multi: boolean;
  parts: TimelinePart[];
  articles: Record<string, ResearchArticle>;
  /** Every article key, first found first. */
  order: string[];
  /** The part being searched (0-based); -1 while splitting. */
  current: number;
}

/** Rows a part lists before "+N" (Boar's brief: 3 per part). */
export const MAX_ARTICLES = 3;

export function emptyTimeline(): Timeline {
  return { multi: false, parts: [{ index: 0, articles: [] }], articles: {}, order: [], current: 0 };
}

/** A stable tone per article: the same article keeps its colour across renders and answers. */
export function badgeTone(key: string): BadgeTone {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return BADGE_TONES[h % BADGE_TONES.length];
}

function initialOf(title: string): string {
  const letter = Array.from(title.trim()).find((c) => /[\p{L}\p{N}]/u.test(c));
  return letter ? letter.toLocaleUpperCase() : "·";
}

function oneLine(s: string | undefined): string {
  return (s ?? "").replace(/\s+/g, " ").trim();
}

/** The part the engine is on: `retrieving` + detail {index, count} (answer.ts multipass onProgress). */
export interface PartSignal {
  index: number;
  count: number;
  question?: string;
}

/**
 * Reads the stage detail defensively. `splitting`: the multipass decomposing stage, which the engine
 * sends as `retrieving` with an empty detail (no count yet); the single pass sends no detail at all.
 */
export function partSignal(detail: unknown): { part: PartSignal | null; splitting: boolean } {
  if (!detail || typeof detail !== "object") return { part: null, splitting: false };
  const d = detail as { index?: unknown; count?: unknown; subQuestion?: unknown };
  const count = typeof d.count === "number" && d.count > 0 ? Math.floor(d.count) : null;
  const index = typeof d.index === "number" && d.index >= 0 ? Math.floor(d.index) : null;
  if (count == null || index == null) return { part: null, splitting: count == null && index == null };
  const question = typeof d.subQuestion === "string" ? oneLine(d.subQuestion) : "";
  return { part: question ? { index: Math.min(index, count - 1), count, question } : { index: Math.min(index, count - 1), count }, splitting: false };
}

/**
 * Folds what the answer shows now into the timeline. `sources`: this tier's sources (a Deepen passes
 * the ones its own search appended). Returns `prev` itself when nothing changed (memo-friendly).
 */
export function foldTimeline(prev: Timeline, input: { sources: readonly Chunk[]; detail?: unknown; searching: boolean }): Timeline {
  let next = prev;
  const edit = () => {
    if (next === prev) next = { ...prev, parts: prev.parts.map((p) => ({ ...p, articles: [...p.articles] })), articles: { ...prev.articles }, order: [...prev.order] };
    return next;
  };
  const { part, splitting } = input.searching ? partSignal(input.detail) : { part: null, splitting: false };
  if (part) {
    if (!next.multi || next.parts.length < part.count) {
      const n = edit();
      const had = n.multi ? n.parts : [];
      // The implicit step's articles (found before the split) belong to part 1.
      const early = n.multi ? [] : n.parts[0].articles;
      n.parts = Array.from({ length: Math.max(part.count, had.length) }, (_, i) => had[i] ?? { index: i, articles: i === 0 ? early : [] });
      n.multi = true;
    }
    if (next.current !== part.index) edit().current = part.index;
    if (part.question && next.parts[part.index].question !== part.question) edit().parts[part.index].question = part.question;
  } else if (splitting && !next.multi && next.current !== -1 && next.order.length === 0) {
    edit().current = -1;
  }
  const groups = groupSources(input.sources as Chunk[]);
  for (const g of groups) {
    if (next.articles[g.key]) continue;
    const n = edit();
    const first = input.sources[g.indexes[0]];
    const title = g.title.trim() || "…";
    n.articles[g.key] = { key: g.key, title, initial: initialOf(title), tone: badgeTone(g.key), passage: oneLine(first.body) };
    n.order.push(g.key);
    const at = Math.max(0, Math.min(n.current, n.parts.length - 1));
    n.parts[at].articles.push(g.key);
  }
  return next;
}

export type PartStatus = "pending" | "active" | "done";

export interface PartView {
  index: number;
  status: PartStatus;
  /** Label: the sub-question, or a key + options ("chat.research.part", {index, count}); single: the step's own key. */
  question?: string;
  labelKey: string;
  labelOpts?: Record<string, unknown>;
  shown: ResearchArticle[];
  more: number;
}

/** What the answer is doing, as the card's header says it. */
export type ResearchPhase = "searching" | "loading_model" | "reading" | "generating" | "verifying" | "synthesizing";

export interface ResearchView {
  header: { key: string; opts?: Record<string, unknown> };
  /** Articles found so far (the header's right side). */
  total: number;
  /** 0..1, the thin bar under the header. */
  progress: number;
  parts: PartView[];
}

/**
 * The card for a timeline. `phase`: the tier's phase while it runs; null = finished (the read-only
 * timeline behind the summary pill: every part done, no header motion).
 */
export function researchView(tl: Timeline, phase: ResearchPhase | null): ResearchView {
  const searching = phase === "searching";
  const total = tl.order.length;
  const count = tl.parts.length;
  const parts = tl.parts.map<PartView>((p) => {
    const status: PartStatus = !searching ? "done" : p.index < tl.current ? "done" : p.index === tl.current ? "active" : "pending";
    const label = tl.multi
      ? p.question
        ? { labelKey: "", question: p.question }
        : { labelKey: "chat.research.part", labelOpts: { index: p.index + 1, count } }
      : { labelKey: searching ? "chat.research.searchLibrary" : "chat.research.searchedLibrary" };
    return { index: p.index, status, ...label, shown: p.articles.slice(0, MAX_ARTICLES).map((k) => tl.articles[k]), more: Math.max(0, p.articles.length - MAX_ARTICLES) };
  });
  return { header: headerOf(tl, phase, total), total, progress: progressOf(tl, phase), parts };
}

function headerOf(tl: Timeline, phase: ResearchPhase | null, total: number): { key: string; opts?: Record<string, unknown> } {
  switch (phase) {
    case "searching":
      if (tl.multi) return { key: "chat.research.headerPart", opts: { index: tl.current + 1, count: tl.parts.length } };
      return tl.current === -1 ? { key: "chat.research.headerSplitting" } : { key: "chat.research.headerSearching" };
    case "loading_model":
      return { key: "chat.stage.loadingModel" };
    case "reading":
      return total > 0 ? { key: "chat.research.headerReading", opts: { count: total } } : { key: "chat.stage.thinking" };
    case "generating":
      return { key: "chat.stage.writing" };
    case "verifying":
      return { key: "chat.stage.verifying" };
    case "synthesizing":
      return { key: "chat.stage.synthesizing" };
    default:
      return { key: "chat.research.headerDone" };
  }
}

/** The bar: per part while splitting and searching ((i + ½) / n), one half for the single search, full after. */
export function progressOf(tl: Timeline, phase: ResearchPhase | null): number {
  if (phase !== "searching") return 1;
  if (!tl.multi) return tl.current === -1 ? 0 : 0.5;
  return (tl.current + 0.5) / tl.parts.length;
}

/** The collapsed summary: "3 parts · 4 articles" (single: "4 articles"); null when there is nothing to open. */
export function summaryItems(tl: Timeline): { key: string; opts: Record<string, unknown> }[] | null {
  const total = tl.order.length;
  if (!tl.multi && total === 0) return null;
  const articles = { key: "chat.research.articles", opts: { count: total } };
  return tl.multi ? [{ key: "chat.research.parts", opts: { count: tl.parts.length } }, articles] : [articles];
}

/** The badges stacked in the pill: the first articles found, at most MAX_ARTICLES. */
export function stackArticles(tl: Timeline): ResearchArticle[] {
  return tl.order.slice(0, MAX_ARTICLES).map((k) => tl.articles[k]);
}

/** How many articles (not passages) the sources hold: what "Reading N" and the announcement count. */
export function articleCount(sources: readonly Chunk[]): number {
  return groupSources(sources as Chunk[]).length;
}

/**
 * Whether a row pops in or shows in place: rows already there when the card mounted (a recycled row,
 * the read-only timeline) show in place; rows that arrive while it is on screen pop in.
 */
export function rowGrows(key: string, atMount: ReadonlySet<string>): boolean {
  return !atMount.has(key);
}

/**
 * Where a Deepen's own sources start: the answer's source count when the deep pass first shows up, kept
 * (`held`) for the rest of that pass. Null when there is no deep pass. A row mounted again mid-pass (the
 * list recycles it) can only take the count it sees then: it lists fewer new articles, never old ones.
 */
export function deepSourcesFrom(held: number | null, deepRunning: boolean, sourceCount: number): number | null {
  if (held != null) return held;
  return deepRunning ? sourceCount : null;
}

/**
 * The deep section's title ("Deeper answer") and divider: only for a Deepen, a second pass under a first
 * answer. A question the router sends straight to the deep tier (no fast pass) is the answer itself: no
 * "Deeper answer" label from its first second (iPhone, r4to).
 */
export function deepSectionLabeled(a: { fast?: unknown; deep?: unknown }): boolean {
  return !!a.deep && !!a.fast;
}

/** The answer's phase as the research card reads it; null outside research (done, stopped, locating…). */
export function researchPhase(phase: string): ResearchPhase | null {
  switch (phase) {
    case "searching":
    case "loading_model":
    case "reading":
    case "generating":
    case "verifying":
    case "synthesizing":
      return phase;
    default:
      return null;
  }
}
