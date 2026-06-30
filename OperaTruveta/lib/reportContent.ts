/**
 * Opera Patient Education Studio — strategic written content.
 *
 * This file holds the prose for a concept memo prepared for the Truveta
 * technical and partnerships team. It is a product/strategy document, not
 * marketing copy. The tone is measured: structured, specific, and honest
 * about boundaries and open questions.
 *
 * Hard product boundary, restated here because it governs everything below:
 * Opera Patient Education Studio produces patient EDUCATION and
 * communication only. It is not clinical decision support, diagnosis,
 * treatment recommendation, medication guidance, patient-specific risk
 * prediction, independent interpretation of results, or emergency triage.
 * It works from approved content, requires human review before anything
 * reaches a patient, shows its sources, and always routes the patient back
 * to their care team. All demo data referenced in the product is synthetic.
 */

export interface ReportMeta {
  title: string;
  subtitle: string;
  preparedFor: string;
  preparedBy: string;
  date: string;
  confidentiality: string;
}

export interface ReportList {
  heading?: string;
  items: string[];
}

export interface ReportSection {
  id: string;
  number: number;
  title: string;
  summary: string;
  body: string[];
  lists?: ReportList[];
}

export interface VideoCategory {
  id: string;
  name: string;
  explains: string;
  audience: string;
  departments: string;
  exampleTitle: string;
  personalizationInputs: string[];
  visualFormat: string;
  safetyNotes: string;
  whyItMatters: string;
}

export const reportMeta: ReportMeta = {
  title: 'Opera Patient Education Studio',
  subtitle:
    'A personalized patient-education layer on top of approved clinical content and patient-journey context',
  preparedFor: 'Prepared for the Truveta technical & partnerships team',
  preparedBy: 'Opera AI',
  date: 'June 2026',
  confidentiality: 'Concept memo · Synthetic demo data · Not for clinical use',
};

