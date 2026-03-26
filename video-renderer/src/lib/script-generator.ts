/**
 * script-generator.ts
 *
 * Generates structured patient education video scripts using the Claude API.
 * Each script is personalized to the patient, diagnosis, treatment, and clinic,
 * producing warm, empathetic narration suitable for TTS and video rendering.
 *
 * Now also supports template-based generation via treatment-scripts.ts and
 * knowledge-base.ts, selectable through the contentMode field.
 */

import {
  composeScript,
  hasTemplate,
  type ComposedScript,
  type ScriptSection,
  type PersonalizationInput,
} from "./treatment-scripts";

import { getTreatment } from "./knowledge-base";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScriptGenerationInput {
  patientName: string;
  doctorName: string;
  clinicName: string;
  category: "dental" | "orthodontic" | "financial";
  diagnosis: string;
  treatment: string;
  treatmentNotes?: string;
  urgencyLevel?: "routine" | "moderate" | "urgent";

  // Extended fields for template + knowledge-base integration
  specialty?: "dental" | "orthodontic";
  appointmentContext?: string;
  patientStatus?: string;
  videoGoal?: string;
  contentMode?: "template" | "template_ai" | "full_ai";
  concerns?: string;
  financing?: string;
  parentMode?: boolean;
}

export interface SceneBlock {
  narration: string;
  durationSeconds: number;
  heading: string;
  bullets?: string[];
}

