# Opera Redesign — Final Design Elimination Tournament

Judged against rendered output (desktop 1440×900 full-scroll screenshot passes + mobile 390×844 passes of all four concepts), not intentions. Nothing was protected because it took effort.

Concepts under judgment:
- **C1 — Clinical Cinematic** (`/concept-1-clinical-cinematic`)
- **C2 — Living Interface** (`/concept-2-living-interface`)
- **C3 — Editorial Science** (`/concept-3-editorial-science`)
- **C4 — Hybrid** (`/concept-4-hybrid`)

---

## Round 1 — Vibe-coded elimination

**Fails / kills:**
- **C2 Ask Opera question chips** — white pill chips floating above the answer surface. The one element on any page that could have come from a prompt that said "AI chatbot suggestion chips." **KILLED.** Replacement grammar: indexed question *tickets* (mono `Q-01` + question, hairline rules) as in C1/C4.
- **C2 hero frosted-glass tint moments** — the glass panel treatment behind the headline is fashionable-component glassmorphism. Survives only because the headline is actually left-set on solid ground; the glass is decoration. Downgraded, not killed: remove the blur panel, let the paper background carry it.
- **C4 hero ghost "See the platform" pill** — default rounded pill next to a designed primary. **KILLED** (fix applied: squared, tracked-mono, arrow-slide hover).
- **C1 inter-section black voids** — two ~600px stretches of pure black between sections read as unfinished, not cinematic pacing. Dead zones violate the system's own "no dead zones" rule. **KILLED in spec** (tighten to ≤160px breathing bands with a mono index rule line).

**Passes:** C1's monitor-wall tile grammar (labeled case plates, EKG traces, phase counters) is deliberate art direction; C3's entire figure/caption system is the opposite of vibe-coded; C4's dark→light sheet transition is a designed, ownable move.

## Round 2 — Interchangeability test (name removed)

- **C2 platform analytics tab**: with the logo covered, the KPI cards + sidebar could be a generic light SaaS dashboard for any vertical. The *content* saves it (case acceptance, watch rate, time-to-yes) but the *structure* doesn't. **REDESIGN mandate:** every C2-style analytics view must lead with patient faces/cases and treatments, not KPI tiles. (C4's intelligence tab partially fixes this; adopted there.)
- **C2 hero**: a light grid-of-cards hero exists at a dozen dev-tool startups. What makes it Opera is that the cards are *teeth, aligners, knees, live renders* — content, again, not structure. Survives on content; weakest structural survivor.
- **C1 hero**: could not belong to a fintech. A wall of clinical anatomy with case-file plates is category-locked. **Strongest Round 2 survivor.**
- **C3 whole page**: could belong to exactly one other kind of company — a design-literate scientific journal. That's an acceptable neighbor. Survives.
- **C4**: the serif-accent headline over a clinical video wall + consult ledger with verbatim patient questions is unmistakably this company. Survives.

## Round 3 — Visuals disconnected from the thesis

- **C1 closing CTA knee/gym live-action clip** — real-footage athletic B-roll inside a wall of 3D medical animation. Breaks the "medically-true rendering" promise. **KILLED** (spec: only 3D-rendered clips in walls; live-action photography is reserved for *photography sections*, never mixed into module walls).
- **C1 scan-reticle / crosshair decorative tiles** — borderline. They imply imaging Opera doesn't do. Keep ≤2 per wall as texture; more is cosplay. Trimmed.
- **C2 "LIVE rendering" shimmer card** — survives; it demonstrates the actual render pipeline.
- **C3 hand-drawn molar/arch SVG diagrams** — survive strongly; they demonstrate "we explain anatomy visually" in the site's own body language.
- All Problem→Treatment→Outcome tiles everywhere: survive. They ARE the product.

## Round 4 — Sections that need text to mean anything

- **C2 "Understanding, structured" header block**: hide the copy and the ledger still communicates (questions, signals, scores). Survives.
- **C1 Why section**: hide the copy — a PDF sinking into darkness while a video module glows. Meaning intact. **Best wordless section on any page.**
- **C3 decaying-transcript exhibit**: legible without copy (words visibly fading = forgetting). Survives.
- **C4 stat strip under hero CTAs** (`25+ CLINICS…`): numbers without claims; fine.
- **C2 closing CTA panel**: without its copy it's a white card on a blur. Weakest Round 4 survivor; survives only because CTA sections are allowed to be declarative.

