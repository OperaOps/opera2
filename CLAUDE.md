# Opera AI — Claude Code Context

## What Opera Is

Opera AI is the **digital COO for specialty healthcare clinics**, starting with dental and orthodontics. It sits on top of fragmented clinic data (scheduling, billing, production, patient comms, HR) and turns it into actionable intelligence via dashboards, AI chat, workflows, and now patient-facing video education.

**This is not a dashboarding tool.** Long-term: Opera becomes the intelligence and data layer between clinics and their entire software ecosystem. Short-term: win clinics by being the most useful thing they open every morning.

The product must always connect to **measurable clinic outcomes**: production recovered, case acceptance improved, conversion lag reduced, scheduling utilization improved.

---

## Company Context

- **Founders**: Anish Suvarna (UC Berkeley MET, EECS + Business) + Ram Dosibhatla (Stanford CS)
- **Stage**: ~$10k MRR, ~$410k runway, ~9% diluted
- **Backers**: Joshua Browder, SV Angel/Andrea, Pareto Holdings
- **Goal**: Get to "obvious breakout" inflection point before raising from top-tier funds (Redpoint cited)
- **Traction**: 25 paid pilot clinics, 60+ LOIs, 2 enterprise contracts, $420M+ clinical revenue analyzed
- **Key partnership**: Greyfinch (orthodontic PMS, 320-clinic umbrella) — CEO Jake Gullick, active embed/licensing discussions
- **Key customers**: Dr. Jacob Zitterkopf (ortho lighthouse), Dr. Venkat (multi-location dental, GA)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript + JSX (mixed — some Pages are `.jsx`, new pages should be `.tsx`) |
| Styling | Tailwind CSS + custom dark theme |
| Animation | Framer Motion |
| Charts | Recharts |
| Database | SQLite via `better-sqlite3` (`data/opera_local.db`) |
| AI | Anthropic Claude API (claude-3-5-haiku-20241022 for Ask Opera) |
| Deployment | Vercel |
| PMS Integration | Greyfinch GraphQL API (`https://connect-api.greyfinch.com/v1/graphql`) |

---

## Repository Structure

