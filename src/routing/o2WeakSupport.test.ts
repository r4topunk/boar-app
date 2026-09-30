/// <reference types="node" />
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { O2_COMPACT, o2Decide, o2Enabled, o2Kind, o2Message, setO2Override, type O2Passage } from "./o2WeakSupport";

// Lantern's O2 test set (rnd/lantern/o2/o2-testset.jsonl): question, the titles of the passages that went into the
// prompt, the bucket and the expected decision, plus what the Python reference decides (`reference`). The one case
// whose decision depends on passage text (fa-005, Elephant) carries its decisive sentence.
type Case = { case_id: string; question: string; passages: O2Passage[]; bucket: string; expected_o2: string; reference: "keep" | "refuse" };
const fixtures = join(__dirname, "testing", "fixtures");
const cases: Case[] = readFileSync(join(fixtures, "o2-testset.jsonl"), "utf8").trim().split("\n").map((l) => JSON.parse(l));
const decide = (c: Case) => o2Decide(c.question, c.passages).action;
const inBucket = (b: string) => cases.filter((c) => c.bucket === b);

describe("O2 test-set gates (exp-03 spec §5.1)", () => {
  it("A1: refuses at least 6 of the 7 must-refuse cases", () => {
    const cs = inBucket("must_refuse");
    expect(cs).toHaveLength(7);
    expect(cs.filter((c) => decide(c) === "refuse").length).toBeGreaterThanOrEqual(6);
  });

  it("A2: keeps all 7 must-keep cases", () => {
    const cs = inBucket("must_keep");
    expect(cs).toHaveLength(7);
    for (const c of cs) expect(decide(c), c.case_id).toBe("keep");
  });

  it("A3: keeps the 4 cases the existing gate already gets wrong (it must not make them worse)", () => {
    const cs = inBucket("gate_must_not_worsen");
    expect(cs).toHaveLength(4);
    for (const c of cs) expect(decide(c), c.case_id).toBe("keep");
  });

  it("decides every one of the 32 cases as the Python reference does", () => {
    expect(cases).toHaveLength(32);
    for (const c of cases) expect(decide(c), `${c.case_id}: ${c.question}`).toBe(c.reference);
  });
});

describe("O2 scope", () => {
  it("puts the same 20 of the 58 Vitalik-set questions in scope as the reference, with the same kind", () => {
    const qs: Array<{ id: string; query: string; kind: string | null }> = readFileSync(join(fixtures, "o2-scope-vitalik58.jsonl"), "utf8")
      .trim()
      .split("\n")
      .map((l) => JSON.parse(l));
    expect(qs).toHaveLength(58);
    for (const q of qs) expect(o2Kind(q.query), `${q.id}: ${q.query}`).toBe(q.kind);
    expect(qs.filter((q) => o2Kind(q.query)).length).toBe(20);
  });

  it("leaves causal questions out", () => {
    expect(o2Kind("Why did Terra collapse in 2022?")).toBeNull();
  });
});

describe("O2 rules", () => {
  it("no geographic containment: a region doesn't cover its country", () => {
    const d = o2Decide("What is Japan's population?", [{ title: "Kantō region", text: "The Kantō region is on Honshu, the largest island of Japan." }]);
    expect(d).toMatchObject({ action: "refuse", kind: "numeric", questionSubject: "Japan", passageSubject: "Kantō region" });
    expect(o2Decide("What is Japan's population?", [{ title: "Wikivoyage: Japan" }]).action).toBe("keep");
  });

  it("a passage that states the superlative over the class, unqualified, keeps; 'one of' or a narrower scope doesn't", () => {
    const q = "What is the tallest animal in the world?";
    expect(o2Decide(q, [{ title: "Giraffe", text: "The giraffe is the tallest living terrestrial animal." }]).action).toBe("keep");
    expect(o2Decide(q, [{ title: "Moose", text: "The moose is one of the tallest animals of the deer family." }]).action).toBe("refuse");
    expect(o2Decide(q, [{ title: "Moose", text: "The moose is the tallest animal in North America." }]).action).toBe("refuse");
  });

  it("fails open: no subject, and a Portuguese subject the lexicon doesn't name", () => {
    expect(o2Decide("how many are there?", [{ title: "Moose" }]).action).toBe("keep");
    expect(o2Decide("Qual é a população do Japão?", [{ title: "Kantō region" }], { pt: true, englishNames: [] }).action).toBe("keep");
    expect(o2Decide("Qual é a população do Japão?", [{ title: "Kantō region" }], { pt: true, englishNames: ["Japan"] }).action).toBe("refuse");
    expect(o2Decide("Qual é a população do Japão?", [{ title: "Japan" }], { pt: true, englishNames: ["Japan"] }).action).toBe("keep");
  });

  it("no passages is out of scope (the no-source gate decides)", () => {
    expect(o2Decide("What is Japan's population?", [])).toMatchObject({ inScope: false, action: "keep" });
  });

  it("the message says why when both subjects are known, else the existing line", () => {
    expect(o2Message(false, { questionSubject: "Japan", passageSubject: "Kantō region" })).toBe("The passages found are about Kantō region, not Japan.");
    expect(o2Message(true, { questionSubject: "Japan", passageSubject: "Kantō region" })).toBe("Os trechos encontrados falam de Kantō region, não de Japan.");
    expect(o2Message(false, { passageSubject: "Moose" })).toBe("The passages found don't support this answer.");
  });
});

describe("O2 switch", () => {
  it("is off unless the build turns it on; an evaluation run's arm overrides it until reset", () => {
    expect(O2_COMPACT).toBe(false);
    expect(o2Enabled()).toBe(false);
    setO2Override(true);
    expect(o2Enabled()).toBe(true);
    setO2Override(undefined);
    expect(o2Enabled()).toBe(false);
  });
});
