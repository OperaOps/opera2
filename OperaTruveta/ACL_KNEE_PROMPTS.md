# ACL Tear → Knee Rehab — "Understanding Your Recovery Plan" Clip Prompts (ElevenLabs)

Standardized to the canonical spec in [`VIDEO_FORMAT_RULES.md`](VIDEO_FORMAT_RULES.md) and wired in
[`treatmentVisualAssetPlan.ts`](lib/treatmentVisualAssetPlan.ts).

**Use case id:** `acl-recovery`  ·  **Folder:** `public/medical-assets/acl-knee/`  ·  **Patient:** Jake, 27 (synthetic)

## Format (applies to every clip)
- **8 seconds, one continuous single shot.** 16:9. Loop-friendly (start ≈ end frame).
- Anatomy clips (1–4): **clean 3D medical-education animation** on a **deep navy background**,
  teal/cyan ONLY as a highlight ring/glow — tissue and bone stay natural tones.
- Rehab clips (5–8): **photoreal human scenes** in calm, real settings with one subtle teal accent.
- **Calm negative space top + bottom** for the app's subtitle. **No baked-in text, no logos.**
- Voiceover = subtitle (identical). 18–32 words, warm, plain, no decimals. Greet by name in clip 1 only.
- Story arc, no overlap: *where → the tear → the rebuild → the healing → phase 1 → phase 2 → phase 3 → the field.*

## Status (2026-07-11)
Clips 1, 4, 5, 6, 7, 8 are **generated and live** in `public/medical-assets/acl-knee/` and registered
in [`lib/medicalAssetManifest.ts`](lib/medicalAssetManifest.ts). Clips 2 (tear) and 3 (reconstruction)
were **skipped** — their beats are carried by the reworked voiceovers on clips 1 and 4:
- Clip 1 VO now covers *anatomy + the tear + "your surgeon rebuilt it"*.
- Clip 4 VO now covers *the graft placement + the healing*.
If you ever generate 2/3 later, restore the original split voiceovers below and re-add their slots.

---

## Clip 1 — `knee-anatomy-acl.mp4` · *where the ACL lives* (3D)
```
Clean 3D medical-education animation of a human knee joint, a smooth stylized anatomical model floating in soft studio light — femur above, tibia below, the kneecap rendered slightly translucent so the center of the joint stays visible. In the very center, the ACL ligament runs diagonally between the two bones and carries a soft teal highlight glow while every other structure keeps its natural bone-and-tissue color. The camera orbits slowly and smoothly around the knee across the full 8 seconds, ending near its starting angle for a seamless loop. Deep navy background, calm empty space at the top and bottom of the frame for captions. Premium, reassuring patient-education aesthetic. No text, no logos.
```
🔊 *"Hi Jake — this is your knee, and right in the center is the ACL, the ligament that keeps it steady. When you planted and twisted, it tore — so your surgeon rebuilt it."*
> Original (if clips 2–3 exist): *"Hi Jake — let's look at your knee together. Right in the center is the ACL, the small ligament that keeps the joint steady every time you plant, turn, or jump."*

## Clip 2 — `acl-tear-explained.mp4` · *what a tear is* (3D) — SKIPPED
```
Clean 3D medical-education animation of a stylized knee joint model, the camera pushing in very slowly toward the center of the joint. The ACL ligament, marked with a soft teal highlight ring, shows a clear but calm separation in its middle — the two ends visibly apart like a gently frayed rope, presented as a tidy educational model. The knee tilts a few degrees to show the joint has lost its usual steadiness, then settles. One slow continuous push-in across the full 8 seconds, starting and ending on nearly the same framing for a seamless loop. Natural anatomy colors, deep navy background, calm empty space at the top and bottom for captions. Quiet, honest, reassuring medical-illustration style. No text.
```
🔊 *"When you planted and twisted on the field, that ligament tore. An ACL can't stitch itself back together — which is exactly why your surgeon rebuilt it."*

## Clip 3 — `graft-reconstruction.mp4` · *the rebuild* (3D) — SKIPPED
```
Clean 3D medical-education animation of a stylized knee joint model seen from the front, the joint center softly lit. A new ligament graft — a smooth, bright, cord-like band — glides gently into place along the exact diagonal path of the original ACL, its two ends anchoring neatly into small tunnels in the bone above and below. As it seats, a soft teal ring pulses once around the completed graft. One steady camera angle with minimal drift for the full 8 seconds, the ending composition matching the start for a seamless loop. Natural anatomy tones, deep navy background, calm empty space at the top and bottom for captions. Precise, calm, premium medical-illustration style. No text.
```
🔊 *"In surgery, a strong new graft was placed along the exact path of your old ACL, anchored securely into the bone above and below. Your new ligament is in."*

