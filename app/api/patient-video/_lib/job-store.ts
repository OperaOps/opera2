/**
 * Video render job store: in-memory (single instance) or DynamoDB (multi-instance).
 *
 * For App Runner with max instances > 1, set PATIENT_VIDEO_JOBS_TABLE so status
 * polls and playback work on any replica.
 */

export type { VideoJob, RenderInput } from "./job-types";

import type { VideoJob } from "./job-types";
import {
  dynamoGetJob,
  dynamoPutJob,
  isDynamoJobStoreEnabled,
} from "./job-store-dynamo";

const GLOBAL_KEY = "__patientVideoJobStore" as const;

function getOrCreateJobStore(): Map<string, VideoJob> {
  const g = globalThis as Record<string, unknown>;
  if (!g[GLOBAL_KEY]) {
    g[GLOBAL_KEY] = new Map<string, VideoJob>();
  }
  return g[GLOBAL_KEY] as Map<string, VideoJob>;
}

/** In-process map; only consistent when PATIENT_VIDEO_JOBS_TABLE is unset. */
export const jobStore = getOrCreateJobStore();

export async function loadJob(jobId: string): Promise<VideoJob | undefined> {
  if (isDynamoJobStoreEnabled()) {
    return dynamoGetJob(jobId);
  }
  return jobStore.get(jobId);
}

export async function saveJob(jobId: string, job: VideoJob): Promise<void> {
  if (isDynamoJobStoreEnabled()) {
    await dynamoPutJob(jobId, job);
  } else {
    jobStore.set(jobId, job);
  }
}

const updateQueues = new Map<string, Promise<void>>();

/**
 * Serialize read-modify-write per job so concurrent worker stdout lines do not
 * clobber each other when using DynamoDB.
 */
export function scheduleJobSave(
  jobId: string,
  mutator: (job: VideoJob) => void
): void {
  const prev = updateQueues.get(jobId) ?? Promise.resolve();
  const run = prev.then(async () => {
    const j = await loadJob(jobId);
    if (!j) return;
    mutator(j);
    await saveJob(jobId, j);
  });
  updateQueues.set(
    jobId,
    run.catch((err) =>
      console.error("[patient-video] job save failed", jobId, err)
    )
  );
}
