// Opera — Dental Procedure Animation Scripts (v3 · Dental / Restorative)
// SINGLE SOURCE OF TRUTH for the dental clip library.
// Run:  node build.mjs   → regenerates DENTAL_SCRIPTS.md + PROMPTS.md + manifest.json
//
// Structure mirrors the Orthodontic v3 guide: every procedure follows the spine
//   Establishing wide → Prep/Isolate → Zoom-in transition → Macro action beats → Reveal
// Each scene renders as one 6–8s clip, stitched in Remotion.
//
// Flat folder, filename = the distinction:  dental_{treatment}_{slug}.mp4
//   e.g. dental_filling_remove-decay.mp4

import { writeFileSync } from "node:fs";
import G_INDIRECT from "./groups/indirect.mjs";
import G_SURGICAL from "./groups/surgical.mjs";
import G_REPLACE from "./groups/replace.mjs";
import G_SPECIAL from "./groups/special.mjs";

/* ─────────────────── Reusable prompt prefixes (dental) ─────────────────── */

const STYLE_MAP = {
  ENV: `Photorealistic 3D medical animation, cinematic documentary realism, view of a modern, clean dental operatory. A calm, professional treatment room with soft, even, daylight-balanced lighting and a focused overhead dental exam light casting a clean pool of light onto the patient's mouth. The patient reclines comfortably and awake in a contemporary dental chair, a soft bib clipped at the chest, eyes calm, face relaxed and NOT identifiable. The dentist is seated at the patient's head wearing scrubs, a surgical mask, magnifying loupes, a cap, and blue nitrile gloves; a dental assistant sits opposite holding a slim saliva-suction tip; both faces masked and not identifiable. On a bracket tray beside them: neatly arranged stainless-steel dental instruments (mouth mirror, explorer, probe) and the relevant materials; a delivery unit with a handpiece and coiled hoses is within reach. All equipment rendered with realistic materials — matte medical plastics, brushed stainless steel, soft-glow monitors with NO readable text or branding. Medium depth of field, natural premium color, gentle clinical calm, subtle fine film grain, 4K, 25fps.`,

  ENV_SURG: `Photorealistic 3D medical animation, cinematic documentary realism, view of a modern dental operatory set up as a sterile surgical field. The patient reclines awake and comfortable in the dental chair under local anesthesia, the lower face framed by sterile pale-blue surgical drapes, eyes calm and face NOT identifiable. The oral surgeon and a surgical assistant are gowned, capped, masked, and wear sterile surgical gloves; faces not identifiable. Cool, even, daylight-balanced lighting with a focused overhead surgical light on the mouth. A sterile instrument tray holds a surgical handpiece and neatly arranged stainless-steel surgical instruments; monitors glow softly with NO readable text or branding. Realistic surgical-grade materials — matte medical plastics, brushed stainless steel, titanium — medium depth of field, natural premium color, gentle clinical calm, subtle fine film grain, 4K, 25fps.`,

  MACRO: `Photorealistic 3D medical macro visualization, the highest-fidelity dental render, cinematic intraoral close-up with true-to-life detail. A healthy human mouth fills the frame; where restorative work is done the tooth is isolated by a thin rubber dam on a small frame, otherwise the lips are gently held clear to expose the dental arch. The teeth show natural enamel with realistic semi-translucency at the incisal edges, subtle surface micro-texture and faint perikymata lines, gentle tooth-to-tooth variation around a natural light shade (never artificially bright pure-white), and anatomically correct human dentition in a normal arch form. The gingiva is healthy coral-pink, firm and lightly stippled, meeting the teeth in clean scalloped margins with visible interdental papillae. A thin natural film of saliva gives the enamel a soft wet sheen with crisp, controlled specular highlights. Lighting: bright, even, daylight-balanced dental light from above with a soft fill, no harsh shadows, clean and clinical. Lens: 100mm macro equivalent, shallow depth of field at f/2.8, tack-sharp focus on the point of action with soft creamy falloff elsewhere. Natural premium color, subtle fine film grain, calm true-to-life motion, 4K, 25fps. Any dental restorations and instruments are rendered with physically accurate materials — polished stainless steel, translucent ceramic, tooth-colored composite, titanium, clear thermoplastic — with realistic reflections and correct scale.`,
};

// Bridge (Zoom-in transition) scenes carry no style prefix — their prompt is self-contained.

/* ─────────────────── Consistency tokens ─────────────────── */

