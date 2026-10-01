/**
 * On-device model benchmark (llama.rn's bench(), the llama-bench twin), the pure half: the request a
 * development machine sends (scripts/bench-iphone.mjs), the order the configs run in, the rows saved,
 * and the summary. No React Native imports, so vitest covers it.
 *
 * It measures the model and its runtime settings only (threads, batch sizes, KV cache type, flash
 * attention, CPU vs Metal), not the answer pipeline: the goal is the fastest llama.rn configuration for
 * this phone. Thermal state is recorded on every row, and each run waits for the phone to cool down
 * first, so a hot phone doesn't pass for a slow configuration.
 */

export type ThermalState = "nominal" | "fair" | "serious" | "critical" | "unknown";

const THERMAL_ORDER: ThermalState[] = ["nominal", "fair", "serious", "critical"];

/** KV cache types llama.rn accepts. A quantized V cache needs flash attention on. */
export const CACHE_TYPES = ["f16", "f32", "q8_0", "q4_0", "q4_1", "iq4_nl", "q5_0", "q5_1"] as const;
export type CacheType = (typeof CACHE_TYPES)[number];

/** One llama.rn context configuration. Unset fields keep llama.rn's defaults. */
export interface BenchConfig {
  id: string;
  n_ctx: number;
  n_threads: number;
  n_batch?: number;
  n_ubatch?: number;
  cache_type_k?: CacheType;
  cache_type_v?: CacheType;
  flash_attn_type?: "auto" | "on" | "off";
  /** 0 = CPU only (the app's setting). Metal also needs the app launched without GGML_METAL_DEVICES=0. */
  n_gpu_layers: number;
}

export interface BenchRequest {
  requestId: string;
  /** Installed model id or filename fragment; default: the chat's active model. */
  model?: string;
  configs: BenchConfig[];
  /** Prompt tokens processed and tokens generated per run. */
  pp: number;
  tg: number;
  /** Runs per config. Configs are interleaved and rotated per rep, so thermal drift spreads evenly. */
  reps: number;
  /** Wait before each run until the phone is at most this warm (or maxWaitMs passes). */
  coolUntil: Exclude<ThermalState, "critical" | "unknown">;
  coolMaxWaitMs: number;
}

export interface PowerInfo {
  /** 0..1, -1 unknown. */
  batteryLevel: number;
  charging: boolean | null;
  lowPowerMode: boolean | null;
}

export interface BenchRow {
  requestId: string;
  rep: number;
  configId: string;
  config: BenchConfig;
  model: string;
  ok: boolean;
  error?: string;
  loadMs?: number;
  /** Tokens per second, from llama.rn's bench(). */
  ppTps?: number;
  tgTps?: number;
  thermalBefore: ThermalState;
  thermalAfter: ThermalState;
  /** How long the run waited for the phone to cool down. */
  cooledMs: number;
  power: PowerInfo | null;
  rssMbAfterLoad?: number;
  /** Backend llama.rn reported after the load (gpu: true when Metal took layers). */
  gpu?: boolean;
  startedAt: number;
}

export interface BenchStatus {
  requestId: string;
  state: "running" | "done" | "failed";
  completed: number;
  total: number;
  current?: string;
  thermal?: ThermalState;
  resultPath?: string;
  error?: string;
}

export const BENCH_DEFAULTS = { pp: 512, tg: 64, reps: 3, coolUntil: "nominal" as const, coolMaxWaitMs: 180_000 };

/** True when `state` is at most as warm as `limit`. Unknown counts as cool: the run must not hang on a phone that can't tell. */
export function isCoolEnough(state: ThermalState, limit: ThermalState): boolean {
  if (state === "unknown") return true;
  return THERMAL_ORDER.indexOf(state) <= THERMAL_ORDER.indexOf(limit);
}

export function toThermalState(raw: unknown): ThermalState {
  return typeof raw === "string" && (THERMAL_ORDER as string[]).includes(raw) ? (raw as ThermalState) : "unknown";
}

const isPosInt = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v > 0;

function parseConfig(raw: any, i: number): BenchConfig {
  if (!raw || typeof raw !== "object") throw new Error(`configs[${i}] is not an object`);
  if (typeof raw.id !== "string" || !raw.id) throw new Error(`configs[${i}].id is required`);
  if (!isPosInt(raw.n_ctx)) throw new Error(`configs[${i}].n_ctx must be a positive integer`);
  if (!isPosInt(raw.n_threads)) throw new Error(`configs[${i}].n_threads must be a positive integer`);
  for (const k of ["n_batch", "n_ubatch"] as const) {
    if (raw[k] !== undefined && !isPosInt(raw[k])) throw new Error(`configs[${i}].${k} must be a positive integer`);
  }
  if (raw.flash_attn_type !== undefined && !["auto", "on", "off"].includes(raw.flash_attn_type)) {
    throw new Error(`configs[${i}].flash_attn_type must be auto, on or off`);
  }
  const gpu = raw.n_gpu_layers ?? 0;
  if (!Number.isInteger(gpu) || gpu < 0) throw new Error(`configs[${i}].n_gpu_layers must be a non-negative integer`);
  const config: BenchConfig = { id: raw.id, n_ctx: raw.n_ctx, n_threads: raw.n_threads, n_gpu_layers: gpu };
  if (raw.n_batch !== undefined) config.n_batch = raw.n_batch;
  if (raw.n_ubatch !== undefined) config.n_ubatch = raw.n_ubatch;
  for (const k of ["cache_type_k", "cache_type_v"] as const) {
    if (raw[k] === undefined) continue;
    if (!(CACHE_TYPES as readonly string[]).includes(raw[k])) throw new Error(`configs[${i}].${k} must be one of ${CACHE_TYPES.join(", ")}`);
    config[k] = raw[k];
  }
  if (raw.flash_attn_type !== undefined) config.flash_attn_type = raw.flash_attn_type;
  return config;
}