export const reportSections: ReportSection[] = [
  {
    id: 'executive-summary',
    number: 1,
    title: 'Executive Summary',
    summary:
      'Opera proposes a patient-education layer that turns approved clinical content and journey context into personalized, reviewable video and multi-channel messages — and nothing beyond education.',
    body: [
      'This memo describes a focused product idea and asks a focused question. Patients today are asked to absorb consequential health information through portal messages, dense PDFs, and generic explainer videos that were written for no one in particular. Comprehension suffers, anxiety rises, preparation lags, and follow-through drops. Opera Patient Education Studio is a system that takes content that has already been approved by a clinical owner, combines it with what is known about where a patient is on their care journey, and produces a short, personalized education asset — most often a 60-to-90-second video, optionally delivered through portal, SMS, or email — that a reviewer signs off on before any patient sees it.',
      'The opportunity is shaped by a simple observation: the constraint on better patient education is rarely the underlying clinical knowledge. The knowledge exists, and in Truveta’s case it exists at a scale and quality that few organizations can match. The constraint is translation — turning correct, evidence-informed content into something a specific human will actually watch, understand, and act on. Opera is built to be good at that translation step and only that step. We do not produce the evidence and we do not replace the clinician; we make the last mile between a care team’s intent and a patient’s understanding shorter and warmer.',
      'The boundary is the most important thing in this document, so we state it up front and return to it throughout. This is patient education and communication. It is not clinical decision support, diagnosis, treatment recommendation, medication guidance, patient-specific risk scoring, independent result interpretation, or emergency triage. Every asset is generated from approved content, passes a human-review gate, carries source transparency and an educational disclaimer, and ends by pointing the patient back to their care team. The demo we have built runs entirely on synthetic patients and synthetic content so that the concept can be evaluated without touching real data.',
      'What we are asking of Truveta is not a commitment but a conversation. We believe a patient-facing education layer is a natural complement to Truveta’s position, we have built a working concept demo to make the idea concrete, and we have a list of genuine open questions — on content governance, regulatory posture, data boundaries, and success metrics — that we would rather work through together than guess at.',
    ],
  },
  {
    id: 'why-truveta',
    number: 2,
    title: 'Why Truveta',
    summary:
      'Truveta’s strengths — real-world data at scale, evidence, patient-journey understanding, and trusted relationships with health systems and life sciences — make a patient-facing education layer a complement, not an overlap.',
    body: [
      'Truveta has assembled something rare: regulatory-grade real-world data drawn from a large, growing set of member health systems, organized in a way that supports rigorous evidence generation and a longitudinal view of patient journeys. That foundation already serves research, life-sciences partners, and population-health questions well. What it does not yet have a dedicated layer for is the patient as a reader — the person at the other end of all that journey understanding, who still receives the same generic materials everyone else does.',
      'A patient-education layer is defensible precisely because it sits adjacent to, rather than on top of, what Truveta already does well. Truveta knows, at population scale, which moments on a journey matter and what the evidence says about them. Opera does not try to reproduce that. Instead it consumes themes that a content owner has chosen to make shareable for education, and it expresses them to individuals. The two capabilities reinforce each other: better journey and evidence understanding makes the education more relevant, and better education makes the value of that understanding visible to patients and to the systems that care for them.',
      'There is also a relationship advantage. Truveta’s member health systems and life-sciences partners are exactly the organizations that feel the cost of poor patient comprehension — in missed screenings, no-shows, weak visit preparation, low trial enrollment, and inequitable outcomes. A patient-education layer gives those existing relationships a new, patient-visible surface without asking them to adopt a competing data platform. It is additive to the partnerships Truveta has already earned rather than a wedge into them.',
      'We want to be careful not to overclaim here. Truveta could build patient-facing communication itself, and the question of build-versus-embed is a real one we raise later. Our argument is narrower: the translation-to-the-individual problem is a distinct discipline — part clinical communication, part design, part personalization — and it is the one we have chosen to be good at. If that division of labor is useful to Truveta, the complementarity is strong.',
    ],
  },
  {
    id: 'patient-facing-opportunity',
    number: 3,
    title: 'Patient-Facing Opportunity',
    summary:
      'The gap is comprehension: patients get portal messages, dense PDFs, and generic explainers, and the cost shows up as missed screenings, no-shows, poor preparation, low trial enrollment, and inequity.',
    body: [
      'Consider the materials a patient actually receives around a meaningful health moment. A portal message written in clinical shorthand. A multi-page PDF that assumes a reading level and a calm that the patient may not have. A stock explainer video produced for a generic audience, with imagery that is often more alarming than clarifying. None of these were made for the specific person reading them, and it shows. Comprehension is low, anxiety is high, and the patient is left to translate the material into action on their own — frequently at the worst possible moment, after a frightening result or before an unfamiliar procedure.',
      'The cost of this gap is not abstract. It appears as preventive screenings that are recommended but never scheduled, appointments that are booked but not kept, visits where the patient arrives unprepared and the clinician spends scarce minutes re-explaining basics, clinical trials that struggle to enroll because eligible patients never understood the invitation, and follow-up that quietly lapses. Each of these is measurable, and each maps to outcomes that health systems and life-sciences partners already track.',
      'The gap is also an equity problem. Generic materials are hardest on exactly the patients who most need clarity: those with lower health literacy, those who read in a language other than the one the material was written in, those balancing caregiving or shift work against appointment logistics, and those whose past experiences make them guarded rather than trusting. A one-size message widens these gaps. A message shaped to the person can narrow them, which is one of the reasons we treat personalization as a serious, not cosmetic, part of the work.',
      'Importantly, none of this requires changing what the patient is told clinically. The clinical content can be entirely correct and still fail to land. The opportunity is to close the comprehension gap without touching the clinical substance — to deliver the same approved message in a form that a specific person can receive.',
    ],
  },
  {
    id: 'operas-role',
    number: 4,
    title: 'Opera’s Role',
    summary:
      'Opera is the communication layer: it translates approved content and journey context into personalized education assets across channels — explicitly not the evidence engine and not the clinician.',
    body: [
      'Opera’s role is bounded and deliberate. We take two inputs — content that a clinical owner has already approved, and context about where a patient is on their journey — and we produce an education asset: a short video, a portal note, an SMS, an email, or a caregiver summary, personalized to the individual. We are the layer that turns settled clinical intent into something a human will engage with. We are not the layer that decides what the clinical intent should be.',
      'This positioning is easiest to understand by what it excludes. Opera does not generate evidence; that is Truveta’s domain, and the population-level themes we use are ones a content owner has chosen to share for educational purposes. Opera does not act as the clinician; it does not diagnose, recommend treatment, adjust medication, score a patient’s risk, or interpret a patient’s individual results. When a patient’s situation calls for clinical judgment, the asset’s job is to acknowledge the concern warmly and route the patient back to their care team — never to fill the gap itself.',
      'Within those limits, the value Opera adds is real. The same approved content can be expressed dozens of ways depending on the reader, and getting that expression right — the tone, the reading level, the language, the example that fits this person’s life — is the difference between a message that is technically delivered and one that is actually understood. Opera concentrates entirely on making that difference, which is why we describe ourselves as a communication layer rather than a content or decision layer.',
      'A useful mental model: the care team and the evidence decide what to say; Opera helps decide how to say it to this person; the human reviewer confirms that both stayed inside the lines. Each role is distinct, and keeping them distinct is what makes the system safe to deploy.',
    ],
  },
  {
    id: 'product-concept',
    number: 5,
    title: 'Product Concept',
    summary:
      'Opera Patient Education Studio takes approved content through storyboard and scenes to a personalized video plus multi-channel delivery — every output reviewable, one template rendering many videos.',
    body: [
      'Opera Patient Education Studio is a studio in the production sense: a place where a piece of approved content becomes a finished, personalized education asset through a defined set of steps. The system selects the relevant context, drafts a script grounded in the approved content, applies personalization, lays the script out as a storyboard of scenes, plans the motion and visuals for each scene, runs a compliance check, and presents the whole package to a human reviewer. Only after approval does it produce the patient-facing output.',
      'The output most teams will reach for first is video, because video carries tone and pacing in a way text cannot, and because a short, calm, well-paced explanation is unusually effective at reducing anxiety. But video is one format among several. The same reviewed package can drive a portal message, an SMS reminder, an email, or a short summary aimed at a caregiver, so a single approval can serve the channel the patient actually uses.',
      'The structural advantage of the studio is that one template renders many videos. A care pathway has a finite set of education moments, and each moment has a structure — an opening, the core explanation, what to expect, what to do next, where to turn for help. Once that structure is built as a reusable composition, personalization fills it for each patient. This is what makes the approach scalable without becoming generic: the scaffolding is shared, the substance per patient is specific, and the review gate sits over both.',
      'Everything in the studio is designed to be inspectable. A reviewer can read the script, walk the storyboard, see which approved sources informed which lines, and read the compliance checklist before deciding. The product is as much a review surface as a generation engine, because in this domain the review surface is what makes generation acceptable.',
    ],
  },
  {
    id: 'personalization-philosophy',
    number: 6,
    title: 'Personalization Philosophy',
    summary:
      'Personalize to the human, not just the medical topic — fears, goals, schedule, support, language, literacy, barriers, and emotional state — because that is what separates Opera from generic patient education.',
    body: [
      'Most patient-education personalization stops at the medical topic: it inserts the right condition and the right procedure into a fixed template. That is necessary but shallow. The information a patient needs is rarely the whole problem; the problem is that the same information has to reach very different people in very different states. The patient who is calm and curious needs a different opening than the patient who is frightened and guarded, even when the clinical content is identical. Opera’s core conviction is that personalization should be aimed at the human first and the topic second.',
      'In practice this means shaping the asset around things that have nothing to do with the diagnosis and everything to do with whether the message lands: what the person is afraid of, what they are hoping for, how their week is actually structured, who helps them, what language they think in, how much medical reading they are comfortable with, what concrete barriers stand between them and the next step, and what emotional state they are likely in when the message arrives. None of these change the clinical content. All of them change whether it is received.',
      'The effect is most visible in small, specific touches. A few synthetic examples, drawn from our demo: “Because you mentioned you work night shifts, it may help to write your questions down before your appointment so you are not relying on memory when you are tired.” Or: “You told us getting back to gardening matters to you — that goal is a good thing to bring up with your care team when you talk about next steps.” Or, for a caregiver: “Your mother does best when changes are explained slowly, so this video is paced to be paused and rewatched together.” Each line is grounded in something the patient or care team provided, never invented, and each makes the same approved content feel like it was made for one person — because it was.',
      'We hold a hard line through all of this: personalization shapes tone, examples, pacing, language, and framing — never the clinical substance. We do not personalize what is true, only how it is told. And every personalized line is traceable to an approved or patient-provided source, so that warmth never becomes fabrication. Done this way, personalization is not a gimmick; it is the mechanism by which education becomes equitable, because the patients who are hardest to reach with generic material are exactly the ones a human-shaped message reaches.',
    ],
    lists: [
      {
        heading: 'Personalization dimensions',
        items: [
          'Fears and worries, framed in the patient’s own words and acknowledged calmly rather than dismissed.',
          'Goals and motivations — what the patient is actually trying to get back to or protect.',
          'Schedule and life logistics, including shift work, travel, and competing obligations.',
          'Caregiver and social support — who is involved and how the message can include them.',
          'Preferred language and the need for accurate, non-literal translation rather than machine word-swapping.',
          'Health literacy level, setting reading level, pacing, and how much is explained at once.',
          'Concrete barriers — transportation, cost worries, childcare, time off, distrust of the system.',
          'Likely emotional state at the moment of delivery (anxious, overwhelmed, curious, guarded, hopeful).',
          'Journey stage — pre-visit, post-result, post-discharge, mid-treatment — which sets what the patient needs next.',
          'Channel preference, so the same approved message arrives where the patient will actually see it.',
        ],
      },
    ],
  },
  {
    id: 'video-generation-workflow',
    number: 7,
    title: 'Video Generation Workflow',
    summary:
      'The pipeline runs from context selection through script, personalization, storyboard, motion plan, compliance check, and human review to a mock video job and preview — with the review gate as the load-bearing step.',
    body: [
      'The generation pipeline is intentionally linear and inspectable. It begins by selecting context: the approved content for the moment, the patient’s journey stage, and the personalization signals that have been provided. From that context it drafts a script grounded in the approved material, then applies personalization to tone, examples, language, and pacing. The script is then laid out as a storyboard — a sequence of scenes, each with its narration, on-screen text, and a single idea — and each scene receives a motion and visual plan describing how it should be drawn and animated.',
      'Before anything is rendered, the package passes an automated compliance check. This step looks for the failure modes that matter in this domain: language that drifts toward diagnosis or recommendation, anything that could read as interpreting the patient’s individual result, missing disclaimers, missing source attribution, or claims not supported by the approved content. The compliance check does not replace human judgment; it surfaces issues so the human reviewer can focus attention where it is needed.',
      'The human-review gate is the load-bearing step in the entire system, and we treat it that way. The reviewer sees the full package — script, storyboard, the approved sources behind each section, and the compliance checklist — and either approves it or holds it back, with the ability to send it for revision. Nothing reaches a patient without that approval. The pipeline is designed so that generation is fast and review is unhurried, because the value of speed is only safe when the gate behind it is real.',
      'Only after approval does the system create a video job and produce a preview. In the current concept demo the video job is mocked, so the workflow can be evaluated end to end without committing to a rendering backend or, more importantly, without implying that automated output is ever patient-ready before a human has signed off.',
    ],
  },
  {
    id: 'video-categories',
    number: 8,
    title: 'Video Categories',
    summary:
      'The studio organizes education into thirteen categories spanning prevention, chronic care, research, results, procedures, and equity — each with its own personalization inputs and its own safety boundary.',
    body: [
      'The same generation pipeline serves a range of education moments, and we have organized them into thirteen categories so that each can carry its own personalization inputs, its own visual conventions, and — most importantly — its own explicit safety boundary. The categories are not features so much as carefully scoped lanes: defining them separately lets us be precise about what each kind of video does and, just as deliberately, what it refuses to do.',
      'The thirteen categories span the journey: preventive care and screenings, chronic-disease follow-up, clinical-trial education, the medication journey, post-discharge recovery, explaining what a lab, test, or imaging study is and how results will be shared, preparing for a procedure, maternal health, oncology education, health equity and language access, caregiver education, genomics and consent education, and public-health campaigns. Each is rendered as its own card in this report, with audience, example, personalization inputs, visual format, the specific safety note for that category, and why it matters.',
      'The per-category safety notes deserve emphasis because the boundary is not generic across them. The lab category, for instance, explains what a test measures and how results will be communicated but never interprets the patient’s own result. The medication category explains how a patient was guided to take a medication and what questions to bring, but never recommends a change. Reading the cards alongside this section is the clearest way to see how the education boundary is enforced at the level of each use case rather than only as a global statement.',
    ],
  },
  {
    id: 'detailed-use-cases',
    number: 9,
    title: 'Detailed Use Cases',
    summary:
      'Twelve synthetic demo patients make the concept concrete, each showing a full asset — patient context, approved content, personalization, script, storyboard, compliance, and boundary.',
    body: [
      'To make the concept evaluable rather than aspirational, the demo includes twelve fully worked use cases, each built around a synthetic patient. Every use case carries the whole package an organization would actually scrutinize: the patient’s context and concerns, the approved content the asset is grounded in, the population-level evidence theme it reflects, the specific personalization signals applied, the script, the scene-by-scene storyboard, the visual and motion plan, the multi-channel delivery copy, the compliance checklist, and the explicit statement of what the asset does and does not do.',
      'The twelve are chosen to stress the system across different shapes of problem — a frightened patient after an abnormal result, a caregiver managing someone else’s care, a shift worker who cannot make standard appointment windows, a patient invited to a clinical trial, a non-English-dominant patient, a post-discharge recovery, a procedure preparation, and so on. Read together, they demonstrate that the same pipeline and the same boundary hold across very different emotional states, literacy levels, languages, and journey stages.',
      'Every patient, every name, and every piece of content in these use cases is synthetic. They are constructed to be realistic enough to evaluate the experience honestly while containing no real patient data of any kind. This is deliberate: the concept should be assessable on its merits before any conversation about real data begins, and the use cases are designed to support exactly that kind of assessment. The report page renders the twelve from structured data so they can be browsed in full.',
    ],
  },
  {
    id: 'visual-language-and-video-format',
    number: 10,
    title: 'Visual Language and Video Format',
    summary:
      'Scenes are drawn in code — React, Framer Motion, SVG — at 16:9 with large captions, calm motion, one idea per scene, no stock footage, and no alarming imagery, rendered via Remotion or Lottie.',
    body: [
      'The visual language is chosen to lower anxiety rather than raise it. Scenes are drawn in code using React, Framer Motion, and SVG, which gives us precise control over tone and lets one composition render many personalized videos. We deliberately avoid stock footage and clinical photography; for a patient who is already worried, a literal image of a procedure or a body part is more likely to alarm than to inform. Clean, abstract, well-paced visuals carry the explanation better.',
      'The format conventions are simple and consistent. Video is 16:9, captions are large and present throughout so the content works with sound off and supports lower literacy and language access, motion is calm and unhurried, and each scene presents exactly one idea. Constraining scenes to a single idea is a comprehension decision as much as a design one: it gives the viewer time to absorb each step before the next arrives, which is precisely what dense PDFs and rushed portal messages fail to do.',
      'On rendering, the code-drawn approach maps naturally onto Remotion for full video composition and Lottie for lightweight animated elements, with the option of screen-recorded walkthroughs where that is the clearest form. We are intentionally not committing to a heavy rendering backend in the concept stage; the priority is proving that the visual language reads well to patients before optimizing how it is produced at volume.',
    ],
  },
  {
    id: 'safety-compliance-fda-boundary',
    number: 11,
    title: 'Safety, Compliance, and FDA Boundary',
    summary:
      'This is education only; the boundary is enumerated and enforced so the product stays outside software-as-a-medical-device and clinical-decision-support territory — with final regulatory positioning treated as a shared question.',
    body: [
      'For a CTO, this is the section that matters most, so we will be exact. Opera Patient Education Studio is patient education and communication. It is built so that it cannot, by design, slide into clinical functions. The boundary is not a disclaimer bolted onto the end; it is enforced at generation time by the compliance check, at the data layer by what content the system will accept, and at the review gate by a human who must confirm the asset stayed inside the lines before it ships.',
      'We have thought carefully about why this keeps the product outside software-as-a-medical-device and clinical-decision-support territory, while also recognizing that the line is one regulators draw, not us. Our reasoning is that the product does not provide a recommendation directed at an individual patient’s clinical decision, does not interpret an individual’s data to inform diagnosis or treatment, and does not operate autonomously; it restates approved content, personalizes its delivery, and defers every clinical judgment to the care team. The intent is education, the output is reviewed by a human, and the asset consistently routes the patient back to their clinicians. We believe that places it in the patient-communication category rather than the decision-support category — but we hold that view as a starting position to be validated, not a settled conclusion.',
      'We want to be intellectually honest about the edges. Some categories — genomics and consent, oncology education, result explanation — sit closer to the line than others, and the difference between explaining what a test measures and interpreting a result can be subtle in wording. That is exactly why those categories carry the strictest per-category safety notes and the most conservative compliance checks. Final regulatory positioning is something we would want to work through with Truveta and appropriate counsel rather than assert; it is one of the open questions later in this memo.',
    ],
    lists: [
      {
        heading: 'What this product does NOT do',
        items: [
          'No diagnosis — it never tells a patient what condition they have.',
          'No treatment recommendation — it never advises a patient on what treatment to choose.',
          'No medication change — it never tells a patient to start, stop, or adjust a medication.',
          'No patient-specific risk scoring or prediction of an individual’s outcome.',
          'No autonomous clinical decision-making — a human reviews every asset before delivery.',
          'No independent interpretation of an individual patient’s lab, imaging, or test result.',
          'No emergency triage — it never assesses urgency or directs emergency action.',
        ],
      },
      {
        heading: 'What this product always does',
        items: [
          'Works only from content approved by a clinical content owner.',
          'Requires human review and approval before anything reaches a patient.',
          'Provides source transparency — the reviewer can see what informed each line.',
          'Includes a clear educational disclaimer in every asset.',
          'Routes the patient back to their care team for any clinical question.',
        ],
      },
    ],
  },
  {
    id: 'data-boundary',
    number: 12,
    title: 'Data Boundary',
    summary:
      'Opera does not need raw identified records to generate education; it works from synthetic, patient-provided, care-team-provided, and approved content under consent, with de-identification and clear PHI principles.',
    body: [
      'A recurring misconception about personalized patient communication is that it requires deep access to identified clinical records. It does not. The personalization that makes a message land — schedule, fears, goals, language, support, journey stage — is largely information a patient can provide directly or a care team can supply within an existing relationship. Opera is designed around that reality: it generates education from approved content plus a small, purposeful set of context signals, not from raw medical records.',
      'This matters for the data conversation because it keeps Opera’s footprint deliberately small. We do not need, and do not want, more data than the task requires. Where context comes from a system of record, our preference is for de-identified or minimized data delivered under appropriate consent, with PHI handled under the principle that the least data sufficient to produce good education is the right amount. The concept demo runs entirely on synthetic data, which is the cleanest possible starting point for working out the real data boundary together.',
      'The PHI handling principles we would bring to a pilot are conventional but worth stating: collect only what the education task needs, prefer de-identification and minimization, operate under explicit patient consent, never log identifiable patient detail in places it does not belong, and keep a clear separation between the approved content layer and any patient-context layer. Defining the exact data boundary — what is shared, how it is de-identified, who consents to what — is something we would scope precisely with Truveta rather than assume.',
    ],
    lists: [
      {
        heading: 'Opera uses',
        items: [
          'Approved clinical content from a designated content owner.',
          'Population-level evidence themes a content owner has chosen to share for education.',
          'Patient-provided context — fears, goals, schedule, language, channel preference.',
          'Care-team-provided journey context — stage, plain-language trigger, approved framing.',
          'Synthetic data for all demonstration and development.',
        ],
      },
      {
        heading: 'Opera does not require',
        items: [
          'Raw identified medical records to generate an education asset.',
          'Full clinical histories or chart-level detail beyond the education moment.',
          'A patient’s individual lab, imaging, or genetic results for interpretation.',
          'Any data used for risk scoring or prediction of an individual’s outcome.',
          'Access to data outside the scope and consent agreed for the pilot.',
        ],
      },
    ],
  },
  {
    id: 'human-review-workflow',
    number: 13,
    title: 'Human Review Workflow',
    summary:
      'A reviewer sees the script, storyboard, sources, and compliance checklist, then approves or withholds; nothing reaches a patient without approval, and every decision is recorded in an audit trail.',
    body: [
      'The human-review workflow is the mechanism that makes the rest of the system trustworthy, so it is built to be more than a rubber stamp. A reviewer — typically a clinical communicator or a designated content owner — opens a complete package and is shown everything they need to make a real judgment: the full narration script, the scene-by-scene storyboard, the approved sources behind each section, and the compliance checklist with its automated findings. The reviewer’s job is to confirm both that the content stayed faithful to the approved material and that the asset never crossed the education boundary.',
      'The reviewer has three actions: approve, withhold, or send back for revision. Approval is the only path to a patient. Withholding stops the asset entirely; revision returns it to the pipeline with notes. There is no automated bypass and no “publish anyway” shortcut, because the entire safety argument of the product rests on the gate being unconditional. Generation can be as fast as we can make it precisely because nothing downstream of the reviewer happens without them.',
      'Every decision is recorded. The audit trail captures what was reviewed, which sources informed it, the compliance status at the time of review, who approved or withheld it, and when. This serves accountability, supports the regulatory posture, and gives content owners and partners a defensible record of how each patient-facing asset came to exist.',
    ],
    lists: [
      {
        heading: 'Reviewer checklist',
        items: [
          'Is every clinical statement faithful to the approved source content?',
          'Does the asset avoid diagnosis, treatment recommendation, and medication guidance?',
          'Does it avoid interpreting the patient’s individual result or scoring their risk?',
          'Is the educational disclaimer present and clear?',
          'Are sources attributed and visible to the reviewer?',
          'Does personalization affect tone and framing only, never clinical substance?',
          'Is the language at an appropriate literacy level and accurately translated where needed?',
          'Does the asset route the patient back to their care team for clinical questions?',
        ],
      },
    ],
  },
  {
    id: 'implementation-path',
    number: 14,
    title: 'Implementation Path',
    summary:
      'A modest, phased path: synthetic concept demo now, then a narrow pilot on one approved pathway, measure comprehension and preparedness, expand categories, and integrate delivery.',
    body: [
      'We favor a phased path that earns trust before it scales scope. The first phase exists today: a synthetic concept demo that lets Truveta evaluate the experience, the boundary, and the review workflow end to end without any real data. The point of this phase is to align on whether the concept is worth pursuing and to surface concerns while the cost of changing direction is near zero.',
      'The second phase is a narrow pilot. We would pick a single care pathway with a clear content owner and a finite set of education moments, use only content that owner has approved, and produce reviewed assets for a limited population under appropriate consent. Keeping the first pilot narrow is intentional: one pathway is enough to test generation quality, the review gate, delivery, and — most importantly — whether patients actually understand and prepare better. We would rather learn deeply on one pathway than thinly across many.',
      'The third and fourth phases are expansion, and only if the measurements justify it. We would measure comprehension and preparedness against the pre-Opera baseline, and if the results hold, expand to additional categories and integrate delivery more deeply into the channels patients already use. We are deliberately modest about timelines and scope here; the credibility of this product depends on not overreaching before the evidence is in.',
    ],
  },
  {
    id: 'partnership-models',
    number: 15,
    title: 'Partnership Models',
    summary:
      'Several engagement shapes are possible, from a synthetic concept demo to white-labeled studio, API layer, and focused pilots — each scoped narrowly so it can be evaluated on its own merits.',
    body: [
      'There is no single right way to work together, and we would rather present a menu than presume a shape. The models below range from the lightest possible engagement to deeper integration, and each is described in one sentence so the trade-offs are easy to compare. Most begin small on purpose; the structure of the product rewards proving value on a narrow surface before widening it.',
      'These are not mutually exclusive, and a likely path threads several of them in sequence — a concept demo into a focused pilot into a broader integration. We list them separately mainly so that a conversation can start from whichever one fits Truveta’s current priorities rather than from ours.',
    ],
    lists: [
      {
        heading: 'Engagement models',
        items: [
          'Synthetic concept demo — evaluate the full experience and boundary on synthetic data, no commitment.',
          'Health-system education pilot — reviewed, personalized education for one pathway at a member system.',
          'Care-gap activation pilot — personalized education aimed at closing a specific preventive or follow-up gap.',
          'Clinical trial education pilot — patient-friendly explanation of an approved trial to support informed enrollment.',
          'Life-sciences patient education pilot — approved disease- or therapy-area education delivered to patients with consent.',
          'White-labeled patient education studio — the studio embedded under a partner’s brand and governance.',
          'API layer — programmatic generation of reviewed education assets into a partner’s existing systems.',
          'Portal / SMS / email delivery integration — connect approved assets to the channels patients already use.',
          'Language-access module — accurate, non-literal translated education to support equity and reach.',
          'Caregiver education module — assets shaped for the person supporting the patient, with appropriate consent.',
        ],
      },
    ],
  },
  {
    id: 'open-questions-for-truveta',
    number: 16,
    title: 'Open Questions for Truveta',
    summary:
      'A set of genuine questions we would rather resolve together than assume — on governance, evidence sharing, regulatory posture, pilot selection, data boundaries, metrics, and build-versus-embed.',
    body: [
      'We have tried throughout this memo to mark the things we do not yet know. Here we collect them. These are real questions, not rhetorical ones; our answers to several of them would change the shape of any pilot, and we would rather work through them with Truveta than guess and be confidently wrong.',
    ],
    lists: [
      {
        heading: 'Questions for discussion',
        items: [
          'Content approval and governance — who is the content owner, and what is the approval process for educational material?',
          'Evidence sharing — which population-level evidence themes are appropriate to express in patient education, and under what conditions?',
          'Regulatory posture — how does Truveta read the education-versus-decision-support line, and what is the appetite for the conservative positioning we propose?',
          'Pilot selection — which member health systems and which care pathway would make the strongest first pilot?',
          'Delivery channel ownership — who owns the portal, SMS, and email relationship with the patient, and how should integration work?',
          'Data boundary specifics — what exactly is shared, how is it de-identified, and where does consent sit?',
          'Success metrics — what measures of comprehension, preparedness, and follow-through would constitute a convincing result?',
          'Language coverage — which languages must a first pilot support to be credible on equity?',
          'Caregiver consent — how should consent work when education is shaped for and delivered to a caregiver?',
          'Build versus embed — does Truveta prefer to embed Opera as a layer, white-label it, or treat this as a reference for building internally?',
        ],
      },
    ],
  },
  {
    id: 'next-steps',
    number: 17,
    title: 'Next Steps',
    summary:
      'A concrete, low-pressure path: a working session on the boundary and governance, a scoped single-pathway pilot definition, and agreement on the comprehension metrics that would make it a success.',
    body: [
      'If the concept is worth pursuing, we would propose a short, concrete path rather than a broad commitment. The first step is a working session with Truveta’s technical and partnerships people to walk the concept demo together, pressure-test the education boundary and the review workflow, and surface concerns early. The most useful outcome of that session is not agreement but a clear, shared list of what would have to be true for a pilot to make sense.',
      'From there, we would jointly define a narrowly scoped pilot: one care pathway, one content owner, approved content only, a limited population under consent, and an agreed set of comprehension and preparedness metrics measured against a pre-Opera baseline. Defining the metrics before building anything is deliberate — it keeps the pilot honest and gives both sides a clear way to decide whether to expand or stop.',
      'There is no pressure embedded in this proposal. The concept demo exists so the idea can be evaluated on its merits and on synthetic data; the natural next step is simply a conversation. If a patient-education layer is useful to Truveta and its partners, we think this is a sound and careful way to find out together.',
    ],
  },
];

