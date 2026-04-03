// ============================================================================
// Opera AI — Dental & Orthodontic Treatment Knowledge Base
// Drives patient education video content generation.
// All language is patient-friendly — no clinical jargon.
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TreatmentKnowledge {
  id: string;
  specialty: "dental" | "orthodontic";
  name: string;
  displayName: string;
  description: string;
  indications: string[];
  benefits: string[];
  risks: string[];
  procedureSteps: string[];
  recovery: string;
  alternatives: string[];
  commonConcerns: { concern: string; response: string }[];
  emotionalContext: {
    hesitant: string;
    deciding: string;
    accepted: string;
  };
  untreatedConsequences: string[];
  timelineEstimate: string;
  costContext: string;
}

export interface AppointmentContext {
  id: string;
  label: string;
  description: string;
  specialty: "dental" | "orthodontic" | "both";
}

export interface VideoGoal {
  id: string;
  label: string;
  description: string;
  toneGuidance: string;
}

export interface PatientStatus {
  id: string;
  label: string;
  description: string;
  introTone: string;
  outroTone: string;
}

// ---------------------------------------------------------------------------
// Dental Treatments
// ---------------------------------------------------------------------------

export const DENTAL_TREATMENTS: Record<string, TreatmentKnowledge> = {
  crown: {
    id: "crown",
    specialty: "dental",
    name: "crown",
    displayName: "Porcelain Crown",
    description:
      "A porcelain crown is a custom-made cap that fits over your existing tooth to restore its shape, strength, and appearance. Think of it like a protective helmet for a weakened tooth.",
    indications: [
      "A tooth that has a large cavity or is badly broken down",
      "A tooth that has had a root canal and needs protection",
      "A cracked or chipped tooth that could break further",
      "A worn-down tooth that needs its shape restored",
      "Replacing an old crown that no longer fits well",
    ],
    benefits: [
      "Protects a weakened tooth from breaking apart",
      "Restores a natural, beautiful appearance — blends in with your other teeth",
      "Lets you chew and bite normally again without worry",
      "Can last 15 years or more with good care",
      "Custom-made to match the color and shape of your natural teeth",
    ],
    risks: [
      "Some tooth sensitivity to hot or cold for a few weeks after placement",
      "In rare cases the nerve inside the tooth may become irritated and need further treatment",
      "The crown can chip or come loose over many years, but it can usually be repaired or replaced",
    ],
    procedureSteps: [
      "We gently numb the area so you stay completely comfortable throughout the visit.",
      "The tooth is carefully shaped to make room for the crown — think of it like trimming a nail so a thimble fits perfectly.",
      "We take a detailed scan or impression of your tooth so the lab can craft a crown that matches your smile.",
      "A comfortable temporary crown protects your tooth while the permanent one is being made.",
      "At your second visit, we try in the new crown, check your bite, and bond it securely in place.",
    ],
    recovery:
      "Most people feel back to normal within a day or two. You might notice some mild sensitivity to temperature, which usually fades within a couple of weeks. You can eat normally — just avoid very sticky foods for the first 24 hours while the cement fully sets.",
    alternatives: [
      "Inlay or onlay (a partial crown when less coverage is needed)",
      "Large filling (if enough healthy tooth remains)",
      "Extraction and replacement with an implant or bridge",
    ],
    commonConcerns: [
      {
        concern: "Will it look fake?",
        response:
          "Not at all. Modern porcelain crowns are custom-colored and shaped to match your natural teeth. Most people can't tell the difference — even up close.",
      },
      {
        concern: "Does getting a crown hurt?",
        response:
          "We numb the area completely before we start, so you shouldn't feel pain — just some pressure. Many patients say it's much easier than they expected.",
      },
      {
        concern: "How long does it last?",
        response:
          "With regular brushing, flossing, and checkups, a porcelain crown typically lasts 15 years or more. Some patients keep theirs for decades.",
      },
      {
        concern: "Why can't I just get a filling instead?",
        response:
          "When a tooth is significantly weakened, a filling alone may not provide enough support. A crown wraps around the entire tooth to prevent it from cracking — like putting a cast on a broken bone.",
      },
    ],
    emotionalContext: {
      hesitant:
        "It's completely normal to feel unsure about a crown. Many patients feel the same way — and almost all of them tell us afterward that it was easier than they expected and they're glad they did it.",
      deciding:
        "Take the time you need. The most important thing to know is that protecting this tooth now can save you from a more involved procedure down the road.",
      accepted:
        "Great decision! You're taking a smart step to protect your tooth and keep your smile strong for years to come.",
    },
    untreatedConsequences: [
      "The weakened tooth could crack or break, which may lead to pain and the need for extraction",
      "Bacteria can get into the damaged area, increasing the risk of infection",
      "You may lose the tooth entirely, which would require an implant or bridge to replace it",
      "Chewing may become uncomfortable, affecting what you can eat",
    ],
    timelineEstimate:
      "Two visits over about two weeks. The first visit takes roughly 60–90 minutes, and the second takes about 30–45 minutes.",
    costContext:
      "Crowns are one of the most common dental procedures and are typically covered in part by dental insurance. We'll review your specific benefits and discuss payment options before we begin.",
  },

  filling: {
    id: "filling",
    specialty: "dental",
    name: "filling",
    displayName: "Composite Filling",
    description:
      "A composite filling is a tooth-colored material used to repair a cavity or small chip. It blends seamlessly with your natural tooth so no one can tell it's there.",
    indications: [
      "A cavity (area of tooth decay) that needs to be repaired",
      "A small chip or crack in a tooth",
      "Replacing an old, worn-out filling",
      "Minor cosmetic reshaping of a tooth",
    ],
    benefits: [
      "Stops the cavity from getting bigger and causing pain",
      "Matches the color of your natural tooth — virtually invisible",
      "Preserves more of your natural tooth structure than older metal fillings",
      "Completed in a single, quick visit",
      "Bonds directly to the tooth, adding strength",
    ],
    risks: [
      "Mild sensitivity to hot or cold for a few days after the procedure",
      "Very large fillings may not be as durable as a crown over many years",
    ],
    procedureSteps: [
      "We numb the area around the tooth so you won't feel a thing.",
      "The decayed portion of the tooth is gently removed.",
      "The tooth is cleaned and prepared so the filling material bonds well.",
      "The composite material is placed in layers and shaped to match your tooth's natural contour.",
      "A special light hardens the material instantly, and we polish it smooth for a comfortable bite.",
    ],
    recovery:
      "You can eat and drink as soon as the numbness wears off — usually within a couple of hours. Some people notice slight sensitivity for a few days, which is perfectly normal.",
    alternatives: [
      "Inlay or onlay for larger areas of decay",
      "Crown if the cavity is very large",
      "Monitoring very small early cavities with improved home care",
    ],
    commonConcerns: [
      {
        concern: "Will I feel the drill?",
        response:
          "No — we numb the tooth and surrounding area first. You may feel a little vibration and hear some noise, but you should not feel pain.",
      },
      {
        concern: "How long does a filling last?",
        response:
          "Composite fillings typically last 7–10 years or longer with good oral care. We check them at every visit and will let you know well in advance if one needs attention.",
      },
      {
        concern: "Is the white filling as strong as a silver one?",
        response:
          "For most cavities, absolutely. Today's composite materials are strong, durable, and they bond to the tooth — which actually helps hold the tooth together.",
      },
    ],
    emotionalContext: {
      hesitant:
        "Cavities are incredibly common — you're not alone. Catching it now means a quick, simple fix instead of something bigger later.",
      deciding:
        "A filling is one of the most straightforward dental procedures there is. It's a small investment of time now that protects your tooth for years.",
      accepted:
        "You're making a great choice. This is a quick visit and you'll walk out with a tooth that looks and feels as good as new.",
    },
    untreatedConsequences: [
      "The cavity will continue to grow and may reach the nerve, causing significant pain",
      "You could develop an infection that leads to the need for a root canal",
      "The tooth may weaken to the point that it breaks and needs a crown or extraction",
    ],
    timelineEstimate:
      "One visit, typically 30–60 minutes depending on the size of the filling.",
    costContext:
      "Fillings are one of the most affordable dental procedures and are well-covered by most insurance plans. We'll confirm your coverage before we start.",
  },

  root_canal: {
    id: "root_canal",
    specialty: "dental",
    name: "root_canal",
    displayName: "Root Canal Therapy",
    description:
      "A root canal removes the infected or inflamed tissue inside a tooth, relieving pain and saving the tooth. Despite its reputation, modern root canal therapy is comfortable and very effective.",
    indications: [
      "A deep cavity that has reached the nerve inside the tooth",
      "A cracked or injured tooth with nerve damage",
      "A tooth with a persistent abscess or infection",
      "Severe, lingering sensitivity to hot or cold",
      "Swelling or tenderness in the gum around a tooth",
    ],
    benefits: [
      "Eliminates tooth pain and infection at the source",
      "Saves your natural tooth — you keep your own smile",
      "Prevents the infection from spreading to other teeth or your jawbone",
      "A treated tooth can last a lifetime with proper care",
      "Far more affordable than extracting the tooth and replacing it with an implant",
    ],
    risks: [
      "Occasionally a tooth may need retreatment if the infection recurs",
      "The tooth will need a crown afterward to protect it from breaking",
      "In rare cases, a tiny canal may be difficult to locate, requiring a specialist",
    ],
    procedureSteps: [
      "We numb the area thoroughly — most patients say this is the only part they feel.",
      "A small protective shield is placed over the tooth to keep it clean and dry during the procedure.",
      "The infected tissue inside the tooth is carefully removed through a tiny opening in the top.",
      "The inside of the tooth is cleaned, disinfected, and shaped so it can be sealed.",
      "The tooth is filled with a biocompatible material and sealed. A crown is placed at a follow-up visit to fully protect it.",
    ],
    recovery:
      "Most people feel significantly better within a day or two — especially compared to the toothache that brought them in. Over-the-counter pain relievers usually handle any residual soreness. Avoid chewing on that side until the permanent crown is placed.",
    alternatives: [
      "Extraction followed by an implant, bridge, or partial denture",
      "In very rare early cases, medication may temporarily manage an infection, but the underlying problem will remain",
    ],
    commonConcerns: [
      {
        concern: "Aren't root canals extremely painful?",
        response:
          "That's the biggest myth in dentistry. With modern anesthesia and techniques, a root canal feels a lot like getting a filling. Most patients are surprised at how comfortable it is — and relieved to be out of pain.",
      },
      {
        concern: "Why not just pull the tooth?",
        response:
          "Keeping your natural tooth is almost always the best option. It maintains your bite, keeps neighboring teeth stable, and avoids the cost and complexity of a replacement.",
      },
      {
        concern: "How long does it take?",
        response:
          "Most root canals take about 60–90 minutes. Many patients catch up on a podcast or even doze off during the procedure.",
      },
      {
        concern: "Will my tooth turn dark afterward?",
        response:
          "A crown covers the tooth completely, so it will look just like your other teeth. Any slight discoloration is hidden.",
      },
    ],
    emotionalContext: {
      hesitant:
        "We understand — the words 'root canal' can sound scary. But the reality is that this procedure relieves pain; it doesn't cause it. We'll make sure you're comfortable every step of the way.",
      deciding:
        "The sooner we treat the infection, the simpler the process. Waiting usually means more pain and a more involved procedure later.",
      accepted:
        "You're making the right call. You'll be out of pain and back to normal before you know it.",
    },
    untreatedConsequences: [
      "The infection can spread to the jawbone, nearby teeth, or even into the bloodstream",
      "Pain will likely worsen over time and may become severe",
      "The tooth may become unsaveable, requiring extraction",
      "An abscess can develop, leading to swelling and potentially serious health complications",
    ],
    timelineEstimate:
      "One to two visits. The root canal itself is usually done in a single 60–90 minute appointment. A follow-up visit for the crown takes about 2 weeks later.",
    costContext:
      "Root canals are covered to varying degrees by most dental insurance plans. The total includes the root canal treatment and a crown to protect the tooth. We'll walk you through costs and payment options upfront.",
  },

  implant: {
    id: "implant",
    specialty: "dental",
    name: "implant",
    displayName: "Dental Implant",
    description:
      "A dental implant is a small titanium post placed in the jawbone to replace a missing tooth root. Once healed, a natural-looking crown is attached on top — giving you a replacement tooth that looks, feels, and works just like the real thing.",
    indications: [
      "A missing tooth that you want to replace permanently",
      "A tooth that has been extracted or lost due to injury",
      "Loose or uncomfortable dentures that you'd like to stabilize",
      "A gap that is causing neighboring teeth to shift",
    ],
    benefits: [
      "Looks and feels like a natural tooth — most people can't tell the difference",
      "Preserves your jawbone, which naturally shrinks when a tooth is missing",
      "Doesn't require cutting down neighboring healthy teeth (unlike a bridge)",
      "Can last a lifetime with proper care",
      "Lets you eat, speak, and smile with complete confidence",
    ],
    risks: [
      "The healing period takes several months as the implant fuses with the bone",
      "In rare cases, the implant may not fully integrate and could need to be replaced",
      "As with any minor surgery, there is a small risk of infection at the site",
    ],
    procedureSteps: [
      "We take a detailed 3D scan of your jaw to plan the perfect placement for your implant.",
      "The implant post is gently placed into the jawbone under local anesthesia — most patients say it's more comfortable than an extraction.",
      "Over the next 3–6 months, the implant naturally fuses with your bone in a process called integration.",
      "Once healed, a small connector piece (abutment) is attached to the implant.",
      "A custom porcelain crown is placed on top, completing your new tooth.",
    ],
    recovery:
      "Most people take it easy for a day or two after placement and manage any tenderness with over-the-counter pain relievers. You'll eat soft foods for about a week. The full healing period before the final crown is typically 3–6 months, during which you can go about your normal life.",
    alternatives: [
      "Dental bridge (requires shaping the teeth on either side)",
      "Removable partial denture",
      "Leaving the space open (not recommended — can cause shifting and bone loss)",
    ],
    commonConcerns: [
      {
        concern: "Is the surgery painful?",
        response:
          "Most patients are surprised at how little discomfort there is. The procedure is done under local anesthesia, and many people say it was easier than having a tooth pulled.",
      },
      {
        concern: "Why does it take so long?",
        response:
          "The waiting period is actually a good sign — it means the implant is bonding securely with your jawbone. This is what gives it the strength to last a lifetime.",
      },
      {
        concern: "What if the implant doesn't take?",
        response:
          "Implants have a success rate of about 95–98%. In the uncommon event that one doesn't integrate, we can usually place a new one after a short healing period.",
      },
      {
        concern: "Am I too old for an implant?",
        response:
          "Age is rarely a factor. As long as you have enough healthy bone and are in reasonable general health, implants work beautifully for adults of all ages.",
      },
      {
        concern: "Is it worth the investment?",
        response:
          "An implant is the only replacement option that can truly last a lifetime. When you compare the long-term costs of replacing a bridge or denture every 7–15 years, an implant often turns out to be the most cost-effective choice.",
      },
    ],
    emotionalContext: {
      hesitant:
        "Losing a tooth can be emotional, and the idea of surgery can feel overwhelming. Know that implants are one of the most well-studied and successful procedures in all of dentistry — and we'll be with you every step of the way.",
      deciding:
        "This is a long-term investment in your health, comfort, and confidence. Many patients tell us it's one of the best decisions they ever made.",
      accepted:
        "Wonderful! You're on your way to a permanent solution that will look and feel completely natural. Let's get your treatment plan started.",
    },
    untreatedConsequences: [
      "The jawbone in the missing tooth area will gradually shrink (resorb), changing your facial structure over time",
      "Neighboring teeth may shift into the gap, creating bite problems and potential jaw pain",
      "Chewing efficiency is reduced, which can affect nutrition and digestion",
      "A visible gap can affect confidence and willingness to smile",
    ],
    timelineEstimate:
      "The full process from implant placement to final crown takes about 4–8 months. Most of that time is hands-off healing.",
    costContext:
      "Dental implants are an investment, and many insurance plans now cover a portion of the cost. We offer flexible payment plans so you can get the care you need on a schedule that works for your budget.",
  },

  extraction: {
    id: "extraction",
    specialty: "dental",
    name: "extraction",
    displayName: "Tooth Extraction",
    description:
      "A tooth extraction is the careful removal of a tooth that is too damaged, decayed, or problematic to save. While we always try to preserve natural teeth, sometimes removal is the healthiest option.",
    indications: [
      "A tooth that is severely decayed beyond repair",
      "A cracked or broken tooth that cannot be restored",
      "Crowding that needs to be relieved before orthodontic treatment",
      "An impacted wisdom tooth causing pain or infection",
      "A baby tooth that hasn't fallen out on its own and is blocking an adult tooth",
    ],
    benefits: [
      "Immediately eliminates pain and infection from a damaged tooth",
      "Prevents infection from spreading to nearby teeth and bone",
      "Creates space for proper alignment in orthodontic cases",
      "Allows for a healthier replacement option like an implant or bridge",
    ],
    risks: [
      "Some swelling and tenderness for a few days after the procedure",
      "A temporary condition called dry socket can occur if the healing clot is dislodged (we'll give you clear instructions to prevent this)",
      "Neighboring teeth may shift over time if the space is not filled with a replacement",
    ],
    procedureSteps: [
      "The area around the tooth is completely numbed so you won't feel pain.",
      "The tooth is gently loosened using specialized instruments.",
      "The tooth is carefully removed in one piece whenever possible.",
      "The socket is cleaned, and if needed, a few stitches are placed to help healing.",
      "We place gauze and give you a detailed care guide for a smooth recovery.",
    ],
    recovery:
      "Plan to rest for the remainder of the day. Swelling usually peaks around day two and improves steadily after that. Stick to soft, cool foods for two to three days. Most people are back to their normal routine within a few days.",
    alternatives: [
      "Root canal therapy (if the tooth's nerve is the problem but the structure is intact)",
      "Crown (if the tooth is cracked but still saveable)",
    ],
    commonConcerns: [
      {
        concern: "Will I feel it?",
        response:
          "You'll be thoroughly numbed before we begin. You may feel some pressure, but you should not feel sharp pain. If you do, just raise your hand and we'll add more numbing right away.",
      },
      {
        concern: "What about the gap afterward?",
        response:
          "We'll discuss your replacement options — such as an implant, bridge, or partial denture — so you can make the best choice for your smile and your budget.",
      },
      {
        concern: "How long is the recovery?",
        response:
          "Most people feel significantly better within 2–3 days. We'll give you simple instructions to keep the area clean and comfortable.",
      },
    ],
    emotionalContext: {
      hesitant:
        "We know losing a tooth isn't easy. If there were a way to save it, we'd recommend that first. Removing it now prevents bigger problems and opens the door to a great replacement.",
      deciding:
        "Sometimes the bravest thing is to let go of a tooth that's causing you trouble. It's a step toward a healthier, more comfortable you.",
      accepted:
        "You're making a wise choice for your health. We'll take great care of you, and we'll have a plan for what comes next.",
    },
    untreatedConsequences: [
      "Infection can spread to the jawbone, neighboring teeth, or even into your bloodstream",
      "Pain will likely intensify and may become difficult to manage",
      "A severely infected tooth can cause dangerous swelling",
      "Surrounding teeth may be damaged by the ongoing decay or infection",
    ],
    timelineEstimate:
      "One visit, typically 30–60 minutes. Simple extractions are often quicker.",
    costContext:
      "Extractions are a common and generally affordable procedure. Most dental insurance plans provide good coverage for necessary extractions. We'll review your options before we begin.",
  },

  bridge: {
    id: "bridge",
    specialty: "dental",
    name: "bridge",
    displayName: "Dental Bridge",
    description:
      "A dental bridge fills the gap left by a missing tooth by anchoring a replacement tooth to the healthy teeth on either side. It's a tried-and-true way to restore your smile and your ability to chew comfortably.",
    indications: [
      "One or more missing teeth in a row",
      "Healthy teeth on either side of the gap that can support the bridge",
      "Desire for a fixed (non-removable) replacement without surgery",
    ],
    benefits: [
      "Restores a complete, natural-looking smile",
      "Fixed in place — no removing or snapping in and out",
      "Prevents neighboring teeth from shifting into the gap",
      "Restores normal chewing and speaking ability",
      "Completed in just two visits",
    ],
    risks: [
      "The supporting teeth need to be reshaped, which removes some healthy tooth structure",
      "If a supporting tooth develops problems later, the entire bridge may need replacement",
      "Does not prevent bone loss in the area of the missing tooth the way an implant does",
    ],
    procedureSteps: [
      "The teeth on either side of the gap are gently shaped to accept the bridge.",
      "A detailed impression or scan is taken so the lab can create a precise, natural-looking bridge.",
      "A temporary bridge is placed to protect your teeth while the permanent one is made.",
      "At your second visit, the permanent bridge is tried in, adjusted for fit and bite, and cemented in place.",
    ],
    recovery:
      "Adjusting to a new bridge usually takes just a few days. You may notice slight sensitivity or an unfamiliar feel at first, but this resolves quickly. Eat softer foods for the first day or two.",
    alternatives: [
      "Dental implant (doesn't require altering neighboring teeth)",
      "Removable partial denture",
    ],
    commonConcerns: [
      {
        concern: "Will it look natural?",
        response:
          "Absolutely. The bridge is custom-made from porcelain to match the shade, shape, and translucency of your natural teeth.",
      },
      {
        concern: "How do I clean under it?",
        response:
          "We'll show you how to use a floss threader or special brush to keep the area under the bridge clean. It takes just an extra minute in your routine.",
      },
      {
        concern: "How long does a bridge last?",
        response:
          "With good oral care, a bridge typically lasts 10–15 years. Many last even longer.",
      },
    ],
    emotionalContext: {
      hesitant:
        "A gap in your smile can affect more than just appearance — it can change how you eat and how your other teeth line up. A bridge is a reliable, well-established solution.",
      deciding:
        "A bridge gives you a fixed, permanent result in just two visits. It's one of the fastest ways to get back to a full, confident smile.",
      accepted:
        "Great choice! In just a couple of visits, you'll have a seamless smile again.",
    },
    untreatedConsequences: [
      "Neighboring teeth can drift into the gap, creating bite and alignment problems",
      "The bone beneath the missing tooth will gradually shrink",
      "Chewing and speaking may become more difficult",
      "The imbalanced bite can cause jaw pain or TMJ issues over time",
    ],
    timelineEstimate:
      "Two visits over about two to three weeks.",
    costContext:
      "Bridges are a well-established procedure and are typically partially covered by dental insurance. We'll provide a clear cost breakdown and discuss financing options.",
  },

  veneers: {
    id: "veneers",
    specialty: "dental",
    name: "veneers",
    displayName: "Porcelain Veneers",
    description:
      "Porcelain veneers are thin, custom-made shells bonded to the front of your teeth to transform their color, shape, or alignment. They're the go-to solution for creating a magazine-worthy smile.",
    indications: [
      "Teeth that are stained or discolored beyond what whitening can fix",
      "Chipped, worn, or slightly crooked front teeth",
      "Uneven spacing or small gaps between teeth",
      "Desire for a dramatically improved smile appearance",
    ],
    benefits: [
      "Delivers a stunning, natural-looking smile transformation",
      "Highly stain-resistant — stays bright for years",
      "Conservative — requires minimal removal of natural tooth structure",
      "Custom-designed for your face, skin tone, and personal preferences",
      "Results are immediate and long-lasting",
    ],
    risks: [
      "A thin layer of enamel is removed, making the process irreversible",
      "Veneers can chip if subjected to extreme force (biting ice, opening packages with teeth)",
      "Teeth may be slightly more sensitive to temperature for a short period",
    ],
    procedureSteps: [
      "We discuss your goals and design your ideal smile together — sometimes using a digital preview.",
      "A thin layer of enamel is gently removed from the front of each tooth to create space for the veneer.",
      "Detailed impressions are taken and sent to a master ceramist who hand-crafts each veneer.",
      "Temporary veneers may be placed so you can preview the look and feel.",
      "The permanent veneers are bonded to your teeth with a strong adhesive, and your new smile is revealed.",
    ],
    recovery:
      "There's virtually no downtime. Your teeth may feel slightly sensitive for a week or so. Avoid very hard or crunchy foods for the first few days while you adjust.",
    alternatives: [
      "Composite bonding (less expensive but also less durable and stain-resistant)",
      "Professional whitening (for color issues only)",
      "Orthodontics (for alignment issues)",
    ],
    commonConcerns: [
      {
        concern: "Will they look fake?",
        response:
          "When done well — and we make sure they are — porcelain veneers look remarkably natural. The porcelain mimics the way real teeth reflect light.",
      },
      {
        concern: "Can they break?",
        response:
          "Porcelain veneers are strong and durable under normal use. Avoid using your teeth as tools and wear a night guard if you grind your teeth, and they'll serve you well for many years.",
      },
      {
        concern: "Is it worth the cost?",
        response:
          "Veneers are a long-term investment in your confidence and appearance. Many patients say the impact on their self-esteem is priceless.",
      },
      {
        concern: "What if I don't like how they look?",
        response:
          "We work with you every step of the way — from digital previews to temporary try-ins — so you'll know exactly what to expect before anything permanent is placed.",
      },
    ],
    emotionalContext: {
      hesitant:
        "Changing your smile is a big decision, and it's okay to take your time. We can show you previews and temporaries so you can see the result before committing.",
      deciding:
        "Imagine smiling confidently in every photo, every meeting, every conversation. Veneers can make that your everyday reality.",
      accepted:
        "This is going to be an exciting transformation! We can't wait to see your reaction when you see your new smile for the first time.",
    },
    untreatedConsequences: [
      "Cosmetic concerns may continue to affect your confidence and willingness to smile",
      "Chipped or worn teeth may continue to deteriorate",
      "Small gaps can allow food to pack between teeth, increasing decay risk",
    ],
    timelineEstimate:
      "Two to three visits over two to four weeks.",
    costContext:
      "Veneers are generally considered a cosmetic procedure and may not be covered by insurance. We offer financing options to make your dream smile accessible.",
  },

  whitening: {
    id: "whitening",
    specialty: "dental",
    name: "whitening",
    displayName: "Professional Whitening",
    description:
      "Professional teeth whitening uses a safe, concentrated bleaching gel to dramatically brighten your smile in just one visit or with a custom take-home kit. It's the fastest way to turn back the clock on staining.",
    indications: [
      "Yellowing or staining from coffee, tea, wine, or aging",
      "Desire for a brighter smile before a special event",
      "General dissatisfaction with tooth color",
    ],
    benefits: [
      "Noticeably whiter teeth — often several shades brighter in one session",
      "Safe and supervised by your dental team",
      "Much more effective than over-the-counter strips or toothpastes",
      "Boosts confidence instantly",
    ],
    risks: [
      "Temporary tooth sensitivity that usually resolves within a few days",
      "Gum irritation if the whitening gel contacts soft tissue (we take precautions to prevent this)",
    ],
    procedureSteps: [
      "Your teeth are cleaned to remove any surface buildup.",
      "A protective barrier is placed over your gums to shield them from the whitening gel.",
      "The professional-strength whitening gel is applied to your teeth.",
      "A special light may be used to accelerate the whitening process.",
      "The gel is removed, and you see your brighter smile immediately.",
    ],
    recovery:
      "No downtime at all. Avoid deeply pigmented foods and drinks (coffee, red wine, berries) for 48 hours to let the results set. Sensitivity, if any, typically fades within a day or two.",
    alternatives: [
      "Porcelain veneers (for staining that whitening cannot address)",
      "Composite bonding",
      "Over-the-counter whitening products (less effective)",
    ],
    commonConcerns: [
      {
        concern: "Will it damage my teeth?",
        response:
          "No. Professional whitening is one of the most well-studied cosmetic procedures in dentistry. The gel works on surface stains without harming your enamel.",
      },
      {
        concern: "How long do results last?",
        response:
          "Results typically last one to three years depending on your diet and habits. Touch-ups with a take-home kit can extend results easily.",
      },
      {
        concern: "Will it make my teeth really sensitive?",
        response:
          "Some sensitivity is possible but it's temporary — usually just a day or two. We can use a desensitizing treatment to minimize it.",
      },
    ],
    emotionalContext: {
      hesitant:
        "A brighter smile is one of the simplest confidence boosters there is. If you've been thinking about it, there's really no downside to trying.",
      deciding:
        "This is a quick, non-invasive way to make a noticeable difference. Many patients wish they'd done it sooner.",
      accepted:
        "You're going to love the results! Get ready for a brighter, more confident smile.",
    },
    untreatedConsequences: [
      "Staining tends to accumulate over time, becoming more noticeable",
      "Surface stains are easier to remove when addressed sooner rather than later",
    ],
    timelineEstimate:
      "In-office: one visit, about 60–90 minutes. Take-home kit: results over 1–2 weeks.",
    costContext:
      "Whitening is a cosmetic procedure and is usually not covered by insurance, but it's one of the most affordable cosmetic treatments available. We have several options to fit different budgets.",
  },

  gum_treatment: {
    id: "gum_treatment",
    specialty: "dental",
    name: "gum_treatment",
    displayName: "Gum Disease Treatment",
    description:
      "Gum disease treatment addresses infection and inflammation in the gums and bone that support your teeth. Catching it early keeps your teeth healthy and firmly in place for the long haul.",
    indications: [
      "Gums that bleed when you brush or floss",
      "Red, swollen, or tender gums",
      "Persistent bad breath that doesn't go away",
      "Gums that have pulled away from the teeth",
      "Loose teeth or changes in how your teeth fit together",
    ],
    benefits: [
      "Stops the infection before it causes tooth loss",
      "Reduces bleeding, swelling, and discomfort in the gums",
      "Freshens breath by eliminating the bacteria causing odor",
      "Protects your overall health — gum disease is linked to heart disease and diabetes",
      "Preserves the bone that holds your teeth in place",
    ],
    risks: [
      "Gums may feel sore for a few days after a deep cleaning",
      "Teeth may feel temporarily more sensitive as gum inflammation resolves",
      "Advanced cases may require ongoing maintenance visits",
    ],
    procedureSteps: [
      "We measure the pockets around your teeth to understand the extent of the gum disease.",
      "A deep cleaning (scaling and root planing) is performed under local anesthesia to remove bacteria and buildup below the gumline.",
      "The tooth roots are smoothed to help the gums reattach and heal.",
      "In some cases, a local antibiotic may be placed in deeper pockets to fight remaining bacteria.",
      "We schedule follow-up visits to monitor healing and maintain your progress.",
    ],
    recovery:
      "Your gums may be tender for a few days after treatment. Warm salt water rinses and gentle brushing will keep you comfortable. Most patients notice their gums look and feel healthier within just a couple of weeks.",
    alternatives: [
      "More frequent standard cleanings (for very early stages only)",
      "Gum surgery (for advanced cases that don't respond to deep cleaning)",
    ],
    commonConcerns: [
      {
        concern: "I didn't know I had gum disease — how?",
        response:
          "Gum disease often develops without obvious symptoms. That's why regular checkups are so important. The good news is that we've caught it, and we can treat it effectively.",
      },
      {
        concern: "Is the deep cleaning painful?",
        response:
          "We numb the area completely so you're comfortable. Most patients say it's similar to a regular cleaning, just a bit more thorough.",
      },
      {
        concern: "Will my gums grow back?",
        response:
          "Once we remove the bacteria and tartar, your gums will begin to heal and tighten around the teeth. While gum tissue doesn't regenerate like skin, the inflammation will resolve and the pockets will shrink.",
      },
      {
        concern: "Can I lose my teeth from this?",
        response:
          "If untreated, yes — gum disease is actually the leading cause of tooth loss in adults. But with treatment, we can stop the progression and preserve your teeth.",
      },
    ],
    emotionalContext: {
      hesitant:
        "Hearing that you have gum disease can be unsettling, but it's very common and very treatable. The most important thing is that we're addressing it now.",
      deciding:
        "Treating gum disease is one of the most important things you can do for your teeth — and your overall health. The sooner we start, the better the outcome.",
      accepted:
        "You're taking a crucial step. Healthy gums are the foundation of a healthy smile, and we're going to get yours back on track.",
    },
    untreatedConsequences: [
      "Progressive bone loss that can lead to loose or lost teeth",
      "Chronic infection that can affect your overall health",
      "Worsening bad breath that doesn't respond to brushing or mouthwash",
      "Receding gums that expose tooth roots, causing sensitivity and cosmetic concerns",
    ],
    timelineEstimate:
      "Initial deep cleaning: one to two visits. Follow-up maintenance visits every 3–4 months for the first year.",
    costContext:
      "Gum disease treatment is considered a medical necessity, and most dental insurance plans provide significant coverage. We'll verify your benefits before starting.",
  },

  full_mouth: {
    id: "full_mouth",
    specialty: "dental",
    name: "full_mouth",
    displayName: "Full Mouth Reconstruction",
    description:
      "Full mouth reconstruction is a comprehensive treatment plan that restores all or most of your teeth, combining several procedures to rebuild your smile from the ground up. It's a life-changing solution for patients who have experienced extensive damage or wear.",
    indications: [
      "Multiple missing, damaged, or severely worn teeth",
      "Long-term neglect or dental phobia that has led to widespread decay",
      "Injuries from an accident or trauma affecting many teeth",
      "Severe erosion from acid reflux, grinding, or other causes",
      "Desire to completely transform a damaged smile",
    ],
    benefits: [
      "Restores full function — eating, speaking, and smiling with confidence",
      "Addresses all problems in a single coordinated plan rather than piecemeal",
      "Dramatically improves appearance and self-confidence",
      "Can improve jaw alignment and relieve chronic pain",
      "Creates a foundation for long-term oral health",
    ],
    risks: [
      "Treatment is more extensive and takes longer than individual procedures",
      "Multiple appointments are required over several months",
      "Higher overall cost, though phased payment plans are available",
    ],
    procedureSteps: [
      "A thorough evaluation including X-rays, photos, and models of your teeth and jaw is completed.",
      "We create a personalized treatment plan together, often with a digital preview of your future smile.",
      "Treatment is completed in a carefully sequenced plan — starting with any necessary extractions or gum treatment.",
      "Restorations such as implants, crowns, bridges, or veneers are placed in phases.",
      "Final adjustments ensure everything fits together beautifully and your bite is comfortable.",
    ],
    recovery:
      "Recovery varies depending on the specific procedures involved. We space appointments to allow proper healing between phases. Most patients find each individual visit very manageable.",
    alternatives: [
      "Partial treatment addressing only the most urgent issues",
      "Full dentures (a simpler but less functional option)",
      "Implant-supported dentures",
    ],
    commonConcerns: [
      {
        concern: "This sounds overwhelming.",
        response:
          "It's a big undertaking, but we break it into manageable steps. You don't have to do everything at once. We'll guide you through each phase so it never feels overwhelming.",
      },
      {
        concern: "How long will the whole process take?",
        response:
          "Most full mouth reconstructions take 6–12 months, depending on the procedures involved. We'll map out the entire timeline for you upfront.",
      },
      {
        concern: "Is it worth it?",
        response:
          "Patients who complete full mouth reconstruction consistently say it changed their life. Being able to eat comfortably, speak clearly, and smile freely — those things affect every part of daily life.",
      },
      {
        concern: "I'm embarrassed about the condition of my teeth.",
        response:
          "Please don't be. We see patients in every situation, and we're here to help, not judge. What matters is that you're taking this step now.",
      },
    ],
    emotionalContext: {
      hesitant:
        "We understand this is a lot to consider. Many patients in your situation have felt the same way — and they all say they wish they'd started sooner. We'll move at your pace.",
      deciding:
        "This is an investment in your quality of life. Every phase brings you closer to a smile you can be proud of.",
      accepted:
        "This is going to be transformative. We're honored to be part of this journey with you.",
    },
    untreatedConsequences: [
      "Remaining teeth will continue to deteriorate, making future treatment more complex",
      "Nutrition and digestion may suffer due to inability to chew properly",
      "Speech difficulties may worsen",
      "Jaw problems and chronic pain can develop or intensify",
      "Social withdrawal and reduced quality of life due to embarrassment",
    ],
    timelineEstimate:
      "6–12 months for the complete treatment plan, spread across multiple visits.",
    costContext:
      "Full mouth reconstruction is a significant investment. Many insurance plans cover individual components. We offer comprehensive financing options and can phase treatment to align with your budget.",
  },

  full_mouth_rehab: {
    id: "full_mouth_rehab",
    specialty: "dental",
    name: "full_mouth_rehab",
    displayName: "Full Mouth Rehabilitation (Phased: Surgery + Implants + Crowns)",
    description:
      "A staged full-arch plan for patients who need failing teeth removed, the ridge prepared (often with bone grafting or sinus elevation), dental implants placed by a surgeon, then fixed implant crowns or bridges delivered by your restorative dentist. It coordinates oral surgery, periodontics, and general/restorative dentistry toward a stable, chews-like-natural smile.",
    indications: [
      "Multiple hopeless teeth from decay, fracture, or advanced periodontal disease",
      "Terminal dentition where repair is no longer predictable",
      "Need for ridge preservation or augmentation before implants",
      "Desire for fixed teeth on implants rather than traditional dentures",
    ],
    benefits: [
      "Predictable sequencing: health first, then foundation, then final teeth",
      "Implant-supported fixed teeth restore chewing efficiency and confidence",
      "Bone grafting and implants help maintain facial support over time",
      "Phased financing and healing windows between stages",
    ],
    risks: [
      "Multiple procedures and healing intervals (often months)",
      "Temporary prostheses may be needed between phases",
      "Smoking and uncontrolled diabetes can compromise healing",
    ],
    procedureSteps: [
      "Comprehensive records: CBCT, photos, periodontal charting, and restorative work-up.",
      "Phase 1 — extractions of non-restorable teeth; sometimes immediate bone grafting or ridge preservation.",
      "Phase 2 — oral surgery: ridge augmentation, sinus lift, or guided implant placement as planned; healing per site.",
      "Phase 3 — implants integrate (osseointegration); uncover and place healing abutments or impressions.",
      "Phase 4 — restorative: screw- or cement-retained implant crowns/bridges; bite refinement and hygiene instruction.",
    ],
    recovery:
      "Soft diet after surgery phases; soreness and swelling are common short-term. Osseointegration typically spans several months. Your team spaces visits so each phase heals before loading the final prosthesis.",
    alternatives: [
      "Removable complete dentures (faster, less invasive, less chewing efficiency)",
      "Implant overdentures on fewer implants",
      "Phased treatment addressing only one arch or one side at a time",
    ],
    commonConcerns: [
      {
        concern: "Why can't we do everything in one visit?",
        response:
          "Some steps require healing and bone maturation. Rushing can compromise implant success. The staged plan protects your investment.",
      },
      {
        concern: "Will I be without teeth?",
        response:
          "Many plans include transitional dentures or temporary teeth so you are never fully without a smile during longer healing phases—your doctor will review what applies to you.",
      },
      {
        concern: "Who does what?",
        response:
          "Often an oral surgeon or periodontist handles extractions, grafting, and implant placement; your restorative dentist designs and delivers the final crowns or bridges on the implants.",
      },
    ],
    emotionalContext: {
      hesitant:
        "This is a major decision. The upside is a clear roadmap—each phase has a purpose, and you're not guessing what's next.",
      deciding:
        "You're choosing long-term function and aesthetics. Patients who finish this journey often say it was worth every step.",
      accepted:
        "You're in capable hands. Follow the post-op instructions between phases and communicate openly—we adjust the plan if healing dictates.",
    },
    untreatedConsequences: [
      "Continued bone loss and infection around hopeless teeth",
      "Progressive difficulty eating and speaking",
      "Further collapse of bite vertical dimension and facial support",
    ],
    timelineEstimate:
      "Often 9–18 months from extractions to final implant crowns, depending on grafting and integration; simpler cases may be shorter.",
    costContext:
      "Treatment spans surgical and restorative codes; insurance may cover portions of extractions and some restorative steps. Detailed estimates are given per phase.",
  },

  dentures: {
    id: "dentures",
    specialty: "dental",
    name: "dentures",
    displayName: "Dentures / Partial Dentures",
    description:
      "Dentures are removable replacements for missing teeth and surrounding tissue. Whether you need a full set or a partial to fill in gaps, modern dentures look natural and restore your ability to eat and speak comfortably.",
    indications: [
      "Multiple missing teeth that can't be replaced with fixed options",
      "Need for an affordable replacement for all teeth in an arch",
      "Desire to restore facial appearance affected by missing teeth",
      "Patients who are not candidates for implants or bridges",
    ],
    benefits: [
      "Restores a full, natural-looking smile",
      "Affordable option for replacing multiple or all teeth",
      "Improves chewing ability and nutrition",
      "Supports facial muscles, preventing the sunken look that missing teeth can cause",
      "Can be made quickly compared to implant-based solutions",
    ],
    risks: [
      "Adjustment period as you learn to eat and speak with dentures",
      "May feel loose initially and require adjustments or adhesive",
      "Bone loss continues underneath the denture over time",
    ],
    procedureSteps: [
      "We take impressions and measurements of your mouth and jaw.",
      "A wax model is created so you can preview the look and fit before the final denture is made.",
      "The final denture is crafted from durable, natural-looking materials.",
      "We fit the denture carefully, checking your bite and making fine adjustments for comfort.",
      "Follow-up visits fine-tune the fit as your mouth adjusts.",
    ],
    recovery:
      "New dentures take some getting used to — usually a few weeks. Start with soft foods and practice speaking out loud. Minor sore spots are common and easily adjusted at follow-up visits.",
    alternatives: [
      "Implant-supported dentures (more secure, prevents bone loss)",
      "Dental implants with individual crowns",
      "Dental bridge (for fewer missing teeth)",
    ],
    commonConcerns: [
      {
        concern: "Will people be able to tell?",
        response:
          "Modern dentures are crafted to look very natural — the teeth are custom-colored and shaped to suit your face. Most people won't notice at all.",
      },
      {
        concern: "Will they fall out when I eat or talk?",
        response:
          "It takes a little practice, but most patients adapt quickly. If fit is a concern, implant-supported dentures provide an even more secure option.",
      },
      {
        concern: "Are dentures uncomfortable?",
        response:
          "There's an adjustment period, but once your mouth adapts and we fine-tune the fit, most patients find their dentures comfortable for all-day wear.",
      },
    ],
    emotionalContext: {
      hesitant:
        "Dentures have come a long way — they're not what your grandparents wore. Today's options look great and work well. Let us show you what's possible.",
      deciding:
        "Getting dentures means getting your life back — eating the foods you love, smiling in photos, and feeling like yourself again.",
      accepted:
        "You're going to love having a full smile again. We'll make sure the fit is comfortable and the look is exactly right.",
    },
    untreatedConsequences: [
      "Inability to chew properly, affecting diet and nutrition",
      "Speech difficulties",
      "Facial muscles lose support, leading to a prematurely aged appearance",
      "Remaining teeth may shift or become overloaded and fail",
    ],
    timelineEstimate:
      "Three to five visits over 3–6 weeks for a complete set.",
    costContext:
      "Dentures are one of the most affordable tooth replacement options. Most dental insurance plans provide coverage for dentures. We'll review your benefits and discuss all available options.",
  },

  inlay_onlay: {
    id: "inlay_onlay",
    specialty: "dental",
    name: "inlay_onlay",
    displayName: "Inlays & Onlays",
    description:
      "Inlays and onlays are custom-crafted porcelain or composite restorations that repair moderate damage to a tooth — more than a filling can handle, but less than a full crown requires. Think of them as the Goldilocks solution.",
    indications: [
      "A cavity or area of damage too large for a standard filling",
      "A tooth that doesn't need the full coverage of a crown",
      "Replacing a large, failing old filling",
      "Restoring a tooth with a crack that hasn't reached the nerve",
    ],
    benefits: [
      "Preserves more of your natural tooth than a crown",
      "Stronger and longer-lasting than a large filling",
      "Custom-made for a precise, comfortable fit",
      "Blends seamlessly with your natural tooth color",
    ],
    risks: [
      "Slightly more expensive than a standard filling",
      "Requires two visits (like a crown)",
      "In rare cases, the tooth may later need a full crown if additional damage occurs",
    ],
    procedureSteps: [
      "The damaged or decayed portion of the tooth is removed, and the tooth is shaped to receive the restoration.",
      "A detailed impression or scan is taken and sent to the lab.",
      "A temporary filling protects the tooth while the inlay or onlay is being crafted.",
      "At the second visit, the custom restoration is bonded to the tooth and polished smooth.",
    ],
    recovery:
      "Recovery is minimal — similar to getting a filling. You may notice slight sensitivity for a few days. You can eat normally once the numbness wears off.",
    alternatives: [
      "Large composite filling (less durable for big restorations)",
      "Full crown (more coverage but removes more tooth structure)",
    ],
    commonConcerns: [
      {
        concern: "Why not just a filling?",
        response:
          "When the damaged area is too large, a filling may not hold up well over time. An inlay or onlay is custom-made to fit precisely and is much stronger for bigger repairs.",
      },
      {
        concern: "Why not a crown?",
        response:
          "A crown is a great option when a tooth needs full coverage. But if we can preserve more of your natural tooth with an inlay or onlay, that's usually the better choice.",
      },
      {
        concern: "How long do they last?",
        response:
          "Porcelain inlays and onlays typically last 15–30 years with good care — often longer than large fillings.",
      },
    ],
    emotionalContext: {
      hesitant:
        "This is a conservative, tooth-saving option. We're keeping as much of your natural tooth as possible while giving it the strength it needs.",
      deciding:
        "An inlay or onlay is the sweet spot — stronger than a filling, more conservative than a crown. It's exactly the right amount of treatment.",
      accepted:
        "Great decision! You're choosing the option that best balances preservation of your natural tooth with lasting durability.",
    },
    untreatedConsequences: [
      "The weakened tooth may crack or break under chewing pressure",
      "Decay can continue to progress beneath an old, failing filling",
      "A more extensive (and expensive) crown or root canal may become necessary",
    ],
    timelineEstimate:
      "Two visits over about two weeks.",
    costContext:
      "Inlays and onlays are typically covered similarly to crowns by most dental insurance plans. We'll review your coverage beforehand.",
  },
};

