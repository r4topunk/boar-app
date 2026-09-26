#!/usr/bin/env node
// Verdict for a prompt-layout A/B (v1.1 item 5): variant B (sources in the user turn) vs A (sources in the system).
// Pre-registered criterion (written before the judge ran, 2026-09-26):
//   REGRESSION if the direct B-vs-A win score 95% CI lies entirely below 0.5,
//   OR B's correct-answer rate (judge correctness >= 4 vs the reference) is more than 10 points below A's.
// Usage (from eval/): node scripts/ab-verdict.mjs [--a <run>] [--b <run>] [--dataset v1] [--subset s32]
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { combineOrders, summarize } from "./lib/judge-core.mjs";

const EVAL_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const a = process.argv.slice(2);
const get = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const dataset = get("--dataset", "v1");
const A = get("--a", "qwen2.5-1.5b-instruct-q4km__bundled__sources-system");
const B = get("--b", "qwen2.5-1.5b-instruct-q4km__bundled__sources-user");
const ref = "claude-code__opus";
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)) : []);
const fmt = (x, d = 2) => (Number.isFinite(x) ? x.toFixed(d) : "n/a");
const pct = (x) => (Number.isFinite(x) ? `${(x * 100).toFixed(0)}%` : "n/a");

function pairs(system, against) {
  const byQ = {};
  for (const j of readJsonl(join(EVAL_DIR, "results", "judgments", dataset, `${system}__vs__${against}.jsonl`)).filter((j) => j.ok)) (byQ[j.queryId] ??= {})[j.order] = j;
  return Object.entries(byQ).filter(([, o]) => o.boarA && o.boarB).map(([queryId, o]) => ({ queryId, ...combineOrders(o.boarA.mapped, o.boarB.mapped) }));
}
const correct = (ps) => ps.filter((p) => p.boar.correctness >= 4).length / Math.max(1, ps.length);

const direct = pairs(B, A);
const d = summarize(direct, { seed: 31 });
const vsA = pairs(A, ref), vsB = pairs(B, ref);
const sA = summarize(vsA, { seed: 32 }), sB = summarize(vsB, { seed: 33 });
const cA = correct(vsA), cB = correct(vsB);
const regressDirect = d.winScoreCI[1] < 0.5;
const regressCorrect = cA - cB > 0.10;
const regressed = regressDirect || regressCorrect;

const runs = (name) => readJsonl(join(EVAL_DIR, "results", "runs", dataset, `${name}.jsonl`));
const cites = (name) => runs(name).filter((r) => /\[\d+\]/.test(r.answer)).length;

const md = `# A/B: sources in the user turn vs in the system prompt (v1.1 item 5)

TL;DR: **${regressed ? "REGRESSED" : "NO REGRESSION"}** on ${direct.length} questions (v1 s32, Qwen2.5-1.5B, seed 42, same job and machine).

| | A: sources in system (today) | B: sources in user turn (feat/prompt-cache) |
|---|---|---|
| Correct answers vs reference (correctness ≥ 4) | ${pct(cA)} | ${pct(cB)} |
| Quality ratio vs reference (95% CI) | ${fmt(sA.qualityRatio)} (${fmt(sA.qualityRatioCI[0])}–${fmt(sA.qualityRatioCI[1])}) | ${fmt(sB.qualityRatio)} (${fmt(sB.qualityRatioCI[0])}–${fmt(sB.qualityRatioCI[1])}) |
| Answers citing [n] | ${cites(A)}/32 | ${cites(B)}/32 |

Direct blind comparison B vs A (both orders): B wins ${pct(d.boarWin)}, ties ${pct(d.tie)}, loses ${pct(d.refWin)}; win score ${fmt(d.winScore)} (95% CI ${fmt(d.winScoreCI[0])}–${fmt(d.winScoreCI[1])}); position-consistent ${pct(d.positionConsistency)}.

Pre-registered criterion: regression if the direct win-score CI is entirely below 0.5 (${regressDirect ? "met" : "not met"}) or B's correct rate is more than 10 points below A's (${regressCorrect ? "met" : "not met"}).

Scope: quality only. TTFT with prompt-cache reuse is measured by the engine owner (llama-server cache_prompt, multi-turn). The runner here builds a fresh context per question, so its TTFT does not show cache reuse. Layout B text is byte-identical to buildAnswerMessages (feat/prompt-cache bb43768) on this corpus (no \`</sources>\` in any source).
`;
writeFileSync(join(EVAL_DIR, "reports", "ab-sources-layout.md"), md);
console.log(md);
