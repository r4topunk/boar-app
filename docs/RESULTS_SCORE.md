# Shared results and the score

People can share an evaluation run from the app (Evaluation › Share results) so others with
the same chipset, CPU or memory can see which models work best on phones like theirs. This
page explains what is sent, what is public and how the score is computed.

## What is sent

Only after the user reads the "What will be shared" screen and presses Share:

- **Phone:** brand and model, chipset (`Build.SOC_MODEL`, Android 12+, or `Build.HARDWARE`),
  number of cores and each core's top frequency, CPU features from `/proc/cpuinfo`
  (llama.cpp gains most from `i8mm` and `asimddp`, shown as dotprod), total RAM, Android
  version and API level.
- **App:** BOAR version and the evaluation set version.
- **Every answer of the run:** the question, the answer, the model and its timings, the
  sources retrieved.
- **A signature from the phone's hardware key**, made for BOAR in the phone's secure hardware
  (Android Keystore, iOS App Attest), so runs can't be sent from a script or an emulator. The
  first share also sends the key's certificate chain, which shows the Android security patch
  level and whether the bootloader is unlocked. The key is the phone's only id: it allows 3
  runs in 24 hours, 1 hour apart, and refuses the same run twice. See
  [supabase/README.md](../supabase/README.md).

Not sent: chats, documents, name, location, contacts. The offline build has no network
access and can't share.

## How a share works

1. **Challenge.** The app asks `submit-results` for a one-time challenge (valid 5 minutes,
   usable once).
2. **The phone's key.** On the first share the app makes a key in the phone's secure hardware
   (`modules/device-key`): an Android Keystore key whose certificate carries that challenge,
   or an iOS App Attest key. The key never leaves the hardware.
3. **Signature.** The app signs `challenge.payload`, where the payload is the exact JSON
   listed above, and sends the challenge, the payload, the signature and, the first time, the
   key's certificate chain.
4. **Server checks.** The function checks the chain (Android: Google's attestation root, not
   revoked, a key in secure hardware for `team.sopa.aoair` signed with BOAR's release key;
   iOS: Apple's App Attest root and BOAR's App ID), then the signature. From then on the phone
   is known by its key and only signs.
5. **Limits and storing.** In one database transaction: the same run twice is answered
   "already shared", then 3 runs per phone in 24 hours, at least 1 hour apart, 6 per network
   a day and 300 an hour in total. Then the run, its answers and its scores are stored.
6. **Plausibility.** Answers must be to the evaluation set's own questions, once each. A run
   with impossible timings or memory is kept, but its scores stay hidden until someone looks.

Stored runs can't be changed or deleted, not even with the server's secret key; only the
database owner can hide a score or block a device. What the app says for each answer
(shared, already shared, cooldown or daily limit with the time sharing opens again, network
limit, refused) is in `src/eval/shareResults.pure.ts`.

### Which builds can share

Only BOAR's release builds, signed with the project's release key (`make apk-downloader`, or
a release APK published after v1.0.0, which had no sharing). Development builds (`npx expo run:android`, the dev client)
and debug builds are refused: they are signed with Expo's debug key, which anyone can use,
so a modified app could pass as BOAR. The offline build has no network permission. iOS sharing
opens once the function's `APPLE_APP_ID` is set.

A release build and a development build share the application id `team.sopa.aoair` but not the
signing key, so one can't be installed over the other: uninstall the development build first
(its downloaded models go with it; import them from files to avoid downloading again).

## What is public

`eval_scores` (one row per model per run) can be read by anyone with the project's
publishable key, and sorted or filtered on any column, for example:

```
GET /rest/v1/eval_scores?soc=eq.MT6897&order=median_tok_per_sec.desc
```

It holds the hardware and the per-model numbers, never the phone's key or its id. The raw
runs and answers (`eval_runs`, `eval_rows`) are not readable with the publishable key. A junk entry can
be hidden (`eval_scores.hidden`) without deleting it.

## Score v1

For each model in a run, from its answers:

| Part | Weight | How it's measured |
|---|---|---|
| Speed | 60% | Median decode speed in tokens/s over completed answers of 16 tokens or more, divided by 20 tokens/s (about three times reading speed), capped at 1 |
| Reliability | 25% | Answers completed (no error, no timeout) out of all answers |
| Retrieval | 15% | Questions whose expected source was found, out of the questions that expect one |

`score = round(100 × (0.60 speed + 0.25 reliability + 0.15 retrieval))`

- When no question in the run expects a source, speed and reliability are rescaled to fill
  100% (0.60/0.85 and 0.25/0.85).
- A model that completes fewer than half its answers scores 0, however fast it is.

The score measures **speed and reliability, not whether the answers are correct**: nothing
grades answers yet. The answers are kept with every run, so a quality part can be added later
as score v2 without asking anyone to share again.

The raw numbers stay next to the score (median tokens/s, time to first token, total time,
peak RAM, completed and sources found), so people can sort by what matters to them.

## Where the formula lives

- `supabase/migrations/*_eval_scores.sql`, `compute_eval_scores`: the stored score. The server
  always computes it from the answers; a score sent by the app would be ignored.
- `src/eval/score.pure.ts`: the same formula in the app, for the preview before sending.

Change both together, bump `SCORE_VERSION` and `score_version`, and update this page.