const TOKEN_MAP = {
  SMILE: `[SMILE TOKEN] natural light A1–A2 enamel shade with soft incisal translucency, healthy coral-pink stippled gingiva, a gently rounded adult arch, one subtly individual tooth character (no two teeth identical) — keep this same mouth across every scene of the procedure.`,
  EDENT: `[EDENTULOUS RIDGE TOKEN] a healthy edentulous or partially edentulous alveolar ridge — smooth, firm, coral-pink mucosa over a rounded arch where teeth are absent — keep this same ridge and any remaining teeth constant across the procedure; the reveal shows lifelike prosthetic teeth in a natural light shade.`,
};

/* ─────────────────── Reusable negative (DENTAL — adapted) ─────────────────── */
// KEY DIFFERENCE vs ortho: controlled handpiece preparation is EXPECTED in restorative
// work (not a defect), and the pre-treatment condition (decay, staining, inflamed gums,
// missing teeth) is allowed in the "problem" beat where clinically specified.

const NEG = `[NEGATIVE] blood, bleeding, open wounds, gore, raw tissue, surgical bruising, pus, ulcers; identifiable human faces, celebrity likeness; distorted, extra, fused, or malformed hands, extra or missing fingers; unnaturally bright fluorescent-white teeth (except a whitening reveal), glossy plastic or CGI toy appearance, cartoonish, illustrated, painterly, flat, or oversaturated rendering; incorrect dental anatomy, wrong tooth count, duplicated, fused, or misshapen teeth; floating, oversized, or misplaced restorations, hardware, or instruments, restorations that violate anatomy; any readable text, numbers, captions, watermarks, logos, brand names, or UI on equipment, screens, trays, or packaging; general-anesthesia equipment, oral breathing tubes, or a mask covering the patient's nose and mouth (dental procedures are awake under local anesthesia); dry cracked lips, saliva strings, drool, spit; harsh on-camera flash, blown-out highlights, banding, heavy motion blur on the focal point, chromatic aberration; cluttered or messy background, extra people, duplicate instruments, floating objects. Tooth decay, cavities, plaque, tartar, staining, gum inflammation, or missing teeth appear ONLY in the beat where clinically specified as the condition being treated (otherwise avoid). Controlled preparation of a tooth with a water-cooled dental handpiece is expected in restorative scenes and is NOT a defect.`;

/* ─────────────────── Shared realism / render / no-people / negative tail ───────────────────
   Appended to every self-contained scene so each output stays a complete, paste-ready prompt
   with consistent physics and anti-"AI-look" direction. Scene-specific realism (dentin, composite
   finish, etched enamel, etc.) is written into the scene action itself. */
// Target look (chosen by the user): clean, premium 3D MEDICAL ANIMATION on Veo — not photoreal
// footage, and not cheap plastic CGI. Appended to every self-contained scene.
const REALISM = `Style: a clean, high-quality 3D medical animation, like a premium dental patient-education video — polished, modern, and professional. It shows a realistic 3D model of a human mouth with natural tooth proportions and spacing. The teeth are a soft, natural off-white with a little translucency at the biting edges (never pure bright white, never grey, never garish), with subtle surface detail and a gentle natural sheen rather than a wet plastic gloss; each tooth is slightly different and natural. The gums are smooth and healthy pink. Soft, even studio lighting with gentle shadows, and a clean, softly blurred dark background behind the mouth. The camera movement is smooth, slow, and steady. Proportions stay realistic — the teeth are normal-sized and correctly shaped, and must never look giant, blocky, warped, melted, cracked, or duplicated, and never like cheap plastic. There are NO people, NO hands, NO gloves, and NO faces anywhere — only the mouth; when a dental tool appears, only its clean tip is visible, held by nothing. No text, no letters, no numbers, no logos, no watermarks, and no blood.`;

/* ─────────────────── Procedures ─────────────────── */
// Schema per treatment:
//   { n, key, label, blurb, token:'SMILE'|'EDENT',
//     guardrails:{ must:[...], mustNot:[...], negTweak:'' },
//     setting:{ setting, people, tray },
//     scenes:[ { id, slug, name, sec, tag:'ENV'|'ENV_SURG'|'MACRO'|'BRIDGE', prompt, vo, motion } ] }