export interface GeneratedScript {
  videoType: "dental" | "orthodontic" | "financial";
  title: string;
  scenes: {
    intro: { narration: string; durationSeconds: number; heading: string };
    problem: {
      narration: string;
      durationSeconds: number;
      heading: string;
      bullets: string[];
    };
    treatment: {
      narration: string;
      durationSeconds: number;
      heading: string;
      bullets: string[];
    };
    outcome: {
      narration: string;
      durationSeconds: number;
      heading: string;
      bullets: string[];
    };
    cta: { narration: string; durationSeconds: number; heading: string };
  };
  totalDurationSeconds: number;
  disclaimer: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
const ANTHROPIC_VERSION = "2023-06-01";
const WORDS_PER_MINUTE = 150;

// ---------------------------------------------------------------------------
// Prompt templates
// ---------------------------------------------------------------------------

function buildKnowledgeContext(treatment: string): string {
  const knowledge = getTreatment(treatment);
  if (!knowledge) return "";

  return `
TREATMENT KNOWLEDGE BASE — verified clinical information for "${knowledge.displayName}":
Description: ${knowledge.description}
Indications: ${knowledge.indications.join("; ")}
Benefits: ${knowledge.benefits.join("; ")}
Risks: ${knowledge.risks.join("; ")}
Procedure steps: ${knowledge.procedureSteps.join(" → ")}
Recovery: ${knowledge.recovery}
Alternatives: ${knowledge.alternatives.join("; ")}
Common concerns: ${knowledge.commonConcerns.map((c) => `Q: ${c.concern} A: ${c.response}`).join(" | ")}
If untreated: ${knowledge.untreatedConsequences.join("; ")}
Timeline: ${knowledge.timelineEstimate}
Cost context: ${knowledge.costContext}

Use this verified information as your primary source. You may expand upon it with your own knowledge, but do NOT contradict any of the above.
`;
}

function buildSystemPrompt(category: ScriptGenerationInput["category"], treatment?: string): string {
  const knowledgeContext = treatment ? buildKnowledgeContext(treatment) : "";

  const shared = `You are a world-class patient communication specialist and dental educator who writes video scripts for dental and orthodontic practices. Your scripts are narrated by a warm, professional voice over motion-graphics videos that patients watch on their phone or computer after a clinic visit.

You have DEEP KNOWLEDGE of every dental and orthodontic procedure. You know the clinical steps, the materials used, why each step matters, what the patient will experience, recovery timelines, and long-term outcomes. You do NOT rely on doctor notes to explain procedures — doctor notes are brief clinical shorthand (e.g. "MOD composite #14" or "IPR + attach upper") meant for other clinicians. YOUR job is to translate that shorthand into rich, educational, patient-friendly content using your own comprehensive procedure knowledge.

CRITICAL CONTENT PHILOSOPHY:
- Patients need to UNDERSTAND what happened during their visit and what will happen next.
- Explain the WHY behind the treatment — not just what it is, but why the doctor chose it.
- Be specific about the procedure: what materials are used, what each step accomplishes, how modern the techniques are.
- Include what happens if the condition is left untreated — frame as education, NOT fear tactics. ("Without treatment, this can gradually progress to..." rather than "If you don't act now, you'll lose your tooth.")
- Make patients feel smart and informed, not talked down to.
- The goal is to convince patients to follow through with treatment by making them feel confident, educated, and cared for.

INTERPRETING DOCTOR NOTES:
When treatment notes are provided, they will be brief clinical notation. Examples:
- "MOD composite #14" → Doctor placed a composite filling on tooth #14 covering the mesial, occlusal, and distal surfaces
- "SRP UR quad" → Scaling and root planing was performed on the upper right quadrant
- "IPR .3mm 12-22, attach 13,23" → Interproximal reduction of 0.3mm between teeth 12-22, attachments placed on teeth 13 and 23
- "RCT #19, BU, PFM crown" → Root canal therapy on tooth #19, build-up placed, porcelain-fused-to-metal crown recommended
You must expand these into clear, educational patient language. If notes reference specific teeth, translate to patient-friendly location descriptions ("your upper left molar" instead of "tooth #14").

ABSOLUTE RULES:
- Write in second person ("you") directly to the patient.
- Use the patient's FIRST NAME naturally — once in the greeting, once or twice more throughout.
- Reference the doctor by name and the clinic by name to build trust.
- NO medical jargon without explanation. If you use a clinical term, immediately follow it with a plain-English explanation.
- NO scare tactics. Frame untreated outcomes as education, not fear.
- Narration pacing: ~150 words per minute. Each scene has a word target — stay within it.
- Be specific to the exact diagnosis and treatment provided. Never be generic.
- Sound like a kind, knowledgeable friend — not a textbook, not a salesperson.
- Include specific, concrete details about the procedure that make the patient feel the doctor is thorough and modern.

OUTPUT FORMAT — return ONLY valid JSON matching this exact structure (no markdown, no explanation outside the JSON):
{
  "videoType": "<dental|orthodontic|financial>",
  "title": "<short patient-friendly title, 6-10 words>",
  "scenes": {
    "intro": { "narration": "<20-25 words>", "durationSeconds": <6-8>, "heading": "<3-5 word heading>" },
    "problem": { "narration": "<40-55 words>", "durationSeconds": <15-22>, "heading": "<3-5 word heading>", "bullets": ["<bullet 1>", "<bullet 2>", "<bullet 3>"] },
    "treatment": { "narration": "<55-70 words>", "durationSeconds": <20-28>, "heading": "<3-5 word heading>", "bullets": ["<bullet 1>", "<bullet 2>", "<bullet 3>", "<bullet 4>"] },
    "outcome": { "narration": "<30-45 words>", "durationSeconds": <12-18>, "heading": "<3-5 word heading>", "bullets": ["<bullet 1>", "<bullet 2>", "<bullet 3>"] },
    "cta": { "narration": "<20-30 words>", "durationSeconds": <6-10>, "heading": "<3-5 word heading>" }
  },
  "totalDurationSeconds": <sum of all scene durations>,
  "disclaimer": "<standard medical disclaimer, 1 sentence>"
}`;

  const categoryGuidance: Record<typeof category, string> = {
    dental: `
CATEGORY-SPECIFIC GUIDANCE — DENTAL:
You are writing about a restorative or preventive dental procedure.

Tone: Caring, reassuring, grounded. The patient may be anxious or unsure. Your job is to normalize the situation and build confidence in the treatment plan.

PROCEDURE KNOWLEDGE — use this to write rich, specific content:
- CAVITY/FILLING: Decay starts when bacteria produce acid that softens enamel. A composite filling involves removing only the decayed portion, cleaning the area, applying a bonding agent, layering tooth-colored composite resin, and curing with UV light. Modern composites are strong, BPA-free, and match natural tooth color. Without treatment, decay can reach the nerve, requiring a root canal.
- CROWN: A crown is a custom-made cap that covers and protects a weakened tooth. The doctor reshapes the tooth, takes a digital impression, and places a temporary crown. The permanent crown (porcelain, zirconia, or porcelain-fused-to-metal) is cemented at the next visit. Crowns restore full strength and last 10-15+ years with care. Without treatment, the weakened tooth can fracture.
- ROOT CANAL: The nerve (pulp) inside the tooth has become infected or inflamed. The doctor removes the infected tissue, cleans and disinfects the canals, fills them with biocompatible material (gutta percha), and seals the tooth. A crown is usually placed after to protect it. Modern root canals use rotary instruments and are typically no more uncomfortable than a filling. Without treatment, infection can spread to the jawbone.
- IMPLANT: A titanium post is surgically placed in the jawbone to serve as an artificial root. Over 3-6 months, the bone fuses around it (osseointegration). Then an abutment and custom crown are attached. Implants preserve jawbone density, don't affect adjacent teeth, and can last a lifetime. Without replacement, adjacent teeth can shift and bone can deteriorate.
- EXTRACTION: Sometimes a tooth is too damaged to save. Modern extractions use precise instruments, and the area is thoroughly numbed. After removal, options include implants, bridges, or partial dentures to restore function. Leaving a gap can cause adjacent teeth to drift and bite problems.
- VENEERS: Ultra-thin porcelain or composite shells bonded to the front of teeth. Minimal tooth reduction (0.3-0.5mm) is needed. Custom-made in a lab to match desired shade and shape. Veneers resist staining and last 10-20 years. They transform the appearance of chipped, stained, or uneven teeth.
- GUM DISEASE: Bacteria below the gumline cause inflammation (gingivitis) that can progress to periodontitis, where the bone supporting teeth breaks down. Scaling and root planing (deep cleaning) removes tartar and bacteria from below the gumline and smooths root surfaces so gums can reattach. Without treatment, teeth can loosen over time.
- BRIDGE: A fixed prosthetic that fills a gap by anchoring to adjacent teeth. The neighboring teeth are prepared (like crowns), and a custom bridge (typically 3 units) is cemented. Bridges restore chewing, speech, and prevent teeth from shifting into the gap.

Scene-by-scene approach:
- INTRO: Warm, personal greeting. Make the patient feel seen. "Hi [Patient], this is a message from Dr. [Doctor] at [Clinic]." Acknowledge their recent visit briefly.
- PROBLEM: Gently explain what was found using your deep procedure knowledge. Use analogies a 10-year-old would understand (e.g., "Think of a cavity like a small soft spot in the tooth — kind of like when a piece of fruit starts to bruise"). Explain WHY this condition develops and why it matters to address. Include what can happen if left untreated (educational, not scary). Bullets should be: what it is, why it developed, why acting now is smart.
- TREATMENT: Walk through the procedure step by step using your procedure knowledge. Be SPECIFIC — mention the actual materials and techniques (e.g., "tooth-colored composite resin" not just "a filling"). Emphasize comfort: modern techniques, anesthesia, how quick it is. Address the #1 fear (pain) head-on with reassurance. Mention specific modern advances that make it better than patients expect. Bullets should be the steps or key features of the treatment.
- OUTCOME: Paint the vivid after picture with specific benefits. Mention longevity (how many years the treatment lasts). Include both functional and quality-of-life benefits. Bullets: restored function, longevity/durability, prevention of future issues.
- CTA: Warm, no-pressure close. "We're here whenever you're ready." Mention they can call or book online. Gently reinforce that early action leads to simpler treatment.

Use phrases like: "the good news is," "this is very treatable," "you're in great hands," "we caught this at a good time," "with today's technology."
Avoid: "you need to," "if you don't," "serious," "damage" (use "wear" instead), "procedure" (use "treatment" or "appointment").`,

    orthodontic: `
CATEGORY-SPECIFIC GUIDANCE — ORTHODONTIC:
You are writing about an orthodontic alignment or bite correction treatment.

Tone: Exciting, aspirational, investment-oriented. This is about transformation. The patient is making a choice to invest in themselves, and you want them to feel great about it.

PROCEDURE KNOWLEDGE — use this to write rich, specific content:
- BRACES (METAL): Stainless steel brackets bonded to each tooth with archwires that apply continuous gentle pressure. Modern brackets are smaller and more comfortable than ever. Wires are heat-activated (nickel-titanium) and apply consistent force. Adjustments every 4-8 weeks. Treatment typically 12-24 months. Can correct virtually any alignment or bite issue. Elastics (rubber bands) may be used to correct bite relationship. Without treatment, crowding/bite issues can worsen, increase wear on teeth, and make cleaning difficult.
- INVISALIGN/CLEAR ALIGNERS: A series of custom-made clear, removable trays that gradually shift teeth. Made from SmartTrack material using 3D digital planning (ClinCheck). Change trays every 1-2 weeks. Attachments (tooth-colored bumps) may be bonded to teeth for better control. IPR (interproximal reduction) may be done to create space. Removable for eating and cleaning. Treatment typically 6-18 months. Virtually invisible when worn. Without treatment, misalignment can lead to uneven wear, difficulty cleaning, and TMJ issues.
- CROWDING: Teeth don't have enough space, causing overlap. This makes certain areas nearly impossible to clean properly, increasing cavity and gum disease risk. Can worsen with age as the jaw continues to shift. Orthodontic treatment creates proper spacing.
- SPACING: Gaps between teeth can be cosmetic concerns and also affect bite efficiency. Gaps can trap food and affect speech. Teeth may drift further apart over time. Treatment closes gaps and creates even, stable contact between teeth.
- OVERBITE: Upper front teeth overlap lower front teeth excessively. Can cause lower teeth to bite into the roof of the mouth, wear on upper teeth, and jaw pain. Deep bites can worsen over time and lead to TMJ dysfunction.
- UNDERBITE: Lower teeth sit in front of upper teeth. Affects chewing efficiency, speech clarity, and facial profile. Can cause accelerated wear on front teeth. Early treatment often produces the best results.

Scene-by-scene approach:
- INTRO: Energetic but warm greeting. "Hi [Patient]! Dr. [Doctor] and the team at [Clinic] put this together just for you." Create a sense of personal attention.
- PROBLEM: Explain what's going on with their bite or alignment using your deep procedure knowledge. Use mirror-test language: "You might have noticed..." Be specific about the functional impacts (not just cosmetic). Explain what happens over time without treatment (educational, not scary). Bullets: what's happening, functional/health effects, why now is a great time.
- TREATMENT: Describe the orthodontic solution with enthusiasm and SPECIFICS. Mention the actual technology (e.g., "heat-activated nickel-titanium wires" for braces, "custom 3D-planned SmartTrack trays" for Invisalign). Focus on modern comfort, discretion, and timeline. Mention what the patient will experience at each phase. Bullets: how it works (specific tech), comfort/convenience, timeline, what to expect at appointments.
- OUTCOME: The big payoff — be vivid and specific. Go beyond "straight teeth" to functional benefits: easier cleaning, reduced wear, better bite force distribution, jaw comfort. "Imagine smiling in photos without thinking twice." Bullets: aesthetic benefit, health/functional benefit, confidence/quality-of-life benefit.
- CTA: Excited close. "We can't wait to get started on your new smile." Clear next step.

Use phrases like: "imagine," "your new smile," "the journey to," "you're going to love," "modern and comfortable," "with today's technology."
Avoid: "fix" (use "align" or "improve"), "problem" (use "opportunity"), "long process" (use "journey" or "transformation").`,

    financial: `
CATEGORY-SPECIFIC GUIDANCE — FINANCIAL:
You are writing about making dental/orthodontic treatment financially accessible.

Tone: Transparent, supportive, empowering. Money is stressful — your job is to remove that stress. Be honest, clear, and show the practice genuinely wants to help.

COST-CONTEXT KNOWLEDGE — use this to write informed content:
- Patients often decline treatment because of cost uncertainty, not because they can't afford it. Clarity removes the barrier.
- Delaying treatment almost always costs more long-term: a filling today prevents a crown tomorrow; a crown prevents an extraction and implant. Use this "cost of waiting" angle educationally.
- Most dental insurance covers preventive care at 100%, basic procedures at 80%, and major procedures at 50%. Annual maximums are typically $1,000-$2,000.
- Common financing: CareCredit, LendingClub, Proceed Finance — many offer 0% APR for 6-24 months.
- In-office payment plans (splitting into 2-4 payments) are often the simplest option.
- FSA/HSA funds can be used for dental treatment — many patients don't realize this.

Scene-by-scene approach:
- INTRO: Warm, understanding greeting. Acknowledge that cost is a real consideration. "Hi [Patient], Dr. [Doctor] at [Clinic] wanted to make sure you have all the information about making your treatment work for your budget."
- PROBLEM: Briefly reference the recommended treatment and why it matters (use your procedure knowledge to explain the clinical need). Then pivot: "We know cost can feel like a barrier, and we don't want that." Importantly, mention the cost of waiting — how delaying can lead to more extensive (and expensive) treatment. Bullets: treatment overview, cost of waiting, commitment to accessibility.
- TREATMENT (reframed as "Your Options"): Lay out financial options clearly. Insurance coverage, payment plans, financing, FSA/HSA options. Be specific. Bullets: insurance benefits, in-office payment plans, third-party financing, FSA/HSA.
- OUTCOME: Frame the financial outcome — peace of mind plus health. "You get the care you need without the financial stress." Bullets: affordable path, health protected, no surprises.
- CTA: Supportive close. "Our team is happy to walk through the numbers with you — no pressure, just clarity."

Use phrases like: "work for your budget," "we've got options," "no surprises," "investment in your health," "we'll figure this out together."
Avoid: "expensive," "cost" (use "investment"), "cheap" (use "affordable"), "debt" (use "manageable payments").`,
  };

  return shared + "\n\n" + categoryGuidance[category] + (knowledgeContext ? "\n\n" + knowledgeContext : "");
}

function buildUserMessage(input: ScriptGenerationInput): string {
  const firstName = input.patientName.split(" ")[0];
  const urgencyContext = input.urgencyLevel
    ? `\nUrgency: ${input.urgencyLevel}${
        input.urgencyLevel === "urgent"
          ? " — gently convey that timely action is in the patient's best interest, but never use fear"
          : input.urgencyLevel === "moderate"
          ? " — mention that acting sooner rather than later is beneficial"
          : " — this is routine, keep it relaxed"
      }`
    : "";

  const notesContext = input.treatmentNotes
    ? `\nDoctor's clinical notes: "${input.treatmentNotes}"
IMPORTANT: These notes are brief clinical shorthand written for other clinicians. Interpret them using your procedure knowledge and translate into patient-friendly language. Use the notes to personalize the video (e.g., specific tooth locations, specific techniques used) but do NOT rely on them for explaining the procedure — use your built-in knowledge for that.`
    : "";

  const statusContext = input.patientStatus
    ? `\nPatient status: ${input.patientStatus} — adapt the intro tone and CTA accordingly.`
    : "";

  const goalContext = input.videoGoal
    ? `\nVideo goal: ${input.videoGoal} — emphasize content that serves this goal.`
    : "";

  const concernsContext = input.concerns
    ? `\nPatient concerns: ${input.concerns} — address these directly in the reassurance or treatment section.`
    : "";

  return `Generate a personalized video script for this patient:

Patient first name: ${firstName}
Doctor: Dr. ${input.doctorName}
Clinic: ${input.clinicName}
Category: ${input.category}
Diagnosis: ${input.diagnosis}
Recommended treatment: ${input.treatment}${urgencyContext}${notesContext}${statusContext}${goalContext}${concernsContext}

Remember:
- Use "${firstName}" naturally in the narration (2-3 times total, not every sentence).
- Reference "Dr. ${input.doctorName}" and "${input.clinicName}" to build trust.
- Be specific to "${input.diagnosis}" and "${input.treatment}" — use your deep procedure knowledge to explain what was done and why.
- Explain what happens if the condition is left untreated (educationally, not with fear).
- Mention specific modern techniques and materials to build confidence.
- Stay within the word limits for each scene.
- Return ONLY the JSON object.`;
}

// ---------------------------------------------------------------------------
// JSON parsing helpers
// ---------------------------------------------------------------------------

/**
 * Extracts JSON from a Claude response that may be wrapped in markdown
 * code fences or contain leading/trailing text.
 */
function extractJSON(raw: string): string {
  // Try to extract from markdown code block first
  const codeBlockMatch = raw.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }

  // Try to find a JSON object directly
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return jsonMatch[0];
  }

  return raw.trim();
}

// ---------------------------------------------------------------------------
// Validation & enforcement
// ---------------------------------------------------------------------------

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function trimToWordLimit(text: string, maxWords: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text;

  // Cut to limit, try to end at a sentence boundary
  const trimmed = words.slice(0, maxWords);
  let result = trimmed.join(" ");

  // If we cut mid-sentence, try to end cleanly
  const lastPeriod = result.lastIndexOf(".");
  const lastQuestion = result.lastIndexOf("?");
  const lastExclamation = result.lastIndexOf("!");
  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);

  if (lastSentenceEnd > result.length * 0.6) {
    result = result.substring(0, lastSentenceEnd + 1);
  }

  return result;
}

function estimateDuration(text: string): number {
  const words = wordCount(text);
  return Math.round((words / WORDS_PER_MINUTE) * 60 * 10) / 10;
}

function validateAndEnforceScript(raw: GeneratedScript): GeneratedScript {
  const script = { ...raw };

  // Word limits per scene
  const limits: Record<string, { min: number; max: number }> = {
    intro: { min: 15, max: 30 },
    problem: { min: 35, max: 60 },
    treatment: { min: 50, max: 75 },
    outcome: { min: 25, max: 50 },
    cta: { min: 15, max: 35 },
  };

  const sceneKeys = ["intro", "problem", "treatment", "outcome", "cta"] as const;
  let totalDuration = 0;

  for (const key of sceneKeys) {
    const scene = script.scenes[key] as SceneBlock;
    const limit = limits[key];

    // Trim narration if over limit
    if (wordCount(scene.narration) > limit.max) {
      scene.narration = trimToWordLimit(scene.narration, limit.max);
    }

    // Re-estimate duration based on actual word count
    const estimated = estimateDuration(scene.narration);
    scene.durationSeconds = Math.ceil(estimated);

    totalDuration += scene.durationSeconds;
  }

  // Enforce global cap: standard videos should be under 80 seconds
  const MAX_STANDARD_SECONDS = 80;
  if (totalDuration > MAX_STANDARD_SECONDS) {
    const scaleFactor = MAX_STANDARD_SECONDS / totalDuration;
    let adjustedTotal = 0;
    for (const key of sceneKeys) {
      const scene = script.scenes[key] as SceneBlock;
      scene.durationSeconds = Math.max(3, Math.round(scene.durationSeconds * scaleFactor));
      adjustedTotal += scene.durationSeconds;
    }
    totalDuration = adjustedTotal;
  }

  script.totalDurationSeconds = totalDuration;

  // Ensure disclaimer exists
  if (!script.disclaimer) {
    script.disclaimer =
      "This video is for educational purposes only and does not replace professional dental advice. Please consult your dentist for personalized recommendations.";
  }

  return script;
}

// ---------------------------------------------------------------------------
// Main API function
// ---------------------------------------------------------------------------

/**
 * Generates a personalized patient education video script using Claude.
 *
 * @param input - Patient information, diagnosis, and treatment details.
 * @param apiKey - Anthropic API key. Falls back to `CLAUDE_API_KEY` env var.
 * @returns A structured script ready for TTS and video rendering.
 *
 * @example
 * ```ts
 * const script = await generateScript({
 *   patientName: "Sarah Johnson",
 *   doctorName: "Martinez",
 *   clinicName: "Bright Smile Dental",
 *   category: "dental",
 *   diagnosis: "cavity",
 *   treatment: "filling",
 * }, process.env.CLAUDE_API_KEY!);
 * ```
 */
export async function generateScript(
  input: ScriptGenerationInput,
  apiKey?: string
): Promise<GeneratedScript> {
  const key = apiKey || process.env.CLAUDE_API_KEY;
  if (!key) {
    throw new Error(
      "Anthropic API key is required. Pass it as a parameter or set CLAUDE_API_KEY environment variable."
    );
  }

  const systemPrompt = buildSystemPrompt(input.category, input.treatment);
  const userMessage = buildUserMessage(input);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  let response: Response;
  try {
    response = await fetch(ANTHROPIC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        temperature: 0.3,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "unknown error");
    throw new Error(
      `Claude API request failed (${response.status}): ${errorBody}`
    );
  }

  const data = (await response.json()) as {
    content: Array<{ type: string; text?: string }>;
  };

  const textBlock = data.content.find((block) => block.type === "text");
  if (!textBlock?.text) {
    throw new Error("Claude API returned no text content.");
  }

  const jsonString = extractJSON(textBlock.text);

  let parsed: GeneratedScript;
  try {
    parsed = JSON.parse(jsonString) as GeneratedScript;
  } catch (err) {
    throw new Error(
      `Failed to parse Claude response as JSON: ${
        err instanceof Error ? err.message : String(err)
      }\n\nRaw response:\n${textBlock.text.substring(0, 500)}`
    );
  }

  // Validate required structure
  const requiredScenes = ["intro", "problem", "treatment", "outcome", "cta"];
  for (const scene of requiredScenes) {
    if (!parsed.scenes?.[scene as keyof typeof parsed.scenes]) {
      throw new Error(
        `Generated script is missing required scene: "${scene}". ` +
          `Received scenes: ${Object.keys(parsed.scenes || {}).join(", ")}`
      );
    }
  }

  return validateAndEnforceScript(parsed);
}

// ---------------------------------------------------------------------------
// Demo script (no API call)
// ---------------------------------------------------------------------------

/**
 * Returns a high-quality hardcoded demo script for testing and previews.
 * The output is indistinguishable from AI-generated content and adapts
 * to the provided patient/clinic names and category.
 *
 * @param input - Patient and treatment details to personalize the demo.
 * @returns A fully structured script ready for rendering.
 */
