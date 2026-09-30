# Device test pack: one session on a physical Android phone

TL;DR: three measurements in one sitting, about 1–1.5 h, most of it downloads and waiting. (A) prove the
offline APK sends nothing, (B) the in-app benchmark (Qwen3-4B, 16 questions), (C) a smoke test of
Maple-Preview 20B-A1B installed through the in-app Hugging Face search. Everything you send back is
listed in [step 5](#5-send-back-5-min). Written for a Dimensity 8300 phone; any arm64 Android with 8 GB of
RAM or more works.

| Part | What it measures | Needs | Time |
|---|---|---|---|
| A. Offline proof | the offline APK's kernel traffic counters stay at 0 B, in airplane mode and on Wi-Fi | the signed `boar-offline-v1.1.0-arm64.apk` (#40's release workflow) + ~1 GB of model files | ~20 min |
| B. Benchmark s16 | TTFT, tok/s, stage times and answers of Qwen3-4B on 16 questions, plus peak RAM | a dev build of PR #36 (in-app benchmark) | ~25 min |
| C. Maple smoke | whether a 5.5 GiB ternary MoE downloaded by the app's HF search loads and answers; TTFT, tok/s, peak RAM on 5 factual questions, next to Qwen3-4B | the same dev build, ~6 GB free | ~30 min |

## 0. Setup (10 min)

Two checkouts: one for the app build (PR #36), one for this pack's files.

```bash
gh repo clone rferrari/boar-app boar-bench && cd boar-bench && gh pr checkout 36 && npm ci && cd ..
gh repo clone rferrari/boar-app boar-proof && cd boar-proof && gh pr checkout <this PR> && cd ..
mkdir -p results && cd results        # everything you send back goes here

# Phone identity (USB debugging on, `adb devices` shows it)
{ adb shell getprop ro.product.model; adb shell getprop ro.soc.model; adb shell getprop ro.build.version.release
  adb shell getprop ro.build.fingerprint; adb shell grep MemTotal /proc/meminfo; } > device.txt
```

Start the dev build now. It takes a while the first time, and part A doesn't need it:

```bash
(cd ../boar-bench && npx expo run:android) > build.log 2>&1 &      # builds and installs "BOAR" (team.sopa.aoair)
```

## 1. Part A: the offline APK sends nothing (20 min)

BOAR Offline (`team.sopa.aoair.offline`) installs next to the other BOAR, and neither touches the other's
data.

```bash
# The release APK (from the v1.1.0 release, or the artifact of a Release APK workflow run)
gh release download v1.1.0 -R rferrari/boar-app -p 'boar-offline-*'
sha256sum -c boar-offline-v1.1.0-arm64.apk.sha256
# Static check: must print "OK: ... NO-NETWORK-BY-CONSTRUCTION, signed with the release key"
OUT=$PWD RELEASE=1 ../boar-proof/scripts/offline-proof.sh boar-offline-v1.1.0-arm64.apk
adb install boar-offline-v1.1.0-arm64.apk

# Models for it: the compact 1.5B + the embedding model (~1 GB). The offline app imports files.
curl -LO https://huggingface.co/CompendiumLabs/bge-small-en-v1.5-gguf/resolve/d32f8c040ea3b516330eeb75b72bcc2d3a780ab7/bge-small-en-v1.5-q8_0.gguf
curl -LO https://huggingface.co/bartowski/Qwen2.5-1.5B-Instruct-GGUF/resolve/9eadc66189c7641e1ddd226b8267a9119b2ce2d4/Qwen2.5-1.5B-Instruct-Q4_K_M.gguf
adb push bge-small-en-v1.5-q8_0.gguf Qwen2.5-1.5B-Instruct-Q4_K_M.gguf /sdcard/Download/
```

1. Open **BOAR Offline** → setup → **Import from file** → pick both files. Both must show as verified.
2. **R1, airplane mode ON (Wi-Fi off):** ask these 3 and check each gets an answer:
   "What is d/acc?", "Who won the First World War?", "How do I treat a burn?".
   ```bash
   ../boar-proof/scripts/netstats-uid.sh team.sopa.aoair.offline | tee netstats-offline-r1.txt
   ```
3. **R2, airplane mode OFF, Wi-Fi ON:** use BOAR Offline for 3 minutes (2 more questions, open Models and
   Settings, background it and come back).
   ```bash
   ../boar-proof/scripts/netstats-uid.sh team.sopa.aoair.offline | tee netstats-offline-r2.txt
   ```
   Pass: both files say `rx=0 B tx=0 B  recorded history entries: 0`. Anything else: send it, it's the finding.
4. Uninstall the phone's copies of the two files in Downloads if you like (the app keeps its own).

## 2. Part B: benchmark s16, Qwen3-4B (25 min)

Wait for `build.log` to end with the app installed, then serve production-mode JS so timings are
release-like:

```bash
(cd ../boar-bench && EXPO_PUBLIC_DEVICE_EVAL=1 npx expo start --localhost --no-dev --minify) > metro.log 2>&1 &
adb reverse tcp:8081 tcp:8081
```

Open **BOAR** (not Offline) on Wi-Fi, wait for the chat screen, keep it in the foreground, and set the
screen timeout long (or "stay awake while charging"). Then paste these helpers once:

```bash
PKG=team.sopa.aoair
send() {  # send <request.json>: the app polls for it every 3 s
  adb shell "run-as $PKG sh -c 'mkdir -p files/eval/requests && echo $(base64 < "$1" | tr -d '\n') | base64 -d > files/eval/requests/pending.json'"; }
status() { adb exec-out run-as $PKG cat "files/eval/requests/$1.status.json"; echo; }   # status <requestId>
pull() {  # pull <requestId> <name>: status + result rows
  status "$1" > "$2.status.json"
  adb exec-out run-as $PKG cat "$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1]))["resultPath"])' "$2.status.json")" > "$2.jsonl"; }
memwatch() {  # memwatch <file>: app RSS, peak RSS (VmHWM) and the phone's MemAvailable every 2 s
  while sleep 2; do adb shell "run-as $PKG sh -c 'p=\$(pidof $PKG); echo \$(date +%T) \$(grep -E \"^Vm(RSS|HWM)\" /proc/\$p/status) \$(grep MemAvailable /proc/meminfo)'"; done > "$1"; }
```

```bash
adb shell am force-stop $PKG && adb shell monkey -p $PKG 1 >/dev/null   # fresh process = fresh peak RSS
memwatch mem-s16.txt & MW=$!
send ../boar-proof/docs/device-test-pack/request-s16-qwen3-4b.json
status req-ricardo-s16-qwen3-4b      # repeat until "state": "done" (downloads ~2.9 GB first: 5–15 min, then ~5–10 min)
kill $MW
pull req-ricardo-s16-qwen3-4b ricardo-s16-qwen3-4b
../boar-proof/scripts/netstats-uid.sh $PKG | tee netstats-downloader.txt   # control: this one must show traffic
```

If Android kills BOAR mid-run, open it again and re-send the same file: it resumes where it stopped.
If `memwatch` lines are empty (`run-as` refused), use `adb shell dumpsys meminfo $PKG | grep -E "TOTAL (PSS|RSS)"`
once near the end of the run instead.

## 3. Part C: Maple-Preview 20B-A1B smoke (30 min)

1. In **BOAR** (Wi-Fi on): Models → **Search** → `maple-preview` → open `deepgrove/maple-preview-GGUF`.
   If the file isn't listed, set **File size** to **Any** (on phones under ~12 GB of RAM the default
   "Fits phone" filter hides it). Download **only** `maple-preview-TQ2_0-head-Q4_K.gguf` (5.50 GiB,
   ~5–20 min). Don't download a second Maple file, or the request below can't tell them apart.
