# OperaAI Patient Video — Dental Procedure Animation Scripts (v3 · Dental / Restorative)

Vertical: Dental / Restorative · Pipeline: ElevenLabs Image & Video → ElevenCreative Studio (voice + SFX) → Remotion (brand composite).

**Opera Score linkage:** patient education clips drive **Treatment Acceptance** — a patient who *sees* and understands the procedure feels less anxiety and accepts treatment at consult.

**Spine (every procedure):** Establishing wide → Prep / Isolate → Zoom-in transition → Macro action beats → Reveal. Each scene = one 6–8s clip, stitched in Remotion. Never span room-wide to tooth-macro in one clip — chain separate clips.

**Dental vs Ortho differences baked in:** restorative work uses **rubber-dam isolation** (not a cheek retractor); the negative prompt **allows** controlled water-cooled handpiece preparation and the pre-treatment condition (decay, staining, inflamed gums, missing teeth) in the beat where it is the thing being treated.

**Paste convention:** `[ENV STYLE]` = operatory establishing/prep · `[ENV STYLE — SURGICAL]` = sterile surgical field (implant/oral surgery) · `[MACRO STYLE]` = intraoral close-up · `[SMILE TOKEN]`/`[EDENTULOUS RIDGE TOKEN]` = per-patient consistency · `[NEGATIVE]` = on every generation.

> The reusable style blocks, tokens, and negative are defined once in `build.mjs` / `manifest.json` (`reusableBlocks`). In the scenes below, the shorthand tag stands in for the full block. Fully expanded, paste-ready prompts are in `PROMPTS.md`.

---

## 1 · Composite Filling `(filling)`

A small area of decay is gently removed and the tooth is rebuilt with tooth-colored composite resin, then cured and polished. Non-surgical, awake under local anesthesia.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** the tooth is isolated (rubber dam on a small frame or cotton-roll isolation) and kept dry; decay is removed with a small water-cooled dental handpiece bur and/or hand excavator, leaving a clean cavity preparation in healthy tooth structure; the preparation is etched (pale-blue gel), rinsed, and a thin bonding agent applied and light-cured; tooth-colored composite is placed in increments, sculpted to natural cusp/groove anatomy, and each layer set with a blue LED curing light; the restoration is shaped and polished to a seamless, natural finish.
- **MUST NOT:** silver amalgam (unless specified); an open unfilled cavity left at the end; gross over-contour; drilling into the gum or adjacent teeth.
- **Negative tweak:** allow a visible cavity / small area of decay in the problem beat (the condition being treated); allow controlled water-cooled handpiece preparation.

**Setting & equipment**

- **Setting:** General dental operatory; patient awake under local anesthesia.
- **People:** Dentist at the patient's head; assistant with suction.
- **Tray:** Mouth mirror & explorer, rubber dam + frame, high-speed water-cooled handpiece with bur, spoon excavator, 37% phosphoric-acid etch gel, bonding agent + microbrush, shade-matched composite resin, composite instrument, blue LED curing light, polishing disc.

### Scene 1.1 — The small cavity on a back tooth (~8s)  ·  `dental_filling_problem.mp4`

3D medical animation. A smooth cinematic close-up of the lower back teeth inside a clean 3D model of a human mouth, viewed from a slightly raised angle so the flat chewing surfaces of the molars are clearly visible. The shot focuses on one lower molar: in the natural grooves on its chewing surface sits a small, realistic patch of brown tooth decay, about the size of a grain of rice, tucked into the deepest groove — just a small brown spot, not cracks, not a spiderweb, not a broken tooth. The camera slowly and smoothly pushes in toward this small brown spot and keeps it centered. Only the lower back teeth (molars and premolars) and healthy pink gums are in frame — no front teeth in the shot.

**Narration:** This is the tooth we're repairing — a small cavity has formed in the deep grooves on the surface of your back tooth.

**Motion / SFX:** Slow gentle push-in onto the small brown spot; quiet tone, soft musical bed.

### Scene 1.2 — Cleaning out the decay (~8s)  ·  `dental_filling_remove-decay.mp4`

3D medical animation. A close-up of the same lower molar's chewing surface from a slightly raised angle, with the neighboring back teeth and healthy pink gums around it. The clean metal tip of a small dental drill enters smoothly from the top of the frame — only the tip of the tool, held by nothing — and, with a light spray of water, gently cleans the small brown spot of decay out of the grooves, leaving a small, clean, shallow hollow in the top of the tooth. A little water is rinsed away as it works. The tooth stays whole and natural the whole time — only the small decayed spot is removed, no cracks and no big hole.

**Narration:** We gently clean away only the decayed part of the tooth, leaving all the healthy structure behind and making a small, clean space for the filling.

**Motion / SFX:** Drill tip cleans the spot with a light water spray; soft low whir.

### Scene 1.3 — Preparing the surface (~7s)  ·  `dental_filling_etch-bond.mp4`

3D medical animation. A close-up of the same lower molar, now with a small, clean, shallow hollow on its chewing surface, neighboring back teeth and pink gums around it. The clean tip of a small applicator enters from the edge of frame and paints a clear blue gel into and around the hollow; the gel is then rinsed away with a light water spray, leaving just that spot looking slightly matte while the rest of the tooth keeps its natural sheen. Next, a tiny brush paints a thin, clear liquid into the hollow, and a small blue dental light moves in and shines a soft blue glow on it for a couple of seconds to set it. Smooth, clean, and calm throughout.

**Narration:** A special gel and a thin clear coat are placed and set with a quick blue light — this is what makes the filling stick tightly to your tooth.

**Motion / SFX:** Blue gel painted and rinsed, clear coat brushed, soft blue light glow.

### Scene 1.4 — Filling the tooth back in (~8s)  ·  `dental_filling_place-cure.mp4`

3D medical animation. A close-up of the same lower molar with the small clean hollow on its chewing surface. The clean tip of a small dental tool gently presses soft, tooth-colored filling material into the hollow, a little at a time, shaping it to rebuild the natural bumps and grooves of the chewing surface so it matches the healthy teeth around it. After each bit is added, a small blue dental light moves in and shines a soft blue glow to harden it. The hollow slowly fills in, layer by layer, until the top of the tooth is whole, smooth, and natural again, the same shape as a normal healthy molar.

**Narration:** Tooth-colored filling material is added in thin layers, each one shaped to rebuild your tooth's natural surface and hardened with a quick blue light.

**Motion / SFX:** Filling pressed and shaped, blue light hardens each layer; soft taps.

### Scene 1.5 — Polished and finished (~7s)  ·  `dental_filling_finish-reveal.mp4`

3D medical animation. A close-up of the same lower molar, now fully filled in and whole again. The soft rounded tip of a small polishing tool gently buffs the chewing surface to a smooth, natural sheen that matches the surrounding teeth, the brown decay completely gone. The camera then slowly and smoothly pulls back to show the finished molar sitting naturally in the row of clean, healthy lower back teeth with soft pink gums around them. Everything looks clean, healthy, and natural. Calm and polished throughout.

**Narration:** Finally we polish it smooth so it blends right in — the tooth is fully repaired, natural-looking, and ready to use right away.

**Motion / SFX:** Polishing buffs the surface, slow pull-back to the healthy row; gentle uplifting tone.

---

## 2 · Porcelain Crown `(crown)`

A badly cracked or heavily filled tooth is gently reshaped into a smaller core and capped with a custom porcelain or zirconia crown that restores its full strength and natural look. Non-surgical, awake under local anesthesia.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** numb and isolate the tooth before any preparation; reduce and shape the tooth into a smaller tapered core with a water-cooled handpiece; capture a digital intraoral scan with a glowing wand and a generic 3D model on the screen; seat and cement a lifelike tooth-colored crown flush at the gumline; check the bite and margins after seating.
- **MUST NOT:** show the crown floating or unseated above the tooth; show a metal or silver crown; make the crown wider than the natural tooth; drill into or damage the gum tissue.
- **Negative tweak:** controlled water-cooled handpiece prep and fine tooth reduction are expected and clinically normal

**Setting & equipment**

- **Setting:** calm modern dental operatory, patient awake under local anesthesia
- **People:** masked loupe-wearing dentist at the patient's head, assistant opposite with slim suction
- **Tray:** mouth mirror, high-speed water-cooled handpiece, retraction cord, intraoral scanning wand, try-in porcelain crown, resin cement syringe, articulating paper

### Scene 2.1 — Establishing wide (~7s)  ·  `dental_crown_establishing.mp4`

[ENV STYLE] Wide shot of a calm modern dental operatory bathed in soft daylight. The patient reclines awake and relaxed under a focused overhead light while the masked, loupe-wearing dentist settles at the patient's head and the assistant sits opposite holding a slim suction tip. On the bracket tray, neatly arranged: a mouth mirror, a water-cooled high-speed handpiece, a slim intraoral scanning wand, a lifelike tooth-colored porcelain crown resting in its case, and a small syringe of resin cement. The mood is quiet and unhurried, everything in its place. Motion: a slow, smooth push-in from the wide room toward the patient's mouth and the tray. Serene, precise, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** A crown is a custom cap that rebuilds a cracked or worn tooth back to full strength. You'll relax in the chair while we gently reshape the tooth and fit a lifelike porcelain crown over it.

**Motion / SFX:** Slow push-in; quiet room tone, soft instrument clink.

### Scene 2.2 — Isolate and show crack (~7s)  ·  `dental_crown_isolate-and-show-crack.mp4`

[ENV STYLE] Closer shot over the dentist's shoulder into the open mouth, warmly lit by the overhead lamp. The assistant's suction keeps the field clean and dry as the dentist places a thin retraction cord at the gumline of a single back tooth. That tooth is visibly compromised, a fine dark crack line running across a large old filling, the surface worn and dull compared to its healthy neighbors. The dentist taps the mirror gently beside it, framing the problem before any preparation begins. Motion: a smooth settle-in toward the isolated tooth as the retraction cord seats. Focused, careful, clinical calm. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** First we numb the area completely and gently ease the gum back. You can see the crack running through this tooth, which is exactly why it needs a crown.

**Motion / SFX:** Gentle settle-in; low suction hum, soft mirror tap.

### Scene 2.3 — Zoom transition (~6s)  ·  `dental_crown_zoom.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the cracked back tooth, past the retracted gum and glistening enamel, and resolves into a clean wet intraoral macro of a single molar with a dark fracture line crossing a worn old filling, isolated and softly backlit. Motion: a fast, smooth accelerating push-in that dives from mouth scale to tooth scale in one continuous move. Seamless, immersive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** Fast accelerating push-in; rising musical swell.

### Scene 2.4 — Reduce and prepare core (~8s)  ·  `dental_crown_reduce-prepare.mp4`

[MACRO STYLE] Extreme intraoral macro at tooth scale, people-free, the isolated molar filling the frame under bright wet key light. A slim water-cooled handpiece traces the outer surfaces of the tooth, a fine mist of cooling water flashing at the bur tip as the cracked outer shell is smoothly reshaped into a smaller, gently tapered core with rounded edges. The dark fracture disappears as the compromised enamel is refined away, leaving a clean prepared stump that sits just above the gumline, its margins crisp and even. No blood, no mess, only controlled precision. Motion: slow orbit around the tooth following the handpiece as the core takes shape. Meticulous, clinical, quietly satisfying. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Now we carefully reshape the tooth into a smaller, rounded core so the new crown has a strong foundation to fit over.

