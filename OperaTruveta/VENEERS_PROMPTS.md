# Porcelain Veneers — Flagship Video Clip Prompts (Seedance 2.0, ToS-safe)

Standardized to the **colon demo** format ([`treatmentVisualAssetPlan.ts`](lib/treatmentVisualAssetPlan.ts))
and the canonical spec in [`VIDEO_FORMAT_RULES.md`](VIDEO_FORMAT_RULES.md).

**Model:** Seedance 2.0  ·  **Use case id:** `cosmetic-veneers`  ·  **Folder:** `public/medical-assets/veneers/`

## Why these are written this way (content-filter safety)
Seedance blocked the original Clip 4 because two things trip its filter:
1. **Real-mouth procedure footage** — words like *drill, bur, grind, buffing enamel, mist* read as
   surgery on a human body. → Procedure clips (3–9) are reframed as **clean 3D medical-education
   animation of a rendered tooth model, clearly not a real mouth**. Gentle verbs only
   (*glides, smooths, refines, settles, places*).
2. **Naming graphic things even to forbid them** — *"no blood, no gore, never a stump"* makes the
   filter see those words and can trigger the block. → **All graphic negatives are removed.** We
   steer positively instead (*the tooth stays whole and intact, calm and gentle*).

Bookend smile clips (1, 2, 10) have no procedure, so they stay **photoreal** and won't be blocked.

## Format (applies to every clip)
- **8 seconds, one continuous single shot.** 16:9. Loop-friendly.
- **Deep navy background, cyan/teal ONLY as a UI accent ring / glow** — teeth stay natural ivory,
  never tinted.
- **Calm negative space top + bottom** for the subtitle. Nothing baked on top of the clip.
- Each clip **owns one beat**. Result reads natural and bright, never fake glaring white.
- Voiceover = subtitle (identical). 18–32 words, warm, plain, no decimals. Greet by name in clip 1 only.

---

## Clip 1 — `veneers-smile-overview.mp4` · *the starting smile* (photoreal)
```
Cinematic photorealistic close-up of a relaxed adult smile, the upper front teeth centered in frame. The two front teeth show small visible gaps and a slightly dull, uneven natural shade — real and honest, not exaggerated. The camera pushes in slowly and smoothly on a gimbal, only a few centimeters, ending on almost the same composition for a seamless loop. Soft warm key light, shallow depth of field. A thin cyan highlight ring gently pulses around the front teeth as a clean UI accent, while the teeth and gums stay their natural ivory color, never tinted. Deep navy background, calm empty space above and below the mouth for captions. Mood: warm, honest, documentary.
```
🔊 *"Hi {firstName} — let's walk through your veneers together. These are your front teeth today: small gaps and a little uneven in color. Here's exactly how we'll brighten and even them out."*

## Clip 2 — `veneers-shell-reveal.mp4` · *what a veneer is* (product render)
```
Cinematic product macro of one single wafer-thin porcelain veneer shell, isolated on a deep navy background, floating and slowly rotating in soft studio light. The shell is so thin and translucent that light glows through its edges, curved to a natural tooth shape like a delicate glass petal. A soft cyan rim light catches the thin edge. Shallow depth of field, premium jewelry-commercial look. Slow continuous rotation across the full 8 seconds for a seamless loop. Nothing else in the frame — just the single shell. Calm empty space top and bottom for captions.
```
🔊 *"A veneer is a wafer-thin shell of porcelain — thinner than a fingernail. Light passes right through it, just like natural enamel, so it looks completely real once it's on."*

## Clip 3 — `veneers-shade-and-scan.mp4` · *planning the match* (3D model)
```
Clean 3D medical-education animation of a stylized model of the upper front teeth, clearly a smooth rendered dental model rather than a real mouth, floating in soft studio light. A row of tooth-shade color swatches fans out beside the model to compare tones, then a slim handheld scanner wand glides across the fronts, projecting a soft grid of blue structured light that ripples over each tooth. The camera drifts smoothly sideways following the wand. The teeth are natural ivory; blue appears only inside the scanner beam. Deep navy background, clean studio lighting, calm space top and bottom for captions. Precise, calm, high-tech, Cleveland-Clinic explainer aesthetic.
```
🔊 *"First we match the exact shade and take a quick digital scan — no drills, just light. That's how each veneer is made to fit your teeth precisely and blend in perfectly."*

