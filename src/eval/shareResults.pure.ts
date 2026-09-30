// Sharing an evaluation run with the BOAR project (supabase/functions/submit-results). Pure
// parts: what gets sent, and what the server's answer means. The app never sends anything on
// its own; the user presses "Share results" and confirms what is listed. The run is signed with
// the phone's hardware key (modules/device-key); see shareResults.ts.
import type { EvalResultRow } from "./evalHarness.pure";

export interface ShareDevice {
  platform: "android" | "ios";
  osVersion?: string;
  apiLevel?: number;
  brand?: string;
  model?: string;
  /** Chipset, e.g. "MT6897" (Android 12+). */
  soc?: string;
  socManufacturer?: string;
  /** Build.HARDWARE: the board name, often the chipset on older phones. */
  hardware?: string;
  ramBytes?: number;
  cpuCores?: number;
  /** CPU flags from /proc/cpuinfo, e.g. ["asimddp", "i8mm"]. */
  cpuFeatures?: string[];
  /** Each core's top frequency in kHz, in core order; 0 where unknown. */
  coreMaxFreqKHz?: number[];
}

/** The signed payload: no install id or account, the device is the attested key. */
export interface ShareSubmission {
  run: {
    runId: string;
    evalSetVersion: string;
    appVersion: string;
    platform: "android" | "ios";
    osVersion?: string;
    apiLevel?: number;
    deviceBrand?: string;
    deviceModel?: string;
    soc?: string;
    socManufacturer?: string;
    hardware?: string;
    ramBytes?: number;
    cpuCores?: number;
    cpuFeatures?: string[];
    coreMaxFreqKHz?: number[];
  };
  rows: EvalResultRow[];
}

/** Both values come from .env (EXPO_PUBLIC_*); without them the app has no share button. */
export function submitResultsUrl(supabaseUrl: string | undefined, publishableKey: string | undefined): string | null {
  if (!supabaseUrl || !publishableKey) return null;
  return `${supabaseUrl.replace(/\/+$/, "")}/functions/v1/submit-results`;
}

export function buildSubmission(
  rows: EvalResultRow[],
  device: ShareDevice,
  appVersion: string
): ShareSubmission {
  const first = rows[0];
  return {
    run: {
      runId: first.runId,
      evalSetVersion: first.evalSetVersion,
      appVersion,
      platform: device.platform,
      osVersion: device.osVersion,
      apiLevel: device.apiLevel,
      deviceBrand: device.brand,
      deviceModel: device.model,
      soc: device.soc || undefined,
      socManufacturer: device.socManufacturer || undefined,
      hardware: device.hardware || undefined,
      ramBytes: device.ramBytes && device.ramBytes > 0 ? device.ramBytes : undefined,
      cpuCores: device.cpuCores,
      cpuFeatures: device.cpuFeatures,
      coreMaxFreqKHz: device.coreMaxFreqKHz,
    },
    rows,
  };
}

export type ShareResult =
  | "shared"
  | "already-shared"
  | "rate-limited"
  | "cooldown"
  | "network-limited"
  | "rejected"
  | "failed";

export interface ShareOutcome {
  result: ShareResult;
  /** When this phone may share again (rate-limited, cooldown), as the server's ISO time. */
  retryAt?: string;
}

/** What submit-results answered, as something the screen can say. */
export function shareOutcome(status: number, body?: { error?: unknown; retryAt?: unknown } | null): ShareOutcome {
  if (status === 201) return { result: "shared" };
  if (status === 409) return { result: "already-shared" };
  if (status === 429) {
    // Many phones on one network (shared Wi-Fi, mobile carrier) together hit a separate cap.
    if (body?.error === "network_limited") return { result: "network-limited" };
    const retryAt = typeof body?.retryAt === "string" && !Number.isNaN(Date.parse(body.retryAt)) ? body.retryAt : undefined;
    return { result: body?.error === "cooldown" ? "cooldown" : "rate-limited", retryAt };
  }
  if (status >= 400 && status < 500) return { result: "rejected" };
  return { result: "failed" };
}

/** The string the phone's key signs: the server's one-time challenge, then the exact payload. */
export const signedMessage = (challenge: string, payload: string): string => `${challenge}.${payload}`;

/** The Features line of /proc/cpuinfo as a list of flags. */
export function parseCpuFeatures(line: string | undefined): string[] {
  return (line ?? "").split(/\s+/).filter(Boolean);
}

/** "MediaTek MT6897", falling back to the board name when Android doesn't report the chipset. */
export function describeChipset(d: ShareDevice): string | undefined {
  if (d.soc) return [d.socManufacturer, d.soc].filter(Boolean).join(" ");
  return d.hardware || undefined;
}

/** "4 × 3.35 GHz + 4 × 2.2 GHz": cores grouped by top frequency, fastest first. */
export function describeCores(coreMaxFreqKHz: number[] | undefined): string | undefined {
  const known = (coreMaxFreqKHz ?? []).filter((f) => f > 0);
  if (known.length === 0) return undefined;
  const counts = new Map<number, number>();
  for (const f of known) counts.set(f, (counts.get(f) ?? 0) + 1);
  return Array.from(counts.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([f, n]) => `${n} × ${Number((f / 1e6).toFixed(2))} GHz`)
    .join(" + ");
}

/** The CPU features llama.cpp's speed depends on most: int8 matrix multiply and dot product. */
export function inferenceFeatures(features: string[] | undefined): { i8mm: boolean; dotprod: boolean } | undefined {
  if (!features || features.length === 0) return undefined;
  return { i8mm: features.includes("i8mm"), dotprod: features.includes("asimddp") };
}