**Motion / SFX:** Slow orbit tracking the handpiece; soft water-cooled handpiece whir.

### Scene 2.5 — Digital intraoral scan (~7s)  ·  `dental_crown_digital-scan.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, the prepared tapered core glistening at center. A slim intraoral scanning wand glides slowly over the tooth, emitting a soft structured blue-white light that sweeps across the enamel, capturing its exact shape without contact. Beside the tooth, a soft-focus screen shows a clean generic 3D model of the prepared tooth building up point by point as the wand passes, glowing gently. The light is optical, not radiation, cool and precise. Motion: the wand tracks steadily across the core while the 3D model assembles in the background blur. High-tech, calm, exact. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Instead of a messy impression, a small wand simply scans the tooth with light, building a precise 3D model to craft your crown.

**Motion / SFX:** Steady lateral wand glide; faint electronic scan tone.

### Scene 2.6 — Seat and cement crown (~8s)  ·  `dental_crown_cement-crown.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, the prepared core centered and dry. A lifelike tooth-colored porcelain crown, matched in shade and translucency to the neighboring teeth, descends precisely onto the core, its inner surface coated with a thin film of resin cement. It seats fully and flush, the margin meeting the gumline in a clean continuous line with no gap and no overhang, sitting exactly as wide as the natural tooth. A slim tip traces the edge to sweep away a faint bead of excess cement. Motion: the crown lowers and seats home in one smooth confident move, then a slow close-in on the flush margin. Definitive, clean, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Your custom crown is bonded firmly into place, seating flush right at the gumline so it feels and works just like a natural tooth.

**Motion / SFX:** Vertical seat-and-settle then close-in; soft click and light suction.

### Scene 2.7 — Bite check reveal (~7s)  ·  `dental_crown_reveal.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, the newly seated crown gleaming in place among its neighbors, matched in color and contour so it blends invisibly. A strip of articulating paper passes between the teeth as the bite closes gently, leaving faint even contact marks that confirm a balanced fit, then withdraws. The isolation lifts and the tooth sits natural and strong, its margins crisp at the gumline, the earlier crack gone entirely. Motion: a slow drift-back and gentle rotation revealing the finished crown blending into the arch. Complete, polished, quietly triumphant. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** We check the bite to make sure everything meets evenly, and your rebuilt tooth is ready, strong, natural, and good as new.

**Motion / SFX:** Slow drift-back with gentle rotation; soft paper snap, calm resolve tone.

---

## 3 · Root Canal Therapy `(root_canal)`

The infected, inflamed soft pulp inside a tooth is gently removed, the tiny canals cleaned, shaped, and sealed — saving the natural tooth instead of losing it.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** rubber-dam isolation over the numb tooth; cutaway revealing inner pulp chamber and canals with a soft red inflamed glow; small access opening made through the crown with a handpiece; fine flexible files cleaning and shaping canals with gentle irrigation, red glow fading to calm; canals filled with warm tooth-colored gutta-percha and sealer; access sealed, tooth saved, note a crown often follows.
- **MUST NOT:** gore or blood beyond a soft anatomical glow; pulling or extracting the tooth; files floating outside the canals; general anesthesia.
- **Negative tweak:** no blood pooling, no extracted tooth, no floating instruments, no on-screen text

**Setting & equipment**

- **Setting:** calm dental operatory, patient awake under local anesthesia
- **People:** masked dentist and assistant
- **Tray:** rubber dam clamp and frame, low-speed handpiece, fine endodontic files, irrigation syringe, gutta-percha points, sealer

### Scene 3.1 — Establishing (~6s)  ·  `dental_root_canal_establishing.mp4`

[ENV STYLE] A calm, softly lit dental operatory. A relaxed patient reclines in the chair, awake and comfortable, while a masked dentist and assistant lean in with quiet focus over the lower jaw. Warm overhead light pools on the open mouth; gloved hands rest steady near a molar that aches deep inside. The mood is reassuring and unhurried, the room quiet except for soft instrument sounds. Everything reads clean, controlled, and gentle, framing the tooth we are about to save. Motion: a slow, smooth push-in from the room toward the patient's mouth as the dentist settles into position; ambient operatory hum and a soft suction whisper. Calm, trustworthy, clinical. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Today we're going to save this tooth from the inside — no need to remove it.

**Motion / SFX:** slow smooth push-in from room toward the mouth; ambient operatory hum and soft suction whisper.

### Scene 3.2 — Isolate (~7s)  ·  `dental_root_canal_isolate.mp4`

[ENV STYLE] Close in the operatory, the dentist stretches a thin rubber dam over the numb molar and clips it in place with a small clamp, isolating just this tooth in a clean, dry, protected window. The surrounding gums and neighboring teeth disappear beneath the soft blue-green sheet, leaving only the target tooth exposed and spotlit under the operatory light. Gloved fingertips smooth the dam flat; the field looks tidy and sealed, ready for careful work. The patient rests quietly, fully numb and calm. Motion: a gentle tilt-down as the rubber dam is set and the clamp snaps softly into place, the frame settling; light rubber snap and quiet breathing. Precise, clean, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** First we place a soft shield around the tooth, keeping it clean and dry while you rest.

**Motion / SFX:** gentle tilt-down as the dam is set and clamp seats; light rubber snap and quiet breathing.

### Scene 3.3 — Zoom into cross-section (~6s)  ·  `dental_root_canal_zoom-crosssection.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the isolated molar's crown, sliding past the wet enamel and dentin until the outer tooth turns translucent, and resolves into a clean cutaway cross-section of the tooth revealing the hollow pulp chamber and slender root canals branching down into the jaw. Motion: a fast, smooth accelerating push-in that dives through the crown as the enamel fades to a glassy cross-section, the inner canals coming into focus. Seamless, immersive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** fast smooth accelerating push-in through the crown into a cross-section; soft musical swell.

### Scene 3.4 — Problem — inflamed pulp (~7s)  ·  `dental_root_canal_problem-inflamed-pulp.mp4`

[MACRO STYLE] Extreme cutaway cross-section at tooth scale, people-free, the enamel and dentin rendered as glassy translucent layers. Deep inside the pulp chamber and down the narrow root canals, a soft red glow pulses gently — the inflamed, irritated pulp that is the true source of the ache. Fine nerve and vessel threads shimmer faintly within the warm glow, tracing the canals into the roots. The anatomy is precise and calm, never bloody, the red reading as an inner light rather than a wound. Motion: a slow orbit around the cross-section as the red glow softly pulses in time with a faint heartbeat; a low warm tone and quiet pulse. Intimate, anatomical, revealing. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** The pain comes from deep inside, where the tiny nerve inside the tooth has become inflamed.

**Motion / SFX:** slow orbit around the cross-section as the red glow softly pulses; low warm tone and quiet pulse.

### Scene 3.5 — Access opening (~7s)  ·  `dental_root_canal_access-opening.mp4`

[MACRO STYLE] Extreme intraoral macro on the molar's chewing surface, enamel wet and detailed under bright light. A fine dental bur on a water-cooled handpiece gently creates a small, neat access opening straight down through the crown, a thin water spray misting as it works. The opening deepens smoothly until it reaches the hidden pulp chamber below, revealing the soft red glow within through the tiny window. The work is controlled and minimal, taking away only what's needed to reach the canals. Motion: the bur descends in small, steady passes with a light water spray, then eases back as the chamber opens; a soft high handpiece whir and fine water mist. Careful, clinical, precise. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** We make a tiny opening in the top of the tooth to reach the space inside.

**Motion / SFX:** bur descends in steady passes with light water spray, then eases back; soft handpiece whir and water mist.

### Scene 3.6 — Clean and shape canals (~8s)  ·  `dental_root_canal_clean-shape-canals.mp4`

[MACRO STYLE] Extreme cutaway at tooth scale, the pulp chamber now open. Fine, flexible endodontic files slide down each narrow root canal in slow, controlled passes, gently cleaning and shaping the walls while a small irrigation stream flushes the canals clear. As the files work, the soft red inflamed glow deep in the roots fades and cools to a calm, healthy tone. The files stay perfectly inside the canals, tracing their curves; the field looks tidy, wet, and increasingly settled. Motion: the files move in smooth in-and-out passes down the canals with a gentle irrigation flow, the red glow dimming to calm as they finish; a faint file whisper and soft liquid rinse. Meticulous, soothing, satisfying. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Gentle instruments clean out the inflamed tissue and rinse the canals until everything is calm and clear.

**Motion / SFX:** files move in smooth passes down the canals with gentle irrigation, red glow dimming; faint file whisper and soft rinse.

### Scene 3.7 — Fill with gutta-percha (~7s)  ·  `dental_root_canal_fill-gutta-percha.mp4`

[MACRO STYLE] Extreme cutaway at tooth scale, the cleaned canals now smooth and calm. Warm, tooth-colored gutta-percha points are eased down into each canal and gently compacted, filling the roots completely along with a thin coat of sealer, leaving no empty space. The filled canals take on a solid, sealed, seamless look from the root tips up into the chamber, the tooth's inner architecture fully restored. Motion: the gutta-percha slides smoothly into the canals and is softly compacted, the filled roots glowing warm and settled; a soft muffled press and quiet warmth. Restorative, clean, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Then we fill the cleaned canals with a soft, tooth-colored material that seals them completely.

**Motion / SFX:** gutta-percha slides into the canals and is softly compacted; soft muffled press and quiet warmth.

### Scene 3.8 — Reveal — sealed tooth (~8s)  ·  `dental_root_canal_reveal-sealed-tooth.mp4`

[MACRO STYLE] Extreme intraoral macro pulling back from the molar, the small access opening now filled and smoothed flush with a tidy restoration on the chewing surface. The tooth sits clean, dry, and whole, no longer glowing red inside — calm, sealed, and saved in its place among healthy neighbors. A faint translucent ghost of the filled canals lingers for a beat beneath the surface, then the view settles on the finished, comfortable tooth. Motion: a smooth pull-back and slow settle as the sealed access catches the light and the inner glow stays calm; a gentle resolving chime and quiet room tone. Complete, relieved, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Your natural tooth is saved and comfortable again — and we'll often add a crown to protect it for the long run.

**Motion / SFX:** smooth pull-back and slow settle as the sealed access catches the light; gentle resolving chime and quiet room tone.

---

## 4 · Dental Implant `(implant)`

A small titanium post is placed into the jawbone to replace a missing tooth's root, then topped with a lifelike crown — a strong, permanent replacement done while you're awake and numb.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** a clean gap where a tooth is missing in the problem beat; sterile surgical field with pale-blue drapes, patient awake under local; a precise pilot osteotomy drilled into the jawbone at controlled speed with irrigation; a titanium implant fixture threaded into the bone, shown in a clean bone cutaway seated in bone; a healing abutment or cover placed; a macro cutaway of the implant osseointegrated with surrounding bone; a lifelike crown attached onto the abutment seating flush at the gumline.
- **MUST NOT:** general anesthesia, an OR, or a breathing tube; the implant sitting in the gum only rather than in bone; a hospital operating room; gore or blood.
- **Negative tweak:** no operating room, no breathing tube, no implant floating in gum, no blood, no on-screen text

**Setting & equipment**

