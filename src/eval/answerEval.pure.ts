/**
 * Evaluation through the live answer pipeline (src/routing/answer.ts, the
 * same answer() the chat calls), as opposed to evalHarness.ts, which replays
 * the older executor.ts path. One row per question, built from the answer's
 * event stream: when each stage started, when the first sources, snippet,
 * places and token arrived, what was declined, and the receipt.
 *
 * Native-module-free so it runs under vitest; the runner is answerEval.ts.
 */
import type { AnswerEvent, AnswerReceipt, AnswerResult, AnswerStageName } from "../routing/events";
import type { EvalCategory } from "./evalSet";
import type { EvalResultRow } from "./evalHarness.pure";

/** A question sent in a device request: any dataset (e.g. eval/dataset/questions.v2.jsonl), not only EVAL_SET. */
export interface EvalQuestion {
  id: string;
  query: string;
  category?: string;
}

export const MAX_REQUEST_QUESTIONS = 500;

/** An event as the runner saw it: ms since answer() was called (same clock for every mark). */
export interface TimedEvent {
  atMs: number;
  event: AnswerEvent;
}

export interface StageMark {
  stage: AnswerStageName;
  atMs: number;
  tier: string;
  index?: number;
  count?: number;
}

export interface AnswerEvalRow extends EvalResultRow {
  pipeline: "answer";
  /** Final tier of the answer (instant | fast | deep). */
  tier: string;
  /** Every stage event in order, ms since answer(). */
  stages: StageMark[];
  firstSourcesMs?: number;
  instantMs?: number;
  firstTokenMs?: number;
  placesMs?: number;
  /** The places card, when the question was a places question. */
  places?: { count: number; coverage: string; empty?: string; areaKind?: string };
  /** weak_sources declined: the model did not answer (the chat offers "Answer anyway"). */
  declined: boolean;
  /** This row is the "Answer anyway" re-ask of a declined answer. */
  answeredAnyway: boolean;
  citedTitles: string[];
  warnings: string[];
  receipt?: AnswerReceipt;
  /** answer() call to done, on the runner's clock (includes everything the receipt may leave out). */
  wallMs: number;
  /** Answer settings in effect (quickFirst / alwaysComplete / ...), for reproducibility. */
  answerSettings?: Record<string, unknown>;
}

export interface AnswerRowMeta {
  runId: string;
  evalSetVersion: string;
  configId: string;
  configLabel: string;
  personalityId: string;
  maxTokens: number;
  answeredAnyway: boolean;
  answerSettings?: Record<string, unknown>;
  createdAt: number;
}

const firstAt = (events: TimedEvent[], type: AnswerEvent["type"]) => events.find((e) => e.event.type === type)?.atMs;

/** The text a reader sees: the model's (or snippet's) text, then the places list, one per line. */
export function answerTextOf(result: AnswerResult | null, events: TimedEvent[]): string {
  const done = events.find((e) => e.event.type === "done")?.event as Extract<AnswerEvent, { type: "done" }> | undefined;
  const instant = events.find((e) => e.event.type === "instant")?.event as Extract<AnswerEvent, { type: "instant" }> | undefined;
  const tokens = events
    .filter((e) => e.event.type === "token")
    .map((e) => (e.event as Extract<AnswerEvent, { type: "token" }>).text)
    .join("");
  const text = (done?.finalText ?? result?.text ?? tokens ?? "").trim() || (instant?.snippet.text ?? "").trim();
  const places = events.find((e) => e.event.type === "places")?.event as Extract<AnswerEvent, { type: "places" }> | undefined;
  const list = (places?.places ?? []).map((p) => `- ${p.name}${p.address ? ` (${p.address})` : ""}${p.cuisine?.length ? ` · ${p.cuisine.join(", ")}` : ""}`);
  return [text, ...list].filter(Boolean).join("\n");
}

