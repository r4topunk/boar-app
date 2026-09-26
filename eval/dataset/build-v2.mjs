#!/usr/bin/env node
// Builds dataset v2 ("Vitalik style"): literal local-food questions with gold from OpenStreetMap (Overpass) and
// Wikivoyage "Eat" listings, plus specialist crypto questions and practical travel questions.
// Gold for food items is a dated snapshot written to dataset/gold/v2/<id>.json (ODbL / CC BY-SA).
// Usage (from eval/): node dataset/build-v2.mjs [--skip-fetch]   (network: Overpass, Wikipedia, Wikivoyage; no LLM)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const GOLD_DIR = join(DIR, "gold", "v2");
const UA = "boar-eval/0.2 (offline research app evaluation; https://github.com/rferrari/boar-app)";
const OVERPASS = process.env.OVERPASS_URL ?? "https://overpass-api.de/api/interpreter";
const skipFetch = process.argv.includes("--skip-fetch");
// Re-fetch only these ids (comma list after --refetch); default: fetch items without a gold file.
const VOYAGE_ONLY = new Set((process.argv.includes("--voyage-only") ? process.argv[process.argv.indexOf("--voyage-only") + 1] : "").split(",").filter(Boolean));
const REFETCH = new Set((process.argv.includes("--refetch") ? process.argv[process.argv.indexOf("--refetch") + 1] : "").split(",").filter(Boolean));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- food: literal phrasing from the post
// diet: which OSM tag set is the gold. located: the question depends on the device location (context.lat/lon).
const FOOD = [
  { city: "Berlin", wiki: "Berlin", voy: "Berlin", diet: "vegan", q: "Tell me the best vegan restaurants in Berlin" },
  { city: "Lisbon", wiki: "Lisbon", voy: "Lisbon", diet: "vegan", q: "Tell me the best vegan restaurants in Lisbon" },
  { city: "Buenos Aires", wiki: "Buenos Aires", voy: "Buenos Aires", diet: "vegan", q: "Tell me the best vegan restaurants in Buenos Aires" },
  { city: "Singapore", wiki: "Singapore", voy: "Singapore", diet: "vegan", q: "Tell me the best vegan restaurants in Singapore" },
  { city: "Chiang Mai", wiki: "Chiang Mai", voy: "Chiang Mai", diet: "vegan", q: "Tell me the best vegan restaurants in Chiang Mai" },
  { city: "Tokyo", wiki: "Tokyo", voy: "Tokyo", diet: "vegan", q: "Tell me the best vegan restaurants in Tokyo" },
  { city: "Bangkok", wiki: "Bangkok", voy: "Bangkok", diet: "vegan", q: "Tell me the best vegan restaurants in Bangkok" },
  { city: "Istanbul", wiki: "Istanbul", voy: "Istanbul", diet: "vegan", q: "Tell me the best vegan restaurants in Istanbul" },
  { city: "Mexico City", wiki: "Mexico City", voy: "Mexico City", diet: "vegan", q: "Tell me the best vegan restaurants in Mexico City" },
  { city: "Taipei", wiki: "Taipei", voy: "Taipei", diet: "vegan", q: "Tell me the best vegan restaurants in Taipei" },
  { city: "Seoul", wiki: "Seoul", voy: "Seoul", diet: "vegan", q: "Tell me the best vegan restaurants in Seoul" },
  { city: "Prague", wiki: "Prague", voy: "Prague", diet: "vegan", q: "Tell me the best vegan restaurants in Prague" },
  { city: "Tbilisi", wiki: "Tbilisi", voy: "Tbilisi", diet: "vegetarian", q: "Where can I eat vegetarian food in Tbilisi?" },
  { city: "Kyoto", wiki: "Kyoto", voy: "Kyoto", diet: "vegetarian", q: "What are good vegetarian restaurants in Kyoto?" },
  { city: "Medellín", wiki: "Medellín", voy: "Medellín", diet: "vegetarian", q: "Recommend some vegetarian restaurants in Medellín" },
  { city: "Cape Town", wiki: "Cape Town", voy: "Cape Town", diet: "vegan", q: "Tell me the best vegan restaurants in Cape Town" },
  { city: "São Paulo", wiki: "São Paulo", voy: "São Paulo", diet: "vegan", lang: "pt-BR", q: "Quais são os melhores restaurantes veganos em São Paulo?" },
  // Location-dependent: the literal "[city I am currently in]" form; the runner must use context.lat/lon (P1).
  { city: "Barcelona", wiki: "Barcelona", voy: "Barcelona", diet: "vegan", located: { lat: 41.3874, lon: 2.1686 }, q: "Tell me the best vegan restaurants in the city I am currently in" },
  { city: "Hong Kong", wiki: "Hong Kong", voy: "Hong Kong", diet: "vegan", located: { lat: 22.2819, lon: 114.1582 }, q: "Tell me the best vegan restaurants in the city I am currently in" },
  { city: "Denver", wiki: "Denver", voy: "Denver", diet: "vegan", located: { lat: 39.7392, lon: -104.9903 }, q: "Tell me the best vegan restaurants near me" },
];

