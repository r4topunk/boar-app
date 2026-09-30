/// <reference types="node" />
import { describe, it, expect, beforeAll } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { decompress } from "fzstd";
import { nodeSqliteDatabase } from "./testing/nodeSqlite";
import { WikiPack } from "./wikiPack";

// The Wikivoyage destination rule (a guide a travel question names goes first) and its limits (Ricardo, #34):
// a capitalized word that happens to be a guide's name, in a question that isn't about travel, never goes first.
// Made-up, test-only documents; guides share the travel words, as real Wikivoyage guides do.
const filler = (topic: string) =>
  Array.from({ length: 6 }, (_, i) => `${topic} filler sentence number ${i} about unrelated matters.`).join(" ");
const guide = (page_id: number, title: string, sections: string[]) => ({
  page_id, title, source: "enwikivoyage",
  text: [`# ${title}`, "", `${title} is a destination. ${filler(title)}`, "", ...sections].join("\n"),
});
const rows = [
  guide(7e9 + 1, "Brazil", ["## Cope", "", "### Electricity", "", "Outlets accept flat and round plugs; the voltage is 127 V or 220 V depending on the state. " + filler("Power")]),
  // Distractors that repeat the question's words more than Brazil's own section does.
  ...["Australia", "Israel", "Philippines"].map((t, i) =>
    guide(7e9 + 10 + i, t, ["## Understand", "", "### Power", "", `${"The plug type and the mains voltage: plug adapters and voltage converters. ".repeat(3)}` + filler(t)])
  ),
  guide(7e9 + 20, "Como", ["## Understand", "", "Como is a lakeside city in Lombardy. " + filler("Lake")]),
  guide(7e9 + 21, "Darwin", ["## Understand", "", "Darwin is the capital of the Northern Territory, named after Charles Darwin. " + filler("Top End")]),
  {
    page_id: 900, title: "Burn", source: "enwiki", aliases: ["Queimadura", "Queimaduras"],
    text: `# Burn\n\nA burn is an injury to skin caused by heat. Cool the burn with running water for twenty minutes. ${filler("Burn")}`,
  },
  {
    page_id: 901, title: "Charles Darwin", source: "enwiki",
    text: `# Charles Darwin\n\nCharles Darwin was a naturalist who published On the Origin of Species in 1859. ${filler("Naturalist")}`,
  },
  {
    page_id: 902, title: "Plate tectonics", source: "enwiki",
    text: `# Plate tectonics\n\nMost earthquakes happen at plate boundaries, where plates collide. ${filler("Plates")}`,
  },
  {
    page_id: 903, title: "Photosynthesis", source: "enwiki",
    text: `# Photosynthesis\n\nPlants turn light, water and carbon dioxide into sugar and oxygen. ${filler("Leaf")}`,
  },
];

let pack: WikiPack;
beforeAll(async () => {
  const dir = mkdtempSync(join(tmpdir(), "boar-pack-dest-"));
  const shard = join(dir, "dest.jsonl");
  writeFileSync(shard, rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
  const out = join(dir, "dest.sqlite");
  execFileSync(process.execPath, ["scripts/build-wiki-pack.mjs", "--out", out, "--shards", shard, "--no-embed"], { stdio: "pipe" });
  pack = await WikiPack.open(nodeSqliteDatabase(out), decompress);
}, 60000);

const first = async (q: string) => (await pack.search(q))[0];

describe("Wikivoyage destination rule", () => {
  it("a practical travel question goes to the guide it names, not to guides repeating its words", async () => {
    const hit = await first("What plug type and voltage does Brazil use?");
    expect(hit?.title).toBe("Brazil");
  });

  it("a sentence-initial question word that is also a guide's name (PT 'Como') is not a destination", async () => {
    const hit = await first("Como tratar uma queimadura?");
    expect(hit?.title).toBe("Burn");
  });

  it("a person's name in a non-travel question doesn't bring the guide named after them", async () => {
    // "Darwin" alone resolves only to the Wikivoyage guide (the encyclopedia article is "Charles Darwin").
    const hits = await pack.search("When did Darwin publish On the Origin of Species?");
    expect(hits[0]?.title).toBe("Charles Darwin");
    expect(hits.some((h) => h.title === "Darwin")).toBe(false);
  });

  it("health and science questions never put a Wikivoyage guide first", async () => {
    for (const q of ["How do I treat a burn?", "Why do earthquakes happen at plate boundaries?", "How does photosynthesis work?", "When did Darwin publish his theory?"]) {
      const hit = await first(q);
      expect(hit?.source, q).not.toBe("enwikivoyage");
    }
  });

  it("the opening question word is never taken for a name, in a travel question too", async () => {
    const como = await pack.resolveTitle("Como", { fuzzy: false, source: "enwikivoyage" });
    for (const q of ["Como funciona a fotossíntese?", "Como tratar uma queimadura?", "Como pagar com cartão em Lisboa?"]) {
      const named = await pack.titlesInQuestion(q, await pack.stems(q));
      expect(named.map((n) => n.id), q).not.toContain(como);
    }
  });
});