## Clip 4 — `veneers-minimal-prep.mp4` · *a whisper-thin layer* (3D model — was blocked, now safe)
```
Clean 3D medical-education animation of a single stylized upper front tooth, a smooth rendered dental model floating in soft studio light. A slim, rounded polishing tool glides gently and slowly side to side across only the flat front surface of the tooth, softly refining and smoothing the surface so a thin veneer can rest on it later. The tooth stays full, tall and whole the entire time. A subtle cyan outline highlights the refined front surface. Slow, delicate, precise camera follow. Deep navy background, natural ivory tooth color, calm space for captions. Gentle, meticulous, reassuring, medical-illustration style.
```
🔊 *"We remove only a whisper-thin layer from the very front of the tooth — just enough to make room. Your tooth stays tall and strong underneath the whole time."*

## Clip 5 — `veneers-etch-and-bond.mp4` · *preparing the surface* (3D model)
```
Clean 3D medical-education animation of a single stylized front tooth model, smooth and rendered, floating in soft studio light. A fine applicator brush glazes a thin clear layer across the flat front surface; it settles to a soft matte finish, then a second brush glides on a glossy clear bonding layer that catches the light. Slow, deliberate brush strokes, a gentle macro focus pull on the surface. A faint cyan ring pulses softly around the tooth. Deep navy background, natural ivory tooth color, calm space for captions. Meticulous, quiet, precise, medical-illustration style. No shell placed yet.
```
🔊 *"The front of the tooth is gently prepared so the veneer bonds securely — a quick rinse and a thin layer of adhesive. This is what makes the shell stay strong for years."*

## Clip 6 — `veneers-seat-first.mp4` · *placing the veneers* — TWO OPTIONS

### 6A · Literal single-tooth placement — FRONTAL VIEW, lands on the front face
The camera angle is the whole trick: **straight-on frontal** so the flat front faces point at the
lens, and the veneer approaches **from the front and presses straight back** — it physically cannot
drape over the biting edges like the side-profile version did.
```
Cinematic photorealistic extreme macro, the camera looking straight on at the flat front faces of the upper front teeth — a direct head-on frontal view where the vertical front surfaces face the camera, the gumline running across the top of the frame and the biting edges across the bottom. The two central front teeth are centered; the focus is the LEFT central tooth. A thin, curved porcelain veneer shell — shaped to exactly match the front face of that single tooth, the same rounded outline, about one tooth wide and one tooth tall — is held in fine tweezers and enters from the front, from the camera's side, held vertically and parallel to the tooth's front surface. It moves straight back, directly away from the camera, until it presses flush and flat against the vertical front face of ONLY the LEFT central tooth. It aligns edge to edge: its top edge meets that tooth's gumline, its bottom edge meets that tooth's biting edge, and its two side edges tuck into the natural grooves on either side of that one tooth. It lies flat against the vertical front, gently following the tooth's forward curve, covering that single tooth's face completely and stopping exactly at its outline. It does NOT come down over the top of the tooth, does NOT rest on the biting edge or chewing surface, and does NOT reach onto the neighboring teeth. The moment it seats, that one tooth looks a touch brighter and cleaner — a natural, healthy white, not chalky or artificial — while the tooth beside it keeps its original shade for contrast. Slow, precise forward-to-back press, then the tweezers ease away. Soft cyan rim light on the shell edge only. Deep navy background, calm space for captions.
```
> **Key fix vs your last try:** it was a *side profile*, so the shell laid over the tops. This forces a
> *head-on frontal* angle + a *front-to-back press onto the vertical face*.

### 6B · Whiten one-after-another — NATURAL, not fake
Tuned for a believable result: soft, real enamel white with natural translucency, not a glossy snap.
```
Cinematic photorealistic extreme macro of the upper front teeth filling the frame, starting a plain, slightly uneven natural shade. In a slow, gentle left-to-right progression, the front teeth improve one at a time: the leftmost front tooth softly brightens to a natural, healthy white — a subtle, believable improvement like real porcelain veneers, clean and even with lifelike translucency at the edges, never chalky, never glowing, never a flat fake white — then the next tooth to its right gently does the same, then the next, each tooth in turn becoming a little brighter and smoother and its small gap quietly closing. A faint cyan light-line drifts softly across the arch leading the change from tooth to tooth. By the end, the upper front teeth are evenly bright and natural, healthy and real-looking, with subtle variation and shine like genuine teeth, not a uniform artificial white. Slow, elegant, continuous motion. Deep navy background, calm space for captions. Natural, premium, believable.
```
🔊 *"Now the veneers go on — one tooth at a time. Watch each one turn a little brighter and smoother, closing the gaps as your new smile comes together, tooth by tooth."*

