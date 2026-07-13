# Opera × Truveta — Build Prompts (verbatim log)

The prompts used with Claude Code to build **Opera Patient Education Studio** (`OperaTruveta/`),
in the order they were given. Kept verbatim as a record for reuse / hand-off.

Sequence:
- **Prompts 0–9** — the initial build (context, shell, dataset, video preview, demo pages,
  visual system, mock pipeline, report builder, scene components, polish).
- **Pivots A–F** — the real-world clinical-visual direction, then the asset-backed rebuild.
- **Appendix** — the ElevenLabs 8-second video-prompt example.

---

## PROMPT 0 — MASTER CONTEXT / NON-NEGOTIABLE PRODUCT DIRECTION

Create a new folder here called OperaTruveta for all this. There will be a bunch more prompts after too so keep that in mind. Some assets i uploaded which u can use or dont need to are in truveta/branding and truveta/universal smewhere in my downloads. It includes some random shti i added so a lot of it take w a grain of salt but some of it u can use ifits usefulf or design purposes or just ideas idk.

You are building a premium healthcare AI concept demo for Opera AI.

Context:
Opera AI is exploring a partnership with Truveta, a real-world healthcare data and intelligence company. Truveta has massive healthcare data and evidence capabilities. Opera’s proposed role is to turn approved clinical content, synthetic patient context, patient journey context, and real-world evidence themes into deeply personalized patient education videos.

This is NOT clinical decision support.
This is NOT diagnosis.
This is NOT treatment recommendation.
This is NOT medication guidance.
This is NOT patient-specific risk prediction.
This is NOT emergency triage.
This is NOT replacing the clinician.

This is a personalized patient education and communication layer.

Product name:
Opera Patient Education Studio

Core theme:
“Turning real-world evidence into human understanding.”

Important positioning:
Truveta helps organizations understand real-world patient journeys at scale. Opera helps translate approved content and care context into patient-facing education assets that feel deeply personal, warm, clear, and human.

The videos should not be generic medical explainers.
They should feel like they were made for one specific person.

Personalization standard:
Every generated video should be personalized to:
* the patient’s known care journey
* the treatment/procedure/follow-up context
* the patient’s stated concerns
* their health literacy level
* their preferred language
* their life situation if relevant and provided
* their goals
* barriers to care
* caregiver involvement
* appointment history
* emotional state
* practical next steps
* approved clinician/care-team context

Examples of human personalization:
* “You mentioned you are nervous because your father had complications from diabetes.”
* “Because you work night shifts, it may help to write your questions before your appointment.”
* “Since your daughter helps manage your appointments, this summary can also be shared with her.”
* “You said you mainly want to understand what happens next, not read a long portal message.”
* “Your care team knows you prefer Spanish, so this explanation is written in clear Spanish with simple captions.”

Safety rule:
Only use patient life context if it is synthetic, patient-provided, care-team-provided, or explicitly approved for the demo. Do not invent sensitive facts in a real deployment. For this demo, all patients are synthetic.

Visual standard:
The visuals must be stunning, polished, and enterprise-grade. This should feel like:
* Truveta-level data seriousness
* Mayo Clinic-level patient education clarity
* Apple-level visual polish
* a premium healthcare SaaS product
* a cinematic patient education video generator

The app should not depend only on downloaded images. It should create its own beautiful visual system with:
* animated UI cards
* moving patient journey timelines
* animated lab/result cards
* animated checklists
* animated source transparency panels
* animated compliance badges
* animated portal/SMS/email mockups
* moving evidence-to-education diagrams
* video storyboard previews
* subtle cinematic transitions
* gradient backgrounds
* clean iconography
* patient-specific title cards
* static and motion-ready visual components

The app should be able to generate storyboard visuals that could later be rendered into real videos using Remotion, React animation, Framer Motion, Lottie, or screenshots/screen recordings.

Visual vibe:
Use white, slate, deep navy, soft blue, teal/cyan accents, subtle gradients, glass cards, soft shadows, calm motion, large readable captions, and beautiful hierarchy.

