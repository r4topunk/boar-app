# PT vs EN: candidate-672bc41 vs candidate-d7de156-lex

TL;DR: **PASS**: candidate gap 5.5 pts vs control 6.4 pts (blocks above control + 1 pt). Target gap <= 5 pts: not met (recorded goal, not blocking). Jev, 4B with packs, v2 non-food items. Regenerate with `node eval/scripts/pt-gap-check.mjs candidate-d7de156-lex candidate-672bc41`.

| Gate | EN quality ratio (95% CI) | PT quality ratio (95% CI) | Gap EN − PT |
|---|---|---|---|
| candidate-d7de156-lex | 0.556 (0.499–0.612, n=41) | 0.492 (0.433–0.551, n=41) | 6.4 pts |
| candidate-672bc41 | 0.548 (0.491–0.607, n=41) | 0.493 (0.434–0.552, n=41) | 5.5 pts |
