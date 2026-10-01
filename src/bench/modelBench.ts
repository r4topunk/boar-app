/**
 * On-device model benchmark, the device half. scripts/bench-iphone.mjs copies a request into
 * Documents/bench/requests/pending.json with devicectl; the chat (development builds and builds made with
 * EXPO_PUBLIC_DEVICE_EVAL=1 only, the same gate as the evaluation requests) picks it up and shows
 * BenchScreen, which calls runModelBench(). Rows go to Documents/bench/<requestId>.jsonl and progress to
 * Documents/bench/requests/<requestId>.status.json, which the script polls.
 *
 * Each run: wait for the phone to cool down, initLlama() with the config, llama.rn's bench(pp, tg),
 * release. The chat's model is unloaded first so only one LLM is mapped (two mapped
 * LLMs dropped decoding to 0.4 tok/s, see LlamaEngine.unloadNow).
 * This module calls the engine and llama.rn; nothing in the engine imports it.
 */
import * as FileSystem from "expo-file-system/legacy";
import { initLlama } from "llama.rn";
import { getMemoryInfo, getPowerInfo, getThermalState } from "ram-monitor";
import { llamaEngine } from "../inference/LlamaEngine";
import { listInstalledEvalModels } from "../eval/evalHarness";
import { getActiveModelId } from "../models/settings";
import {
  BenchRequest,
  BenchRow,
  BenchStatus,
  isCoolEnough,
  parseBenchRequest,
  runOrder,
  toThermalState,
  type ThermalState,
} from "./modelBench.pure";

export const BENCH_DIR = `${FileSystem.documentDirectory}bench/`;
const REQUESTS_DIR = `${BENCH_DIR}requests/`;
const PENDING_PATH = `${REQUESTS_DIR}pending.json`;
const COOL_POLL_MS = 5_000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const thermal = (): ThermalState => toThermalState(getThermalState());

/** Path relative to the app container, the form `devicectl device copy from --source` takes. */
function toContainerPath(uri: string): string {
  const docs = FileSystem.documentDirectory ?? "";
  return uri.startsWith(docs) ? `Documents/${uri.slice(docs.length)}` : uri;
}

async function writeStatus(status: BenchStatus): Promise<void> {
  await FileSystem.makeDirectoryAsync(REQUESTS_DIR, { intermediates: true }).catch(() => {});
  await FileSystem.writeAsStringAsync(`${REQUESTS_DIR}${status.requestId}.status.json`, JSON.stringify({ ...status, updatedAt: Date.now() }));
}

/**
 * Claims the pending request, if any (deletes the file so it runs once). A request that doesn't parse is
 * answered with a "failed" status, so the script reports the problem instead of waiting.
 */
export async function takePendingBenchRequest(): Promise<BenchRequest | null> {
  const info = await FileSystem.getInfoAsync(PENDING_PATH);
  if (!info.exists) return null;
  const text = await FileSystem.readAsStringAsync(PENDING_PATH);
  await FileSystem.deleteAsync(PENDING_PATH, { idempotent: true });
  let raw: any = null;
  try {
    raw = JSON.parse(text);
    return parseBenchRequest(raw);
  } catch (e: any) {
    const requestId = typeof raw?.requestId === "string" && raw.requestId ? raw.requestId : "invalid";
    await writeStatus({ requestId, state: "failed", completed: 0, total: 0, error: `bad request: ${e?.message ?? e}` });
    return null;
  }
}

async function resolveModelFile(selector: string | undefined): Promise<string> {
  const installed = await listInstalledEvalModels();
  if (!installed.length) throw new Error("no answer model installed");
  if (selector) {
    const hit = installed.find((m) => m.id === selector) ?? installed.find((m) => m.id.includes(selector) || m.filename.includes(selector));
    if (!hit) throw new Error(`model "${selector}" not installed (have: ${installed.map((m) => m.id).join(", ")})`);
    return hit.filename;
  }
  const activeId = await getActiveModelId("llm");
  return (installed.find((m) => m.id === activeId) ?? installed[0]).filename;
}