Avoid:
* cartoon doctors
* robot AI visuals
* neon gradients
* cheesy stock photos
* scary disease imagery
* cluttered dashboards
* generic startup landing page clichés
* fake hospital hallway footage
* random inconsistent illustration styles
* anything that feels like a dental-only product

Technical stack:
Next.js App Router
TypeScript
Tailwind CSS
Framer Motion
Lucide React
shadcn/ui if useful

Your job:
Build a polished concept demo app with:
* synthetic patient data
* personalized patient education video examples
* reusable motion-ready scene components
* storyboard/video preview system
* compliance guardrails
* report-builder section
* mock video generation pipeline
* human review workflow
* source transparency

Before coding:
Inspect the current project structure.
Then propose a concise implementation plan.
Then begin implementing.

---

## PROMPT 1 — BUILD THE APP SHELL AND DESIGN SYSTEM

Build the initial app shell for “Opera Patient Education Studio.”

Use Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and lucide-react.

Create a premium healthcare design system.

Pages:
1. /
2. /demo-library
3. /demo/[id]
4. /safety-framework
5. /report-builder
6. /pipeline
7. /visual-system

Navigation:
* Overview
* Demo Library
* Safety Framework
* Report Builder
* Mock Pipeline
* Visual System

Global design:
* background: soft white / slate
* primary: deep navy
* accent: teal/cyan
* cards: white, rounded-2xl, subtle border, soft shadow
* text: slate-900 titles, slate-600 body
* subtle gradients
* animated card entrances
* refined spacing
* responsive layout
* enterprise healthcare feel

Home page hero:
Title: “Turning Real-World Evidence Into Human Understanding”
Subtitle: “Opera transforms approved healthcare content, patient journey context, and care-team guidance into personalized education videos that help patients understand, prepare, and take the next appropriate step with their care team.”

Add three value cards:
1. Human Patient Education
2. Evidence-to-Action Communication
3. Safe Reviewable Workflows

Add a polished flow diagram:
Real-world evidence themes → approved clinical content → patient journey context → Opera education generator → human review → personalized patient video / portal / SMS / email

Add a section: “Personalized without becoming clinical decision support”

Include badges:
* Educational only
* No diagnosis
* No treatment recommendation
* No medication changes
* No patient-specific risk scoring
* Human review required
* Source transparency
* Synthetic demo data

Create reusable components:
* AppShell
* Navbar
* HeroSection
* ValueCard
* FlowDiagram
* SafetyBadge
* SectionHeader
* EnterpriseCard
* Footer
* AnimatedGradientPanel
* TrustBadgeRow
* PatientJourneyMiniMap

Important:
Make this visually excellent, not basic. Use polished copy, motion, icons, and beautiful spacing. It should look CTO-ready.

---

## PROMPT 2 — CREATE THE FULL SYNTHETIC DATASET WITH HUMAN PERSONALIZATION

Create lib/demoData.ts.

Define strong TypeScript types:
* DemoUseCase
* SyntheticPatient
* PatientLifeContext
* PatientConcern
* ClinicalContext
* ApprovedContent
* VideoScript
* StoryboardScene
* ComplianceItem
* CTAContent
* Department
* OutputFormat
* SafetyBoundary
* PersonalizationSignal
* VisualAssetPlan
* MotionPlan

Create 12 demo use cases.

Each use case must include:
* id, category, title, department
* synthetic patient profile, patient life context, patient concerns, patient goals, patient barriers
* preferred language, health literacy level, caregiver involvement if relevant
* clinical/care context, approved content summary, real-world evidence theme
* personalization signals used
* video script, storyboard scenes, visual asset plan, motion plan
* SMS CTA, email CTA, portal message
* compliance checklist, safety boundary explanation

The video scripts must be 60-90 seconds when read aloud. They must feel warm, human, specific, and emotionally intelligent. They must never diagnose, recommend treatment, change medication, interpret results independently, or predict patient-specific risk. Every video must include: “This video is educational and does not replace medical advice from your care team.”

