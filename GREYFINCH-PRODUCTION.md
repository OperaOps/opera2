# Opera × Greyfinch — Production Rollout (Jacob-ready)

> Written 2026-07-10 after the Greyfinch CEO call. Companion to
> `greyfinch-connect-sdk/opera-app/HANDOFF.md` (training-era integration doc).
> This covers the install → trial/payment → API key → first-video flow that now
> runs on production App Runner (`https://fjuy43gika.us-east-1.awsapprunner.com`).

## The clinic flow (what Jacob experiences)

1. **Install** — Greyfinch admin → Settings → Apps → Opera → Install.
2. **Get a key** — the app's website/connection prompt links to
   `https://fjuy43gika.us-east-1.awsapprunner.com/connect`:
   one form (clinic, name, email) + terms checkbox →
   - **Stripe path** (once keys are set): Checkout with a 30-day free trial on a
     monthly plan; card up front, $0 today; returns to `/connect/success`
     showing the API key + install steps.
   - **Activation-code path** (live now): they enter the code we give them and
     the key is issued instantly with a 30-day trial.
3. **Connect** — paste the key into Greyfinch's Connect prompt for the app.
4. **Generate** — open any patient → "Generate patient video". Patient, doctor,
   clinic, and chart Notes are pre-filled; one click renders the video; the
   timeline card auto-writes; "Text to patient" works off the chart's cell.

Button count from install to first video: Install → Connect (paste) → open
patient → Generate. The signup itself is one form + one checkout.

## What's enforced server-side now

- Every expensive/PHI-adjacent endpoint (`generate`, `send-sms`,
  `patient-context`, `record-resource`, `library`) requires a valid Opera key
  (`x-opera-key`, `?api_key=`, or body `apiKey`) — see `lib/connect/auth.ts`.
- **Scope:** enforcement applies to the Greyfinch surfaces only — the embed and
  patient-videos pages mark their requests with `x-opera-source: greyfinch`.
  Opera's own product/demo pages (`/patient-video`, `/video-prototype`, …)
  share these endpoints and stay open, unchanged. Set `OPERA_REQUIRE_KEY=1`
  to require a key from every caller (do this when the demo pages get their
  own auth).
- A key is valid only while its clinic is `trialing` (not expired) or `active`.
  Trial expiry / canceled subscription / failed payment → 402 with a
  human-readable message; the embed shows a "start your free trial" banner.
- Per-clinic rate limit on `generate` (10/min) + usage metering
  (`videosGenerated`, `lastUsedAt`) for ROI + scale monitoring.
- Legacy `greyfinchtest` key still works because `OPERA_ALLOW_TEST_KEY=1`
  (training continuity). **Flip to 0 when Stripe goes live.**

## Storage (the "we can scale" story)

- `opera-connect-clinics` (DynamoDB, us-east-1) — clinics, hashed keys +
  pointer rows (`KEY#`, `SESSION#`, `SUB#`). Local dev falls back to
  `data/connect-clinics.json`.
- `opera-patient-video-jobs` (DynamoDB) — render-job state, so status polling
  survives multi-instance App Runner scale-out (`PATIENT_VIDEO_JOBS_TABLE` is
  now set; jobs were previously in-memory).
- Renders already run on Remotion Lambda → S3, which scales horizontally.

## Ops endpoints

- `GET /api/health` — liveness + which backends are wired (no secrets).
- `GET /api/connect/admin` — all clinics/status/usage; gated by
  `OPERA_MASTER_KEY` (in App Runner env; keys redacted to prefix).

## Env vars (App Runner, added 2026-07-10)

| Var | Value / purpose |
|---|---|
| `PATIENT_VIDEO_JOBS_TABLE` | `opera-patient-video-jobs` |
| `OPERA_CLINICS_TABLE` | `opera-connect-clinics` |
| `OPERA_ALLOW_TEST_KEY` | `1` during beta; set `0` at Stripe go-live |
| `OPERA_MASTER_KEY` | ops key for admin route (see App Runner console) |
| `OPERA_ACTIVATION_CODE` | beta code to hand clinics (see App Runner console) |
| `OPERA_PUBLIC_URL` | `https://fjuy43gika.us-east-1.awsapprunner.com` |
| `OPERA_MONTHLY_PRICE_DISPLAY` | shown on /connect (change anytime, no rebuild) |
| `STRIPE_SECRET_KEY` | **TEST-mode key set 2026-07-17** — swap to live key at go-live |
| `STRIPE_PRICE_ID_CORE` / `STRIPE_PRICE_ID_GROWTH` | TEST prices ($199/$999) — recreate in live mode at go-live |
| `STRIPE_WEBHOOK_SECRET` | set (endpoint `we_1TuNDWEqbJ9c0fujBYJr5R8S` → getopera.ai, test mode) |

