# Two judges: Claude vs Jev (another model family)

TL;DR: same blinded pairs, same rubric, both A/B orders; Jev = typesafe-ai/jev (calibrated classifier) via the Vercel AI Gateway, eval time only. Dataset `cryptopack`, subset `all`. Regenerate with `node eval/scripts/judge-agreement.mjs`.

| Comparison | Judge | n | First side wins / tie / second side wins | Win score (95% CI) | Quality ratio (95% CI) | Position-consistent | Winner agreement Claude×Jev (kappa) |
|---|---|---|---|---|---|---|---|
| Qwen3-4B + crypto pack vs reference | Claude | 20 | 5% / 5% / 90% | 0.07 (0.00–0.18) | 0.60 (0.52–0.69) | 100% |  |
| Qwen3-4B + crypto pack vs reference | Jev | 20 | 0% / 0% / 100% | 0.00 (0.00–0.00) | 0.74 (0.65–0.82) | 100% | 90% (0.00) on 20 |
| Qwen3-4B (no pack) vs reference | Claude | 20 | 0% / 5% / 95% | 0.03 (0.00–0.07) | 0.50 (0.41–0.60) | 100% |  |
| Qwen3-4B (no pack) vs reference | Jev | 20 | 0% / 0% / 100% | 0.00 (0.00–0.00) | 0.62 (0.52–0.71) | 100% | 95% (0.00) on 20 |
| Qwen3-4B + crypto pack vs Qwen3-4B (direct) | Claude | 20 | 40% / 45% / 15% | 0.63 (0.47–0.78) | 1.20 (0.99–1.52) | 75% |  |
| Qwen3-4B + crypto pack vs Qwen3-4B (direct) | Jev | 20 | 40% / 45% / 15% | 0.63 (0.47–0.78) | 1.16 (0.99–1.38) | 80% | 90% (0.84) on 20 |

Win score = first side's wins + ½ ties (0.5 = even). Quality ratio = first side's mean rubric score / second side's. Orders that disagree count as a tie.