Create these 12 use cases:
1. Preventive Screening Education — Understanding Your Colon Cancer Screening Reminder — Primary Care / Population Health — James, 52 (busy PM, postpones due to travel; nervous colonoscopies are difficult; wants clear next steps).
2. Chronic Care Follow-Up — Preparing for Your Diabetes Follow-Up — Primary Care / Endocrinology — Sarah, 47 (night shifts, felt judged, father had diabetes complications).
3. Clinical Trial Education — Learning About a Research Opportunity — Oncology / Clinical Research — Maria, 61 (daughter helps; worries “trial” = experimented on).
4. Post-Discharge Recovery — Understanding Your Recovery Plan — Hospital Medicine / Care Transitions — Robert, 68 (lives alone, son weekends, prefers printed summaries).
5. Medication Journey Education — Understanding Your Medication Questions — Cardiology / Medication Education — Linda, 59 (new med, reads online, tempted to stop).
6. Lab Result Explanation — Understanding What Your Blood Test Looks At — Primary Care / Lab Follow-Up — David, 43 (portal-result anxiety).
7. Prenatal Visit Preparation — Preparing for Your Upcoming Prenatal Visit — Maternal Health / OB-GYN — Amina, 31 (first pregnancy, partner involved, notes app).
8. Language Access Follow-Up — Preparándose para su seguimiento de presión arterial — Primary Care / Health Equity — Carlos, 55 (prefers Spanish, son translates).
9. Procedure Preparation — Preparing for Your Upcoming Colonoscopy — Gastroenterology — Elaine, 58 (cares for mother, transport/timing).
10. Caregiver Education — Helping Your Loved One Prepare for a Follow-Up — Caregiver Support / Primary Care — George, 74 + caregiver Nina (daughter).
11. Health Equity / Transportation Barrier — Planning Your Follow-Up Visit — Population Health / Care Navigation — Tasha, 39 (childcare/transport, embarrassed).
12. Genomics / Consent Education — Understanding Research Consent and De-Identified Data — Research / Genomics Education — Henry, 64 (privacy-conscious).

Every storyboard scene must include:
* sceneTitle, narration, onScreenText, visualType, motionDirection, transition, iconName, lottieSearchKeyword, customAnimationIdea, backgroundStyle, safetyBoundary, personalizationReason

Make the data rich enough to power a beautiful demo app and video storyboard system.

---

## PROMPT 3 — BUILD THE VIDEO STORYBOARD PREVIEW SYSTEM

Build a stunning VideoStoryboardPreview system.

Create components:
* VideoStoryboardPreview
* MockVideoPlayer
* StoryboardTimeline
* SceneCard
* MotionDirectionCard
* PersonalizationSignalsCard
* SourceTransparencyCard
* HumanReviewCard
* VideoSceneCanvas

Each demo detail page should feel like a real personalized education video was generated.

Layout:
Left side: synthetic patient profile, life context, patient concerns, care goal, personalization signals, approved content used, safety boundary.
Right side: large mock video preview, current scene visual, script/caption, progress bar, scene timeline.

The mock video preview must be visually stunning. It should look like a generated patient education video, not a plain card.

Mock video player should include: patient first name, video title, “Educational video” badge, “Human review required” badge, animated scene area, captions, progress bar, scene controls, final disclaimer.

For each scene, render a beautiful visual based on visualType: animated lab result card, animated checklist, animated calendar card, animated consent form, animated patient portal message, animated recovery timeline, animated medication education card, animated bilingual captions, animated care journey timeline, animated privacy/de-identification diagram, animated question cards.

Use Framer Motion to create actual moving visual components: cards sliding in, checklist items revealing one-by-one, timeline nodes filling, lab rows highlighting, consent form sections glowing softly, message bubbles popping in, safety badges stamping in, progress bars filling, language captions switching, source cards flipping/revealing.

Do not rely on stock images. Code as many visuals as possible using React components, Tailwind, lucide icons, gradients, and Framer Motion.

For each video, scenes should feel personalized to the patient’s life context. (Examples given for Sarah’s diabetes, Maria’s clinical trial, Carlos’s Spanish video.)

Add a “Generate Preview” button. When clicked, animate: 1) Script generated 2) Storyboard generated 3) Personalization applied 4) Compliance checked 5) Human review required 6) Preview ready. This should feel magical but safe.

---

## PROMPT 4 — BUILD INDIVIDUAL DEMO DETAIL PAGES

