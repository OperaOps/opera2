/**
 * Opera Patient Education Studio — synthetic demo dataset.
 *
 * Opera AI x Truveta concept demo. Every record below is SYNTHETIC.
 * The product is patient EDUCATION and communication only — never
 * diagnosis, treatment recommendation, medication guidance, independent
 * result interpretation, or patient-specific risk prediction.
 */

import type {
  DemoUseCase,
  Department,
  UseCaseCategory,
} from './types';
import { storyboardsById } from './storyboardsV2';

const baseUseCases: DemoUseCase[] = [
  // 1 ─────────────────────────────────────────────────────────────────────
  {
    id: 'preventive-screening',
    category: 'Preventive Screening',
    title: 'Understanding Your Colon Cancer Screening Reminder',
    department: 'Primary Care / Population Health',
    summary:
      'Turns a routine screening reminder into a calm, clear explanation James can act on between work trips.',
    accent: 'teal',
    patient: {
      name: 'James',
      age: 52,
      pronouns: 'he/him',
      language: 'English',
      healthLiteracy: 'intermediate',
      emotionalState: 'reassured-seeking',
      lifeContext: {
        occupation: 'Project manager (frequent travel)',
        livingSituation: 'Lives with partner; often on the road',
        schedule: 'Unpredictable travel weeks, back-to-back meetings',
        preferences: ['Bottom-line-up-front', 'Clear next steps', 'Short and skimmable'],
        notes:
          'Postpones appointments when work travel piles up; not avoiding care, just genuinely squeezed for time.',
      },
      concerns: [
        {
          quote: "I've heard colonoscopies are a whole ordeal — I dread the idea.",
          acknowledgedAs:
            'Naming that the prep is the part most people worry about, and that there is more than one screening option to discuss.',
        },
        {
          quote: "I travel constantly. When would I even fit this in?",
          acknowledgedAs:
            'Acknowledging the scheduling squeeze and pointing to options worth raising with the care team.',
        },
      ],
      goals: [
        'Understand why the reminder showed up now',
        'Know the general screening options that exist',
        'Have a few good questions ready for the visit',
      ],
      barriers: [
        'Frequent work travel makes scheduling hard',
        'Anxiety about prep based on stories he has heard',
      ],
      synthetic: true,
    },
    clinicalContext: {
      trigger:
        'James reached an age where routine colorectal cancer screening is commonly discussed, and a population-health reminder was generated.',
      journeyStage: 'Pre-visit / preventive outreach',
      careTeamContext:
        'Primary care wants James to understand that screening is routine and that several approaches exist to talk through.',
      appointmentHistory: ['Annual physical 14 months ago', 'No prior colorectal screening on file'],
    },
    approvedContent: {
      title: 'Colorectal Cancer Screening — Patient Education Overview',
      owner: 'Meridian Health Population Health Council (synthetic)',
      summary:
        'Plain-language overview of why screening is recommended at routine ages and the general categories of screening options to discuss with a clinician.',
      version: 'v2.3',
      lastReviewed: '2026-04-12',
    },
    evidenceTheme: {
      theme:
        'Across large real-world populations, on-time colorectal screening is associated with earlier-stage detection at the population level.',
      educationalRelevance:
        'Used only to explain why routine screening reminders exist — never to estimate James’s personal risk.',
      provenance:
        'Truveta-style de-identified population trends, summarized for education and reviewed by the care team.',
    },
    personalizationSignals: [
      {
        label: 'Frequent travel schedule',
        value: 'Often away for work multiple weeks a month',
        source: 'patient-provided',
        appliedAs: 'Framing emphasizes flexible scheduling questions to raise with the office.',
      },
      {
        label: 'Prefers bottom-line-up-front',
        value: 'Wants the point first, details second',
        source: 'patient-provided',
        appliedAs: 'Opens with the “why now” before any detail.',
      },
      {
        label: 'Prep anxiety',
        value: 'Nervous about the procedure based on hearsay',
        source: 'patient-provided',
        appliedAs: 'Gently normalizes prep concerns and points to multiple options.',
      },
      {
        label: 'Screening age milestone',
        value: 'Reached a routine screening discussion age',
        source: 'journey-context',
        appliedAs: 'Explains the reminder as routine, not alarming.',
      },
    ],
    script: {
      opening: 'Hi James, this is a quick, friendly note about the screening reminder you just received.',
      fullNarration:
        'Hi James, this is a quick, friendly note about the screening reminder you just received. First, the bottom line: this reminder is routine. It showed up simply because you reached an age where colon cancer screening is commonly discussed — not because anything is wrong. We know your weeks fill up fast with travel and back-to-back meetings, so we kept this short and to the point, the way you like it. Here is the helpful part: screening is not just one thing. There are a few different approaches people talk through with their care team, and they vary in how they are done and how much preparation they involve. You mentioned you have heard colonoscopies can be an ordeal — that is the part most people ask about, and it is exactly the kind of question your care team is there to walk through with you. Because your schedule moves around so much, it is worth asking the office about timing and which options fit a traveling calendar. The goal of this note is simple: help you understand why the reminder came, know that real options exist, and walk into your visit with a couple of good questions ready. You do not have to figure any of this out alone.',
      closing:
        'Take your time, James — and when you are ready, your care team is glad to talk it through with you.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'Warm opening',
        narration:
          'Hi James, this is a quick, friendly note about the screening reminder you just received.',
        onScreenText: 'A quick note about your reminder',
        visualType: 'title-card',
        motionDirection: 'Soft fade-up of the title, gentle parallax on the background',
        transition: 'Cross-dissolve',
        iconName: 'Bell',
        lottieSearchKeyword: 'gentle notification chime',
        customAnimationIdea: 'A reminder card slides in, then relaxes as the tension visually eases.',
        backgroundStyle: 'Teal-to-slate gradient with soft grain',
        safetyBoundary: 'No diagnosis — frames the reminder as routine.',
        personalizationReason: 'James prefers short, friendly, bottom-line-up-front communication.',
        durationSec: 9,
      },
      {
        sceneTitle: 'Why now',
        narration:
          'First, the bottom line: this reminder is routine. It showed up simply because you reached an age where colon cancer screening is commonly discussed — not because anything is wrong.',
        onScreenText: 'This reminder is routine',
        visualType: 'journey-timeline',
        motionDirection: 'A timeline draws left-to-right, landing softly on “routine screening age”',
        transition: 'Slide-left',
        iconName: 'CalendarClock',
        lottieSearchKeyword: 'timeline milestone',
        customAnimationIdea: 'An age marker glides onto the timeline and pulses once, calmly.',
        backgroundStyle: 'Deep slate with a single teal accent line',
        safetyBoundary: 'No patient-specific risk scoring — explains population-level routine only.',
        personalizationReason: 'Answers James’s “why did this come now?” question first.',
        durationSec: 15,
      },
      {
        sceneTitle: 'Respecting your schedule',
        narration:
          'We know your weeks fill up fast with travel and back-to-back meetings, so we kept this short and to the point, the way you like it.',
        onScreenText: 'Built for a busy, traveling week',
        visualType: 'icon-grid',
        motionDirection: 'Three small icons fade in as a row, suitcase last',
        transition: 'Fade',
        iconName: 'Clock',
        lottieSearchKeyword: 'busy calendar travel',
        customAnimationIdea: 'A packed calendar gently clears to a single open slot.',
        backgroundStyle: 'Slate with teal iconography',
        safetyBoundary: 'No scheduling promises — points to office for timing.',
        personalizationReason: 'Reflects James’s frequent-travel reality directly.',
        durationSec: 12,
      },
      {
        sceneTitle: 'Options exist',
        narration:
          'Here is the helpful part: screening is not just one thing. There are a few different approaches people talk through with their care team, and they vary in how they are done and how much preparation they involve.',
        onScreenText: 'There is more than one option',
        visualType: 'comparison',
        motionDirection: 'Two option cards rise side by side, neither emphasized over the other',
        transition: 'Cross-dissolve',
        iconName: 'ClipboardList',
        lottieSearchKeyword: 'options choice cards',
        customAnimationIdea: 'Cards labeled only “Option A / Option B” to avoid implying a recommendation.',
        backgroundStyle: 'Teal gradient, balanced layout',
        safetyBoundary: 'No treatment recommendation — presents categories neutrally.',
        personalizationReason: 'Addresses the prep dread by showing options are not identical.',
        durationSec: 15,
      },
      {
        sceneTitle: 'Naming the worry',
        narration:
          'You mentioned you have heard colonoscopies can be an ordeal — that is the part most people ask about, and it is exactly the kind of question your care team is there to walk through with you. Because your schedule moves around so much, it is worth asking the office about timing and which options fit a traveling calendar.',
        onScreenText: 'Good questions to bring',
        visualType: 'question-list',
        motionDirection: 'Questions type in one by one as a checklist',
        transition: 'Slide-up',
        iconName: 'MessageSquare',
        lottieSearchKeyword: 'question checklist',
        customAnimationIdea: 'A short list of patient questions checks itself in sequence.',
        backgroundStyle: 'Slate with soft teal highlights',
        safetyBoundary: 'Stays in “questions to ask your care team” framing.',
        personalizationReason: 'Directly acknowledges James’s prep concern and travel constraint.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'Take your time, James — and when you are ready, your care team is glad to talk it through with you. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'You don’t have to figure this out alone',
        visualType: 'closing-card',
        motionDirection: 'Gentle zoom-out, disclaimer fades in beneath',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'calm reassurance',
        customAnimationIdea: 'The card settles and the disclaimer line eases in last.',
        backgroundStyle: 'Teal-to-slate gradient, calm',
        safetyBoundary: 'Educational disclaimer present and prominent.',
        personalizationReason: 'Closes warmly and respects James’s autonomy and timing.',
        durationSec: 9,
      },
    ],
    visualAssetPlan: {
      palette: 'Teal and slate with warm neutral text',
      keyVisuals: ['Routine timeline', 'Neutral option cards', 'Clearing calendar', 'Question checklist'],
      titleCard: 'Soft reminder card on teal gradient, friendly serif headline',
      iconStyle: 'Rounded line icons, two-tone teal',
    },
    motionPlan: {
      pacing: 'calm and brisk',
      signatureTransition: 'Cross-dissolve with subtle upward drift',
      motionNotes: 'Elements settle rather than bounce; nothing alarming or urgent.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hi James — here’s a quick note about your screening reminder and a few questions to bring. Watch when you have a sec: [link]',
      email: {
        subject: 'Your screening reminder, explained in 90 seconds',
        body:
          'Hi James,\n\nWe put together a short, skimmable explanation of the screening reminder you received — why it came now, the general options people discuss, and a couple of questions worth bringing to your visit. No medical advice, just clarity.\n\nWatch here: [link]\n\nYour care team is happy to talk it through whenever your schedule allows.',
      },
      portal:
        'A short education video about your colon cancer screening reminder is ready in your portal. It explains why the reminder came and offers questions to discuss at your visit.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'Frames the reminder as routine; makes no clinical determination.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Presents option categories neutrally; defers choice to care team.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'Uses population-level context only.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer shown on the closing card and narrated.' },
      { label: 'Approved content only', status: 'pass', detail: 'Built from approved screening education overview v2.3.' },
      { label: 'Human review required', status: 'pass', detail: 'Routed for care-team review before send.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not diagnose or imply anything is wrong',
        'Does not recommend a specific screening method',
        'Does not estimate James’s personal cancer risk',
        'Does not schedule or promise availability',
      ],
      does: [
        'Explains why a routine reminder appeared',
        'Describes that multiple options exist to discuss',
        'Acknowledges prep anxiety calmly',
        'Provides questions to bring to the visit',
      ],
      explanation:
        'This asset is purely educational outreach. It normalizes a routine reminder and prepares James to have an informed conversation, without making any clinical decision on his behalf.',
    },
    outputs: ['video', 'portal', 'sms', 'email'],
    estimatedRuntimeSec: 76,
  },

  // 2 ─────────────────────────────────────────────────────────────────────
  {
    id: 'chronic-care-followup',
    category: 'Chronic Care',
    title: 'Preparing for Your Diabetes Follow-Up',
    department: 'Primary Care / Endocrinology',
    summary:
      'Helps Sarah walk into her follow-up feeling prepared and respected, not judged — with her own questions ready.',
    accent: 'navy',
    patient: {
      name: 'Sarah',
      age: 47,
      pronouns: 'she/her',
      language: 'English',
      healthLiteracy: 'intermediate',
      emotionalState: 'guarded',
      lifeContext: {
        occupation: 'ICU nurse (night shifts)',
        livingSituation: 'Lives with her two teenagers',
        schedule: 'Overnight shifts; sleeps days, eats on an irregular clock',
        familyHistoryMentioned: 'Father had diabetes complications',
        preferences: ['Be treated as a partner', 'No lectures', 'Practical and respectful'],
        notes:
          'Has felt judged in past appointments and braces for criticism. Deeply motivated, just tired of feeling blamed.',
      },
      concerns: [
        {
          quote: "I feel like every visit is just a list of everything I did wrong.",
          acknowledgedAs:
            'Naming that this visit is a partnership and that her real-life schedule is part of the conversation, not a failing.',
        },
        {
          quote: "My dad had bad complications. That scares me more than I let on.",
          acknowledgedAs:
            'Gently honoring the family history as a reason to ask questions, never as a personal prediction.',
        },
      ],
      goals: [
        'Feel prepared instead of caught off guard',
        'Have questions ready about A1C, medications, food, and sleep',
        'Talk through how night shifts affect her routine',
      ],
      barriers: [
        'Night-shift schedule disrupts eating and sleep',
        'History of feeling judged makes her guarded',
      ],
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'A routine diabetes management follow-up is coming up on Sarah’s calendar.',
      journeyStage: 'Pre-visit preparation',
      careTeamContext:
        'The care team wants a collaborative visit and explicitly wants Sarah to bring her own questions and lived context.',
      appointmentHistory: ['Diabetes follow-up 4 months ago', 'Lab work recently completed'],
    },
    approvedContent: {
      title: 'Preparing for a Diabetes Follow-Up Visit — Patient Guide',
      owner: 'Meridian Endocrinology Patient Education Board (synthetic)',
      summary:
        'A guide to what diabetes follow-up visits commonly cover and how patients can prepare their own questions, including lifestyle and schedule factors.',
      version: 'v3.0',
      lastReviewed: '2026-03-28',
    },
    evidenceTheme: {
      theme:
        'In real-world populations, patients who arrive with prepared questions tend to report more collaborative visits.',
      educationalRelevance:
        'Used to encourage preparation and partnership — not to assess Sarah’s individual outcomes.',
      provenance:
        'Truveta-style de-identified engagement themes, summarized for patient education.',
    },
    personalizationSignals: [
      {
        label: 'Night-shift schedule',
        value: 'Works overnight in the ICU; eats and sleeps off the typical clock',
        source: 'patient-provided',
        appliedAs: 'Frames schedule as a topic to discuss, not a behavior to scold.',
      },
      {
        label: 'Felt judged previously',
        value: 'Past visits felt like a list of mistakes',
        source: 'patient-provided',
        appliedAs: 'Tone is explicitly non-judgmental and partnership-first.',
      },
      {
        label: 'Family history mentioned',
        value: 'Father experienced diabetes complications',
        source: 'patient-provided',
        appliedAs: 'Treated as a reason to ask questions, never a personal prognosis.',
      },
      {
        label: 'Wants practical questions',
        value: 'A1C, medications, food, and sleep',
        source: 'journey-context',
        appliedAs: 'Builds her question list around exactly these topics.',
      },
    ],
    script: {
      opening: 'Hi Sarah, this is a warm heads-up to help you feel ready for your follow-up — on your terms.',
      fullNarration:
        'Hi Sarah, this is a warm heads-up to help you feel ready for your follow-up — on your terms. Let us say the most important thing first: this visit is a partnership, not a report card. You have shared before that appointments can feel like a list of everything you did wrong, and that is not what we want this to be. Because you work night shifts in the ICU, your eating and sleeping run on a clock most plans never account for — and that is worth putting right on the table, not hiding. So here is what tends to come up at a follow-up like this, and what you might want to ask about: your A1C and what the number generally reflects, how your medications are fitting into your day, how food choices work around overnight shifts, and how sleep ties into all of it. You also mentioned your dad faced complications, and that understandably stays with you. That is a completely fair thing to bring up — not as a prediction about you, but as a reason to ask good questions and feel heard. Walk in with your list. You know your life better than anyone, and your care team wants to build the plan with you, not for you.',
      closing:
        'You’ve got this, Sarah — bring your questions, and let it be a real conversation.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'A partnership, not a report card',
        narration:
          'Hi Sarah, this is a warm heads-up to help you feel ready for your follow-up — on your terms. Let us say the most important thing first: this visit is a partnership, not a report card.',
        onScreenText: 'A partnership — not a report card',
        visualType: 'title-card',
        motionDirection: 'Title fades up; a subtle two-people motif appears side by side',
        transition: 'Cross-dissolve',
        iconName: 'Users',
        lottieSearchKeyword: 'collaboration partnership',
        customAnimationIdea: 'Two abstract figures move from facing-off to side-by-side.',
        backgroundStyle: 'Navy gradient with warm light',
        safetyBoundary: 'Sets a non-judgmental tone; no clinical claims.',
        personalizationReason: 'Directly answers Sarah’s fear of being judged.',
        durationSec: 12,
      },
      {
        sceneTitle: 'Your schedule belongs in the room',
        narration:
          'You have shared before that appointments can feel like a list of everything you did wrong, and that is not what we want this to be. Because you work night shifts in the ICU, your eating and sleeping run on a clock most plans never account for — and that is worth putting right on the table, not hiding.',
        onScreenText: 'Night shifts count — bring them up',
        visualType: 'quote-card',
        motionDirection: 'A clock rotates to a night position; warm glow softens it',
        transition: 'Slide-left',
        iconName: 'Clock',
        lottieSearchKeyword: 'night shift clock',
        customAnimationIdea: 'A 24-hour dial shifts to highlight overnight hours, non-judgmentally.',
        backgroundStyle: 'Deep navy with amber accent',
        safetyBoundary: 'Frames schedule as context, not as a fault.',
        personalizationReason: 'Centers Sarah’s night-shift reality respectfully.',
        durationSec: 16,
      },
      {
        sceneTitle: 'What usually comes up',
        narration:
          'So here is what tends to come up at a follow-up like this, and what you might want to ask about: your A1C and what the number generally reflects, how your medications are fitting into your day, how food choices work around overnight shifts, and how sleep ties into all of it.',
        onScreenText: 'A1C • medications • food • sleep',
        visualType: 'icon-grid',
        motionDirection: 'Four topic tiles fade in as a clean grid',
        transition: 'Fade',
        iconName: 'Activity',
        lottieSearchKeyword: 'health topics grid',
        customAnimationIdea: 'Each tile lifts slightly on entrance, like cards laid on a table.',
        backgroundStyle: 'Navy with soft blue tiles',
        safetyBoundary: 'Describes general topics; no individual interpretation.',
        personalizationReason: 'Maps to the exact topics Sarah said she wanted ready.',
        durationSec: 18,
      },
      {
        sceneTitle: 'Honoring family history',
        narration:
          'You also mentioned your dad faced complications, and that understandably stays with you. That is a completely fair thing to bring up — not as a prediction about you, but as a reason to ask good questions and feel heard.',
        onScreenText: 'Your worries are worth saying out loud',
        visualType: 'quote-card',
        motionDirection: 'A soft heart motif pulses once, gently',
        transition: 'Cross-dissolve',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'family care heart',
        customAnimationIdea: 'A quiet ripple, like being heard, expands from the center.',
        backgroundStyle: 'Navy with warm halo',
        safetyBoundary: 'No personal prognosis; honors history as a question prompt only.',
        personalizationReason: 'Acknowledges her father’s history with care, not fear.',
        durationSec: 14,
      },
      {
        sceneTitle: 'Bring your list',
        narration:
          'Walk in with your list. You know your life better than anyone, and your care team wants to build the plan with you, not for you.',
        onScreenText: 'Bring your questions',
        visualType: 'question-list',
        motionDirection: 'A notes list writes itself, like her own handwriting',
        transition: 'Slide-up',
        iconName: 'ClipboardList',
        lottieSearchKeyword: 'notes list handwriting',
        customAnimationIdea: 'Checkboxes appear next to her own prepared questions.',
        backgroundStyle: 'Navy with blue accents',
        safetyBoundary: 'Empowers preparation; no advice given.',
        personalizationReason: 'Reinforces Sarah as the expert on her own life.',
        durationSec: 12,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'You’ve got this, Sarah — bring your questions, and let it be a real conversation. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'Let it be a real conversation',
        visualType: 'closing-card',
        motionDirection: 'Gentle zoom-out; disclaimer eases in last',
        transition: 'Fade-to-card',
        iconName: 'MessageSquare',
        lottieSearchKeyword: 'warm conversation',
        customAnimationIdea: 'Two speech shapes meet in the middle, balanced.',
        backgroundStyle: 'Navy gradient, calm',
        safetyBoundary: 'Educational disclaimer present.',
        personalizationReason: 'Closes by affirming partnership and respect.',
        durationSec: 10,
      },
    ],
    visualAssetPlan: {
      palette: 'Navy with warm amber accents',
      keyVisuals: ['Side-by-side figures', '24-hour night dial', 'Topic tiles', 'Handwritten question list'],
      titleCard: 'Two-people motif on navy, warm and human typography',
      iconStyle: 'Soft line icons with rounded corners',
    },
    motionPlan: {
      pacing: 'reassuring',
      signatureTransition: 'Cross-dissolve with a gentle settle',
      motionNotes: 'Movements are warm and unhurried; nothing clinical or stern.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hi Sarah — a short, no-judgment guide to prep for your follow-up, with questions you can bring. Here when you wake up: [link]',
      email: {
        subject: 'Walk into your follow-up feeling prepared',
        body:
          'Hi Sarah,\n\nWe made a short, respectful guide to help you prepare for your diabetes follow-up. It covers the topics that usually come up — A1C, medications, food, and sleep — and helps you bring your own questions, including how night shifts fit in.\n\nWatch here: [link]\n\nThis is your conversation. We are glad to have it with you.',
      },
      portal:
        'A preparation video for your upcoming diabetes follow-up is ready. It’s built to help you feel ready and bring your own questions.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'Describes visit topics only; no clinical determination.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Encourages questions; recommends nothing.' },
      { label: 'No medication changes', status: 'pass', detail: 'Frames medications as a discussion topic only.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'Family history framed as a question prompt, not a prediction.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer narrated and shown.' },
      { label: 'Human review required', status: 'pass', detail: 'Reviewed by care team before delivery.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not interpret Sarah’s A1C or any result',
        'Does not adjust or comment on her medications',
        'Does not predict her risk based on family history',
        'Does not judge her schedule or choices',
      ],
      does: [
        'Sets a partnership tone for the visit',
        'Lists the general topics that may come up',
        'Helps her prepare her own questions',
        'Honors her schedule and concerns',
      ],
      explanation:
        'The asset prepares Sarah for a collaborative visit and validates her lived context. It deliberately stays out of clinical decisions, keeping everything in “bring this to your care team” framing.',
    },
    outputs: ['video', 'portal', 'sms', 'email'],
    estimatedRuntimeSec: 82,
  },

  // 3 ─────────────────────────────────────────────────────────────────────
  {
    id: 'clinical-trial-education',
    category: 'Clinical Research',
    title: 'Learning About a Research Opportunity',
    department: 'Oncology / Clinical Research',
    summary:
      'Demystifies what a clinical trial actually is for Maria, with her daughter alongside, centered on rights and choice.',
    accent: 'blue',
    patient: {
      name: 'Maria',
      age: 61,
      pronouns: 'she/her',
      language: 'English',
      healthLiteracy: 'basic',
      emotionalState: 'guarded',
      lifeContext: {
        occupation: 'Retired seamstress',
        livingSituation: 'Lives near her adult daughter, who helps with care decisions',
        preferences: ['Plain language', 'Daughter involved', 'No pressure'],
        familyHistoryMentioned: 'Family in oncology care',
        notes:
          'The word "trial" makes her uneasy — she pictures being experimented on. Trusts her daughter to help weigh decisions.',
      },
      concerns: [
        {
          quote: "When I hear 'trial,' I think they’ll experiment on me. That frightens me.",
          acknowledgedAs:
            'Gently explaining what trials actually are and emphasizing that participation is always voluntary.',
        },
        {
          quote: "I want my daughter to understand this with me.",
          acknowledgedAs:
            'Designing the asset so her daughter can watch alongside and follow easily.',
        },
      ],
      goals: [
        'Understand what a clinical trial actually is',
        'Know her rights and that participation is voluntary',
        'Have questions ready and her daughter informed',
      ],
      barriers: [
        'Fear rooted in the word “experiment”',
        'Wants a trusted family member to help decide',
      ],
      caregiver: {
        name: 'Lucia',
        relationship: 'Daughter',
        involvement: 'Helps Maria understand and weigh care decisions; watches educational materials with her.',
      },
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'Maria’s care team mentioned that a research opportunity may be available and offered education about it.',
      journeyStage: 'Education before any consent conversation',
      careTeamContext:
        'The team wants Maria (and her daughter) to understand research basics and patient rights before any decision is ever discussed.',
      appointmentHistory: ['Recent oncology visit', 'Research education offered, no decision made'],
    },
    approvedContent: {
      title: 'What Is a Clinical Trial? — Patient & Family Education',
      owner: 'Meridian Clinical Research Patient Advocacy Office (synthetic)',
      summary:
        'Plain-language explanation of what clinical trials are, patient rights, the meaning of voluntary participation, and questions to ask before deciding.',
      version: 'v1.8',
      lastReviewed: '2026-04-05',
    },
    evidenceTheme: {
      theme:
        'Across populations, clearer research education is associated with patients feeling more informed about their choices.',
      educationalRelevance:
        'Used to motivate clear, pressure-free education — not to encourage or discourage participation.',
      provenance:
        'Truveta-style de-identified education trends, summarized for patient and family understanding.',
    },
    personalizationSignals: [
      {
        label: 'Fear of being “experimented on”',
        value: 'The word “trial” triggers fear',
        source: 'patient-provided',
        appliedAs: 'Opens by gently reframing what a trial actually is.',
      },
      {
        label: 'Daughter involved',
        value: 'Lucia helps weigh care decisions',
        source: 'patient-provided',
        appliedAs: 'Adds a caregiver-friendly summary and direct address to family.',
      },
      {
        label: 'Plain-language preference',
        value: 'Basic health literacy; prefers simple words',
        source: 'patient-provided',
        appliedAs: 'Keeps every sentence short and concrete.',
      },
      {
        label: 'Voluntary participation emphasis',
        value: 'No decision has been made or expected',
        source: 'journey-context',
        appliedAs: 'Repeats that the choice is entirely hers, with no pressure.',
      },
    ],
    script: {
      opening: 'Hi Maria, this is a gentle introduction — just to learn, with no decisions to make today.',
      fullNarration:
        'Hi Maria, this is a gentle introduction — just to learn, with no decisions to make today. We know the word “trial” can sound scary, like being experimented on. So let us start there, plainly: a clinical trial is a carefully watched study that follows strict rules to protect the people in it. You are never a guinea pig. The most important part is this — joining is completely your choice. You can ask all the questions you want, take all the time you need, and you can say no at any point, even after starting, without it changing the care you receive. Because Lucia helps you think through your care, we made this so the two of you can watch it together and talk it over at the kitchen table. As you learn, here are good things to ask: What is this study trying to learn? What would it mean for my time and visits? What are my rights if I take part? And what happens if I choose not to? None of this is a recommendation, Maria. It is simply information, offered with respect, so you and Lucia can feel clear and unhurried about whatever you decide.',
      closing:
        'There’s no rush, Maria — learn at your pace, with Lucia beside you, and ask anything at all.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'Just learning today',
        narration:
          'Hi Maria, this is a gentle introduction — just to learn, with no decisions to make today.',
        onScreenText: 'Just learning — no decisions today',
        visualType: 'title-card',
        motionDirection: 'Calm fade-up; soft open-book motif',
        transition: 'Cross-dissolve',
        iconName: 'BookOpen',
        lottieSearchKeyword: 'gentle learning book',
        customAnimationIdea: 'A book opens slowly to a blank, welcoming page.',
        backgroundStyle: 'Soft blue gradient, warm light',
        safetyBoundary: 'No pressure framing; education only.',
        personalizationReason: 'Reassures Maria that nothing is being asked of her yet.',
        durationSec: 9,
      },
      {
        sceneTitle: 'What a trial really is',
        narration:
          'We know the word “trial” can sound scary, like being experimented on. So let us start there, plainly: a clinical trial is a carefully watched study that follows strict rules to protect the people in it. You are never a guinea pig.',
        onScreenText: 'A study with strict rules to protect you',
        visualType: 'quote-card',
        motionDirection: 'A shield motif assembles around a simple study icon',
        transition: 'Slide-left',
        iconName: 'ShieldCheck',
        lottieSearchKeyword: 'protection shield trust',
        customAnimationIdea: 'Protective rings gently surround a “study” symbol.',
        backgroundStyle: 'Blue with a soft protective glow',
        safetyBoundary: 'Defines a trial neutrally; no encouragement to join.',
        personalizationReason: 'Directly reframes Maria’s “experiment” fear in plain words.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Your choice, always',
        narration:
          'The most important part is this — joining is completely your choice. You can ask all the questions you want, take all the time you need, and you can say no at any point, even after starting, without it changing the care you receive.',
        onScreenText: 'Joining is always your choice',
        visualType: 'consent-panel',
        motionDirection: 'A consent card highlights the words “your choice” warmly',
        transition: 'Fade',
        iconName: 'ClipboardCheck',
        lottieSearchKeyword: 'consent choice checkmark',
        customAnimationIdea: 'A toggle stays clearly in the patient’s control, never auto-selected.',
        backgroundStyle: 'Blue with neutral panel',
        safetyBoundary: 'Centers voluntary participation; no nudging.',
        personalizationReason: 'Answers Maria’s core need to feel in control.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Watch it with Lucia',
        narration:
          'Because Lucia helps you think through your care, we made this so the two of you can watch it together and talk it over at the kitchen table.',
        onScreenText: 'Made to watch with Lucia',
        visualType: 'caregiver-card',
        motionDirection: 'Two figures appear beside each other at a warm table scene',
        transition: 'Cross-dissolve',
        iconName: 'Users',
        lottieSearchKeyword: 'family watching together',
        customAnimationIdea: 'A shared screen glows between two seated figures.',
        backgroundStyle: 'Warm blue, homey light',
        safetyBoundary: 'Supports family involvement; no advice.',
        personalizationReason: 'Built around Maria’s wish to include her daughter.',
        durationSec: 12,
      },
      {
        sceneTitle: 'Good questions to ask',
        narration:
          'As you learn, here are good things to ask: What is this study trying to learn? What would it mean for my time and visits? What are my rights if I take part? And what happens if I choose not to?',
        onScreenText: 'Questions to bring',
        visualType: 'question-list',
        motionDirection: 'Four questions appear one at a time, unhurried',
        transition: 'Slide-up',
        iconName: 'MessageSquare',
        lottieSearchKeyword: 'questions list calm',
        customAnimationIdea: 'Each question gently underlines as it appears.',
        backgroundStyle: 'Blue with soft accents',
        safetyBoundary: 'Question framing only; no recommendation.',
        personalizationReason: 'Gives Maria and Lucia a shared starting point.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'None of this is a recommendation, Maria. It is simply information, offered with respect, so you and Lucia can feel clear and unhurried about whatever you decide. There’s no rush — learn at your pace, with Lucia beside you, and ask anything at all. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'No rush. Your pace.',
        visualType: 'closing-card',
        motionDirection: 'Soft zoom-out; disclaimer fades in last',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'reassurance calm close',
        customAnimationIdea: 'The card settles slowly, like an exhale.',
        backgroundStyle: 'Blue gradient, calm',
        safetyBoundary: 'Educational disclaimer present; explicitly not a recommendation.',
        personalizationReason: 'Closes with respect for Maria’s autonomy and pace.',
        durationSec: 11,
      },
    ],
    visualAssetPlan: {
      palette: 'Soft blue with warm neutrals',
      keyVisuals: ['Protective shield motif', 'Patient-controlled consent toggle', 'Two-figure table scene', 'Question list'],
      titleCard: 'Open book on soft blue, gentle and welcoming',
      iconStyle: 'Rounded, friendly line icons',
    },
    motionPlan: {
      pacing: 'gentle and unhurried',
      signatureTransition: 'Slow cross-dissolve',
      motionNotes: 'Everything moves slowly and warmly; nothing feels persuasive.',
      renderTargets: ['Remotion', 'Lottie', 'Framer Motion'],
    },
    cta: {
      sms:
        'Hi Maria — a gentle, plain-language intro to research, made to watch with Lucia. No decisions needed: [link]',
      email: {
        subject: 'A gentle introduction to clinical research',
        body:
          'Hi Maria,\n\nWe made a short, plain-language video explaining what a clinical trial really is, your rights, and that taking part is always your choice. It’s designed for you and Lucia to watch together.\n\nWatch here: [link]\n\nThere is no decision to make and no rush. This is just to help you both feel informed.',
      },
      portal:
        'An education video about research opportunities is ready. It explains the basics and your rights — and it’s made to watch with a family member.',
      caregiverSummary:
        'For Lucia: This short video explains, in plain language, what a clinical trial is, that participation is entirely voluntary, and what questions to ask. It is education only — no recommendation. Watch it with your mom and bring any questions to the care team together.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'Explains research concepts only.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Does not encourage or discourage participation.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'No individual prognosis or risk language.' },
      { label: 'Source transparency', status: 'pass', detail: 'Built from approved research education content v1.8.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer narrated and shown.' },
      { label: 'Human review required', status: 'pass', detail: 'Reviewed by research patient advocacy before send.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not recommend joining or declining a trial',
        'Does not diagnose or discuss Maria’s condition',
        'Does not predict outcomes for Maria',
        'Does not collect consent or imply pressure',
      ],
      does: [
        'Explains what clinical trials are in plain language',
        'Emphasizes voluntary participation and rights',
        'Supports family involvement',
        'Offers neutral questions to ask the care team',
      ],
      explanation:
        'This is pre-consent education designed to reduce fear and increase understanding. It is deliberately neutral and pressure-free, leaving any decision entirely to Maria and her care team.',
    },
    outputs: ['video', 'portal', 'email', 'caregiver-summary'],
    estimatedRuntimeSec: 80,
  },

  // 4 ─────────────────────────────────────────────────────────────────────
  {
    id: 'post-discharge-recovery',
    category: 'Care Transitions',
    title: 'Understanding Your Recovery Plan',
    department: 'Hospital Medicine / Care Transitions',
    summary:
      'Translates Robert’s approved discharge paperwork into a calm, simple recovery summary he can actually follow at home.',
    accent: 'slate',
    patient: {
      name: 'Robert',
      age: 68,
      pronouns: 'he/him',
      language: 'English',
      healthLiteracy: 'basic',
      emotionalState: 'overwhelmed',
      lifeContext: {
        occupation: 'Retired electrician',
        livingSituation: 'Lives alone; his son visits on weekends',
        preferences: ['Simple printed summaries', 'Big clear text', 'One step at a time'],
        notes:
          'Came home with a thick stack of discharge paperwork and finds it overwhelming to sort through alone.',
      },
      concerns: [
        {
          quote: "There’s so much paperwork. I don’t know where to even start.",
          acknowledgedAs:
            'Breaking the approved discharge instructions into a few simple, ordered steps.',
        },
        {
          quote: "I live alone — what if I miss something important?",
          acknowledgedAs:
            'Making the “who to call” information clear and easy to find, drawn only from approved instructions.',
        },
      ],
      goals: [
        'Understand the follow-up steps in order',
        'Know how to do the medication review his instructions describe',
        'Know the red flags and who to contact',
      ],
      barriers: [
        'Lives alone with limited day-to-day support',
        'Overwhelmed by lengthy discharge paperwork',
      ],
      caregiver: {
        name: 'Marcus',
        relationship: 'Son',
        involvement: 'Visits on weekends; wants a simple summary he can review with his dad.',
      },
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'Robert was discharged home and received standard discharge instructions.',
      journeyStage: 'Post-discharge / care transition',
      careTeamContext:
        'The care team wants Robert to understand and follow the approved discharge instructions and know when to reach out.',
      appointmentHistory: ['Recent hospital stay', 'Follow-up appointment to be scheduled'],
    },
    approvedContent: {
      title: 'Discharge Instructions — Robert’s Approved Recovery Summary',
      owner: 'Meridian Hospital Care Transitions Team (synthetic)',
      summary:
        'The patient’s own approved discharge instructions, including follow-up steps, a medication review note, red-flag warning signs, and contact information.',
      version: 'v1.0 (patient-specific approved)',
      lastReviewed: '2026-04-10',
    },
    evidenceTheme: {
      theme:
        'Across populations, clearer post-discharge communication is associated with fewer avoidable confusion-driven calls and missed steps.',
      educationalRelevance:
        'Motivates clear restatement of approved instructions — not new clinical guidance.',
      provenance:
        'Truveta-style de-identified care-transition themes, summarized for education.',
    },
    personalizationSignals: [
      {
        label: 'Lives alone',
        value: 'Limited daily support; son visits weekends',
        source: 'patient-provided',
        appliedAs: 'Makes “who to call” prominent and reassuring.',
      },
      {
        label: 'Prefers simple printed summaries',
        value: 'Wants big text, one step at a time',
        source: 'patient-provided',
        appliedAs: 'Breaks instructions into a few ordered, plain steps.',
      },
      {
        label: 'Son reviews on weekends',
        value: 'Marcus helps on weekends',
        source: 'patient-provided',
        appliedAs: 'Adds a caregiver summary Marcus can review.',
      },
      {
        label: 'Approved discharge instructions',
        value: 'Robert’s own approved discharge document',
        source: 'approved-content',
        appliedAs: 'Every step is restated only from his approved instructions.',
      },
    ],
    script: {
      opening: 'Hi Robert, welcome home — let’s make your recovery plan simple and clear.',
      fullNarration:
        'Hi Robert, welcome home — let’s make your recovery plan simple and clear. We know you came back to a thick stack of paperwork, and that is a lot to sort through, especially on your own. So we have taken the instructions your care team approved and laid them out one step at a time, in plain words. Step one is your follow-up: your instructions describe a follow-up visit, so keep an eye out for that and we will help get it on the calendar. Step two is your medications: your discharge sheet lists a medication review, so the simple job here is to gather your bottles and go through them exactly as the instructions describe — and ask your care team if anything is unclear. Step three is knowing the warning signs your instructions call out, and exactly who to call. Because you live alone, we made that contact information big and easy to find, so it is right there whenever you need it. Nothing here is new advice, Robert — it is your own approved plan, just made easier to read. And since Marcus comes by on weekends, we made a short summary he can go over with you too.',
      closing:
        'One step at a time, Robert — you’re not on your own, and your care team is a phone call away.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'Welcome home',
        narration:
          'Hi Robert, welcome home — let’s make your recovery plan simple and clear. We know you came back to a thick stack of paperwork, and that is a lot to sort through, especially on your own.',
        onScreenText: 'Your recovery plan, made simple',
        visualType: 'title-card',
        motionDirection: 'Title fades up over a soft home motif',
        transition: 'Cross-dissolve',
        iconName: 'FileText',
        lottieSearchKeyword: 'paperwork simplify',
        customAnimationIdea: 'A tall stack of papers gently shrinks to a single clean page.',
        backgroundStyle: 'Slate gradient with warm home light',
        safetyBoundary: 'Restates approved instructions only.',
        personalizationReason: 'Acknowledges Robert’s overwhelm and that he lives alone.',
        durationSec: 13,
      },
      {
        sceneTitle: 'Step one — follow-up',
        narration:
          'So we have taken the instructions your care team approved and laid them out one step at a time, in plain words. Step one is your follow-up: your instructions describe a follow-up visit, so keep an eye out for that and we will help get it on the calendar.',
        onScreenText: 'Step 1 — your follow-up visit',
        visualType: 'journey-timeline',
        motionDirection: 'A simple numbered timeline reveals step one',
        transition: 'Slide-left',
        iconName: 'CalendarClock',
        lottieSearchKeyword: 'follow up appointment calendar',
        customAnimationIdea: 'A large “1” lands on a calendar with a soft check.',
        backgroundStyle: 'Slate with one clear accent',
        safetyBoundary: 'Reflects approved follow-up step only.',
        personalizationReason: 'Big, single-step format suits Robert’s preference.',
        durationSec: 14,
      },
      {
        sceneTitle: 'Step two — medication review',
        narration:
          'Step two is your medications: your discharge sheet lists a medication review, so the simple job here is to gather your bottles and go through them exactly as the instructions describe — and ask your care team if anything is unclear.',
        onScreenText: 'Step 2 — review your medications',
        visualType: 'checklist',
        motionDirection: 'Pill-bottle icons line up; a checklist forms beside them',
        transition: 'Fade',
        iconName: 'Pill',
        lottieSearchKeyword: 'medication review bottles',
        customAnimationIdea: 'Bottles gather into a row, then a checklist appears — no doses shown.',
        backgroundStyle: 'Slate with soft blue checklist',
        safetyBoundary: 'No medication changes; restates the approved review step only.',
        personalizationReason: 'Plain, do-this-next format reduces overwhelm.',
        durationSec: 15,
      },
      {
        sceneTitle: 'Step three — warning signs & who to call',
        narration:
          'Step three is knowing the warning signs your instructions call out, and exactly who to call. Because you live alone, we made that contact information big and easy to find, so it is right there whenever you need it.',
        onScreenText: 'Step 3 — warning signs + who to call',
        visualType: 'icon-grid',
        motionDirection: 'Warning-sign tiles fade in; a large phone number card lands last',
        transition: 'Cross-dissolve',
        iconName: 'Phone',
        lottieSearchKeyword: 'emergency contact phone',
        customAnimationIdea: 'A prominent “call” card scales up and stays on screen longest.',
        backgroundStyle: 'Slate with high-contrast contact card',
        safetyBoundary: 'Red flags restated only from approved instructions.',
        personalizationReason: 'Lives-alone context makes contact info prominent.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Just your own plan, made easy',
        narration:
          'Nothing here is new advice, Robert — it is your own approved plan, just made easier to read. And since Marcus comes by on weekends, we made a short summary he can go over with you too.',
        onScreenText: 'Your plan — easier to read',
        visualType: 'source-panel',
        motionDirection: 'A “from your approved instructions” badge appears beside the page',
        transition: 'Slide-up',
        iconName: 'ClipboardCheck',
        lottieSearchKeyword: 'approved document badge',
        customAnimationIdea: 'A source badge attaches to the simplified summary.',
        backgroundStyle: 'Slate, clean panel',
        safetyBoundary: 'Source transparency; approved content only.',
        personalizationReason: 'Names Marcus’s weekend involvement.',
        durationSec: 12,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'One step at a time, Robert — you’re not on your own, and your care team is a phone call away. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'One step at a time',
        visualType: 'closing-card',
        motionDirection: 'Gentle zoom-out; disclaimer eases in last',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'reassurance calm',
        customAnimationIdea: 'The card settles softly, contact card still faintly visible.',
        backgroundStyle: 'Slate gradient, calm',
        safetyBoundary: 'Educational disclaimer present.',
        personalizationReason: 'Reassures a patient living alone that help is close.',
        durationSec: 10,
      },
    ],
    visualAssetPlan: {
      palette: 'Slate with high-contrast warm accents',
      keyVisuals: ['Shrinking paper stack', 'Numbered step timeline', 'Medication checklist', 'Large contact card'],
      titleCard: 'Calm home motif on slate, large readable type',
      iconStyle: 'Bold, high-legibility line icons',
    },
    motionPlan: {
      pacing: 'calm and deliberate',
      signatureTransition: 'Slide with a soft settle',
      motionNotes: 'Generous on-screen time and large text for readability.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hi Robert — your recovery steps, made simple, plus who to call. Marcus can review it with you too: [link]',
      email: {
        subject: 'Your recovery plan, made simple',
        body:
          'Hi Robert,\n\nWe turned your approved discharge instructions into a short, clear video: your follow-up, your medication review, the warning signs to know, and who to call — with the contact info made big and easy to find.\n\nWatch here: [link]\n\nNothing here is new advice. It’s your own plan, just easier to follow. Your care team is a phone call away.',
      },
      portal:
        'A simplified summary of your discharge instructions is ready. It walks through your recovery steps and who to contact.',
      caregiverSummary:
        'For Marcus: This is a plain-language restatement of your dad’s approved discharge instructions — follow-up, medication review, warning signs, and contact info. It adds no new advice. Review it with him on the weekend and call the care team with any questions.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'Restates approved instructions; makes no determination.' },
      { label: 'No medication changes', status: 'pass', detail: 'Describes the approved review step; no doses or changes.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Adds no guidance beyond approved discharge content.' },
      { label: 'Approved content only', status: 'pass', detail: 'Sourced from Robert’s patient-specific approved instructions.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer narrated and shown.' },
      { label: 'Human review required', status: 'pass', detail: 'Reviewed by care transitions team before send.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not add any new clinical advice',
        'Does not change or specify medication doses',
        'Does not interpret Robert’s condition',
        'Does not predict his recovery outcome',
      ],
      does: [
        'Restates approved instructions in plain steps',
        'Makes the follow-up step clear',
        'Restates the approved medication-review step',
        'Highlights warning signs and contact info from the instructions',
      ],
      explanation:
        'Every line traces back to Robert’s own approved discharge instructions. The asset only improves readability and ordering — it never introduces new medical content.',
    },
    outputs: ['video', 'portal', 'sms', 'email', 'caregiver-summary'],
    estimatedRuntimeSec: 80,
  },

  // 5 ─────────────────────────────────────────────────────────────────────
  {
    id: 'medication-journey',
    category: 'Medication Education',
    title: 'Understanding Your Medication Questions',
    department: 'Cardiology / Medication Education',
    summary:
      'Helps Linda turn online worry into safe, specific questions for her care team — and never to stop on her own.',
    accent: 'teal',
    patient: {
      name: 'Linda',
      age: 59,
      pronouns: 'she/her',
      language: 'English',
      healthLiteracy: 'advanced',
      emotionalState: 'anxious',
      lifeContext: {
        occupation: 'High school librarian',
        livingSituation: 'Lives with her husband',
        preferences: ['Evidence-minded', 'Reads a lot online', 'Wants to feel in control'],
        notes:
          'Recently started a medication prescribed by her clinician. Reads extensively online and gets tempted to stop if she feels off.',
      },
      concerns: [
        {
          quote: "I read about side effects and now I’m tempted to just stop taking it.",
          acknowledgedAs:
            'Validating the worry while clearly steering toward asking the care team before changing anything.',
        },
        {
          quote: "I want to feel like I understand what’s happening to my body.",
          acknowledgedAs:
            'Encouraging good questions and reliable habits — without interpreting her specific situation.',
        },
      ],
      goals: [
        'Know how to ask safe, specific questions',
        'Understand to never change medication without the care team',
        'Feel more in control without going off-script',
      ],
      barriers: [
        'Online reading fuels anxiety about side effects',
        'Temptation to self-adjust the medication',
      ],
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'Linda recently started a new medication and has questions and worries about side effects.',
      journeyStage: 'Early on a new medication',
      careTeamContext:
        'The care team wants Linda to bring questions to them and to never stop or change the medication on her own.',
      appointmentHistory: ['Cardiology visit where medication was started', 'Follow-up planned'],
    },
    approvedContent: {
      title: 'Asking Safe Questions About a New Medication — Patient Education',
      owner: 'Meridian Cardiology Pharmacy Education Committee (synthetic)',
      summary:
        'Guidance on how to ask safe, useful questions about a new medication and why changes should always go through the care team.',
      version: 'v2.1',
      lastReviewed: '2026-04-09',
    },
    evidenceTheme: {
      theme:
        'In real-world populations, abrupt self-directed medication changes are a recurring theme in avoidable complications.',
      educationalRelevance:
        'Motivates the “ask first, don’t change on your own” message — never a comment on Linda’s specific medication.',
      provenance:
        'Truveta-style de-identified medication-adherence themes, summarized for education.',
    },
    personalizationSignals: [
      {
        label: 'Reads extensively online',
        value: 'Researches her medication and side effects online',
        source: 'patient-provided',
        appliedAs: 'Acknowledges her research instinct and channels it into questions.',
      },
      {
        label: 'Temptation to stop',
        value: 'Considers stopping if she feels strange',
        source: 'patient-provided',
        appliedAs: 'Clearly steers toward calling the care team first.',
      },
      {
        label: 'Wants to feel in control',
        value: 'Values understanding and agency',
        source: 'patient-provided',
        appliedAs: 'Reframes control as asking great questions, not self-adjusting.',
      },
      {
        label: 'Recently started medication',
        value: 'Early in a new prescription',
        source: 'journey-context',
        appliedAs: 'Times the message to the early-adjustment window.',
      },
    ],
    script: {
      opening: 'Hi Linda, this is a friendly note about feeling confident with your new medication.',
      fullNarration:
        'Hi Linda, this is a friendly note about feeling confident with your new medication. As a librarian, you are the first person to go look things up — and honestly, that curiosity is a strength. The tricky part is that reading about every possible side effect online can stir up a lot of worry, and you mentioned it sometimes makes you want to just stop. Here is the one thing we really want to land: if something feels strange, the safest and most powerful move is to call your care team before changing anything — not to stop on your own. That is not about taking away your control; it is the opposite. The most in-control thing you can do is bring sharp questions to the people who know your full picture. So channel that research instinct into questions like: what kinds of effects are worth a call, and what would be more routine? How long might it take to settle in? And what is the best way to reach you if I have a concern? We are not interpreting your situation here, Linda — only helping you ask the right people the right things, so you and your husband can feel steady about this.',
      closing:
        'You’ve got great instincts, Linda — point them at your care team, and never go it alone on changes.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'Confidence, not worry',
        narration:
          'Hi Linda, this is a friendly note about feeling confident with your new medication. As a librarian, you are the first person to go look things up — and honestly, that curiosity is a strength.',
        onScreenText: 'Feeling confident with your medication',
        visualType: 'title-card',
        motionDirection: 'Title fades up; a soft book-and-search motif',
        transition: 'Cross-dissolve',
        iconName: 'BookOpen',
        lottieSearchKeyword: 'curiosity research books',
        customAnimationIdea: 'A search bar morphs into a friendly question mark.',
        backgroundStyle: 'Teal gradient, warm light',
        safetyBoundary: 'No interpretation of her medication.',
        personalizationReason: 'Honors Linda’s librarian, research-minded identity.',
        durationSec: 11,
      },
      {
        sceneTitle: 'The online worry spiral',
        narration:
          'The tricky part is that reading about every possible side effect online can stir up a lot of worry, and you mentioned it sometimes makes you want to just stop.',
        onScreenText: 'Online reading can spin up worry',
        visualType: 'quote-card',
        motionDirection: 'A swirl of tabs gently slows and calms',
        transition: 'Slide-left',
        iconName: 'MessageSquare',
        lottieSearchKeyword: 'information overload calm',
        customAnimationIdea: 'Cluttered browser tabs fade to one steady focus point.',
        backgroundStyle: 'Teal with soft slate',
        safetyBoundary: 'Validates worry; no clinical claim.',
        personalizationReason: 'Names Linda’s specific online-research habit.',
        durationSec: 14,
      },
      {
        sceneTitle: 'Call first — never stop alone',
        narration:
          'Here is the one thing we really want to land: if something feels strange, the safest and most powerful move is to call your care team before changing anything — not to stop on your own.',
        onScreenText: 'Call first — don’t stop on your own',
        visualType: 'quote-card',
        motionDirection: 'A “call first” banner anchors center and holds',
        transition: 'Fade',
        iconName: 'Phone',
        lottieSearchKeyword: 'call care team phone',
        customAnimationIdea: 'A phone icon pulses once, steady and reassuring.',
        backgroundStyle: 'Teal with high-contrast banner',
        safetyBoundary: 'Explicit no-medication-changes message.',
        personalizationReason: 'Directly addresses Linda’s temptation to stop.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Control = great questions',
        narration:
          'That is not about taking away your control; it is the opposite. The most in-control thing you can do is bring sharp questions to the people who know your full picture.',
        onScreenText: 'Control = asking the right questions',
        visualType: 'comparison',
        motionDirection: 'Two paths shown: “guess alone” vs “ask the team,” latter glows',
        transition: 'Cross-dissolve',
        iconName: 'ClipboardCheck',
        lottieSearchKeyword: 'choices path question',
        customAnimationIdea: 'A path toward the care team brightens; the solo path dims softly.',
        backgroundStyle: 'Teal, balanced',
        safetyBoundary: 'Reframes agency safely; no advice.',
        personalizationReason: 'Speaks to Linda’s need to feel in control.',
        durationSec: 13,
      },
      {
        sceneTitle: 'Questions to bring',
        narration:
          'So channel that research instinct into questions like: what kinds of effects are worth a call, and what would be more routine? How long might it take to settle in? And what is the best way to reach you if I have a concern?',
        onScreenText: 'Questions to bring to your team',
        visualType: 'question-list',
        motionDirection: 'Three questions type in as a tidy list',
        transition: 'Slide-up',
        iconName: 'ClipboardList',
        lottieSearchKeyword: 'question checklist',
        customAnimationIdea: 'Each question gets a small check as it lands.',
        backgroundStyle: 'Teal with soft accents',
        safetyBoundary: 'Question framing only; no specifics interpreted.',
        personalizationReason: 'Turns her research energy into safe questions.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'We are not interpreting your situation here, Linda — only helping you ask the right people the right things, so you and your husband can feel steady about this. You’ve got great instincts — point them at your care team, and never go it alone on changes. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'Ask first. Feel steady.',
        visualType: 'closing-card',
        motionDirection: 'Soft zoom-out; disclaimer fades in last',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'reassurance steady calm',
        customAnimationIdea: 'The card settles with a calm exhale motion.',
        backgroundStyle: 'Teal gradient, calm',
        safetyBoundary: 'Educational disclaimer present.',
        personalizationReason: 'Closes by reinforcing safe agency for Linda.',
        durationSec: 12,
      },
    ],
    visualAssetPlan: {
      palette: 'Teal with calm slate neutrals',
      keyVisuals: ['Calming tab-swirl', '“Call first” banner', 'Two-path comparison', 'Question list'],
      titleCard: 'Search-to-question morph on teal, confident and warm',
      iconStyle: 'Clean line icons, two-tone teal',
    },
    motionPlan: {
      pacing: 'steady and reassuring',
      signatureTransition: 'Cross-dissolve with a calming settle',
      motionNotes: 'Visuals move from busy to focused, mirroring the message.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hi Linda — a quick guide to asking safe questions about your new medication (and why not to stop on your own): [link]',
      email: {
        subject: 'Feeling confident with your new medication',
        body:
          'Hi Linda,\n\nWe made a short video to help channel your research instincts into safe, specific questions for your care team — and to be clear about one thing: if something feels off, call your team before changing anything, rather than stopping on your own.\n\nWatch here: [link]\n\nNo interpretation of your situation — just help asking the right people the right questions.',
      },
      portal:
        'An education video about questions to ask regarding your new medication is ready. It’s about asking your care team — never changing on your own.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'No clinical determination about Linda.' },
      { label: 'No medication changes', status: 'pass', detail: 'Explicitly directs all changes through the care team.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Offers question framing only.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'No individual side-effect interpretation.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer narrated and shown.' },
      { label: 'Human review required', status: 'pass', detail: 'Reviewed by pharmacy education committee.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not tell Linda to start, stop, or change her medication',
        'Does not interpret her specific side effects',
        'Does not diagnose or predict her response',
        'Does not name doses or schedules',
      ],
      does: [
        'Encourages calling the care team before any change',
        'Validates her worry without inflaming it',
        'Offers safe, general questions to ask',
        'Reframes control as informed questioning',
      ],
      explanation:
        'The asset’s central safety message is to never self-adjust medication. It supports Linda’s desire for understanding by channeling it entirely into care-team conversations.',
    },
    outputs: ['video', 'portal', 'sms', 'email'],
    estimatedRuntimeSec: 82,
  },

  // 6 ─────────────────────────────────────────────────────────────────────
  {
    id: 'lab-result-explanation',
    category: 'Lab Follow-Up',
    title: 'Understanding What Your Blood Test Looks At',
    department: 'Primary Care / Lab Follow-Up',
    summary:
      'Calms David’s portal-panic by explaining what a blood test generally measures — never interpreting his specific result.',
    accent: 'navy',
    patient: {
      name: 'David',
      age: 43,
      pronouns: 'he/him',
      language: 'English',
      healthLiteracy: 'intermediate',
      emotionalState: 'anxious',
      lifeContext: {
        occupation: 'Software engineer',
        livingSituation: 'Lives with his wife and young daughter',
        preferences: ['Wants context before results', 'Logical explanations', 'No surprises'],
        notes:
          'Portal results often arrive before he understands them, and seeing flags makes him jump to the worst conclusion.',
      },
      concerns: [
        {
          quote: "I see a flag or a number and immediately assume the worst.",
          acknowledgedAs:
            'Explaining what tests generally look at and steering interpretation to the care team.',
        },
        {
          quote: "The result lands in my portal before anyone explains it to me.",
          acknowledgedAs:
            'Giving David context ahead of time so the numbers feel less alarming, without interpreting them.',
        },
      ],
      goals: [
        'Understand what the test generally measures',
        'Have questions ready for the care team',
        'Resist spiraling when results appear',
      ],
      barriers: [
        'Anxiety spikes when portal results arrive early',
        'Tendency to catastrophize flags and numbers',
      ],
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'David had routine blood work done and results may appear in his portal.',
      journeyStage: 'Between lab draw and care-team review',
      careTeamContext:
        'The care team will review and discuss results; they want David to have general context but not self-interpret.',
      appointmentHistory: ['Routine lab work ordered', 'Results review to follow with care team'],
    },
    approvedContent: {
      title: 'What a Routine Blood Panel Generally Looks At — Patient Education',
      owner: 'Meridian Primary Care Lab Literacy Group (synthetic)',
      summary:
        'A general, non-interpretive overview of what common blood panels tend to measure and why your care team reviews results with you.',
      version: 'v2.0',
      lastReviewed: '2026-03-30',
    },
    evidenceTheme: {
      theme:
        'Across populations, patients who receive general context before results report less anxiety when portal values appear.',
      educationalRelevance:
        'Supports pre-result context — never interpretation of David’s individual values.',
      provenance:
        'Truveta-style de-identified patient-experience themes, summarized for education.',
    },
    personalizationSignals: [
      {
        label: 'Portal-result anxiety',
        value: 'Results arrive before he understands them',
        source: 'patient-provided',
        appliedAs: 'Delivers general context ahead of any value interpretation.',
      },
      {
        label: 'Catastrophizes flags',
        value: 'Assumes the worst from numbers and flags',
        source: 'patient-provided',
        appliedAs: 'Explains that flags are prompts for a conversation, not verdicts.',
      },
      {
        label: 'Logical, context-first thinker',
        value: 'Engineer who wants the “why” first',
        source: 'patient-provided',
        appliedAs: 'Uses clear, systematic explanation of what tests look at.',
      },
      {
        label: 'Routine labs ordered',
        value: 'Standard panel; review to follow',
        source: 'journey-context',
        appliedAs: 'Times the education to the pre-review window.',
      },
    ],
    script: {
      opening: 'Hi David, this is a little context to have in your pocket before any results show up.',
      fullNarration:
        'Hi David, this is a little context to have in your pocket before any results show up. You have told us that when a number or a flag lands in the portal, your mind jumps straight to the worst case — and as an engineer, we figure you would rather understand the system before the output. So here is the general idea, without touching your specific results at all. A routine blood panel is basically a broad look at several everyday markers — things related to how your body is generally doing. On its own, a single number rarely tells a story; clinicians read results together, alongside your history and how you are feeling. That is exactly why a flag is not a verdict — it is a prompt for a conversation, not a conclusion you are meant to draw alone at midnight. We are deliberately not interpreting anything here, David. Instead, here are questions to keep ready: what does this panel generally look at, what should I make of any flags, and what are the next steps? Think of this as the manual before the readout — so when results appear, you have calm context, and you and your wife are not guessing in the dark.',
      closing:
        'Take a breath when results land, David — let your care team read them with you, and bring your questions.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'Context in your pocket',
        narration:
          'Hi David, this is a little context to have in your pocket before any results show up. You have told us that when a number or a flag lands in the portal, your mind jumps straight to the worst case.',
        onScreenText: 'Context before the results',
        visualType: 'title-card',
        motionDirection: 'Title fades up; a calm portal motif appears',
        transition: 'Cross-dissolve',
        iconName: 'FileText',
        lottieSearchKeyword: 'calm health portal',
        customAnimationIdea: 'A portal notification appears, then softens from red to neutral.',
        backgroundStyle: 'Navy gradient, calm light',
        safetyBoundary: 'No interpretation of any result.',
        personalizationReason: 'Names David’s portal-panic pattern directly.',
        durationSec: 12,
      },
      {
        sceneTitle: 'Understand the system first',
        narration:
          'And as an engineer, we figure you would rather understand the system before the output. So here is the general idea, without touching your specific results at all.',
        onScreenText: 'Understand the system, not your numbers',
        visualType: 'source-panel',
        motionDirection: 'A “general info only” badge appears clearly',
        transition: 'Slide-left',
        iconName: 'ClipboardList',
        lottieSearchKeyword: 'general information badge',
        customAnimationIdea: 'A “no specific results” badge pins to the corner and stays.',
        backgroundStyle: 'Navy with neutral panel',
        safetyBoundary: 'Source transparency; explicitly non-interpretive.',
        personalizationReason: 'Matches David’s systems-first engineering mindset.',
        durationSec: 13,
      },
      {
        sceneTitle: 'What a panel generally looks at',
        narration:
          'A routine blood panel is basically a broad look at several everyday markers — things related to how your body is generally doing. On its own, a single number rarely tells a story; clinicians read results together, alongside your history and how you are feeling.',
        onScreenText: 'A broad look — read together',
        visualType: 'lab-card',
        motionDirection: 'A generic lab card shows blurred placeholder rows, never real values',
        transition: 'Fade',
        iconName: 'FlaskConical',
        lottieSearchKeyword: 'blood test lab panel',
        customAnimationIdea: 'A lab card with intentionally blurred, non-readable sample rows.',
        backgroundStyle: 'Navy with soft blue card',
        safetyBoundary: 'Shows a generic card only; no real values shown or interpreted.',
        personalizationReason: 'Gives David the systematic “what it measures” he wants.',
        durationSec: 16,
      },
      {
        sceneTitle: 'A flag is not a verdict',
        narration:
          'That is exactly why a flag is not a verdict — it is a prompt for a conversation, not a conclusion you are meant to draw alone at midnight.',
        onScreenText: 'A flag is a prompt, not a verdict',
        visualType: 'quote-card',
        motionDirection: 'A flag icon gently turns into a speech bubble',
        transition: 'Cross-dissolve',
        iconName: 'MessageSquare',
        lottieSearchKeyword: 'flag to conversation',
        customAnimationIdea: 'An alarming flag morphs into a calm conversation bubble.',
        backgroundStyle: 'Navy with warm accent',
        safetyBoundary: 'No interpretation; reframes flags neutrally.',
        personalizationReason: 'Targets David’s tendency to catastrophize flags.',
        durationSec: 13,
      },
      {
        sceneTitle: 'Questions to keep ready',
        narration:
          'We are deliberately not interpreting anything here, David. Instead, here are questions to keep ready: what does this panel generally look at, what should I make of any flags, and what are the next steps?',
        onScreenText: 'Questions to keep ready',
        visualType: 'question-list',
        motionDirection: 'Three questions type in calmly',
        transition: 'Slide-up',
        iconName: 'ClipboardCheck',
        lottieSearchKeyword: 'question list calm',
        customAnimationIdea: 'Questions appear with soft checkmarks, no values attached.',
        backgroundStyle: 'Navy with soft accents',
        safetyBoundary: 'Question framing only; defers interpretation to care team.',
        personalizationReason: 'Equips David to engage instead of spiral.',
        durationSec: 14,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'Think of this as the manual before the readout — so when results appear, you have calm context, and you and your wife are not guessing in the dark. Take a breath when results land, David — let your care team read them with you, and bring your questions. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'Calm context, then a conversation',
        visualType: 'closing-card',
        motionDirection: 'Gentle zoom-out; disclaimer eases in last',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'calm breath reassurance',
        customAnimationIdea: 'The card settles slowly like a steadying breath.',
        backgroundStyle: 'Navy gradient, calm',
        safetyBoundary: 'Educational disclaimer present.',
        personalizationReason: 'Reassures David and includes his wife.',
        durationSec: 12,
      },
    ],
    visualAssetPlan: {
      palette: 'Navy with calm blue accents',
      keyVisuals: ['Softening portal alert', 'Generic blurred lab card', 'Flag-to-bubble morph', 'Question list'],
      titleCard: 'Calm portal motif on navy, steady typography',
      iconStyle: 'Precise, clean line icons',
    },
    motionPlan: {
      pacing: 'calm and methodical',
      signatureTransition: 'Cross-dissolve with a steady settle',
      motionNotes: 'Motion reduces visual alarm; no red emphasis or urgency.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hi David — quick context on what a blood panel generally looks at, before any results land. No interpretation, just calm: [link]',
      email: {
        subject: 'What your blood test generally looks at',
        body:
          'Hi David,\n\nBefore any results appear in your portal, here’s a short video explaining, in general terms, what a routine blood panel looks at and why your care team reviews results with you.\n\nWatch here: [link]\n\nIt does not interpret your specific results — it just gives you calm context and a few good questions to bring.',
      },
      portal:
        'An education video explaining what your blood test generally looks at is ready. It’s general context only — your care team will review your specific results with you.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'Never interprets David’s values; general context only.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'No prediction or individual interpretation.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Offers questions, not guidance.' },
      { label: 'Source transparency', status: 'pass', detail: 'Built from approved lab-literacy content v2.0.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer narrated and shown.' },
      { label: 'Human review required', status: 'pass', detail: 'Reviewed by lab literacy group before send.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not interpret David’s specific results',
        'Does not show or react to his real values',
        'Does not predict what a flag means for him',
        'Does not diagnose anything',
      ],
      does: [
        'Explains what a panel generally measures',
        'Reframes flags as conversation prompts',
        'Reduces portal-result anxiety with context',
        'Offers questions to bring to the care team',
      ],
      explanation:
        'This is pure lab-literacy education delivered before results land. It is rigorously non-interpretive — all reading of David’s actual values stays with his care team.',
    },
    outputs: ['video', 'portal', 'sms', 'email'],
    estimatedRuntimeSec: 80,
  },

  // 7 ─────────────────────────────────────────────────────────────────────
  {
    id: 'prenatal-visit-prep',
    category: 'Maternal Health',
    title: 'Preparing for Your Upcoming Prenatal Visit',
    department: 'Maternal Health / OB-GYN',
    summary:
      'Helps Amina and her partner walk into her prenatal visit organized, with her notes-app questions ready to go.',
    accent: 'blue',
    patient: {
      name: 'Amina',
      age: 31,
      pronouns: 'she/her',
      language: 'English',
      healthLiteracy: 'intermediate',
      emotionalState: 'hopeful',
      lifeContext: {
        occupation: 'Graphic designer',
        livingSituation: 'Lives with her partner, Yusuf',
        familyHistoryMentioned: 'First pregnancy',
        preferences: ['Organized', 'Partner involved', 'Keeps a notes app'],
        notes:
          'First pregnancy. Keeps a running notes app of questions and worries she will forget them in the moment.',
      },
      concerns: [
        {
          quote: "I’m scared I’ll blank and forget my questions during the visit.",
          acknowledgedAs:
            'Helping her organize and bring her notes-app questions so nothing gets lost.',
        },
        {
          quote: "I want Yusuf to feel part of this, not just sitting there.",
          acknowledgedAs:
            'Designing prep that invites her partner into the visit topics.',
        },
      ],
      goals: [
        'Prepare for common prenatal visit topics',
        'Organize her questions so none get forgotten',
        'Include her partner in the preparation',
      ],
      barriers: [
        'First-time nerves about forgetting things',
        'Wants partner meaningfully involved',
      ],
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'Amina has an upcoming prenatal visit and is preparing for it.',
      journeyStage: 'Pre-visit preparation (early pregnancy)',
      careTeamContext:
        'The care team wants Amina to feel prepared and to bring her questions; common topics are previewed generally.',
      appointmentHistory: ['Initial prenatal intake', 'Routine prenatal visit upcoming'],
    },
    approvedContent: {
      title: 'Preparing for a Prenatal Visit — Patient Education',
      owner: 'Meridian Maternal Health Patient Education Council (synthetic)',
      summary:
        'A general overview of common prenatal visit topics and how to organize your own questions to bring along.',
      version: 'v2.4',
      lastReviewed: '2026-04-08',
    },
    evidenceTheme: {
      theme:
        'Across populations, expectant patients who prepare questions in advance report more satisfying prenatal visits.',
      educationalRelevance:
        'Supports organized preparation — not any assessment of Amina’s pregnancy.',
      provenance:
        'Truveta-style de-identified maternal-experience themes, summarized for education.',
    },
    personalizationSignals: [
      {
        label: 'Keeps a notes app',
        value: 'Logs questions and worries in a notes app',
        source: 'patient-provided',
        appliedAs: 'Structures prep around bringing her own notes-app list.',
      },
      {
        label: 'Fear of forgetting',
        value: 'Worried she will blank during the visit',
        source: 'patient-provided',
        appliedAs: 'Builds an organized, bring-this-list format.',
      },
      {
        label: 'Partner involvement',
        value: 'Wants Yusuf to be part of it',
        source: 'patient-provided',
        appliedAs: 'Invites the partner into the visit topics.',
      },
      {
        label: 'First pregnancy',
        value: 'First-time expectant parent',
        source: 'journey-context',
        appliedAs: 'Keeps topics welcoming and orienting for newcomers.',
      },
    ],
    script: {
      opening: 'Hi Amina, congratulations — let’s get you and Yusuf ready for your prenatal visit.',
      fullNarration:
        'Hi Amina, congratulations — let’s get you and Yusuf ready for your prenatal visit. Since this is your first pregnancy, it is completely normal to feel both excited and a little unsure about what the visits even cover. You mentioned you keep a notes app full of questions, and you are worried you will blank in the moment and forget them — so let us make sure your list comes with you and actually gets asked. Prenatal visits commonly cover things like how you have been feeling, routine checks, what to expect between now and your next appointment, and any questions on your mind. There are no silly questions here, so anything in that notes app is fair game. Because you want Yusuf to be part of this and not just along for the ride, here is a nice idea: have him pick a question or two to ask himself, so it feels shared. Nothing here is about assessing your pregnancy — it is simply about walking in organized, calm, and together. Bring your notes app, take a breath, and let it be your visit.',
      closing:
        'You’ve got this, Amina — bring your list, bring Yusuf, and ask everything you’ve been wondering.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'Congratulations & welcome',
        narration:
          'Hi Amina, congratulations — let’s get you and Yusuf ready for your prenatal visit. Since this is your first pregnancy, it is completely normal to feel both excited and a little unsure about what the visits even cover.',
        onScreenText: 'Getting ready for your visit',
        visualType: 'title-card',
        motionDirection: 'Warm title fades up with a gentle bloom motif',
        transition: 'Cross-dissolve',
        iconName: 'Baby',
        lottieSearchKeyword: 'pregnancy welcome warm',
        customAnimationIdea: 'A soft heart and small bloom animate in together.',
        backgroundStyle: 'Soft blue gradient, warm light',
        safetyBoundary: 'No clinical assessment of the pregnancy.',
        personalizationReason: 'Welcomes a first-time, hopeful expectant parent.',
        durationSec: 12,
      },
      {
        sceneTitle: 'Your notes app comes with you',
        narration:
          'You mentioned you keep a notes app full of questions, and you are worried you will blank in the moment and forget them — so let us make sure your list comes with you and actually gets asked.',
        onScreenText: 'Bring your notes-app questions',
        visualType: 'question-list',
        motionDirection: 'A phone notes app slides in; items check off as “asked”',
        transition: 'Slide-left',
        iconName: 'ClipboardList',
        lottieSearchKeyword: 'notes app checklist phone',
        customAnimationIdea: 'A phone notes list animates each item being “brought to the visit.”',
        backgroundStyle: 'Blue with soft device mockup',
        safetyBoundary: 'Organizational help only; no advice.',
        personalizationReason: 'Built directly around Amina’s notes-app habit and fear of forgetting.',
        durationSec: 15,
      },
      {
        sceneTitle: 'What visits commonly cover',
        narration:
          'Prenatal visits commonly cover things like how you have been feeling, routine checks, what to expect between now and your next appointment, and any questions on your mind.',
        onScreenText: 'What visits often cover',
        visualType: 'icon-grid',
        motionDirection: 'Four gentle topic tiles fade in',
        transition: 'Fade',
        iconName: 'Stethoscope',
        lottieSearchKeyword: 'prenatal checkup topics',
        customAnimationIdea: 'Soft tiles lift in one by one, calm and welcoming.',
        backgroundStyle: 'Blue with pastel tiles',
        safetyBoundary: 'General topics only; nothing patient-specific.',
        personalizationReason: 'Orients a first-time parent to expect, not worry.',
        durationSec: 14,
      },
      {
        sceneTitle: 'No silly questions',
        narration:
          'There are no silly questions here, so anything in that notes app is fair game.',
        onScreenText: 'No question is too small',
        visualType: 'quote-card',
        motionDirection: 'A reassuring quote card scales gently into view',
        transition: 'Cross-dissolve',
        iconName: 'MessageSquare',
        lottieSearchKeyword: 'open questions welcome',
        customAnimationIdea: 'Question marks gently float up, friendly not chaotic.',
        backgroundStyle: 'Blue with warm accent',
        safetyBoundary: 'Encourages questions; no advice.',
        personalizationReason: 'Eases Amina’s first-time nerves.',
        durationSec: 10,
      },
      {
        sceneTitle: 'Bring Yusuf in',
        narration:
          'Because you want Yusuf to be part of this and not just along for the ride, here is a nice idea: have him pick a question or two to ask himself, so it feels shared.',
        onScreenText: 'Make it a shared visit',
        visualType: 'caregiver-card',
        motionDirection: 'Two figures appear; a question passes warmly between them',
        transition: 'Slide-up',
        iconName: 'Users',
        lottieSearchKeyword: 'partner involvement together',
        customAnimationIdea: 'A question card hands off between two figures.',
        backgroundStyle: 'Warm blue, homey light',
        safetyBoundary: 'Supports partner involvement; no advice.',
        personalizationReason: 'Reflects Amina’s wish to involve Yusuf.',
        durationSec: 13,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'Nothing here is about assessing your pregnancy — it is simply about walking in organized, calm, and together. You’ve got this, Amina — bring your list, bring Yusuf, and ask everything you’ve been wondering. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'Organized. Calm. Together.',
        visualType: 'closing-card',
        motionDirection: 'Gentle zoom-out; disclaimer fades in last',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'warm reassurance close',
        customAnimationIdea: 'The card settles with a soft, hopeful glow.',
        backgroundStyle: 'Blue gradient, warm',
        safetyBoundary: 'Educational disclaimer present.',
        personalizationReason: 'Closes warmly, including her partner.',
        durationSec: 12,
      },
    ],
    visualAssetPlan: {
      palette: 'Soft blue with warm pastel accents',
      keyVisuals: ['Notes-app checklist', 'Visit topic tiles', 'Shared-question handoff', 'Bloom title motif'],
      titleCard: 'Gentle bloom motif on soft blue, hopeful typography',
      iconStyle: 'Rounded, friendly line icons',
    },
    motionPlan: {
      pacing: 'warm and gentle',
      signatureTransition: 'Cross-dissolve with a soft bloom',
      motionNotes: 'Light, hopeful motion; nothing clinical or tense.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hi Amina — a sweet little prep guide so your notes-app questions come with you (and Yusuf too): [link]',
      email: {
        subject: 'Getting ready for your prenatal visit',
        body:
          'Hi Amina,\n\nCongratulations! We made a short, warm video to help you prepare for your prenatal visit — bringing your notes-app questions, previewing the topics that usually come up, and a nice way to involve Yusuf.\n\nWatch here: [link]\n\nIt doesn’t assess anything about your pregnancy — it just helps you walk in organized and together.',
      },
      portal:
        'A preparation video for your upcoming prenatal visit is ready. It helps you organize your questions and bring your partner into the visit.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'No assessment of the pregnancy; preparation only.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Previews topics; recommends nothing.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'No individual risk or prediction language.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer narrated and shown.' },
      { label: 'Approved content only', status: 'pass', detail: 'Built from approved prenatal prep content v2.4.' },
      { label: 'Human review required', status: 'pass', detail: 'Reviewed by maternal health education council.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not assess or comment on Amina’s pregnancy',
        'Does not give clinical guidance',
        'Does not predict outcomes',
        'Does not replace her visit',
      ],
      does: [
        'Helps her organize her own questions',
        'Previews common visit topics generally',
        'Invites her partner into the visit',
        'Eases first-time nerves',
      ],
      explanation:
        'This is preparation and organization support only. It helps Amina bring her questions and include Yusuf, while leaving all clinical content to her prenatal visit.',
    },
    outputs: ['video', 'portal', 'sms', 'email'],
    estimatedRuntimeSec: 76,
  },

  // 8 ─────────────────────────────────────────────────────────────────────
  {
    id: 'language-access',
    category: 'Language Access',
    title: 'Preparándose para su seguimiento de presión arterial',
    department: 'Primary Care / Health Equity',
    summary:
      'Educación clara en español para Carlos antes de su seguimiento, con subtítulos simples y un resumen para su hijo.',
    accent: 'slate',
    patient: {
      name: 'Carlos',
      age: 55,
      pronouns: 'he/him',
      language: 'Spanish + simple captions',
      healthLiteracy: 'basic',
      emotionalState: 'reassured-seeking',
      lifeContext: {
        occupation: 'Cocinero en un restaurante',
        livingSituation: 'Vive con su familia; su hijo a veces traduce',
        preferences: ['Español sencillo', 'Explicaciones directas', 'Subtítulos claros'],
        notes:
          'A menudo sale de las citas sin estar seguro de lo que pasó. Su hijo ayuda a traducir cuando puede.',
      },
      concerns: [
        {
          quote: "Muchas veces salgo de la cita sin entender qué pasó.",
          acknowledgedAs:
            'Explicar en español sencillo qué suele cubrir el seguimiento y qué preguntas llevar.',
        },
        {
          quote: "No siempre tengo a mi hijo para traducir.",
          acknowledgedAs:
            'Ofrecer la educación directamente en español, con un resumen que su hijo pueda revisar.',
        },
      ],
      goals: [
        'Entender de qué se trata el seguimiento',
        'Llevar preguntas claras a la cita',
        'Tener un resumen sencillo para su hijo',
      ],
      barriers: [
        'Las citas suelen ser en inglés',
        'No siempre cuenta con alguien que traduzca',
      ],
      caregiver: {
        name: 'Diego',
        relationship: 'Hijo',
        involvement: 'Ayuda a Carlos a entender y a veces traduce en las citas.',
      },
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'Carlos tiene un seguimiento de presión arterial próximamente.',
      journeyStage: 'Preparación antes de la cita',
      careTeamContext:
        'El equipo de atención quiere que Carlos entienda el seguimiento y se sienta cómodo haciendo preguntas en español.',
      appointmentHistory: ['Cita de presión arterial anterior', 'Seguimiento programado'],
    },
    approvedContent: {
      title: 'Preparación para un seguimiento de presión arterial — Educación del paciente',
      owner: 'Consejo de Equidad en Salud de Meridian (sintético)',
      summary:
        'Explicación sencilla en español de lo que suele incluir un seguimiento de presión arterial y qué preguntas llevar.',
      version: 'v2.2',
      lastReviewed: '2026-04-11',
    },
    evidenceTheme: {
      theme:
        'En poblaciones reales, la educación en el idioma preferido del paciente se asocia con una mejor comprensión de las citas.',
      educationalRelevance:
        'Apoya la educación en español sencillo — nunca una evaluación individual de Carlos.',
      provenance:
        'Tendencias poblacionales de-identificadas tipo Truveta, resumidas para educación.',
    },
    personalizationSignals: [
      {
        label: 'Prefiere español sencillo',
        value: 'Quiere explicaciones directas en español',
        source: 'patient-provided',
        appliedAs: 'Toda la narración y los subtítulos están en español claro.',
      },
      {
        label: 'A veces su hijo traduce',
        value: 'Diego ayuda a traducir cuando puede',
        source: 'patient-provided',
        appliedAs: 'Se incluye un resumen para que Diego lo revise.',
      },
      {
        label: 'Sale de citas sin entender',
        value: 'A menudo se va con dudas',
        source: 'patient-provided',
        appliedAs: 'Se anticipa la información antes de la cita.',
      },
      {
        label: 'Seguimiento de presión arterial',
        value: 'Cita de seguimiento próxima',
        source: 'journey-context',
        appliedAs: 'Se ajusta el contenido a este tipo de cita.',
      },
    ],
    script: {
      opening: 'Hola Carlos, este es un mensaje breve y amable para ayudarle a prepararse para su seguimiento.',
      fullNarration:
        'Hola Carlos, este es un mensaje breve y amable para ayudarle a prepararse para su seguimiento de presión arterial. Sabemos que a veces sale de las citas sin estar seguro de lo que pasó, y queremos que esta vez sea diferente. Como trabaja largas horas en la cocina del restaurante, hicimos esto corto, directo y en español, para que lo pueda ver con calma. Primero, lo importante: un seguimiento como este suele ser una conversación tranquila para ver cómo ha estado y qué preguntas tiene. No es un examen para ver si hizo algo mal. Aquí hay buenas preguntas que puede llevar: qué cubre esta cita, qué cosas conviene revisar, y a quién puedo llamar si tengo dudas después. Como su hijo Diego a veces le ayuda a traducir y no siempre puede estar, también preparamos un resumen sencillo para que Diego lo pueda leer con usted. Aquí no estamos evaluando su salud, Carlos — solo queremos que llegue tranquilo, que entienda de qué se trata, y que se sienta con la confianza de preguntar lo que quiera.',
      closing:
        'Tómese su tiempo, Carlos — lleve sus preguntas, y su equipo de atención estará con gusto para ayudarle.',
      disclaimer: 'Este video es educativo y no reemplaza el consejo médico de su equipo de atención.',
    },
    storyboard: [
      {
        sceneTitle: 'Bienvenida cálida',
        narration:
          'Hola Carlos, este es un mensaje breve y amable para ayudarle a prepararse para su seguimiento de presión arterial.',
        onScreenText: 'Preparándose para su cita',
        visualType: 'title-card',
        motionDirection: 'El título aparece suavemente con un fondo cálido',
        transition: 'Cross-dissolve',
        iconName: 'Languages',
        lottieSearchKeyword: 'bienvenida calida salud',
        customAnimationIdea: 'Una tarjeta de bienvenida en español aparece con calma.',
        backgroundStyle: 'Degradado slate con luz cálida',
        safetyBoundary: 'Sin diagnóstico; solo educación.',
        personalizationReason: 'Habla a Carlos directamente en su idioma preferido.',
        durationSec: 11,
      },
      {
        sceneTitle: 'Para que esta vez sea diferente',
        narration:
          'Sabemos que a veces sale de las citas sin estar seguro de lo que pasó, y queremos que esta vez sea diferente. Como trabaja largas horas en la cocina del restaurante, hicimos esto corto, directo y en español, para que lo pueda ver con calma.',
        onScreenText: 'Corto, directo y en español',
        visualType: 'quote-card',
        motionDirection: 'Un reloj de cocina se calma y aparece una tarjeta clara',
        transition: 'Slide-left',
        iconName: 'Clock',
        lottieSearchKeyword: 'tiempo trabajo calma',
        customAnimationIdea: 'Un entorno de cocina ocupado se aquieta hacia un momento de calma.',
        backgroundStyle: 'Slate con acento cálido',
        safetyBoundary: 'Respeta el horario; sin consejo clínico.',
        personalizationReason: 'Refleja el horario de Carlos como cocinero.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Qué es un seguimiento',
        narration:
          'Primero, lo importante: un seguimiento como este suele ser una conversación tranquila para ver cómo ha estado y qué preguntas tiene. No es un examen para ver si hizo algo mal.',
        onScreenText: 'Es una conversación, no un examen',
        visualType: 'icon-grid',
        motionDirection: 'Aparecen íconos suaves de conversación',
        transition: 'Fade',
        iconName: 'Stethoscope',
        lottieSearchKeyword: 'conversacion cita medica',
        customAnimationIdea: 'Dos burbujas de conversación se encuentran amablemente.',
        backgroundStyle: 'Slate con mosaicos azules suaves',
        safetyBoundary: 'Describe la cita en general; nada individual.',
        personalizationReason: 'Calma el temor de Carlos a ser juzgado.',
        durationSec: 14,
      },
      {
        sceneTitle: 'Preguntas para llevar',
        narration:
          'Aquí hay buenas preguntas que puede llevar: qué cubre esta cita, qué cosas conviene revisar, y a quién puedo llamar si tengo dudas después.',
        onScreenText: 'Preguntas para llevar',
        visualType: 'question-list',
        motionDirection: 'Tres preguntas aparecen una por una',
        transition: 'Slide-up',
        iconName: 'ClipboardList',
        lottieSearchKeyword: 'lista de preguntas',
        customAnimationIdea: 'Cada pregunta se subraya suavemente al aparecer.',
        backgroundStyle: 'Slate con acentos suaves',
        safetyBoundary: 'Solo preguntas; sin interpretación.',
        personalizationReason: 'Da a Carlos un punto de partida claro.',
        durationSec: 15,
      },
      {
        sceneTitle: 'Un resumen para Diego',
        narration:
          'Como su hijo Diego a veces le ayuda a traducir y no siempre puede estar, también preparamos un resumen sencillo para que Diego lo pueda leer con usted.',
        onScreenText: 'Un resumen para su hijo Diego',
        visualType: 'caregiver-card',
        motionDirection: 'Aparece una tarjeta de resumen junto a dos figuras',
        transition: 'Cross-dissolve',
        iconName: 'Users',
        lottieSearchKeyword: 'familia resumen juntos',
        customAnimationIdea: 'Una tarjeta de resumen pasa amablemente entre dos personas.',
        backgroundStyle: 'Slate cálido, luz hogareña',
        safetyBoundary: 'Apoya a la familia; sin consejo.',
        personalizationReason: 'Refleja que Diego ayuda a traducir.',
        durationSec: 12,
      },
      {
        sceneTitle: 'Cierre cálido',
        narration:
          'Aquí no estamos evaluando su salud, Carlos — solo queremos que llegue tranquilo, que entienda de qué se trata, y que se sienta con la confianza de preguntar lo que quiera. Tómese su tiempo, lleve sus preguntas, y su equipo de atención estará con gusto para ayudarle. Este video es educativo y no reemplaza el consejo médico de su equipo de atención.',
        onScreenText: 'Llegue tranquilo y con confianza',
        visualType: 'closing-card',
        motionDirection: 'Alejamiento suave; el aviso aparece al final',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'calma tranquilidad cierre',
        customAnimationIdea: 'La tarjeta se asienta suavemente, como un respiro.',
        backgroundStyle: 'Degradado slate, tranquilo',
        safetyBoundary: 'Aviso educativo presente en español.',
        personalizationReason: 'Cierra con calma y respeto en su idioma.',
        durationSec: 12,
      },
    ],
    visualAssetPlan: {
      palette: 'Slate con acentos cálidos',
      keyVisuals: ['Tarjeta de bienvenida en español', 'Cocina que se aquieta', 'Lista de preguntas', 'Tarjeta de resumen para Diego'],
      titleCard: 'Tarjeta cálida en slate, tipografía clara y legible',
      iconStyle: 'Íconos de línea redondeados y de alta legibilidad',
    },
    motionPlan: {
      pacing: 'calmado y claro',
      signatureTransition: 'Cross-dissolve con un asentamiento suave',
      motionNotes: 'Movimiento tranquilo; subtítulos grandes y legibles.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hola Carlos — un video corto en español para prepararse para su cita, con preguntas para llevar. Véalo aquí: [link]',
      email: {
        subject: 'Preparándose para su seguimiento de presión arterial',
        body:
          'Hola Carlos,\n\nPreparamos un video corto en español para ayudarle a prepararse para su seguimiento: de qué se trata la cita, preguntas que puede llevar, y a quién llamar si tiene dudas. También incluimos un resumen sencillo para que Diego lo lea con usted.\n\nVéalo aquí: [link]\n\nNo evalúa su salud — solo le ayuda a llegar tranquilo y con confianza.',
      },
      portal:
        'Un video educativo en español para su seguimiento de presión arterial está listo. Le ayuda a prepararse y a llevar sus preguntas.',
      caregiverSummary:
        'Para Diego: Este video en español sencillo explica de qué se trata el seguimiento de presión arterial de tu papá y qué preguntas puede llevar. No da consejo médico ni evalúa su salud. Revísalo con él y lleven sus dudas al equipo de atención.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'Solo educación general; sin evaluación de Carlos.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Ofrece preguntas, no recomendaciones.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'Sin predicción ni riesgo individual.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Aviso educativo en español, narrado y mostrado.' },
      { label: 'Approved content only', status: 'pass', detail: 'Basado en contenido aprobado v2.2.' },
      { label: 'Human review required', status: 'pass', detail: 'Revisado por el consejo de equidad en salud.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'No evalúa la presión arterial de Carlos',
        'No da consejo clínico',
        'No predice resultados',
        'No reemplaza su cita',
      ],
      does: [
        'Explica el seguimiento en español sencillo',
        'Ofrece preguntas para llevar',
        'Incluye un resumen para su hijo',
        'Reduce la confusión antes de la cita',
      ],
      explanation:
        'Es educación en el idioma preferido de Carlos, diseñada para mejorar la comprensión y la equidad. No interpreta su salud ni reemplaza la conversación con su equipo de atención.',
    },
    outputs: ['video', 'portal', 'sms', 'email', 'caregiver-summary'],
    estimatedRuntimeSec: 80,
  },

  // 9 ─────────────────────────────────────────────────────────────────────
  {
    id: 'procedure-prep',
    category: 'Procedure Preparation',
    title: 'Preparing for Your Upcoming Colonoscopy',
    department: 'Gastroenterology',
    summary:
      'Walks Elaine through the general prep flow from her approved instructions so she can plan rides and timing with confidence.',
    accent: 'teal',
    patient: {
      name: 'Elaine',
      age: 58,
      pronouns: 'she/her',
      language: 'English',
      healthLiteracy: 'intermediate',
      emotionalState: 'overwhelmed',
      lifeContext: {
        occupation: 'Office administrator',
        livingSituation: 'Lives with and cares for her elderly mother',
        preferences: ['Plan ahead', 'Checklists', 'Logistics clarity'],
        notes:
          'Caring for her mother means she has to plan transportation and timing carefully; afraid of missing a prep step.',
      },
      concerns: [
        {
          quote: "I’m terrified I’ll mess up the prep or forget a step.",
          acknowledgedAs:
            'Laying out the general prep flow from her approved instructions and what to confirm with the team.',
        },
        {
          quote: "I care for my mom — I have to line up a ride and the timing just right.",
          acknowledgedAs:
            'Highlighting the planning and transportation pieces so she can coordinate ahead.',
        },
      ],
      goals: [
        'Understand the general preparation flow',
        'Know what to confirm with the care team',
        'Plan transportation and timing around caregiving',
      ],
      barriers: [
        'Caregiving for her mother complicates scheduling',
        'Fear of missing a preparation step',
      ],
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'Elaine has a colonoscopy scheduled and received preparation instructions.',
      journeyStage: 'Pre-procedure preparation',
      careTeamContext:
        'The care team wants Elaine to understand the general approved prep flow and confirm specifics with them.',
      appointmentHistory: ['Colonoscopy scheduled', 'Prep instructions provided'],
    },
    approvedContent: {
      title: 'Colonoscopy Preparation — Approved Patient Instructions',
      owner: 'Meridian Gastroenterology Patient Education Team (synthetic)',
      summary:
        'The approved general preparation flow for a colonoscopy, including planning, what to confirm with the care team, and logistics like transportation.',
      version: 'v3.1',
      lastReviewed: '2026-04-07',
    },
    evidenceTheme: {
      theme:
        'Across populations, clearer procedure-prep communication is associated with fewer prep-related reschedules.',
      educationalRelevance:
        'Motivates a clear restatement of approved prep steps — not personalized clinical instructions.',
      provenance:
        'Truveta-style de-identified procedure-prep themes, summarized for education.',
    },
    personalizationSignals: [
      {
        label: 'Caregiver for her mother',
        value: 'Must coordinate timing around caregiving',
        source: 'patient-provided',
        appliedAs: 'Emphasizes planning and transportation steps early.',
      },
      {
        label: 'Fear of missing a step',
        value: 'Worried she will forget part of the prep',
        source: 'patient-provided',
        appliedAs: 'Presents prep as a clear, ordered checklist flow.',
      },
      {
        label: 'Likes checklists',
        value: 'Plans ahead, prefers structure',
        source: 'patient-provided',
        appliedAs: 'Uses a checklist visual format throughout.',
      },
      {
        label: 'Approved prep instructions',
        value: 'Elaine’s approved colonoscopy prep document',
        source: 'approved-content',
        appliedAs: 'All steps restated only from approved instructions.',
      },
    ],
    script: {
      opening: 'Hi Elaine, let’s make your colonoscopy prep feel manageable and well-planned.',
      fullNarration:
        'Hi Elaine, let’s make your colonoscopy prep feel manageable and well-planned. We know you are caring for your mother, so timing and transportation are not small details for you — they are the whole puzzle. So let us start with the planning piece, because getting that lined up early takes a lot of pressure off. Based on your approved prep instructions, here is the general flow: there are a few preparation steps in the days leading up, a transportation arrangement to plan since you will likely need a ride, and timing to coordinate so it fits around your caregiving. You told us you are terrified of missing a step, which is completely understandable — so think of this as a checklist you can follow, and anything that feels unclear is exactly what you confirm with your care team. We are not giving you new instructions here, Elaine; this is your own approved prep, organized so nothing slips. Lock in your ride, mark your dates, and keep your team’s number close for anything you want to double-check.',
      closing:
        'You’re a wonderful planner, Elaine — get the logistics set early, and confirm the rest with your team.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'Manageable and planned',
        narration:
          'Hi Elaine, let’s make your colonoscopy prep feel manageable and well-planned. We know you are caring for your mother, so timing and transportation are not small details for you — they are the whole puzzle.',
        onScreenText: 'Your prep, made manageable',
        visualType: 'title-card',
        motionDirection: 'Title fades up over a calm checklist motif',
        transition: 'Cross-dissolve',
        iconName: 'ClipboardCheck',
        lottieSearchKeyword: 'checklist plan ahead',
        customAnimationIdea: 'A scattered to-do list organizes itself into a clean checklist.',
        backgroundStyle: 'Teal gradient, calm light',
        safetyBoundary: 'Restates approved prep only.',
        personalizationReason: 'Names Elaine’s caregiving and logistics burden.',
        durationSec: 13,
      },
      {
        sceneTitle: 'Start with planning',
        narration:
          'So let us start with the planning piece, because getting that lined up early takes a lot of pressure off.',
        onScreenText: 'Start with the planning',
        visualType: 'journey-timeline',
        motionDirection: 'A “days before” timeline draws in, planning step first',
        transition: 'Slide-left',
        iconName: 'CalendarClock',
        lottieSearchKeyword: 'plan timeline days before',
        customAnimationIdea: 'A countdown timeline highlights the earliest planning step.',
        backgroundStyle: 'Teal with one accent line',
        safetyBoundary: 'General flow only; specifics deferred to team.',
        personalizationReason: 'Prioritizes the planning Elaine needs most.',
        durationSec: 13,
      },
      {
        sceneTitle: 'The general prep flow',
        narration:
          'Based on your approved prep instructions, here is the general flow: there are a few preparation steps in the days leading up, a transportation arrangement to plan since you will likely need a ride, and timing to coordinate so it fits around your caregiving.',
        onScreenText: 'Prep • ride • timing',
        visualType: 'checklist',
        motionDirection: 'A three-item checklist forms, ride item emphasized',
        transition: 'Fade',
        iconName: 'ClipboardList',
        lottieSearchKeyword: 'preparation checklist steps',
        customAnimationIdea: 'Checklist items appear; the “arrange a ride” item gets a soft highlight.',
        backgroundStyle: 'Teal with soft checklist card',
        safetyBoundary: 'Restates approved steps; no new instructions.',
        personalizationReason: 'Foregrounds the ride and timing Elaine must coordinate.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Confirm anything unclear',
        narration:
          'You told us you are terrified of missing a step, which is completely understandable — so think of this as a checklist you can follow, and anything that feels unclear is exactly what you confirm with your care team.',
        onScreenText: 'Unsure? Confirm with your team',
        visualType: 'question-list',
        motionDirection: 'A “double-check with team” prompt appears beside the checklist',
        transition: 'Cross-dissolve',
        iconName: 'Phone',
        lottieSearchKeyword: 'confirm call clarify',
        customAnimationIdea: 'A small “?” item routes to a friendly “call to confirm” icon.',
        backgroundStyle: 'Teal with warm accent',
        safetyBoundary: 'Defers all specifics to the care team.',
        personalizationReason: 'Directly soothes Elaine’s fear of missing a step.',
        durationSec: 14,
      },
      {
        sceneTitle: 'Your own approved prep',
        narration:
          'We are not giving you new instructions here, Elaine; this is your own approved prep, organized so nothing slips. Lock in your ride, mark your dates, and keep your team’s number close for anything you want to double-check.',
        onScreenText: 'Your approved prep, organized',
        visualType: 'source-panel',
        motionDirection: 'A “from your approved instructions” badge attaches to the checklist',
        transition: 'Slide-up',
        iconName: 'FileText',
        lottieSearchKeyword: 'approved document source',
        customAnimationIdea: 'A source badge clips onto the organized checklist.',
        backgroundStyle: 'Teal, clean panel',
        safetyBoundary: 'Source transparency; approved content only.',
        personalizationReason: 'Reassures a checklist-loving planner that it’s complete and trusted.',
        durationSec: 12,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'You’re a wonderful planner, Elaine — get the logistics set early, and confirm the rest with your team. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'Plan early. Confirm the rest.',
        visualType: 'closing-card',
        motionDirection: 'Gentle zoom-out; disclaimer eases in last',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'calm reassurance close',
        customAnimationIdea: 'The completed checklist settles with a soft check.',
        backgroundStyle: 'Teal gradient, calm',
        safetyBoundary: 'Educational disclaimer present.',
        personalizationReason: 'Affirms Elaine’s strength as a planner.',
        durationSec: 10,
      },
    ],
    visualAssetPlan: {
      palette: 'Teal with calm neutrals',
      keyVisuals: ['Self-organizing checklist', 'Countdown timeline', 'Ride/timing emphasis', 'Source badge'],
      titleCard: 'Organizing checklist motif on teal, steady type',
      iconStyle: 'Clean line icons, two-tone teal',
    },
    motionPlan: {
      pacing: 'calm and organized',
      signatureTransition: 'Slide with a tidy settle',
      motionNotes: 'Motion conveys order and control; nothing rushed.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hi Elaine — your colonoscopy prep, organized as a simple checklist (ride + timing first). Plan ahead here: [link]',
      email: {
        subject: 'Your colonoscopy prep, made manageable',
        body:
          'Hi Elaine,\n\nWe organized your approved colonoscopy prep into a clear checklist — the general steps, arranging a ride, and timing it around caring for your mom. Anything unclear is just a quick confirm with your care team.\n\nWatch here: [link]\n\nNothing new here — it’s your own approved prep, laid out so nothing slips.',
      },
      portal:
        'A preparation video for your upcoming colonoscopy is ready. It organizes your approved prep steps and the logistics to plan early.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'Restates approved prep; makes no determination.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Adds no guidance beyond approved instructions.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'No risk or prediction language.' },
      { label: 'Approved content only', status: 'pass', detail: 'Sourced from Elaine’s approved prep instructions v3.1.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer narrated and shown.' },
      { label: 'Human review required', status: 'pass', detail: 'Reviewed by GI patient education team.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not add new prep instructions',
        'Does not personalize clinical steps beyond approved content',
        'Does not diagnose or predict',
        'Does not replace confirming specifics with the team',
      ],
      does: [
        'Restates the general approved prep flow',
        'Highlights ride and timing logistics',
        'Encourages confirming anything unclear',
        'Helps Elaine plan around caregiving',
      ],
      explanation:
        'Every step traces to Elaine’s approved prep instructions. The asset improves organization and logistics planning while deferring all specifics to her care team.',
    },
    outputs: ['video', 'portal', 'sms', 'email'],
    estimatedRuntimeSec: 78,
  },

  // 10 ────────────────────────────────────────────────────────────────────
  {
    id: 'coronary-stent',
    category: 'Cardiac Procedure',
    title: 'Understanding Your Stent Procedure',
    department: 'Cardiology / Interventional',
    summary:
      'Walks Bruno through exactly what happens during his coronary stent procedure — calmly and visually — so he feels informed and far less anxious going in.',
    accent: 'navy',
    patient: {
      name: 'Bruno',
      age: 61,
      pronouns: 'he/him',
      language: 'English',
      healthLiteracy: 'intermediate',
      emotionalState: 'anxious',
      lifeContext: {
        occupation: 'Recently retired contractor',
        livingSituation: 'Lives with his wife',
        preferences: ['Plain explanations', 'Knowing what to expect', 'A calm pace'],
        notes:
          'Was told he has a narrowed coronary artery and needs a stent. Nervous about having a procedure on his heart.',
      },
      concerns: [
        {
          quote: "Honestly, anything to do with my heart scares me.",
          acknowledgedAs:
            'Acknowledging the fear and demystifying the procedure one calm step at a time.',
        },
        {
          quote: "I just want to know what they're actually going to do.",
          acknowledgedAs:
            'Showing him, visually, exactly what happens during the procedure.',
        },
      ],
      goals: [
        'Understand what a stent procedure involves',
        'Feel calmer and less anxious going in',
        'Know what to ask his care team',
      ],
      barriers: [
        'Anxiety about a procedure on his heart',
        'Unfamiliar medical terms',
      ],
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'George has a follow-up appointment coming up; Nina coordinates his care.',
      journeyStage: 'Pre-visit preparation (caregiver-led)',
      careTeamContext:
        'The care team wants Nina equipped to help George prepare and recall details while keeping him central.',
      appointmentHistory: ['Previous visit where details were forgotten', 'Follow-up scheduled'],
    },
    approvedContent: {
      title: 'Supporting a Loved One at a Follow-Up Visit — Caregiver Education',
      owner: 'Meridian Caregiver Support Program (synthetic)',
      summary:
        'Guidance for caregivers on helping a loved one prepare, capture visit details, and bring questions — while preserving the patient’s voice.',
      version: 'v2.0',
      lastReviewed: '2026-04-06',
    },
    evidenceTheme: {
      theme:
        'Across populations, engaged caregivers are associated with better follow-up preparation and recall of visit information.',
      educationalRelevance:
        'Supports the caregiver role — never an assessment of George’s health.',
      provenance:
        'Truveta-style de-identified caregiver-engagement themes, summarized for education.',
    },
    personalizationSignals: [
      {
        label: 'Anxious about a heart procedure',
        value: 'Fearful of anything heart-related',
        source: 'patient-provided',
        appliedAs: 'Opens by acknowledging the fear and demystifies each step.',
      },
      {
        label: 'Wants to know what happens',
        value: 'Asked what they will actually do',
        source: 'patient-provided',
        appliedAs: 'Shows the procedure visually, step by step.',
      },
      {
        label: 'Prefers plain language',
        value: 'Values clear, jargon-free explanations',
        source: 'patient-provided',
        appliedAs: 'Keeps the narration simple and reassuring.',
      },
      {
        label: 'Stent procedure scheduled',
        value: 'Upcoming angioplasty',
        source: 'journey-context',
        appliedAs: 'Times the education to just before the procedure.',
      },
    ],
    script: {
      opening: 'Hi Nina, this one’s for you — a few simple ways to help your dad get the most from his follow-up.',
      fullNarration:
        'Hi Nina, this one’s for you — a few simple ways to help your dad get the most from his follow-up. You have shared that George forgets what was said almost as soon as you leave the office, and that you want to help him without taking over his decisions. That balance you are trying to strike is exactly right, and there are easy ways to support it. Before the visit, sit down together and jot a short list of questions in his words, so the visit reflects what he wants to know. During the visit, you can be the note-taker — write down the main points so the two of you can look back later instead of trying to remember everything. And keep George in the driver’s seat: let him answer first, and step in to help fill gaps, not to speak over him. A small tip that helps a lot — at the end, read the notes back together so it sticks before you walk out. None of this is about assessing his health, Nina; it is about helping a daughter and her dad walk in prepared and walk out clear, as a team.',
      closing:
        'You’re a wonderful support for him, Nina — bring the list, take the notes, and keep his voice at the center.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'This one’s for you, Nina',
        narration:
          'Hi Nina, this one’s for you — a few simple ways to help your dad get the most from his follow-up.',
        onScreenText: 'For you, the caregiver',
        visualType: 'caregiver-card',
        motionDirection: 'Title fades up beside a two-figure support motif',
        transition: 'Cross-dissolve',
        iconName: 'Users',
        lottieSearchKeyword: 'caregiver support together',
        customAnimationIdea: 'A supportive figure stands beside an older figure, warmly.',
        backgroundStyle: 'Navy gradient, warm light',
        safetyBoundary: 'No assessment of George’s health.',
        personalizationReason: 'Speaks directly to Nina as the caregiver.',
        durationSec: 11,
      },
      {
        sceneTitle: 'The balance you’re striking',
        narration:
          'You have shared that George forgets what was said almost as soon as you leave the office, and that you want to help him without taking over his decisions. That balance you are trying to strike is exactly right, and there are easy ways to support it.',
        onScreenText: 'Help — without taking over',
        visualType: 'quote-card',
        motionDirection: 'A balance motif settles evenly between two figures',
        transition: 'Slide-left',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'balance support care',
        customAnimationIdea: 'A gentle scale balances, neither side dominating.',
        backgroundStyle: 'Navy with warm accent',
        safetyBoundary: 'Preserves George’s autonomy; no advice.',
        personalizationReason: 'Affirms Nina’s help-not-override concern.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Build the list together',
        narration:
          'Before the visit, sit down together and jot a short list of questions in his words, so the visit reflects what he wants to know.',
        onScreenText: 'Build the question list together',
        visualType: 'question-list',
        motionDirection: 'A shared list writes itself with two hands implied',
        transition: 'Fade',
        iconName: 'ClipboardList',
        lottieSearchKeyword: 'shared question list',
        customAnimationIdea: 'Questions appear in “his words,” attributed to George.',
        backgroundStyle: 'Navy with blue accents',
        safetyBoundary: 'Question framing only; keeps patient voice central.',
        personalizationReason: 'Keeps George’s perspective leading the prep.',
        durationSec: 13,
      },
      {
        sceneTitle: 'Be the note-taker',
        narration:
          'During the visit, you can be the note-taker — write down the main points so the two of you can look back later instead of trying to remember everything. And keep George in the driver’s seat: let him answer first, and step in to help fill gaps, not to speak over him.',
        onScreenText: 'Take notes • let him lead',
        visualType: 'checklist',
        motionDirection: 'A notepad fills with main points; a “he answers first” cue appears',
        transition: 'Cross-dissolve',
        iconName: 'ClipboardCheck',
        lottieSearchKeyword: 'taking notes appointment',
        customAnimationIdea: 'A notepad captures points while George’s figure speaks first.',
        backgroundStyle: 'Navy with soft card',
        safetyBoundary: 'Supports recall; no clinical content.',
        personalizationReason: 'Targets George’s tendency to forget while keeping him central.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Read it back together',
        narration:
          'A small tip that helps a lot — at the end, read the notes back together so it sticks before you walk out.',
        onScreenText: 'Read the notes back together',
        visualType: 'caregiver-card',
        motionDirection: 'Two figures review a shared note before leaving',
        transition: 'Slide-up',
        iconName: 'BookOpen',
        lottieSearchKeyword: 'review notes together',
        customAnimationIdea: 'A note is read aloud between two figures, then pocketed.',
        backgroundStyle: 'Navy with warm light',
        safetyBoundary: 'Recall support only; no advice.',
        personalizationReason: 'Practical tactic for George’s memory.',
        durationSec: 11,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'None of this is about assessing his health, Nina; it is about helping a daughter and her dad walk in prepared and walk out clear, as a team. You’re a wonderful support for him — bring the list, take the notes, and keep his voice at the center. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'In prepared. Out clear. Together.',
        visualType: 'closing-card',
        motionDirection: 'Gentle zoom-out; disclaimer eases in last',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'family warmth close',
        customAnimationIdea: 'Two figures settle side by side as the card closes.',
        backgroundStyle: 'Navy gradient, warm',
        safetyBoundary: 'Educational disclaimer present.',
        personalizationReason: 'Honors Nina’s caregiving with warmth.',
        durationSec: 12,
      },
    ],
    visualAssetPlan: {
      palette: 'Navy with warm caregiver accents',
      keyVisuals: ['Two-figure support motif', 'Balance scale', 'Shared question list', 'Note-review scene'],
      titleCard: 'Caregiver support motif on navy, warm type',
      iconStyle: 'Soft, human line icons',
    },
    motionPlan: {
      pacing: 'warm and steady',
      signatureTransition: 'Cross-dissolve with a gentle settle',
      motionNotes: 'Motion is supportive and balanced; never paternalistic.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hi Nina — quick caregiver tips to help your dad prep for his follow-up and remember what matters: [link]',
      email: {
        subject: 'Helping your dad get the most from his follow-up',
        body:
          'Hi Nina,\n\nThis short video is for you as George’s caregiver. It shares simple ways to help him prepare, capture and recall what’s discussed, and bring questions in his words — all while keeping him in the driver’s seat.\n\nWatch here: [link]\n\nIt doesn’t assess his health; it just helps the two of you walk in prepared and walk out clear.',
      },
      portal:
        'A caregiver-focused video to help you prepare with George for his follow-up is ready. It’s built around supporting him while keeping his voice central.',
      caregiverSummary:
        'For Nina: This video gives you simple, respectful ways to help your dad at his follow-up — build a question list in his words, take notes during the visit, let him answer first, and read the notes back together at the end. It’s education only and keeps his decisions his own.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'No assessment of George’s health.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Caregiver support tactics only.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'No prediction or risk language.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer narrated and shown.' },
      { label: 'Approved content only', status: 'pass', detail: 'Built from approved caregiver education content v2.0.' },
      { label: 'Human review required', status: 'pass', detail: 'Reviewed by caregiver support program.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not assess George’s health',
        'Does not give clinical guidance',
        'Does not override George’s autonomy',
        'Does not predict outcomes',
      ],
      does: [
        'Equips Nina to support preparation',
        'Offers capture-and-recall tactics',
        'Keeps George’s voice central',
        'Helps bring organized questions',
      ],
      explanation:
        'This is caregiver education centered on Nina while preserving George’s autonomy. It improves preparation and recall without entering any clinical decision-making.',
    },
    outputs: ['video', 'portal', 'sms', 'email'],
    estimatedRuntimeSec: 78,
  },

  // 11 ────────────────────────────────────────────────────────────────────
  {
    id: 'health-equity-transport',
    category: 'Health Equity',
    title: 'Planning Your Follow-Up Visit',
    department: 'Population Health / Care Navigation',
    summary:
      'Reassures Tasha that rescheduling is okay and that her care team can help coordinate transportation and childcare-friendly timing.',
    accent: 'blue',
    patient: {
      name: 'Tasha',
      age: 39,
      pronouns: 'she/her',
      language: 'English',
      healthLiteracy: 'intermediate',
      emotionalState: 'embarrassed',
      lifeContext: {
        occupation: 'Home health aide',
        livingSituation: 'Single parent of two young kids',
        schedule: 'Juggles work shifts and childcare with little backup',
        preferences: ['No judgment', 'Practical help', 'Flexible options'],
        notes:
          'Has missed appointments due to childcare and transportation gaps; feels embarrassed about rescheduling.',
      },
      concerns: [
        {
          quote: "I feel embarrassed every time I have to reschedule again.",
          acknowledgedAs:
            'Normalizing that life happens and that asking for help is welcome, not a failing.',
        },
        {
          quote: "Getting there with the kids and no ride is the hard part.",
          acknowledgedAs:
            'Explaining that the care team can help coordinate support like transportation and timing.',
        },
      ],
      goals: [
        'Understand that rescheduling is okay',
        'Know the care team can help coordinate support',
        'Feel comfortable asking for help',
      ],
      barriers: [
        'Transportation gaps to appointments',
        'Childcare constraints as a single parent',
      ],
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'Tasha has missed follow-ups and a care-navigation outreach was generated to help her plan the next one.',
      journeyStage: 'Care navigation / pre-visit support',
      careTeamContext:
        'The care team and navigators want Tasha to know support exists and that asking for help is encouraged.',
      appointmentHistory: ['Missed follow-up due to logistics', 'Care navigation outreach initiated'],
    },
    approvedContent: {
      title: 'Help Planning Your Follow-Up — Care Navigation Education',
      owner: 'Meridian Care Navigation & Health Equity Office (synthetic)',
      summary:
        'A supportive overview explaining that rescheduling is okay and that care navigators can help coordinate transportation, timing, and other support.',
      version: 'v1.5',
      lastReviewed: '2026-04-04',
    },
    evidenceTheme: {
      theme:
        'Across populations, transportation and childcare barriers are recurring, addressable reasons for missed visits.',
      educationalRelevance:
        'Frames missed visits as a shared, solvable logistics theme — never a personal failing or risk judgment.',
      provenance:
        'Truveta-style de-identified access-barrier themes, summarized for education.',
    },
    personalizationSignals: [
      {
        label: 'Single parent of two',
        value: 'Childcare constraints around appointments',
        source: 'patient-provided',
        appliedAs: 'Emphasizes childcare-friendly timing and support.',
      },
      {
        label: 'Transportation gaps',
        value: 'Lacks reliable transportation',
        source: 'patient-provided',
        appliedAs: 'Highlights that navigators can help coordinate rides.',
      },
      {
        label: 'Feels embarrassed rescheduling',
        value: 'Embarrassment around missed visits',
        source: 'patient-provided',
        appliedAs: 'Leads with warmth and zero judgment.',
      },
      {
        label: 'Care navigation available',
        value: 'Navigators can help coordinate support',
        source: 'journey-context',
        appliedAs: 'Centers the offer of practical help.',
      },
    ],
    script: {
      opening: 'Hi Tasha, this is a warm, no-judgment note about planning your next visit — and getting some help with it.',
      fullNarration:
        'Hi Tasha, this is a warm, no-judgment note about planning your next visit — and getting some help with it. First, let us clear the air on something: rescheduling is completely okay. Life with two little ones and a packed shift schedule is a lot, and needing to move an appointment is not a failing — it is just life, and we get it. You have mentioned that getting there with the kids and without a ride is the hard part, and that you feel embarrassed asking again. Please hear this: asking for help is exactly what we are here for, and there is nothing to be embarrassed about. Your care team can help coordinate things like transportation and finding a time that works around childcare — that is a normal part of what navigators do, for lots of families. So here is the simple next step: reach out, tell us what would make the visit doable, and let us help line it up. You do not have to solve the logistics alone, Tasha. We would much rather help you get there than have you carry this by yourself.',
      closing:
        'Reach out whenever you’re ready, Tasha — asking for help is welcome here, and we’ll figure it out together.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'A warm, no-judgment note',
        narration:
          'Hi Tasha, this is a warm, no-judgment note about planning your next visit — and getting some help with it.',
        onScreenText: 'Planning your next visit — together',
        visualType: 'title-card',
        motionDirection: 'Title fades up over a soft, welcoming motif',
        transition: 'Cross-dissolve',
        iconName: 'CalendarClock',
        lottieSearchKeyword: 'friendly scheduling help',
        customAnimationIdea: 'A calendar softens and opens, warm and inviting.',
        backgroundStyle: 'Soft blue gradient, warm light',
        safetyBoundary: 'No judgment; support framing only.',
        personalizationReason: 'Opens warmly for someone who feels embarrassed.',
        durationSec: 11,
      },
      {
        sceneTitle: 'Rescheduling is okay',
        narration:
          'First, let us clear the air on something: rescheduling is completely okay. Life with two little ones and a packed shift schedule is a lot, and needing to move an appointment is not a failing — it is just life, and we get it.',
        onScreenText: 'Rescheduling is completely okay',
        visualType: 'quote-card',
        motionDirection: 'A reassuring card scales gently into view',
        transition: 'Slide-left',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'reassurance no judgment',
        customAnimationIdea: 'A worried face icon eases into a relieved one.',
        backgroundStyle: 'Blue with warm accent',
        safetyBoundary: 'Normalizes rescheduling; no risk judgment.',
        personalizationReason: 'Directly relieves Tasha’s embarrassment.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Naming the real barriers',
        narration:
          'You have mentioned that getting there with the kids and without a ride is the hard part, and that you feel embarrassed asking again. Please hear this: asking for help is exactly what we are here for, and there is nothing to be embarrassed about.',
        onScreenText: 'Asking for help is welcome',
        visualType: 'icon-grid',
        motionDirection: 'A ride icon and a childcare icon appear, then a “help” bridge connects them',
        transition: 'Fade',
        iconName: 'MapPin',
        lottieSearchKeyword: 'transportation childcare support',
        customAnimationIdea: 'A bridge animates between a “ride” and “kids” icon.',
        backgroundStyle: 'Blue with soft tiles',
        safetyBoundary: 'Names barriers supportively; no advice.',
        personalizationReason: 'Reflects Tasha’s exact transportation and childcare gaps.',
        durationSec: 16,
      },
      {
        sceneTitle: 'Navigators can help coordinate',
        narration:
          'Your care team can help coordinate things like transportation and finding a time that works around childcare — that is a normal part of what navigators do, for lots of families.',
        onScreenText: 'Navigators can help coordinate',
        visualType: 'map-route',
        motionDirection: 'A simple route animates from home to clinic, with a support stop',
        transition: 'Cross-dissolve',
        iconName: 'MapPin',
        lottieSearchKeyword: 'route navigation help',
        customAnimationIdea: 'A gentle route line connects home and clinic with a helping hand icon.',
        backgroundStyle: 'Blue with route motif',
        safetyBoundary: 'Describes available support; no clinical content.',
        personalizationReason: 'Shows tangible help for Tasha’s logistics.',
        durationSec: 14,
      },
      {
        sceneTitle: 'A simple next step',
        narration:
          'So here is the simple next step: reach out, tell us what would make the visit doable, and let us help line it up. You do not have to solve the logistics alone, Tasha.',
        onScreenText: 'Reach out — we’ll help line it up',
        visualType: 'question-list',
        motionDirection: 'A short “tell us what you need” prompt appears',
        transition: 'Slide-up',
        iconName: 'MessageSquare',
        lottieSearchKeyword: 'reach out simple step',
        customAnimationIdea: 'A friendly message bubble invites a reply.',
        backgroundStyle: 'Blue with soft accents',
        safetyBoundary: 'Action step only; no advice.',
        personalizationReason: 'Gives Tasha a concrete, low-pressure next move.',
        durationSec: 12,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'We would much rather help you get there than have you carry this by yourself. Reach out whenever you’re ready, Tasha — asking for help is welcome here, and we’ll figure it out together. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'You don’t have to carry this alone',
        visualType: 'closing-card',
        motionDirection: 'Gentle zoom-out; disclaimer eases in last',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'support warmth close',
        customAnimationIdea: 'The card settles with a warm, steady glow.',
        backgroundStyle: 'Blue gradient, warm',
        safetyBoundary: 'Educational disclaimer present.',
        personalizationReason: 'Closes with warmth and an open invitation to ask for help.',
        durationSec: 12,
      },
    ],
    visualAssetPlan: {
      palette: 'Soft blue with warm supportive accents',
      keyVisuals: ['Opening calendar', 'Relief expression', 'Ride/childcare bridge', 'Home-to-clinic route'],
      titleCard: 'Welcoming calendar motif on soft blue, warm type',
      iconStyle: 'Rounded, friendly line icons',
    },
    motionPlan: {
      pacing: 'warm and gentle',
      signatureTransition: 'Cross-dissolve with a soft settle',
      motionNotes: 'Motion conveys ease and welcome; nothing administrative or cold.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hi Tasha — rescheduling is totally okay, and we can help with rides and timing around the kids. Reach out anytime: [link]',
      email: {
        subject: 'Let’s plan your next visit — together',
        body:
          'Hi Tasha,\n\nWe wanted to send a warm, no-judgment note: rescheduling is completely okay, and your care team can help coordinate support like transportation and a time that works around childcare.\n\nWatch here: [link]\n\nAsking for help is exactly what we’re here for. You don’t have to figure out the logistics alone.',
      },
      portal:
        'A short, supportive video about planning your follow-up is ready. It explains how your care team can help with transportation and timing.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'Logistics and support only; no clinical content.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'No clinical guidance offered.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'Missed visits framed as a logistics theme, not a risk judgment.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer narrated and shown.' },
      { label: 'Approved content only', status: 'pass', detail: 'Built from approved care navigation content v1.5.' },
      { label: 'Human review required', status: 'pass', detail: 'Reviewed by care navigation office before send.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not judge Tasha for missed visits',
        'Does not give clinical advice',
        'Does not predict health risk',
        'Does not pressure her',
      ],
      does: [
        'Normalizes rescheduling',
        'Explains available coordination support',
        'Names transportation and childcare barriers kindly',
        'Offers a simple next step',
      ],
      explanation:
        'This is supportive care-navigation education focused on access, not clinical content. It removes shame and points Tasha toward practical help she is entitled to ask for.',
    },
    outputs: ['video', 'portal', 'sms', 'email'],
    estimatedRuntimeSec: 81,
  },

  // 12 ────────────────────────────────────────────────────────────────────
  {
    id: 'genomics-consent',
    category: 'Consent & Privacy',
    title: 'Understanding Research Consent and De-Identified Data',
    department: 'Research / Genomics Education',
    summary:
      'Gives privacy-conscious Henry a clear, neutral explanation of consent, de-identified data, and his right to choose.',
    accent: 'slate',
    patient: {
      name: 'Henry',
      age: 64,
      pronouns: 'he/him',
      language: 'English',
      healthLiteracy: 'advanced',
      emotionalState: 'curious',
      lifeContext: {
        occupation: 'Retired civil engineer',
        livingSituation: 'Lives with his wife; enjoys reading the fine print',
        preferences: ['Wants the details', 'Privacy-conscious', 'Reasoned explanations'],
        notes:
          'Genuinely curious about contributing to research but cautious about privacy and how his data would be handled.',
      },
      concerns: [
        {
          quote: "Before I sign anything, I want to know exactly how my data is protected.",
          acknowledgedAs:
            'Explaining consent and de-identified data concepts clearly and neutrally.',
        },
        {
          quote: "Is this a one-time yes, or can I change my mind later?",
          acknowledgedAs:
            'Clarifying that participation is voluntary and can typically be reconsidered.',
        },
      ],
      goals: [
        'Understand what research consent involves',
        'Understand privacy basics and de-identified data',
        'Know participation is voluntary and have questions ready',
      ],
      barriers: [
        'Privacy concerns about data handling',
        'Wants thorough detail before deciding anything',
      ],
      synthetic: true,
    },
    clinicalContext: {
      trigger: 'Henry expressed curiosity about contributing to research and asked how consent and data privacy work.',
      journeyStage: 'Education before any consent decision',
      careTeamContext:
        'The research team wants Henry to understand consent and privacy concepts before any decision, with no pressure.',
      appointmentHistory: ['Expressed interest in research', 'Education offered, no decision made'],
    },
    approvedContent: {
      title: 'Research Consent & De-Identified Data — Patient Education',
      owner: 'Meridian Research Ethics & Privacy Office (synthetic)',
      summary:
        'A clear, neutral explanation of informed consent, what de-identified data means, privacy safeguards, voluntary participation, and questions to ask.',
      version: 'v1.3',
      lastReviewed: '2026-04-03',
    },
    evidenceTheme: {
      theme:
        'Across populations, clearer consent and privacy education is associated with people feeling more informed about research choices.',
      educationalRelevance:
        'Supports neutral consent education — never encouragement to participate or any individual assessment.',
      provenance:
        'Truveta-style de-identified education trends, summarized for patient understanding.',
    },
    personalizationSignals: [
      {
        label: 'Reads the fine print',
        value: 'Wants thorough, detailed explanations',
        source: 'patient-provided',
        appliedAs: 'Goes into clear, structured detail rather than skimming.',
      },
      {
        label: 'Privacy-conscious',
        value: 'Cautious about how data is handled',
        source: 'patient-provided',
        appliedAs: 'Leads with privacy and de-identification concepts.',
      },
      {
        label: 'Wants to know he can change his mind',
        value: 'Asks whether consent is reversible',
        source: 'patient-provided',
        appliedAs: 'Emphasizes voluntary, reconsiderable participation.',
      },
      {
        label: 'Curious but undecided',
        value: 'Interested, no decision made',
        source: 'journey-context',
        appliedAs: 'Keeps everything neutral and pressure-free.',
      },
    ],
    script: {
      opening: 'Hi Henry, this is a clear, no-pressure walkthrough of how research consent and data privacy work.',
      fullNarration:
        'Hi Henry, this is a clear, no-pressure walkthrough of how research consent and data privacy work. Since you are someone who likes to read the fine print before deciding anything, we will give you the actual substance, not the glossy version. Let us start with consent, because that is the heart of it. Informed consent means you get a full explanation first, and then you decide — freely, with no obligation. Next, the privacy piece you care about most. When data is de-identified, the details that point to you personally are removed, so the information used for research is not tied to your name. There are safeguards and oversight built around how that data is handled. And to your question of whether this is a one-time yes — participation is voluntary, and you can typically reconsider your choice; that is a fair thing to confirm directly. We are not nudging you one way or the other, Henry. Good questions to bring include: how exactly is my data de-identified, who can access it, and what are my options if I change my mind? Take all the time you and your wife want — being thorough here is exactly the right instinct.',
      closing:
        'Read every line you want, Henry — ask the privacy team anything, and let the choice be entirely yours.',
      disclaimer: 'This video is educational and does not replace medical advice from your care team.',
    },
    storyboard: [
      {
        sceneTitle: 'A clear walkthrough',
        narration:
          'Hi Henry, this is a clear, no-pressure walkthrough of how research consent and data privacy work. Since you are someone who likes to read the fine print before deciding anything, we will give you the actual substance, not the glossy version.',
        onScreenText: 'Consent & privacy, clearly explained',
        visualType: 'title-card',
        motionDirection: 'Title fades up over a clean document motif',
        transition: 'Cross-dissolve',
        iconName: 'FileText',
        lottieSearchKeyword: 'document fine print',
        customAnimationIdea: 'A document’s fine print gently magnifies into readable clarity.',
        backgroundStyle: 'Slate gradient, crisp light',
        safetyBoundary: 'No-pressure, education-only framing.',
        personalizationReason: 'Speaks to Henry’s fine-print, detail-first nature.',
        durationSec: 13,
      },
      {
        sceneTitle: 'What consent means',
        narration:
          'Let us start with consent, because that is the heart of it. Informed consent means you get a full explanation first, and then you decide — freely, with no obligation.',
        onScreenText: 'Informed consent: explanation, then your choice',
        visualType: 'consent-panel',
        motionDirection: 'A consent panel shows “explain first, then decide,” the choice clearly the patient’s',
        transition: 'Slide-left',
        iconName: 'ClipboardCheck',
        lottieSearchKeyword: 'informed consent choice',
        customAnimationIdea: 'A two-step flow: information fills in, then a patient-controlled choice appears.',
        backgroundStyle: 'Slate with neutral panel',
        safetyBoundary: 'Defines consent neutrally; no nudging.',
        personalizationReason: 'Gives Henry the substance he asked for.',
        durationSec: 14,
      },
      {
        sceneTitle: 'De-identified data',
        narration:
          'Next, the privacy piece you care about most. When data is de-identified, the details that point to you personally are removed, so the information used for research is not tied to your name. There are safeguards and oversight built around how that data is handled.',
        onScreenText: 'De-identified: your name is removed',
        visualType: 'consent-panel',
        motionDirection: 'A record animates as identifying fields are stripped away',
        transition: 'Fade',
        iconName: 'ShieldCheck',
        lottieSearchKeyword: 'data privacy anonymized shield',
        customAnimationIdea: 'A record shows name and identifiers dissolving, leaving anonymized data.',
        backgroundStyle: 'Slate with protective accent',
        safetyBoundary: 'Explains privacy concepts; no individual data shown.',
        personalizationReason: 'Leads with the privacy detail Henry cares about most.',
        durationSec: 16,
      },
      {
        sceneTitle: 'You can change your mind',
        narration:
          'And to your question of whether this is a one-time yes — participation is voluntary, and you can typically reconsider your choice; that is a fair thing to confirm directly.',
        onScreenText: 'Voluntary — and reconsiderable',
        visualType: 'quote-card',
        motionDirection: 'A toggle shows it can move both ways, fully in the patient’s control',
        transition: 'Cross-dissolve',
        iconName: 'Sparkles',
        lottieSearchKeyword: 'voluntary choice reversible',
        customAnimationIdea: 'A clearly patient-controlled toggle moves both directions, never locked.',
        backgroundStyle: 'Slate with warm accent',
        safetyBoundary: 'Emphasizes voluntary participation; no pressure.',
        personalizationReason: 'Answers Henry’s “can I change my mind?” question.',
        durationSec: 13,
      },
      {
        sceneTitle: 'Questions to bring',
        narration:
          'We are not nudging you one way or the other, Henry. Good questions to bring include: how exactly is my data de-identified, who can access it, and what are my options if I change my mind?',
        onScreenText: 'Questions to bring',
        visualType: 'question-list',
        motionDirection: 'Three precise questions type in as a list',
        transition: 'Slide-up',
        iconName: 'ClipboardList',
        lottieSearchKeyword: 'privacy questions list',
        customAnimationIdea: 'Each question lands with a small, precise check.',
        backgroundStyle: 'Slate with soft accents',
        safetyBoundary: 'Question framing only; explicitly not nudging.',
        personalizationReason: 'Equips Henry’s detail-oriented decision process.',
        durationSec: 14,
      },
      {
        sceneTitle: 'Warm close',
        narration:
          'Take all the time you and your wife want — being thorough here is exactly the right instinct. Read every line you want, Henry — ask the privacy team anything, and let the choice be entirely yours. This video is educational and does not replace medical advice from your care team.',
        onScreenText: 'The choice is entirely yours',
        visualType: 'closing-card',
        motionDirection: 'Gentle zoom-out; disclaimer eases in last',
        transition: 'Fade-to-card',
        iconName: 'HeartPulse',
        lottieSearchKeyword: 'calm thoughtful close',
        customAnimationIdea: 'The document closes calmly, choice clearly left open.',
        backgroundStyle: 'Slate gradient, calm',
        safetyBoundary: 'Educational disclaimer present; choice left with Henry.',
        personalizationReason: 'Respects Henry’s thoroughness and autonomy.',
        durationSec: 12,
      },
    ],
    visualAssetPlan: {
      palette: 'Slate with crisp privacy-blue accents',
      keyVisuals: ['Magnifying fine print', 'Two-step consent flow', 'De-identification strip animation', 'Patient-controlled toggle'],
      titleCard: 'Clean document motif on slate, precise typography',
      iconStyle: 'Crisp, precise line icons',
    },
    motionPlan: {
      pacing: 'clear and measured',
      signatureTransition: 'Cross-dissolve with a precise settle',
      motionNotes: 'Motion is exact and trustworthy; nothing flashy or persuasive.',
      renderTargets: ['Remotion', 'Framer Motion', 'Lottie'],
    },
    cta: {
      sms:
        'Hi Henry — a clear, no-pressure explainer on research consent and how de-identified data works. Details inside: [link]',
      email: {
        subject: 'How research consent and data privacy work',
        body:
          'Hi Henry,\n\nKnowing you like the full details, we made a clear, no-pressure video explaining informed consent, what de-identified data means, the privacy safeguards involved, and that participation is voluntary and reconsiderable.\n\nWatch here: [link]\n\nIt doesn’t nudge you in any direction — it just gives you the substance and a few good questions to ask.',
      },
      portal:
        'An education video on research consent and de-identified data is ready. It explains the concepts, your privacy, and that the choice is entirely yours.',
    },
    compliance: [
      { label: 'No diagnosis', status: 'pass', detail: 'Explains consent/privacy concepts only.' },
      { label: 'No treatment recommendation', status: 'pass', detail: 'Does not encourage or discourage participation.' },
      { label: 'No patient-specific risk scoring', status: 'pass', detail: 'No individual assessment or prediction.' },
      { label: 'Source transparency', status: 'pass', detail: 'Built from approved consent/privacy content v1.3.' },
      { label: 'Educational disclaimer present', status: 'pass', detail: 'Disclaimer narrated and shown.' },
      { label: 'Human review required', status: 'pass', detail: 'Reviewed by research ethics & privacy office.' },
    ],
    safetyBoundary: {
      doesNotDo: [
        'Does not encourage Henry to consent',
        'Does not collect consent itself',
        'Does not diagnose or assess Henry',
        'Does not predict any outcome',
      ],
      does: [
        'Explains informed consent neutrally',
        'Clarifies what de-identified data means',
        'Emphasizes voluntary, reconsiderable participation',
        'Offers precise questions to ask the privacy team',
      ],
      explanation:
        'This is neutral pre-consent education on privacy and choice. It deliberately avoids any persuasion, leaving Henry fully in control of an informed, unhurried decision.',
    },
    outputs: ['video', 'portal', 'sms', 'email'],
    estimatedRuntimeSec: 82,
  },
];

/**
 * Upgraded storyboards (treatment-specific real-world clinical scenes blended with
 * personalized UI scenes) override the base storyboards where available.
 */
export const demoUseCases: DemoUseCase[] = baseUseCases.map((u) => ({
  ...u,
  storyboard: storyboardsById[u.id] ?? u.storyboard,
}));

/** Look up a single use case by its stable id. */
export function getUseCaseById(id: string): DemoUseCase | undefined {
  return demoUseCases.find((useCase) => useCase.id === id);
}

/** Unique list of departments represented in the dataset. */
export const departments: Department[] = Array.from(
  new Set(demoUseCases.map((useCase) => useCase.department)),
);

/** Unique list of categories represented in the dataset. */
export const categories: UseCaseCategory[] = Array.from(
  new Set(demoUseCases.map((useCase) => useCase.category)),
);