// ---------------------------------------------------------------- specialist crypto / Ethereum / cryptography
const CRYPTO = [
  { q: "Which signature algorithms are quantum resistant?", notes: "Exact prompt from the post. NIST PQC signatures: ML-DSA (CRYSTALS-Dilithium, FIPS 204), SLH-DSA (SPHINCS+, FIPS 205), FN-DSA (Falcon, FIPS 206); stateful hash-based XMSS and LMS (NIST SP 800-208). RSA, DSA, ECDSA and EdDSA are NOT quantum resistant (Shor's algorithm). Citing RSA/factoring as the answer is wrong.", src: "https://csrc.nist.gov/projects/post-quantum-cryptography", wiki: "Post-quantum cryptography" },
  { q: "What is the difference between ML-DSA and SLH-DSA?", notes: "ML-DSA: lattice-based (Module-LWE/SIS), small fast signatures (~2.4-4.6 KB). SLH-DSA: stateless hash-based, security relies only on hash functions, much larger/slower signatures (~8-50 KB). Both NIST standards (FIPS 204/205, Aug 2024).", src: "https://csrc.nist.gov/pubs/fips/205/final", wiki: "SPHINCS+" },
  { q: "Why is RSA broken by quantum computers but SHA-256 is not?", notes: "Shor's algorithm solves factoring/discrete log in polynomial time, breaking RSA/ECC. For hashes only Grover gives a quadratic speedup (~128-bit preimage security for SHA-256), so they stay secure with adequate output size.", src: "https://en.wikipedia.org/wiki/Shor%27s_algorithm", wiki: "Shor's algorithm" },
  { q: "What is EIP-4844 and what are blobs in Ethereum?", notes: "Proto-danksharding (Dencun upgrade, March 2024): blob-carrying transactions with ~128 KB blobs, separate blob gas market, KZG commitments, data pruned after ~18 days; cuts rollup data costs.", src: "https://eips.ethereum.org/EIPS/eip-4844", wiki: "Ethereum" },
  { q: "How does finality work in Ethereum proof of stake?", notes: "Casper FFG + LMD-GHOST (Gasper). Checkpoints at epoch boundaries (32 slots x 12 s); justified with 2/3 of staked ETH attesting, finalized after the next checkpoint is justified: ~2 epochs (~12.8-15 min). Reverting needs slashing of >=1/3 of stake.", src: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/", wiki: "Proof of stake" },
  { q: "What is the difference between optimistic rollups and ZK rollups?", notes: "Optimistic: assume valid, fraud proofs, ~7-day challenge window for withdrawals (Arbitrum, Optimism/Base). ZK: validity proofs (SNARK/STARK) verified on L1, fast finality, heavier proving (zkSync, Starknet, Scroll, Linea).", src: "https://ethereum.org/en/developers/docs/scaling/", wiki: "Rollup (blockchain)" },
  { q: "What is account abstraction in Ethereum (ERC-4337)?", notes: "Smart-contract wallets without protocol change: UserOperations, alt mempool, bundlers, EntryPoint contract, paymasters (gas sponsorship), custom signature schemes. EIP-7702 (Pectra, 2025) lets EOAs set contract code.", src: "https://eips.ethereum.org/EIPS/eip-4337", wiki: "" },
  { q: "What are BLS signatures and why does Ethereum's consensus layer use them?", notes: "Pairing-based signatures on BLS12-381; aggregation of many validators' signatures into one, making attestations from hundreds of thousands of validators practical. Not quantum resistant.", src: "https://eth2book.info/capella/part2/building_blocks/signatures/", wiki: "BLS digital signature" },
  { q: "What is the difference between a zk-SNARK and a zk-STARK?", notes: "SNARK: succinct, small proofs, often trusted setup (Groth16) or universal setup (PLONK/KZG), pairing-based so not post-quantum. STARK: transparent (no trusted setup), hash-based so plausibly post-quantum, larger proofs.", src: "https://en.wikipedia.org/wiki/Non-interactive_zero-knowledge_proof", wiki: "Non-interactive zero-knowledge proof" },
  { q: "What is MEV and what is proposer-builder separation?", notes: "Maximal extractable value: profit from ordering/including/excluding transactions (arbitrage, sandwiching, liquidations). PBS splits block building from proposing; today via MEV-Boost relays (out of protocol); enshrined PBS (ePBS) is a research/upgrade topic.", src: "https://ethereum.org/en/developers/docs/mev/", wiki: "" },
];

// ---------------------------------------------------------------- practical travel (Wikivoyage-backed)
const TRAVEL = [
  { q: "What emergency numbers should I know in Thailand?", notes: "191 police, 1669 medical emergency/ambulance, 199 fire, 1155 tourist police (English).", voy: "Thailand" },
  { q: "What plug type and voltage does Brazil use?", notes: "Type N (IEC 60906-1) and older Type C; voltage varies by state/city: 127 V or 220 V, 60 Hz. Check locally.", voy: "Brazil" },
  { q: "Is tap water safe to drink in Mexico City?", notes: "Generally not recommended; use bottled/filtered (garrafón) water. Ice in established restaurants is usually purified.", voy: "Mexico City" },
  { q: "How do I get from Lisbon airport to the city center?", notes: "Metro red line (Aeroporto station) to the center with a transfer; also buses and taxis/ride-hailing; ~7 km. UNKNOWN-risk: bus lines change.", voy: "Lisbon" },
  { q: "What currency is used in Georgia (the country), and can I pay by card in Tbilisi?", notes: "Georgian lari (GEL). Cards widely accepted in Tbilisi; carry cash for markets, small shops and rural areas.", voy: "Georgia (country)" },
  { q: "Which side of the road do they drive on in Thailand, and can tourists drive there?", notes: "Left. An International Driving Permit (with home licence) is required for most visitors; scooter rentals without proper licence void insurance.", voy: "Thailand" },
  { q: "How do I say thank you in Thai, and does it change if I'm a man or a woman?", notes: "khop khun + polite particle: khrap (male speaker) / kha (female speaker).", voy: "Thai phrasebook" },
  { q: "When is the best time to visit Chiang Mai, and when is the smoky season?", notes: "Cool dry season Nov-Feb is best. Burning/smoky haze season roughly Feb/Mar-Apr (poor air quality). Rainy season ~May-Oct.", voy: "Chiang Mai" },
  { q: "Is tipping expected in restaurants in Portugal?", notes: "Not mandatory; service usually not added; rounding up or ~5-10% for good service in sit-down restaurants is common.", voy: "Portugal" },
  { q: "What should I know about using ride-hailing apps in Bangkok?", notes: "Grab is the main app (also Bolt, local taxis via apps); cars and motorbike taxis; agree via app price; metered taxis are an alternative. Time-sensitive: availability can change.", voy: "Bangkok" },
];

// ---------------------------------------------------------------- fetch helpers
async function getJson(url, init = {}) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { ...init, headers: { "User-Agent": UA, ...(init.headers ?? {}) } });
    if (res.ok) return res.json();
    if (res.status === 429 || res.status >= 500) { await sleep(10_000 * attempt); continue; }
    throw new Error(`${res.status} ${url}`);
  }
  throw new Error(`giving up on ${url}`);
}

