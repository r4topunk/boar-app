#!/usr/bin/env node
// s32 no-regression criterion for a gate candidate (Boar, 2026-09-27), from the s32 runs a gate made (GATE_S32=1)
// and their Claude + Jev judgments (gate-s32-judge.sh). No model calls.
//   4B: quality ratio may not drop more than 3 points vs the control on either judge, and at most 2/32 refusals
//       (more refusals = an onTopic / grounding-guard bug).
//   1.5B: refusing without a source is a product decision, so report refusal rate, correct-when-answering and
//       confident errors (an answer, not a refusal, with correctness <= 2); regression = correct-when-answering
//       falls or confident errors rise.
// Usage (from eval/): node scripts/s32-gate-check.mjs <control-label> <candidate-label>
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { combineOrders, summarize } from "./lib/judge-core.mjs";

const EVAL_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const [control, candidate] = process.argv.slice(2);
if (!control || !candidate) throw new Error("usage: s32-gate-check.mjs <control-label> <candidate-label>");
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)) : []);
const REFUSAL = /did(n't| not) find|no (reliable |good )?(offline )?source|won't answer from memory|not (in|from) the offline library|n[ãa]o encontrei|n[ãa]o tenho (uma )?fonte/i;
const MODELS = { "4B": "qwen3-4b-instruct-2507-q4km", "1.5B": "qwen2.5-1.5b-instruct-q4km" };
const fmt = (x, d = 2) => (Number.isFinite(x) ? x.toFixed(d) : "n/a");
const pct = (x) => (Number.isFinite(x) ? `${Math.round(100 * x)}%` : "n/a");

function measure(model, label) {
  const system = `${model}__essential__app__${label}`;
  const answers = Object.fromEntries(readJsonl(join(EVAL_DIR, "results/gates", label, "s32", `${model}__essential__app.jsonl`)).map((r) => [r.queryId, r.answer ?? ""]));
  const refused = new Set(Object.entries(answers).filter(([, a]) => REFUSAL.test(a)).map(([q]) => q));
  const out = { n: Object.keys(answers).length, refusals: refused.size };
  for (const [judge, dir] of [["claude", "judgments"], ["jev", "judgments-jev"]]) {
    const byQ = {};
    for (const j of readJsonl(join(EVAL_DIR, "results", dir, "v1", `${system}__vs__claude-code__opus.jsonl`)).filter((j) => j.ok !== false && j.mapped)) (byQ[j.queryId] ??= {})[j.order] = j;
    const pairs = Object.entries(byQ).filter(([, o]) => o.boarA && o.boarB).map(([q, o]) => ({ q, ...combineOrders(o.boarA.mapped, o.boarB.mapped) }));
    if (!pairs.length) continue;
    const answered = pairs.filter((p) => !refused.has(p.q));
    out[judge] = {
      judged: pairs.length,
      ratio: summarize(pairs, { seed: 11 }).qualityRatio,
      correctWhenAnswering: answered.filter((p) => p.boar.correctness >= 4).length / Math.max(1, answered.length),
      confidentErrors: answered.filter((p) => p.boar.correctness <= 2).length,
    };
  }
  return out;
}

const L = [`# s32 gate check: ${candidate} vs ${control}`, ""];
let fail = false;
const verdicts = [];
for (const [name, model] of Object.entries(MODELS)) {
  const c = measure(model, control), k = measure(model, candidate);
  L.push(`## ${name}`, "", "| | Control | Candidate |", "|---|---|---|");
  L.push(`| Refusals | ${c.refusals}/${c.n} | ${k.refusals}/${k.n} |`);
  for (const j of ["claude", "jev"]) {
    L.push(`| Quality ratio (${j}) | ${fmt(c[j]?.ratio)} | ${fmt(k[j]?.ratio)} |`);
    L.push(`| Correct when answering (${j}) | ${pct(c[j]?.correctWhenAnswering)} | ${pct(k[j]?.correctWhenAnswering)} |`);
    L.push(`| Confident errors (${j}) | ${c[j]?.confidentErrors ?? "n/a"} | ${k[j]?.confidentErrors ?? "n/a"} |`);
  }
  const missing = ["claude", "jev"].some((j) => !c[j] || !k[j]);
  let ok;
  if (missing) ok = null;
  else if (name === "4B") ok = ["claude", "jev"].every((j) => k[j].ratio >= c[j].ratio - 0.03) && k.refusals <= 2;
  else ok = ["claude", "jev"].every((j) => k[j].correctWhenAnswering >= c[j].correctWhenAnswering - 0.03 && k[j].confidentErrors <= c[j].confidentErrors);
  if (ok === false) fail = true;
  verdicts.push(`${name} ${ok === null ? "INCOMPLETE (judgments missing)" : ok ? "PASS" : "FAIL"}`);
  L.push("", `Verdict ${name}: **${verdicts.at(-1).split(" ").slice(1).join(" ")}**`, "");
}
L.splice(2, 0, `TL;DR: ${verdicts.join(" · ")}. 4B: ratio within 3 points of the control on both judges and <= 2/32 refusals. 1.5B: correct-when-answering within 3 points and no more confident errors (refusal is a product decision, reported apart). Regenerate with \`node eval/scripts/s32-gate-check.mjs ${control} ${candidate}\`.`, "");
writeFileSync(join(EVAL_DIR, "reports", `s32-check-${control}-vs-${candidate}.md`), L.join("\n"));
console.log(L.join("\n"));
process.exit(fail ? 1 : 0);