- **Setting:** sterile surgical field within the dental operatory, patient awake under local anesthesia
- **People:** gowned, gloved oral surgeon and assistant, pale-blue sterile drapes
- **Tray:** surgical drill and irrigation, pilot and shaping drills, titanium implant fixture, driver, healing abutment, final crown

### Scene 4.1 — Establishing (~6s)  ·  `dental_implant_establishing.mp4`

[ENV STYLE — SURGICAL] A calm, sterile surgical field within the dental operatory, framed by clean pale-blue drapes around the patient's mouth. A gowned, gloved oral surgeon and assistant work with quiet precision under a focused overhead light, the patient awake and comfortable under local anesthesia. Everything reads clean, orderly, and controlled — sterile tray gleaming, drapes crisp — with none of the alarm of a hospital, just a composed dental procedure about to begin. Motion: a slow, smooth push-in from the draped field toward the mouth as the surgeon settles into position; soft ambient hum and a gentle instrument clink. Sterile, calm, precise. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** We're going to replace your missing tooth with a strong titanium root — and you'll be awake and comfortably numb throughout.

**Motion / SFX:** slow smooth push-in from the draped field toward the mouth; soft ambient hum and gentle instrument clink.

### Scene 4.2 — Show gap and surgical prep (~7s)  ·  `dental_implant_show-gap-surgical-prep.mp4`

[ENV STYLE — SURGICAL] Closer within the sterile field, the pale-blue drape frames the open mouth and reveals a clean, empty gap where a tooth is missing, healthy teeth standing on either side of the space. The gowned surgeon gently preps the site with gloved hands, the gum smooth and the area clearly identified under bright light, everything sterile and calm. The empty ridge sits ready, quiet and controlled, no distress in the scene. Motion: a gentle tilt and slow zoom onto the empty gap as the surgeon retracts the drape edge and light settles on the ridge; quiet breathing and a soft suction whisper. Focused, sterile, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Here's the space left by your missing tooth — and this is where the new root will go.

**Motion / SFX:** gentle tilt and slow zoom onto the empty gap as the site is prepped; quiet breathing and soft suction whisper.

### Scene 4.3 — Zoom (~6s)  ·  `dental_implant_zoom.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the empty gap in the gumline, sliding past the sterile drape and soft tissue until the gum turns translucent, and resolves into a clean wet macro cutaway of the jawbone beneath the ridge, dense and healthy, ready to receive the implant. Motion: a fast, smooth accelerating push-in that dives through the gum into a bone cross-section as the tissue fades to reveal the jawbone in crisp focus. Seamless, immersive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** fast smooth accelerating push-in through the gum into a bone cutaway; soft musical swell.

### Scene 4.4 — Osteotomy drill (~8s)  ·  `dental_implant_osteotomy-drill.mp4`

[MACRO STYLE] Extreme cutaway at bone scale, people-free, the jawbone rendered dense and detailed beneath the gum ridge. A precise pilot drill turns at a slow, controlled speed and creates a clean, narrow channel straight down into the healthy bone, a fine irrigation stream misting and cooling as it works. The osteotomy deepens smoothly and evenly, the walls neat, the bone shavings gently flushed clear, the whole action measured and exact. Motion: the drill descends in slow, controlled passes with a steady irrigation spray, then eases back to reveal a clean channel in the bone; a soft low drill whir and gentle water flow. Precise, clinical, deliberate. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** First we prepare a small, precise channel in your jawbone, cooled gently with water the whole way.

**Motion / SFX:** drill descends in slow controlled passes with steady irrigation, then eases back; soft low drill whir and gentle water flow.

### Scene 4.5 — Place implant (~8s)  ·  `dental_implant_place-implant.mp4`

[MACRO STYLE] Extreme cutaway at bone scale, the clean channel now prepared in the jawbone. A gleaming titanium implant fixture, its threads sharp and precise, is threaded slowly and steadily down into the bone channel, rotating smoothly until it seats fully within the healthy jawbone. The cutaway clearly shows the implant embedded in bone — not in the gum — snug and stable, the threads gripping the surrounding bone all around. Motion: the titanium fixture rotates and descends in smooth, steady turns until it seats flush and locked in the bone; a soft mechanical hum and a firm settling click. Solid, precise, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Then a small titanium post is gently threaded into the bone, where it becomes a sturdy new root.

**Motion / SFX:** titanium fixture rotates and descends in steady turns until seated in bone; soft mechanical hum and firm settling click.

### Scene 4.6 — Osseointegration detail (~8s)  ·  `dental_implant_osseointegration-detail.mp4`

[MACRO STYLE] Extreme macro cutaway at bone scale, the titanium implant seated deep in the jawbone with a small healing abutment capping its top at the gumline. Over a gentle time-lapse, the surrounding bone knits and grows tightly against the implant's threaded surface, fusing into it — osseointegration — until the fixture and bone become one solid, unified structure. Fine bone texture weaves across the titanium, the bond reading strong, healthy, and permanent. Motion: a slow orbit around the cutaway as the bone visibly grows and locks onto the implant threads in gentle time-lapse; a soft rising tone and quiet organic shimmer. Anatomical, strong, satisfying. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Over the coming weeks your bone naturally grows around the post, locking it in place as a permanent foundation.

**Motion / SFX:** slow orbit around the cutaway as bone grows and locks onto the implant threads in time-lapse; soft rising tone and quiet organic shimmer.

### Scene 4.7 — Attach crown (~7s)  ·  `dental_implant_attach-crown.mp4`

[MACRO STYLE] Extreme intraoral macro at the gumline, the healing abutment now exposed atop the fused implant. A lifelike ceramic crown, shaped and shaded to match the neighboring teeth, is lowered onto the abutment and eased into place, seating flush and snug right at the gum collar. The crown settles into the gap, filling it seamlessly, its surface wet and natural, blending in among its healthy neighbors. Motion: the crown descends smoothly onto the abutment and seats flush with a gentle settle at the gumline; a soft muffled click and quiet finishing tone. Precise, natural, complete. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Once it's fully healed, we top the post with a custom crown made to match your other teeth.

**Motion / SFX:** crown descends smoothly onto the abutment and seats flush at the gumline; soft muffled click and quiet finishing tone.

### Scene 4.8 — Reveal (~8s)  ·  `dental_implant_reveal.mp4`

[MACRO STYLE] Extreme intraoral macro pulling back from the finished implant crown, now filling the once-empty gap perfectly and sitting flush and natural among the healthy teeth. The new tooth gleams wet and lifelike, indistinguishable from its neighbors, the gumline tidy around its base. For a beat, a faint translucent ghost shows the titanium root anchored in bone beneath the crown, then the view settles on the complete, natural-looking smile. Motion: a smooth pull-back and slow settle as the finished crown catches the light and the ghosted implant beneath fades away; a gentle resolving chime and quiet room tone. Complete, confident, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** The result is a strong, natural-looking tooth that functions just like the one you lost.

**Motion / SFX:** smooth pull-back and slow settle as the finished crown catches the light and the ghosted root fades; gentle resolving chime and quiet room tone.

---

## 5 · Tooth Extraction `(extraction)`

A tooth that can no longer be saved is gently loosened and eased out of its socket in one calm, controlled motion — done while you're comfortably numb and awake.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** patient numb and awake under local anesthesia; a visibly damaged, non-restorable tooth in the problem beat; a dental elevator gently loosening and luxating the tooth in its socket; forceps grasping and easing the tooth out in one calm controlled motion; a clean healthy socket with gauze and a note about replacement options.
- **MUST NOT:** gore, blood pooling, ripping, or cracking violence; general anesthesia; impacted-surgical bone-drilling depiction; any sense of force or trauma.
- **Negative tweak:** no blood, no cracking, no drilling into bone, no surgical field, no on-screen text

**Setting & equipment**

- **Setting:** calm dental operatory, patient awake under local anesthesia
- **People:** masked dentist and assistant
- **Tray:** dental elevator, extraction forceps, gauze, suction tip

### Scene 5.1 — Establishing (~6s)  ·  `dental_extraction_establishing.mp4`

[ENV STYLE] A calm, warmly lit dental operatory. A relaxed patient reclines comfortably in the chair, awake and at ease, as a masked dentist and assistant settle in over the open mouth with quiet, gentle focus. Soft overhead light falls on the lower jaw where one tooth needs to come out; gloved hands rest steady, unhurried. The atmosphere is soothing and controlled, nothing tense, everything set up for a smooth, gentle procedure. Motion: a slow, smooth push-in from the room toward the patient's mouth as the dentist leans in and the assistant readies the tray; soft ambient operatory hum and quiet suction. Calm, reassuring, unhurried. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** This tooth can't be saved, so today we'll remove it gently — and you'll be fully numb and comfortable the whole time.

**Motion / SFX:** slow smooth push-in from the room toward the mouth; soft ambient hum and quiet suction.

### Scene 5.2 — Numb and show tooth (~7s)  ·  `dental_extraction_numb-show-tooth.mp4`

[ENV STYLE] Closer in the operatory, the dentist gently checks the numb area around a single lower tooth that is visibly damaged — cracked and worn beyond repair, discolored and no longer restorable — while the patient rests calmly. Gloved fingertips ease the cheek aside so the light falls fully on the failing tooth, its neighbors healthy and intact around it. The field is clean and dry, the mood quiet and reassuring as the tooth is clearly identified. Motion: a gentle tilt and slow zoom onto the damaged tooth as the cheek is retracted and the light settles on it; quiet breathing and a soft suction whisper. Focused, calm, clear. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Here's the tooth that's beyond repair — and everything around it is already comfortably numb.

**Motion / SFX:** gentle tilt and slow zoom onto the damaged tooth as the cheek is retracted; quiet breathing and soft suction whisper.

### Scene 5.3 — Zoom (~6s)  ·  `dental_extraction_zoom.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the damaged lower tooth, sliding past the cheek and gumline until the surrounding mouth softens away, and resolves into a clean wet intraoral macro of the single tooth seated snugly in its socket, the gum collar hugging its base. Motion: a fast, smooth accelerating push-in that dives toward the tooth as the wider mouth blurs and the socket comes into crisp focus. Seamless, immersive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** fast smooth accelerating push-in toward the tooth as the mouth blurs; soft musical swell.

### Scene 5.4 — Loosen with elevator (~7s)  ·  `dental_extraction_loosen-elevator.mp4`

[MACRO STYLE] Extreme intraoral macro centered on the damaged tooth seated in its socket, gum wet and detailed. A slim dental elevator slides gently between the tooth and the socket wall and rocks with slow, controlled pressure, easing the tooth loose in tiny increments as the fibers holding it release. The tooth begins to move ever so slightly, still fully in place, the motion smooth and patient, never forced or violent. The field stays clean and calm, no blood, just gentle loosening. Motion: the elevator works in small, steady rocking passes as the tooth gradually loosens in its socket; a soft muffled creak and quiet pressure. Gentle, controlled, patient. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** We use a small tool to gently loosen the tooth in its socket — slow and steady, no force needed.

**Motion / SFX:** elevator works in small steady rocking passes as the tooth loosens; soft muffled creak and quiet pressure.

### Scene 5.5 — Remove with forceps (~7s)  ·  `dental_extraction_remove-forceps.mp4`

