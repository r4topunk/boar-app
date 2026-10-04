import { describe, it, expect } from "vitest";

const ROUTE_GATE_SYSTEM_B5_LENGTH = ROUTE_GATE_SYSTEM.length;
import { BOAR_SELF_DESCRIPTION, gatedTaskType, routeGateMessages, routeGateVerdict, ROUTE_GATE_SYSTEM } from "./routeGate";

describe("routeGateMessages", () => {
  it("sends a single message as is, after the B4 system prompt", () => {
    expect(routeGateMessages("boa noite 🙂")).toEqual([
      { role: "system", content: ROUTE_GATE_SYSTEM },
      { role: "user", content: "boa noite 🙂" },
    ]);
    expect(ROUTE_GATE_SYSTEM.length).toBe(ROUTE_GATE_SYSTEM_B5_LENGTH);
    expect(ROUTE_GATE_SYSTEM).not.toMatch(/arithmetic|12 times 7/);
    expect(ROUTE_GATE_SYSTEM).toContain("Well-known facts too");
    expect(ROUTE_GATE_SYSTEM).toContain(`About BOAR (only for questions about the app itself): ${BOAR_SELF_DESCRIPTION}`);
    expect(ROUTE_GATE_SYSTEM.endsWith("Reply with exactly one word: SEARCH or ANSWER.")).toBe(true);
  });

  it("folds history into one user message (the measured format)", () => {
    const m = routeGateMessages("e quanto custa?", { turns: [{ role: "user", text: "como ir a Pai?" }, { role: "assistant", text: "De ônibus." }] });
    expect(m[1].content).toBe("Conversation so far:\nuser: como ir a Pai?\nassistant: De ônibus.\n\nLast message: e quanto custa?");
  });

  it("caps history to the last 6 turns and 280 characters a turn", () => {
    const turns = Array.from({ length: 8 }, (_, i) => ({ role: (i % 2 ? "assistant" : "user") as "user" | "assistant", text: `t${i} ${"x".repeat(400)}` }));
    const user = routeGateMessages("ok?", { turns })[1].content;
    expect(user).not.toContain("t0 ");
    expect(user).not.toContain("t1 ");
    expect(user).toContain("t2 ");
    expect(user.split("\n").filter((l) => l.startsWith("user:") || l.startsWith("assistant:")).every((l) => l.length <= 292)).toBe(true);
  });
});

describe("routeGateVerdict", () => {
  it("scores p(SEARCH) / (p(SEARCH) + p(ANS)) at 0.5", () => {
    expect(routeGateVerdict([{ token: "ANS", prob: 0.9 }, { token: "SEARCH", prob: 0.05 }])).toMatchObject({ decision: "answer" });
    expect(routeGateVerdict([{ token: "SEARCH", prob: 0.6 }, { token: "ANS", prob: 0.3 }]).score).toBeCloseTo(2 / 3);
    expect(routeGateVerdict([{ token: "SEARCH", prob: 0.5 }, { token: "ANS", prob: 0.5 }]).decision).toBe("search");
  });

  it("reads llama.rn rc.4 one-hot / truncated probabilities the same way", () => {
    expect(routeGateVerdict([{ token: "ANS", prob: 1 }, { token: "SEARCH", prob: 0 }]).decision).toBe("answer");
    expect(routeGateVerdict([{ token: "SEARCH", prob: 1 }]).decision).toBe("search");
  });

  it("searches when neither label is in the top N", () => {
    expect(routeGateVerdict([{ token: "Hello", prob: 0.9 }])).toEqual({ decision: "search", score: null, labelMass: 0 });
    expect(routeGateVerdict([])).toEqual({ decision: "search", score: null, labelMass: 0 });
  });
});

describe("gatedTaskType", () => {
  it("answer: conversation, unless the rule type already skips retrieval", () => {
    expect(gatedTaskType("chat", "answer")).toBe("conversation");
    expect(gatedTaskType("lookup", "answer")).toBe("conversation");
    expect(gatedTaskType("translate", "answer")).toBe("translate");
    expect(gatedTaskType("greeting", "answer")).toBe("greeting");
  });
  it("search: the rule type, as chat when that type would skip retrieval", () => {
    expect(gatedTaskType("lookup", "search")).toBe("lookup");
    expect(gatedTaskType("compare", "search")).toBe("compare");
    expect(gatedTaskType("greeting", "search")).toBe("chat");
    expect(gatedTaskType("conversation", "search")).toBe("chat");
  });
});
