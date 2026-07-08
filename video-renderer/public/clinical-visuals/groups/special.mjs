const G_SPECIAL = [
  {
    n: 8,
    key: "whitening",
    label: "Professional Whitening",
    token: "SMILE",
    blurb: "An in-office bleaching treatment lifts years of stains to brighten your natural enamel several shades in a single visit.",
    guardrails: {
      must: [
        "yellowed/stained but healthy enamel in the problem beat",
        "lips held clear with a retractor",
        "light-cured protective gingival barrier painted along the gumline",
        "professional hydrogen-peroxide gel applied evenly across the front teeth",
        "whitening activation light",
        "enamel brightening shade by shade over passes",
        "bright but natural smile at reveal"
      ],
      mustNot: [
        "drilling",
        "enamel damage",
        "cartoonish fluorescent pure-white teeth",
        "bleaching gel on unprotected gums"
      ],
      negTweak: "allow visibly yellowed/stained enamel in the problem beat, and a genuinely bright (but natural, not fluorescent) shade at the reveal."
    },
    setting: {
      setting: "calm modern dental operatory, soft daylight, patient reclined and awake",
      people: "masked dentist and assistant working gently around the patient",
      tray: "retractor, gingival barrier syringe, curing light, whitening gel syringes, activation lamp"
    },
    scenes: [
      {
        id: "whitening-01",
        slug: "establishing-operatory",
        name: "Establishing",
        sec: 7,
        tag: "ENV",
        prompt: "A calm, modern dental operatory bathed in soft morning light. A relaxed patient reclines in the chair, awake and at ease, while a masked dentist and assistant move gently around them. On the tray sit a lip retractor, syringes of gingival barrier and whitening gel, and a slim activation lamp waiting to be positioned. Warm reflections play across polished surfaces; everything feels unhurried and reassuring. The patient's natural smile is visible for a beat, the front teeth carrying a soft yellowed cast from years of everyday staining. Motion: a slow gentle push-in from the doorway toward the chair; quiet room tone, faint instrument clink. Mood: warm, welcoming, unrushed.",
        vo: "Today we're going to bring back the brightness that everyday coffee, tea, and time have slowly dimmed.",
        motion: "slow gentle push-in from doorway toward chair; quiet room tone, faint instrument clink."
      },
      {
        id: "whitening-02",
        slug: "isolate-gingival-barrier",
        name: "Isolate & Protect Gums",
        sec: 7,
        tag: "MACRO",
        prompt: "An extreme intraoral close-up. A soft lip retractor holds the lips and cheeks clear, exposing the full front arch of healthy but yellowed teeth against pink, healthy gums. A fine applicator paints a smooth ribbon of protective gingival barrier gel precisely along the gumline, tracing each tooth's collar. A blue curing light sweeps across and the barrier sets firm and rubbery, sealing the delicate gum tissue away from the teeth. The enamel itself stays untouched, its stained surface glistening under wet light. Motion: slow lateral tracking along the gumline following the applicator, then a brief hold as the curing light passes; soft suction hum, gentle curing-light beep. Mood: careful, meticulous, protective.",
        vo: "First we tuck a soft protective barrier along your gums, so all the whitening power stays exactly where we want it.",
        motion: "slow lateral tracking along gumline following applicator, brief hold under curing light; soft suction hum, gentle curing-light beep."
      },
      {
        id: "whitening-03",
        slug: "zoom-to-enamel",
        name: "Zoom Transition",
        sec: 6,
        tag: "BRIDGE",
        prompt: "Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the sealed gumline and the exposed front teeth, sliding past the glossy protective barrier and the wet sheen of enamel, and resolves into a clean wet intraoral macro of a single stained front tooth surface with its faint yellow cast catching the light. Motion: a fast, smooth accelerating push-in that decelerates as the enamel fills the frame. Seamless, immersive.",
        vo: "(transition — no VO / soft musical swell)",
        motion: "fast accelerating push-in decelerating onto enamel; soft musical swell."
      },
      {
        id: "whitening-04",
        slug: "apply-gel",
        name: "Apply Whitening Gel",
        sec: 7,
        tag: "MACRO",
        prompt: "An extreme intraoral close-up of the front teeth, gums sealed under a set barrier. A syringe tip glides across each tooth, laying down an even, glistening layer of clear hydrogen-peroxide whitening gel that coats the enamel in a smooth, uniform film. The gel settles into a thin translucent sheen, hugging the curved surfaces without touching the protected gums. Tiny highlights sparkle where the light catches the fresh coating. The stained enamel beneath waits, still carrying its yellow tone. Motion: smooth lateral glide following the syringe tip tooth to tooth, then a slow settle as the gel evens out; faint syringe-squeeze sound, soft wet sheen. Mood: precise, deliberate, anticipatory.",
        vo: "Now a professional whitening gel is spread evenly across each front tooth, ready to lift the stains from within.",
        motion: "smooth lateral glide following syringe tip, slow settle as gel evens out; faint syringe-squeeze, soft wet sheen."
      },
      {
        id: "whitening-05",
        slug: "activation-light",
        name: "Activation Light",
        sec: 7,
        tag: "MACRO",
        prompt: "An extreme intraoral macro as a broad whitening activation lamp swings into position and bathes the gel-coated front teeth in a cool, even glow. The clear gel brightens under the light, tiny effervescent bubbles rising along the enamel as the active oxygen begins working. The barrier keeps the gums shielded in shadow while the teeth are lit edge to edge. The glow is clinical and steady, reflecting in the wet surfaces. Motion: a slow arc as the lamp settles into place, then a gentle hold with faint shimmering bubbles across the enamel; low lamp hum, soft ambient tone. Mood: focused, quietly powerful, clinical calm.",
        vo: "A gentle activation light switches the gel on, waking up the whitening and letting it work deep into the enamel.",
        motion: "slow arc as lamp settles, gentle hold with shimmering bubbles; low lamp hum, soft ambient tone."
      },
      {
        id: "whitening-06",
        slug: "shade-lifting",
        name: "Shade Lifting",
        sec: 8,
        tag: "MACRO",
        prompt: "An extreme intraoral macro of the front teeth over successive whitening passes. Frame by frame the enamel lifts through the shade range, the tired yellow cast fading pass after pass into a clean, natural brightness. The change is gradual and believable, each tooth clearing to a warmer, whiter tone while keeping its natural translucency at the edges. Light plays across the smoothing surfaces as the stains release. The result reads unmistakably brighter yet still real, never chalky or fluorescent. Motion: a slow steady push across the arch as the shade visibly climbs pass by pass; soft rising ambient swell, faint gentle chime marking each pass. Mood: satisfying, transformative, honest.",
        vo: "Pass by pass, you can watch the shade climb — the yellow lifting away and a natural brightness rising in its place.",
        motion: "slow steady push across arch as shade climbs pass by pass; soft rising ambient swell, faint gentle chime."
      },
      {
        id: "whitening-07",
        slug: "reveal-bright-smile",
        name: "Reveal",
        sec: 8,
        tag: "MACRO",
        prompt: "An extreme intraoral macro pulls back as the retractor and barrier are removed, revealing the finished front teeth against healthy pink gums. The enamel is dazzling and clean, several shades brighter than before, yet unmistakably natural — warm highlights, soft translucency at the edges, real texture intact. The patient's lips relax back into a full, easy smile that glows in the soft operatory light. Everything looks fresh, healthy, and genuinely theirs, just brighter. Motion: a smooth pull-back and slow lift as the retractor releases into a full relaxed smile, ending on a gentle settle; warm musical resolve, soft satisfied breath. Mood: joyful, confident, radiant.",
        vo: "And there it is — brighter, cleaner, and still completely yours. That's a smile you'll want to show off.",
        motion: "smooth pull-back and slow lift into full relaxed smile, gentle settle; warm musical resolve, soft satisfied breath."
      }
    ]
  },
  {
    n: 13,
    key: "sleep_apnea",
    label: "Sleep Apnea Oral Appliance",
    token: "SMILE",
    blurb: "A custom-fit device worn at night gently holds your lower jaw slightly forward, keeping your airway open so you can breathe and rest — a dental appliance, not surgery.",
    guardrails: {
      must: [
        "side-profile cutaway of the airway narrowing/collapsing at the back of the throat with a soft dimming glow (problem)",
        "digital scan or impression of the teeth",
        "custom clear two-piece appliance fitting over upper and lower teeth",
        "appliance seated and gently advancing the lower jaw forward",
        "side-profile cutaway of the airway opening with a soft glow of restored airflow",
        "rested, easy-breathing reveal"
      ],
      mustNot: [
        "any surgery",
        "CPAP mask",
        "breathing tubes",
        "general anesthesia",
        "bulky or metal-looking device"
      ],
      negTweak: "keep the appliance clear, slim, and custom-fit; airway cutaways calm and anatomical, never distressing."
    },
    setting: {
      setting: "calm modern dental operatory with a chairside scanner, soft daylight, patient awake and comfortable",
      people: "masked dentist and assistant guiding the patient, unhurried",
      tray: "intraoral scanner wand, custom clear two-piece oral appliance, mirror, soft cloth"
    },
    scenes: [
      {
        id: "sleep-01",
        slug: "establishing-operatory",
        name: "Establishing",
        sec: 7,
        tag: "ENV",
        prompt: "A calm modern dental operatory in soft daylight. A relaxed, fully awake patient sits comfortably in the chair as a masked dentist speaks gently beside them, an assistant nearby. On the tray rests a slim chairside scanner wand and a small, clear two-piece oral appliance catching the light. The mood is quiet and reassuring — this is a conversation about sleep and breathing, not a procedure. Everything feels unhurried, clinical, and kind. Motion: a slow gentle push-in from across the room toward the patient and the small clear appliance on the tray; soft room tone, faint quiet murmur. Mood: calm, caring, reassuring.",
        vo: "If your nights feel restless and your sleep never quite refreshes you, the cause might be your airway — and we can help.",
        motion: "slow gentle push-in toward patient and clear appliance on tray; soft room tone, faint quiet murmur."
      },
      {
        id: "sleep-02",
        slug: "airway-problem-cutaway",
        name: "Airway Problem Cutaway",
        sec: 8,
        tag: "MACRO",
        prompt: "A clean anatomical side-profile cutaway of a sleeping head, people-free and calm. The airway is shown clearly from nose and mouth down past the base of the tongue toward the throat. As sleep deepens, the soft tissue at the back of the throat relaxes and the airway narrows, then partly collapses, the open channel pinching closed. A soft glow that once traced the flowing air dims and fades at the blockage, signaling breath struggling to pass. The illustration stays gentle and educational, never distressing. Motion: a slow drift along the airway from nose to throat, then a quiet hold as the passage narrows and the glow dims; low ambient tone, faint muffled breath. Mood: calm, explanatory, quietly concerning.",
        vo: "As you drift into deep sleep, the tissues at the back of your throat relax — and for many people the airway narrows or collapses, cutting off easy breathing.",
        motion: "slow drift along airway nose to throat, quiet hold as passage narrows and glow dims; low soft ambient tone, faint muffled breath."
      },
      {
        id: "sleep-03",
        slug: "digital-scan",
        name: "Digital Scan",
        sec: 7,
        tag: "ENV",
        prompt: "In the calm operatory, a masked dentist glides a slim intraoral scanner wand along the patient's upper and lower teeth. On a nearby monitor, a precise 3D digital model of both arches builds up in real time, surfaces filling in tooth by tooth in soft glowing color. The awake patient rests comfortably as the wand moves smoothly, no discomfort, no mess. The scan captures every contour needed to build a device made only for them. Motion: a smooth follow of the scanner wand across the arch, cutting to the 3D model assembling on screen; soft scanner chirp, quiet build-up tone. Mood: precise, modern, effortless.",
        vo: "First we take a quick digital scan of your teeth — no mess, no impressions — so your appliance can be built to fit only you.",
        motion: "smooth follow of scanner wand across arch, cut to 3D model assembling on screen; soft scanner chirp, quiet build-up tone."
      },
      {
        id: "sleep-04",
        slug: "fit-appliance",
        name: "Fit the Appliance",
        sec: 7,
        tag: "MACRO",
        prompt: "An extreme intraoral close-up as a custom clear two-piece oral appliance is brought toward the teeth. Each slim, transparent tray is shaped to hug the upper and lower arch precisely, low-profile and glassy rather than bulky. The upper piece seats over the top teeth and the lower piece over the bottom, their surfaces meeting cleanly. Light passes through the clear material, showing the natural teeth beneath. It looks comfortable and discreet, nothing metal or heavy about it. Motion: a smooth approach and settle as each clear tray seats over its arch, ending on a clean meeting of the two pieces; soft click of seating, gentle ambient tone. Mood: reassuring, precise, comfortable.",
        vo: "The result is a slim, clear appliance in two pieces — one hugging your upper teeth, one your lower — comfortable enough to sleep in.",
        motion: "smooth approach and settle as each clear tray seats over its arch, clean meeting of the pieces; soft click of seating, gentle ambient tone."
      },
      {
        id: "sleep-05",
        slug: "seat-and-advance",
        name: "Seat & Advance Jaw",
        sec: 7,
        tag: "MACRO",
        prompt: "A clean anatomical side-profile cutaway, people-free, showing the clear two-piece appliance now seated over the upper and lower teeth. Gently, the appliance guides the lower jaw a small, controlled distance forward, the mandible easing ahead of its resting position. As the jaw advances, the base of the tongue and the soft tissue at the back of the throat are drawn slightly forward with it, and the airway channel behind them begins to open. The motion is subtle, mechanical, and gentle — a small shift with a big effect. Motion: a slow, steady advance of the lower jaw forward with the appliance, tissues easing ahead and the airway starting to widen; soft mechanical ease, low reassuring tone. Mood: gentle, purposeful, illuminating.",
        vo: "While you sleep, it holds your lower jaw just slightly forward — and that small shift pulls the tissues away from your airway.",
        motion: "slow steady advance of lower jaw forward with appliance, tissues easing ahead as airway starts to widen; soft mechanical ease, low reassuring tone."
      },
      {
        id: "sleep-06",
        slug: "airway-opens-cutaway",
        name: "Airway Opens",
        sec: 8,
        tag: "MACRO",
        prompt: "The same calm side-profile cutaway of the head, now with the airway held open. With the lower jaw advanced by the clear appliance, the once-pinched channel at the back of the throat is now a clear, open passage from nose and mouth down toward the lungs. A soft glow of restored airflow returns, tracing smoothly and steadily through the open airway, brightening where it had dimmed before. The whole illustration feels relieved and easy, breath flowing without struggle. Motion: a smooth glow of returning airflow flowing down through the newly open airway, brightening as it passes; soft warm ambient swell, gentle steady breath. Mood: relieved, restorative, hopeful.",
        vo: "With the airway held open, air flows freely again — quiet, steady breathing all night long.",
        motion: "smooth glow of returning airflow down through open airway, brightening as it passes; soft warm ambient swell, gentle steady breath."
      },
      {
        id: "sleep-07",
        slug: "reveal-rested",
        name: "Reveal",
        sec: 8,
        tag: "ENV",
        prompt: "A soft, warm scene: the patient, now rested and at ease, breathes easily with a calm, refreshed expression, the small clear appliance resting on a soft cloth beside them in the gentle operatory light. There is a sense of a full night's sleep restored — relaxed shoulders, easy breath, a quiet contented smile. No mask, no tubes, nothing bulky — just a simple, discreet device and a person who finally sleeps well. Motion: a slow gentle drift toward the rested patient, ending on a soft settle as they breathe easily; warm musical resolve, soft calm breath. Mood: peaceful, restored, hopeful.",
        vo: "No surgery, no mask, no tubes — just a small custom device, and the deep, easy rest you've been missing.",
        motion: "slow gentle drift toward rested patient, soft settle as they breathe easily; warm musical resolve, soft calm breath."
      }
    ]
  },
  {
    n: 11,
    key: "full_mouth_rehab",
    label: "Full Mouth Rehabilitation",
    token: "SMILE",
    blurb: "A comprehensive, staged rebuild of a worn or broken smile — combining implants, crowns, and bite restoration into one healthy, functional set of teeth.",
    guardrails: {
      must: [
        "full arch with widespread wear, cracks, and a few missing teeth (calm, not gory)",
        "treatment-plan overview via a gentle digital scan / 3D model of the whole arch",
        "an implant seated in bone where a tooth is missing",
        "a crown lowering onto a prepared tooth",
        "the bite/occlusion restored to even contact across the arch",
        "a fully rebuilt, even, natural, healthy full-arch smile at reveal",
        "curated montage of key stages, same mouth throughout"
      ],
      mustNot: [
        "implausible instant transformation without showing stages",
        "fluorescent fake-looking teeth",
        "gore"
      ],
      negTweak: "keep the problem arch calm and clinical, never gory; teeth natural and consistent across every stage."
    },
    setting: {
      setting: "calm modern dental operatory with a chairside scanner and monitor, soft daylight, patient reclined and awake",
      people: "masked dentist and assistant working methodically, unhurried",
      tray: "intraoral scanner wand, implant components, prepared crowns, articulating paper, mirror"
    },
    scenes: [
      {
        id: "fmr-01",
        slug: "establishing-operatory",
        name: "Establishing",
        sec: 7,
        tag: "ENV",
        prompt: "A calm, modern dental operatory in soft daylight. A relaxed, awake patient reclines in the chair while a masked dentist and assistant work methodically nearby, a large monitor glowing beside them. On the tray sit a slim scanner wand, small implant components, and a few prepared crowns waiting in order. The atmosphere is thoughtful and unhurried — this is a careful, comprehensive plan, not a rushed fix. Warm light plays across the polished surfaces. Motion: a slow gentle push-in from across the room toward the patient and the organized tray of stages; quiet room tone, faint instrument clink. Mood: measured, reassuring, purposeful.",
        vo: "When years of wear, cracks, and missing teeth add up, we don't just patch one problem — we rebuild the whole smile, step by step.",
        motion: "slow gentle push-in toward patient and organized tray; quiet room tone, faint instrument clink."
      },
      {
        id: "fmr-02",
        slug: "assess-full-arch",
        name: "Assess Full Arch",
        sec: 7,
        tag: "MACRO",
        prompt: "An extreme intraoral close-up surveying a full arch that has taken years of wear. Several teeth are worn flat and short, a couple carry fine cracks running down their surfaces, and a few gaps sit where teeth have been lost. The gums are healthy and pink, the presentation calm and clinical rather than distressing. The camera moves gently across the arch, taking honest stock of everything that needs rebuilding, each tooth catching the wet light. Motion: a slow lateral survey along the full arch, pausing briefly at a worn tooth, a cracked one, and an empty gap; soft ambient tone, gentle wet sheen. Mood: honest, clinical, calm.",
        vo: "First we take honest stock of everything — the teeth worn down, the cracks, and the gaps where teeth are missing.",
        motion: "slow lateral survey along full arch, pausing at worn tooth, cracked tooth, and gap; soft ambient tone, gentle wet sheen."
      },
      {
        id: "fmr-03",
        slug: "plan-scan",
        name: "Plan Scan",
        sec: 7,
        tag: "ENV",
        prompt: "In the operatory, a masked dentist sweeps a slim scanner wand across the patient's full arch while a detailed 3D model builds on the monitor in soft glowing color. The digital arch assembles tooth by tooth, and over it a treatment-plan overview takes shape — highlights marking where an implant will go, where crowns will restore worn teeth, and how the bite will come back into balance. The awake patient rests easily as the whole roadmap comes together on screen. Motion: a smooth follow of the scanner wand, cutting to the 3D model assembling and the plan highlights appearing across the arch; soft scanner chirp, quiet build-up tone. Mood: modern, clear, confident.",
        vo: "A digital scan builds a full 3D model of your mouth, so together we can map out every stage before we begin.",
        motion: "smooth follow of scanner wand, cut to 3D model assembling with plan highlights; soft scanner chirp, quiet build-up tone."
      },
      {
        id: "fmr-04",
        slug: "zoom-into-arch",
        name: "Zoom Transition",
        sec: 6,
        tag: "BRIDGE",
        prompt: "Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the planned arch, sliding past the glowing treatment-plan highlights and the wet sheen of healthy gums, and resolves into a clean wet intraoral macro of the empty socket site where a missing tooth is about to be rebuilt. Motion: a fast, smooth accelerating push-in that decelerates as the bone and gap fill the frame. Seamless, immersive.",
        vo: "(transition — no VO / soft musical swell)",
        motion: "fast accelerating push-in decelerating onto the empty socket site; soft musical swell."
      },
      {
        id: "fmr-05",
        slug: "implant-stage",
        name: "Implant Stage",
        sec: 8,
        tag: "MACRO",
        prompt: "A clean anatomical macro cutaway at the site of a missing tooth, showing healthy jawbone beneath pink gum. A slim titanium implant post is guided precisely into the prepared channel in the bone, seating firmly and standing as a stable new root where the tooth was lost. The surrounding bone and tissue stay calm and healthy, the illustration clinical and free of any gore. This is the foundation stage — a solid anchor set for what will be rebuilt on top. Motion: a slow, controlled descent of the implant post into the bone, settling firmly into place with a subtle stabilizing hold; low steady tone, soft mechanical ease. Mood: solid, grounding, precise.",
        vo: "Where a tooth is missing, a small titanium implant is placed into the bone — a strong new root to build on.",
        motion: "slow controlled descent of implant post into bone, firm settle with stabilizing hold; low steady tone, soft mechanical ease."
      },
      {
        id: "fmr-06",
        slug: "crown-stage",
        name: "Crown Stage",
        sec: 8,
        tag: "MACRO",
        prompt: "An extreme intraoral macro at a neighboring prepared tooth, its worn structure shaped into a clean, rounded core ready to receive a restoration. A custom crown, natural in color and contour, lowers slowly onto the prepared tooth, its edges meeting the gumline precisely and its surface blending seamlessly with the arch. The crown seats fully, restoring the tooth's original height and shape. Light catches its lifelike translucency — natural, not fluorescent — matching the teeth around it. Motion: a slow vertical descent of the crown onto the prepared tooth, easing into a precise seat at the gumline; soft settling click, gentle ambient tone. Mood: restorative, satisfying, exact.",
        vo: "Worn and cracked teeth are rebuilt with custom crowns, each one lowered into place to restore its natural shape and strength.",
        motion: "slow vertical descent of crown onto prepared tooth, precise seat at gumline; soft settling click, gentle ambient tone."
      },
      {
        id: "fmr-07",
        slug: "bite-restoration",
        name: "Bite Restoration",
        sec: 8,
        tag: "MACRO",
        prompt: "An extreme intraoral macro from the side as the rebuilt upper and lower arches come together and the bite is restored to even, balanced contact. Thin articulating marks bloom evenly across the chewing surfaces, showing each tooth now meeting its partner with matched, comfortable pressure across the whole arch rather than crashing on a few worn spots. The teeth close and open smoothly, the occlusion harmonized and functional. Everything looks consistent — the same mouth, now working as one. Motion: a smooth close of the arches into even contact, with balanced marks appearing across the surfaces, then a gentle open; soft contact tap, low reassuring tone. Mood: balanced, harmonious, complete.",
        vo: "Finally we restore your bite, so every tooth meets evenly again — comfortable, balanced, and built to last.",
        motion: "smooth close of arches into even contact with balanced marks appearing, gentle open; soft contact tap, low reassuring tone."
      },
      {
        id: "fmr-08",
        slug: "reveal-full-smile",
        name: "Reveal",
        sec: 8,
        tag: "MACRO",
        prompt: "An extreme intraoral macro pulls back to reveal the fully rebuilt arch, then widens to the patient's complete smile. Every tooth is restored — implants and crowns blended seamlessly into an even, natural, healthy full arch, no gaps, no wear, no cracks. The teeth are bright but believable, with real texture and translucency, framed by healthy pink gums. The patient's lips ease into a full, confident smile in the warm operatory light — whole, functional, and unmistakably theirs. Motion: a smooth pull-back from the arch into a full relaxed smile, ending on a gentle settle; warm musical resolve, soft satisfied breath. Mood: triumphant, whole, radiant.",
        vo: "And here's the result — one complete, healthy smile, rebuilt to look natural and work beautifully for years to come.",
        motion: "smooth pull-back from arch into full relaxed smile, gentle settle; warm musical resolve, soft satisfied breath."
      }
    ]
  }
];

export default G_SPECIAL;