[MACRO STYLE] Extreme intraoral macro as smooth extraction forceps grasp the now-loosened tooth and, in one calm, continuous motion, ease it straight up and out of its socket. The tooth lifts free cleanly and unhurried, the movement fluid and controlled with no snapping or cracking, leaving the socket open below. The whole action reads gentle and complete, the tooth glinting wet as it clears the gumline. Motion: the forceps rotate and lift in a single smooth, continuous arc as the tooth eases free of the socket; a soft muffled release and a light clink. Smooth, controlled, complete. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Once it's loose, a gentle grip eases it out in one smooth motion — usually quicker than you'd expect.

**Motion / SFX:** forceps rotate and lift in one smooth arc as the tooth eases free; soft muffled release and light clink.

### Scene 5.6 — Reveal — clean socket (~8s)  ·  `dental_extraction_reveal-clean-socket.mp4`

[MACRO STYLE] Extreme intraoral macro on the empty socket where the tooth once sat, now clean, calm, and healthy-looking, the gum collar tidy around the opening. A soft square of folded gauze is gently placed over the site to rest and settle, the area quiet and controlled with no blood pooling. The neighboring teeth stand healthy on either side, and a faint ghosted outline of a future replacement tooth hovers softly over the gap for a beat before fading. Motion: a slow pull-back and gentle settle as the gauze is placed and the ghost of a replacement tooth softly appears then fades; a quiet resolving tone and calm room ambience. Clean, reassuring, complete. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** The socket is clean and will heal comfortably — and when you're ready, we can talk about options to fill the space.

**Motion / SFX:** slow pull-back and gentle settle as gauze is placed and a replacement ghost fades in and out; quiet resolving tone and calm ambience.

---

## 6 · Dental Bridge `(bridge)`

A fixed prosthesis fills a gap by capping the two healthy teeth on either side and spanning a replacement tooth (pontic) between them. Non-surgical, awake under local anesthesia.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** a gap flanked by two healthy natural teeth; the two neighboring abutment teeth reshaped with a handpiece; a digital scan or impression of the prepared teeth; a connected 3-unit bridge cemented as one piece with the pontic resting gently on the gumline.
- **MUST NOT:** a dental implant or titanium post in the gap; the pontic pressing into or floating above the gum unnaturally; a removable partial denture.
- **Negative tweak:** controlled water-cooled handpiece prep of the abutment teeth is expected and clinically normal

**Setting & equipment**

- **Setting:** calm modern dental operatory, patient awake under local anesthesia
- **People:** masked dentist at the head, assistant with slim suction
- **Tray:** mouth mirror, water-cooled high-speed handpiece, retraction cord, intraoral scanner wand, connected 3-unit bridge, resin cement syringe, articulating paper

### Scene 6.1 — Establishing wide (~6s)  ·  `dental_bridge_establishing.mp4`

[ENV STYLE] A calm modern dental operatory bathed in soft warm daylight. An awake, relaxed patient reclines in the chair while a masked dentist and assistant lean in with unhurried focus. A tidy instrument tray sits nearby holding a handpiece and a slim intraoral scanner wand. The mood is reassuring and clinical, unhurried and precise, everything clean and softly lit. The dentist angles an overhead light and the patient's mouth opens gently, revealing a bright, healthy smile with one obvious dark gap. Motion: slow cinematic dolly-in toward the patient's mouth; quiet room tone and soft instrument clink. Warm, trustworthy, composed. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** When a single tooth goes missing, the gap can affect how you chew, speak, and smile. A dental bridge fills that space by anchoring to the healthy teeth on either side.

**Motion / SFX:** Slow cinematic dolly-in; quiet room tone and soft instrument clink.

### Scene 6.2 — Show gap and isolate (~7s)  ·  `dental_bridge_show-gap-and-isolate.mp4`

[ENV STYLE] Closer now, the masked dentist gently retracts the patient's lip to reveal a clean gap flanked by two healthy, natural teeth. A thin dab of topical gel is placed, then the area is numbed and a soft cheek retractor isolates the site, keeping the two neighboring teeth dry and clearly visible. The patient stays calm and awake, breathing easily. Light glints off enamel and moist pink gum tissue. Everything looks orderly, gentle, and controlled. Motion: smooth push-in that settles on the isolated gap and its two flanking teeth. Careful, gentle, precise. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** First we numb the area so you stay completely comfortable, then isolate the two healthy teeth beside the gap. These will support your new bridge.

**Motion / SFX:** Smooth push-in settling on the gap; faint suction hiss and calm breathing.

### Scene 6.3 — Zoom transition (~6s)  ·  `dental_bridge_zoom.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the isolated smile, passing the glistening lip and enamel, resolves into a clean wet intraoral macro of a single dark gap flanked by two healthy teeth with moist coral-pink gums. Motion: a fast, smooth accelerating push-in gliding over enamel ridges and into the isolated field. Seamless, immersive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** Fast accelerating push-in; soft musical swell.

### Scene 6.4 — Prepare abutments (~8s)  ·  `dental_bridge_prepare-abutments.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, of the two healthy teeth flanking the empty gap, glossy under a fine wet sheen. A precise dental handpiece with a slim bur glides across each neighboring tooth, gently reshaping and reducing its outer surface into a smooth, tapered abutment ready to receive a crown. A soft mist of water spray cools the enamel, tiny droplets catching the light, and gentle suction clears the field. The prepared teeth take on rounded, even contours. Motion: slow lateral tracking along each tooth as the bur shapes it. Meticulous, clean, tactile. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** We carefully reshape the two neighboring teeth, making room for crowns that will hold your bridge firmly in place.

**Motion / SFX:** Slow lateral tracking along each abutment; handpiece whir and light water spray.

### Scene 6.5 — Digital scan (~7s)  ·  `dental_bridge_scan.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, of the two freshly shaped abutment teeth bracketing the gap, moist and softly reflective. A slim intraoral scanner wand glides just above them, casting a gentle glow of structured light that sweeps across the enamel, capturing every contour with pinpoint precision. Faint shimmering lines trace the surface as the digital impression forms, the teeth and gap mapped cleanly. Everything is calm, dry, and exact, the tissue a healthy coral-pink. Motion: smooth arcing glide of the scanner over the abutments as light ripples across enamel. Precise, high-tech, serene. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** A quick digital scan captures the exact shape of your teeth, so your custom bridge fits perfectly.

**Motion / SFX:** Smooth arcing scanner glide; soft electronic hum and quiet clicks.

### Scene 6.6 — Cement bridge (~8s)  ·  `dental_bridge_cement-bridge.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free. A single connected three-unit bridge, two outer crowns joined to a central replacement tooth, descends as one solid piece toward the prepared site. The two crowns seat smoothly over the shaped abutment teeth while the central pontic settles gently into the gap, its underside resting lightly and naturally against the coral-pink gumline, filling the space seamlessly. A thin film of cement is set and excess is cleared away, leaving crisp, clean margins. The three units gleam as one continuous, lifelike surface. Motion: steady top-down descent as the bridge seats, then a slow settling push-in on the pontic meeting the gum. Satisfying, secure, precise. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Your finished bridge, two crowns and a replacement tooth joined as one, slides into place and is cemented, resting gently right at the gumline.

**Motion / SFX:** Top-down descent then settling push-in on the pontic; soft click and gentle suction.

### Scene 6.7 — Reveal (~7s)  ·  `dental_bridge_reveal.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, of the completed smile where the dark gap once was. Three teeth now stand in seamless harmony, two crowned abutments hugging a lifelike central tooth, all evenly shaped and naturally shaded, moist and softly glossy against firm coral-pink gums. The bridge blends invisibly with the surrounding natural teeth, the gumline smooth and healthy beneath the pontic. Light dances across the restored, continuous arch. Motion: slow celebratory pull-back revealing the full restored span of teeth as light glides over enamel. Bright, whole, confident. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** And just like that, your gap is gone, replaced by a strong, natural-looking bridge you can smile and chew with confidently.

**Motion / SFX:** Slow celebratory pull-back; gentle uplifting tone.

---

## 7 · Porcelain Veneers `(veneers)`

Ultra-thin porcelain shells are bonded to the fronts of the upper front teeth to close small gaps and correct color and shape into a bright, even smile. Non-surgical, awake under local anesthesia.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** show the upper front teeth with small gaps and uneven color in the problem beat; make only a very conservative thin facial enamel prep on the front teeth; include a shade-matching and scan step; bond wafer-thin translucent porcelain veneer shells one by one via etch, adhesive, seat, and cure; close gaps into a bright, even, natural smile line and polish.
- **MUST NOT:** place veneers on molars or back teeth; show thick, bulky, opaque shells; grind the whole tooth down to a stump; produce a fluorescent, fake-white result.
- **Negative tweak:** minimal facial enamel reduction on the front teeth only is expected and clinically normal

**Setting & equipment**

- **Setting:** calm modern dental operatory, patient awake under local anesthesia
- **People:** masked loupe-wearing dentist at the patient's head, assistant opposite with slim suction and cheek retractor
- **Tray:** mouth mirror, fine facial-reduction handpiece, shade guide, intraoral scanning wand, wafer-thin translucent porcelain veneer shells, etchant gel, bonding adhesive, resin cement, blue LED curing light, polishing disc

### Scene 7.1 — Establishing wide (~7s)  ·  `dental_veneers_establishing.mp4`

[ENV STYLE] Wide shot of a calm modern dental operatory in bright, soft light. The patient reclines awake and relaxed under a focused overhead lamp while the masked, loupe-wearing dentist settles at the patient's head and the assistant sits opposite with a slim suction tip and gentle cheek retractor. On the bracket tray, neatly arranged: a mouth mirror, a fine facial-reduction handpiece, a fan of tooth-shade tabs, a slim intraoral scanning wand, a row of wafer-thin translucent porcelain veneer shells, and a slim blue LED curing light. Everything is elegant and unhurried. Motion: a slow, smooth push-in from the wide room toward the patient's mouth and the tray. Serene, precise, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Veneers are ultra-thin porcelain shells that bond to the fronts of your teeth to brighten and even out your smile. You'll relax while we prepare and place them one by one.

**Motion / SFX:** Slow push-in; quiet room tone, soft instrument clink.

### Scene 7.2 — Show front teeth (~7s)  ·  `dental_veneers_prep-front-teeth.mp4`

[ENV STYLE] Closer shot facing the open smile under warm lamplight, a soft cheek retractor holding the lips clear so the upper front teeth are fully visible. Those front teeth show small dark gaps between them and an uneven, slightly dull and mismatched color, some edges a touch chipped or worn. The dentist lifts the shade guide toward them, comparing tabs against the natural enamel while the assistant keeps the field dry. Only the front teeth are framed, the molars out of view. Motion: a smooth settle-in across the smile line, drifting from tooth to tooth along the front teeth. Focused, aesthetic, clinical calm. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Here you can see the small gaps and uneven color across your front teeth. We start by matching the perfect shade for your new smile.

**Motion / SFX:** Gentle lateral settle across the smile; soft suction hum.

### Scene 7.3 — Zoom transition (~6s)  ·  `dental_veneers_zoom.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the upper front teeth, past the soft cheek retractor and glistening enamel, and resolves into a clean wet intraoral macro of two central front teeth with a small gap between them and subtly uneven color, softly backlit. Motion: a fast, smooth accelerating push-in that dives from smile scale to tooth scale in one continuous move. Seamless, immersive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** Fast accelerating push-in; rising musical swell.

### Scene 7.4 — Minimal prep and shade (~8s)  ·  `dental_veneers_minimal-prep-and-shade.mp4`

