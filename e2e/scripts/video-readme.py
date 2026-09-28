#!/usr/bin/env python3
"""Polish round videos: gather run-video.sh output into shots/polish/<sha>/<platform>/ and write its README.

usage: video-readme.py <dest dir>   (dest/runs/video-<sha>-<ts>/ = the mini's output dirs, rsynced)
Moves every video to <dest>/ (a later run of the same file wins), reads each run's videos.tsv/device.txt,
and probes containers with ffprobe -count_packets (demux only, no decode: cheap on the MacBook).
"""
import csv, json, shutil, subprocess, sys
from pathlib import Path

dest = Path(sys.argv[1]); runs = sorted(p for p in (dest / "runs").glob("video-*") if p.is_dir())
rows, devices = {}, {}
for run in runs:
    tsv = run / "videos.tsv"
    if not tsv.exists():
        continue
    devices[run.name] = (run / "device.txt").read_text().strip() if (run / "device.txt").exists() else "?"
    for r in csv.DictReader(tsv.open(), delimiter="\t"):
        src = run / r["file"]
        if src.exists() and src.stat().st_size > 0:
            shutil.move(str(src), dest / r["file"])
        if (dest / r["file"]).exists():
            rows[r["file"]] = {**r, "run": run.name}

def probe(f: Path) -> dict:
    out = subprocess.run(["nice", "-n", "19", "ffprobe", "-v", "error", "-select_streams", "v:0", "-count_packets",
                          "-show_entries", "stream=codec_name,width,height,r_frame_rate,avg_frame_rate,nb_read_packets:format=duration,size",
                          "-of", "json", str(f)], capture_output=True, text=True).stdout
    j = json.loads(out or "{}"); s = (j.get("streams") or [{}])[0]; fm = j.get("format", {})
    dur = float(fm.get("duration") or 0); pk = int(s.get("nb_read_packets") or 0)
    return {"codec": s.get("codec_name", "?"), "size": f"{s.get('width')}x{s.get('height')}", "r_fps": s.get("r_frame_rate", "?"),
            "dur": round(dur, 1), "packets": pk, "pk_fps": round(pk / dur, 1) if dur else 0, "mb": round(int(fm.get("size") or 0) / 1e6, 1)}

lines = []
for name in sorted(rows):
    r = rows[name]; p = probe(dest / name)
    lines.append(f"| `{name}` | {r['lang']} | {r['font']} | {r['recorder']} | {p['codec']} {p['size']} | {p['dur']} | {p['r_fps']} | "
                 f"{p['packets']} ({p['pk_fps']}/s) | {r['app_frames']} ({r['app_fps']}/s) | {r['janky_pct'] or '-'} | {r['p90_ms'] or '-'} | {p['mb']} | {'ok' if r['flow_rc'] == '0' else 'rc=' + r['flow_rc']} |")

sha = dest.parent.name
readme = f"""# Polish round videos, Android, integration {sha}

TL;DR: one video per flow, language and font (POLISH-2026-09-28.md #1). Headless AVD on the Mac mini, dark theme, airplane mode.
Font 1.0 on every flow, plus large font (`_ax`) on flows 01, 02 and 05. Maestro drives the taps, and `show_touches` puts a dot on each one.

## How to read "fps"

- **Container fps** (`r_frame_rate`): the rate the recorder writes. `emu` = `adb emu screenrecord --fps 60` encodes on the host at a fixed 60 fps, so a frame the app did not redraw shows up as a duplicate. `dev` = `adb shell screenrecord` has a variable frame rate and writes a frame only when the screen changes.
- **Packets/s**: frames actually written, divided by the video length. For `dev` this is the real screen-update rate. For `emu` it is about 60 by construction.
- **App frames/s**: frames the app rendered (`dumpsys gfxinfo`, reset when recording starts), divided by the recording's seconds. This is the app's real frame rate on this emulator. It counts idle stretches too, so read it together with janky % and p90.
- This is an emulator (arm64 AVD, see `-gpu` below), not a phone. Timing and smoothness are indicative only. Layout, order, and presence or absence of transitions are what these videos can show reliably.

## Files

| file | lang | font | recorder | video | s | container fps | packets | app frames | janky % | p90 ms | MB | flow |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
{chr(10).join(lines)}

Names follow `<nn>-<flow>_<en|pt>[_ax]`. `01a` = setup 1→3 plus the start of the import, and `01b` = import → done → chat. The plan asked for `.mp4`. The `emu` recorder writes WebM (VP8), and ffmpeg/Prism read it the same way.

## Device (per run)

""" + "\n\n".join(f"### {k}\n```\n{v}\n```" for k, v in devices.items()) + """

## Frame by frame

```bash
ffmpeg -i 02-chat-send_en.webm -vf "select='gt(scene,0.002)',showinfo" -vsync vfr frames/%05d.png   # changed frames only
ffmpeg -ss 12.0 -i 02-chat-send_en.webm -frames:v 90 frames/%03d.png                                # 1.5 s at 60 fps from t=12 s
```

Raw run output (Maestro logs, gfxinfo, emulator log) is in `runs/`.
"""
(dest / "README.md").write_text(readme)
print(f"{len(rows)} videos -> {dest}/README.md")