async function wikidataId(title) {
  const j = await getJson(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageprops&redirects=1&titles=${encodeURIComponent(title)}`);
  const page = Object.values(j.query.pages)[0];
  return page?.pageprops?.wikibase_item ?? null;
}

async function cityCenter(title) {
  const j = await getJson(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates&redirects=1&titles=${encodeURIComponent(title)}`);
  const c = Object.values(j.query.pages)[0]?.coordinates?.[0];
  return c ? { lat: c.lat, lon: c.lon } : null;
}

async function osmFood(qid, located, radiusM = 3000) {
  const scope = located ? `nwr(around:${radiusM},${located.lat},${located.lon})` : `area["wikidata"="${qid}"]->.a;nwr(area.a)`;
  const query = `[out:json][timeout:120];${scope}[amenity~"^(restaurant|cafe|fast_food)$"][~"^diet:(vegan|vegetarian)$"~"^(only|yes)$"];out center tags;`;
  const j = await getJson(OVERPASS, { method: "POST", body: new URLSearchParams({ data: query }) });
  return {
    snapshot: j.osm3s?.timestamp_osm_base,
    venues: j.elements.filter((e) => e.tags?.name).map((e) => ({
      osm: `${e.type}/${e.id}`,
      name: e.tags.name,
      nameEn: e.tags["name:en"],
      amenity: e.tags.amenity,
      cuisine: e.tags.cuisine,
      vegan: e.tags["diet:vegan"],
      vegetarian: e.tags["diet:vegetarian"],
      lat: e.lat ?? e.center?.lat,
      lon: e.lon ?? e.center?.lon,
      street: e.tags["addr:street"],
      hours: e.tags.opening_hours,
    })),
  };
}

