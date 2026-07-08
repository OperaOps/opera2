# Clinical Visuals — dental procedure clip library (v3)

One flat folder. Every clip is a short `.mp4` distinguished **only by its filename**, so you always know which procedure and scene it belongs to. Built to the same production standard as the Truveta / Orthodontic v3 guide: a staged **Establishing → Prep/Isolate → Zoom-in → Macro beats → Reveal** spine, reusable style prefixes, consistency tokens, and a shared negative prompt.

> Dental only for now (13 procedures, 92 clips). Ortho lives in the separate ortho v3 guide.

## Naming

```
dental_{treatment}_{slug}.mp4
```

- `treatment` — the portal key: `crown`, `filling`, `root_canal`, `implant`, `extraction`, `bridge`, `veneers`, `whitening`, `gum_treatment`, `dentures`, `full_mouth_rehab`, `inlay_onlay`, `sleep_apnea`
- `slug` — the scene beat: `establishing`, `isolate`, `zoom`, `remove-decay`, `reveal`, … (varies per procedure)

Examples: `dental_filling_remove-decay.mp4`, `dental_implant_osteotomy-drill.mp4`, `dental_veneers_reveal-smile.mp4`

## Files in this folder

| File | What it is |
|------|-----------|
| `DENTAL_SCRIPTS.md` | The storyboard / production doc. Per procedure: clinical guardrails, setting & equipment, then every scene with its shorthand prompt, **narration** line, and **motion/SFX** note. Read this first. |
| `PROMPTS.md` | Flat, copy-paste sheet — the **fully expanded** generation prompt for all 92 clips (style block + action + token + negative). Paste straight into Veo 3.1 / Sora 2 Pro. |
| `manifest.json` | The database index — `clips[]` with `file`, `treatment`, `scene`, `durationSeconds`, `styleTag`, `narration`, `motion`, `prompt`; plus `reusableBlocks` (the style/token/negative strings). |
| `build.mjs` + `groups/*.mjs` | Single source of truth. Edit the procedure data in `groups/`, then `node build.mjs` to regenerate all three docs above. |
| `*.mp4` | Drop your generated clips here, named per the convention above. |

## Pipeline

ElevenLabs Image & Video (generate clips) → ElevenCreative Studio (voice + SFX) → Remotion (brand composite). Every scene targets a single 6–8s generation; chain them per procedure in Remotion. Never span room-wide to tooth-macro in one clip.

## Dental vs Ortho — what changed

- Restorative work uses **rubber-dam isolation**, not a cheek retractor.
- The negative prompt **allows** controlled water-cooled handpiece preparation, and the pre-treatment condition (decay, staining, inflamed gums, missing teeth) in the beat where it's the thing being treated — the ortho negative banned all of these.
- Added an `[ENV STYLE — SURGICAL]` prefix (sterile field, awake/local) for implant surgery, and an `[EDENTULOUS RIDGE TOKEN]` for dentures.

## Wiring into the renderer

Save clips here, then point `video-renderer/src/lib/dental-video-assets.ts` at them. Map the scene beats onto the renderer's slots (`problem` / `treatment` / `deepDive` / `outcome` accept multiple clips and crossfade):

```ts
const CV = "clinical-visuals";
crown: {
  problem:   [{ src: `${CV}/dental_crown_isolate-and-show-crack.mp4`, durationSeconds: 7 }],
  treatment: [
    { src: `${CV}/dental_crown_reduce-prepare.mp4`, durationSeconds: 8 },
    { src: `${CV}/dental_crown_cement-crown.mp4`,   durationSeconds: 8 },
  ],
  deepDive:  [{ src: `${CV}/dental_crown_digital-scan.mp4`, durationSeconds: 7 }],
  outcome:   [{ src: `${CV}/dental_crown_reveal.mp4`,       durationSeconds: 7 }],
},
```

Durations are in `manifest.json` (`durationSeconds`). Clips resolve via Remotion `staticFile()` — keep them local, not S3.
