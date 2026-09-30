// Sends one evaluation run to the BOAR project's submit-results function (supabase/). Only
// called after the user confirms on the Evaluation screen; see shareResults.pure.ts.
import { Platform } from "react-native";
import { createDeviceKey, deleteDeviceKey, deviceKeySupported, hasDeviceKey, signWithDeviceKey } from "device-key";
import { getDeviceTotalRamBytes, getHardwareInfo } from "ram-monitor";
import appConfig from "../../app.json";
import { getShareDeviceId, setShareDeviceId } from "../models/settings";
import { networkAllowed } from "../config/variant";
import type { EvalResultRow } from "./evalHarness.pure";
import {
  buildSubmission,
  parseCpuFeatures,
  shareOutcome,
  signedMessage,
  submitResultsUrl,
  type ShareDevice,
  type ShareOutcome,
} from "./shareResults.pure";

// Expo inlines EXPO_PUBLIC_* at build time only when they're read by their full name.
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const ENDPOINT = submitResultsUrl(SUPABASE_URL, PUBLISHABLE_KEY);

/**
 * False in builds made without the Supabase values in .env, in the offline build (no network
 * permission), and on phones without a hardware key (emulators, simulators): no share button.
 */
export const resultsSharingAvailable = ENDPOINT !== null && networkAllowed() && deviceKeySupported();

/** Everything about this phone that a shared run carries (listed on the preview before sending). */
export function shareDevice(): ShareDevice {
  const c = Platform.constants as { Brand?: string; Model?: string; Release?: string; osVersion?: string };
  const hw = getHardwareInfo();
  const cores = hw?.coreMaxFreqKHz ?? [];
  return {
    platform: Platform.OS === "ios" ? "ios" : "android",
    osVersion: c.Release ?? c.osVersion ?? String(Platform.Version),
    apiLevel: hw?.apiLevel,
    brand: c.Brand,
    model: c.Model,
    soc: hw?.socModel,
    socManufacturer: hw?.socManufacturer,
    hardware: hw?.hardware,
    ramBytes: getDeviceTotalRamBytes(),
    cpuCores: cores.length > 0 ? cores.length : undefined,
    cpuFeatures: hw ? parseCpuFeatures(hw.cpuFeatures) : undefined,
    coreMaxFreqKHz: cores.length > 0 ? cores : undefined,
  };
}

async function post(body: unknown): Promise<{ status: number; body: any }> {
  const res = await fetch(ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: PUBLISHABLE_KEY! },
    body: JSON.stringify(body),
  });
  let json: any = null;
  try {
    json = await res.json();
  } catch {
    // an empty or non-JSON answer: the status says enough
  }
  return { status: res.status, body: json };
}

/**
 * Sends one run, signed with this phone's hardware key: ask for a one-time challenge, sign
 * `challenge.payload`, send. The first share (or one after the server forgot the key) creates the
 * key with that challenge in its attestation, so the server can check it is a real phone running
 * BOAR. Nothing here is retried on its own except that one re-registration.
 */
export async function shareEvalRun(rows: EvalResultRow[]): Promise<ShareOutcome> {
  if (!resultsSharingAvailable || rows.length === 0) return { result: "failed" };
  const platform = Platform.OS === "ios" ? "ios" : "android";
  const payload = JSON.stringify(buildSubmission(rows, shareDevice(), appConfig.expo.version));
  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      const issued = await post({ step: "challenge" });
      const challenge = issued.body?.challenge;
      if (issued.status !== 200 || typeof challenge !== "string") return shareOutcome(issued.status, issued.body);

      const knownId = hasDeviceKey() ? await getShareDeviceId() : undefined;
      let device: Record<string, unknown>;
      if (knownId) {
        device = { platform, id: knownId };
      } else {
        const key = await createDeviceKey(challenge);
        device = { platform, attestation: key.attestation, keyId: key.keyId };
      }
      const signature = await signWithDeviceKey(signedMessage(challenge, payload));
      const sent = await post({ step: "submit", challenge, payload, signature, device });
      if (typeof sent.body?.device === "string") await setShareDeviceId(sent.body.device);
      // The server doesn't know this key (e.g. its data was reset): make a new one, once.
      if (sent.status === 412 && attempt === 0) {
        await setShareDeviceId(undefined);
        deleteDeviceKey();
        continue;
      }
      return shareOutcome(sent.status, sent.body);
    }
    return { result: "failed" };
  } catch {
    return { result: "failed" };
  }
}
