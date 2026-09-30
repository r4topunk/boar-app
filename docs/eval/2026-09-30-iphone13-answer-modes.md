# iPhone 13 (4 GB): quick vs full answer mode

TL;DR: on an iPhone 13 with packs installed, the **full answer (multi-pass) scored lower than the quick answer** for both small models tested. It also took **30–60 s to the first word instead of ~1.3 s**. This is the evidence behind the "Always full answer" hint ("no better answers on 4 GB phones").

## Result

Crypto + travel questions of eval set v2 (n = 30: 20 crypto, 10 travel). The quality ratio is the BOAR rubric mean divided by the reference rubric mean (bootstrap 95% CI). "Correct" means judge correctness ≥ 4/5.

| Model | Quick | Full | Quick TTFT p50 | Full TTFT p50 |
|---|---|---|---|---|
| Qwen2.5-1.5B Q4_K_M | **0.42** (0.36–0.49), 42% correct | 0.33 (0.28–0.39), 10% correct | 1.3 s | crypto 60.2 s, travel 30.0 s |
| LFM2.5-1.2B Q4_K_M | **0.37** (0.31–0.43), 22% correct | 0.33 (0.28–0.39), 12% correct | 1.2 s | crypto 49.4 s, travel 39.4 s |

- **Crypto alone, Qwen:** quick 0.44 (0.37–0.52) vs full 0.33 (0.28–0.38). The intervals overlap slightly (0.37–0.38).
- **Travel alone, Qwen:** quick 0.41 vs full 0.34, with overlapping intervals (n = 10).
- **"Quick" is as shipped.** A declined answer (no strong source) is scored as the decline. With "Answer anyway" re-asks the quick numbers are 0.43 (Qwen) and 0.39 (LFM), and the conclusion doesn't change.
- **A tested variant doesn't close the gap.** Giving the full mode's synthesis the top sources (experiment knob, not shipped) scored 0.36. The gap comes from the multi-pass itself with a small model: decomposition plus errors compounding across steps.

## Method

- **Device:** iPhone 13 (4 GB RAM), CPU inference (`GGML_METAL_DEVICES=0`), 2026-09-30 01:45–05:10 local time.
- **Build:**
  - Qwen: `b0fb197` with the in-app benchmark (PR #36), llama.rn 0.13.0-rc.4.
  - LFM: `f2b5ca5` (llama.rn 0.13.0-rc.6) with the same benchmark.
- **Pipeline:** the live `answer()` path the chat uses, driven by device requests (`npm run eval:iphone`). The answer mode was set per run (`quickFirst` on, `alwaysComplete` on/off), with a fixed prompt (default personality, no history, 512 tokens).
- **Packs installed:** `boar-crypto`, `boar-wikivoyage-en`, and places tiles for the v2 cities.
- **Questions:** `eval/dataset/questions.v2.jsonl`, categories `crypto-expert` and `travel-practical`.
- **Judge:** Claude Opus (`claude -p`, no tools), blind pairwise against Opus + web search reference answers (`eval/references/v2/claude-code__opus.jsonl`). Each pair is judged in both A/B orders, and disagreeing orders count as a tie. Rubric: correctness, completeness, usefulness (1–5).
- **Runs** (full = alwaysComplete on):

| Run | Model | Mode | Categories |
|---|---|---|---|
| R3a | Qwen | quick | crypto + travel |
| R2 | Qwen | full | crypto |
| R3b | Qwen | full | travel |
| R4a | LFM | quick | crypto + travel |
| R4b | LFM | full | crypto + travel |

## Limits
- n is small (30 questions per cell; travel n = 10).
- Judge and reference are both Claude (same-family bias toward the reference).
- A/B order and phone temperature were not alternated.
- Measured on 1–1.5B models only. Phones with more RAM run Qwen3-4B, where full mode was not measured.

## Raw data

Not committed; results are large and kept out of the repo, as for the v1 eval.
- **Device rows:** the r4to/boar workspace, `wt/eval-inapp/eval-results/iphone/{r2-packs,r3a-fast,r3b-complete-travel,r4a-lfm-fast,r4b-lfm-complete}/rows.jsonl`.
- **Judge-format rows:** `wt/eval/eval/results/runs/v2/<run>__<model>.jsonl`.
- **Verdicts:** `wt/eval/eval/results/judgments/v2/`.
- **Night log** (per-run notes): `review/research-pipeline/05-noite-2026-09-30.md`.

They can be attached as a release asset on request.
