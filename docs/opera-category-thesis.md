# What Opera Should Become

**A category thesis, 30 company-level concepts, and an elimination tournament**
*Prepared July 2026. No code. No tickets. One question: what category should Opera own?*

---

## 0. Stress-testing the core thesis before accepting it

The proposed thesis: healthcare has clinical records, claims records, and transactional records, but no record of what happened inside the patient's mind. Opera could own that record.

Attempt to disprove it:

**Disproof 1 — The observability objection.** You cannot record a mind. Self-report is systematically unreliable: patients say "cost" when they mean distrust, say "I need to think about it" when they mean "I don't believe I need this," and perform agreeableness toward anyone associated with the clinic. A "patient understanding record" built on asking patients questions is a survey company with better fonts, and survey companies are bad businesses.
*What survives:* the record must be **behavioral and inferred, not self-reported** — what the patient watched, rewatched, skipped, calculated, shared, asked, and failed to do, in the days after a recommendation. Behavior in the decision window is observable. Minds are not.

**Disproof 2 — The selection objection.** The patients who matter most — the silently disengaged ones who never start treatment — are exactly the ones least likely to interact with anything you send. The record will systematically cover the patients who were going to comply anyway.
*What survives:* two things. First, Opera's actual engagement base rates in dental (SMS-delivered, personalized, money-on-the-table decisions) are high enough that this is an attenuation problem, not a fatal one. Second, and more important: **non-engagement is itself the signal.** "Opened, watched to the fee section, stopped, never returned" is a different — and more actionable — fact than "never opened." The shape of silence is only observable by the party doing the outbound. But the objection stands as a boundary condition: the thesis weakens as the decision becomes lower-stakes and the delivery channel becomes colder. It is strongest immediately after a consequential, expensive, elective recommendation. That defines where Opera should and should not go.

**Disproof 3 — The actionability objection.** Suppose you capture perfect decision intelligence. Clinics have no analyst. Hospitals have no staff slack. Pharma has a warehouse of unread market research. Insight without an attached action is a report, and reports get churned.
*What survives:* every concept below is required to ship the intervention with the intelligence — the same system that detects the barrier delivers the counter-move and measures whether it worked. Anything that ends in "…and then the buyer sees a dashboard" is killed in Section 15.

**Disproof 4 — The substitute objection.** Pharma already commissions patient journey research. Hospitals run HCAHPS and Press Ganey. Call centers record calls. Patient portals log messages. The mind-of-the-patient category is not empty.
*What survives:* every substitute is retrospective, recall-based, small-n, and — critically — **unlinked to the clinical event and unlabeled by outcome.** A focus group of 30 patients recalling why they declined an implant two years ago is a different asset class from 10,000 pending-case decision windows observed prospectively, each labeled with whether the case actually started. The pitch is not "we know what patients think." The pitch is "we observe the decision while it is still open, and we know how it ended."

**Disproof 5 — The privacy objection.** Psychological data linked to identity is more radioactive than clinical data. One story about "dental startup sells patient fear scores" ends the company.
*What survives:* the data must be captured **as care delivery** (under BAA, on behalf of the provider, to help this patient make this decision) and monetized in identified form only inside that care relationship. Aggregate and de-identified uses come later and only with explicit architecture. This is a constraint, not a disproof — but it kills any concept whose first dollar comes from selling identified intent to a third party.

**Disproof 6 — The moat objection.** If the value is generating good explanations, that is a commodity within 24 months. Epic, Weave, NexHealth, Align, and every PMS can bolt an LLM onto their messaging.
*What survives:* the generation layer is indeed indefensible. The moat must be built deliberately from three things incumbents cannot shortcut: (1) the **outcome-labeled corpus** — millions of explanation → behavior → started/didn't-start triples; (2) the **taxonomy** — a standard vocabulary of why care doesn't happen; (3) the **benchmark network** — cross-practice comparability that makes the metrics contractually meaningful. Time and position, not model quality.

**Verdict on the thesis:** it survives, but only in a narrowed and stronger form.

> Opera should not claim to record the patient's mind. Opera should own the **decision window** — the observable interval between a clinical recommendation and the patient's action or inaction — and produce the **Patient Decision Record**: a prospective, behavioral, outcome-labeled record of that window.

And one reframe that matters more than anything else in this document:

> **The video was never the product. The video is the sensor.** Opera has spent two years building distribution for an instrument it has not yet turned on. 130,000 delivered decision-window experiences is not a content business — it is the largest deployed fleet of patient-decision sensors in dentistry, currently running with telemetry mostly discarded.

---

## 1. The missing data layer: 26 signals healthcare routinely loses

Rule for inclusion: a signal is **economically actionable** (not merely interesting) only if it (a) arrives while the decision is still open, (b) reaches a person who can act, and (c) carries an implied action. Signals failing that test are marked *interesting-only*.

