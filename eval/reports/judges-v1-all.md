# Two judges: Claude vs Jev (another model family)

TL;DR: same blinded pairs, same rubric, both A/B orders; Jev = typesafe-ai/jev (calibrated classifier) via the Vercel AI Gateway, eval time only. Dataset `v1`, subset `all`. Regenerate with `node eval/scripts/judge-agreement.mjs`.

| Comparison | Judge | n | First side wins / tie / second side wins | Win score (95% CI) | Quality ratio (95% CI) | Position-consistent | Winner agreement Claude×Jev (kappa) |
|---|---|---|---|---|---|---|---|
| Qwen3-4B vs Qwen2.5-1.5B (direct) | Claude | 96 | 76% / 13% / 11% | 0.82 (0.75–0.89) | 1.60 (1.42–1.79) | 96% |  |
| Qwen3-4B vs Qwen2.5-1.5B (direct) | Jev | 96 | 84% / 5% / 10% | 0.87 (0.80–0.93) | 1.42 (1.30–1.55) | 95% | 89% (0.66) on 96 |
| Qwen2.5-1.5B vs reference | Claude | 96 | 0% / 1% / 99% | 0.01 (0.00–0.02) | 0.40 (0.36–0.44) | 100% |  |
| Qwen2.5-1.5B vs reference | Jev | 96 | 0% / 0% / 100% | 0.00 (0.00–0.00) | 0.52 (0.49–0.56) | 100% | 99% (0.00) on 96 |
| Qwen3-4B vs reference | Claude | 96 | 0% / 4% / 96% | 0.02 (0.01–0.04) | 0.59 (0.54–0.63) | 100% |  |
| Qwen3-4B vs reference | Jev | 96 | 0% / 2% / 98% | 0.01 (0.00–0.03) | 0.70 (0.66–0.74) | 98% | 98% (0.66) on 96 |
| Sources in user turn vs in system (1.5B) | Claude | 32 | 44% / 22% / 34% | 0.55 (0.39–0.69) | 1.07 (0.89–1.29) | 88% |  |
| Sources in user turn vs in system (1.5B) | Jev | 32 | 34% / 31% / 34% | 0.50 (0.36–0.64) | 1.06 (0.93–1.20) | 75% | 69% (0.53) on 32 |

Win score = first side's wins + ½ ties (0.5 = even). Quality ratio = first side's mean rubric score / second side's. Orders that disagree count as a tie.

## Agreement with the 20 hand-labeled pairs

| Judge | Exact agreement | Kappa | Agreement on 'reference is better or equal' |
|---|---|---|---|
| Claude | 75% (20) | 0.00 | 100% |
| Jev | 75% (20) | 0.00 | 100% |