```
opera2/                          ← main Next.js app (PRIMARY)
├── app/                         ← Next.js 14 App Router
│   ├── api/                     ← API routes
│   │   ├── ai/ask/route.ts      ← "Ask Opera" conversational AI endpoint
│   │   ├── greyfinch/           ← Greyfinch PMS API proxies
│   │   │   ├── route.ts         ← generic GraphQL proxy
│   │   │   ├── appointments/    ← appointment data
│   │   │   ├── production/      ← production metrics
│   │   │   ├── financial-metrics/
│   │   │   ├── treatment-workflow/
│   │   │   └── ...
│   │   ├── dashboard/metrics/   ← dashboard metrics endpoint
│   │   └── files/upload/        ← file upload
│   ├── dashboard/page.tsx       ← main dashboard
│   ├── opportunities/page.tsx   ← growth opportunities
│   ├── dentalworkflow/page.tsx  ← treatment workflow / today's schedule
│   ├── financialops/page.tsx    ← financial operations
│   ├── riskops/page.tsx         ← risk/insurance ops
│   ├── peopleops/page.tsx       ← HR/staffing
│   ├── compare/page.tsx         ← benchmarking
│   ├── datainput/page.tsx       ← data ingestion
│   ├── settings/page.tsx
│   ├── signin/page.tsx
│   ├── landing/page.tsx         ← marketing landing page
│   └── layout.tsx
├── Pages/                       ← legacy React page components (used by app/ pages)
│   ├── Dashboard.jsx
│   ├── Opportunities.jsx
│   ├── DentalWorkflow.jsx       ← Greyfinch-connected treatment board
│   ├── FinancialOps.jsx
│   ├── RiskOps.jsx
│   ├── PeopleOps.jsx
│   ├── Compare.jsx              ← regional/national benchmark
│   └── DataInput.jsx
├── Components/
│   ├── layout/CinematicSidebar.jsx  ← main nav sidebar
│   ├── dashboard/               ← dashboard widgets
│   │   ├── AskOperaWidget.jsx   ← conversational AI widget
│   │   ├── MetricCard.jsx
│   │   ├── LiveChart.jsx
│   │   └── CalendarWidget.jsx
│   ├── opportunities/           ← growth opportunity widgets
│   ├── ai/                      ← AI response rendering
│   └── ui/                      ← shadcn-style primitives (button, input, select, etc.)
├── src/
│   ├── ai/                      ← AI layer
│   │   ├── claudeClient.ts      ← Anthropic API client
│   │   ├── intentRouter.ts      ← query intent classification
│   │   ├── dataOptimizer.ts     ← data summarization for AI context
│   │   ├── formatter.ts         ← response formatting
│   │   └── answerSchema.ts      ← structured answer types
│   ├── data/
│   │   ├── paginate.ts          ← data pagination utilities
│   │   └── rateLimit.ts         ← rate limiting
│   └── routes/files.ts
├── integrations/
│   └── Core.ts                  ← integration interface
├── lib/
│   ├── demo-data.ts             ← demo/fallback data
│   └── utils.ts
├── scripts/                     ← data export/ETL scripts (run with tsx)
├── data/opera_local.db          ← local SQLite database
├── rag/data.json                ← RAG dataset for AI context
└── Entities/                    ← entity schemas

opera-demo-mvp/                  ← separate demo app (patient video lives here)
├── frontend/src/
│   ├── patient-video-product/   ← patient video feature
│   │   ├── index.tsx            ← main product UI
│   │   ├── api.ts               ← job API client
│   │   ├── types.ts             ← VideoType, job shapes
│   │   ├── hooks/usePatientVideoJob.ts
│   │   └── components/
│   │       ├── GenerationFlow.tsx
│   │       └── GenerationPreview.tsx
│   └── pages/PatientVideo.tsx
```

---

## Design System

**Always match the existing aesthetic — dark, premium, cinematic.**

- **Background**: `bg-black` or `bg-black/30 backdrop-blur-xl`
- **Borders**: `border border-white/10` (subtle) or `border-purple-500/40` (active/hover)
- **Accent color**: Purple — `purple-500`, `purple-600`, `from-purple-600/20`
- **Text**: `text-white font-extralight` (headings), `text-gray-400 font-light` (subtext)
- **Cards**: `bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl`
- **Animations**: Always use Framer Motion (`motion.div`, `AnimatePresence`), enter with `opacity: 0, y: 20 → 1, 0`
- **No hard white backgrounds. No light mode. No flat/boxy UI.**

---

## Key Integrations

### Greyfinch (Primary PMS)
- GraphQL API at `https://connect-api.greyfinch.com/v1/graphql`
- Auth: `apiLogin` mutation with `GREYFINCH_API_KEY` + `GREYFINCH_API_SECRET` env vars → returns `accessToken`
- Token is short-lived; re-login per request (current pattern)
- All Greyfinch calls go through `app/api/greyfinch/` proxy routes
- **Never hardcode credentials** — always use env vars

### OpenDental
- Integrated for general dental pilot clinics
- Data exported to local SQLite + RAG JSON

### Ask Opera (AI Chat)
- Route: `app/api/ai/ask/route.ts`
- Model: `claude-3-5-haiku-20241022`
- Currently uses demo data summary; real Greyfinch data flows through separate routes
- Response format: plain text paragraphs, no markdown, no HTML in the AI response itself

### Claude API
- Client in `src/ai/claudeClient.ts`
- **API key must come from `CLAUDE_API_KEY` env var** — the fallback hardcode in `ask/route.ts` is a known tech debt issue, do not add more hardcodes
- Model used: `claude-3-5-haiku-20241022` (fast/cheap for conversational queries)

---

## Environment Variables

