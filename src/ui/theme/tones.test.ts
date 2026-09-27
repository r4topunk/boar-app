import { describe, expect, it } from "vitest";
import { hexToOklch } from "./oklch";
import { getPalette, Mode, PALETTE_IDS, ResolvedPalette } from "./palette";

/** Euclidean distance in OKLab (the eye's scale): ~0.02 is "the same colour", >= 0.05 tells apart at a glance. */
function deltaE(a: string, b: string): number {
  const [l1, c1, h1] = hexToOklch(a);
  const [l2, c2, h2] = hexToOklch(b);
  const r = Math.PI / 180;
  return Math.hypot(l1 - l2, c1 * Math.cos(h1 * r) - c2 * Math.cos(h2 * r), c1 * Math.sin(h1 * r) - c2 * Math.sin(h2 * r));
}

const TONES: (keyof ResolvedPalette)[] = ["accentText", "fieldText", "danger", "warning", "success", "info"];
/** Dark is the default and has the room; light needs low lightness for AA, where warm hues converge. */
const MIN: Record<Mode, number> = { dark: 0.07, light: 0.05 };

describe.each(PALETTE_IDS.flatMap((id) => (["dark", "light"] as Mode[]).map((m) => [id, m] as const)))("%s / %s", (id, mode) => {
  it("keeps every semantic text tone distinguishable from the others", () => {
    const p = getPalette(id, mode);
    for (let i = 0; i < TONES.length; i++) {
      for (let j = i + 1; j < TONES.length; j++) {
        const d = deltaE(p[TONES[i]] as string, p[TONES[j]] as string);
        expect(d, `${TONES[i]} vs ${TONES[j]}`).toBeGreaterThanOrEqual(MIN[mode]);
      }
    }
  });
});
