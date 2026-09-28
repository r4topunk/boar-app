/**
 * TEMPORARY PROBE (F2-2 on the iPhone, Boar 28/09): logs the path of the answer's blocks so the device
 * console shows why the declined text vanished. One line per event, tag "boar.motion", through console.warn:
 * RCTLog passes it in Release as os_log type INFO (subsystem com.facebook.react.log, category javascript),
 * seen with info messages on (Console.app "Include Info Messages", or `log stream --level info`).
 * Not console.error: in Release it goes through the ExceptionsManager as a soft error.
 * Remove: set MOTION_PROBE to false, or delete this file and every `probe(` call (grep "motionProbe").
 */
export const MOTION_PROBE = true;

const t0 = Date.now();

export function probe(event: string, data: Record<string, unknown> = {}): void {
  if (!MOTION_PROBE) return;
  const parts = Object.entries(data).map(([k, v]) => `${k}=${typeof v === "number" ? Math.round(v * 10) / 10 : String(v)}`);
  // eslint-disable-next-line no-console
  console.warn(`boar.motion +${Date.now() - t0}ms ${event} ${parts.join(" ")}`);
}