Create /demo/[id] pages for every use case in lib/demoData.ts.

Each demo page should include these sections:
1. Hero panel — video title, department, synthetic patient, short explanation, output formats available: video, portal, SMS, email, caregiver summary, language-access version.
2. Patient context panel — patient profile, life context, concern, goal, barriers, preferred language, caregiver involvement, health literacy.
3. “What the system uses” panel — care context, approved content, real-world evidence theme, source transparency, what is personalized, what is not personalized.
4. Video preview panel — Use VideoStoryboardPreview.
5. Generated script — full script with highlighted personalization moments.
6. Storyboard timeline — every scene with narration, on-screen text, visual direction, motion direction, safety boundary, personalization reason.
7. CTA outputs — SMS, email, portal, caregiver summary if relevant.
8. Compliance checklist — no diagnosis generated, no treatment recommendation, no medication changes, no patient-specific risk prediction, approved content shown, human review required, educational disclaimer included, patient routed back to care team.
9. “Why this matters” — how this video helps the patient understand, prepare, reduce anxiety, and act on the next appropriate care-team-approved step.

Design: Make the page beautiful and polished. Use motion, icons, glass cards, and clear hierarchy.

---

## PROMPT 5 — BUILD THE VISUAL SYSTEM PAGE

Create /visual-system.

This page should show the reusable visual language that Opera can use to generate videos.

Sections:
1. Video Anatomy — warm intro, why this video, plain-English education, personalized context, preparation checklist, questions to ask, next step, disclaimer.
2. Reusable Scene Components — animated examples of: PatientIntroScene, LabResultScene, ChecklistScene, CalendarReminderScene, ConsentEducationScene, MedicationEducationScene, DischargeTimelineScene, LanguageAccessScene, PrivacyDataScene, CaregiverSummaryScene, QuestionCardsScene, PortalMessageScene, SafetyDisclaimerScene.
3. Motion Principles — soft fades, card slide-ins, timeline reveals, highlight sweeps, checklist reveals, badge stamps, language caption switches, gentle progress fills.
4. Static Visual Components — patient profile card, care journey map, approved content card, source transparency card, safety boundary matrix, human review card.
5. Video Quality Rules — one idea per scene, large captions, calm motion, no scary imagery, no dense medical charts, no clinical advice, always route back to care team, personalize emotionally and practically.

Make this page extremely visual. It should prove that Opera can create stunning visuals internally, not depend on stock footage.

---

## PROMPT 6 — BUILD THE MOCK GENERATION PIPELINE

Create a mock backend + frontend pipeline that makes the product feel real.

Pages: /pipeline

API routes:
* POST /api/generate-script
* POST /api/generate-storyboard
* POST /api/apply-personalization
* POST /api/compliance-check
* POST /api/generate-visual-scenes
* POST /api/generate-video-job
* GET /api/video-job/[id]

Pipeline flow:
1. Select use case 2. Load synthetic patient context 3. Load approved content 4. Generate educational script 5. Apply personalization 6. Generate storyboard 7. Generate motion/visual plan 8. Run compliance check 9. Mark human review required 10. Create mock video job 11. Poll job status 12. Show preview ready

Frontend should show a beautiful pipeline animation: patient context card flows into script generator, approved content card flows into source transparency, personalization signals attach to scenes, compliance guardrail checks each scene, human review locks final output, final video preview appears.

The pipeline should clearly show that Opera personalizes using: care journey, treatment/procedure/follow-up context, patient concerns, patient goals, barriers, language preference, caregiver involvement, health literacy, approved care-team context. But it should also show that Opera does NOT generate: diagnosis, treatment recommendation, medication change, independent result interpretation, risk prediction, emergency advice.

Add types for all API inputs/outputs.

Mock video job should simulate status progression: queued → scripting → personalizing → storyboarding → visual generation → compliance review → human review required → preview ready.

Make the pipeline page visually impressive and animated.

---

## PROMPT 7 — BUILD THE REPORT BUILDER

Create /report-builder.

This page should become the foundation for a comprehensive report that can later be sent to Truveta’s CTO. The report should not sound like a sales pitch. It should be structured, thoughtful, strategic, and comprehensive.

