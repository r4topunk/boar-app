# PT vs EN: candidate-586a4c1 vs candidate-39a2508

TL;DR: **PASS**: candidate gap 5.3 pts vs control 5.9 pts (blocks above control + 1 pt). Target gap <= 5 pts: not met (recorded goal, not blocking). Jev, 4B with packs, v2 non-food items. Regenerate with `node eval/scripts/pt-gap-check.mjs candidate-39a2508 candidate-586a4c1`.

| Gate | EN quality ratio (95% CI) | PT quality ratio (95% CI) | Gap EN − PT |
|---|---|---|---|
| candidate-39a2508 | 0.642 (0.587–0.698, n=41) | 0.583 (0.525–0.646, n=41) | 5.9 pts |
| candidate-586a4c1 | 0.636 (0.578–0.693, n=41) | 0.582 (0.523–0.645, n=41) | 5.3 pts |

## PT items that moved (|Δ mean score| ≥ 0.5)

None.

## EN items that moved (|Δ mean score| ≥ 0.5)

| Item | Mean score control → candidate | Correctness control → candidate | Sources in prompt / cited, control → candidate | Candidate answer |
|---|---|---|---|---|
| trv-007 | 2.2 → **1.0** | 2.0 → 1.0 | 0/0 → 0/0 | I didn't find this in this phone's library. |
