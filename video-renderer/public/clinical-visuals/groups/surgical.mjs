const G_SURGICAL = [
  {
    n: 3,
    key: "root_canal",
    label: "Root Canal Therapy",
    token: "SMILE",
    blurb: "The infected, inflamed soft pulp inside a tooth is gently removed, the tiny canals cleaned, shaped, and sealed — saving the natural tooth instead of losing it.",
    guardrails: {
      must: [
        "rubber-dam isolation over the numb tooth",
        "cutaway revealing inner pulp chamber and canals with a soft red inflamed glow",
        "small access opening made through the crown with a handpiece",
        "fine flexible files cleaning and shaping canals with gentle irrigation, red glow fading to calm",
        "canals filled with warm tooth-colored gutta-percha and sealer",
        "access sealed, tooth saved, note a crown often follows"
      ],
      mustNot: [
        "gore or blood beyond a soft anatomical glow",
        "pulling or extracting the tooth",
        "files floating outside the canals",
        "general anesthesia"
      ],
      negTweak: "no blood pooling, no extracted tooth, no floating instruments, no on-screen text"
    },
    setting: {
      setting: "calm dental operatory, patient awake under local anesthesia",
      people: "masked dentist and assistant",
      tray: "rubber dam clamp and frame, low-speed handpiece, fine endodontic files, irrigation syringe, gutta-percha points, sealer"
    },
    scenes: [
      {
        id: "rc-1",
        slug: "root-canal-establishing",
        name: "Establishing",
        sec: 6,
        tag: "ENV",
        prompt: "A calm, softly lit dental operatory. A relaxed patient reclines in the chair, awake and comfortable, while a masked dentist and assistant lean in with quiet focus over the lower jaw. Warm overhead light pools on the open mouth; gloved hands rest steady near a molar that aches deep inside. The mood is reassuring and unhurried, the room quiet except for soft instrument sounds. Everything reads clean, controlled, and gentle, framing the tooth we are about to save. Motion: a slow, smooth push-in from the room toward the patient's mouth as the dentist settles into position; ambient operatory hum and a soft suction whisper. Calm, trustworthy, clinical.",
        vo: "Today we're going to save this tooth from the inside — no need to remove it.",
        motion: "slow smooth push-in from room toward the mouth; ambient operatory hum and soft suction whisper."
      },
      {
        id: "rc-2",
        slug: "root-canal-isolate",
        name: "Isolate",
        sec: 7,
        tag: "ENV",
        prompt: "Close in the operatory, the dentist stretches a thin rubber dam over the numb molar and clips it in place with a small clamp, isolating just this tooth in a clean, dry, protected window. The surrounding gums and neighboring teeth disappear beneath the soft blue-green sheet, leaving only the target tooth exposed and spotlit under the operatory light. Gloved fingertips smooth the dam flat; the field looks tidy and sealed, ready for careful work. The patient rests quietly, fully numb and calm. Motion: a gentle tilt-down as the rubber dam is set and the clamp snaps softly into place, the frame settling; light rubber snap and quiet breathing. Precise, clean, reassuring.",
        vo: "First we place a soft shield around the tooth, keeping it clean and dry while you rest.",
        motion: "gentle tilt-down as the dam is set and clamp seats; light rubber snap and quiet breathing."
      },
      {
        id: "rc-3",
        slug: "root-canal-zoom-crosssection",
        name: "Zoom into cross-section",
        sec: 6,
        tag: "BRIDGE",
        prompt: "Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the isolated molar's crown, sliding past the wet enamel and dentin until the outer tooth turns translucent, and resolves into a clean cutaway cross-section of the tooth revealing the hollow pulp chamber and slender root canals branching down into the jaw. Motion: a fast, smooth accelerating push-in that dives through the crown as the enamel fades to a glassy cross-section, the inner canals coming into focus. Seamless, immersive.",
        vo: "(transition — no VO / soft musical swell)",
        motion: "fast smooth accelerating push-in through the crown into a cross-section; soft musical swell."
      },
      {
        id: "rc-4",
        slug: "root-canal-problem-inflamed-pulp",
        name: "Problem — inflamed pulp",
        sec: 7,
        tag: "MACRO",
        prompt: "Extreme cutaway cross-section at tooth scale, people-free, the enamel and dentin rendered as glassy translucent layers. Deep inside the pulp chamber and down the narrow root canals, a soft red glow pulses gently — the inflamed, irritated pulp that is the true source of the ache. Fine nerve and vessel threads shimmer faintly within the warm glow, tracing the canals into the roots. The anatomy is precise and calm, never bloody, the red reading as an inner light rather than a wound. Motion: a slow orbit around the cross-section as the red glow softly pulses in time with a faint heartbeat; a low warm tone and quiet pulse. Intimate, anatomical, revealing.",
        vo: "The pain comes from deep inside, where the tiny nerve inside the tooth has become inflamed.",
        motion: "slow orbit around the cross-section as the red glow softly pulses; low warm tone and quiet pulse."
      },
      {
        id: "rc-5",
        slug: "root-canal-access-opening",
        name: "Access opening",
        sec: 7,
        tag: "MACRO",
        prompt: "Extreme intraoral macro on the molar's chewing surface, enamel wet and detailed under bright light. A fine dental bur on a water-cooled handpiece gently creates a small, neat access opening straight down through the crown, a thin water spray misting as it works. The opening deepens smoothly until it reaches the hidden pulp chamber below, revealing the soft red glow within through the tiny window. The work is controlled and minimal, taking away only what's needed to reach the canals. Motion: the bur descends in small, steady passes with a light water spray, then eases back as the chamber opens; a soft high handpiece whir and fine water mist. Careful, clinical, precise.",
        vo: "We make a tiny opening in the top of the tooth to reach the space inside.",
        motion: "bur descends in steady passes with light water spray, then eases back; soft handpiece whir and water mist."
      },
      {
        id: "rc-6",
        slug: "root-canal-clean-shape-canals",
        name: "Clean and shape canals",
        sec: 8,
        tag: "MACRO",
        prompt: "Extreme cutaway at tooth scale, the pulp chamber now open. Fine, flexible endodontic files slide down each narrow root canal in slow, controlled passes, gently cleaning and shaping the walls while a small irrigation stream flushes the canals clear. As the files work, the soft red inflamed glow deep in the roots fades and cools to a calm, healthy tone. The files stay perfectly inside the canals, tracing their curves; the field looks tidy, wet, and increasingly settled. Motion: the files move in smooth in-and-out passes down the canals with a gentle irrigation flow, the red glow dimming to calm as they finish; a faint file whisper and soft liquid rinse. Meticulous, soothing, satisfying.",
        vo: "Gentle instruments clean out the inflamed tissue and rinse the canals until everything is calm and clear.",
        motion: "files move in smooth passes down the canals with gentle irrigation, red glow dimming; faint file whisper and soft rinse."
      },
      {
        id: "rc-7",
        slug: "root-canal-fill-gutta-percha",
        name: "Fill with gutta-percha",
        sec: 7,
        tag: "MACRO",
        prompt: "Extreme cutaway at tooth scale, the cleaned canals now smooth and calm. Warm, tooth-colored gutta-percha points are eased down into each canal and gently compacted, filling the roots completely along with a thin coat of sealer, leaving no empty space. The filled canals take on a solid, sealed, seamless look from the root tips up into the chamber, the tooth's inner architecture fully restored. Motion: the gutta-percha slides smoothly into the canals and is softly compacted, the filled roots glowing warm and settled; a soft muffled press and quiet warmth. Restorative, clean, reassuring.",
        vo: "Then we fill the cleaned canals with a soft, tooth-colored material that seals them completely.",
        motion: "gutta-percha slides into the canals and is softly compacted; soft muffled press and quiet warmth."
      },
      {
        id: "rc-8",
        slug: "root-canal-reveal-sealed-tooth",
        name: "Reveal — sealed tooth",
        sec: 8,
        tag: "MACRO",
        prompt: "Extreme intraoral macro pulling back from the molar, the small access opening now filled and smoothed flush with a tidy restoration on the chewing surface. The tooth sits clean, dry, and whole, no longer glowing red inside — calm, sealed, and saved in its place among healthy neighbors. A faint translucent ghost of the filled canals lingers for a beat beneath the surface, then the view settles on the finished, comfortable tooth. Motion: a smooth pull-back and slow settle as the sealed access catches the light and the inner glow stays calm; a gentle resolving chime and quiet room tone. Complete, relieved, reassuring.",
        vo: "Your natural tooth is saved and comfortable again — and we'll often add a crown to protect it for the long run.",
        motion: "smooth pull-back and slow settle as the sealed access catches the light; gentle resolving chime and quiet room tone."
      }
    ]
  },
  {
    n: 5,
    key: "extraction",
    label: "Tooth Extraction",
    token: "SMILE",
    blurb: "A tooth that can no longer be saved is gently loosened and eased out of its socket in one calm, controlled motion — done while you're comfortably numb and awake.",
    guardrails: {
      must: [
        "patient numb and awake under local anesthesia",
        "a visibly damaged, non-restorable tooth in the problem beat",
        "a dental elevator gently loosening and luxating the tooth in its socket",
        "forceps grasping and easing the tooth out in one calm controlled motion",
        "a clean healthy socket with gauze and a note about replacement options"
      ],
      mustNot: [
        "gore, blood pooling, ripping, or cracking violence",
        "general anesthesia",
        "impacted-surgical bone-drilling depiction",
        "any sense of force or trauma"
      ],
      negTweak: "no blood, no cracking, no drilling into bone, no surgical field, no on-screen text"
    },
    setting: {
      setting: "calm dental operatory, patient awake under local anesthesia",
      people: "masked dentist and assistant",
      tray: "dental elevator, extraction forceps, gauze, suction tip"
    },
    scenes: [
      {
        id: "ex-1",
        slug: "extraction-establishing",
        name: "Establishing",
        sec: 6,
        tag: "ENV",
        prompt: "A calm, warmly lit dental operatory. A relaxed patient reclines comfortably in the chair, awake and at ease, as a masked dentist and assistant settle in over the open mouth with quiet, gentle focus. Soft overhead light falls on the lower jaw where one tooth needs to come out; gloved hands rest steady, unhurried. The atmosphere is soothing and controlled, nothing tense, everything set up for a smooth, gentle procedure. Motion: a slow, smooth push-in from the room toward the patient's mouth as the dentist leans in and the assistant readies the tray; soft ambient operatory hum and quiet suction. Calm, reassuring, unhurried.",
        vo: "This tooth can't be saved, so today we'll remove it gently — and you'll be fully numb and comfortable the whole time.",
        motion: "slow smooth push-in from the room toward the mouth; soft ambient hum and quiet suction."
      },
      {
        id: "ex-2",
        slug: "extraction-numb-show-tooth",
        name: "Numb and show tooth",
        sec: 7,
        tag: "ENV",
        prompt: "Closer in the operatory, the dentist gently checks the numb area around a single lower tooth that is visibly damaged — cracked and worn beyond repair, discolored and no longer restorable — while the patient rests calmly. Gloved fingertips ease the cheek aside so the light falls fully on the failing tooth, its neighbors healthy and intact around it. The field is clean and dry, the mood quiet and reassuring as the tooth is clearly identified. Motion: a gentle tilt and slow zoom onto the damaged tooth as the cheek is retracted and the light settles on it; quiet breathing and a soft suction whisper. Focused, calm, clear.",
        vo: "Here's the tooth that's beyond repair — and everything around it is already comfortably numb.",
        motion: "gentle tilt and slow zoom onto the damaged tooth as the cheek is retracted; quiet breathing and soft suction whisper."
      },
      {
        id: "ex-3",
        slug: "extraction-zoom",
        name: "Zoom",
        sec: 6,
        tag: "BRIDGE",
        prompt: "Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the damaged lower tooth, sliding past the cheek and gumline until the surrounding mouth softens away, and resolves into a clean wet intraoral macro of the single tooth seated snugly in its socket, the gum collar hugging its base. Motion: a fast, smooth accelerating push-in that dives toward the tooth as the wider mouth blurs and the socket comes into crisp focus. Seamless, immersive.",
        vo: "(transition — no VO / soft musical swell)",
        motion: "fast smooth accelerating push-in toward the tooth as the mouth blurs; soft musical swell."
      },
      {
        id: "ex-4",
        slug: "extraction-loosen-elevator",
        name: "Loosen with elevator",
        sec: 7,
        tag: "MACRO",
        prompt: "Extreme intraoral macro centered on the damaged tooth seated in its socket, gum wet and detailed. A slim dental elevator slides gently between the tooth and the socket wall and rocks with slow, controlled pressure, easing the tooth loose in tiny increments as the fibers holding it release. The tooth begins to move ever so slightly, still fully in place, the motion smooth and patient, never forced or violent. The field stays clean and calm, no blood, just gentle loosening. Motion: the elevator works in small, steady rocking passes as the tooth gradually loosens in its socket; a soft muffled creak and quiet pressure. Gentle, controlled, patient.",
        vo: "We use a small tool to gently loosen the tooth in its socket — slow and steady, no force needed.",
        motion: "elevator works in small steady rocking passes as the tooth loosens; soft muffled creak and quiet pressure."
      },
      {
        id: "ex-5",
        slug: "extraction-remove-forceps",
        name: "Remove with forceps",
        sec: 7,
        tag: "MACRO",
        prompt: "Extreme intraoral macro as smooth extraction forceps grasp the now-loosened tooth and, in one calm, continuous motion, ease it straight up and out of its socket. The tooth lifts free cleanly and unhurried, the movement fluid and controlled with no snapping or cracking, leaving the socket open below. The whole action reads gentle and complete, the tooth glinting wet as it clears the gumline. Motion: the forceps rotate and lift in a single smooth, continuous arc as the tooth eases free of the socket; a soft muffled release and a light clink. Smooth, controlled, complete.",
        vo: "Once it's loose, a gentle grip eases it out in one smooth motion — usually quicker than you'd expect.",
        motion: "forceps rotate and lift in one smooth arc as the tooth eases free; soft muffled release and light clink."
      },
      {
        id: "ex-6",
        slug: "extraction-reveal-clean-socket",
        name: "Reveal — clean socket",
        sec: 8,
        tag: "MACRO",
        prompt: "Extreme intraoral macro on the empty socket where the tooth once sat, now clean, calm, and healthy-looking, the gum collar tidy around the opening. A soft square of folded gauze is gently placed over the site to rest and settle, the area quiet and controlled with no blood pooling. The neighboring teeth stand healthy on either side, and a faint ghosted outline of a future replacement tooth hovers softly over the gap for a beat before fading. Motion: a slow pull-back and gentle settle as the gauze is placed and the ghost of a replacement tooth softly appears then fades; a quiet resolving tone and calm room ambience. Clean, reassuring, complete.",
        vo: "The socket is clean and will heal comfortably — and when you're ready, we can talk about options to fill the space.",
        motion: "slow pull-back and gentle settle as gauze is placed and a replacement ghost fades in and out; quiet resolving tone and calm ambience."
      }
    ]
  },
  {
    n: 4,
    key: "implant",
    label: "Dental Implant",
    token: "SMILE",
    blurb: "A small titanium post is placed into the jawbone to replace a missing tooth's root, then topped with a lifelike crown — a strong, permanent replacement done while you're awake and numb.",
    guardrails: {
      must: [
        "a clean gap where a tooth is missing in the problem beat",
        "sterile surgical field with pale-blue drapes, patient awake under local",
        "a precise pilot osteotomy drilled into the jawbone at controlled speed with irrigation",
        "a titanium implant fixture threaded into the bone, shown in a clean bone cutaway seated in bone",
        "a healing abutment or cover placed",
        "a macro cutaway of the implant osseointegrated with surrounding bone",
        "a lifelike crown attached onto the abutment seating flush at the gumline"
      ],
      mustNot: [
        "general anesthesia, an OR, or a breathing tube",
        "the implant sitting in the gum only rather than in bone",
        "a hospital operating room",
        "gore or blood"
      ],
      negTweak: "no operating room, no breathing tube, no implant floating in gum, no blood, no on-screen text"
    },
    setting: {
      setting: "sterile surgical field within the dental operatory, patient awake under local anesthesia",
      people: "gowned, gloved oral surgeon and assistant, pale-blue sterile drapes",
      tray: "surgical drill and irrigation, pilot and shaping drills, titanium implant fixture, driver, healing abutment, final crown"
    },
    scenes: [
      {
        id: "im-1",
        slug: "implant-establishing",
        name: "Establishing",
        sec: 6,
        tag: "ENV_SURG",
        prompt: "A calm, sterile surgical field within the dental operatory, framed by clean pale-blue drapes around the patient's mouth. A gowned, gloved oral surgeon and assistant work with quiet precision under a focused overhead light, the patient awake and comfortable under local anesthesia. Everything reads clean, orderly, and controlled — sterile tray gleaming, drapes crisp — with none of the alarm of a hospital, just a composed dental procedure about to begin. Motion: a slow, smooth push-in from the draped field toward the mouth as the surgeon settles into position; soft ambient hum and a gentle instrument clink. Sterile, calm, precise.",
        vo: "We're going to replace your missing tooth with a strong titanium root — and you'll be awake and comfortably numb throughout.",
        motion: "slow smooth push-in from the draped field toward the mouth; soft ambient hum and gentle instrument clink."
      },
      {
        id: "im-2",
        slug: "implant-show-gap-surgical-prep",
        name: "Show gap and surgical prep",
        sec: 7,
        tag: "ENV_SURG",
        prompt: "Closer within the sterile field, the pale-blue drape frames the open mouth and reveals a clean, empty gap where a tooth is missing, healthy teeth standing on either side of the space. The gowned surgeon gently preps the site with gloved hands, the gum smooth and the area clearly identified under bright light, everything sterile and calm. The empty ridge sits ready, quiet and controlled, no distress in the scene. Motion: a gentle tilt and slow zoom onto the empty gap as the surgeon retracts the drape edge and light settles on the ridge; quiet breathing and a soft suction whisper. Focused, sterile, reassuring.",
        vo: "Here's the space left by your missing tooth — and this is where the new root will go.",
        motion: "gentle tilt and slow zoom onto the empty gap as the site is prepped; quiet breathing and soft suction whisper."
      },
      {
        id: "im-3",
        slug: "implant-zoom",
        name: "Zoom",
        sec: 6,
        tag: "BRIDGE",
        prompt: "Photorealistic 3D medical animation, cinematic. The view descends smoothly toward the empty gap in the gumline, sliding past the sterile drape and soft tissue until the gum turns translucent, and resolves into a clean wet macro cutaway of the jawbone beneath the ridge, dense and healthy, ready to receive the implant. Motion: a fast, smooth accelerating push-in that dives through the gum into a bone cross-section as the tissue fades to reveal the jawbone in crisp focus. Seamless, immersive.",
        vo: "(transition — no VO / soft musical swell)",
        motion: "fast smooth accelerating push-in through the gum into a bone cutaway; soft musical swell."
      },
      {
        id: "im-4",
        slug: "implant-osteotomy-drill",
        name: "Osteotomy drill",
        sec: 8,
        tag: "MACRO",
        prompt: "Extreme cutaway at bone scale, people-free, the jawbone rendered dense and detailed beneath the gum ridge. A precise pilot drill turns at a slow, controlled speed and creates a clean, narrow channel straight down into the healthy bone, a fine irrigation stream misting and cooling as it works. The osteotomy deepens smoothly and evenly, the walls neat, the bone shavings gently flushed clear, the whole action measured and exact. Motion: the drill descends in slow, controlled passes with a steady irrigation spray, then eases back to reveal a clean channel in the bone; a soft low drill whir and gentle water flow. Precise, clinical, deliberate.",
        vo: "First we prepare a small, precise channel in your jawbone, cooled gently with water the whole way.",
        motion: "drill descends in slow controlled passes with steady irrigation, then eases back; soft low drill whir and gentle water flow."
      },
      {
        id: "im-5",
        slug: "implant-place-implant",
        name: "Place implant",
        sec: 8,
        tag: "MACRO",
        prompt: "Extreme cutaway at bone scale, the clean channel now prepared in the jawbone. A gleaming titanium implant fixture, its threads sharp and precise, is threaded slowly and steadily down into the bone channel, rotating smoothly until it seats fully within the healthy jawbone. The cutaway clearly shows the implant embedded in bone — not in the gum — snug and stable, the threads gripping the surrounding bone all around. Motion: the titanium fixture rotates and descends in smooth, steady turns until it seats flush and locked in the bone; a soft mechanical hum and a firm settling click. Solid, precise, reassuring.",
        vo: "Then a small titanium post is gently threaded into the bone, where it becomes a sturdy new root.",
        motion: "titanium fixture rotates and descends in steady turns until seated in bone; soft mechanical hum and firm settling click."
      },
      {
        id: "im-6",
        slug: "implant-osseointegration-detail",
        name: "Osseointegration detail",
        sec: 8,
        tag: "MACRO",
        prompt: "Extreme macro cutaway at bone scale, the titanium implant seated deep in the jawbone with a small healing abutment capping its top at the gumline. Over a gentle time-lapse, the surrounding bone knits and grows tightly against the implant's threaded surface, fusing into it — osseointegration — until the fixture and bone become one solid, unified structure. Fine bone texture weaves across the titanium, the bond reading strong, healthy, and permanent. Motion: a slow orbit around the cutaway as the bone visibly grows and locks onto the implant threads in gentle time-lapse; a soft rising tone and quiet organic shimmer. Anatomical, strong, satisfying.",
        vo: "Over the coming weeks your bone naturally grows around the post, locking it in place as a permanent foundation.",
        motion: "slow orbit around the cutaway as bone grows and locks onto the implant threads in time-lapse; soft rising tone and quiet organic shimmer."
      },
      {
        id: "im-7",
        slug: "implant-attach-crown",
        name: "Attach crown",
        sec: 7,
        tag: "MACRO",
        prompt: "Extreme intraoral macro at the gumline, the healing abutment now exposed atop the fused implant. A lifelike ceramic crown, shaped and shaded to match the neighboring teeth, is lowered onto the abutment and eased into place, seating flush and snug right at the gum collar. The crown settles into the gap, filling it seamlessly, its surface wet and natural, blending in among its healthy neighbors. Motion: the crown descends smoothly onto the abutment and seats flush with a gentle settle at the gumline; a soft muffled click and quiet finishing tone. Precise, natural, complete.",
        vo: "Once it's fully healed, we top the post with a custom crown made to match your other teeth.",
        motion: "crown descends smoothly onto the abutment and seats flush at the gumline; soft muffled click and quiet finishing tone."
      },
      {
        id: "im-8",
        slug: "implant-reveal",
        name: "Reveal",
        sec: 8,
        tag: "MACRO",
        prompt: "Extreme intraoral macro pulling back from the finished implant crown, now filling the once-empty gap perfectly and sitting flush and natural among the healthy teeth. The new tooth gleams wet and lifelike, indistinguishable from its neighbors, the gumline tidy around its base. For a beat, a faint translucent ghost shows the titanium root anchored in bone beneath the crown, then the view settles on the complete, natural-looking smile. Motion: a smooth pull-back and slow settle as the finished crown catches the light and the ghosted implant beneath fades away; a gentle resolving chime and quiet room tone. Complete, confident, reassuring.",
        vo: "The result is a strong, natural-looking tooth that functions just like the one you lost.",
        motion: "smooth pull-back and slow settle as the finished crown catches the light and the ghosted root fades; gentle resolving chime and quiet room tone."
      }
    ]
  }
];

export default G_SURGICAL;
