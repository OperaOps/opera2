# Opera Patient Education Studio

**Turning real-world evidence into human understanding.**

A premium healthcare AI **concept demo** exploring an Opera AI × Truveta partnership.
Truveta understands real-world patient journeys at scale; Opera translates *approved*
content and care context into **personalized patient education** — videos, portal,
SMS, and email — that feel made for one specific person.

> This is a **patient education and communication layer**. It is **not** clinical
> decision support, diagnosis, treatment recommendation, medication guidance,
> patient-specific risk prediction, or emergency triage. Every patient in this
> demo is **synthetic**. Human review is required before any asset reaches a patient.

---

## Run it

```bash
cd OperaTruveta
npm install      # already run during setup
npm run dev      # http://localhost:3100
```

(Runs on port **3100** so it never collides with the main Opera app on 3000.)

```bash
npm run build && npm start   # production build
```

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react.
Self-contained — does not depend on the parent dental app.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Overview — hero, value props, evidence→education flow, guardrails |
| `/demo-library` | 12 synthetic patients, filterable/searchable |
| `/demo/[id]` | Full personalized asset: storyboard, script, signals, sources, compliance, delivery |
| `/safety-framework` | The does / does-not boundary and safety principles |
| `/report-builder` | Compose a reviewer-ready education brief (print/PDF export) |
| `/pipeline` | Simulated generation pipeline with a required human-review gate |
| `/visual-system` | The cinematic, motion-ready design language |

## Structure

```
OperaTruveta/
├── app/                      # routes (App Router)
├── components/               # reusable design-system components
│   ├── AppShell, Navbar, Footer
│   ├── HeroSection, FlowDiagram, PatientJourneyMiniMap
│   ├── ValueCard, EnterpriseCard, SectionHeader, SafetyBadge, TrustBadgeRow
│   ├── AnimatedGradientPanel, StoryboardViewer, DemoCard
│   └── motion.tsx            # Reveal / stagger primitives
├── lib/
│   ├── types.ts              # domain types (the data contract)
│   ├── demoData.ts           # 12 rich synthetic use cases
│   ├── nav.ts, utils.ts
└── public/branding/          # Truveta reference assets
```

## Design language

White / slate canvas · deep navy ink · teal/cyan accents · glass cards · soft shadows ·
calm motion · large readable captions. No light-mode clichés, no cartoon doctors, no
neon. Storyboard scenes are structured to later render to real video via Remotion,
Framer Motion, or Lottie.
