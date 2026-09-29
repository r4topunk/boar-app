import { describe, expect, it } from "vitest";
import en from "../../i18n/locales/en.json";
import pt from "../../i18n/locales/pt.json";
import type { AnswerState } from "./answerReducer";
import { answerReducer, initialAnswer } from "./answerReducer";
import type { AnswerEvent, SourceChunk } from "./answerEvents";
import { articleCount, articleMark, articlesSpoken, deepSourcesFrom, liveStripShown, MAX_ARTICLES, researchArticles, rowGrows, sameArticles } from "./liveResearch";
import { phaseAnnouncement } from "./presentation";

const t = (key: string, opts?: Record<string, unknown>) => (opts ? `${key}${JSON.stringify(opts)}` : key);
const wiki = (title: string) => `Wikipedia — https://en.wikipedia.org/wiki/${title.replace(/ /g, "_")} (CC BY-SA 4.0)`;
const chunk = (docId: string, n = 0, title = docId): SourceChunk => ({
  chunkId: `${docId}#${n}`,
  docId,
  title,
  body: "b",
  source: wiki(title),
  score: 0,
  matchType: "hybrid",
});

describe("researchArticles (LIVE_RESEARCH)", () => {
  it("one row per article, first found first, passages folded", () => {
    const list = researchArticles([chunk("Greenhouse effect"), chunk("Climate change"), chunk("Greenhouse effect", 1)]);
    expect(list.shown.map((a) => a.title)).toEqual(["Greenhouse effect", "Climate change"]);
    expect(list).toMatchObject({ more: 0, total: 2 });
  });

  it("lists up to 3, then counts the rest; one left over is '+1', never a row that would later leave", () => {
    const four = ["A", "B", "C", "D"].map((d) => chunk(d));
    expect(researchArticles(four)).toMatchObject({ more: 1, total: 4 });
    expect(researchArticles(four).shown).toHaveLength(MAX_ARTICLES);
    const six = [...four, chunk("E"), chunk("F")];
    expect(researchArticles(six)).toMatchObject({ more: 3, total: 6 });
  });

  it("rows only grow as sources arrive in several events: the listed ones never move", () => {
    let s = initialAnswer("a");
    const ev = (sources: SourceChunk[]): AnswerEvent => ({ type: "sources", answerId: "a", tier: "fast", sources });
    const seen: string[][] = [];
    for (const batch of [[chunk("A")], [chunk("A"), chunk("B")], [chunk("B", 1), chunk("C"), chunk("D"), chunk("E")]]) {
      s = answerReducer(s, ev(batch));
      seen.push(researchArticles(s.sources).shown.map((a) => a.key));
    }
    expect(seen).toEqual([["A"], ["A", "B"], ["A", "B", "C"]]);
    for (let i = 1; i < seen.length; i++) expect(seen[i].slice(0, seen[i - 1].length)).toEqual(seen[i - 1]);
    expect(researchArticles(s.sources).more).toBe(2);
  });

  it("a single sources event (today's engine) gives the same rows as the same sources spread over events", () => {
    const all = [chunk("A"), chunk("B"), chunk("A", 1), chunk("C")];
    const once = answerReducer(initialAnswer("a"), { type: "sources", answerId: "a", tier: "fast", sources: all });
    let spread = initialAnswer("a");
    for (const c of all) spread = answerReducer(spread, { type: "sources", answerId: "a", tier: "fast", sources: [c] });
    expect(researchArticles(spread.sources)).toEqual(researchArticles(once.sources));
  });

  it("a Deepen lists only what its own search appended (full list so far, new items at the end)", () => {
    const fast = [chunk("A"), chunk("B")];
    let s = answerReducer(initialAnswer("a"), { type: "sources", answerId: "a", tier: "fast", sources: fast });
    const from = deepSourcesFrom(null, true, s.sources.length)!;
    expect(researchArticles(s.sources, MAX_ARTICLES, from)).toMatchObject({ shown: [], total: 0 });
    // Sub-question 1 re-finds A (same chunk: merged away) and adds C; sub-question 2 sends the full list plus D.
    s = answerReducer(s, { type: "sources", answerId: "a", tier: "deep", sources: [chunk("A"), chunk("C")] });
    expect(researchArticles(s.sources, MAX_ARTICLES, from).shown.map((a) => a.key)).toEqual(["C"]);
    s = answerReducer(s, { type: "sources", answerId: "a", tier: "deep", sources: [chunk("A"), chunk("C"), chunk("D")] });
    expect(researchArticles(s.sources, MAX_ARTICLES, from).shown.map((a) => a.key)).toEqual(["C", "D"]);
  });

  it("deepSourcesFrom holds the count seen when the deep pass shows up", () => {
    expect(deepSourcesFrom(null, false, 4)).toBeNull();
    expect(deepSourcesFrom(null, true, 4)).toBe(4);
    expect(deepSourcesFrom(4, true, 9)).toBe(4);
    expect(deepSourcesFrom(4, false, 9)).toBe(4);
  });

  it("an empty title never leaves an empty row", () => {
    expect(researchArticles([{ ...chunk("x"), title: "  " }]).shown[0].title).toBe("…");
  });
});

