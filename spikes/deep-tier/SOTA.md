# Estado da arte: MoE com pesos em flash e memória n-gram em celular (set/2026)

> Pesquisa de 2026-09-26 para o tier "deep" do Boar. Restrições: celular com 12 GB de RAM e ≤50 GB de disco **no total** (modelo + corpus offline + app).
> Fontes primárias: model cards no HF, READMEs no GitHub e arXiv. Números do BigMoeOnEdge vêm do clone local `/Users/r4to/Script/boar/competitors/BigMoeOnEdge` (HEAD `74ba18f`, 2026-09-07); o link público é o do repo.
> O que não consegui verificar está marcado **UNKNOWN**.

## TL;DR

1. **Nenhum modelo público atende hoje à receita do Vitalik (~100B total, <1B ativo), e os que chegam perto não cabem em 50 GB.** Os mais próximos são o Qwen3.8-Flash-Next (125B + 51B de tabela n-gram, 6B ativos, GGUF ≥72,5 GB) e o DeepSeek V4 Flash (284B-A13B, ~91 GB). Os dois estouram o orçamento de disco do Boar.
2. **O ponto ideal realista para 12 GB/50 GB são as MoEs de 25–35B com ~3–4B ativos, rodando com streaming de experts.** A melhor é o Qwen3.6-35B-A3B (Apache-2.0, MMLU-Pro 85,2, GPQA 86,0). Ele tem **5,0 tok/s lossless em Q4_K_M (22,3 GB)** no celular de referência de 12 GB via BigMoeOnEdge, e 4–6 tok/s no AndroidLM (UD-Q2_K_XL, 12,3 GB, Pixel 8 Pro). O Gemma-4-26B-A4B (Apache-2.0, MMLU-Pro 82,6) vem logo atrás, com 4,1–5,0 tok/s.
3. **Com quant de 2 bits, a Q4 não precisa ficar resident.** O streaming (BigMoeOnEdge) torna Q3/Q4 viáveis mesmo acima da RAM. Como mean KLD do Q2_K_XL é cerca de 7x o do Q4_K_XL (0,097 vs 0,0137, Qwen3.5-35B-A3B), a diferenciação contra o AndroidLM está em **qualidade (Q3_K_XL/Q4) com streaming**, não em mais compressão.
4. **Memória condicional n-gram (Engram/DeepSeek, n-gram embedding do Qwen3.8-Flash-Next, LongCat-Flash-Lite, SCONE) combina bem com celular.** O endereçamento é determinístico (hash dos tokens anteriores), cada token faz poucas leituras de ~KB, e há zero FLOPs de matmul. Mesmo assim, só **2 modelos com pesos rodáveis** usam isso de verdade: Qwen3.8-Flash-Next (llama.cpp upstream, `qwen4exp`) e LongCat-Flash-Lite (fork do llama.cpp). Nenhum cabe folgado em 50 GB com qualidade: o LongCat Q3_K_L tem 30,5 GB e roda só em fork.
5. **A engine é o gargalo de integração, não o modelo.** O BigMoeOnEdge (Apache-2.0) roda sobre a API pública do llama.cpp mais um hook opcional de ~25 linhas, então dá para portar para o llama.rn no Android. **Não há alvo iOS**: o flash-moe e o fork do Anemll são Mac-only, e a demo no iPhone 17 Pro fez 0,6 tok/s. O llama.rn 0.13.0-rc.6 já sincroniza o llama.cpp b11192, que inclui `qwen4exp` e `TENSOR_READ_LAZY`.

---

## 1. Candidatos (modelos MoE com poucos parâmetros ativos)

