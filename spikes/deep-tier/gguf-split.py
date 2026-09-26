#!/usr/bin/env python3
"""Print a GGUF's MoE layout: expert vs dense bytes, MTP (nextn) tensors, expert counts.
Usage: gguf-split.py <model.gguf>  (needs llama.cpp's gguf-py on PYTHONPATH)"""
import collections, sys
from gguf import GGUFReader

r = GGUFReader(sys.argv[1])
for k, f in r.fields.items():
    if any(s in k for s in ("nextn", "block_count", "expert_count", "expert_used", "expert_shared")):
        print(k, f.parts[f.data[0]].tolist() if f.data else None)
tot = collections.Counter()
for t in r.tensors:
    tot["experts (streamable)" if "_exps" in t.name else "dense (resident)"] += int(t.n_bytes)
print({k: f"{v / 2**30:.2f} GiB" for k, v in tot.items()})
print("nextn/mtp tensors:", [t.name for t in r.tensors if "nextn" in t.name or "mtp" in t.name][:5])