## Round 5 — Visual overload without hierarchy

- **C1 hero**: 28 perceived tiles all drifting + grain + EKG pulses. The triple vignette rescues legibility (headline pool is genuinely dark), so it survives — but the spec caps it: **max 2 concurrent motion systems** (row drift + one breathing scale; kill per-tile pulses at hero level).
- **C2 hero on mobile**: FAILED — body copy collides with grid cards (screenshot evidence). On desktop the left-anchored headline gives a clear reading path; on mobile the grid must drop behind a solid scrim or below the copy. Killed as-shipped on mobile; desktop survives.
- **C4 hero on mobile**: same failure class (serif typing tile bleeding through subcopy). **Fix applied** (stronger center scrim, busiest tiles dimmed <md).
- **C3**: the most disciplined page; its risk is the opposite — the specimen wall sits *below* the headline, so the first viewport is 60% typography. Accepted as C3's identity.
- Reading-path spec for the winner: primary focal = headline; secondary = one bright wall tile at upper-right; scroll cue bottom-center; intensity beats at hero / Ask Opera / photo spread; clarity beats at Why and ledger.

## Round 6 — Fake product interactions

- **C2 chip-flight animation** (question chip flies into the answer surface): gorgeous, but no real product would animate a patient's question flying across the screen. It dramatizes the *website*, not the workflow. **KILLED as product metaphor, demoted to marketing flourish** — acceptable on the landing page only because the answer content is real; not to be echoed in the platform UI.
- **C1 OR-monitor status bar** (`08:42 · DR. CHEN · OP 3`): believable clinical context. Survives.
- **All Ask Opera answers**: survive Round 6 *because they cite sources* ("grounded in Maya's plan", "cited crowding-progression") — this is the exact mechanic that separates them from vague-AI-chat. The citation chip is mandatory in every future Ask Opera rendering.
- **C2 analytics sparklines**: survive — every number ties to patient behavior (watch rate, time-to-yes). Generic "revenue this week" charts would have died; none exist.
- **INTENT_ROWS data**: survives — fields are operational (hesitation_reason, likely_barrier, follow_up_outcome), not decorative. PT-8862 "no questions asked → flagged for TC call" is the single most convincing row on any page; feature it.

## Round 7 — Hero elimination

| Hero | Strongest 5s | Weakest 5s | Verdict |
|---|---|---|---|
| C1 monitor wall | First load: darkness resolves into a drifting wall of living anatomy — genuinely unforgettable | After ~20s the drift loops read as wallpaper; nothing invites the next scroll except the cue | **Survives — best pure image** |
| C2 living grid | The live-render card + counter animating amid real clips (product is alive) | Mobile collision; glass panel; grid can read as "portfolio wall of cards" | Survives desktop-only as structure; loses to C1/C4 |
| C3 specimen plate | Fraunces headline + red italic "visual" — best typographic moment of the whole exploration | The wall arrives below the fold; five seconds in, you've seen mostly (excellent) type | Survives as *editorial* hero; loses "instant overwhelm" criterion |
| C4 wall + serif accent | Wall + "Patients say *yes* to what they see." + the light sheet sliding over the dark world on first scroll — the transition IS the pitch | Nav mix-blend moments; mobile scrim (fixed) | **WINNER — image of C1, momentum into the page that C1 lacks** |

## Round 8 — Copy kills

Killed lines (with replacements):
- C2 "Personalized treatment videos, an AI that answers each patient…and the signal layer behind every yes" — 3 products in one breath. → *"Your patient's treatment, as a video they'll actually watch — and every question they ask afterward, answered and recorded."*
- C1 "See your patients' treatments the way they need to." (closing) — mushy. → kept C1's own better line: **"Show the treatment. Win the case."**
- C2 CTA reassurance "no setup required" — unprovable promise. → *"20 minutes · your cases, visualized"*.
- Banned-list scan: zero occurrences of "unlock/revolutionize/seamless/AI-powered/next-generation" across all four. Pass.