export const videoCategories: VideoCategory[] = [
  {
    id: 'preventive-care-and-screenings',
    name: 'Preventive Care and Screenings',
    explains:
      'Why a recommended screening matters, what the screening involves, and how to take the next step toward scheduling it.',
    audience:
      'Patients who are due or overdue for a routine screening and have not yet acted on it.',
    departments: 'Primary care, population health, member health systems.',
    exampleTitle: 'It may be time for your screening — here is what to expect',
    personalizationInputs: [
      'Which screening is due and the patient’s journey stage',
      'Likely barriers (time off work, transportation, cost worries)',
      'Preferred language and health literacy level',
      'Schedule constraints such as shift work',
      'Emotional state (avoidant, anxious, simply busy)',
    ],
    visualFormat:
      'Calm 16:9 explainer with a simple journey timeline and a clear what-to-expect checklist; large captions throughout.',
    safetyNotes:
      'Explains the general purpose of a screening from approved content; never tells the patient they need a specific test for a clinical reason or interprets prior results.',
    whyItMatters:
      'Closes the gap between a recommended screening and a scheduled one, improving preventive follow-through and reducing avoidable late detection.',
  },
  {
    id: 'chronic-disease-follow-up',
    name: 'Chronic Disease Follow-Up',
    explains:
      'What an upcoming follow-up visit is for, what to prepare, and how to keep an ongoing condition’s care on track.',
    audience:
      'Patients managing a long-term condition who have an upcoming or lapsed follow-up.',
    departments: 'Primary care, endocrinology, cardiology, member systems.',
    exampleTitle: 'Getting ready for your follow-up visit',
    personalizationInputs: [
      'Journey stage and reason for the follow-up (approved framing)',
      'Patient goals (e.g., returning to an activity that matters)',
      'Daily routine and schedule',
      'Health literacy level and preferred language',
      'Caregiver involvement, if any',
    ],
    visualFormat:
      'Warm explainer with a preparation checklist and a “questions to bring” card; one idea per scene.',
    safetyNotes:
      'Encourages preparation and continuity of care; never adjusts a care plan, sets targets, or recommends medication or treatment changes.',
    whyItMatters:
      'Improves visit preparedness and continuity, helping patients arrive ready and stay engaged in long-term care.',
  },
  {
    id: 'clinical-trial-education',
    name: 'Clinical Trial Education',
    explains:
      'What a clinical trial is, what participation generally involves, and where to ask questions before deciding.',
    audience:
      'Patients invited to learn about an approved clinical trial they may be eligible for.',
    departments: 'Oncology and clinical research, life-sciences partners.',
    exampleTitle: 'Understanding a research study you have been invited to',
    personalizationInputs: [
      'The specific approved trial and its educational summary',
      'Patient’s questions and concerns about research',
      'Health literacy level and preferred language',
      'Caregiver support for the decision',
      'Emotional state (hopeful, guarded, overwhelmed)',
    ],
    visualFormat:
      'Plain-language explainer with an icon grid of what participation involves and a clear path to ask questions.',
    safetyNotes:
      'Supports informed understanding of an approved trial; never recommends enrollment, implies benefit, or substitutes for the formal informed-consent process.',
    whyItMatters:
      'Improves trial comprehension and informed, voluntary enrollment, which supports both patients and research quality.',
  },
  {
    id: 'medication-journey-education',
    name: 'Medication Journey Education',
    explains:
      'How a patient was guided to take a medication, what to expect, and what questions to bring to the care team.',
    audience:
      'Patients beginning or continuing a medication their care team has prescribed.',
    departments: 'Cardiology, primary care, pharmacy education, member systems.',
    exampleTitle: 'Starting your medication — what to know and what to ask',
    personalizationInputs: [
      'Approved medication-education content for this prescription',
      'Patient routine and reminders that fit their day',
      'Concerns or hesitations the patient has expressed',
      'Health literacy level and preferred language',
      'Caregiver involvement in daily medication support',
    ],
    visualFormat:
      'Reassuring explainer with a simple routine timeline and a “bring these questions” card.',
    safetyNotes:
      'Reflects the care team’s approved guidance only; never recommends starting, stopping, or changing a medication or dose, and routes all medication questions back to the care team.',
    whyItMatters:
      'Supports adherence and confidence by helping patients understand and follow the plan their clinicians set.',
  },
  {
    id: 'post-discharge-recovery',
    name: 'Post-Discharge Recovery',
    explains:
      'What the approved discharge instructions mean in plain language and how to follow the recovery plan at home.',
    audience:
      'Patients recently discharged who must follow recovery instructions at home.',
    departments: 'Hospital medicine, care transitions, member systems.',
    exampleTitle: 'Your recovery at home, explained simply',
    personalizationInputs: [
      'Approved discharge instructions and journey stage',
      'Home and caregiver support situation',
      'Health literacy level and preferred language',
      'Specific worries about recovery',
      'Schedule and follow-up appointment context',
    ],
    visualFormat:
      'Gentle, slow-paced explainer with a day-by-day checklist designed to be paused and rewatched.',
    safetyNotes:
      'Restates approved discharge guidance in plain language; never changes instructions, assesses symptoms, or advises on whether something is an emergency — it directs the patient to their care team or emergency services per the approved instructions.',
    whyItMatters:
      'Reduces readmission risk by improving comprehension of discharge instructions and confidence during recovery.',
  },
  {
    id: 'lab-test-imaging-result-explanation',
    name: 'Lab, Test, and Imaging Result Explanation',
    explains:
      'What a lab, test, or imaging study generally measures and how and when the patient’s results will be shared by their care team.',
    audience:
      'Patients awaiting results or trying to understand what a test is for.',
    departments: 'Primary care, lab follow-up, radiology, member systems.',
    exampleTitle: 'What this test measures and how you will hear your results',
    personalizationInputs: [
      'Which test was performed (general, approved description)',
      'Anxiety level while awaiting results',
      'Preferred language and health literacy level',
      'How the care team plans to share results',
      'Caregiver involvement, if any',
    ],
    visualFormat:
      'Calm explainer with a neutral “what this measures” card and a clear timeline for hearing back; deliberately non-alarming.',
    safetyNotes:
      'Explains what a test generally measures and how results are communicated; never interprets the patient’s own result, never states whether a result is normal or concerning, and always routes interpretation to the care team.',
    whyItMatters:
      'Reduces the anxiety of waiting and the confusion of unexplained results, while keeping all interpretation with the clinicians.',
  },
  {
    id: 'procedure-preparation',
    name: 'Procedure Preparation',
    explains:
      'How to prepare for an upcoming procedure and what to expect on the day, based on approved preparation instructions.',
    audience:
      'Patients with an upcoming procedure who need to prepare correctly.',
    departments: 'Surgery, gastroenterology, procedural specialties, member systems.',
    exampleTitle: 'Getting ready for your procedure, step by step',
    personalizationInputs: [
      'Approved preparation instructions for the procedure',
      'Specific fears about the procedure',
      'Schedule and logistics (fasting, transportation, time off)',
      'Health literacy level and preferred language',
      'Caregiver or escort support for the day',
    ],
    visualFormat:
      'Step-by-step explainer with a preparation checklist and a calm what-to-expect timeline; no procedural imagery.',
    safetyNotes:
      'Conveys approved preparation steps and routes clinical questions to the care team; never advises on whether to proceed, modifies prep instructions, or describes risks beyond the approved content.',
    whyItMatters:
      'Improves correct preparation and reduces day-of cancellations, anxiety, and avoidable rescheduling.',
  },
  {
    id: 'maternal-health',
    name: 'Maternal Health',
    explains:
      'What to expect at a stage of pregnancy or postpartum care and how to prepare for upcoming visits, from approved content.',
    audience:
      'Pregnant and postpartum patients navigating a sequence of care moments.',
    departments: 'Maternal health, OB-GYN, member systems.',
    exampleTitle: 'What to expect at this stage of your care',
    personalizationInputs: [
      'Care stage (trimester, postpartum) and approved framing',
      'Patient goals and concerns for this stage',
      'Support situation at home',
      'Health literacy level and preferred language',
      'Schedule and visit logistics',
    ],
    visualFormat:
      'Warm, supportive explainer with a stage timeline and a gentle preparation checklist.',
    safetyNotes:
      'Provides stage-appropriate education from approved content; never assesses symptoms, gives individualized clinical guidance, or advises on urgency — it directs concerns to the care team and to approved emergency instructions.',
    whyItMatters:
      'Improves preparedness and reassurance across a sensitive journey, supporting engagement and equitable maternal care.',
  },
  {
    id: 'oncology-education',
    name: 'Oncology Education',
    explains:
      'What an approved education topic in cancer care means in plain language and what questions to bring to the care team.',
    audience:
      'Patients navigating a cancer care journey who need clear, calm explanation.',
    departments: 'Oncology, cancer centers, life-sciences partners.',
    exampleTitle: 'Understanding the next part of your care',
    personalizationInputs: [
      'The approved education topic and journey stage',
      'Emotional state and specific fears',
      'Caregiver involvement and support',
      'Health literacy level and preferred language',
      'Patient goals and what matters to them',
    ],
    visualFormat:
      'Especially calm, slow-paced explainer with one idea per scene and abstract, non-alarming visuals.',
    safetyNotes:
      'Sits close to the boundary and is held to the strictest review; explains approved educational topics only, never discusses prognosis, recommends treatment, interprets results, or implies outcomes.',
    whyItMatters:
      'Reduces fear and confusion during a frightening journey and helps patients engage with their care team from a place of understanding.',
  },
  {
    id: 'health-equity-and-language-access',
    name: 'Health Equity and Language Access',
    explains:
      'The same approved education, delivered accurately in the patient’s language and at the right literacy level.',
    audience:
      'Patients who are non-English-dominant, have lower health literacy, or face access barriers.',
    departments: 'Health equity, care navigation, member systems.',
    exampleTitle: 'Your health information, in your language',
    personalizationInputs: [
      'Preferred language and dialect considerations',
      'Health literacy level',
      'Specific access barriers (transportation, cost, trust)',
      'Channel the patient actually uses',
      'Cultural framing relevant to comprehension',
    ],
    visualFormat:
      'Caption-forward explainer with simplified language, high-contrast visuals, and accurate non-literal translation.',
    safetyNotes:
      'Translates and simplifies approved education faithfully; never alters clinical meaning in translation and routes clinical questions to the care team.',
    whyItMatters:
      'Narrows comprehension gaps for the patients generic materials serve worst, advancing equity in understanding and follow-through.',
  },
  {
    id: 'caregiver-education',
    name: 'Caregiver Education',
    explains:
      'What a caregiver needs to understand to support a patient’s care, shaped for the supporter rather than the patient.',
    audience:
      'Family members and caregivers supporting a patient’s day-to-day care.',
    departments: 'Caregiver support, primary care, care transitions.',
    exampleTitle: 'Supporting your loved one’s care at home',
    personalizationInputs: [
      'The caregiver’s relationship and role',
      'What the patient needs help with day to day',
      'Caregiver’s own questions and stress level',
      'Health literacy level and preferred language',
      'Consent for caregiver involvement',
    ],
    visualFormat:
      'Practical, reassuring explainer with a clear support checklist designed to be watched together.',
    safetyNotes:
      'Educates the caregiver from approved content under appropriate consent; never directs them to make clinical decisions and routes clinical questions to the care team.',
    whyItMatters:
      'Strengthens the support system around the patient, improving adherence, recovery, and the wellbeing of both patient and caregiver.',
  },
  {
    id: 'genomics-and-consent-education',
    name: 'Genomics and Consent Education',
    explains:
      'What a genomic test or data-use consent generally involves, in plain language, to support an informed choice.',
    audience:
      'Patients considering genomic testing or asked to consent to data use for research.',
    departments: 'Genomics education, research, life-sciences partners.',
    exampleTitle: 'Understanding genetic testing and your choices',
    personalizationInputs: [
      'The specific approved testing or consent topic',
      'Patient concerns about privacy and implications',
      'Health literacy level and preferred language',
      'Caregiver or family involvement in the decision',
      'Emotional state (curious, guarded, anxious)',
    ],
    visualFormat:
      'Clear explainer with a consent panel and a privacy “what this means” card; deliberately neutral.',
    safetyNotes:
      'Sits close to the boundary and is held to strict review; explains testing and consent in general terms only, never interprets genetic results, predicts risk, or recommends whether to test.',
    whyItMatters:
      'Supports genuinely informed consent and understanding on a topic where comprehension and trust are decisive.',
  },
  {
    id: 'public-health-campaigns',
    name: 'Public Health Campaigns',
    explains:
      'A public-health message — such as a seasonal prevention or vaccination campaign — delivered in a personalized, approachable form.',
    audience:
      'Populations targeted by an approved public-health or prevention campaign.',
    departments: 'Population health, care navigation, public health partners.',
    exampleTitle: 'A quick, clear update on staying well this season',
    personalizationInputs: [
      'The approved campaign content and goal',
      'Population segment and relevant barriers',
      'Preferred language and health literacy level',
      'Channel the audience actually uses',
      'Emotional framing that fits the audience',
    ],
    visualFormat:
      'Short, friendly campaign explainer optimized for the delivery channel, with large captions and a single call to a care-related action.',
    safetyNotes:
      'Delivers approved public-health messaging only; never gives individualized clinical advice and routes specific questions to a care team or appropriate public-health resource.',
    whyItMatters:
      'Improves reach and comprehension of prevention messaging, supporting uptake of approved public-health actions equitably.',
  },
];