/** Validates a request file. Throws with the first problem, so the device can report it instead of hanging. */
export function parseBenchRequest(raw: unknown): BenchRequest {
  const r = raw as any;
  if (!r || typeof r !== "object") throw new Error("request is not an object");
  if (typeof r.requestId !== "string" || !r.requestId) throw new Error("requestId is required");
  if (!Array.isArray(r.configs) || r.configs.length === 0) throw new Error("configs must be a non-empty array");
  const configs = r.configs.map(parseConfig);
  const ids = new Set(configs.map((c: BenchConfig) => c.id));
  if (ids.size !== configs.length) throw new Error("config ids must be unique");
  const pp = r.pp ?? BENCH_DEFAULTS.pp;
  const tg = r.tg ?? BENCH_DEFAULTS.tg;
  const reps = r.reps ?? BENCH_DEFAULTS.reps;
  if (!isPosInt(pp) || !isPosInt(tg) || !isPosInt(reps)) throw new Error("pp, tg and reps must be positive integers");
  for (const c of configs) {
    if (c.n_ctx < pp + tg) throw new Error(`config ${c.id}: n_ctx ${c.n_ctx} is smaller than pp + tg (${pp + tg})`);
  }
  const coolUntil = r.coolUntil ?? BENCH_DEFAULTS.coolUntil;
  if (!["nominal", "fair", "serious"].includes(coolUntil)) throw new Error("coolUntil must be nominal, fair or serious");
  const coolMaxWaitMs = r.coolMaxWaitMs ?? BENCH_DEFAULTS.coolMaxWaitMs;
  if (typeof coolMaxWaitMs !== "number" || coolMaxWaitMs < 0) throw new Error("coolMaxWaitMs must be >= 0");
  const request: BenchRequest = { requestId: r.requestId, configs, pp, tg, reps, coolUntil, coolMaxWaitMs };
  if (typeof r.model === "string" && r.model) request.model = r.model;
  return request;
}

/**
 * Run order: every config once per rep, and each rep starts one config later than the previous one
 * (a Latin-square-like rotation). A config therefore never always runs first (cold) or last (hot).
 */
export function runOrder(configIds: string[], reps: number): Array<{ rep: number; configId: string }> {
  const out: Array<{ rep: number; configId: string }> = [];
  const n = configIds.length;
  for (let rep = 0; rep < reps; rep++) {
    for (let i = 0; i < n; i++) out.push({ rep, configId: configIds[(i + rep) % n] });
  }
  return out;
}

export function rowsToJsonl(rows: BenchRow[]): string {
  return rows.map((r) => JSON.stringify(r)).join("\n") + (rows.length ? "\n" : "");
}

const median = (xs: number[]): number | null => {
  if (!xs.length) return null;
  const v = [...xs].sort((a, b) => a - b);
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
};

export interface BenchSummaryRow {
  configId: string;
  n: number;
  failed: number;
  ppTps: number | null;
  tgTps: number | null;
  /** Relative to the baseline config: +0.12 = 12% faster. null without a baseline or data. */
  ppDelta: number | null;
  tgDelta: number | null;
  /** Runs that started warmer than "nominal": their numbers may be thermally limited. */
  warmStarts: number;
}

/** Median tok/s per config, against `baselineId` (the app's current settings). Order follows first appearance. */
export function summarize(rows: BenchRow[], baselineId: string): BenchSummaryRow[] {
  const ids = [...new Set(rows.map((r) => r.configId))];
  const stat = (id: string) => {
    const mine = rows.filter((r) => r.configId === id);
    const ok = mine.filter((r) => r.ok);
    return {
      n: ok.length,
      failed: mine.length - ok.length,
      ppTps: median(ok.flatMap((r) => (typeof r.ppTps === "number" ? [r.ppTps] : []))),
      tgTps: median(ok.flatMap((r) => (typeof r.tgTps === "number" ? [r.tgTps] : []))),
      warmStarts: mine.filter((r) => r.thermalBefore !== "nominal" && r.thermalBefore !== "unknown").length,
    };
  };
  const base = ids.includes(baselineId) ? stat(baselineId) : null;
  const delta = (v: number | null, b: number | null | undefined) => (v != null && b ? v / b - 1 : null);
  return ids.map((id) => {
    const s = stat(id);
    return { configId: id, ...s, ppDelta: delta(s.ppTps, base?.ppTps), tgDelta: delta(s.tgTps, base?.tgTps) };
  });
}
