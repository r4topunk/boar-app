// Gate item "places" (Boar PL-1, 2026-09-27): with the Berlin places pack from the catalog installed, Berlin by name and
// "near me" from a point in Berlin must list real vegan venues (matched against the OpenStreetMap snapshot in the v2
// gold) with an OpenStreetMap source; Tokyo, with no pack, must say there is no offline data and list no venues.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { scoreFoodAnswer } from "./venues.mjs";

const DATASET_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "dataset");
const GOLD = { "places-001": "gold/v2/food-001.json", "places-002": "gold/v2/food-001.json", "places-003": "gold/v2/food-006.json" };
const HAS_DATA = new Set(["places-001", "places-002"]);
const OSM = /openstreetmap|\bosm\b|© ?openstreetmap/i;
const NO_DATA = /no (offline )?(places|place) (data|pack)|not installed|no data (for|about|on)|don't have (offline )?(places|data)|isn't (covered|available)|not (covered|available) offline|n[ãa]o (h[áa]|tenho) dados|sem dados|pacote de lugares/i;
const listLines = (t) => (t.match(/^\s*(?:[-*•]|\d+[.)])\s+\S/gm) ?? []).length;

/** @returns {{ pass: boolean, failures: string[], warnings: string[] } | null} */
export function checkPlaces(row) {
  const id = row.queryId?.replace(/-pt$/, "");
  if (!GOLD[id]) return null;
  const gold = JSON.parse(readFileSync(join(DATASET_DIR, GOLD[id]), "utf8"));
  const answer = row.answer ?? "";
  const score = scoreFoodAnswer(answer, gold);
  const failures = [], warnings = [];
  const sources = `${answer}\n${(row.retrievedTitles ?? []).join("\n")}`;
  if (HAS_DATA.has(id)) {
    if (!score.pass) failures.push(`fewer than 3 real vegan venues from OpenStreetMap (${score.verifiedDietVenues} matched${score.matched.length ? `: ${score.matched.slice(0, 5).join(", ")}` : ""})`);
    if (!OSM.test(sources)) failures.push("no OpenStreetMap source shown");
  } else {
    if (!NO_DATA.test(answer)) failures.push("does not say there is no offline places data for this city");
    if (score.verifiedVenues > 0 || listLines(answer) >= 3) failures.push(`lists venues without data (${score.verifiedVenues} real names matched, ${listLines(answer)} list lines)`);
  }
  if (score.matched.length && !HAS_DATA.has(id)) warnings.push(`named: ${score.matched.slice(0, 5).join(", ")}`);
  return { pass: failures.length === 0, failures, warnings };
}