async function waitForCool(limit: BenchRequest["coolUntil"], maxWaitMs: number, onWait: (s: ThermalState) => void): Promise<number> {
  const start = Date.now();
  let state = thermal();
  while (!isCoolEnough(state, limit) && Date.now() - start < maxWaitMs) {
    onWait(state);
    await sleep(COOL_POLL_MS);
    state = thermal();
  }
  return Date.now() - start;
}

export interface BenchProgress {
  completed: number;
  total: number;
  current: string;
  thermal: ThermalState;
  /** The last finished run, for the screen. */
  last?: BenchRow;
}

export async function runModelBench(request: BenchRequest, onProgress?: (p: BenchProgress) => void): Promise<string> {
  const resultUri = `${BENCH_DIR}${request.requestId}.jsonl`;
  const order = runOrder(request.configs.map((c) => c.id), request.reps);
  const total = order.length;
  const status = (s: Partial<BenchStatus> & Pick<BenchStatus, "state" | "completed">) =>
    writeStatus({ requestId: request.requestId, total, resultPath: toContainerPath(resultUri), ...s }).catch(() => {});

  let completed = 0;
  try {
    await FileSystem.makeDirectoryAsync(BENCH_DIR, { intermediates: true }).catch(() => {});
    await FileSystem.writeAsStringAsync(resultUri, "");
    await status({ state: "running", completed: 0, current: "unloading the chat model", thermal: thermal() });
    await llamaEngine.unload();
    const filename = await resolveModelFile(request.model);
    const modelPath = `${FileSystem.documentDirectory}${filename}`;
    let lines = "";

    for (let i = 0; i < order.length; i++) {
      const { rep, configId } = order[i];
      const config = request.configs.find((c) => c.id === configId)!;
      const label = `${configId} rep ${rep + 1}/${request.reps}`;
      const cooledMs = await waitForCool(request.coolUntil, request.coolMaxWaitMs, (t) => {
        onProgress?.({ completed: i, total, current: `${label}: cooling down (${t})`, thermal: t });
        status({ state: "running", completed: i, current: `${label}: cooling down`, thermal: t });
      });
      const thermalBefore = thermal();
      onProgress?.({ completed: i, total, current: label, thermal: thermalBefore });
      await status({ state: "running", completed: i, current: label, thermal: thermalBefore });

      const row: BenchRow = {
        requestId: request.requestId,
        rep,
        configId,
        config,
        model: filename,
        ok: false,
        thermalBefore,
        thermalAfter: thermalBefore,
        cooledMs,
        power: await getPowerInfo(),
        startedAt: Date.now(),
      };
      let context: Awaited<ReturnType<typeof initLlama>> | null = null;
      try {
        const t0 = Date.now();
        const { id: _id, ...params } = config;
        context = await initLlama({ model: modelPath, use_mmap: true, use_mlock: false, ...params });
        row.loadMs = Date.now() - t0;
        row.gpu = !!context.gpu;
        row.rssMbAfterLoad = Math.round(getMemoryInfo().rssBytes / 1_048_576);
        const result = await context.bench(request.pp, request.tg, 1, 1);
        row.ppTps = result.speedPp;
        row.tgTps = result.speedTg;
        row.ok = true;
      } catch (e: any) {
        row.error = e?.message ?? String(e);
      } finally {
        await context?.release().catch(() => {});
      }
      row.thermalAfter = thermal();
      lines += JSON.stringify(row) + "\n";
      // Rewrite the whole file each run: expo-file-system has no append, and a killed run keeps every row so far.
      await FileSystem.writeAsStringAsync(resultUri, lines);
      completed = i + 1;
      onProgress?.({ completed, total, current: label, thermal: row.thermalAfter, last: row });
    }
    await status({ state: "done", completed: total, thermal: thermal() });
    return resultUri;
  } catch (e: any) {
    await status({ state: "failed", completed, error: e?.message ?? String(e) });
    throw e;
  }
}
