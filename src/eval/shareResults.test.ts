import { describe, it, expect } from "vitest";
import {
  buildSubmission,
  describeChipset,
  describeCores,
  inferenceFeatures,
  parseCpuFeatures,
  shareOutcome,
  signedMessage,
  submitResultsUrl,
} from "./shareResults.pure";
import type { EvalResultRow } from "./evalHarness.pure";

const row = (queryId: string) =>
  ({ runId: "eval-1", evalSetVersion: "1", queryId, configId: "model:qwen", outcome: "success" }) as EvalResultRow;

describe("submitResultsUrl", () => {
  it("is null without a URL or a key, so the app shows no share button", () => {
    expect(submitResultsUrl(undefined, "k")).toBeNull();
    expect(submitResultsUrl("https://x.supabase.co", "")).toBeNull();
  });

  it("points at the submit-results function, with or without a trailing slash", () => {
    expect(submitResultsUrl("https://x.supabase.co/", "k")).toBe("https://x.supabase.co/functions/v1/submit-results");
    expect(submitResultsUrl("https://x.supabase.co", "k")).toBe("https://x.supabase.co/functions/v1/submit-results");
  });
});

describe("buildSubmission", () => {
  it("takes the run id and set version from the rows and sends every row", () => {
    const s = buildSubmission([row("a"), row("b")], { platform: "android", osVersion: "15", brand: "POCO", model: "X6", ramBytes: 12e9 }, "1.0.0");
    expect(s).toEqual({
      run: { runId: "eval-1", evalSetVersion: "1", appVersion: "1.0.0", platform: "android", osVersion: "15", deviceBrand: "POCO", deviceModel: "X6", ramBytes: 12e9 },
      rows: [row("a"), row("b")],
    });
  });

  it("sends the chipset and CPU details, and leaves out empty chipset names", () => {
    const run = buildSubmission(
      [row("a")],
      { platform: "android", soc: "", hardware: "mt6897", cpuCores: 8, cpuFeatures: ["i8mm"], coreMaxFreqKHz: [2200000, 3350000], apiLevel: 35 },
      "1"
    ).run;
    expect(run).toMatchObject({ soc: undefined, hardware: "mt6897", cpuCores: 8, cpuFeatures: ["i8mm"], coreMaxFreqKHz: [2200000, 3350000], apiLevel: 35 });
  });

  it("leaves out a RAM figure the device couldn't read", () => {
    expect(buildSubmission([row("a")], { platform: "android", ramBytes: 0 }, "1").run.ramBytes).toBeUndefined();
  });
});

describe("shareOutcome", () => {
  it.each([
    [201, "shared"],
    [409, "already-shared"],
    [429, "rate-limited"],
    [400, "rejected"],
    [401, "rejected"],
    [412, "rejected"],
    [500, "failed"],
    [503, "failed"],
    [0, "failed"],
  ] as const)("%i -> %s", (status, result) => {
    expect(shareOutcome(status).result).toBe(result);
  });

  it("tells the cooldown from the daily limit and keeps the time the server gave", () => {
    const at = "2026-09-29T16:23:54.043438+00:00";
    expect(shareOutcome(429, { error: "cooldown", retryAt: at })).toEqual({ result: "cooldown", retryAt: at });
    expect(shareOutcome(429, { error: "rate_limited", retryAt: at })).toEqual({ result: "rate-limited", retryAt: at });
    expect(shareOutcome(429, { error: "rate_limited", retryAt: "soon" })).toEqual({ result: "rate-limited", retryAt: undefined });
    expect(shareOutcome(429, null)).toEqual({ result: "rate-limited", retryAt: undefined });
    expect(shareOutcome(429, { error: "network_limited" })).toEqual({ result: "network-limited" });
  });
});

describe("signedMessage", () => {
  it("is the challenge, a dot, then the exact payload the server receives", () => {
    expect(signedMessage("abc", '{"run":{}}')).toBe('abc.{"run":{}}');
  });
});

describe("hardware descriptions", () => {
  it("splits the cpuinfo Features line", () => {
    expect(parseCpuFeatures("fp asimd  asimddp i8mm\n")).toEqual(["fp", "asimd", "asimddp", "i8mm"]);
    expect(parseCpuFeatures(undefined)).toEqual([]);
  });

  it("names the chipset, or the board when Android doesn't say", () => {
    expect(describeChipset({ platform: "android", soc: "MT6897", socManufacturer: "Mediatek" })).toBe("Mediatek MT6897");
    expect(describeChipset({ platform: "android", hardware: "qcom" })).toBe("qcom");
    expect(describeChipset({ platform: "android" })).toBeUndefined();
  });

  it("groups cores by top frequency, fastest first", () => {
    expect(describeCores([2200000, 2200000, 2200000, 2200000, 3200000, 3200000, 3200000, 3350000])).toBe(
      "1 × 3.35 GHz + 3 × 3.2 GHz + 4 × 2.2 GHz"
    );
    expect(describeCores([0, 0])).toBeUndefined();
  });

  it("reports i8mm and dotprod, the features llama.cpp gains most from", () => {
    expect(inferenceFeatures(["fp", "asimddp", "i8mm"])).toEqual({ i8mm: true, dotprod: true });
    expect(inferenceFeatures(["fp", "asimd"])).toEqual({ i8mm: false, dotprod: false });
    expect(inferenceFeatures([])).toBeUndefined();
  });
});