[MACRO STYLE] Extreme intraoral macro at tooth scale, people-free, the upper front teeth filling the frame under bright wet key light. A fine handpiece sweeps only across the flat facial surface of a front tooth, taking away a whisper-thin layer of surface enamel, just enough to make room for a veneer, while the tooth stays tall and fully intact, never ground into a stump. A slim scanning wand then passes across the prepped fronts, sweeping soft structured blue-white light to capture their exact shape. Motion: slow lateral glide along the front teeth following the handpiece then the wand. Meticulous, delicate, quietly satisfying. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** We remove only a whisper-thin layer from the front surface, keeping your tooth intact, then scan for a precise, custom fit.

**Motion / SFX:** Slow lateral glide; soft fine-handpiece whir, faint scan tone.

### Scene 7.5 — Bond first veneer (~8s)  ·  `dental_veneers_bond-veneer.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, a single prepped front tooth centered and dry. A clear etchant gel is painted across its facial surface and rinsed to a frosted matte, then a thin brush of bonding adhesive is laid down. A wafer-thin, translucent porcelain veneer shell, so slim that light glows through its edges, is lifted into place over the front of the tooth with a film of resin cement, seated flush along the gumline and edges. A slim blue LED curing light sweeps close, its glow firming the bond. Motion: the veneer lowers and seats onto the tooth face, then the curing light glides across it. Delicate, precise, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Each veneer is prepared with etch and adhesive, then a wafer-thin porcelain shell is bonded onto the front and set firmly with a curing light.

**Motion / SFX:** Lower-and-seat then curing glide; soft cure tone, faint suction.

### Scene 7.6 — Seat remaining veneers (~8s)  ·  `dental_veneers_seat-remaining.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, the row of upper front teeth in frame under bright wet light. One by one, wafer-thin translucent porcelain veneers seat onto the adjacent front teeth, each slim shell blending against its neighbor, the small dark gaps closing smoothly as the shells meet edge to edge. The color evens out into a bright, natural, uniform smile line, translucent and lifelike rather than opaque or fake-white. A slim tip tidies each margin as it seats. Motion: a smooth lateral track along the arch as each veneer clicks into place and the smile line completes. Elegant, harmonious, quietly triumphant. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** One by one the remaining veneers are placed, closing the gaps and blending into a bright, even, completely natural smile line.

**Motion / SFX:** Smooth lateral track along the arch; soft seating clicks, gentle chimes.

### Scene 7.7 — Polished smile reveal (~7s)  ·  `dental_veneers_reveal-smile.mp4`

[MACRO STYLE] Extreme intraoral macro easing back toward the full smile, people-free, the upper front teeth now capped with seamless translucent veneers, gaps closed and color bright, even, and natural. A fine polishing disc glides along the surfaces and margins, bringing up a soft lifelike shine and smoothing every edge flush at the gumline, the teeth catching the light like healthy natural enamel, never fluorescent. The cheek retractor eases away as the finished smile comes into full view. Motion: a slow drift-back and gentle rise revealing the complete, glowing smile line. Complete, radiant, quietly triumphant. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** A final polish brings out a natural, healthy shine, and your brand-new smile is ready, brighter, even, and beautifully your own.

**Motion / SFX:** Slow drift-back and gentle rise; soft polishing whir, warm resolve tone.

---

## 8 · Professional Whitening `(whitening)`

An in-office bleaching treatment lifts years of stains to brighten your natural enamel several shades in a single visit.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** yellowed/stained but healthy enamel in the problem beat; lips held clear with a retractor; light-cured protective gingival barrier painted along the gumline; professional hydrogen-peroxide gel applied evenly across the front teeth; whitening activation light; enamel brightening shade by shade over passes; bright but natural smile at reveal.
- **MUST NOT:** drilling; enamel damage; cartoonish fluorescent pure-white teeth; bleaching gel on unprotected gums.
- **Negative tweak:** allow visibly yellowed/stained enamel in the problem beat, and a genuinely bright (but natural, not fluorescent) shade at the reveal.

**Setting & equipment**

- **Setting:** calm modern dental operatory, soft daylight, patient reclined and awake
- **People:** masked dentist and assistant working gently around the patient
- **Tray:** retractor, gingival barrier syringe, curing light, whitening gel syringes, activation lamp

### Scene 8.1 — Establishing (~7s)  ·  `dental_whitening_establishing-operatory.mp4`

[ENV STYLE] A calm, modern dental operatory bathed in soft morning light. A relaxed patient reclines in the chair, awake and at ease, while a masked dentist and assistant move gently around them. On the tray sit a lip retractor, syringes of gingival barrier and whitening gel, and a slim activation lamp waiting to be positioned. Warm reflections play across polished surfaces; everything feels unhurried and reassuring. The patient's natural smile is visible for a beat, the front teeth carrying a soft yellowed cast from years of everyday staining. Motion: a slow gentle push-in from the doorway toward the chair; quiet room tone, faint instrument clink. Mood: warm, welcoming, unrushed. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Today we're going to bring back the brightness that everyday coffee, tea, and time have slowly dimmed.

**Motion / SFX:** slow gentle push-in from doorway toward chair; quiet room tone, faint instrument clink.

### Scene 8.2 — Isolate & Protect Gums (~7s)  ·  `dental_whitening_isolate-gingival-barrier.mp4`

[MACRO STYLE] An extreme intraoral close-up. A soft lip retractor holds the lips and cheeks clear, exposing the full front arch of healthy but yellowed teeth against pink, healthy gums. A fine applicator paints a smooth ribbon of protective gingival barrier gel precisely along the gumline, tracing each tooth's collar. A blue curing light sweeps across and the barrier sets firm and rubbery, sealing the delicate gum tissue away from the teeth. The enamel itself stays untouched, its stained surface glistening under wet light. Motion: slow lateral tracking along the gumline following the applicator, then a brief hold as the curing light passes; soft suction hum, gentle curing-light beep. Mood: careful, meticulous, protective. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** First we tuck a soft protective barrier along your gums, so all the whitening power stays exactly where we want it.

**Motion / SFX:** slow lateral tracking along gumline following applicator, brief hold under curing light; soft suction hum, gentle curing-light beep.

### Scene 8.3 — Zoom Transition (~6s)  ·  `dental_whitening_zoom-to-enamel.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the sealed gumline and the exposed front teeth, sliding past the glossy protective barrier and the wet sheen of enamel, and resolves into a clean wet intraoral macro of a single stained front tooth surface with its faint yellow cast catching the light. Motion: a fast, smooth accelerating push-in that decelerates as the enamel fills the frame. Seamless, immersive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** fast accelerating push-in decelerating onto enamel; soft musical swell.

### Scene 8.4 — Apply Whitening Gel (~7s)  ·  `dental_whitening_apply-gel.mp4`

[MACRO STYLE] An extreme intraoral close-up of the front teeth, gums sealed under a set barrier. A syringe tip glides across each tooth, laying down an even, glistening layer of clear hydrogen-peroxide whitening gel that coats the enamel in a smooth, uniform film. The gel settles into a thin translucent sheen, hugging the curved surfaces without touching the protected gums. Tiny highlights sparkle where the light catches the fresh coating. The stained enamel beneath waits, still carrying its yellow tone. Motion: smooth lateral glide following the syringe tip tooth to tooth, then a slow settle as the gel evens out; faint syringe-squeeze sound, soft wet sheen. Mood: precise, deliberate, anticipatory. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Now a professional whitening gel is spread evenly across each front tooth, ready to lift the stains from within.

**Motion / SFX:** smooth lateral glide following syringe tip, slow settle as gel evens out; faint syringe-squeeze, soft wet sheen.

### Scene 8.5 — Activation Light (~7s)  ·  `dental_whitening_activation-light.mp4`

[MACRO STYLE] An extreme intraoral macro as a broad whitening activation lamp swings into position and bathes the gel-coated front teeth in a cool, even glow. The clear gel brightens under the light, tiny effervescent bubbles rising along the enamel as the active oxygen begins working. The barrier keeps the gums shielded in shadow while the teeth are lit edge to edge. The glow is clinical and steady, reflecting in the wet surfaces. Motion: a slow arc as the lamp settles into place, then a gentle hold with faint shimmering bubbles across the enamel; low lamp hum, soft ambient tone. Mood: focused, quietly powerful, clinical calm. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** A gentle activation light switches the gel on, waking up the whitening and letting it work deep into the enamel.

**Motion / SFX:** slow arc as lamp settles, gentle hold with shimmering bubbles; low lamp hum, soft ambient tone.

### Scene 8.6 — Shade Lifting (~8s)  ·  `dental_whitening_shade-lifting.mp4`

[MACRO STYLE] An extreme intraoral macro of the front teeth over successive whitening passes. Frame by frame the enamel lifts through the shade range, the tired yellow cast fading pass after pass into a clean, natural brightness. The change is gradual and believable, each tooth clearing to a warmer, whiter tone while keeping its natural translucency at the edges. Light plays across the smoothing surfaces as the stains release. The result reads unmistakably brighter yet still real, never chalky or fluorescent. Motion: a slow steady push across the arch as the shade visibly climbs pass by pass; soft rising ambient swell, faint gentle chime marking each pass. Mood: satisfying, transformative, honest. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Pass by pass, you can watch the shade climb — the yellow lifting away and a natural brightness rising in its place.

**Motion / SFX:** slow steady push across arch as shade climbs pass by pass; soft rising ambient swell, faint gentle chime.

### Scene 8.7 — Reveal (~8s)  ·  `dental_whitening_reveal-bright-smile.mp4`

[MACRO STYLE] An extreme intraoral macro pulls back as the retractor and barrier are removed, revealing the finished front teeth against healthy pink gums. The enamel is dazzling and clean, several shades brighter than before, yet unmistakably natural — warm highlights, soft translucency at the edges, real texture intact. The patient's lips relax back into a full, easy smile that glows in the soft operatory light. Everything looks fresh, healthy, and genuinely theirs, just brighter. Motion: a smooth pull-back and slow lift as the retractor releases into a full relaxed smile, ending on a gentle settle; warm musical resolve, soft satisfied breath. Mood: joyful, confident, radiant. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** And there it is — brighter, cleaner, and still completely yours. That's a smile you'll want to show off.

**Motion / SFX:** smooth pull-back and slow lift into full relaxed smile, gentle settle; warm musical resolve, soft satisfied breath.

---

## 9 · Gum Disease Treatment (Scaling & Root Planing) `(gum_treatment)`

A deep cleaning removes hardened tartar above and below the gumline and smooths the root surfaces so inflamed gums heal. Non-surgical, awake.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** red, mildly inflamed, slightly swollen gums with visible tartar and mild recession in the problem beat; an ultrasonic scaler tip gliding along and just beneath the gumline with a fine water spray; a hand curette smoothing and root planing the root surface; the gum tissue calming, tightening, and returning to firm pale coral-pink at reveal.
- **MUST NOT:** gore or bleeding beyond mild; drilling teeth; surgery or flap-raising; removing teeth.
- **Negative tweak:** allow red inflamed gums, tartar/calculus, and mild recession in the problem beat (the condition being treated).

**Setting & equipment**

- **Setting:** calm modern dental operatory, patient awake
- **People:** masked hygienist and assistant
- **Tray:** mouth mirror, periodontal probe, ultrasonic scaler, hand curette, slim suction tip

