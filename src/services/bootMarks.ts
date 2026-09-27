/**
 * Boot timing marks (performance investigation, not a feature): one log line per stage,
 * "[boot] <stage> +<ms since JS start> (<ms since previous mark>)". Read in Xcode/logcat.
 */
const g = globalThis as { __bootT0?: number; __bootLast?: number };

export function bootMark(stage: string): void {
  const now = Date.now();
  g.__bootT0 ??= now;
  const since = now - g.__bootT0;
  const step = now - (g.__bootLast ?? g.__bootT0);
  g.__bootLast = now;
  console.info(`[boot] ${stage} +${since}ms (${step}ms)`);
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
