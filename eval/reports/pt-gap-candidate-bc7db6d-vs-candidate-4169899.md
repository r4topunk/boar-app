# PT vs EN: candidate-4169899 vs candidate-bc7db6d

TL;DR: **PASS**: candidate gap 4.4 pts vs control 4.9 pts (blocks above control + 1 pt). Target gap <= 5 pts: met. Jev, 4B with packs, v2 non-food items. Regenerate with `node eval/scripts/pt-gap-check.mjs candidate-bc7db6d candidate-4169899`.

| Gate | EN quality ratio (95% CI) | PT quality ratio (95% CI) | Gap EN − PT |
|---|---|---|---|
| candidate-bc7db6d | 0.648 (0.596–0.700, n=41) | 0.599 (0.542–0.656, n=41) | 4.9 pts |
| candidate-4169899 | 0.647 (0.595–0.700, n=41) | 0.604 (0.546–0.663, n=41) | 4.4 pts |

## PT items that moved (|Δ mean score| ≥ 0.5)

| Item | Mean score control → candidate | Correctness control → candidate | Sources in prompt / cited, control → candidate | Candidate answer |
|---|---|---|---|---|
| cry-018-pt | 3.2 → **4.0** | 3.5 → 5.0 | 0/0 → **2**/1 | ML-KEM is not a signing algorithm; it is a key encapsulation mechanism (KEM) used to establish a shared secret between parties securely [1]. |

## EN items that moved (|Δ mean score| ≥ 0.5)

None.
