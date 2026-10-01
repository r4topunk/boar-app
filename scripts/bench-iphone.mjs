#!/usr/bin/env node
// Benchmarks the answer model's llama.rn settings on a USB-connected iPhone (llama.rn's bench(), the
// llama-bench twin) and prints tok/s per config against the app's current settings. Transport only, like
// scripts/eval-iphone.mjs: the request goes into the app container with devicectl and the app runs it
// (src/bench/modelBench.ts). No UI automation, no WDA, no screen recording competing for the CPU.
// Needs Node >= 23.6 (it imports src/bench/modelBench.pure.ts directly) and a build that answers device
// requests (a development build, or EXPO_PUBLIC_DEVICE_EVAL=1). Unplug the phone: charging heats it.
//
//   node scripts/bench-iphone.mjs [options]
//
//   --grid <default|file.json>  configs to run (default: the built-in grid below; a file holds a JSON array)
//   --only <ids>                comma list, run only these config ids (the baseline is always kept)
//   --reps <n>                  runs per config (default 3)        --pp <n> --tg <n>  tokens (default 512 / 64)
//   --cool <nominal|fair>       wait before each run until the phone is this cool (default nominal)
//   --cool-max-s <n>            ...but no longer than this (default 180)
//   --model <id|fragment>       installed answer model (default: the chat's)
//   --metal                     launch with Metal allowed and add the Metal configs (default: CPU, as the app runs)
//   --bundle <id>               app bundle (default team.sopa.boar)   --udid <id>   device (default: the only iPhone)
//   --no-launch                 don't (re)launch the app; it must already be in the foreground
//   --out <dir>                 where to save rows + report (default: eval-results/bench/<date>)
//   --timeout-min <n>           give up after n minutes (default 60)
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, openSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { parseBenchRequest, runOrder, summarize } from "../src/bench/modelBench.pure.ts";

const POLL_MS = 10_000;
const PICKUP_TIMEOUT_MS = 5 * 60_000;
const BASELINE = "base";

// The app on a ≤4.5 GB phone (iPhone 13): n_ctx 2048 (contextSizeForRam), 4 threads (LlamaEngine), llama.rn's
// default batch sizes, f16 KV cache, flash attention off on iOS (initFallback), CPU only.
const BASE = { id: BASELINE, n_ctx: 2048, n_threads: 4, n_gpu_layers: 0 };
const DEFAULT_GRID = [
  BASE,
  // A15: 2 performance + 4 efficiency cores. Fewer threads can beat 4 when the slow cores hold the rest back.
  { ...BASE, id: "t2", n_threads: 2 },
  { ...BASE, id: "t3", n_threads: 3 },
  { ...BASE, id: "t5", n_threads: 5 },
  { ...BASE, id: "t6", n_threads: 6 },
  // Prefill batch sizes.
  { ...BASE, id: "ub256", n_ubatch: 256 },
  { ...BASE, id: "ub128", n_ubatch: 128 },
  { ...BASE, id: "b256", n_batch: 256, n_ubatch: 256 },
  // Flash attention and a smaller KV cache (a quantized V cache needs flash attention).
  { ...BASE, id: "fa", flash_attn_type: "on" },
  { ...BASE, id: "kvq8", flash_attn_type: "on", cache_type_k: "q8_0", cache_type_v: "q8_0" },
  { ...BASE, id: "kq8", cache_type_k: "q8_0" },
];
const METAL_GRID = [
  { ...BASE, id: "metal", n_gpu_layers: 99 },
  { ...BASE, id: "metal-fa", n_gpu_layers: 99, flash_attn_type: "on" },
];