const FILLING = {
  n: 1, key: "filling", label: "Composite Filling", token: "SMILE",
  blurb: "A small area of decay is gently removed and the tooth is rebuilt with tooth-colored composite resin, then cured and polished. Non-surgical, awake under local anesthesia.",
  guardrails: {
    must: [
      "the tooth is isolated (rubber dam on a small frame or cotton-roll isolation) and kept dry",
      "decay is removed with a small water-cooled dental handpiece bur and/or hand excavator, leaving a clean cavity preparation in healthy tooth structure",
      "the preparation is etched (pale-blue gel), rinsed, and a thin bonding agent applied and light-cured",
      "tooth-colored composite is placed in increments, sculpted to natural cusp/groove anatomy, and each layer set with a blue LED curing light",
      "the restoration is shaped and polished to a seamless, natural finish",
    ],
    mustNot: ["silver amalgam (unless specified)", "an open unfilled cavity left at the end", "gross over-contour", "drilling into the gum or adjacent teeth"],
    negTweak: "allow a visible cavity / small area of decay in the problem beat (the condition being treated); allow controlled water-cooled handpiece preparation.",
  },
  setting: {
    setting: "General dental operatory; patient awake under local anesthesia.",
    people: "Dentist at the patient's head; assistant with suction.",
    tray: "Mouth mirror & explorer, rubber dam + frame, high-speed water-cooled handpiece with bur, spoon excavator, 37% phosphoric-acid etch gel, bonding agent + microbrush, shade-matched composite resin, composite instrument, blue LED curing light, polishing disc.",
  },
  scenes: [
    { id: "1.1", slug: "problem", name: "The small cavity on a back tooth", sec: 8, tag: "FULL", selfContained: true,
      prompt: "3D medical animation. A smooth cinematic close-up of the lower back teeth inside a clean 3D model of a human mouth, viewed from a slightly raised angle so the flat chewing surfaces of the molars are clearly visible. The shot focuses on one lower molar: in the natural grooves on its chewing surface sits a small, realistic patch of brown tooth decay, about the size of a grain of rice, tucked into the deepest groove — just a small brown spot, not cracks, not a spiderweb, not a broken tooth. The camera slowly and smoothly pushes in toward this small brown spot and keeps it centered. Only the lower back teeth (molars and premolars) and healthy pink gums are in frame — no front teeth in the shot.",
      vo: "This is the tooth we're repairing — a small cavity has formed in the deep grooves on the surface of your back tooth.",
      motion: "Slow gentle push-in onto the small brown spot; quiet tone, soft musical bed." },
    { id: "1.2", slug: "remove-decay", name: "Cleaning out the decay", sec: 8, tag: "FULL", selfContained: true,
      prompt: "3D medical animation. A close-up of the same lower molar's chewing surface from a slightly raised angle, with the neighboring back teeth and healthy pink gums around it. The clean metal tip of a small dental drill enters smoothly from the top of the frame — only the tip of the tool, held by nothing — and, with a light spray of water, gently cleans the small brown spot of decay out of the grooves, leaving a small, clean, shallow hollow in the top of the tooth. A little water is rinsed away as it works. The tooth stays whole and natural the whole time — only the small decayed spot is removed, no cracks and no big hole.",
      vo: "We gently clean away only the decayed part of the tooth, leaving all the healthy structure behind and making a small, clean space for the filling.",
      motion: "Drill tip cleans the spot with a light water spray; soft low whir." },
    { id: "1.3", slug: "etch-bond", name: "Preparing the surface", sec: 7, tag: "FULL", selfContained: true,
      prompt: "3D medical animation. A close-up of the same lower molar, now with a small, clean, shallow hollow on its chewing surface, neighboring back teeth and pink gums around it. The clean tip of a small applicator enters from the edge of frame and paints a clear blue gel into and around the hollow; the gel is then rinsed away with a light water spray, leaving just that spot looking slightly matte while the rest of the tooth keeps its natural sheen. Next, a tiny brush paints a thin, clear liquid into the hollow, and a small blue dental light moves in and shines a soft blue glow on it for a couple of seconds to set it. Smooth, clean, and calm throughout.",
      vo: "A special gel and a thin clear coat are placed and set with a quick blue light — this is what makes the filling stick tightly to your tooth.",
      motion: "Blue gel painted and rinsed, clear coat brushed, soft blue light glow." },
    { id: "1.4", slug: "place-cure", name: "Filling the tooth back in", sec: 8, tag: "FULL", selfContained: true,
      prompt: "3D medical animation. A close-up of the same lower molar with the small clean hollow on its chewing surface. The clean tip of a small dental tool gently presses soft, tooth-colored filling material into the hollow, a little at a time, shaping it to rebuild the natural bumps and grooves of the chewing surface so it matches the healthy teeth around it. After each bit is added, a small blue dental light moves in and shines a soft blue glow to harden it. The hollow slowly fills in, layer by layer, until the top of the tooth is whole, smooth, and natural again, the same shape as a normal healthy molar.",
      vo: "Tooth-colored filling material is added in thin layers, each one shaped to rebuild your tooth's natural surface and hardened with a quick blue light.",
      motion: "Filling pressed and shaped, blue light hardens each layer; soft taps." },
    { id: "1.5", slug: "finish-reveal", name: "Polished and finished", sec: 7, tag: "FULL", selfContained: true,
      prompt: "3D medical animation. A close-up of the same lower molar, now fully filled in and whole again. The soft rounded tip of a small polishing tool gently buffs the chewing surface to a smooth, natural sheen that matches the surrounding teeth, the brown decay completely gone. The camera then slowly and smoothly pulls back to show the finished molar sitting naturally in the row of clean, healthy lower back teeth with soft pink gums around them. Everything looks clean, healthy, and natural. Calm and polished throughout.",
      vo: "Finally we polish it smooth so it blends right in — the tooth is fully repaired, natural-looking, and ready to use right away.",
      motion: "Polishing buffs the surface, slow pull-back to the healthy row; gentle uplifting tone." },
  ],
};

