#!/usr/bin/env python3
"""Summarize bmoe-cli per-token CSVs (bmoe_metrics v2) into one markdown table.

Usage: summarize.py <results_dir> [<results_dir>...]
Skips the first 8 decode tokens (cache warm-up) when computing medians.
"""
import csv
import statistics as st
import sys
from pathlib import Path

WARMUP = 8


def load(path: Path):
    meta, rows = {}, []
    with path.open() as f:
        lines = [l for l in f]
    for l in lines:
        if l.startswith("#"):
            for kv in l[1:].split():
                if "=" in kv:
                    k, v = kv.split("=", 1)
                    meta[k] = v
    body = [l for l in lines if not l.startswith("#")]
    for r in csv.DictReader(body):
        rows.append(r)
    return meta, rows


def med(rows, key, scale=1.0):
    vals = [float(r[key]) * scale for r in rows if r.get(key) not in (None, "")]
    return st.median(vals) if vals else float("nan")


def perf(log: Path):
    out = {}
    if not log.exists():
        return out
    for l in log.read_text(errors="ignore").splitlines():
        if l.startswith("prefill:"):
            # prefill: 1310 tokens, 353.112 s (3.7 tok/s) | model load 14.761 s | TTFT 367.873 s
            parts = l.replace("|", " ").split()
            out["prefill_tok_s"] = parts[parts.index("tok/s)") - 1].strip("(")
            out["ttft_s"] = parts[parts.index("TTFT") + 1]
        if l.startswith("generation:"):
            out["gen_tok_s"] = l.split("(")[1].split()[0]
        if "peak memory footprint" in l:
            out["footprint_gib"] = f"{int(l.split()[0]) / 2**30:.2f}"
        if "maximum resident set size" in l:
            out["maxrss_gib"] = f"{int(l.split()[0]) / 2**30:.2f}"
    return out


def main():
    print("| run | config | gen tok/s | median ms/tok | io ms | stall ms | compute ms | read MiB/tok | cache hit % | prefill tok/s | TTFT s | max RSS GiB | peak footprint GiB |")
    print("|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
    for d in map(Path, sys.argv[1:]):
        for c in sorted(d.glob("*.csv")):
            meta, rows = load(c)
            dec = rows[WARMUP:] if len(rows) > WARMUP else rows
            cfg = "mmap" if meta.get("moe_stream") == "0" else (
                f"stream cache={meta.get('cache_mb')} k={meta.get('n_expert_used')}")
            p = perf(c.with_suffix(".log"))
            print(
                f"| {d.name}/{c.stem} | {cfg} | {p.get('gen_tok_s','?')} | {med(dec,'wall_ms'):.0f} | "
                f"{med(dec,'io_ms'):.0f} | {med(dec,'stall_ms'):.0f} | {med(dec,'compute_ms'):.0f} | "
                f"{med(dec,'read_bytes',1/2**20):.1f} | {med(dec,'cache_hit_pct'):.1f} | "
                f"{p.get('prefill_tok_s','?')} | {p.get('ttft_s','?')} | {p.get('maxrss_gib','?')} | {p.get('footprint_gib','?')} |"
            )


if __name__ == "__main__":
    main()
