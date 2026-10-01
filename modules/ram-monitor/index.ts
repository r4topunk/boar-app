import { requireNativeModule } from "expo-modules-core";

export interface MemoryInfo {
  /** Resident set size in bytes (includes resident mmap'd pages, e.g. the loaded GGUF model). */
  rssBytes: number;
  /** Proportional set size in bytes, via ActivityManager (cross-check figure). */
  totalPssBytes: number;
}

export interface HardwareInfo {
  /** Chipset model, e.g. "MT6897" (Android 12+; "" before that). */
  socModel: string;
  socManufacturer: string;
  /** Build.HARDWARE, often the chipset's board name on older phones. */
  hardware: string;
  apiLevel: number;
  /** The Features line of /proc/cpuinfo, e.g. "fp asimd ... asimddp ... i8mm". */
  cpuFeatures: string;
  /** Each core's top frequency in kHz, in core order; 0 where unknown. */
  coreMaxFreqKHz: number[];
}

export interface PowerInfo {
  /** 0..1, -1 when unknown. */
  batteryLevel: number;
  /** null when the OS doesn't know (e.g. the simulator). Full on the charger counts as charging. */
  charging: boolean | null;
  lowPowerMode: boolean | null;
}

interface RamMonitorNativeModule {
  getMemoryInfo(): MemoryInfo;
  getDeviceTotalRamBytes(): number;
  getHardwareInfo?(): HardwareInfo;
  getAvailableRamBytes?(): number;
  getThermalState?(): string;
  getPowerInfo?(): Promise<PowerInfo>;
}

const RamMonitor = requireNativeModule<RamMonitorNativeModule>("RamMonitor");

export function getMemoryInfo(): MemoryInfo {
  return RamMonitor.getMemoryInfo();
}

/** Total physical RAM on this device (not this app's usage) — 0 if unavailable. */
export function getDeviceTotalRamBytes(): number {
  try {
    return RamMonitor.getDeviceTotalRamBytes();
  } catch {
    return 0;
  }
}

/** The phone's chipset and CPU, or null on a native build that predates this call. */
export function getHardwareInfo(): HardwareInfo | null {
  try {
    return RamMonitor.getHardwareInfo ? RamMonitor.getHardwareInfo() : null;
  } catch {
    return null;
  }
}

/**
 * RAM available to a new allocation (ActivityManager availMem ≈ MemAvailable:
 * free + reclaimable cache). 0 if unavailable (e.g. a native build without
 * this function, or a platform that does not implement it yet).
 */
export function getAvailableRamBytes(): number {
  try {
    return RamMonitor.getAvailableRamBytes?.() ?? 0;
  } catch {
    return 0;
  }
}

/** iOS's ProcessInfo.thermalState ("nominal" | "fair" | "serious" | "critical"), or "unknown" (Android, older native builds). */
export function getThermalState(): string {
  try {
    return RamMonitor.getThermalState?.() ?? "unknown";
  } catch {
    return "unknown";
  }
}

/** Battery level, charging and Low Power Mode (iOS), or null where the native build lacks it. */
export async function getPowerInfo(): Promise<PowerInfo | null> {
  try {
    return (await RamMonitor.getPowerInfo?.()) ?? null;
  } catch {
    return null;
  }
}
