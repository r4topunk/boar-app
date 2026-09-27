import { describe, expect, it } from "vitest";
import { checkPlaces } from "./places-check.mjs";

describe("checkPlaces", () => {
  it("fails the PL-1 bug: Berlin with the pack installed answers 'no places'", () => {
    const r = checkPlaces({ queryId: "places-001", answer: "I couldn't find any places matching that in the offline data." });
    expect(r.pass).toBe(false);
  });
  it("passes Berlin listing real vegan venues with the OpenStreetMap source", () => {
    const r = checkPlaces({ queryId: "places-001", answer: "Vegan places in Berlin (OpenStreetMap):\n1. Tibet Haus\n2. Kopps\n3. Lucky Leek\n4. Brammibal's Donuts" });
    expect(r).toEqual({ pass: true, failures: [], warnings: [] });
  });
  it("Tokyo without a pack must say there is no data and list nothing", () => {
    expect(checkPlaces({ queryId: "places-003", answer: "I don't have offline places data for Tokyo. Install a places pack for it." }).pass).toBe(true);
    expect(checkPlaces({ queryId: "places-003", answer: "Here are vegan restaurants in Tokyo:\n1. T's TanTan\n2. Ain Soph\n3. Brown Rice" }).pass).toBe(false);
  });
  it("ignores other items", () => {
    expect(checkPlaces({ queryId: "safety-001", answer: "x" })).toBeNull();
  });
});