## Clip 7 — `veneers-cure-bond.mp4` · *setting the bond* (3D model)
```
Clean 3D medical-education animation of a single stylized front tooth model that already wears its new veneer. A pen-shaped curing-light wand enters from the side, its round tip glowing bright electric blue, and holds steadily just in front of the tooth, casting a focused cone of blue light onto the veneer. Under the glow the veneer's surface shifts from glossy and wet to firmly set and solid. Clear staged motion across the 8 seconds: the wand enters, the tip glows blue, the light holds on the tooth, then eases back. The blue comes only from the wand's beam; the tooth keeps its natural ivory color. Deep navy background, calm space for captions. Precise, modern, reassuring, medical-illustration style. No new shell is placed.
```
🔊 *"A soft blue light sets the bond in seconds, locking the veneer firmly in place. Once it's cured, it's permanent — strong, sealed, and ready to last."*

## Clip 8 — `veneers-close-the-gaps.mp4` · *the transformation* (3D model)
```
Clean 3D medical-education animation, the camera tracking smoothly across a stylized model of the upper front teeth as, one tooth at a time, each tooth receives its own individual thin veneer — one separate shell per tooth, never a single long strip across several teeth. As each tooth is faced, its gap closes and its shade brightens, and the whole row resolves into one bright, even, natural smile line. Smooth continuous lateral camera glide, a subtle cyan progress line sweeping along the arch as it completes. The teeth stay natural ivory, lifelike and soft, never a glaring fake white. Deep navy background, calm space for captions. Satisfying, elegant, transformative.
```
🔊 *"One by one, the rest go on. Watch the gaps close and the color even out into a single bright, natural line — this is the smile coming together, tooth by tooth."*

## Clip 9 — `veneers-polish-and-margins.mp4` · *the finishing shine* (3D model)
```
Clean 3D medical-education animation of a small soft polishing tip gliding smoothly along the surfaces and edges of the finished veneers on a stylized upper-teeth model, raising a soft natural shine and blending each edge seamlessly at the gumline. Tiny highlights bloom on the polished surface as the tip passes. Slow lateral camera motion, shallow depth of field. Natural warm ivory color, a faint cyan sparkle on the polished surface only; the shine stays soft and natural, not glaring. Deep navy background, calm space for captions. Complete, radiant, satisfying, medical-illustration style.
```
🔊 *"A final polish brings out a soft, natural shine and smooths every edge right at the gumline — so your veneers feel as seamless as they look."*

## Clip 10 — `veneers-finished-smile.mp4` · *the reveal & warm close* (photoreal)
```
Cinematic photorealistic shot easing back from a close macro to a full relaxed smile on a real adult face. The upper front teeth are now capped with seamless veneers — gaps closed, shade bright, even and completely natural. The lips ease into a genuine, happy smile in warm studio light. The camera drifts slowly back and gently rises, ending on the complete smile for a seamless loop. A soft cyan highlight ring gently frames the new smile line as a clean UI accent, while the teeth and gums keep their natural ivory color, never tinted. Deep navy background, calm empty space top and bottom for captions. Warm, uplifting, resolved.
```
🔊 *"And there it is, {firstName} — your new smile: bright, even, and completely your own. Dr. {doctorName} and the whole team can't wait for you to see it in the mirror."*

---

## If a clip still gets blocked
- Add to the front: `clean stylized 3D medical illustration, cartoon-free educational animation, not real footage.`
- Remove any remaining real-world cue (say *dental model* instead of *tooth*, *tool* instead of a named instrument).
- Never re-add graphic negatives (blood/gore/stump) — those words are what trip the filter.

## Notes / options
- **Want 9 clips (to match the colon count)?** Merge **Clip 6 + Clip 7** into `veneers-seat-and-cure.mp4`.
- **Interleave order** (UI scene → clip → UI scene → clip): UI intro → Clip 1 → UI "your goals" →
  Clip 2 → Clip 3 → UI "the plan" → Clip 4 → Clip 5 → Clip 6 → Clip 7 → Clip 8 → UI "almost done" →
  Clip 9 → Clip 10. Never end on a disclaimer.