describe("articleMark", () => {
  it("the source's initial, the user's documents, or the documents icon when unnamed", () => {
    expect(articleMark(chunk("A"))).toEqual({ kind: "letter", letter: "W" });
    expect(articleMark({ ...chunk("A"), collectionId: "mine" })).toEqual({ kind: "docs" });
    expect(articleMark({ ...chunk("A"), source: undefined })).toEqual({ kind: "docs" });
    expect(articleMark({ ...chunk("A"), source: "übersicht pack — https://x.org/a" })).toEqual({ kind: "letter", letter: "Ü" });
  });
});

describe("articleCount / sameArticles / rowGrows", () => {
  it("counts articles, not passages", () => {
    expect(articleCount([chunk("A"), chunk("A", 1), chunk("B")])).toBe(2);
    expect(articleCount([])).toBe(0);
  });

  it("same rows compare equal across renders (the card's memo holds while tokens stream)", () => {
    const s = [chunk("A"), chunk("B")];
    expect(sameArticles(researchArticles(s), researchArticles([...s]))).toBe(true);
    expect(sameArticles(researchArticles(s), researchArticles([...s, chunk("C")]))).toBe(false);
    expect(sameArticles(null, null)).toBe(true);
    expect(sameArticles(null, researchArticles(s))).toBe(false);
  });

  it("rows there at mount show in place; later ones grow in", () => {
    const atMount = new Set(["A"]);
    expect(rowGrows("A", atMount)).toBe(false);
    expect(rowGrows("B", atMount)).toBe(true);
  });
});

describe("liveStripShown (no two lists of the same articles)", () => {
  it("hides the running strip while the steps card lists the articles", () => {
    expect(liveStripShown("found", true)).toBe(false);
    expect(liveStripShown("found", false)).toBe(true);
  });
  it("never hides the finished sources card", () => {
    for (const mode of ["related", "cited", "all"] as const) expect(liveStripShown(mode, true)).toBe(true);
  });
});

describe("articlesSpoken", () => {
  it("names the listed articles and counts the rest, in one label", () => {
    expect(articlesSpoken(researchArticles([chunk("A"), chunk("B")]), t)).toBe('chat.research.spoken{"names":"A, B"}');
    const five = ["A", "B", "C", "D", "E"].map((d) => chunk(d));
    expect(articlesSpoken(researchArticles(five), t)).toBe('chat.research.spokenMore{"names":"A, B, C","count":2}');
  });
});

describe("the 'answering' announcement says what it rests on, once", () => {
  const writing = (sources: SourceChunk[], extra: Partial<AnswerState> = {}): AnswerState => ({ answerIds: ["a"], sources, fast: { text: "x", stage: "generating" }, ...extra });
  it("with the article count, or plain without sources", () => {
    expect(phaseAnnouncement("generating", writing([chunk("A"), chunk("A", 1), chunk("B")]), t)).toEqual({ message: 'chat.announce.answeringFrom{"count":2}' });
    expect(phaseAnnouncement("generating", writing([]), t)).toEqual({ message: "chat.announce.answering" });
  });
  it("a places answer's sources are places, not articles", () => {
    const places = { places: [], coverage: "ok" } as unknown as AnswerState["places"];
    expect(phaseAnnouncement("generating", writing([chunk("A")], { places }), t)).toEqual({ message: "chat.announce.answering" });
  });
});

describe("live research copy (en/pt in sync)", () => {
  it("both locales have the same keys, with the counts and names they interpolate", () => {
    expect(Object.keys(pt.chat.research).sort()).toEqual(Object.keys(en.chat.research).sort());
    for (const d of [en, pt]) {
      expect(d.chat.research.more_other).toContain("{{count}}");
      expect(d.chat.research.spokenMore_other).toMatch(/\{\{names\}\}[\s\S]*\{\{count\}\}/);
      expect(d.chat.announce.answeringFrom_one).toContain("{{count}}");
      expect(d.chat.announce.answeringFrom_other).toContain("{{count}}");
      // Little text: the one status line fits a row of the card.
      expect(d.chat.research.none.length).toBeLessThanOrEqual(28);
    }
  });
});
