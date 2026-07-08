# Flagship Clip Prompts — All Treatments

Self-contained generation prompts (Seedance/Veo-safe) for every treatment's 6 flagship beats:
`problem → deep-dive → treatment → journey → what-to-expect → outcome`.

**Hardening rules baked into every prompt** (learned from invisalign/veneers generation):
one arch/object only · object inventory declared up front · ONE motion + ONE camera move ·
one visual effect max · explicit bans ("nothing appears, attaches, or changes… no extra objects,
no instruments, no text") · no real faces/hands (Google filter) · deep navy bg + cyan accent +
natural ivory teeth · loop-friendly · calm caption space top & bottom · 8s · 16:9.

File naming: `dental-videos/<treatment>/<beat>.mp4` as labeled. After generating, register in
`src/lib/dental-video-assets.ts` by role.

Invisalign (8) and veneers (9) sets already delivered separately. full_mouth_rehab already has 10 clips.

---

## BRACES (6)

### `braces/problem.mp4` — problem
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the upper and lower front teeth together, clearly a smooth rendered dental model, floating on a deep navy background — no other objects ever. Several front teeth are visibly crowded and rotated, with one small gap — mild, honest misalignment, natural ivory color. The only motion: the camera pushes in slowly toward the misaligned area, ending on almost the same composition for a seamless loop. A thin cyan highlight ring softly pulses around the crooked teeth — the only visual effect. Nothing appears, attaches, or changes on the teeth at any point: no brackets, no wires, no instruments, no text. Soft studio light, calm empty space top and bottom for captions. Warm, honest, premium medical-illustration style.
```

### `braces/deep-dive.mp4` — deepDive
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the UPPER dental arch only, floating on a deep navy background — no lower teeth, no other objects. Three front teeth visibly overlap and twist. The only motion: the camera orbits slowly around the arch, a few degrees left to right, one smooth continuous move. As it orbits, a soft cyan glow gently brightens on the tight overlapping contact points — the only visual effect. Nothing appears, attaches, or changes on the teeth at any point: no brackets, no wires, no arrows, no instruments, no text. Teeth stay the same shape and position the whole shot, natural ivory. Soft studio light, loop-friendly, calm space top and bottom for captions.
```

### `braces/treatment.mp4` — treatment (bracket placement)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the UPPER dental arch only, teeth slightly crowded, completely bare — nothing on any tooth at any point except as described — and (2) one small polished metal bracket held by slim tweezers. One single motion: the tweezers bring the bracket in slowly and press it flat onto the center of the front surface of ONE front tooth, where it stays; the tweezers then withdraw and everything is still. Only that one tooth receives a bracket; no other bracket, wire, or object ever appears on any other tooth. The teeth never move or change. Camera holds one fixed three-quarter angle, no cuts. Deep navy background, soft studio light, a faint cyan glint on the bracket only. Calm space top and bottom for captions. Precise, gentle, satisfying.
```

### `braces/journey.mp4` — journey (wire straightens the teeth)
```
Clean 3D medical-education animation. ONE composed subject in frame the entire time: a stylized model of the UPPER dental arch only, front view, each tooth already fitted with a small neat metal bracket connected by one thin continuous archwire — this is the starting state and no new objects ever appear. At the start, three front teeth are crooked and the wire bends around them. The only motion: over the course of the shot the crooked teeth very slowly rotate and slide into perfect alignment, and the wire smoothly relaxes from bent to a clean even curve — a gentle time-lapse. Nothing else changes: no brackets added or removed, no instruments, no arrows, no text. Camera completely static, one fixed front-on angle. Natural ivory teeth, deep navy background, soft studio light. Calm space top and bottom for captions. Smooth, satisfying, transformative.
```

### `braces/adjustment.mp4` — whatToExpect (wire change)
```
Clean 3D medical-education animation. ONE composed subject plus one moving part: a stylized model of the UPPER dental arch only, teeth fitted with small neat metal brackets, on a deep navy background — no other objects ever. One single two-part motion: the existing thin archwire gently lifts up and out of the bracket slots and slides away out of frame, and a fresh identical wire glides in and settles down into the same slots — then everything is still. The teeth and brackets never move or change; the wire is the only thing that moves. No hands, no instruments, no text; a faint cyan glint traces the new wire as it seats — the only visual effect. Camera holds one fixed three-quarter angle, no cuts. Soft studio light, calm space top and bottom for captions. Routine, calm, precise.
```

### `braces/outcome.mp4` — outcome (debond reveal — gets the freeze)
```
Clean 3D medical-education animation. ONE composed subject in frame the entire time: a stylized model of the UPPER dental arch only, front view, teeth now perfectly straight and fitted with small metal brackets and a wire — the finished-treatment starting state. One single motion: the wire and all the brackets release together and lift gently up and away out of frame, revealing the clean, perfectly aligned, natural ivory teeth beneath; the camera then eases back slightly and settles still on the finished smile line — this final frame holds. Nothing else appears or changes; no instruments, no hands, no text. A soft cyan highlight ring traces the new smile line once and fades — the only visual effect. Deep navy background, soft studio light, calm space top and bottom for captions. Radiant, resolved, quietly triumphant.
```

---

## CERAMIC BRACES (2 — reuse braces problem/deep-dive/journey/outcome)

### `ceramic_braces/treatment.mp4` — treatment
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the UPPER dental arch only, teeth slightly crowded, completely bare — nothing on any tooth at any point except as described — and (2) one small tooth-colored ceramic bracket, subtle and translucent, held by slim tweezers. One single motion: the tweezers bring the ceramic bracket in slowly and press it flat onto the center of the front surface of ONE front tooth, where it nearly disappears against the ivory enamel; the tweezers withdraw and everything is still. Only that one tooth receives a bracket; nothing appears on any other tooth. The teeth never move or change. Camera holds one fixed three-quarter angle. Deep navy background, soft studio light, faint cyan glint on the bracket edge only. Calm space top and bottom for captions. Subtle, discreet, premium.
```

### `ceramic_braces/discreet.mp4` — whatToExpect (the "barely visible" sell)
```
Clean 3D medical-education animation. ONE composed subject in frame the entire time: a stylized model of the UPPER dental arch only, every tooth fitted with small tooth-colored ceramic brackets and a thin pale wire that blend into the natural ivory enamel, on a deep navy background — no other objects ever. The only motion: the camera orbits slowly around the arch, one smooth continuous move, showing how the ceramic brackets nearly vanish against the teeth from every angle. Nothing appears, changes, or moves on the teeth; no instruments, no text. A very faint cyan rim light traces the arch — the only visual effect. Soft studio light, loop-friendly, calm space top and bottom for captions. Subtle, elegant, reassuring.
```

---

## EXPANDER (5)

### `expander/problem.mp4` — problem
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the UPPER dental arch only, viewed from directly above looking down at the biting surfaces, centered on a deep navy background — no other objects ever. The arch is visibly narrow — the two sides sit closer together than ideal, with gentle crowding at the front. The only motion: the camera pushes in slowly toward the narrow area, ending near the same composition for a seamless loop. A thin cyan highlight softly traces the narrow width across the arch — the only visual effect. Nothing appears, attaches, or changes on the teeth: no appliance, no instruments, no arrows, no text. Natural ivory teeth, soft studio light, calm space top and bottom for captions. Clear, honest, gentle.
```

### `expander/treatment.mp4` — treatment
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the UPPER dental arch only, viewed from below-front so the roof of the arch is visible, completely bare — and (2) one small, clean palatal expander appliance: a compact metal frame with a tiny central screw and four smooth arms. One single motion: the expander floats in from below, rises slowly, and settles into place across the roof of the arch, its arms resting gently against the inside of the back teeth — then everything is still. The teeth never move or change; nothing else appears; no hands, no instruments, no text. Camera holds one fixed angle, no cuts. Deep navy background, soft studio light, faint cyan glint on the appliance only. Calm space top and bottom for captions. Precise, gentle, reassuring.
```

### `expander/activation.mp4` — whatToExpect (the daily key turn)
```
Clean 3D medical-education animation. ONE composed subject plus one small moving part: a stylized model of the UPPER dental arch viewed from below-front with a clean palatal expander already seated across the roof of the arch — this is the starting state, no new objects except one slim key. One single motion: the slim key glides in, slots into the expander's tiny central screw, rotates one gentle quarter turn, and glides back out — then everything is still. The teeth and appliance never visibly move otherwise; nothing else appears; no hands, no text. A faint cyan glow pulses once on the screw as it turns — the only visual effect. Camera holds one fixed angle, no cuts. Deep navy background, soft studio light, calm space top and bottom for captions. Simple, routine, empowering.
```

### `expander/journey.mp4` — journey (the arch widens)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the UPPER dental arch only, viewed from directly above, centered on a deep navy background — no appliance, no other objects ever. At the start the arch is visibly narrow with gentle front crowding. The only motion: over the course of the shot the two sides of the arch very slowly and smoothly widen apart — a gentle time-lapse — and the crowded front teeth ease into comfortable spacing. Nothing appears on or around the teeth at any point: no appliance, no arrows, no glow, no text. The shot ends with a broad, roomy, even arch and holds still for a beat. Camera completely static, one fixed top-down angle. Natural ivory teeth, soft studio light, calm space top and bottom for captions. Smooth, satisfying, transformative.
```

### `expander/outcome.mp4` — outcome (gets the freeze)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the UPPER dental arch, now broad and roomy with every tooth comfortably spaced and aligned, on a deep navy background — no appliance, no other objects. The only motion: the camera eases back slowly and gently rises from a close view to reveal the complete, harmonious arch, then settles still — this final frame holds. A soft cyan highlight ring traces the smile line once and fades — the only visual effect; nothing appears or changes on the teeth. Natural ivory, soft studio light, calm space top and bottom for captions. Open, healthy, quietly triumphant.
```

---

## RETAINER (4 — problem beat can reuse braces/outcome or invisalign/journey-1 final state)

### `retainer/why.mp4` — problem/deepDive (why retention matters)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the UPPER dental arch only, front view, teeth perfectly straight and freshly aligned, on a deep navy background — no other objects ever. The only motion: the camera orbits slowly a few degrees around the arch, one smooth continuous move. As it orbits, a soft cyan glow gently pulses along the whole smile line, suggesting the teeth are newly settled and need protecting — the only visual effect. Nothing appears, attaches, or changes on the teeth at any point: no retainer, no instruments, no arrows, no text. Natural ivory teeth, soft studio light, loop-friendly, calm space top and bottom for captions. Calm, protective, reassuring.
```

### `retainer/treatment.mp4` — treatment (retainer seats)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the UPPER dental arch only, teeth perfectly straight, completely bare — nothing on them at any point except as described — and (2) one crystal-clear retainer tray. One single motion: the clear tray starts hovering above the arch, descends slowly straight down, and seats onto the teeth, wrapping over the biting edges and hugging every tooth like a glove — then everything is still. The teeth never move or change; the tray is the only thing that moves; nothing else appears. Camera holds one fixed three-quarter angle, no cuts. Deep navy background, soft studio light, faint cyan glint on the tray edge only. Calm space top and bottom for captions. Slow, precise, satisfying.
```

### `retainer/lifestyle.mp4` — whatToExpect (into the case at night)
```
Cinematic 3D medical-education animation. Exactly THREE objects in frame, nothing else ever: (1) a stylized model of the UPPER dental arch, natural ivory, with (2) one crystal-clear retainer tray seated on it at the start, and (3) a small clean protective case, lid open, resting on a soft-lit surface nearby. One continuous motion: the clear tray lifts gently up and off the arch, floats to the side, settles into the case, and the lid closes softly — the end. The teeth never move or change; nothing appears on them; no hands, no face, no instruments. The tray catches a faint cyan glint as it moves — the only visual effect. Camera holds one fixed angle. Deep navy background, soft studio light, calm space top and bottom for captions. Nightly, effortless, calm.
```

### `retainer/outcome.mp4` — outcome (gets the freeze)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the UPPER dental arch, front view, teeth perfectly straight and even — the protected long-term result — on a deep navy background, no retainer, no other objects. The only motion: the camera eases back slowly and settles still on the complete, harmonious smile line — this final frame holds. A soft cyan highlight ring traces the smile line once and fades — the only visual effect; nothing appears or changes. Natural ivory, soft studio light, calm space top and bottom for captions. Lasting, secure, quietly proud.
```

---

## CROWN (5)

### `crown/problem.mp4` — problem
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of a single molar tooth, floating centered on a deep navy background — no other teeth, no other objects ever. The tooth has one visible flaw: a thin dark crack line running down its side with a small chipped corner — honest but not graphic. The only motion: the camera pushes in slowly toward the crack, ending near the same composition for a seamless loop. A thin cyan highlight softly pulses along the crack — the only visual effect. Nothing appears, attaches, or changes on the tooth: no instruments, no text. Natural ivory, soft studio light, calm space top and bottom for captions. Clear, honest, calm.
```

### `crown/deep-dive.mp4` — deepDive
```
Clean 3D medical-education animation. ONE single object in frame the entire time: the same stylized single molar with a thin dark crack line, floating on deep navy — no other objects ever. The only motion: the camera orbits slowly around the tooth, one smooth continuous move, revealing the crack from different angles. A soft cyan glow gently brightens along the crack as the camera passes it — the only visual effect. The tooth never changes shape; nothing appears; no instruments, no arrows, no text. Natural ivory, soft studio light, loop-friendly, calm space top and bottom for captions. Precise, demystifying, reassuring.
```

### `crown/treatment.mp4` — treatment (crown caps the tooth)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of a single prepared molar — a smooth, slightly reduced, rounded tooth shape, natural ivory — and (2) one custom porcelain crown, a hollow tooth-shaped cap. One single motion: the crown starts hovering above the prepared tooth, descends slowly straight down, and seats over it completely, edges meeting the base cleanly — the tooth now looks whole and natural — then everything is still. Nothing else appears; the crown is the only thing that moves; no instruments, no hands, no text. Camera holds one fixed three-quarter angle, no cuts. Deep navy background, soft studio light, faint cyan glint on the crown edge as it seats — the only effect. Calm space top and bottom for captions. Precise, protective, satisfying.
```

### `crown/scan.mp4` — journey/whatToExpect (digital fit)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the LOWER dental arch only, natural ivory, and (2) one slim handheld intraoral scanner wand. One single motion: the wand glides slowly along the arch from one side to the other, projecting a soft grid of cyan structured light that ripples across each tooth surface as it passes — then exits frame. The teeth never move or change; nothing else appears; no hands, no text. The cyan scan light is the only visual effect. Camera drifts gently sideways following the wand, one continuous move. Deep navy background, soft studio light, calm space top and bottom for captions. High-tech, precise, calm.
```

### `crown/outcome.mp4` — outcome (gets the freeze)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the LOWER dental arch with the once-damaged molar now wearing its seamless porcelain crown — indistinguishable from its neighbors — on a deep navy background, no other objects. The only motion: the camera orbits slowly once and then settles still on the restored arch — this final frame holds. A soft cyan highlight ring pulses once around the crowned tooth and fades — the only visual effect; nothing appears or changes. Natural ivory, soft studio light, calm space top and bottom for captions. Whole, strong, quietly triumphant.
```

---

## FILLING (5)

### `filling/problem.mp4` — problem
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of a single molar viewed from above, its biting surface facing the camera, centered on deep navy — no other objects ever. On the biting surface there is one small, well-defined dark spot — a small cavity, honest but not graphic. The only motion: the camera pushes in slowly toward the spot, ending near the same composition for a seamless loop. A thin cyan ring softly pulses around the dark spot — the only visual effect. Nothing appears or changes: no instruments, no text. Natural ivory, soft studio light, calm space top and bottom for captions. Clear, matter-of-fact, calm.
```

### `filling/deep-dive.mp4` — deepDive (why treat it now)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: the same stylized single molar viewed from a three-quarter angle with one small dark spot on its biting surface, on deep navy — no other objects ever. Two gentle changes only, exactly as described: over the shot the dark spot very slowly grows slightly larger and deeper — a subtle time-lapse of untreated decay — while a soft cyan glow pulses at its edge. Nothing else changes; nothing appears; no instruments, no arrows, no text. The only camera motion is a very slow push-in. Natural ivory, soft studio light, calm space top and bottom for captions. Educational, gentle urgency, never scary.
```

### `filling/treatment.mp4` — treatment
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of a single molar viewed from above with a small clean prepared hollow on its biting surface (the cavity already cleaned out), on deep navy — no other objects ever. One single change, exactly as described: smooth tooth-colored composite material flows gently into the hollow, fills it level with the surrounding surface, and blends seamlessly until the surface looks whole — then everything is still. Nothing else appears or changes; no instruments, no hands, no text. A faint cyan shimmer passes over the finished surface once — the only visual effect. Camera completely static, one fixed top-down angle. Natural ivory, soft studio light, calm space top and bottom for captions. Smooth, restorative, satisfying.
```

### `filling/cure.mp4` — whatToExpect (setting the filling)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of a single molar with a freshly placed tooth-colored filling on its biting surface, and (2) one slim pen-shaped curing-light wand. One single motion: the wand enters from the side, its round tip glowing bright cyan-blue, hovers steadily over the filled surface casting a focused pool of light, then eases back out — everything still. Under the glow the filling's surface shifts from glossy-wet to set and solid — the only change. Nothing else appears; no hands, no text. Camera holds one fixed angle. Deep navy background, soft studio light, calm space top and bottom for captions. Quick, modern, reassuring.
```

### `filling/outcome.mp4` — outcome (gets the freeze)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of a single molar viewed from above, its biting surface now flawless and whole — the filling invisible, blended perfectly — on deep navy, no other objects. The only motion: the camera eases back slowly and settles still on the pristine tooth — this final frame holds. A soft cyan highlight ring pulses once around the tooth and fades — the only visual effect; nothing appears or changes. Natural ivory, soft studio light, calm space top and bottom for captions. Whole, healthy, quietly satisfying.
```

---

## ROOT CANAL (6)

### `root_canal/problem.mp4` — problem
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized semi-translucent model of a single tooth showing its two inner root canals as darker channels inside the glass-like ivory body, floating on deep navy — no other objects ever. Deep at one root tip, a small soft amber glow marks the irritated area — gentle, abstract, never graphic. The only motion: the camera pushes in slowly toward the glowing root tip, ending near the same composition for a seamless loop. The amber glow is the only visual effect. Nothing appears or changes: no instruments, no text. Soft studio light, calm space top and bottom for captions. Educational, calm, demystifying.
```

### `root_canal/deep-dive.mp4` — deepDive
```
Clean 3D medical-education animation. ONE single object in frame the entire time: the same stylized semi-translucent single tooth with visible inner canals and a small soft amber glow at one root tip, on deep navy — no other objects ever. The only motion: the camera orbits slowly around the tooth, one smooth continuous move, letting the inner canals catch the light from different angles. The amber glow pulses very gently — the only visual effect. The tooth never changes; nothing appears; no instruments, no arrows, no text. Soft studio light, loop-friendly, calm space top and bottom for captions. Precise, transparent, reassuring.
```

### `root_canal/clean.mp4` — treatment part 1 (cleaning the canal)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized semi-translucent single tooth with visible inner root canals, on deep navy — no other objects ever. One single change, exactly as described: starting from the top and moving smoothly down to the root tips, the dark cloudy material inside the canals gradually clears to clean, bright, empty channels — like a gentle wave of relief passing down the tooth — and the small amber glow at the root tip fades out completely. Nothing else changes; nothing appears; no instruments, no hands, no text. Camera holds one fixed angle with a very slow push-in. Soft studio light, calm space top and bottom for captions. Relieving, clean, calm.
```

### `root_canal/seal.mp4` — treatment part 2 (sealing)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized semi-translucent single tooth with clean, empty inner canals, on deep navy — no other objects ever. One single change, exactly as described: a smooth, warm-toned filler material rises gently from the root tips upward, filling both canals completely to the top, leaving the inside of the tooth solid and protected — then everything is still. Nothing else changes; nothing appears; no instruments, no text. A faint cyan shimmer passes over the tooth once at the end — the only extra effect. Camera completely static, one fixed angle. Soft studio light, calm space top and bottom for captions. Sealed, secure, satisfying.
```

### `root_canal/cap.mp4` — whatToExpect (crown protects it)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of a single treated tooth, smooth and slightly reduced on top, natural ivory, and (2) one porcelain crown cap. One single motion: the crown hovers above, descends slowly, and seats over the tooth completely, edges meeting cleanly — the tooth looks whole — then everything is still. Nothing else appears; no instruments, no hands, no text. A faint cyan glint traces the crown edge as it seats — the only visual effect. Camera holds one fixed three-quarter angle. Deep navy background, soft studio light, calm space top and bottom for captions. Protective, final, reassuring.
```

### `root_canal/outcome.mp4` — outcome (gets the freeze)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the LOWER dental arch with the once-troubled tooth now capped and indistinguishable from its neighbors, on deep navy — no other objects. The only motion: the camera orbits slowly once and settles still on the calm, healthy arch — this final frame holds. A soft cyan highlight ring pulses once around the restored tooth and fades — the only visual effect; nothing appears or changes. Natural ivory, soft studio light, calm space top and bottom for captions. Pain-free, whole, quietly triumphant.
```

---

## BRIDGE (5)

### `bridge/problem.mp4` — problem
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the LOWER dental arch only, natural ivory, with ONE tooth clearly missing — a clean, smooth gap in the row — on deep navy, no other objects ever. The only motion: the camera pushes in slowly toward the gap, ending near the same composition for a seamless loop. A thin cyan ring softly pulses around the empty space — the only visual effect. Nothing appears or changes: no instruments, no text. Soft studio light, calm space top and bottom for captions. Honest, calm, clear.
```

### `bridge/deep-dive.mp4` — deepDive (why fill the gap)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the LOWER dental arch with one missing tooth, on deep navy — no other objects ever. One gentle change, exactly as described: over the shot, the two teeth on either side of the gap very slowly tilt a few degrees inward toward the empty space — a subtle time-lapse of what happens when a gap is left — while a soft cyan glow marks the gap. Nothing else changes; nothing appears; no instruments, no arrows, no text. Camera holds one fixed angle with a very slow push-in. Natural ivory, soft studio light, calm space top and bottom for captions. Educational, gentle urgency, never scary.
```

### `bridge/treatment.mp4` — treatment (bridge seats)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the LOWER dental arch with one missing tooth and the two neighboring teeth prepared as smooth, slightly reduced shapes — and (2) one porcelain bridge: three connected tooth-shaped units, the outer two hollow like caps. One single motion: the bridge hovers above, descends slowly, and seats down — the outer caps sliding over the two prepared neighbors and the middle unit filling the gap perfectly — then everything is still. The row now looks complete. Nothing else appears; the bridge is the only thing that moves; no instruments, no hands, no text. Camera holds one fixed three-quarter angle. Deep navy background, soft studio light, faint cyan glint on the bridge edge — the only effect. Calm space top and bottom for captions. Seamless, precise, satisfying.
```

### `bridge/scan.mp4` — whatToExpect (digital fit — reuse of scan motif)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the LOWER dental arch with one missing tooth, natural ivory, and (2) one slim handheld intraoral scanner wand. One single motion: the wand glides slowly along the arch across the gap, projecting a soft grid of cyan structured light that ripples over the teeth and the empty space — then exits frame. The teeth never move or change; nothing else appears; no hands, no text. The cyan scan light is the only visual effect. Camera drifts gently sideways following the wand. Deep navy background, soft studio light, calm space top and bottom for captions. Custom, high-tech, calm.
```

### `bridge/outcome.mp4` — outcome (gets the freeze)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the LOWER dental arch, now complete — the gap filled by a seamless bridge indistinguishable from the natural teeth — on deep navy, no other objects. The only motion: the camera orbits slowly once and settles still on the unbroken row — this final frame holds. A soft cyan highlight sweeps once along the complete row and fades — the only visual effect; nothing appears or changes. Natural ivory, soft studio light, calm space top and bottom for captions. Complete, confident, quietly triumphant.
```

---

## IMPLANT (6)

### `implant/problem.mp4` — problem
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the LOWER dental arch only with ONE tooth clearly missing — a clean smooth gap — on deep navy, no other objects ever. The only motion: the camera pushes in slowly toward the gap, ending near the same composition for a seamless loop. A thin cyan ring softly pulses around the empty space — the only visual effect. Nothing appears or changes: no instruments, no text. Natural ivory, soft studio light, calm space top and bottom for captions. Honest, calm, clear.
```

### `implant/deep-dive.mp4` — deepDive (the root idea)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized cutaway side view showing one missing-tooth gap with smooth gum below it, semi-abstract and clean — no other objects ever. The only motion: the camera drifts very slowly sideways across the cutaway while a soft cyan outline of a root shape fades in below the gap, showing where a natural root would anchor — the only visual effect, gentle and diagram-like. Nothing else appears or changes; no instruments, no text, nothing graphic. Deep navy background, soft studio light, calm space top and bottom for captions. Educational, clean, demystifying.
```

### `implant/post.mp4` — treatment part 1 (the titanium post)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the LOWER dental arch with one missing-tooth gap, smooth clean gum at the space, and (2) one small polished titanium implant post with a gentle spiral thread. One single motion: the post descends slowly and vertically into the gap, rotating smoothly as it settles down into the gum until only its flat top remains visible, flush and neat — then everything is still. Clean and abstract — no cutting, nothing graphic, no instruments, no hands, no text; nothing else appears. Camera holds one fixed three-quarter angle. Deep navy background, soft studio light, faint cyan glint on the post — the only effect. Calm space top and bottom for captions. Precise, solid, reassuring.
```

### `implant/healing.mp4` — journey (integration over time)
```
Clean 3D medical-education animation. ONE composed subject in frame the entire time: a stylized model of the LOWER dental arch with the flat top of a titanium post sitting flush in the gum where a tooth was missing, on deep navy — no other objects ever. One gentle change, exactly as described: a soft cyan glow blooms slowly around the post and gradually settles and fades over the shot — a calm visual of the post fusing solidly in place over the healing months. Nothing else appears, moves, or changes; no instruments, no text. Camera completely static with a very slow push-in. Natural ivory teeth, soft studio light, calm space top and bottom for captions. Patient, steady, reassuring.
```

### `implant/crown.mp4` — treatment part 2 (the crown tops it)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the LOWER dental arch with a small neat connector post rising slightly from the gum where a tooth was missing, and (2) one custom porcelain crown. One single motion: the crown hovers above, descends slowly, and seats onto the connector — completing the row so the new tooth is indistinguishable from its neighbors — then everything is still. Nothing else appears; the crown is the only thing that moves; no instruments, no hands, no text. A faint cyan glint traces the crown as it seats — the only visual effect. Camera holds one fixed three-quarter angle. Deep navy background, soft studio light, calm space top and bottom for captions. Complete, natural, satisfying.
```

### `implant/outcome.mp4` — outcome (gets the freeze)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the LOWER dental arch, complete and even — the implant tooth indistinguishable from the rest — on deep navy, no other objects. The only motion: the camera orbits slowly once and settles still on the finished row — this final frame holds. A soft cyan highlight ring pulses once around the new tooth and fades — the only visual effect; nothing appears or changes. Natural ivory, soft studio light, calm space top and bottom for captions. Permanent, strong, quietly triumphant.
```

---

## EXTRACTION (5)

### `extraction/problem.mp4` — problem
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the LOWER dental arch only, natural ivory, with ONE tooth visibly compromised — darker in shade with a thin crack — on deep navy, no other objects ever. The only motion: the camera pushes in slowly toward the compromised tooth, ending near the same composition for a seamless loop. A thin cyan ring softly pulses around that one tooth — the only visual effect. Nothing appears or changes: no instruments, no text. Soft studio light, calm space top and bottom for captions. Honest, calm, never scary.
```

### `extraction/deep-dive.mp4` — deepDive
```
Clean 3D medical-education animation. ONE single object in frame the entire time: the same stylized LOWER arch with one darker, cracked tooth, on deep navy — no other objects ever. The only motion: the camera orbits slowly around the arch, one smooth continuous move, and a soft cyan glow gently brightens on the compromised tooth as the camera passes — the only visual effect. Nothing appears, moves, or changes on any tooth; no instruments, no arrows, no text. Soft studio light, loop-friendly, calm space top and bottom for captions. Clear, gentle, matter-of-fact.
```

### `extraction/treatment.mp4` — treatment (gentle release)
```
Clean 3D medical-education animation. ONE composed subject in frame the entire time: a stylized model of the LOWER dental arch with one darker compromised tooth, on deep navy — no other objects ever. One single motion, exactly as described: the compromised tooth gently loosens and lifts slowly straight up and out of the arch, floating up and out of frame, leaving a clean, smooth, calm space behind — no debris, nothing graphic — then everything is still. Nothing else moves or appears; no instruments, no hands, no text. Camera holds one fixed three-quarter angle. Soft studio light, a faint cyan shimmer over the space at the end — the only effect. Calm space top and bottom for captions. Gentle, clean, relieving.
```

### `extraction/healing.mp4` — whatToExpect (healing time-lapse)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the LOWER dental arch with one clean empty space where a tooth was removed, smooth gum at the spot, on deep navy — no other objects ever. One gentle change, exactly as described: over the shot the gum at the empty spot very slowly smooths and settles into a calm, healed contour — a soft healing time-lapse. Nothing else appears, moves, or changes; no instruments, no text. A soft cyan glow fades out over the site as it heals — the only visual effect. Camera completely static with a very slow push-in. Natural ivory, soft studio light, calm space top and bottom for captions. Restful, healing, reassuring.
```

### `extraction/outcome.mp4` — outcome (gets the freeze)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the LOWER dental arch, calm and healthy, the healed space settled and the surrounding teeth clean and even, on deep navy — no other objects. The only motion: the camera eases back slowly and settles still on the healthy arch — this final frame holds. A soft cyan highlight sweeps once along the row and fades — the only visual effect; nothing appears or changes. Natural ivory, soft studio light, calm space top and bottom for captions. Comfortable, healthy, forward-looking.
```

---

## WHITENING (5)

### `whitening/problem.mp4` — problem
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the upper front teeth, front view, their shade dull and slightly yellowed — honest, realistic staining, not exaggerated — on deep navy, no other objects ever. The only motion: the camera pushes in slowly toward the front teeth, ending near the same composition for a seamless loop. A thin cyan ring softly pulses around the dullest teeth — the only visual effect. Nothing appears or changes: no instruments, no text. Soft studio light, calm space top and bottom for captions. Honest, gentle, relatable.
```

### `whitening/treatment.mp4` — treatment (gel application)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the upper front teeth, dull ivory shade, and (2) one fine applicator brush. One single motion: the brush glides slowly across the front surfaces, laying down a thin, glossy, translucent gel layer that catches the light — tooth by tooth in one smooth pass — then the brush exits frame and everything is still. The teeth do not change color yet; nothing else appears; no hands, no text. A faint cyan shimmer on the wet gel — the only visual effect. Camera holds one fixed front angle. Deep navy background, soft studio light, calm space top and bottom for captions. Careful, spa-like, precise.
```

### `whitening/light.mp4` — deepDive/whatToExpect (activating light)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of the upper front teeth coated in a thin glossy gel layer, and (2) one slim panel-shaped whitening light. One single motion: the light panel glides in from the side, hovers steadily in front of the teeth casting an even cyan-blue glow across the gel, holds, then eases back out — everything still. The glow is the only visual effect; the teeth do not visibly change during this shot; nothing else appears; no hands, no text. Camera holds one fixed angle. Deep navy background, soft studio light, calm space top and bottom for captions. Modern, calm, clinical-lite.
```

### `whitening/journey.mp4` — journey (the shade lifts)
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of the upper front teeth, front view, starting at a dull, slightly yellowed shade, on deep navy — no gel, no lights, no other objects ever. One single change, exactly as described: over the course of the shot the shade of all the front teeth very slowly and evenly lifts from dull to a clean, bright, natural white — believable, never chalky or fluorescent — a smooth continuous transition. Nothing else appears, moves, or changes; no instruments, no text, no glow. Camera completely static, one fixed front-on angle. Soft studio light, calm space top and bottom for captions. Satisfying, fresh, transformative.
```

### `whitening/outcome.mp4` — outcome (gets the freeze)
```
Cinematic close-up of a naturally smiling mouth — lips and teeth only, framed from just below the nose to the chin, no full face, no identifiable person — the teeth now a clean, bright, natural white, believable and healthy, never chalky. Warm studio light, soft skin tones, shallow depth of field. The only motion: the camera drifts back slowly and settles composed and still on the bright smile — this final frame holds. A soft cyan highlight ring gently frames the smile line once and fades — the only visual effect. Deep navy background, calm space top and bottom for captions. Fresh, confident, radiant. No instruments, no hands, no text.
```

---

## DENTURES (5)

### `dentures/problem.mp4` — problem
```
Clean 3D medical-education animation. ONE single object in frame the entire time: a stylized model of a LOWER gum ridge with only a few scattered remaining teeth — several spaces where teeth are missing, smooth clean gum, honest but dignified, never bleak — on deep navy, no other objects ever. The only motion: the camera pushes in slowly, ending near the same composition for a seamless loop. A thin cyan highlight softly traces the empty spaces — the only visual effect. Nothing appears or changes: no instruments, no text. Soft studio light, calm space top and bottom for captions. Respectful, warm, hopeful.
```

### `dentures/product.mp4` — deepDive (what a denture is)
```
Cinematic product macro. ONE single object in frame the entire time: one complete, beautifully crafted full denture — natural ivory teeth set in a smooth, healthy pink-toned base — floating centered on a deep navy background; no mouth, no hands, no other objects ever. The only motion: the denture rotates slowly and continuously through the full shot, one smooth constant speed, seamless loop. Soft studio light catches the natural translucency of the teeth; a soft cyan rim-light traces the edge — the only visual effect. Nothing appears or changes. Jewelry-commercial presentation, shallow depth of field, calm space top and bottom for captions. Crafted, dignified, premium.
```

### `dentures/treatment.mp4` — treatment (the denture seats)
```
Clean 3D medical-education animation. Exactly TWO objects in frame, nothing else ever: (1) a stylized model of a smooth LOWER gum ridge with no teeth, clean and healthy, and (2) one complete full denture with natural ivory teeth on a pink-toned base. One single motion: the denture hovers above the ridge, descends slowly, and settles onto the gums with a gentle, secure fit — a complete, natural-looking row of teeth now in place — then everything is still. Nothing else appears; the denture is the only thing that moves; no instruments, no hands, no text. A faint cyan glint traces its edge as it seats — the only visual effect. Camera holds one fixed three-quarter angle. Deep navy background, soft studio light, calm space top and bottom for captions. Secure, transformative, dignified.
```

### `dentures/care.mp4` — whatToExpect (nightly care)
```
Cinematic 3D animation. Exactly TWO objects in frame, nothing else ever: (1) one complete full denture, natural ivory teeth on a pink-toned base, and (2) a clear glass of water on a soft-lit surface. One single motion: the denture descends gently into the glass and settles at the bottom, a few soft bubbles rising as it comes to rest — then everything still. Nothing else appears; no hands, no instruments, no text. A faint cyan glint through the glass — the only visual effect. Camera holds one fixed angle, shallow depth of field. Deep navy background, soft warm light, calm space top and bottom for captions. Nightly, calm, familiar.
```

### `dentures/outcome.mp4` — outcome (gets the freeze)
```
Cinematic close-up of a naturally smiling mouth — lips and teeth only, framed from just below the nose to the chin, no full face, no identifiable person — a complete, even, natural-looking smile, warm and believable, never artificial-looking. Warm studio light, soft skin tones, shallow depth of field. The only motion: the camera drifts back slowly and settles composed and still on the confident smile — this final frame holds. A soft cyan highlight ring gently frames the smile line once and fades — the only visual effect. Deep navy background, calm space top and bottom for captions. Confident, warm, renewed. No instruments, no hands, no text.
```