2. Check the file's hash yourself. Models found by search are only size-checked by the app today:
   ```bash
   adb shell run-as $PKG sha256sum files/models/hf-deepgrove-maple-preview-gguf-maple-preview-tq2-0-head-q4-k-gguf.gguf | tee maple-sha256.txt
   # expected: 221f792cc9760d27a34f449b4229e258fa968a63bd4213993e45d9c0bb477a9e
   ```
   If the path doesn't exist, `adb shell run-as $PKG ls -la files/models` and send the listing.
3. Run the 5 questions on Qwen3-4B and Maple (same retrieved context, so the two can be compared):
   ```bash
   adb shell am force-stop $PKG && adb shell monkey -p $PKG 1 >/dev/null
   memwatch mem-maple.txt & MW=$!
   send ../boar-proof/docs/device-test-pack/request-maple-smoke.json
   status req-ricardo-maple-smoke       # until "done"; if "failed", the error says why (send it)
   kill $MW
   pull req-ricardo-maple-smoke ricardo-maple-smoke
   ```
4. Then ask Maple one question by hand in the chat (select it under Models → **Use for answers**) and
   note in `notes.md`: did it load, did it crash, anything odd in the text (e.g. `<think>` tags, a broken
   chat template, repeated tokens).

The questions (`request-maple-smoke.json`) are 5 of the factual set used to compare models:
two quoted from Vitalik's own Field Atlas test cases (population comparison, blue whale vs dinosaur),
a history question, "What is d/acc?" and a dengue question.

## 4. Clean up (optional)

Maple takes 5.5 GiB: Models → Maple → delete. BOAR Offline can stay or go (`adb uninstall team.sopa.aoair.offline`).

## 5. Send back (5 min)

Zip `results/` and send it. It should contain:

| File | From |
|---|---|
| `device.txt` | setup |
| `boar-offline-v1.1.0-arm64.md` + `.json` (the static report) | A |
| `netstats-offline-r1.txt`, `netstats-offline-r2.txt` | A |
| `ricardo-s16-qwen3-4b.jsonl`, `ricardo-s16-qwen3-4b.status.json`, `mem-s16.txt` | B |
| `netstats-downloader.txt` | B (control) |
| `ricardo-maple-smoke.jsonl`, `ricardo-maple-smoke.status.json`, `mem-maple.txt`, `maple-sha256.txt` | C |
| `notes.md`: anything that failed, crashed or looked wrong, and the answer to "did Maple load?" | all |

What we read from it: offline pass/fail (0 B in R1 and R2); TTFT, tok/s and stage times per question (the
`.jsonl` rows); peak RAM (`VmHWM`, max over the session) and the lowest `MemAvailable`, which shows
whole-phone memory pressure, not just the app; whether Maple runs without a crash, and how its answers
compare with Qwen3-4B's on the same 5 questions.

## Known gaps

- Parts B and C need PR #36's dev build: shipped builds ignore benchmark requests, and `run-as` only
  works on a debuggable app. The model's speed is native code, the same in any build.
- The in-app benchmark doesn't record peak RAM for this pipeline, hence `memwatch`.
- `netstats-uid.sh` was checked on an Android 15 emulator, not yet on a phone. The first run on this phone
  is also the check of the method; the downloader control shows whether it sees traffic.
