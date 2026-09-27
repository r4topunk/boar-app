#!/usr/bin/env node
// Writes the empty-chat suggestions of a source tree (chat.suggestions.* in src/i18n/locales/{en,pt}.json) as a
// dataset for the gate's "suggestions" item. Ids come from the English text (lib/suggestion-check.mjs).
// Usage: node scripts/extract-suggestions.mjs <tree-root> <out.jsonl>
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { suggestionId } from "./lib/suggestion-check.mjs";

const [root, out] = process.argv.slice(2);
const load = (l) => JSON.parse(readFileSync(join(root, "src/i18n/locales", `${l}.json`), "utf8")).chat?.suggestions ?? {};
const en = load("en"), pt = load("pt");
const rows = Object.keys(en).flatMap((k) => [
  { id: suggestionId(en[k], "en"), key: k, category: "suggestion", query: en[k], lang: "en", gold: [], license: "original", source_url: "src/i18n/locales/en.json" },
  ...(pt[k] ? [{ id: suggestionId(en[k], "pt"), key: k, category: "suggestion", query: pt[k], lang: "pt-BR", gold: [], license: "original", source_url: "src/i18n/locales/pt.json" }] : []),
]);
writeFileSync(out, rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
console.log(`${rows.length} suggestions -> ${out}`);