// ---------------------------------------------------------------------------
// Orthodontic Treatments
// ---------------------------------------------------------------------------

export const ORTHO_TREATMENTS: Record<string, TreatmentKnowledge> = {
  braces: {
    id: "braces",
    specialty: "orthodontic",
    name: "braces",
    displayName: "Metal Braces",
    description:
      "Metal braces are the tried-and-true method for straightening teeth and correcting bite issues. Today's braces are smaller, more comfortable, and more effective than ever — and they work for even the most complex cases.",
    indications: [
      "Crooked or crowded teeth",
      "Overbite, underbite, or crossbite",
      "Gaps between teeth",
      "Jaw alignment issues",
      "Complex tooth movements that aligners can't achieve",
    ],
    benefits: [
      "Can correct virtually any alignment or bite issue",
      "Extremely reliable — decades of proven results",
      "Today's brackets are smaller and more comfortable than older designs",
      "You can personalize them with fun colored bands",
      "Often the most cost-effective orthodontic option",
    ],
    risks: [
      "Temporary discomfort after adjustments (easily managed with over-the-counter pain relief)",
      "Requires diligent oral hygiene to prevent staining or cavities around brackets",
      "Certain hard or sticky foods need to be avoided during treatment",
    ],
    procedureSteps: [
      "A thorough examination including X-rays, photos, and impressions maps out your personalized treatment plan.",
      "Small brackets are bonded to each tooth using a gentle adhesive.",
      "A thin wire is threaded through the brackets and secured — this is what guides your teeth into position.",
      "You'll visit us every 4–8 weeks for adjustments that keep your teeth moving on schedule.",
      "When treatment is complete, the braces are removed and a retainer is provided to maintain your beautiful new smile.",
    ],
    recovery:
      "Your teeth and gums may be sore for a few days after braces are placed and after each adjustment. Soft foods, wax for any bracket irritation, and over-the-counter pain relief make it very manageable.",
    alternatives: [
      "Invisalign clear aligners (for mild to moderate cases)",
      "Ceramic braces (less visible brackets)",
      "Lingual braces (brackets behind the teeth)",
    ],
    commonConcerns: [
      {
        concern: "I'm worried about how they'll look.",
        response:
          "Metal braces are incredibly common, and today's brackets are much smaller and sleeker than they used to be. Many patients actually have fun choosing colored bands to express their personality.",
      },
      {
        concern: "Will they hurt?",
        response:
          "You'll feel some pressure and soreness for a few days after placement and adjustments — that means they're working! The discomfort is mild and temporary.",
      },
      {
        concern: "How long will I need them?",
        response:
          "Treatment time varies, but most patients wear braces for 12–24 months. We'll give you a personalized estimate based on your specific needs.",
      },
      {
        concern: "What can't I eat?",
        response:
          "You'll want to avoid very hard foods like ice and popcorn kernels, and sticky things like caramel and taffy. But there's still plenty of delicious food you can enjoy.",
      },
    ],
    emotionalContext: {
      hesitant:
        "We know braces are a commitment. But think of it this way: a year or two of treatment for a lifetime of straight, healthy teeth and a confident smile.",
      deciding:
        "Braces are the gold standard for a reason — they deliver reliable, lasting results. And the time goes by faster than you think.",
      accepted:
        "You're on your way to an amazing smile! We'll make the journey as comfortable and fun as possible.",
    },
    untreatedConsequences: [
      "Crowded teeth are harder to clean, increasing the risk of cavities and gum disease",
      "Bite problems can cause uneven wear on teeth and jaw pain",
      "Misalignment may worsen over time",
      "Speech and chewing difficulties may persist or develop",
    ],
    timelineEstimate:
      "12–24 months on average, with visits every 4–8 weeks.",
    costContext:
      "Metal braces are typically the most affordable orthodontic option. Many insurance plans include orthodontic benefits, and we offer flexible monthly payment plans.",
  },

  invisalign: {
    id: "invisalign",
    specialty: "orthodontic",
    name: "invisalign",
    displayName: "Invisalign Clear Aligners",
    description:
      "Invisalign uses a series of custom-made, nearly invisible plastic trays to gradually move your teeth into the perfect position. It's orthodontic treatment that fits your lifestyle — most people won't even know you're wearing them.",
    indications: [
      "Mild to moderate crowding or spacing",
      "Overbite, underbite, or crossbite (mild to moderate)",
      "Teeth that have shifted after previous orthodontic treatment",
      "Adults and teens who want a discreet straightening option",
    ],
    benefits: [
      "Nearly invisible — most people won't notice you're wearing them",
      "Removable for eating, brushing, and flossing — no food restrictions",
      "Smooth plastic is more comfortable than metal brackets and wires",
      "Fewer office visits compared to traditional braces",
      "You can preview your final result with 3D digital planning before starting",
    ],
    risks: [
      "Requires discipline — aligners must be worn 20–22 hours per day to be effective",
      "May not be suitable for very complex tooth movements",
      "Aligners can be lost or damaged and may need replacement",
    ],
    procedureSteps: [
      "A digital 3D scan of your teeth creates a precise map of your smile.",
      "You'll see a virtual preview of how your teeth will move at each stage and what your final smile will look like.",
      "Your custom aligners are manufactured — you'll receive several sets to change at home every 1–2 weeks.",
      "Check-in visits every 6–10 weeks let us monitor progress and provide your next sets of aligners.",
      "Once treatment is complete, a retainer keeps your teeth in their new perfect position.",
    ],
    recovery:
      "Each new set of aligners may cause mild pressure or soreness for a day or two — that's a sign your teeth are moving. There's no downtime; you can go about your life normally.",
    alternatives: [
      "Metal braces (for more complex cases)",
      "Ceramic braces (visible but tooth-colored brackets)",
      "Lingual braces (hidden behind teeth)",
    ],
    commonConcerns: [
      {
        concern: "Will people see them?",
        response:
          "Invisalign aligners are made from clear, thin plastic. They're designed to be virtually invisible. Most people won't notice them unless you point them out.",
      },
      {
        concern: "Can I eat normally?",
        response:
          "Yes! You remove the aligners to eat and drink, so there are no food restrictions at all. Just brush before putting them back in.",
      },
      {
        concern: "What if I forget to wear them?",
        response:
          "Consistency is key — 20–22 hours per day. Most patients quickly make it a habit. We'll share tips to help you stay on track.",
      },
      {
        concern: "Will Invisalign work for my case?",
        response:
          "Invisalign has advanced significantly and can now treat a wide range of cases. After our evaluation, we'll let you know if it's the right fit for you.",
      },
      {
        concern: "Are they as effective as braces?",
        response:
          "For the right cases, absolutely. Invisalign achieves the same beautiful results — just with a different, more discreet approach.",
      },
    ],
    emotionalContext: {
      hesitant:
        "Invisalign lets you straighten your teeth without changing your daily life. No metal, no food restrictions, and most people won't even know you're in treatment.",
      deciding:
        "Imagine getting the smile you've always wanted without anyone knowing you're in treatment. That's the Invisalign experience.",
      accepted:
        "Exciting! You're about to start a journey to your dream smile — and you'll barely notice the aligners are there.",
    },
    untreatedConsequences: [
      "Misaligned teeth are harder to clean, increasing cavity and gum disease risk",
      "Bite issues may cause jaw pain, headaches, or uneven tooth wear",
      "Teeth may continue to shift further out of alignment over time",
      "Self-consciousness about your smile may hold you back in social and professional settings",
    ],
    timelineEstimate:
      "6–18 months for most cases, with check-ins every 6–10 weeks.",
    costContext:
      "Invisalign is comparable in cost to traditional braces. Many orthodontic insurance plans cover it, and we offer monthly payment plans to fit your budget.",
  },

  ceramic_braces: {
    id: "ceramic_braces",
    specialty: "orthodontic",
    name: "ceramic_braces",
    displayName: "Ceramic Braces",
    description:
      "Ceramic braces work just like traditional braces but use tooth-colored or clear brackets that blend in with your teeth. You get the power and precision of braces with a much more subtle appearance.",
    indications: [
      "Moderate to severe crowding, spacing, or bite issues",
      "Patients who need the reliability of braces but prefer a less noticeable look",
      "Adults and teens who want effective treatment with improved aesthetics",
    ],
    benefits: [
      "Tooth-colored brackets are much less noticeable than metal",
      "Same effectiveness as metal braces for complex movements",
      "Suitable for a wide range of orthodontic issues",
      "A great middle ground between metal braces and Invisalign",
    ],
    risks: [
      "Ceramic brackets can stain if not properly cared for (avoid curry, coffee, and smoking)",
      "Slightly more fragile than metal brackets and may chip under extreme force",
      "Typically cost slightly more than metal braces",
    ],
    procedureSteps: [
      "Comprehensive evaluation with X-rays and impressions to create your treatment plan.",
      "Tooth-colored ceramic brackets are bonded to the front of your teeth.",
      "A wire — sometimes also tooth-colored — is placed to guide tooth movement.",
      "Regular adjustment visits every 4–8 weeks keep treatment on track.",
      "Brackets are removed at the end of treatment, and a retainer is provided.",
    ],
    recovery:
      "Similar to metal braces — expect some soreness for a few days after placement and adjustments. Soft foods and over-the-counter pain relief make it very comfortable.",
    alternatives: [
      "Metal braces (more durable, less expensive)",
      "Invisalign (removable and nearly invisible)",
      "Lingual braces (completely hidden)",
    ],
    commonConcerns: [
      {
        concern: "Will they stain?",
        response:
          "The brackets themselves are stain-resistant. The elastic ties can pick up color from certain foods, but we replace those at every visit. Avoiding dark-colored foods and drinks helps keep everything looking great.",
      },
      {
        concern: "Are they as strong as metal braces?",
        response:
          "Ceramic brackets are very strong. They're slightly more delicate than metal, so we just ask that you be mindful of very hard or sticky foods.",
      },
      {
        concern: "How visible are they really?",
        response:
          "From a conversational distance, most people won't notice them. They blend in surprisingly well with your natural teeth.",
      },
    ],
    emotionalContext: {
      hesitant:
        "Ceramic braces give you the best of both worlds — the proven effectiveness of braces with a look that's much more discreet.",
      deciding:
        "If you need the power of braces but want something less noticeable, ceramic is the perfect choice.",
      accepted:
        "Great pick! You'll get all the benefits of braces with a look that's much more subtle.",
    },
    untreatedConsequences: [
      "Same as metal braces — crowding worsens, bite problems intensify, and oral health risks increase",
      "Teeth are harder to keep clean, raising cavity risk",
      "Jaw strain and uneven wear may develop",
    ],
    timelineEstimate:
      "12–24 months, similar to metal braces, with visits every 4–8 weeks.",
    costContext:
      "Ceramic braces typically cost slightly more than metal braces. Insurance coverage usually applies the same way. We'll walk through all costs and payment plan options.",
  },

  lingual_braces: {
    id: "lingual_braces",
    specialty: "orthodontic",
    name: "lingual_braces",
    displayName: "Lingual Braces",
    description:
      "Lingual braces are placed on the back (tongue side) of your teeth, making them completely invisible from the outside. They're the ultimate option for patients who want powerful orthodontic treatment with zero visible hardware.",
    indications: [
      "Patients who want completely hidden orthodontic treatment",
      "Adults in professional settings where appearance is a priority",
      "Moderate to complex orthodontic cases",
      "Patients who aren't candidates for Invisalign but want an invisible option",
    ],
    benefits: [
      "Completely invisible from the outside — nobody will know",
      "Effective for a wide range of complex cases",
      "Custom-made for each tooth for precise results",
      "No impact on your outward appearance during treatment",
    ],
    risks: [
      "Initial adjustment period — may temporarily affect speech and tongue comfort",
      "Harder to clean than traditional braces (we'll show you how)",
      "Treatment may take slightly longer than standard braces",
      "Higher cost due to the specialized technique required",
    ],
    procedureSteps: [
      "Detailed impressions and scans are used to custom-design brackets that fit the back surfaces of your teeth.",
      "The custom brackets are carefully bonded to the back of each tooth.",
      "A precision wire is placed to guide tooth movement.",
      "Regular adjustment visits keep everything on track.",
      "Brackets are removed at the end of treatment, and your new smile is revealed — though it's been visible to everyone else all along.",
    ],
    recovery:
      "The biggest adjustment is tongue comfort — it may feel crowded for the first week or two. Speech may be slightly affected at first but returns to normal quickly. Wax helps with any initial irritation.",
    alternatives: [
      "Invisalign clear aligners",
      "Ceramic braces (visible but tooth-colored)",
      "Metal braces (most affordable option)",
    ],
    commonConcerns: [
      {
        concern: "Will they affect my speech?",
        response:
          "You may notice a slight lisp for the first week or two as your tongue adjusts. It resolves quickly — most patients speak normally within a few weeks.",
      },
      {
        concern: "Are they uncomfortable?",
        response:
          "Your tongue needs time to adjust to the brackets, but most patients adapt within 2–3 weeks. We provide wax to smooth any areas that cause irritation.",
      },
      {
        concern: "Why are they more expensive?",
        response:
          "Lingual braces require specialized training, custom manufacturing, and more complex appointments. The premium is for the combination of effectiveness and total invisibility.",
      },
    ],
    emotionalContext: {
      hesitant:
        "If keeping your treatment completely private matters to you, lingual braces are the way to go. Nobody will see a thing.",
      deciding:
        "Lingual braces let you get the orthodontic results you need without anyone knowing. It's the most private treatment option available.",
      accepted:
        "Wonderful choice! You're about to start treatment that's completely invisible to the world. Your smile will transform, and no one will know how until the big reveal.",
    },
    untreatedConsequences: [
      "Crooked teeth and bite problems will persist or worsen",
      "Higher risk of decay and gum disease from difficulty cleaning misaligned teeth",
      "Potential for jaw pain and uneven wear",
    ],
    timelineEstimate:
      "18–30 months on average, with adjustments every 4–8 weeks.",
    costContext:
      "Lingual braces are a premium option and are the most expensive type of braces. Some orthodontic insurance benefits apply. We offer payment plans to help manage the investment.",
  },

  expander: {
    id: "expander",
    specialty: "orthodontic",
    name: "expander",
    displayName: "Palatal Expander",
    description:
      "A palatal expander is a custom-fitted device that gently widens the upper jaw over time, creating room for crowded teeth and improving the way upper and lower teeth fit together. It works best in children and young teens whose jaws are still growing.",
    indications: [
      "A narrow upper jaw that causes crowding",
      "Crossbite — where upper teeth bite inside the lower teeth",
      "Crowding that can be resolved by making more room rather than extracting teeth",
      "Breathing or airway issues related to a narrow palate",
    ],
    benefits: [
      "Creates space for crowded teeth without removing any teeth",
      "Corrects crossbites and improves the overall bite relationship",
      "Can improve breathing and reduce snoring in some cases",
      "Takes advantage of natural growth for easier, faster results",
      "Reduces or eliminates the need for extractions later",
    ],
    risks: [
      "A gap may temporarily appear between the two front teeth (this is normal and closes naturally)",
      "Initial pressure and soreness after each activation",
      "Speech may be slightly affected for the first few days",
    ],
    procedureSteps: [
      "Impressions or scans of the upper jaw are taken to custom-fabricate the expander.",
      "The expander is cemented to the upper back teeth — it fits snugly along the roof of the mouth.",
      "A parent or patient turns a small key in the expander once or twice a day (we'll show you exactly how).",
      "Progress is checked every few weeks until the desired expansion is achieved.",
      "The expander stays in place for several more months to let the new bone solidify.",
    ],
    recovery:
      "There's an adjustment period of a few days where speaking and eating may feel different. Each key turn may cause a brief feeling of pressure. Most kids adapt remarkably quickly.",
    alternatives: [
      "Extraction of teeth to create space (more invasive)",
      "Surgical expansion (for adults whose jaws have fully fused)",
    ],
    commonConcerns: [
      {
        concern: "Will my child be in pain?",
        response:
          "They may feel some pressure after each turn of the key — like a gentle tightness — but it usually fades within minutes. Most kids handle it very well.",
      },
      {
        concern: "That gap between the front teeth — is that a problem?",
        response:
          "Not at all — it's actually a great sign that the expander is working. The gap closes naturally over the following weeks, often on its own.",
      },
      {
        concern: "Will it affect eating?",
        response:
          "For the first few days, softer foods are easier. After that, most kids eat normally. They just learn to avoid very sticky foods that could dislodge the device.",
      },
      {
        concern: "How long does it stay in?",
        response:
          "The active expansion phase usually takes 2–4 weeks. After that, the expander stays in place for about 3–6 months to stabilize the result.",
      },
    ],
    emotionalContext: {
      hesitant:
        "It looks more complicated than it is. Thousands of kids go through this every year, and they do great. It's a short phase that prevents much bigger treatments later.",
      deciding:
        "By expanding the jaw now, we're working with your child's natural growth to create the best possible foundation for a healthy smile.",
      accepted:
        "Great! Your child is going to do wonderfully. The adjustment period is quick, and the long-term benefits are huge.",
    },
    untreatedConsequences: [
      "Crowding may worsen and eventually require tooth extraction",
      "Crossbite can cause uneven jaw growth and facial asymmetry",
      "Breathing difficulties may continue or worsen",
      "More complex and expensive orthodontic treatment may be needed later",
    ],
    timelineEstimate:
      "Active expansion: 2–4 weeks. Retention in place: 3–6 months. Total time: about 4–7 months.",
    costContext:
      "Expanders are often included as part of a comprehensive orthodontic treatment plan. Orthodontic insurance benefits typically apply. We'll review all costs upfront.",
  },

  retainer: {
    id: "retainer",
    specialty: "orthodontic",
    name: "retainer",
    displayName: "Retainers",
    description:
      "A retainer holds your teeth in their new position after braces or aligners are removed. It's the essential final step that protects the investment you've made in your smile.",
    indications: [
      "Completion of braces or Invisalign treatment",
      "Minor tooth shifting that can be corrected without full orthodontic treatment",
      "Long-term maintenance of orthodontic results",
    ],
    benefits: [
      "Prevents teeth from shifting back to their old positions",
      "Protects the time and money you invested in orthodontic treatment",
      "Simple to use — becomes part of your routine quickly",
      "Available in several styles to suit your preference",
    ],
    risks: [
      "Teeth can shift if the retainer is not worn as directed",
      "Removable retainers can be lost or broken",
      "Fixed retainers require careful flossing around the wire",
    ],
    procedureSteps: [
      "After braces or aligners are removed, impressions or scans are taken for your custom retainer.",
      "Your retainer is fitted — we ensure it's comfortable and snug.",
      "We explain the wearing schedule: typically full-time for the first few months, then nights only.",
      "Periodic check-ups make sure the retainer still fits well and your teeth are staying in place.",
    ],
    recovery:
      "There's no recovery per se — just a brief adjustment period as you get used to wearing the retainer. Any minor soreness from a new retainer fades within a day or two.",
    alternatives: [
      "Fixed (bonded) retainer — a thin wire glued behind the teeth for hands-free retention",
      "Clear retainer — like an Invisalign tray, virtually invisible",
      "Hawley retainer — traditional wire-and-acrylic, adjustable and durable",
    ],
    commonConcerns: [
      {
        concern: "How long do I have to wear it?",
        response:
          "The honest answer: as long as you want your teeth to stay straight. Most patients wear their retainer every night long-term. It becomes second nature — like brushing your teeth.",
      },
      {
        concern: "What if I forget to wear it for a while?",
        response:
          "If it still fits, put it back in — your teeth may be sore for a day or two as they resettle. If it doesn't fit, come see us. Small shifts can often be corrected before they become a bigger issue.",
      },
      {
        concern: "Will it be uncomfortable?",
        response:
          "A well-fitted retainer should feel snug but not painful. If anything feels off, let us know and we'll adjust it.",
      },
    ],
    emotionalContext: {
      hesitant:
        "After all the effort you put into straightening your teeth, the retainer is what keeps that beautiful result. It's the easiest part of the whole process.",
      deciding:
        "Wearing a retainer is a small commitment that protects a big investment. Your future self will thank you.",
      accepted:
        "You're almost at the finish line! The retainer is the last piece of the puzzle to lock in your perfect smile.",
    },
    untreatedConsequences: [
      "Teeth will begin to shift back toward their original positions — this is called relapse",
      "You may need retreatment with braces or aligners to re-straighten teeth",
      "The investment of time and money in orthodontic treatment can be partially lost",
    ],
    timelineEstimate:
      "Full-time wear for 3–6 months after treatment, then nightly wear long-term.",
    costContext:
      "Retainers are often included in the overall orthodontic treatment fee. Replacement retainers are reasonably priced. We'll make sure you always have what you need.",
  },

  jaw_surgery: {
    id: "jaw_surgery",
    specialty: "orthodontic",
    name: "jaw_surgery",
    displayName: "Orthognathic / Jaw Surgery",
    description:
      "Jaw surgery corrects significant misalignment of the jaws that can't be fixed with braces alone. It improves your bite, facial balance, breathing, and often resolves chronic jaw pain. It's a team effort between your orthodontist and an oral surgeon.",
    indications: [
      "Severe overbite, underbite, or open bite that braces can't fully correct",
      "Facial asymmetry caused by uneven jaw growth",
      "Difficulty chewing or biting due to jaw misalignment",
      "Obstructive sleep apnea related to jaw position",
      "Chronic TMJ (jaw joint) pain that hasn't responded to other treatments",
    ],
    benefits: [
      "Corrects bite problems that orthodontics alone cannot fix",
      "Dramatically improves facial balance and appearance",
      "Can resolve chronic jaw pain, headaches, and TMJ issues",
      "Improves breathing and may eliminate sleep apnea",
      "Creates long-term stability that braces alone could not achieve",
    ],
    risks: [
      "Requires a recovery period of several weeks with dietary restrictions",
      "Temporary numbness in the lip or chin area (usually resolves over months)",
      "As with any surgery, there are small risks of infection or bleeding",
      "Requires braces before and after surgery",
    ],
    procedureSteps: [
      "Comprehensive evaluation with 3D imaging, models, and coordination between your orthodontist and surgeon.",
      "Pre-surgical orthodontics (braces) align the teeth within each jaw — this typically takes 6–18 months.",
      "Surgery is performed under general anesthesia. The jaw bones are repositioned and secured with small plates and screws.",
      "A recovery period follows, during which you'll eat soft foods and gradually return to normal activity.",
      "Post-surgical orthodontics fine-tune your bite and alignment over the following months.",
    ],
    recovery:
      "Expect significant swelling for the first two weeks, which gradually subsides. A liquid and soft food diet is necessary for 4–6 weeks. Most patients return to work or school within 2–4 weeks. Full recovery takes about 3 months.",
    alternatives: [
      "Orthodontics alone (for milder cases)",
      "Orthodontic camouflage (braces to mask the jaw discrepancy without correcting it)",
      "Acceptance and management of symptoms",
    ],
    commonConcerns: [
      {
        concern: "This sounds really scary.",
        response:
          "It's natural to feel that way. Jaw surgery is a well-established procedure performed thousands of times every year. Your surgical team will walk you through every detail so you feel prepared and confident.",
      },
      {
        concern: "How much pain will there be?",
        response:
          "Surprisingly, most patients report less pain than expected. Swelling is the bigger issue. Pain medication keeps you comfortable, and most patients say the discomfort is very manageable.",
      },
      {
        concern: "Will I look different?",
        response:
          "Your facial proportions will improve — that's actually one of the biggest benefits. Most patients love their post-surgery appearance. We can show you simulated results before you decide.",
      },
      {
        concern: "How long is the total process?",
        response:
          "Including pre-surgical braces, surgery, and post-surgical orthodontics, the full journey is typically 2–3 years. But the life-changing results last forever.",
      },
    ],
    emotionalContext: {
      hesitant:
        "We completely understand if this feels like a big decision — because it is. Take your time, ask every question you have, and know that our team has guided many patients through this successfully.",
      deciding:
        "Jaw surgery can be transformative — not just for your bite, but for your comfort, confidence, and quality of life. Many patients say it was the best decision they ever made.",
      accepted:
        "You're incredibly brave, and we're going to take amazing care of you. This is going to change your life for the better.",
    },
    untreatedConsequences: [
      "Bite problems will persist and may worsen with age",
      "Chronic jaw pain and headaches may continue or intensify",
      "Breathing difficulties and sleep apnea may remain untreated",
      "Abnormal wear on teeth can lead to fractures and tooth loss",
      "Facial imbalance may become more pronounced over time",
    ],
    timelineEstimate:
      "Total treatment including pre-surgical orthodontics, surgery, and post-surgical refinement: approximately 2–3 years.",
    costContext:
      "Jaw surgery is often covered by medical insurance (not just dental) because it addresses functional issues like bite and airway problems. We'll work with your insurance to maximize benefits and offer payment plans for any remaining balance.",
  },

  sleep_apnea: {
    id: "sleep_apnea",
    specialty: "orthodontic",
    name: "sleep_apnea",
    displayName: "Sleep Apnea Appliance",
    description:
      "A sleep apnea appliance is a custom-fitted oral device worn at night that positions your lower jaw slightly forward to keep your airway open while you sleep. It's a comfortable, effective alternative to a CPAP machine for many patients.",
    indications: [
      "Mild to moderate obstructive sleep apnea",
      "Patients who can't tolerate a CPAP machine",
      "Snoring that disrupts sleep for you or your partner",
      "Upper airway resistance syndrome",
    ],
    benefits: [
      "Small, portable, and silent — no machine, no mask, no hoses",
      "Comfortable to wear and easy to travel with",
      "Highly effective for mild to moderate sleep apnea",
      "Improves sleep quality, energy, and daytime focus",
      "Can reduce or eliminate snoring",
    ],
    risks: [
      "Temporary jaw soreness or stiffness in the morning (resolves as you adjust)",
      "May cause minor bite changes over long-term use (monitored at regular visits)",
      "Not suitable for severe sleep apnea (CPAP may be necessary)",
    ],
    procedureSteps: [
      "A sleep study confirms the diagnosis and severity of your sleep apnea.",
      "Detailed impressions or scans are taken to create a custom-fitted appliance.",
      "The appliance is fitted and calibrated to gently advance your lower jaw.",
      "We fine-tune the position over a few visits to find the optimal setting.",
      "Follow-up sleep studies may be done to confirm the appliance is working effectively.",
    ],
    recovery:
      "No recovery needed — just an adjustment period of 1–2 weeks as you get used to sleeping with the appliance. Morning jaw exercises (we'll show you) help with any initial stiffness.",
    alternatives: [
      "CPAP machine (the standard for moderate to severe sleep apnea)",
      "Lifestyle changes (weight loss, sleep positioning)",
      "Surgery (for anatomical causes of obstruction)",
    ],
    commonConcerns: [
      {
        concern: "Is this as effective as a CPAP?",
        response:
          "For mild to moderate sleep apnea, oral appliances are very effective. Studies show they work well because people actually use them consistently — unlike CPAP, which many patients abandon.",
      },
      {
        concern: "Will it be uncomfortable to sleep with?",
        response:
          "There's a brief adjustment period, but most patients find the appliance comfortable within a week or two. It's much less intrusive than a CPAP mask.",
      },
      {
        concern: "Will it change my bite?",
        response:
          "Minor bite changes are possible with long-term use, but we monitor for this at every visit. Morning exercises help your jaw return to its normal position each day.",
      },
    ],
    emotionalContext: {
      hesitant:
        "Poor sleep affects every part of your life — your energy, your mood, even your health. This is a simple, non-invasive way to start sleeping better.",
      deciding:
        "If a CPAP hasn't worked for you, an oral appliance could be the solution you've been looking for. It's discreet, comfortable, and effective.",
      accepted:
        "You're about to start getting the restful sleep you deserve. Better sleep means better everything — more energy, better mood, better health.",
    },
    untreatedConsequences: [
      "Untreated sleep apnea significantly increases the risk of heart disease, stroke, and high blood pressure",
      "Chronic fatigue affects work performance, driving safety, and quality of life",
      "Sleep deprivation contributes to weight gain, depression, and memory problems",
      "Relationships can suffer from disruptive snoring and poor sleep",
    ],
    timelineEstimate:
      "Appliance fabrication takes 2–3 weeks. Calibration over 2–4 visits. Noticeable improvement often within the first week of use.",
    costContext:
      "Oral sleep appliances are often covered by medical insurance when prescribed for diagnosed sleep apnea. We'll help coordinate with your insurance provider.",
  },

  space_maintainer: {
    id: "space_maintainer",
    specialty: "orthodontic",
    name: "space_maintainer",
    displayName: "Space Maintainer",
    description:
      "A space maintainer is a small appliance that holds open the space left by a baby tooth that was lost too early, preventing neighboring teeth from drifting and blocking the adult tooth from coming in properly.",
    indications: [
      "A baby tooth lost prematurely due to decay or injury",
      "A baby tooth that was extracted before the adult tooth is ready to come in",
      "Congenitally missing teeth where space needs to be preserved",
    ],
    benefits: [
      "Prevents neighboring teeth from shifting into the empty space",
      "Guides the adult tooth into its correct position",
      "Avoids the need for more complex orthodontic treatment later",
      "Simple, non-invasive, and comfortable for children",
    ],
    risks: [
      "The appliance can occasionally come loose and may need to be recemented",
      "Requires careful cleaning around the device to prevent decay",
      "In rare cases, the device may cause minor irritation to the cheek or tongue",
    ],
    procedureSteps: [
      "An impression or scan of the area is taken to fabricate a custom space maintainer.",
      "The space maintainer is cemented to the teeth adjacent to the gap — it's quick and painless.",
      "Regular checkups monitor the adult tooth's progress and the condition of the appliance.",
      "When the adult tooth is ready to come in, the space maintainer is easily removed.",
    ],
    recovery:
      "No real recovery. Your child may need a day to get used to the feel of the appliance. They can eat and play normally.",
    alternatives: [
      "Monitoring without a maintainer (risk of space loss and future orthodontic treatment)",
      "Removable space maintainer (less secure but can be taken out for cleaning)",
    ],
    commonConcerns: [
      {
        concern: "Does my child really need this?",
        response:
          "If a baby tooth is lost early, the surrounding teeth can drift into the space surprisingly quickly. A space maintainer is a small step now that can prevent a much bigger orthodontic issue later.",
      },
      {
        concern: "Will it bother my child?",
        response:
          "Kids adapt to space maintainers very quickly — usually within a day or two. It's small, smooth, and designed to be comfortable.",
      },
      {
        concern: "How long does it stay in?",
        response:
          "Until the adult tooth starts to come through — that could be a few months to a couple of years, depending on your child's development. We check on it regularly.",
      },
    ],
    emotionalContext: {
      hesitant:
        "Think of a space maintainer as an insurance policy for your child's smile. It's a tiny device that prevents a potentially big problem.",
      deciding:
        "Placing a space maintainer now is one of the smartest things you can do for your child's future dental health. It's simple, quick, and incredibly effective.",
      accepted:
        "Great call! This little device is going to save your child from much more involved treatment down the road.",
    },
    untreatedConsequences: [
      "Adjacent teeth drift into the space, blocking the adult tooth from coming in correctly",
      "The adult tooth may become impacted (stuck in the bone)",
      "Crowding and alignment problems may develop, requiring braces",
      "More extensive and expensive orthodontic treatment may be needed later",
    ],
    timelineEstimate:
      "Placement takes one visit (about 30 minutes). The device stays in place until the adult tooth is ready to erupt.",
    costContext:
      "Space maintainers are very affordable and are typically covered by dental insurance for children. It's a small investment that can prevent thousands of dollars in future orthodontic treatment.",
  },

  headgear: {
    id: "headgear",
    specialty: "orthodontic",
    name: "headgear",
    displayName: "Headgear",
    description:
      "Orthodontic headgear is an external device worn outside the mouth — typically in the evening and while sleeping — that applies gentle force to guide jaw growth and tooth position. It's especially effective in growing children.",
    indications: [
      "An upper jaw that protrudes too far forward (requiring restraint of growth)",
      "A lower jaw that is underdeveloped (requiring forward guidance of growth)",
      "Severe overbite or overjet that braces alone cannot correct",
      "Need to create space by moving back teeth further back in the mouth",
    ],
    benefits: [
      "Guides jaw growth during childhood when it's most effective",
      "Can correct severe bite problems without surgery",
      "Reduces or eliminates the need for jaw surgery later",
      "Only worn part-time — evenings and overnight",
    ],
    risks: [
      "Effectiveness depends on consistent wear (12–14 hours per day typically)",
      "Can feel awkward or uncomfortable initially",
      "May affect social confidence while being worn, though it's mostly at home",
    ],
    procedureSteps: [
      "Your orthodontist evaluates jaw growth patterns with X-rays and measurements.",
      "The headgear is custom-fitted — a strap goes around the back of the head or neck, connecting to the braces or a dental device.",
      "We teach you and your child exactly how to put it on and take it off safely.",
      "Regular check-ups monitor jaw growth and adjust the force as needed.",
      "Once the desired jaw correction is achieved, headgear use is discontinued.",
    ],
    recovery:
      "There's no recovery — just an adjustment period. The first few nights may feel unusual, but most patients get used to it quickly. Any soreness on the teeth subsides within a day or two.",
    alternatives: [
      "Functional appliances (Herbst appliance, twin block) — worn full-time but inside the mouth",
      "Jaw surgery (for adults whose growth is complete)",
      "Extraction-based orthodontics (removing teeth to make space instead)",
    ],
    commonConcerns: [
      {
        concern: "My child won't want to wear it.",
        response:
          "We get it — it's not the most exciting thing. But the good news is it's only worn at home, mostly while sleeping. And the payoff is huge: a properly aligned jaw without surgery.",
      },
      {
        concern: "Is headgear still used? It seems old-fashioned.",
        response:
          "Headgear has evolved and remains one of the most effective tools we have for guiding jaw growth in children. When it's indicated, nothing else works quite as well.",
      },
      {
        concern: "How long will they need to wear it?",
        response:
          "Typically 6–18 months, worn 12–14 hours per day (evenings and overnight). The more consistently it's worn, the faster it works.",
      },
    ],
    emotionalContext: {
      hesitant:
        "We know headgear isn't the most exciting thing to hear about. But for certain growth-related issues, it's the most effective and least invasive option — and it's only worn at home.",
      deciding:
        "Using headgear now, while your child is still growing, can prevent the need for jaw surgery as an adult. It's a short-term commitment for a permanent benefit.",
      accepted:
        "Terrific! Your child's cooperation with headgear is going to pay off in a big way. We'll support them every step of the way.",
    },
    untreatedConsequences: [
      "The jaw discrepancy may worsen as growth continues",
      "Jaw surgery may become necessary later if growth isn't corrected during childhood",
      "Bite problems can lead to difficulty chewing, jaw pain, and abnormal tooth wear",
      "Facial asymmetry may become more pronounced",
    ],
    timelineEstimate:
      "6–18 months of nightly wear (12–14 hours per day), as part of a broader orthodontic plan.",
    costContext:
      "Headgear is usually included in the overall orthodontic treatment fee. Insurance benefits for orthodontic treatment typically apply.",
  },
};

