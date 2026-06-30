/**
 * Opera AI × Truveta — Asset-backed clinical/treatment visual plan.
 *
 * Each entry describes a REAL, non-graphic clinical/education visual that should
 * appear in a patient's personalized education video. When the actual asset is
 * missing, the app renders a polished asset slot showing the exact generation
 * prompt below — never fake abstract medical art.
 *
 * Hard product boundary, encoded in every prompt and description: education and
 * communication only. Nothing here interprets a patient's result, recommends an
 * option, changes medication, implies trial eligibility, or shows graphic imagery.
 */

import type { TreatmentAssetEntry } from './types';

/** useCaseId -> public folder under /public/medical-assets/. */
export const assetFolderByUseCase: Record<string, string> = {
  'preventive-screening': 'colon-screening',
  'chronic-care-followup': 'diabetes-a1c',
  'clinical-trial-education': 'clinical-trials',
  'post-discharge-recovery': 'discharge',
  'medication-journey': 'medication',
  'lab-result-explanation': 'labs',
  'prenatal-visit-prep': 'prenatal',
  'language-access': 'blood-pressure',
  'procedure-prep': 'colonoscopy-prep',
  'genomics-consent': 'genomics',
  'caregiver-education': 'caregiver',
  'health-equity-transport': 'care-navigation',
};

/** Shared style anchor reused across prompts to keep the look consistent. */
const STYLE =
  'Premium cinematic medical education visual, realistic 3D/2D hybrid or high-quality ' +
  'medical render, treatment-specific, close-up where useful, clean clinical lighting, ' +
  'sharp detail, blue/teal highlight overlays, patient-education tone, 16:9 composition, ' +
  'room for captions and labels, no logos, no readable PHI. Mayo/Cleveland Clinic patient ' +
  'education aesthetic, deep navy background, calm and reassuring, non-graphic, no gore, ' +
  'no blood, no open surgery, no invasive close-ups, no needles entering skin in detail, ' +
  'no frightening internal imagery';