Survivors (canon copy):
- **"Patients say yes to what they see."** (hero, canonical)
- **"Patients forget 80% of what they hear. They remember what they see."** (why)
- **"The consult ends. The deciding starts at home."** (why, C2 — best line of the four pages; grafted into winner spec)
- **"Every patient leaves with questions. Opera answers them — visually."** (Ask Opera)
- **"The black box recorder for the consult."** (intelligence, C1 — grafted into winner)
- **"Show the treatment. Win the case."** (close)

## Round 9 — Typography verdicts

- C1 Instrument Sans: clean but anonymous at body sizes; the mono readouts do the identity work. Survives as *product* type, not display.
- C2 Space Grotesk: the most "2024 startup" choice on the board; competent, least ownable. **Eliminated from the final system.**
- C3 Fraunces: the single most distinctive typographic voice; full-serif everything is too journal for a software company. Survives as *accent*, not system.
- C4 Inter Tight + Instrument Serif italic accents + Plex Mono: the winning system — display carries authority, the serif italic gives Opera its signature ("one warm word per cold headline"), mono carries all data.

**Final system:** Display = Inter Tight 500–600, -2% tracking, ≤2 sizes per page (clamp 44–96px). Serif = Instrument Serif italic, only 1 word/phrase per display line, and pull quotes. Body = Inter 400, 17–18px/1.6, max 34em. Data/labels = IBM Plex Mono 400/500, 11–13px, uppercase tracked +0.25em for labels, tabular numerals for metrics. Product UI = same stack at 13–15px; patient names may take serif italic in headers only. Emphasis = serif italic or violet, never bold-on-bold.

## Round 10 — Color verdicts

- C1 cyan-on-black: superb on site; unusable as a full product (all-dark clinical software reads demo-ware to enterprise buyers). Cyan **eliminated** as brand accent; permitted only inside "console" set-pieces.
- C2 iris #4f46e5 + paper: credible, but indigo-on-white is the default AI-startup uniform. Eliminated as-is.
- C3 ivory/ink/oxide-red: the most distinctive palette; oxide red survives as the *editorial annotation color* inside the winner (figure numbers, footnote markers, at-risk states share the rust family).
- **C4 final system (winner):** base `#faf9f6` warm white / `#08090a` near-black dual-world; ink `#14161a`; bone `#f2efe8`; **accent #5b4fe8 violet** (matured heritage purple — earns its place from Opera's existing brand, not "AI = purple"); dark-context lifts `#8d83f2/#b3a7ff`; rust `#b4532a` = risk/at-risk only; states: success = ink-on-bone check (no green), caution = amber 600 sparingly, risk = rust. Clinical video content always sits on near-black plates regardless of section theme (protects the renders). Charts: violet primary, ink secondary, rust for at-risk — never rainbow.

## Round 11 — Motion kills

Killed: C1 per-tile EKG pulsing at hero (competes with row drift); C2 chip float-drift idle animation (motion without information); C2 hero column tilt on mobile (fights scroll); any marquee faster than 60s/loop.
Survivors (each with function): C4 hero row drift (abundance) + light-sheet slide-over (narrative: theater→daylight); C1/C4 PDF-sinks-module-brightens scroll binding (cause/effect); typing answers in Ask Opera (demonstrates generation); ledger row streaming (data accumulating); tab layoutId underline (workflow continuity); `prefers-reduced-motion` kill-switch everywhere (all four shipped it — pass).

## Round 12 — Sequencing verdict