function parseArgs(argv) {
  const o = { grid: "default", reps: 3, pp: 512, tg: 64, cool: "nominal", coolMaxS: 180, bundle: "team.sopa.boar", launch: true, timeoutMin: 60 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      if (i + 1 >= argv.length) throw new Error(`${a} needs a value`);
      return argv[++i];
    };
    if (a === "--grid") o.grid = next();
    else if (a === "--only") o.only = next().split(",").map((s) => s.trim()).filter(Boolean);
    else if (a === "--reps") o.reps = Number(next());
    else if (a === "--pp") o.pp = Number(next());
    else if (a === "--tg") o.tg = Number(next());
    else if (a === "--cool") o.cool = next();
    else if (a === "--cool-max-s") o.coolMaxS = Number(next());
    else if (a === "--model") o.model = next();
    else if (a === "--metal") o.metal = true;
    else if (a === "--bundle") o.bundle = next();
    else if (a === "--udid") o.udid = next();
    else if (a === "--no-launch") o.launch = false;
    else if (a === "--out") o.out = next();
    else if (a === "--timeout-min") o.timeoutMin = Number(next());
    else if (a === "--help" || a === "-h") o.help = true;
    else throw new Error(`unknown option ${a}`);
  }
  return o;
}

const fail = (msg) => {
  console.error(`\n✗ ${msg}`);
  process.exit(1);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const devicectl = (args, { allowFail = false } = {}) => {
  try {
    return execFileSync("xcrun", ["devicectl", ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    if (allowFail) return null;
    throw new Error(`devicectl ${args.slice(0, 3).join(" ")} failed: ${(e.stderr || e.message || "").toString().trim().slice(0, 400)}`);
  }
};

function findIphone() {
  const tmp = join(tmpdir(), `devicectl-${process.pid}.json`);
  devicectl(["list", "devices", "--json-output", tmp]);
  const devices = JSON.parse(readFileSync(tmp, "utf8")).result?.devices ?? [];
  rmSync(tmp, { force: true });
  const phones = devices.filter(
    (d) =>
      d.hardwareProperties?.platform === "iOS" &&
      d.hardwareProperties?.reality === "physical" &&
      (d.connectionProperties?.tunnelState === "connected" || (d.connectionProperties?.pairingState === "paired" && d.connectionProperties?.transportType))
  );
  if (phones.length !== 1) throw new Error(`expected exactly one connected physical iPhone, found ${phones.length} (pass --udid)`);
  return phones[0].hardwareProperties.udid;
}

const copyTo = (o, src, dst) =>
  devicectl(["device", "copy", "to", "--device", o.udid, "--domain-type", "appDataContainer", "--domain-identifier", o.bundle, "--source", src, "--destination", dst]);
const copyFrom = (o, src, dst) =>
  devicectl(
    ["device", "copy", "from", "--device", o.udid, "--domain-type", "appDataContainer", "--domain-identifier", o.bundle, "--source", src, "--destination", dst],
    { allowFail: true }
  ) !== null && existsSync(dst);

const pct = (d) => (d == null ? "-" : `${d >= 0 ? "+" : ""}${(d * 100).toFixed(0)}%`);
const f1 = (x) => (x == null ? "-" : x.toFixed(1));

function report(rows, o) {
  const summary = summarize(rows, BASELINE);
  const thermals = [...new Set(rows.flatMap((r) => [r.thermalBefore, r.thermalAfter]))].join(", ");
  const charging = rows.some((r) => r.power?.charging === true);
  const lines = [
    `# iPhone model bench ${o.requestId}`,
    "",
    `Model ${rows[0]?.model ?? "?"} · pp ${o.pp} · tg ${o.tg} · ${o.reps} reps · cool to ${o.cool} · ${o.metal ? "Metal allowed" : "CPU (as the app)"}`,
    `Thermal states seen: ${thermals}${charging ? " · ⚠ charging during the run" : ""}`,
    "",
    "| config | n | pp t/s | Δ pp | tg t/s | Δ tg | warm starts | failed |",
    "|---|---|---|---|---|---|---|---|",
    ...summary.map((s) => `| ${s.configId} | ${s.n} | ${f1(s.ppTps)} | ${pct(s.ppDelta)} | ${f1(s.tgTps)} | ${pct(s.tgDelta)} | ${s.warmStarts} | ${s.failed} |`),
    "",
    "Median of the reps. Δ against `base` (the app's current settings). A warm start began above \"nominal\":",
    "its numbers may be thermally limited. Decode (tg) drives the answer time; prefill (pp) drives the wait before the first word.",
  ];
  const errors = rows.filter((r) => !r.ok).map((r) => `- ${r.configId} rep ${r.rep + 1}: ${r.error}`);
  if (errors.length) lines.push("", "Failures:", ...errors);
  return lines.join("\n") + "\n";
}

async function main() {
  const o = parseArgs(process.argv.slice(2));
  if (o.help) {
    console.log(readFileSync(new URL(import.meta.url), "utf8").split("\n").slice(1, 22).map((l) => l.replace(/^\/\/ ?/, "")).join("\n"));
    return;
  }
  let configs = o.grid === "default" ? [...DEFAULT_GRID, ...(o.metal ? METAL_GRID : [])] : JSON.parse(readFileSync(o.grid, "utf8"));
  if (o.only) configs = configs.filter((c) => c.id === BASELINE || o.only.includes(c.id));
  o.requestId = `bench-${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)}`;
  const request = {
    requestId: o.requestId,
    configs,
    pp: o.pp,
    tg: o.tg,
    reps: o.reps,
    coolUntil: o.cool,
    coolMaxWaitMs: o.coolMaxS * 1000,
    ...(o.model ? { model: o.model } : {}),
  };
  parseBenchRequest(request); // the app's own validation: fail here, not on the phone
  o.udid ??= findIphone();
  const out = o.out ?? join("eval-results", "bench", o.requestId);
  mkdirSync(out, { recursive: true });
  const runs = runOrder(configs.map((c) => c.id), o.reps).length;
  console.log(`▸ ${configs.length} configs × ${o.reps} reps = ${runs} runs on ${o.udid} (${o.bundle}) → ${out}`);

  if (o.launch) {
    const log = join(out, "console.log");
    const env = o.metal ? '{"OS_ACTIVITY_DT_MODE":"YES"}' : '{"GGML_METAL_DEVICES":"0","OS_ACTIVITY_DT_MODE":"YES"}';
    const child = spawn("xcrun", ["devicectl", "device", "process", "launch", "--device", o.udid, "--terminate-existing", "--console", "-e", env, o.bundle], {
      stdio: ["ignore", openSync(log, "w"), openSync(log, "a")],
      detached: true,
    });
    child.unref();
    console.log(`✓ launched ${o.bundle} (console → ${log}); waiting for the chat to be ready`);
    await sleep(15_000);
  }

  const reqFile = join(out, "request.json");
  writeFileSync(reqFile, JSON.stringify(request, null, 2));
  const sentAt = Date.now();
  copyTo(o, reqFile, "Documents/bench/requests/pending.json");
  console.log("✓ request sent; the app picks it up from the chat screen within a few seconds");

  const statusLocal = join(out, "status.json");
  let status = null;
  let lastLine = "";
  const deadline = Date.now() + o.timeoutMin * 60_000;
  while (Date.now() < deadline) {
    await sleep(POLL_MS);
    if (!copyFrom(o, `Documents/bench/requests/${o.requestId}.status.json`, statusLocal)) {
      if (Date.now() - sentAt > PICKUP_TIMEOUT_MS) fail("the app never picked the request up (is BOAR in the foreground, on the chat, with a build that answers device requests?)");
      continue;
    }
    status = JSON.parse(readFileSync(statusLocal, "utf8"));
    const line = `${status.state} ${status.completed}/${status.total} ${status.current ?? ""} [${status.thermal ?? "?"}]`;
    if (line !== lastLine) console.log(`  ${new Date().toTimeString().slice(0, 8)} ${line}`);
    lastLine = line;
    if (status.state === "done" || status.state === "failed") break;
  }
  if (!status || status.state === "running") fail(`timed out after ${o.timeoutMin} min`);

  const rowsLocal = join(out, "rows.jsonl");
  const haveRows = status.resultPath && copyFrom(o, status.resultPath, rowsLocal);
  if (status.state === "failed") console.error(`✗ the app reported: ${status.error}`);
  if (!haveRows) fail("no rows to copy back");
  const rows = readFileSync(rowsLocal, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
  const md = report(rows, o);
  writeFileSync(join(out, "report.md"), md);
  console.log("\n" + md);
}

main().catch((e) => fail(e?.message ?? String(e)));
