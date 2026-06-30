/**
 * Real-world clinical / treatment visual plans for the Opera × Truveta
 * patient-education video demo.
 *
 * These are CALM, NON-GRAPHIC medical-explainer visuals — simplified 2D/2.5D
 * anatomy, labeled diagrams, clean device illustrations, calm care settings,
 * recovery timelines and research-visit flows. They blend alongside the
 * personalized UI layer in each video.
 *
 * Hard boundaries encoded in every plan:
 *  - Non-graphic only. No gore, blood pooling, open surgery, invasive close-ups,
 *    needles entering skin in detail, or frightening internal imagery.
 *  - Never interpret the patient's own result, never recommend an option,
 *    never imply the patient qualifies/should enroll, never start/stop/change
 *    medication, never diagnose or predict personal risk.
 *  - Always general and educational; decisions route back to the care team.
 */

import type { ClinicalVisualPlan } from './types';

export const clinicalVisualsById: Record<string, ClinicalVisualPlan[]> = {
  /* ----------------------------------------------------------------------- */
  /* 1. preventive-screening — colon cancer screening (James)                */
  /* ----------------------------------------------------------------------- */
  'preventive-screening': [
    {
      visualCategory: 'anatomy',
      realWorldConceptShown:
        'A simplified, clean diagram of the colon with the major sections gently labeled.',
      recommendedVisualStyle:
        'Clean 2.5D anatomy, deep-navy background, teal accents, soft shadows, large friendly labels, no realistic texture.',
      safeVisualBoundary:
        'Stylized educational diagram only — no realistic tissue, no internal photography, nothing that looks like a real medical image.',
      animationIdea:
        'The simplified colon outline draws itself in with a soft teal glow, then section labels fade in one by one with a gentle stagger.',
      staticFallback:
        'A single still frame: the labeled simplified colon diagram centered on a navy gradient.',
      assetSearchTerms: [
        'simplified colon anatomy diagram',
        'flat colon illustration labeled',
        'digestive tract line animation lottie',
        'large intestine vector explainer',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        "Here's a simple picture of the colon — screening is just a routine way to check this part of the body.",
      avoidShowing: [
        'graphic colonoscopy footage',
        'blood',
        'frightening internal imagery',
        'realistic tissue close-ups',
      ],
    },
    {
      visualCategory: 'procedure-walkthrough',
      realWorldConceptShown:
        'A small flexible camera traveling smoothly along a simplified colon pathway, shown as a calm guided tour.',
      recommendedVisualStyle:
        'Soft 2.5D cutaway with a friendly glowing path line; muted teal-on-navy, gentle depth, no realism.',
      safeVisualBoundary:
        'Abstract, diagram-style camera path only — never realistic endoscopy video, never tissue detail, never discomfort cues.',
      animationIdea:
        'A soft glow travels along the simplified colon path while a small camera icon follows it; calm waypoint dots light up in sequence.',
      staticFallback:
        'A still frame showing the simplified path with the camera icon partway along and three lit waypoints.',
      assetSearchTerms: [
        'colonoscopy explainer animation simplified',
        'endoscope path illustration',
        'medical camera diagram motion',
        'gentle procedure walkthrough lottie',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        'During the exam, a small flexible camera gently looks along the colon so the care team can see clearly — calm and routine.',
      avoidShowing: [
        'graphic colonoscopy footage',
        'realistic endoscope-in-body video',
        'frightening internal imagery',
        'patient discomfort or distress',
      ],
    },
    {
      visualCategory: 'sample-collection',
      realWorldConceptShown:
        'An at-home stool test kit on a tidy table, shown as one of several screening topics to discuss with the care team.',
      recommendedVisualStyle:
        'Clean product-style illustration of a neat kit box, calm home surface, soft teal accents, warm light.',
      safeVisualBoundary:
        'Show only the closed, clean kit packaging as a neutral topic — never any specimen, never a recommendation to pick this option.',
      animationIdea:
        'The kit box fades in on a calm table; a soft "one option to ask about" tag slides up beneath it without ranking the options.',
      staticFallback:
        'A still frame of the closed at-home test kit on a calm table with a neutral caption.',
      assetSearchTerms: [
        'at-home stool test kit illustration',
        'FIT screening kit box vector',
        'home health test kit flat icon',
        'medical kit on table calm',
      ],
      scenePlacement: 'before-cta',
      patientFriendlyExplanation:
        'There are different ways to screen, including at-home kits — a great thing to ask your care team which fits you.',
      avoidShowing: [
        'graphic colonoscopy footage',
        'any specimen or biological sample',
        'which screening option to choose',
        'frightening internal imagery',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 2. chronic-care-followup — diabetes A1C follow-up (Sarah)               */
  /* ----------------------------------------------------------------------- */
  'chronic-care-followup': [
    {
      visualCategory: 'sample-collection',
      realWorldConceptShown:
        'A clean lab blood-sample vial gently filling, shown as a routine, calm step.',
      recommendedVisualStyle:
        'Minimal 2.5D lab vial on navy, soft teal liquid, gentle highlights, no clinical sterility coldness.',
      safeVisualBoundary:
        'Show only a tidy vial and a calm label — never a needle entering skin, never an arm draw close-up, never any wound.',
      animationIdea:
        'A small vial fills with a soft teal level rising smoothly, then a gentle label "routine A1C check" fades in beside it.',
      staticFallback:
        'A still frame of a half-filled, labeled vial centered on a navy gradient.',
      assetSearchTerms: [
        'blood sample vial illustration calm',
        'lab tube filling animation',
        'A1C test vial flat icon',
        'blood draw tube vector minimal',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        'The A1C is a simple, routine blood check — quick and part of staying on top of things.',
      avoidShowing: [
        "interpreting Sarah's actual result",
        'needle entering skin in detail',
        'any medication change',
        'distressing or cold clinical imagery',
      ],
    },
    {
      visualCategory: 'mechanism-of-action',
      realWorldConceptShown:
        'Simplified red blood cells with little glucose dots, illustrating A1C as a general "average blood sugar over the past few months" idea.',
      recommendedVisualStyle:
        'Friendly 2.5D cells in soft teal/coral, navy background, large plain labels, calm rounded shapes.',
      safeVisualBoundary:
        'General concept only — never a number, never "good/bad" zones, never anything specific to Sarah; keep it textbook-level.',
      animationIdea:
        'Soft red cells drift in; small glucose dots gently attach; a caption fades in: "A1C reflects an average over the past few months."',
      staticFallback:
        'A still frame of a few simplified cells with glucose dots and the general explainer caption.',
      assetSearchTerms: [
        'red blood cell glucose illustration',
        'A1C explainer animation simplified',
        'blood sugar over time diagram',
        'hemoglobin glucose flat infographic',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        'In general, A1C gives a picture of your average blood sugar over the past few months — your care team explains what yours means for you.',
      avoidShowing: [
        "interpreting Sarah's actual result",
        'telling her what number is good or bad for her',
        'any medication change',
        'specific personal risk claims',
      ],
    },
    {
      visualCategory: 'patient-experience',
      realWorldConceptShown:
        'A calm follow-up conversation, with a nod to fitting the visit around a night-shift schedule.',
      recommendedVisualStyle:
        'Warm 2.5D scene of a person and clinician talking, soft evening palette, navy/teal, gentle motion.',
      safeVisualBoundary:
        'Show a supportive, judgment-free conversation only — no charts of personal numbers, no advice on screen.',
      animationIdea:
        'Two simple figures fade in across a calm table; a soft "fits your schedule" tag slides up; warm light shifts gently.',
      staticFallback:
        'A still frame of the calm follow-up conversation with a warm caption.',
      assetSearchTerms: [
        'doctor patient conversation illustration calm',
        'telehealth follow up flat scene',
        'supportive clinic visit vector',
        'evening appointment health illustration',
      ],
      scenePlacement: 'before-cta',
      patientFriendlyExplanation:
        'Your follow-up is a chance to talk it through together — and it can be scheduled around your shifts.',
      avoidShowing: [
        "interpreting Sarah's actual result",
        "displaying Sarah's personal numbers",
        'any medication change',
        'pressure or judgment cues',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 3. clinical-trial-education — research opportunity (Maria)              */
  /* ----------------------------------------------------------------------- */
  'clinical-trial-education': [
    {
      visualCategory: 'research-visit',
      realWorldConceptShown:
        'A person walking through a calm research-visit flow and talking with a study coordinator.',
      recommendedVisualStyle:
        'Warm 2.5D scene, navy/teal, friendly figures, soft path between a few clear stations, large labels.',
      safeVisualBoundary:
        'Show a welcoming, voluntary process only — never imply this person qualifies or is enrolled, never clinical pressure.',
      animationIdea:
        'A figure walks a soft path past welcoming station markers; a study-coordinator figure waves; a "voluntary, your choice" tag fades in.',
      staticFallback:
        'A still frame of the figure mid-path with the study coordinator and the voluntary tag.',
      assetSearchTerms: [
        'clinical research visit illustration calm',
        'study coordinator conversation vector',
        'research participant journey flat scene',
        'friendly clinic walkthrough animation',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        'Research participation is always your choice — a coordinator walks you through what it involves, no pressure at all.',
      avoidShowing: [
        'implying Maria qualifies',
        'implying enrollment is recommended',
        'scary lab imagery',
        'any pressure to participate',
      ],
    },
    {
      visualCategory: 'patient-experience',
      realWorldConceptShown:
        'A sample timeline of study visits laid out as friendly, optional steps, with family welcome to join.',
      recommendedVisualStyle:
        'Clean horizontal timeline, navy base, teal milestone dots, soft cards, room for a family figure.',
      safeVisualBoundary:
        'Show a generic example timeline only — clearly labeled as an example, never a commitment, never specific to Maria.',
      animationIdea:
        'Timeline dots light up left to right with gentle cards; a small "example only — and family can come along" note fades in.',
      staticFallback:
        'A still frame of the example study-visit timeline with three lit milestones and the family note.',
      assetSearchTerms: [
        'study visit timeline illustration',
        'clinical trial schedule infographic calm',
        'patient journey milestones vector',
        'family supporting visit flat scene',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        'Here is an example of how study visits might be spaced — and your daughter is welcome to come with you.',
      avoidShowing: [
        'implying Maria qualifies',
        'implying enrollment is recommended',
        'scary lab imagery',
        'presenting the example as a fixed commitment',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 4. post-discharge-recovery — recovery after hospital (Robert)          */
  /* ----------------------------------------------------------------------- */
  'post-discharge-recovery': [
    {
      visualCategory: 'recovery-home-care',
      realWorldConceptShown:
        'A calm home-recovery timeline: Day 1 → Week 1 → Follow-up, shown as gentle, manageable steps.',
      recommendedVisualStyle:
        'Soft 2.5D timeline in a cozy home palette, navy/teal accents, rounded cards, warm light, large text.',
      safeVisualBoundary:
        'Show reassuring milestones and rest cues only — never wounds, never graphic recovery, never alarming imagery.',
      animationIdea:
        'Three timeline cards (Day 1, Week 1, Follow-up) slide up in sequence with soft check-marks appearing as a glow passes through.',
      staticFallback:
        'A still frame of the three-step recovery timeline with gentle icons.',
      assetSearchTerms: [
        'home recovery timeline illustration',
        'post discharge care plan infographic',
        'rest and recover at home flat scene',
        'recovery milestones calm vector',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        'Recovery happens one step at a time — rest on Day 1, ease into Week 1, then your follow-up check-in.',
      avoidShowing: [
        'wounds',
        'graphic recovery imagery',
        'alarming red-flag depictions',
        'distress or pain cues',
      ],
    },
    {
      visualCategory: 'care-setting',
      realWorldConceptShown:
        'A calm home setting with a clearly displayed "who to call" card — a phone and the care team within reach, especially helpful living alone.',
      recommendedVisualStyle:
        'Warm 2.5D living room, soft lamp light, a tidy contact card and phone, navy/teal accents, comforting tone.',
      safeVisualBoundary:
        'Keep "call your team if…" as a calm, plain list — never a scary symptom illustration, never a frightening scenario.',
      animationIdea:
        'A cozy room fades in; a contact card gently lifts forward; a soft "call anytime if something feels off" line types in calmly.',
      staticFallback:
        'A still frame of the calm home with the contact card and phone in focus.',
      assetSearchTerms: [
        'calm home living room illustration',
        'who to call care contact card vector',
        'support phone line health flat icon',
        'recovering alone at home cozy scene',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        "You're not on your own — keep your care team's number close, and call anytime something doesn't feel right.",
      avoidShowing: [
        'wounds',
        'graphic recovery imagery',
        'alarming red-flag depictions',
        'frightening emergency scenarios',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 5. medication-journey — cardiology medication questions (Linda)         */
  /* ----------------------------------------------------------------------- */
  'medication-journey': [
    {
      visualCategory: 'mechanism-of-action',
      realWorldConceptShown:
        'A medication bottle / weekly pill pack transitioning into a simplified body pathway, presented as a general medication-class concept.',
      recommendedVisualStyle:
        'Clean 2.5D pill pack and a gentle simplified body silhouette with a soft path, navy/teal, large plain labels.',
      safeVisualBoundary:
        'General, textbook-level concept only — never a specific clinical claim, never tied to Linda, never a dosing instruction.',
      animationIdea:
        'A weekly pill pack fades in; one pill softly dissolves into a glowing path along a simplified body outline; a "general idea" tag appears.',
      staticFallback:
        'A still frame of the pill pack beside the simplified body pathway with a general-concept caption.',
      assetSearchTerms: [
        'medication pill pack illustration',
        'how medication works simplified animation',
        'drug pathway body diagram flat',
        'pill bottle explainer vector calm',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        'In general, this kind of medication works steadily in the body — your care team explains how yours fits your plan.',
      avoidShowing: [
        'an exact mechanism stated as a clinical claim unless approved',
        'telling Linda to start, stop, or change medication',
        'specific dosing instructions',
        'personal risk predictions',
      ],
    },
    {
      visualCategory: 'patient-experience',
      realWorldConceptShown:
        'A friendly "side-effect questions" card — a calm prompt to bring questions to the care team rather than worry alone.',
      recommendedVisualStyle:
        'Soft question-card on navy, teal accent border, warm rounded type, a small clinician figure ready to listen.',
      safeVisualBoundary:
        'Frame side effects as questions to ASK, not warnings to fear — never list scary symptoms, never advise stopping medication.',
      animationIdea:
        'A question card flips up with three blank prompt lines that softly write themselves as "questions to ask my care team."',
      staticFallback:
        'A still frame of the side-effect question card with gentle prompt lines.',
      assetSearchTerms: [
        'questions for my doctor card illustration',
        'medication questions checklist vector',
        'patient talking to pharmacist flat scene',
        'ask your care team prompt animation',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        'If you notice anything new, write it down — bringing your questions to your care team is exactly the right move.',
      avoidShowing: [
        'a frightening list of side effects',
        'telling Linda to start, stop, or change medication',
        'an unapproved mechanism claim',
        'personal risk predictions',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 6. lab-result-explanation — blood test education (David)                */
  /* ----------------------------------------------------------------------- */
  'lab-result-explanation': [
    {
      visualCategory: 'sample-collection',
      realWorldConceptShown:
        'A calm lab process — a tidy sample tube and a friendly lab-bench scene, shown as quick and routine.',
      recommendedVisualStyle:
        'Minimal 2.5D lab bench, soft teal glassware on navy, gentle highlights, reassuring and clean.',
      safeVisualBoundary:
        'Show only tidy tubes and a calm bench — never a needle entering skin in detail, never an arm-draw close-up, never any wound.',
      animationIdea:
        'A sample tube slides into a rack; a soft glow sweeps the bench; a calm caption "routine blood test" fades in.',
      staticFallback:
        'A still frame of the tidy lab bench with the sample tube in the rack.',
      assetSearchTerms: [
        'lab bench blood test illustration calm',
        'sample tube rack vector',
        'routine blood draw flat scene',
        'laboratory process animation minimal',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        'A blood test is quick and routine — a small sample is all the lab needs to take a look.',
      avoidShowing: [
        "interpreting David's actual result",
        'needle entering skin in detail',
        'implying the result is good or bad for him',
        'any wound or distress',
      ],
    },
    {
      visualCategory: 'mechanism-of-action',
      realWorldConceptShown:
        'A neutral "what this test generally looks at" panel plus a calm, blank-style result report — general education, not a verdict.',
      recommendedVisualStyle:
        'Clean report card on navy, teal section dividers, large plain labels, soft neutral icons, no red/green zones.',
      safeVisualBoundary:
        'Explain the test in general terms only — never fill in or interpret a value, never use good/bad coloring, never tie to David.',
      animationIdea:
        'A report card fades in with section labels writing themselves; a neutral note slides up: "your care team walks through your results with you."',
      staticFallback:
        'A still frame of the neutral result-report card with general section labels.',
      assetSearchTerms: [
        'lab result report illustration neutral',
        'what blood test measures infographic',
        'medical report card vector calm',
        'health results explainer flat',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        'In general, this test looks at a few markers in your blood — and your care team is the one who walks through your results with you.',
      avoidShowing: [
        "interpreting David's actual result",
        'good/bad or red/green result zones',
        'implying the result is good or bad for him',
        'personal risk predictions',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 7. prenatal-visit-prep — prenatal visit (Amina)                         */
  /* ----------------------------------------------------------------------- */
  'prenatal-visit-prep': [
    {
      visualCategory: 'imaging-scan',
      realWorldConceptShown:
        'A calm ultrasound experience — the machine and a gentle wand near the belly, shown warmly and non-graphically.',
      recommendedVisualStyle:
        'Soft 2.5D scene, warm navy/teal, friendly machine illustration, glowing soft screen (abstract, not a real scan image).',
      safeVisualBoundary:
        'Show the calm experience only — the screen stays abstract/soft-glow, never a realistic fetal image, never any claim about the baby.',
      animationIdea:
        'The ultrasound machine fades in; a soft glow blooms on the abstract screen; a gentle "calm and routine" caption rises.',
      staticFallback:
        'A still frame of the calm ultrasound room with the soft-glow abstract screen.',
      assetSearchTerms: [
        'ultrasound machine illustration calm',
        'prenatal scan experience flat scene',
        'sonogram appointment vector gentle',
        'pregnancy checkup imaging animation',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        'An ultrasound is a gentle, painless way to check in during pregnancy — calm and routine.',
      avoidShowing: [
        'any alarming imagery',
        "any claim about the baby's health",
        'a realistic fetal scan image',
        'distressing or clinical-cold visuals',
      ],
    },
    {
      visualCategory: 'patient-experience',
      realWorldConceptShown:
        'A friendly overview of what generally happens at a prenatal visit — check-in, a few measurements, and time to ask questions.',
      recommendedVisualStyle:
        'Warm 2.5D step cards, navy/teal, welcoming clinician figure, large readable labels, supportive tone.',
      safeVisualBoundary:
        'Show a general, reassuring sequence only — never specific findings, never anything tied to Amina, never alarming content.',
      animationIdea:
        'Three soft step cards slide up — "check-in," "a few measurements," "your questions" — each with a gentle icon settling in.',
      staticFallback:
        'A still frame of the three general prenatal-visit step cards.',
      assetSearchTerms: [
        'prenatal visit steps illustration',
        'first pregnancy appointment flat scene',
        'OB visit what to expect infographic',
        'welcoming clinic visit vector calm',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        "Here's what a visit usually looks like — a quick check-in, a few measurements, and plenty of time for your questions.",
      avoidShowing: [
        'any alarming imagery',
        "any claim about the baby's health",
        'specific personal findings',
        'distressing visuals',
      ],
    },
    {
      visualCategory: 'care-setting',
      realWorldConceptShown:
        'A warm, welcoming prenatal clinic space designed to feel safe for a first-time visit.',
      recommendedVisualStyle:
        'Cozy 2.5D clinic interior, soft daylight, navy/teal accents, plants and warm seating, inviting and calm.',
      safeVisualBoundary:
        'Show a comfortable, welcoming environment only — no equipment that looks intimidating, no clinical-cold sterility.',
      animationIdea:
        'The clinic room eases into focus with soft daylight warming the space and a gentle "you are welcome here" caption fading in.',
      staticFallback:
        'A still frame of the warm, welcoming prenatal clinic interior.',
      assetSearchTerms: [
        'welcoming clinic interior illustration',
        'prenatal care office calm vector',
        'cozy medical waiting area flat scene',
        'maternal health clinic warm animation',
      ],
      scenePlacement: 'before-cta',
      patientFriendlyExplanation:
        "It's normal to feel nervous for a first visit — the clinic is a warm, welcoming place, and the team is glad you came.",
      avoidShowing: [
        'any alarming imagery',
        'intimidating equipment',
        'clinical-cold sterility',
        'distressing visuals',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 8. language-access — blood pressure follow-up in Spanish (Carlos)       */
  /* ----------------------------------------------------------------------- */
  'language-access': [
    {
      visualCategory: 'medical-device',
      realWorldConceptShown:
        'A blood-pressure cuff shown simply, with a calm illustration of how a reading is taken on the upper arm.',
      recommendedVisualStyle:
        'Clean 2.5D cuff illustration, navy/teal, soft inflate animation, large bilingual-friendly labels, no realism.',
      safeVisualBoundary:
        'Show the device and the simple steps only — never display or interpret specific numbers, never advise on readings.',
      animationIdea:
        'A cuff wraps a simplified arm, gently inflates with a soft pulse glow, then a neutral "—" display fades in (no real number).',
      staticFallback:
        'A still frame of the cuff on a simplified arm with a neutral, blank display.',
      assetSearchTerms: [
        'blood pressure cuff illustration',
        'how to take blood pressure flat animation',
        'sphygmomanometer vector calm',
        'BP monitor simple diagram',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        'El brazalete mide la presión de forma rápida y sin dolor — solo se coloca en el brazo unos segundos.',
      avoidShowing: [
        "interpreting Carlos's readings",
        'telling him his numbers are good or bad',
        'displaying a specific value as a verdict',
        'medication changes',
      ],
    },
    {
      visualCategory: 'patient-experience',
      realWorldConceptShown:
        'A calm clinic visit with care offered in Spanish — a warm, easy conversation with the care team.',
      recommendedVisualStyle:
        'Warm 2.5D scene, navy/teal, two friendly figures, soft speech bubbles in Spanish, welcoming light.',
      safeVisualBoundary:
        'Show a supportive bilingual conversation only — no personal numbers on screen, no clinical advice text.',
      animationIdea:
        'Two figures fade in; gentle Spanish speech bubbles ("¿Cómo se siente?") drift up; a soft "en tu idioma" tag settles in.',
      staticFallback:
        'A still frame of the calm Spanish-language clinic conversation.',
      assetSearchTerms: [
        'spanish speaking doctor patient illustration',
        'bilingual clinic visit flat scene',
        'language access healthcare vector',
        'friendly medical conversation calm',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        'Tu equipo de salud puede atenderte en español — puedes hacer todas tus preguntas con confianza.',
      avoidShowing: [
        "interpreting Carlos's readings",
        'telling him his numbers are good or bad',
        'personal values shown as a verdict',
        'medication changes',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 9. procedure-prep — colonoscopy preparation (Elaine, caregiver)         */
  /* ----------------------------------------------------------------------- */
  'procedure-prep': [
    {
      visualCategory: 'anatomy',
      realWorldConceptShown:
        'A simplified, gently labeled colon diagram so a caregiver can understand the area being examined.',
      recommendedVisualStyle:
        'Clean 2.5D anatomy, deep-navy background, teal accents, soft shadows, large labels, no realism.',
      safeVisualBoundary:
        'Stylized educational diagram only — no realistic tissue, no internal imagery, nothing alarming.',
      animationIdea:
        'The simplified colon outline draws in with a soft glow and friendly labels fade in with a gentle stagger.',
      staticFallback:
        'A still frame of the labeled simplified colon diagram on a navy gradient.',
      assetSearchTerms: [
        'simplified colon anatomy diagram',
        'large intestine labeled illustration',
        'digestive tract explainer vector',
        'colon diagram flat calm',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        "Here's a simple picture of the area the exam looks at — helpful to understand as you support your mother.",
      avoidShowing: [
        'graphic colonoscopy footage',
        'blood',
        'frightening internal imagery',
        'claiming a specific outcome',
      ],
    },
    {
      visualCategory: 'procedure-walkthrough',
      realWorldConceptShown:
        'A calm, simplified walkthrough of the exam day from arrival to recovery, shown as easy steps.',
      recommendedVisualStyle:
        'Soft 2.5D step path, navy/teal, friendly waypoint icons, large readable labels, reassuring pace.',
      safeVisualBoundary:
        'Abstract step diagram only — never realistic endoscopy footage, never discomfort cues, never a guaranteed result.',
      animationIdea:
        'A soft glow moves along a step path — arrive, rest, exam, recover — lighting friendly icons one at a time.',
      staticFallback:
        'A still frame of the four-step exam-day path with lit waypoints.',
      assetSearchTerms: [
        'colonoscopy day steps illustration',
        'procedure walkthrough simplified animation',
        'exam day timeline flat scene',
        'gentle medical procedure path vector',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        'The day itself is straightforward — arrive, rest, the exam, then a short recovery before heading home.',
      avoidShowing: [
        'graphic colonoscopy footage',
        'blood',
        'frightening internal imagery',
        'claiming a specific outcome',
      ],
    },
    {
      visualCategory: 'care-setting',
      realWorldConceptShown:
        'A calm procedure-room prep scene plus a transportation/timing reminder — handy for a caregiver arranging the day.',
      recommendedVisualStyle:
        'Warm 2.5D clinic room and a small car/clock motif, navy/teal, tidy and reassuring, large labels.',
      safeVisualBoundary:
        'Show a calm room and logistics only — no equipment that looks intimidating, no distressing imagery.',
      animationIdea:
        'A tidy procedure room fades in; a small car and clock icon slide up with a soft "plan a ride home" reminder caption.',
      staticFallback:
        'A still frame of the calm procedure room with the ride/timing reminder.',
      assetSearchTerms: [
        'calm procedure room illustration',
        'ride home after procedure vector',
        'appointment timing reminder flat icon',
        'caregiver planning visit scene',
      ],
      scenePlacement: 'before-cta',
      patientFriendlyExplanation:
        "Since she'll need a ride afterward, planning the timing ahead makes the day smooth for both of you.",
      avoidShowing: [
        'graphic colonoscopy footage',
        'intimidating equipment',
        'frightening imagery',
        'claiming a specific outcome',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 10. caregiver-education — helping a loved one (George, daughter Nina)   */
  /* ----------------------------------------------------------------------- */
  'caregiver-education': [
    {
      visualCategory: 'patient-experience',
      realWorldConceptShown:
        'A caregiver and patient attending a visit together — a warm, supportive team-of-two moment.',
      recommendedVisualStyle:
        'Warm 2.5D scene, navy/teal, two close figures and a friendly clinician, soft light, gentle motion.',
      safeVisualBoundary:
        'Show supportive presence only — no personal medical details on screen, nothing that overrides the clinician.',
      animationIdea:
        'Two figures fade in side by side; a soft "in this together" tag rises; a clinician figure gives a gentle welcoming nod.',
      staticFallback:
        'A still frame of the caregiver and patient together at a calm visit.',
      assetSearchTerms: [
        'caregiver and patient at appointment illustration',
        'family supporting elder visit flat scene',
        'daughter helping parent doctor vector',
        'supportive caregiver clinic calm',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        'Going to a visit together makes things easier — you can listen, take notes, and ask questions as a team.',
      avoidShowing: [
        'any alarming imagery',
        'anything that overrides clinician guidance',
        'personal medical details on screen',
        'distress or conflict cues',
      ],
    },
    {
      visualCategory: 'care-setting',
      realWorldConceptShown:
        'A calm, welcoming clinic where a caregiver can comfortably accompany and support their loved one.',
      recommendedVisualStyle:
        'Cozy 2.5D clinic interior, soft daylight, navy/teal accents, comfortable seating for two, inviting tone.',
      safeVisualBoundary:
        'Show a comfortable, welcoming environment only — no intimidating equipment, no clinical-cold sterility.',
      animationIdea:
        'The clinic eases into focus with warm light; two soft seats glow gently; a "you can come along" caption fades in.',
      staticFallback:
        'A still frame of the welcoming clinic with comfortable seating for two.',
      assetSearchTerms: [
        'welcoming clinic waiting area illustration',
        'caregiver friendly clinic vector',
        'cozy medical office flat scene',
        'support person clinic calm animation',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        "The clinic welcomes support people — there's room for you to be right there alongside your dad.",
      avoidShowing: [
        'any alarming imagery',
        'anything that overrides clinician guidance',
        'intimidating equipment',
        'clinical-cold sterility',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 11. health-equity-transport — follow-up despite barriers (Tasha)       */
  /* ----------------------------------------------------------------------- */
  'health-equity-transport': [
    {
      visualCategory: 'care-setting',
      realWorldConceptShown:
        'Getting to the clinic made simple — coordinating a ride and a calm route to the appointment.',
      recommendedVisualStyle:
        'Friendly 2.5D map-route with a small car, navy/teal, soft pin markers, warm and encouraging, large labels.',
      safeVisualBoundary:
        'Show supportive logistics only — never stigmatizing imagery, never anything implying blame for barriers.',
      animationIdea:
        'A soft route line draws from a home pin to a clinic pin while a small car glides along and a "ride sorted" tag fades in.',
      staticFallback:
        'A still frame of the calm map-route from home to clinic with a small car.',
      assetSearchTerms: [
        'ride to clinic map route illustration',
        'transportation to appointment vector',
        'health navigation transport flat scene',
        'getting to the doctor calm animation',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        "Getting there can be the hardest part — there are ways to help arrange a ride so the visit fits your day.",
      avoidShowing: [
        'stigmatizing imagery',
        'anything implying blame',
        'distress or hardship cues',
        'judgmental depictions',
      ],
    },
    {
      visualCategory: 'patient-experience',
      realWorldConceptShown:
        'A supportive, judgment-free visit where the care team helps with childcare and scheduling barriers, no questions asked.',
      recommendedVisualStyle:
        'Warm 2.5D scene, navy/teal, a parent with a child and a kind clinician/navigator, soft reassuring light.',
      safeVisualBoundary:
        'Show warmth and support only — never stigma, never blame, never a depiction of struggle as fault.',
      animationIdea:
        'A parent-with-child figure and a navigator fade in across a calm table; a soft "no judgment, we will help" line types in gently.',
      staticFallback:
        'A still frame of the supportive, judgment-free visit with a navigator.',
      assetSearchTerms: [
        'supportive clinic visit parent child illustration',
        'patient navigator help flat scene',
        'judgment free healthcare vector',
        'community health support calm animation',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        "Life is busy and that's okay — your care team is here to help with scheduling and childcare so your follow-up can happen.",
      avoidShowing: [
        'stigmatizing imagery',
        'anything implying blame',
        'struggle depicted as fault',
        'judgmental depictions',
      ],
    },
  ],

  /* ----------------------------------------------------------------------- */
  /* 12. genomics-consent — research consent & de-identified data (Henry)   */
  /* ----------------------------------------------------------------------- */
  'genomics-consent': [
    {
      visualCategory: 'sample-collection',
      realWorldConceptShown:
        'A simple saliva or small blood sample for genomics research, shown as quick and easy.',
      recommendedVisualStyle:
        'Clean 2.5D saliva tube / tidy sample kit on navy, soft teal accents, gentle highlights, no realism.',
      safeVisualBoundary:
        'Show a tidy closed sample kit only — never a needle entering skin in detail, never a specimen, never anything alarming.',
      animationIdea:
        'A saliva tube and kit fade in; a soft cap-twist motion plays; a calm "quick and simple" caption rises beside it.',
      staticFallback:
        'A still frame of the closed saliva sample kit on a navy gradient.',
      assetSearchTerms: [
        'saliva sample kit illustration',
        'genomics sample collection vector',
        'DNA test tube flat icon calm',
        'research sample kit minimal animation',
      ],
      scenePlacement: 'after-intro',
      patientFriendlyExplanation:
        'A genomics sample is usually as simple as a little saliva — quick, easy, and painless.',
      avoidShowing: [
        'exposing identifiers',
        'implying enrollment is recommended',
        'scary lab imagery',
        'needle entering skin in detail',
      ],
    },
    {
      visualCategory: 'mechanism-of-action',
      realWorldConceptShown:
        'A de-identification concept: a record with personal identifiers being removed behind a privacy shield before any research use.',
      recommendedVisualStyle:
        'Clean 2.5D record card and shield motif, navy/teal, soft lock icon, large plain labels, trustworthy tone.',
      safeVisualBoundary:
        'Illustrate the privacy concept generally — never show real identifiers, never imply Henry should enroll, never scary data imagery.',
      animationIdea:
        'A record card slides behind a glowing shield; name/ID fields gently blur and lift away; a soft "identifiers removed" lock clicks in.',
      staticFallback:
        'A still frame of the record behind the privacy shield with identifiers shown as blurred placeholders.',
      assetSearchTerms: [
        'data de-identification illustration',
        'privacy shield health data vector',
        'anonymized records infographic calm',
        'consent and data protection flat scene',
      ],
      scenePlacement: 'mid',
      patientFriendlyExplanation:
        'Before any research use, personal details like your name are removed — your privacy is protected behind the scenes, and joining is always your choice.',
      avoidShowing: [
        'exposing identifiers',
        'implying enrollment is recommended',
        'scary lab imagery',
        'real personal data on screen',
      ],
    },
  ],
};

export function clinicalVisualsFor(id: string): ClinicalVisualPlan[] {
  return clinicalVisualsById[id] ?? [];
}
