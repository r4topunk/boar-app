# PT vs EN: candidate-1724fd5 vs candidate-4169899

TL;DR: **PASS**: candidate gap 5.0 pts vs control 4.4 pts (blocks above control + 1 pt). Target gap <= 5 pts: met. Jev, 4B with packs, v2 non-food items. Regenerate with `node eval/scripts/pt-gap-check.mjs candidate-4169899 candidate-1724fd5`.

| Gate | EN quality ratio (95% CI) | PT quality ratio (95% CI) | Gap EN − PT |
|---|---|---|---|
| candidate-4169899 | 0.647 (0.595–0.700, n=41) | 0.604 (0.546–0.663, n=41) | 4.4 pts |
| candidate-1724fd5 | 0.648 (0.596–0.700, n=41) | 0.598 (0.537–0.659, n=41) | 5.0 pts |

## PT items that moved (|Δ mean score| ≥ 0.5)

| Item | Mean score control → candidate | Correctness control → candidate | Sources in prompt / cited, control → candidate | Candidate answer |
|---|---|---|---|---|
| trv-009-pt | 3.3 → **2.3** | 4.0 → 2.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  Esta resposta não está em uma fonte offline. Em Po |
| trv-010-pt | 3.2 → **2.3** | 4.0 → 3.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  Esta resposta não é baseada em uma fonte offline.  |
| cry-006-pt | 3.3 → **2.7** | 2.5 → 2.0 | 2/2 → 2/0 | Os optimistic rollups armazenam dados de transação na camada 1 do Ethereum, oferecendo transparência e segurança baseada em provas de fraude |
| cry-012-pt | 1.7 → **1.0** | 1.0 → 1.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  Esta resposta não está em uma fonte offline. A EIP |
| cry-016-pt | 4.0 → **3.3** | 5.0 → 4.5 | 4/0 → 4/0 | Tokens ERC-20 são fungíveis, ou seja, cada token é idêntico aos outros e pode ser substituído por qualquer outro do mesmo tipo, como moedas. |
| cry-018-pt | 4.0 → **3.5** | 5.0 → 4.0 | 2/1 → 2/0 | Não, ML-KEM não é um algoritmo de assinatura. É um mecanismo de troca de chaves (KEM), usado para estabelecer um segredo compartilhado entre |
| cry-003-pt | 3.0 → **3.5** | 3.0 → 4.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  Essa resposta não está em uma fonte offline. Compu |
| cry-013-pt | 2.2 → **2.8** | 2.0 → 2.5 | 4/0 → 4/0 | A EIP-7702 permite que uma conta comum do Ethereum (EOA) tenha seu código definido permanentemente, ou seja, pode adquirir funcionalidades d |
| cry-011-pt | 2.7 → **4.0** | 2.0 → 4.0 | 4/0 → 4/0 | A EIP-1559 mudou o sistema de taxas do Ethereum introduzindo uma taxa base que é queimada (destruída) a cada transação, reduzindo o risco de |

## EN items that moved (|Δ mean score| ≥ 0.5)

None.
