/**
 * Boot timing marks (performance investigation, not a feature): one log line per stage,
 * "[boot] <stage> +<ms since JS start> (<ms since previous mark>)". Read in Xcode/logcat, or in
 * Documents/perf-marks.log: on iOS the console lines are os_log, which a device dump needs sudo for
 * (Harbor, iPhone 13). Copy it with:
 *   xcrun devicectl device copy from --device <UDID> --domain-type appDataContainer \
 *     --domain-identifier <bundle id> --source Documents/perf-marks.log --destination ./perf-marks.log
 */
import * as FileSystem from "expo-file-system/legacy";

const PERF_LOG = `${FileSystem.documentDirectory}perf-marks.log`;
const lines: string[] = [];
let pending: ReturnType<typeof setTimeout> | null = null;

/** A perf line to the console and to Documents/perf-marks.log (the whole run, rewritten at most every 500 ms). */
export function perfLog(line: string): void {
  console.info(line);
  lines.push(`${new Date().toISOString()} ${line}`);
  pending ??= setTimeout(() => {
    pending = null;
    FileSystem.writeAsStringAsync(PERF_LOG, `${lines.join("\n")}\n`).catch(() => {});
  }, 500);
}

// answer.ts (pure, no expo import) reaches the file sink through this hook.
(globalThis as { __perfLog?: (l: string) => void }).__perfLog = perfLog;

const g = globalThis as { __bootT0?: number; __bootLast?: number };

export function bootMark(stage: string): void {
  const now = Date.now();
  g.__bootT0 ??= now;
  const since = now - g.__bootT0;
  const step = now - (g.__bootLast ?? g.__bootT0);
  g.__bootLast = now;
  perfLog(`[boot] ${stage} +${since}ms (${step}ms)`);
}

/** Times an async stage: "<stage>:start" and "<stage>:end". */
export async function bootTimed<T>(stage: string, work: () => Promise<T>): Promise<T> {
  bootMark(`${stage}:start`);
  try {
    return await work();
  } finally {
    bootMark(`${stage}:end`);
  }
}