// ---------------------------------------------------------------------------
// Combined Treatments
// ---------------------------------------------------------------------------

export const ALL_TREATMENTS: Record<string, TreatmentKnowledge> = {
  ...DENTAL_TREATMENTS,
  ...ORTHO_TREATMENTS,
};

// ---------------------------------------------------------------------------
// Appointment Contexts
// ---------------------------------------------------------------------------

export const APPOINTMENT_CONTEXTS: AppointmentContext[] = [
  {
    id: "new_patient_consult",
    label: "New Patient Consultation",
    description:
      "The patient is visiting for the first time. They may be nervous, exploring options, or seeking a second opinion. The tone should be welcoming, informative, and pressure-free.",
    specialty: "both",
  },
  {
    id: "follow_up",
    label: "Follow-Up Visit",
    description:
      "The patient has been seen before and is returning to check progress, discuss results, or review next steps. The tone should be warm, familiar, and encouraging.",
    specialty: "both",
  },
  {
    id: "treatment_start",
    label: "Treatment Start",
    description:
      "The patient is beginning their treatment today. They may feel a mix of excitement and nervousness. The tone should be reassuring, motivating, and clear about what to expect.",
    specialty: "both",
  },
  {
    id: "mid_treatment",
    label: "Mid-Treatment Check-In",
    description:
      "The patient is partway through a multi-visit treatment plan. They may need encouragement and a reminder of how far they've come. The tone should be supportive and progress-focused.",
    specialty: "both",
  },
  {
    id: "treatment_complete",
    label: "Treatment Complete",
    description:
      "The patient has finished their treatment. This is a celebratory moment. The tone should be congratulatory, proud, and forward-looking about maintaining results.",
    specialty: "both",
  },
  {
    id: "emergency",
    label: "Emergency Visit",
    description:
      "The patient is in pain or dealing with an urgent issue. The tone should be calm, compassionate, and focused on relief and next steps.",
    specialty: "both",
  },
  {
    id: "second_opinion",
    label: "Second Opinion",
    description:
      "The patient is seeking an alternative perspective on a recommended treatment. The tone should be respectful of their current provider, honest, and educational.",
    specialty: "both",
  },
  {
    id: "financial_discussion",
    label: "Financial Discussion",
    description:
      "The conversation focuses on cost, insurance, and payment options. The tone should be transparent, empathetic, and focused on making care accessible.",
    specialty: "both",
  },
];

