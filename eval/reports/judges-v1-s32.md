# Two judges: Claude vs Jev (another model family)

TL;DR: same blinded pairs, same rubric, both A/B orders; Jev = typesafe-ai/jev (calibrated classifier) via the Vercel AI Gateway, eval time only. Dataset `v1`, subset `s32`. Regenerate with `node eval/scripts/judge-agreement.mjs`.

| Comparison | Judge | n | First side wins / tie / second side wins | Win score (95% CI) | Position-consistent | Winner agreement Claude×Jev (kappa) |
|---|---|---|---|---|---|---|
| Qwen3-4B vs Qwen2.5-1.5B (direct) | Claude | 32 | 84% / 6% / 9% | 0.88 (0.77–0.97) | 100% |  |
| Qwen3-4B vs Qwen2.5-1.5B (direct) | Jev | 32 | 88% / 6% / 6% | 0.91 (0.81–0.98) | 94% | 91% (0.63) on 32 |
| Qwen2.5-1.5B vs reference | Claude | 32 | 0% / 3% / 97% | 0.02 (0.00–0.05) | 100% |  |
| Qwen2.5-1.5B vs reference | Jev | 32 | 0% / 0% / 100% | 0.00 (0.00–0.00) | 100% | 97% (0.00) on 32 |
| Qwen3-4B vs reference | Claude | 32 | 0% / 3% / 97% | 0.02 (0.00–0.05) | 100% |  |
| Qwen3-4B vs reference | Jev | 32 | 0% / 3% / 97% | 0.02 (0.00–0.05) | 97% | 100% (1.00) on 32 |
| Sources in user turn vs in system (1.5B) | Claude | 32 | 44% / 22% / 34% | 0.55 (0.39–0.69) | 88% |  |
| Sources in user turn vs in system (1.5B) | Jev | 32 | 34% / 31% / 34% | 0.50 (0.36–0.64) | 75% | 69% (0.53) on 32 |

Win score = first side's wins + ½ ties (0.5 = even). Orders that disagree count as a tie.

## Agreement with the 20 hand-labeled pairs

| Judge | Exact agreement | Kappa | Agreement on 'reference is better or equal' |
|---|---|---|---|
| Claude | 75% (20) | 0.00 | 100% |
| Jev | 75% (20) | 0.00 | 100% |

