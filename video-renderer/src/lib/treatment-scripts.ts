/**
 * treatment-scripts.ts
 *
 * Pre-written, structured treatment script templates for patient education videos.
 * Generates complete narration scripts WITHOUT calling the Claude API, enabling
 * instant video composition from templates + personalization.
 *
 * Supports 12 treatments (8 dental, 4 orthodontic) with full narration text for
 * every section and patient status variant.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScriptSection {
  id: string;
  text: string; // Template text with {{patientName}}, {{doctorName}}, {{clinicName}} placeholders
  durationSeconds: number;
  heading: string;
  bullets?: string[];
}

export interface TreatmentScriptTemplate {
  treatmentId: string;
  specialty: "dental" | "orthodontic";

  intros: {
    undecided: ScriptSection;
    hesitant: ScriptSection;
    accepted: ScriptSection;
    scheduled: ScriptSection;
    in_treatment: ScriptSection;
    post_treatment: ScriptSection;
  };

  explanation: ScriptSection;
  process: ScriptSection;
  importance: ScriptSection;
  outcome: ScriptSection;
  experience: ScriptSection;
  reassurance: ScriptSection;

  outros: {
    undecided: ScriptSection;
    hesitant: ScriptSection;
    accepted: ScriptSection;
    scheduled: ScriptSection;
    in_treatment: ScriptSection;
    post_treatment: ScriptSection;
  };
}

export type PatientStatus =
  | "undecided"
  | "hesitant"
  | "accepted"
  | "scheduled"
  | "in_treatment"
  | "post_treatment";

export type VideoGoal =
  | "educate"
  | "reassure"
  | "convince"
  | "prepare"
  | "follow_up"
  | "celebrate";

export interface PersonalizationInput {
  patientName: string;
  doctorName: string;
  clinicName: string;
  treatmentNotes?: string;
  parentMode?: boolean;
  concerns?: string;
  financing?: string;
}

export interface ComposedScript {
  scenes: {
    intro: ScriptSection;
    explanation: ScriptSection;
    process: ScriptSection;
    importance?: ScriptSection;
    outcome: ScriptSection;
    experience?: ScriptSection;
    reassurance?: ScriptSection;
    notes?: ScriptSection;
    cta: ScriptSection;
  };
  totalDurationSeconds: number;
}

// ---------------------------------------------------------------------------
// Template registry
// ---------------------------------------------------------------------------

const templates: Map<string, TreatmentScriptTemplate> = new Map();

function register(t: TreatmentScriptTemplate): void {
  templates.set(t.treatmentId, t);
}

// ---------------------------------------------------------------------------
// DENTAL TEMPLATES
// ---------------------------------------------------------------------------

// ============================== CROWN ==============================
register({
  treatmentId: "crown",
  specialty: "dental",

  intros: {
    undecided: {
      id: "crown-intro-undecided",
      heading: "A Message For You",
      text: "Hi {{patientName}}, this is a personal message from {{doctorName}} at {{clinicName}}. We recently talked about a crown, and we wanted to share a bit more about what it involves so you can feel confident about your options.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "crown-intro-hesitant",
      heading: "We Understand",
      text: "Hi {{patientName}}, we know dental decisions can feel like a lot, and {{doctorName}} at {{clinicName}} wants you to have all the information you need. Let us walk you through exactly what a crown is and why it was recommended for you.",
      durationSeconds: 9,
    },
    accepted: {
      id: "crown-intro-accepted",
      heading: "Great Decision",
      text: "Hi {{patientName}}, great news that you've decided to move forward with your crown. {{doctorName}} and the team at {{clinicName}} put this together so you know exactly what to expect.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "crown-intro-scheduled",
      heading: "Your Appointment Is Set",
      text: "Hi {{patientName}}, your crown appointment is coming up and {{doctorName}} at {{clinicName}} wanted to make sure you feel prepared. Here is a quick look at what your visit will be like.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "crown-intro-in-treatment",
      heading: "You're On Track",
      text: "Hi {{patientName}}, you're doing great with your crown treatment. {{doctorName}} at {{clinicName}} wanted to send a quick update on how things are progressing and what comes next.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "crown-intro-post-treatment",
      heading: "Looking Great",
      text: "Hi {{patientName}}, congratulations on completing your crown. {{doctorName}} and the team at {{clinicName}} are so glad everything went smoothly. Here are a few tips to keep your new crown in great shape.",
      durationSeconds: 8,
    },
  },

  explanation: {
    id: "crown-explanation",
    heading: "What Is a Crown?",
    text: "A crown is a custom-made cap that fits over your tooth to restore its full strength and shape. Think of it like a protective helmet for a tooth that has been weakened by a large filling, a crack, or decay. Your crown will be made from durable, tooth-colored material so it looks and feels completely natural.",
    durationSeconds: 16,
    bullets: [
      "Custom cap that covers the entire tooth",
      "Restores strength to a weakened tooth",
      "Made from tooth-colored material for a natural look",
    ],
  },

  process: {
    id: "crown-process",
    heading: "How It Works",
    text: "{{doctorName}} will gently reshape the tooth to create space for the crown. A digital scan captures the exact dimensions, so your crown is made to fit perfectly. A comfortable temporary crown protects the tooth while your permanent one is crafted. At your follow-up visit, the permanent crown is placed and adjusted for a precise, comfortable bite.",
    durationSeconds: 18,
    bullets: [
      "Tooth is gently shaped to accept the crown",
      "Digital scan ensures a precise fit",
      "Temporary crown placed while permanent one is crafted",
      "Final crown cemented at follow-up visit",
    ],
  },

  importance: {
    id: "crown-importance",
    heading: "Why It Matters",
    text: "A weakened tooth is at risk of cracking further or breaking down over time. A crown protects the tooth before that happens, which means simpler treatment now rather than more involved treatment later. It is one of the best investments you can make in keeping your natural tooth.",
    durationSeconds: 14,
    bullets: [
      "Prevents further cracking or breakdown",
      "Simpler than alternatives if the tooth breaks",
      "Preserves your natural tooth long-term",
    ],
  },

  outcome: {
    id: "crown-outcome",
    heading: "The Result",
    text: "Once your crown is in place, you will be able to chew comfortably and smile with confidence. Crowns are built to last ten to fifteen years or more with normal care. Most patients say they forget it is even there.",
    durationSeconds: 12,
    bullets: [
      "Full chewing strength restored",
      "Lasts 10-15+ years with proper care",
      "Looks and feels like a natural tooth",
    ],
  },

  experience: {
    id: "crown-experience",
    heading: "What to Expect",
    text: "The appointment typically takes about an hour. The area will be completely numbed, so you should feel only gentle pressure. Most patients are back to eating normally within a day or two. Some mild sensitivity is common for a short time and resolves on its own.",
    durationSeconds: 14,
    bullets: [
      "About one hour for the appointment",
      "Fully numbed for comfort",
      "Back to normal eating in one to two days",
    ],
  },

  reassurance: {
    id: "crown-reassurance",
    heading: "You're in Good Hands",
    text: "Crowns are one of the most common and well-proven treatments in dentistry. {{doctorName}} uses the latest materials and techniques to make sure your crown looks natural and lasts. You are in great hands at {{clinicName}}.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "crown-outro-undecided",
      heading: "We're Here For You",
      text: "Take all the time you need, {{patientName}}. If you have any questions, the team at {{clinicName}} is always happy to chat. We are here whenever you are ready.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "crown-outro-hesitant",
      heading: "No Pressure",
      text: "We completely understand wanting to think it over, {{patientName}}. {{doctorName}} and the team at {{clinicName}} are here to answer any questions at all. There is no rush, just know we are ready when you are.",
      durationSeconds: 8,
    },
    accepted: {
      id: "crown-outro-accepted",
      heading: "Next Steps",
      text: "You have made a great choice, {{patientName}}. Give us a call or book online to schedule your appointment at {{clinicName}}. We look forward to seeing you.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "crown-outro-scheduled",
      heading: "See You Soon",
      text: "We are looking forward to your visit, {{patientName}}. If anything comes up before your appointment, just reach out to the team at {{clinicName}}. See you soon.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "crown-outro-in-treatment",
      heading: "Almost There",
      text: "You are doing great, {{patientName}}. Your permanent crown will be ready before you know it. If you have any questions, {{clinicName}} is just a call away.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "crown-outro-post-treatment",
      heading: "Enjoy Your Smile",
      text: "That is it, {{patientName}}. Your crown is all set and you are good to go. Remember to keep up with your regular checkups at {{clinicName}}, and enjoy your healthy smile.",
      durationSeconds: 7,
    },
  },
});

// ============================== FILLING ==============================
register({
  treatmentId: "filling",
  specialty: "dental",

  intros: {
    undecided: {
      id: "filling-intro-undecided",
      heading: "A Message For You",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} wanted to send you a quick video about the filling we discussed. We want you to feel comfortable and informed before making any decisions.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "filling-intro-hesitant",
      heading: "We Understand",
      text: "Hi {{patientName}}, we know that even a simple filling can feel like a big step. {{doctorName}} at {{clinicName}} wants to walk you through exactly what is involved so there are no surprises.",
      durationSeconds: 8,
    },
    accepted: {
      id: "filling-intro-accepted",
      heading: "Great Decision",
      text: "Hi {{patientName}}, so glad you are moving forward with your filling. {{doctorName}} at {{clinicName}} put this together to help you know what to expect.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "filling-intro-scheduled",
      heading: "You're All Set",
      text: "Hi {{patientName}}, your filling appointment is coming up soon. {{doctorName}} at {{clinicName}} wanted to share a quick overview so you feel ready for your visit.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "filling-intro-in-treatment",
      heading: "Quick Update",
      text: "Hi {{patientName}}, just a quick note from {{doctorName}} at {{clinicName}} about how things are going with your recent filling and what to keep in mind.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "filling-intro-post-treatment",
      heading: "All Done",
      text: "Hi {{patientName}}, your filling is complete and everything looks great. {{doctorName}} at {{clinicName}} wanted to share a few quick care tips with you.",
      durationSeconds: 7,
    },
  },

  explanation: {
    id: "filling-explanation",
    heading: "What Is a Filling?",
    text: "A filling is a simple, effective way to repair a tooth that has a small area of decay. The decayed portion is gently removed and replaced with a tooth-colored composite material that bonds directly to your tooth. It restores the tooth to its original shape and strength so you can eat and smile normally.",
    durationSeconds: 15,
    bullets: [
      "Repairs a tooth with a small area of decay",
      "Tooth-colored composite blends in naturally",
      "Restores full shape and strength",
    ],
  },

  process: {
    id: "filling-process",
    heading: "How It Works",
    text: "First, the area is numbed so you will not feel any discomfort. {{doctorName}} then removes only the decayed portion, keeping as much healthy tooth as possible. A bonding agent is applied, followed by layers of tooth-colored composite. Each layer is hardened with a special light. Finally, the filling is shaped and polished for a smooth, natural feel.",
    durationSeconds: 18,
    bullets: [
      "Area numbed for your comfort",
      "Only decayed material removed",
      "Composite layered and light-cured",
      "Shaped and polished for natural feel",
    ],
  },

  importance: {
    id: "filling-importance",
    heading: "Why It Matters",
    text: "Catching a cavity early means a quick and simple treatment. Left alone, decay continues to grow deeper into the tooth and can eventually reach the nerve, which would require a root canal. Taking care of it now is the simplest and most comfortable path forward.",
    durationSeconds: 13,
    bullets: [
      "Early treatment keeps it quick and simple",
      "Prevents decay from reaching the nerve",
      "Avoids more involved treatment later",
    ],
  },

  outcome: {
    id: "filling-outcome",
    heading: "The Result",
    text: "After your filling, the tooth will look and feel completely normal. Modern composite fillings are strong, stain-resistant, and virtually invisible. With good brushing and regular checkups, your filling can last many years.",
    durationSeconds: 11,
    bullets: [
      "Looks and feels natural",
      "Strong and stain-resistant",
      "Lasts many years with proper care",
    ],
  },

  experience: {
    id: "filling-experience",
    heading: "What to Expect",
    text: "The entire appointment usually takes thirty to forty-five minutes. You will be numb during the procedure and may feel slight sensitivity for a day or two afterward. Most patients eat normally the same day. It is one of the quickest treatments in dentistry.",
    durationSeconds: 13,
    bullets: [
      "About 30-45 minutes total",
      "Minimal sensitivity afterward",
      "Back to normal the same day",
    ],
  },

  reassurance: {
    id: "filling-reassurance",
    heading: "Nothing to Worry About",
    text: "Fillings are the most routine treatment in dentistry, and {{doctorName}} does them every day. With modern numbing techniques, you should not feel a thing. You are in excellent hands at {{clinicName}}.",
    durationSeconds: 10,
  },

  outros: {
    undecided: {
      id: "filling-outro-undecided",
      heading: "We're Here For You",
      text: "Whenever you are ready, {{patientName}}, the team at {{clinicName}} is here. Feel free to call with any questions. We want to make this as easy as possible for you.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "filling-outro-hesitant",
      heading: "Take Your Time",
      text: "No pressure at all, {{patientName}}. We understand, and we want you to feel comfortable. {{doctorName}} and the team at {{clinicName}} are happy to answer any questions you might have.",
      durationSeconds: 7,
    },
    accepted: {
      id: "filling-outro-accepted",
      heading: "Let's Get Scheduled",
      text: "Great choice, {{patientName}}. Go ahead and schedule your appointment at {{clinicName}} whenever it is convenient. This will be quick and easy.",
      durationSeconds: 6,
    },
    scheduled: {
      id: "filling-outro-scheduled",
      heading: "See You Soon",
      text: "We are looking forward to seeing you, {{patientName}}. If you have questions before your appointment, the team at {{clinicName}} is just a call away.",
      durationSeconds: 6,
    },
    in_treatment: {
      id: "filling-outro-in-treatment",
      heading: "Looking Good",
      text: "Everything is looking good, {{patientName}}. Keep up the great oral care and we will see you at your next visit to {{clinicName}}.",
      durationSeconds: 6,
    },
    post_treatment: {
      id: "filling-outro-post-treatment",
      heading: "All Set",
      text: "You are all done, {{patientName}}. Enjoy your healthy tooth and keep up those regular checkups at {{clinicName}}. Take care.",
      durationSeconds: 6,
    },
  },
});

// ============================== ROOT CANAL ==============================
register({
  treatmentId: "root_canal",
  specialty: "dental",

  intros: {
    undecided: {
      id: "root_canal-intro-undecided",
      heading: "A Message For You",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} wanted to share some information about root canal treatment. We know the name can sound intimidating, but the reality is much gentler than you might expect.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "root_canal-intro-hesitant",
      heading: "Let's Clear Things Up",
      text: "Hi {{patientName}}, we understand that a root canal might sound worrying. {{doctorName}} at {{clinicName}} wants to walk you through exactly what it involves. You may be pleasantly surprised by how straightforward it really is.",
      durationSeconds: 9,
    },
    accepted: {
      id: "root_canal-intro-accepted",
      heading: "You Made the Right Call",
      text: "Hi {{patientName}}, we are glad you have decided to move forward with your root canal. {{doctorName}} at {{clinicName}} put this together so you feel fully prepared.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "root_canal-intro-scheduled",
      heading: "Getting You Ready",
      text: "Hi {{patientName}}, your root canal appointment is approaching and {{doctorName}} at {{clinicName}} wanted to make sure you know exactly what to expect. You have got this.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "root_canal-intro-in-treatment",
      heading: "Great Progress",
      text: "Hi {{patientName}}, your root canal treatment is underway and everything is looking good. {{doctorName}} at {{clinicName}} wanted to give you a quick update on the next steps.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "root_canal-intro-post-treatment",
      heading: "All Finished",
      text: "Hi {{patientName}}, your root canal is complete and your tooth is on the road to full recovery. {{doctorName}} at {{clinicName}} has a few tips to share for your comfort and care.",
      durationSeconds: 8,
    },
  },

  explanation: {
    id: "root_canal-explanation",
    heading: "What Is a Root Canal?",
    text: "A root canal treats infection or inflammation deep inside your tooth. Every tooth has a soft center called the pulp that contains nerves and blood vessels. When that area gets infected, a root canal removes the infected tissue and seals the tooth so it can stay in your mouth, healthy and pain-free.",
    durationSeconds: 16,
    bullets: [
      "Treats infection deep inside the tooth",
      "Removes infected pulp tissue",
      "Saves your natural tooth",
    ],
  },

  process: {
    id: "root_canal-process",
    heading: "How It Works",
    text: "{{doctorName}} will numb the area completely so you feel comfortable the entire time. A tiny opening is made to access the inside of the tooth. Using precise instruments, the infected tissue is gently removed and the canals are thoroughly cleaned and disinfected. The space is filled with a safe, biocompatible material, and the tooth is sealed. A crown is usually placed afterward to protect and strengthen the tooth.",
    durationSeconds: 20,
    bullets: [
      "Area fully numbed for comfort",
      "Infected tissue carefully removed",
      "Canals cleaned and sealed",
      "Crown placed to protect the tooth",
    ],
  },

  importance: {
    id: "root_canal-importance",
    heading: "Why It Matters",
    text: "An infected tooth will not heal on its own, and the infection can spread to surrounding bone and tissue. A root canal stops the infection, relieves pain, and saves your natural tooth. The alternative would be removing the tooth entirely, which leads to more complex replacement options.",
    durationSeconds: 14,
    bullets: [
      "Stops infection from spreading",
      "Relieves pain at the source",
      "Saves the natural tooth",
    ],
  },

  outcome: {
    id: "root_canal-outcome",
    heading: "The Result",
    text: "After treatment, the tooth will be pain-free and fully functional. With a crown on top, it will be strong enough for normal chewing and can last a lifetime. Most patients are amazed at how much better they feel right away.",
    durationSeconds: 12,
    bullets: [
      "Pain-free and fully functional",
      "Strong enough for normal eating",
      "Can last a lifetime with a crown",
    ],
  },

  experience: {
    id: "root_canal-experience",
    heading: "What to Expect",
    text: "Modern root canals are far more comfortable than most people expect. The appointment typically takes sixty to ninety minutes. You will be numb the entire time and most patients compare it to getting a filling. Some tenderness for a few days is normal and responds well to over-the-counter pain relief.",
    durationSeconds: 15,
    bullets: [
      "About 60-90 minutes",
      "Comparable to getting a filling",
      "Mild tenderness for a few days",
    ],
  },

  reassurance: {
    id: "root_canal-reassurance",
    heading: "Modern and Comfortable",
    text: "Root canals have come a long way. Today's techniques use precision instruments and advanced numbing to keep you comfortable throughout. {{doctorName}} at {{clinicName}} has extensive experience and will take great care of you.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "root_canal-outro-undecided",
      heading: "We're Here For You",
      text: "We are here whenever you are ready to talk, {{patientName}}. Please do not hesitate to reach out to the team at {{clinicName}} with any questions at all.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "root_canal-outro-hesitant",
      heading: "We Understand",
      text: "We completely understand if you need time to think, {{patientName}}. {{doctorName}} and the team at {{clinicName}} are always available to answer your questions and help you feel confident.",
      durationSeconds: 8,
    },
    accepted: {
      id: "root_canal-outro-accepted",
      heading: "Smart Move",
      text: "You are making a great decision for your health, {{patientName}}. Let us get you scheduled at {{clinicName}}. This is going to go smoothly.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "root_canal-outro-scheduled",
      heading: "See You Soon",
      text: "You are going to do great, {{patientName}}. We will see you at your appointment. If anything comes up, the team at {{clinicName}} is always here.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "root_canal-outro-in-treatment",
      heading: "Almost Done",
      text: "You are almost there, {{patientName}}. The hardest part is behind you. We will see you soon at {{clinicName}} to finish up.",
      durationSeconds: 6,
    },
    post_treatment: {
      id: "root_canal-outro-post-treatment",
      heading: "Congratulations",
      text: "You did it, {{patientName}}. Your tooth is saved and you should feel great about that. Keep up with your visits to {{clinicName}} and enjoy the relief.",
      durationSeconds: 7,
    },
  },
});

// ============================== IMPLANT ==============================
register({
  treatmentId: "implant",
  specialty: "dental",

  intros: {
    undecided: {
      id: "implant-intro-undecided",
      heading: "A Message For You",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} wanted to share some information about dental implants. Whether you are still exploring your options or just want to learn more, this video is for you.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "implant-intro-hesitant",
      heading: "Let Us Walk You Through It",
      text: "Hi {{patientName}}, we know a dental implant sounds like a big step, and we want you to feel completely informed. {{doctorName}} at {{clinicName}} put this together to answer the questions we hear most.",
      durationSeconds: 8,
    },
    accepted: {
      id: "implant-intro-accepted",
      heading: "Exciting News",
      text: "Hi {{patientName}}, we are thrilled you have decided to go ahead with your implant. {{doctorName}} at {{clinicName}} wanted to share exactly what the journey looks like from here.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "implant-intro-scheduled",
      heading: "Getting Ready",
      text: "Hi {{patientName}}, your implant appointment is on the calendar and {{doctorName}} at {{clinicName}} wanted to walk you through what to expect so you feel fully prepared.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "implant-intro-in-treatment",
      heading: "You're Doing Great",
      text: "Hi {{patientName}}, your implant is healing well and {{doctorName}} at {{clinicName}} wanted to update you on how things are progressing and what the next steps look like.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "implant-intro-post-treatment",
      heading: "Your New Tooth",
      text: "Hi {{patientName}}, congratulations on your completed implant. {{doctorName}} and the team at {{clinicName}} are so happy with how everything turned out. Here is what to know going forward.",
      durationSeconds: 8,
    },
  },

  explanation: {
    id: "implant-explanation",
    heading: "What Is an Implant?",
    text: "A dental implant is a small titanium post that is placed in the jawbone to serve as an artificial tooth root. Once it heals, a custom-made crown is attached on top. The result is a replacement tooth that looks, feels, and functions just like a natural one. It is the closest thing to getting your real tooth back.",
    durationSeconds: 17,
    bullets: [
      "Titanium post acts as an artificial root",
      "Custom crown placed on top",
      "Looks and functions like a natural tooth",
    ],
  },

  process: {
    id: "implant-process",
    heading: "How It Works",
    text: "{{doctorName}} will place the implant into the jawbone during a comfortable, numbed procedure. Over the next three to six months, the bone naturally bonds with the titanium, creating a rock-solid foundation. This process is called osseointegration. Once healed, a connector piece and a beautiful custom crown are attached. The entire process is carefully planned using digital imaging for precision.",
    durationSeconds: 20,
    bullets: [
      "Implant placed in a comfortable procedure",
      "Bone bonds with titanium over 3-6 months",
      "Custom crown attached once healed",
      "Digital imaging ensures precision",
    ],
  },

  importance: {
    id: "implant-importance",
    heading: "Why It Matters",
    text: "When a tooth is missing, the jawbone beneath it starts to shrink over time. Neighboring teeth can shift out of position, and your bite can change. An implant prevents all of this by maintaining bone density and keeping surrounding teeth stable. It is an investment that protects your entire smile.",
    durationSeconds: 14,
    bullets: [
      "Prevents jawbone loss",
      "Keeps neighboring teeth in place",
      "Protects your overall bite alignment",
    ],
  },

  outcome: {
    id: "implant-outcome",
    heading: "The Result",
    text: "Your implant will let you eat, speak, and smile with total confidence. Unlike bridges or dentures, implants do not affect your other teeth. With normal care, they can last a lifetime. Many patients say it is the best dental decision they ever made.",
    durationSeconds: 13,
    bullets: [
      "Eat and smile with full confidence",
      "Does not affect neighboring teeth",
      "Can last a lifetime",
    ],
  },

  experience: {
    id: "implant-experience",
    heading: "What to Expect",
    text: "The placement appointment is usually about an hour. Most patients are surprised by how comfortable it is. You may have mild soreness for a few days, easily managed with over-the-counter relief. During the healing phase, you will have follow-up visits so {{doctorName}} can monitor your progress.",
    durationSeconds: 14,
    bullets: [
      "Placement takes about one hour",
      "Mild soreness for a few days",
      "Follow-up visits during healing",
    ],
  },

  reassurance: {
    id: "implant-reassurance",
    heading: "Proven and Reliable",
    text: "Dental implants have a success rate above ninety-five percent and have been used for decades. {{doctorName}} at {{clinicName}} uses the latest techniques and materials to give you the best possible result. You are in excellent hands.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "implant-outro-undecided",
      heading: "Take Your Time",
      text: "There is no rush, {{patientName}}. When you are ready to learn more or move forward, the team at {{clinicName}} is here for you. Just give us a call.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "implant-outro-hesitant",
      heading: "We're Here to Help",
      text: "We want you to feel completely confident, {{patientName}}. {{doctorName}} at {{clinicName}} is happy to schedule a follow-up conversation to answer all your questions.",
      durationSeconds: 7,
    },
    accepted: {
      id: "implant-outro-accepted",
      heading: "Let's Get Started",
      text: "This is going to be a wonderful change, {{patientName}}. Let us get your first appointment on the books at {{clinicName}}. We are excited for you.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "implant-outro-scheduled",
      heading: "See You Soon",
      text: "We are looking forward to getting started, {{patientName}}. If you have any questions before your appointment, the team at {{clinicName}} is just a call away.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "implant-outro-in-treatment",
      heading: "Progressing Nicely",
      text: "Everything is right on track, {{patientName}}. Your new tooth is going to be worth the wait. We will see you at your next visit to {{clinicName}}.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "implant-outro-post-treatment",
      heading: "Enjoy Your Smile",
      text: "That is it, {{patientName}}. Your new tooth is in place and ready to go. Treat it just like a natural tooth, keep up your checkups at {{clinicName}}, and enjoy it for years to come.",
      durationSeconds: 8,
    },
  },
});

// ============================== EXTRACTION ==============================
register({
  treatmentId: "extraction",
  specialty: "dental",

  intros: {
    undecided: {
      id: "extraction-intro-undecided",
      heading: "A Message For You",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} wanted to share some information about the extraction we discussed. We know it might feel like a big decision, and we want to make sure you have all the facts.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "extraction-intro-hesitant",
      heading: "We're Here For You",
      text: "Hi {{patientName}}, it is perfectly normal to feel unsure about an extraction. {{doctorName}} at {{clinicName}} put this together to walk you through everything so you can feel at ease.",
      durationSeconds: 8,
    },
    accepted: {
      id: "extraction-intro-accepted",
      heading: "Good Decision",
      text: "Hi {{patientName}}, we are glad you have decided to move forward. {{doctorName}} at {{clinicName}} wants to make sure you know exactly what your extraction appointment will look like.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "extraction-intro-scheduled",
      heading: "Your Appointment Is Set",
      text: "Hi {{patientName}}, your extraction is coming up and {{doctorName}} at {{clinicName}} wants you to feel confident and prepared. Here is a quick walkthrough.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "extraction-intro-in-treatment",
      heading: "Healing Nicely",
      text: "Hi {{patientName}}, your extraction site is healing and {{doctorName}} at {{clinicName}} wanted to share some tips to help everything recover smoothly.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "extraction-intro-post-treatment",
      heading: "All Healed Up",
      text: "Hi {{patientName}}, your extraction site has healed well and {{doctorName}} at {{clinicName}} is happy with your progress. Let us talk about what comes next.",
      durationSeconds: 7,
    },
  },

  explanation: {
    id: "extraction-explanation",
    heading: "What Is an Extraction?",
    text: "An extraction means gently removing a tooth that can no longer be saved or that is causing problems. Sometimes a tooth has too much damage, infection, or crowding to be repaired. Removing it allows the area to heal properly and opens the door to a comfortable replacement option if needed.",
    durationSeconds: 15,
    bullets: [
      "Removes a tooth that cannot be repaired",
      "Allows the area to heal properly",
      "Opens the door for replacement options",
    ],
  },

  process: {
    id: "extraction-process",
    heading: "How It Works",
    text: "{{doctorName}} will thoroughly numb the area so you stay comfortable. Using gentle, precise movements, the tooth is carefully loosened and removed. Modern instruments make the process much quicker and smoother than you might imagine. The site is cleaned and you will receive clear instructions for care at home. The whole visit is typically quite short.",
    durationSeconds: 17,
    bullets: [
      "Area thoroughly numbed",
      "Tooth carefully loosened and removed",
      "Modern instruments for a quick process",
      "Clear home care instructions provided",
    ],
  },

  importance: {
    id: "extraction-importance",
    heading: "Why It Matters",
    text: "A tooth that is severely damaged or infected can cause ongoing pain and put neighboring teeth at risk. Removing it stops the discomfort and prevents the problem from spreading. It is a fresh start for that area of your mouth.",
    durationSeconds: 12,
    bullets: [
      "Stops ongoing pain",
      "Prevents spread to neighboring teeth",
      "A fresh start for healing",
    ],
  },

  outcome: {
    id: "extraction-outcome",
    heading: "The Result",
    text: "Once healed, you will feel much more comfortable. The area typically recovers within one to two weeks. {{doctorName}} will discuss replacement options like an implant or bridge to restore your full smile and chewing ability.",
    durationSeconds: 12,
    bullets: [
      "Relief from pain and discomfort",
      "Full healing in one to two weeks",
      "Replacement options to restore your smile",
    ],
  },

  experience: {
    id: "extraction-experience",
    heading: "What to Expect",
    text: "The appointment is usually thirty to sixty minutes. You will be numb during the procedure and should feel only pressure, not pain. Afterward, some swelling and tenderness are normal for a few days. Ice packs, soft foods, and rest will have you feeling better quickly.",
    durationSeconds: 14,
    bullets: [
      "About 30-60 minutes",
      "Pressure but not pain during the procedure",
      "Swelling subsides within a few days",
    ],
  },

  reassurance: {
    id: "extraction-reassurance",
    heading: "You'll Be Comfortable",
    text: "Extractions today are far gentler than you might expect. {{doctorName}} at {{clinicName}} uses modern techniques and will make sure you are comfortable throughout. Many patients say it was much easier than they imagined.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "extraction-outro-undecided",
      heading: "Questions Welcome",
      text: "We are here for you, {{patientName}}. If you would like to talk through your options, the team at {{clinicName}} is ready to help whenever you are.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "extraction-outro-hesitant",
      heading: "No Rush At All",
      text: "Take the time you need, {{patientName}}. {{doctorName}} at {{clinicName}} is always available to talk through any concerns. We are on your side.",
      durationSeconds: 7,
    },
    accepted: {
      id: "extraction-outro-accepted",
      heading: "Let's Schedule",
      text: "Great decision, {{patientName}}. Give us a call at {{clinicName}} and we will find a time that works for you. You are going to feel so much better.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "extraction-outro-scheduled",
      heading: "Ready For You",
      text: "We are ready for you, {{patientName}}. See you at your appointment. The team at {{clinicName}} is here if you need anything before then.",
      durationSeconds: 6,
    },
    in_treatment: {
      id: "extraction-outro-in-treatment",
      heading: "Healing Well",
      text: "You are healing nicely, {{patientName}}. Keep following those care instructions and reach out to {{clinicName}} if you have any questions.",
      durationSeconds: 6,
    },
    post_treatment: {
      id: "extraction-outro-post-treatment",
      heading: "What's Next",
      text: "Your healing looks great, {{patientName}}. When you are ready to discuss replacement options, the team at {{clinicName}} is here. Take care.",
      durationSeconds: 7,
    },
  },
});

// ============================== VENEERS ==============================
register({
  treatmentId: "veneers",
  specialty: "dental",

  intros: {
    undecided: {
      id: "veneers-intro-undecided",
      heading: "A Message For You",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} wanted to share a bit about porcelain veneers with you. If you have been curious about transforming your smile, this is a great place to start.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "veneers-intro-hesitant",
      heading: "Let's Talk About It",
      text: "Hi {{patientName}}, we know veneers are an investment and you want to make sure it is right for you. {{doctorName}} at {{clinicName}} wants to walk you through what is involved so you can decide with confidence.",
      durationSeconds: 8,
    },
    accepted: {
      id: "veneers-intro-accepted",
      heading: "This Is Exciting",
      text: "Hi {{patientName}}, we are so excited you are going ahead with veneers. {{doctorName}} at {{clinicName}} put together this video so you know exactly what the process looks like.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "veneers-intro-scheduled",
      heading: "Get Ready to Smile",
      text: "Hi {{patientName}}, your veneer appointment is coming up. {{doctorName}} at {{clinicName}} wanted to give you a preview of your smile transformation journey.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "veneers-intro-in-treatment",
      heading: "Looking Amazing",
      text: "Hi {{patientName}}, your veneers are being crafted and {{doctorName}} at {{clinicName}} wanted to give you an update on where things stand. The best part is almost here.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "veneers-intro-post-treatment",
      heading: "Your New Smile",
      text: "Hi {{patientName}}, your new veneers look stunning. {{doctorName}} and the team at {{clinicName}} are so happy with the result. Here is how to keep them looking their best.",
      durationSeconds: 8,
    },
  },

  explanation: {
    id: "veneers-explanation",
    heading: "What Are Veneers?",
    text: "Veneers are ultra-thin porcelain shells that are custom-made to fit over the front of your teeth. They can transform the color, shape, size, and overall appearance of your smile. Think of them as a beautiful, durable new surface for teeth that may be chipped, stained, uneven, or simply not the way you want them.",
    durationSeconds: 16,
    bullets: [
      "Ultra-thin custom porcelain shells",
      "Transform color, shape, and alignment",
      "Cover chips, stains, and imperfections",
    ],
  },

  process: {
    id: "veneers-process",
    heading: "How It Works",
    text: "{{doctorName}} will start by preparing your teeth with a very small amount of reshaping, about the thickness of a fingernail. Impressions or digital scans are taken and sent to a specialty lab where your veneers are handcrafted. Temporary veneers protect your teeth while you wait. At your final visit, each veneer is precisely bonded in place and adjusted for a perfect fit and gorgeous result.",
    durationSeconds: 19,
    bullets: [
      "Minimal tooth preparation",
      "Custom crafted in a specialty lab",
      "Temporary veneers while you wait",
      "Precisely bonded for a perfect fit",
    ],
  },

  importance: {
    id: "veneers-importance",
    heading: "Why Veneers",
    text: "Veneers offer a transformation that whitening and bonding alone cannot achieve. They correct multiple cosmetic concerns at once and resist staining far better than natural enamel. If you have been self-conscious about your smile, veneers can give you the lasting confidence you deserve.",
    durationSeconds: 13,
    bullets: [
      "Address multiple cosmetic concerns at once",
      "Resist staining better than natural enamel",
      "Lasting confidence in your smile",
    ],
  },

  outcome: {
    id: "veneers-outcome",
    heading: "The Result",
    text: "You will walk out with a bright, even, natural-looking smile that you will want to show off. Porcelain veneers can last ten to twenty years with proper care. They are stain-resistant and maintain their beautiful appearance over time.",
    durationSeconds: 12,
    bullets: [
      "Bright, even, natural appearance",
      "Last 10-20 years",
      "Stain-resistant and durable",
    ],
  },

  experience: {
    id: "veneers-experience",
    heading: "What to Expect",
    text: "The process typically takes two to three visits over a few weeks. There is minimal discomfort since very little tooth structure is removed. Some patients feel mild sensitivity after preparation, which fades quickly. Once your final veneers are placed, you can eat and smile normally right away.",
    durationSeconds: 14,
    bullets: [
      "Two to three visits over a few weeks",
      "Minimal discomfort during preparation",
      "Eat and smile normally right away",
    ],
  },

  reassurance: {
    id: "veneers-reassurance",
    heading: "A Proven Transformation",
    text: "Porcelain veneers have been trusted by millions of people to transform their smiles. {{doctorName}} at {{clinicName}} has the artistic eye and technical skill to create a result that looks perfectly natural. You are going to love it.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "veneers-outro-undecided",
      heading: "Let's Explore Together",
      text: "If you would like to learn more, {{patientName}}, the team at {{clinicName}} would love to show you some before-and-after examples. Just reach out when you are ready.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "veneers-outro-hesitant",
      heading: "No Pressure",
      text: "Take your time deciding, {{patientName}}. {{doctorName}} at {{clinicName}} is happy to do a trial smile or discuss options so you feel one hundred percent sure.",
      durationSeconds: 7,
    },
    accepted: {
      id: "veneers-outro-accepted",
      heading: "Let's Go",
      text: "This is going to be amazing, {{patientName}}. Let us get your first appointment scheduled at {{clinicName}}. Your dream smile is closer than you think.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "veneers-outro-scheduled",
      heading: "Almost Time",
      text: "We are so excited for you, {{patientName}}. See you at your appointment. The team at {{clinicName}} is ready to create something beautiful.",
      durationSeconds: 6,
    },
    in_treatment: {
      id: "veneers-outro-in-treatment",
      heading: "Worth the Wait",
      text: "Hang in there, {{patientName}}. Your custom veneers are being crafted and the final result is going to be incredible. We will see you soon at {{clinicName}}.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "veneers-outro-post-treatment",
      heading: "Shine Bright",
      text: "Enjoy your beautiful new smile, {{patientName}}. Keep up with gentle care and regular visits to {{clinicName}}, and your veneers will look amazing for years.",
      durationSeconds: 7,
    },
  },
});

// ============================== BRIDGE ==============================
register({
  treatmentId: "bridge",
  specialty: "dental",

  intros: {
    undecided: {
      id: "bridge-intro-undecided",
      heading: "A Message For You",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} wanted to share some information about dental bridges. If you are looking for a reliable way to fill a gap in your smile, this video covers everything you need to know.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "bridge-intro-hesitant",
      heading: "Let Us Explain",
      text: "Hi {{patientName}}, we understand you might have questions about getting a bridge. {{doctorName}} at {{clinicName}} put this together to give you a clear picture of the process and the benefits.",
      durationSeconds: 8,
    },
    accepted: {
      id: "bridge-intro-accepted",
      heading: "Great Choice",
      text: "Hi {{patientName}}, wonderful that you have decided to move forward with a bridge. {{doctorName}} at {{clinicName}} wants to make sure you know what to expect at each step.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "bridge-intro-scheduled",
      heading: "Your Appointment Awaits",
      text: "Hi {{patientName}}, your bridge appointment is on the schedule. {{doctorName}} at {{clinicName}} put this together so you feel confident and ready.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "bridge-intro-in-treatment",
      heading: "Progress Update",
      text: "Hi {{patientName}}, your bridge is being created and {{doctorName}} at {{clinicName}} wanted to share a quick update on your progress. You are almost there.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "bridge-intro-post-treatment",
      heading: "Complete Smile",
      text: "Hi {{patientName}}, your new bridge looks wonderful. {{doctorName}} at {{clinicName}} is thrilled with the result. Here is how to take care of it.",
      durationSeconds: 7,
    },
  },

  explanation: {
    id: "bridge-explanation",
    heading: "What Is a Bridge?",
    text: "A dental bridge is a fixed restoration that fills the gap left by a missing tooth. It works by anchoring a replacement tooth to the strong teeth on either side. The result is a natural-looking, permanent solution that restores your ability to chew and speak comfortably and prevents your other teeth from shifting.",
    durationSeconds: 16,
    bullets: [
      "Fills the gap from a missing tooth",
      "Anchors to neighboring teeth",
      "Prevents other teeth from shifting",
    ],
  },

  process: {
    id: "bridge-process",
    heading: "How It Works",
    text: "{{doctorName}} prepares the teeth on either side of the gap by reshaping them to support the bridge. Precise impressions or digital scans are taken so the bridge fits perfectly. A temporary bridge protects the area while the permanent one is crafted in a lab. At your next visit, the custom bridge is cemented securely in place and fine-tuned for comfort.",
    durationSeconds: 18,
    bullets: [
      "Supporting teeth gently prepared",
      "Precise impressions taken",
      "Temporary bridge while permanent is crafted",
      "Final bridge cemented and adjusted",
    ],
  },

  importance: {
    id: "bridge-importance",
    heading: "Why It Matters",
    text: "A missing tooth is more than a cosmetic concern. Over time, surrounding teeth drift into the gap, which can change your bite and make other teeth harder to clean. A bridge holds everything in place and restores proper function before these changes happen.",
    durationSeconds: 13,
    bullets: [
      "Prevents teeth from drifting",
      "Maintains your natural bite",
      "Restores full chewing function",
    ],
  },

  outcome: {
    id: "bridge-outcome",
    heading: "The Result",
    text: "Your bridge will look and feel like natural teeth. You will chew normally, speak clearly, and smile confidently. With good care and regular checkups, a bridge typically lasts ten to fifteen years or longer.",
    durationSeconds: 11,
    bullets: [
      "Looks and feels natural",
      "Restores chewing and speech",
      "Lasts 10-15+ years",
    ],
  },

  experience: {
    id: "bridge-experience",
    heading: "What to Expect",
    text: "The process takes two visits over about two weeks. Each visit is roughly an hour. The area is numbed so you stay comfortable. Mild sensitivity after the preparation visit is normal and fades within a day or two. Once the final bridge is in, you can eat normally right away.",
    durationSeconds: 14,
    bullets: [
      "Two visits over about two weeks",
      "About one hour per visit",
      "Eat normally once final bridge is placed",
    ],
  },

  reassurance: {
    id: "bridge-reassurance",
    heading: "Time-Tested Solution",
    text: "Bridges have been restoring smiles for decades and the materials today are better than ever. {{doctorName}} at {{clinicName}} will ensure your bridge fits beautifully and feels completely natural. This is well-proven, reliable treatment.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "bridge-outro-undecided",
      heading: "Happy to Help",
      text: "Whenever you are ready to explore this further, {{patientName}}, the team at {{clinicName}} is here. We are happy to answer any questions you have.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "bridge-outro-hesitant",
      heading: "We Understand",
      text: "No rush at all, {{patientName}}. {{doctorName}} at {{clinicName}} is available to discuss whether a bridge or another option is the best fit for you.",
      durationSeconds: 7,
    },
    accepted: {
      id: "bridge-outro-accepted",
      heading: "Let's Do This",
      text: "Wonderful choice, {{patientName}}. Give us a call at {{clinicName}} to get scheduled. Your complete smile is just around the corner.",
      durationSeconds: 6,
    },
    scheduled: {
      id: "bridge-outro-scheduled",
      heading: "See You Soon",
      text: "We look forward to seeing you, {{patientName}}. If you have any questions, the team at {{clinicName}} is always here for you.",
      durationSeconds: 6,
    },
    in_treatment: {
      id: "bridge-outro-in-treatment",
      heading: "Almost Done",
      text: "Your permanent bridge is on its way, {{patientName}}. We will see you soon at {{clinicName}} for the final placement. It is going to look great.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "bridge-outro-post-treatment",
      heading: "Enjoy",
      text: "Your smile is complete, {{patientName}}. Take care of your bridge with regular brushing, flossing, and visits to {{clinicName}}. It looks wonderful.",
      durationSeconds: 7,
    },
  },
});

// ============================== WHITENING ==============================
register({
  treatmentId: "whitening",
  specialty: "dental",

  intros: {
    undecided: {
      id: "whitening-intro-undecided",
      heading: "A Message For You",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} wanted to share some information about professional teeth whitening. If you have been thinking about brightening your smile, this is for you.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "whitening-intro-hesitant",
      heading: "Is Whitening Right For You?",
      text: "Hi {{patientName}}, wondering whether whitening is worth it? {{doctorName}} at {{clinicName}} understands, and we want to show you what professional-grade results really look like compared to what you can get at home.",
      durationSeconds: 8,
    },
    accepted: {
      id: "whitening-intro-accepted",
      heading: "Let's Brighten Things Up",
      text: "Hi {{patientName}}, so glad you are going ahead with whitening. {{doctorName}} at {{clinicName}} put this together so you know what to expect and how to get the best results.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "whitening-intro-scheduled",
      heading: "Smile Day Is Coming",
      text: "Hi {{patientName}}, your whitening appointment is coming up. {{doctorName}} at {{clinicName}} wanted to share a few things to help you get the most out of your treatment.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "whitening-intro-in-treatment",
      heading: "Getting Brighter",
      text: "Hi {{patientName}}, your whitening treatment is underway and {{doctorName}} at {{clinicName}} wanted to check in with some tips to maximize your results.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "whitening-intro-post-treatment",
      heading: "Bright and Beautiful",
      text: "Hi {{patientName}}, your whitening looks fantastic. {{doctorName}} at {{clinicName}} is so happy with the result. Here is how to keep that brightness lasting.",
      durationSeconds: 7,
    },
  },

  explanation: {
    id: "whitening-explanation",
    heading: "What Is Professional Whitening?",
    text: "Professional teeth whitening uses a clinical-strength gel to safely lift years of staining from your enamel. Unlike store-bought strips, professional treatment is customized to your teeth and monitored by {{doctorName}} for optimal results. It can brighten your smile several shades in just one visit.",
    durationSeconds: 15,
    bullets: [
      "Clinical-strength whitening gel",
      "Customized and professionally monitored",
      "Several shades brighter in one visit",
    ],
  },

  process: {
    id: "whitening-process",
    heading: "How It Works",
    text: "Your gums are carefully protected, and the whitening gel is applied to your teeth. A special light activates the gel to accelerate the brightening process. The gel is applied in a few rounds during the same visit. {{doctorName}} checks your progress between each round to ensure even, natural-looking results. Custom take-home trays may be provided for touch-ups.",
    durationSeconds: 18,
    bullets: [
      "Gums protected before application",
      "Whitening gel activated by light",
      "Multiple rounds for optimal brightness",
      "Take-home trays for maintenance",
    ],
  },

  importance: {
    id: "whitening-importance",
    heading: "Why Professional",
    text: "Over-the-counter products can be uneven and often cause sensitivity. Professional whitening delivers consistent, dramatic results that are safe for your enamel. It is the fastest, most reliable way to transform the brightness of your smile.",
    durationSeconds: 12,
    bullets: [
      "Even, consistent results",
      "Safe for your enamel",
      "Dramatic improvement in one visit",
    ],
  },

  outcome: {
    id: "whitening-outcome",
    heading: "The Result",
    text: "You will leave with a noticeably brighter, more radiant smile. Results can last a year or more with simple maintenance. Many patients say it is the quickest confidence boost they have ever experienced.",
    durationSeconds: 11,
    bullets: [
      "Noticeably brighter smile",
      "Results last a year or more",
      "Instant confidence boost",
    ],
  },

  experience: {
    id: "whitening-experience",
    heading: "What to Expect",
    text: "An in-office session takes about sixty to ninety minutes. The process is completely painless for most patients. Some people experience temporary sensitivity afterward, which typically fades within a day. You can go about your day immediately after.",
    durationSeconds: 13,
    bullets: [
      "About 60-90 minutes",
      "Painless for most patients",
      "Temporary sensitivity fades quickly",
    ],
  },

  reassurance: {
    id: "whitening-reassurance",
    heading: "Safe and Effective",
    text: "Professional whitening is one of the safest cosmetic treatments available. {{doctorName}} at {{clinicName}} will ensure the process is gentle on your teeth while delivering the brilliant results you are looking for.",
    durationSeconds: 10,
  },

  outros: {
    undecided: {
      id: "whitening-outro-undecided",
      heading: "Explore Your Options",
      text: "If you would like to learn more, {{patientName}}, the team at {{clinicName}} can show you shade comparisons and help you decide. Reach out whenever you are curious.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "whitening-outro-hesitant",
      heading: "Worth It",
      text: "It is a small investment with a big impact, {{patientName}}. {{doctorName}} at {{clinicName}} is happy to discuss what kind of results you can expect. No commitment needed to ask.",
      durationSeconds: 7,
    },
    accepted: {
      id: "whitening-outro-accepted",
      heading: "Get Ready to Glow",
      text: "This is going to be great, {{patientName}}. Schedule your whitening session at {{clinicName}} and get ready for a brighter smile.",
      durationSeconds: 6,
    },
    scheduled: {
      id: "whitening-outro-scheduled",
      heading: "See You Soon",
      text: "We are excited for your transformation, {{patientName}}. See you at your appointment. Avoid coffee and red wine the morning of for the best results.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "whitening-outro-in-treatment",
      heading: "Keep It Going",
      text: "You are doing great, {{patientName}}. Keep using your take-home trays as directed and your smile will keep getting brighter. Check in with {{clinicName}} anytime.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "whitening-outro-post-treatment",
      heading: "Shine On",
      text: "Enjoy your gorgeous bright smile, {{patientName}}. A touch-up every few months keeps results looking fresh. The team at {{clinicName}} is always here.",
      durationSeconds: 7,
    },
  },
});

// ---------------------------------------------------------------------------
// ORTHODONTIC TEMPLATES
// ---------------------------------------------------------------------------

// ============================== BRACES ==============================
register({
  treatmentId: "braces",
  specialty: "orthodontic",

  intros: {
    undecided: {
      id: "braces-intro-undecided",
      heading: "Your Smile Journey",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} put this video together to help you learn more about braces. Whether you are just exploring or getting close to a decision, we want you to have all the details.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "braces-intro-hesitant",
      heading: "We Get It",
      text: "Hi {{patientName}}, we know that committing to braces is a big decision. {{doctorName}} at {{clinicName}} wants to show you exactly what the experience is like so you can feel confident about moving forward.",
      durationSeconds: 8,
    },
    accepted: {
      id: "braces-intro-accepted",
      heading: "Here We Go",
      text: "Hi {{patientName}}, we are so excited that you have decided to start your braces journey. {{doctorName}} at {{clinicName}} has everything you need to know right here.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "braces-intro-scheduled",
      heading: "It's Almost Time",
      text: "Hi {{patientName}}, your braces appointment is coming up and {{doctorName}} at {{clinicName}} wants to make sure you feel excited and prepared for your first day.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "braces-intro-in-treatment",
      heading: "Looking Great",
      text: "Hi {{patientName}}, your treatment is moving along beautifully. {{doctorName}} at {{clinicName}} wanted to share an update on your progress and what is coming next.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "braces-intro-post-treatment",
      heading: "The Big Reveal",
      text: "Hi {{patientName}}, the braces are off and your new smile is here. {{doctorName}} and the entire team at {{clinicName}} could not be happier with your result.",
      durationSeconds: 7,
    },
  },

  explanation: {
    id: "braces-explanation",
    heading: "What Are Braces?",
    text: "Braces use small brackets bonded to your teeth, connected by a wire that applies gentle, continuous pressure to guide your teeth into their ideal positions. Today's braces are smaller, sleeker, and more comfortable than ever before. They can correct crowding, spacing, bite issues, and alignment to give you a healthy, beautiful smile.",
    durationSeconds: 17,
    bullets: [
      "Small brackets with guided wires",
      "Gentle, continuous pressure moves teeth",
      "Corrects crowding, spacing, and bite issues",
    ],
  },

  process: {
    id: "braces-process",
    heading: "How It Works",
    text: "{{doctorName}} will carefully bond each bracket to your teeth, which is quick and painless. A heat-activated wire is threaded through the brackets to begin the alignment process. Every four to eight weeks, you will visit {{clinicName}} for adjustments where the wire is updated to keep your teeth moving on schedule. Elastics may be used to fine-tune your bite. Treatment typically takes twelve to twenty-four months depending on your unique plan.",
    durationSeconds: 21,
    bullets: [
      "Brackets bonded in a painless appointment",
      "Heat-activated wires guide movement",
      "Adjustments every 4-8 weeks",
      "Treatment typically 12-24 months",
    ],
  },

  importance: {
    id: "braces-importance",
    heading: "Why It Matters",
    text: "Crooked or crowded teeth are harder to clean, which increases the risk of cavities and gum issues. Bite problems can cause uneven wear and jaw discomfort. Braces address all of these concerns while giving you a smile you are proud to share.",
    durationSeconds: 13,
    bullets: [
      "Easier cleaning reduces cavity risk",
      "Corrects bite to prevent wear and jaw pain",
      "A smile you are proud of",
    ],
  },

  outcome: {
    id: "braces-outcome",
    heading: "The Result",
    text: "When your braces come off, you will have straight, properly aligned teeth and a balanced bite. You will smile bigger, clean easier, and feel the confidence that comes with knowing your teeth are healthy and well-positioned for the long run.",
    durationSeconds: 13,
    bullets: [
      "Straight, properly aligned teeth",
      "Balanced, comfortable bite",
      "Long-term confidence and health",
    ],
  },

  experience: {
    id: "braces-experience",
    heading: "What to Expect",
    text: "Getting braces placed takes about one to two hours. You will feel some tightness and mild soreness for a few days after placement and after each adjustment. Soft foods and over-the-counter relief help during those periods. Most patients adjust quickly and barely notice them after the first couple of weeks.",
    durationSeconds: 15,
    bullets: [
      "Placement takes 1-2 hours",
      "Mild soreness fades in a few days",
      "Most patients adjust within two weeks",
    ],
  },

  reassurance: {
    id: "braces-reassurance",
    heading: "A Proven Path",
    text: "Braces are the most well-established orthodontic treatment in the world. {{doctorName}} at {{clinicName}} has guided many patients through this journey and will be with you every step of the way. You are going to love the result.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "braces-outro-undecided",
      heading: "Explore With Us",
      text: "Whenever you are ready to take the next step, {{patientName}}, the team at {{clinicName}} is here to answer questions and help you explore your options. No pressure, just support.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "braces-outro-hesitant",
      heading: "We're With You",
      text: "Take all the time you need, {{patientName}}. {{doctorName}} at {{clinicName}} is always happy to sit down and walk through your concerns in person. We are in your corner.",
      durationSeconds: 7,
    },
    accepted: {
      id: "braces-outro-accepted",
      heading: "Let's Start",
      text: "This is going to be an amazing transformation, {{patientName}}. Call {{clinicName}} to book your placement appointment. We cannot wait to get started.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "braces-outro-scheduled",
      heading: "Day One Is Near",
      text: "Get ready for day one, {{patientName}}. We will see you at {{clinicName}}. If you have any questions before then, just reach out. We are so excited for you.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "braces-outro-in-treatment",
      heading: "Keep It Up",
      text: "You are doing awesome, {{patientName}}. Keep wearing your elastics and keeping things clean. We will see you at your next adjustment at {{clinicName}}.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "braces-outro-post-treatment",
      heading: "Smile Big",
      text: "Congratulations, {{patientName}}. Wear your retainer as directed to keep that perfect smile in place. The team at {{clinicName}} is so proud of you.",
      durationSeconds: 7,
    },
  },
});

// ============================== INVISALIGN ==============================
register({
  treatmentId: "invisalign",
  specialty: "orthodontic",

  intros: {
    undecided: {
      id: "invisalign-intro-undecided",
      heading: "A Clearer Path",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} wanted to share some exciting information about Invisalign clear aligners. If you have been thinking about straightening your smile without traditional braces, this is a great option to explore.",
      durationSeconds: 9,
    },
    hesitant: {
      id: "invisalign-intro-hesitant",
      heading: "Let's Clear Things Up",
      text: "Hi {{patientName}}, we understand you might be weighing whether Invisalign is the right choice. {{doctorName}} at {{clinicName}} wants to walk you through how it works so you can decide with full confidence.",
      durationSeconds: 8,
    },
    accepted: {
      id: "invisalign-intro-accepted",
      heading: "Great News",
      text: "Hi {{patientName}}, we are thrilled you have chosen Invisalign. {{doctorName}} at {{clinicName}} put this together so you know exactly what your journey is going to look like.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "invisalign-intro-scheduled",
      heading: "Your Smile Starts Soon",
      text: "Hi {{patientName}}, your first Invisalign appointment is approaching. {{doctorName}} at {{clinicName}} wants to get you excited and ready for the start of your transformation.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "invisalign-intro-in-treatment",
      heading: "Progress Check",
      text: "Hi {{patientName}}, your Invisalign treatment is going great. {{doctorName}} at {{clinicName}} wanted to send a quick update on your progress and remind you of a few tips.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "invisalign-intro-post-treatment",
      heading: "Your New Smile",
      text: "Hi {{patientName}}, your Invisalign journey is complete and your smile is looking incredible. {{doctorName}} and the team at {{clinicName}} are so proud of your result.",
      durationSeconds: 8,
    },
  },

  explanation: {
    id: "invisalign-explanation",
    heading: "What Is Invisalign?",
    text: "Invisalign uses a series of custom-made clear, removable aligners to gradually shift your teeth into their ideal positions. Each set of aligners is precisely designed using advanced three-dimensional digital planning. They are virtually invisible when worn, and you can remove them to eat, drink, and brush normally.",
    durationSeconds: 17,
    bullets: [
      "Custom clear removable aligners",
      "3D digital planning for precision",
      "Virtually invisible and removable",
    ],
  },

  process: {
    id: "invisalign-process",
    heading: "How It Works",
    text: "{{doctorName}} will take digital scans of your teeth to create a custom treatment plan. You will receive a series of aligner trays, each one slightly different, that you swap out every one to two weeks. Small tooth-colored attachments may be placed on certain teeth for extra control. You will visit {{clinicName}} every six to eight weeks so {{doctorName}} can monitor progress. Treatment typically takes six to eighteen months.",
    durationSeconds: 21,
    bullets: [
      "Digital scans create a custom plan",
      "New aligners every 1-2 weeks",
      "Check-ins every 6-8 weeks",
      "Treatment typically 6-18 months",
    ],
  },

  importance: {
    id: "invisalign-importance",
    heading: "Why Invisalign",
    text: "Misaligned teeth can be harder to clean, leading to a higher risk of cavities and gum issues. Bite problems can cause uneven wear and jaw discomfort. Invisalign corrects these concerns discreetly, letting you straighten your teeth without anyone noticing.",
    durationSeconds: 13,
    bullets: [
      "Easier cleaning reduces health risks",
      "Corrects bite for long-term comfort",
      "Discreet treatment nobody notices",
    ],
  },

  outcome: {
    id: "invisalign-outcome",
    heading: "The Result",
    text: "You will finish with beautifully aligned teeth, a balanced bite, and a smile you feel confident sharing. Many patients see visible improvement within just a few weeks. The final result is a healthier, more attractive smile that lasts.",
    durationSeconds: 13,
    bullets: [
      "Beautifully aligned teeth",
      "Visible progress within weeks",
      "A confident, lasting smile",
    ],
  },

  experience: {
    id: "invisalign-experience",
    heading: "What to Expect",
    text: "Each new set of aligners may feel snug for a day or two as your teeth begin to shift. This is completely normal and a sign the treatment is working. You should wear your aligners twenty to twenty-two hours per day for the best results. They are easy to clean and barely noticeable in daily life.",
    durationSeconds: 15,
    bullets: [
      "Snug feeling for a day or two per tray",
      "Wear 20-22 hours daily",
      "Easy to clean and barely noticeable",
    ],
  },

  reassurance: {
    id: "invisalign-reassurance",
    heading: "Trusted Worldwide",
    text: "Invisalign has transformed over fourteen million smiles worldwide. {{doctorName}} at {{clinicName}} is experienced with this system and will guide your treatment with precision and care. You are in great hands.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "invisalign-outro-undecided",
      heading: "Let's Chat",
      text: "If you have questions, {{patientName}}, the team at {{clinicName}} would love to do a free smile assessment and show you a preview of your results. Reach out anytime.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "invisalign-outro-hesitant",
      heading: "See For Yourself",
      text: "We can actually show you a digital preview of your final smile, {{patientName}}. {{doctorName}} at {{clinicName}} is happy to set that up with no obligation. Just give us a call.",
      durationSeconds: 8,
    },
    accepted: {
      id: "invisalign-outro-accepted",
      heading: "Let's Get Moving",
      text: "This is going to be an incredible transformation, {{patientName}}. Let us get you started at {{clinicName}}. Your new smile is just a few trays away.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "invisalign-outro-scheduled",
      heading: "Almost There",
      text: "We cannot wait to get you started, {{patientName}}. See you at your first appointment at {{clinicName}}. This is going to be exciting.",
      durationSeconds: 6,
    },
    in_treatment: {
      id: "invisalign-outro-in-treatment",
      heading: "Keep Going",
      text: "You are doing amazing, {{patientName}}. Keep wearing your aligners and changing them on schedule. We will see you at your next check-in at {{clinicName}}.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "invisalign-outro-post-treatment",
      heading: "Smile Forever",
      text: "Congratulations, {{patientName}}. Wear your retainer as directed to keep everything in place. The team at {{clinicName}} is so happy for you. Enjoy that beautiful smile.",
      durationSeconds: 8,
    },
  },
});

// ============================== CERAMIC BRACES ==============================
register({
  treatmentId: "ceramic_braces",
  specialty: "orthodontic",

  intros: {
    undecided: {
      id: "ceramic_braces-intro-undecided",
      heading: "A Subtle Approach",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} wanted to share some information about ceramic braces. If you want the power of traditional braces with a more subtle look, ceramic braces might be the perfect fit.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "ceramic_braces-intro-hesitant",
      heading: "Best of Both Worlds",
      text: "Hi {{patientName}}, trying to decide between braces and something less visible? {{doctorName}} at {{clinicName}} wants to show you how ceramic braces give you the best of both worlds.",
      durationSeconds: 8,
    },
    accepted: {
      id: "ceramic_braces-intro-accepted",
      heading: "Great Choice",
      text: "Hi {{patientName}}, wonderful that you have chosen ceramic braces. {{doctorName}} at {{clinicName}} put this together so you know exactly what your treatment will look like.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "ceramic_braces-intro-scheduled",
      heading: "Getting Ready",
      text: "Hi {{patientName}}, your ceramic braces appointment is approaching. {{doctorName}} at {{clinicName}} wants you feeling excited and ready for the start of your smile journey.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "ceramic_braces-intro-in-treatment",
      heading: "Moving Along",
      text: "Hi {{patientName}}, your ceramic braces are working their magic. {{doctorName}} at {{clinicName}} wanted to send a progress update and share what is coming next.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "ceramic_braces-intro-post-treatment",
      heading: "They're Off",
      text: "Hi {{patientName}}, your ceramic braces are off and your smile is absolutely stunning. {{doctorName}} at {{clinicName}} could not be happier with your transformation.",
      durationSeconds: 7,
    },
  },

  explanation: {
    id: "ceramic_braces-explanation",
    heading: "What Are Ceramic Braces?",
    text: "Ceramic braces work the same way as traditional braces but use tooth-colored or clear brackets that blend in with your smile. They offer the full correction power of metal braces while being far less noticeable. It is a popular choice for people who want effective treatment with a more discreet appearance.",
    durationSeconds: 16,
    bullets: [
      "Tooth-colored brackets blend with your teeth",
      "Same correction power as metal braces",
      "Discreet yet highly effective",
    ],
  },

  process: {
    id: "ceramic_braces-process",
    heading: "How It Works",
    text: "{{doctorName}} bonds the ceramic brackets to your teeth and threads a wire through them, just like traditional braces. The wire applies gentle, steady pressure that moves your teeth over time. Adjustments happen every four to eight weeks at {{clinicName}}. Elastics may be used for bite correction. The treatment timeline is similar to metal braces, typically twelve to twenty-four months.",
    durationSeconds: 20,
    bullets: [
      "Ceramic brackets bonded to teeth",
      "Wire provides gentle, steady pressure",
      "Adjustments every 4-8 weeks",
      "Treatment typically 12-24 months",
    ],
  },

  importance: {
    id: "ceramic_braces-importance",
    heading: "Why Ceramic Braces",
    text: "Ceramic braces give you all the clinical benefits of orthodontic treatment without the metallic look. For patients who want a proven, powerful solution that is still aesthetically pleasing, ceramic braces are an excellent middle ground. They address crowding, spacing, and bite issues thoroughly.",
    durationSeconds: 13,
    bullets: [
      "Full orthodontic correction",
      "Aesthetically pleasing appearance",
      "Addresses all alignment and bite issues",
    ],
  },

  outcome: {
    id: "ceramic_braces-outcome",
    heading: "The Result",
    text: "The end result is the same beautiful, straight smile you would get from any braces. Properly aligned teeth, a healthy bite, and a boost in confidence that lasts well beyond treatment. Your smile will look and feel amazing.",
    durationSeconds: 12,
    bullets: [
      "Straight, properly aligned teeth",
      "Healthy, balanced bite",
      "Lasting confidence",
    ],
  },

  experience: {
    id: "ceramic_braces-experience",
    heading: "What to Expect",
    text: "Placement takes about one to two hours. You will feel some tightness and mild soreness for a few days after placement and adjustments. Ceramic brackets require a bit of extra care with cleaning to keep them looking their best. Most patients adjust to them quickly and appreciate how subtle they are.",
    durationSeconds: 15,
    bullets: [
      "Placement takes 1-2 hours",
      "Mild soreness after adjustments",
      "Extra cleaning care keeps them looking great",
    ],
  },

  reassurance: {
    id: "ceramic_braces-reassurance",
    heading: "Tried and True",
    text: "Ceramic braces have been a trusted option for decades. {{doctorName}} at {{clinicName}} will ensure your brackets stay looking great throughout treatment and that you get the best possible result.",
    durationSeconds: 10,
  },

  outros: {
    undecided: {
      id: "ceramic_braces-outro-undecided",
      heading: "Let's Explore",
      text: "If you would like to see ceramic braces up close or compare options, {{patientName}}, the team at {{clinicName}} is ready to help. Reach out whenever you are ready.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "ceramic_braces-outro-hesitant",
      heading: "We Understand",
      text: "No pressure at all, {{patientName}}. {{doctorName}} at {{clinicName}} is happy to discuss all your options and find the best fit for your lifestyle and goals.",
      durationSeconds: 7,
    },
    accepted: {
      id: "ceramic_braces-outro-accepted",
      heading: "Let's Begin",
      text: "Exciting times ahead, {{patientName}}. Give us a call at {{clinicName}} to book your placement. Your smile transformation starts soon.",
      durationSeconds: 6,
    },
    scheduled: {
      id: "ceramic_braces-outro-scheduled",
      heading: "See You Soon",
      text: "Get ready for the first step, {{patientName}}. We will see you at {{clinicName}}. If you have questions before then, just give us a call.",
      durationSeconds: 6,
    },
    in_treatment: {
      id: "ceramic_braces-outro-in-treatment",
      heading: "Great Progress",
      text: "You are making excellent progress, {{patientName}}. Keep up the care and we will see you at your next appointment at {{clinicName}}. Your smile is shaping up beautifully.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "ceramic_braces-outro-post-treatment",
      heading: "Beautiful Smile",
      text: "What an incredible transformation, {{patientName}}. Wear your retainer faithfully and your smile will stay perfect. The team at {{clinicName}} is so proud of you.",
      durationSeconds: 7,
    },
  },
});

// ============================== EXPANDER ==============================
register({
  treatmentId: "expander",
  specialty: "orthodontic",

  intros: {
    undecided: {
      id: "expander-intro-undecided",
      heading: "A Message For You",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} wanted to share some information about a palatal expander. This is a gentle and effective way to create more room in the mouth, and we want you to understand exactly how it works.",
      durationSeconds: 9,
    },
    hesitant: {
      id: "expander-intro-hesitant",
      heading: "It's Easier Than You Think",
      text: "Hi {{patientName}}, we know an expander might sound unfamiliar. {{doctorName}} at {{clinicName}} wants to walk you through the process so you can see just how straightforward and comfortable it really is.",
      durationSeconds: 8,
    },
    accepted: {
      id: "expander-intro-accepted",
      heading: "Great Decision",
      text: "Hi {{patientName}}, we are glad you are moving forward with the expander. {{doctorName}} at {{clinicName}} put this together so you know exactly what to expect.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "expander-intro-scheduled",
      heading: "Your Appointment Is Set",
      text: "Hi {{patientName}}, your expander appointment is coming up. {{doctorName}} at {{clinicName}} wants to make sure you and your family feel prepared and confident.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "expander-intro-in-treatment",
      heading: "Great Progress",
      text: "Hi {{patientName}}, the expander is doing its job and things are looking great. {{doctorName}} at {{clinicName}} wanted to send a quick update on how everything is progressing.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "expander-intro-post-treatment",
      heading: "All Done",
      text: "Hi {{patientName}}, the expander has done its job and your results look wonderful. {{doctorName}} at {{clinicName}} is really pleased with how everything turned out.",
      durationSeconds: 7,
    },
  },

  explanation: {
    id: "expander-explanation",
    heading: "What Is an Expander?",
    text: "A palatal expander is a custom-fitted device that gently widens the upper jaw to create more space for the teeth. It works by gradually separating the two halves of the palate, which naturally fuse together later in life. This is a simple, proven approach that helps teeth align properly and can even improve breathing.",
    durationSeconds: 17,
    bullets: [
      "Gently widens the upper jaw",
      "Creates space for teeth to align",
      "Can improve breathing and comfort",
    ],
  },

  process: {
    id: "expander-process",
    heading: "How It Works",
    text: "{{doctorName}} will fit the expander to the upper teeth using bands that hold it securely in place. At home, a small key is used to turn the expander a tiny amount each day, gradually widening the palate. Each turn is quick and takes just a few seconds. The expansion phase typically lasts two to four weeks, followed by a stabilization period where the expander stays in place to let new bone fill in the space.",
    durationSeconds: 21,
    bullets: [
      "Custom fit to upper teeth",
      "Small daily turns at home",
      "Active expansion takes 2-4 weeks",
      "Stabilization period follows",
    ],
  },

  importance: {
    id: "expander-importance",
    heading: "Why It Matters",
    text: "A narrow palate can cause crowding, crossbite, and breathing difficulties. Expanding the palate at the right time creates a proper foundation for the teeth and jaw. It is much simpler to do this now than to address the same issues with more complex treatment later.",
    durationSeconds: 13,
    bullets: [
      "Corrects crowding and crossbite",
      "Improves breathing",
      "Simpler now than later",
    ],
  },

  outcome: {
    id: "expander-outcome",
    heading: "The Result",
    text: "Once expansion is complete, there will be noticeably more room for the teeth to fit properly. The bite will improve, breathing may be easier, and the foundation is set for a beautiful, well-aligned smile going forward.",
    durationSeconds: 12,
    bullets: [
      "More room for teeth to align",
      "Improved bite and breathing",
      "Strong foundation for future alignment",
    ],
  },

  experience: {
    id: "expander-experience",
    heading: "What to Expect",
    text: "There may be a feeling of pressure after each turn, which fades within a few minutes. Speaking and eating may feel a bit different for the first few days as you get used to the device. Most patients adapt within a week. A temporary gap between the front teeth is completely normal and shows the expansion is working.",
    durationSeconds: 15,
    bullets: [
      "Brief pressure after each turn",
      "Adapting takes about one week",
      "Temporary front gap is normal and expected",
    ],
  },

  reassurance: {
    id: "expander-reassurance",
    heading: "Simple and Effective",
    text: "Palatal expanders have been used safely and successfully for many years. {{doctorName}} at {{clinicName}} will monitor progress closely and make sure everything goes smoothly. This is a very well-understood treatment.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "expander-outro-undecided",
      heading: "Let's Talk More",
      text: "If you have questions, {{patientName}}, the team at {{clinicName}} is here to walk you through everything. Just give us a call whenever you are ready.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "expander-outro-hesitant",
      heading: "We're Here",
      text: "Take your time, {{patientName}}. {{doctorName}} at {{clinicName}} is happy to answer any questions so you feel comfortable with the plan.",
      durationSeconds: 6,
    },
    accepted: {
      id: "expander-outro-accepted",
      heading: "Let's Get Started",
      text: "Great choice, {{patientName}}. Let us get you scheduled at {{clinicName}}. This is going to make a wonderful difference.",
      durationSeconds: 6,
    },
    scheduled: {
      id: "expander-outro-scheduled",
      heading: "See You Soon",
      text: "We are ready for you, {{patientName}}. See you at your appointment at {{clinicName}}. You are going to do great.",
      durationSeconds: 6,
    },
    in_treatment: {
      id: "expander-outro-in-treatment",
      heading: "Keep It Up",
      text: "You are doing wonderfully, {{patientName}}. Keep up those daily turns and we will see you at your next check-in at {{clinicName}}.",
      durationSeconds: 6,
    },
    post_treatment: {
      id: "expander-outro-post-treatment",
      heading: "Well Done",
      text: "Fantastic job, {{patientName}}. The expansion is complete and your results look great. Keep up with your visits to {{clinicName}} for the next phase of your smile journey.",
      durationSeconds: 7,
    },
  },
});

// ============================== DENTURES ==============================
register({
  treatmentId: "dentures",
  specialty: "dental",

  intros: {
    undecided: {
      id: "dentures-intro-undecided",
      heading: "A Message For You",
      text: "Hi {{patientName}}, this is a personal message from {{doctorName}} at {{clinicName}}. We recently discussed dentures, and we wanted to share more about how they can restore your smile and confidence.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "dentures-intro-hesitant",
      heading: "We Understand",
      text: "Hi {{patientName}}, we know that considering dentures can feel like a big step. {{doctorName}} at {{clinicName}} wants to walk you through exactly what modern dentures look like and how they can bring back the comfort and function you deserve.",
      durationSeconds: 9,
    },
    accepted: {
      id: "dentures-intro-accepted",
      heading: "Great Decision",
      text: "Hi {{patientName}}, we are so glad you have decided to move forward with dentures. {{doctorName}} at {{clinicName}} put this together so you know exactly what the process looks like.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "dentures-intro-scheduled",
      heading: "Your Appointment Is Set",
      text: "Hi {{patientName}}, your denture appointment is coming up and {{doctorName}} at {{clinicName}} wanted to make sure you feel prepared and excited about getting your new smile.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "dentures-intro-in-treatment",
      heading: "You're On Track",
      text: "Hi {{patientName}}, your denture fitting is progressing nicely. {{doctorName}} at {{clinicName}} wanted to share an update on how things are coming along and what to expect next.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "dentures-intro-post-treatment",
      heading: "Looking Great",
      text: "Hi {{patientName}}, congratulations on receiving your new dentures. {{doctorName}} and the team at {{clinicName}} are thrilled with how everything turned out. Here are some tips to help you adjust.",
      durationSeconds: 8,
    },
  },

  explanation: {
    id: "dentures-explanation",
    heading: "What Are Dentures?",
    text: "Dentures are custom-made removable appliances that replace missing teeth and surrounding tissue. They can be full dentures, replacing all teeth in an arch, or partial dentures that fill in gaps while working with your remaining natural teeth. Modern dentures are crafted from durable, natural-looking materials that closely match the appearance of real teeth and gums.",
    durationSeconds: 17,
    bullets: [
      "Custom-made removable replacement teeth",
      "Full or partial options available",
      "Natural-looking materials for a realistic appearance",
    ],
  },

  process: {
    id: "dentures-process",
    heading: "How It Works",
    text: "{{doctorName}} will take detailed impressions and measurements of your mouth to ensure a precise, comfortable fit. A wax model is created so you can preview the look and fit before the final denture is made. The finished denture is crafted in a dental lab to match your unique mouth shape, bite, and desired appearance. At your fitting appointment, {{doctorName}} will make fine adjustments so your dentures sit comfortably and securely.",
    durationSeconds: 20,
    bullets: [
      "Detailed impressions for a custom fit",
      "Wax model preview before final creation",
      "Crafted in a dental lab to match your mouth",
      "Fine-tuned at your fitting appointment",
    ],
  },

  importance: {
    id: "dentures-importance",
    heading: "Why It Matters",
    text: "Missing teeth affect far more than your smile. They can make eating difficult, change how you speak, and cause the remaining teeth to shift out of position. Dentures restore full chewing function, support your facial structure, and give you the confidence to smile, eat, and talk without worry.",
    durationSeconds: 14,
    bullets: [
      "Restores chewing and speaking ability",
      "Supports facial structure and prevents shifting",
      "Brings back confidence in your daily life",
    ],
  },

  outcome: {
    id: "dentures-outcome",
    heading: "The Result",
    text: "Once your dentures are fitted and adjusted, you will be able to eat your favorite foods, speak clearly, and smile with confidence. With proper care, dentures can last five to ten years or more. Most patients say they feel like themselves again once they have a full, natural-looking smile.",
    durationSeconds: 13,
    bullets: [
      "Full chewing and speaking ability restored",
      "Lasts 5-10+ years with proper care",
      "A natural-looking, confident smile",
    ],
  },

  experience: {
    id: "dentures-experience",
    heading: "What to Expect",
    text: "It is normal for new dentures to feel a bit unfamiliar for the first few weeks. Your mouth needs time to adjust, and you may notice increased saliva or minor soreness in spots. Start with softer foods and work your way up as you get comfortable. {{doctorName}} will schedule follow-up visits to make any necessary adjustments so your dentures feel perfect.",
    durationSeconds: 16,
    bullets: [
      "Adjustment period of a few weeks is normal",
      "Start with soft foods and progress gradually",
      "Follow-up visits ensure a perfect fit",
    ],
  },

  reassurance: {
    id: "dentures-reassurance",
    heading: "You're in Good Hands",
    text: "Millions of people wear dentures and enjoy full, active lives. {{doctorName}} at {{clinicName}} uses the latest techniques and materials to create dentures that look natural and fit comfortably. You are in great hands every step of the way.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "dentures-outro-undecided",
      heading: "We're Here For You",
      text: "Take all the time you need, {{patientName}}. If you have any questions about dentures, the team at {{clinicName}} is always here to help. We are ready whenever you are.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "dentures-outro-hesitant",
      heading: "No Pressure",
      text: "We completely understand wanting to think it over, {{patientName}}. {{doctorName}} and the team at {{clinicName}} are here to answer every question. There is no rush at all.",
      durationSeconds: 7,
    },
    accepted: {
      id: "dentures-outro-accepted",
      heading: "Next Steps",
      text: "You have made a wonderful choice, {{patientName}}. Give us a call or book online at {{clinicName}} to get your impressions scheduled. We are excited to get started.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "dentures-outro-scheduled",
      heading: "See You Soon",
      text: "We are looking forward to your visit, {{patientName}}. If anything comes up before your appointment, just reach out to the team at {{clinicName}}. See you soon.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "dentures-outro-in-treatment",
      heading: "Almost There",
      text: "You are doing great, {{patientName}}. Your custom dentures are being crafted to fit you perfectly. If you have any questions, {{clinicName}} is just a call away.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "dentures-outro-post-treatment",
      heading: "Enjoy Your Smile",
      text: "That is it, {{patientName}}. Your new dentures are all set. Remember to clean them daily, keep up with your checkups at {{clinicName}}, and enjoy your beautiful smile.",
      durationSeconds: 7,
    },
  },
});

// ============================== LINGUAL BRACES ==============================
register({
  treatmentId: "lingual_braces",
  specialty: "orthodontic",

  intros: {
    undecided: {
      id: "lingual_braces-intro-undecided",
      heading: "Your Hidden Smile Solution",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} put this video together to tell you about lingual braces, an invisible way to straighten your teeth. We want you to have all the information you need to decide.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "lingual_braces-intro-hesitant",
      heading: "We Understand",
      text: "Hi {{patientName}}, we know choosing an orthodontic treatment is a big decision. {{doctorName}} at {{clinicName}} wants to walk you through how lingual braces work so you can feel confident that this is the right fit for you.",
      durationSeconds: 9,
    },
    accepted: {
      id: "lingual_braces-intro-accepted",
      heading: "Great Choice",
      text: "Hi {{patientName}}, we are thrilled you have chosen lingual braces. {{doctorName}} at {{clinicName}} has everything you need to know about your treatment journey right here.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "lingual_braces-intro-scheduled",
      heading: "It's Almost Time",
      text: "Hi {{patientName}}, your lingual braces appointment is approaching and {{doctorName}} at {{clinicName}} wants you to feel prepared and excited for what is ahead.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "lingual_braces-intro-in-treatment",
      heading: "Progress Update",
      text: "Hi {{patientName}}, your lingual braces are doing their work behind the scenes. {{doctorName}} at {{clinicName}} wanted to share an update on your progress and what comes next.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "lingual_braces-intro-post-treatment",
      heading: "The Big Reveal",
      text: "Hi {{patientName}}, your lingual braces are off and your new smile is here. {{doctorName}} and the entire team at {{clinicName}} are so happy with your incredible result.",
      durationSeconds: 7,
    },
  },

  explanation: {
    id: "lingual_braces-explanation",
    heading: "What Are Lingual Braces?",
    text: "Lingual braces work exactly like traditional braces but are placed on the back surfaces of your teeth, making them completely invisible from the front. Each bracket is custom-made to fit the unique contour of your individual teeth. They use the same proven wire-and-bracket system to correct crowding, spacing, bite issues, and alignment, all while keeping your treatment a secret.",
    durationSeconds: 18,
    bullets: [
      "Brackets placed behind the teeth for invisible treatment",
      "Custom-made to fit each individual tooth",
      "Corrects the same issues as traditional braces",
    ],
  },

  process: {
    id: "lingual_braces-process",
    heading: "How It Works",
    text: "{{doctorName}} will take a detailed digital scan of your teeth, which is sent to a lab where each bracket is custom-fabricated to fit the inner surface of your teeth precisely. At your placement appointment, the brackets are bonded to the back of your teeth and connected with a wire. You will visit {{clinicName}} every four to eight weeks for adjustments. Treatment typically takes eighteen to thirty months depending on the complexity of your case.",
    durationSeconds: 21,
    bullets: [
      "Digital scan sent to lab for custom brackets",
      "Brackets bonded to the back of teeth",
      "Adjustments every 4-8 weeks",
      "Treatment typically 18-30 months",
    ],
  },

  importance: {
    id: "lingual_braces-importance",
    heading: "Why It Matters",
    text: "Many patients want straighter teeth but prefer a treatment that no one can see. Lingual braces give you the full corrective power of traditional braces without any visible hardware. They are ideal for professionals, adults, and anyone who wants to improve their smile discreetly while still getting excellent results.",
    durationSeconds: 14,
    bullets: [
      "Completely invisible from the outside",
      "Full corrective power of traditional braces",
      "Ideal for professionals and image-conscious patients",
    ],
  },

  outcome: {
    id: "lingual_braces-outcome",
    heading: "The Result",
    text: "When your lingual braces come off, you will have beautifully straight teeth and a balanced bite, and nobody will have known you were wearing braces at all. Your smile transformation happens entirely behind the scenes, and the final reveal is always worth the wait.",
    durationSeconds: 13,
    bullets: [
      "Straight, properly aligned teeth",
      "Balanced, comfortable bite",
      "A secret transformation with an amazing reveal",
    ],
  },

  experience: {
    id: "lingual_braces-experience",
    heading: "What to Expect",
    text: "Because the brackets sit against your tongue, you may notice some initial lisping and tongue soreness for the first one to two weeks. This is completely normal and your tongue adapts quickly. Dental wax can help with any spots that feel rough. After the adjustment period, most patients forget the braces are even there.",
    durationSeconds: 15,
    bullets: [
      "Minor lisping and tongue soreness for 1-2 weeks",
      "Dental wax helps with comfort",
      "Most patients adapt quickly and forget they are there",
    ],
  },

  reassurance: {
    id: "lingual_braces-reassurance",
    heading: "A Proven, Invisible Solution",
    text: "Lingual braces have been used successfully for decades and deliver the same outstanding results as traditional braces. {{doctorName}} at {{clinicName}} has specialized training in this technique and will ensure your treatment is precise, comfortable, and completely hidden.",
    durationSeconds: 12,
  },

  outros: {
    undecided: {
      id: "lingual_braces-outro-undecided",
      heading: "Explore With Us",
      text: "Whenever you are ready to learn more, {{patientName}}, the team at {{clinicName}} is here to answer your questions. No pressure at all, just support.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "lingual_braces-outro-hesitant",
      heading: "We're With You",
      text: "Take all the time you need, {{patientName}}. {{doctorName}} at {{clinicName}} is happy to discuss any concerns in person. We are in your corner every step of the way.",
      durationSeconds: 7,
    },
    accepted: {
      id: "lingual_braces-outro-accepted",
      heading: "Let's Get Started",
      text: "This is going to be an incredible transformation, {{patientName}}. Call {{clinicName}} to book your scan and placement appointment. We cannot wait to begin.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "lingual_braces-outro-scheduled",
      heading: "See You Soon",
      text: "Get ready for the start of your invisible journey, {{patientName}}. We will see you at {{clinicName}}. If you have any questions before then, just reach out.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "lingual_braces-outro-in-treatment",
      heading: "Keep It Up",
      text: "You are doing wonderfully, {{patientName}}. Your teeth are moving right on schedule. We will see you at your next adjustment at {{clinicName}}.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "lingual_braces-outro-post-treatment",
      heading: "Smile Big",
      text: "Congratulations, {{patientName}}. Your invisible braces journey is complete and the results speak for themselves. Wear your retainer as directed and enjoy your beautiful new smile from {{clinicName}}.",
      durationSeconds: 7,
    },
  },
});

// ============================== RETAINER ==============================
register({
  treatmentId: "retainer",
  specialty: "orthodontic",

  intros: {
    undecided: {
      id: "retainer-intro-undecided",
      heading: "Protecting Your Results",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} put this video together to explain why a retainer is such an important part of your orthodontic journey. We want you to understand how it keeps your beautiful smile in place.",
      durationSeconds: 8,
    },
    hesitant: {
      id: "retainer-intro-hesitant",
      heading: "We Understand",
      text: "Hi {{patientName}}, we know it can feel like a lot to think about after your braces or aligner treatment ends. {{doctorName}} at {{clinicName}} wants to show you how simple and important retainer wear really is.",
      durationSeconds: 9,
    },
    accepted: {
      id: "retainer-intro-accepted",
      heading: "Smart Move",
      text: "Hi {{patientName}}, we are glad you are committed to wearing your retainer. {{doctorName}} at {{clinicName}} put this together so you know exactly what to expect and how to get the most out of it.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "retainer-intro-scheduled",
      heading: "Your Retainer Is Ready",
      text: "Hi {{patientName}}, your retainer fitting is coming up and {{doctorName}} at {{clinicName}} wants you to feel prepared. Here is everything you need to know about your new retainer.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "retainer-intro-in-treatment",
      heading: "Great Progress",
      text: "Hi {{patientName}}, you are doing a great job with your retainer. {{doctorName}} at {{clinicName}} wanted to share a quick update and some reminders to keep your smile on track.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "retainer-intro-post-treatment",
      heading: "Your Smile Is Set",
      text: "Hi {{patientName}}, your retention phase is going beautifully. {{doctorName}} and the team at {{clinicName}} are so happy with how your smile has held up. Here is what to keep in mind going forward.",
      durationSeconds: 8,
    },
  },

  explanation: {
    id: "retainer-explanation",
    heading: "What Is a Retainer?",
    text: "A retainer is a custom-made appliance that holds your teeth in their new positions after orthodontic treatment. Without a retainer, teeth naturally tend to shift back toward their original positions over time. There are several types, including clear removable retainers, traditional wire retainers, and fixed retainers bonded behind your teeth. {{doctorName}} will recommend the best option for your specific case.",
    durationSeconds: 18,
    bullets: [
      "Custom appliance that maintains tooth alignment",
      "Prevents teeth from shifting back after treatment",
      "Clear, wire, and fixed options available",
    ],
  },

  process: {
    id: "retainer-process",
    heading: "How It Works",
    text: "After your braces or aligners are removed, {{doctorName}} will take an impression or digital scan of your newly aligned teeth. Your custom retainer is fabricated to fit your teeth precisely. For removable retainers, you will wear them full-time for the first few months, then transition to nighttime-only wear. Fixed retainers are bonded to the back of your teeth and work around the clock without any effort on your part.",
    durationSeconds: 20,
    bullets: [
      "Impression or scan taken after treatment ends",
      "Custom-fabricated for a precise fit",
      "Full-time wear transitions to nighttime only",
      "Fixed retainers work automatically 24/7",
    ],
  },

  importance: {
    id: "retainer-importance",
    heading: "Why It Matters",
    text: "Your retainer is what protects all the time, effort, and investment you put into your orthodontic treatment. Teeth have a natural tendency to drift, especially in the first year after treatment. Consistent retainer wear is the single most important thing you can do to ensure your results last a lifetime.",
    durationSeconds: 14,
    bullets: [
      "Protects your investment in orthodontic treatment",
      "Teeth naturally drift, especially in the first year",
      "Consistent wear ensures lifelong results",
    ],
  },

  outcome: {
    id: "retainer-outcome",
    heading: "The Result",
    text: "With consistent retainer wear, your teeth will stay straight and your bite will remain balanced for years to come. Your beautiful smile becomes permanent rather than temporary. Most patients settle into a comfortable nighttime routine and barely think about their retainer at all.",
    durationSeconds: 13,
    bullets: [
      "Teeth stay straight and bite stays balanced",
      "Beautiful smile becomes permanent",
      "Comfortable nighttime routine for most patients",
    ],
  },

  experience: {
    id: "retainer-experience",
    heading: "What to Expect",
    text: "Your retainer may feel snug the first few times you wear it, which is a good sign that it is doing its job. Removable retainers should be cleaned daily with a gentle brush and cool water. Avoid hot water, which can warp the material. If you have a fixed retainer, use a floss threader or water flosser to keep the area clean. Always store your removable retainer in its case when not in your mouth.",
    durationSeconds: 16,
    bullets: [
      "Initial snugness is normal and expected",
      "Clean daily with gentle brush and cool water",
      "Always store in its case when not wearing",
    ],
  },

  reassurance: {
    id: "retainer-reassurance",
    heading: "A Simple Habit, A Lasting Smile",
    text: "Wearing a retainer is the easiest part of your entire orthodontic journey. It takes just seconds to put in and becomes second nature very quickly. {{doctorName}} at {{clinicName}} will check on your retainer at regular visits to make sure everything stays perfect.",
    durationSeconds: 11,
  },

  outros: {
    undecided: {
      id: "retainer-outro-undecided",
      heading: "We're Here For You",
      text: "If you have any questions about retainers, {{patientName}}, the team at {{clinicName}} is always here to help. Your smile is worth protecting.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "retainer-outro-hesitant",
      heading: "It's Easier Than You Think",
      text: "We promise the retainer phase is much simpler than it sounds, {{patientName}}. {{doctorName}} at {{clinicName}} will make sure you feel comfortable and confident with the routine.",
      durationSeconds: 7,
    },
    accepted: {
      id: "retainer-outro-accepted",
      heading: "Great Commitment",
      text: "Your dedication to wearing your retainer will pay off for a lifetime, {{patientName}}. Reach out to {{clinicName}} if you ever have questions. We are always here.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "retainer-outro-scheduled",
      heading: "See You Soon",
      text: "We are looking forward to fitting your retainer, {{patientName}}. If anything comes up before your appointment, the team at {{clinicName}} is just a call away.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "retainer-outro-in-treatment",
      heading: "Keep It Up",
      text: "You are doing a fantastic job, {{patientName}}. Keep up the great retainer routine and we will see you at your next checkup at {{clinicName}}.",
      durationSeconds: 7,
    },
    post_treatment: {
      id: "retainer-outro-post-treatment",
      heading: "Smile Forever",
      text: "Your smile is looking incredible, {{patientName}}. Keep wearing your retainer at night and it will stay that way for life. The team at {{clinicName}} is so proud of you.",
      durationSeconds: 7,
    },
  },
});

// ============================== JAW SURGERY ==============================
register({
  treatmentId: "jaw_surgery",
  specialty: "orthodontic",

  intros: {
    undecided: {
      id: "jaw_surgery-intro-undecided",
      heading: "An Important Conversation",
      text: "Hi {{patientName}}, {{doctorName}} at {{clinicName}} put this video together to help you understand orthognathic jaw surgery. We know this is a big topic, and we want you to have clear, honest information to guide your decision.",
      durationSeconds: 9,
    },
    hesitant: {
      id: "jaw_surgery-intro-hesitant",
      heading: "We Understand Your Concerns",
      text: "Hi {{patientName}}, we completely understand that jaw surgery can sound overwhelming. {{doctorName}} at {{clinicName}} wants to walk you through exactly what is involved so you can see that this is a well-planned, carefully managed process with life-changing results.",
      durationSeconds: 10,
    },
    accepted: {
      id: "jaw_surgery-intro-accepted",
      heading: "A Brave Decision",
      text: "Hi {{patientName}}, we are so proud of you for choosing to move forward with jaw surgery. {{doctorName}} at {{clinicName}} has put this together so you know exactly what the journey looks like from start to finish.",
      durationSeconds: 8,
    },
    scheduled: {
      id: "jaw_surgery-intro-scheduled",
      heading: "Your Surgery Is Set",
      text: "Hi {{patientName}}, your jaw surgery date is approaching and {{doctorName}} at {{clinicName}} wants to make sure you feel fully prepared and confident going into it.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "jaw_surgery-intro-in-treatment",
      heading: "You're Doing Great",
      text: "Hi {{patientName}}, you are recovering from jaw surgery and {{doctorName}} at {{clinicName}} wanted to check in with an update on your progress and what to expect in the weeks ahead.",
      durationSeconds: 8,
    },
    post_treatment: {
      id: "jaw_surgery-intro-post-treatment",
      heading: "An Incredible Transformation",
      text: "Hi {{patientName}}, your jaw surgery and recovery are complete, and the results are truly remarkable. {{doctorName}} and the entire team at {{clinicName}} could not be more pleased.",
      durationSeconds: 8,
    },
  },

  explanation: {
    id: "jaw_surgery-explanation",
    heading: "What Is Jaw Surgery?",
    text: "Orthognathic jaw surgery is a procedure that repositions the upper jaw, lower jaw, or both to correct significant alignment problems that braces alone cannot fix. It addresses issues like a severe overbite, underbite, open bite, or facial asymmetry. The surgery is performed by an oral and maxillofacial surgeon and is typically combined with orthodontic treatment to achieve both a functional bite and a balanced facial profile.",
    durationSeconds: 20,
    bullets: [
      "Repositions the jaw to correct severe alignment issues",
      "Addresses overbite, underbite, open bite, and asymmetry",
      "Combined with orthodontics for optimal results",
    ],
  },

  process: {
    id: "jaw_surgery-process",
    heading: "How It Works",
    text: "The process begins with orthodontic treatment, usually braces, to align your teeth in preparation for surgery. Once your teeth are in the right position, the surgical team uses detailed three-dimensional imaging to plan the exact jaw movements. The surgery itself is performed under general anesthesia and typically takes two to four hours. Your jaw is repositioned and secured with small titanium plates and screws that stay in place permanently. After surgery, you will continue orthodontic treatment to fine-tune your bite.",
    durationSeconds: 24,
    bullets: [
      "Pre-surgical orthodontics to prepare teeth",
      "3D imaging for precise surgical planning",
      "Surgery under general anesthesia, 2-4 hours",
      "Jaw secured with titanium plates, then orthodontics continues",
    ],
  },

  importance: {
    id: "jaw_surgery-importance",
    heading: "Why It Matters",
    text: "Severe jaw misalignment can cause chronic pain, difficulty chewing, breathing problems, and speech difficulties that braces alone cannot fully resolve. Jaw surgery corrects the root cause of these issues rather than just compensating for them. Beyond function, it can dramatically improve facial balance and symmetry, giving you both a healthier bite and greater confidence.",
    durationSeconds: 16,
    bullets: [
      "Resolves chronic pain, chewing, and breathing issues",
      "Corrects the root cause, not just symptoms",
      "Improves facial balance and confidence",
    ],
  },

  outcome: {
    id: "jaw_surgery-outcome",
    heading: "The Result",
    text: "After healing is complete, you will have a properly aligned jaw, a comfortable bite, and improved facial harmony. Patients consistently report that they can chew, breathe, and speak more easily than they ever could before. The combination of surgery and orthodontics creates results that last a lifetime.",
    durationSeconds: 14,
    bullets: [
      "Properly aligned jaw and comfortable bite",
      "Improved chewing, breathing, and speech",
      "Lifetime results from combined treatment",
    ],
  },

  experience: {
    id: "jaw_surgery-experience",
    heading: "What to Expect",
    text: "After surgery, you can expect swelling and discomfort that peaks around day three and gradually subsides over two to four weeks. You will follow a liquid and soft food diet for the first several weeks while your jaw heals. Most patients return to school or work within two to three weeks. Full healing takes about three to six months, during which {{doctorName}} will monitor your progress closely at {{clinicName}}.",
    durationSeconds: 18,
    bullets: [
      "Swelling peaks around day 3, subsides over 2-4 weeks",
      "Liquid and soft foods for the first several weeks",
      "Most patients return to normal activities in 2-3 weeks",
      "Full healing in 3-6 months with close monitoring",
    ],
  },

  reassurance: {
    id: "jaw_surgery-reassurance",
    heading: "You're in Expert Hands",
    text: "Jaw surgery is a well-established procedure with a long track record of success. {{doctorName}} at {{clinicName}} works closely with experienced oral surgeons who perform these procedures regularly. Every step is carefully planned using advanced technology, and the team will be with you from your very first consultation through your final result.",
    durationSeconds: 13,
  },

  outros: {
    undecided: {
      id: "jaw_surgery-outro-undecided",
      heading: "We're Here to Talk",
      text: "This is a big decision, {{patientName}}, and we want you to take all the time you need. The team at {{clinicName}} is here to answer every question and walk you through your options.",
      durationSeconds: 7,
    },
    hesitant: {
      id: "jaw_surgery-outro-hesitant",
      heading: "No Rush At All",
      text: "We know this is a lot to process, {{patientName}}. {{doctorName}} at {{clinicName}} is ready to sit down with you and address any concerns. We are here to support you, no matter what you decide.",
      durationSeconds: 8,
    },
    accepted: {
      id: "jaw_surgery-outro-accepted",
      heading: "An Amazing Journey Ahead",
      text: "You have made an incredibly brave choice, {{patientName}}. The team at {{clinicName}} will be with you every single step. Let us get your pre-surgical planning started.",
      durationSeconds: 7,
    },
    scheduled: {
      id: "jaw_surgery-outro-scheduled",
      heading: "We're Ready For You",
      text: "Everything is set, {{patientName}}. If you have any questions before your surgery date, {{clinicName}} is always just a call away. We are confident this will be a life-changing experience.",
      durationSeconds: 7,
    },
    in_treatment: {
      id: "jaw_surgery-outro-in-treatment",
      heading: "Healing Beautifully",
      text: "You are recovering wonderfully, {{patientName}}. Be patient with yourself and follow your care instructions. The team at {{clinicName}} is monitoring everything closely. You are going to love the result.",
      durationSeconds: 8,
    },
    post_treatment: {
      id: "jaw_surgery-outro-post-treatment",
      heading: "A New Chapter",
      text: "What an incredible journey, {{patientName}}. Your transformation is complete and the results are outstanding. Keep up with your follow-ups at {{clinicName}} and enjoy your new smile and your new confidence.",
      durationSeconds: 8,
    },
  },
});

// ---------------------------------------------------------------------------
// Personalization function
// ---------------------------------------------------------------------------

/**
 * Inject personalization placeholders into template text.
 * Replaces {{patientName}}, {{doctorName}}, and {{clinicName}}.
 * Uses the patient's first name for a warm, personal tone.
 */
