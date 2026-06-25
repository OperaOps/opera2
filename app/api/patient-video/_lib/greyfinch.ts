/**
 * Greyfinch Connect helpers (training) — shared by the patient-video routes.
 *
 * Centralizes: app login, minting a per-org client key + connection token,
 * looking up a patient (id + phone) by name/xid, and writing an app resource
 * onto a patient's treatment timeline.
 *
 * Auth model (learned the hard way, see opera-app/HANDOFF.md):
 *  - pk_app_/sk_app_  -> app identity. Can mint client keys.
 *  - apiGenerateClientKey(xid) -> pk_client_/sk_client_ for one org (GRANTED once
 *    the org has installed the app).
 *  - app-login with the client key -> a *connection-scoped* token, which is what
 *    `patients`, `insertAppResource`, etc. require.
 *
 * NOTE: this points at the TRAINING endpoint and uses the training app key by
 * default. Everything is overridable via env so prod is just a config change.
 * (Do not confuse with app/api/greyfinch/route.ts, which uses a different user
 * key against the *production* endpoint.)
 */

export const GF_ENDPOINT =
  process.env.GREYFINCH_ENDPOINT ||
  "https://connect-api.training.greyfinch.com/v1/graphql";

const APP_KEY = process.env.GREYFINCH_APP_KEY || "pk_app_u89AZMT27EbGRwhudvW5A/4i6p4ZHaT6";
const APP_SECRET = process.env.GREYFINCH_APP_SECRET || "sk_app_KehC+dGBFOVCQrBEbxR/E81QJ9S6U5bM";

/** The Opera org on training. Override per-tenant in production. */
export const ORG_XID = process.env.GREYFINCH_ORG_XID || "1d099";

/**
 * The app-resource type for timeline videos. Must match the `resources[].type`
 * AND `displays[].resourceType` in opera-app/app.json. Bump the suffix to
 * "namespace-wipe" stale cards: old resources lose their matching display and
 * stop rendering (Connect has no delete-resource API).
 */
export const VIDEO_RESOURCE_TYPE = process.env.GREYFINCH_VIDEO_RESOURCE_TYPE || "opera_video_v2";
export const COMPANY_ID =
  process.env.GREYFINCH_COMPANY_ID || "1d099f24-d0d4-4984-a60b-ed2093d14558";

export type Gql<T = unknown> = { data?: T; errors?: Array<{ message: string; extensions?: Record<string, unknown> }> };

export async function gql<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {},
  auth?: string
): Promise<Gql<T>> {
  const res = await fetch(GF_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(auth ? { authorization: auth } : {}) },
    body: JSON.stringify({ query, variables }),
  });
  return (await res.json()) as Gql<T>;
}

const LOGIN = `mutation($k:String!,$s:String!){apiLogin(key:$k,secret:$s){accessToken status}}`;

/** App-level bearer token (can mint client keys; cannot read patient data). */
export async function appToken(): Promise<string | null> {
  const r = await gql<{ apiLogin: { accessToken: string; status: string } }>(LOGIN, {
    k: APP_KEY,
    s: APP_SECRET,
  });
  return r.data?.apiLogin?.accessToken ? `Bearer ${r.data.apiLogin.accessToken}` : null;
}

/**
 * A connection-scoped bearer token for one org (needed to read patients / write
 * app resources). Returns null if the org hasn't installed the app (INACTIVE).
 */
export async function connectionToken(orgXid: string = ORG_XID): Promise<string | null> {
  const app = await appToken();
  if (!app) return null;
  const ck = await gql<{ apiGenerateClientKey: { key: string; secret: string; status: string } }>(
    `mutation($x:String!,$d:String!){apiGenerateClientKey(xid:$x,description:$d){key secret status}}`,
    { x: orgXid, d: "opera patient-video" },
    app
  );
  const c = ck.data?.apiGenerateClientKey;
  if (!c?.key || c.status !== "GRANTED") return null;
  const login = await gql<{ apiLogin: { accessToken: string; status: string } }>(LOGIN, {
    k: c.key,
    s: c.secret,
  });
  return login.data?.apiLogin?.accessToken ? `Bearer ${login.data.apiLogin.accessToken}` : null;
}

export interface FoundPatient {
  id: string;
  firstName: string;
  lastName: string;
  /** Best textable number (CELL, comms-preference first). Undefined if none textable. */
  phone?: string;
  /** Where the chosen number came from, for transparency in the UI/logs. */
  phoneFrom?: "comms_preference" | "cell";
  /** How many phone numbers the patient has (Neil flagged multi-number profiles). */
  phoneCount?: number;
}