// ---------------------------------------------------------------------------
// Video Goals
// ---------------------------------------------------------------------------

export const VIDEO_GOALS: VideoGoal[] = [
  {
    id: "educate",
    label: "Educate",
    description:
      "Help the patient understand their condition and the recommended treatment. Focus on clear explanations, simple analogies, and visual clarity.",
    toneGuidance:
      "Informative and patient. Use everyday language. Avoid overwhelming with details — give them the most important points and let them know they can ask questions.",
  },
  {
    id: "reassure",
    label: "Reassure",
    description:
      "Calm a patient who is anxious or worried about a procedure. Address common fears and normalize their feelings.",
    toneGuidance:
      "Warm, empathetic, and gently confident. Acknowledge their feelings before offering reassurance. Use phrases like 'many patients feel this way' and 'you're in good hands.'",
  },
  {
    id: "convince",
    label: "Convince",
    description:
      "Help a patient who is on the fence understand why the recommended treatment is in their best interest. Focus on consequences of inaction and benefits of treatment.",
    toneGuidance:
      "Honest and caring, never pushy. Present facts and real outcomes. Emphasize the patient's long-term well-being, not the clinic's recommendation. Let the decision feel empowered, not pressured.",
  },
  {
    id: "prepare",
    label: "Prepare",
    description:
      "Get the patient ready for an upcoming procedure. Walk them through what to expect so they arrive informed and confident.",
    toneGuidance:
      "Clear, practical, and encouraging. Step-by-step without being clinical. End with a note of confidence: 'You're going to do great.'",
  },
  {
    id: "follow_up",
    label: "Follow Up",
    description:
      "Check in with a patient after a procedure. Reinforce care instructions, celebrate progress, and address any concerns.",
    toneGuidance:
      "Friendly, supportive, and caring. Ask how they're feeling. Remind them of aftercare steps. Reinforce that healing is on track.",
  },
  {
    id: "celebrate",
    label: "Celebrate",
    description:
      "Mark the completion of treatment. Acknowledge the patient's commitment and celebrate their results.",
    toneGuidance:
      "Upbeat, proud, and congratulatory. Make the patient feel accomplished. Highlight the positive changes and how their commitment paid off.",
  },
];

