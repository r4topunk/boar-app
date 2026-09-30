/**
 * Runs questions through the live answer pipeline (answerService.answer, the
 * one the chat calls) and saves one AnswerEvalRow per question. Driven by a
 * device request (deviceEvalRequest.ts, pipeline "answer"); the rows keep the
 * EvalResultRow shape, so the Evaluation screen and the desktop judge/report
 * scripts (eval/scripts) read them unchanged.
 *
 * Fixed prompt (the default personality, no history, DEFAULT_MAX_TOKENS) so
 * runs on different days or devices are comparable; the answer settings
 * (quick first / always complete) are the device's and recorded on every row.
 */
import * as FileSystem from "expo-file-system/legacy";
import { answer } from "../routing/answerService";
import type { AnswerEvent, AnswerResult } from "../routing/events";
import { DEFAULT_MAX_TOKENS, getActiveModelId, getAnswerSettings, setActiveModelId, setAnswerSettings } from "../models/settings";
import { findAsset } from "../models/assetRegistry";
import { ModelManager } from "../models/ModelManager";
import { resolvePlace, tilesFor } from "../rag/pois";
import { getDownloadState, startDownload } from "../services/downloadManager";
import { nameTilesAfter } from "../ui/flows/adapters";
// The packs' catalog entries register when their module loads (the Knowledge screen imports them);
// load them here so install.assets can find e.g. boar-wikivoyage-en without that screen opened first.
import "../rag/wikiEnPacks";
import "../rag/cryptoPack";
import "../rag/preparedness";
import "../rag/poiRegions";
import { DEFAULT_PERSONALITY_ID, getPersonality } from "../constants/personalities";
import { EVAL_RESULTS_DIR, EvalProgress } from "./evalHarness";
import { EvalConfig, evalRowsToJsonl, newEvalRunId } from "./evalHarness.pure";
import type { EvalCategory } from "./evalSet";
import { AnswerEvalRow, buildAnswerEvalRow, EvalQuestion, TimedEvent } from "./answerEval.pure";

export const ANSWER_TIMEOUT_MS = 240_000;
/** Pause between questions: lets the engine's idle prefix refill run, as between two questions in the chat. */
const GAP_MS = 1_500;

/** Places areas are downloaded around the city's point, as the chat's "get this city" offer does (CityMapOffer). */
const CITY_AREA_KM = 15;

export interface EvalInstall {
  /** City names (resolved with the world gazetteer): their places tiles are downloaded. */
  places?: string[];
  /** Catalog ids (e.g. boar-crypto, boar-wikivoyage-en), downloaded if not on the phone. */
  assets?: string[];
}

export interface InstallReport {
  installed: string[];
  already: string[];
  failed: { id: string; error: string }[];
}

/**
 * Downloads what a run needs before its first question, so a pack A/B needs no UI.
 * Sequential and awaited; a failure is reported, not thrown, and the run goes on.
 */
export async function installForEval(spec: EvalInstall, log: (line: string) => void = () => {}): Promise<InstallReport> {
  const report: InstallReport = { installed: [], already: [], failed: [] };
  const manager = new ModelManager();
  const fetchOne = async (asset: NonNullable<ReturnType<typeof findAsset>>) => {
    if ((await manager.statusOf(asset)).present || getDownloadState(asset.id)?.phase === "verified") {
      report.already.push(asset.id);
      return;
    }
    try {
      log(`installing ${asset.id} (${Math.round(asset.sizeBytes / 1e6)} MB)`);
      await startDownload(asset);
      report.installed.push(asset.id);
    } catch (e: any) {
      report.failed.push({ id: asset.id, error: e?.message ?? String(e) });
    }
  };
  for (const id of spec.assets ?? []) {
    const asset = findAsset(id);
    if (!asset) report.failed.push({ id, error: "not in the catalog" });
    else await fetchOne(asset);
  }
  for (const name of spec.places ?? []) {
    try {
      const city = await resolvePlace(name);
      if (!city) {
        report.failed.push({ id: `places:${name}`, error: "city not found in the gazetteer" });
        continue;
      }
      const tiles = await tilesFor(city.lat, city.lon, CITY_AREA_KM);
      if (!tiles.length) {
        report.failed.push({ id: `places:${name}`, error: "no published tiles for this area" });
        continue;
      }
      await nameTilesAfter(city.name, tiles).catch(() => {});
      for (const tile of tiles) await fetchOne(tile);
    } catch (e: any) {
      report.failed.push({ id: `places:${name}`, error: e?.message ?? String(e) });
    }
  }
  log(`install: ${report.installed.length} new, ${report.already.length} already there, ${report.failed.length} failed`);
  return report;
}

export interface RunAnswerEvaluationOptions {
  questions: EvalQuestion[];
  /** Models to answer with; empty = whatever the chat would use now (config "adaptive"). */
  models?: { id: string; label: string }[];
  /** A declined answer (weak sources) is asked again with answerAnyway, like tapping "Answer anyway". */
  answerAnyway?: boolean;
  evalSetVersion?: string;
  /** Answer settings for this run only (quick first / always complete); the device's are restored after. */
  answerSettings?: { quickFirst?: boolean; alwaysComplete?: boolean };
  onProgress?: (p: EvalProgress) => void;
  onRow?: (row: AnswerEvalRow) => void;
  shouldStop?: () => boolean;
}

