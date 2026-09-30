# Offline proof: check an APK's network surface yourself

TL;DR: `scripts/audit-apk.py` reads an APK and reports whether it *can* reach the network and what it
would talk to. It needs python3 and the Android build-tools' `aapt2`, and no Java. The same APK always
gives a byte-identical report, so anyone can check a published result: download the release APK, run
one command and compare. It works on any Android app, not only BOAR.

```bash
make offline-proof APK=boar-offline-v1.1.0-arm64.apk RELEASE=1    # offline APK, signed with the release key
make offline-proof APK=boar-v1.1.0-arm64.apk RELEASE_VARIANT=downloader
scripts/audit-apk.py some-other-app.apk                           # any APK, markdown to stdout
scripts/audit-apk.py a.apk b.apk --out dist/offline-proof/          # <apk>.md + .json + SUMMARY.md
```

`make offline-proof` fails unless the offline APK is `NO-NETWORK-BY-CONSTRUCTION`. With `RELEASE=1` it
also fails unless the APK is signed with the release key (`RELEASE_SIGNER` in
`scripts/check-release-apk.sh`, checked here without `apksigner`). Reports go to `dist/offline-proof/`.

## Verdicts

| Verdict | Meaning |
|---|---|
| `NO-NETWORK-BY-CONSTRUCTION` | No `INTERNET` permission, and no Google Play Services, Firebase or tracker classes. Android gives the app's user id no network sockets at all, localhost included, so this holds whatever the code does. |
| `NO-INTERNET-PERMISSION but GMS/tracker code present` | No sockets of its own, but Play Services client code could still ask another process (which has network) to send data. |
| `NETWORK-CAPABLE` | Declares `INTERNET`. The report lists every host embedded in the app, and each `review` host needs a reason (e.g. model downloads). |
| `NETWORK-CAPABLE + TRACKERS` | Same, plus analytics/crash-reporting SDK classes. |

Exit codes: 0 when every APK is `NO-NETWORK-BY-CONSTRUCTION`, 1 when one isn't, 2 on a tool error, and
3 when a signer check fails (`--require-release-key`: an Android debug or known public key;
`--expect-signer <sha256>`: any other key than that one).

## What the report covers

| Section | Read from |
|---|---|
| Permissions, backup/cleartext flags, exported components, `<queries>` | the binary manifest (`aapt2 dump xmltree`) |
| Play Services, Firebase, trackers, OTA/remote-code loaders, network libraries | class names in every `classes*.dex` |
| Native socket imports (`socket`, `connect`, `getaddrinfo`, curl, TLS) | ELF dynamic symbols of every `.so` |
| Embedded hosts, classified `review` / `doc-link` / `namespace` / `local/dev` | DEX strings, the Hermes bytecode string table (`index.android.bundle`), native libraries, assets |
| Signer certificate SHA-256 and subject, debug-key detection | the APK Signing Block (v2/v3) |
| Indirect channels: links handed to a browser, share sheet, shared storage | manifest |

Limits: a static audit proves what an APK *can* do, not what it *does*. `NETWORK-CAPABLE` apps can build
URLs at runtime, which the report cannot see. The signing block is parsed, not cryptographically
verified; `scripts/check-release-apk.sh` runs `apksigner` for that. Traffic that other apps send
(the browser opening a link, a maps app for a place, the system speech service) belongs to those apps.

## On a phone

The static verdict says the offline APK *cannot* open sockets. To show it *doesn't send anything*, read
the kernel's per-app traffic counters after using it (USB debugging, no root):

```bash
scripts/netstats-uid.sh team.sopa.aoair.offline   # "rx=0 B tx=0 B  recorded history entries: 0", exit 0
scripts/netstats-uid.sh team.sopa.aoair           # the downloader app: its downloads show up, so the counter works
```

It reads `dumpsys netstats detail`: the per-app counters since boot (`mAppUidStatsMap`, every interface
including loopback) and the recorded per-app history. A bare `grep uid=<n>` is misleading, because the
app also appears in `mUidCounterSetMap`, which only records whether it was in the foreground.

Check it after a session in airplane mode, where the app must work fully, and again after a few minutes
of normal use with Wi-Fi on, where it must still show 0.
