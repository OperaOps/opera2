# Opera Loop — Product Thesis

The second flagship in the Opera × Truveta demo. Lives at `/loop`. The education Studio
(the original demo) is untouched — the Loop is what happens to the same patients *between*
the moments the Studio explains.

## The one-line thesis

**Healthcare records what happened. It never learns why.** The Loop keeps one living plan
per patient between visits, catches the moment a journey deviates (from structured events,
not surveys), captures the patient's one-tap reason, closes it with one routed action — and,
de-identified at scale, turns *stated-reason-at-deviation* into a new variable for
real-world evidence.

## How we got here — the critique that killed v1

The first concept was "Journeys": event-triggered educational moments on a timeline, with
engagement analytics. It died under critique:

- **Satya:** event-triggered patient messaging with engagement analytics already exists
  (Epic Care Companion, Memora, Luma, WELL). A feature, not a platform primitive.
- **Jensen:** opens and taps are marketing telemetry, not a data flywheel. Nothing
  compounds. Measure the thing itself, not clicks near it.
- **Demis:** "where journeys stall" is already visible retrospectively in claims. The novel
  measurable must be something the record *cannot* contain, with observable ground truth.
- **Truveta CEO:** we have the clinical spine of the journey. The thing we cannot buy at any
  price is the patient-side *reason* attached to each deviation. That would be a new
  evidence class. Watch-rates are worthless to me.
- **Physician:** do not send me signals, dashboards, or pulse boards. Catch the break, route
  one task to my staff, never interrupt me. Remove work or go away.
- **Patient:** I don't want to engage more. I forget my plan, I panic between visits, and
  nobody asks why things went wrong until it's too late to say. Make me less lost; ask me
  at most one thing, only when something is actually wrong.

What survived: the delivery mechanics (existing channels, no app, reviewed asset library).
What was deleted: engagement analytics, the population Sankey, "I've got this" taps, the
care-team pulse dashboard — all filler or weak data.

## The product (three screens, one purpose each)

1. **The living plan** (patient): one secure link that stays current for the whole journey.
   Plain words, what changed, what's next, a reviewed Studio clip where it helps. Rides SMS
   the patient already receives. Silent when the journey is on track — silence is a feature.
2. **The catch** (care team): deviations are detected from structured events (a fill that
   didn't happen, a booking that never appeared, silence before a milestone). At that moment
   — and only then — the patient is asked exactly one thing: a one-tap reason in human
   words. The tap routes ONE task to the right staff member. The physician is never
   interrupted. A journey that claims data would mark "discontinued — reason unknown"
   months later is resolved in days.
3. **The reason layer** (Truveta): every catch emits a structured, consented, de-identified,
   event-aligned reason code. At population scale this is the missing variable in
   real-world evidence: not "52% persistent at six months" but *why* the other 48% left,
   attached to the exact moment they left, longitudinally. Claims see the gap; the Loop
   explains it.

## Why each party wants it

- **Patients**: zero behavior change, at most one or two taps per journey, and a plan they
  can actually re-read at 11pm. The product asks less of them than any portal.
- **Health systems**: recovered journeys (adherence, show-rates, readmissions) with work
  *removed* from clinicians — every catch becomes one routed task for staff, not inbox noise.
- **Truveta**: an evidence class that cannot be derived from EHR/claims data at any scale,
  and that compounds with every deployed journey.

## Constraints honored

No chatbot. No surveys (one tap, at deviation moments only). No per-patient generated
media (the Studio's reviewed library is the scalable asset). No app. No new patient
behavior. Interoperability assumed (FHIR-ish structured events in). Education-only
boundary preserved: results are restated from care-team-approved notes, never interpreted.

## Demo implementation

- `/loop` — five screens: the gap (hero) → the artifact (living plan) → the catch
  (interactive 16-week journey, Sarah from the chronic-care demo) → the evidence (persistence
  curve + reason breakdown) → the close (not a portal / not a chatbot / not an app).
- Seeded data in `lib/loop.ts`. Components in `components/loop/`. Sarah's clips reuse the
  existing `medical-assets` library (medication + diabetes-a1c folders).
- All patients synthetic. All numbers seeded and illustrative.