// ---------------------------------------------------------------------------
// Patient Statuses
// ---------------------------------------------------------------------------

export const PATIENT_STATUSES: PatientStatus[] = [
  {
    id: "undecided",
    label: "Undecided",
    description:
      "The patient hasn't committed to treatment yet. They're exploring, comparing, or thinking it over.",
    introTone:
      "We know you're considering your options, and we want to help you make the best decision for you. Here's some information that might help.",
    outroTone:
      "Take all the time you need. When you're ready, we're here. Don't hesitate to reach out with any questions.",
  },
  {
    id: "hesitant",
    label: "Hesitant",
    description:
      "The patient is leaning toward treatment but has fears or concerns holding them back.",
    introTone:
      "We understand you might have some concerns — that's completely normal. Let's talk through what's on your mind so we can help you feel more comfortable.",
    outroTone:
      "We hope this helped put some of your worries at ease. Remember, our team is here to support you every step of the way. You don't have to face this alone.",
  },
  {
    id: "accepted",
    label: "Accepted Treatment",
    description:
      "The patient has agreed to the recommended treatment and is preparing to begin.",
    introTone:
      "Great news — you've made a wonderful decision for your health! Here's what you can expect as we get started.",
    outroTone:
      "We're excited to get started and we'll be with you every step of the way. If anything comes up before your appointment, don't hesitate to reach out.",
  },
  {
    id: "scheduled",
    label: "Scheduled",
    description:
      "The patient's treatment appointment is booked and coming up.",
    introTone:
      "Your appointment is coming up, and we want to make sure you feel completely prepared and confident. Here's a quick overview of what to expect.",
    outroTone:
      "You're all set! We're looking forward to seeing you. Remember — you're going to do great.",
  },
  {
    id: "in_treatment",
    label: "In Treatment",
    description:
      "The patient is currently undergoing a multi-visit treatment plan.",
    introTone:
      "You're doing amazing! Let's take a look at how things are progressing and what's coming up next.",
    outroTone:
      "Keep up the great work. Every visit brings you closer to the finish line. We're proud of your commitment.",
  },
  {
    id: "post_treatment",
    label: "Post-Treatment",
    description:
      "The patient has completed treatment and is in the maintenance or retention phase.",
    introTone:
      "Congratulations on completing your treatment! Here's how to maintain your beautiful results and keep your smile healthy for the long haul.",
    outroTone:
      "You did it! Your dedication paid off. Keep following your care plan, and don't forget your regular checkups. We're always here if you need us.",
  },
];

// ---------------------------------------------------------------------------
// Lookup Helpers
// ---------------------------------------------------------------------------

export function getTreatment(id: string): TreatmentKnowledge | undefined {
  return ALL_TREATMENTS[id];
}

export function getTreatmentsBySpecialty(
  specialty: "dental" | "orthodontic"
): TreatmentKnowledge[] {
  return Object.values(ALL_TREATMENTS).filter(
    (t) => t.specialty === specialty
  );
}

export function getAppointmentContextsBySpecialty(
  specialty: "dental" | "orthodontic"
): AppointmentContext[] {
  return APPOINTMENT_CONTEXTS.filter(
    (ctx) => ctx.specialty === specialty || ctx.specialty === "both"
  );
}