export function personalize(
  text: string,
  input: PersonalizationInput
): string {
  const firstName = input.patientName.split(" ")[0];
  return text
    .replace(/\{\{patientName\}\}/g, firstName)
    .replace(/\{\{doctorName\}\}/g, input.doctorName)
    .replace(/\{\{clinicName\}\}/g, input.clinicName);
}

// ---------------------------------------------------------------------------
// Notes scene generation
// ---------------------------------------------------------------------------

/**
 * Generate a ScriptSection from free-text treatment notes.
 * This creates a personalized "from your doctor" scene that integrates
 * clinical notes in a patient-friendly way.
 */
export function generateNotesScene(
  notes: string,
  personalization: PersonalizationInput
): ScriptSection {
  const firstName = personalization.patientName.split(" ")[0];
  const text =
    `${personalization.doctorName} also wanted to share a personal note for you, ${firstName}. ` +
    `Regarding your specific situation: ${notes}. ` +
    `If you have any questions about this, the team at ${personalization.clinicName} is always here to help.`;

  // Estimate duration: ~150 words per minute
  const wordCount = text.split(/\s+/).length;
  const durationSeconds = Math.max(8, Math.round((wordCount / 150) * 60));

  return {
    id: "notes-custom",
    heading: "A Note From Your Doctor",
    text,
    durationSeconds,
  };
}

