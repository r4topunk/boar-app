# Fixed case lng-009 (allergy sentence in French): candidate-aa0729a

TL;DR: **FAIL**: 1/2 answers refuse or name the allergen in French. Regenerate with `node eval/scripts/allergy-translation-check.mjs candidate-aa0729a`.

- qwen2.5-1.5b-instruct-q4km · lng-009: pass — I didn't find this in this phone's library.
- qwen3-4b-instruct-2507-q4km · lng-009: **fail** (English word in the French sentence: "Je suis allergique au peanut."; no arachide/cacahuète) — This answer is not from an offline source on this phone; check it before relying on it.  Je suis allergique au peanut.