C4's shipped order was: Hero → Why → Ask Opera → Intelligence → Platform → CTA. Two gaps: no human/emotional beat (all product, no patient-as-person) and no practitioner voice before the ask. **Final sequence (implemented):**
1. **Hero** (visual capability, dark)
2. **Why** (patient understanding — light, scrollytelling)
3. **Ask Opera** (interactive education — dark instrument inset)
4. **Journey** (patricia newborn photo — "Every video tells *a story*. The data tells the whole journey." Bridges emotion → data; earns the dataset section)
5. **Intelligence** (consult dataset ledger)
6. **Platform** (workflow tabs — trust through believability)
7. **Voices** (Dr. Zitterkopf quote over B&W surgical photography — proof from the mouth of a doctor, final trust beat)
8. **CTA** (dark return, Mayo Clinic plate → "See Opera *in action*.")
Each section hands the next its question: wall → "why does this matter?" → "what if the patient has questions?" → "whose story is this?" → "what do you learn?" → "what do I use daily?" → "who vouches?" → "book."

## Round 13 — Product-UI-as-dashboard-template kills

- C2 Overview tab KPI row: three stat cards up top = template DNA. **Killed**; the winner's Intelligence tab leads with the *needs-attention patient queue* (decisions), stats demoted to a side rail.
- C1 dark console: survives as brand set-piece; rejected as the shippable product direction (Round 10 reasoning).
- Navigation labels: "Overview/Education/Ask Opera/Intelligence/Patients" — patient-journey-oriented, not module-oriented. Pass.
- Winner's platform tabs (Education flow / Consult summary / Intelligence) each end in an action (Send to patient / Suggested next step / Re-engage): passes the "analytics without decisions" test.

## Round 14 — Site↔product coherence

C1 site/product perfectly coherent but both locked to dark (fails enterprise daylight test). C3's "instrument" is beautiful print, not software. C2's product is the most real but its site is the least distinctive — the mismatch is inverted. **C4 is the only direction where the same DNA (warm white, ink, violet actives, mono data, serif patient names, near-black video plates, 8px radius cap, hairline rules) plausibly ships as both the site and the actual app.** Shared DNA doc lives in Round 23.

## Round 15 — Implementation survivability

- All four pages already run on the real dev server with real assets: pass by construction.
- Video budget: worst page mounts ≈18 videos, all 1–5MB H.264, IntersectionObserver-paused. Pass; hard cap stays at 18.
- Killed on feasibility: any thought of literal 50×50 grids (2,500 cells), WebGL walls, scroll-jacked 3D. The perceived-abundance trick (≈14 videos + designed plates + duplication) ships today and reads as 30+.
- Photography sections: static JPEGs, `object-cover`, scrim gradients — zero risk. Unsplash imagery is placeholder-grade legally; **replace with owned/licensed clinical photography before production** (flagged, not blocking a prototype).
- Highest-risk element: C4's pinned-hero sheet transition (sticky + transform). Fallback: plain section break (already graceful — it's just sticky positioning). Mobile: transition simplified by shorter pin distance. Ships in v1.

## Round 16 — CTA/conversion verdict

Kills: C2's third CTA echo mid-page (two is right); "Explore the platform ↓" as a second CTA in hero — keep it but as a scroll cue, not a button peer.
Final conversion path: **Primary CTA "Book a demo"** (bone-on-dark / ink-on-light, arrow-slide hover, → `CALENDLY_URL` placeholder in `lib/concepts/shared.ts`, new tab). Appears exactly 3×: nav (persistent, quiet), hero (primary), closing (large, after Voices has built trust). Secondary: "See the platform" (in-page anchor, styled as tracked-mono text link). Closing adds the only reassurance line: "20 minutes · your cases, visualized." Mobile: nav CTA collapses to compact button; closing CTA full-width.

## Round 17 — Direct tournament

**Match 1 — C1 vs C2: C1 wins.** C2 is the better *product* page; C1 is the better *company* page. Memorability, thesis expression ("the wall IS the pitch"), and category-lock all favor C1. C2's structural genericity (Rounds 1/2/13) is disqualifying at the direction level. C2's platform preview and "The consult ends. The deciding starts at home." are extracted as grafts.

**Match 2 — C3 vs C4: C4 wins.** C3 is the most original artifact and the best typography of the four — but as a company's sole face it argues "journal," not "platform," and its product credibility ceiling is the lowest. C4 delivers 80% of C3's editorial discipline *plus* a cinematic hero *plus* the only believable product handoff. C3's grafts: oxide-red annotation grammar, FIG./plate captions, the pinned-specimen dataset row, photo-plate treatment.