export function generateDemoScript(input: ScriptGenerationInput): GeneratedScript {
  const firstName = input.patientName.split(" ")[0];
  const doctor = input.doctorName;
  const clinic = input.clinicName;

  const demoScripts: Record<
    ScriptGenerationInput["category"],
    () => GeneratedScript
  > = {
    dental: () => ({
      videoType: "dental",
      title: `Your Treatment Plan at ${clinic}`,
      scenes: {
        intro: {
          narration: `Hi ${firstName}, this is a quick message from Dr. ${doctor} and the team at ${clinic}. Thanks for coming in to see us today.`,
          durationSeconds: 7,
          heading: "A Message For You",
        },
        problem: {
          narration: `During your visit, we took a close look at everything and found a ${input.diagnosis} that we'd like to take care of for you. Think of it like a small weak spot in the tooth — kind of like when the surface starts to soften and break down over time. The good news is we caught this at a really good stage, ${firstName}, and it's completely treatable.`,
          durationSeconds: 18,
          heading: "What We Found",
          bullets: [
            `A ${input.diagnosis} was identified during your exam`,
            "Caught early — before it could progress further",
            "Very common and straightforward to treat",
          ],
        },
        treatment: {
          narration: `Here's what your ${input.treatment} appointment will look like. First, we'll make sure you're completely comfortable — we use a gentle numbing technique so you won't feel a thing. Then Dr. ${doctor} will carefully remove only the affected area and restore your tooth with a durable, natural-looking ${input.treatment}. The whole visit typically takes under an hour, and most patients tell us it was much easier than they expected.`,
          durationSeconds: 24,
          heading: `Your ${capitalize(input.treatment)} Treatment`,
          bullets: [
            "Gentle numbing so you stay comfortable throughout",
            "Only the affected area is treated — preserving your natural tooth",
            `Restored with a strong, natural-looking ${input.treatment}`,
            "Usually completed in a single visit under one hour",
          ],
        },
        outcome: {
          narration: `Once we're done, ${firstName}, your tooth will be strong, healthy, and back to normal. You'll be able to eat, drink, and smile with full confidence. And by taking care of this now, you're protecting yourself from bigger issues down the road.`,
          durationSeconds: 14,
          heading: "What to Expect After",
          bullets: [
            "Full strength and function restored to your tooth",
            "Eat and drink comfortably right away",
            "Prevents more extensive treatment later on",
          ],
        },
        cta: {
          narration: `We're here for you whenever you're ready. Just give us a call or book your next visit online — the team at ${clinic} will take great care of you.`,
          durationSeconds: 8,
          heading: "Let's Get Started",
        },
      },
      totalDurationSeconds: 71,
      disclaimer:
        "This video is for educational purposes only and does not replace professional dental advice. Please consult your dentist for personalized recommendations.",
    }),

    orthodontic: () => ({
      videoType: "orthodontic",
      title: `Your Smile Journey with ${clinic}`,
      scenes: {
        intro: {
          narration: `Hi ${firstName}! Dr. ${doctor} and the team at ${clinic} put this together just for you — we're really excited to share your smile plan.`,
          durationSeconds: 7,
          heading: "Your Smile Plan",
        },
        problem: {
          narration: `During your consultation, we noticed some ${input.diagnosis} that's affecting how your teeth come together. You might have noticed it yourself — maybe when you smile in photos, or if certain spots are harder to keep clean. The great news is this is exactly the kind of thing that responds beautifully to treatment, and ${firstName}, you're at a perfect time to start.`,
          durationSeconds: 20,
          heading: "Where You Are Now",
          bullets: [
            `${capitalize(input.diagnosis)} is affecting your bite alignment`,
            "Can make certain areas harder to brush and floss",
            "Responds very well to modern orthodontic treatment",
          ],
        },
        treatment: {
          narration: `Here's the exciting part — your ${input.treatment} plan. We'll use ${input.treatment} to gradually and gently guide your teeth into their ideal positions. The process is designed to fit into your life: comfortable to wear, easy to maintain, and with today's technology, more efficient than ever. Dr. ${doctor} will monitor your progress at each check-in, and you'll start seeing changes sooner than you think.`,
          durationSeconds: 25,
          heading: `Your ${capitalize(input.treatment)} Journey`,
          bullets: [
            `${capitalize(input.treatment)} gently shift teeth into ideal alignment`,
            "Designed for comfort and everyday convenience",
            "Modern technology means faster, more predictable results",
            "Regular check-ins with Dr. " + doctor + " to track progress",
          ],
        },
        outcome: {
          narration: `Imagine your smile twelve months from now, ${firstName} — straight, balanced, and completely you. Beyond the confidence boost, aligned teeth are easier to clean and better for your long-term oral health. It's one of the best investments you can make in yourself.`,
          durationSeconds: 15,
          heading: "Your New Smile",
          bullets: [
            "A confident, beautiful smile you'll love showing off",
            "Easier to clean — better long-term dental health",
            "An investment that pays off for a lifetime",
          ],
        },
        cta: {
          narration: `We can't wait to get started. Reach out to us at ${clinic} to schedule your first appointment — your new smile is closer than you think.`,
          durationSeconds: 8,
          heading: "Let's Begin",
        },
      },
      totalDurationSeconds: 75,
      disclaimer:
        "This video is for educational purposes only and does not replace professional orthodontic advice. Treatment outcomes vary by individual.",
    }),

    financial: () => ({
      videoType: "financial",
      title: `Making Your Care Affordable at ${clinic}`,
      scenes: {
        intro: {
          narration: `Hi ${firstName}, Dr. ${doctor} at ${clinic} wanted to make sure you have all the details about making your treatment work for your budget.`,
          durationSeconds: 7,
          heading: "Your Care, Your Budget",
        },
        problem: {
          narration: `We've recommended a ${input.treatment} to take care of your ${input.diagnosis}, and we know that thinking about cost can add stress on top of everything else. We want you to know — that's completely normal, and we're here to help you figure it out. At ${clinic}, we believe cost should never stand between you and the care you deserve.`,
          durationSeconds: 19,
          heading: "We Understand",
          bullets: [
            `Recommended treatment: ${input.treatment} for ${input.diagnosis}`,
            "Addressing this now prevents costlier treatment later",
            "We're committed to making care accessible for every patient",
          ],
        },
        treatment: {
          narration: `Here's what you should know about your options, ${firstName}. If you have dental insurance, our team will handle the paperwork and maximize your benefits. For any remaining balance, we offer flexible monthly payment plans that let you spread the investment over time — many patients pay as little as a manageable monthly amount. We also work with third-party financing if you'd prefer longer terms. No hidden fees, no surprises.`,
          durationSeconds: 26,
          heading: "Your Financial Options",
          bullets: [
            "We'll maximize your insurance benefits and file claims for you",
            "Flexible in-office payment plans with no interest",
            "Third-party financing for extended terms",
            "Transparent pricing — no hidden fees, no surprises",
          ],
        },
        outcome: {
          narration: `The bottom line: you get the care your smile needs on a timeline that works for your wallet. That means better health, less worry, and one less thing keeping you up at night, ${firstName}.`,
          durationSeconds: 13,
          heading: "Peace of Mind",
          bullets: [
            "A clear, affordable path to the care you need",
            "Your oral health protected — without financial stress",
            "Full transparency every step of the way",
          ],
        },
        cta: {
          narration: `Our team is happy to walk through the numbers with you — no pressure, just clarity. Give us a call or stop by ${clinic} anytime.`,
          durationSeconds: 8,
          heading: "Let's Talk",
        },
      },
      totalDurationSeconds: 73,
      disclaimer:
        "Financial options are subject to approval and may vary. Please contact our office for current pricing and available plans.",
    }),
  };

  return demoScripts[input.category]();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");
}

// ===========================================================================
// Premium script generation (8-scene in-depth orthodontic videos)
// ===========================================================================

// ---------------------------------------------------------------------------
// Premium types
// ---------------------------------------------------------------------------

export interface PremiumSceneBlock {
  narration: string;
  durationSeconds: number;
  heading: string;
  bullets?: string[];
}

export interface PremiumGeneratedScript {
  videoType: "dental" | "orthodontic" | "financial";
  title: string;
  scenes: {
    intro: { narration: string; durationSeconds: number; heading: string };
    problem: {
      narration: string;
      durationSeconds: number;
      heading: string;
      bullets: string[];
    };
    deepDive: {
      narration: string;
      durationSeconds: number;
      heading: string;
      bullets: string[];
    };
    treatment: {
      narration: string;
      durationSeconds: number;
      heading: string;
      bullets: string[];
    };
    journey: {
      narration: string;
      durationSeconds: number;
      heading: string;
      bullets: string[];
    };
    outcome: {
      narration: string;
      durationSeconds: number;
      heading: string;
      bullets: string[];
    };
    whatToExpect: {
      narration: string;
      durationSeconds: number;
      heading: string;
      bullets: string[];
    };
    cta: { narration: string; durationSeconds: number; heading: string };
  };
  totalDurationSeconds: number;
  disclaimer: string;
}

// ---------------------------------------------------------------------------
// Premium constants
// ---------------------------------------------------------------------------

const PREMIUM_WORDS_PER_MINUTE = 155;

// ---------------------------------------------------------------------------
// Premium prompt
// ---------------------------------------------------------------------------

