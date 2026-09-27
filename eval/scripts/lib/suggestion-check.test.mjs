import { describe, expect, it } from "vitest";
import { checkSuggestion, suggestionId } from "./suggestion-check.mjs";

const id = (lang) => suggestionId("Why do we have seasons on Earth?", lang);

describe("checkSuggestion", () => {
  it("passes when the search top-3 has an on-topic source, in EN and PT", () => {
    expect(checkSuggestion({ queryId: id("en"), rawRetrievedTitles: ["Tickling", "Season", "Moon"], retrievedTitles: ["Season"] }).pass).toBe(true);
    expect(checkSuggestion({ queryId: id("en"), rawRetrievedTitles: ["Season"], retrievedTitles: ["Regina Sorensen"] }).failures[0]).toMatch(/off-topic source shown/);
    expect(checkSuggestion({ queryId: id("pt"), rawRetrievedTitles: ["Axial tilt"] }).pass).toBe(true);
  });
  it("fails when the on-topic source is only 4th or later", () => {
    const r = checkSuggestion({ queryId: id("en"), rawRetrievedTitles: ["Dean Lee", "Tickling", "Moon", "Season"] });
    expect(r.pass).toBe(false);
    expect(r.failures[0]).toMatch(/no on-topic source in the search top-3/);
  });
  it("math may skip search but must give the number, and must not show off-topic sources (gate 715ffdd)", () => {
    const f = (lang) => suggestionId("What is 30 °C in Fahrenheit?", lang);
    expect(checkSuggestion({ queryId: f("en"), rawRetrievedTitles: ["Tent"], retrievedTitles: [], answer: "30 °C is 86 °F." }).pass).toBe(true);
    expect(checkSuggestion({ queryId: f("en"), rawRetrievedTitles: ["Tent"], retrievedTitles: [], answer: "I didn't find a good source for this in the offline library, so I won't answer from memory." }).failures[0]).toMatch(/lacks the expected result/);
    expect(checkSuggestion({ queryId: f("pt"), rawRetrievedTitles: ["Extremely high frequency"], retrievedTitles: ["Extremely high frequency"], answer: "30 °C é igual a 86 °F [1]." }).failures[0]).toMatch(/off-topic source shown/);
    expect(checkSuggestion({ queryId: id("en"), rawRetrievedTitles: [] }).failures).toEqual(["search returned nothing"]);
  });
  it("fails a suggestion without a rule, so an edited question cannot pass silently", () => {
    expect(checkSuggestion({ queryId: suggestionId("What is a black hole?", "en"), rawRetrievedTitles: ["Black hole"] }).failures[0]).toMatch(/no topic rule/);
  });
  it("ignores rows that are not suggestions", () => {
    expect(checkSuggestion({ queryId: "safety-001" })).toBeNull();
  });

  it("uses the tree's declared expected titles (SUGGESTION_SOURCES) when the row carries them", () => {
    const suggestion = { key: "q5", corpus: ["builtin"], expect: ["Photosynthesis"] };
    const qid = suggestionId("How does photosynthesis work?", "pt");
    expect(checkSuggestion({ queryId: qid, suggestion, rawRetrievedTitles: ["Chlorophyll", "Photosynthesis"], retrievedTitles: ["Photosynthesis"] }).pass).toBe(true);
    expect(checkSuggestion({ queryId: qid, suggestion, rawRetrievedTitles: ["Chlorophyll", "Leaf", "Plant", "Photosynthesis"], retrievedTitles: [] }).failures[0]).toMatch(/top-3/);
    // A declared word matches at a word start only ("Season" does not match "Preseason").
    const s1 = { key: "q1", corpus: ["wiki-vital5"], expect: ["Season", "Axial tilt"] };
    expect(checkSuggestion({ queryId: id("en"), suggestion: s1, rawRetrievedTitles: ["NFL preseason"], retrievedTitles: [] }).pass).toBe(false);
    expect(checkSuggestion({ queryId: id("en"), suggestion: s1, rawRetrievedTitles: ["Axial tilt"], retrievedTitles: ["Axial tilt"] }).pass).toBe(true);
  });
});
