// Regeneration prompts for existing dental-video assets (Veo, clean 3D medical animation).
// Source of truth for: 16 distinct deep-dives, 1 shared smile, 2 short-clip replacements,
// 6 soft/low-bitrate upgrades. Run: node regen-prompts.mjs  → prints full paste-ready prompts.
// `target` is the file path (under public/dental-videos/) each clip should be saved to.

const STYLE = `Style: a clean, high-quality 3D medical animation, like a premium dental patient-education video — polished, modern, and professional. Realistic 3D model of a human mouth with natural tooth proportions and spacing; teeth a soft natural off-white with slight translucency at the edges (never pure white, never grey, never garish), subtle surface detail and a gentle natural sheen, not plastic; each tooth slightly different. Gums smooth and healthy pink. Soft, even studio lighting, gentle shadows, clean softly-blurred dark background. Smooth, slow, steady camera. Teeth normal-sized and correctly shaped — never giant, blocky, warped, melted, cracked, duplicated, or plastic. NO people, NO hands, NO gloves, NO faces — only the mouth; when a tool appears only its clean tip is visible, held by nothing. No text, letters, numbers, logos, watermarks, or blood.`;

const GROUPS = [
  { title: "DISTINCT DEEP-DIVES (kills the repeated-clip problem — 16)", clips: [
    { target: "crown/deepdive.mp4", action: "3D medical animation. An extreme close-up of a finished dental crown seating down onto a prepared tooth and meeting the gumline in one clean, seamless line, its shape and color matching the neighboring teeth. Slow gentle push-in on the margin where the crown meets the gum." },
    { target: "filling/deepdive.mp4", action: "3D medical animation. An extreme close-up of a small blue curing light hardening tooth-colored filling material inside a back molar's groove, the surface then shown smooth and fully rebuilt to match the tooth. Slow steady hold on the one tooth." },
    { target: "implant/deepdive.mp4", action: "3D medical animation. A clean cutaway close-up showing a titanium implant post seated inside the jawbone beneath the gum, the bone knitting tightly around its threads. Slow gentle orbit around the implant in the bone." },
    { target: "whitening/deepdive.mp4", action: "3D medical animation. An extreme close-up of a single front tooth over a smooth time-lapse, its surface brightening from a dull yellowish tone to a clean, natural white. Slow push-in on the one tooth." },
    { target: "root_canal/deepdive.mp4", action: "3D medical animation. A clean cutaway close-up looking inside a tooth as slim files gently clean and shape the narrow root canals, a soft red glow deep inside fading to calm. Slow move downward into the canal." },
    { target: "extraction/deepdive.mp4", action: "3D medical animation. A close-up of a clean, healthy, empty tooth socket in the gum right after a tooth has been removed, the neighboring teeth and pink gums intact around it. Slow gentle settle on the clean socket." },
    { target: "bridge/deepdive.mp4", action: "3D medical animation. An extreme close-up of the middle replacement tooth of a dental bridge resting gently against the gumline, bridging the gap between the two capped teeth on either side. Slow push-in on the middle tooth meeting the gum." },
    { target: "dentures/deepdive.mp4", action: "3D medical animation. A close-up of a full denture seating down onto a smooth pink gum ridge, its lifelike teeth and gum-colored base hugging the ridge with a snug fit. Slow gentle settle as it seats." },
    { target: "gum_treatment/deepdive.mp4", action: "3D medical animation. An extreme close-up of a slim ultrasonic cleaning tip gliding along the gumline and gently lifting hardened tartar off the tooth to reveal clean enamel beneath, with a light water spray. Slow track along the gumline." },
    { target: "braces/deepdive.mp4", action: "3D medical animation. An extreme close-up of one metal brace bracket on a front tooth, with the thin archwire seated in its slot and a small colored elastic band holding it in place. Slow gentle push-in on the single bracket." },
    { target: "invisalign/deepdive.mp4", action: "3D medical animation. An extreme close-up of a clear aligner tray snapping snugly over the front teeth, the transparent shell hugging each tooth and tracing the gumline. Slow push-in as the clear tray seats." },
    { target: "ceramic_braces/deepdive.mp4", action: "3D medical animation. An extreme close-up of one clear tooth-colored ceramic bracket bonded to a front tooth, its translucent body blending into the enamel with a thin wire running through it. Slow gentle push-in on the single ceramic bracket." },
    { target: "lingual_braces/deepdive.mp4", action: "3D medical animation. A close-up from behind the front teeth (the tongue side) showing a small bracket and wire hidden on the inner surface of a tooth, invisible from the front. Slow gentle move along the inner surfaces." },
    { target: "expander/deepdive.mp4", action: "3D medical animation. An extreme close-up looking up at the roof of the mouth where a palatal expander's small central screw sits, turning slightly and easing the two halves apart to widen the arch. Slow push-in on the screw as it turns." },
    { target: "retainer/deepdive.mp4", action: "3D medical animation. An extreme close-up of a clear retainer's edge hugging the straightened front teeth and tracing the gumline, holding them perfectly in place. Slow gentle push-in along the retainer edge." },
    { target: "jaw_surgery/deepdive.mp4", action: "3D medical animation. A clean side-profile cutaway close-up of the upper and lower jaws meeting in corrected, balanced alignment, the teeth fitting evenly together. Slow gentle settle on the aligned bite." },
  ]},
  { title: "SHORT / REUSED REPLACEMENTS (3)", clips: [
    { target: "shared/smile-result.mp4", action: "3D medical animation. A clean, cinematic close-up of a healthy mouth showing an even, full row of natural off-white teeth with smooth healthy pink gums; the camera slowly pulls back from the front teeth as the lips relax into a natural, confident closed-then-slightly-open smile, the teeth catching a soft gentle highlight. Everything looks clean, healthy, and finished." },
    { target: "ceramic_braces/step1.mp4", action: "3D medical animation. A close-up of the upper front teeth, slightly crowded and uneven at the start; clear tooth-colored ceramic braces sit on the front teeth — small translucent brackets that blend into the enamel, joined by a thin, barely-visible wire — and over a smooth gentle time-lapse the teeth gradually straighten into an even, aligned row while the braces stay subtle and discreet the whole time." },
    { target: "veneers/problem.mp4  (keep 1080p)", action: "3D medical animation. A close-up of the upper front teeth showing small gaps between them and slightly uneven, dull color — the cosmetic concern before veneers. Slow gentle drift across the front smile line." },
  ]},
  { title: "SOFT / LOW-BITRATE UPGRADES (same content, higher quality — 6)", clips: [
    { target: "bridge/step1.mp4", action: "3D medical animation. A close-up of a gap in the lower teeth flanked by two healthy teeth; the two neighboring teeth are gently shaped, then a connected three-tooth bridge (two outer caps joined to a middle replacement tooth) lowers as one piece and seats into place, filling the gap. Slow smooth move as the bridge seats." },
    { target: "braces/step1.mp4", action: "3D medical animation. A close-up of the upper front teeth, slightly crowded; small metal brackets sit on each tooth joined by a thin archwire, and over a smooth gentle time-lapse the teeth straighten into an even, aligned row. Slow steady push-in across the front teeth." },
    { target: "dentures/step1.mp4", action: "3D medical animation. A close-up of a smooth, toothless pink gum ridge; a full denture with lifelike teeth in a gum-colored base lowers onto the ridge and seats snugly into place, restoring a full row of teeth. Slow smooth settle as the denture seats." },
    { target: "gum_treatment/problem.mp4", action: "3D medical animation. A close-up of the lower gumline where the gums are red, slightly puffy and mildly inflamed, with some hardened tartar at the base of the teeth and a little gum recession — the gum disease before treatment. Slow gentle drift along the inflamed gumline." },
    { target: "crown/step2.mp4", action: "3D medical animation. An extreme close-up of a back tooth being gently shaped and rounded into a smaller core to receive a crown, its neighboring teeth in view, then a soft scan light passing over the prepared tooth. Slow orbit around the prepared tooth." },
    { target: "jaw_surgery/step1.mp4", action: "3D medical animation. A clean side-profile cutaway showing a lower jaw that sits too far forward (an underbite); the lower jaw is gently repositioned back into balanced alignment with the upper jaw so the teeth meet evenly. Slow smooth move as the jaw comes into alignment." },
  ]},
];

let out = "";
for (const g of GROUPS) {
  out += `\n\n========== ${g.title} ==========\n`;
  for (const c of g.clips) {
    out += `\n>>> ${c.target}\n${c.action} ${STYLE}\n`;
  }
}
const total = GROUPS.reduce((n, g) => n + g.clips.length, 0);
console.log(out);
console.log(`\n[${total} clips total]`);
