# Two judges: Claude vs Jev (another model family)

TL;DR: same blinded pairs, same rubric, both A/B orders; Jev = typesafe-ai/jev (calibrated classifier) via the Vercel AI Gateway, eval time only. Dataset `v1`, subset `all`. Regenerate with `node eval/scripts/judge-agreement.mjs`.

| Comparison | Judge | n | First side wins / tie / second side wins | Win score (95% CI) | Quality ratio (95% CI) | Position-consistent | Winner agreement Claude×Jev (kappa) |
|---|---|---|---|---|---|---|---|
| qwen3-4b-instruct-2507-q4km__official-6c3d6c6 vs reference | Claude | 96 | 0% / 2% / 98% | 0.01 (0.00–0.03) | 0.59 (0.54–0.63) | 100% |  |
| qwen3-4b-instruct-2507-q4km__official-6c3d6c6 vs reference | Jev | 96 | 0% / 1% / 99% | 0.01 (0.00–0.02) | 0.66 (0.62–0.70) | 99% | 99% (0.66) on 96 |

Win score = first side's wins + ½ ties (0.5 = even). Quality ratio = first side's mean rubric score / second side's. Orders that disagree count as a tie.

## Agreement with the 20 hand-labeled pairs

| Judge | Exact agreement | Kappa | Agreement on 'reference is better or equal' |
|---|---|---|---|
| Claude | 75% (20) | 0.00 | 100% |
| Jev | 75% (20) | 0.00 | 100% |