Sections:
1. Executive Summary 2. Why Truveta 3. Patient-Facing Opportunity 4. Opera’s Role 5. Product Concept 6. Personalization Philosophy 7. Video Generation Workflow 8. Video Categories 9. Detailed Use Cases 10. Visual Language and Video Format 11. Safety, Compliance, and FDA Boundary 12. Data Boundary 13. Human Review Workflow 14. Implementation Path 15. Partnership Models 16. Open Questions for Truveta 17. Next Steps

Each section should have polished written content.

Personalization Philosophy: Explain the videos should be personalized not only to the medical topic, but to the patient’s human context: fears, goals, schedule, caregiver support, language, health literacy, barriers, emotional state. Emphasize this is what separates Opera from generic patient education videos.

Video Categories: detailed cards for preventive care and screenings, chronic disease follow-up, clinical trial education, medication journey education, post-discharge recovery, lab/test/imaging result explanation, procedure preparation, maternal health, oncology education, health equity and language access, caregiver education, genomics and consent education, public health campaigns. For each: what the video explains, who it is for, departments/customers, example video title, personalization inputs, visual format, safety notes, why it matters.

Safety/FDA Boundary: education only — no diagnosis, no treatment recommendation, no medication change, no patient-specific risk scoring, no autonomous clinical decision-making, no emergency triage, uses approved content, human review required, source transparency, disclaimer included.

Partnership Models: synthetic concept demo, health-system education pilot, care-gap activation pilot, clinical trial education pilot, life sciences patient education pilot, white-labeled patient education studio, API layer, portal/SMS/email delivery integration, language-access module, caregiver education module.

Add “Copy Section” buttons for each section. Make this page visually polished, like a live report/product memo, not just text on a page.

---

## PROMPT 8 — CREATE MOTION-READY VIDEO SCENE COMPONENTS

Create reusable animated React components for video scenes.

Components:
* PatientIntroScene, CareContextScene, PlainEnglishEducationScene, LabCardScene, ChecklistRevealScene, CalendarReminderScene, ConsentFormScene, ResearchJourneyScene, MedicationSafetyScene, DischargeTimelineScene, BilingualCaptionScene, CaregiverSummaryScene, PrivacyDeIdentificationScene, PortalMessageScene, QuestionsToAskScene, SafetyDisclaimerScene

Each component should: accept props from storyboard scene data, use Framer Motion, be visually polished, have large readable text, support 16:9 video aspect ratio, include captions, include iconography, include subtle animation, avoid stock images, be reusable in MockVideoPlayer.

Add a VideoSceneRenderer component that takes a StoryboardScene and chooses the right scene component.

Each scene should have: entrance animation, primary visual animation, text/caption animation, exit/transition hint.

(Examples given: LabCardScene, ChecklistRevealScene, ConsentFormScene, BilingualCaptionScene, PrivacyDeIdentificationScene.)

Make these look stunning enough that a user could screen record them and embed them into demo videos.

---

## PROMPT 9 — SELF-REVIEW, SCREENSHOT, AND POLISH LOOP

Now perform a full quality review of the app.

1. Run the app locally. 2. Open each major page. 3. Inspect visual quality. 4. Identify anything generic, unfinished, ugly, cluttered, or not enterprise-grade. 5. Improve it. 6. Check every demo page. 7. Make sure personalization is human and specific, not generic. 8. Make sure every video has patient life context, concern, goal, and care-team-safe next step. 9. Make sure visuals are motion-ready and beautiful. 10. Make sure safety boundaries are visible. 11. Make sure the app does not imply diagnosis, treatment recommendation, medication change, patient-specific risk scoring, or emergency triage. 12. Make sure all data is synthetic. 13. Make sure the report builder is comprehensive and polished. 14. Make sure the visual system page demonstrates actual moving components. 15. Make sure responsive design works.

If browser/screenshot tools are available: take screenshots of the home page, demo library, one demo detail page, pipeline page, report builder, and visual system page; review the screenshots yourself; make improvements based on the screenshots.

Final deliverable: summary of what was built, how to run it, where the main files are, what demos exist, what still needs improvement, and any safety/compliance caveats.