export const treatmentVisualAssetPlan: TreatmentAssetEntry[] = [
  /* ============================ 1. preventive-screening ====================== */
  {
    assetId: 'preventive-screening-1',
    useCaseId: 'preventive-screening',
    sceneNumber: 1,
    recommendedFileName: 'colon-anatomy-overview.mp4',
    assetType: 'medical-render',
    closeupLevel: 'wide',
    visualDescription:
      'A clean, simplified 3D render of the large intestine (colon) floating in soft studio light, smooth and stylized rather than anatomically graphic.',
    whatPatientLearns:
      'A colonoscopy looks at the inside lining of the colon — a screening is simply a careful look.',
    exactImageGenerationPrompt:
      `Simplified, stylized 3D medical render of the human large intestine (colon) shown as a smooth, clean, friendly anatomical model floating in space, gentle teal-to-cyan gradient on the organ surface. ${STYLE}. Wide composition, organ centered with generous negative space, subtle soft shadow beneath it, faint anatomical labels for ascending, transverse, and descending colon. Mood: calm, demystifying, approachable. Not a realistic dissected organ — a polished educational model.`,
    exactVideoGenerationPrompt:
      `Slow 6-second orbit around a simplified, clean 3D model of the colon floating in soft studio light, gentle teal rim lighting, very calm camera drift, organ slowly rotating to reveal its shape. ${STYLE}. Smooth, reassuring motion, no zooming inside, no graphic detail. Subtle particle bokeh on a deep navy background.`,
    stockSearchTerms: [
      'colon anatomy 3d illustration medical',
      'large intestine digestive system render',
      'colorectal screening education graphic',
      'human colon medical animation calm',
      'digestive tract anatomy clean illustration',
      'colonoscopy patient education visual',
    ],
    overlayLabels: [
      { text: 'Colon', x: 50, y: 46 },
      { text: 'Inner lining', x: 64, y: 58 },
    ],
    animationTreatment:
      'Slow Ken Burns zoom-in toward the colon, then labels fade in sequentially with a soft glow pulse on the highlighted lining.',
    personalizationOverlay:
      'Because you travel for work, James, here is exactly what a screening looks at — in plain terms.',
    voiceover:
      "Let's start with a simple look. This is your colon — the lower part of your digestive system. A screening is really just a careful, early look inside it.",
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'preventive-screening-2',
    useCaseId: 'preventive-screening',
    sceneNumber: 2,
    recommendedFileName: 'colonoscope-tip-closeup.mp4',
    assetType: 'medical-render',
    closeupLevel: 'close-up',
    visualDescription:
      'A clean close-up render of the slender, flexible colonoscope tip with its soft camera light and lens, presented as a friendly, non-threatening device.',
    whatPatientLearns:
      'The tool is a slim, flexible tube with a tiny soft-lit camera on the end — gentle, not sharp.',
    exactImageGenerationPrompt:
      `Clean close-up product-style medical render of the tip of a flexible colonoscope: a slender, smooth, rounded camera head with a gently glowing teal light and small lens, soft brushed surfaces, floating in soft studio light. ${STYLE}. Close-up composition, premium device photography feel, shallow depth of field, friendly and reassuring rather than clinical or scary. Mood: gentle, modern, demystifying. Device only — no body, no tissue, nothing graphic.`,
    exactVideoGenerationPrompt:
      `6-second slow push-in on the tip of a flexible colonoscope with a softly glowing camera light, gentle rotation revealing its smooth rounded form, calm teal accent light. ${STYLE}. Soft, reassuring motion; device only; nothing graphic or alarming.`,
    stockSearchTerms: [
      'colonoscope camera tip render',
      'endoscope device close up medical',
      'flexible endoscopy instrument photo',
      'colonoscopy scope equipment clean',
      'medical camera probe render',
      'endoscopy device studio lighting',
    ],
    overlayLabels: [
      { text: 'Soft camera light', x: 56, y: 38 },
      { text: 'Flexible tip', x: 36, y: 64 },
    ],
    animationTreatment:
      'Slow push-in with gentle rotation; the "soft camera light" callout fades in with a glow pulse on the lens.',
    personalizationOverlay:
      'No surprises, James — this is the small, gentle camera your care team uses while you rest.',
    voiceover:
      'The camera itself is small and soft-tipped — a slim, flexible tube with a gentle light at the end. Nothing sharp, nothing rigid. This is the whole tool.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'preventive-screening-3',
    useCaseId: 'preventive-screening',
    sceneNumber: 3,
    recommendedFileName: 'scope-pathway-through-colon.mp4',
    assetType: 'short-motion-video',
    closeupLevel: 'medium',
    visualDescription:
      'A non-graphic motion concept of a soft camera light traveling smoothly along a stylized teal-lit colon passage, conveying the gentle forward path of the scope.',
    whatPatientLearns:
      'A tiny camera gently travels along the colon so the care team can look closely at the lining.',
    exactImageGenerationPrompt:
      `Illustrative, non-graphic educational concept of a soft glowing camera light moving smoothly through a clean, stylized colon passage, the tunnel rendered as a calm teal-lit tube, sense of gentle forward travel, soft depth-of-field. ${STYLE}. Medium composition. Absolutely not graphic — a friendly diagram-like render, no realistic tissue, no blood, no redness.`,
    exactVideoGenerationPrompt:
      `7-second smooth forward glide through a clean, stylized colon passage lit with calm teal light, soft glowing point of light leading the way, gentle continuous forward dolly. ${STYLE}. Gentle, reassuring, dreamlike motion; nothing graphic or alarming; soft particles drifting.`,
    stockSearchTerms: [
      'colonoscopy camera path animation',
      'endoscopy forward travel concept',
      'inside colon stylized render motion',
      'gastrointestinal camera concept video',
      'colon passage animation non graphic',
      'endoscope journey medical explainer',
    ],
    overlayLabels: [
      { text: 'Gentle forward path', x: 40, y: 26 },
      { text: 'Camera light', x: 30, y: 56 },
    ],
    animationTreatment:
      'Continuous forward dolly through the passage; the "gentle forward path" caption fades in with a soft trailing light.',
    personalizationOverlay:
      'It moves slowly and gently, James — there is nothing for you to do but relax.',
    voiceover:
      'During the screening, that little camera is guided slowly and gently along the colon, so your care team can see the lining clearly and comfortably.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'preventive-screening-3b',
    useCaseId: 'preventive-screening',
    sceneNumber: 3,
    recommendedFileName: 'colon-pov-glide.mp4',
    assetType: 'short-motion-video',
    closeupLevel: 'macro',
    visualDescription:
      'A realistic first-person colonoscopy camera view gliding smoothly through a healthy colon lumen — glistening mucosa, soft folds, the bright ring light leading the way.',
    whatPatientLearns:
      'This is the kind of view your care team sees — a smooth, careful look at healthy tissue while you rest.',
    exactImageGenerationPrompt:
      `Hyper-realistic first-person colonoscopy camera view as seen on a clinical monitor: a slightly fisheye wide-angle lens looking down a healthy colon lumen, glistening pink-to-salmon mucosa with fine surface vasculature, soft concentric haustral folds, moist specular highlights from the endoscope ring light, the tunnel receding into soft darkness. ${STYLE}. A subtle teal live-feed UI corner frame. Realistic, calm, educational — a normal healthy wall, no polyp or abnormality.`,
    exactVideoGenerationPrompt:
      `8-second hyper-realistic first-person colonoscopy POV gliding slowly and smoothly forward through a healthy colon lumen, soft folds parting as it advances around a gentle curve, the bright ring light brightening the near wall and falling into darkness ahead, glistening moist mucosa with fine vasculature, slight organic camera sway, subtle teal live-feed UI corner. ${STYLE}. Healthy tissue only — no polyp.`,
    stockSearchTerms: [
      'colonoscopy camera view footage',
      'endoscopy pov colon lumen',
      'inside healthy colon real footage',
      'colon mucosa endoscope view',
      'gastrointestinal endoscopy first person',
      'colonoscopy monitor view glide',
    ],
    overlayLabels: [
      { text: 'Healthy lining', x: 50, y: 44 },
      { text: 'Live camera view', x: 30, y: 22 },
    ],
    animationTreatment:
      'Continuous slow forward glide; the "healthy lining" callout fades in with a soft pulse as folds pass.',
    personalizationOverlay:
      "You're resting comfortably the whole time, James — this is simply your team taking a careful look.",
    voiceover:
      "This is the kind of view your care team sees — smooth, healthy tissue, looked over carefully, inch by inch. You're resting comfortably the whole time.",
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'preventive-screening-4',
    useCaseId: 'preventive-screening',
    sceneNumber: 4,
    recommendedFileName: 'polyp-detection-realistic.mp4',
    assetType: 'medical-render',
    closeupLevel: 'close-up',
    visualDescription:
      'A clean educational render of a stylized colon wall with a single small rounded bump softly highlighted and clearly labeled "Polyp (example)" to teach the detection concept.',
    whatPatientLearns:
      'Sometimes small growths called polyps can be found and gently removed during the same look.',
    exactImageGenerationPrompt:
      `Clean, non-graphic educational medical render of a smooth, stylized teal-lit colon wall with a single small rounded bump gently highlighted by a soft glow ring, a clear label reading "Polyp (example)". ${STYLE}. Close-up composition, friendly diagram-like clarity, soft depth of field. Mood: calm, informative, demystifying. Not graphic — no realistic tissue, no blood, no redness, no instruments touching tissue.`,
    exactVideoGenerationPrompt:
      `6-second slow push-in toward a stylized colon wall with a small rounded bump that gently glows as a soft highlight ring expands around it, "Polyp (example)" label fading in, calm teal light. ${STYLE}. Gentle, clarifying motion; nothing graphic; reassuring.`,
    stockSearchTerms: [
      'polyp detection medical illustration',
      'colon polyp education graphic',
      'colorectal polyp concept render',
      'polyp example diagram non graphic',
      'screening polyp explainer visual',
      'colon growth education illustration',
    ],
    overlayLabels: [
      { text: 'Polyp (example)', x: 60, y: 40 },
      { text: 'Often found early', x: 40, y: 74 },
    ],
    animationTreatment:
      'Push-in as a soft highlight ring expands around the bump; the "Polyp (example)" callout fades in with a gentle pulse.',
    personalizationOverlay:
      'Finding something early is the whole point, James — this is exactly why the screening matters.',
    voiceover:
      'Sometimes they spot a small growth called a polyp. Most are completely harmless — but finding one early is exactly what makes screening so worthwhile.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'preventive-screening-4b',
    useCaseId: 'preventive-screening',
    sceneNumber: 4,
    recommendedFileName: 'polyp-removal-snare.mp4',
    assetType: 'short-motion-video',
    closeupLevel: 'macro',
    visualDescription:
      'A realistic colonoscopy view of a thin wire snare loop gently settling around the base of a small polyp to show how it can be removed during the same visit.',
    whatPatientLearns:
      'If a polyp is found, it can often be gently removed right then — quick, and usually completely painless.',
    exactImageGenerationPrompt:
      `Hyper-realistic first-person colonoscopy camera view of a small rounded polyp on glistening pink colon mucosa, with a thin metal wire snare loop extending from the working channel and resting around the base of the polyp to illustrate gentle removal. ${STYLE}. Realistic metallic specular highlights on the wire, accurate scale, moist tissue sheen, a soft teal confirmation glow. Calm and clinical — before any cutting, no blood.`,
    exactVideoGenerationPrompt:
      `8-second hyper-realistic colonoscopy POV holding on a small polyp on pink colon mucosa as a thin wire snare loop glides in from the bottom of frame and slowly settles around the base of the polyp, a soft teal glow pulsing once to confirm contact, gentle organic camera sway. ${STYLE}. Controlled, reassuring motion; ends as the loop is seated, before any cutting; no blood, no gore.`,
    stockSearchTerms: [
      'polypectomy snare footage',
      'colonoscopy polyp removal real',
      'endoscopic snare loop polyp',
      'colon polyp resection video',
      'polypectomy procedure endoscopy',
      'wire snare colon polyp',
    ],
    overlayLabels: [
      { text: 'Polyp', x: 56, y: 46 },
      { text: 'Gentle removal loop', x: 34, y: 70 },
    ],
    animationTreatment:
      'The snare eases in and seats around the polyp base; a soft teal confirmation ring pulses once.',
    personalizationOverlay:
      'Often handled in the same visit, James — quick, careful, and usually completely painless.',
    voiceover:
      'If they find one, they can often remove it gently right then, in the same visit. A tiny loop lifts it away — quick, and usually completely painless.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'preventive-screening-5',
    useCaseId: 'preventive-screening',
    sceneNumber: 5,
    recommendedFileName: 'at-home-stool-screening-kit-still.jpg',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A clean product still of a neatly packaged at-home stool screening kit (sealed box, collection card, return mailer) on a soft surface — presented as one option to discuss.',
    whatPatientLearns:
      'There can be more than one type of screening — an at-home test is one option to talk through with your care team.',
    exactImageGenerationPrompt:
      `Clean product still of a tidy, sealed at-home colorectal screening test kit: a neat white-and-teal box, a sample collection card, and a prepaid return mailer arranged on a soft matte surface. ${STYLE}. Close-up composition, premium packaging photography feel, soft top light, shallow depth of field, nothing biological visible, fully sealed and clinical. Mood: neutral, calm, optional. Presented as an option to discuss, never a recommendation.`,
    exactVideoGenerationPrompt:
      `5-second slow push-in on a neatly arranged sealed at-home screening kit on a soft matte surface, gentle parallax, calm teal accent light. ${STYLE}. Premium product cinematography, nothing biological shown, reassuring and neutral tone.`,
    stockSearchTerms: [
      'at home colon cancer test kit',
      'fecal immunochemical test kit packaging',
      'home screening test mailer box',
      'stool sample test kit product photo',
      'colorectal screening at home option',
      'medical mail in test kit clean',
    ],
    overlayLabels: [
      { text: 'One option to discuss', x: 50, y: 16 },
      { text: 'At-home kit', x: 38, y: 64 },
    ],
    animationTreatment:
      'Gentle push-in with a soft drop-shadow lift; the "One option to discuss" banner slides down from the top after a beat.',
    personalizationOverlay:
      'If a busy travel week makes scheduling hard, James, ask your team whether this is an option for you.',
    voiceover:
      "There's also an at-home option to talk through — a simple test kit you do without traveling. We're not choosing for you; it's just good to know both exist.",
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'preventive-screening-6',
    useCaseId: 'preventive-screening',
    sceneNumber: 6,
    recommendedFileName: 'outpatient-room-calm.mp4',
    assetType: 'stock-video',
    closeupLevel: 'wide',
    visualDescription:
      'A calm, tidy outpatient procedure room with a comfortable bed and soft modern equipment in the background — welcoming, not intimidating.',
    whatPatientLearns:
      'The screening happens in a calm, comfortable outpatient room — you rest while the team works.',
    exactImageGenerationPrompt:
      `Calm, photorealistic still of a tidy, modern outpatient procedure room: a comfortable bed with soft linens, gentle daylight, sleek equipment softly out of focus in the background, calm teal accents and clean negative space. ${STYLE}. Wide composition, welcoming and modern, no intimidating equipment foregrounded, no procedures in progress, no distress. Mood: safe, calm, reassuring.`,
    exactVideoGenerationPrompt:
      `6-second slow pan across a calm, tidy outpatient procedure room with a comfortable bed and soft background equipment, gentle daylight. ${STYLE}. Soft, reassuring motion; no procedures; welcoming and safe.`,
    stockSearchTerms: [
      'outpatient procedure room calm',
      'endoscopy suite modern clean',
      'recovery bed clinic soft light',
      'colonoscopy room welcoming',
      'medical procedure room interior',
      'day surgery room comfortable',
    ],
    overlayLabels: [
      { text: 'Calm outpatient room', x: 50, y: 18 },
      { text: 'You rest, the team works', x: 56, y: 72 },
    ],
    animationTreatment:
      'Gentle pan with soft light bloom; captions fade in sequentially to set a calm, safe tone.',
    personalizationOverlay:
      'It is a calm, comfortable room, James — you simply rest while your team takes care of the rest.',
    voiceover:
      'And the setting is calm and comfortable — a quiet outpatient room where you rest while your team takes care of everything.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'preventive-screening-7',
    useCaseId: 'preventive-screening',
    sceneNumber: 7,
    recommendedFileName: 'doctor-patient-screening-discussion.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm clinic scene of a doctor and patient talking comfortably about screening options across a desk — collaborative and unhurried.',
    whatPatientLearns:
      'Your care team helps you choose the screening option that fits you — it is a shared decision.',
    exactImageGenerationPrompt:
      `Warm, photorealistic clinic scene of a friendly doctor and a middle-aged patient seated together at a light desk, calmly discussing screening options, relaxed and respectful body language, soft natural daylight, calm teal accents in the room. ${STYLE}. Medium two-shot composition, human and welcoming, no medical procedures. Mood: collaborative, reassuring, unhurried.`,
    exactVideoGenerationPrompt:
      `7-second gentle slow push-in on a warm doctor-patient conversation about screening options, soft daylight, natural nods. ${STYLE}. Slow, human, reassuring motion; no procedures; collaborative tone.`,
    stockSearchTerms: [
      'doctor patient discussing screening',
      'physician explaining options clinic',
      'doctor talking with patient desk warm',
      'healthcare consultation conversation',
      'patient doctor shared decision',
      'preventive care discussion office',
    ],
    overlayLabels: [
      { text: 'A shared decision', x: 50, y: 20 },
      { text: 'Your questions welcome', x: 64, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in sequentially as the conversation settles.',
    personalizationOverlay:
      'Bring your schedule and your questions, James — your team will help you find what fits your life.',
    voiceover:
      "When you're ready, your care team will help you pick what fits your life and your schedule. It's a shared decision, and your questions are always welcome.",
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 2. chronic-care-followup ===================== */
  {
    assetId: 'chronic-care-followup-1',
    useCaseId: 'chronic-care-followup',
    sceneNumber: 1,
    recommendedFileName: 'a1c-blood-sample-vial.mp4',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A calm, non-graphic still of a sealed lab tube with a softly colored cap resting in a clean rack, representing a blood sample for an A1C test.',
    whatPatientLearns:
      'An A1C is a simple blood test — just a small sample sent to the lab.',
    exactImageGenerationPrompt:
      `Clean, non-graphic still of a single sealed laboratory blood collection tube with a softly colored cap resting in a tidy clear rack on a matte clinic surface, a small blank label on the tube. ${STYLE}. Close-up, premium clinical product photography, soft top light, shallow depth of field, no needles, no blood visible (tube shown sealed and abstract), reassuring and tidy. Mood: simple, routine, non-threatening.`,
    exactVideoGenerationPrompt:
      `6-second slow rack focus across a row of sealed, softly lit lab tubes settling on one labeled tube, calm teal accent light, gentle bokeh. ${STYLE}. No needles, no blood, no procedure — just clean, reassuring lab imagery with calm motion.`,
    stockSearchTerms: [
      'blood test tube lab clean',
      'a1c hemoglobin test vial',
      'laboratory sample rack medical',
      'blood collection tube studio photo',
      'diabetes blood test lab sample',
      'clinical lab vial soft lighting',
    ],
    overlayLabels: [
      { text: 'A small sample', x: 36, y: 32 },
      { text: 'A1C blood test', x: 58, y: 66 },
    ],
    animationTreatment:
      'Soft rack-focus from blurred to sharp on the labeled tube; captions fade in calmly, no fast motion.',
    personalizationOverlay:
      'After a long night shift, Sarah, here is what this routine test actually involves — nothing more than a small sample.',
    voiceover:
      "Let's start simple. A follow-up usually means one quick blood sample — just a small draw, nothing you need to prepare for.",
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'chronic-care-followup-2',
    useCaseId: 'chronic-care-followup',
    sceneNumber: 2,
    recommendedFileName: 'lab-analyzer-process.mp4',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean render of a modern lab analyzer gently processing a sample tube in a softly glowing carousel — conveying a careful, automated process.',
    whatPatientLearns:
      'Your sample is processed carefully by precise machines before results are reviewed.',
    exactImageGenerationPrompt:
      `Clean render of a modern, sleek laboratory analyzer machine with a sample tube seated in a softly glowing teal carousel, smooth brushed-metal and glass surfaces, calm indicator lights, on a tidy lab bench. ${STYLE}. Medium composition, premium product/industrial render, soft studio lighting, organized and precise. Mood: careful, trustworthy, calm. No graphic biology, no alarming displays, no readable result values.`,
    exactVideoGenerationPrompt:
      `7-second smooth render of a sample tube rotating gently into a softly glowing analyzer carousel, calm indicator lights pulsing slowly, brushed-metal surfaces catching soft light. ${STYLE}. Precise, calm, trustworthy motion; no result values, nothing alarming.`,
    stockSearchTerms: [
      'laboratory analyzer machine render',
      'lab automation testing equipment',
      'blood analyzer carousel medical',
      'clinical lab process machine',
      'diagnostic equipment clean render',
      'lab testing instrument animation',
    ],
    overlayLabels: [
      { text: 'Processed carefully', x: 50, y: 20 },
      { text: 'Precise testing', x: 64, y: 64 },
    ],
    animationTreatment:
      'The carousel rotates slowly as indicator lights pulse; callouts fade in to reinforce care and precision.',
    personalizationOverlay:
      'Nothing here is rushed, Sarah — your sample is handled with careful, methodical precision.',
    voiceover:
      'That sample goes to the lab, where a machine measures it carefully. No guesswork — just a clear, steady reading.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'chronic-care-followup-3',
    useCaseId: 'chronic-care-followup',
    sceneNumber: 3,
    recommendedFileName: 'red-cells-glucose-macro.mp4',
    assetType: 'medical-render',
    closeupLevel: 'macro',
    visualDescription:
      'A clean macro render of friendly, smooth red blood cells drifting in soft fluid with tiny glowing glucose specks around them — stylized, calm, non-graphic.',
    whatPatientLearns:
      'A1C reflects how sugar (glucose) tends to ride along with your red blood cells over time.',
    exactImageGenerationPrompt:
      `Stylized macro medical render of smooth, friendly red blood cells (soft rounded discs) drifting gently through a clean, translucent fluid, with tiny glowing teal-cyan glucose specks floating around and lightly attaching to the cells. ${STYLE}. Macro composition, soft depth of field, dreamy bokeh, polished and abstract rather than microscopic-realistic. Mood: calm, wondrous, educational. No clinical claim, no numbers, no good/bad framing.`,
    exactVideoGenerationPrompt:
      `7-second slow drift of smooth stylized red blood cells floating through translucent fluid, tiny glowing glucose particles gently orbiting them, soft macro focus, calm teal light. ${STYLE}. Serene, weightless motion; abstract and friendly; never graphic.`,
    stockSearchTerms: [
      'red blood cells animation macro',
      'glucose molecules bloodstream render',
      'blood cells flowing 3d illustration',
      'hemoglobin glucose concept medical',
      'microscopic blood cells calm animation',
      'cellular flow medical explainer',
    ],
    overlayLabels: [
      { text: 'Red blood cell', x: 40, y: 44 },
      { text: 'Glucose (sugar)', x: 66, y: 36 },
    ],
    animationTreatment:
      'Continuous gentle drift with parallax layers; callouts fade in and trace a soft line to one cell and one glucose speck.',
    personalizationOverlay:
      'This is the quiet teamwork happening inside, Sarah — explained simply, with no numbers to worry about tonight.',
    voiceover:
      "Your A1C looks at your red blood cells and how much sugar they've carried — a window into the bigger picture, not just one moment.",
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'chronic-care-followup-4',
    useCaseId: 'chronic-care-followup',
    sceneNumber: 4,
    recommendedFileName: 'a1c-three-month-average.mp4',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render showing three soft monthly arcs merging into one calm averaged line, with a "~3 months" label — illustrating that A1C is an average over time.',
    whatPatientLearns:
      'A1C is like an average of the past ~3 months — not just one moment in time.',
    exactImageGenerationPrompt:
      `Clean conceptual data-visualization render: three soft, glowing teal monthly arcs gently merging into a single smooth averaged line, with a subtle calendar motif marking roughly three months, set on a deep navy background. ${STYLE}. Medium composition, elegant infographic style, soft gradients, generous negative space, a small "~3 months" label. Mood: clarifying, calm. No specific numbers, no good/bad zones, no result interpretation.`,
    exactVideoGenerationPrompt:
      `6-second animated infographic where three soft monthly arcs draw in and then gracefully merge into one averaged line, a "~3 months" label fading in, calm teal glow on deep navy. ${STYLE}. Smooth, clarifying motion; purely conceptual; no numeric values.`,
    stockSearchTerms: [
      'average over time data visualization',
      'three month timeline infographic',
      'trend line concept animation',
      'health metric average graphic',
      'time average concept medical explainer',
      'glucose trend education visual',
    ],
    overlayLabels: [
      { text: '~3 months', x: 50, y: 22 },
      { text: 'An average, not one day', x: 50, y: 80 },
    ],
    animationTreatment:
      'Arcs draw in left-to-right then ease together into one line; the "average" caption fades in once the lines merge.',
    personalizationOverlay:
      'One tough night does not define it, Sarah — this number reflects the bigger, calmer picture over time.',
    voiceover:
      "It reflects roughly the last three months on average — so one tough day, or one good day, doesn't define it.",
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'chronic-care-followup-5',
    useCaseId: 'chronic-care-followup',
    sceneNumber: 5,
    recommendedFileName: 'clinician-reviewing-a1c-with-patient.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm clinic scene of a clinician and a patient reviewing results together on a tablet, calm and collaborative — no readable values on screen.',
    whatPatientLearns:
      'Your clinician walks through your A1C with you, so you understand what it means for your day-to-day.',
    exactImageGenerationPrompt:
      `Warm, photorealistic clinic scene of a friendly clinician and an adult patient seated together, calmly looking at a tablet with an abstract chart (no readable numbers), relaxed and respectful body language, soft natural daylight, calm teal accents. ${STYLE}. Medium two-shot composition, human and reassuring, no medical procedures. Mood: collaborative, clear, supportive.`,
    exactVideoGenerationPrompt:
      `7-second gentle push-in on a clinician and patient reviewing an abstract chart on a tablet together, soft daylight, natural nods. ${STYLE}. Slow, human, reassuring motion; no readable numbers; collaborative tone.`,
    stockSearchTerms: [
      'doctor reviewing results with patient',
      'clinician patient tablet chart',
      'diabetes follow up consultation',
      'physician explaining test results warm',
      'healthcare results conversation',
      'doctor patient discussion calm',
    ],
    overlayLabels: [
      { text: 'Reviewed together', x: 50, y: 20 },
      { text: 'What it means for you', x: 62, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in sequentially as the conversation settles.',
    personalizationOverlay:
      'You will not have to read it alone, Sarah — your clinician walks through every part with you.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'chronic-care-followup-6',
    useCaseId: 'chronic-care-followup',
    sceneNumber: 6,
    recommendedFileName: 'night-shift-kitchen.mp4',
    assetType: 'stock-video',
    closeupLevel: 'wide',
    visualDescription:
      'A calm, dignified scene evoking a night-shift routine — a tidy kitchen in early-morning low light with a coffee mug and a soft clock — relatable, not clinical.',
    whatPatientLearns:
      'Your care fits around your real life, including a night-shift schedule — small steps count.',
    exactImageGenerationPrompt:
      `Calm, photorealistic still evoking a night-shift lifestyle: a tidy home kitchen in soft early-morning low light, a warm mug, a gentle wall clock reading an early hour, a window with pre-dawn blue tones, calm teal accents. ${STYLE}. Wide composition, relatable and dignified, no clinical equipment, no distress. Mood: warm, understanding, real-life. Respectful and non-stigmatizing.`,
    exactVideoGenerationPrompt:
      `6-second slow pan across a quiet home kitchen in soft pre-dawn light with a warm mug and gentle clock, calm and relatable. ${STYLE}. Soft, understanding motion; no clinical equipment; warm real-life tone.`,
    stockSearchTerms: [
      'night shift worker home morning',
      'early morning kitchen coffee calm',
      'pre dawn home interior soft light',
      'shift work lifestyle relatable',
      'quiet home routine morning',
      'late night early morning home scene',
    ],
    overlayLabels: [
      { text: 'Care that fits your life', x: 50, y: 18 },
      { text: 'Small steps count', x: 60, y: 74 },
    ],
    animationTreatment:
      'Gentle pan with soft light bloom; captions fade in to affirm that care fits around real schedules.',
    personalizationOverlay:
      'Your schedule is real, Sarah — your care is built to fit around it, not the other way around.',
    voiceover:
      "And it's measured around your life, Sarah — your nights, your shifts, your routine. We build the plan around you.",
    priority: 'low',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'chronic-care-followup-7',
    useCaseId: 'chronic-care-followup',
    sceneNumber: 7,
    recommendedFileName: 'writing-questions-note.mp4',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean, friendly concept render of a calm note card titled "Questions for my visit" with soft chat and question-mark icons around it — encouraging preparation.',
    whatPatientLearns:
      'Jotting down your questions before a visit helps you get the most out of your time with the team.',
    exactImageGenerationPrompt:
      `Clean, friendly conceptual render of a calm note card titled "Questions for my visit" surrounded by a few softly glowing question-mark and speech-bubble icons floating on deep navy, gentle teal glow, generous negative space. ${STYLE}. Medium composition, premium UI-infographic style, encouraging and warm. Mood: empowering, prepared. No specific clinical claims, no result interpretation.`,
    exactVideoGenerationPrompt:
      `6-second animation where soft question-mark and chat icons gently float and settle around a "Questions for my visit" note card, calm teal glow on deep navy. ${STYLE}. Warm, inviting, gentle motion; encourages preparation.`,
    stockSearchTerms: [
      'questions for doctor visit concept',
      'note card questions ui render',
      'patient preparing for appointment',
      'health questions list illustration',
      'ask your care team graphic',
      'appointment prep checklist render',
    ],
    overlayLabels: [
      { text: 'Write it down', x: 50, y: 20 },
      { text: 'Make your visit count', x: 64, y: 70 },
    ],
    animationTreatment:
      'Icons drift in and settle around the card; the "Write it down" caption fades in with a soft glow.',
    personalizationOverlay:
      'Tired nights make it easy to forget, Sarah — jot your questions down so nothing slips at your visit.',
    voiceover:
      "Before your visit, jot down anything on your mind. Your questions matter, and there's no such thing as a wrong one.",
    priority: 'low',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 3. clinical-trial-education ================== */
  {
    assetId: 'clinical-trial-education-1',
    useCaseId: 'clinical-trial-education',
    sceneNumber: 1,
    recommendedFileName: 'coordinator-consultation.mp4',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm clinic scene of a study coordinator sitting across from a patient, calmly walking through information together in a bright, friendly room.',
    whatPatientLearns:
      'A research study starts with a real conversation — someone explains everything and answers your questions first.',
    exactImageGenerationPrompt:
      `Warm, photorealistic clinic scene of a friendly study coordinator and an older adult patient seated together at a light wood table, calmly reviewing a printed document, soft natural daylight from a window, a glass of water on the table, relaxed and respectful body language. ${STYLE}. Medium two-shot composition, gentle teal accents in the room, reassuring and unhurried mood. Faces calm and kind. Human and welcoming, not sterile.`,
    exactVideoGenerationPrompt:
      `7-second gentle slow push-in on a warm clinic conversation: a study coordinator and an older patient reviewing information together, soft daylight, occasional natural nod, calm and respectful. ${STYLE}. Slow, human, reassuring motion; no medical procedures shown.`,
    stockSearchTerms: [
      'patient nurse explaining document clinic',
      'clinical research coordinator consultation',
      'doctor talking with senior patient warm',
      'healthcare consent conversation office',
      'study coordinator patient meeting',
      'elderly patient reviewing paperwork clinic',
    ],
    overlayLabels: [
      { text: 'Your questions first', x: 30, y: 24 },
      { text: 'Study coordinator', x: 70, y: 70 },
    ],
    animationTreatment:
      'Slow push-in with soft warm grade; callouts fade in sequentially as the conversation settles.',
    personalizationOverlay:
      'Your daughter is welcome to sit right beside you, Maria — every question is encouraged.',
    voiceover:
      'Hi Maria. Today is just about learning — nothing to decide. A study coordinator sits with you and answers anything you ask.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'clinical-trial-education-2',
    useCaseId: 'clinical-trial-education',
    sceneNumber: 2,
    recommendedFileName: 'informed-consent-form.mp4',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A close-up still of a neutral, softly blurred informed-consent document with a pen resting beside it, the heading readable as "Informed Consent" — calm and unintimidating.',
    whatPatientLearns:
      'The consent form is yours to read, keep, and decide on — taking part is always your choice.',
    exactImageGenerationPrompt:
      `Close-up still of a tidy informed-consent document on a light desk, a calm "Informed Consent" heading softly in focus while the body text gently blurs, a smooth pen resting alongside, soft daylight. ${STYLE}. Close-up composition, premium document photography, shallow depth of field, warm and unintimidating. Mood: voluntary, transparent, respectful. No scary fine-print emphasis, no lab imagery.`,
    exactVideoGenerationPrompt:
      `5-second slow drift across a softly lit informed-consent document, the heading easing into focus, a pen resting beside it, gentle daylight. ${STYLE}. Calm, respectful motion; emphasizes choice; nothing alarming.`,
    stockSearchTerms: [
      'informed consent form close up',
      'medical consent document pen',
      'paperwork signing clinic soft focus',
      'consent form healthcare photo',
      'reading medical document desk',
      'patient agreement form clean',
    ],
    overlayLabels: [
      { text: 'Your choice, always', x: 50, y: 20 },
      { text: 'Take your time', x: 62, y: 72 },
    ],
    animationTreatment:
      'Subtle dolly across the page as the heading sharpens; the "Your choice, always" caption fades in early to set a reassuring tone.',
    personalizationOverlay:
      'There is no pressure, Maria — you and your daughter can take this home and decide together.',
    voiceover:
      "You'd be given a consent form to read at your own pace. It explains everything, in plain language, before you decide a thing.",
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'clinical-trial-education-3',
    useCaseId: 'clinical-trial-education',
    sceneNumber: 3,
    recommendedFileName: 'study-visit-room.mp4',
    assetType: 'stock-video',
    closeupLevel: 'wide',
    visualDescription:
      'A calm, tidy study visit room with a comfortable chair and soft modern monitoring equipment in the background — welcoming and organized.',
    whatPatientLearns:
      'Study visits happen in a calm, organized room — comfortable and unhurried.',
    exactImageGenerationPrompt:
      `Calm, photorealistic still of a tidy, modern clinical study visit room: a comfortable cushioned chair, gentle daylight, sleek monitoring equipment softly out of focus in the background, calm teal accents and clean negative space. ${STYLE}. Wide composition, welcoming and modern, no intimidating equipment foregrounded, no procedures in progress, no distress. Mood: calm, organized, reassuring.`,
    exactVideoGenerationPrompt:
      `6-second slow pan across a calm, tidy study visit room with a comfortable chair and soft background equipment, gentle daylight. ${STYLE}. Soft, reassuring motion; no procedures; welcoming and organized.`,
    stockSearchTerms: [
      'clinical research visit room calm',
      'study exam room modern clean',
      'comfortable medical room soft light',
      'research clinic interior welcoming',
      'trial visit room equipment background',
      'clinical study setting interior',
    ],
    overlayLabels: [
      { text: 'A calm visit room', x: 50, y: 18 },
      { text: 'Comfortable, unhurried', x: 60, y: 72 },
    ],
    animationTreatment:
      'Gentle pan with soft light bloom; captions fade in to set a calm, organized tone.',
    personalizationOverlay:
      'It is a calm, comfortable space, Maria — nothing rushed, with time for your questions.',
    voiceover:
      'If you took part, visits would happen in a calm, comfortable room like this — nothing rushed, with time for questions.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'clinical-trial-education-4',
    useCaseId: 'clinical-trial-education',
    sceneNumber: 4,
    recommendedFileName: 'study-sample-monitoring.mp4',
    assetType: 'medical-render',
    closeupLevel: 'close-up',
    visualDescription:
      'A clean, non-graphic render of a sealed sample tube beside a soft monitoring device with calm indicator lights — conveying gentle measurement and tracking.',
    whatPatientLearns:
      'Study visits may include simple checks, like a small sample or a calm measurement.',
    exactImageGenerationPrompt:
      `Clean, non-graphic close-up render of a sealed sample tube resting beside a sleek monitoring device with gentle teal indicator lights on a tidy surface, soft studio lighting. ${STYLE}. Close-up composition, premium device photography feel, shallow depth of field, nothing biological visible. Mood: careful, gentle, routine. No needles, no blood, no graphic detail.`,
    exactVideoGenerationPrompt:
      `6-second slow push-in on a sealed sample tube beside a soft monitoring device with gently pulsing indicator lights, calm teal accent light. ${STYLE}. Soft, careful, reassuring motion; nothing biological; no needles or blood.`,
    stockSearchTerms: [
      'sample tube monitoring device render',
      'clinical monitoring equipment clean',
      'study sample collection concept',
      'health monitor device soft light',
      'medical measurement device render',
      'research sample tracking illustration',
    ],
    overlayLabels: [
      { text: 'Gentle checks', x: 40, y: 30 },
      { text: 'Carefully tracked', x: 64, y: 64 },
    ],
    animationTreatment:
      'Slow push-in as indicator lights pulse gently; callouts fade in to convey careful, gentle measurement.',
    personalizationOverlay:
      'The checks are simple and gentle, Maria — small steps, carefully tracked at each visit.',
    voiceover:
      'Taking part usually means simple, gentle checks — a small sample, a little monitoring — carefully tracked at each visit.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'clinical-trial-education-5',
    useCaseId: 'clinical-trial-education',
    sceneNumber: 5,
    recommendedFileName: 'patient-rights-choice.mp4',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a calm "Your rights" card with soft shield and checkmark icons, emphasizing that taking part is voluntary and can stop at any time.',
    whatPatientLearns:
      'Taking part is voluntary — you can ask anything, and you can change your mind at any time.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy: a calm "Your rights" card with a soft glowing teal shield icon and gentle checkmark and pause icons around it, generous negative space. ${STYLE}. Medium composition, premium UI aesthetic, reassuring and dignified. Mood: protective, empowering, transparent. No eligibility claims, no clinical claims — purely about patient rights and voluntary choice.`,
    exactVideoGenerationPrompt:
      `6-second animation where a "Your rights" card settles in and soft shield, checkmark, and pause icons fade in around it, calm teal glow on deep navy. ${STYLE}. Smooth, reassuring motion; emphasizes voluntary choice; no eligibility implication.`,
    stockSearchTerms: [
      'patient rights concept render',
      'voluntary participation graphic',
      'informed consent rights illustration',
      'patient choice shield icon ui',
      'research ethics rights visual',
      'you can change your mind concept',
    ],
    overlayLabels: [
      { text: 'Always voluntary', x: 50, y: 20 },
      { text: 'Stop anytime', x: 64, y: 70 },
    ],
    animationTreatment:
      'Card settles in then rights icons fade in one by one; the "Always voluntary" caption holds with a soft glow.',
    personalizationOverlay:
      'This is entirely your choice, Maria — you can ask anything, and you can change your mind anytime.',
    voiceover:
      "And it's entirely your choice, Maria. You can ask anything, take your time, and change your mind at any point.",
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'clinical-trial-education-6',
    useCaseId: 'clinical-trial-education',
    sceneNumber: 6,
    recommendedFileName: 'daughter-helping-patient-discuss.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm scene of an adult daughter sitting with her older parent, gently helping them talk through information together — supportive and unhurried.',
    whatPatientLearns:
      'You can bring someone you trust — having family help you think it through is welcome.',
    exactImageGenerationPrompt:
      `Warm, photorealistic scene of an adult daughter sitting beside her older parent at a light table, gently helping them review information together, soft natural daylight, relaxed and caring body language, calm teal accents. ${STYLE}. Medium two-shot composition, human and tender, no medical procedures. Mood: supportive, family, unhurried.`,
    exactVideoGenerationPrompt:
      `7-second gentle push-in on an adult daughter helping her older parent review information together, soft daylight, caring nods. ${STYLE}. Slow, human, warm motion; no procedures; family-supportive tone.`,
    stockSearchTerms: [
      'adult daughter helping elderly parent',
      'family member supporting patient',
      'daughter senior parent discussing',
      'caregiver helping read document',
      'family healthcare conversation warm',
      'adult child elderly parent talking',
    ],
    overlayLabels: [
      { text: 'Bring someone you trust', x: 50, y: 20 },
      { text: 'Family welcome', x: 30, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in to affirm that bringing family is welcome.',
    personalizationOverlay:
      'Your daughter can help you weigh it all, Maria — you do not have to decide anything alone.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'clinical-trial-education-7',
    useCaseId: 'clinical-trial-education',
    sceneNumber: 7,
    recommendedFileName: 'clinical-trial-timeline-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean timeline infographic of a typical study schedule — a few labeled milestone dots along a calm horizontal path with friendly icons.',
    whatPatientLearns:
      'A study has a clear schedule of visits, so you can see what is expected and when.',
    exactImageGenerationPrompt:
      `Clean conceptual infographic render of a clinical study visit schedule: a calm horizontal timeline on deep navy with several softly glowing teal milestone dots, each paired with a simple friendly icon (calendar, clipboard, conversation), generous spacing, elegant thin connecting line. ${STYLE}. Medium composition, premium UI-infographic aesthetic, clarifying and organized. Mood: transparent, manageable. Generic schedule only — no eligibility claims, no specific drug or study name.`,
    exactVideoGenerationPrompt:
      `6-second animated timeline where milestone dots light up one by one along a calm horizontal path, simple icons fading in above each, soft teal glow on deep navy. ${STYLE}. Orderly, reassuring motion; purely illustrative schedule; no eligibility implication.`,
    stockSearchTerms: [
      'study visit timeline infographic',
      'clinical trial schedule graphic',
      'appointment timeline animation',
      'research visit milestones illustration',
      'healthcare timeline ui concept',
      'patient journey schedule render',
    ],
    overlayLabels: [
      { text: 'Visit 1', x: 18, y: 50 },
      { text: 'Follow-up visits', x: 56, y: 50 },
      { text: 'Clear schedule', x: 50, y: 18 },
    ],
    animationTreatment:
      'Milestone dots illuminate sequentially left-to-right; the connecting line draws between them as each label fades in.',
    personalizationOverlay:
      'So you can plan around your daughter’s help, Maria, here is the kind of schedule a study uses.',
    voiceover:
      "Here's the kind of journey a study follows — a few clear steps, from your first visit through to the final results.",
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 4. post-discharge-recovery ================== */
  {
    assetId: 'post-discharge-recovery-1',
    useCaseId: 'post-discharge-recovery',
    sceneNumber: 1,
    recommendedFileName: 'hospital-discharge-moment-still.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm scene of a patient being kindly walked out at a bright hospital entrance by a friendly staff member — a calm, hopeful hand-off home.',
    whatPatientLearns:
      'Leaving the hospital is a planned, supported moment — you are not sent off without a plan.',
    exactImageGenerationPrompt:
      `Warm, photorealistic scene of an older patient being kindly walked toward a bright modern hospital entrance by a friendly staff member, soft daylight through glass doors, relaxed and caring body language, calm teal accents and gentle greenery. ${STYLE}. Medium composition, hopeful and human, no medical equipment foregrounded, no distress. Mood: supported, hopeful, calm hand-off.`,
    exactVideoGenerationPrompt:
      `7-second gentle scene of a patient being kindly walked toward a bright hospital entrance by a friendly staff member, soft daylight, warm and calm. ${STYLE}. Slow, hopeful, human motion; no medical equipment; supported tone.`,
    stockSearchTerms: [
      'patient discharge hospital entrance',
      'leaving hospital with staff warm',
      'hospital exit doors daylight',
      'patient going home from hospital',
      'discharge moment caring staff',
      'hospital entrance hopeful scene',
    ],
    overlayLabels: [
      { text: 'A planned hand-off', x: 50, y: 18 },
      { text: 'Supported, not rushed', x: 60, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in to convey a calm, planned departure.',
    personalizationOverlay:
      'You live on your own during the week, Robert — leaving is a planned, supported step, not a goodbye.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'post-discharge-recovery-2',
    useCaseId: 'post-discharge-recovery',
    sceneNumber: 2,
    recommendedFileName: 'patient-home-reviewing-instructions.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A calm scene of a patient at home in a sunlit chair, comfortably reading a simple discharge instruction sheet — relaxed and in control.',
    whatPatientLearns:
      'Your discharge instructions are simple to follow at home — take them step by step.',
    exactImageGenerationPrompt:
      `Calm, photorealistic scene of an older patient seated comfortably in a sunlit armchair at home, relaxed, reading a simple printed instruction sheet (no readable text), a glass of water nearby, warm wood tones with calm teal accents. ${STYLE}. Medium composition, peaceful and in-control, no medical equipment, no distress. Mood: calm, capable, at-home comfort.`,
    exactVideoGenerationPrompt:
      `6-second slow push-in on a patient comfortably reading instructions in a sunlit home armchair, gentle daylight. ${STYLE}. Soft, calm, reassuring motion; no medical equipment; at-home comfort.`,
    stockSearchTerms: [
      'patient reading instructions home',
      'senior reading paper armchair sunlight',
      'discharge instructions at home',
      'older adult reading document home',
      'home recovery reading calm',
      'patient reviewing care plan home',
    ],
    overlayLabels: [
      { text: 'Step by step', x: 50, y: 18 },
      { text: 'Simple to follow', x: 62, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with soft light bloom; captions fade in to reassure the steps are simple.',
    personalizationOverlay:
      'On quiet weekdays at home, Robert, you can take these steps at your own pace.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'post-discharge-recovery-3',
    useCaseId: 'post-discharge-recovery',
    sceneNumber: 3,
    recommendedFileName: 'medication-review-closeup-still.jpg',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A clean close-up still of a tidy weekly pill organizer beside neutral, unlabeled medication bottles on a soft surface — calm and organized.',
    whatPatientLearns:
      'A simple medication review keeps your routine clear after you get home.',
    exactImageGenerationPrompt:
      `Clean close-up still of a tidy seven-day pill organizer with clearly divided compartments beside two neutral, label-free amber medication bottles on a soft matte surface with calm teal accent light, a glass of water softly out of focus behind. ${STYLE}. Close-up composition, premium product photography, shallow depth of field, organized and reassuring. Mood: routine, manageable. No brand names, no readable labels, no dosing text.`,
    exactVideoGenerationPrompt:
      `5-second slow push-in on a tidy weekly pill organizer beside neutral medication bottles, gentle parallax, calm teal accent light. ${STYLE}. Soft, organized, reassuring motion; no readable labels or dosing.`,
    stockSearchTerms: [
      'weekly pill organizer close up',
      'medication bottles clean product photo',
      'pill box routine soft lighting',
      'medication review at home',
      'prescription bottles neutral studio',
      'pill dispenser weekly schedule',
    ],
    overlayLabels: [
      { text: 'Keep it simple', x: 50, y: 18 },
      { text: 'Weekly organizer', x: 34, y: 70 },
    ],
    animationTreatment:
      'Slow push-in with soft shadow lift; the "Keep it simple" caption fades in to frame the routine positively.',
    personalizationOverlay:
      'A clear organizer takes the guesswork out, Robert — especially on the days you are on your own.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'post-discharge-recovery-4',
    useCaseId: 'post-discharge-recovery',
    sceneNumber: 4,
    recommendedFileName: 'gentle-recovery-mobility-render.png',
    assetType: 'medical-render',
    closeupLevel: 'wide',
    visualDescription:
      'A gentle, non-graphic concept render of a calm figure taking a slow, easy walk along a soft sunlit path — conveying light movement during recovery, no wounds.',
    whatPatientLearns:
      'Gentle movement, at your own pace, is a calm part of recovering at home.',
    exactImageGenerationPrompt:
      `Gentle, non-graphic conceptual render of a calm, simplified figure taking a slow, easy walk along a soft sunlit garden path, warm light blended with calm teal accents, friendly and stylized rather than detailed. ${STYLE}. Wide composition, peaceful sense of gentle movement, soft ground shadow, generous negative space. Mood: hopeful, easy, restorative. Absolutely no wounds, no medical detail, no distress.`,
    exactVideoGenerationPrompt:
      `6-second slow tracking shot following a calm figure taking a gentle, easy walk along a soft sunlit path, warm light blending with teal. ${STYLE}. Smooth, hopeful, restful motion; no wounds; no medical detail.`,
    stockSearchTerms: [
      'gentle recovery walk concept',
      'easy mobility recovery illustration',
      'walking garden path calm render',
      'light movement recovery graphic',
      'recovery at own pace concept',
      'gentle exercise recovery visual',
    ],
    overlayLabels: [
      { text: 'Gentle movement', x: 50, y: 20 },
      { text: 'At your own pace', x: 62, y: 72 },
    ],
    animationTreatment:
      'Slow tracking shot following the figure; captions fade in to encourage gentle, paced movement.',
    personalizationOverlay:
      'A short, easy walk is enough to start, Robert — go at the pace that feels right for you.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'post-discharge-recovery-5',
    useCaseId: 'post-discharge-recovery',
    sceneNumber: 5,
    recommendedFileName: 'followup-appointment-calendar-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean infographic render of a weekly calendar with gentle checkmarks for follow-up reminders and a soft medication-review note — organized and unintimidating.',
    whatPatientLearns:
      'A simple calendar of follow-ups and a medication review keep recovery on track.',
    exactImageGenerationPrompt:
      `Clean conceptual infographic render of a friendly weekly calendar grid on deep navy, a few days marked with soft glowing teal checkmarks and gentle icons (pill organizer, phone call, calendar), one soft "medication review" note card floating beside it. ${STYLE}. Medium composition, premium UI-infographic style, organized and calm, generous spacing. Mood: manageable, supportive. No specific drug names, no dosing instructions.`,
    exactVideoGenerationPrompt:
      `6-second animated calendar where soft checkmarks and gentle reminder icons appear on a few days one by one, a "medication review" note card sliding in, calm teal glow on deep navy. ${STYLE}. Orderly, reassuring motion; no specific medication or dosing detail.`,
    stockSearchTerms: [
      'weekly calendar reminders infographic',
      'follow up appointment calendar render',
      'recovery checklist ui concept',
      'health reminders calendar animation',
      'care plan calendar illustration',
      'medication review schedule graphic',
    ],
    overlayLabels: [
      { text: 'Follow-up reminders', x: 30, y: 24 },
      { text: 'Medication review', x: 72, y: 62 },
    ],
    animationTreatment:
      'Calendar days populate with checkmarks left-to-right; the medication-review card slides in last with a soft settle.',
    personalizationOverlay:
      'So nothing slips on a busy week, Robert, here is the simple rhythm of check-ins ahead.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'post-discharge-recovery-6',
    useCaseId: 'post-discharge-recovery',
    sceneNumber: 6,
    recommendedFileName: 'caregiver-check-in-home.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm scene of an adult son checking in on his father at home, sitting together comfortably — caring and reassuring.',
    whatPatientLearns:
      'A regular check-in from someone you trust adds an extra layer of support at home.',
    exactImageGenerationPrompt:
      `Warm, photorealistic scene of an adult son sitting comfortably beside his older father in a sunlit living room, checking in with a caring smile, relaxed body language, warm wood tones with calm teal accents. ${STYLE}. Medium two-shot composition, tender and human, no medical equipment. Mood: caring, supportive, reassuring.`,
    exactVideoGenerationPrompt:
      `6-second gentle push-in on an adult son checking in on his older father at home, soft daylight, caring nods. ${STYLE}. Slow, warm, human motion; no medical equipment; supportive tone.`,
    stockSearchTerms: [
      'adult son visiting elderly father',
      'family check in home recovery',
      'caregiver visiting senior parent',
      'son helping older father home',
      'family support recovery warm',
      'adult child elderly parent home',
    ],
    overlayLabels: [
      { text: 'An extra layer of support', x: 50, y: 20 },
      { text: 'Someone you trust', x: 62, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in to affirm the value of a trusted check-in.',
    personalizationOverlay:
      'Your son visits on weekends, Robert — a simple check-in like this adds real support.',
    priority: 'low',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'post-discharge-recovery-7',
    useCaseId: 'post-discharge-recovery',
    sceneNumber: 7,
    recommendedFileName: 'care-team-phone-portal-support-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a friendly phone and patient-portal screen with a soft "Message your care team" button — conveying easy access to help.',
    whatPatientLearns:
      'Help is one message or call away — your care team is reachable if you have questions.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a friendly smartphone showing a simple patient-portal screen with a soft glowing teal "Message your care team" button and gentle chat and phone icons, generous negative space. ${STYLE}. Medium composition, premium UI mockup aesthetic, calm and reassuring. Mood: supported, accessible. No readable PHI, no real names, no clinical claims.`,
    exactVideoGenerationPrompt:
      `6-second animation where a phone-portal screen assembles and a "Message your care team" button gently glows, soft chat and phone icons fading in, calm teal glow on deep navy. ${STYLE}. Smooth, reassuring motion; no readable PHI; accessible tone.`,
    stockSearchTerms: [
      'patient portal phone app concept',
      'message care team ui render',
      'telehealth phone support graphic',
      'healthcare app interface clean',
      'contact care team illustration',
      'patient portal mockup render',
    ],
    overlayLabels: [
      { text: 'Help is one message away', x: 50, y: 20 },
      { text: 'Reach your care team', x: 60, y: 72 },
    ],
    animationTreatment:
      'Portal screen assembles, then the message button glows and chat icons fade in to convey easy access.',
    personalizationOverlay:
      'If a question comes up alone at home, Robert, your care team is just one message away.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 5. medication-journey ======================= */
  {
    assetId: 'medication-journey-1',
    useCaseId: 'medication-journey',
    sceneNumber: 1,
    recommendedFileName: 'weekly-pill-organizer.mp4',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A clean close-up still of a tidy weekly pill organizer beside a neutral, unlabeled medication bottle on a soft surface — calm and organized.',
    whatPatientLearns:
      'A weekly organizer makes a daily routine simple and easy to keep.',
    exactImageGenerationPrompt:
      `Clean close-up still of a tidy seven-day pill organizer with clearly divided compartments beside a neutral, label-free amber medication bottle, on a soft matte surface with calm teal accent light, a glass of water softly out of focus behind. ${STYLE}. Close-up composition, premium product photography, shallow depth of field, organized and reassuring. Mood: routine, manageable. No brand names, no readable labels, no dosing text.`,
    exactVideoGenerationPrompt:
      `5-second slow push-in on a tidy weekly pill organizer beside a neutral medication bottle, gentle parallax, calm teal accent light. ${STYLE}. Soft, organized, reassuring motion; no readable labels or dosing.`,
    stockSearchTerms: [
      'weekly pill organizer close up',
      'medication bottle clean product photo',
      'daily pill box routine',
      'medication organizer soft lighting',
      'prescription bottle neutral studio',
      'pill dispenser weekly schedule',
    ],
    overlayLabels: [
      { text: 'A simple daily routine', x: 50, y: 18 },
      { text: 'Weekly organizer', x: 34, y: 70 },
    ],
    animationTreatment:
      'Slow push-in with soft shadow lift; the "simple daily routine" caption fades in to frame the habit positively.',
    personalizationOverlay:
      'A clear routine takes the guesswork out, Linda — so your new medication just becomes part of your day.',
    voiceover:
      "Staying on track is easier with a simple routine, Linda. A weekly organizer lays out each day, so you always know it's done.",
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'medication-journey-2',
    useCaseId: 'medication-journey',
    sceneNumber: 2,
    recommendedFileName: 'taking-pill-with-water.mp4',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A calm, non-graphic still of a single neutral pill in an open palm beside a glass of water — simple and routine, no mouth or ingestion close-up.',
    whatPatientLearns:
      'Taking your medication is a simple daily moment — usually just with a glass of water.',
    exactImageGenerationPrompt:
      `Calm, non-graphic close-up still of a single neutral, unbranded pill resting in an open relaxed palm beside a clear glass of water on a soft surface, gentle daylight, calm teal accents. ${STYLE}. Close-up composition, premium product photography, shallow depth of field, simple and routine. Mood: easy, calm, daily habit. No mouth, no ingestion close-up, no readable labels.`,
    exactVideoGenerationPrompt:
      `5-second slow push-in on a single neutral pill resting in an open palm beside a glass of water, gentle daylight. ${STYLE}. Soft, calm, routine motion; no mouth or ingestion close-up; easy daily-habit tone.`,
    stockSearchTerms: [
      'pill in hand with water glass',
      'taking medication simple routine',
      'single pill palm clean photo',
      'medication daily habit concept',
      'pill and water glass soft light',
      'taking medicine calm still',
    ],
    overlayLabels: [
      { text: 'A simple daily moment', x: 50, y: 18 },
      { text: 'Usually just with water', x: 60, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with soft light bloom; captions fade in to frame the act as an easy daily habit.',
    personalizationOverlay:
      'It is just one small moment in your day, Linda — usually nothing more than a glass of water.',
    voiceover:
      'When it is time, you take it with a glass of water — a small, steady habit that does a lot of good.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'medication-journey-3',
    useCaseId: 'medication-journey',
    sceneNumber: 3,
    recommendedFileName: 'pill-dissolving-bloodstream.mp4',
    assetType: 'medical-render',
    closeupLevel: 'wide',
    visualDescription:
      'A stylized, general render of a soft glowing dose traveling along a calm body silhouette’s circulation as gentle light — conceptual, not a specific clinical mechanism.',
    whatPatientLearns:
      'In general, a medicine is taken, absorbed, and carried through the body — your care team explains the specifics.',
    exactImageGenerationPrompt:
      `Stylized, general conceptual render of a calm translucent human body silhouette on deep navy, a soft glowing teal point of light representing a dose traveling gently along simplified circulation lines, abstract and friendly rather than anatomically detailed. ${STYLE}. Wide composition, elegant and minimal, soft glow, generous negative space. Mood: clarifying, gentle. General concept only — no specific organ targeting, no clinical mechanism claim.`,
    exactVideoGenerationPrompt:
      `7-second animation of a soft glowing point of light traveling smoothly along simplified circulation lines within a calm translucent body silhouette, gentle teal glow on deep navy. ${STYLE}. Smooth, weightless, conceptual motion; no specific mechanism or organ claim.`,
    stockSearchTerms: [
      'medication through body concept animation',
      'drug absorption illustration general',
      'bloodstream travel medical explainer',
      'pharmacology concept visual calm',
      'body silhouette circulation render',
      'medicine in the body education graphic',
    ],
    overlayLabels: [
      { text: 'Taken', x: 50, y: 26 },
      { text: 'Carried through the body', x: 56, y: 60 },
    ],
    animationTreatment:
      'The glowing dose travels along the path with a soft trailing light; captions fade in along the journey.',
    personalizationOverlay:
      'Here is the simple, general idea, Linda — and your care team can walk you through the specifics for you.',
    voiceover:
      "Once you swallow it, the pill gently dissolves and is absorbed into your bloodstream — that's where its work begins.",
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'medication-journey-3b',
    useCaseId: 'medication-journey',
    sceneNumber: 3,
    recommendedFileName: 'medication-to-heart.mp4',
    assetType: 'medical-render',
    closeupLevel: 'macro',
    visualDescription:
      'A realistic 3D heart with the medicine reaching it through the bloodstream — showing where a cardiac medication does its work.',
    whatPatientLearns:
      'The medicine travels through your blood to your heart, helping it work a little easier.',
    exactImageGenerationPrompt:
      `Hyper-realistic 3D anatomical render of a human heart beating steadily in deep navy space, a flowing bloodstream carrying soft glowing teal medicine particles arriving and gently perfusing the muscle, soft teal rim light. ${STYLE}. Calm, steady rhythm, believable like a premium medical visualization. Mood: reassuring, steady.`,
    exactVideoGenerationPrompt:
      `8-second slow orbit around a realistic beating human heart as a bloodstream of soft glowing teal medicine particles arrives and gently suffuses the muscle, the beat steadying. ${STYLE}. Reassuring, steady motion; never frantic.`,
    stockSearchTerms: [
      'medication reaching heart render',
      'drug in bloodstream heart 3d',
      'cardiac medication visualization',
      'heart perfusion animation calm',
      'medicine to heart concept render',
      'beating heart bloodstream teal',
    ],
    overlayLabels: [
      { text: 'Your heart', x: 50, y: 24 },
      { text: 'Working easier', x: 60, y: 66 },
    ],
    animationTreatment:
      'Slow orbit around the steadily beating heart as the medicine glow suffuses it; captions fade in calmly.',
    personalizationOverlay:
      'This is the general idea, Linda — your medication supports your heart, gently and steadily.',
    voiceover:
      'It travels with your blood to your heart, helping it beat more steadily and work a little easier.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'medication-journey-4',
    useCaseId: 'medication-journey',
    sceneNumber: 4,
    recommendedFileName: 'receptor-key-lock.mp4',
    assetType: 'medical-render',
    closeupLevel: 'macro',
    visualDescription:
      'A clean, general macro render of a friendly stylized cell surface with soft glowing receptor shapes and a gentle key-and-lock motif — purely conceptual, no clinical claim.',
    whatPatientLearns:
      'In general, medicines work at a tiny, cellular level — a simple idea your care team can explain for you.',
    exactImageGenerationPrompt:
      `Clean, general conceptual macro render of a friendly stylized cell surface with soft glowing teal receptor shapes and a gentle, abstract key-and-lock motif drifting nearby, dreamy bokeh on deep navy. ${STYLE}. Macro composition, polished and abstract rather than microscopic-realistic, generous negative space. Mood: wondrous, calm, educational. General concept only — no clinical claim, no specific drug, no good/bad framing.`,
    exactVideoGenerationPrompt:
      `7-second slow drift across a stylized cell surface as a soft glowing key shape gently approaches a receptor and a calm pulse of light expands, dreamy macro focus, calm teal glow. ${STYLE}. Serene, weightless, conceptual motion; no clinical claim; abstract and friendly.`,
    stockSearchTerms: [
      'cell receptor concept render',
      'drug receptor binding illustration general',
      'cellular level medicine concept',
      'key and lock cell animation',
      'molecular concept macro medical',
      'receptor education visual calm',
    ],
    overlayLabels: [
      { text: 'A tiny, cellular level', x: 50, y: 20 },
      { text: 'A simple idea', x: 62, y: 70 },
    ],
    animationTreatment:
      'Slow macro drift as a soft key approaches a receptor; a calm pulse expands and the caption fades in.',
    personalizationOverlay:
      'This is just the general idea, Linda — the specifics for you are best explained by your care team.',
    voiceover:
      'Down at the level of your cells, the medicine fits into just the right spot — like a key in a lock — to do its job.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'medication-journey-5',
    useCaseId: 'medication-journey',
    sceneNumber: 5,
    recommendedFileName: 'symptom-question-tracking-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean, friendly concept render of a simple tracking card with soft check rows and a "How I’m feeling" note — encouraging patients to note symptoms and questions.',
    whatPatientLearns:
      'Jotting down how you feel and any questions helps you and your care team stay in sync.',
    exactImageGenerationPrompt:
      `Clean, friendly conceptual render on deep navy of a simple tracking card titled "How I'm feeling" with soft check rows and a small note area, a few gentle question-mark and calendar icons around it, calm teal glow, generous negative space. ${STYLE}. Medium composition, premium UI-infographic style, encouraging and warm. Mood: empowering, organized. No specific symptoms listed, no clinical claims, no instruction to change medication.`,
    exactVideoGenerationPrompt:
      `6-second animation where a "How I'm feeling" tracking card assembles with soft check rows and gentle icons fading in around it, calm teal glow on deep navy. ${STYLE}. Warm, inviting, gentle motion; encourages tracking; lists no specific symptoms.`,
    stockSearchTerms: [
      'symptom tracker card concept',
      'health journal ui render',
      'tracking how i feel graphic',
      'patient notes app illustration',
      'medication tracker concept clean',
      'questions and notes card render',
    ],
    overlayLabels: [
      { text: 'Note how you feel', x: 50, y: 20 },
      { text: 'Stay in sync', x: 62, y: 70 },
    ],
    animationTreatment:
      'Card assembles row by row as gentle icons fade in; the "Note how you feel" caption holds with a soft glow.',
    personalizationOverlay:
      'Since you like to research things yourself, Linda, jot down how you feel — it keeps you and your team in sync.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'medication-journey-6',
    useCaseId: 'medication-journey',
    sceneNumber: 6,
    recommendedFileName: 'pharmacist-conversation.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm scene of a friendly pharmacist talking with a patient at a calm pharmacy counter — approachable and helpful.',
    whatPatientLearns:
      'Your pharmacist and care team are great people to ask about your medication — questions are welcome.',
    exactImageGenerationPrompt:
      `Warm, photorealistic scene of a friendly pharmacist in a clean white coat speaking kindly with an adult patient across a calm, tidy pharmacy counter, soft daylight, relaxed and helpful body language, calm teal accents. ${STYLE}. Medium two-shot composition, approachable and human, no readable labels. Mood: helpful, welcoming, trustworthy.`,
    exactVideoGenerationPrompt:
      `7-second gentle push-in on a friendly pharmacist talking with a patient at a calm pharmacy counter, soft daylight, natural nods. ${STYLE}. Slow, human, helpful motion; no readable labels; welcoming tone.`,
    stockSearchTerms: [
      'pharmacist talking with patient',
      'pharmacy counter consultation warm',
      'pharmacist explaining medication',
      'patient asking pharmacist questions',
      'friendly pharmacist customer',
      'pharmacy advice conversation',
    ],
    overlayLabels: [
      { text: 'Ask your pharmacist', x: 50, y: 20 },
      { text: 'Questions welcome', x: 62, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in to encourage asking the pharmacist questions.',
    personalizationOverlay:
      'Your pharmacist is a great resource, Linda — bring your questions, they are always welcome.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'medication-journey-7',
    useCaseId: 'medication-journey',
    sceneNumber: 7,
    recommendedFileName: 'care-team-reminder.mp4',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a calm reminder card reading "Talk to your care team before any changes" with a soft shield and chat icon — supportive, not alarming.',
    whatPatientLearns:
      'Do not change or stop a medication on your own — talk with your care team first.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a calm reminder card reading "Talk to your care team before any changes" with a soft glowing teal shield icon and a gentle chat bubble, generous negative space. ${STYLE}. Medium composition, premium UI aesthetic, supportive and reassuring rather than stern. Mood: protective, caring, clear. No alarming red, no clinical claims, no specific drugs.`,
    exactVideoGenerationPrompt:
      `6-second animation where a "Talk to your care team before any changes" card settles in and a soft shield and chat icon fade in beside it, calm teal glow on deep navy. ${STYLE}. Smooth, caring, reassuring motion; supportive not stern; no alarming colors.`,
    stockSearchTerms: [
      'talk to doctor before changes concept',
      'medication safety reminder graphic',
      'do not stop medication illustration',
      'care team reminder card ui',
      'medication guidance shield render',
      'consult care team concept clean',
    ],
    overlayLabels: [
      { text: 'Talk to your care team first', x: 50, y: 20 },
      { text: 'Before any changes', x: 60, y: 72 },
    ],
    animationTreatment:
      'Card settles in then shield and chat icons fade in; the "Talk to your care team first" caption holds with a soft glow.',
    personalizationOverlay:
      'If anything feels off, Linda, please talk with your care team before changing anything on your own.',
    voiceover:
      "And you're never on your own, Linda. If anything ever feels off, talk to your care team first — never change it alone.",
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 6. lab-result-explanation =================== */
  {
    assetId: 'lab-result-explanation-1',
    useCaseId: 'lab-result-explanation',
    sceneNumber: 1,
    recommendedFileName: 'blood-sample-collection-nongraphic-still.jpg',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A calm, non-graphic still of a single sealed sample tube in a rack with a soft label, representing a blood sample being collected for testing.',
    whatPatientLearns:
      'A lab result starts with a small, simple sample — it is a routine step.',
    exactImageGenerationPrompt:
      `Calm, non-graphic close-up still of a single sealed laboratory sample tube with a soft blank label resting in a clear rack on a clean matte surface, gentle teal accent light, shallow depth of field. ${STYLE}. Close-up composition, premium clinical product photography, no needles, no blood visible (tube shown sealed and abstract), tidy and routine. Mood: simple, calm, non-threatening.`,
    exactVideoGenerationPrompt:
      `5-second gentle rack-focus settling on a single sealed sample tube in a clean rack, calm teal light, soft bokeh. ${STYLE}. Calm, routine, reassuring motion; no needles, no blood, no procedure.`,
    stockSearchTerms: [
      'lab sample tube clean studio',
      'blood test vial rack medical',
      'laboratory specimen tube neutral',
      'sample collection tube soft light',
      'clinical lab tube close up',
      'medical sample container photo',
    ],
    overlayLabels: [
      { text: 'A small sample', x: 40, y: 32 },
      { text: 'A routine step', x: 60, y: 68 },
    ],
    animationTreatment:
      'Soft rack-focus from blur to sharp; captions fade in calmly to keep the mood low-key and routine.',
    personalizationOverlay:
      'Waiting can feel uneasy, David — so first, here is the calm, ordinary path your sample takes.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'lab-result-explanation-2',
    useCaseId: 'lab-result-explanation',
    sceneNumber: 2,
    recommendedFileName: 'sample-tube-labeled-closeup-still.jpg',
    assetType: 'still-image',
    closeupLevel: 'macro',
    visualDescription:
      'A macro still of a single sealed sample tube with a soft blank label and a gentle barcode motif — conveying that each sample is carefully tracked.',
    whatPatientLearns:
      'Your sample is carefully labeled and tracked so the right results come back to you.',
    exactImageGenerationPrompt:
      `Macro still of a single sealed laboratory sample tube with a clean blank label and a soft, abstract barcode motif (no readable text or numbers), on a tidy matte surface with calm teal accent light, very shallow depth of field. ${STYLE}. Macro composition, premium clinical product photography, nothing biological visible. Mood: precise, careful, reassuring. No readable PHI, no needles, no blood.`,
    exactVideoGenerationPrompt:
      `5-second slow macro push-in across a sealed sample tube’s soft label and abstract barcode motif, calm teal light, gentle bokeh. ${STYLE}. Precise, calm motion; nothing biological; no readable PHI.`,
    stockSearchTerms: [
      'sample tube label barcode macro',
      'specimen tube tracking close up',
      'lab sample labeled tube photo',
      'blood tube barcode clean macro',
      'sample identification tube render',
      'laboratory tube label soft light',
    ],
    overlayLabels: [
      { text: 'Carefully labeled', x: 44, y: 30 },
      { text: 'Tracked to you', x: 62, y: 66 },
    ],
    animationTreatment:
      'Slow macro push-in along the label; captions fade in to reinforce careful tracking.',
    personalizationOverlay:
      'Every sample is carefully labeled, David — so the results that return are truly yours.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'lab-result-explanation-3',
    useCaseId: 'lab-result-explanation',
    sceneNumber: 3,
    recommendedFileName: 'lab-analyzer-processing-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean render of a modern lab analyzer machine with a tube moving through a softly glowing carousel — conveying a careful, automated process.',
    whatPatientLearns:
      'In the lab, samples are processed carefully by precise machines before results are reviewed.',
    exactImageGenerationPrompt:
      `Clean render of a modern, sleek laboratory analyzer machine with a sample tube seated in a softly glowing teal carousel, smooth brushed-metal and glass surfaces, calm indicator lights, on a tidy lab bench. ${STYLE}. Medium composition, premium product/industrial render, soft studio lighting, organized and precise. Mood: careful, trustworthy, calm. No graphic biology, no alarming displays, no readable result values.`,
    exactVideoGenerationPrompt:
      `7-second smooth render of a sample tube rotating gently into a softly glowing analyzer carousel, calm indicator lights pulsing slowly, brushed-metal surfaces catching soft light. ${STYLE}. Precise, calm, trustworthy motion; no result values, nothing alarming.`,
    stockSearchTerms: [
      'laboratory analyzer machine render',
      'lab automation testing equipment',
      'blood analyzer carousel medical',
      'clinical lab process machine',
      'diagnostic equipment clean render',
      'lab testing instrument animation',
    ],
    overlayLabels: [
      { text: 'Processed carefully', x: 50, y: 20 },
      { text: 'Precise testing', x: 64, y: 64 },
    ],
    animationTreatment:
      'The carousel rotates slowly as indicator lights pulse; callouts fade in to reinforce care and precision.',
    personalizationOverlay:
      'This is the careful, methodical part, David — nothing rushed, nothing left to chance.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'lab-result-explanation-4',
    useCaseId: 'lab-result-explanation',
    sceneNumber: 4,
    recommendedFileName: 'neutral-result-report-concept-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a neutral lab report card with abstract placeholder rows and a soft reference-range bar — no real values, illustrating how a report is laid out.',
    whatPatientLearns:
      'A lab report simply organizes your results — your care team helps you understand what they mean for you.',
    exactImageGenerationPrompt:
      `Clean conceptual render of a neutral lab report card on deep navy with abstract placeholder rows (soft gray bars instead of numbers) and a gentle teal reference-range bar, an elegant header reading "Your Results", a soft "Reviewed with your care team" note. ${STYLE}. Medium composition, premium UI-infographic style, calm and organized, generous spacing. Mood: clarifying, reassuring. Absolutely no real values, no good/bad zones, no interpretation.`,
    exactVideoGenerationPrompt:
      `6-second animation where a neutral lab report card assembles row by row with abstract placeholder bars and a soft reference-range bar, a "Reviewed with your care team" note fading in, calm teal glow on deep navy. ${STYLE}. Orderly, reassuring motion; no real values; no interpretation.`,
    stockSearchTerms: [
      'lab report card ui concept',
      'medical results layout infographic',
      'blood test report neutral graphic',
      'reference range bar illustration',
      'health report card render',
      'results document concept clean',
    ],
    overlayLabels: [
      { text: 'How a report is organized', x: 50, y: 18 },
      { text: 'Reviewed with your team', x: 50, y: 82 },
    ],
    animationTreatment:
      'Report rows assemble top-down with placeholder bars; the "Reviewed with your team" caption fades in last to anchor on care-team guidance.',
    personalizationOverlay:
      'Numbers can look intimidating, David — so this shows the layout only, and your team walks the meaning through with you.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'lab-result-explanation-5',
    useCaseId: 'lab-result-explanation',
    sceneNumber: 5,
    recommendedFileName: 'clinician-reviewing-results-with-patient.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm clinic scene of a clinician reviewing results with a patient on a tablet, calm and collaborative — no readable values on screen.',
    whatPatientLearns:
      'Your clinician walks through your results with you — you do not have to interpret them alone.',
    exactImageGenerationPrompt:
      `Warm, photorealistic clinic scene of a friendly clinician and an adult patient seated together, calmly reviewing an abstract chart on a tablet (no readable numbers), relaxed and respectful body language, soft natural daylight, calm teal accents. ${STYLE}. Medium two-shot composition, human and reassuring, no medical procedures. Mood: collaborative, clear, supportive.`,
    exactVideoGenerationPrompt:
      `7-second gentle push-in on a clinician and patient reviewing an abstract chart on a tablet together, soft daylight, natural nods. ${STYLE}. Slow, human, reassuring motion; no readable numbers; collaborative tone.`,
    stockSearchTerms: [
      'doctor reviewing results with patient',
      'clinician explaining lab results',
      'physician patient tablet chart warm',
      'healthcare results conversation',
      'doctor patient discussion calm',
      'results review consultation',
    ],
    overlayLabels: [
      { text: 'Reviewed together', x: 50, y: 20 },
      { text: 'Never alone', x: 62, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in sequentially as the conversation settles.',
    personalizationOverlay:
      'You will not have to read these alone, David — your clinician walks through every part with you.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'lab-result-explanation-6',
    useCaseId: 'lab-result-explanation',
    sceneNumber: 6,
    recommendedFileName: 'patient-portal-result-notification-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a friendly phone showing a calm "Your results are ready" portal notification — no readable values, reassuring not alarming.',
    whatPatientLearns:
      'When results are ready, you get a calm notification — and your care team is there to help you read them.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a friendly smartphone showing a calm patient-portal notification card reading "Your results are ready" with a soft glowing teal bell icon, generous negative space. ${STYLE}. Medium composition, premium UI mockup aesthetic, calm and reassuring rather than alarming. Mood: gentle, supported. No readable PHI, no real values, no good/bad framing.`,
    exactVideoGenerationPrompt:
      `6-second animation where a phone-portal notification card gently slides in reading "Your results are ready" with a soft glowing bell icon, calm teal glow on deep navy. ${STYLE}. Smooth, reassuring motion; no readable values; gentle not alarming.`,
    stockSearchTerms: [
      'patient portal notification concept',
      'results ready phone alert ui',
      'health app notification clean render',
      'lab results portal mockup',
      'medical results notification graphic',
      'patient portal phone screen',
    ],
    overlayLabels: [
      { text: 'Your results are ready', x: 50, y: 22 },
      { text: 'Help is there', x: 62, y: 70 },
    ],
    animationTreatment:
      'Notification card slides in and the bell icon glows gently; the caption holds with a soft reassuring tone.',
    personalizationOverlay:
      'When the notification arrives, David, take a breath — your care team is right there to read it with you.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'lab-result-explanation-7',
    useCaseId: 'lab-result-explanation',
    sceneNumber: 7,
    recommendedFileName: 'questions-before-followup-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean, friendly concept render of a calm note card titled "Questions before my follow-up" with soft question-mark and chat icons — encouraging preparation.',
    whatPatientLearns:
      'Writing down your questions before the follow-up helps you get clear answers.',
    exactImageGenerationPrompt:
      `Clean, friendly conceptual render of a calm note card titled "Questions before my follow-up" surrounded by a few softly glowing question-mark and speech-bubble icons floating on deep navy, gentle teal glow, generous negative space. ${STYLE}. Medium composition, premium UI-infographic style, encouraging and warm. Mood: empowering, prepared. No specific clinical claims, no result interpretation.`,
    exactVideoGenerationPrompt:
      `6-second animation where soft question-mark and chat icons gently float and settle around a "Questions before my follow-up" note card, calm teal glow on deep navy. ${STYLE}. Warm, inviting, gentle motion; encourages preparation.`,
    stockSearchTerms: [
      'questions before follow up concept',
      'note card questions ui render',
      'patient preparing questions',
      'health questions list illustration',
      'ask your care team graphic',
      'appointment prep card render',
    ],
    overlayLabels: [
      { text: 'Write your questions', x: 50, y: 20 },
      { text: 'Get clear answers', x: 62, y: 70 },
    ],
    animationTreatment:
      'Icons drift in and settle around the card; the "Write your questions" caption fades in with a soft glow.',
    personalizationOverlay:
      'If the waiting brings up worries, David, write them down — your follow-up is the place for clear answers.',
    priority: 'low',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 7. prenatal-visit-prep ===================== */
  {
    assetId: 'prenatal-visit-prep-1',
    useCaseId: 'prenatal-visit-prep',
    sceneNumber: 1,
    recommendedFileName: 'calm-prenatal-exam-room-still.jpg',
    assetType: 'still-image',
    closeupLevel: 'wide',
    visualDescription:
      'A warm, welcoming still of a tidy, sunlit prenatal exam room with a comfortable exam chair and friendly decor — calm and unintimidating.',
    whatPatientLearns:
      'Your prenatal visit happens in a calm, welcoming space designed to put you at ease.',
    exactImageGenerationPrompt:
      `Warm, photorealistic still of a tidy, sunlit prenatal exam room: a comfortable cushioned exam chair, soft pastel and teal accents, a window with gentle daylight, a couple of friendly framed prints, a small plant. ${STYLE}. Wide composition, welcoming and serene, no intimidating equipment foregrounded, no procedures. Mood: safe, gentle, comfortable. Designed to feel calm and human.`,
    exactVideoGenerationPrompt:
      `6-second slow pan across a sunlit, welcoming prenatal exam room — comfortable chair, soft decor, gentle daylight — calm and serene. ${STYLE}. Soft, reassuring motion; no procedures; warm and human.`,
    stockSearchTerms: [
      'prenatal exam room interior calm',
      'ob gyn office welcoming space',
      'comfortable medical exam room photo',
      'maternity clinic interior soft light',
      'pregnancy care room friendly',
      'exam room sunlight plant decor',
    ],
    overlayLabels: [
      { text: 'A welcoming space', x: 50, y: 18 },
      { text: 'Here to support you', x: 64, y: 70 },
    ],
    animationTreatment:
      'Gentle pan with soft light bloom; warm captions fade in to set a reassuring tone.',
    personalizationOverlay:
      'Your partner is welcome to come along, Amina — here is the calm space waiting for you both.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'prenatal-visit-prep-2',
    useCaseId: 'prenatal-visit-prep',
    sceneNumber: 2,
    recommendedFileName: 'ultrasound-machine-device-still.jpg',
    assetType: 'still-image',
    closeupLevel: 'medium',
    visualDescription:
      'A clean still of a modern ultrasound machine in a tidy room with a blank, softly glowing screen — the device only, with no fetal imagery shown.',
    whatPatientLearns:
      'Some visits may include an ultrasound — a gentle, sound-based way to look, with no needles.',
    exactImageGenerationPrompt:
      `Clean photorealistic still of a modern ultrasound machine in a tidy, softly lit clinic room, sleek console with a blank softly glowing teal screen (no images on it), a comfortable chair nearby, calm daylight. ${STYLE}. Medium composition, premium clinical product photography, reassuring and modern. Mood: gentle, non-invasive, calm. Show the device only — absolutely no fetal imagery and no claims about a baby.`,
    exactVideoGenerationPrompt:
      `6-second slow push-in on a modern ultrasound machine with a softly glowing blank screen in a calm, tidy room, gentle daylight, calm teal accent. ${STYLE}. Soft, reassuring motion; device only; no fetal imagery; no claims.`,
    stockSearchTerms: [
      'ultrasound machine clinic clean',
      'sonography equipment modern render',
      'ultrasound console blank screen',
      'prenatal ultrasound device photo',
      'medical ultrasound machine soft light',
      'obstetric ultrasound equipment',
    ],
    overlayLabels: [
      { text: 'Gentle, sound-based', x: 50, y: 20 },
      { text: 'No needles', x: 66, y: 66 },
    ],
    animationTreatment:
      'Slow push-in toward the console; the screen glow gently pulses while captions fade in sequentially.',
    personalizationOverlay:
      'For your first pregnancy, Amina, here is what an ultrasound device looks like — calm and gentle, with no needles.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'prenatal-visit-prep-3',
    useCaseId: 'prenatal-visit-prep',
    sceneNumber: 3,
    recommendedFileName: 'pregnancy-visit-timeline-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean infographic render of a gentle pregnancy visit timeline with softly glowing milestone dots and friendly icons across a calm horizontal path.',
    whatPatientLearns:
      'Prenatal care follows a friendly schedule of visits, so you know what to expect along the way.',
    exactImageGenerationPrompt:
      `Clean conceptual infographic render of a gentle pregnancy care visit timeline on deep navy: a calm horizontal path with several softly glowing teal milestone dots, each paired with a friendly icon (calendar, heart, conversation), elegant thin connecting line, generous spacing. ${STYLE}. Medium composition, premium UI-infographic style, warm and clarifying. Mood: organized, reassuring. Generic schedule only — no claims about the baby, no clinical predictions.`,
    exactVideoGenerationPrompt:
      `6-second animated pregnancy visit timeline where milestone dots light up one by one along a calm horizontal path, gentle icons fading in above each, soft teal glow on deep navy. ${STYLE}. Orderly, warm motion; generic schedule only; no claims about the baby.`,
    stockSearchTerms: [
      'pregnancy timeline infographic',
      'prenatal visit schedule graphic',
      'maternity care milestones illustration',
      'pregnancy appointments timeline render',
      'antenatal schedule ui concept',
      'prenatal care journey visual',
    ],
    overlayLabels: [
      { text: 'First visit', x: 18, y: 50 },
      { text: 'Regular check-ins', x: 56, y: 50 },
      { text: 'Know what to expect', x: 50, y: 18 },
    ],
    animationTreatment:
      'Milestone dots illuminate left-to-right as the connecting line draws between them; labels fade in with each dot.',
    personalizationOverlay:
      'So you and your partner can plan together, Amina, here is the friendly rhythm of prenatal visits ahead.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'prenatal-visit-prep-4',
    useCaseId: 'prenatal-visit-prep',
    sceneNumber: 4,
    recommendedFileName: 'routine-prenatal-checks-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of friendly routine-check icons (blood pressure cuff, weight scale, gentle measurement) arranged calmly — conveying simple, expected checks.',
    whatPatientLearns:
      'Routine visits include a few simple, gentle checks — quick and nothing to worry about.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a calm row of friendly routine-check icons (blood pressure cuff, weight scale, gentle measuring tape, water glass) softly glowing in teal, connected by a gentle line, generous negative space. ${STYLE}. Medium composition, premium UI-infographic style, warm and clarifying. Mood: simple, reassuring, expected. No clinical claims, no predictions, no fetal imagery.`,
    exactVideoGenerationPrompt:
      `6-second animation where friendly routine-check icons fade in one by one along a calm line, soft teal glow on deep navy. ${STYLE}. Orderly, warm, reassuring motion; simple expected checks; no clinical claims.`,
    stockSearchTerms: [
      'prenatal routine checks icons',
      'pregnancy visit checks concept',
      'blood pressure weight check graphic',
      'routine exam icons illustration',
      'antenatal check ui render',
      'simple health checks concept clean',
    ],
    overlayLabels: [
      { text: 'A few simple checks', x: 50, y: 20 },
      { text: 'Quick and gentle', x: 62, y: 70 },
    ],
    animationTreatment:
      'Check icons fade in sequentially along the line; the "A few simple checks" caption holds with a soft glow.',
    personalizationOverlay:
      'Each visit has just a few gentle checks, Amina — quick, simple, and nothing to worry about.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'prenatal-visit-prep-5',
    useCaseId: 'prenatal-visit-prep',
    sceneNumber: 5,
    recommendedFileName: 'partner-support-at-appointment.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm scene of a pregnant patient and her supportive partner sitting together in a bright clinic waiting area — calm, hopeful, and together.',
    whatPatientLearns:
      'Your partner is welcome to come along — going through it together can feel reassuring.',
    exactImageGenerationPrompt:
      `Warm, photorealistic scene of a pregnant patient and her supportive partner seated comfortably together in a bright, friendly clinic waiting area, gentle smiles, relaxed and caring body language, soft daylight, calm teal accents and gentle greenery. ${STYLE}. Medium two-shot composition, human and hopeful, no medical equipment. Mood: supported, together, reassuring.`,
    exactVideoGenerationPrompt:
      `6-second gentle push-in on a pregnant patient and her partner sitting together in a bright clinic waiting area, soft daylight, caring smiles. ${STYLE}. Slow, warm, hopeful motion; no medical equipment; together-and-supported tone.`,
    stockSearchTerms: [
      'pregnant woman partner clinic waiting',
      'couple prenatal appointment warm',
      'expecting parents clinic together',
      'partner support pregnancy visit',
      'pregnant couple waiting room',
      'expecting couple clinic hopeful',
    ],
    overlayLabels: [
      { text: 'Together', x: 50, y: 20 },
      { text: 'Partner welcome', x: 64, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in to affirm partner support.',
    personalizationOverlay:
      'Your partner being involved means a lot, Amina — you can go through every step together.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'prenatal-visit-prep-6',
    useCaseId: 'prenatal-visit-prep',
    sceneNumber: 6,
    recommendedFileName: 'pregnancy-notes-questions-app-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a friendly notes app titled "My pregnancy questions" with soft note rows and gentle icons — encouraging patients to jot things down.',
    whatPatientLearns:
      'Keeping a simple list of your questions helps you make the most of each visit.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a friendly phone notes app titled "My pregnancy questions" with soft note rows and gentle question-mark, heart, and calendar icons, calm teal glow, generous negative space. ${STYLE}. Medium composition, premium UI mockup aesthetic, warm and encouraging. Mood: empowering, prepared. No readable PHI, no clinical claims, no predictions.`,
    exactVideoGenerationPrompt:
      `6-second animation where a "My pregnancy questions" notes app assembles with soft note rows and gentle icons fading in, calm teal glow on deep navy. ${STYLE}. Warm, inviting, gentle motion; encourages note-taking; no readable PHI.`,
    stockSearchTerms: [
      'pregnancy notes app concept',
      'questions list app ui render',
      'maternity notes app mockup',
      'health notes app clean illustration',
      'pregnancy questions tracker graphic',
      'patient notes app render',
    ],
    overlayLabels: [
      { text: 'My pregnancy questions', x: 50, y: 22 },
      { text: 'Jot it down', x: 62, y: 70 },
    ],
    animationTreatment:
      'Notes app assembles row by row as icons fade in; the "Jot it down" caption holds with a soft glow.',
    personalizationOverlay:
      'First pregnancies bring lots of questions, Amina — keep a simple list so none get forgotten.',
    priority: 'low',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'prenatal-visit-prep-7',
    useCaseId: 'prenatal-visit-prep',
    sceneNumber: 7,
    recommendedFileName: 'calm-clinician-conversation.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm clinic scene of a friendly clinician talking calmly with a pregnant patient — reassuring, unhurried, and kind.',
    whatPatientLearns:
      'Your clinician is there to listen and answer your questions — it is a calm, two-way conversation.',
    exactImageGenerationPrompt:
      `Warm, photorealistic clinic scene of a friendly clinician speaking calmly with a pregnant patient seated comfortably, relaxed and kind body language, soft natural daylight, calm teal accents. ${STYLE}. Medium two-shot composition, human and reassuring, no medical procedures. Mood: kind, unhurried, two-way conversation.`,
    exactVideoGenerationPrompt:
      `7-second gentle push-in on a friendly clinician talking calmly with a pregnant patient, soft daylight, natural nods. ${STYLE}. Slow, human, reassuring motion; no procedures; kind conversational tone.`,
    stockSearchTerms: [
      'clinician talking pregnant patient',
      'ob gyn conversation warm',
      'doctor pregnant woman consultation',
      'midwife patient discussion calm',
      'prenatal care conversation',
      'pregnant patient doctor talking',
    ],
    overlayLabels: [
      { text: 'A calm conversation', x: 50, y: 20 },
      { text: 'Your questions welcome', x: 64, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in sequentially as the conversation settles.',
    personalizationOverlay:
      'Bring every question, Amina — your clinician is there to listen and walk through it calmly with you.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 8. language-access ========================= */
  {
    assetId: 'language-access-1',
    useCaseId: 'language-access',
    sceneNumber: 1,
    recommendedFileName: 'bp-cuff-on-arm.mp4',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A calm, friendly still of a blood pressure cuff wrapped on an upper arm with a soft monitor nearby — a familiar, gentle measurement.',
    whatPatientLearns:
      'Checking blood pressure is quick and painless — a cuff gently squeezes your arm for a moment.',
    exactImageGenerationPrompt:
      `Calm, friendly photorealistic still of a blood pressure cuff comfortably wrapped around a person’s upper arm resting on a table, a sleek modern monitor softly out of focus beside it, gentle daylight, calm teal accents. ${STYLE}. Close-up composition, warm and approachable, relaxed posture, no distress, no readable numbers on the monitor. Mood: routine, gentle, easy.`,
    exactVideoGenerationPrompt:
      `5-second gentle push-in on a blood pressure cuff comfortably on an upper arm with a soft monitor nearby, calm daylight, relaxed mood. ${STYLE}. Soft, easy, reassuring motion; no readable numbers; nothing clinical-feeling.`,
    stockSearchTerms: [
      'blood pressure cuff on arm calm',
      'blood pressure measurement clinic',
      'bp monitor arm cuff photo',
      'sphygmomanometer arm soft light',
      'taking blood pressure friendly',
      'blood pressure check patient relaxed',
    ],
    overlayLabels: [
      { text: 'Presión arterial', x: 50, y: 20 },
      { text: 'Rápido y sin dolor', x: 60, y: 70 },
    ],
    animationTreatment:
      'Gentle push-in; Spanish callouts fade in sequentially with a soft glow to support language access.',
    personalizationOverlay:
      'Carlos, esto es lo que pasa en su cita: el brazalete aprieta el brazo un momento. Rápido y sin dolor.',
    voiceover:
      'Carlos, esto es lo que pasa en su cita: un brazalete aprieta su brazo un momento. Es rápido y no duele.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'language-access-2',
    useCaseId: 'language-access',
    sceneNumber: 2,
    recommendedFileName: 'bp-cuff-inflating.mp4',
    assetType: 'short-motion-video',
    closeupLevel: 'close-up',
    visualDescription:
      'A calm motion concept of a blood pressure cuff gently inflating and then easing off on an upper arm — showing the brief, painless squeeze.',
    whatPatientLearns:
      'The cuff gently tightens for a few seconds, then releases — that brief squeeze is all it is.',
    exactImageGenerationPrompt:
      `Calm, friendly close-up render of a blood pressure cuff on a relaxed upper arm mid-gentle-inflation, soft fabric tension, a sleek monitor softly out of focus, gentle daylight, calm teal accents. ${STYLE}. Close-up composition, warm and approachable, no distress, no readable numbers. Mood: gentle, brief, easy.`,
    exactVideoGenerationPrompt:
      `6-second close-up of a blood pressure cuff gently inflating on a relaxed upper arm and then easing off, soft fabric motion, calm daylight, monitor softly out of focus. ${STYLE}. Soft, gentle, reassuring motion; the brief squeeze shown calmly; no readable numbers; nothing clinical-feeling.`,
    stockSearchTerms: [
      'blood pressure cuff inflating arm',
      'bp cuff squeeze animation',
      'automatic blood pressure cuff motion',
      'cuff inflating close up video',
      'blood pressure measurement motion',
      'bp monitor cuff tightening',
    ],
    overlayLabels: [
      { text: 'Aprieta un momento', x: 44, y: 30 },
      { text: 'Luego se suelta', x: 60, y: 66 },
    ],
    animationTreatment:
      'The cuff gently inflates and releases as Spanish callouts fade in to narrate the brief squeeze.',
    personalizationOverlay:
      'El brazalete aprieta solo unos segundos, Carlos, y luego se suelta. Eso es todo.',
    voiceover:
      'El brazalete se aprieta solo unos segundos, y luego se suelta. Eso es todo — nada incómodo.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'language-access-2b',
    useCaseId: 'language-access',
    sceneNumber: 2,
    recommendedFileName: 'beating-heart.mp4',
    assetType: 'medical-render',
    closeupLevel: 'macro',
    visualDescription:
      'A realistic 3D render of a steadily beating human heart — conveying that blood pressure is the force of each heartbeat.',
    whatPatientLearns:
      'Blood pressure is simply the force of your heart pumping blood with each steady beat.',
    exactImageGenerationPrompt:
      `Hyper-realistic 3D anatomical render of a human heart beating steadily in deep navy space, realistic cardiac muscle with surface vessels and a natural moist sheen, soft teal rim light, gentle particle bokeh. ${STYLE}. Calm, steady rhythm, believable like a premium medical visualization. Mood: reassuring, steady.`,
    exactVideoGenerationPrompt:
      `8-second slow orbit around a realistic human heart beating two or three calm, even beats in deep navy space, soft teal rim light, gentle bokeh. ${STYLE}. Steady, reassuring rhythm; never frantic.`,
    stockSearchTerms: [
      'beating heart 3d render realistic',
      'human heart anatomy animation',
      'heart pumping medical visualization',
      'cardiac muscle beating render',
      'realistic heart 3d teal',
      'heartbeat anatomical animation',
    ],
    overlayLabels: [
      { text: 'Su corazón', x: 50, y: 24 },
      { text: 'Late con fuerza', x: 60, y: 66 },
    ],
    animationTreatment:
      'Slow orbit around the steadily beating heart; Spanish callouts fade in with each calm beat.',
    personalizationOverlay:
      'Su presión es la fuerza de su corazón, Carlos — un latido fuerte y constante.',
    voiceover:
      'Su presión arterial es la fuerza con la que su corazón bombea la sangre — un latido fuerte y constante.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'language-access-3',
    useCaseId: 'language-access',
    sceneNumber: 3,
    recommendedFileName: 'artery-pulse-flow.mp4',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A stylized, general render of a smooth artery with gentle glowing blood flow and a soft pulse rhythm — clean, calm, conceptual.',
    whatPatientLearns:
      'Blood pressure is simply how blood moves through your vessels — a normal part of your body working.',
    exactImageGenerationPrompt:
      `Stylized, general conceptual render of a smooth, clean artery cross-section on deep navy with gentle glowing teal blood flow moving smoothly through it and a soft pulse rhythm, friendly and abstract rather than anatomically graphic, soft glow and bokeh. ${STYLE}. Medium composition, elegant and minimal, generous negative space. Mood: calm, clarifying. General concept only — no clinical claim, no good/bad framing, no narrowing/disease depiction.`,
    exactVideoGenerationPrompt:
      `7-second animation of gentle glowing blood flow moving smoothly through a clean, stylized artery with a soft pulse rhythm, soft teal glow on deep navy. ${STYLE}. Smooth, soothing, conceptual motion; no disease depiction; no clinical claim.`,
    stockSearchTerms: [
      'blood flow artery animation calm',
      'artery cross section render clean',
      'blood vessel flow concept medical',
      'circulation illustration general',
      'blood flow education visual',
      'artery blood movement animation',
    ],
    overlayLabels: [
      { text: 'Arteria', x: 30, y: 30 },
      { text: 'Flujo de sangre', x: 64, y: 60 },
    ],
    animationTreatment:
      'Continuous gentle flow with soft pulse rhythm; Spanish callouts fade in tracing the vessel and the flow.',
    personalizationOverlay:
      'Así funciona su cuerpo, Carlos: la sangre fluye por sus vasos. Es algo normal y cotidiano.',
    voiceover:
      'Esa sangre fluye por sus arterias con cada latido. Es algo normal y cotidiano de su cuerpo.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'language-access-4',
    useCaseId: 'language-access',
    sceneNumber: 4,
    recommendedFileName: 'home-bp-monitor.mp4',
    assetType: 'still-image',
    closeupLevel: 'medium',
    visualDescription:
      'A clean still of a home blood pressure setup on a kitchen table — a friendly automatic monitor, a chair, a glass of water — calm and approachable.',
    whatPatientLearns:
      'You can check your blood pressure comfortably at home with a simple, friendly monitor.',
    exactImageGenerationPrompt:
      `Clean photorealistic still of a home blood pressure setup on a tidy kitchen table: a friendly automatic upper-arm monitor, a comfortable chair, a glass of water, soft morning daylight, calm teal accents. ${STYLE}. Medium composition, warm and domestic, approachable and uncluttered, no readable numbers on the monitor. Mood: easy, empowering, calm.`,
    exactVideoGenerationPrompt:
      `5-second slow pan across a tidy home blood pressure setup on a kitchen table — friendly monitor, chair, glass of water — soft morning light. ${STYLE}. Calm, domestic, reassuring motion; no readable numbers; approachable tone.`,
    stockSearchTerms: [
      'home blood pressure monitor table',
      'automatic bp monitor home setup',
      'measuring blood pressure at home',
      'home health monitor kitchen',
      'digital blood pressure device home',
      'self monitoring blood pressure photo',
    ],
    overlayLabels: [
      { text: 'En casa', x: 50, y: 18 },
      { text: 'Fácil y cómodo', x: 64, y: 68 },
    ],
    animationTreatment:
      'Gentle pan with soft light bloom; Spanish callouts fade in to reinforce that home checking is easy.',
    personalizationOverlay:
      'En casa puede revisarla con calma, Carlos. Es fácil, cómodo, y usted tiene el control.',
    voiceover:
      'En casa puede revisarla con calma, Carlos. Es fácil, cómodo, y usted tiene el control.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'language-access-5',
    useCaseId: 'language-access',
    sceneNumber: 5,
    recommendedFileName: 'son-helping-parent-understand.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm scene of an adult son helping his father understand a home blood pressure monitor at the kitchen table — caring and patient.',
    whatPatientLearns:
      'Someone you trust can help you learn the steps — you do not have to figure it out alone.',
    exactImageGenerationPrompt:
      `Warm, photorealistic scene of an adult son sitting beside his older father at a kitchen table, gently helping him with a home blood pressure monitor, soft morning daylight, caring and patient body language, calm teal accents. ${STYLE}. Medium two-shot composition, tender and human, no distress, no readable numbers. Mood: caring, supportive, patient.`,
    exactVideoGenerationPrompt:
      `6-second gentle push-in on an adult son helping his father with a home blood pressure monitor at the kitchen table, soft daylight, caring nods. ${STYLE}. Slow, warm, patient motion; no readable numbers; supportive tone.`,
    stockSearchTerms: [
      'son helping father blood pressure',
      'family helping with home monitor',
      'adult child helping elderly parent device',
      'caregiver teaching blood pressure',
      'family support home health',
      'son father kitchen helping',
    ],
    overlayLabels: [
      { text: 'No está solo', x: 50, y: 20 },
      { text: 'La familia ayuda', x: 62, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; Spanish callouts fade in to affirm family support.',
    personalizationOverlay:
      'No tiene que aprenderlo solo, Carlos — alguien de confianza puede ayudarle paso a paso.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'language-access-6',
    useCaseId: 'language-access',
    sceneNumber: 6,
    recommendedFileName: 'clinician-followup-conversation.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm clinic scene of a clinician talking calmly with a patient at a follow-up visit, with an interpreter-friendly, welcoming feel.',
    whatPatientLearns:
      'Your follow-up is a calm conversation — and you can have it in the language you are most comfortable with.',
    exactImageGenerationPrompt:
      `Warm, photorealistic clinic scene of a friendly clinician speaking calmly with an adult patient at a follow-up visit, relaxed and respectful body language, soft natural daylight, calm teal accents. ${STYLE}. Medium two-shot composition, human and welcoming, no medical procedures. Mood: kind, unhurried, language-friendly. No readable PHI.`,
    exactVideoGenerationPrompt:
      `7-second gentle push-in on a clinician talking calmly with a patient at a follow-up visit, soft daylight, natural nods. ${STYLE}. Slow, human, reassuring motion; no procedures; welcoming and language-friendly.`,
    stockSearchTerms: [
      'clinician patient follow up conversation',
      'doctor patient talking warm clinic',
      'healthcare follow up consultation',
      'physician explaining calmly patient',
      'medical interpreter friendly visit',
      'doctor patient discussion calm',
    ],
    overlayLabels: [
      { text: 'Su seguimiento', x: 50, y: 20 },
      { text: 'En su idioma', x: 62, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; Spanish callouts fade in sequentially as the conversation settles.',
    personalizationOverlay:
      'Su cita de seguimiento es una conversación tranquila, Carlos — y puede ser en su idioma.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'language-access-7',
    useCaseId: 'language-access',
    sceneNumber: 7,
    recommendedFileName: 'spanish-education-phone.mp4',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a calm education screen with a soft Spanish caption bar and a friendly language toggle — affirming care in the patient’s own language.',
    whatPatientLearns:
      'This education is available in Spanish — clear words in the language you know best.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a calm patient-education screen with a soft glowing teal caption bar showing a simple Spanish phrase placeholder and a friendly language toggle marked "ES / EN", generous negative space. ${STYLE}. Medium composition, premium UI mockup aesthetic, warm and inclusive. Mood: welcoming, accessible, dignified. No readable PHI, no clinical claims.`,
    exactVideoGenerationPrompt:
      `6-second animation where a calm education screen assembles, a soft Spanish caption bar slides in, and a friendly "ES / EN" language toggle gently glows, calm teal glow on deep navy. ${STYLE}. Smooth, welcoming motion; inclusive and accessible; no readable PHI.`,
    stockSearchTerms: [
      'spanish captions education concept',
      'language toggle ui render',
      'bilingual health education graphic',
      'spanish subtitle screen mockup',
      'accessible language ui concept',
      'patient education caption render',
    ],
    overlayLabels: [
      { text: 'En español', x: 50, y: 22 },
      { text: 'Palabras claras', x: 62, y: 70 },
    ],
    animationTreatment:
      'Education screen assembles, the Spanish caption bar slides in, and the language toggle glows gently.',
    personalizationOverlay:
      'Toda esta información está en español, Carlos — en palabras claras, en el idioma que mejor conoce.',
    voiceover:
      'Y toda esta información está aquí en español — en palabras claras, en el idioma que mejor conoce.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 9. procedure-prep ========================= */
  {
    assetId: 'procedure-prep-1',
    useCaseId: 'procedure-prep',
    sceneNumber: 1,
    recommendedFileName: 'colonoscopy-prep-instruction-sheet-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a friendly prep instruction sheet with simple numbered steps and gentle icons — organized and unintimidating, no readable medical text.',
    whatPatientLearns:
      'Your prep instructions are laid out as a few simple, numbered steps to follow.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a friendly preparation instruction sheet card with a few simple numbered step rows and gentle icons (water glass, clock, checkmark), soft placeholder lines instead of readable text, calm teal glow, generous negative space. ${STYLE}. Medium composition, premium UI-infographic style, organized and reassuring. Mood: manageable, clear. Generic prep concept only — no specific medication or dosing text.`,
    exactVideoGenerationPrompt:
      `6-second animation where a prep instruction sheet assembles with numbered step rows and gentle icons fading in one by one, calm teal glow on deep navy. ${STYLE}. Orderly, reassuring motion; generic prep concept; no specific dosing.`,
    stockSearchTerms: [
      'prep instruction sheet concept',
      'numbered steps card ui render',
      'colonoscopy prep instructions graphic',
      'procedure prep checklist illustration',
      'simple steps card clean design',
      'patient instruction sheet render',
    ],
    overlayLabels: [
      { text: 'A few simple steps', x: 50, y: 18 },
      { text: 'Step by step', x: 62, y: 72 },
    ],
    animationTreatment:
      'Step rows assemble top-down as gentle icons fade in; the "A few simple steps" caption holds with a soft glow.',
    personalizationOverlay:
      'While you are caring for your mother, Elaine, here are the prep steps laid out simply, one at a time.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'procedure-prep-2',
    useCaseId: 'procedure-prep',
    sceneNumber: 2,
    recommendedFileName: 'prep-day-clear-liquids-timeline-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean infographic render of a calm prep-day timeline showing clear-liquids icons (water, broth, tea) along a horizontal path — organized and unintimidating.',
    whatPatientLearns:
      'Prep mainly means following a simple clear-liquids schedule on the day before — step by step.',
    exactImageGenerationPrompt:
      `Clean conceptual infographic render of a calm preparation-day timeline on deep navy: a horizontal path with softly glowing teal milestone dots, each paired with a friendly clear-liquid icon (water glass, broth bowl, tea cup, gelatin), elegant thin connecting line, generous spacing. ${STYLE}. Medium composition, premium UI-infographic style, organized and reassuring. Mood: manageable, clear. Generic prep concept only — no specific medication or dosing instructions.`,
    exactVideoGenerationPrompt:
      `6-second animated prep-day timeline where milestone dots light up one by one along a calm path, friendly clear-liquid icons fading in above each, soft teal glow on deep navy. ${STYLE}. Orderly, reassuring motion; generic prep concept; no specific dosing.`,
    stockSearchTerms: [
      'clear liquids diet infographic',
      'colonoscopy prep schedule graphic',
      'procedure preparation timeline render',
      'clear liquid icons illustration',
      'prep day timeline ui concept',
      'bowel prep schedule visual',
    ],
    overlayLabels: [
      { text: 'Day before', x: 22, y: 22 },
      { text: 'Clear liquids', x: 50, y: 50 },
      { text: 'Step by step', x: 78, y: 78 },
    ],
    animationTreatment:
      'Milestone dots illuminate left-to-right as clear-liquid icons fade in above; the connecting line draws between them.',
    personalizationOverlay:
      'Here is the simple clear-liquids rhythm, Elaine — easy to follow even on a busy caregiving day.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'procedure-prep-3',
    useCaseId: 'procedure-prep',
    sceneNumber: 3,
    recommendedFileName: 'clear-liquid-planning-still.jpg',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A clean still of clear liquids arranged neatly on a kitchen counter — a glass of water, clear broth, tea, and gelatin — friendly and approachable.',
    whatPatientLearns:
      'Clear liquids are easy to plan ahead — water, broth, tea, and gelatin are common choices.',
    exactImageGenerationPrompt:
      `Clean photorealistic still of clear liquids arranged neatly on a tidy kitchen counter: a glass of water, a bowl of clear broth, a cup of tea, and a dish of light gelatin, soft daylight, calm teal accents. ${STYLE}. Close-up composition, warm and domestic, approachable and uncluttered. Mood: easy, plan-ahead, calm. No medical text, no readable labels.`,
    exactVideoGenerationPrompt:
      `5-second slow pan across clear liquids neatly arranged on a kitchen counter — water, broth, tea, gelatin — soft daylight. ${STYLE}. Calm, domestic, reassuring motion; approachable and easy tone.`,
    stockSearchTerms: [
      'clear liquids diet foods counter',
      'water broth tea gelatin still',
      'clear liquid diet preparation photo',
      'pre procedure diet liquids',
      'clear liquids kitchen counter',
      'broth water tea arranged clean',
    ],
    overlayLabels: [
      { text: 'Plan ahead', x: 50, y: 18 },
      { text: 'Common choices', x: 62, y: 72 },
    ],
    animationTreatment:
      'Gentle pan with soft light bloom; captions fade in to encourage planning clear liquids ahead.',
    personalizationOverlay:
      'A little planning helps, Elaine — stock these clear liquids ahead so prep day stays simple.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'procedure-prep-4',
    useCaseId: 'procedure-prep',
    sceneNumber: 4,
    recommendedFileName: 'procedure-center-arrival-still.jpg',
    assetType: 'stock-video',
    closeupLevel: 'wide',
    visualDescription:
      'A warm still of a welcoming procedure-center entrance with a friendly staff member ready to greet — emphasizing a calm arrival.',
    whatPatientLearns:
      'Arrival is calm and staff are there to welcome you and guide you through.',
    exactImageGenerationPrompt:
      `Warm, photorealistic still of a welcoming outpatient procedure-center entrance: bright modern doors, a friendly staff member ready to greet, soft morning daylight, calm teal accents and gentle greenery. ${STYLE}. Wide composition, reassuring and human, no medical equipment, no distress. Mood: supported, easy, safe.`,
    exactVideoGenerationPrompt:
      `6-second gentle establishing shot of a welcoming procedure-center entrance with a friendly staff member, soft morning light. ${STYLE}. Calm, supportive, reassuring motion; no medical equipment; human and safe.`,
    stockSearchTerms: [
      'outpatient clinic entrance welcoming',
      'medical center arrival friendly staff',
      'surgery center entrance morning',
      'clinic arrival support photo',
      'procedure center reception welcome',
      'patient arriving clinic friendly',
    ],
    overlayLabels: [
      { text: 'A calm arrival', x: 50, y: 18 },
      { text: 'We’ll welcome you', x: 30, y: 70 },
    ],
    animationTreatment:
      'Slow establishing push-in; the "A calm arrival" caption fades in to set a reassuring tone.',
    personalizationOverlay:
      'When you arrive, Elaine, friendly staff are there to welcome you and guide every step.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'procedure-prep-5',
    useCaseId: 'procedure-prep',
    sceneNumber: 5,
    recommendedFileName: 'colonoscopy-suite-device-nongraphic-still.jpg',
    assetType: 'still-image',
    closeupLevel: 'wide',
    visualDescription:
      'A calm, tidy colonoscopy suite with a comfortable bed and soft modern equipment in the background — non-graphic and welcoming.',
    whatPatientLearns:
      'The procedure room is calm and modern — you rest comfortably while the team works.',
    exactImageGenerationPrompt:
      `Calm, photorealistic still of a tidy, modern colonoscopy suite: a comfortable bed with soft linens, gentle daylight, sleek equipment softly out of focus in the background, calm teal accents and clean negative space. ${STYLE}. Wide composition, welcoming and modern, no intimidating equipment foregrounded, no procedures in progress, no distress, nothing graphic. Mood: safe, calm, reassuring.`,
    exactVideoGenerationPrompt:
      `6-second slow pan across a calm, tidy colonoscopy suite with a comfortable bed and soft background equipment, gentle daylight. ${STYLE}. Soft, reassuring motion; no procedures; nothing graphic; welcoming and safe.`,
    stockSearchTerms: [
      'colonoscopy suite modern clean',
      'endoscopy room calm welcoming',
      'procedure room bed soft light',
      'gastroenterology suite interior',
      'medical procedure room comfortable',
      'day surgery suite calm',
    ],
    overlayLabels: [
      { text: 'Calm and modern', x: 50, y: 18 },
      { text: 'You rest comfortably', x: 60, y: 72 },
    ],
    animationTreatment:
      'Gentle pan with soft light bloom; captions fade in to set a calm, safe tone.',
    personalizationOverlay:
      'It is a calm, modern room, Elaine — you simply rest while your team takes care of everything.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'procedure-prep-6',
    useCaseId: 'procedure-prep',
    sceneNumber: 6,
    recommendedFileName: 'recovery-area-still.jpg',
    assetType: 'stock-video',
    closeupLevel: 'wide',
    visualDescription:
      'A serene recovery area with a comfortable reclining chair, soft blanket, and gentle daylight — restful and reassuring.',
    whatPatientLearns:
      'Afterward, you rest in a calm recovery area until you are ready to head home.',
    exactImageGenerationPrompt:
      `Serene, photorealistic still of a calm recovery area: a comfortable reclining chair with a soft blanket, gentle daylight, a side table with a glass of water, calm teal accents and clean negative space. ${STYLE}. Wide composition, restful and reassuring, no medical equipment foregrounded, no distress. Mood: safe, calm, restful.`,
    exactVideoGenerationPrompt:
      `6-second slow pan across a serene recovery area with a comfortable reclining chair, soft blanket, and gentle daylight. ${STYLE}. Soft, restful motion; no medical equipment; calm and reassuring.`,
    stockSearchTerms: [
      'recovery area reclining chair calm',
      'post procedure recovery room',
      'comfortable recovery space soft light',
      'medical recovery chair blanket',
      'day surgery recovery area',
      'patient recovery room peaceful',
    ],
    overlayLabels: [
      { text: 'A calm recovery', x: 50, y: 18 },
      { text: 'Rest until ready', x: 60, y: 72 },
    ],
    animationTreatment:
      'Gentle pan with soft light bloom; captions fade in to convey calm post-procedure rest.',
    personalizationOverlay:
      'Afterward you rest in a calm spot, Elaine — there is no rush to leave until you feel ready.',
    priority: 'low',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'procedure-prep-7',
    useCaseId: 'procedure-prep',
    sceneNumber: 7,
    recommendedFileName: 'ride-support-person-pickup-render.png',
    assetType: 'medical-render',
    closeupLevel: 'wide',
    visualDescription:
      'A friendly map-route concept render with a soft glowing line and a small car icon arriving at a clinic, with a "Plan a ride home" note — supportive and clear.',
    whatPatientLearns:
      'Plan for a ride home afterward — you will need a support person to pick you up.',
    exactImageGenerationPrompt:
      `Friendly conceptual map-route render on deep navy: a soft glowing teal route line with a gentle simplified car icon arriving at a small "Clinic" pin, a calm "Plan a ride home" note card floating beside it, clean minimal map styling. ${STYLE}. Wide composition, warm and supportive, premium UI-map aesthetic, generous negative space. Mood: helpful, clear, dignified. No stigmatizing tone — purely practical and supportive.`,
    exactVideoGenerationPrompt:
      `6-second animation of a soft glowing route line drawing toward a "Clinic" pin as a gentle car icon arrives and a "Plan a ride home" note card fades in, calm teal glow on deep navy map. ${STYLE}. Smooth, supportive, clear motion; practical and warm.`,
    stockSearchTerms: [
      'ride home from procedure concept',
      'plan a ride home graphic',
      'support person pickup illustration',
      'transportation to clinic render',
      'car arriving clinic map concept',
      'ride arrangement healthcare visual',
    ],
    overlayLabels: [
      { text: 'Plan a ride home', x: 50, y: 18 },
      { text: 'A support person', x: 62, y: 70 },
    ],
    animationTreatment:
      'Route line draws toward the clinic as the car icon arrives; the "Plan a ride home" card fades in as a key reminder.',
    personalizationOverlay:
      'Since you may need to arrange coverage for your mother, Elaine, remember to plan a ride home that day.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 10. caregiver-education =================== */
  {
    assetId: 'caregiver-education-1',
    useCaseId: 'caregiver-education',
    sceneNumber: 1,
    recommendedFileName: 'daughter-helping-parent-review-instructions.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm scene of an adult daughter helping her older parent review care instructions together at a sunlit table — caring and patient.',
    whatPatientLearns:
      'As a caregiver, helping your loved one review instructions is a meaningful, supportive role.',
    exactImageGenerationPrompt:
      `Warm, photorealistic scene of an adult daughter sitting beside her older parent at a sunlit table, gently helping review a printed instruction sheet together (no readable text), caring and patient body language, soft daylight, calm teal accents. ${STYLE}. Medium two-shot composition, tender and human, no medical procedures. Mood: supportive, caring, collaborative.`,
    exactVideoGenerationPrompt:
      `7-second gentle push-in on an adult daughter helping her older parent review instructions together at a sunlit table, soft daylight, caring nods. ${STYLE}. Slow, human, warm motion; no procedures; supportive caregiver tone.`,
    stockSearchTerms: [
      'adult daughter helping elderly parent read',
      'caregiver reviewing instructions parent',
      'family helping senior with documents',
      'daughter helping father paperwork',
      'caregiver supporting parent home',
      'adult child elderly parent instructions',
    ],
    overlayLabels: [
      { text: 'A meaningful role', x: 50, y: 20 },
      { text: 'Reviewing together', x: 62, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in to affirm the caregiver’s supportive role.',
    personalizationOverlay:
      'Helping your father George means a lot, Nina — reviewing his instructions together makes a real difference.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'caregiver-education-2',
    useCaseId: 'caregiver-education',
    sceneNumber: 2,
    recommendedFileName: 'appointment-summary-closeup-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a friendly "Appointment Summary" card with soft section rows and gentle icons — organized for a caregiver at a glance.',
    whatPatientLearns:
      'A simple appointment summary helps you keep the key points organized for your loved one.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a friendly "Appointment Summary" card with soft section rows (placeholder lines, no readable text) and gentle icons (calendar, clipboard, checkmark), calm teal glow, generous negative space. ${STYLE}. Medium composition, premium UI-infographic style, organized and calm. Mood: empowering, clear. No readable PHI, no specific drug names, nothing alarming.`,
    exactVideoGenerationPrompt:
      `6-second animation where an "Appointment Summary" card assembles row by row with gentle icons fading in, calm teal glow on deep navy. ${STYLE}. Orderly, reassuring motion; no readable PHI; caregiver-friendly clarity.`,
    stockSearchTerms: [
      'appointment summary card ui concept',
      'visit summary render clean',
      'care plan summary infographic',
      'caregiver summary card design',
      'health summary document concept',
      'appointment notes card render',
    ],
    overlayLabels: [
      { text: 'Appointment summary', x: 50, y: 20 },
      { text: 'Key points at a glance', x: 62, y: 72 },
    ],
    animationTreatment:
      'Summary card assembles row by row as icons fade in; the title caption holds with a soft glow.',
    personalizationOverlay:
      'A clear summary keeps things easy, Nina — the key points for George, all in one place.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'caregiver-education-3',
    useCaseId: 'caregiver-education',
    sceneNumber: 3,
    recommendedFileName: 'medication-list-review-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a friendly medication list card with soft rows and gentle pill icons — organized and unintimidating, no readable drug names.',
    whatPatientLearns:
      'Keeping a simple, current medication list helps you stay organized as a caregiver.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a friendly medication list card with soft placeholder rows and gentle pill-organizer and clock icons, calm teal glow, generous negative space. ${STYLE}. Medium composition, premium UI-infographic style, organized and calm. Mood: manageable, supportive. No readable drug names, no dosing text, nothing alarming.`,
    exactVideoGenerationPrompt:
      `6-second animation where a medication list card assembles row by row with gentle pill and clock icons fading in, calm teal glow on deep navy. ${STYLE}. Orderly, reassuring motion; no readable drug names or dosing.`,
    stockSearchTerms: [
      'medication list card concept',
      'medication review ui render',
      'caregiver med list infographic',
      'pill list organized graphic',
      'medication schedule card clean',
      'medication tracker render',
    ],
    overlayLabels: [
      { text: 'A current med list', x: 50, y: 20 },
      { text: 'Stay organized', x: 62, y: 72 },
    ],
    animationTreatment:
      'List card assembles row by row as pill icons fade in; the "A current med list" caption holds with a soft glow.',
    personalizationOverlay:
      'Keeping George’s list current makes everything easier, Nina — one simple, organized place.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'caregiver-education-4',
    useCaseId: 'caregiver-education',
    sceneNumber: 4,
    recommendedFileName: 'caregiver-calendar-planning-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean infographic render of a weekly calendar with gentle checkmarks and reminder icons — organized for a caregiver to plan appointments and routines.',
    whatPatientLearns:
      'A simple weekly calendar keeps appointments and routines organized for your loved one.',
    exactImageGenerationPrompt:
      `Clean conceptual infographic render of a friendly weekly calendar grid on deep navy, a few days marked with soft glowing teal checkmarks and gentle icons (calendar, phone call, pill organizer), generous spacing and clear hierarchy. ${STYLE}. Medium composition, premium UI-infographic style, organized and calm. Mood: empowering, manageable. No readable PHI, no specific drug names.`,
    exactVideoGenerationPrompt:
      `6-second animated weekly calendar where soft checkmarks and gentle reminder icons appear on a few days one by one, calm teal glow on deep navy. ${STYLE}. Orderly, reassuring motion; no readable PHI; caregiver-friendly clarity.`,
    stockSearchTerms: [
      'weekly calendar planning concept',
      'caregiver calendar infographic',
      'appointment calendar render clean',
      'care schedule calendar ui',
      'family planning calendar graphic',
      'health reminders calendar render',
    ],
    overlayLabels: [
      { text: 'Plan the week', x: 50, y: 20 },
      { text: 'Appointments and routines', x: 62, y: 72 },
    ],
    animationTreatment:
      'Calendar days populate with checkmarks left-to-right as reminder icons fade in; the title caption holds.',
    personalizationOverlay:
      'A simple weekly plan keeps it all on track, Nina — George’s appointments and routines, organized at a glance.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'caregiver-education-5',
    useCaseId: 'caregiver-education',
    sceneNumber: 5,
    recommendedFileName: 'doctor-question-card-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean, friendly concept render of a "Questions for the doctor" card with soft question-mark and chat icons — encouraging caregivers to come prepared.',
    whatPatientLearns:
      'Bringing a list of questions helps you advocate well at your loved one’s visit.',
    exactImageGenerationPrompt:
      `Clean, friendly conceptual render of a calm "Questions for the doctor" card surrounded by a few softly glowing question-mark and speech-bubble icons floating on deep navy, gentle teal glow, generous negative space. ${STYLE}. Medium composition, premium UI-infographic style, encouraging and warm. Mood: empowering, prepared. No clinical claims, no result interpretation.`,
    exactVideoGenerationPrompt:
      `6-second animation where soft question-mark and chat icons gently float and settle around a "Questions for the doctor" card, calm teal glow on deep navy. ${STYLE}. Warm, inviting, gentle motion; encourages preparation.`,
    stockSearchTerms: [
      'questions for doctor card concept',
      'caregiver questions list render',
      'prepare questions visit graphic',
      'note card questions ui clean',
      'ask the doctor illustration',
      'appointment questions card render',
    ],
    overlayLabels: [
      { text: 'Questions for the doctor', x: 50, y: 20 },
      { text: 'Come prepared', x: 62, y: 72 },
    ],
    animationTreatment:
      'Icons drift in and settle around the card; the "Come prepared" caption fades in with a soft glow.',
    personalizationOverlay:
      'Jot your questions down before the visit, Nina — it helps you advocate well for George.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'caregiver-education-6',
    useCaseId: 'caregiver-education',
    sceneNumber: 6,
    recommendedFileName: 'patient-caregiver-clinician-conversation.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm render of a caregiver, an older patient, and a clinician talking together comfortably in a bright clinic room — a true three-way conversation.',
    whatPatientLearns:
      'As a caregiver, you are part of the care conversation — your questions and notes matter.',
    exactImageGenerationPrompt:
      `Warm, photorealistic clinic scene of a three-way conversation: a caring adult caregiver, an older adult patient, and a friendly clinician seated together in a bright room, relaxed and respectful body language, the caregiver holding a small notebook, soft natural daylight, calm teal accents. ${STYLE}. Medium three-shot composition, human and welcoming, no medical procedures. Mood: collaborative, supported, kind.`,
    exactVideoGenerationPrompt:
      `7-second gentle push-in on a warm three-way clinic conversation between a caregiver, an older patient, and a clinician, soft daylight, natural nods. ${STYLE}. Slow, human, collaborative motion; no procedures; kind and supported.`,
    stockSearchTerms: [
      'caregiver patient doctor conversation',
      'family member clinic appointment',
      'elderly patient caregiver clinician',
      'three people healthcare meeting warm',
      'caregiver taking notes clinic',
      'family caregiver doctor discussion',
    ],
    overlayLabels: [
      { text: 'You’re part of the team', x: 50, y: 20 },
      { text: 'Caregiver', x: 24, y: 68 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in sequentially to affirm the caregiver’s role.',
    personalizationOverlay:
      'You are part of George’s care team, Nina — your questions and notes belong in the room.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'caregiver-education-7',
    useCaseId: 'caregiver-education',
    sceneNumber: 7,
    recommendedFileName: 'caregiver-followup-visit-scene.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm scene of a caregiver and patient arriving together for a follow-up visit, greeted kindly at a bright clinic — calm and supported.',
    whatPatientLearns:
      'Follow-up visits are easier when you go together — you are both welcomed and supported.',
    exactImageGenerationPrompt:
      `Warm, photorealistic scene of an adult caregiver and an older patient arriving together at a bright, welcoming clinic for a follow-up visit, greeted kindly by a friendly staff member, soft daylight, calm teal accents and gentle greenery. ${STYLE}. Medium composition, human and supportive, no medical equipment. Mood: welcoming, together, calm.`,
    exactVideoGenerationPrompt:
      `6-second gentle scene of a caregiver and patient arriving together at a bright clinic for a follow-up, greeted kindly, soft daylight. ${STYLE}. Slow, warm, supportive motion; no medical equipment; together-and-welcomed tone.`,
    stockSearchTerms: [
      'caregiver patient arriving clinic',
      'family follow up visit warm',
      'caregiver senior clinic entrance',
      'patient and family clinic arrival',
      'follow up appointment together',
      'caregiver supporting patient visit',
    ],
    overlayLabels: [
      { text: 'Go together', x: 50, y: 20 },
      { text: 'Both supported', x: 62, y: 72 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; callouts fade in to affirm going to visits together.',
    personalizationOverlay:
      'Going together makes follow-ups easier, Nina — you and George are both welcomed and supported.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 11. health-equity-transport ============== */
  {
    assetId: 'health-equity-transport-1',
    useCaseId: 'health-equity-transport',
    sceneNumber: 1,
    recommendedFileName: 'route-to-clinic-planning-render.png',
    assetType: 'medical-render',
    closeupLevel: 'wide',
    visualDescription:
      'A friendly map-route concept render with a soft glowing line from home to clinic — supportive and matter-of-fact, never stigmatizing.',
    whatPatientLearns:
      'Getting to your appointment can be planned out simply — the route is clear and manageable.',
    exactImageGenerationPrompt:
      `Friendly conceptual map-route render on deep navy: a soft glowing teal route line connecting a small "Home" pin to a small "Clinic" pin, clean minimal map styling with soft blocks and a couple of trees, generous negative space. ${STYLE}. Wide composition, warm and supportive, premium UI-map aesthetic. Mood: helpful, dignified, easy. Absolutely no shaming or stigmatizing tone — purely supportive and practical.`,
    exactVideoGenerationPrompt:
      `6-second animation of a soft glowing route line drawing from a "Home" pin to a "Clinic" pin, calm teal glow on deep navy map. ${STYLE}. Smooth, supportive, dignified motion; nothing stigmatizing; helpful and warm.`,
    stockSearchTerms: [
      'map route home to clinic concept',
      'navigation route healthcare render',
      'route planning map ui clean',
      'getting to appointment concept',
      'map directions clinic graphic',
      'route to medical appointment',
    ],
    overlayLabels: [
      { text: 'Home', x: 16, y: 60 },
      { text: 'Clear and manageable', x: 50, y: 18 },
      { text: 'Clinic', x: 84, y: 40 },
    ],
    animationTreatment:
      'Route line draws from home to clinic; the "Clear and manageable" caption fades in supportively.',
    personalizationOverlay:
      'Getting there is part of the plan, Tasha — the route can be mapped out simply, with no stress.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'health-equity-transport-2',
    useCaseId: 'health-equity-transport',
    sceneNumber: 2,
    recommendedFileName: 'transportation-support-render.png',
    assetType: 'medical-render',
    closeupLevel: 'wide',
    visualDescription:
      'A friendly concept render of transportation options — a bus, a rideshare car, and a route line — conveying that a ride can be arranged.',
    whatPatientLearns:
      'A ride to the clinic is part of the support available — transit and rideshare can be arranged.',
    exactImageGenerationPrompt:
      `Friendly conceptual render on deep navy of transportation options: a gentle simplified bus and a rideshare car icon along a soft glowing teal route line toward a "Clinic" pin, clean minimal map styling, generous negative space. ${STYLE}. Wide composition, warm and supportive, premium UI-map aesthetic. Mood: helpful, dignified, practical. No shaming or stigmatizing tone — purely supportive.`,
    exactVideoGenerationPrompt:
      `6-second animation where a soft route line draws toward a "Clinic" pin as gentle bus and rideshare icons glide along it, calm teal glow on deep navy map. ${STYLE}. Smooth, supportive, dignified motion; helpful and warm.`,
    stockSearchTerms: [
      'rideshare transit to clinic concept',
      'medical transport options graphic',
      'bus rideshare healthcare render',
      'transportation support illustration',
      'patient ride to appointment concept',
      'public transit clinic map',
    ],
    overlayLabels: [
      { text: 'A ride can be arranged', x: 50, y: 18 },
      { text: 'Transit or rideshare', x: 62, y: 70 },
    ],
    animationTreatment:
      'Route line draws as transit icons glide along; the "A ride can be arranged" caption fades in supportively.',
    personalizationOverlay:
      'A ride can be arranged, Tasha — transit or rideshare, whatever works best for your day.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'health-equity-transport-3',
    useCaseId: 'health-equity-transport',
    sceneNumber: 3,
    recommendedFileName: 'childcare-time-planning-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean, warm concept render of a simple day-planner card with soft icons for childcare, time, and the appointment — supportive and judgment-free.',
    whatPatientLearns:
      'Planning around childcare and time is normal — small arrangements make the appointment doable.',
    exactImageGenerationPrompt:
      `Clean, warm conceptual render on deep navy of a simple day-planner card with soft glowing teal icons for childcare (a gentle family icon), a clock, and a calendar appointment marker, generous negative space. ${STYLE}. Medium composition, premium UI-infographic style, warm and supportive. Mood: understanding, doable, judgment-free. Absolutely no stigmatizing tone — caring and practical.`,
    exactVideoGenerationPrompt:
      `6-second animation where a simple day-planner card assembles with soft childcare, clock, and appointment icons fading in, calm teal glow on deep navy. ${STYLE}. Warm, supportive, gentle motion; judgment-free; practical and caring.`,
    stockSearchTerms: [
      'childcare planning concept render',
      'day planner card ui clean',
      'time planning appointment graphic',
      'family schedule support illustration',
      'balancing childcare appointment concept',
      'caregiver time planning render',
    ],
    overlayLabels: [
      { text: 'Plan around your day', x: 50, y: 20 },
      { text: 'Small arrangements help', x: 62, y: 72 },
    ],
    animationTreatment:
      'Planner card assembles as childcare and time icons fade in; the supportive caption holds with a soft glow.',
    personalizationOverlay:
      'Juggling childcare and time is real, Tasha — a few small arrangements make this appointment doable.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'health-equity-transport-4',
    useCaseId: 'health-equity-transport',
    sceneNumber: 4,
    recommendedFileName: 'care-navigator-call-message-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a friendly phone showing a calm "Your care navigator" message with a soft call button — conveying easy, judgment-free help.',
    whatPatientLearns:
      'A care navigator is just a call or message away — they help with rides, scheduling, and more.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a friendly smartphone showing a calm message card reading "Your care navigator" with a soft glowing teal call button and gentle chat icon, generous negative space. ${STYLE}. Medium composition, premium UI mockup aesthetic, warm and supportive. Mood: accessible, judgment-free, caring. No readable PHI, no clinical claims, no stigmatizing tone.`,
    exactVideoGenerationPrompt:
      `6-second animation where a phone shows a "Your care navigator" message card and a soft call button gently glows, chat icon fading in, calm teal glow on deep navy. ${STYLE}. Smooth, supportive motion; accessible and judgment-free; no readable PHI.`,
    stockSearchTerms: [
      'care navigator phone message concept',
      'patient navigator call ui render',
      'community health worker contact graphic',
      'healthcare support call illustration',
      'care navigator app mockup',
      'patient support phone render',
    ],
    overlayLabels: [
      { text: 'Your care navigator', x: 50, y: 22 },
      { text: 'A call or message away', x: 62, y: 70 },
    ],
    animationTreatment:
      'Message card slides in and the call button glows gently; the supportive caption holds with a soft glow.',
    personalizationOverlay:
      'You never have to sort it out alone, Tasha — your care navigator is one call or message away.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'health-equity-transport-5',
    useCaseId: 'health-equity-transport',
    sceneNumber: 5,
    recommendedFileName: 'rescheduling-support-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a friendly calendar with a soft "Reschedule" option and gentle arrows — conveying flexibility without judgment.',
    whatPatientLearns:
      'If something comes up, rescheduling is easy — flexibility is part of the support, no judgment.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a friendly calendar card with a soft glowing teal "Reschedule" button and gentle curved arrows moving an appointment marker to a new day, generous negative space. ${STYLE}. Medium composition, premium UI-infographic style, warm and supportive. Mood: flexible, understanding, judgment-free. No stigmatizing tone, no readable PHI.`,
    exactVideoGenerationPrompt:
      `6-second animation where a calendar appointment marker gently moves to a new day along a soft curved arrow as a "Reschedule" button glows, calm teal glow on deep navy. ${STYLE}. Smooth, supportive, flexible motion; judgment-free; no readable PHI.`,
    stockSearchTerms: [
      'reschedule appointment concept render',
      'calendar flexibility ui clean',
      'rescheduling support graphic',
      'move appointment illustration',
      'flexible scheduling healthcare concept',
      'appointment change calendar render',
    ],
    overlayLabels: [
      { text: 'Rescheduling is easy', x: 50, y: 20 },
      { text: 'No judgment', x: 62, y: 72 },
    ],
    animationTreatment:
      'Appointment marker slides to a new day along the arrow as the "Reschedule" button glows; caption holds softly.',
    personalizationOverlay:
      'If something comes up, Tasha, rescheduling is simple — flexibility is part of the support, always.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'health-equity-transport-6',
    useCaseId: 'health-equity-transport',
    sceneNumber: 6,
    recommendedFileName: 'welcoming-clinic-arrival-care-navigator.jpg',
    assetType: 'stock-video',
    closeupLevel: 'medium',
    visualDescription:
      'A warm scene of a friendly care navigator welcoming a patient at a bright clinic entrance with a kind smile — affirming and judgment-free.',
    whatPatientLearns:
      'When you arrive, a care navigator is there to welcome and help you — you belong here.',
    exactImageGenerationPrompt:
      `Warm, photorealistic scene of a friendly care navigator warmly welcoming a patient at a bright, modern clinic entrance, kind and genuine smiles, open and respectful body language, soft daylight, calm teal accents and gentle greenery. ${STYLE}. Medium two-shot composition, dignified and affirming, no clinical equipment. Mood: welcoming, judgment-free, you-belong-here. Absolutely no shaming or stigmatizing tone.`,
    exactVideoGenerationPrompt:
      `6-second gentle push-in on a friendly care navigator warmly welcoming a patient at a bright clinic entrance, kind smiles, soft daylight. ${STYLE}. Slow, warm, affirming motion; judgment-free; you-belong-here tone.`,
    stockSearchTerms: [
      'care navigator welcoming patient',
      'clinic greeter friendly entrance',
      'patient navigator healthcare warm',
      'welcoming clinic staff diverse',
      'community health worker greeting',
      'friendly clinic reception welcome',
    ],
    overlayLabels: [
      { text: 'You belong here', x: 50, y: 20 },
      { text: 'Care navigator', x: 70, y: 70 },
    ],
    animationTreatment:
      'Slow push-in with a warm grade; the "You belong here" caption fades in first to set an affirming, judgment-free tone.',
    personalizationOverlay:
      'There is nothing to feel embarrassed about, Tasha — someone is here to welcome you, every step.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'health-equity-transport-7',
    useCaseId: 'health-equity-transport',
    sceneNumber: 7,
    recommendedFileName: 'patient-feeling-supported-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean, warm concept render of a soft glowing supportive-hands or heart motif around a calm figure — conveying a feeling of being cared for and not alone.',
    whatPatientLearns:
      'You are supported — the barriers are not yours to carry alone, and help is here.',
    exactImageGenerationPrompt:
      `Clean, warm conceptual render on deep navy of a calm, simplified figure gently surrounded by a soft glowing teal heart-and-supportive-hands motif, dreamy bokeh and gentle glow, generous negative space. ${STYLE}. Medium composition, premium and minimal, dignified and uplifting. Mood: cared-for, not-alone, hopeful. Absolutely no stigmatizing tone — affirming and warm.`,
    exactVideoGenerationPrompt:
      `6-second animation where a soft glowing supportive-hands and heart motif gently forms around a calm figure with a warm pulse of light, calm teal glow on deep navy. ${STYLE}. Smooth, uplifting, affirming motion; not-alone tone; dignified and warm.`,
    stockSearchTerms: [
      'feeling supported concept render',
      'supportive hands heart graphic',
      'not alone healthcare illustration',
      'patient support warm concept',
      'care and support visual clean',
      'you are supported render',
    ],
    overlayLabels: [
      { text: 'You are supported', x: 50, y: 20 },
      { text: 'Not alone', x: 62, y: 72 },
    ],
    animationTreatment:
      'Supportive motif forms around the figure with a warm pulse; the "You are supported" caption holds with a soft glow.',
    personalizationOverlay:
      'These barriers are not yours to carry alone, Tasha — help is here, and you are truly supported.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },

  /* ============================ 12. genomics-consent ===================== */
  {
    assetId: 'genomics-consent-1',
    useCaseId: 'genomics-consent',
    sceneNumber: 1,
    recommendedFileName: 'genomics-saliva-kit.mp4',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A clean, non-graphic close-up still of a sealed saliva collection tube and tidy genomics kit on a soft surface — nothing biological visible.',
    whatPatientLearns:
      'A genomic sample is usually simple to give — often just a sealed saliva collection.',
    exactImageGenerationPrompt:
      `Clean, non-graphic close-up still of a sealed saliva collection tube and tidy genomics kit (small box, sealed tube, instruction card) arranged on a soft matte surface, calm teal accent light, shallow depth of field. ${STYLE}. Close-up composition, premium product photography, nothing biological visible, fully sealed and clinical. Mood: simple, easy, reassuring. No needles, no blood, no scary lab imagery.`,
    exactVideoGenerationPrompt:
      `5-second slow push-in on a sealed saliva collection tube and tidy genomics kit on a soft matte surface, gentle parallax, calm teal light. ${STYLE}. Soft, reassuring motion; nothing biological visible; simple and easy.`,
    stockSearchTerms: [
      'saliva collection kit genomics',
      'dna test kit sealed tube',
      'genetic test sample kit product',
      'saliva sample tube clean photo',
      'genomic testing kit packaging',
      'dna collection tube studio',
    ],
    overlayLabels: [
      { text: 'Often just saliva', x: 50, y: 18 },
      { text: 'Sealed kit', x: 34, y: 70 },
    ],
    animationTreatment:
      'Gentle push-in with a soft shadow lift; captions fade in to reassure the sample is simple to give.',
    personalizationOverlay:
      'No needles in most cases, Henry — a genomic sample is often as simple as a sealed saliva kit.',
    voiceover:
      'It starts simply, Henry — a small saliva sample, often collected right at home. No needles, nothing invasive at all.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'genomics-consent-2',
    useCaseId: 'genomics-consent',
    sceneNumber: 2,
    recommendedFileName: 'dna-double-helix.mp4',
    assetType: 'medical-render',
    closeupLevel: 'close-up',
    visualDescription:
      'A premium, clean render of a softly glowing DNA double helix rotating in deep navy space with teal-cyan accents — elegant and non-clinical.',
    whatPatientLearns:
      'Genomics looks at DNA — the instruction set inside your cells — to advance understanding and research.',
    exactImageGenerationPrompt:
      `Premium, clean render of a softly glowing DNA double helix gently rotating in deep navy space, smooth translucent strands with teal-cyan accent lighting, elegant rungs, soft bokeh and particle glow. ${STYLE}. Close-up composition, polished and minimal, generous negative space, modern and trustworthy. Mood: wondrous, calm, sophisticated. No genetic risk depiction, no scary lab imagery, no data readouts.`,
    exactVideoGenerationPrompt:
      `7-second slow rotation of a softly glowing DNA double helix in deep navy space, translucent strands catching teal-cyan light, gentle particle drift. ${STYLE}. Smooth, elegant, calming motion; no risk depiction; sophisticated and trustworthy.`,
    stockSearchTerms: [
      'dna double helix render premium',
      'glowing dna animation calm',
      'genomics dna strand illustration',
      'dna molecule 3d teal',
      'genetic helix concept clean',
      'dna spinning animation elegant',
    ],
    overlayLabels: [
      { text: 'DNA', x: 50, y: 26 },
      { text: 'Your cells’ instructions', x: 56, y: 64 },
    ],
    animationTreatment:
      'Continuous slow helix rotation with soft particle drift; captions fade in gently as the strand turns.',
    personalizationOverlay:
      'Before anything else, Henry, here is simply what genomics studies — with your privacy front and center.',
    voiceover:
      'Inside that sample is your DNA — the unique instructions that make you, you. Researchers study it to understand health for everyone.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'genomics-consent-3',
    useCaseId: 'genomics-consent',
    sceneNumber: 3,
    recommendedFileName: 'dna-sequencing-lab.mp4',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a DNA strand transforming into a calm stream of soft data points flowing into a sleek sequencing visualization — modern and trustworthy.',
    whatPatientLearns:
      'Sequencing reads the DNA and turns it into data that researchers can study carefully.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a softly glowing DNA strand gracefully transforming into a calm stream of soft teal data points flowing toward a sleek, minimal sequencing visualization panel, gentle glow and bokeh, generous negative space. ${STYLE}. Medium composition, premium UI/data aesthetic, modern and trustworthy. Mood: precise, calm, sophisticated. No readable data, no genetic risk depiction, no scary imagery.`,
    exactVideoGenerationPrompt:
      `6-second animation where a glowing DNA strand gently dissolves into a flowing stream of soft data points moving toward a sleek sequencing panel, calm teal glow on deep navy. ${STYLE}. Smooth, precise, sophisticated motion; no readable data; no risk depiction.`,
    stockSearchTerms: [
      'dna sequencing data flow concept',
      'genomic data visualization render',
      'dna to data animation clean',
      'sequencing process illustration',
      'genomics data stream graphic',
      'dna data flow ui render',
    ],
    overlayLabels: [
      { text: 'DNA is read', x: 36, y: 28 },
      { text: 'Turned into data', x: 66, y: 60 },
    ],
    animationTreatment:
      'DNA strand dissolves into a flowing data stream toward the panel; callouts fade in along the flow.',
    personalizationOverlay:
      'Here is how it works, Henry — the DNA is read and turned into data, all handled carefully.',
    voiceover:
      'In the lab, specialized machines read your DNA carefully and precisely, turning it into data that scientists can learn from.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'genomics-consent-4',
    useCaseId: 'genomics-consent',
    sceneNumber: 4,
    recommendedFileName: 'genomics-consent-form.mp4',
    assetType: 'still-image',
    closeupLevel: 'close-up',
    visualDescription:
      'A close-up still of a neutral, softly blurred consent document with a pen resting beside it, the heading readable as "Consent" — calm and unintimidating.',
    whatPatientLearns:
      'The consent form is yours to read and decide on — taking part is entirely your choice.',
    exactImageGenerationPrompt:
      `Close-up still of a tidy genomics consent document on a light desk, a calm "Consent" heading softly in focus while the body text gently blurs, a smooth pen resting alongside, soft daylight. ${STYLE}. Close-up composition, premium document photography, shallow depth of field, warm and unintimidating. Mood: voluntary, transparent, respectful. No scary fine-print emphasis, no lab imagery.`,
    exactVideoGenerationPrompt:
      `5-second slow drift across a softly lit genomics consent document, the heading easing into focus, a pen resting beside it, gentle daylight. ${STYLE}. Calm, respectful motion; emphasizes choice; nothing alarming.`,
    stockSearchTerms: [
      'consent form close up document',
      'genomics consent paper pen',
      'research consent form soft focus',
      'consent document healthcare photo',
      'reading consent form desk',
      'patient agreement form clean',
    ],
    overlayLabels: [
      { text: 'Your choice, always', x: 50, y: 20 },
      { text: 'Take your time', x: 62, y: 72 },
    ],
    animationTreatment:
      'Subtle dolly across the page as the heading sharpens; the "Your choice, always" caption fades in early.',
    personalizationOverlay:
      'There is no pressure, Henry — the consent is yours to read carefully and decide on, entirely your choice.',
    voiceover:
      'Whether you take part is entirely your choice, Henry. You decide, you can ask anything, and you can change your mind at any time.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'genomics-consent-5',
    useCaseId: 'genomics-consent',
    sceneNumber: 5,
    recommendedFileName: 'identifiers-fading.mp4',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a record card with identifier fields (name, ID shown as soft redacted bars) gently fading and dissolving away — privacy-first.',
    whatPatientLearns:
      'Your identifying details are removed before your data is used — your identity is protected.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of an abstract record card with placeholder identifier fields (name, ID shown as soft redacted bars) gently dissolving and fading into the background, soft teal glow, generous negative space. ${STYLE}. Medium composition, premium UI-security aesthetic, elegant and trustworthy. Mood: protective, transparent, reassuring. No real identifiers exposed, no genetic risk depiction, no scary imagery.`,
    exactVideoGenerationPrompt:
      `6-second animation where soft redacted identifier bars on a record card gently dissolve and fade away into the background, calm teal glow on deep navy. ${STYLE}. Smooth, protective, reassuring motion; no real identifiers; no risk depiction.`,
    stockSearchTerms: [
      'identifiers fading privacy concept',
      'data anonymization render clean',
      'redacted fields dissolving graphic',
      'personal data removed illustration',
      'privacy protection ui concept',
      'de-identification fading render',
    ],
    overlayLabels: [
      { text: 'Identifiers removed', x: 50, y: 22 },
      { text: 'Your identity protected', x: 62, y: 70 },
    ],
    animationTreatment:
      'Redacted identifier bars dissolve and fade; the "Identifiers removed" caption holds with a soft glow.',
    personalizationOverlay:
      'Your privacy comes first, Henry — your identifying details are removed before anything is used.',
    voiceover:
      'Before any research, your name and personal details are removed — so your information helps discovery without ever identifying you.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'genomics-consent-6',
    useCaseId: 'genomics-consent',
    sceneNumber: 6,
    recommendedFileName: 'deidentified-data-into-database-render.png',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of anonymized data dots flowing safely into a sleek, secure research database visualization — orderly and trustworthy.',
    whatPatientLearns:
      'Only de-identified data enters the research database — used to advance understanding, not to identify you.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a calm stream of anonymized teal data dots flowing safely into a sleek, minimal secure research database visualization (rounded server/database motif), gentle glow, generous negative space. ${STYLE}. Medium composition, premium UI/data aesthetic, orderly and trustworthy. Mood: secure, transparent, reassuring. No readable data, no real identifiers, no genetic risk depiction.`,
    exactVideoGenerationPrompt:
      `6-second animation where a stream of anonymized data dots flows smoothly into a sleek secure database motif, calm teal glow on deep navy. ${STYLE}. Smooth, orderly, trustworthy motion; no readable data; no real identifiers.`,
    stockSearchTerms: [
      'de-identified data database concept',
      'anonymized data flow render',
      'secure research database graphic',
      'data into database ui clean',
      'genomic data storage illustration',
      'protected data flow concept',
    ],
    overlayLabels: [
      { text: 'De-identified data', x: 36, y: 28 },
      { text: 'Research database', x: 68, y: 60 },
    ],
    animationTreatment:
      'Anonymized data dots flow into the database motif; callouts fade in along the flow to reinforce de-identification.',
    personalizationOverlay:
      'Only de-identified data is used, Henry — it advances research, never to identify you.',
    priority: 'medium',
    fallbackIfMissing: 'asset-slot-only',
  },
  {
    assetId: 'genomics-consent-7',
    useCaseId: 'genomics-consent',
    sceneNumber: 7,
    recommendedFileName: 'secure-data-center.mp4',
    assetType: 'medical-render',
    closeupLevel: 'medium',
    visualDescription:
      'A clean concept render of a softly glowing privacy-shield icon protecting a calm cluster of data dots — conveying strong, ongoing protection.',
    whatPatientLearns:
      'Your data stays protected — strong privacy and security safeguards stay in place.',
    exactImageGenerationPrompt:
      `Clean conceptual render on deep navy of a softly glowing teal privacy-shield icon protectively encircling a calm cluster of anonymized data dots, gentle glow and a soft protective ring, generous negative space. ${STYLE}. Medium composition, premium UI-security aesthetic, elegant and trustworthy. Mood: protective, secure, reassuring. No real identifiers, no genetic risk depiction, no scary imagery.`,
    exactVideoGenerationPrompt:
      `6-second animation where a glowing teal privacy shield forms protectively around a calm cluster of data dots with a soft protective ring pulsing outward, calm teal glow on deep navy. ${STYLE}. Smooth, protective, reassuring motion; no real identifiers; no risk depiction.`,
    stockSearchTerms: [
      'privacy shield data protection render',
      'data security shield concept',
      'protected data icon graphic',
      'secure health data ui animation',
      'privacy security shield render',
      'data safeguard concept clean',
    ],
    overlayLabels: [
      { text: 'Protected', x: 50, y: 22 },
      { text: 'Privacy safeguards', x: 62, y: 70 },
    ],
    animationTreatment:
      'Shield forms around the data with a soft protective ring pulse; the "Protected" caption holds with a gentle glow.',
    personalizationOverlay:
      'Strong safeguards stay in place, Henry — your data is protected, every step of the way.',
    voiceover:
      'And your data is kept secure and protected — contributing to research that may help patients for years to come.',
    priority: 'high',
    fallbackIfMissing: 'asset-slot-only',
  },
];

export function treatmentAssetsForUseCase(useCaseId: string): TreatmentAssetEntry[] {
  return treatmentVisualAssetPlan
    .filter((a) => a.useCaseId === useCaseId)
    .sort((a, b) => a.sceneNumber - b.sceneNumber);
}

/** Expected public path for an asset (whether or not it has been uploaded yet). */
export function expectedAssetPath(a: TreatmentAssetEntry): string {
  return `/medical-assets/${assetFolderByUseCase[a.useCaseId] ?? 'misc'}/${a.recommendedFileName}`;
}