function buildPremiumSystemPrompt(treatment?: string): string {
  const knowledgeContext = treatment ? buildKnowledgeContext(treatment) : "";

  return `You are a world-class orthodontic patient communication specialist who writes premium, in-depth video scripts for orthodontic practices. Your scripts are narrated by a deep, authoritative male voice over cinematic motion-graphics videos that patients watch after a consultation.

You have EXPERT-LEVEL orthodontic knowledge. You understand:
- Dental anatomy: roots, periodontal ligament, alveolar bone, enamel, dentin
- Biomechanics of tooth movement: how controlled force causes bone remodeling (osteoclast resorption on the pressure side, osteoblast deposition on the tension side)
- Root pressure, torque, tipping, bodily movement, rotation, intrusion, extrusion
- The biology of bone remodeling and why orthodontic treatment works
- Specific mechanics of braces (brackets, archwires, elastics, springs) and clear aligners (thermoplastic trays, attachments, staging, IPR)
- Treatment planning: why certain approaches are chosen for certain malocclusions
- Month-by-month treatment progression for common orthodontic cases
- Retention phase: why retainers are critical, types of retainers, how long to wear them
- Long-term outcomes: stability, relapse prevention, maintenance

CONTENT PHILOSOPHY FOR PREMIUM VIDEOS:
- These are IN-DEPTH educational videos — patients want to truly UNDERSTAND their treatment
- Go deeper than surface-level explanations. Explain the biology, the mechanics, the reasoning
- Make complex concepts accessible with clear analogies
- Patients who understand their treatment are more likely to commit and comply
- This is a premium experience — the content should feel like a private consultation with the world's best orthodontist

ABSOLUTE RULES:
- Write in second person ("you") directly to the patient
- Use the patient's FIRST NAME 3-4 times throughout (naturally, not forced)
- Reference the doctor by name and clinic by name
- NO jargon without explanation
- NO scare tactics — educational framing only
- Pacing: ~155 words per minute
- Be specific to the exact diagnosis and treatment
- Sound like a brilliant, caring expert — authoritative yet warm

OUTPUT FORMAT — return ONLY valid JSON matching this exact structure (no markdown, no explanation outside the JSON):
{
  "videoType": "<dental|orthodontic|financial>",
  "title": "<short patient-friendly title, 8-12 words>",
  "scenes": {
    "intro": { "narration": "<20-25 words>", "durationSeconds": <7-10>, "heading": "<3-5 word heading>" },
    "problem": { "narration": "<45-60 words>", "durationSeconds": <17-23>, "heading": "<3-5 word heading>", "bullets": ["<bullet 1>", "<bullet 2>", "<bullet 3>"] },
    "deepDive": { "narration": "<50-65 words>", "durationSeconds": <19-25>, "heading": "<3-5 word heading>", "bullets": ["<bullet 1>", "<bullet 2>", "<bullet 3>"] },
    "treatment": { "narration": "<55-70 words>", "durationSeconds": <21-27>, "heading": "<3-5 word heading>", "bullets": ["<bullet 1>", "<bullet 2>", "<bullet 3>", "<bullet 4>"] },
    "journey": { "narration": "<45-60 words>", "durationSeconds": <17-23>, "heading": "<3-5 word heading>", "bullets": ["<bullet 1>", "<bullet 2>", "<bullet 3>"] },
    "outcome": { "narration": "<35-50 words>", "durationSeconds": <14-19>, "heading": "<3-5 word heading>", "bullets": ["<bullet 1>", "<bullet 2>", "<bullet 3>"] },
    "whatToExpect": { "narration": "<35-50 words>", "durationSeconds": <14-19>, "heading": "<3-5 word heading>", "bullets": ["<bullet 1>", "<bullet 2>", "<bullet 3>"] },
    "cta": { "narration": "<20-30 words>", "durationSeconds": <7-12>, "heading": "<3-5 word heading>" }
  },
  "totalDurationSeconds": <sum of all scene durations, target 90-120>,
  "disclaimer": "<standard medical disclaimer, 1 sentence>"
}

SCENE-BY-SCENE GUIDANCE:
- INTRO: Warm, confident greeting. Acknowledge this is a detailed overview prepared personally for them.
- PROBLEM: Explain what's going on with their specific condition. Use mirror-test language. Mention functional AND aesthetic impacts.
- DEEP DIVE: This is the key differentiator. Explain WHY this condition matters anatomically. Discuss root pressure, bone changes, wear patterns, or gum recession risks. Use clear analogies (e.g., "Think of your jawbone like a foundation — when teeth are misaligned, the forces don't distribute evenly, like a building with uneven weight"). This scene should make the patient feel like they truly understand the science.
- TREATMENT: Detailed explanation of the chosen treatment approach. Specific technology, materials, how it works biomechanically. Why this approach was specifically chosen for their condition.
- JOURNEY: Month-by-month timeline. What happens in the first few weeks, at 3 months, at 6 months, approaching completion. Set realistic expectations. Make the timeline feel manageable and exciting.
- OUTCOME: The transformation — aesthetic, functional, health. Vivid and specific. Go beyond cosmetics to long-term health benefits.
- WHAT TO EXPECT: Retainers, follow-up care, what they need to do at home. Compliance tips. How to maintain their results long-term.
- CTA: Confident, warm close. Clear next step. Excitement about starting.` + (knowledgeContext ? "\n\n" + knowledgeContext : "");
}

function buildPremiumUserMessage(input: ScriptGenerationInput): string {
  const firstName = input.patientName.split(" ")[0];
  const notesContext = input.treatmentNotes
    ? `\nDoctor's clinical notes: "${input.treatmentNotes}"\nIMPORTANT: Interpret clinical shorthand using your orthodontic knowledge and translate into patient-friendly language.`
    : "";

  const statusContext = input.patientStatus
    ? `\nPatient status: ${input.patientStatus} — adapt the intro tone and CTA accordingly.`
    : "";

  const goalContext = input.videoGoal
    ? `\nVideo goal: ${input.videoGoal} — emphasize content that serves this goal.`
    : "";

  const concernsContext = input.concerns
    ? `\nPatient concerns: ${input.concerns} — address these directly in the reassurance or treatment section.`
    : "";

  return `Generate a premium in-depth video script for this orthodontic patient:

Patient first name: ${firstName}
Doctor: Dr. ${input.doctorName}
Clinic: ${input.clinicName}
Diagnosis: ${input.diagnosis}
Recommended treatment: ${input.treatment}${notesContext}${statusContext}${goalContext}${concernsContext}

Remember:
- Use "${firstName}" naturally 3-4 times throughout.
- Reference "Dr. ${input.doctorName}" and "${input.clinicName}" to build trust.
- The deepDive scene should explain the anatomical/biological WHY behind the condition.
- The journey scene should provide a realistic month-by-month timeline.
- The whatToExpect scene should cover retainers, care instructions, and maintenance.
- Total video should be 90-120 seconds.
- Stay within the word limits for each scene.
- Return ONLY the JSON object.`;
}

// ---------------------------------------------------------------------------
// Premium validation & enforcement
// ---------------------------------------------------------------------------

function estimatePremiumDuration(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.round((words / PREMIUM_WORDS_PER_MINUTE) * 60 * 10) / 10;
}

function validateAndEnforcePremiumScript(
  raw: PremiumGeneratedScript
): PremiumGeneratedScript {
  const script = { ...raw };

  const limits: Record<string, { min: number; max: number }> = {
    intro: { min: 10, max: 25 },
    problem: { min: 25, max: 45 },
    deepDive: { min: 30, max: 50 },
    treatment: { min: 30, max: 55 },
    journey: { min: 25, max: 45 },
    outcome: { min: 20, max: 40 },
    whatToExpect: { min: 20, max: 40 },
    cta: { min: 10, max: 25 },
  };

  const sceneKeys = [
    "intro",
    "problem",
    "deepDive",
    "treatment",
    "journey",
    "outcome",
    "whatToExpect",
    "cta",
  ] as const;
  let totalDuration = 0;

  for (const key of sceneKeys) {
    const scene = script.scenes[key] as PremiumSceneBlock;
    const limit = limits[key];

    if (wordCount(scene.narration) > limit.max) {
      scene.narration = trimToWordLimit(scene.narration, limit.max);
    }

    const estimated = estimatePremiumDuration(scene.narration);
    // Use the estimated duration from word count (trust TTS timing over hardcoded values)
    scene.durationSeconds = Math.ceil(estimated);

    totalDuration += scene.durationSeconds;
  }

  // Enforce global cap: if total exceeds 110 seconds, scale all scenes proportionally
  const MAX_TOTAL_SECONDS = 110;
  if (totalDuration > MAX_TOTAL_SECONDS) {
    const scaleFactor = MAX_TOTAL_SECONDS / totalDuration;
    let adjustedTotal = 0;
    for (const key of sceneKeys) {
      const scene = script.scenes[key] as PremiumSceneBlock;
      scene.durationSeconds = Math.max(3, Math.round(scene.durationSeconds * scaleFactor));
      adjustedTotal += scene.durationSeconds;
    }
    totalDuration = adjustedTotal;
    console.log(`[script-generator] Scaled premium script from ${Math.round(totalDuration / scaleFactor)}s to ${totalDuration}s (cap: ${MAX_TOTAL_SECONDS}s)`);
  }

  script.totalDurationSeconds = totalDuration;

  if (!script.disclaimer) {
    script.disclaimer =
      "This video is for educational purposes only and does not replace professional orthodontic advice. Treatment outcomes vary by individual.";
  }

  return script;
}