---

## PIVOT A — ADD REAL-WORLD CLINICAL / TREATMENT VISUALS TO THE VIDEO SYSTEM

The current video system relies too heavily on UI cards, dashboards, checklists, and patient portal visuals. That is not enough.

Upgrade the video system so each generated patient education video includes a second visual layer: real-world clinical/treatment/procedure visuals. The videos should help patients understand what the treatment, procedure, test, medication journey, or care process actually looks like in the real world.

Feel closer to: high-end medical explainer animation, Mayo/Cleveland Clinic patient education, 3D anatomy-style explanation, calm animated procedure walkthrough, real-life care journey visualization. Not just: UI cards, dashboards, portal screens, abstract icons, generic checklists.

Safety boundary: educational, non-graphic medical visuals. Avoid gore, blood, frightening surgical footage, invasive close-ups, or anything that could scare patients. Do not show graphic surgery. Use clean 2D/3D-style diagrams, simplified anatomy, procedure pathway animations, and calm real-world setting visuals.

Add new visual categories: 1. Anatomy 2. Procedure walkthrough 3. Medical device/tool 4. Care setting 5. Patient experience 6. Mechanism-of-action 7. Test/sample collection 8. Imaging machine/scan 9. Recovery/home-care 10. Research/clinical trial visit.

Add a new type ClinicalVisualPlan: visualCategory, realWorldConceptShown, recommendedVisualStyle, safeVisualBoundary, animationIdea, staticFallback, assetSearchTerms, scenePlacement, patientFriendlyExplanation, avoidShowing.

Update every StoryboardScene to include: uiVisualDirection, clinicalVisualDirection, clinicalVisualCategory, realWorldConceptShown, treatmentSpecificVisual, safeMedicalVisualStyle, assetSearchTerms, avoidVisuals, motionDirection.

Videos use both: A) human/personalized UI visuals; B) real-world treatment/procedure visuals. Do not replace UI visuals entirely — blend them: start with patient-specific intro → show real-world clinical visual → return to personalized preparation/CTA → show safety disclaimer.

(Examples given for colon screening, diabetes follow-up, clinical trial education, medication journey, imaging/test result — each with what to show and what to avoid.)

Create reusable visual components: AnatomyExplainerScene, ProcedureWalkthroughScene, MedicalDeviceScene, SampleCollectionScene, ImagingExperienceScene, MedicationPathwayScene, ClinicalTrialVisitScene, RecoveryAtHomeScene, CareSettingScene, PatientExperienceScene. Animate with Framer Motion using coded visuals where possible. Update the demo data and video renderer accordingly.

---

## PIVOT B — UPGRADE ALL DEMO STORYBOARDS WITH TREATMENT-SPECIFIC REAL-WORLD VISUALS

Rewrite the storyboard scenes for every demo use case so each video includes treatment-specific or care-process-specific visuals, not just UI cards. Each video should have 6-8 scenes.

Every video must include at least: 2 patient-personalized scenes, 2 real-world clinical/treatment/procedure visual scenes, 1 preparation/questions scene, 1 next-step scene, 1 safety/disclaimer scene. Real-world visuals must be educational, non-graphic, and patient-friendly.

(Per-use-case required visuals + avoid lists given for all 12.)

For every scene include: sceneTitle, narration, onScreenText, patientPersonalization, clinicalVisualDirection, realWorldConceptShown, motionDirection, assetSearchTerms, codedAnimationIdea, safetyBoundary, avoidShowing.

Make the scripts warmer and more human while keeping clinical safety. The patient should feel like the video understands their situation, not like they are watching generic hospital content.

---

## PIVOT C — CODE BEAUTIFUL ANIMATED CLINICAL VISUAL COMPONENTS

The app needs real animated clinical visuals, not only UI cards. Create a new component library for medical explainer scenes.

Folder: components/clinical-visuals/

Build: 1. ColonScreeningVisual 2. A1CExplainerVisual 3. BloodPressureCuffVisual 4. ClinicalTrialJourneyVisual 5. DischargeRecoveryVisual 6. MedicationJourneyVisual 7. LabProcessVisual 8. PrenatalVisitVisual 9. ColonoscopyPrepVisual 10. GenomicsConsentVisual (each with the specific visual elements described).

