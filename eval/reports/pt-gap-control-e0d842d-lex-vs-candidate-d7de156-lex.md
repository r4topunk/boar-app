# PT vs EN: candidate-d7de156-lex vs control-e0d842d-lex

TL;DR: **PASS**: candidate gap 6.4 pts vs control 6.8 pts (blocks above control + 1 pt). Target gap <= 5 pts: not met (recorded goal, not blocking). Jev, 4B with packs, v2 non-food items. Regenerate with `node eval/scripts/pt-gap-check.mjs control-e0d842d-lex candidate-d7de156-lex`.

| Gate | EN quality ratio (95% CI) | PT quality ratio (95% CI) | Gap EN − PT |
|---|---|---|---|
| control-e0d842d-lex | 0.554 (0.497–0.610, n=41) | 0.485 (0.427–0.544, n=41) | 6.8 pts |
| candidate-d7de156-lex | 0.556 (0.499–0.612, n=41) | 0.492 (0.433–0.551, n=41) | 6.4 pts |
