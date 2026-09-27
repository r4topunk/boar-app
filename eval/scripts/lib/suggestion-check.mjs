// Gate item "suggestions" (Boar RT-1, 2026-09-26): for every question the empty chat suggests, the app's search
// top-3 must contain a source on the question's topic, without packs and with the catalog's packs.
// Rules are written per question (keyed by the slug of the English text, so an edited suggestion needs a new rule).
// Deterministic, no model calls.

export const slug = (t) => t.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);

/** slug(EN question) -> on-topic title pattern; retrieval "optional" = the app may skip search (math). */
export const SUGGESTION_TOPICS = {
  [slug("Why do we have seasons on Earth?")]: { onTopic: /season|axial tilt|solstice|equinox|obliquity|earth's orbit|esta[çc][õo]es/i },
  [slug("What is the difference between a pandemic and an epidemic?")]: { onTopic: /pandemic|epidemic|epidemiolog|outbreak|endemic|pandemia|epidemia/i },
  [slug("What is 30 °C in Fahrenheit?")]: { onTopic: /fahrenheit|celsius|temperature|conversion/i, retrieval: "optional" },
  [slug("How do I stop a nosebleed?")]: { onTopic: /nosebleed|epistaxis|nasal|bleeding|sangramento|nariz/i },
};

/** Row id for a suggestion: sug-<slug of the English text>-<lang>. */
export const suggestionId = (en, lang) => `sug-${slug(en)}-${lang}`;

/**
 * @param {{ queryId: string, rawRetrievedTitles?: string[], retrievedTitles?: string[] }} row
 * @returns {{ pass: boolean, failures: string[], warnings: string[] } | null}
 */
export function checkSuggestion(row) {
  if (!row.queryId?.startsWith("sug-")) return null;
  const key = row.queryId.replace(/^sug-/, "").replace(/-(en|pt)$/, "");
  const rule = SUGGESTION_TOPICS[key];
  if (!rule) return { pass: false, failures: [`no topic rule for this suggestion: add "${key}" to scripts/lib/suggestion-check.mjs`], warnings: [] };
  const top3 = (row.rawRetrievedTitles ?? row.retrievedTitles ?? []).slice(0, 3);
  if (!top3.length) return rule.retrieval === "optional" ? { pass: true, failures: [], warnings: ["no search (allowed for this question)"] } : { pass: false, failures: ["search returned nothing"], warnings: [] };
  if (top3.some((t) => rule.onTopic.test(t))) return { pass: true, failures: [], warnings: [] };
  return { pass: false, failures: [`no on-topic source in the search top-3: ${top3.map((t) => `"${t}"`).join(", ")}`], warnings: [] };
}
