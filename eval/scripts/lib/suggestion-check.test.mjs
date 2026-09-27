import { describe, expect, it } from "vitest";
import { checkSuggestion, suggestionId } from "./suggestion-check.mjs";

const id = (lang) => suggestionId("Why do we have seasons on Earth?", lang);

describe("checkSuggestion", () => {
  it("passes when the search top-3 has an on-topic source, in EN and PT", () => {
    expect(checkSuggestion({ queryId: id("en"), rawRetrievedTitles: ["Tickling", "Season", "Moon"] }).pass).toBe(true);
    expect(checkSuggestion({ queryId: id("pt"), rawRetrievedTitles: ["Axial tilt"] }).pass).toBe(true);
  });
  it("fails when the on-topic source is only 4th or later", () => {
    const r = checkSuggestion({ queryId: id("en"), rawRetrievedTitles: ["Dean Lee", "Tickling", "Moon", "Season"] });
    expect(r.pass).toBe(false);
    expect(r.failures[0]).toMatch(/no on-topic source in the search top-3/);
  });
  it("math may skip search; other questions may not", () => {
    expect(checkSuggestion({ queryId: suggestionId("What is 30 °C in Fahrenheit?", "en"), rawRetrievedTitles: [] }).pass).toBe(true);
    expect(checkSuggestion({ queryId: id("en"), rawRetrievedTitles: [] }).failures).toEqual(["search returned nothing"]);
  });
  it("fails a suggestion without a rule, so an edited question cannot pass silently", () => {
    expect(checkSuggestion({ queryId: suggestionId("What is a black hole?", "en"), rawRetrievedTitles: ["Black hole"] }).failures[0]).toMatch(/no topic rule/);
  });
  it("ignores rows that are not suggestions", () => {
    expect(checkSuggestion({ queryId: "safety-001" })).toBeNull();
  });
});