**Final — C1 vs C4: C4 wins.** C1 is one perfect note; C4 is the song. C1 cannot go light without ceasing to be itself, and Opera's product must live in daylight. C4 opens with C1's theatrical register, then *proves* the company in light. The dark→light transition is itself the brand argument: from the cinema of treatment to the clarity of decisions. **Winner: C4 — Hybrid.**

## Round 18 — Imitation test (on C4)

- Serif-italic-accent-in-sans-display: adjacent to recent editorial-SaaS styling (Attio/Mercury territory). Differentiator: the italic word is always the *human* word ("yes," "a story," "in action") and can carry violet — codified so it's a semantic system, not a font trick.
- Light product frame with left nav: Linear-adjacent by necessity. Differentiators: warm paper (not gray-white), serif patient names, mono clinical data, near-black video plates inside the UI, violet used only as *state*, never as wash.
- Dark video-wall hero: nearest neighbor is film-studio/Palantir-ish walls; the case-file plates + phase tags (Problem/Treatment/Outcome) make it clinical-forensic instead of showreel.
- Mayo/CTA full-bleed with scrim: standard prestige move (every institution site) — earned here by *actual* institutional photography and mono captioning; keep captions (`MAYO CLINIC · ROCHESTER, MN`) to make it documentary rather than stock-mood.
- Verdict: no element summarizable as "Opera, but designed like X." Pass with the codifications above.

## Round 19 — Screenshot test (static, per section, winner)

Pass: hero (composition holds frozen), Why exhibits, Ask Opera instrument (reads as a designed console even without typing), ledger + expanded annotated row (best static frame on the site), platform tabs, Voices spread, CTA plate.
Failed → fixed: mobile hero frame (copy collision — fixed with scrim); "schema ribbon" marquee frozen mid-scroll reads as clipped text — acceptable, but the ribbon gets a fade-mask at both edges so any freeze-frame looks intentional.

## Round 20 — Five-second test (winner)

A first-time visitor sees: dark wall of clinical animation + "Patients say *yes* to what they see." + Book a demo. They get: healthcare ✓, visual education ✓, personalization (case-file plates: `PT-4821 · CROWDING`) ✓, visually exceptional ✓. Likely misreads, and fixes: (a) "is this a video-production agency?" — countered by the intent-signal readout and Ask-Opera tiles *inside the wall* (platform evidence at second zero) and the stat strip (`25+ CLINICS · $420M+ ANALYZED`); (b) "dental only?" — countered by the knee/ACL anatomy tile kept top-right in the wall.

## Round 21 — Founder critique (10 harshest, resolved)

1. "The hero headline is a claim, not a proof." → The wall behind it is the proof; the case-plates carry real module names.
2. "Dark→light gimmick." → It's the argument (theater→clarity); if it ever tests poorly, the fallback cut is clean.
3. "Ask Opera answers are too polished to be real." → Every answer carries grounding citations + escalation note ("clinical questions route to the practice").
4. "The dataset section is a privacy grenade." → All rows synthetic + labeled (`patient data shown is synthetic`), and the section sells *structure*, not surveillance; hesitation fields are framed as care follow-ups.
5. "Doctors will ask 'where's the ROI?'" → Zitterkopf spread carries the two hard stats; platform Intelligence tab shows time-to-yes.
6. "It's five products on one page." → Sequence is one story: show → answer → learn → operate; each section's artifact is the previous one's output.
7. "Unsplash photos aren't ours." → Flagged Round 15; swap-list written; layout doesn't depend on specific images.
8. "Too long." → 7 beats + CTA ≈ 8.7k px — median for the genre; every beat survived Rounds 3–5, nothing is filler.
9. "Mobile was an afterthought." → Mobile passes run and fixes shipped; hero scrim + stacked spreads verified.
10. "Can our actual app ever look like this?" → The platform preview uses only shippable primitives (tables, tabs, cards, video plates) — it's a restyle target, not concept art.

## Round 22 — Elite panel (on winner)

