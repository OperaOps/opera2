# Opera × Truveta — Patient Education Video Format Rules

The canonical spec for every personalized patient-education video in this app. Follow it
for every new video so the format is always polished, consistent, and nothing overlaps.

---

## 1. Clip generation (ElevenLabs video)

- **Length:** 8 seconds, one **continuous single shot** per clip. No multi-scene montages.
- **Aspect:** 16:9 widescreen.
- **Look:** realistic, premium medical-education style. Real anatomy/tissue is fine and
  encouraged for internal/clinical shots — it should look like a real medical explainer,
  not abstract icons or cartoons.
- **Brand:** deep navy backgrounds, **teal/cyan only as light accents / highlight rings** —
  never recolor real tissue teal. Leave calm negative space at the **top and bottom** of
  every frame for the subtitle.
- **Arc, not overlap:** each clip owns one distinct beat and states where it starts/ends and
  what it does NOT show, so adjacent clips never repeat content. Order the clips as a story
  (e.g. *where → tool → enter → inside → find → treat → calm/close*).
- **Loop-friendly:** slow, continuous motion that starts and ends on a similar frame, so an
  8s clip can loop under a longer narration beat without a jarring cut.
- **Readable text only:** prefer no baked-in words, but where text *does* belong in the shot
  (a day label, a device screen, a sign), keep it SHORT (1–3 words), correctly spelled, and
  sharply legible — never long paragraphs or fake gibberish (the model garbles those). No
  logos, no readable PHI. The narration subtitle is always added by the app on top.

## 2. Files & wiring

- Save clips to `public/medical-assets/<folder>/<recommendedFileName>.mp4`
  (folders mapped in `assetFolderByUseCase`, e.g. `colon-screening`, `diabetes-a1c`).
- Register each clip in `lib/medicalAssetManifest.ts` (`assetId → public path`).
- Each clip's slot lives in `lib/treatmentVisualAssetPlan.ts` with a **`voiceover`** line.
- Only clips registered in the manifest play — un-generated slots are skipped in the video
  (they still show as polished prompt cards on the `/asset-slots` production page).

## 3. On-screen rules (the part that must always look clean)

- **Nothing is drawn on top of a playing clip** — no callout labels, no highlight pins, no
  "real-world / personalized" chips, no patient-personalization bubble, no scene counter.
  The visual plays clean. (Only a soft bottom scrim for subtitle legibility.)
- **Subtitles:** exactly **one short line at the bottom, centered**, never wrapping to two
  lines. Long narration is split into ~48-character chunks (`splitCaption`) and revealed one
  line at a time, advanced by scene progress so it **stays in sync with the audio**.
- **No badges, no disclaimer footer, no compliance chrome** on the player.

## 4. Audio = subtitles

- Each scene's **`voiceover`** (treatment) or **`narration`** (UI scene) is BOTH the spoken
  line and the subtitle text — they are always identical, so audio and captions match.
- Voice: ElevenLabs (`/api/tts`, key in `.env.local`), cached to `public/audio/tts-cache/`.
  Browser speech is the automatic fallback when no key is set.
- Scene timing follows the spoken line (~2.3 words/sec); sound advances on narration end.

## 5. Voiceover writing style

- Warm, plain-language, calm. Greet by first name in the opening scene only; sign off warm.
- No decimals or scary numbers. No diagnosis, no "you should," no risk prediction — education
  and reassurance only. Reference the patient's real life (schedule, family) where natural.
- 18–32 words per clip (~7–11s). Each line stands on its own and moves the story forward.

## 6. Sequence & ending

- The video **interleaves** personalized UI scenes with the real clips: intro (UI) → clip →
  UI → clip → … and **ends on a warm, forward-looking clinical beat** — never on a legal/FDA
  disclaimer card. No disclaimer scenes anywhere in the video.

## 7. The app around the videos

- The site is a **tight 1–2 page pitch**, not documentation: an Overview that sells the
  Opera × Truveta partnership + product versatility, and the **Demo Library** grid (the proof).
  Demo detail pages are just the player + a couple of concise highlights. Keep it skimmable.