Requirements: React + TS + Tailwind + Framer Motion, SVG and CSS gradients, lucide-react icons, 16:9 layout, screen-record quality, calm/smooth/educational motion, no gore, no scary visuals, no clinical claims. Every component accepts props: patientName, title, caption, language, safetyNote, personalizationNote.

Add these components to the VideoSceneRenderer so storyboard scenes can render actual clinical visuals. Update the Visual System page to showcase all clinical visuals with live animation previews. Update the demo detail pages so each video alternates: patient-specific UI scene, real-world clinical visual scene, preparation/checklist scene, clinical visual scene, CTA/disclaimer scene.

The video should look like a real patient education video generator powered by clinical/treatment visuals, not a dashboard demo. Do not show random abstract shape scenes as final visuals. Do not use primitive SVG squiggles as medical anatomy. Do not rely on UI cards as the main video content.

Visual hierarchy: 1. treatment/procedure/test visual 2. animated labels/callouts 3. patient-specific context 4. narration captions 5. care-team CTA.

---

## PIVOT D — THE CURRENT VISUAL DIRECTION IS WRONG (ASSET-BACKED REBUILD)

The existing clinical visuals look like abstract SVG placeholders, not real clinical/treatment education. They are too flat, too fake, and too UI-like. This is not good enough for a Truveta/Opera demo.

New direction: Do not try to create realistic clinical visuals purely from HTML/SVG primitives. Claude should not invent anatomy from code. Instead, rebuild the video system around real clinical/treatment visual assets. The videos need to visually show the actual treatment, procedure, test, body process, or care experience, not merely represent it with UI cards.

Style: high-end medical explainer video; Mayo/Cleveland Clinic patient education; Osmosis-style but more premium; 3D/2D hybrid medical education render; cinematic clinical education; real procedure/test/treatment visuals with overlays.

Create an asset-backed system:
* /public/medical-assets/ and subfolders: colon-screening, diabetes-a1c, clinical-trials, discharge, medication, labs, prenatal, blood-pressure, colonoscopy-prep, genomics

Create: lib/treatmentVisualAssetPlan.ts and lib/medicalAssetManifest.ts.

Each asset plan entry: assetId, useCaseId, sceneNumber, recommendedFileName, assetType (still-image | short-motion-video | medical-render | stock-video | lottie), closeupLevel (wide | medium | close-up | macro), visualDescription, whatPatientLearns, exactImageGenerationPrompt, exactVideoGenerationPrompt, stockSearchTerms, overlayLabels, animationTreatment, personalizationOverlay, priority, fallbackIfMissing: asset-slot-only.

Important: If the asset is missing, show a polished asset slot with the exact visual prompt. Do NOT show fake abstract medical art.

Create components: TreatmentVideoScene, TreatmentAssetSlot, TreatmentVisualRenderer, MedicalAssetScene, KenBurnsTreatmentImage, TreatmentVideoAssetPlayer, AnimatedMedicalCallout, SceneCaptionOverlay, PatientPersonalizationOverlay.

The final system should let me upload real clinical visuals and have the app turn them into polished personalized video scenes with zooms, pans, labels, callouts, captions, and patient-specific narration. Replace or heavily de-emphasize the current primitive SVG clinical visuals.

---

## PIVOT E — CREATE A COMPLETE TREATMENT-SPECIFIC VISUAL ASSET PLAN

File: lib/treatmentVisualAssetPlan.ts

For each demo video, define 6-8 required visual assets. At least 50% of every video’s runtime should be actual treatment/procedure/test/body-process visuals, not UI cards.

Global visual style for all assets: Premium cinematic medical education visual, realistic 3D/2D hybrid or high-quality medical render, treatment-specific, close-up where useful, clean clinical lighting, sharp detail, blue/teal medical highlight overlays, patient education tone, 16:9 composition, room for captions and labels, no logos, no readable PHI.

(Per-use-case required visual lists given for all 12 videos.)