// ---------------------------------------------------------------------------
// Premium main API function
// ---------------------------------------------------------------------------

/**
 * Generates a premium in-depth orthodontic video script using Claude.
 *
 * Premium scripts have 8 scenes including deepDive, journey, and whatToExpect,
 * targeting 90-120 seconds of content with deeper educational depth.
 */
export async function generatePremiumScript(
  input: ScriptGenerationInput,
  apiKey?: string
): Promise<PremiumGeneratedScript> {
  const key = apiKey || process.env.CLAUDE_API_KEY;
  if (!key) {
    throw new Error(
      "Anthropic API key is required. Pass it as a parameter or set CLAUDE_API_KEY environment variable."
    );
  }

  const systemPrompt = buildPremiumSystemPrompt(input.treatment);
  const userMessage = buildPremiumUserMessage(input);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  let response: Response;
  try {
    response = await fetch(ANTHROPIC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 3072,
        temperature: 0.3,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "unknown error");
    throw new Error(
      `Claude API request failed (${response.status}): ${errorBody}`
    );
  }

  const data = (await response.json()) as {
    content: Array<{ type: string; text?: string }>;
  };

  const textBlock = data.content.find((block) => block.type === "text");
  if (!textBlock?.text) {
    throw new Error("Claude API returned no text content.");
  }

  const jsonString = extractJSON(textBlock.text);

  let parsed: PremiumGeneratedScript;
  try {
    parsed = JSON.parse(jsonString) as PremiumGeneratedScript;
  } catch (err) {
    throw new Error(
      `Failed to parse Claude response as JSON: ${
        err instanceof Error ? err.message : String(err)
      }\n\nRaw response:\n${textBlock.text.substring(0, 500)}`
    );
  }

  // Fix common LLM typos in scene keys before validation
  if (parsed.scenes) {
    const typoMap: Record<string, string> = {
      whatToExpected: "whatToExpect",
      whattoexpect: "whatToExpect",
      what_to_expect: "whatToExpect",
      deepdive: "deepDive",
      deep_dive: "deepDive",
    };
    for (const [typo, correct] of Object.entries(typoMap)) {
      if ((parsed.scenes as Record<string, unknown>)[typo] && !(parsed.scenes as Record<string, unknown>)[correct]) {
        (parsed.scenes as Record<string, unknown>)[correct] = (parsed.scenes as Record<string, unknown>)[typo];
        delete (parsed.scenes as Record<string, unknown>)[typo];
      }
    }
  }

  const requiredScenes = [
    "intro",
    "problem",
    "deepDive",
    "treatment",
    "journey",
    "outcome",
    "whatToExpect",
    "cta",
  ];
  for (const scene of requiredScenes) {
    if (!parsed.scenes?.[scene as keyof typeof parsed.scenes]) {
      throw new Error(
        `Generated premium script is missing required scene: "${scene}". ` +
          `Received scenes: ${Object.keys(parsed.scenes || {}).join(", ")}`
      );
    }
  }

  return validateAndEnforcePremiumScript(parsed);
}

// ---------------------------------------------------------------------------
// Premium demo script (no API call)
// ---------------------------------------------------------------------------

/**
 * Returns a high-quality hardcoded premium demo script for orthodontic cases.
 * Uses crowding + invisalign as the demo case with all 8 scenes.
 */
export function generatePremiumDemoScript(
  input: ScriptGenerationInput
): PremiumGeneratedScript {
  const firstName = input.patientName.split(" ")[0];
  const doctor = input.doctorName;
  const clinic = input.clinicName;

  const raw: PremiumGeneratedScript = {
    videoType: "orthodontic",
    title: `Your Complete Orthodontic Journey at ${clinic}`,
    scenes: {
      intro: {
        narration: `Hi ${firstName}, Dr. ${doctor} and the team at ${clinic} prepared this detailed overview just for you. Let's walk through everything together.`,
        durationSeconds: 9,
        heading: "Your Personal Overview",
      },
      problem: {
        narration: `During your consultation, we identified ${input.diagnosis === "crowding" ? "crowding" : input.diagnosis} in your dental arch. You may have noticed that some of your teeth overlap or twist, making certain areas nearly impossible to clean properly. Over time, this misalignment puts uneven stress on your teeth and jaw, which can lead to premature wear on your enamel and increased risk of cavities in those hard-to-reach spots.`,
        durationSeconds: 25,
        heading: "Understanding Your Smile",
        bullets: [
          `${capitalize(input.diagnosis)} detected during your examination`,
          "Certain areas are difficult to clean effectively",
          "Uneven stress can cause premature enamel wear",
        ],
      },
      deepDive: {
        narration: `Here's why this matters, ${firstName}. Your teeth are anchored in bone by a network of tiny ligaments. When teeth are crowded, the forces from chewing don't distribute evenly — think of it like a bridge where some supports carry far more weight than others. This uneven pressure can gradually affect the bone around those overloaded teeth. Additionally, overlapping surfaces create pockets where bacteria thrive, leading to inflammation that, over time, can compromise the foundation holding your teeth in place.`,
        durationSeconds: 31,
        heading: "Why This Matters",
        bullets: [
          "Uneven bite forces stress specific teeth and bone",
          "Overlapping areas harbor bacteria and inflammation",
          "Early treatment preserves long-term dental health",
        ],
      },
      treatment: {
        narration: `For your treatment, Dr. ${doctor} recommends ${input.treatment === "invisalign" ? "Invisalign clear aligners" : input.treatment}. These are custom-engineered using advanced 3D digital planning — each tray is precisely calibrated to apply gentle, controlled force that guides your teeth into their ideal positions. Small tooth-colored attachments may be placed on specific teeth to give the aligners extra grip for more complex movements. Each set of trays targets specific teeth, moving them in a carefully sequenced progression.`,
        durationSeconds: 28,
        heading: `Your ${capitalize(input.treatment)} Plan`,
        bullets: [
          "Custom 3D-planned trays for precise tooth movement",
          "Tooth-colored attachments for enhanced control",
          "Sequential progression targeting specific teeth",
          "Gentle, continuous force for comfortable treatment",
        ],
      },
      journey: {
        narration: `In the first few weeks, ${firstName}, you'll feel some gentle pressure as your teeth begin to respond. By month two or three, you'll start noticing visible changes in your alignment. Around the midpoint, the more complex movements begin — rotations, leveling, and fine-tuning your bite. In the final months, we focus on perfecting the details: closing any remaining gaps and ensuring your bite comes together beautifully.`,
        durationSeconds: 26,
        heading: "Your Treatment Timeline",
        bullets: [
          "Weeks 1-3: Initial adaptation and first movements",
          "Months 2-4: Visible alignment improvements",
          "Final phase: Bite perfection and detail refinement",
        ],
      },
      outcome: {
        narration: `When treatment is complete, you'll have a beautifully aligned smile that's not just cosmetically stunning — it's healthier. Properly aligned teeth distribute bite forces evenly, are far easier to keep clean, and reduce your long-term risk of gum disease and abnormal wear. It's one of the best investments you can make in your long-term health.`,
        durationSeconds: 22,
        heading: "Your Transformation",
        bullets: [
          "Beautifully aligned, confident smile",
          "Even bite force distribution",
          "Easier cleaning and better long-term oral health",
        ],
      },
      whatToExpect: {
        narration: `After treatment, you'll transition to retainers — these are essential for maintaining your results while the bone fully stabilizes around your teeth. Typically, you'll wear them full-time for the first few months, then transition to nighttime wear. Dr. ${doctor}'s team will schedule regular check-ins to make sure everything stays perfect.`,
        durationSeconds: 20,
        heading: "Maintaining Your Results",
        bullets: [
          "Retainers lock in your new smile as bone stabilizes",
          "Full-time wear initially, then nighttime only",
          "Regular follow-ups to ensure lasting results",
        ],
      },
      cta: {
        narration: `We're genuinely excited to start this journey with you, ${firstName}. Reach out to us at ${clinic} whenever you're ready — your new smile is just ahead.`,
        durationSeconds: 11,
        heading: "Let's Get Started",
      },
    },
    totalDurationSeconds: 0, // Will be computed by validation
    disclaimer:
      "This video is for educational purposes only and does not replace professional orthodontic advice. Treatment outcomes vary by individual.",
  };

  // Run through the same validation as API-generated scripts to ensure
  // scene durations match narration word counts and totalDurationSeconds is accurate.
  return validateAndEnforcePremiumScript(raw);
}

// ===========================================================================
// Template ↔ GeneratedScript conversion
// ===========================================================================

/**
 * Converts a ScriptSection (from treatment-scripts.ts) into the scene
 * shape expected by GeneratedScript, including optional bullets.
 */