## Clip 4 — `graft-healing.mp4` · *the quiet healing* (3D)
```
Clean 3D medical-education macro animation, the camera gliding very slowly along the new ACL graft inside a stylized knee model. A gentle warm glow travels along the graft as fine, soft strands of new tissue weave into it, showing the body slowly making the graft its own. The motion is quiet and continuous, almost meditative — one slow lateral camera drift across the full 8 seconds, ending close to the starting frame for a seamless loop. Natural tissue tones with a subtle teal rim light only as an accent, deep navy background, calm empty space at the top and bottom for captions. Reassuring, premium patient-education aesthetic. No text.
```
🔊 *"In surgery, a strong new graft was anchored along the exact path of your old ACL. Over the coming months, your body grows into it and makes it living tissue."*
> Original (if clips 2–3 exist): *"Over the next months, your body slowly grows into that graft and makes it living tissue. That quiet healing is why the early phases stay gentle on purpose."*

## Clip 5 — `phase1-gentle-motion.mp4` · *phase 1: calm & move* (photoreal)
```
Cinematic photorealistic scene in a bright, calm physical therapy studio. A man in his late twenties lies back on a padded therapy table while a friendly physical therapist supports his knee with both hands and guides it through one slow, gentle bend and straighten. The movement is smooth, careful, and unhurried — clearly early recovery, completely comfortable. Soft daylight, clean modern equipment softly out of focus, one subtle teal accent in the studio design. One continuous medium shot on a slow, gimbal-smooth push-in, ending near the opening framing for a seamless loop. Calm empty space at the top and bottom of the frame for captions. Warm, encouraging, premium medical-education tone.
```
🔊 *"Phase one is about calming the knee and waking it up — gentle bending, straightening, and easy muscle work. Going slow here is the plan, not a setback."*

## Clip 6 — `phase2-strength.mp4` · *phase 2: rebuild strength* (photoreal)
```
Cinematic photorealistic scene in a modern rehabilitation gym. A man in his late twenties performs a slow, controlled leg press on a clean rehab machine, his physical therapist standing beside him with an encouraging nod. His effort looks steady and confident, each repetition smooth and deliberate — strength work, not strain. Soft natural light, tidy modern equipment, one subtle teal accent color in the space. One continuous medium-wide shot with a very slow lateral dolly, beginning and ending on a similar composition for a seamless loop. Calm empty space at the top and bottom of the frame for captions. Motivating, safe, premium patient-education feel.
```
🔊 *"Phase two rebuilds the muscle around your knee — presses, squats, and balance work. Strong legs are what protect the new ligament while it keeps maturing."*

## Clip 7 — `phase3-return-to-sport.mp4` · *phase 3: back to sport* (photoreal)
```
Cinematic photorealistic scene on an indoor sports court in soft morning light. A man in his late twenties, wearing athletic gear and a small knee sleeve, jogs smoothly through a line of low agility cones — light and controlled — while a physical therapist watches from the side with a stopwatch and an approving expression. The movement reads as confident but measured: athletic training, not competition. One continuous tracking shot gliding alongside him at jogging pace, framed wide with calm empty space at the top and bottom of the frame, ending on a composition close to the start for a seamless loop. A single teal accent color in the cones. Uplifting, premium medical-education tone. No visible logos.
```
🔊 *"Phase three brings the athlete back — jogging first, then cutting and jumping, one milestone at a time. Your care team clears each step when your knee shows it's ready."*

## Clip 8 — `back-on-the-field.mp4` · *the warm close* (photoreal)
```
Cinematic photorealistic scene at golden hour on a green soccer field. A man in his late twenties sits on a bench lacing up his cleats, then rises and walks a few relaxed steps onto the grass, a ball under his arm and a small confident smile as he looks across the open field. Warm low sunlight, soft lens flare, unhurried and hopeful. One continuous slow tracking shot from behind and beside him, ending on him standing tall facing the field, framed with generous calm space at the top and bottom of the frame for captions. No visible team logos or readable text. Warm, resolved, cinematic patient-education closing tone.
```
🔊 *"And that's the road back, Jake — steady phases, each with a purpose. Your surgeon and your therapist will walk every one of them with you, all the way to kickoff."*

---

## If a clip gets blocked by the content filter
- Anatomy clips: add to the front — `clean stylized 3D medical illustration, educational animation, not real footage.`
- Say *knee model* instead of *knee*, *band* instead of *graft*, *tool* instead of any instrument.
- Never add graphic negatives (blood/gore/incision) — naming them is what trips the filter.
- The tear clip (2) is the riskiest: if blocked, drop the word "tore" from the prompt and lean on
  "a calm separation in its middle, like a gently frayed rope, on a stylized educational model."

## Consistency tips
- Generate clips 5–8 with the same character description ("man in his late twenties, short dark hair,
  athletic build, teal-accented training shirt") so the patient reads as the same person across scenes.
- Keep the anatomy model look consistent across clips 1–4 (same stylized knee, same navy backdrop).
