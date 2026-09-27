/**
 * Reads what is on disk and applies decideInitialRoute: the route to open,
 * and the answer model to save as active so the chat never loads one that
 * is missing (chosen by Tusk's rankAnswerModels among the installed models).
 */
import type { AssetStatus, ModelManager } from "../../models/ModelManager";
import { MODEL_CATALOG } from "../../models/manifest";
import { listDiscoveredModels } from "../../models/discoveredModels";
import { getActiveModelId, setActiveModelId } from "../../models/settings";
import { measuredSpeeds } from "../../routing/depth";
import { listRecentExecutions } from "../../services/executionTelemetry";
import { getDeviceTotalRamBytes } from "ram-monitor";
import { fitFor } from "./adapters";
import { decideInitialRoute } from "./initialRoute";
import { bootMark, bootTimed } from "../../services/bootMarks";

/** Same rule as ModelManager.requiredModelsPresent: on disk and complete. */
const complete = (s: AssetStatus) => s.present && (!s.asset.sizeBytes || s.sizeOnDiskBytes === s.asset.sizeBytes);

export async function initialRoute(modelManager: ModelManager): Promise<"Main" | "Setup"> {
  const llms = [...MODEL_CATALOG, ...(await bootTimed("boot.discoveredModels", () => listDiscoveredModels()))].filter((m) => m.kind === "llm");
  const [requiredPresent, statuses, activeLlmId, speeds] = await Promise.all([
    bootTimed("boot.requiredModelsPresent", () => modelManager.requiredModelsPresent()),
    bootTimed("boot.statusOf-llms", () => Promise.all(llms.map((m) => modelManager.statusOf(m)))),
    getActiveModelId("llm"),
    // Speeds only help the ranking; a missing history never blocks the boot.
    bootTimed("boot.recentExecutions", () => listRecentExecutions(200)).then(measuredSpeeds).catch(() => new Map<string, number>()),
  ]);
  let totalRamBytes = 0;
  try {
    totalRamBytes = getDeviceTotalRamBytes();
  } catch {
    totalRamBytes = 0;
  }
  const installed = statuses.filter(complete).map((s) => s.asset);
  bootMark("boot.fitFor-and-rank:start");
  const decision = decideInitialRoute({
    requiredPresent,
    installedLlms: installed.map((m) => ({
      id: m.id,
      answerTier: m.answerTier,
      sizeBytes: m.sizeBytes,
      fit: fitFor(m)?.verdict,
      tokPerSec: speeds.get(m.id),
    })),
    totalRamBytes,
    activeLlmId,
  });
  bootMark("boot.fitFor-and-rank:end");
  if (decision.setActiveLlmId) await setActiveModelId("llm", decision.setActiveLlmId);
  return decision.route;
}