function sectionToScene(
  section: ScriptSection
): { narration: string; durationSeconds: number; heading: string; bullets: string[] } {
  return {
    narration: section.text,
    durationSeconds: section.durationSeconds,
    heading: section.heading,
    bullets: section.bullets ?? [],
  };
}

function sectionToSceneNoBullets(
  section: ScriptSection
): { narration: string; durationSeconds: number; heading: string } {
  return {
    narration: section.text,
    durationSeconds: section.durationSeconds,
    heading: section.heading,
  };
}

/**
 * Maps a ComposedScript (from treatment-scripts.ts template system) to the
 * 5-scene GeneratedScript format.
 *
 * Mapping:
 *   intro       → intro
 *   explanation  → problem
 *   process / importance → treatment (process preferred; importance merged if present)
 *   outcome     → outcome
 *   cta         → cta
 *
 * Extra sections (experience, reassurance, notes) are merged into relevant scenes:
 *   - experience text appended to treatment narration
 *   - reassurance text appended to outcome narration
 *   - notes text appended to cta narration
 */
function composedToGeneratedScript(
  composed: ComposedScript,
  input: ScriptGenerationInput
): GeneratedScript {
  const { scenes } = composed;

  // --- intro (no bullets) ---
  const intro = sectionToSceneNoBullets(scenes.intro);

  // --- problem ← explanation ---
  const problem = sectionToScene(scenes.explanation);

  // --- treatment ← process, with importance and experience merged in ---
  const treatmentBase = scenes.process;
  let treatmentNarration = treatmentBase.text;
  const treatmentBullets = [...(treatmentBase.bullets ?? [])];
  let treatmentDuration = treatmentBase.durationSeconds;

  if (scenes.importance) {
    treatmentNarration += " " + scenes.importance.text;
    treatmentDuration += scenes.importance.durationSeconds;
    if (scenes.importance.bullets) {
      treatmentBullets.push(...scenes.importance.bullets);
    }
  }

  if (scenes.experience) {
    treatmentNarration += " " + scenes.experience.text;
    treatmentDuration += scenes.experience.durationSeconds;
    if (scenes.experience.bullets) {
      treatmentBullets.push(...scenes.experience.bullets);
    }
  }

  const treatment = {
    narration: treatmentNarration,
    durationSeconds: treatmentDuration,
    heading: treatmentBase.heading,
    bullets: treatmentBullets,
  };

  // --- outcome, with reassurance merged in ---
  const outcomeBase = scenes.outcome;
  let outcomeNarration = outcomeBase.text;
  const outcomeBullets = [...(outcomeBase.bullets ?? [])];
  let outcomeDuration = outcomeBase.durationSeconds;

  if (scenes.reassurance) {
    outcomeNarration += " " + scenes.reassurance.text;
    outcomeDuration += scenes.reassurance.durationSeconds;
    if (scenes.reassurance.bullets) {
      outcomeBullets.push(...scenes.reassurance.bullets);
    }
  }

  const outcome = {
    narration: outcomeNarration,
    durationSeconds: outcomeDuration,
    heading: outcomeBase.heading,
    bullets: outcomeBullets,
  };

  // --- cta, with notes merged in ---
  const ctaBase = scenes.cta;
  let ctaNarration = ctaBase.text;
  let ctaDuration = ctaBase.durationSeconds;

  if (scenes.notes) {
    ctaNarration = scenes.notes.text + " " + ctaNarration;
    ctaDuration += scenes.notes.durationSeconds;
  }

  const cta = {
    narration: ctaNarration,
    durationSeconds: ctaDuration,
    heading: ctaBase.heading,
  };

  // --- Assemble ---
  const totalDurationSeconds =
    intro.durationSeconds +
    problem.durationSeconds +
    treatment.durationSeconds +
    outcome.durationSeconds +
    cta.durationSeconds;

  const videoType: GeneratedScript["videoType"] =
    input.specialty === "orthodontic"
      ? "orthodontic"
      : input.category === "financial"
      ? "financial"
      : "dental";

  const firstName = input.patientName.split(" ")[0];

  return validateAndEnforceScript({
    videoType,
    title: `Your ${capitalize(input.treatment)} Plan — ${firstName}`,
    scenes: { intro, problem, treatment, outcome, cta },
    totalDurationSeconds,
    disclaimer:
      "This video is for educational purposes only and does not replace professional dental advice. Please consult your dentist for personalized recommendations.",
  });
}

/**
 * Maps a ComposedScript to the 8-scene PremiumGeneratedScript format.
 *
 * Mapping:
 *   intro        → intro
 *   explanation   → problem
 *   importance    → deepDive   (falls back to expanded explanation)
 *   process       → treatment
 *   experience    → journey    (falls back to synthetic from outcome)
 *   outcome       → outcome
 *   reassurance   → whatToExpect (falls back to synthetic maintenance tips)
 *   cta           → cta
 *
 * Notes scene, if present, is merged into cta.
 */
function composedToPremiumScript(
  composed: ComposedScript,
  input: ScriptGenerationInput
): PremiumGeneratedScript {
  const { scenes } = composed;
  const firstName = input.patientName.split(" ")[0];
  const knowledge = getTreatment(input.treatment);

  // --- intro ---
  const intro = sectionToSceneNoBullets(scenes.intro);

  // --- problem ← explanation ---
  const problem = sectionToScene(scenes.explanation);

  // --- deepDive ← importance (or synthesize from knowledge base) ---
  let deepDive: { narration: string; durationSeconds: number; heading: string; bullets: string[] };
  if (scenes.importance) {
    deepDive = sectionToScene(scenes.importance);
    deepDive.heading = "Why This Matters";
  } else {
    const deepDiveText = knowledge
      ? `Here is why addressing this matters. ${knowledge.untreatedConsequences.slice(0, 2).join(". ")}. Understanding this helps you see why ${input.treatment} is a smart investment in your long-term health.`
      : `Understanding why this treatment matters helps you make the best decision for your health. Addressing this now prevents more complex issues down the road.`;
    deepDive = {
      narration: deepDiveText,
      durationSeconds: estimateDuration(deepDiveText),
      heading: "Why This Matters",
      bullets: knowledge
        ? knowledge.untreatedConsequences.slice(0, 3)
        : ["Prevents progression", "Protects long-term health", "Simpler treatment now vs. later"],
    };
  }

  // --- treatment ← process ---
  const treatment = sectionToScene(scenes.process);

  // --- journey ← experience (or synthesize from knowledge base) ---
  let journey: { narration: string; durationSeconds: number; heading: string; bullets: string[] };
  if (scenes.experience) {
    journey = sectionToScene(scenes.experience);
    journey.heading = "Your Treatment Timeline";
  } else {
    const journeyText = knowledge
      ? `Here is what your journey looks like. ${knowledge.timelineEstimate} ${knowledge.recovery}`
      : `Your treatment will progress through clear stages, and the team will keep you informed every step of the way. Most patients find the process much smoother than they anticipated.`;
    journey = {
      narration: journeyText,
      durationSeconds: estimateDuration(journeyText),
      heading: "Your Treatment Timeline",
      bullets: knowledge
        ? [knowledge.timelineEstimate, "Regular check-ins to monitor progress", "Smooth, guided experience"]
        : ["Clear treatment phases", "Regular check-ins", "Smooth recovery"],
    };
  }

  // --- outcome ---
  const outcome = sectionToScene(scenes.outcome);

  // --- whatToExpect ← reassurance (or synthesize) ---
  let whatToExpect: { narration: string; durationSeconds: number; heading: string; bullets: string[] };
  if (scenes.reassurance) {
    whatToExpect = sectionToScene(scenes.reassurance);
    whatToExpect.heading = "What to Expect";
  } else {
    const expectText = knowledge
      ? `${knowledge.recovery} If you have any questions along the way, the team at ${input.clinicName} is always here to help.`
      : `Recovery is typically straightforward, and the team at ${input.clinicName} will make sure you know exactly what to expect at every stage. Do not hesitate to reach out with questions.`;
    whatToExpect = {
      narration: expectText,
      durationSeconds: estimateDuration(expectText),
      heading: "What to Expect",
      bullets: knowledge
        ? knowledge.commonConcerns.slice(0, 3).map((c) => c.concern)
        : ["Quick recovery", "Clear aftercare instructions", "Ongoing support from your team"],
    };
  }

  // --- cta (with notes merged) ---
  const ctaBase = scenes.cta;
  let ctaNarration = ctaBase.text;
  let ctaDuration = ctaBase.durationSeconds;
  if (scenes.notes) {
    ctaNarration = scenes.notes.text + " " + ctaNarration;
    ctaDuration += scenes.notes.durationSeconds;
  }
  const cta = {
    narration: ctaNarration,
    durationSeconds: ctaDuration,
    heading: ctaBase.heading,
  };

  // --- Assemble ---
  const totalDurationSeconds =
    intro.durationSeconds +
    problem.durationSeconds +
    deepDive.durationSeconds +
    treatment.durationSeconds +
    journey.durationSeconds +
    outcome.durationSeconds +
    whatToExpect.durationSeconds +
    cta.durationSeconds;

  const videoType: PremiumGeneratedScript["videoType"] =
    input.specialty === "orthodontic"
      ? "orthodontic"
      : input.category === "financial"
      ? "financial"
      : "dental";

  return validateAndEnforcePremiumScript({
    videoType,
    title: `Your Complete ${capitalize(input.treatment)} Journey — ${firstName}`,
    scenes: { intro, problem, deepDive, treatment, journey, outcome, whatToExpect, cta },
    totalDurationSeconds,
    disclaimer:
      "This video is for educational purposes only and does not replace professional dental advice. Treatment outcomes vary by individual.",
  });
}

