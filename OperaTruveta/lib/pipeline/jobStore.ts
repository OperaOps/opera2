/**
 * In-memory mock video-job store. Status advances purely from elapsed time since
 * creation, so polling GET /api/video-job/[id] shows a realistic progression
 * without any background workers. Suitable for a local concept demo.
 */

import type { JobStatus, VideoJobResponse } from './types';

interface Job {
  id: string;
  useCaseId: string;
  createdAt: number;
}

// Persist across hot-reloads in dev by hanging the map off globalThis.
const store: Map<string, Job> =
  (globalThis as any).__operaJobStore ?? new Map<string, Job>();
(globalThis as any).__operaJobStore = store;

/** Cumulative schedule: at `untilMs` elapsed, the job is in `status`. */
const SCHEDULE: { status: JobStatus; untilMs: number; label: string }[] = [
  { status: 'queued', untilMs: 900, label: 'Queued' },
  { status: 'scripting', untilMs: 2200, label: 'Generating script' },
  { status: 'personalizing', untilMs: 3500, label: 'Applying personalization' },
  { status: 'storyboarding', untilMs: 4900, label: 'Generating storyboard' },
  { status: 'visual-generation', untilMs: 6400, label: 'Generating visual scenes' },
  { status: 'compliance-review', untilMs: 7700, label: 'Compliance review' },
  { status: 'human-review-required', untilMs: 9000, label: 'Human review required' },
  { status: 'preview-ready', untilMs: Number.POSITIVE_INFINITY, label: 'Preview ready' },
];

const TOTAL_MS = 9000;

function makeId(useCaseId: string): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `job_${useCaseId.slice(0, 6)}_${rand}`;
}

export function createJob(useCaseId: string): VideoJobResponse {
  const id = makeId(useCaseId);
  store.set(id, { id, useCaseId, createdAt: Date.now() });
  return statusFor(id)!;
}

export function statusFor(id: string): VideoJobResponse | null {
  const job = store.get(id);
  if (!job) return null;
  const elapsed = Date.now() - job.createdAt;
  const stage = SCHEDULE.find((s) => elapsed < s.untilMs) ?? SCHEDULE[SCHEDULE.length - 1];
  const ready = stage.status === 'preview-ready';
  return {
    jobId: job.id,
    useCaseId: job.useCaseId,
    status: stage.status,
    statusLabel: stage.label,
    progress: ready ? 1 : Math.min(elapsed / TOTAL_MS, 0.99),
    ready,
    humanReviewRequired: true,
  };
}
