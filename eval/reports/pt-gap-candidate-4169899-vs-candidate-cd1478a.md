# PT vs EN: candidate-cd1478a vs candidate-4169899

TL;DR: **FAIL**: candidate gap 6.0 pts vs control 4.4 pts (blocks above control + 1 pt). Target gap <= 5 pts: not met (recorded goal, not blocking). Jev, 4B with packs, v2 non-food items. Regenerate with `node eval/scripts/pt-gap-check.mjs candidate-4169899 candidate-cd1478a`.

| Gate | EN quality ratio (95% CI) | PT quality ratio (95% CI) | Gap EN − PT |
|---|---|---|---|
| candidate-4169899 | 0.647 (0.595–0.700, n=41) | 0.604 (0.546–0.663, n=41) | 4.4 pts |
| candidate-cd1478a | 0.648 (0.596–0.700, n=41) | 0.589 (0.532–0.649, n=41) | 6.0 pts |

## PT items that moved (|Δ mean score| ≥ 0.5)

| Item | Mean score control → candidate | Correctness control → candidate | Sources in prompt / cited, control → candidate | Candidate answer |
|---|---|---|---|---|
| cry-003-pt | 3.0 → **2.2** | 3.0 → 2.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  Esta resposta não está em um banco de dados offlin |
| trv-009-pt | 3.3 → **2.5** | 4.0 → 3.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  Esta resposta não está em um banco de dados offlin |
| cry-006-pt | 3.3 → **2.7** | 2.5 → 2.0 | 2/2 → 2/0 | Os optimistic rollups armazenam os dados de transação na camada 1 do Ethereum, o que melhora a transparência e segurança, mas dependem de pr |
| cry-019-pt | 3.0 → **2.5** | 3.5 → 2.5 | 0/0 → 0/0 | Assinaturas baseadas em hash com estado, como XMSS e LMS, usam uma estrutura que muda de forma (estado) ao longo do tempo para garantir segu |
| trv-003-pt | 1.7 → **1.2** | 1.5 → 1.5 | 7/1 → 7/0 | Não há informações nas fontes sobre a segurança da água da torneira em Cidade do México. A questão não é abordada por nenhuma das fontes cit |
| cry-014-pt | 2.0 → **2.5** | 2.0 → 3.0 | 4/0 → 4/0 | O saldo efetivo máximo de um validador do Ethereum após a EIP-7251 foi aumentado, permitindo balances maiores enquanto mantém o limite mínim |

## EN items that moved (|Δ mean score| ≥ 0.5)

None.
