import { describe, it, expect } from "vitest";
import { verdictGuard } from "./verdictGuard";

// The answers below are the 4B's own (v0.1 EN dev traces, cut 2 and closed-book), byte for byte.
describe("verdictGuard: flags a verdict its own facts contradict (VG, cut 3 dev)", () => {
  it("(a) date threshold: 'No … before 1970' + 'first … 1969' -> Yes, with the facts kept", () => {
    const r = verdictGuard(
      "Did astronauts walk on the Moon before 1970?",
      "No, astronauts did not walk on the Moon before 1970. The first human moonwalk occurred on July 20, 1969, during NASA's Apollo 11 mission. No lunar surface walks took place before that date."
    );
    expect(r?.kind).toBe("date");
    expect(r?.text).toBe(
      "Yes, astronauts did walk on the Moon before 1970. The first human moonwalk occurred on July 20, 1969, during NASA's Apollo 11 mission. No lunar surface walks took place before that date."
    );
  });
  it("(a) drops later restatements of the old verdict that name the threshold", () => {
    const r = verdictGuard(
      "Did astronauts walk on the Moon before 1970?",
      "No, astronauts did not walk on the Moon before 1970.\n\nThe first human beings to walk on the Moon were Neil Armstrong and Buzz Aldrin on July 20, 1969.\n\nTherefore, there were no lunar surface visits by astronauts before 1970."
    );
    expect(r?.text).not.toMatch(/Therefore, there were no/);
    expect(r?.text).toMatch(/^Yes, astronauts did walk/);
  });
  it("(a) a consistent answer and the 'after' case it can't decide are left alone", () => {
    expect(verdictGuard("Did astronauts walk on the Moon before 1970?", "Yes, astronauts walked on the Moon before 1970 [2]. The first lunar walk occurred during Apollo 11 in July 1969.")).toBeNull();
    expect(verdictGuard("Did astronauts walk on the Moon after 1960?", "No. The first moonwalk was in 1969.")).toMatchObject({ kind: "date" });
    expect(verdictGuard("Did people use the telephone after 1960?", "No. The first telephone call was in 1876.")).toBeNull();
  });
  it("(a) 'Yes' when the first time was after the threshold -> No", () => {
    const r = verdictGuard("Was the internet used before 1960?", "Yes, the internet was used before 1960. The first ARPANET message was sent in 1969.");
    expect(r?.text).toBe("No. The first ARPANET message was sent in 1969.");
  });

  it("(b) which-form comparison: the verdict names the smaller number -> rewritten, with the difference and ratio", () => {
    const r = verdictGuard(
      "Which is more densely populated, Japan or Germany, and by how much?",
      "Germany is more densely populated than Japan. As of 2023, Germany has a population density of about 230 people per square kilometer, while Japan's is approximately 339 people per square kilometer. Japan has a higher population density due to its small land area and high population concentration in urban centers like Tokyo and Osaka. \n\n(Note: This response contains a factual error—Japan actually has a higher population density than Germany. Correcting: Japan’s density is about 339/km², Germany’s is about 230/km². So Japan is more densely populated by about 109 people per km².)\n\nCorrected: Japan is more densely populated than Germany, with a density of about 339 people per square kilometer compared to Germany’s 230 people per square kilometer—about 109 more per km²."
    );
    expect(r?.kind).toBe("compare");
    expect(r?.text).toBe(
      "Japan is more densely populated than Germany, by about 109 people per km² (339 versus 230, about 1.5 times as much). As of 2023, Germany has a population density of about 230 people per square kilometer, while Japan's is approximately 339 people per square kilometer. Japan has a higher population density due to its small land area and high population concentration in urban centers like Tokyo and Osaka."
    );
  });
  it("(b) yes/no comparison with the wrong Yes/No -> flipped, facts kept", () => {
    const r = verdictGuard(
      "Is a polar bear bigger than a grizzly bear?",
      "No, a polar bear is not bigger than a grizzly bear. Polar bears average 1,000 to 1,600 pounds. Grizzly bears average 400 to 600 pounds."
    );
    expect(r?.text).toBe("Yes. Polar bears average 1,000 to 1,600 pounds. Grizzly bears average 400 to 600 pounds.");
  });
  it("(b) guard items stay untouched: consistent verdicts, overlapping ranges, no figures", () => {
    const keep: [string, string][] = [
      ["Does Brazil have more people than Russia?", "Yes, Brazil has more people than Russia. As of recent estimates, Brazil's population is approximately 214 million, while Russia's is around 141 million. Therefore, Brazil has a larger population than Russia."],
      ["Is a polar bear bigger than a grizzly bear?", "Yes, polar bears are generally larger than grizzly bears [1]. On average, polar bears have a greater body mass and length, especially in males."],
      ["Which weighs more on average, an adult male moose or an adult male American bison?", "An adult male moose averages about 1,500 lb (700 kg), while an adult male American bison typically weighs around 1,500 to 2,000 lb (680–900 kg). Therefore, the American bison weighs more on average than the adult male moose [1]."],
      ["Which grows bigger, the saltwater crocodile or the Nile crocodile?", "Saltwater crocodiles grow bigger than Nile crocodiles. On average, saltwater crocodiles can reach lengths of 5 to 6 meters (16 to 20 feet), while Nile crocodiles typically max out at 4 to 5 meters (13 to 16 feet)."],
      ["If you stood the Burj Khalifa on the deepest point of Lake Baikal, would its top stick out of the water?", "The Burj Khalifa is about 828 meters tall, and Lake Baikal's deepest point is about 1,642 meters below sea level. So, no, its top would not stick out."],
      ["How big is Iceland in square kilometres?", "Iceland has a total area of approximately 103,000 square kilometres."],
    ];
    for (const [q, a] of keep) expect(verdictGuard(q, a), q).toBeNull();
  });
  it("(b) different units are never compared", () => {
    expect(verdictGuard("Which is longer, the Nile or the Amazon?", "The Amazon is longer than the Nile. The Nile is about 6,650 km long, while the Amazon is about 4,000 miles long.")).toBeNull();
  });

  it("(c) rank: 'No country is bigger' next to 'seventh-largest' -> six, with the list when the answer gives it", () => {
    expect(verdictGuard("Which countries are bigger than India by area?", "No country is bigger than India by area [1]. India is the seventh-largest country in the world by land area.")).toEqual({
      kind: "rank",
      text: "Six countries are bigger than India by area. India is the seventh-largest country in the world by land area.",
    });
    expect(
      verdictGuard(
        "Which countries are bigger than India by area?",
        "No country is bigger than India by area [1]. India is the seventh-largest country in the world by land area, after Russia, Canada, China, the United States, Brazil, and Australia."
      )?.text
    ).toBe(
      "Six countries are bigger than India by area: Russia, Canada, China, the United States, Brazil and Australia. India is the seventh-largest country in the world by land area, after Russia, Canada, China, the United States, Brazil, and Australia."
    );
  });
  it("(c) a correct list answer is left alone", () => {
    expect(verdictGuard("Which countries are bigger than India by area?", "Countries larger than India by area include Russia, Canada, and China. India ranks as the seventh-largest country by land area.")).toBeNull();
  });

  it("never fires on questions it doesn't parse, or on empty text", () => {
    expect(verdictGuard("Explain Mozi's views on universal love.", "No, Mozi did not… The first Mohists lived in 400 BC.")).toBeNull();
    expect(verdictGuard("", "No.")).toBeNull();
    expect(verdictGuard("Did X happen before 1970?", "")).toBeNull();
  });
});