⚠️ `deploy-apprunner.sh` **overwrites** the service env with a hardcoded subset
(it predates the Lambda/Greyfinch/connect vars). Until it's fixed, deploy with:
build+push the image, then `aws apprunner start-deployment` — don't let the
script run `update-service`. (Its `IMAGE_TAG="latest"d` typo — which had the
service pinned to a stale `:latestd` image — was fixed 2026-07-10 and the
service repointed to `:latest`.)

## Production Greyfinch app — already live

The App Runner env carries **working production app credentials**
(`pk_app_FQqqE…`), and the `operaai` app (id `546bef74-…`) is **ACTIVE on
production Greyfinch** with all 4 launchers. The updated definition
(`app.prod.json` v1.1.0 — /connect links in website + connection prompt,
`api_key` on the patient-videos launcher) was **pushed to production
2026-07-10**. Re-push after changes with:
`cd greyfinch-connect-sdk/opera-app && GREYFINCH_ENDPOINT=https://connect-api.greyfinch.com/v1/graphql GREYFINCH_APP_KEY=… GREYFINCH_APP_SECRET=… APP_FILE=app.prod.json node push-app.mjs --apply`
(creds are in the App Runner env console).

## State as of 2026-07-17

- Jacob's org (`5eb1f`) verified end-to-end from our app creds: client key
  GRANTED, client login OK, **4 outbound SMS numbers** (real texts send in his
  env), patient queries work. `GREYFINCH_ORG_XID=5eb1f` on the service.
- Jacob is generating videos via the embed, connected with the legacy
  `greyfinchtest` key (billing bypass — move him to a real key before flipping
  `OPERA_ALLOW_TEST_KEY=0`).
- Stripe TEST mode wired everywhere: plan-aware /connect (Core $199 / Growth
  $999, 30-day trial) on both getopera.ai (Netlify) and App Runner; webhook
  registered (test mode) at getopera.ai/api/connect/stripe-webhook; secret in
  both Netlify + App Runner env.
- Greyfinch prod app def **v1.2.0**: website + Connect prompt →
  `https://getopera.ai/connect`; launchers stay on App Runner.

## Anish TODO (in order)

1. **Stripe live mode** — in the Stripe dashboard switch to live, create the
   Core/Growth prices again, then: put the live `sk_live_` +
   live `STRIPE_PRICE_ID_CORE`/`_GROWTH` into BOTH Netlify env and App Runner
   env, create a live-mode webhook endpoint (same URL + events) and update
   `STRIPE_WEBHOOK_SECRET` in both. Everything else is already wired.
2. **Move Jacob to a real key** — /connect → activation code → key; then in
   Greyfinch admin → Apps → Opera → Connect, replace `greyfinchtest` with it.
   Then set `OPERA_ALLOW_TEST_KEY=0` on App Runner.
3. **Multi-org scoping (before clinic #2)** — `_lib/greyfinch.ts` is single-org
   (`GREYFINCH_ORG_XID`); per-connection org resolution needed for the next
   clinic beyond Jacob.
4. **Price** — $299/month is a placeholder; set the real number in the Stripe
   Price and `OPERA_MONTHLY_PRICE_DISPLAY`.
5. **Terms** — `/connect/terms` is a working draft; have counsel review, and
   have a BAA ready (the terms reference one).
6. **Domain (optional, better trust)** — point `connect.getopera.ai` (or
   similar) at the App Runner service and update `OPERA_PUBLIC_URL`, the
   launcher URLs in `app.prod.json`, and the Stripe URLs.
7. **Jacob walkthrough** — hand him the beta activation code (App Runner env)
   or wait for Stripe; then it's the 4-step flow at the top of this doc.

## Beta-testing checklist (the "no bugs GF gets blamed for" ask)

- [ ] Install → Connect → generate on a fresh org (training) end-to-end
- [ ] Wrong/expired key → embed shows the trial banner, never a blank iframe
- [ ] Timeline card renders + link clickable after each video
- [ ] SMS goes to the chart's CELL number (simulated on training)
- [ ] Kill/redeploy App Runner mid-render → job status survives (Dynamo)
- [ ] `/api/health` returns `jobStore: dynamodb`, `clinicStore: dynamodb`
- [ ] Duplicate-name patients: notes pulled from most-recently-edited match