/**
 * Look up a patient by full name. Returns id + best phone.
 *
 * NOTE: lookup is by name because `patients` has no direct xid filter (xid→patient
 * goes through external mappings, and the launchers can't reliably pass xid — see
 * HANDOFF). `xid` is accepted for forward-compat but currently unused.
 */
export async function findPatient(
  auth: string,
  opts: { xid?: string; name?: string }
): Promise<FoundPatient | null> {
  if (!opts.name?.trim()) return null;
  const sel = `id person{ id firstName lastName phones{ value type } } communicationPreferences{ phone type }`;
  const parts = opts.name.trim().split(/\s+/);
  const last = parts[parts.length - 1];
  const first = parts.length > 1 ? parts[0] : undefined;
  const where = first
    ? { person: { firstName: { _ilike: first }, lastName: { _ilike: last } } }
    : { person: { lastName: { _ilike: last } } };
  const rows = await queryPatients(auth, where, sel);

  const p = rows?.[0];
  if (!p) return null;

  // Phone selection for SMS (Neil's feedback: profiles can have >1 number).
  //  - Only CELL numbers are textable (the enum is just CELL | LANDLINE).
  //  - Prefer a number the patient set as a communication preference (the
  //    closest signal to "opted in"); otherwise fall back to the first CELL.
  const phones: Array<{ value: string; type: string }> = p.person?.phones ?? [];
  const cells = phones.filter((x) => /cell|mobile/i.test(x.type));
  const prefPhones = (p.communicationPreferences ?? [])
    .map((c: { phone?: string }) => (c.phone ?? "").trim())
    .filter(Boolean);
  const norm = (s: string) => s.replace(/\D/g, "");
  const prefCell = cells.find((c) => prefPhones.some((pp) => norm(pp) === norm(c.value)));
  const chosen = prefCell ?? cells[0];

  return {
    id: p.id,
    firstName: p.person?.firstName ?? "",
    lastName: p.person?.lastName ?? "",
    phone: chosen?.value,
    phoneFrom: chosen ? (prefCell ? "comms_preference" : "cell") : undefined,
    phoneCount: phones.length,
  };
}

type PatientRow = {
  id: string;
  person?: { firstName?: string; lastName?: string; phones?: Array<{ value: string; type: string }> };
  communicationPreferences?: Array<{ phone?: string; type?: string }>;
};

export interface PatientContext {
  /**
   * The chart "Notes" box content = the patient's `Treatment.notes` (scanned
   * across treatments for the non-empty one), falling back to `Patient.notes`.
   * Maps to the embed "Patient concerns" field.
   */
  notesBox: string;
  /**
   * The chart "Tx Plan Notes" box. NOT exposed by the Connect API (the only
   * treatment string columns are `notes` and `colors`), so this is always "".
   * Kept so the mapping is explicit if Greyfinch ever exposes the field.
   */
  txPlanBox: string;
}

/**
 * Pull the patient's chart notes so the embed can prefill its fields.
 *
 * Handles two realities of the training data: (1) a patient can have several
 * "New Tx" rows and the note lives on the active one (not newest-by-createdAt),
 * and (2) there can be DUPLICATE patients with the same name. So we scan ALL
 * matching patients + ALL their treatments and take the most-recently-edited
 * non-empty note (the launcher only passes the name, so this is the best we can
 * do without a patient id/xid).
 */
export async function getPatientContext(
  auth: string,
  opts: { name?: string }
): Promise<PatientContext> {
  const empty = { notesBox: "", txPlanBox: "" };
  if (!opts.name?.trim()) return empty;
  const parts = opts.name.trim().split(/\s+/);
  const last = parts[parts.length - 1];
  const first = parts.length > 1 ? parts[0] : undefined;
  const where = first
    ? { person: { firstName: { _ilike: first }, lastName: { _ilike: last } } }
    : { person: { lastName: { _ilike: last } } };

  const r = await gql<{
    patients: Array<{ notes?: string; treatments?: Array<{ notes?: string; updatedAt?: string }> }>;
  }>(
    `query($w:PatientBoolExp){
       patients(where:$w, limit:25){
         notes
         treatments{ notes updatedAt }
       }
     }`,
    { w: where },
    auth
  );
  if (r.errors) return empty;
  const patients = r.data?.patients ?? [];

  // Most-recently-edited non-empty treatment note across every matching patient.
  const treatmentNote =
    patients
      .flatMap((p) => p.treatments ?? [])
      .filter((t) => (t.notes ?? "").trim())
      .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))[0]
      ?.notes?.trim() ?? "";
  const patientNote = patients.map((p) => (p.notes ?? "").trim()).find(Boolean) ?? "";

  return { notesBox: treatmentNote || patientNote, txPlanBox: "" };
}

