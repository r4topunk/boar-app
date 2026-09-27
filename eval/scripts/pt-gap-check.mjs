#!/usr/bin/env node
// PT vs EN criterion of the gate (Boar, 2026-09-27, after the PT lexicon fix): the candidate's gap (EN - PT quality
// ratio, Jev, 4B with packs, 41 v2 items) blocks when it exceeds the control's gap + 1 point; gap <= 5 points is the
// recorded target, reported only. Judges the gate's PT runs (results/gates/<label>/pt) with Jev when not cached.
// Usage (from eval/): node scripts/pt-gap-check.mjs <control-label> <candidate-label>
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { combineOrders, summarize } from "./lib/judge-core.mjs";

const EVAL_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const [control, candidate] = process.argv.slice(2);
if (!control || !candidate) throw new Error("usage: pt-gap-check.mjs <control-label> <candidate-label>");
const MARGIN = 0.01, TARGET = 0.05;

function ratio(label, lang) {
  const [dataset, system] = lang === "en" ? ["v2", `qwen3-4b__pt-gate-${label}-en`] : ["v2-pt", `qwen3-4b__pt-gate-${label}-pt`];
  const src = join(EVAL_DIR, "results/gates", label, "pt", `v2-${lang}.jsonl`);
  if (!existsSync(src)) throw new Error(`${src} missing: run the gate with GATE_PT=1`);
  copyFileSync(src, join(EVAL_DIR, "results/runs", dataset, `${system}.jsonl`));
  execFileSync("node", ["scripts/jev-judge.mjs", "--system", system, "--dataset", dataset, "--subset", "all"], { cwd: EVAL_DIR, stdio: "ignore" });
  const by = {};
  for (const l of readFileSync(join(EVAL_DIR, "results/judgments-jev", dataset, `${system}__vs__claude-code__opus.jsonl`), "utf8").trim().split("\n")) {
    const j = JSON.parse(l);
    if (j.mapped && j.ok !== false) (by[j.queryId] ??= {})[j.order] = j;
  }
  const pairs = Object.values(by).filter((o) => o.boarA && o.boarB).map((o) => combineOrders(o.boarA.mapped, o.boarB.mapped));
  const s = summarize(pairs, { seed: 21 });
  return { n: pairs.length, r: s.qualityRatio, ci: s.qualityRatioCI };
}

const f = (x) => x.toFixed(3);
const rows = [], gaps = {};
for (const label of [control, candidate]) {
  const en = ratio(label, "en"), pt = ratio(label, "pt");
  gaps[label] = en.r - pt.r;
  rows.push(`| ${label} | ${f(en.r)} (${f(en.ci[0])}–${f(en.ci[1])}, n=${en.n}) | ${f(pt.r)} (${f(pt.ci[0])}–${f(pt.ci[1])}, n=${pt.n}) | ${(100 * gaps[label]).toFixed(1)} pts |`);
}
const pass = gaps[candidate] <= gaps[control] + MARGIN;
const L = [`# PT vs EN: ${candidate} vs ${control}`, "",
  `TL;DR: **${pass ? "PASS" : "FAIL"}**: candidate gap ${(100 * gaps[candidate]).toFixed(1)} pts vs control ${(100 * gaps[control]).toFixed(1)} pts (blocks above control + ${100 * MARGIN} pt). Target gap <= ${100 * TARGET} pts: ${gaps[candidate] <= TARGET ? "met" : "not met (recorded goal, not blocking)"}. Jev, 4B with packs, v2 non-food items. Regenerate with \`node eval/scripts/pt-gap-check.mjs ${control} ${candidate}\`.`, "",
  "| Gate | EN quality ratio (95% CI) | PT quality ratio (95% CI) | Gap EN − PT |", "|---|---|---|---|", ...rows, ""];
writeFileSync(join(EVAL_DIR, "reports", `pt-gap-${control}-vs-${candidate}.md`), L.join("\n"));
console.log(L.join("\n"));
process.exit(pass ? 0 : 1);