Required in `.env.local`:
```
CLAUDE_API_KEY=
GREYFINCH_API_KEY=
GREYFINCH_API_SECRET=
```

Never hardcode these. Never commit `.env.local`.

---

## Patient Video Feature

### Current State
- Lives in `opera-demo-mvp/frontend/src/patient-video-product/`
- Supports 4 video types: `restorative`, `major_treatment`, `ortho_cosmetic`, `financial`
- Job-based system: create job → poll status → get video URL
- Has SMS delivery capability
- Outputs MP4 — current output is too narration-heavy, lacks visual explanations

### The Problem
A doctor reviewed the outputs and said: **"needs actual visuals, treatment explanation, animation."** The current videos don't show patients what's happening — they need to SEE their condition and treatment, not just hear about it.

### What We're Building Next
**Remotion-based scene system** — React components that render to video.

**Why Remotion**:
- One template → many personalized videos (scalable)
- React + TypeScript (matches our stack)
- Reusable scene components
- Server-side rendering support
- No manual video editing

**Architecture target**:
```
apps/video-renderer/          ← isolated Remotion sub-app
├── src/
│   ├── compositions/
│   │   └── PatientEducationVideo.tsx   ← root composition
│   ├── scenes/
│   │   ├── IntroScene.tsx
│   │   ├── ProblemScene.tsx            ← shows the dental condition
│   │   ├── TreatmentScene.tsx          ← shows the intervention
│   │   └── OutcomeScene.tsx            ← shows the result
│   ├── components/
│   │   ├── ToothDiagram.tsx            ← SVG dental visuals
│   │   └── Captions.tsx
│   ├── lib/
│   │   ├── schema.ts                   ← PatientVideoProps type
│   │   └── timing.ts
│   └── server/
│       └── renderPatientVideo.ts       ← rendering endpoint
```

**Visual approach — start 2D, NOT 3D**:
- SVG-based tooth diagrams
- CSS/JS animations for tooth movement
- Arrows, highlights, before/after morphs
- Clean, Apple-style explanatory clarity
- No full 3D models yet (adds complexity, slows rendering, not necessary to prove value)

**First diagnoses to support**: crowding, spacing, overbite, underbite
**First treatments to support**: Invisalign/aligners, braces

**Input schema**:
```ts
type PatientVideoProps = {
  patientName: string;
  doctorName: string;
  diagnosis: "crowding" | "spacing" | "overbite" | "underbite";
  treatment: "braces" | "invisalign" | "expander" | "retainer";
  voiceoverUrl?: string;
  captions?: { start: number; end: number; text: string }[];
  clinicBrand?: {
    name: string;
    logoUrl?: string;
    primaryColor?: string;
  };
};
```

**Rendering approach**: Server-side first (local or existing server). No AWS Lambda/Cloud Run until content quality is proven.

**Business framing**: This is a **case acceptance tool**, not an AI video feature. It improves patient understanding → increases trust → increases treatment acceptance → direct clinic revenue impact.

---

## Engineering Philosophy

### Move fast, stay modular
- **TypeScript everywhere** in new code
- **Modular files** — each scene, component, utility in its own file
- **No big rewrites** — migrate incrementally, preserve existing functionality
- **Don't touch unrelated areas** — change only what's needed for the task at hand

### No over-engineering
- Don't add error handling for impossible scenarios
- Don't create abstractions for one-off cases
- Don't add config toggles unless there's a real current need
- Three similar lines > premature abstraction

### Security
- **No hardcoded API keys or secrets** — ever. Use env vars.
- Be careful with HIPAA context — this platform handles clinical data
- Don't log patient names or PHI in production console statements

### AI agent workflow
The dev workflow is: Claude implements → human reviews visually → Claude iterates.

Claude Code cannot visually judge rendered output. When building UI or video components:
- Write the implementation
- Surface preview instructions clearly
- Make iteration fast (small, isolated changes)

---

## Running the App

