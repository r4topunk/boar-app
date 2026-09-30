/**
 * Adversarial travel retrieval: questions from the review rounds of the Wikivoyage destination rule (#34), each with
 * what must happen on the real pack: which guide comes first, or which guides must not be named first (via "title").
 * Skipped unless BOAR_EVAL_PACK points at the Wikivoyage pack:
 *
 *   BOAR_EVAL_PACK=/path/boar-wikivoyage-en.sqlite npx vitest run eval/retrieval/adversarial.test.ts
 *
 * Writes eval/retrieval/results/<pack>-adversarial.json and fails on any non-borderline miss.
 */
import { describe, expect, it } from "vitest";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { decompress } from "fzstd";
import { nodeSqliteDatabase } from "../../src/rag/testing/nodeSqlite";
import { WikiPack } from "../../src/rag/wikiPack";

const PACK = process.env.BOAR_EVAL_PACK;
const QUESTIONS = "eval/retrieval/questions.travel.adversarial.jsonl";

interface Expect {
  first?: string;
  firstPrefix?: string;
  notNamed?: string[];
  inTop?: Record<string, number>;
}
interface Case {
  id: string;
  group: string;
  query: string;
  expect: Expect;
  note?: string;
  borderline?: boolean;
}

describe.skipIf(!PACK)("adversarial travel retrieval (Wikivoyage destination rule)", () => {
  it("each question gets its expected first guide and names no unexpected guide first", async () => {
    const pack = await WikiPack.open(nodeSqliteDatabase(PACK!) as any, decompress);
    const cases: Case[] = readFileSync(QUESTIONS, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
    const rows = [];
    for (const c of cases) {
      const hits = await pack.search(c.query, { k: 6 });
      const articles = [...new Set(hits.map((h) => h.title))];
      const named = [...new Set(hits.filter((h) => h.via === "title").map((h) => h.title))];
      const fails: string[] = [];
      const e = c.expect;
      if (e.first && articles[0] !== e.first) fails.push(`first ${articles[0] ?? "-"}, expected ${e.first}`);
      if (e.firstPrefix && !(articles[0] ?? "").startsWith(e.firstPrefix)) fails.push(`first ${articles[0] ?? "-"}, expected ${e.firstPrefix}…`);
      for (const t of e.notNamed ?? []) if (named.includes(t)) fails.push(`${t} named first`);
      for (const [t, k] of Object.entries(e.inTop ?? {})) {
        const rank = articles.indexOf(t);
        if (rank < 0 || rank >= k) fails.push(`${t} at ${rank < 0 ? "-" : `#${rank + 1}`}, expected top ${k}`);
      }
      rows.push({ id: c.id, group: c.group, query: c.query, first: articles[0] ?? null, named, pass: fails.length === 0, fails, borderline: !!c.borderline, note: c.note });
    }
    const dir = "eval/retrieval/results";
    mkdirSync(dir, { recursive: true });
    const out = join(dir, `${basename(PACK!, ".sqlite")}-adversarial.json`);
    writeFileSync(out, JSON.stringify({ pack: basename(PACK!), n: rows.length, passed: rows.filter((r) => r.pass).length, measuredAt: new Date().toISOString(), rows }, null, 2) + "\n");
    console.log(rows.map((r) => `${r.pass ? "ok  " : r.borderline ? "bord" : "FAIL"} ${r.id} [${r.group}] ${r.query} -> ${r.first ?? "-"}${r.named.length ? ` (named: ${r.named.join(", ")})` : ""}${r.fails.length ? ` | ${r.fails.join("; ")}` : ""}`).join("\n"));
    expect(rows.filter((r) => !r.pass && !r.borderline).map((r) => `${r.id}: ${r.fails.join("; ")}`)).toEqual([]);
  }, 300000);
});