For each asset include: assetId, useCaseId, sceneNumber, recommendedFileName, assetType, closeupLevel, visualDescription, whatPatientLearns, exactImageGenerationPrompt, exactVideoGenerationPrompt, stockSearchTerms, overlayLabels, animationTreatment, personalizationOverlay, priority, fallbackIfMissing.

Also update all storyboard scenes so they reference these treatment assets. If a real asset is missing, show the asset slot. Do not show fake SVG medical art.

---

## PIVOT F — BUILD THE ASSET-BACKED TREATMENT VIDEO RENDERER

Create these components:
1. TreatmentVideoScene — 16:9 scene: real treatment/procedure/test image or video as the main visual, cinematic zoom/pan, animated medical labels, arrows/highlights, narration caption, patient-specific overlay, education/source badge, scene progress.
2. TreatmentAssetSlot — if the actual asset does not exist yet, show a polished slot: “Treatment visual asset needed”, recommended filename, visual description, exact image generation prompt, exact video generation prompt, stock search terms, copy prompt button, copy filename button, priority, closeup level, intended scene.
3. TreatmentVisualRenderer — given a storyboard scene, render either the actual asset if it exists or the TreatmentAssetSlot if missing.
4. AnimatedMedicalCallout — line/arrow to visual area, soft pulse highlight, short patient-friendly label, optional explanation.
5. KenBurnsTreatmentImage — for stills: slow zoom, pan, focus highlight, label reveal.
6. TreatmentVideoAssetPlayer — for MP4/WebM: background playback, overlay labels, captions, progress.
7. AssetSlotsManager page at /asset-slots — list every required medical/treatment visual asset; filter by video/use case, priority, closeup level; search; copy image prompt; copy video prompt; show upload status; preview if file exists; polished slot if missing.

Update navigation with: Asset Slots. Update demo detail pages: every video preview must now use TreatmentVisualRenderer.

The goal: The video should look like a real patient education video generator powered by clinical/treatment visuals, not a dashboard demo. Do not show random abstract shape scenes as final visuals. Do not use primitive SVG squiggles as medical anatomy. Do not rely on UI cards as the main video content.

Visual hierarchy: 1. treatment/procedure/test visual 2. animated labels/callouts 3. patient-specific context 4. narration captions 5. care-team CTA.

---

## APPENDIX — ELEVENLABS 8-SECOND VIDEO PROMPT (EXAMPLE FORMAT)

Using the ElevenLabs video API — generates strong ~8-second scenes when the description is very detailed and precise. Example prompt style used to seed the colon screening clips:

> Create a realistic, premium medical education visual sequence for a colonoscopy screening explanation.
>
> Style: High-end 3D medical education animation, cinematic clinical lighting, realistic anatomy, detailed but clean, blue/teal medical highlight overlays, professional patient education style. Should look like a real medical explainer, not UI cards, not abstract icons, not cartoon anatomy.
>
> Aspect ratio: 16:9 widescreen.
>
> Visual sequence: Scene 1 — Colon anatomy overview. Scene 2 — Colonoscope device close-up. Scene 3 — Scope entering colon pathway. Scene 4 — Camera-view perspective. Scene 5 — Polyp detection close-up. Scene 6 — Polyp removal concept (clean, educational, no gore). Scene 7 — Procedure room wide shot. Scene 8 — Recovery / follow-up concept.
>
> Motion style: Smooth camera movement, slow zooms, gentle pans, cinematic transitions, realistic depth of field, soft teal highlights, subtle medical callout overlays, premium healthcare explainer feel.
>
> Avoid: abstract SVG-style visuals, generic UI dashboards as the main visual, cartoon doctors, colon that looks like random squiggles, logos, readable patient information, text-heavy scenes.

**How generated clips wire into the app:** save the .mp4 under `/public/medical-assets/<folder>/`, then register it in `lib/medicalAssetManifest.ts` as `assetId → path`. `buildVideoTimeline` only plays entries that have a real uploaded clip (`hasMedicalAsset`) or a coded in-app scene (`hasCodedScene`) — prompt-only slots are skipped in the actual video. The scene's spoken narration lives on `TreatmentAssetEntry.voiceover` and doubles as the on-screen subtitle so audio and captions stay in sync.