### Scene 9.1 — Establishing wide (~6s)  ·  `dental_gum_treatment_establishing.mp4`

[ENV STYLE] A calm modern dental operatory in soft warm daylight. An awake, relaxed patient reclines while a masked hygienist and assistant lean in with gentle focus. A tidy instrument tray holds an ultrasonic scaler and a slim hand curette. The mood is reassuring and clinical, clean and softly lit. The hygienist adjusts the overhead light and the patient's mouth opens to reveal a smile where the gums along the gumline look faintly red and a little puffy. Motion: slow cinematic dolly-in toward the patient's mouth. Warm, calm, attentive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Healthy gums are the foundation of a healthy smile. When plaque hardens into tartar below the gumline, gums become inflamed, and a deep cleaning helps them heal.

**Motion / SFX:** Slow cinematic dolly-in; quiet room tone and soft instrument clink.

### Scene 9.2 — Isolate and inspect (~7s)  ·  `dental_gum_treatment_isolate-inspect.mp4`

[ENV STYLE] Closer now, the masked hygienist gently retracts the lip to reveal gums that are red, mildly inflamed, and slightly swollen, with visible tartar deposits at the gumline and a little recession exposing the tooth necks. A slim probe traces gently along the gumline as the awake patient rests calmly. The area is kept dry and clearly lit, tissue moist and softly reflective. Everything looks controlled and gentle, only mild inflammation, no bleeding. Motion: smooth push-in that settles on the inflamed gumline and tartar. Careful, observant, gentle. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** First we inspect the gums, checking where tartar has built up and the tissue has become red and inflamed along the gumline.

**Motion / SFX:** Smooth push-in settling on the inflamed gumline; faint suction hiss and calm breathing.

### Scene 9.3 — Zoom transition (~6s)  ·  `dental_gum_treatment_zoom.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the parted lips, gliding past the glistening lip line, resolves into a clean wet intraoral macro of a tooth meeting a red, mildly inflamed gumline dotted with hardened tan tartar and slight recession. Motion: a fast, smooth accelerating push-in sweeping over enamel and down to the tartar-lined gum margin. Seamless, immersive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** Fast accelerating push-in; soft musical swell.

### Scene 9.4 — Ultrasonic scaling (~8s)  ·  `dental_gum_treatment_ultrasonic-scaling.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, of a tooth meeting a red inflamed gumline crusted with hardened tan tartar. A slim ultrasonic scaler tip glides along and just beneath the gum margin, its rounded end vibrating gently as a fine mist of water spray washes over the surface. Hardened tartar deposits break loose and rinse away in the spray, revealing the clean, smooth enamel and tooth neck beneath. The gum stays intact, only mildly red, as the margin is cleared. Motion: slow tracking glide of the scaler tip along the gumline as tartar loosens and washes away. Meticulous, cleansing, precise. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** An ultrasonic scaler gently glides along and just beneath the gumline, breaking loose hardened tartar and washing it away with a fine water spray.

**Motion / SFX:** Slow tracking glide of the scaler along the gumline; soft ultrasonic hum and fine water spray.

### Scene 9.5 — Root planing (~8s)  ·  `dental_gum_treatment_root-planing.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, of the now tartar-free tooth neck just beneath the gum margin. A slim hand curette slides smoothly along the exposed root surface, gently smoothing and planing away any residual roughness so the surface becomes clean and glassy. The moist coral-pink gum tissue sits close against the tooth, calmer now, only faintly pink. Each deliberate stroke leaves the root surface polished and even. Motion: slow deliberate strokes of the curette along the root surface as it smooths. Precise, careful, tactile. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Then a fine hand tool smooths the root surface, called root planing, so bacteria have nowhere to cling and your gums can reattach.

**Motion / SFX:** Slow deliberate curette strokes along the root; soft glide sound and gentle suction.

### Scene 9.6 — Tissue healing (~7s)  ·  `dental_gum_treatment_tissue-healing.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, of the cleaned tooth and gumline over a gentle passage of time. The gum tissue, once red and puffy, visibly calms and tightens, its swelling easing as the color shifts from inflamed red toward a firm, healthy pale coral-pink. The margin hugs snugly against the clean, smooth tooth, moist and softly glossy, with no tartar in sight. Everything reads as fresh, calm, and healing. Motion: slow settling push-in as the tissue tightens and its color warms to healthy pink. Soothing, restorative, gentle. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** With the tartar gone and the roots smooth, your gums begin to calm, tighten, and return to a firm, healthy pink.

**Motion / SFX:** Slow settling push-in as tissue tightens and warms; soft soothing tone.

### Scene 9.7 — Reveal (~7s)  ·  `dental_gum_treatment_reveal.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, of the finished result along the gumline. The gums now sit firm, tight, and a healthy pale coral-pink, hugging clean, smooth teeth with no tartar and no puffiness. The margin is crisp and snug, the tissue moist and softly glossy, the whole area looking fresh, calm, and revitalized. Light glides gently across the restored, healthy gumline. Motion: slow celebratory pull-back revealing the clean teeth and healthy gum margin as light plays across the surface. Fresh, healthy, confident. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** The result is a cleaner, healthier mouth, with firm pink gums that support your smile for years to come.

**Motion / SFX:** Slow celebratory pull-back along the healthy gumline; gentle uplifting tone.

---

## 10 · Complete Denture `(dentures)`

A removable prosthesis of lifelike teeth in a gum-colored acrylic base restores a full arch of missing teeth. Non-surgical, awake.

Consistency token: `[EDENT TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** an edentulous, smooth firm coral-pink alveolar ridge; an impression of the ridge taken with a tray; a wax try-in with a tooth arrangement checked for fit and smile; the finished acrylic denture seated onto the ridge with a snug suction fit.
- **MUST NOT:** any drilling; dental implants; denture teeth looking fake fluorescent-white or too uniform; an ill-fitting or floating base.
- **Negative tweak:** an edentulous (toothless) ridge is the presenting condition here, not a defect

**Setting & equipment**

- **Setting:** calm modern dental operatory, patient awake
- **People:** masked dentist and assistant
- **Tray:** impression tray with putty, wax try-in with lifelike teeth, finished acrylic denture, mirror, soft cloth

### Scene 10.1 — Establishing wide (~6s)  ·  `dental_dentures_establishing.mp4`

[ENV STYLE] A calm modern dental operatory in soft warm daylight. An awake, relaxed patient reclines comfortably while a masked dentist and assistant work with easy, reassuring focus. A tidy instrument tray holds an impression tray and a wax try-in with lifelike teeth. The mood is warm and unhurried, everything clean and gently lit. The dentist smiles behind the mask and the patient opens up, revealing a full arch with no teeth, a smooth healthy ridge. Motion: slow cinematic dolly-in toward the patient's face and open mouth. Warm, hopeful, composed. `[EDENT TOKEN]` `[NEGATIVE]`

**Narration:** When a full arch of teeth is missing, a complete denture can restore your smile and your ability to eat and speak. Let's walk through how it's made.

**Motion / SFX:** Slow cinematic dolly-in; quiet room tone and soft instrument clink.

### Scene 10.2 — Ridge impression (~8s)  ·  `dental_dentures_ridge-impression.mp4`

[ENV STYLE] Closer in, the masked dentist gently retracts the lip to show a smooth, firm, coral-pink edentulous ridge with no teeth. The assistant hands over a fitted impression tray loaded with soft putty. The dentist seats the tray onto the ridge with steady, even pressure, capturing every gentle curve and contour, while the calm awake patient breathes easily. The tray is held briefly, then lifted to reveal a crisp negative imprint of the ridge. Everything looks gentle, clean, and precise. Motion: smooth push-in as the tray seats onto the ridge, then a slow lift. Careful, tactile, reassuring. `[EDENT TOKEN]` `[NEGATIVE]`

**Narration:** First we take a soft impression of your gum ridge, capturing its exact shape so your denture will fit snugly and comfortably.

**Motion / SFX:** Smooth push-in as tray seats then lifts; soft suction and quiet breathing.

### Scene 10.3 — Zoom transition (~6s)  ·  `dental_dentures_zoom.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the parted lips, gliding past the glistening lip line, resolves into a clean wet intraoral macro of a smooth, firm, coral-pink edentulous ridge curving gently with no teeth. Motion: a fast, smooth accelerating push-in sweeping over the moist ridge crest and into the toothless arch. Seamless, immersive. `[EDENT TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** Fast accelerating push-in; soft musical swell.

### Scene 10.4 — Wax try-in (~8s)  ·  `dental_dentures_wax-tryin.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, of the smooth coral-pink ridge as a wax try-in arch of lifelike teeth is gently positioned against it. The teeth are naturally shaped and softly varied in shade, set in warm pink wax, checked for even fit along the ridge and a balanced, natural smile line. Light plays across the moist wax and gentle tooth contours as the arrangement settles into place, following the curve of the ridge precisely. Nothing looks stark or overly uniform, just natural and harmonious. Motion: slow tracking glide along the wax arch as it meets the ridge. Deliberate, artful, gentle. `[EDENT TOKEN]` `[NEGATIVE]`

**Narration:** Next, we test a wax version with lifelike teeth, checking the fit and shaping a smile that looks natural and just right for you.

**Motion / SFX:** Slow tracking glide along the wax arch; soft ambient hum.

### Scene 10.5 — Seat denture (~8s)  ·  `dental_dentures_seat-denture.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free. The finished complete denture, natural lifelike teeth set in a warm gum-toned acrylic base, descends and seats onto the smooth coral-pink ridge. The base hugs every contour of the ridge with a snug, even suction fit, the pink acrylic blending seamlessly with the surrounding tissue. No gaps, no floating, just a secure, natural seal. The teeth are softly varied in shade, glossy and realistic. Motion: steady top-down descent as the denture seats, then a slight settling as suction takes hold. Secure, satisfying, natural. `[EDENT TOKEN]` `[NEGATIVE]`

**Narration:** Your finished denture, natural teeth set in a gum-colored base, seats firmly onto the ridge with a snug suction fit.

**Motion / SFX:** Top-down descent then settling suction; soft click and gentle seal sound.

### Scene 10.6 — Reveal smile (~7s)  ·  `dental_dentures_reveal-smile.mp4`

[ENV STYLE] Back in the warm operatory, the awake patient sits up and breaks into a full, confident smile. The complete denture reads as a natural arch of lifelike teeth, softly varied in shade, framed by healthy pink tissue, blending seamlessly into a genuine grin. The masked dentist and assistant look on warmly. Daylight catches the restored smile, bright and real, not stark or uniform. The patient's expression is relieved and delighted. Motion: slow celebratory pull-back and gentle rise as the patient smiles fully. Joyful, natural, radiant. `[EDENT TOKEN]` `[NEGATIVE]`

**Narration:** And here's the result, a full, natural-looking smile you can wear with confidence, ready to eat, speak, and laugh again.

**Motion / SFX:** Slow celebratory pull-back and gentle rise; warm uplifting tone.

---

## 11 · Full Mouth Rehabilitation `(full_mouth_rehab)`

