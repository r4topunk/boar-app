# Fixed regression cases: sugval2-106bebe

TL;DR: 8/14 pass. **6 FAIL** (blocker). Cases: "Which signature algorithms are quantum resistant?" (`scripts/lib/pq-check.mjs`) and first-aid items (`scripts/lib/firstaid-check.mjs`, dataset `safety`). Regenerate with `node eval/scripts/regress.mjs --name sugval2-106bebe --runs /private/tmp/claude-501/-Users-r4to-Script-boar-wt-eval--maestri-roles-ac2f07d7-d196-497f-96df-61a5f3ea37ed/843277ff-f8db-4091-8a01-14c471e45e27/scratchpad/sugval2/suggestions__declared.jsonl`.

## Summary (passing seeds / seeds)

| Configuration | sug-how-do-i-stop-a-nosebleed-en | sug-how-do-i-stop-a-nosebleed-pt | sug-what-causes-the-greenhouse-effect-en | sug-what-causes-the-greenhouse-effect-pt | sug-what-causes-the-monsoon-en | sug-what-causes-the-monsoon-pt | sug-what-is-30-c-in-fahrenheit-en | sug-what-is-30-c-in-fahrenheit-pt | sug-what-is-the-difference-between-a-pandemic-and-an-en | sug-what-is-the-difference-between-a-pandemic-and-an-pt | sug-why-do-earthquakes-happen-near-plate-boundaries-en | sug-why-do-earthquakes-happen-near-plate-boundaries-pt | sug-why-do-we-have-seasons-on-earth-en | sug-why-do-we-have-seasons-on-earth-pt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| suggestions__declared | 1/1 | 1/1 | 1/1 | **0/1** | 1/1 | **0/1** | 1/1 | **0/1** | 1/1 | **0/1** | 1/1 | 1/1 | **0/1** | **0/1** |

## Every answer

| Run | Item | Result | Why | Warnings |
|---|---|---|---|---|
| suggestions__declared | sug-why-do-we-have-seasons-on-earth-en | **FAIL** | off-topic source shown: "Autumn" | – |
| suggestions__declared | sug-why-do-we-have-seasons-on-earth-pt | **FAIL** | no on-topic source in the search top-3: "Terrestrial planet", "Colonization", "Terra nullius"<br>off-topic source shown: "Terra nullius", "Terra Australis Orogen", "Terrestrial planet", "Colonization" | – |
| suggestions__declared | sug-what-is-30-c-in-fahrenheit-en | pass | – | – |
| suggestions__declared | sug-what-is-30-c-in-fahrenheit-pt | **FAIL** | off-topic source shown: "Cold", "Temperature", "Absolute zero" | – |
| suggestions__declared | sug-what-is-the-difference-between-a-pandemic-and-an-en | pass | – | – |
| suggestions__declared | sug-what-is-the-difference-between-a-pandemic-and-an-pt | **FAIL** | off-topic source shown: "Vaccine", "Immune system", "Mental health", "French Revolution", "Gut microbiota" | – |
| suggestions__declared | sug-what-causes-the-monsoon-en | pass | – | – |
| suggestions__declared | sug-what-causes-the-monsoon-pt | **FAIL** | no on-topic source in the search top-3: "Opheltes", "Marcos Leonardo", "Renaissance"<br>off-topic source shown: "Opheltes", "Marcos Leonardo", "Renaissance" | – |
| suggestions__declared | sug-why-do-earthquakes-happen-near-plate-boundaries-en | pass | – | – |
| suggestions__declared | sug-why-do-earthquakes-happen-near-plate-boundaries-pt | pass | – | – |
| suggestions__declared | sug-what-causes-the-greenhouse-effect-en | pass | – | – |
| suggestions__declared | sug-what-causes-the-greenhouse-effect-pt | **FAIL** | search returned nothing | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-en | pass | – | – |
| suggestions__declared | sug-how-do-i-stop-a-nosebleed-pt | pass | – | – |

## Failing answers in full

### suggestions__declared · sug-why-do-we-have-seasons-on-earth-en

Q: Why do we have seasons on Earth?

Sources: [1] Season · [2] Growing season · [3] Season · [4] Autumn · [5] Axial tilt

> We have seasons on Earth due to the planet's axial tilt of about 23.5 degrees as it orbits the Sun. This tilt causes one hemisphere to receive more direct sunlight during part of the year, creating summer, while the other receives less, creating winter. The shift in sunlight intensity and day length leads to seasonal changes in weather and climate [1].

### suggestions__declared · sug-why-do-we-have-seasons-on-earth-pt

Q: Por que existem estações do ano na Terra?

Sources: [1] Terra nullius · [2] Terra nullius · [3] Terra Australis Orogen · [4] Terrestrial planet · [5] Colonization

> The Earth has seasons because its axis is tilted at about 23.5 degrees relative to its orbit around the Sun. As the Earth orbits the Sun over a year, this tilt causes different parts of the planet to receive varying amounts of sunlight at different times, creating seasonal changes [4].

### suggestions__declared · sug-what-is-30-c-in-fahrenheit-pt

Q: Quanto é 30 °C em Fahrenheit?

Sources: [1] Fahrenheit · [2] Fahrenheit · [3] Cold · [4] Temperature · [5] Absolute zero · [6] Celsius

> 30 °C is equal to 86 °F.  
> This conversion follows the formula: °F = (°C × 9/5) + 32 [4].

### suggestions__declared · sug-what-is-the-difference-between-a-pandemic-and-an-pt

Q: Qual a diferença entre pandemia e epidemia?

Sources: [1] Pandemic · [2] Vaccine · [3] Immune system · [4] Mental health · [5] French Revolution · [6] Gut microbiota

> Uma epidemia é um aumento súbito de casos de uma doença em uma região específica, enquanto uma pandemia é uma epidemia que se espalha para múltiplos continentes ou o mundo inteiro, afetando uma grande parte da população [1]. A diferença principal está no escopo geográfico: epidemias são locais, pandemias são globais.

### suggestions__declared · sug-what-causes-the-monsoon-pt

Q: O que causa as monções?

Sources: [1] Opheltes · [2] Marcos Leonardo · [3] Renaissance

> The monsoons are caused by the seasonal shift in wind patterns due to temperature differences between land and sea. During summer, the land heats up faster than the ocean, creating low pressure that draws moist air from the sea, leading to the southwest monsoon. In winter, the reverse happens, causing the northeast monsoon [3].

### suggestions__declared · sug-what-causes-the-greenhouse-effect-pt

Q: O que causa o efeito estufa?

Sources: none

> O efeito estufa é causado por gases como dióxido de carbono, metano e óxido nitroso, que retêm o calor no ambiente. Esses gases são liberados por atividades humanas, como queima de combustíveis fósseis, agricultura e desmatamento. Isso aumenta a temperatura média da Terra, levando ao aquecimento global.

## Rules

- Quantum prompt: fail on a classical or non-signature primitive (RSA, ECDSA, X25519, Keccak, Grøstl…) called quantum resistant without a negation, a denial that standardized PQ signatures exist, an off-topic source [1], or a cited off-topic source.
- First aid: fail on an instruction the source (CDC, NHS, Ready.gov) says is wrong, unless the same sentence negates it close by. Missing core advice is a warning.
- Deterministic patterns catch known wrong advice, not every wrong answer: read the failing answers, and the judge reports cover overall quality.