```bash
# Main app
npm run dev        # starts Next.js at localhost:3000

# Scripts (data export/ETL)
npx tsx scripts/<script-name>.ts

# Demo MVP (patient video)
cd opera-demo-mvp
# follow that project's own setup
```

---

## Pages Map

| URL | Component | Description |
|-----|-----------|-------------|
| `/` | `app/page.tsx` | Root redirect |
| `/landing` | `app/landing/page.tsx` | Marketing landing |
| `/dashboard` | `Pages/Dashboard.jsx` | Main ops dashboard |
| `/opportunities` | `Pages/Opportunities.jsx` | Growth opportunities / revenue recovery |
| `/dentalworkflow` | `Pages/DentalWorkflow.jsx` | Today's patient schedule (Greyfinch live) |
| `/financialops` | `Pages/FinancialOps.jsx` | Billing, collections, AR |
| `/riskops` | `Pages/RiskOps.jsx` | Insurance/risk |
| `/peopleops` | `Pages/PeopleOps.jsx` | HR / staffing |
| `/compare` | `Pages/Compare.jsx` | Regional/national benchmark |
| `/datainput` | `Pages/DataInput.jsx` | Upload data / connect integrations |
| `/settings` | `Pages/Settings.jsx` | Clinic settings |

---

## The Opera Score (anchor metric)

A composite operational score for specialty clinics. Not the product, but what everything points to.

Components:
- **Revenue Efficiency** — production vs potential
- **Treatment Acceptance** — consult-to-start rate
- **Patient Retention** — reappointment, loyalty
- **Scheduling Utilization** — filled chairs vs capacity
- **Referral Conversion** — lead-to-patient rate

Every feature should tracably improve at least one of these dimensions.

---

## Clinic Vocabulary

Know these terms — doctors and office managers use them constantly:

| Term | Meaning |
|------|---------|
| Production | Revenue generated by procedures |
| Collection rate | % of billed revenue actually collected |
| AR / Days in AR | Accounts receivable; how long to collect |
| Case acceptance | % of recommended treatments patient agrees to |
| Consult-to-start | Time from consultation to starting treatment |
| Unscheduled treatment | Diagnosed but not yet booked procedures |
| Chair utilization | % of operatory time actively used |
| Hygiene reappointment | % of hygiene patients who rebook |
| No-show rate | % of appointments where patient doesn't show |
| New patient (NP) | First visit patient; key acquisition metric |
| TC | Treatment Coordinator |
| DSO | Dental Service Organization (multi-location group) |
| PE | Private equity (buys/consolidates dental groups) |
| PMS | Practice Management Software (Greyfinch, OpenDental, Dentrix, etc.) |
| EHR/EMR | Electronic Health/Medical Records |

---

## What NOT to Do

- Don't add light-mode styling or non-dark backgrounds
- Don't use `console.log` with patient names or PHI
- Don't hardcode API keys, even as fallbacks
- Don't create new top-level directories without reason
- Don't write to `operaReal/` or `netlify/` — those are build artifacts
- Don't touch `opera-demo-mvp/node_modules/` obviously
- Don't refactor working code just to clean it up — fix what's broken or build what's requested
- Don't start with 3D video rendering — prove value with 2D/SVG first
- Don't build cloud rendering infra before video content quality is validated

---

## Immediate Next Priorities (as of March 2026)

1. **Patient Video — visual upgrade**: Build Remotion-based scene system with real dental condition/treatment visuals. First milestone: one full composition with Intro → Problem → Treatment → Outcome scenes, voiceover, captions, SVG dental animations.

2. **Greyfinch embed**: Support white-labeled co-branded interface option for Greyfinch network. Licensing model (per-clinic vs umbrella) being finalized with Jake Gullick.

3. **Ask Opera accuracy**: Improve real data flow into the AI query system — currently using demo data in production mode. Connect live Greyfinch data properly.

4. **ROI documentation**: Clinics need to see measurable revenue impact. Build better tracking of "recovered revenue" surfaced by Opera.
