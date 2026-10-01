import { describe, it, expect } from "vitest";
import { isCoolEnough, parseBenchRequest, runOrder, summarize, toThermalState, type BenchRow } from "./modelBench.pure";

const base = { id: "base", n_ctx: 2048, n_threads: 4 };

describe("parseBenchRequest", () => {
  it("fills the defaults and keeps only known config fields", () => {
    const r = parseBenchRequest({ requestId: "b1", configs: [{ ...base, junk: 1, n_ubatch: 256 }] });
    expect(r).toEqual({
      requestId: "b1",
      configs: [{ id: "base", n_ctx: 2048, n_threads: 4, n_gpu_layers: 0, n_ubatch: 256 }],
      pp: 512,
      tg: 64,
      reps: 3,
      coolUntil: "nominal",
      coolMaxWaitMs: 180_000,
    });
  });

  it("rejects what would fail or hang on the phone", () => {
    expect(() => parseBenchRequest({ requestId: "b1", configs: [] })).toThrow(/non-empty/);
    expect(() => parseBenchRequest({ requestId: "b1", configs: [base, base] })).toThrow(/unique/);
    expect(() => parseBenchRequest({ requestId: "b1", configs: [{ ...base, n_threads: 0 }] })).toThrow(/n_threads/);
    expect(() => parseBenchRequest({ requestId: "b1", configs: [{ ...base, flash_attn_type: "yes" }] })).toThrow(/flash_attn_type/);
    expect(() => parseBenchRequest({ requestId: "b1", configs: [{ ...base, n_ctx: 512 }] })).toThrow(/pp \+ tg/);
    expect(() => parseBenchRequest({ requestId: "b1", configs: [{ ...base, cache_type_k: "q9" }] })).toThrow(/cache_type_k/);
    expect(() => parseBenchRequest({ requestId: "b1", configs: [base], coolUntil: "critical" })).toThrow(/coolUntil/);
  });
});

describe("runOrder", () => {
  it("runs every config once per rep and rotates the first one", () => {
    const order = runOrder(["a", "b", "c"], 3);
    expect(order.map((o) => o.configId).join("")).toBe("abcbcacab");
    expect(order.filter((o) => o.rep === 2).map((o) => o.configId)).toEqual(["c", "a", "b"]);
  });
});

describe("thermal", () => {
  it("waits for a warmer phone and never hangs on an unknown state", () => {
    expect(isCoolEnough("nominal", "nominal")).toBe(true);
    expect(isCoolEnough("fair", "nominal")).toBe(false);
    expect(isCoolEnough("fair", "fair")).toBe(true);
    expect(isCoolEnough("unknown", "nominal")).toBe(true);
    expect(toThermalState("serious")).toBe("serious");
    expect(toThermalState(3)).toBe("unknown");
  });
});

describe("summarize", () => {
  const row = (configId: string, ppTps: number | undefined, tgTps: number | undefined, extra: Partial<BenchRow> = {}): BenchRow => ({
    requestId: "b1",
    rep: 0,
    configId,
    config: { ...base, id: configId, n_gpu_layers: 0 },
    model: "m.gguf",
    ok: ppTps !== undefined,
    ppTps,
    tgTps,
    thermalBefore: "nominal",
    thermalAfter: "nominal",
    cooledMs: 0,
    power: null,
    startedAt: 0,
    ...extra,
  });

  it("takes the median per config and compares it with the baseline", () => {
    const rows = [
      row("base", 80, 16),
      row("base", 100, 18),
      row("base", 90, 17),
      row("t6", 99, 13.6),
      row("t6", 99, 13.6, { thermalBefore: "fair" }),
      row("t6", undefined, undefined, { error: "load failed" }),
    ];
    const [b, t6] = summarize(rows, "base");
    expect(b).toMatchObject({ configId: "base", n: 3, ppTps: 90, tgTps: 17, ppDelta: 0, tgDelta: 0 });
    expect(t6).toMatchObject({ configId: "t6", n: 2, failed: 1, ppTps: 99, warmStarts: 1 });
    expect(t6.ppDelta).toBeCloseTo(0.1);
    expect(t6.tgDelta).toBeCloseTo(-0.2);
  });

  it("leaves the deltas empty without a baseline", () => {
    expect(summarize([row("x", 10, 1)], "base")[0]).toMatchObject({ ppDelta: null, tgDelta: null });
  });
});
