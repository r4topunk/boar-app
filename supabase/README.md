# Supabase backend

Receives evaluation runs that users choose to share from the app. Nothing is sent
automatically, and the offline build has no network access at all.

## How a shared run is protected

| Threat | What stops it |
| --- | --- |
| A script (`curl`) or an emulator posting fake runs | Each run is signed with a key made in the phone's secure hardware. Android: a Keystore key whose attestation chain must end at Google's root, be unrevoked, and name `team.sopa.aoair` signed with BOAR's release key. iOS: an App Attest key vouched for by Apple. Software-backed keys and debug builds are refused. |
| Replaying or editing a signed request | The signature covers a one-time server challenge (5 minutes) and the exact payload. |
| Flooding | Per device: 3 runs in 24 hours, at least 1 hour apart. Per network: 6 a day. In total: 300 an hour. Checked in one transaction under a lock per device. |
| Deleting or changing stored runs | `eval_runs`, `eval_rows`, `eval_scores` and `eval_devices` are append-only for every role but the owner, the secret key included (triggers and grants). |
| Believable but impossible numbers | Rows must answer the eval set's own questions, once each. Impossible timings or memory keep the run's scores hidden for review. |
| Reading private data | RLS on every table. The publishable key reads only `eval_scores` rows that aren't hidden. |

What it doesn't stop: someone with a real phone and the real app sharing real runs, or a
phone whose secure hardware has been broken (revoked keys are refused). A device is a key, so
clearing the app's data makes a new one; the per-network limit still applies.

- `migrations/`: the tables, `submit_eval_run()` (limits, storing, scoring) and the append-only
  rules.
- `functions/submit-results/`: the challenge, the attestation and signature checks
  (`attest.ts`) and the payload checks (`payload.ts`). Tests: `deno test --no-config
  --node-modules-dir=none supabase/functions/submit-results/`.

## Moderating

As the owner (the dashboard's SQL editor):

- **The review list:** `select * from eval_review_queue` shows every run whose scores are hidden,
  with its flags (`unattested`, `implausible_timing`, `rss_above_ram`), the phone and its scores.
- **Approve a run** (put it on the public scores): `update eval_scores set hidden = false where run = '<id>'`.
- **Hide a run:** `update eval_scores set hidden = true where run = '<id>'`.
- **Block a device's future runs:** `update eval_devices set banned = true where id = '<id>'`.

### Phones that can't attest

Some genuine phones can't attest a key: their secure hardware lacks, or lost, its factory
attestation keys (seen on a stock, locked POCO F3 as Keymaster error -10003). The app then makes
a plain key and sends only its public key. The server registers it as unattested and still
checks every signature, but nothing proves the key is in a real phone running BOAR, so each of its
runs is flagged `unattested` and waits in the review list. A script can make such keys too, so
there's room for at most 100 unattested runs a day in total, on top of the usual limits.

## Using your own project

```bash
supabase link --project-ref <your-project-ref>
supabase db push
supabase functions deploy submit-results --no-verify-jwt
```

Then copy `.env.example` to `.env` and set your project's URL and publishable key. Set
`RELEASE_CERT` in `functions/submit-results/index.ts` to your release certificate's SHA-256
(`keytool -list -v -keystore <keystore>`), and for iOS set the function's `APPLE_APP_ID`
secret to `<Team ID>.<bundle id>`.