A comprehensive, staged rebuild of a worn or broken smile — combining implants, crowns, and bite restoration into one healthy, functional set of teeth.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** full arch with widespread wear, cracks, and a few missing teeth (calm, not gory); treatment-plan overview via a gentle digital scan / 3D model of the whole arch; an implant seated in bone where a tooth is missing; a crown lowering onto a prepared tooth; the bite/occlusion restored to even contact across the arch; a fully rebuilt, even, natural, healthy full-arch smile at reveal; curated montage of key stages, same mouth throughout.
- **MUST NOT:** implausible instant transformation without showing stages; fluorescent fake-looking teeth; gore.
- **Negative tweak:** keep the problem arch calm and clinical, never gory; teeth natural and consistent across every stage.

**Setting & equipment**

- **Setting:** calm modern dental operatory with a chairside scanner and monitor, soft daylight, patient reclined and awake
- **People:** masked dentist and assistant working methodically, unhurried
- **Tray:** intraoral scanner wand, implant components, prepared crowns, articulating paper, mirror

### Scene 11.1 — Establishing (~7s)  ·  `dental_full_mouth_rehab_establishing-operatory.mp4`

[ENV STYLE] A calm, modern dental operatory in soft daylight. A relaxed, awake patient reclines in the chair while a masked dentist and assistant work methodically nearby, a large monitor glowing beside them. On the tray sit a slim scanner wand, small implant components, and a few prepared crowns waiting in order. The atmosphere is thoughtful and unhurried — this is a careful, comprehensive plan, not a rushed fix. Warm light plays across the polished surfaces. Motion: a slow gentle push-in from across the room toward the patient and the organized tray of stages; quiet room tone, faint instrument clink. Mood: measured, reassuring, purposeful. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** When years of wear, cracks, and missing teeth add up, we don't just patch one problem — we rebuild the whole smile, step by step.

**Motion / SFX:** slow gentle push-in toward patient and organized tray; quiet room tone, faint instrument clink.

### Scene 11.2 — Assess Full Arch (~7s)  ·  `dental_full_mouth_rehab_assess-full-arch.mp4`

[MACRO STYLE] An extreme intraoral close-up surveying a full arch that has taken years of wear. Several teeth are worn flat and short, a couple carry fine cracks running down their surfaces, and a few gaps sit where teeth have been lost. The gums are healthy and pink, the presentation calm and clinical rather than distressing. The camera moves gently across the arch, taking honest stock of everything that needs rebuilding, each tooth catching the wet light. Motion: a slow lateral survey along the full arch, pausing briefly at a worn tooth, a cracked one, and an empty gap; soft ambient tone, gentle wet sheen. Mood: honest, clinical, calm. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** First we take honest stock of everything — the teeth worn down, the cracks, and the gaps where teeth are missing.

**Motion / SFX:** slow lateral survey along full arch, pausing at worn tooth, cracked tooth, and gap; soft ambient tone, gentle wet sheen.

### Scene 11.3 — Plan Scan (~7s)  ·  `dental_full_mouth_rehab_plan-scan.mp4`

[ENV STYLE] In the operatory, a masked dentist sweeps a slim scanner wand across the patient's full arch while a detailed 3D model builds on the monitor in soft glowing color. The digital arch assembles tooth by tooth, and over it a treatment-plan overview takes shape — highlights marking where an implant will go, where crowns will restore worn teeth, and how the bite will come back into balance. The awake patient rests easily as the whole roadmap comes together on screen. Motion: a smooth follow of the scanner wand, cutting to the 3D model assembling and the plan highlights appearing across the arch; soft scanner chirp, quiet build-up tone. Mood: modern, clear, confident. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** A digital scan builds a full 3D model of your mouth, so together we can map out every stage before we begin.

**Motion / SFX:** smooth follow of scanner wand, cut to 3D model assembling with plan highlights; soft scanner chirp, quiet build-up tone.

### Scene 11.4 — Zoom Transition (~6s)  ·  `dental_full_mouth_rehab_zoom-into-arch.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the planned arch, sliding past the glowing treatment-plan highlights and the wet sheen of healthy gums, and resolves into a clean wet intraoral macro of the empty socket site where a missing tooth is about to be rebuilt. Motion: a fast, smooth accelerating push-in that decelerates as the bone and gap fill the frame. Seamless, immersive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** fast accelerating push-in decelerating onto the empty socket site; soft musical swell.

### Scene 11.5 — Implant Stage (~8s)  ·  `dental_full_mouth_rehab_implant-stage.mp4`

[MACRO STYLE] A clean anatomical macro cutaway at the site of a missing tooth, showing healthy jawbone beneath pink gum. A slim titanium implant post is guided precisely into the prepared channel in the bone, seating firmly and standing as a stable new root where the tooth was lost. The surrounding bone and tissue stay calm and healthy, the illustration clinical and free of any gore. This is the foundation stage — a solid anchor set for what will be rebuilt on top. Motion: a slow, controlled descent of the implant post into the bone, settling firmly into place with a subtle stabilizing hold; low steady tone, soft mechanical ease. Mood: solid, grounding, precise. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Where a tooth is missing, a small titanium implant is placed into the bone — a strong new root to build on.

**Motion / SFX:** slow controlled descent of implant post into bone, firm settle with stabilizing hold; low steady tone, soft mechanical ease.

### Scene 11.6 — Crown Stage (~8s)  ·  `dental_full_mouth_rehab_crown-stage.mp4`

[MACRO STYLE] An extreme intraoral macro at a neighboring prepared tooth, its worn structure shaped into a clean, rounded core ready to receive a restoration. A custom crown, natural in color and contour, lowers slowly onto the prepared tooth, its edges meeting the gumline precisely and its surface blending seamlessly with the arch. The crown seats fully, restoring the tooth's original height and shape. Light catches its lifelike translucency — natural, not fluorescent — matching the teeth around it. Motion: a slow vertical descent of the crown onto the prepared tooth, easing into a precise seat at the gumline; soft settling click, gentle ambient tone. Mood: restorative, satisfying, exact. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Worn and cracked teeth are rebuilt with custom crowns, each one lowered into place to restore its natural shape and strength.

**Motion / SFX:** slow vertical descent of crown onto prepared tooth, precise seat at gumline; soft settling click, gentle ambient tone.

### Scene 11.7 — Bite Restoration (~8s)  ·  `dental_full_mouth_rehab_bite-restoration.mp4`

[MACRO STYLE] An extreme intraoral macro from the side as the rebuilt upper and lower arches come together and the bite is restored to even, balanced contact. Thin articulating marks bloom evenly across the chewing surfaces, showing each tooth now meeting its partner with matched, comfortable pressure across the whole arch rather than crashing on a few worn spots. The teeth close and open smoothly, the occlusion harmonized and functional. Everything looks consistent — the same mouth, now working as one. Motion: a smooth close of the arches into even contact, with balanced marks appearing across the surfaces, then a gentle open; soft contact tap, low reassuring tone. Mood: balanced, harmonious, complete. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** Finally we restore your bite, so every tooth meets evenly again — comfortable, balanced, and built to last.

**Motion / SFX:** smooth close of arches into even contact with balanced marks appearing, gentle open; soft contact tap, low reassuring tone.

### Scene 11.8 — Reveal (~8s)  ·  `dental_full_mouth_rehab_reveal-full-smile.mp4`

[MACRO STYLE] An extreme intraoral macro pulls back to reveal the fully rebuilt arch, then widens to the patient's complete smile. Every tooth is restored — implants and crowns blended seamlessly into an even, natural, healthy full arch, no gaps, no wear, no cracks. The teeth are bright but believable, with real texture and translucency, framed by healthy pink gums. The patient's lips ease into a full, confident smile in the warm operatory light — whole, functional, and unmistakably theirs. Motion: a smooth pull-back from the arch into a full relaxed smile, ending on a gentle settle; warm musical resolve, soft satisfied breath. Mood: triumphant, whole, radiant. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** And here's the result — one complete, healthy smile, rebuilt to look natural and work beautifully for years to come.

**Motion / SFX:** smooth pull-back from arch into full relaxed smile, gentle settle; warm musical resolve, soft satisfied breath.

---

## 12 · Inlay / Onlay `(inlay_onlay)`

A cavity too large for a simple filling is restored with a custom-milled tooth-colored ceramic piece that bonds precisely into the tooth like a puzzle piece. Non-surgical, awake under local anesthesia.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** numb and isolate the tooth before treatment; remove the decay to leave a defined, clean preparation too large for a direct filling; capture a digital scan of the prepared pocket; drop a custom tooth-colored ceramic inlay or onlay precisely into the preparation; bond it with resin cement, light-cure, and polish flush.
- **MUST NOT:** show a metal inlay; leave the inlay proud or overhanging the tooth surface; reshape the tooth into a full crown.
- **Negative tweak:** controlled water-cooled handpiece prep and clean decay removal are expected and clinically normal

**Setting & equipment**

- **Setting:** calm modern dental operatory, patient awake under local anesthesia
- **People:** masked loupe-wearing dentist at the patient's head, assistant opposite with slim suction
- **Tray:** mouth mirror, water-cooled high-speed handpiece, rubber dam and clamp, intraoral scanning wand, custom milled tooth-colored ceramic inlay, etch and adhesive, resin cement syringe, blue LED curing light, polishing point

### Scene 12.1 — Establishing wide (~7s)  ·  `dental_inlay_onlay_establishing.mp4`

[ENV STYLE] Wide shot of a calm modern dental operatory in soft, even light. The patient reclines awake and at ease under a focused overhead lamp while the masked, loupe-wearing dentist settles at the patient's head and the assistant sits opposite with a slim suction tip. On the bracket tray, neatly arranged: a mouth mirror, a water-cooled high-speed handpiece, a folded rubber dam, a slim intraoral scanning wand, a small tooth-colored ceramic inlay resting in its tray, and a slim blue LED curing light. Everything is orderly and unhurried. Motion: a slow, smooth push-in from the wide room toward the patient's mouth and the tray. Serene, precise, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** When a cavity is too big for a simple filling, we restore the tooth with a custom ceramic piece called an inlay. You'll relax while we clean the tooth and fit it perfectly in place.

**Motion / SFX:** Slow push-in; quiet room tone, soft instrument clink.

### Scene 12.2 — Isolate the tooth (~7s)  ·  `dental_inlay_onlay_isolate-prep.mp4`

[ENV STYLE] Closer shot over the dentist's shoulder into the open mouth under warm lamplight. The dentist and assistant stretch a rubber dam over a single back tooth and seat a small clamp, isolating it cleanly and dryly from the rest of the mouth, the tooth framed in a neat window of dam. That tooth shows a large dark area of decay across its chewing surface, clearly too broad for a small filling. The assistant's suction keeps the field crisp. Motion: a smooth settle-in as the rubber dam is seated and the isolated tooth comes into clear frame. Focused, careful, clinical calm. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** First we numb the tooth and isolate it with a soft rubber shield to keep everything clean and dry. You can see the cavity is quite large across the top.

**Motion / SFX:** Gentle settle-in; low suction hum, soft clamp seat.

### Scene 12.3 — Zoom transition (~6s)  ·  `dental_inlay_onlay_zoom.mp4`

Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the isolated back tooth, past the framing rubber dam and glistening enamel, and resolves into a clean wet intraoral macro of a single molar with a broad dark cavity across its chewing surface, isolated and softly backlit. Motion: a fast, smooth accelerating push-in that dives from mouth scale to tooth scale in one continuous move. Seamless, immersive. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** (transition — no VO / soft musical swell)

**Motion / SFX:** Fast accelerating push-in; rising musical swell.