// Groups live in ./groups/*.js (schema identical to FILLING).
const treatments = [FILLING, ...G_INDIRECT, ...G_SURGICAL, ...G_REPLACE, ...G_SPECIAL].sort((a, b) => a.n - b.n);

/* ─────────────────── Generators ─────────────────── */

const TAG_LABEL = { ENV: "[ENV STYLE]", ENV_SURG: "[ENV STYLE — SURGICAL]", MACRO: "[MACRO STYLE]", BRIDGE: "" };

// Normalize a scene slug into a clean filename fragment regardless of how the
// drafting pass named it (strip any redundant leading treatment-key prefix).
function cleanSlug(t, s) {
  let sl = s.slug;
  for (const pre of [t.key + "-", t.key.replace(/_/g, "-") + "-"]) {
    if (sl.startsWith(pre)) sl = sl.slice(pre.length);
  }
  return sl;
}
const fileFor = (t, s) => `dental_${t.key}_${cleanSlug(t, s)}.mp4`;
const idFor = (t, s, i) => `${t.n}.${i + 1}`;

// guard: no duplicate filenames within a treatment
for (const t of treatments) {
  const seen = new Set();
  for (const s of t.scenes) {
    const f = fileFor(t, s);
    if (seen.has(f)) throw new Error(`duplicate clip file ${f} in ${t.key}`);
    seen.add(f);
  }
}

function expandPrompt(t, s) {
  // New style (v4 standard): scene action + shared realism/render/negative tail = one
  // complete, copy-paste-ready prompt. No people, anatomically specific, hyper-real.
  if (s.selfContained) return `${s.prompt} ${REALISM}`;
  // Legacy style: assemble style block + action + token + negative.
  const parts = [];
  if (STYLE_MAP[s.tag]) parts.push(STYLE_MAP[s.tag]);
  parts.push(s.prompt);
  parts.push(TOKEN_MAP[t.token]);
  parts.push(NEG);
  return parts.join("\n\n");
}

// manifest.json — the database
const clips = [];
for (const t of treatments) {
  t.scenes.forEach((s, i) => {
    clips.push({
      file: fileFor(t, s),
      treatment: t.key, label: t.label, scene: idFor(t, s, i), sceneName: s.name,
      durationSeconds: s.sec, styleTag: s.tag, token: t.token,
      narration: s.vo, motion: s.motion,
      prompt: expandPrompt(t, s),
    });
  });
}
const manifest = {
  name: "Opera Dental Clinical Visuals",
  description: "Dental procedure animation clip library (v3). One flat folder; filename {treatment}_{slug}.mp4. Each clip is a 6–8s beat; stitch per procedure in Remotion. `prompt` is fully expanded (style block + action + token + negative) and paste-ready for Veo 3.1 / Sora 2 Pro.",
  namingConvention: "dental_{treatment}_{slug}.mp4",
  spine: "Establishing → Prep/Isolate → Zoom-in → Macro beats → Reveal",
  treatmentCount: treatments.length,
  clipCount: clips.length,
  reusableBlocks: { ENV: STYLE_MAP.ENV, ENV_SURG: STYLE_MAP.ENV_SURG, MACRO: STYLE_MAP.MACRO, negative: NEG, tokens: TOKEN_MAP },
  clips,
};
writeFileSync(new URL("./manifest.json", import.meta.url), JSON.stringify(manifest, null, 2));