export interface AnswerEvaluationRun {
  runId: string;
  rows: AnswerEvalRow[];
  savedPath: string;
  stopped: boolean;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function askOnce(query: string, answerAnyway: boolean, shouldStop?: () => boolean) {
  const personality = getPersonality(DEFAULT_PERSONALITY_ID);
  const events: TimedEvent[] = [];
  const t0 = performance.now();
  const handle = answer(
    { query, answerAnyway: answerAnyway || undefined },
    (event: AnswerEvent) => events.push({ atMs: performance.now() - t0, event }),
    { systemPrompt: personality.systemPrompt, styleReminder: personality.styleReminder, maxTokens: DEFAULT_MAX_TOKENS }
  );
  let result: AnswerResult | null = null;
  let error: string | undefined;
  const watch = setInterval(() => {
    if (shouldStop?.()) handle.stop().catch(() => {});
  }, 500);
  try {
    result = await Promise.race([
      handle.done,
      sleep(ANSWER_TIMEOUT_MS).then(() => {
        throw new Error(`timeout after ${ANSWER_TIMEOUT_MS / 1000} s`);
      }),
    ]);
  } catch (e: any) {
    error = e?.message ?? String(e);
    await handle.stop().catch(() => {});
  } finally {
    clearInterval(watch);
  }
  return { events, result, error, wallMs: performance.now() - t0 };
}

export async function runAnswerEvaluation({
  questions,
  models = [],
  answerAnyway = false,
  evalSetVersion = "custom",
  answerSettings: settingsOverride,
  onProgress,
  onRow,
  shouldStop,
}: RunAnswerEvaluationOptions): Promise<AnswerEvaluationRun> {
  const runId = newEvalRunId();
  const rows: AnswerEvalRow[] = [];
  await FileSystem.makeDirectoryAsync(EVAL_RESULTS_DIR, { intermediates: true }).catch(() => {});
  const savedPath = `${EVAL_RESULTS_DIR}${runId}.answer.jsonl`;
  const configs: EvalConfig[] = models.length
    ? models.map((m) => ({ kind: "model" as const, modelId: m.id, label: m.label }))
    : [{ kind: "adaptive", label: "current model" }];
  const savedModel = await getActiveModelId("llm");
  const savedSettings = await getAnswerSettings();
  if (settingsOverride) await setAnswerSettings(settingsOverride);
  const answerSettings = { ...(await getAnswerSettings()) } as Record<string, unknown>;
  let stopped = false;

  try {
    outer: for (const [ci, config] of configs.entries()) {
      if (config.kind === "model") await setActiveModelId("llm", config.modelId);
      const configId = config.kind === "model" ? `answer:${config.modelId}` : "answer:current";
      for (const [qi, q] of questions.entries()) {
        if (shouldStop?.()) {
          stopped = true;
          break outer;
        }
        onProgress?.({
          configIndex: ci,
          configCount: configs.length,
          queryIndex: qi,
          queryCount: questions.length,
          config,
          query: { id: q.id, category: (q.category ?? "custom") as EvalCategory, query: q.query, expectedKbTitles: [], gradingNotes: "" },
        });
        const meta = {
          runId,
          evalSetVersion,
          configId,
          configLabel: config.label,
          personalityId: DEFAULT_PERSONALITY_ID,
          maxTokens: DEFAULT_MAX_TOKENS,
          answerSettings,
        };
        const first = await askOnce(q.query, false, shouldStop);
        const row = buildAnswerEvalRow(q, first.events, first.result, first.wallMs, { ...meta, answeredAnyway: false, createdAt: Date.now() }, first.error);
        rows.push(row);
        onRow?.(row);
        if (row.declined && answerAnyway && !shouldStop?.()) {
          await sleep(GAP_MS);
          const again = await askOnce(q.query, true, shouldStop);
          const row2 = buildAnswerEvalRow(q, again.events, again.result, again.wallMs, { ...meta, answeredAnyway: true, createdAt: Date.now() }, again.error);
          rows.push(row2);
          onRow?.(row2);
        }
        // Partial results survive a crash or a stop: rewrite the file after every question.
        await FileSystem.writeAsStringAsync(savedPath, evalRowsToJsonl(rows));
        console.log(`[EVAL] ${configId} ${q.id} ${row.outcome} tier=${row.tier} ttft=${row.ttftMs ?? "-"} total=${row.totalLatencyMs ?? "-"}`);
        await sleep(GAP_MS);
      }
    }
  } finally {
    if (models.length && savedModel) await setActiveModelId("llm", savedModel).catch(() => {});
    if (settingsOverride) {
      await setAnswerSettings({ quickFirst: savedSettings.quickFirst, alwaysComplete: savedSettings.alwaysComplete }).catch(() => {});
    }
  }
  await FileSystem.writeAsStringAsync(savedPath, evalRowsToJsonl(rows));
  console.log(`[EVAL] answer run ${runId} ${stopped ? "stopped" : "done"} — ${rows.length} rows saved to ${savedPath}`);
  return { runId, rows, savedPath, stopped };
}
