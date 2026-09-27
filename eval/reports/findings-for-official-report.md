# Findings to carry into the official report

- Citation support (Jev, gate candidate 2329dc0): 3 of the 5 citations shown in answers were not supported by the cited source; post-processing (CT-1) removed 19 of the 24 citations in the model's own text, and only 1 of those removed was supported (5% false positive). CT-1 still lets some unsupported citations through → Tusk, after the release gate.
- s32 1.5B on 2329dc0: confident errors 12 → 13 (+1) and correct-when-answering 41% → 36% (−5): within the noise rule (Boar: fail only on > 5 points or > 2 extra confident errors with n = 32). Recorded, not a failure.
- Answers from memory (nosource): 1.5B 3-7% correct, 64-83% wrong; the Compacto keeps refusing sourceless knowledge questions (scope: crypto and travel only).
- PT vs EN answer quality (4B, 41 v2 items, Jev): EN 0.55 / PT 0.51 on 2329dc0 (proposed criterion: PT >= EN - 5 points). Retrieval (Bramble, 42 questions): EN R@3 0.214 is the weak side.
