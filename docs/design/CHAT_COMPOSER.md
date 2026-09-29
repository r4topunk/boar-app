# Chat composer

TL;DR: one pill with the buttons inside it. The trailing slot shows the mic when the field is empty, send when
there is text, done while listening, and stop while an answer streams. Above the pill is one row: the answer-mode
chip (it has a visible label and opens a sheet), or the listening strip while you dictate (recording dot, elapsed
time, Cancel).

Code: `src/ui/chat/Composer.tsx` (view), `composerSlots.ts` (which button shows, pure), `composerLayout.ts`
(pill geometry, pure), `useVoiceInput.tsx` (dictation session and caveat sheet), `composerState.ts` (model status copy).

```sh
npx vitest run src/ui/chat/composerSlots.test.ts src/ui/chat/composerLayout.test.ts
```

## Layout

```
 [⚡ Quick answer]                          ← mode row (36 tall), or while listening:
 [● Listening 0:07              ✕ Cancel]  ← listening strip, same height (the pill never jumps)
 ╭──────────────────────────────────╮
 │ Ask something            (🎤) (↑) │    ← pill 52 (1 line), s1, hairline / focus border
 ╰──────────────────────────────────╯
```

- Pill: 52 pt for one line, 18 pt leading padding, text bottom-anchored. It grows one line at a time up to
  5 lines, then the text scrolls. The height animates with the DS `layout` role.
- Buttons: `controlSm` 36 pt discs inside the pill, 8 pt from its end. Their touch area is 44/48 via
  hitSlop. They are anchored to the pill's bottom, so their centre stays on the last line's centre.
- The text's end padding reserves room for 1 or 2 discs (`composerPadEnd`): 52, or 96 with mic + send.

Numbers (Prism acceptance, **kept**): 1 line = 52, 3 lines = 92, 5 lines = 132, and the 6th line scrolls.
The send disc's vertical delta while growing is 0. What changed: the disc is 36 inside the pill, not 52
beside it, so it sits 8 pt from the pill's bottom (was 0 from the row's bottom). At text scale 1.3 it rises
to 11 pt, to stay on the last line's centre.

## States

| State | Row above | Pill | Trailing slot |
|---|---|---|---|
| Empty, voice on | mode chip | placeholder | mic (plain) |
| Empty, voice off | mode chip | placeholder | send, muted (raised disc, disabled, hint "Type a question first") |
| Typing / multiline | mode chip | grows ≤ 5 lines | quiet mic + send (ember) |
| Model loading (asking works) | mode chip | "Type while the model loads" | as above; send works (answer() waits) |
| Before loads start / indexing | mode chip | loading/indexing placeholder | send muted, hint says why |
| Model error | dimmed | dimmed, not editable | dimmed; the error card above is where to act |
| Listening | listening strip (dot, m:ss, Cancel) | focus border, partials stream in, "Speak now…", read-only (a typed edit would be overwritten) | done ✓ (ember) |
| Transcribing end | strip "Transcribing…" | last partial | done, busy, until the final text arrives (≤ 4 s grace) |
| Generating | mode chip | editable (write the next question) | stop (ember ring); no mic |
| Stopping | mode chip | editable | stop, busy |
| Voice error | toast (permission / nothing heard / other) | text as before listening | back to mic/send |
| Offline | no change: answers and voice are on-device | | |

## Interactions

- Mic: starts dictation. What was already typed stays, and the transcript is appended after it.
- Done ✓: stops the recognizer and keeps the text. Cancel ✕ puts back the text from before listening.
- iOS ends dictation by itself after 1.8 s of silence (native). Android ends it at the end of speech.
- Caveat sheet ("audio may go to the provider"): shown only when the recognizer is the system service (Android,
  consent given, reason `system-accepted`). It never shows on iPhone or with Android's on-device recognizer.
  It shows once per app run.
- Mode chip: the label names the current mode (Quick answer, Quick + full, Full answer, Direct answer). Tapping
  it opens a sheet with the same two switches as Settings › Answers, and the mode description updates live and
  is announced. The settings keep their meaning.
- Keyboard: unchanged. `KeyboardAvoidingView automaticOffset` in ChatScreen, return inserts a newline, and
  send is the button.

## Motion

- Slot swaps use the DS crossfade (`Swap`). The quiet mic uses DS enter/exit fades. Pill growth uses `layout`.
  Under reduce motion, growth is instant.
- Recording dot: one fade per elapsed second (`loop.pulse / 2`), no endless loop (chatPerf guard). It is static
  under reduce motion.
- No audio level meter: the native module sends no level events (Android `onRmsChanged` is empty, iOS has no
  tap metering). A level meter would be native work.

## A11y

- Every control is labelled: Voice input, Stop listening (hint "Keeps what was heard"), Cancel (hint "Discards
  what was heard"), Send (hint when muted), Stop answer / Stopping (busy).
- The chip reads "Answers: Quick answer" with the hint "Choose how answers are written".
- Listening and stopping are announced. The strip reads "Listening, 0:07" as one element.
- Visual discs are 36 and touch targets are ≥ 44/48. Text, the pill and the button offset scale with the OS
  text size.

## Haptics

A light impact comes from IconButton on every button, and a selection tick from Chip and the ListRow switches.
There are no extra haptics.