/** Wikivoyage listings under "Eat" sections whose text mentions vegan/vegetarian. */
async function voyageEat(title) {
  const j = await getJson(`https://en.wikivoyage.org/w/api.php?action=parse&format=json&prop=wikitext&redirects=1&page=${encodeURIComponent(title)}`);
  const text = j.parse?.wikitext?.["*"] ?? "";
  // Level-2 "Eat" section up to the next level-2 heading (keeps the ===Budget=== style subsections).
  const start = text.search(/\n==\s*Eat\s*==\s*\n/i);
  const rest = start < 0 ? "" : text.slice(start + 1);
  const next = rest.slice(2).search(/\n==[^=]/);
  const eat = start < 0 ? "" : next < 0 ? rest : rest.slice(0, next + 2);
  const listings = [...eat.matchAll(/\{\{\s*(?:eat|listing)\b([\s\S]*?)\}\}/gi)].map((m) => m[1]);
  return {
    revid: j.parse?.revid,
    hasEat: eat.length > 0,
    vegListings: listings.filter((l) => /vegan|vegetarian/i.test(l)).map((l) => (l.match(/\|\s*name\s*=\s*([^|\n]+)/) ?? [])[1]?.trim()).filter(Boolean),
    districtsOnly: !eat.length && /\{\{\s*Regionlist|==\s*Districts/i.test(text),
  };
}

// ---------------------------------------------------------------- build
mkdirSync(GOLD_DIR, { recursive: true });
const rows = [];
let n = 0;
for (const f of FOOD) {
  const id = `food-${String(++n).padStart(3, "0")}`;
  const goldFile = join(GOLD_DIR, `${id}.json`);
  let gold;
  if (VOYAGE_ONLY.has(id) && existsSync(goldFile)) {
    // Refresh only the Wikivoyage part of an existing gold file (Overpass untouched).
    gold = JSON.parse(readFileSync(goldFile, "utf8"));
    const voy = await voyageEat(f.voy);
    await sleep(1000);
    gold.wikivoyage = { title: f.voy, revid: voy.revid, license: "CC BY-SA 4.0", hasEatSection: voy.hasEat, districtsOnly: voy.districtsOnly, vegListings: voy.vegListings };
    writeFileSync(goldFile, JSON.stringify(gold, null, 1) + "\n");
    console.log(`${id} ${f.city}: wikivoyage refreshed, veg listings ${voy.vegListings.length}`);
  } else if ((skipFetch || !REFETCH.has(id)) && existsSync(goldFile)) gold = JSON.parse(readFileSync(goldFile, "utf8"));
  else {
    const qid = await wikidataId(f.wiki);
    let osm = await osmFood(qid, f.located);
    let scope = f.located ? "3 km radius around context location" : `admin area ${qid}`;
    await sleep(3000);
    if (!osm.venues.length && !f.located) {
      // Some cities' OSM boundary relations carry a different (or no) wikidata tag: fall back to a radius.
      const center = await cityCenter(f.wiki);
      osm = await osmFood(qid, center, 10_000);
      scope = `10 km radius around ${center.lat},${center.lon} (admin area ${qid} not found in OSM)`;
      await sleep(3000);
    }
    const voy = await voyageEat(f.voy);
    await sleep(1000);
    const vegan = osm.venues.filter((v) => v.vegan === "only" || v.vegan === "yes");
    gold = {
      id, city: f.city, wikidata: qid, diet: f.diet, located: f.located ?? null, fetchedAt: new Date().toISOString(),
      osm: { snapshot: osm.snapshot, scope, license: "ODbL 1.0, © OpenStreetMap contributors", veganOnly: osm.venues.filter((v) => v.vegan === "only").length, veganYes: vegan.length, vegetarianOrVegan: osm.venues.length, venues: osm.venues },
      wikivoyage: { title: f.voy, revid: voy.revid, license: "CC BY-SA 4.0", hasEatSection: voy.hasEat, districtsOnly: voy.districtsOnly, vegListings: voy.vegListings },
    };
    writeFileSync(goldFile, JSON.stringify(gold, null, 1) + "\n");
    console.log(`${id} ${f.city}: vegan-only ${gold.osm.veganOnly}, vegan ${gold.osm.veganYes}, veg-or-vegan ${gold.osm.vegetarianOrVegan} [${scope}]; voyage eat=${voy.hasEat} veg listings ${voy.vegListings.length}${voy.districtsOnly ? " (district articles)" : ""}`);
  }
  const pool = gold.diet === "vegan" ? gold.osm.venues.filter((v) => v.vegan === "only" || v.vegan === "yes") : gold.osm.venues;
  const examples = [...pool].sort((a, b) => (b.vegan === "only") - (a.vegan === "only")).slice(0, 8).map((v) => v.name);
  rows.push({
    id, category: f.located ? "local-food-located" : "local-food", query: f.q, lang: f.lang ?? "en",
    ...(f.located ? { context: { lat: f.located.lat, lon: f.located.lon, note: "device GPS; the city is not named in the query" } } : {}),
    gold: [{ source: "osm", file: `gold/v2/${id}.json`, snapshot: gold.osm.snapshot }, { source: "enwikivoyage", title: gold.wikivoyage.title, revid: gold.wikivoyage.revid }],
    grading: { type: "venue-list", city: gold.city, diet: gold.diet, minRealVenues: 3, matchAgainst: "gold file venues (name or name:en, fuzzy); a venue not in OSM is unverified, not automatically wrong" },
    license: "original (question); ODbL (OSM gold); CC BY-SA 4.0 (Wikivoyage gold)",
    source_url: "https://x.com/VitalikButerin/status/2103762130554204651",
    notes: `A good answer names several real ${gold.diet} places in ${gold.city} (ideally with area/address) and says data may be outdated. OSM ${gold.osm.snapshot}: ${gold.osm.veganOnly} fully vegan, ${gold.osm.veganYes} vegan-friendly, ${gold.osm.vegetarianOrVegan} vegetarian-or-vegan venues${f.located ? " within 3 km of the device" : ""}. Examples: ${examples.join("; ")}.`,
  });
}
CRYPTO.forEach((c, i) => rows.push({
  id: `cry-${String(i + 1).padStart(3, "0")}`, category: "crypto-expert", query: c.q, lang: "en",
  gold: c.wiki ? [{ source: "enwiki", title: c.wiki }] : [], license: "original", source_url: c.src, notes: c.notes,
}));
TRAVEL.forEach((t, i) => rows.push({
  id: `trv-${String(i + 1).padStart(3, "0")}`, category: "travel-practical", query: t.q, lang: "en",
  gold: [{ source: "enwikivoyage", title: t.voy }], license: "original (question); CC BY-SA 4.0 (Wikivoyage gold)", source_url: `https://en.wikivoyage.org/wiki/${encodeURIComponent(t.voy.replace(/ /g, "_"))}`, notes: t.notes,
}));
writeFileSync(join(DIR, "questions.v2.jsonl"), rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
console.log(`wrote questions.v2.jsonl (${rows.length} items)`);