async function queryPatients(
  auth: string,
  where: Record<string, unknown>,
  sel: string
): Promise<PatientRow[] | null> {
  // Order by most-recently-updated so that, when duplicate same-named patients
  // exist, we pick the one the provider is actively working in (matches the
  // notes lookup in getPatientContext).
  const r = await gql<{ patients: PatientRow[] }>(
    `query($w:PatientBoolExp){ patients(where:$w, orderBy:{updatedAt:DESC}, limit:5){ ${sel} } }`,
    { w: where },
    auth
  );
  if (r.errors) return null;
  return r.data?.patients ?? [];
}

/** The org's active app connection id (needed to link patients + write resources). */
export async function activeConnectionId(auth: string): Promise<string | null> {
  const r = await gql<{ connections: Array<{ id: string; status: string }> }>(
    `query{ connections{ id status } }`,
    {},
    auth
  );
  const conns = r.data?.connections ?? [];
  return (conns.find((c) => c.status === "ACTIVE") ?? conns[0])?.id ?? null;
}

/**
 * Link a patient to the app's connection (idempotent "set"). Required before a
 * patient can carry app resources — Greyfinch returns MISSING_PATIENT_CONNECTION
 * otherwise. Safe to call every time.
 */
export async function linkPatientToConnection(
  auth: string,
  connectionId: string,
  patientId: string
): Promise<boolean> {
  const r = await gql<{ setExternalMapping: { resourceId: string } }>(
    `mutation($c:uuid!,$r:uuid!,$d:ExternalMappingResourceData!){
       setExternalMapping(connectionId:$c, resourceId:$r, resourceType:PATIENT, data:$d){ resourceId }
     }`,
    { c: connectionId, r: patientId, d: { linkedBy: "opera-patient-video" } },
    auth
  );
  return !!r.data?.setExternalMapping?.resourceId;
}

export interface AppResourceResult {
  ok: boolean;
  id?: string;
  treatmentId?: string;
  /** true when the write was skipped (e.g. no connection yet) rather than failing hard. */
  skipped?: boolean;
  reason?: string;
}

/**
 * Attach a video to a patient's treatment timeline as an app resource.
 *
 * Requires an established Greyfinch *connection* for the org AND the patient to
 * be linked to it; until the clinic connects the app (API_TOKEN), this returns
 * { skipped: true } with the Greyfinch reason rather than throwing — so callers
 * never break. It starts succeeding the moment a connection/patient link exists.
 */
export async function attachVideoResource(input: {
  orgXid?: string;
  patientId?: string;
  patientName?: string;
  patientXid?: string;
  data: Record<string, unknown>;
}): Promise<AppResourceResult> {
  const auth = await connectionToken(input.orgXid ?? ORG_XID);
  if (!auth) return { ok: false, skipped: true, reason: "no connection for org (app not installed/connected)" };

  let patientId = input.patientId;
  if (!patientId) {
    const p = await findPatient(auth, { xid: input.patientXid, name: input.patientName });
    if (!p) return { ok: false, skipped: true, reason: "patient not found" };
    patientId = p.id;
  }

  // Ensure the patient is linked to the connection first — without this,
  // insertAppResource fails with MISSING_PATIENT_CONNECTION. Idempotent.
  const connId = await activeConnectionId(auth);
  if (!connId) return { ok: false, skipped: true, reason: "no active connection" };
  await linkPatientToConnection(auth, connId, patientId);

  const r = await gql<{ insertAppResource: { id: string; treatmentId: string } }>(
    `mutation($o:AppResourceInput!){insertAppResource(object:$o){ id treatmentId type createdAt }}`,
    { o: { patientId, type: VIDEO_RESOURCE_TYPE, data: input.data } },
    auth
  );
  if (r.errors?.length) {
    const e = r.errors[0];
    const code = (e.extensions?.code as string) || "";
    // Expected until the patient is connected — treat as a soft skip, not a crash.
    const soft = code === "MISSING_PATIENT_CONNECTION" || code === "MISSING_CONNECTION";
    return { ok: false, skipped: soft, reason: `${code || "error"}: ${e.message}` };
  }
  return { ok: true, id: r.data?.insertAppResource?.id, treatmentId: r.data?.insertAppResource?.treatmentId };
}
