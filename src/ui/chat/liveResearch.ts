import { groupSources, sourceParts } from "./sourceLabel";

/**
 * What BOAR is researching, as the running answer shows it (docs/design/LIVE_RESEARCH.md): the articles
 * found so far, one row per article (passages of one article are one row), in the order they were
 * found, so a row never moves when more arrive. Pure: the steps card and the streaming strip read it.
 */

type Chunk = { docId: string; title: string; source?: string; collectionId?: string | null };

/** The little mark before an article's name: the source's initial ("W" for Wikipedia), or the user's documents. */
export type ArticleMark = { kind: "letter"; letter: string } | { kind: "docs" };

export interface ResearchArticle {
  /** The article (docId): stable across sources events, the row's key. */
  key: string;
  title: string;
  mark: ArticleMark;
}

export interface ResearchArticles {
  shown: ResearchArticle[];
  /** Articles not listed ("+N"). */
  more: number;
  total: number;
}

/** Rows the card lists before "+N" (Boar's brief: 3-4 visible). */
export const MAX_ARTICLES = 3;

export function articleMark(chunk: Chunk): ArticleMark {
  if (chunk.collectionId) return { kind: "docs" };
  const name = sourceParts(chunk.source).name?.trim();
  const letter = name ? Array.from(name)[0]?.toLocaleUpperCase() : undefined;
  return letter ? { kind: "letter", letter } : { kind: "docs" };
}

/**
 * The articles among `sources`, first found first; up to `max` listed, the rest counted ("+N"). The
 * listed rows only ever grow while sources arrive: a later article never replaces or pushes one out
 * (a "+1" that would take the last row's place instead would make that row leave: a jump).
 * `from`: only the sources from that index on (a Deepen lists what its own search adds, not the first
 * answer's articles again; the engine appends, so sources[n - 1] never changes).
 */
export function researchArticles(sources: readonly Chunk[], max = MAX_ARTICLES, from = 0): ResearchArticles {
  const own = from > 0 ? sources.slice(from) : sources;
  const groups = groupSources(own as Chunk[]);
  const total = groups.length;
  const limit = Math.min(total, max);
  const shown = groups.slice(0, limit).map((g) => {
    const first = own[g.indexes[0]];
    return { key: g.key, title: g.title.trim() || "…", mark: articleMark(first) };
  });
  return { shown, more: total - limit, total };
}

/** How many articles (not passages) the sources hold: what "Reading N sources" counts. */
export function articleCount(sources: readonly Chunk[]): number {
  return groupSources(sources as Chunk[]).length;
}

/** Memo comparison: the card shows the same rows (researchArticles builds a new object each render). */
export function sameArticles(a: ResearchArticles | null, b: ResearchArticles | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.more === b.more && a.total === b.total && a.shown.length === b.shown.length && a.shown.every((x, i) => x.key === b.shown[i].key && x.title === b.shown[i].title);
}

/**
 * Whether a row grows in (Reveal) or shows in place: rows already there when the card mounted (a Deepen
 * starts with the first answer's articles, a recycled row remounts) show in place; later ones grow in.
 */
export function rowGrows(key: string, atMount: ReadonlySet<string>): boolean {
  return !atMount.has(key);
}

/**
 * The count-only "Found N passages" line under the text while it streams is replaced by the article
 * strip; neither shows while the steps card is on screen, which already lists the articles (no two
 * lists of the same thing). Once the answer is done the sources card takes the slot as before.
 */
export function liveStripShown(cardMode: "found" | "related" | "cited" | "all", stepsCardOnScreen: boolean): boolean {
  return cardMode !== "found" || !stepsCardOnScreen;
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

type T = (key: string, opts?: Record<string, unknown>) => string;

/** The strip's one spoken name: "Sources: Greenhouse effect, Climate change and 3 more" (read on focus, never announced). */
export function articlesSpoken(list: ResearchArticles, t: T): string {
  const names = list.shown.map((a) => a.title).join(", ");
  return list.more > 0 ? t("chat.research.spokenMore", { names, count: list.more }) : t("chat.research.spoken", { names });
}
