# PT vs EN: candidate-39a2508 vs candidate-4169899

TL;DR: **FAIL**: candidate gap 5.9 pts vs control 4.4 pts (blocks above control + 1 pt). Target gap <= 5 pts: not met (recorded goal, not blocking). Jev, 4B with packs, v2 non-food items. Regenerate with `node eval/scripts/pt-gap-check.mjs candidate-4169899 candidate-39a2508`.

| Gate | EN quality ratio (95% CI) | PT quality ratio (95% CI) | Gap EN − PT |
|---|---|---|---|
| candidate-4169899 | 0.647 (0.595–0.700, n=41) | 0.604 (0.546–0.663, n=41) | 4.4 pts |
| candidate-39a2508 | 0.642 (0.587–0.698, n=41) | 0.583 (0.525–0.646, n=41) | 5.9 pts |

## PT items that moved (|Δ mean score| ≥ 0.5)

| Item | Mean score control → candidate | Correctness control → candidate | Sources in prompt / cited, control → candidate | Candidate answer |
|---|---|---|---|---|
| trv-007-pt | 2.2 → **1.3** | 2.0 → 1.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  Obrigado em tailandês é "សួស្តី" (sàa-ssàa), e não |
| cry-006-pt | 3.3 → **2.7** | 2.5 → 2.0 | 2/2 → 2/0 | Os optimistic rollups armazenam os dados de transação na camada 1 do Ethereum, o que melhora a transparência e segurança, mas dependem de pr |
| cry-003-pt | 3.0 → **2.3** | 3.0 → 2.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  Computadores quânticos podem quebrar o RSA porque  |
| cry-012-pt | 1.7 → **1.2** | 1.0 → 1.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  A EIP-155 é um padrão que define como as transaçõe |
| cry-019-pt | 3.0 → **2.5** | 3.5 → 2.5 | 0/0 → 0/0 | Assinaturas baseadas em hash com estado, como XMSS e LMS, usam uma estrutura que muda de forma (estado) ao longo do tempo para garantir segu |
| trv-003-pt | 1.7 → **1.2** | 1.5 → 1.5 | 7/1 → 7/0 | Não há informações nas fontes sobre a segurança da água da torneira em Cidade do México. A questão não é abordada por nenhuma das fontes cit |
| trv-004-pt | 2.7 → **2.2** | 2.5 → 2.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  Você pode pegar um táxi, que é o mais simples e rá |
| trv-010-pt | 3.2 → **2.7** | 4.0 → 3.0 | 0/0 → 0/0 | Esta resposta não vem de uma fonte offline deste celular; confira antes de confiar nela.  Em Bangkok, apps como Grab são amplamente usados e |
| cry-014-pt | 2.0 → **2.5** | 2.0 → 3.0 | 4/0 → 4/0 | O saldo efetivo máximo de um validador do Ethereum após a EIP-7251 foi aumentado, permitindo balances maiores enquanto mantém o limite mínim |

## EN items that moved (|Δ mean score| ≥ 0.5)

| Item | Mean score control → candidate | Correctness control → candidate | Sources in prompt / cited, control → candidate | Candidate answer |
|---|---|---|---|---|
| trv-009 | 3.3 → **2.2** | 4.0 → 2.0 | 0/0 → 0/0 | This answer is not from an offline source on this phone; check it before relying on it.  Tipping is not expected in Portugal. Service is typ |