// PROMPTS.md — flat, copy-paste generation sheet (expanded prompts)
let p = `# Opera — Dental Prompts (paste-ready)\n\nEach block below is the **fully expanded** generation prompt (style + action + token + negative) for one clip. Copy → generate in Veo 3.1 / Sora 2 Pro → save as the filename shown. Storyboard, narration, and motion notes live in \`DENTAL_SCRIPTS.md\`.\n\n`;
for (const t of treatments) {
  p += `\n## ${t.n} · ${t.label} \`(${t.key})\`\n\n`;
  t.scenes.forEach((s, i) => {
    p += `### \`${fileFor(t, s)}\` — Scene ${idFor(t, s, i)} ${s.name} (~${s.sec}s)\n\n`;
    p += "```\n" + expandPrompt(t, s) + "\n```\n\n";
  });
}
writeFileSync(new URL("./PROMPTS.md", import.meta.url), p);

// DENTAL_SCRIPTS.md — the storyboard / production doc (mirrors the ortho guide)
let d = `# OperaAI Patient Video — Dental Procedure Animation Scripts (v3 · Dental / Restorative)\n\n`;
d += `Vertical: Dental / Restorative · Pipeline: ElevenLabs Image & Video → ElevenCreative Studio (voice + SFX) → Remotion (brand composite).\n\n`;
d += `**Opera Score linkage:** patient education clips drive **Treatment Acceptance** — a patient who *sees* and understands the procedure feels less anxiety and accepts treatment at consult.\n\n`;
d += `**Spine (every procedure):** Establishing wide → Prep / Isolate → Zoom-in transition → Macro action beats → Reveal. Each scene = one 6–8s clip, stitched in Remotion. Never span room-wide to tooth-macro in one clip — chain separate clips.\n\n`;
d += `**Dental vs Ortho differences baked in:** restorative work uses **rubber-dam isolation** (not a cheek retractor); the negative prompt **allows** controlled water-cooled handpiece preparation and the pre-treatment condition (decay, staining, inflamed gums, missing teeth) in the beat where it is the thing being treated.\n\n`;
d += `**Paste convention:** \`[ENV STYLE]\` = operatory establishing/prep · \`[ENV STYLE — SURGICAL]\` = sterile surgical field (implant/oral surgery) · \`[MACRO STYLE]\` = intraoral close-up · \`[SMILE TOKEN]\`/\`[EDENTULOUS RIDGE TOKEN]\` = per-patient consistency · \`[NEGATIVE]\` = on every generation.\n\n`;
d += `> The reusable style blocks, tokens, and negative are defined once in \`build.mjs\` / \`manifest.json\` (\`reusableBlocks\`). In the scenes below, the shorthand tag stands in for the full block. Fully expanded, paste-ready prompts are in \`PROMPTS.md\`.\n\n`;
d += `---\n`;
for (const t of treatments) {
  d += `\n## ${t.n} · ${t.label} \`(${t.key})\`\n\n`;
  d += `${t.blurb}\n\n`;
  d += `Consistency token: \`[${t.token} TOKEN]\`\n\n`;
  d += `**Clinical accuracy guardrails**\n\n`;
  d += `- **MUST:** ${t.guardrails.must.join("; ")}.\n`;
  d += `- **MUST NOT:** ${t.guardrails.mustNot.join("; ")}.\n`;
  if (t.guardrails.negTweak) d += `- **Negative tweak:** ${t.guardrails.negTweak}\n`;
  d += `\n**Setting & equipment**\n\n`;
  d += `- **Setting:** ${t.setting.setting}\n- **People:** ${t.setting.people}\n- **Tray:** ${t.setting.tray}\n\n`;
  t.scenes.forEach((s, i) => {
    d += `### Scene ${idFor(t, s, i)} — ${s.name} (~${s.sec}s)  ·  \`${fileFor(t, s)}\`\n\n`;
    if (s.selfContained) {
      d += `${s.prompt}\n\n`;
    } else {
      const tag = TAG_LABEL[s.tag] ? TAG_LABEL[s.tag] + " " : "";
      d += `${tag}${s.prompt} \`[${t.token} TOKEN]\` \`[NEGATIVE]\`\n\n`;
    }
    d += `**Narration:** ${s.vo}\n\n`;
    d += `**Motion / SFX:** ${s.motion}\n\n`;
  });
  d += `---\n`;
}
writeFileSync(new URL("./DENTAL_SCRIPTS.md", import.meta.url), d);

console.log(`✓ ${treatments.length} procedures, ${clips.length} clips → DENTAL_SCRIPTS.md, PROMPTS.md, manifest.json`);
