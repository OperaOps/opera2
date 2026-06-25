/**
 * Per-patient video library.
 *
 * Maps a patient key -> the videos generated for that patient, so the "Patient
 * videos" launcher can list a patient's history with watch/copy/download.
 *
 * The key is the Greyfinch patient xid when available, otherwise the normalized
 * patient name. (The patient-chart launchers can reliably pass the name via
 * confirmed merge fields; passing the xid via {{patient.external.id}} broke the
 * launcher, so name is the safe default until we confirm the right id field.)
 *
 * In-memory (single instance) to match the default job store. POC-grade; resets
 * on server restart. For production, back this with DynamoDB keyed by patient.
 */

export interface PatientVideoEntry {
  jobId: string;
  key: string;
  xid?: string;
  patientName: string;
  treatment: string;
  createdAt: number;
}

/** Normalize an xid or name into a stable lookup key. */
export function patientKey(xidOrName: string | undefined | null): string {
  return (xidOrName || "").trim().toLowerCase();
}

const GLOBAL_KEY = "__patientVideoLibrary" as const;

function getStore(): Map<string, PatientVideoEntry[]> {
  const g = globalThis as Record<string, unknown>;
  if (!g[GLOBAL_KEY]) {
    g[GLOBAL_KEY] = new Map<string, PatientVideoEntry[]>();
  }
  return g[GLOBAL_KEY] as Map<string, PatientVideoEntry[]>;
}

/** Record a generated video against a patient key (newest first). */
export function recordPatientVideo(entry: PatientVideoEntry): void {
  if (!entry.key) return;
  const store = getStore();
  const list = store.get(entry.key) ?? [];
  list.unshift(entry);
  store.set(entry.key, list);
}

/** All recorded videos for a patient key (newest first). */
export function getPatientVideos(key: string): PatientVideoEntry[] {
  if (!key) return [];
  return getStore().get(key) ?? [];
}