- **Brand designer** — strongest: serif-italic human-word system; weakest: nav wordmark is plain text (design a proper wordmark next); push further: the violet — own a more specific hue (slightly warmer, e.g. #5b4fe8 → #5d4ae0 family) and name it.
- **Product designer** — strongest: needs-attention queue as the analytics centerpiece; most derivative: left-nav frame; remove: the browser-chrome dots on product frames (toy signal); push: the Education-flow builder (Problem→Treatment→Outcome strip) is the most ownable product surface — make it the default tab.  → **Adopted: default tab = Education flow; chrome dots removed in spec.**
- **Motion designer** — strongest: sheet slide-over; most fragile: mix-blend-difference nav (kill it — use per-section nav theming); push: give the wall one "conducted" moment — a 2s synchronized dim where a single tile spotlights, then release. (Backlog, not v1.)
- **Creative director** — least resolved: Journey ↔ Intelligence handoff copy; the line that fixes it: "One patient's story, told well, wins a case. Ten thousand, structured, is a category." (added to copy deck)
- **Frontend engineer** — most fragile: sticky-pin hero on iOS Safari toolbar collapse; de-risk: pin distance in `svh`, transition tested at 0.9 dpr; everything else is transforms/opacity. Ship.

## Round 23 — Final design system (Opera)

**Core idea:** *The theater of treatment, the clarity of decisions.* Dark is where treatment is shown; light is where decisions are made; violet is the thread of intelligence between them.
- **Type:** Inter Tight (display, 500/600), Inter (body), Instrument Serif italic (the human word; pull quotes; patient names in product headers), IBM Plex Mono (all data, labels, captions, timestamps). Scale: 12/14/17/22/28/40/56/80. Labels: mono uppercase +0.25em.
- **Color:** `#faf9f6` paper / `#08090a` void / `#14161a` ink / `#f2efe8` bone / **`#5b4fe8` violet** (interactive + intelligence; lifts `#8d83f2`,`#b3a7ff` on dark) / `#b4532a` rust (risk + editorial annotation) / amber-600 caution. Video/clinical renders always on void plates. No gradients as decoration; gradients only as scrims over imagery.
- **Grid/spacing:** 12-col, 80–96px section padding (max 160px between beats — dead-zone rule), 8px spacing base.
- **Surfaces:** paper sections flat; elevation via one soft layered shadow max; radius: 8px product elements, 2px plates/media, 0 on photography; hairlines `ink/8` (light) `bone/10` (dark).
- **Buttons:** primary = solid bone-on-dark / ink-on-light, 14px mono tracked label, arrow slides +4px on hover; secondary = tracked-mono underline link. No pills. No outlines-as-primary.
- **Medical visual treatment:** 3D renders untouched on void plates with mono caption rails (`FIG.`-style optional); photography always scrimmed (dark 40–70%) with mono location captions; never mix live-action into module walls.
- **Data viz:** violet/ink/rust only; bars+sparklines preferred; every chart ends in an action; tabular mono numerals.
- **Motion:** ease `[0.22,1,0.36,1]`; 0.6–1.2s reveals (opacity/y only); marquees ≥60s; one narrative transition per page (the sheet); `prefers-reduced-motion` disables loops.
- **Iconography:** lucide at 1.5px stroke, sparse; mono glyphs (● ◐ ○ ▲) for signal states.
- **Voice:** short declaratives; verbs over adjectives; patient-verbatim in serif italic quotes; ban-list per Round 8.
- **Never:** light-gray SaaS gradients, pill badges, purple-to-blue washes, glassmorphism panels, rainbow charts, stock-photo smiling-dentist imagery, chat bubbles for Ask Opera, KPI-card-first dashboards, all-dark product UI.
- **A11y/perf:** text contrast AA on scrims (pre-darken imagery), focus rings violet 2px, ≤18 mounted videos, posters for LCP, images `object-cover` with explicit aspect boxes.

## Round 24 — Final page (implemented at `/concept-4-hybrid`)

1. **Hero — The Wall.** Purpose: instant category lock. H: "Patients say *yes* to what they see." Sub: one sentence. Wall: 13 clips + 8 designed plates, 3 drift rows; mobile: 2 columns, heavy center scrim. CTA: Book a demo + See the platform (anchor). Exit: light sheet slides over (signature).
2. **Why — The Gap.** Scrollytelling: 3 claims / sticky exhibits (fading transcript · dead PDF vs living module · phone at home). Message: the case is lost between consult and couch. Mobile: inline exhibits.
3. **Ask Opera — The Instrument.** Dark inset console; question tickets → typed grounded answers + cited module clip. Message: education continues after hours, safely.
4. **Journey — The Story.** *(new)* Newborn B&W half-plate + "Every video tells *a story*. The data tells the whole journey." + journey rail (first visit → outcome) annotated with what Opera captures at each stop. Emotional beat that reframes data as care.
5. **Intelligence — The Record.** Ledger of consults (verbatim questions, signals, scores) + one pinned annotated row + schema ribbon. Message: a proprietary dataset of how patients decide.
6. **Platform — The Instrument, Daily.** Tabbed product frame (Education flow default · Consult summary · Intelligence). Message: this ships.
7. **Voices — The Proof.** *(new)* B&W surgical photography half-spread + Zitterkopf quote + two hard stats. Message: doctors already run on this.
8. **CTA — The Return.** Dark Mayo plate, "See Opera *in action*.", one button, one reassurance line, colophon footer.

## Round 25 — Final platform UI direction

Structure: patient-journey-first, five nav items (Consults · Education · Ask Opera · Intelligence · Patients). Home = **today's consult queue** with intent glyphs, not KPI tiles. Patient view = consult record: plan steps, sent modules with watch data, Ask-Opera correspondence log (answers show grounding chips), engagement timeline rail, suggested next action card. Education = flow builder: Problem→Treatment→Outcome module strip from the library + personalization checks + send rail (SMS preview). Intelligence = needs-attention queue first; aggregate trends (acceptance by treatment, time-to-yes, hesitation taxonomy bar chart) second; every row expands to the same annotated-record grammar as the site. Tables: hairline rules, mono IDs, serif verbatim quotes, signal glyphs; charts per Round 23; empty states = one mono line + one action ("No consults yet today — prepare this afternoon's education flows"); loading = hairline shimmer (no skeleton-card confetti); errors = ink text + retry, never toasts stacking. Tablet: nav collapses to icon rail; consult record becomes single column with sticky action bar. Remove entirely: standalone "Analytics" module, KPI-first overview, chat-bubble Ask UI, notification bells with red dots.

## Round 26 — Final copy deck (winner)

Nav: `Opera` · Why visual · Ask Opera · Intelligence · Platform · [Book a demo]
Hero: **Patients say *yes* to what they see.** / "Opera turns every treatment plan into a personalized visual experience — and every consult into intelligence." / [Book a demo] [See the platform]
Stats: `25+ CLINICS · $420M+ CLINICAL REVENUE ANALYZED · 40+ VISUAL MODULES`
Why: **The consult ends. The deciding starts at home.** claims: "Patients forget 80% of what they hear." / "Nobody watches a PDF." / "The decision happens on the couch, with the family."
Ask Opera: **Every patient leaves with questions. Opera answers them — visually.** / "Not a chatbot. Every answer is grounded in the patient's own treatment plan and cites the visual their doctor would reach for." Questions: canonical five (wait 6 months / hurt / why now / recovery / options).
Journey: **Every video tells *a story*. The data tells the whole journey.** / "One patient's story, told well, wins a case. Ten thousand, structured, is a category." Rail: FIRST VISIT · DIAGNOSIS · UNDERSTANDING · DECISION · TREATMENT · OUTCOME.
Intelligence: **Every consult becomes intelligence.** / "The black box recorder for the consult — every question, hesitation, and replay becomes signal." Field labels: patient_id · treatment_type · consultation_stage · primary_question · hesitation_reason · viewed_visual_modules · engagement_score · intent_signal · likely_barrier · follow_up_outcome.
Platform: **A console built around the patient, not the software.** Tabs: Education flow · Consult summary · Intelligence. Metrics: Case acceptance · Avg watch rate · Time to yes.
Voices: "I can explain a case for twenty minutes — or my patient can watch their own treatment in ninety seconds. They say yes to what they see." — DR. JACOB ZITTERKOPF · ORTHODONTIST · OPERA LIGHTHOUSE PRACTICE. `CASE ACCEPTANCE +14 PTS · TIME-TO-YES −38%`
CTA: **See Opera *in action*.** / "A 20-minute demo — your treatment plans, visualized live." / [Book a demo] / `20 MINUTES · YOUR CASES, VISUALIZED`
Footer: Opera · opera@getopera.ai · © 2026 Opera AI

## Round 27 — Final answer

**Winning direction: C4 — Hybrid** (`/concept-4-hybrid`). No hedge.

**Five strongest elements:** 1) The living wall hero with case-file plates (C1→C4) — real pipeline output as the brand image; competitors without a render pipeline cannot fake the abundance. 2) The dark→light sheet transition (C4) — the thesis as motion; trivially copied mechanically, meaningless without the dual-register system behind it. 3) The annotated intent ledger with pinned specimen row (C3+C4) — turns "we have data" into visible, operational structure. 4) Grounded Ask Opera instrument (all→C4) — citation chips + escalation notes make it credible where every AI-chat section elsewhere is vapor. 5) The photography beats (Journey/Voices/CTA — user-directed) — institutional gravity no dashboard company carries.

