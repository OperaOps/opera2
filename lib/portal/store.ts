/**
 * Durable portal data that must survive serverless deploys:
 * patients created in the portal and patient assistant chat logs.
 *
 * Lives in the same single-table store as clinic accounts
 * (OPERA_CLINICS_TABLE via lib/connect/clinic-store):
 *   PATIENT#<clinicId>#<patientId> → PortalPatient
 *   PATIENTIDX#<clinicId>          → { ids: string[] }
 *   CHAT#<shareId>                 → ChatLog (assistant session per share link)
 */

import crypto from "node:crypto";
import { portalGetItem, portalPutItem } from "@/lib/connect/clinic-store";

export interface PortalPatient {
  patientId: string;
  clinicId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  treatmentType?: string;
  provider?: string;
  notes?: string;
  /** render job ids (= share ids) generated for this patient */
  videoJobs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatEvent {
  role: "patient" | "opera";
  text: string;
  ts: string;
}

export interface ChatLog {
  shareId: string;
  clinicId?: string;
  patientName?: string;
  treatmentType?: string;
  events: ChatEvent[];
  startedAt: string;
  lastActiveAt: string;
  questionCount: number;
}

const idxKey = (clinicId: string) => `PATIENTIDX#${clinicId}`;
const patKey = (clinicId: string, id: string) => `PATIENT#${clinicId}#${id}`;

export async function listPortalPatients(clinicId: string): Promise<PortalPatient[]> {
  const idx = await portalGetItem(idxKey(clinicId));
  const ids = (idx?.ids as string[]) ?? [];
  const out: PortalPatient[] = [];
  for (const id of ids) {
    const item = await portalGetItem(patKey(clinicId, id));
    if (item) out.push(item as unknown as PortalPatient);
  }
  return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getPortalPatient(
  clinicId: string,
  patientId: string
): Promise<PortalPatient | null> {
  const item = await portalGetItem(patKey(clinicId, patientId));
  return (item as unknown as PortalPatient) ?? null;
}

async function addToIndex(clinicId: string, patientId: string): Promise<void> {
  const idx = await portalGetItem(idxKey(clinicId));
  const ids = new Set<string>((idx?.ids as string[]) ?? []);
  if (!ids.has(patientId)) {
    ids.add(patientId);
    await portalPutItem(idxKey(clinicId), { ids: Array.from(ids) });
  }
}

export async function savePortalPatient(patient: PortalPatient): Promise<void> {
  patient.updatedAt = new Date().toISOString();
  await portalPutItem(
    patKey(patient.clinicId, patient.patientId),
    patient as unknown as Record<string, unknown>
  );
  await addToIndex(patient.clinicId, patient.patientId);
}

export async function deletePortalPatient(clinicId: string, patientId: string): Promise<void> {
  // tombstone: drop from index (the item itself is cheap to leave behind)
  const idx = await portalGetItem(idxKey(clinicId));
  const ids = ((idx?.ids as string[]) ?? []).filter((i) => i !== patientId);
  await portalPutItem(idxKey(clinicId), { ids });
}

/** Find a clinic patient by exact name (case-insensitive), or create one. */
export async function upsertPatientByName(
  clinicId: string,
  input: {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    treatmentType?: string;
    provider?: string;
    notes?: string;
  }
): Promise<PortalPatient> {
  const patients = await listPortalPatients(clinicId);
  const found = patients.find(
    (p) =>
      p.firstName.trim().toLowerCase() === input.firstName.trim().toLowerCase() &&
      p.lastName.trim().toLowerCase() === input.lastName.trim().toLowerCase()
  );
  if (found) {
    let dirty = false;
    for (const k of ["email", "phone", "treatmentType", "provider", "notes"] as const) {
      if (input[k] && input[k] !== found[k]) {
        (found as unknown as Record<string, unknown>)[k] = input[k];
        dirty = true;
      }
    }
    if (dirty) await savePortalPatient(found);
    return found;
  }
  const now = new Date().toISOString();
  const fresh: PortalPatient = {
    patientId: crypto.randomUUID(),
    clinicId,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email,
    phone: input.phone,
    treatmentType: input.treatmentType,
    provider: input.provider,
    notes: input.notes,
    videoJobs: [],
    createdAt: now,
    updatedAt: now,
  };
  await savePortalPatient(fresh);
  return fresh;
}

export async function attachJobToPatient(
  clinicId: string,
  patientId: string,
  jobId: string
): Promise<void> {
  const patient = await getPortalPatient(clinicId, patientId);
  if (!patient) return;
  if (!patient.videoJobs.includes(jobId)) {
    patient.videoJobs.push(jobId);
    await savePortalPatient(patient);
  }
}

// ---------------------------------------------------------------------------
// Pre-consult share records (no render job — the clinic's own tour video)
// ---------------------------------------------------------------------------

export interface PreconsultShare {
  shareId: string;
  stage: "pre";
  clinicId: string;
  clinicName: string;
  provider?: string;
  patientFirstName: string;
  patientLastName?: string;
  appointmentType: string;
  appointmentDate?: string;
  personalNote?: string;
  videoUrl: string;
  /** true when music is baked into the file; false = overlay bgm on the page */
  audioBaked: boolean;
  logoUrl?: string | null;
  createdAt: string;
  /** Pipeline job rendering the personalized welcome video ("Hi {name}…" with
   *  voiceover over the tour footage). Once it completes, the share page
   *  prefers the rendered video over the raw tour. */
  renderJobId?: string;
}

export async function savePreconsultShare(share: PreconsultShare): Promise<void> {
  await portalPutItem(`SHARE#${share.shareId}`, share as unknown as Record<string, unknown>);
}

export async function getPreconsultShare(shareId: string): Promise<PreconsultShare | null> {
  const item = await portalGetItem(`SHARE#${shareId}`);
  return (item as unknown as PreconsultShare) ?? null;
}

// ---------------------------------------------------------------------------
// Assistant chat logs
// ---------------------------------------------------------------------------

export async function appendChatExchange(
  shareId: string,
  meta: { clinicId?: string; patientName?: string; treatmentType?: string },
  question: string,
  answer: string,
  askedAt: string,
  answeredAt: string
): Promise<void> {
  const pk = `CHAT#${shareId}`;
  const existing = (await portalGetItem(pk)) as unknown as ChatLog | null;
  const log: ChatLog = existing ?? {
    shareId,
    clinicId: meta.clinicId,
    patientName: meta.patientName,
    treatmentType: meta.treatmentType,
    events: [],
    startedAt: askedAt,
    lastActiveAt: askedAt,
    questionCount: 0,
  };
  log.events.push({ role: "patient", text: question, ts: askedAt });
  log.events.push({ role: "opera", text: answer, ts: answeredAt });
  // keep the log bounded — the most recent 80 events
  if (log.events.length > 80) log.events = log.events.slice(-80);
  log.lastActiveAt = answeredAt;
  log.questionCount += 1;
  if (meta.patientName && !log.patientName) log.patientName = meta.patientName;
  if (meta.treatmentType && !log.treatmentType) log.treatmentType = meta.treatmentType;
  await portalPutItem(pk, log as unknown as Record<string, unknown>);
}

export async function getChatLog(shareId: string): Promise<ChatLog | null> {
  const item = await portalGetItem(`CHAT#${shareId}`);
  return (item as unknown as ChatLog) ?? null;
}

export async function getChatLogs(shareIds: string[]): Promise<ChatLog[]> {
  const out: ChatLog[] = [];
  for (const id of shareIds) {
    const log = await getChatLog(id);
    if (log) out.push(log);
  }
  return out.sort((a, b) => (a.lastActiveAt < b.lastActiveAt ? 1 : -1));
}
