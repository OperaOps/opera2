import type { StoryboardScene } from '../types';

/**
 * Storyboards — Part 1.
 *
 * Six patient-education videos, each 6–8 scenes, blending PERSONALIZED UI scenes
 * (warm intro, concerns/goals, prep, next-step, safety close) with REAL-WORLD
 * CLINICAL scenes (calm, non-graphic medical explainers driven by
 * clinicalVisualCategory).
 *
 * Hard boundary throughout: education and communication only. Never diagnosis,
 * treatment recommendation, medication guidance, independent result
 * interpretation, patient-specific risk prediction, or trial-eligibility claims.
 */
export const storyboardsPart1: Record<string, StoryboardScene[]> = {
  /* ===================================================================== */
  /* 1) PREVENTIVE SCREENING — James, 52, busy travelling project manager  */
  /* ===================================================================== */
  'preventive-screening': [
    {
      sceneTitle: 'Hi, James',
      narration:
        "Hi James, it's your care team. We know how much you're juggling — back-to-back projects and a calendar full of flights. This is a short, no-pressure walkthrough so screening can fit around your life, not the other way around.",
      onScreenText: 'Hi James — let’s make this simple.',
      visualType: 'title-card',
      motionDirection: 'Soft fade-up of name, gentle parallax on background layers',
      transition: 'Cross-dissolve into a calm horizon line',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'calm welcome wave',
      customAnimationIdea:
        'Patient first name types in, then a soft shield icon settles beneath it with a breathing-scale loop',
      backgroundStyle: 'Warm teal-to-navy gradient with subtle drifting particles',
      safetyBoundary: 'Education only — no diagnosis, no risk prediction',
      personalizationReason:
        'Opens by name and acknowledges his travel-heavy schedule so the video feels made for him',
      durationSec: 9,
      patientPersonalization:
        'Greets James by name and references his busy, travel-filled project-manager schedule',
      assetSearchTerms: ['warm gradient intro', 'calm welcome animation', 'soft particle background'],
      codedAnimationIdea:
        'Framer Motion: name text staggers in (opacity 0,y:20 → 1,0), shield icon scales 0.9↔1 on a slow loop',
      avoidShowing: ['medical jargon', 'urgent or alarming language', 'clinical statistics about him'],
    },
    {
      sceneTitle: 'We hear you',
      narration:
        "We also know you've heard that colonoscopies are difficult — and that's a completely fair thing to feel. Lots of people feel the same. Our goal here is just to take the mystery out of it so it feels a little less daunting.",
      onScreenText: '“I’ve heard it’s difficult.”',
      visualType: 'quote-card',
      motionDirection: 'Quote slides in from left, acknowledging caption rises beneath',
      transition: 'Quote card gently dims as next scene fades up',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'reassuring conversation bubble',
      customAnimationIdea:
        'A speech-bubble quote appears, then a soft underline draws across the reassuring line below it',
      backgroundStyle: 'Muted navy with a single warm spotlight behind the quote',
      safetyBoundary: 'Acknowledges feelings without making clinical claims',
      personalizationReason:
        'Names James’s specific worry that colonoscopies are difficult and validates it',
      durationSec: 10,
      patientPersonalization:
        'Reflects his stated nervousness about colonoscopies being hard in his own framing',
      assetSearchTerms: ['speech bubble animation', 'reassuring quote card', 'soft spotlight ui'],
      codedAnimationIdea:
        'SVG path-draw underline under the reassurance line; quote card eases in from x:-30',
      avoidShowing: ['scary procedure imagery', 'fear-based messaging', 'pressure to decide now'],
    },
    {
      sceneTitle: 'A quick look at the colon',
      narration:
        "Let's start with a friendly picture. This is a simplified view of the colon — the lower part of your digestive system. Screening is simply a way to take a careful look in here, early, while everything is easy to check.",
      onScreenText: 'A simple look inside',
      visualType: 'comparison',
      motionDirection: 'Slow push-in toward a clean labeled diagram',
      transition: 'Diagram softly recedes as the camera-path scene begins',
      iconName: 'Stethoscope',
      lottieSearchKeyword: 'colon anatomy diagram simple',
      customAnimationIdea:
        'Labels fade in one at a time around a soft 2.5D colon shape with gentle breathing motion',
      backgroundStyle: 'Clean off-white-on-navy clinical canvas with soft shadows',
      safetyBoundary: 'Simplified general anatomy only — not James’s own body or results',
      personalizationReason:
        'Frames anatomy gently for an anxious first-timer rather than clinically',
      durationSec: 11,
      clinicalVisualCategory: 'anatomy',
      clinicalVisualDirection:
        'Clean 2.5D labeled colon, soft gradients, calm pastel palette, gentle idle motion',
      realWorldConceptShown:
        'Where the colon sits in the digestive system and what screening generally looks at',
      safeMedicalVisualStyle:
        'Stylized, friendly, non-graphic anatomy — illustrative not photographic',
      patientPersonalization:
        'Keeps the explanation calm and plain-language for someone new and nervous',
      assetSearchTerms: ['simple colon anatomy', 'digestive system illustration', 'labeled organ diagram calm'],
      codedAnimationIdea:
        'SVG colon path with animated label callouts (stagger), subtle 2% scale breathing loop',
      avoidShowing: ['graphic internal tissue', 'blood', 'disease imagery', 'photoreal organs'],
    },
    {
      sceneTitle: 'How the camera gently travels',
      narration:
        "If you choose a colonoscopy, a thin, flexible camera is gently guided along that same path so the care team can see clearly. It's done with comfort medicine, and most people remember very little of it afterward.",
      onScreenText: 'A gentle, guided look',
      visualType: 'comparison',
      motionDirection: 'Soft tracking shot following a small glowing dot along a simplified path',
      transition: 'Path fades to white, then dissolves into the at-home option',
      iconName: 'ScanLine',
      lottieSearchKeyword: 'gentle camera path tube animation',
      customAnimationIdea:
        'A soft glowing point travels a simplified looping colon line, leaving a calm light trail',
      backgroundStyle: 'Dark navy with a single luminous path and ambient glow',
      safetyBoundary: 'Abstract, comfort-forward walkthrough — no graphic footage',
      personalizationReason:
        'Directly demystifies the part James is nervous about, emphasizing comfort',
      durationSec: 12,
      clinicalVisualCategory: 'procedure-walkthrough',
      clinicalVisualDirection:
        'Soft camera/device traveling a simplified colon pathway as a glowing guided dot',
      realWorldConceptShown:
        'A flexible camera gently following a simplified colon path during a colonoscopy',
      safeMedicalVisualStyle:
        'Abstracted light-trail walkthrough, comfort-emphasized, never clinical close-up',
      patientPersonalization:
        'Reassures the specific fear that the procedure is difficult by stressing comfort medicine',
      assetSearchTerms: ['endoscope path animation', 'glowing dot travel line', 'gentle medical walkthrough'],
      codedAnimationIdea:
        'Framer Motion: a circle follows an SVG <path> via offset-path; trailing gradient stroke draws behind it',
      avoidShowing: ['real colonoscopy footage', 'invasive close-ups', 'blood', 'frightening internal views'],
    },
    {
      sceneTitle: 'There’s more than one option',
      narration:
        "Here's something a lot of people don't realize: for some situations there's also an at-home stool test kit you can do without travel. We're not telling you which to pick — that's a conversation for you and your clinician — but it's good to know both exist.",
      onScreenText: 'More than one way',
      visualType: 'comparison',
      motionDirection: 'Two clean option panels slide in side by side, balanced and equal',
      transition: 'Panels merge into a single question-prep card',
      iconName: 'FlaskConical',
      lottieSearchKeyword: 'at home test kit box',
      customAnimationIdea:
        'A tidy mailed kit box opens softly to show a simple collection tube, sitting beside a clinic-visit icon',
      backgroundStyle: 'Light dual-panel layout on a calm slate background',
      safetyBoundary: 'Presents options neutrally — never recommends which one to choose',
      personalizationReason:
        'Highlights a travel-friendly alternative that fits James’s frequent-flyer life',
      durationSec: 11,
      clinicalVisualCategory: 'medical-device',
      clinicalVisualDirection:
        'Clean at-home stool test kit shown as a tidy device/box, neutral and unintimidating',
      realWorldConceptShown:
        'An at-home stool test kit exists as one option to discuss alongside in-clinic screening',
      safeMedicalVisualStyle:
        'Product-clean, neutral lighting, no biological samples or graphic content',
      patientPersonalization:
        'Surfaces a no-travel option that suits a project manager who is constantly on the road',
      assetSearchTerms: ['at home test kit', 'mail order health kit', 'clean medical device icon'],
      codedAnimationIdea:
        'Two cards animate in from opposite sides; kit box lid lifts with a spring; no “winner” highlight on either',
      avoidShowing: ['stool or biological samples', 'recommending one option as better', 'graphic kit contents'],
    },
    {
      sceneTitle: 'Questions worth asking',
      narration:
        "Before your visit, it can help to jot a few things down. Which option fits my schedule? What's the prep actually like? How long does it take? Bring these and you'll get the most out of your time.",
      onScreenText: 'Questions to bring',
      visualType: 'question-list',
      motionDirection: 'Checklist items tick in one by one from top to bottom',
      transition: 'List slides up, revealing the scheduling card',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'checklist tick animation',
      customAnimationIdea:
        'Each question line writes on, then a soft check pops beside it with a tiny bounce',
      backgroundStyle: 'Calm paper-card on muted teal with subtle grain',
      safetyBoundary: 'Prompts discussion — gives no medical answers itself',
      personalizationReason:
        'Front-loads schedule-fit questions because James keeps postponing due to travel',
      durationSec: 10,
      patientPersonalization:
        'Leads with “which option fits my schedule” to address his postponing-due-to-travel pattern',
      assetSearchTerms: ['question checklist ui', 'writing on list animation', 'note card prep'],
      codedAnimationIdea:
        'Staggered list items (y:10→0, opacity), check icons scale 0→1 with spring after each line settles',
      avoidShowing: ['answers to the questions', 'clinical recommendations', 'overwhelming long lists'],
    },
    {
      sceneTitle: 'Let’s find a time that works',
      narration:
        "When you're ready, your care team can help you pick the screening that fits around your trips and book it in a couple of minutes. No rush — just reply or tap to start the conversation whenever it suits you.",
      onScreenText: 'Talk to your care team',
      visualType: 'portal-mockup',
      motionDirection: 'Phone mockup rises, calendar highlights an open slot',
      transition: 'Mockup settles, fades toward the closing card',
      iconName: 'CalendarClock',
      lottieSearchKeyword: 'schedule appointment calendar',
      customAnimationIdea:
        'A portal screen shows a “Reply to schedule” button with a gentle pulse and an available date glowing',
      backgroundStyle: 'Soft navy with a floating device frame and warm key light',
      safetyBoundary: 'Encourages a care-team conversation, not self-directed care',
      personalizationReason:
        'Frames booking around fitting his trips, lowering the friction that makes him postpone',
      durationSec: 9,
      patientPersonalization:
        'Offers to book around his travel and stresses it only takes a couple of minutes',
      assetSearchTerms: ['appointment booking ui', 'calendar slot highlight', 'reply to schedule button'],
      codedAnimationIdea:
        'Phone frame springs up; CTA button pulses (scale 1↔1.04); a calendar cell glows with an animated ring',
      avoidShowing: ['urgent countdowns', 'pressure tactics', 'fake clinical deadlines'],
    },
    {
      sceneTitle: 'A gentle reminder',
      narration:
        "This video is here to help you understand your options, James — it isn't medical advice and it can't tell you which choice is right for you. Your care team is the best place for that. Thanks for taking a few minutes for your health.",
      onScreenText: 'For education only',
      visualType: 'closing-card',
      motionDirection: 'Text settles center, soft fade to a calm hold',
      transition: 'Slow fade to brand mark',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'calm closing checkmark',
      customAnimationIdea:
        'Disclaimer fades in over a slow-breathing shield; a small synthetic-demo badge appears in the corner',
      backgroundStyle: 'Deep navy gradient, minimal, restful',
      safetyBoundary: 'Explicit education-only disclaimer; no recommendation of any option',
      personalizationReason:
        'Closes warmly by name and reinforces the care team as the decision place',
      durationSec: 8,
      patientPersonalization:
        'Signs off using James’s name and thanks him for making time despite a packed schedule',
      assetSearchTerms: ['education disclaimer card', 'calm closing animation', 'soft brand outro'],
      codedAnimationIdea:
        'Disclaimer text fades up; shield breathes; corner “synthetic demo” badge eases in last',
      avoidShowing: ['any screening recommendation', 'risk prediction', 'medical advice'],
    },
  ],

  /* ===================================================================== */
  /* 2) CHRONIC CARE FOLLOW-UP — Sarah, 47, night-shift, guarded           */
  /* ===================================================================== */
  'chronic-care-followup': [
    {
      sceneTitle: 'Hi, Sarah',
      narration:
        "Hi Sarah, it's your care team. We know you're working night shifts and that days and nights can blur together. This is a short, judgment-free check-in — just us, walking through your follow-up together at your pace.",
      onScreenText: 'Hi Sarah — no judgment here.',
      visualType: 'title-card',
      motionDirection: 'Name fades up over a calm moonlit gradient',
      transition: 'Cross-dissolve into a warm acknowledgment scene',
      iconName: 'HeartPulse',
      lottieSearchKeyword: 'calm night welcome',
      customAnimationIdea:
        'Name appears over a soft night-sky gradient with a gentle pulse line drifting beneath it',
      backgroundStyle: 'Deep indigo night gradient with faint stars and a warm glow',
      safetyBoundary: 'Education only — supportive, never judgmental or diagnostic',
      personalizationReason:
        'Greets by name and names her night-shift reality up front to build trust',
      durationSec: 9,
      patientPersonalization:
        'Acknowledges Sarah’s overnight schedule and signals a judgment-free tone deliberately',
      assetSearchTerms: ['night gradient intro', 'calm welcome animation', 'soft pulse line'],
      codedAnimationIdea:
        'Name staggers up; a faint ECG-style line drifts left→right at low opacity behind it',
      avoidShowing: ['clinical scolding tone', 'numbers about her', 'alarming language'],
    },
    {
      sceneTitle: 'You deserve to feel respected',
      narration:
        "We also want to say something plainly: past visits may not always have felt great, and you should feel respected here. This is your space. We're on your team, and we're glad you came back.",
      onScreenText: '“I’ve felt judged before.”',
      visualType: 'quote-card',
      motionDirection: 'Quote rises, then a warm reassurance line fades in below',
      transition: 'Quote dims gently into the sample-collection scene',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'supportive conversation',
      customAnimationIdea:
        'A speech bubble appears, then a soft heart-outline draws around the reassurance text',
      backgroundStyle: 'Muted indigo with a single warm spotlight',
      safetyBoundary: 'Validates feelings without clinical claims or guilt',
      personalizationReason:
        'Directly addresses Sarah’s past experience of feeling judged in visits',
      durationSec: 10,
      patientPersonalization:
        'Names her history of feeling judged and reframes the visit as a respectful, shared space',
      assetSearchTerms: ['supportive quote card', 'warm reassurance ui', 'speech bubble animation'],
      codedAnimationIdea:
        'Quote eases in (y:20→0); SVG heart outline path-draws around the reassurance line',
      avoidShowing: ['blame language', 'lifestyle shaming', 'clinical finger-pointing'],
    },
    {
      sceneTitle: 'What a follow-up blood sample looks like',
      narration:
        "Part of your follow-up may include a simple blood sample. It's quick — a small vial fills, and that's it. We're showing you here so nothing feels like a surprise when you come in.",
      onScreenText: 'A small, simple sample',
      visualType: 'comparison',
      motionDirection: 'Slow push-in on a calm vial gently filling',
      transition: 'Vial softens out, dissolving into the bloodstream scene',
      iconName: 'Droplets',
      lottieSearchKeyword: 'blood sample vial filling calm',
      customAnimationIdea:
        'A clean tube fills with a soft liquid gradient, a gentle level line rising, no needle detail',
      backgroundStyle: 'Calm slate background with soft clinical lighting',
      safetyBoundary: 'Calm, non-graphic sample visual — no needle entering skin',
      personalizationReason:
        'Removes surprise for a guarded patient by showing the step ahead of time',
      durationSec: 11,
      clinicalVisualCategory: 'sample-collection',
      clinicalVisualDirection:
        'A calm blood-sample vial filling with a soft gradient liquid, no needle-in-skin detail',
      realWorldConceptShown:
        'A routine follow-up blood sample is small, quick, and undramatic',
      safeMedicalVisualStyle:
        'Clean, soft-lit, abstracted sample visual — clinical-friendly, never graphic',
      patientPersonalization:
        'Pre-walks the blood draw so a guarded patient feels prepared, not ambushed',
      assetSearchTerms: ['blood vial filling animation', 'calm lab sample', 'test tube fill ui'],
      codedAnimationIdea:
        'SVG vial with an animated liquid <rect> mask rising; soft glow; no skin or needle insertion shown',
      avoidShowing: ['needle entering skin', 'blood spatter', 'graphic phlebotomy close-ups'],
    },
    {
      sceneTitle: 'What A1C generally means',
      narration:
        "One thing your team may talk about is A1C. In general, think of it as your average blood sugar over the past few months — a wide view rather than a single moment. We won't read your number here; that's a conversation for you and your clinician.",
      onScreenText: 'A few months’ average — in general',
      visualType: 'comparison',
      motionDirection: 'Gentle drift of cells and small dots flowing left to right',
      transition: 'Flow eases out into the night-shift prep scene',
      iconName: 'Activity',
      lottieSearchKeyword: 'blood cells flowing vessel',
      customAnimationIdea:
        'Soft red blood-cell shapes drift through a simplified vessel with tiny glucose dots among them',
      backgroundStyle: 'Warm-dark vessel cross-section with a soft inner glow',
      safetyBoundary: 'General concept only — never interprets Sarah’s actual A1C',
      personalizationReason:
        'Explains A1C plainly without judgment or a “good/bad” verdict for her',
      durationSec: 12,
      clinicalVisualCategory: 'cellular-flow',
      clinicalVisualDirection:
        'Simplified red blood cells plus small glucose dots drifting through a vessel, framed as a months-long average',
      realWorldConceptShown:
        'A1C as a general idea of average blood sugar over the past few months',
      safeMedicalVisualStyle:
        'Stylized, friendly cellular flow — illustrative, never a result reading',
      patientPersonalization:
        'Frames A1C generally and explicitly declines to interpret her own number',
      assetSearchTerms: ['red blood cells animation', 'glucose in bloodstream', 'simplified vessel flow'],
      codedAnimationIdea:
        'Multiple cell SVGs translate along a curved path with slight rotation; glucose dots drift at varied speeds',
      avoidShowing: ['Sarah’s actual A1C value', 'a good/bad threshold for her', 'any number-based verdict'],
    },
    {
      sceneTitle: 'Built around your nights',
      narration:
        "Because you work overnight, let's make this easy. If you need a morning slot after a shift, or a reminder that lands during your awake hours, just say so — we'll plan your prep and timing around your sleep, not against it.",
      onScreenText: 'Planned around your shifts',
      visualType: 'checklist',
      motionDirection: 'A day/night clock dial rotates to highlight an after-shift window',
      transition: 'Clock fades into the question-list scene',
      iconName: 'CalendarClock',
      lottieSearchKeyword: 'day night schedule clock',
      customAnimationIdea:
        'A clock face shades from night to day as a highlighted “after your shift” window glows',
      backgroundStyle: 'Indigo-to-amber gradient suggesting night turning to morning',
      safetyBoundary: 'Logistics support only — no medical timing instructions',
      personalizationReason:
        'Plans prep and reminders around her overnight schedule and sleep',
      durationSec: 10,
      patientPersonalization:
        'Offers after-shift slots and awake-hours reminders specific to night-shift life',
      assetSearchTerms: ['day night clock animation', 'shift schedule ui', 'reminder window highlight'],
      codedAnimationIdea:
        'SVG clock with a rotating sweep; a highlighted arc fades in over the “after-shift” hours',
      avoidShowing: ['fasting medical instructions', 'medication timing advice', 'rigid clinical schedules'],
    },
    {
      sceneTitle: 'Questions to bring',
      narration:
        "When we meet, you might ask: What does my follow-up look like? How does my schedule affect timing? What small things are within my control? No question is too small — bring whatever's on your mind.",
      onScreenText: 'Questions to bring',
      visualType: 'question-list',
      motionDirection: 'Questions write on one at a time, left aligned',
      transition: 'List lifts into the scheduling/next-step scene',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'checklist write on',
      customAnimationIdea:
        'Each question types in with a soft cursor, then a gentle dot marker appears beside it',
      backgroundStyle: 'Calm card on muted indigo with subtle grain',
      safetyBoundary: 'Encourages dialogue — provides no medical answers',
      personalizationReason:
        'Invites a guarded patient to ask freely and includes a schedule-impact question',
      durationSec: 10,
      patientPersonalization:
        'Explicitly says no question is too small to ease a patient who has felt judged',
      assetSearchTerms: ['question list animation', 'typing on list ui', 'prep questions card'],
      codedAnimationIdea:
        'Typewriter effect per line; marker dots scale 0→1 after each line completes',
      avoidShowing: ['answers to the questions', 'a target A1C number', 'medication guidance'],
    },
    {
      sceneTitle: 'We’re here when you’re ready',
      narration:
        "When it works for you, your care team can set up your follow-up and a check-in. Reply or tap whenever — even at 3am after a shift — and someone will help. We're glad you're here, Sarah.",
      onScreenText: 'Reach your care team anytime',
      visualType: 'portal-mockup',
      motionDirection: 'Portal screen rises with a soft “message sent” confirmation',
      transition: 'Mockup fades toward the closing card',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'send message confirmation',
      customAnimationIdea:
        'A portal compose box shows a sent check with a 3am timestamp to underline “anytime”',
      backgroundStyle: 'Soft indigo with a floating device frame and warm key light',
      safetyBoundary: 'Routes to the care team — no self-directed care',
      personalizationReason:
        'Reassures she can reach out even at off-hours after a night shift',
      durationSec: 9,
      patientPersonalization:
        'Uses a 3am-after-a-shift example so off-hours outreach feels genuinely welcome',
      assetSearchTerms: ['message sent ui', 'portal compose animation', 'late night timestamp'],
      codedAnimationIdea:
        'Compose box springs up; a check mark draws in; a subtle “3:00 AM” label fades beneath',
      avoidShowing: ['pressure to respond immediately', 'guilt language', 'urgency framing'],
    },
    {
      sceneTitle: 'A gentle reminder',
      narration:
        "This video is for learning and support only — it can't read your results or tell you what's right for you, and nothing here changes any medication. Your care team is your guide for all of that. Take care of yourself, Sarah.",
      onScreenText: 'For education only',
      visualType: 'closing-card',
      motionDirection: 'Disclaimer settles center over a calm hold',
      transition: 'Slow fade to brand mark',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'calm closing shield',
      customAnimationIdea:
        'Disclaimer fades over a slow-breathing shield; a synthetic-demo badge appears in the corner',
      backgroundStyle: 'Deep indigo gradient, minimal and restful',
      safetyBoundary: 'Explicit education-only disclaimer; no result reading or med change',
      personalizationReason:
        'Closes warmly by name and reinforces the care team as her guide',
      durationSec: 8,
      patientPersonalization:
        'Signs off by name with a self-care wish suited to her demanding routine',
      assetSearchTerms: ['education disclaimer card', 'calm shield outro', 'soft brand close'],
      codedAnimationIdea:
        'Disclaimer text fades up; shield breathes; corner badge eases in last',
      avoidShowing: ['result interpretation', 'medication change', 'a good/bad number for her'],
    },
  ],

  /* ===================================================================== */
  /* 3) CLINICAL TRIAL EDUCATION — Maria, 61, daughter helps decide        */
  /* ===================================================================== */
  'clinical-trial-education': [
    {
      sceneTitle: 'Hi, Maria',
      narration:
        "Hi Maria, it's your care team. We know you like to talk things through with your daughter before deciding anything important, and that's a wonderful way to do it. This short video is just to explain what a clinical trial actually is — no pressure at all.",
      onScreenText: 'Hi Maria — let’s explain, gently.',
      visualType: 'title-card',
      motionDirection: 'Name fades up over a soft, warm gradient',
      transition: 'Cross-dissolve into a worry-acknowledgment scene',
      iconName: 'Sparkles',
      lottieSearchKeyword: 'warm gentle welcome',
      customAnimationIdea:
        'Name settles in, then a small sparkle drifts beside it on a soft loop',
      backgroundStyle: 'Warm teal-to-cream gradient with gentle light motes',
      safetyBoundary: 'Education only — never implies eligibility or recommends enrolling',
      personalizationReason:
        'Greets by name and honors her habit of deciding with her daughter',
      durationSec: 9,
      patientPersonalization:
        'Acknowledges that Maria decides with her daughter and sets a no-pressure tone',
      assetSearchTerms: ['warm welcome animation', 'soft gradient intro', 'gentle sparkle ui'],
      codedAnimationIdea:
        'Name staggers in; a sparkle SVG drifts and twinkles (opacity loop) beside the title',
      avoidShowing: ['enrollment pressure', 'eligibility claims', 'clinical jargon'],
    },
    {
      sceneTitle: 'It’s not what you might fear',
      narration:
        "Many people hear the word 'trial' and worry it means being experimented on. That's such a common feeling — and it's worth clearing up. A clinical trial is a carefully watched, voluntary study, with rules built entirely around your safety and choice.",
      onScreenText: '“Does ‘trial’ mean experiment?”',
      visualType: 'quote-card',
      motionDirection: 'Worry quote appears, then a calm clarification fades in beneath',
      transition: 'Quote dims into the research-visit timeline',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'reassurance shield safety',
      customAnimationIdea:
        'The worry quote softens as a protective shield outline draws around the reassuring line',
      backgroundStyle: 'Muted teal with a single warm spotlight on the quote',
      safetyBoundary: 'Reassures generally about safety/voluntariness; no enrollment nudge',
      personalizationReason:
        'Names Maria’s specific fear of being “experimented on” and gently reframes it',
      durationSec: 11,
      patientPersonalization:
        'Reflects her exact worry that a trial means being experimented on, then reassures',
      assetSearchTerms: ['safety reassurance card', 'voluntary study ui', 'shield outline animation'],
      codedAnimationIdea:
        'Quote eases in; SVG shield path-draws around the clarifying text; soft glow pulse',
      avoidShowing: ['scary lab imagery', 'human-subject fear tropes', 'eligibility hints'],
    },
    {
      sceneTitle: 'What a study visit can look like',
      narration:
        "Here's a friendly map of how a study can flow: a first conversation, some check-ins, and follow-ups — all on a clear schedule. Notice the badge: participation is voluntary, every single step of the way.",
      onScreenText: 'Voluntary at every step',
      visualType: 'journey-timeline',
      motionDirection: 'A horizontal timeline draws left to right, nodes lighting in sequence',
      transition: 'Timeline recedes into the walk-through experience scene',
      iconName: 'CalendarClock',
      lottieSearchKeyword: 'study timeline schedule',
      customAnimationIdea:
        'Timeline nodes connect with a drawing line; a “Voluntary participation” badge pulses softly above',
      backgroundStyle: 'Clean cream-on-teal canvas with soft shadows',
      safetyBoundary: 'Illustrative sample schedule only — not Maria’s plan or eligibility',
      personalizationReason:
        'Demystifies the structure for someone who fears the unknown of trials',
      durationSec: 12,
      clinicalVisualCategory: 'research-visit',
      clinicalVisualDirection:
        'A sample study-visit timeline with a voluntary-participation badge and a coordinator conversation cue',
      realWorldConceptShown:
        'A clinical trial follows a clear, scheduled set of voluntary study visits',
      safeMedicalVisualStyle:
        'Friendly timeline graphics with a prominent voluntary badge — calm and clear',
      patientPersonalization:
        'Emphasizes voluntariness repeatedly to ease a patient afraid of being experimented on',
      assetSearchTerms: ['research study timeline', 'voluntary participation badge', 'coordinator conversation icon'],
      codedAnimationIdea:
        'SVG timeline line draws (pathLength 0→1); nodes pop in sequence; badge scales 1↔1.05 loop',
      avoidShowing: ['eligibility implication for Maria', 'scary lab equipment', 'pressure to enroll'],
    },
    {
      sceneTitle: 'Walking through a visit',
      narration:
        "On a typical visit, you'd be greeted, sit down with a coordinator who explains everything in plain language, ask anything you like, and have time to think. You can pause or step back at any point — nothing is ever forced.",
      onScreenText: 'You set the pace',
      visualType: 'comparison',
      motionDirection: 'A calm room scene with friendly step markers appearing in order',
      transition: 'Scene fades into the patient-rights panel',
      iconName: 'Users',
      lottieSearchKeyword: 'calm clinic consultation',
      customAnimationIdea:
        'A simple person figure moves through soft “welcome → explain → ask → decide” step cards',
      backgroundStyle: 'Warm, softly lit room illustration with gentle depth',
      safetyBoundary: 'Describes a general experience, not Maria’s specific participation',
      personalizationReason:
        'Shows the human, conversational reality to counter the “experiment” fear',
      durationSec: 11,
      clinicalVisualCategory: 'patient-experience',
      clinicalVisualDirection:
        'A person walking through a research visit as gentle what-to-expect steps in a calm setting',
      realWorldConceptShown:
        'What attending a research study visit generally feels like, step by step',
      safeMedicalVisualStyle:
        'Warm, human illustration; comfort-forward; no clinical or frightening imagery',
      patientPersonalization:
        'Stresses she can pause or step back, reinforcing control for a hesitant decider',
      assetSearchTerms: ['clinic consultation illustration', 'patient coordinator meeting', 'what to expect steps'],
      codedAnimationIdea:
        'A person SVG slides between step cards; each card fades up as the figure arrives',
      avoidShowing: ['injections or procedures in detail', 'sterile scary labs', 'coercive framing'],
    },
    {
      sceneTitle: 'Your rights, always',
      narration:
        "A few things are always true: you can ask any question, you can take your time, and you can say no or stop at any moment without it affecting your regular care. Those rights belong to you, fully.",
      onScreenText: 'Ask. Pause. Say no. Anytime.',
      visualType: 'checklist',
      motionDirection: 'Rights items tick in one by one with reassuring weight',
      transition: 'List softens into the caregiver-support scene',
      iconName: 'FileText',
      lottieSearchKeyword: 'patient rights checklist',
      customAnimationIdea:
        'Each right appears with a calm check; the phrase “your choice” gently underlines',
      backgroundStyle: 'Calm teal card with subtle paper grain',
      safetyBoundary: 'States general participant rights — not advice to enroll',
      personalizationReason:
        'Empowers a hesitant patient by centering her autonomy and choice',
      durationSec: 10,
      patientPersonalization:
        'Centers Maria’s right to say no without affecting her usual care, easing fear',
      assetSearchTerms: ['patient rights ui', 'voluntary consent checklist', 'your choice animation'],
      codedAnimationIdea:
        'Staggered rights list; checks pop in; “your choice” underline path-draws last',
      avoidShowing: ['fine-print intimidation', 'enrollment encouragement', 'eligibility claims'],
    },
    {
      sceneTitle: 'Bring your daughter',
      narration:
        "And please bring your daughter, Maria. Deciding together is exactly right. We can send her a simple summary too, so you can talk it over at the kitchen table, with all your questions in front of you.",
      onScreenText: 'Decide together',
      visualType: 'caregiver-card',
      motionDirection: 'Two figures lean together as a shared summary card slides in',
      transition: 'Card fades into the next-step scene',
      iconName: 'Users',
      lottieSearchKeyword: 'family support together',
      customAnimationIdea:
        'A summary document slides toward two warm figure silhouettes sitting side by side',
      backgroundStyle: 'Cozy warm gradient with soft home-like lighting',
      safetyBoundary: 'Supports shared decision-making; gives no recommendation',
      personalizationReason:
        'Honors Maria’s reliance on her daughter for important decisions',
      durationSec: 10,
      patientPersonalization:
        'Offers a caregiver summary for her daughter so they can decide together at home',
      assetSearchTerms: ['family decision support', 'caregiver summary card', 'two people talking warm'],
      codedAnimationIdea:
        'Summary card slides in (x:40→0); two silhouette figures fade up close together',
      avoidShowing: ['pressure to enroll', 'eligibility statements', 'clinical fear imagery'],
    },
    {
      sceneTitle: 'When you have questions',
      narration:
        "If you'd like to learn more, your care team can connect you with a study coordinator who'll answer everything — no commitment, just information. Reply or tap whenever you and your daughter are ready.",
      onScreenText: 'Talk to a coordinator',
      visualType: 'portal-mockup',
      motionDirection: 'Portal screen rises with a “request more info” button',
      transition: 'Mockup fades toward the closing card',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'request information button',
      customAnimationIdea:
        'A portal shows a “Learn more — no commitment” button with a gentle pulse',
      backgroundStyle: 'Soft teal with a floating device frame and warm key light',
      safetyBoundary: 'Connects to information only — never an enrollment push',
      personalizationReason:
        'Lets her and her daughter reach out together, on their timeline',
      durationSec: 9,
      patientPersonalization:
        'Frames the next step as info-only and invites her and her daughter together',
      assetSearchTerms: ['learn more button ui', 'request info portal', 'no commitment cta'],
      codedAnimationIdea:
        'Phone frame springs up; “Learn more” button pulses (scale 1↔1.04); subtle “no commitment” caption',
      avoidShowing: ['enroll-now language', 'eligibility implication', 'urgency'],
    },
    {
      sceneTitle: 'A gentle reminder',
      narration:
        "This video explains what trials are in general, Maria — it doesn't mean you qualify for one or that you should join. That's entirely your choice, made with your care team and your daughter. Thank you for letting us explain.",
      onScreenText: 'For education only',
      visualType: 'closing-card',
      motionDirection: 'Disclaimer settles center over a calm hold',
      transition: 'Slow fade to brand mark',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'calm closing shield',
      customAnimationIdea:
        'Disclaimer fades over a slow-breathing shield; a synthetic-demo badge appears in the corner',
      backgroundStyle: 'Warm teal gradient, minimal and restful',
      safetyBoundary: 'Explicit education-only disclaimer; no eligibility or enrollment claim',
      personalizationReason:
        'Closes warmly by name and reaffirms the choice is hers, with her support people',
      durationSec: 8,
      patientPersonalization:
        'Signs off by name and reiterates the decision belongs to her and her daughter',
      assetSearchTerms: ['education disclaimer card', 'calm shield outro', 'soft brand close'],
      codedAnimationIdea:
        'Disclaimer text fades up; shield breathes; corner badge eases in last',
      avoidShowing: ['eligibility claim', 'enrollment recommendation', 'scary lab imagery'],
    },
  ],

  /* ===================================================================== */
  /* 4) POST-DISCHARGE RECOVERY — Robert, 68, lives alone, simple summaries*/
  /* ===================================================================== */
  'medication-journey': [
    {
      sceneTitle: 'Hi, Linda',
      narration:
        "Hi Linda, it's your care team. We know you like to read up and understand the why behind things — that's a real strength. So here's a clear, friendly walkthrough of starting a new medication, made just for you.",
      onScreenText: 'Hi Linda — here’s the why.',
      visualType: 'title-card',
      motionDirection: 'Name fades up over a soft, calm gradient',
      transition: 'Cross-dissolve into the concerns scene',
      iconName: 'Pill',
      lottieSearchKeyword: 'calm welcome medication',
      customAnimationIdea:
        'Name settles in, then a soft pill icon rises gently beneath it',
      backgroundStyle: 'Warm blue-to-slate gradient with gentle light',
      safetyBoundary: 'Education only — never tells her to start, stop, or change anything',
      personalizationReason:
        'Greets by name and honors her habit of wanting to understand the “why”',
      durationSec: 9,
      patientPersonalization:
        'Acknowledges that Linda reads up and wants to understand reasons, framing it as a strength',
      assetSearchTerms: ['welcome animation calm', 'soft gradient intro', 'pill icon ui'],
      codedAnimationIdea:
        'Name staggers up; a pill SVG eases up (y:16→0) with a soft settle',
      avoidShowing: ['medication change instructions', 'fear messaging', 'clinical jargon'],
    },
    {
      sceneTitle: 'It’s normal to wonder',
      narration:
        "It's completely normal to read things online and feel tempted to stop if something feels strange. We get it. The most helpful move, though, is to bring those feelings to us first — so let's make that easy and clear.",
      onScreenText: '“Should I just stop?”',
      visualType: 'quote-card',
      motionDirection: 'Worry quote rises, a calm “talk to us first” line fades in below',
      transition: 'Quote dims into the mechanism scene',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'reassuring conversation bubble',
      customAnimationIdea:
        'A browser-tab motif softens behind the quote as a warm “let’s talk first” line draws in',
      backgroundStyle: 'Muted slate with a warm spotlight on the quote',
      safetyBoundary: 'Validates the impulse; redirects to care team, never endorses stopping',
      personalizationReason:
        'Names Linda’s tendency to read online and feel tempted to stop, without judgment',
      durationSec: 11,
      patientPersonalization:
        'Reflects her specific temptation to stop after reading online and gently redirects',
      assetSearchTerms: ['reassuring quote card', 'browser tabs motif', 'talk to your doctor ui'],
      codedAnimationIdea:
        'Quote eases in; a faint browser-tab SVG fades behind; reassurance line path-draws an underline',
      avoidShowing: ['instructions to stop medication', 'scary side-effect imagery', 'shaming language'],
    },
    {
      sceneTitle: 'The general idea of how it helps',
      narration:
        "Here's the general idea — not a precise claim about your body — of how a medication can work: you take it, and over time it travels through your system to support what your clinician is helping you with. The specifics for you are best explained by your care team.",
      onScreenText: 'A general idea — not a verdict',
      visualType: 'comparison',
      motionDirection: 'A soft pill travels gently into a simplified body outline',
      transition: 'Body outline fades into the routine/organizer scene',
      iconName: 'Activity',
      lottieSearchKeyword: 'pill into body simple',
      customAnimationIdea:
        'A small pill icon drifts down into a clean body silhouette, then a soft glow spreads gently',
      backgroundStyle: 'Calm blue canvas with a simplified body outline and soft glow',
      safetyBoundary: 'General, non-claim explanation only — not a clinical statement about Linda',
      personalizationReason:
        'Feeds her desire to understand the “why” while staying carefully general',
      durationSec: 12,
      clinicalVisualCategory: 'mechanism-of-action',
      clinicalVisualDirection:
        'A pill traveling into a simplified body outline as a GENERAL idea, not a clinical claim',
      realWorldConceptShown:
        'The general notion that medication is taken and works through the body over time',
      safeMedicalVisualStyle:
        'Stylized, abstract body outline; soft motion; clearly general, never diagnostic',
      patientPersonalization:
        'Satisfies her wish to understand mechanism while explicitly labeling it general',
      assetSearchTerms: ['pill traveling body outline', 'medication mechanism simple', 'body silhouette glow'],
      codedAnimationIdea:
        'Pill SVG follows a path into a body-outline; a soft radial glow scales up gently inside the outline',
      avoidShowing: ['exact mechanism stated as fact for her', 'organ-specific clinical claims', 'dosage instructions'],
    },
    {
      sceneTitle: 'Keeping a simple routine',
      narration:
        "Sticking with a medication is easier with a simple system. A weekly pill organizer, a phone reminder, or tying it to something you already do daily — small habits that make it almost automatic. Whatever fits your life works.",
      onScreenText: 'Make it almost automatic',
      visualType: 'checklist',
      motionDirection: 'A pill organizer fills slot by slot across the days of the week',
      transition: 'Organizer fades into the side-effect question scene',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'weekly pill organizer',
      customAnimationIdea:
        'A 7-day organizer fills compartment by compartment; a small reminder bell pings softly at the end',
      backgroundStyle: 'Clean blue card with soft shadows',
      safetyBoundary: 'Routine/adherence support only — no dosing or medical instructions',
      personalizationReason:
        'Gives a methodical reader practical, low-effort systems she can adopt',
      durationSec: 10,
      clinicalVisualCategory: 'medical-device',
      clinicalVisualDirection:
        'A clean pill organizer shown as a simple device for keeping a daily routine',
      realWorldConceptShown:
        'A pill organizer and reminders help keep a consistent medication routine',
      safeMedicalVisualStyle:
        'Product-clean, friendly device; no specific pills, doses, or drug names',
      patientPersonalization:
        'Offers tie-it-to-a-habit systems suited to someone who likes structure and understanding',
      assetSearchTerms: ['weekly pill organizer animation', 'medication reminder app', 'daily habit routine ui'],
      codedAnimationIdea:
        'Organizer compartments fill in sequence (opacity+scale); a bell icon does a small wiggle at the end',
      avoidShowing: ['specific drug names or doses', 'dosing instructions', 'medical timing advice'],
    },
    {
      sceneTitle: 'Questions about side effects',
      narration:
        "If something feels off, that's worth a conversation, not a guess. Helpful questions: Is what I'm feeling expected? What should I watch for? When should I check in? Write down what you notice and bring it to us.",
      onScreenText: 'Questions, not guesses',
      visualType: 'question-list',
      motionDirection: 'Questions write on one by one, left aligned',
      transition: 'List lifts into the “don’t change anything” scene',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'question list write on',
      customAnimationIdea:
        'Each question types in with a soft cursor; a small notebook icon appears to prompt jotting notes',
      backgroundStyle: 'Calm card on muted blue with subtle grain',
      safetyBoundary: 'Prompts a care-team conversation — no medical answers given',
      personalizationReason:
        'Channels her online-research instinct into structured questions for her team',
      durationSec: 10,
      patientPersonalization:
        'Redirects her impulse to self-diagnose online into questions to bring to her clinician',
      assetSearchTerms: ['side effect questions ui', 'notebook prompt animation', 'prep questions card'],
      codedAnimationIdea:
        'Typewriter lines; a notebook SVG fades in beside the list with a small pen tick',
      avoidShowing: ['answers about whether to keep taking it', 'scary side-effect lists', 'self-treatment advice'],
    },
    {
      sceneTitle: 'Please don’t change anything alone',
      narration:
        "This one matters most, Linda: please don't start, stop, or change your medication on your own — even if the internet says something convincing. A quick message to your care team first keeps you safe and lets us help. That's all it takes.",
      onScreenText: 'Don’t start, stop, or change alone',
      visualType: 'quote-card',
      motionDirection: 'A calm, steady emphasis card holds center, then a “message us first” cue appears',
      transition: 'Scene fades into the next-step contact scene',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'safety first reminder',
      customAnimationIdea:
        'A steady shield holds while a soft “Message your care team first” button settles below it',
      backgroundStyle: 'Calm slate with a steady warm spotlight (non-alarming)',
      safetyBoundary: 'Core medication-safety boundary: no self-directed start/stop/change',
      personalizationReason:
        'Directly counters Linda’s temptation to stop based on online reading',
      durationSec: 11,
      patientPersonalization:
        'Explicitly addresses her habit of being swayed by the internet and routes her to the team first',
      assetSearchTerms: ['do not stop medication safety', 'message your doctor first', 'safety shield ui'],
      codedAnimationIdea:
        'Shield holds steady (no alarm pulse); “Message first” button fades up with a soft settle',
      avoidShowing: ['any instruction to change medication', 'fear tactics', 'specific drug guidance'],
    },
    {
      sceneTitle: 'We’re a message away',
      narration:
        "Whenever something comes up — a question, a worry, a strange feeling — reach out. Your care team can answer quickly and adjust things properly if needed. You don't have to figure this out alone, Linda.",
      onScreenText: 'Message your care team',
      visualType: 'portal-mockup',
      motionDirection: 'Portal compose box rises with a friendly send confirmation',
      transition: 'Mockup fades toward the closing card',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'send message care team',
      customAnimationIdea:
        'A portal compose box shows a “Message sent” check with a warm “we’ll reply” note',
      backgroundStyle: 'Soft blue with a floating device frame and warm key light',
      safetyBoundary: 'Routes to the care team — never self-directed medication change',
      personalizationReason:
        'Reassures a self-researching patient that quick expert help is one message away',
      durationSec: 9,
      patientPersonalization:
        'Reinforces reaching the team first for any worry instead of acting on online reading',
      assetSearchTerms: ['message sent ui', 'portal compose animation', 'care team reply note'],
      codedAnimationIdea:
        'Compose box springs up; check mark draws in; “we’ll reply” caption fades beneath',
      avoidShowing: ['self-treatment encouragement', 'urgency pressure', 'specific drug advice'],
    },
    {
      sceneTitle: 'A gentle reminder',
      narration:
        "This video is for understanding only, Linda — it's not medical advice, it can't tell you what's right for your body, and it never replaces your clinician's guidance. When in doubt, message us. Thanks for taking the time to learn.",
      onScreenText: 'For education only',
      visualType: 'closing-card',
      motionDirection: 'Disclaimer settles center over a calm hold',
      transition: 'Slow fade to brand mark',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'calm closing shield',
      customAnimationIdea:
        'Disclaimer fades over a slow-breathing shield; a synthetic-demo badge appears in the corner',
      backgroundStyle: 'Calm blue gradient, minimal and restful',
      safetyBoundary: 'Explicit education-only disclaimer; no start/stop/change of medication',
      personalizationReason:
        'Closes warmly by name and reaffirms the clinician as the source of guidance',
      durationSec: 8,
      patientPersonalization:
        'Signs off by name and thanks a curious patient for taking time to learn safely',
      assetSearchTerms: ['education disclaimer card', 'calm shield outro', 'soft brand close'],
      codedAnimationIdea:
        'Disclaimer text fades up; shield breathes; corner badge eases in last',
      avoidShowing: ['medication change advice', 'personal clinical claims', 'replacement-for-clinician claims'],
    },
  ],

  /* ===================================================================== */
  /* 6) LAB RESULT EXPLANATION — David, 43, anxious when results arrive    */
  /* ===================================================================== */
  'lab-result-explanation': [
    {
      sceneTitle: 'Hi, David',
      narration:
        "Hi David, it's your care team. We know that when a result lands in your portal before you've had a chance to understand it, your mind can jump to the worst. Totally human. Let's slow it down together and make lab results feel less scary.",
      onScreenText: 'Hi David — let’s slow it down.',
      visualType: 'title-card',
      motionDirection: 'Name fades up over a calm, steady gradient',
      transition: 'Cross-dissolve into the concerns scene',
      iconName: 'Microscope',
      lottieSearchKeyword: 'calm welcome lab',
      customAnimationIdea:
        'Name settles in, then a slow steady breathing-line drifts beneath it to set a calm pace',
      backgroundStyle: 'Cool teal-to-slate gradient with gentle light',
      safetyBoundary: 'Education only — never interprets his actual results',
      personalizationReason:
        'Greets by name and names his habit of jumping to worst-case before understanding',
      durationSec: 9,
      patientPersonalization:
        'Acknowledges David’s anxiety when portal results arrive early and sets a calming pace',
      assetSearchTerms: ['calm welcome animation', 'soft gradient intro', 'breathing line ui'],
      codedAnimationIdea:
        'Name staggers up; a slow sine-wave line drifts left→right at low opacity to pace breathing',
      avoidShowing: ['result values', 'alarming language', 'clinical jargon'],
    },
    {
      sceneTitle: 'A number isn’t a diagnosis',
      narration:
        "Here's something calming to hold onto: a single number popping up early is not a diagnosis, and it's not the whole story. Results need context — and that context is exactly what your clinician provides. So a value alone shouldn't carry all your worry.",
      onScreenText: '“I assume the worst.”',
      visualType: 'quote-card',
      motionDirection: 'Worry quote rises, a steady reassurance line fades in below',
      transition: 'Quote dims into the “what this test measures” scene',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'reassuring calm quote',
      customAnimationIdea:
        'A lone number floats anxiously, then a calm “context comes next” card settles around it',
      backgroundStyle: 'Muted slate with a warm spotlight on the quote',
      safetyBoundary: 'Reassures generally; never interprets or judges a value',
      personalizationReason:
        'Names David’s pattern of assuming the worst and gently reframes a lone number',
      durationSec: 11,
      patientPersonalization:
        'Reflects his exact tendency to assume the worst and reframes a single value calmly',
      assetSearchTerms: ['reassuring quote card', 'floating number motif', 'context calm ui'],
      codedAnimationIdea:
        'A number SVG jitters slightly then settles as a calm context card fades around it',
      avoidShowing: ['actual result values', 'good/bad verdicts', 'panic framing'],
    },
    {
      sceneTitle: 'How a sample is collected',
      narration:
        "Let's demystify the basics. Many lab results start with a small blood sample — quick and routine. We're showing it here, gently, so the whole process feels familiar rather than mysterious.",
      onScreenText: 'A small, routine sample',
      visualType: 'comparison',
      motionDirection: 'Slow push-in on a calm vial gently filling',
      transition: 'Vial softens into the lab-machine scene',
      iconName: 'Droplets',
      lottieSearchKeyword: 'blood draw calm vial',
      customAnimationIdea:
        'A clean tube fills with a soft liquid gradient; a gentle level line rises, no needle detail',
      backgroundStyle: 'Calm slate background with soft clinical lighting',
      safetyBoundary: 'Calm, non-graphic sample visual — no needle entering skin',
      personalizationReason:
        'Reduces fear of the unknown for an anxious patient by showing the routine step',
      durationSec: 11,
      clinicalVisualCategory: 'sample-collection',
      clinicalVisualDirection:
        'A calm, non-graphic blood draw shown as a vial gently filling, no needle-in-skin detail',
      realWorldConceptShown:
        'Many lab results begin with a small, routine blood sample',
      safeMedicalVisualStyle:
        'Clean, soft-lit, abstracted sample visual — never graphic',
      patientPersonalization:
        'Frames the draw as routine to lower anxiety for someone who fears the unknown',
      assetSearchTerms: ['blood vial filling calm', 'routine lab sample', 'test tube fill ui'],
      codedAnimationIdea:
        'SVG vial with an animated liquid mask rising; soft glow; no skin or needle insertion shown',
      avoidShowing: ['needle entering skin in detail', 'blood spatter', 'graphic phlebotomy'],
    },
    {
      sceneTitle: 'Inside the lab',
      narration:
        "From there, your sample goes to a lab where careful machines measure it precisely. It's a methodical, well-checked process — designed for accuracy, not surprises. Think of it as quiet, careful science working on your behalf.",
      onScreenText: 'Careful, methodical science',
      visualType: 'comparison',
      motionDirection: 'A calm camera glides past an abstract lab machine with soft indicator lights',
      transition: 'Machine fades into the “what this test measures” scene',
      iconName: 'FlaskConical',
      lottieSearchKeyword: 'lab machine analyzer abstract',
      customAnimationIdea:
        'An abstract analyzer hums with gentle pulsing lights as a soft progress ring completes',
      backgroundStyle: 'Cool slate lab canvas with soft device glow',
      safetyBoundary: 'Abstract process visual — no real results or graphic content',
      personalizationReason:
        'Reframes the lab as careful and reassuring rather than ominous for an anxious patient',
      durationSec: 11,
      clinicalVisualCategory: 'medical-device',
      clinicalVisualDirection:
        'An abstract lab machine/analyzer shown as a clean, methodical device with soft indicators',
      realWorldConceptShown:
        'Lab samples are measured by careful, precise analyzers in a controlled process',
      safeMedicalVisualStyle:
        'Clean, abstract device; calming lights; no result readouts or graphic content',
      patientPersonalization:
        'Casts the lab process as quiet, careful science to soothe worst-case thinking',
      assetSearchTerms: ['lab analyzer animation', 'medical machine abstract', 'process progress ring'],
      codedAnimationIdea:
        'Analyzer SVG with looping soft indicator lights; a progress ring (pathLength 0→1) completes calmly',
      avoidShowing: ['result numbers on the machine', 'alarming readouts', 'graphic samples'],
    },
    {
      sceneTitle: 'What a test generally measures',
      narration:
        "Here's a helpful frame: most lab tests simply measure a level — and then compare it to a general reference range, like checking where a value sits on a wide scale. We're not reading your result here; we're just showing how the picture is built.",
      onScreenText: 'A level on a general scale',
      visualType: 'comparison',
      motionDirection: 'A simple reference-range bar appears with a neutral marker (no value shown)',
      transition: 'Bar fades into the questions-to-ask scene',
      iconName: 'Activity',
      lottieSearchKeyword: 'reference range scale chart',
      customAnimationIdea:
        'A horizontal range bar draws in with a soft “general range” label; a neutral marker rests mid-bar with no number',
      backgroundStyle: 'Clean teal-on-slate canvas with soft shadows',
      safetyBoundary: 'Explains the concept generally — never plots or interprets his value',
      personalizationReason:
        'Gives an anxious patient a calm mental model so a result feels understandable',
      durationSec: 11,
      patientPersonalization:
        'Teaches the general reference-range idea while explicitly declining to read his result',
      assetSearchTerms: ['reference range bar chart', 'general scale ui', 'neutral marker no value'],
      codedAnimationIdea:
        'A range bar <rect> draws left→right; a neutral marker fades in mid-bar with NO number attached',
      avoidShowing: ['David’s actual values', 'good/bad zones tied to him', 'a plotted personal result'],
    },
    {
      sceneTitle: 'Questions to ask',
      narration:
        "When you and your clinician review results together, these help: What does this test measure? What does this mean in my overall picture? Is anything worth a closer look? Bring these and the conversation does the heavy lifting.",
      onScreenText: 'Questions to ask',
      visualType: 'question-list',
      motionDirection: 'Questions write on one at a time, left aligned',
      transition: 'List lifts into the next-step scene',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'question list write on',
      customAnimationIdea:
        'Each question types in with a soft cursor; a small chat icon appears to signal a conversation',
      backgroundStyle: 'Calm card on muted teal with subtle grain',
      safetyBoundary: 'Prompts a care-team conversation — gives no interpretations',
      personalizationReason:
        'Turns anxious anticipation into a productive plan for his next conversation',
      durationSec: 10,
      patientPersonalization:
        'Replaces David’s worst-case spiraling with concrete questions for his clinician',
      assetSearchTerms: ['questions to ask ui', 'typing list animation', 'conversation prep card'],
      codedAnimationIdea:
        'Typewriter lines; a chat-bubble SVG fades in beside the list after the last line',
      avoidShowing: ['answers or interpretations', 'value-based verdicts', 'self-diagnosis prompts'],
    },
    {
      sceneTitle: 'Review it together',
      narration:
        "So next time a result arrives early, take a breath — and let's look at it together. Your care team can walk you through what it means in context. Reply or tap to set up a quick review whenever you'd like.",
      onScreenText: 'Review results together',
      visualType: 'portal-mockup',
      motionDirection: 'A portal result-report card appears, then a “discuss with my team” button settles',
      transition: 'Mockup fades toward the closing card',
      iconName: 'FileText',
      lottieSearchKeyword: 'review results with doctor',
      customAnimationIdea:
        'A neutral result-report card (rows present, values blurred/abstracted) sits behind a calm “Discuss with my team” button',
      backgroundStyle: 'Soft teal with a floating device frame and warm key light',
      safetyBoundary: 'Routes to the care team for context — no self-interpretation',
      personalizationReason:
        'Gives the anxious early-reader a clear, calming next action: review together',
      durationSec: 9,
      patientPersonalization:
        'Directly answers his early-result anxiety with a “breathe, then review together” next step',
      assetSearchTerms: ['result report card ui', 'discuss with doctor button', 'portal review animation'],
      codedAnimationIdea:
        'A report card fades up with abstracted/blurred value cells; a “Discuss with my team” button settles in front',
      avoidShowing: ['readable result values', 'interpretation of any value', 'good/bad highlighting'],
    },
    {
      sceneTitle: 'A gentle reminder',
      narration:
        "This video explains how lab results generally work, David — it can't read or interpret your specific results, and it never replaces your clinician. When a result lands early, breathe, and bring it to us. Thanks for taking a moment to learn.",
      onScreenText: 'For education only',
      visualType: 'closing-card',
      motionDirection: 'Disclaimer settles center over a calm hold',
      transition: 'Slow fade to brand mark',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'calm closing shield',
      customAnimationIdea:
        'Disclaimer fades over a slow-breathing shield; a synthetic-demo badge appears in the corner',
      backgroundStyle: 'Cool teal gradient, minimal and restful',
      safetyBoundary: 'Explicit education-only disclaimer; never interprets his results',
      personalizationReason:
        'Closes warmly by name and reaffirms the clinician as the interpreter of results',
      durationSec: 8,
      patientPersonalization:
        'Signs off by name with a “breathe, then bring it to us” message tuned to his anxiety',
      assetSearchTerms: ['education disclaimer card', 'calm shield outro', 'soft brand close'],
      codedAnimationIdea:
        'Disclaimer text fades up; shield breathes; corner badge eases in last',
      avoidShowing: ['result interpretation', 'good/bad-for-him framing', 'replacement-for-clinician claims'],
    },
  ],
};