### Scene 12.4 — Remove decay and prepare (~8s)  ·  `dental_inlay_onlay_remove-decay-prep.mp4`

[MACRO STYLE] Extreme intraoral macro at tooth scale, people-free, the rubber-dam-isolated molar filling the frame under bright wet key light. A slim water-cooled handpiece sweeps across the chewing surface, a fine cooling mist flashing at the bur tip as the soft dark decay is cleared away and the walls are smoothed. What remains is a clean, defined preparation, a shaped pocket with crisp inner walls, clearly larger and deeper than a simple filling could handle, yet keeping most of the healthy tooth intact around it. Motion: slow orbit around the tooth following the handpiece as the clean pocket takes shape. Meticulous, clinical, quietly satisfying. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** We gently remove all the decay, leaving a clean, defined pocket in the tooth, larger than a filling could reliably restore.

**Motion / SFX:** Slow orbit tracking the handpiece; soft water-cooled handpiece whir.

### Scene 12.5 — Digital scan and mill (~7s)  ·  `dental_inlay_onlay_scan-and-mill.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, the clean prepared pocket glistening at center. A slim intraoral scanning wand glides over the tooth, sweeping a soft structured blue-white light across the preparation and capturing its exact shape. In the soft-focus background, a screen shows a generic 3D model of the pocket assembling, and beside it a tooth-colored ceramic block being shaped by a milling motion into a small inlay that matches the pocket precisely. The light is optical and cool, never radiation. Motion: the wand tracks across the pocket while the 3D model and milled inlay form in the background blur. High-tech, calm, exact. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** A quick light scan captures the exact shape of the pocket, and your custom ceramic inlay is milled to fit it precisely.

**Motion / SFX:** Steady wand glide; faint electronic scan tone, distant mill hum.

### Scene 12.6 — Seat and bond inlay (~8s)  ·  `dental_inlay_onlay_seat-bond-inlay.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, the prepared pocket centered and dry within the rubber dam. A custom tooth-colored ceramic inlay, shaded to match the tooth, drops precisely into the pocket like a puzzle piece, seating fully with its top surface flush to the surrounding chewing surface, no overhang and no gap at the margins. A slim tip runs resin cement around the edge, then a slim blue LED curing light sweeps close, its glow firming the bond as excess cement is wiped clean. Motion: the inlay lowers and clicks into place, then the curing light glides over the sealed margin. Definitive, clean, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** The custom inlay drops into place like a puzzle piece, then we bond it in with a quick light-cure so it becomes part of the tooth.

**Motion / SFX:** Vertical drop-and-seat then curing glide; soft click, faint cure tone.

### Scene 12.7 — Polished reveal (~7s)  ·  `dental_inlay_onlay_reveal.mp4`

[MACRO STYLE] Extreme intraoral macro, people-free, the bonded inlay gleaming seamlessly within the tooth, its color and contour blending so it disappears into the natural chewing surface. A fine polishing point glides over the restoration, bringing up a soft even shine and smoothing the margins perfectly flush, no ledge, no overhang. The rubber dam lifts away and the tooth sits whole and natural among its neighbors. Motion: a slow drift-back and gentle rotation revealing the finished, polished tooth blending into the arch. Complete, polished, quietly triumphant. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** A final polish blends the inlay flawlessly into your tooth, restoring its full shape and strength while keeping it looking completely natural.

**Motion / SFX:** Slow drift-back with gentle rotation; soft polishing whir, calm resolve tone.

---

## 13 · Sleep Apnea Oral Appliance `(sleep_apnea)`

A custom-fit device worn at night gently holds your lower jaw slightly forward, keeping your airway open so you can breathe and rest — a dental appliance, not surgery.

Consistency token: `[SMILE TOKEN]`

**Clinical accuracy guardrails**

- **MUST:** side-profile cutaway of the airway narrowing/collapsing at the back of the throat with a soft dimming glow (problem); digital scan or impression of the teeth; custom clear two-piece appliance fitting over upper and lower teeth; appliance seated and gently advancing the lower jaw forward; side-profile cutaway of the airway opening with a soft glow of restored airflow; rested, easy-breathing reveal.
- **MUST NOT:** any surgery; CPAP mask; breathing tubes; general anesthesia; bulky or metal-looking device.
- **Negative tweak:** keep the appliance clear, slim, and custom-fit; airway cutaways calm and anatomical, never distressing.

**Setting & equipment**

- **Setting:** calm modern dental operatory with a chairside scanner, soft daylight, patient awake and comfortable
- **People:** masked dentist and assistant guiding the patient, unhurried
- **Tray:** intraoral scanner wand, custom clear two-piece oral appliance, mirror, soft cloth

### Scene 13.1 — Establishing (~7s)  ·  `dental_sleep_apnea_establishing-operatory.mp4`

[ENV STYLE] A calm modern dental operatory in soft daylight. A relaxed, fully awake patient sits comfortably in the chair as a masked dentist speaks gently beside them, an assistant nearby. On the tray rests a slim chairside scanner wand and a small, clear two-piece oral appliance catching the light. The mood is quiet and reassuring — this is a conversation about sleep and breathing, not a procedure. Everything feels unhurried, clinical, and kind. Motion: a slow gentle push-in from across the room toward the patient and the small clear appliance on the tray; soft room tone, faint quiet murmur. Mood: calm, caring, reassuring. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** If your nights feel restless and your sleep never quite refreshes you, the cause might be your airway — and we can help.

**Motion / SFX:** slow gentle push-in toward patient and clear appliance on tray; soft room tone, faint quiet murmur.

### Scene 13.2 — Airway Problem Cutaway (~8s)  ·  `dental_sleep_apnea_airway-problem-cutaway.mp4`

[MACRO STYLE] A clean anatomical side-profile cutaway of a sleeping head, people-free and calm. The airway is shown clearly from nose and mouth down past the base of the tongue toward the throat. As sleep deepens, the soft tissue at the back of the throat relaxes and the airway narrows, then partly collapses, the open channel pinching closed. A soft glow that once traced the flowing air dims and fades at the blockage, signaling breath struggling to pass. The illustration stays gentle and educational, never distressing. Motion: a slow drift along the airway from nose to throat, then a quiet hold as the passage narrows and the glow dims; low ambient tone, faint muffled breath. Mood: calm, explanatory, quietly concerning. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** As you drift into deep sleep, the tissues at the back of your throat relax — and for many people the airway narrows or collapses, cutting off easy breathing.

**Motion / SFX:** slow drift along airway nose to throat, quiet hold as passage narrows and glow dims; low soft ambient tone, faint muffled breath.

### Scene 13.3 — Digital Scan (~7s)  ·  `dental_sleep_apnea_digital-scan.mp4`

[ENV STYLE] In the calm operatory, a masked dentist glides a slim intraoral scanner wand along the patient's upper and lower teeth. On a nearby monitor, a precise 3D digital model of both arches builds up in real time, surfaces filling in tooth by tooth in soft glowing color. The awake patient rests comfortably as the wand moves smoothly, no discomfort, no mess. The scan captures every contour needed to build a device made only for them. Motion: a smooth follow of the scanner wand across the arch, cutting to the 3D model assembling on screen; soft scanner chirp, quiet build-up tone. Mood: precise, modern, effortless. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** First we take a quick digital scan of your teeth — no mess, no impressions — so your appliance can be built to fit only you.

**Motion / SFX:** smooth follow of scanner wand across arch, cut to 3D model assembling on screen; soft scanner chirp, quiet build-up tone.

### Scene 13.4 — Fit the Appliance (~7s)  ·  `dental_sleep_apnea_fit-appliance.mp4`

[MACRO STYLE] An extreme intraoral close-up as a custom clear two-piece oral appliance is brought toward the teeth. Each slim, transparent tray is shaped to hug the upper and lower arch precisely, low-profile and glassy rather than bulky. The upper piece seats over the top teeth and the lower piece over the bottom, their surfaces meeting cleanly. Light passes through the clear material, showing the natural teeth beneath. It looks comfortable and discreet, nothing metal or heavy about it. Motion: a smooth approach and settle as each clear tray seats over its arch, ending on a clean meeting of the two pieces; soft click of seating, gentle ambient tone. Mood: reassuring, precise, comfortable. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** The result is a slim, clear appliance in two pieces — one hugging your upper teeth, one your lower — comfortable enough to sleep in.

**Motion / SFX:** smooth approach and settle as each clear tray seats over its arch, clean meeting of the pieces; soft click of seating, gentle ambient tone.

### Scene 13.5 — Seat & Advance Jaw (~7s)  ·  `dental_sleep_apnea_seat-and-advance.mp4`

[MACRO STYLE] A clean anatomical side-profile cutaway, people-free, showing the clear two-piece appliance now seated over the upper and lower teeth. Gently, the appliance guides the lower jaw a small, controlled distance forward, the mandible easing ahead of its resting position. As the jaw advances, the base of the tongue and the soft tissue at the back of the throat are drawn slightly forward with it, and the airway channel behind them begins to open. The motion is subtle, mechanical, and gentle — a small shift with a big effect. Motion: a slow, steady advance of the lower jaw forward with the appliance, tissues easing ahead and the airway starting to widen; soft mechanical ease, low reassuring tone. Mood: gentle, purposeful, illuminating. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** While you sleep, it holds your lower jaw just slightly forward — and that small shift pulls the tissues away from your airway.

**Motion / SFX:** slow steady advance of lower jaw forward with appliance, tissues easing ahead as airway starts to widen; soft mechanical ease, low reassuring tone.

### Scene 13.6 — Airway Opens (~8s)  ·  `dental_sleep_apnea_airway-opens-cutaway.mp4`

[MACRO STYLE] The same calm side-profile cutaway of the head, now with the airway held open. With the lower jaw advanced by the clear appliance, the once-pinched channel at the back of the throat is now a clear, open passage from nose and mouth down toward the lungs. A soft glow of restored airflow returns, tracing smoothly and steadily through the open airway, brightening where it had dimmed before. The whole illustration feels relieved and easy, breath flowing without struggle. Motion: a smooth glow of returning airflow flowing down through the newly open airway, brightening as it passes; soft warm ambient swell, gentle steady breath. Mood: relieved, restorative, hopeful. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** With the airway held open, air flows freely again — quiet, steady breathing all night long.

**Motion / SFX:** smooth glow of returning airflow down through open airway, brightening as it passes; soft warm ambient swell, gentle steady breath.

### Scene 13.7 — Reveal (~8s)  ·  `dental_sleep_apnea_reveal-rested.mp4`

[ENV STYLE] A soft, warm scene: the patient, now rested and at ease, breathes easily with a calm, refreshed expression, the small clear appliance resting on a soft cloth beside them in the gentle operatory light. There is a sense of a full night's sleep restored — relaxed shoulders, easy breath, a quiet contented smile. No mask, no tubes, nothing bulky — just a simple, discreet device and a person who finally sleeps well. Motion: a slow gentle drift toward the rested patient, ending on a soft settle as they breathe easily; warm musical resolve, soft calm breath. Mood: peaceful, restored, hopeful. `[SMILE TOKEN]` `[NEGATIVE]`

**Narration:** No surgery, no mask, no tubes — just a small custom device, and the deep, easy rest you've been missing.

**Motion / SFX:** slow gentle drift toward rested patient, soft settle as they breathe easily; warm musical resolve, soft calm breath.

---
