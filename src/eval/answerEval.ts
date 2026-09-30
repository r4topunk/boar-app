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
import { DEFAULT_MAX_TOKENS, getActiveModelId, getAnswerSettings, setActiveModelId } from "../models/settings";
import { DEFAULT_PERSONALITY_ID, getPersonality } from "../constants/personalities";
import { EVAL_RESULTS_DIR, EvalProgress } from "./evalHarness";
import { EvalConfig, evalRowsToJsonl, newEvalRunId } from "./evalHarness.pure";
import type { EvalCategory } from "./evalSet";
import { AnswerEvalRow, buildAnswerEvalRow, EvalQuestion, TimedEvent } from "./answerEval.pure";

export const ANSWER_TIMEOUT_MS = 240_000;
/** Pause between questions: lets the engine's idle prefix refill run, as between two questions in the chat. */
const GAP_MS = 1_500;

export interface RunAnswerEvaluationOptions {
  questions: EvalQuestion[];
  /** Models to answer with; empty = whatever the chat would use now (config "adaptive"). */
  models?: { id: string; label: string }[];
  /** A declined answer (weak sources) is asked again with answerAnyway, like tapping "Answer anyway". */
  answerAnyway?: boolean;
  evalSetVersion?: string;
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
  }
  await FileSystem.writeAsStringAsync(savedPath, evalRowsToJsonl(rows));
  console.log(`[EVAL] answer run ${runId} ${stopped ? "stopped" : "done"} — ${rows.length} rows saved to ${savedPath}`);
  return { runId, rows, savedPath, stopped };
}