export function buildAnswerEvalRow(
  question: EvalQuestion,
  events: TimedEvent[],
  result: AnswerResult | null,
  wallMs: number,
  meta: AnswerRowMeta,
  error?: string
): AnswerEvalRow {
  const done = events.find((e) => e.event.type === "done")?.event as Extract<AnswerEvent, { type: "done" }> | undefined;
  const receipt = done?.receipt ?? result?.receipt;
  const sourcesEv = [...events].reverse().find((e) => e.event.type === "sources")?.event as
    | Extract<AnswerEvent, { type: "sources" }>
    | undefined;
  const titles = (sourcesEv?.sources ?? result?.sources ?? []).map((s) => s.title);
  const cited = done?.cited ?? result?.cited ?? [];
  const placesEv = events.find((e) => e.event.type === "places")?.event as Extract<AnswerEvent, { type: "places" }> | undefined;
  const warnings = events
    .filter((e) => e.event.type === "warning")
    .map((e) => (e.event as Extract<AnswerEvent, { type: "warning" }>).code);
  const declined = events.some((e) => e.event.type === "warning" && (e.event as Extract<AnswerEvent, { type: "warning" }>).declined === true);
  const stages: StageMark[] = events
    .filter((e) => e.event.type === "stage")
    .map((e) => {
      const s = e.event as Extract<AnswerEvent, { type: "stage" }>;
      return { stage: s.stage, atMs: Math.round(e.atMs), tier: s.tier, index: s.detail?.index, count: s.detail?.count };
    });
  const answer = answerTextOf(result, events);
  const outcome = error || done?.outcome === "error" ? "failure" : done?.outcome === "success" ? "success" : "cancelled";
  const firstVisible = [firstAt(events, "instant"), firstAt(events, "token"), firstAt(events, "places")].filter(
    (x): x is number => x !== undefined
  );
  return {
    pipeline: "answer",
    runId: meta.runId,
    evalSetVersion: meta.evalSetVersion,
    configId: meta.configId,
    configLabel: meta.configLabel,
    personalityId: meta.personalityId,
    maxTokens: meta.maxTokens,
    queryId: question.id,
    category: (question.category ?? "custom") as EvalCategory,
    query: question.query,
    answer,
    retrievedTitles: titles,
    expectedKbTitles: [],
    expectedKbHit: null,
    timedOut: done?.outcome === "timeout",
    createdAt: meta.createdAt,
    modelId: receipt?.modelId,
    adaptiveRoutingUsed: true,
    reasonCodes: receipt?.reasonCodes ?? [],
    retrievalUsed: titles.length > 0,
    modelLoadMs: receipt?.loadMs,
    // The receipt's ttft (answer() to first visible text); falls back to the runner's clock.
    ttftMs: receipt?.ttftMs ?? (firstVisible.length ? Math.min(...firstVisible) : undefined),
    totalLatencyMs: receipt?.totalMs ?? wallMs,
    tokensGenerated: receipt?.tokens,
    tokPerSec: receipt?.tokPerSec,
    outcome,
    errorMessage: error ?? done?.error?.message,
    tier: done?.tier ?? result?.tier ?? "unknown",
    stages,
    firstSourcesMs: firstAt(events, "sources"),
    instantMs: firstAt(events, "instant"),
    firstTokenMs: firstAt(events, "token"),
    placesMs: firstAt(events, "places"),
    places: placesEv
      ? { count: placesEv.places.length, coverage: placesEv.coverage, empty: placesEv.empty, areaKind: placesEv.area.kind }
      : undefined,
    declined,
    answeredAnyway: meta.answeredAnyway,
    citedTitles: cited.map((n) => titles[n - 1]).filter((t): t is string => !!t),
    warnings,
    receipt,
    wallMs: Math.round(wallMs),
    answerSettings: meta.answerSettings,
  };
}

function isQuestion(v: unknown): v is EvalQuestion {
  if (typeof v !== "object" || v === null) return false;
  const q = v as Record<string, unknown>;
  return (
    typeof q.id === "string" &&
    q.id.trim() !== "" &&
    typeof q.query === "string" &&
    q.query.trim() !== "" &&
    (q.category === undefined || typeof q.category === "string")
  );
}

/** Validates the "questions" field of a device request. */
export function parseQuestions(value: unknown): EvalQuestion[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.length === 0 || !value.every(isQuestion)) {
    throw new Error('"questions" must be a non-empty list of { id, query, category? }');
  }
  if (value.length > MAX_REQUEST_QUESTIONS) throw new Error(`"questions" holds at most ${MAX_REQUEST_QUESTIONS} items`);
  const ids = new Set(value.map((q) => q.id));
  if (ids.size !== value.length) throw new Error('"questions" ids must be unique');
  return value.map((q) => ({ id: q.id.trim(), query: q.query.trim(), category: q.category }));
}
