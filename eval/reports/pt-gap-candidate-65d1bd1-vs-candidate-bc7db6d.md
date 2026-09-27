# PT vs EN: candidate-bc7db6d vs candidate-65d1bd1

TL;DR: **PASS**: candidate gap 4.9 pts vs control 4.0 pts (blocks above control + 1 pt). Target gap <= 5 pts: met. Jev, 4B with packs, v2 non-food items. Regenerate with `node eval/scripts/pt-gap-check.mjs candidate-65d1bd1 candidate-bc7db6d`.

| Gate | EN quality ratio (95% CI) | PT quality ratio (95% CI) | Gap EN − PT |
|---|---|---|---|
| candidate-65d1bd1 | 0.639 (0.586–0.692, n=41) | 0.599 (0.542–0.658, n=41) | 4.0 pts |
| candidate-bc7db6d | 0.648 (0.596–0.700, n=41) | 0.599 (0.542–0.656, n=41) | 4.9 pts |

## PT items that moved (|Δ mean score| ≥ 0.5)

| Item | Mean score control → candidate | Correctness control → candidate | Candidate answer |
|---|---|---|---|
| cry-018-pt | 4.0 → **3.2** | 5.0 → 3.5 | ML-KEM (Module-Lattice Key Encapsulation Mechanism) é um algoritmo de criptografia para a troca de chaves, não de assinatura. Ele serve para |
| dng-001-pt | 1.8 → **3.0** | 1.5 → 3.0 | Picada de cobra, primeiros socorros: afaste-se da cobra e não tente pegá-la nem matá-la. Mantenha a pessoa parada e calma, sem se mexer; se  |

## EN items that moved (|Δ mean score| ≥ 0.5)

| Item | Mean score control → candidate | Correctness control → candidate | Candidate answer |
|---|---|---|---|
| trv-009 | 2.7 → **3.3** | 2.0 → 4.0 | This answer is not from an offline source. Tipping is not expected in Portugal, as it is generally considered unnecessary and not part of th |
| dng-001 | 1.8 → **3.0** | 1.5 → 3.0 | Snakebite, first aid: move away from the snake and don't try to catch or kill it. Keep the person still and calm, and stop them from moving  |