// ===========================================================================
// Template-AI hybrid: use template as base, Claude enhances specific sections
// ===========================================================================

/**
 * Takes a composed template script and asks Claude to enhance/personalize
 * specific sections while preserving the template structure.
 */
async function enhanceComposedWithAI(
  composed: ComposedScript,
  input: ScriptGenerationInput,
  apiKey: string
): Promise<ComposedScript> {
  const knowledge = getTreatment(input.treatment);

  const sceneSummary = Object.entries(composed.scenes)
    .filter(([, scene]) => scene && scene.text)
    .map(([key, scene]) => `${key}: "${scene.text}"`)
    .join("\n\n");

  const systemPrompt = `You are a patient video script editor. You will receive a template-based script and patient context. Your job is to enhance the narration to feel more personal and specific to this patient — without changing the structure, scene order, or general message.

Rules:
- Keep the same number of scenes and headings.
- Preserve all {{placeholder}} values if any remain.
- Incorporate the patient's specific concerns, treatment notes, or status when provided.
- Make the tone warmer and more personal where possible.
- Stay within similar word counts (within +/- 10 words per scene).
- Return ONLY valid JSON: an object where keys are scene IDs and values are the enhanced narration text strings.
${knowledge ? `\nTreatment knowledge to reference:\n${knowledge.description}\nBenefits: ${knowledge.benefits.join("; ")}\nCommon concerns: ${knowledge.commonConcerns.map((c) => `${c.concern}: ${c.response}`).join("; ")}` : ""}`;

  const userMessage = `Patient: ${input.patientName.split(" ")[0]}
Doctor: Dr. ${input.doctorName}
Clinic: ${input.clinicName}
Treatment: ${input.treatment}
Diagnosis: ${input.diagnosis}
${input.patientStatus ? `Status: ${input.patientStatus}` : ""}
${input.videoGoal ? `Goal: ${input.videoGoal}` : ""}
${input.concerns ? `Concerns: ${input.concerns}` : ""}
${input.treatmentNotes ? `Doctor notes: ${input.treatmentNotes}` : ""}

Current script scenes:
${sceneSummary}

Enhance each scene's narration. Return JSON like:
{ "intro": "enhanced text...", "explanation": "enhanced text...", ... }`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  let response: Response;
  try {
    response = await fetch(ANTHROPIC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        temperature: 0.4,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    // If AI enhancement fails, return the original composed script
    console.warn(
      `[script-generator] AI enhancement failed (${response.status}), falling back to template.`
    );
    return composed;
  }

  const data = (await response.json()) as {
    content: Array<{ type: string; text?: string }>;
  };

  const textBlock = data.content.find((block) => block.type === "text");
  if (!textBlock?.text) {
    return composed;
  }

  try {
    const enhanced = JSON.parse(extractJSON(textBlock.text)) as Record<string, string>;

    // Merge enhanced narrations back into composed scenes
    const result: ComposedScript = {
      scenes: { ...composed.scenes },
      totalDurationSeconds: 0,
    };

    for (const [key, newText] of Object.entries(enhanced)) {
      const sceneKey = key as keyof typeof result.scenes;
      if (result.scenes[sceneKey] && typeof newText === "string" && newText.trim()) {
        result.scenes[sceneKey] = {
          ...result.scenes[sceneKey]!,
          text: newText,
          durationSeconds: Math.max(
            result.scenes[sceneKey]!.durationSeconds,
            Math.ceil(estimateDuration(newText))
          ),
        };
      }
    }

    // Recalculate total duration
    for (const scene of Object.values(result.scenes)) {
      if (scene && typeof scene === "object" && "durationSeconds" in scene) {
        result.totalDurationSeconds += scene.durationSeconds;
      }
    }

    return result;
  } catch {
    // JSON parse failed — return original
    console.warn("[script-generator] Failed to parse AI enhancement response, using template as-is.");
    return composed;
  }
}

// ===========================================================================
// Smart script generation — template / template+AI / full AI
// ===========================================================================

/**
 * Helper to build the PersonalizationInput from ScriptGenerationInput.
 */
function toPersonalizationInput(input: ScriptGenerationInput): PersonalizationInput {
  return {
    patientName: input.patientName,
    doctorName: input.doctorName,
    clinicName: input.clinicName,
    treatmentNotes: input.treatmentNotes,
    parentMode: input.parentMode,
    concerns: input.concerns,
    financing: input.financing,
  };
}

/**
 * Smart script generation that selects the best approach:
 *
 * - **"template"** mode: If a pre-written template exists for the treatment,
 *   composes instantly from templates (no API call). Falls through to full_ai
 *   if no template is available.
 *
 * - **"template_ai"** mode: Uses the template as a base, then calls Claude
 *   to enhance and personalize specific sections. Best balance of speed + quality.
 *   Falls through to full_ai if no template is available.
 *
 * - **"full_ai"** mode (default): Calls Claude to generate the entire script
 *   from scratch, with knowledge base context injected into the prompt.
 *
 * @param input - Patient and treatment context.
 * @param apiKey - Anthropic API key (required for template_ai and full_ai modes).
 * @returns A 5-scene GeneratedScript.
 */
export async function generateScriptSmart(
  input: ScriptGenerationInput,
  apiKey?: string
): Promise<GeneratedScript> {
  const mode = input.contentMode ?? "full_ai";
  const treatmentId = input.treatment.toLowerCase().replace(/\s+/g, "_");
  const templateExists = hasTemplate(treatmentId);

  // --- Template mode: instant, no API ---
  if (mode === "template" && templateExists) {
    const personalization = toPersonalizationInput(input);
    const composed = composeScript(
      treatmentId,
      input.patientStatus ?? "undecided",
      input.videoGoal ?? "educate",
      personalization
    );
    return composedToGeneratedScript(composed, input);
  }

  // --- Template + AI mode: template base, Claude enhances ---
  if (mode === "template_ai" && templateExists) {
    const key = apiKey || process.env.CLAUDE_API_KEY;
    const personalization = toPersonalizationInput(input);
    const composed = composeScript(
      treatmentId,
      input.patientStatus ?? "undecided",
      input.videoGoal ?? "educate",
      personalization
    );

    if (key) {
      const enhanced = await enhanceComposedWithAI(composed, input, key);
      return composedToGeneratedScript(enhanced, input);
    }

    // No API key — fall back to pure template
    console.warn("[script-generator] No API key for template_ai mode, using pure template.");
    return composedToGeneratedScript(composed, input);
  }

  // --- Full AI mode (default) or no template available ---
  return generateScript(input, apiKey);
}

/**
 * Smart premium script generation — same routing logic as generateScriptSmart
 * but outputs the 8-scene PremiumGeneratedScript format.
 *
 * @param input - Patient and treatment context.
 * @param apiKey - Anthropic API key (required for template_ai and full_ai modes).
 * @returns An 8-scene PremiumGeneratedScript.
 */
export async function generatePremiumScriptSmart(
  input: ScriptGenerationInput,
  apiKey?: string
): Promise<PremiumGeneratedScript> {
  const mode = input.contentMode ?? "full_ai";
  const treatmentId = input.treatment.toLowerCase().replace(/\s+/g, "_");
  const templateExists = hasTemplate(treatmentId);

  // --- Template mode: instant, no API ---
  if (mode === "template" && templateExists) {
    const personalization = toPersonalizationInput(input);
    const composed = composeScript(
      treatmentId,
      input.patientStatus ?? "undecided",
      input.videoGoal ?? "educate",
      personalization,
      { mode: "premium" }
    );
    return composedToPremiumScript(composed, input);
  }

  // --- Template + AI mode: template base, Claude enhances ---
  if (mode === "template_ai" && templateExists) {
    const key = apiKey || process.env.CLAUDE_API_KEY;
    const personalization = toPersonalizationInput(input);
    const composed = composeScript(
      treatmentId,
      input.patientStatus ?? "undecided",
      input.videoGoal ?? "educate",
      personalization,
      { mode: "premium" }
    );

    if (key) {
      const enhanced = await enhanceComposedWithAI(composed, input, key);
      return composedToPremiumScript(enhanced, input);
    }

    // No API key — fall back to pure template
    console.warn("[script-generator] No API key for template_ai mode, using pure template.");
    return composedToPremiumScript(composed, input);
  }

  // --- Full AI mode (default) or no template available ---
  return generatePremiumScript(input, apiKey);
}
