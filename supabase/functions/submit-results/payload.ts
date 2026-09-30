// The signed payload of a shared run: { run: {...}, rows: [<eval JSONL row>, ...] }, checked and
// turned into what submit_eval_run() stores. Anything malformed is refused or dropped here; the
// database then checks the questions, limits and plausibility.
const MAX_ROWS = 1000;
const MAX_ANSWER_CHARS = 8000;

const str = (v: unknown, max: number): string | null =>
  typeof v === "string" && v.length > 0 && v.length <= max ? v : null;
const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
const int = (v: unknown): number | null => {
  const n = num(v);
  return n !== null && Number.isInteger(n) && n >= 0 ? n : null;
};
const posInt = (v: unknown, max: number): number | null => {
  const n = int(v);
  return n !== null && n > 0 && n <= max ? n : null;
};
const bool = (v: unknown): boolean | null => (typeof v === "boolean" ? v : null);
/** Short lowercase CPU flags like "i8mm" or "asimddp", at most 100 of them. None (iOS reports no
 * flags) is unknown, not "no i8mm or dotprod", so it's stored as null. */
const cpuFlags = (v: unknown): string[] | null => {
  if (!Array.isArray(v)) return null;
  const flags = v.filter((f) => typeof f === "string" && /^[a-z0-9_]{1,32}$/.test(f)).slice(0, 100);
  return flags.length > 0 ? flags : null;
};
/** Core frequencies in kHz (0 = unknown), at most 64 cores. */
const freqs = (v: unknown): number[] | null =>
  Array.isArray(v) && v.length <= 64 && v.every((f) => Number.isInteger(f) && f >= 0 && f < 10_000_000) ? v : null;
/** A time in milliseconds: finite, not negative, under a day. */
const ms = (v: unknown): number | null => {
  const n = num(v);
  return n !== null && n >= 0 && n < 86_400_000 ? n : null;
};

export type Parsed = { run: Record<string, unknown>; rows: Record<string, unknown>[] } | { error: string };

export function parsePayload(payload: string, platform: "android" | "ios"): Parsed {
  let body: any;
  try {
    body = JSON.parse(payload);
  } catch {
    return { error: "payload is not JSON" };
  }
  const run = body?.run ?? {};
  const rows: unknown[] = Array.isArray(body?.rows) ? body.rows : [];
  const runId = str(run.runId, 100);
  const evalSetVersion = str(run.evalSetVersion, 20);
  const appVersion = str(run.appVersion, 40);
  if (!runId || !evalSetVersion || !appVersion) {
    return { error: "run.runId, run.evalSetVersion and run.appVersion are required" };
  }
  // The platform comes from the attested key, not from what the payload claims.
  if (run.platform !== platform) return { error: "run.platform doesn't match the device" };
  if (rows.length === 0 || rows.length > MAX_ROWS) return { error: `rows must hold 1 to ${MAX_ROWS} items` };

  const records = [];
  for (const r of rows as any[]) {
    const queryId = str(r?.queryId, 100);
    const configId = str(r?.configId, 200);
    const outcome = str(r?.outcome, 40);
    if (!queryId || !configId || !outcome) return { error: "each row needs queryId, configId and outcome" };
    if (r.runId !== undefined && r.runId !== runId) return { error: "rows belong to another run" };
    const data = { ...r };
    if (typeof data.answer === "string") data.answer = data.answer.slice(0, MAX_ANSWER_CHARS);
    // The fields compute_eval_scores casts: anything malformed becomes null instead of failing the run
    // (tokensGenerated becomes a Postgres int, so at most 2^31 - 1).
    const tokens = int(r.tokensGenerated);
    data.tokensGenerated = tokens !== null && tokens <= 2_147_483_647 ? tokens : null;
    data.peakRssBytes = int(r.peakRssBytes);
    data.timedOut = bool(r.timedOut);
    data.expectedKbHit = bool(r.expectedKbHit);
    data.configLabel = str(r.configLabel, 200);
    const tokPerSec = num(r.tokPerSec);
    records.push({
      query_id: queryId,
      config_id: configId,
      model_id: str(r.modelId, 200),
      outcome,
      ttft_ms: ms(r.ttftMs),
      tok_per_sec: tokPerSec !== null && tokPerSec >= 0 && tokPerSec < 100_000 ? tokPerSec : null,
      total_latency_ms: ms(r.totalLatencyMs),
      data,
    });
  }

  return {
    run: {
      run_id: runId,
      eval_set_version: evalSetVersion,
      app_version: appVersion,
      platform,
      os_version: str(run.osVersion, 40),
      device_brand: str(run.deviceBrand, 80),
      device_model: str(run.deviceModel, 80),
      soc: str(run.soc, 80),
      soc_manufacturer: str(run.socManufacturer, 80),
      hardware: str(run.hardware, 80),
      api_level: posInt(run.apiLevel, 1000),
      ram_bytes: posInt(run.ramBytes, 2 ** 43),
      cpu_cores: posInt(run.cpuCores, 256),
      cpu_features: cpuFlags(run.cpuFeatures),
      core_max_khz: freqs(run.coreMaxFreqKHz),
    },
    rows: records,
  };
}