**Five weakest, eliminated:** C2 chip pills (generic AI-chat grammar → indexed tickets); C1 dead black voids (→160px max rule); C1 gym live-action clip in the wall (thesis break → 3D-only walls); C2 KPI-card-first analytics (→ needs-attention queue first); C4 ghost pill button (→ designed secondary).

**Final hero:** as Round 24.1 — 13 clips/8 plates/3 drift rows, serif-accent headline, sheet exit; mobile 2-col + scrim; posters for LCP; ≤16 videos mounted.

**Most original visual idea:** the consult ledger as an annotated specimen record (footnoted verbatim patient questions). **Strongest conversion idea:** Zitterkopf spread immediately before the CTA. **Strongest interactive section:** Ask Opera instrument. **Strongest data viz:** intent ledger. **Strongest mobile adaptation:** C3's stacked specimen plates (grammar adopted for winner's mobile wall). **Most expensive-looking element:** the hero wall. **Highest implementation risk:** pinned-hero transition on iOS — de-risked via svh units + clean non-sticky fallback. **The element Opera should own:** the living wall of patient-specific treatment visuals — "the wall" should become synonymous with Opera demos.

**Kill list (standing):** pill badges/chips; purple-blue gradient washes; glassmorphism; chat bubbles for AI; KPI-card dashboards; rainbow charts; stock smiling-patient photography; all-dark product UI; icon-grid feature sections; centered three-column SaaS blocks; "unlock/seamless/revolutionize/AI-powered" copy; motion without information; default rounded-blue buttons; skeleton-card confetti loaders.

**Immediate build plan:** *48h:* winner route is live with all 8 beats (done in this prototype); founder review of sequence + photography. *Week 1:* real wordmark; owned photography shortlist; poster frames for all wall clips; mobile QA sweep; content pass replacing synthetic stats with cited ones. *Validate before polishing:* 5-second test with 3 doctors + 3 non-medical civilians; does the wall read "your patients" or "stock library"? *No placeholders allowed for:* Zitterkopf quote (get his real words + permission), clinic stats, the CALENDLY_URL. *Placeholders fine for:* Unsplash photography (until licensed), synthetic ledger rows (labeled). *Founder approval needed:* final headline pair, violet hue, whether Journey's newborn image ships externally. *Do not engineer yet:* WebGL wall v2, CMS, the "conducted wall" moment, production analytics.

**Final recommendation:** Build getopera.ai on **Hybrid**. Take from C1 the wall grammar and "black box" framing (taken); from C3 the annotation/figure grammar, oxide-red accent role, and photo-plate treatment (taken); from C2 the platform tab structure and "The consult ends…" line (taken). Rebuild from scratch: nothing — grafts are integrated. Remove completely: everything on the kill list. The visual idea Opera should own: **the living wall — treatment, rendered per patient, en masse.**