"Cabe resident em 12 GB?" usa esta heurística: arquivo ≤ ~7–8 GB. O AndroidLM usa ~7,9 GB de RAM no total (5 GB de cache de experts + 2 GB de dense) num Pixel 8 Pro de 12 GB ([AndroidLM](https://github.com/Phineas1500/AndroidLM)). Acima disso, o modelo precisa de streaming (BigMoeOnEdge) ou de mmap, e o mmap entra em fault storm ([BigMoeOnEdge README](https://github.com/Helldez/BigMoeOnEdge)).

| Modelo | Total / ativo | Licença | Data | GGUF ~2–3 bit | GGUF Q4 | Arch llama.cpp | Resident em 12 GB? | Notas / qualidade | Link |
|---|---|---|---|---|---|---|---|---|---|
| **Qwen3.6-35B-A3B** | 35B / 3B (256 experts, 8 roteados + 1 shared; 40 camadas, híbrido Gated DeltaNet) | Apache-2.0 | 2026-04-16 | UD-IQ2_XXS 10,8 · UD-IQ2_M 11,5 · **UD-Q2_K_XL 12,3** · UD-IQ3_XXS 13,2 · UD-Q3_K_XL 16,8 GB | UD-Q4_K_M 22,1 · UD-Q4_K_XL 22,4 GB | `qwen35moe` ✅ | ❌ (streaming) | MMLU-Pro 85,2; GPQA 86,0; SuperGPQA 64,7; LCB v6 80,4. BigMoeOnEdge: 5,0 tok/s lossless em Q4_K_M (cache de 3000 MiB), 5,8 com k=6. Tem MTP. | [card](https://huggingface.co/Qwen/Qwen3.6-35B-A3B) · [GGUF](https://huggingface.co/unsloth/Qwen3.6-35B-A3B-GGUF) |
| Qwen3.5-35B-A3B | 35B / 3B | UNKNOWN (provável Apache-2.0) | 2026 (UNKNOWN exato) | IQ2_XXS 9,09 · Q2_K_XL 12,04 · IQ3_XXS 13,12 · Q3_K_XL 16,06 GB | Q4_K_XL 19,17 GB | `qwen35moe` | ❌ | Antecessor do 3.6. Tem a melhor tabela pública de KLD por quant (§2). | [unsloth benchmarks](https://unsloth.ai/docs/models/qwen3.5/gguf-benchmarks) |
| Qwen3-30B-A3B-Instruct-2507 | 30,5B / 3,3B (128 experts, top-8) | Apache-2.0 | jul/2025 (sufixo 2507) | UD-IQ2_XXS 10,3 · UD-Q2_K_XL 11,8 · UD-IQ3_XXS 12,9 · UD-Q3_K_XL 13,8 GB | Q4_K_M 18,6 GB | `qwen3moe` ✅ | ❌ | MMLU-Pro 78,4; GPQA 70,4; SuperGPQA 53,4. BigMoeOnEdge: 5,2 tok/s em Q4_K_M. Sem MTP. | [card](https://huggingface.co/Qwen/Qwen3-30B-A3B-Instruct-2507) · [GGUF](https://huggingface.co/unsloth/Qwen3-30B-A3B-Instruct-2507-GGUF) |
| **Gemma-4-26B-A4B-it** | 25,2B / 3,8B (128 experts, 8 ativos + 1 shared) | Apache-2.0 | 2026-07 (arXiv 2607.02770) | UD-IQ2_XXS 9,92 · UD-Q2_K_XL 10,5 · UD-IQ3_XXS 11,4 · UD-Q3_K_XL 12,9 GB | UD-Q4_K_M 16,9 GB | `gemma4` ✅ | ❌ | MMLU-Pro 82,6; GPQA-D 82,3; LCB v6 77,1. Mais de 140 idiomas (PT-BR). BigMoeOnEdge: 4,1 tok/s em Q4_K_M lossless, 5,0 com k=6. O shared expert fica resident, então streama menos. | [card](https://huggingface.co/google/gemma-4-26B-A4B-it) · [GGUF](https://huggingface.co/unsloth/gemma-4-26B-A4B-it-GGUF) |
| gpt-oss-20b | 21B / 3,6B | Apache-2.0 | 2025-08 | Q2_K–Q4 ≈ 11,5–11,9 GB (MXFP4 nativo, quase não comprime) | 11,5–11,9 GB | `gpt-oss` ✅ | ❌ (margem) | GPQA-D 58,6 (medium). O formato Harmony obriga a um template próprio. Quantizar abaixo de MXFP4 não traz ganho. | [card](https://huggingface.co/openai/gpt-oss-20b) · [GGUF](https://huggingface.co/unsloth/gpt-oss-20b-GGUF) |
| ERNIE-4.5-21B-A3B-PT | 21B / 3B (64 experts, 6 ativos + 2 shared) | Apache-2.0 | 2025 (UNKNOWN exato) | UD-IQ2_XXS 7,76 · UD-Q2_K_XL 8,22 · UD-IQ3_XXS 9,54 · UD-Q3_K_XL 10,6 GB | Q4_K_M 13,3 GB | `ernie4_5-moe` (UNKNOWN nome exato; há GGUF funcional) | ⚠️ só IQ2 | Benchmarks não estão no card (UNKNOWN). Não é suportado pelo BigMoeOnEdge. | [card](https://huggingface.co/baidu/ERNIE-4.5-21B-A3B-PT) · [GGUF](https://huggingface.co/unsloth/ERNIE-4.5-21B-A3B-PT-GGUF) |
| SmallThinker-21BA3B-Instruct | 21B / 3B (64 experts, top-6; 52 camadas) | Apache-2.0 | 2025-07-28 | Q2_K_S/Q3_K_M existem (tamanhos UNKNOWN) | Q4_0 (UNKNOWN) | GGUF comum no llama.cpp; `.powerinfer.gguf` só no PowerInfer | ⚠️ | MMLU 84,4; GPQA-D 55,1. Contexto de só 16K. Com o PowerInfer: 20,3 tok/s num i9 com limite de 8 GB. Router pré-atenção feito para prefetch. | [card](https://huggingface.co/PowerInfer/SmallThinker-21BA3B-Instruct) · [arXiv 2507.20984](https://arxiv.org/abs/2507.20984) |
| SmallThinker-4BA0.6B | 4B / **0,6B** | Apache-2.0 (UNKNOWN p/ 4B) | 2025-07 | pequeno (UNKNOWN) | ~1 GB de RAM com o PowerInfer | idem | ✅ | Benchmarks do 4B não estão no card (UNKNOWN). | [GGUF](https://huggingface.co/PowerInfer/SmallThinker-4BA0.6B-Instruct-GGUF) |
| **LFM2-24B-A2B** | 24B / 2,3B (64 experts, top-4; 40 camadas conv+GQA) | LFM Open License v1.0 (**uso comercial acima de US$10M/ano de receita exige acordo**) | card: arXiv 2511.23404; blog: 2026-02-24 | IQ2_XXS 5,75 · IQ2_M 7,74 · Q2_K 8,32 · IQ3_XXS 9,39 GB | Q4_K_M 14,44 GB | `lfm2moe` ✅ | ✅ IQ2 / ⚠️ IQ3 | Benchmarks numéricos não publicados no card (UNKNOWN). BigMoeOnEdge suporta a arch, mas sem números no celular. | [card](https://huggingface.co/LiquidAI/LFM2-24B-A2B) · [GGUF](https://huggingface.co/bartowski/LiquidAI_LFM2-24B-A2B-GGUF) · [licença](https://www.liquid.ai/lfm-license) |
| LFM2.5-8B-A1B | 8,3B / 1,5B (card) · "A1B" no nome | LFM1.0 (mesmo threshold) | 2026-05-28 | UNKNOWN | Q4_K_M 5,16 GB | `lfm2moe` ✅ | ✅ | IFEval 91,8; MATH500 88,8; AA-Omniscience acc. 8,67% (**conhecimento factual fraco**). ~30 tok/s em celular segundo o blog. | [card](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B) · [blog](https://www.liquid.ai/blog/lfm2-5-8b-a1b) |
| **Ling-mini-2.0** | 16,26B / 1,4B (**789M não-embedding**; esparsidade 1/32; MTP) | MIT | 2025 (UNKNOWN exato) | Q2_K 6,07 GB | Q4_K_M 9,91 GB | `bailingmoe2` ✅ | ✅ Q2 / ⚠️ Q4 | O mais próximo de "<1B ativo". O card diz "equivalente a dense 7–8B" (números de MMLU-Pro/GPQA só em gráfico: UNKNOWN). BigMoeOnEdge **não** suporta `bailingmoe2`, só o `bailingmoe3`. | [card](https://huggingface.co/inclusionAI/Ling-mini-2.0) · [GGUF](https://huggingface.co/inclusionAI/Ling-mini-2.0-GGUF) |
| Ling-3.0-tiny | 7,9B / 1,3B (128 experts, 8 ativos + 1 shared; KDA/MLA) | MIT | 2026 (UNKNOWN exato) | UNKNOWN | UNKNOWN | provável `bailingmoe3` (UNKNOWN) | ✅ | AA Intelligence Index 25. | [card](https://huggingface.co/inclusionAI/Ling-3.0-tiny) |
| Ling-3.0-flash | 124B / 5,1B (512 experts, top-8 + shared) | MIT | 2026 (UNKNOWN exato) | IQ2_XXS 39,2 · IQ2_M 49,1 · IQ3_XXS 57,1 GB | Q4_K_M 79,3 GB | `bailingmoe3` ✅ (llama.cpp #26608) | ❌ | Cabe em 50 GB só em IQ2_XXS, e aí sobram ~11 GB para o resto. BigMoeOnEdge tem a recipe, mas sem números no celular. | [card](https://huggingface.co/inclusionAI/Ling-3.0-flash) · [GGUF](https://huggingface.co/AtomicChat/Ling-3.0-flash-GGUF) |
| **Qwen3.8-Flash-Next** (preview da arch do Qwen4) | 125B principal + **51B de n-gram embedding** + 4B de MTP / **6B ativos** (512 experts, 10 + 1 shared) | Qwen Community License 1.0 (termos: UNKNOWN, revisar) | 2026-08-26 | UD-IQ1_S **72,5** · UD-Q2_K_XL 78,9 · UD-IQ3_XXS 82 GB | UD-IQ4_XS 93,7 GB | `qwen4exp` ✅ (PR #27742, b10666) | ❌ (**e ❌ nos 50 GB**) | GPQA-D 91,7. BigMoeOnEdge em 12 GB: 1,79–2,6 tok/s (UD-IQ3_XXS), 3,48 tok/s (Q2_K, 80,4 GB). O modelo é compute-bound porque o dense tem 4,3 GB. | [card](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) · [GitHub](https://github.com/QwenLM/Qwen3.8-Flash-Next) · [GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF) |
| DeepSeek-V4-Flash (0731) | 284B / 13B | MIT | 2026-04-24; refresh 0731 | UD-IQ2_M 90,9 GB | — | `deepseek4` ✅ | ❌ (❌ disco) | MMLU-Pro 86,4; GPQA-D 88,1; SimpleQA-Verified 34,1. BigMoeOnEdge: 0,94 tok/s em 12 GB. **Não usa Engram** segundo o card. | [card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) |
| LongCat-Flash-Lite (Meituan) | 68,5B (**>30B de n-gram embedding**) / 2,9–4,5B | MIT | 2026-01-29 | Q3_K_L 30,5 GB | Q4_K_M 37,4 GB | ❌ upstream (PR #19167 em draft); só [fork](https://github.com/InquiringMinds-AI/llama.cpp/tree/longcat-flash-ngram) | ❌ | MMLU-Pro 78,3; GPQA-D 66,8. Único modelo n-gram que cabe em 50 GB, mas só em fork, com MLA e identity experts. | [card](https://huggingface.co/meituan-longcat/LongCat-Flash-Lite) · [GGUF](https://huggingface.co/InquiringMinds-AI/LongCat-Flash-Lite-GGUF) · [arXiv 2601.21204](https://arxiv.org/abs/2601.21204) |
| Granite-4.0-H-Tiny | 7B / 1B (Mamba2 + MoE) | Apache-2.0 | 2025-10-02 | UNKNOWN | UNKNOWN | ✅ (granitehybrid) | ✅ | MMLU-Pro 44,9; GPQA 32,6. Fraco para pesquisa. | [card](https://huggingface.co/ibm-granite/granite-4.0-h-tiny) |
| OLMoE-1B-7B | 6,9B / 1,3B | UNKNOWN (não re-verificado) | 2024 (UNKNOWN) | — | — | `olmoe` ✅ | ✅ | Serve como baseline. O MobileMoE-L o supera com 30% menos parâmetros ativos. | [MobileMoE](https://huggingface.co/papers/2605.27358) |
| MobileMoE S/M/L (Meta) | 1,3/2,8/5,3B · **0,3/0,5/0,9B ativos** | CC BY 4.0 | 2026-05-26 | INT4: 0,68/1,48/2,75 GB | — | ❌ (ExecuTorch+XNNPACK; GGUF: UNKNOWN) | ✅ | Média de 60,1 em 14 benchmarks (vs Qwen3.5-2B 50,8). Galaxy S25 e iPhone 16 Pro: decode 2,2–3,4x mais rápido que o MobileLLM-Pro. Pequeno demais para "deep". | [paper](https://huggingface.co/papers/2605.27358) · [coleção](https://huggingface.co/collections/facebook/mobilemoe) |

Não encontrei (UNKNOWN / não existem até 2026-09-26):
- MoE Qwen3.5/3.6/3.8 pequeno (<30B). A série Qwen3.8 tem só 2,4T-A95B e 27B dense ([QwenLM/Qwen3.8](https://github.com/QwenLM/Qwen3.8)). Um "Qwen3.6 9–12B A2B" existe só como pedido numa discussão ([HF](https://huggingface.co/Qwen/Qwen3.6-35B-A3B/discussions/47)).
- Pesos do Qwen4 final.

## 2. Quantização em low-bit

| Tipo | Bits/peso (aprox.) | Notas | Fonte |
|---|---|---|---|
| IQ2_XXS / IQ2_M | ~2,06 / ~2,7 bpw | Quants i-matrix do llama.cpp, com kernels NEON no ARM | [llama.cpp quantize](https://github.com/ggml-org/llama.cpp/tree/master/tools/quantize) |
| IQ3_XXS | ~3,06 bpw | Melhor custo-benefício entre 2 e 4 bits nos dados abaixo | idem |
| Unsloth Dynamic 2.0 (UD-*) | mistos por camada | Camadas sensíveis (dense e atenção) ficam em bits mais altos, experts em bits baixos. A Unsloth afirma liderar em mean KLD em 21 de 22 tamanhos do Qwen3.6-35B-A3B | [UD 2.0](https://unsloth.ai/docs/basics/unsloth-dynamic-2.0-ggufs) · [Qwen3.6 docs](https://unsloth.ai/docs/models/qwen3.6) |
| Unsloth Dynamic 3.0 | idem, com nova calibração | Imatrix novo (agentic, chat, multilíngue). Remove o MTP abaixo de Q2_K_XL (~500 MB). No Qwen3.8-27B (dense), UD-Q2_K_XL tem ~+8% de top-1 sobre o próximo | [UD 3.0](https://unsloth.ai/docs/basics/dynamic-3.0-ggufs) |
| ik_llama.cpp: IQ_K (IQ2_K…IQ6_K), IQ2_KS, trellis IQ1_KT…IQ4_KT | ~1,75–4,5 bpw | Fork do llama.cpp, MIT. NEON com trellis (PR 471), fused MoE, `-ser` (smart expert reduction), roda no Android via termux. **Formato incompatível com o llama.cpp upstream e com o llama.rn** | [ik_llama.cpp](https://github.com/ikawrakow/ik_llama.cpp) |
| MXFP4 | ~4,25 bpw | Nativo do gpt-oss. Streama sem mudança no BigMoeOnEdge | [BigMoeOnEdge](https://github.com/Helldez/BigMoeOnEdge) |

Degradação medida em MoE (Qwen3.5-35B-A3B, Unsloth, após a atualização de 2026-03-05), de [unsloth.ai/docs/models/qwen3.5/gguf-benchmarks](https://unsloth.ai/docs/models/qwen3.5/gguf-benchmarks):

| Quant | Disco | PPL | Mean KLD | KLD p99.9 |
|---|---|---|---|---|
| UD-IQ2_XXS | 9,09 GB | 7,716 | 0,1846 | 4,22 |
| UD-Q2_K_XL | 12,04 GB | 7,044 | 0,097 | 2,91 |
| UD-IQ3_XXS | 13,12 GB | 6,783 | 0,0501 | 1,53 |
| UD-Q3_K_XL | 16,06 GB | 6,725 | 0,0308 | 0,95 |
| UD-Q4_K_XL | 19,17 GB | 6,592 | 0,0137 | 0,41 |

- Por essa tabela, **IQ3_XXS custa +1,1 GB sobre o Q2_K_XL e reduz o KLD à metade**. É o upgrade mais barato de qualidade sobre o AndroidLM.
- Qwen3.6-35B-A3B: o [localbench](https://localbench.substack.com/p/qwen-36-35b-a3b-gguf-quality-benchmark) comparou 64 quants de 6 uploaders. No texto, UD-IQ1_M (10 GB) retém **86,9% de top-1**. As outras linhas estão só em imagens (**UNKNOWN**).
- Alavancas lossy de runtime (BigMoeOnEdge, desktop):
  - `--expert-substitute 0.15`: 258→119 MiB de flash/token, 2,37→3,84 tok/s, PPL +1–4%, tinyMMLU 88→84.
  - Turbo top-k com k=6: +16–24% de tok/s ([CHANGELOG](https://github.com/Helldez/BigMoeOnEdge/blob/main/CHANGELOG.md)).

## 3. Engines com streaming e cache de experts

| Engine | Plataforma | Números (dispositivo, modelo, tok/s, RAM) | Licença / estado | Fonte |
|---|---|---|---|---|
| **BigMoeOnEdge** | Android e desktop, só CPU. Sobre a API pública do llama.cpp, mais um hook opcional de ~25 linhas para `--overlap` | Celular de 12 GB (UFS 4.x, ~2300 MiB/s), Q4_K_M: Qwen3.6-35B 5,0 (lossless) / 5,8 (k=6); Qwen3-30B 5,2; Gemma-4-26B 4,1 / 5,0; gpt-oss-120b 2,2 (k=2); Qwen3.8-Flash-Next 1,8–3,5; DS-V4-Flash 0,94. O baseline com mmap fica em **0,1–2,0 tok/s instável** | Apache-2.0, v0.22+ (ago/2026). **Sem alvo iOS**. Streaming é incompatível com batch/spec decode (n=1) | [README](https://github.com/Helldez/BigMoeOnEdge) · [limitations](https://github.com/Helldez/BigMoeOnEdge/blob/main/docs/limitations.md) · [roadmap](https://github.com/Helldez/BigMoeOnEdge/blob/main/docs/roadmap.md) |
| AndroidLM (usa o BigMoeOnEdge) | Android | Pixel 8 Pro com 12 GB, Qwen3.6-35B-A3B UD-Q2_K_XL: **4–6 tok/s** de decode, 24–30 tok/s de prefill, ~7,9 GB de RAM | Apache-2.0 | [repo](https://github.com/Phineas1500/AndroidLM) |
| PowerInfer-2 | Android (neuron clusters, cache segmentado, pipeline de I/O) | OnePlus 12, TurboSparse-Mixtral-47B: **11,68 tok/s**. Até 29,2x sobre o estado da arte da época | Pesquisa (2024). Exige modelos esparsificados (ReLU) | [arXiv 2406.06282](https://arxiv.org/abs/2406.06282) |
| PowerInfer + SmallThinker | CPU, offload de experts para SSD, cache LRU, prefetch sobreposto à atenção | 21BA3B: 20,3 tok/s no i9 com 8 GB; 6,6 tok/s no Raspberry Pi 5 | Exige GGUF `.powerinfer` | [arXiv 2507.20984](https://arxiv.org/abs/2507.20984) |
| llama.cpp mmap | todas | O page cache do SO faz o papel de cache. Acima de ~1,5x a RAM vira fault storm e mata outros apps. Novo: `--tensor-read-lazy` (merged em 2026-08-27) deixa tabelas >4 GiB (n-gram, PLE) lazy via mmap: Gemma-4-E4B RSS 7,37→6,16 GB com -8 a -11% de tok/s | MIT | [PR #27794](https://github.com/ggml-org/llama.cpp/pull/27794) · [BigMoeOnEdge](https://github.com/Helldez/BigMoeOnEdge) |
| flash-moe (danveloper) | macOS Metal, `pread` paralelo do SSD, page cache do SO | M3 Max 48 GB, Qwen3.5-397B-A17B em 4 bits (209 GB): **4,4 tok/s** | Licença UNKNOWN | [repo](https://github.com/danveloper/flash-moe) |
| flash-moe (Anemll fork) | macOS M5 Max / Metal 4 | M5 Max 128 GB: 12,9 tok/s (experts Q3 em GGUF). O README do fork **não** suporta iPhone | UNKNOWN | [repo](https://github.com/Anemll/flash-moe) |
| Demo iPhone 17 Pro (@anemll) | iOS, 12 GB LPDDR5X, SSD→GPU | ~400B MoE: **0,6 tok/s**, TTFT de ~50 s (prova de conceito). Código do app iOS: UNKNOWN | — | [dev.to](https://dev.to/max_quimby/iphone-17-pro-just-ran-a-400b-llm-on-device-ai-changes-everything-2026-53bm) |
| Apple "LLM in a flash" | pesquisa | Modelos até 2x a DRAM; 4–5x (CPU) e 20–25x (GPU) sobre o load ingênuo; windowing e row-column bundling | paper | [arXiv 2312.11514](https://arxiv.org/abs/2312.11514) |
| EdgeMoE | mobile | Não-experts em RAM, experts em storage; bitwidth por expert; preload preditivo | paper | [arXiv 2308.14352](https://arxiv.org/abs/2308.14352) |
| MoE-Infinity | PC/servidor | Tracing de ativação por sequência; prefetch e cache de experts | paper e código | [arXiv 2401.14361](https://arxiv.org/abs/2401.14361) |
| MNN | Android/iOS | Suporta Qwen3-30B-A3B no Android. **Streaming de experts e tok/s: UNKNOWN** (o fetch das releases falhou) | Apache-2.0 | [MnnLlmChat](https://github.com/alibaba/MNN/blob/master/apps/Android/MnnLlmChat/README.md) |
| ExecuTorch | Android/iOS | Kernel MoE com XNNPACK (MobileMoE, só modelos pequenos). Offload de experts: UNKNOWN | BSD | [MobileMoE](https://huggingface.co/papers/2605.27358) |
| MLC-LLM | Android/iOS | MoE com streaming de flash: UNKNOWN (não verificado) | Apache-2.0 | — |
| llama.rn (binding usado pelo Boar) | RN Android/iOS | v0.13.0-rc.6 (2026-09-26) sincroniza o llama.cpp **b11192**, que já inclui `qwen4exp` (b10666) e `TENSOR_READ_LAZY`. **Sem streaming de experts** | MIT | [releases](https://github.com/mybigday/llama.rn/releases/tag/v0.13.0-rc.6) |

Lições do BigMoeOnEdge que valem para o Boar ([roadmap](https://github.com/Helldez/BigMoeOnEdge/blob/main/docs/roadmap.md)):
- Com cache e overlap, o decode fica **compute-bound**, com teto de ~6,2 tok/s naquele SoC.
- O flash satura com 2 lanes (~2460 MiB/s).
- Coalescing, layout contíguo, política de cache mais esperta e prefetch preditivo foram todos medidos **negativos** no device.
- A alavanca real é **o tamanho do cache mais manter o dense fora do page cache** (`anon`/`ahwb`: +17,9%).
- Speculative decoding (MTP/n-gram) **perdeu** no device, de -18% a -29%, e causou fault storm ([ngram.md](https://github.com/Helldez/BigMoeOnEdge/blob/main/docs/ngram.md)).

iOS (colaboração com o Harbor):
- Existe o entitlement [`com.apple.developer.kernel.increased-memory-limit`](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.kernel.increased-memory-limit).
- O jetsam limita cada processo a uma fração da RAM, e há relato de kill no iPhone 17 Pro com 11 GB livres ([boardsesh PR](https://github.com/boardsesh/boardsesh/pull/5524)).
- Apps com o entitlement viram alvo preferencial do jetsam ([zenn](https://zenn.dev/mtfum/articles/ios_memory_entitlements?locale=en)).
- Limite exato por modelo de iPhone: UNKNOWN (fica com o Harbor).

## 4. Memória condicional e modelos n-gram

**Por que combinam com celular:**
- O índice da tabela sai de um hash dos últimos N tokens, conhecido **antes** do forward. Dá para fazer prefetch assíncrono, sem depender de router aprendido como nas MoE.
- Custo por token: algumas dezenas de leituras de ~KB, sem matmul. No Qwen3.8-Flash-Next são 16 linhas de 160 dims por token, "sob 1% de um passo de decode" com `MADV_RANDOM` ([android-memory.md](https://github.com/Helldez/BigMoeOnEdge/blob/main/docs/android-memory.md)).
- A distribuição de n-grams é Zipfiana: uma fração pequena concentra a maioria dos acessos, então o page cache pega o hot set e a cauda fica em NVMe/UFS (Engram §efficiency).
- O ponto fraco é o **prefill**: cada token do prompt faz fault das suas linhas no compute thread. Isso ainda não foi medido em device (BigMoeOnEdge).

| Trabalho | O que é | Números-chave | Pesos rodáveis / GGUF | Fonte |
|---|---|---|---|---|
| **DeepSeek Engram** (jan/2026, rev. jul/2026) | Memória condicional: embeddings n-gram (N≤3, 8 heads, dim 1280) com hash O(1) e gating, nas camadas 2 e 15. "Novo eixo de esparsidade", com lei de escala em U entre MoE e memória | Engram-27B (26,7B total, 3,8B ativos, 5,7B de memória) vs MoE-27B com iso-params: MMLU +3,4, BBH +5,0, HumanEval +3,0, MQ-NIAH 84,2→97,0. **Tabela de 100B params offloaded para DRAM do host: penalidade máxima de 2,8%** (backbone de 8B). Propõe hierarquia HBM/DRAM/**SSD** | **Só código de demo** (Apache-2.0), sem pesos. O DeepSeek-V4 não cita Engram | [arXiv 2601.07372](https://arxiv.org/abs/2601.07372) · [GitHub](https://github.com/deepseek-ai/Engram) |
| **Qwen3.8-Flash-Next** n-gram embedding | 20M entradas (bigramas e trigramas) na camada 2; tensor `per_layer_token_embd` com 320M linhas, 51,2B params (~28,8 GB em IQ4_NL; ~26,8 GB em UD-IQ1_S) | O README diz que a tabela "pode ser offloaded para host memory com prefetch assíncrono". Desktop Mac com Metal I/O: 36 tok/s iguais com a tabela resident ou no SSD. CUDA: -10–15% | ✅ HF + GGUF; llama.cpp upstream `qwen4exp`. **Total de 72,5 GB ou mais: não cabe nos 50 GB** | [GitHub](https://github.com/QwenLM/Qwen3.8-Flash-Next) · [HF disc. #11](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF/discussions/11) · [PR #27742](https://github.com/ggml-org/llama.cpp/pull/27742) |
| **LongCat-Flash-Lite** (Meituan) | "Scaling Embeddings Outperforms Scaling Experts": 12 tabelas de hash polinomial, mais de 30B de embedding em 68,5B total | MMLU-Pro 78,3; GPQA-D 66,8; SWE-Bench 54,4 com ~3B ativos | ✅ HF (MIT). GGUF de 30,5–37,4 GB, **só em fork** | [arXiv 2601.21204](https://arxiv.org/abs/2601.21204) · [card](https://huggingface.co/meituan-longcat/LongCat-Flash-Lite) |
| Meta "Memory Layers at Scale" | Camada de memória chave-valor treinável (product keys), até 128B de params de memória | Supera dense com o dobro de compute e MoE com iso-compute/params; ganho maior em tarefas factuais | Código ([facebookresearch/memory](https://github.com/facebookresearch/memory)); pesos/GGUF: UNKNOWN | [arXiv 2412.09764](https://arxiv.org/abs/2412.09764) |
| SCONE (Google) | Embeddings n-gram contextualizados, pré-computados e guardados fora do acelerador | Com 1B de params resident, supera um baseline de 1,9B | Implementação comunitária; sem pesos oficiais (UNKNOWN) | [arXiv 2502.01637](https://arxiv.org/abs/2502.01637) |
| Over-Tokenized Transformer | Vocabulário de entrada multi-gram, desacoplado da saída | Relação log-linear entre tamanho do vocabulário de entrada e loss (ICML 2025) | UNKNOWN | [arXiv 2501.16975](https://arxiv.org/abs/2501.16975) |
| TF-Engram | Engram sem treino, memória em hierarquia GPU-DRAM-**SSD** com prefetch guiado por early exit | Qwen3-0.6B: 57,6→59,4 | Sem código (UNKNOWN) | [arXiv 2607.07388](https://arxiv.org/abs/2607.07388) |
| Tensorizing Engram, L³ (Large Lookup Layers) | Variantes: latentes compartilhados entre n-grams; lookup layers grandes | UNKNOWN (só título lido) | UNKNOWN | [arXiv 2606.08347](https://arxiv.org/abs/2606.08347) · [arXiv 2601.21461](https://arxiv.org/abs/2601.21461) |
| Gemma-4 E-series PLE | Per-layer embeddings grandes (lookup, não matmul) | 1,94 GB = 39% do arquivo do E4B. Lazy load reduz o RSS em 1,2 GB | ✅ llama.cpp | [PR #27794](https://github.com/ggml-org/llama.cpp/pull/27794) |

Suporte na engine:
- O BigMoeOnEdge **não streama** a tabela n-gram. Ela falha na regra "índice materializado antes do nó" (hash computado dentro do grafo), então fica em mmap com `MADV_RANDOM` ([row-gathered-tables.md](https://github.com/Helldez/BigMoeOnEdge/blob/main/docs/row-gathered-tables.md)).
- O `--row-stream` só cobre `token_embd` e economiza ~500 MB de RAM.
- **Espaço aberto para o Boar:** um row-streamer específico para hash n-gram, que computa o hash na CPU antes do grafo, faz prefetch e usa cache LRU de slabs.

## 5. Vitalik: a direção citada

- Post do bounty: [x.com/VitalikButerin/status/2100695863026954698](https://x.com/VitalikButerin/status/2100695863026954698), de 2026-09-17. Bounty no poidh, "Build the Best Offline AI Research App for Android", 1,098 ETH (1 ETH do Vitalik), prazo 2026-10-31 ([BlockTempo](https://www.blocktempo.com/vitalik-tests-offline-android-ai-apps-poidh-bounty-phone-laptop/)). Restrição: celular de 12 GB com 50 GB de storage ([AndroidLM](https://github.com/Phineas1500/AndroidLM)).
- A direção, na tradução chinesa do BlockTempo: "手機適合走極端的混合專家模型（MoE）路線，總參數約 1,000 億、大部分放在儲存空間，每個 token 只啟用不到 10 億參數" (celular combina com **MoE extremo, ~100B de parâmetros totais, a maior parte em storage, <1B ativo por token**). O texto original em inglês é **UNKNOWN**: o X devolveu 402/451.
- Segundo a [cobertura](https://cryptorank.io/news/feed/72c6b-ethereum-cofounder-vitalik-says-local-ai-is-nearly-ready-but-crypto-wallets-still-cannot-trust-it-alone), ele citou o Qwen3.8-Flash-Next como exemplo: "125B main model plus 51B n-gram tables, ~6B activated per token". Na tentativa própria dele, um modelo de 1B rodava a ~10 tok/s.
- Follow-up de 2026-09-26 ([gokhshtein](https://gokhshtein.com/news/2026-09-26-vitalik-buterin-says-offline-ai-apps-still-lag-laptop-models)): "Definitely getting much better than the one I tried to build myself 2 months ago… Still much slower and less effective at difficult questions than the models that can run on a laptop." Status [2103762130554204651](https://x.com/VitalikButerin/status/2103762130554204651), texto UNKNOWN (402).
- Segundo o BlockTempo, só o AndroidLM segue o caminho MoE entre as submissões.

---

## Ranking para o tier deep do Boar

Critérios, em ordem: cabe em 50 GB junto com o corpus; tem número medido em celular de 12 GB; qualidade de conhecimento; licença; esforço de integração no llama.rn.

1. **Qwen3.6-35B-A3B, em UD-IQ3_XXS (13,2 GB) ou UD-Q3_K_XL (16,8 GB), com streaming de experts estilo BigMoeOnEdge.**
   - Melhor qualidade publicada da classe (MMLU-Pro 85,2, GPQA 86,0), Apache-2.0, e arch já suportada pelo llama.rn e pelo BigMoeOnEdge.
   - Tem número medido: 5,0 tok/s lossless até em Q4_K_M (22,3 GB) num celular de 12 GB.
   - Iguala o AndroidLM no modelo e ganha em quant: IQ3_XXS tem metade do KLD do Q2_K_XL (dado do 3.5).
   - Risco: exige portar o streamer para o llama.rn (o mmap puro é instável) e não há caminho iOS pronto.
2. **Gemma-4-26B-A4B-it, em UD-Q3_K_XL (12,9 GB) ou Q4_K_M (16,9 GB).**
   - Apache-2.0, MMLU-Pro 82,6, 140+ idiomas (bom para PT-BR), multimodal.
   - Medido no BigMoeOnEdge: 4,1 lossless, 2,8 com cache de 2000 MiB + overlap.
   - Mais RAM resident por causa do shared expert, então o cache de 4000 MiB só cabe com RAM livre.
   - Bom plano B, e útil como A/B de qualidade com o Sextant.
3. **LFM2-24B-A2B, em IQ3_XXS (9,39 GB) ou IQ2_M (7,74 GB), como fallback quase resident e rápido.**
   - 2,3B ativos com hybrid conv, então o decode fica mais barato.
   - Cabe quase resident, o que reduz a dependência do streamer. É o caminho mais provável para iOS dentro do jetsam.
   - Contras: licença com threshold de US$10M de receita, e sem MMLU-Pro/GPQA publicados (o Sextant precisa medir).
   - Alternativa MIT: Ling-mini-2.0 (789M não-embedding ativos, Q2_K 6,07 GB), que está mais perto do "<1B ativo" do Vitalik. Precisa de eval e não tem suporte no BigMoeOnEdge.

Watchlist (não recomendados agora):
- **Qwen3.8-Flash-Next**: é a direção n-gram que o Vitalik citou, mas o menor GGUF tem 72,5 GB, acima dos 50 GB. Vale se sair uma variante menor ou se o Boar relaxar o disco.
- **LongCat-Flash-Lite**: Q3_K_L de 30,5 GB cabe, é MIT e usa n-gram, mas roda só em fork e sem número em celular.
- **Ling-3.0-flash**: IQ2_XXS de 39,2 GB, apertado.
- **Pesos com Engram**: não existem.

## UNKNOWN (não verificado)

- Texto original em inglês do post 2100695863026954698 e do 2103762130554204651 (o X bloqueou com 402/451). A citação acima é tradução chinesa de terceiros.
- Licença e data exatas do Qwen3.5-35B-A3B; data de lançamento do Ling-mini-2.0, do Ling-3.0-tiny/flash e do ERNIE-4.5-21B-A3B; licença e data do OLMoE (não re-verificadas).
- Termos da "Qwen Community License 1.0" (Qwen3.8-Flash-Next): restrições comerciais não lidas.
- Tabelas de KLD por quant do Qwen3.6-35B-A3B (só em imagem). Usei o Qwen3.5-35B-A3B como proxy.
- Benchmarks numéricos: LFM2-24B-A2B, Ling-mini-2.0 (só gráfico), ERNIE-4.5-21B-A3B, SmallThinker-4BA0.6B, Ling-3.0-tiny (MMLU-Pro/GPQA).
- SimpleQA ou benchmark factual comparável dos candidatos 1–3. É a métrica mais relevante para um app de pesquisa e fica com o Sextant.
- Tamanhos de GGUF de SmallThinker, Granite-4.0-H-Tiny, LFM2.5-8B-A1B em 2–3 bits, e Ling-3.0-tiny.
- Nome exato da arch llama.cpp do ERNIE e do Ling-3.0-tiny.
- MNN, MLC e ExecuTorch: se têm streaming de experts do flash para MoE grande no celular, e com quais números.
- Código do app iOS do flash-moe (@anemll) e o método usado para contornar o jetsam.
- Licença do repo flash-moe.
- Custo real, em device, do fault de linhas n-gram no prefill (o BigMoeOnEdge declara como não medido).
- Qwen4 final e qualquer MoE Qwen pequeno (<30B) na série 3.8.