| # | Lost signal | Moment it's generated | Why existing systems miss it | Who'd pay | Decision it changes | Capture mode | Opera's edge |
|---|---|---|---|---|---|---|---|
| 1 | **Post-consult treatment intent** (probability this case starts) | 0–14 days after consult | Nothing observes the patient at home; PMS records silence identically for "deciding" and "gone" | Practice, DSO | Which cases the TC works today, and how | Prospective, behavioral, event-linked, de-identifiable in aggregate | Already owns the window via delivered experiences |
| 2 | **The real objection behind "I need to think about it"** | At consult close and in the 72h after | Patients don't disclose to the person selling; staff record "thinking about it" verbatim | Practice, DSO, manufacturers | The content and channel of the next touch | Inferred from what patient engages/avoids | The experience can present multiple framings and observe which one the patient works through |
| 3 | **Financing pain threshold** | During and after fee presentation | Embarrassment; nobody asks "can you afford this" and gets truth | Practice, financing companies | Payment structuring, financing offer timing | Behavioral (payment-option dwell, calculator use) | Instruments live inside the experience |
| 4 | **Who actually decides** (household graph) | At home, after the consult | Clinic sees only who attended | Practice | Who receives the follow-up and with what framing | Behavioral (share events, second-device views) + conversational | Share/forward telemetry is native to a link-delivered experience |
| 5 | **Comparison shopping in progress** | Days 2–14 post-consult | Completely invisible; patient never says it | Practice, DSO | Urgency, price response, doctor call-back | Inferred (question types, engagement timing) | Only the outbound layer sees the pattern |
| 6 | **Understanding delta** (what was said vs. what patient believes) | Immediately post-explanation | Nobody re-tests; teach-back is rarely done, never recorded | DSO, hospital risk, med affairs | Re-education, consent defensibility, staff coaching | Structured (embedded concept checks) | Opera holds both sides: the case record and the patient's demonstrated understanding |
| 7 | **Procedure fear / anxiety level** | Post-consult, at home | Not charted honestly; patients mask it in person | Practice | Sedation offer, framing, who calls | Inferred + conversational | Patients disclose to an experience what they won't say to staff |
| 8 | **Trust in this provider** | Accumulates across touches | Unmeasured everywhere | DSO, health system | Escalate to doctor call vs. TC text; provider coaching | Inferred, longitudinal | Requires longitudinal touchpoints — Opera has them |
| 9 | **Questions that emerge after leaving** | 24–72h post-visit | No channel exists; patients Google instead | Practice, med affairs, content strategy | Next-touch content; the education itself | Conversational — the richest corpus | Embedded Q&A at the moment of need |
| 10 | **Cancellation intent before the cancellation** | Days before the appointment | Systems record cancellations after the fact | Practice, periop, infusion centers | Preemptive outreach; slot backfill | Behavioral (prep-engagement collapse) | Silence telemetry — see Section 10 |
| 11 | **Prep comprehension / readiness** (colonoscopy, surgery) | The week before | Nobody verifies; call centers check boxes | Hospital periop, GI, ASCs | Day-of completion vs. cancellation | Structured checks | Verified comprehension is Opera's core mechanic |
| 12 | **Referral intent after PCP recommendation** | At and after the referral moment | PCP never learns what happened; specialist never knew the patient existed | Health system service lines | Which referrals get navigation resources | Prospective, behavioral | Deployable per service line without EHR surgery |
| 13 | **Why a prescription is never filled** | The pharmacy-pickup window | Claims show absence, not cause | Pharma brand, patient services | Support-program design, launch strategy | Prospective; must be event-linked | Needs a medical channel — edge is conditional (see §5) |
| 14 | **Treatment-burden signals before discontinuation** | Weeks 2–12 of therapy | Claims lag 60–90 days; portals are silent | Pharma patient services, specialty pharmacy | Intervention timing | Behavioral + conversational | Same conditional edge |
| 15 | **Expectation vs. experienced outcome gap** | After treatment completes | Surveys are late, generic, unlinked | Practices, med affairs, HEOR | Counseling scripts, education content, RWE | Prospective pre/post pairs | Opera captures the "expected" half at decision time — nobody else has the baseline |
| 16 | **Side-effect anticipation vs. actual tolerability** | Pre-start and weeks in | Anticipated fear never recorded; mild AEs never reported | Pharma med affairs, PV | Education design; AE signal | Conversational; has PV implications | Conditional |
| 17 | **What the patient read elsewhere and believed** | Post-visit information-seeking | Invisible to every system | Med affairs, practices | Counter-messaging in the education | Conversational | Patients volunteer it when asked at the right moment |
| 18 | **Message-level conversion attribution** (which explanation flipped which patient) | Across the recovery sequence | Nobody links message → outcome | DSO, and eventually everyone | Content strategy per patient segment | Behavioral + outcome-labeled | **Opera's single most defensible signal** — it requires owning both the intervention and the outcome feed |
| 19 | **Consent comprehension at signature** | Pre-procedure | Signature ≠ understanding; nothing is verified | Hospital risk, ASCs, med-mal insurers | Proceed / re-consent; litigation defense | Structured, timestamped | Verified teach-back is a small extension of current mechanics |
| 20 | **Why eligible patients decline trials** | At the consent conversation | Sites record "declined," nothing more | Sponsors, CROs | Protocol amendments, site selection | Prospective, conversational | Contained pilots possible (§8) |
| 21 | **Trial burden between visits** | Continuous during participation | Site sees patients only at visits | Sponsors | Retention spend targeting; dropout prediction | Behavioral + structured | Same mechanics as #14 |
| 22 | **Caregiver comprehension and capacity** | Discharge, chronic care, pediatric ortho | Charts record the patient only | Health systems, practices | Discharge plan, follow-up intensity | Behavioral (who actually engages the material) | Household graph (#4) generalizes |
| 23 | **Hidden demand** (wants treatment, blocked) | Dormant after a decline | Declined cases go to a PMS graveyard | Practice, manufacturers, lenders | Reactivation targeting; market sizing | Inferred, longitudinal | The declined-case archive plus barrier codes is unique |
| 24 | **Provider communication-quality variance** | Every consult | Unobservable at scale today | DSOs, health systems | Training, staffing, compensation | Inferred from patient-side outcomes (#6, #18) | Opera measures the output of communication, not recordings of it |
| 25 | **Price sensitivity by treatment × geography × segment** | Aggregate of #3 across cases | Nobody holds consult-level denominators | Manufacturers, DSOs, PE acquirers | Pricing, product mix, M&A diligence | Aggregate, de-identified | Requires scale; structurally exclusive once reached |
| 26 | **The moment intent flips** (decision timing) | Asynchronous, unpredictable | Follow-up runs on staff schedules, not patient state | Practice, everyone downstream | *When* to reach out — operationally the most valuable single bit | Behavioral, real-time | Only the layer holding the live channel can see it |

**Which are interesting-only:** #17 and #24 in isolation (they become actionable only when bundled with an intervention); #25 before scale. Everything else passes the actionability test in at least one buyer context.

**The pattern across all 26:** they are generated in the same place — the window between recommendation and action — and they are lost for the same reason: every incumbent system is built to record *what the institution did*, and goes silent the moment the patient walks out. The gap is structural, not accidental. That is what makes it a category rather than a feature.

---

## 2. Thirty company-level concepts

Format per concept: thesis → broken workflow → user/buyer/trigger → patient & provider experience → data → action → economics → MVP → integration → distribution → defensibility → failure mode → **brutal verdict**.

### Dental & orthodontics (8)

#### D1. Intent Radar
**Thesis:** Every pending case should carry a live intent score and a coded barrier, so follow-up becomes triage instead of guesswork.
**Broken workflow today:** Consult ends without a same-day yes → case goes into a PMS "pending" list → TC calls down the list alphabetically or by memory, days late, with a generic script → 40–60% of diagnosed treatment never starts and nobody knows which cases were saveable.
**User:** Treatment coordinator. **Buyer:** Practice owner / DSO ops. **Trigger:** Any consult that doesn't close same-day.
**Patient experience:** Exactly what Opera already delivers — a personalized post-consult experience via SMS link. No app. The difference is invisible to the patient: the experience is fully instrumented (chapters watched/rewatched/skipped, fee-section behavior, payment-calculator interaction, share-to-spouse events, embedded questions, concept-check answers, response latency, silence shape).
**Provider experience:** A Monday-morning queue: 11 pending cases ranked by recoverable value × flip probability, each with a barrier code ("F1: financing shock — spouse hasn't seen the plan") and a one-tap recommended action with pre-drafted content. Zero new data entry; ground truth (scheduled/started) flows back from the PMS automatically.
**Data generated:** The Patient Decision Record — the outcome-labeled decision-window corpus. Signals #1, #2, #4, #5, #18, #26.
**Action created:** TC works the right case at the right moment with the right counter-move instead of dialing the list.
**Economic value:** Direct production recovery. Opera has already demonstrated $2.5M recovered; this multiplies yield per pending case and per TC hour.
**MVP:** Turn on telemetry for the existing 25 clinics (the sensors are already deployed); heuristic scoring v1 from the 130k-video corpus; queue delivered as a morning email/SMS digest before any UI exists.
**Integration path:** Greyfinch-embedded queue → PMS write-back → the Decision Record becomes a PMS-native object (I1).
**Distribution:** Existing customers → Greyfinch's 320-clinic umbrella → DSOs.
**Defensibility:** Outcome-labeled corpus (models trained on proprietary interactions), workflow ownership of the follow-up lane, PMS embedding, and eventually the benchmark network.
**Failure mode:** TCs ignore the queue because it lives in another tab. Mitigation is non-negotiable: it must arrive inside the PMS or as a push digest, never as a destination.
**Verdict: Venture-scale, and the platform seed.** This is the wedge deepened into infrastructure.

#### D2. Consult Grade
**Thesis:** DSOs grade production per provider but have never been able to grade the thing that drives it — whether the consult created understanding.
**Broken workflow:** DSO leadership suspects location 14's TC is weak; the only evidence is lagging acceptance rate, confounded by case mix and demographics. Coaching is anecdote-driven.
**User:** DSO clinical/ops leadership. **Buyer:** DSO. **Trigger:** Every consult (passive — no new patient behavior required).
**Patient experience:** Unchanged. The grade is computed from the delta between the case record and what the patient demonstrably understood in the existing post-consult experience (#6), plus the objection typology surfaced per provider (#2, #24).
**Provider experience:** Location and TC-level scores: Created Understanding, Barrier Resolution, case-mix-adjusted acceptance. Delivered as a monthly ops review artifact, not a live dashboard.
**Data:** Communication-quality outcomes per provider — the first measurement of consult quality via its *output* rather than call recordings.
**Action:** Training, staffing, comp design, script changes; A/B evidence for what to change.
**Economics:** A 5-point acceptance-rate spread between a DSO's best and worst locations is worth millions; today it's unexplainable, therefore unmanageable.
**MVP:** Retroactive: compute on existing corpus for one DSO's locations. Sellable on data Opera already exhausts.
**Integration/distribution:** Rides on D1 deployments; sold as the DSO tier.
**Defensibility:** Benchmarks — the scores only mean something against Opera's cross-network distribution.
**Failure mode:** Staff hostility (measurement reads as surveillance). Sell as location-level coaching first, individual-level later.
**Verdict: Good business as a module; becomes important as the benchmark layer (D7).**

#### D3. The Household Graph
**Thesis:** Ortho and high-ticket dental decisions are made by households, not patients; map the real decision unit.
**Mechanics:** Distinct experiences per decision participant (parent: finance/safety framing; teen: appearance/duration; spouse: the fee walkthrough), share-event telemetry reveals who the real decider is and where the plan stalls (#4, #22).
**Verdict: Feature of D1, not a company.** Fold in. (Killed in tournament R1.)

#### D4. Silent Sticker Shock
**Thesis:** Detect financing blockage behaviorally — without asking a single embarrassing question — and resolve it at the moment of hesitation.
**Broken workflow:** Patient balks at $6,200, says "I'll think about it," is too embarrassed to say "I can't afford the down payment." Practice has a CareCredit brochure at the desk. The two never meet.
**User:** Patient, then TC. **Buyer:** Practice; secondarily financing partners (Cherry/Sunbit/CareCredit) via origination revenue share. **Trigger:** Fee-section behavior indicating financing blockage (#3).
**Patient experience:** The experience presents payment framings; when behavior signals affordability blockage, a pre-qualified soft-pull financing offer appears *inside the experience*, framed by the practice.
**Provider experience:** None until the patient accepts financing — then a scheduled case appears.
**Data:** Price-elasticity curves per treatment × market × segment (#3, #25).
**Action:** Payment restructuring at the moment of hesitation instead of never.
**Economics:** Practices recover cases; Opera earns SaaS + origination share — revenue on cases that would otherwise be $0 for everyone.
**MVP:** One lender partnership, one treatment type (ortho), triggered offers vs. static-link control.
**Defensibility:** Weak alone (lenders are commoditized); strong as a D1 module — the moat is *knowing when* to present the offer, which requires the intent model.
**Failure mode:** Feels predatory if mis-tuned; must be practice-branded, patient-initiated on click, never pre-approved spam.
**Verdict: Good business as a monetization module of D1.** Not standalone.

#### D5. Shop Detector
**Thesis:** Detect comparison shopping (#5) and arm the practice at the decisive moment.
**Verdict: Feature of D1.** The signal is real and valuable; it is one column in the Intent Radar queue, not a company. (Killed R1.)

#### D6. Aligner Demand Atlas
**Thesis:** Aligner, implant, and dental-device manufacturers see their own shipments; nobody sees the consult — the moment their product wins or loses.
**Broken workflow:** Align Technology spends heavily on consumer demand-gen, then goes blind between the consult and the lab order. Why did 40% of aligner-candidate consults end in braces, or nothing? They commission panels; panels recall poorly.
**User/buyer:** Manufacturer strategy, marketing, and sales ops (Align, Angel, Ormco, Straumann, Nobel, Dentsply). **Trigger:** Quarterly aggregate data licensing.
**Patient experience:** None beyond D1; data is aggregate and de-identified, with explicit practice consent for licensing.
**Data:** Consult-level choice sets, objection distributions, offered vs. accepted price points, education-content conversion by product — the consult denominator (#23, #25).
**Action:** Pricing, rep targeting, patient-education investment, product positioning.
**Economics:** Manufacturers pay seven figures for far worse panel data.
**MVP:** One anonymized "State of the Aligner Consult" report from existing corpus as a door-opener.
**Defensibility:** Structural — only the party at recommendation-moment scale can produce the denominator.
**Failure mode:** Selling data before workflow scale poisons practice trust and yields thin datasets. Sequencing risk, not concept risk.
**Verdict: Venture-scale data business, sequenced strictly after D1 reaches thousands of practices.** (Parked in tournament R5, revived as the monetization endgame.)

#### D7. The Opera Index
**Thesis:** A cross-network, case-mix-adjusted benchmark of treatment acceptance and communication quality — the Nielsen of the dental consult.
**Buyer:** DSOs, PE firms doing roll-up diligence ("communication-quality audit" of acquisition targets), manufacturers.
**Verdict: Not a startable company; an emergent layer that D1+D2 scale produces.** The interesting move: publish it, so the industry denominates in Opera's metrics. (Parked R9 as emergent.)

#### D8. Start Guarantee
**Thesis:** Price per recovered start. Opera stops selling software and starts underwriting case acceptance.
**Mechanics:** Opera's 130k-corpus priors let it price recovery risk per case type — an underwriting edge no entrant can match. Contract: baseline start-rate audit → Opera takes X% of production from incremental starts on a randomized-holdout basis.
**Economics:** Converts a $500/mo SaaS conversation into a "we found you $310k last year, we kept $46k" conversation.
**Failure mode:** Attribution disputes; requires the holdout discipline most vendors avoid.
**Verdict: Not a company — a pricing weapon for D1, and possibly the most important go-to-market decision in this document.** (Folded R7.)

### Hospitals & specialty care (6)

#### H1. Closed Loop
**Thesis:** The most expensive, most litigated failure in ambulatory care is the abnormal finding that never gets followed up; own the loop between result and procedure.
**Broken workflow:** Positive FIT/Cologuard, incidental lung nodule, abnormal mammogram → order placed → patient never schedules → 30–50% non-completion in many systems → missed cancers, malpractice exposure, lost procedure revenue. Today: a portal message the patient ignores and a navigator with a 400-row spreadsheet.
**User:** GI/imaging navigator. **Buyer:** Service line chief (GI first) + quality/risk; department-level purchase, physician champion = GI chief or CMO-quality. **Trigger:** Weekly flat file of open orders — begins entirely outside the EHR.
**Patient experience:** SMS link → a personalized, literacy-matched explanation of *their* result and why the colonoscopy matters, prep demystified, barrier capture (prep fear, cost, transport, "I feel fine") with immediate counters (prep alternatives, cost estimate, scheduling help). No app, no portal login.
**Provider experience:** Navigator receives a ranked queue: risk × recoverability, with coded barriers; unresolved high-risk cases escalate. Replaces the spreadsheet; adds no charting.
**Data:** Completion-barrier codes linked to result severity (#11, #12, #26) — a dataset with quality, risk, *and* RWE value.
**Action:** Navigators work the right patients; systems fix systemic barriers (e.g., prep-fear dominates → change prep protocol messaging).
**Economic value:** Each completed colonoscopy ≈ $2–3k facility revenue plus downstream; one prevented missed-cancer claim pays for years of the product; completion rates feed quality scores.
**Measurable result justifying procurement:** Randomized within-system holdout, completion-rate lift at 90 days.
**Why Epic can't just do it:** Epic's answer is a MyChart message — portal-gated, generic, unmeasured, and already failing (that's why the problem exists). Opera's asset is explanation quality + barrier capture + a persuasion corpus built at dental scale, purchasable by a service line without an IT megaproject.
**Failure mode:** Hospital sales cycle; must be sold departmentally with a 90-day paid pilot, or it dies in procurement.
**Verdict: Venture-scale. The bridge market from dental to medicine.**

#### H2. Cancellation Radar
**Thesis:** Day-of surgical cancellations (5–8% of elective cases, ~$4–8k of OR time each) are mostly preventable and detectable a week early.
**Mechanics:** Opera runs the 10-day pre-op journey; readiness telemetry (prep concept checks, ride confirmation, engagement collapse = #10, #11) produces a wobble score at T-7 and T-3; periop nurse queue + backfill lead time.
**Buyer:** Periop services director. **MVP:** One service line (ortho or GI endoscopy), flat-file schedule feed.
**Failure mode:** Crowded periop-vendor space; pre-op call centers see it as turf. Differentiator: earlier detection + measurement, positioning the call center as the consumer of Opera's queue.
**Verdict: Good business, not exceptional.** (Killed R10 as a standalone; survives as an H1 sibling module.)

#### H3. Leak Map
**Thesis:** Specialty-referral leakage is a CFO-legible number ($100M+/yr at large systems); intent capture at the referral moment (#12) tells you which referrals will leak and why.
**Verdict: Real, but mechanically identical to H1 with a weaker trigger event.** Fold into the Closed Loop platform as a second use case rather than a separate company. (Merged R6.)

#### H4. Consent Ledger
**Thesis:** A signature proves nothing; a timestamped, verified comprehension record before consent is both better medicine and litigation armor.
**Mechanics:** Pre-procedure Opera experience teaches, then verifies via structured teach-back (#19); output is a comprehension certificate attached to the consent. Threshold not met → flagged for human re-consent *before* the procedure — which makes the record pure defense, answering the "discoverable liability" objection.
**Buyer:** Hospital risk management, ASCs; the contrarian channel is med-mal insurers (see X6).
**Failure mode:** Legal conservatism; procurement measured in years.
**Verdict: Seductive and possibly category-defining on a 5-year horizon; wrong as a next step.** (Killed R10 for now; revisited in Section 10.)

#### H5. Discharge Echo
**Thesis:** Post-discharge comprehension → readmission reduction.
**Verdict: Kill.** Crowded (dozens of readmission vendors), penalty salience declining, engagement realism poor (discharged patients are the coldest audience), and disconnected from Opera's elective-decision DNA. (Dead R2.)

#### H6. ED Reroute
**Thesis:** Post-ED discharge follow-up completion and in-system steerage.
**Verdict: Kill.** Same engagement-realism problem, weaker buyer urgency. (Dead R2.)

### Pharma & biotech (5)

#### P1. First-Fill Forensics
**Thesis:** 20–30% of new prescriptions are never filled; pharma sees the absence in claims but never the reason. Capture the reason at the decision moment, attached to an intervention.
**Broken workflow:** Physician prescribes → patient nods → patient never picks up → brand team sees NBRx-to-fill gap → commissions market research that reports back in 5 months with recall-based guesses.
**User:** Patient (via prescriber's clinic or specialty pharmacy). **Buyer:** Brand team + patient services. **Trigger:** New prescription in a partnered channel.
**Patient experience:** Unbranded disease/treatment education experience at prescription moment; captures comprehension, fear, cost concern, belief (#13, #16, #17); delivers counters (copay programs, administration walkthrough).
**Provider experience:** None — the channel partner (clinic network or specialty pharmacy) triggers it.
**Data:** The Barrier Ledger — reason-coded non-initiation, outcome-labeled by fill data.
**Action:** Redesign of patient-support programs; field-medical targeting; label-education strategy.
**Economics:** For a specialty drug, each recovered initiation is worth $20k–200k+/yr in revenue; brand teams have existing budget lines (patient support, launch, market research) to raid.
**Adverse-event implications:** Patient interactions sponsored by pharma create AE-intake obligations — build automated AE detection with 24h forwarding SOPs. Cost, but also a feature sponsors need.
**Promotional risk:** Branded content requires MLR review; start unbranded.
**Why not market research:** Panels are recall-based n=500 claimed behavior; this is real prescribed patients, observed prospectively, outcome-labeled.
**Why RWD vendors can't:** Claims and EHR structurally cannot contain the reason — the patient was never asked at the moment it existed.
**Failure mode: the channel.** Opera has no medical prescriber network today. This concept is gated on H1-style medical distribution or a specialty-pharmacy partnership.
**Verdict: Venture-scale, sequenced after a medical footprint exists.** (Parked R8.)

#### P2. Launch Tower
**Thesis:** For the first 12 months post-approval, brand teams steer a $200M launch by staring at lagging Rx data; Opera provides the leading indicators — comprehension, fear distribution, coverage confusion — from real prescribed patients, weekly.
**Buyer:** Launch/brand team (largest discretionary budget in pharma). **Deliverable:** Weekly war-room brief + segment playbooks + an intervention arm with measured lift.
**Verdict: The best pharma-facing *productization* of P1's infrastructure.** Same channel gate. (Parked R8 with P1.)

#### P3. Drop Signal
**Thesis:** Detect specialty-drug discontinuation 60–90 days before it appears in claims, from burden telemetry (#14).
**Buyer:** Patient services / specialty pharmacy.
**Verdict: Good; a P1 sibling, not separate.** (Merged R6.)

#### P4. Belief Audit
**Thesis:** Map what patients actually believe about mechanism, administration, and side effects for med affairs.
**Verdict: Kill as standalone — interesting-not-must-have; med affairs buys it once, doesn't renew.** Survives as a P2 deliverable. (Dead R5.)

#### P5. Hub Leak Forensics
**Thesis:** Reason-coded abandonment during prior-auth/copay enrollment (confusion vs. cost vs. fear).
**Verdict: Good business but services-shaped; hub vendors will absorb it.** (Dead R7.)

### Clinical trials (3)

#### T1. Decline Debrief
**Thesis:** Half of trial-eligible patients decline and sites record one word: "declined." Sponsors redesign $500k protocol amendments blind.
**Mechanics:** After the consent conversation, coordinator sends an IRB-approved plain-language Opera experience → captures comprehension + concerns + decision reason (#20).
**Buyer:** Sponsor clin-ops / CRO. **Minimum pilot:** One site, one study, one indication; deliverable = decline-reason ledger + per-site comprehension scores.
**Economics:** Cost per enrolled patient runs $20–50k+; a 10% improvement in consent-to-enrollment conversion at a 20-site study is a seven-figure value.
**Failure mode:** IRB latency; trial sales cycles.
**Verdict: Good business; credible category ("trial comprehension layer"); slow.** (Parked R8 — requires medical presence and patience.)

#### T2. Burden Telemetry
**Thesis:** Between-visit burden signals predict dropout (replacement cost ~$40k+/patient); sites see patients only at visits.
**Verdict: Good; merges with T1 as one trial product.** (Merged R6.)

#### T3. Protocol Echo
**Thesis:** Protocol deviations from misunderstanding, caught by comprehension checks.
**Verdict: Feature of T1/T2.** (Dead R1.)

### Real-world-data platforms (3)

#### R1. Context Link
**Thesis:** Attach Opera's patient-reported decision context to a clinical-data spine (Truveta) via tokenized, consented linkage — giving RWD the "why" column it structurally lacks.
**Mechanics:** Health systems deploying Opera (starting with H1) capture decision context as care delivery; consented, de-identified, tokenized (Datavant-style) linkage to the clinical record.
**Verdict: The right long-term partnership architecture; premature until Opera has a medical footprint.** Dental data is worthless to Truveta. (Parked R3; see §6 and the call notes.)

#### R2. The Missing Denominator
**Thesis:** Every RWD asset on earth is conditioned on care having happened. The recommended-but-declined population — the denominator — is invisible in claims and EHR by construction, and it is the scarcest dataset in real-world evidence.
**What it enables:** True eligible-patient funnels; selection-bias correction for comparative-effectiveness studies; market sizing pharma currently guesses at; health-equity analyses of *who* declines and why.
**Buyer:** Pharma HEOR/RWE, eventually regulators.
**Verdict: The strongest proprietary-data opportunity in this document — as the endgame of D1/H1 scale, not a company to start Monday.** (Parked R9.)

#### R3. Question Network
**Thesis:** Prospective RWE without sites: sponsors pose questions; Opera asks the right patients at the right clinical moment across its deployed network.
**Verdict: The ten-year version of R2. Not startable directly.** (Dead R3 in current form.)

### Consumer healthcare platforms (3)

#### W1. Pocket Record
**Thesis:** A patient-owned longitudinal decision history.
**Verdict: Kill.** Consumer-health graveyard; no engagement loop; violates the app-download prohibition in spirit. (Dead R2.)

#### W2. Comprehension API
**Thesis:** Invisible infrastructure: a consumer-health platform POSTs visit context; Opera returns a personalized explanation experience + a webhook of comprehension/intent telemetry.
**Buyer:** Consumer platform (SaaS + per-interaction API pricing). Opera is invisible; the platform owns the patient relationship; liability controlled by education-only scope + escalation flags (W3) + the platform's clinicians in the loop.
**Why not a general-purpose model:** the platform can generate text with GPT; it cannot generate *measured comprehension against a benchmark corpus* — that's the sale.
**Failure mode:** Commoditization of the generation layer; defensibility rests entirely on measurement + benchmarks.
**Verdict: Good business; right shape for Wally-type partnerships; not the core.**

#### W3. Escalation Sense
**Thesis:** Post-visit signals that a patient's state needs clinician outreach.
**Verdict: Feature of W2 (and its liability answer).** (Dead R1.)

### Infrastructure & APIs (2)

#### I1. The Decision Record + Barrier Codes
**Thesis:** ICD-10 codes exist for every disease; **no code exists for why treatment never happened.** Publish the standard: a schema for {recommendation, comprehension, intent, barrier codes[], resolution, outcome} and an open taxonomy of barriers — then be the reference implementation.
**Mechanics:** Opera authors Barrier Codes v1 from its corpus (the only corpus that can ground them empirically); the Decision Record becomes an object PMSs store (Greyfinch first), DSO contracts denominate in, manufacturers license against, and — eventually — EHRs adopt.
**Why incumbents can't copy:** a standard without a corpus is a whitepaper. Opera's taxonomy is validated by outcome labels at scale.
**Verdict: Category-defining — as the *form* the winning company takes, not a separate startup.** This is what D1 becomes.

#### I2. Render + Measure API
**Thesis:** Any healthcare software embeds Opera generation + measurement via API.
**Verdict: Standalone, it's a commodity racing LLM progress. Bundled with I1's benchmarks, it's the delivery mechanism.** (Dead R4 as standalone.)

---

## 3. Reinventing dental & orthodontic intelligence

The strategic inversion for dental: Opera today is priced and perceived as a *conversion tool* (per-clinic SaaS that recovers cases). The concepts above assemble into an *industry intelligence layer* in four stages:

**Stage 1 — The sensor fleet (now).** Instrument what's already deployed. Every one of the 130k delivered experiences was a sensor running with telemetry discarded. Zero new distribution needed.

**Stage 2 — The triage layer (D1 + D4 + D8).** Intent scores, barrier codes, timed recovery, financing resolution, success-fee pricing. This is where "predicting which cases will not start," "the real reason behind 'I need to think about it'," "detecting financing sensitivity without embarrassing the patient," "identifying comparison shopping," and "recovering cases at the exact moment intent changes" all live — as one product, not five.

**Stage 3 — The measurement layer (D2 + D7).** Consult grading, explanation-conversion attribution by patient type ("which explanations convert which patients"), location benchmarking, the longitudinal trust graph (#8). This is what turns questions into operational changes: when 30% of declined implant cases code as "fear of surgical procedure," the practice changes its consult script, and Opera measures whether the change worked.

**Stage 4 — The industry layer (D6 + I1 + R2).** The consult-denominator dataset licensed to manufacturers, financing companies, and insurers; Barrier Codes as the standard; the declined-case archive as the hidden-demand map.

**Channel mapping (as requested):**

| Concept | Direct to practice | DSO | PMS-embedded | Manufacturer license | Creates the proprietary decision dataset | Standard-setting potential |
|---|---|---|---|---|---|---|
| D1 Intent Radar | ✔ (with D8 pricing) | ✔✔ | ✔✔ (Greyfinch first) | — | ✔✔ (core) | ✔ |
| D2 Consult Grade | weak | ✔✔ | ✔ | — | ✔ | ✔ |
| D4 Sticker Shock | ✔ | ✔ | ✔ | lenders | ✔ (elasticity) | — |
| D6 Demand Atlas | — | — | — | ✔✔ | consumes it | ✔ |
| D7 Opera Index | — | ✔ | — | ✔ | consumes it | ✔✔ |
| I1 Decision Record | — | ✔ | ✔✔ | ✔ | is it | ✔✔✔ |

The PMS-embed decision matters most: **a Decision Record object living natively in Greyfinch is the single highest-leverage integration Opera can build** — it makes Opera's data model part of the system of record for 320 clinics, which is how standards start.

---

## 4. Hospitals & health systems

Applying the required screens to the failure points explored:

| Direction | Buy level | Physician champion needed | Starts outside EHR? | Procurement-justifying metric | Value type | Why it isn't another ignored message | Why Epic can't reproduce it |
|---|---|---|---|---|---|---|---|
| **H1 Closed Loop (abnormal-finding completion)** | Department (GI/imaging service line) + quality | Yes — GI chief or CMO-quality | Yes — weekly flat file of open orders | Completion-rate lift vs. randomized holdout, 90 days | Revenue + risk + quality simultaneously (rare) | It's not a reminder — it's an explanation matched to the patient's literacy + barrier capture + a navigator queue | Epic's tool is a MyChart message: portal-gated, generic, unmeasured — the current failure, not the fix |
| **H2 Cancellation Radar (surgical/endo cancellation)** | Department (periop) | Helpful, not required | Yes — schedule feed | Day-of cancellation-rate reduction | Revenue (OR utilization) | Readiness is *verified*, not assumed from a checked box | Epic has no wobble model and no persuasion corpus |
| **H3 Referral leakage** | Service line / CFO | Yes | Yes | In-system completion rate for targeted referrals | Revenue | Intent captured at referral moment, not discovered in claims 6 months later | Same |
| **H4 Consent Ledger** | Central (risk/legal) | No — risk officer champion | Yes | Claims defense value; teach-back documentation rate | Risk | It gates the procedure rather than messaging after it | Epic could copy mechanics but has no comprehension benchmark; still, procurement kills this for now |
| Discharge comprehension / readmission | Central | Yes | Partially | 30-day readmission | Penalty avoidance | **It would be another ignored message — that's why it dies** | Crowded vendor field |
| Post-ER leakage | Central | Yes | Yes | Follow-up completion | Revenue | Cold audience, weak claim | — |

The hospital conclusion: **enter through one service line with a revenue-and-risk-fused problem and a flat-file deployment. That is H1, GI first.** Everything sold "centrally" or requiring EHR integration on day one dies in the 18-month procurement swamp. H1's holdout-measured 90-day pilot is the only believable hospital motion for a company of Opera's size.

---

## 5. Pharma & biotech, by department

Pharma is nine buyers wearing one badge. Mapping patient-side intelligence to the *specific decision each department must make*:

| Department | Decision they can't currently make well | Opera deliverable | Must-have or interesting? |
|---|---|---|---|
| **Brand/commercial** | Why NBRx doesn't convert to fills; where launch uptake stalls | P2 Launch Tower: weekly reason-coded barrier feed from real prescribed patients + intervention lift | Must-have during launch window; interesting otherwise |
| **Patient services** | Which support programs to build; who needs which support | P1 Barrier Ledger + triggered support routing | Must-have (they own a budget for exactly this and fly blind) |
| **Market access** | Whether abandonment is price, coverage confusion, or fear | Reason-split of cost-coded abandonment (confusion vs. true affordability) | Must-have — changes copay-program design worth $10M+ |
| **Medical affairs** | What patients misunderstand about MOA/administration | Belief Audit (P4) as a Launch Tower module | Interesting alone; renews only inside P2 |
| **Clinical development** | Why eligible patients decline trials; where burden causes dropout | T1/T2 | Must-have per-study; slow |
| **RWE/HEOR** | Selection bias in every observational study; true denominators | R2 Missing Denominator | Must-have once it exists; nobody else can make it |
| **Pharmacovigilance** | (Obligation, not opportunity) | AE auto-detection + 24h forwarding SOP | Table stakes for every concept above |
| **Field medical** | Which HCPs' patients misunderstand what | Aggregate comprehension maps by territory | Interesting; privacy-sensitive; deprioritize |

Cross-cutting compliance reality, stated once: any pharma-sponsored patient interaction creates **AE-reporting obligations** (build the SOP; it's also a selling point), **promotional-risk constraints** (unbranded first; branded content = MLR review), and **sponsorship disclosure** to the patient. None of these are fatal; all of them are why a hub vendor's chatbot can't casually do this.

Why pharma buys this instead of market research: research panels deliver *recalled, claimed* behavior from paid participants months later; Opera delivers *observed, outcome-labeled* behavior from actual prescribed patients during the decision. Why existing RWD vendors can't provide it: the reason a patient didn't fill was never recorded anywhere — you cannot mine what was never captured.

**The honest gate on all of it:** Opera has no medical prescriber channel today. Pharma revenue is real but sequenced behind a medical footprint (H1) or a specialty-pharmacy partnership. Do not sell pharma decks before the channel exists.

---

## 6. Truveta and real-world-data platforms

What is absent from even a 100M-patient clinical dataset: everything in Section 1. Truveta can tell you a patient was prescribed a GLP-1 and that refills stopped at week 9. It cannot tell you whether that was cost, nausea, injection fear, "I hit my goal weight," or a TikTok about muscle loss — because no clinical system ever asked at the moment the answer existed. **RWD has a superb "what" and a structurally empty "why."**

Partnership structures, evaluated:

| Model | Who deploys | Who pays | Patient relationship | Consent/linkage | What Truveta gains | What Opera gains | Realistic? |
|---|---|---|---|---|---|---|---|
| A. Opera as patient-interaction layer at Truveta member systems (H1 deployments feeding decision context) | Health system | System pays Opera SaaS; pharma pays Truveta for enriched data | Provider owns it; Opera under BAA | Point-of-care consent; tokenized de-identified linkage | A data type no competitor has | Medical distribution into 30+ systems | **Most realistic — but gated on H1 proving itself in 1–2 systems first** |
| B. Opera as disease-specific prospective registry (e.g., GLP-1 discontinuation reasons) | Jointly, at volunteer member systems | Pharma sponsors the registry | Provider | Study-specific consent | A flagship differentiated product to sell life-sciences | Anchor revenue + medical entry | **The right first joint study** — one indication, 2–3 systems, n≈2–5k |
| C. Opera as study-execution tool Truveta resells | Truveta's life-science customers | Pharma via Truveta | Varies | Per-study | Prospective-research capability without building it | Channel | Plausible after B |
| D. Federated question layer (R3) | Everywhere | Sponsors | Distributed | Federated | The endgame | The endgame | Not yet |

Why Truveta partners instead of building: their asset and organizational muscle is health-system data plumbing and governance, not patient-facing interaction design — and their member systems would resist Truveta itself messaging patients. A neutral care-delivery layer (Opera, under the *system's* brand and BAA) is the only architecture members accept.

What makes it unrealistic today: Opera's corpus is dental. Truveta has no dental data and pharma doesn't buy dental. **A Truveta partnership is a distraction if pursued as a data deal now; it is exactly right if pursued as a design partnership** — co-author the Barrier Code schema and the linkage architecture now, run study B when H1 gives Opera its first medical deployments. Where Opera should sell directly instead: everything dental (manufacturers, DSOs, lenders — Truveta adds nothing), and early pharma launch work where a direct brand-team relationship is faster.

*(Concrete talking points for the next Truveta call are in Appendix A.)*

---

## 7. Wally and consumer healthcare platforms

The trap to refuse: building or powering a "general AI health companion." Companions have no moment. Opera's entire edge is that it activates at a *clinical event* with *real case context*.

What a consumer platform actually lacks and cannot easily build:

1. **W2 Comprehension API (invisible infrastructure).** The platform sends visit/plan context; Opera returns a personalized explanation experience and — the part a general-purpose model cannot fake — *measured comprehension and intent telemetry benchmarked against Opera's corpus*. The platform's clinicians see "this member does not understand their statin plan and doesn't intend to fill it" as a routable signal. Payment: per-interaction API + SaaS floor; outcomes pricing once fill/attendance data flows back. Liability: education-only scope, no diagnosis or triage, escalation flags route to the platform's own clinicians. Why patients engage: it arrives from *their* care team about *their* visit — not a wellness nudge.
2. **Cross-provider decision continuity.** The consumer platform is the only actor positioned across disconnected providers; Opera's Decision Record gives it a schema for "what was recommended, what was understood, what was decided, what's still open" across all of them. Opera as record-keeper, invisible.
3. **Pre-visit preparation from actual records** — the same engine run forward: what to ask, what the likely recommendation means, arriving the day before a specialist visit.

Proprietary data generated: the first *longitudinal, cross-provider* decision records — which is the one axis clinic-side deployment can never reach. That makes a Wally-type partnership strategically interesting beyond its revenue: it extends the corpus in the dimension (time × providers) that clinic deployments can't.

Why the platform wouldn't just use GPT: it can — for text. It cannot conjure the benchmark corpus that makes "comprehension = 34th percentile for this plan type" a meaningful, routable number. Sell the measurement, give away the prose.

---

## 8. Clinical trials

The category name worth owning: the **trial comprehension and burden layer** — sponsors currently observe enrollment and dropout as binary events with zero explanatory data attached.

The one product (T1+T2 merged): consent-moment comprehension verification and decline-reason capture, plus between-visit burden telemetry predicting dropout. What sponsors cannot currently observe and would pay for: why eligible patients say no (changes protocol amendments costing ~$500k each and site-selection models), which burden components drive dropout (changes visit schedules and retention spend), and whether consent comprehension varies by site (an inspection-readiness and ethics asset).

**Minimum pilot, precisely:** one sponsor, one phase-III study, one site. IRB-approved plain-language post-consent-conversation experience; coordinator sends one link; deliverables in 90 days = decline-reason ledger, comprehension distribution, dropout-risk flags. No EHR/EDC integration; a coordinator and a spreadsheet suffice.

Verdict unchanged from Section 2: good business, real category, slow clock. Do it opportunistically when a sponsor pulls, don't push.

---

## 9. Cross-industry platform concepts

Rejecting the sample names and keeping only what earned its way through Sections 1–8, the platform stack has one primitive and three expressions:

**The primitive Opera owns: the outcome-labeled decision window.** No other party — not the EHR, not the PMS, not claims, not the portal, not call recordings — holds intervention + patient behavior + verified outcome for the same clinical recommendation.

**Expression 1 — The Patient Decision Record (I1).** The record type. Wedge: dental pending cases in Greyfinch. Second market: H1 abnormal-finding loops. Third: pharma initiation (P1/P2). Flywheel: every decision window improves the intent models and grounds the taxonomy; every outcome label improves attribution; every new vertical reuses the schema. APIs: write (create a decision record from a clinical event), read (queue/queries), subscribe (intent-flip webhooks). The standard it establishes: **Barrier Codes — the ICD of why care doesn't happen.** Incumbents can't copy it because a taxonomy without an outcome-labeled corpus is a whitepaper. It becomes unavoidable the day a DSO contract, a manufacturer license, or a quality program first *denominates* in it.

**Expression 2 — The persuasion-attribution corpus (D1→R2).** Which explanation moves which patient to which action — the only dataset of its kind, and the asset that still matters if LLMs become free (generation commoditizes; *knowing what works* doesn't).

**Expression 3 — The Missing Denominator (R2).** The recommended-but-declined population as an RWD asset class. This is the expression pharma and RWD platforms eventually pay for, and it falls out of Expressions 1–2 as exhaust.

One stack, one company. Everything else in this document is a room in this building.

---

## 10. Uncomfortable contrarian ideas

**X1. Grade the doctor, not the patient.** (D2 pushed to its limit: consult-quality scores in TC compensation and DSO acquisition diligence.) Sounds wrong: surveillance of clinicians by a vendor. May be right: DSOs already comp on production — the *output* of communication — while the communication itself goes unmeasured; measuring the actual lever is more honest than the status quo, and PE diligence teams will pay for it tomorrow morning.

**X2. Underwrite the outcome.** (D8: abandon SaaS pricing; charge per recovered start against a randomized holdout.) Sounds wrong: services revenue, attribution fights, risk on Opera's book. May be right: Opera's corpus gives it a *pricing* edge — it can estimate per-case recovery probability better than anyone, which is literally what underwriting is. Competitors selling seats cannot follow without the data.

**X3. Sell the absence of care.** (R2.) Sounds wrong: "your dataset is people who didn't do things." May be right: denominators are the scarcest object in RWE; every observational study currently limps around selection bias that only this data can correct.

**X4. The consent shield sold through malpractice insurers.** (H4 via carriers: premium credits for procedures with verified-comprehension consent records.) Sounds wrong: insurers move glacially; a comprehension record could be discoverable both ways. May be right: failure-to-inform is a recurring allegation in claims; carriers already discount for risk controls; the gating design (no procedure until threshold met) makes the record pure defense — and insurer distribution bypasses hospital procurement entirely.

**X5. Comprehension as a vital sign.** Push a documented understanding score toward quality-measure status (Joint Commission teach-back guidance is the toehold), then be the meter. Sounds wrong: standards take a decade. May be right: Press Ganey built a large company owning a mandated measurement; whoever owns the measure owns the market for improving it.

**X6. Silence telemetry as the product.** Score patients by the *shape* of what they didn't do (opened-then-stopped-at-fee ≠ never-opened). Sounds wrong: selling missing data. May be right: non-engagement shape is plausibly the strongest single predictor of non-initiation, and only the outbound layer can observe it — claims and EHR see nothing at all.

**X7. The patient-language observatory.** License the de-identified corpus of how real patients phrase fear, confusion, and belief — to med affairs, and as *evaluation data* to everyone building clinical LLMs. Sounds wrong: data side-hustle. May be right: every health-AI team is desperate for realistic patient-misunderstanding evals; Opera manufactures them as exhaust.

**X8. The decision simulator.** Predict which framing flips which patient *before sending* — counterfactual persuasion modeling. Sounds wrong: manipulation engine. May be right, under one published constraint: **optimize only for verified comprehension and attendance; measure acceptance but never optimize on it.** That constraint is both the ethics answer and a marketing asset. Clinicians already do intuitive framing selection; making it evidence-based and comprehension-bounded is an improvement, not a corruption.

**X9. The intent exchange, defanged.** Blocked demand (#23) matched to solutions — but *only* within the originating practice/DSO and only patient-initiated. Sounds wrong: lead-selling. The defanged version is right: reactivating a practice's own declined cases when the barrier resolves (financing improves, fear content lands) is demand recovery, not lead-gen. The identified-third-party version stays on the kill list.

**X10. The QA layer for everyone else's AI.** As scribes and agent-mediated communication flood clinics, someone must verify that AI-mediated communication produced *understanding*. Sounds wrong: parasitic meta-product. May be right: it's the irreversible trend (Section 13) — communication volume explodes, verification becomes the bottleneck, and Opera already owns the verification mechanic.

**X11. Refuse the app forever.** An operating principle as a moat: commit publicly to zero-download, message-native delivery permanently. Sounds wrong: "serious platforms have apps." Is right: engagement realism is the graveyard of every competitor; the discipline compounds.

---

## 11. Demo-first thinking: the ten strongest, as demos

Ten screens each, compressed to the load-bearing line. Every demo ends with an **ultimatum screen** built the same way: *here is the specific thing you cannot currently see, here is what that blindness cost you last quarter in your own numbers, and here is why your current systems are structurally incapable of seeing it.*

**1. Intent Radar (D1).** ① Overview: "$84,300 of diagnosed treatment is deciding right now — here's each case's live intent." ② Patient: the familiar Opera experience (nothing new — that's the point). ③ Provider: Monday queue, 11 cases ranked, each with barrier code + one-tap counter-move. ④ Intelligence: a single case's decision timeline — watched twice, stopped at fee, shared to spouse Tuesday 9pm, intent flipped Wednesday. ⑤ Action: "send the spouse-framed fee walkthrough now" → sent. ⑥ Longitudinal: this quarter's pending cohort flowing from grey (silent) to green (started) or coded red. ⑦ Economics: recovered production ledger vs. randomized holdout. ⑧ Integration: it's a tab inside Greyfinch. ⑨ Benchmark: your start rate vs. case-mix-matched network. ⑩ **Ultimatum:** "Last quarter, 63 cases went silent. Your PMS recorded all 63 identically: 'pending.' 22 were recoverable the week they wobbled. That was $147k. You had no way to know which 22 — and next quarter you still won't."

**2. Consult Grade (D2).** ①–⑨ Location scorecards; the star exhibit is one consult: what the chart says was explained vs. what the patient demonstrably understood (34%). ⑩ **Ultimatum:** "You compensate on production. Production is downstream of understanding. You have never once measured understanding. Location 14 isn't unlucky — and you can't prove it, so you can't fix it."

**3. Silent Sticker Shock (D4).** Star exhibit: the fee-section replay — three visits to the payment calculator, entered $150/mo, plan requires $260, went silent. ⑩ **Ultimatum:** "31 patients this quarter told you exactly what they could afford — with their fingers, not their mouths. Nobody was listening. Your financing partner converted 4 of them for a competitor."

**4. Aligner Demand Atlas (D6, for a manufacturer).** Star exhibit: the consult funnel your shipment data amputates — 100 aligner-candidate consults → 38 chose you, 21 chose braces, 41 chose nothing, each branch reason-coded. ⑩ **Ultimatum:** "You spend $9 on demand generation for every $1 you can see past the consult door. Your entire strategy team is optimizing the 38% you already won."

**5. Closed Loop (H1).** Star exhibit: a positive-FIT patient's barrier capture — "I feel fine, and my cousin said the prep is horrible" — countered in-line, colonoscopy completed day 12. ⑩ **Ultimatum:** "412 abnormal results are open right now. Historically ~150 will never close. Two of those are statistically a cancer you already found and will be sued for missing. Your navigator's spreadsheet cannot tell you which 150 — Opera's queue is showing them to you on this screen."

**6. Cancellation Radar (H2).** Star exhibit: T-7 wobble flag on a knee replacement (prep checks failed, ride unconfirmed, engagement collapsed) → nurse call → case saved. ⑩ **Ultimatum:** "You lost 214 OR hours to day-of cancellations last year — $1.1M — and your pre-op call center marked every one of those patients 'confirmed.'"

**7. Consent Ledger (H4).** Star exhibit: side-by-side consent artifacts — a signature dated 6:47am day-of vs. a timestamped teach-back record from 5 days prior. Which do you want in front of a jury? ⑩ **Ultimatum:** "Your consent process produces signatures, not understanding, and your claims history prices that in. This is the first consent record that defends itself."

**8. Launch Tower (P2).** Star exhibit: week-9 launch brief — "fill-rate stall is not access: 44% of non-initiators code as needle-fear + 'my doctor seemed unsure.' Coverage confusion is only 18%. Your copay budget is aimed at the wrong barrier." ⑩ **Ultimatum:** "You will spend $200M on this launch steering by data 90 days old that contains no reasons. Your competitor's patients are misunderstanding the same things — whoever sees it first owns the category narrative."

**9. Missing Denominator (R2, for HEOR).** Star exhibit: the same comparative-effectiveness study run twice — with and without the declined-patient denominator — reaching different conclusions. ⑩ **Ultimatum:** "Every observational study you've submitted is conditioned on care having happened. You know this. Regulators are starting to know it. This is the only dataset that fixes it."

**10. Decline Debrief (T1).** Star exhibit: site-level map — Site 07's decliners didn't understand randomization; Site 12's cite visit burden; your amendment addresses neither. ⑩ **Ultimatum:** "You paid $38k per enrolled patient and recorded one word — 'declined' — for the half you lost. The reasons were free. You just never asked at the moment they existed."

---

## 12. The internal attack team

**Hospital CFO:** "Patient-engagement vendors promise ROI and deliver dashboards." — Kills anything sold as engagement. H1 survives only because it's sold as *completed procedures and closed risk loops with a randomized holdout*; Discharge Echo and ED Reroute die here permanently.
**Physician:** "More work, more alerts." — Forces the design law: Opera adds zero charting, arrives inside existing tools, and only ever *removes* items from human worklists. Intent Radar as a separate tab dies; as a Greyfinch tab it lives.
**Patient:** "Why would I interact?" — Kills Pocket Record and any wellness-shaped touch. Survivors share one shape: it's from *my* provider, about *my* pending decision, with money or health on the table, one tap away. That's also why non-engagement remains informative (X6).
**Health-system CIO:** "Another integration and BAA." — Kills day-one EHR integrations and R3. H1's flat-file start and departmental buy exist specifically to pass this attack.
**Pharma executive:** "Qualitative noise; my agency does patient journeys." — Kills Belief Audit standalone. P1/P2 survive on three words the agency can't say: *observed, linked, outcome-labeled* — and on the intervention arm with measured lift.
**Privacy lawyer:** "Mind-state data linked to identity is radioactive." — Ratifies the architecture law: capture as care delivery under BAA; identified data used only inside that care relationship; aggregate/de-identified for everything else; the identified intent exchange stays dead (X9 defanged version only).
**Pharmacovigilance leader:** "Patient interactions create AE obligations you're not staffed for." — Adds a real cost line (AE detection + 24h forwarding SOP) to every pharma concept. Not fatal; also a moat — hobbyist competitors won't build it.
**EHR incumbent:** "We'll copy it." — Kills the Render API as a standalone. The survivors are things Epic structurally won't do: per-case outbound persuasion telemetry at dental-scale (beneath them), outcome-labeled cross-network benchmarks (they're single-instance), and a barrier taxonomy grounded in a corpus they don't have. Also: Epic copying the *category* validates the standard — if Barrier Codes spread, Opera wins even then.
**Startup investor:** "Dental is fragmented; ACV is small." — Answered by DSO consolidation (30%+ of the market and rising), the Greyfinch umbrella (one contract, 320 clinics), success-fee pricing raising effective ACV, and the fact that fragmentation cuts both ways: no incumbent owns the follow-up lane either.
**Procurement leader:** "Two years to buy anything." — Demotes Consent Ledger and central hospital sales; ratifies department-level, paid-pilot, 90-day-holdout motions only.
**The skeptic:** "It's an AI wrapper." — The generation layer is, and it's a commodity Opera should treat as one. The company is the telemetry, the outcome labels, the taxonomy, and the queue. If the models become free, Opera gets cheaper to run; nothing about the moat changes. That is the test the thesis passes and a wrapper fails.

**Revisions forced:** Intent Radar must be PMS-native (not a destination app). Hospital entry is H1-only, flat-file, departmental. Pharma is sequenced behind a medical channel — no pharma sales motion in the next 12 months, design-partner conversations only. Consent Ledger and the Index move to the long-term shelf. All data monetization waits for scale and rides on consented, de-identified aggregates.

---

## 13. Operating like an exceptional founder

**The irreversible trend:** AI is collapsing the cost of producing personalized clinical communication to zero. Everyone will send beautiful explanations. Therefore the scarce asset shifts — from *producing* communication to *knowing what it did*: who understood, who moved, what worked. Opera should race to own the measurement layer precisely because the generation layer is commoditizing underneath it.

**The constraint that disappeared:** individualized explanation used to require human time; now the marginal cost is ~zero, which makes *instrumented* individualized explanation deployable at population scale for the first time. The sensor fleet is newly possible.

**What remains invisible:** the decision window (Section 1, all 26 rows). **The market that looks small:** "dental case-acceptance software" — it looks like a $200/mo SaaS niche and is actually the first province of the initiation layer for all preference-sensitive care, which is where most of healthcare's unrealized revenue and a large share of its preventable harm sits.

**The primitive that becomes infrastructure:** the outcome-labeled Decision Record + Barrier Codes. **The Bezos test** (work backward from the customer): the TC's Monday morning is the customer moment; everything compounds from making that queue correct. **The Jobs test** (delete complexity): one product, one queue, one score, one taxonomy — kill the product-line sprawl this document could tempt. **The Collison test** (fragmented complexity → elegant primitive): healthcare's follow-up chaos → a record type and an API. **The smallest product containing the DNA of the largest vision:** the barrier-coded morning queue for one TC. **What a trillion-dollar incumbent ignores:** per-practice outbound patient behavior in dentistry — operationally grubby, beneath Epic's radar, invisible to Align's hardware P&L, exactly where standards are born.

**What compounds with every interaction:** intent-model accuracy, barrier-taxonomy coverage, message-attribution confidence, benchmark resolution. Four flywheels, one data path, already spinning at 130k.

---

## 14. Scoring framework

Eight finalists, eighteen criteria, 1–10. (Integration burden, regulatory risk, competitive intensity scored so that **10 = favorable**, i.e., low burden/risk/intensity.)

| Criterion | D1 Intent Radar | D2 Consult Grade | D7 Index | D4 Sticker Shock | H1 Closed Loop | H2 Cancel Radar | P1/P2 Pharma | R2 Denominator |
|---|---|---|---|---|---|---|---|---|
| Pain severity | 8 | 6 | 6 | 7 | 9 | 7 | 8 | 7 |
| Buyer urgency | 8 | 6 | 5 | 7 | 7 | 6 | 7 | 5 |
| Willingness to pay | 8 | 7 | 6 | 7 | 7 | 7 | 8 | 7 |
| Ease of distribution | 8 | 7 | 5 | 7 | 5 | 4 | 3 | 3 |
| Ease of pilot | 9 | 9 | 4 | 8 | 6 | 6 | 4 | 3 |
| Patient-engagement realism | 8 | 9 | 9 | 7 | 6 | 7 | 5 | 6 |
| Provider-workflow realism | 8 | 6 | 8 | 8 | 7 | 7 | 7 | 8 |
| Integration burden (10=low) | 8 | 9 | 9 | 8 | 6 | 6 | 5 | 4 |
| Regulatory risk (10=low) | 9 | 8 | 8 | 7 | 7 | 8 | 5 | 5 |
| Speed to revenue | 9 | 8 | 4 | 8 | 5 | 5 | 4 | 3 |
| Expansion potential | 8 | 7 | 8 | 6 | 9 | 7 | 9 | 9 |
| Data defensibility | 9 | 8 | 9 | 7 | 7 | 6 | 6 | 10 |
| Workflow defensibility | 8 | 6 | 5 | 6 | 7 | 6 | 6 | 5 |
| Competitive intensity (10=low) | 6 | 7 | 7 | 5 | 6 | 6 | 6 | 8 |
| Category-creation potential | 8 | 7 | 9 | 5 | 8 | 6 | 9 | 9 |
| Fit with current capabilities | 10 | 9 | 7 | 8 | 7 | 7 | 6 | 5 |
| Measurable ROI | 9 | 7 | 6 | 8 | 8 | 8 | 6 | 4 |
| Infrastructure inevitability | 7 | 6 | 8 | 5 | 7 | 6 | 7 | 8 |

**Defense of D1's five 9–10 scores (required):** *Ease of pilot (9)* and *fit (10)* are earned, not hopeful — the pilot is switching on telemetry for experiences already deployed to 25 paying clinics; no new distribution, consent flow, or patient behavior is required, which is a position no competitor or de-novo startup can claim. *Speed to revenue (9):* the buyer already pays Opera; this is an upsell plus a success-fee pricing change on a mechanism ($2.5M recovered) already demonstrated. *Measurable ROI (9):* recovered production against a randomized holdout is about as clean as ROI measurement gets in healthcare. *Data defensibility (9):* the outcome-labeled decision corpus cannot be assembled without holding both the intervention channel and the PMS ground truth simultaneously — a structural, not incremental, barrier.

**Defense of R2's 10 (data defensibility):** claims and EHR *by construction* cannot contain the declined-care denominator — the datum is created in a moment those systems don't observe and destroyed if not captured prospectively. Whoever holds the deployed decision-window sensor fleet is the only possible producer. The low pilot/speed scores are the honest price of that uniqueness.

---

## 15. The elimination tournament

| Round | Filter | Killed (and why) |
|---|---|---|
| 1 | Features, not companies | D3 Household Graph, D5 Shop Detector, W3 Escalation Sense, T3 Protocol Echo, P4 Belief Audit — all become columns/modules of D1, W2, T1, P2 |
| 2 | Unrealistic patient behavior | W1 Pocket Record (no engagement loop), H5 Discharge Echo & H6 ED Reroute (coldest audiences in healthcare) |
| 3 | Requires universal EHR integration | R3 Question Network (federated fantasy for now); R1 Context Link demoted from product to partnership architecture |
| 4 | No clear buyer | I2 Render API standalone (every buyer can increasingly self-serve generation); X7 Language Observatory standalone (real money, no repeatable buyer motion yet) |
| 5 | Insight without action | D6 Demand Atlas *as a first move* (manufacturers can't act case-level; parked until scale makes the aggregate strategic), P4 already dead |
| 6 | Easily copied by incumbents | Generic recovery messaging inside D1 (survives only as the labeled-data version); H3 Leak Map merged into H1; P3 Drop Signal merged into P1; T2 merged into T1 |
| 7 | No compounding advantage | D8 Start Guarantee as a *company* (it's D1's pricing model — folded in, importance undiminished), P5 Hub Forensics (services-shaped) |
| 8 | Disconnected from Opera's current wedge | P1/P2 pharma and T1 trials *as next steps* (no medical channel exists yet — parked as expansion markets, explicitly not abandoned) |
| 9 | Cannot show value in a 90-day pilot | D7 Opera Index (needs network scale; becomes emergent), R2 Missing Denominator (the endgame, not the entry) |
| 10 | Good but not exceptional | H2 Cancellation Radar (crowded periop space, slow sales — kept as an H1 sibling module, killed as a standalone company), H4 Consent Ledger (procurement clock), D2 Consult Grade standalone (it's the DSO tier of the platform) |

**What survives the tournament: one company.** The Decision Record platform (I1), entered through D1 Intent Radar with D4 and D8 as modules and pricing, expanded through D2/D7 into the benchmark layer, bridged into medicine through H1 Closed Loop, and monetized at maturity through D6, P1/P2, and R2. The tournament didn't pick a winner from thirty ideas; it revealed that the thirty ideas were one architecture viewed from different buyers' chairs.

---

## 16. Final answer

### The five strongest ideas

**1. Intent Radar → the Patient Decision Record (D1 + D4 + D8 + I1)**
One sentence: every pending case carries a live, outcome-labeled intent score and barrier code, and the follow-up lane runs off it. Initial vertical: orthodontics/dental. Buyer: practice owner → DSO. First workflow: the TC's Monday queue. First dataset: instrumented decision windows from the existing 25-clinic fleet. First measurable outcome: start-rate lift vs. randomized within-practice holdout. First pilot: 3 practices, 90 days, telemetry already deployed. First pricing: SaaS floor + success fee per recovered start. Expansion: DSOs → Greyfinch embed → Barrier Codes as the PMS-native standard. Defensibility: outcome-labeled corpus + workflow ownership + benchmarks. Why now: generation just became free; measurement is the next scarce layer, and Opera has the only deployed sensor fleet.

**2. Closed Loop (H1)**
Abnormal-finding-to-procedure completion, GI first: revenue, risk, and quality fused in one department-level, flat-file-deployable product. Buyer: GI service line + quality/risk. First outcome: completion-rate lift at 90 days vs. holdout. Why it matters beyond itself: it is the medical beachhead that unlocks pharma, trials, and Truveta.

**3. Silent Sticker Shock (D4)**
Behavioral financing-blockage detection with in-experience pre-qualified resolution; SaaS + origination share. The densest near-term monetization inside the wedge, and the elasticity dataset (#25) as exhaust.

**4. Consult Grade + Opera Index (D2 + D7)**
Communication quality measured by its output, case-mix-adjusted, benchmarked across the network; the DSO tier and, published, the industry's measuring stick. Fastest expansion of contract value with zero new patient behavior.

**5. The Missing Denominator (R2, with P1/P2 as its pharma-facing expressions)**
The recommended-but-declined dataset — the endgame asset that claims and EHRs structurally cannot produce, monetized with pharma HEOR/launch teams once D1/H1 scale exists.

### The single strongest idea

**The Patient Decision Record, entered through Intent Radar.** Category: healthcare's decision infrastructure — the record type and taxonomy for the window between recommendation and action.

**Why it's the best:** it is the only concept that scores near-maximum on fit, pilot speed, and ROI measurability *while also* being the load-bearing foundation for every other surviving concept — H1 is the Decision Record for abnormal findings, Launch Tower is the Decision Record for prescriptions, R2 is the Decision Record aggregated. Choosing it doesn't close doors; it is the door.

**Why it's not obvious:** everyone — including Opera to date — sees the videos as the product and "more video quality" as the roadmap. The inversion (video = sensor; telemetry + outcome labels + taxonomy = product) is invisible from inside a content-generation frame, and invisible to incumbents because the follow-up lane is beneath the PMS's ambition and outside the EHR's walls.

**Why Opera starts from the right position:** 130k deployed decision-window experiences with practice trust and PMS ground-truth access; a demonstrated $2.5M recovery mechanism; a Greyfinch channel for embedding; and no incumbent in the lane.

**Why the market could be enormous:** unrealized recommended care is a multi-hundred-billion-dollar annual phenomenon across dental, elective surgery, specialty pharma, screening, and trials. The initiation layer has no owner. Standards that name a previously unnamed failure (barrier codes) tend to expand to the size of the failure.

**Why incumbents haven't built it:** EHRs/PMSs record institutional actions and stop at the door; their business model is the system of record for *what was done*, not *what was decided*. Manufacturers see shipments. Portals see logins. Nobody holds intervention + behavior + outcome simultaneously — and building that position requires years of unglamorous outbound plumbing in fragmented specialties, which is exactly the work a large incumbent deprioritizes.

**What must be true:** (1) decision-window telemetry actually predicts starts better than TC intuition; (2) barrier codes are stable enough across practices to ground a taxonomy; (3) TCs act on the queue when it's PMS-native; (4) success-fee attribution survives contact with real practices via holdout discipline.

**What could kill it:** telemetry turning out to be noise (test #1 immediately); PMS platforms closing access (mitigate: Greyfinch partnership depth, multi-PMS breadth later); a privacy misstep with intent data (mitigate: care-delivery-only use of identified data, forever); Opera's own temptation to keep selling content instead of turning on the instrument.

**Next 30 days (test):** turn on full telemetry across the existing fleet; hand-code 500 historical pending cases with Barrier Codes v0 from existing interaction data; validate retrospectively that telemetry separates started from never-started cases; ship a manual Monday-queue email to 3 friendly practices.
**Next 90 days (build):** Intent Score v1 + Barrier Codes v1; the queue inside Greyfinch; automated outcome labeling from PMS data; one success-fee contract with a randomized holdout; the recovered-revenue ledger as the sales artifact.
**Refuse to build:** a patient app; hospital sales; pharma decks; EHR integrations; 3D/video quality upgrades beyond maintenance; a standalone analytics dashboard; any data sale.
**First demo:** Demo 1 from Section 11, culminating in the ultimatum screen with the prospect's own PMS numbers.
**First five design partners:** two multi-location ortho groups (5–15 locations, TC-driven, Greyfinch-based), one high-volume implant/restorative practice, one 20–50-location DSO with a VP-of-ops champion, and Greyfinch itself as the embed partner.
**Proof that justifies committing the company:** in the randomized within-practice test, the barrier-coded queue produces ≥25% relative lift in pending-case start rate over status-quo follow-up, sustained across two quarters and at least two practice types — plus evidence that TCs actually work the queue unprompted (≥60% of queue items actioned within 48h).

### The most insane idea that might actually work
**X4 — the Consent Shield distributed through med-mal insurers.** Verified-comprehension consent records, priced into malpractice premiums. Insane because it sells hospital-adjacent infrastructure through insurance carriers instead of hospitals; plausible because carriers already discount for risk controls, failure-to-inform is a chronic claims allegation, and one carrier pilot with ASCs bypasses hospital procurement entirely.

### Fastest path to revenue
**D8 Start Guarantee pricing on the existing base** — reprice current recovery performance ($2.5M already demonstrated) as success-fee contracts. New revenue without a new product.

### Strongest proprietary-data opportunity
**R2 The Missing Denominator** — the only dataset class claims and EHRs are structurally incapable of producing.

### Strongest infrastructure opportunity
**I1 The Decision Record + Barrier Codes embedded in Greyfinch** — a new record type in a system of record is how standards are born.

### Best dental/ortho opportunity — D1 Intent Radar.
### Best hospital opportunity — H1 Closed Loop (GI abnormal-finding completion).
### Best pharma opportunity — P2 Launch Tower (once a medical channel exists; design-partner conversations only until then).
### Best Truveta partnership — Model B: one co-branded prospective reason-coded registry (GLP-1 discontinuation is the flagship candidate) at 2–3 member systems, with the Barrier Code schema co-designed now (see Appendix A).
### Best Wally partnership — W2 Comprehension API as invisible infrastructure: Opera returns measured comprehension and intent, the platform's clinicians act on it, Opera gains the longitudinal cross-provider corpus dental deployments can never produce.

### The kill list — even if buyers express interest
1. A patient-facing consumer app (any form).
2. Generic hospital "patient engagement" sold centrally.
3. Discharge/readmission products.
4. A standalone white-label video/education-generation API.
5. Selling identified patient intent to any third party, ever.
6. A data marketplace before workflow scale.
7. Generic trial chatbots.
8. Day-one EHR integrations.
9. 3D rendering and cinematic video quality as a roadmap.
10. Anything whose differentiation statement is "we use AI."

### Closing
The category Opera should own: **the decision infrastructure of healthcare** — the record, the taxonomy, and the queue for the window between recommendation and action. The first move costs almost nothing: stop discarding the telemetry. The video was never the product. The video is the sensor.

---

## Appendix A: Notes for the next Truveta call

**Positioning in one line:** "You have the deepest record of what happened *to* patients. We're building the record of what happened *inside the decision* — why care did or didn't happen. They're complementary by construction, and pharma is already asking both of us for the combined thing."

**The setup (30 seconds):**
- Opera generates personalized post-consult experiences — 130,000+ delivered, $2.5M+ in previously-declined treatment recovered. No app, SMS-delivered, deployed as care delivery under the provider.
- The strategic point: each experience is an *instrumented decision window*. We observe what the patient watched, asked, misunderstood, feared, and did — and we see the outcome (started / didn't) in the practice system. We're formalizing that as a **Patient Decision Record** with a coded barrier taxonomy — think "ICD codes for why treatment never happened."

**The macro argument ("patient-side is becoming big"):**
- Pharma's RWE and launch teams are actively buying patient-side data: primary non-adherence (20–30% of new scripts never filled) and discontinuation are top-3 launch problems, and claims/EHR show the *absence*, never the *reason*. FDA's patient-focused drug development guidances have made patient-experience data a formal evidence category. PRO capture is exploding but is generic and unlinked to decisions.
- The gap in every large clinical dataset — including theirs — is structural, not a coverage problem: the "why" was never recorded anywhere because no system asks at the moment the answer exists. You cannot mine what was never captured. That's not a criticism of Truveta; it's the reason a partnership is interesting.

**What's in it for Truveta (say this plainly):**
- A data type no competitor (Optum, Komodo, Epic Cosmos) has or can backfill: prospective, reason-coded, event-linked patient decision context attached to their clinical spine.
- A differentiated product for their life-sciences customers: "why patients don't initiate / don't persist" as a queryable layer, not a commissioned survey.
- They shouldn't build it themselves: it requires patient-facing interaction design, outbound engagement operations, and provider-brand delivery — member systems won't accept Truveta messaging patients, but they'll accept a care-delivery layer deployed under the *system's* brand and BAA. That's us.

**The concrete proposal (the ask):**
1. **Now:** co-design the Barrier Code schema and the tokenized linkage architecture (Datavant-style, consented, de-identified) so decision records are linkable to their spine from day one.
2. **First joint study:** one prospective, reason-coded registry at 2–3 member health systems, pharma-sponsored. Flagship candidate: **GLP-1 discontinuation reasons** (massive real-world drop-off, payers and pharma desperate for the why, invisible in claims). Alternative: abnormal-finding follow-up completion (colonoscopy after positive FIT) — pairs with our Closed Loop product, gives the health system direct operational value, not just research value.
3. **Structure:** health system deploys Opera as care delivery (system gets the operational win: completion/initiation lift); consented decision context flows de-identified into the joint dataset; Truveta sells the enriched layer to life sciences; revenue share.

**Proof points to cite:** 130k+ videos, $2.5M recovered treatment, 25 paid clinics, 60+ LOIs, 2 enterprise contracts, $420M+ clinical revenue analyzed, live PMS integration (Greyfinch) giving us outcome labels — i.e., we already run consented patient interaction at scale with ground truth, which is the hard part.

**Handle the obvious objections:**
- *"Your data is dental."* — Correct, and that's why the proposal is a design partnership + one medical registry, not a data purchase today. Dental is where we industrialized the mechanism (engagement rates, outcome labeling, barrier coding). The mechanism transfers; the first medical deployment is the joint study itself.
- *"Isn't this just PROs?"* — PROs are generic instruments, usually unlinked to a decision event and collected retrospectively. This is behavioral + verified-comprehension data captured *inside* the decision window, labeled by what the patient actually did. Different asset class.
- *"Privacy?"* — Captured as care delivery under the provider's BAA; identified data used only for that patient's care; research layer is consented, de-identified, tokenized. Patients get clear value (understanding their own care) before any data use — engagement isn't extractive.
- *"Why not build it?"* — Two years of patient-interaction design, outbound ops, AE-handling SOPs, and provider trust — outside their DNA, and their members would resist Truveta-branded patient contact. Partnering gets them the layer in one quarter.

**Close with the category line:** "Every RWD company sells the record of care that happened. The next evidence category is the record of care that *almost* happened — who was recommended what, what they understood, why they said no. We're the only ones positioned to build it prospectively, and we'd rather build the medical version with you than around you."

**Don't do on this call:** don't pitch dental data to them; don't promise sample sizes you can't deliver; don't let it become a "send us a data dictionary" science project — push for the named first study and one named member system.