// ---------------------------------------------------------------------------
// Script composition
// ---------------------------------------------------------------------------

/** Sections to include for each video goal. */
const GOAL_SECTIONS: Record<
  VideoGoal,
  {
    includeImportance: boolean;
    includeExperience: boolean;
    includeReassurance: boolean;
  }
> = {
  educate: {
    includeImportance: true,
    includeExperience: true,
    includeReassurance: true,
  },
  reassure: {
    includeImportance: false,
    includeExperience: false,
    includeReassurance: true,
  },
  convince: {
    includeImportance: true,
    includeExperience: false,
    includeReassurance: false,
  },
  prepare: {
    includeImportance: false,
    includeExperience: true,
    includeReassurance: false,
  },
  follow_up: {
    includeImportance: false,
    includeExperience: true,
    includeReassurance: false,
  },
  celebrate: {
    includeImportance: false,
    includeExperience: false,
    includeReassurance: false,
  },
};

/**
 * Compose a full script from templates.
 *
 * 1. Looks up the template for the treatment
 * 2. Selects the right intro/outro based on patient status
 * 3. Chooses which optional sections to include based on video goal
 * 4. Injects personalization into all text
 * 5. Generates a notes scene if treatment notes are provided
 * 6. Calculates total duration
 */
export function composeScript(
  treatmentId: string,
  patientStatus: string,
  videoGoal: string,
  personalization: PersonalizationInput,
  options?: {
    includeImportance?: boolean;
    includeExperience?: boolean;
    includeReassurance?: boolean;
    mode?: "standard" | "premium";
  }
): ComposedScript {
  const template = templates.get(treatmentId);
  if (!template) {
    throw new Error(
      `No template found for treatment "${treatmentId}". Available: ${getAvailableTemplates().join(", ")}`
    );
  }

  const status = (patientStatus as PatientStatus) || "undecided";
  const goal = (videoGoal as VideoGoal) || "educate";

  // Determine which optional sections to include.
  // Explicit options override goal-based defaults.
  const goalDefaults = GOAL_SECTIONS[goal] ?? GOAL_SECTIONS.educate;
  const showImportance =
    options?.includeImportance ?? goalDefaults.includeImportance;
  const showExperience =
    options?.includeExperience ?? goalDefaults.includeExperience;
  const showReassurance =
    options?.includeReassurance ?? goalDefaults.includeReassurance;

  // Helper to personalize a section
  const p = (section: ScriptSection): ScriptSection => ({
    ...section,
    text: personalize(section.text, personalization),
  });

  // Select intro and outro
  const intro = p(template.intros[status] ?? template.intros.undecided);
  const cta = p(template.outros[status] ?? template.outros.undecided);

  // Core sections (always included for most goals)
  const explanation = p(template.explanation);
  const process = p(template.process);
  const outcome = p(template.outcome);

  // Optional sections
  const importance = showImportance ? p(template.importance) : undefined;
  const experience = showExperience ? p(template.experience) : undefined;
  const reassurance = showReassurance ? p(template.reassurance) : undefined;

  // Notes scene
  const notes = personalization.treatmentNotes
    ? generateNotesScene(personalization.treatmentNotes, personalization)
    : undefined;

  // For "celebrate" and "follow_up" goals, slim down the required sections
  let finalExplanation = explanation;
  let finalProcess = process;
  let finalOutcome = outcome;

  if (goal === "celebrate") {
    // Celebrate only needs intro + outcome + cta
    finalExplanation = {
      ...explanation,
      text: personalize(template.outcome.text, personalization),
      durationSeconds: template.outcome.durationSeconds,
    };
    finalProcess = {
      ...process,
      text: "",
      durationSeconds: 0,
    };
  }

  if (goal === "follow_up") {
    // Follow-up focuses on outcome + experience, slims explanation/process
    finalProcess = {
      ...process,
      text: "",
      durationSeconds: 0,
    };
  }

  // Build scenes object
  const scenes: ComposedScript["scenes"] = {
    intro,
    explanation: goal === "celebrate" ? finalExplanation : explanation,
    process: goal === "celebrate" || goal === "follow_up" ? finalProcess : process,
    ...(importance && { importance }),
    outcome: finalOutcome,
    ...(experience && { experience }),
    ...(reassurance && { reassurance }),
    ...(notes && { notes }),
    cta,
  };

  // Calculate total duration
  let totalDurationSeconds = 0;
  for (const scene of Object.values(scenes)) {
    if (scene && typeof scene === "object" && "durationSeconds" in scene) {
      totalDurationSeconds += (scene as ScriptSection).durationSeconds;
    }
  }

  return {
    scenes,
    totalDurationSeconds,
  };
}

// ---------------------------------------------------------------------------
// Template queries
// ---------------------------------------------------------------------------

/** Get a list of all available treatment IDs. */
export function getAvailableTemplates(): string[] {
  return Array.from(templates.keys());
}

/** Check if a template exists for a given treatment ID. */
export function hasTemplate(treatmentId: string): boolean {
  return templates.has(treatmentId);
}

/** Get the raw template for a treatment (useful for inspection/debugging). */
export function getTemplate(
  treatmentId: string
): TreatmentScriptTemplate | undefined {
  return templates.get(treatmentId);
}
