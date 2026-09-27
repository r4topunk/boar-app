import { describe, expect, it } from "vitest";
import { checkPtTopic } from "./pt-topic-check.mjs";

describe("checkPtTopic", () => {
  it("fails the Walipini / hurricane matches", () => {
    expect(checkPtTopic({ queryId: "ptt-002", answer: "…", retrievedTitles: ["Appropedia: Walipini"] }).pass).toBe(false);
    expect(checkPtTopic({ queryId: "ptt-001", answer: "…", retrievedTitles: ["2005 Atlantic hurricane season"] }).pass).toBe(false);
  });
  it("passes an on-topic source or an honest refusal", () => {
    expect(checkPtTopic({ queryId: "ptt-001", answer: "As estações existem pela inclinação do eixo [1].", retrievedTitles: ["Season"], citedTitles: ["Season"] }).pass).toBe(true);
    expect(checkPtTopic({ queryId: "ptt-002", answer: "Não encontrei uma fonte offline confiável sobre isso.", retrievedTitles: [] }).pass).toBe(true);
  });
  it("fails a sourceless answer that does not say it has no source", () => {
    expect(checkPtTopic({ queryId: "ptt-002", answer: "Por causa da inclinação do eixo da Terra.", retrievedTitles: [] }).pass).toBe(false);
  });
});
