/**
 * Types for the mock generation pipeline API.
 * Everything here is education-only and operates on synthetic demo data.
 */

import type { PersonalizationSignal } from '@/lib/types';

export interface GenerateRequest {
  useCaseId: string;
}

export interface ScriptResponse {
  useCaseId: string;
  opening: string;
  fullNarration: string;
  closing: string;
  disclaimer: string;
  wordCount: number;
  estimatedSeconds: number;
}

export interface StoryboardSceneSummary {
  index: number;
  sceneTitle: string;
  onScreenText: string;
  visualType: string;
  durationSec: number;
}

export interface StoryboardResponse {
  useCaseId: string;
  sceneCount: number;
  scenes: StoryboardSceneSummary[];
}

/** The human dimensions Opera personalizes on. */
export const PERSONALIZATION_DIMENSIONS = [
  'Care journey',
  'Treatment / procedure / follow-up context',
  'Patient concerns',
  'Patient goals',
  'Barriers to care',
  'Language preference',
  'Caregiver involvement',
  'Health literacy',
  'Approved care-team context',
] as const;

/** What Opera explicitly does NOT generate. */
export const DOES_NOT_GENERATE = [
  'Diagnosis',
  'Treatment recommendation',
  'Medication change',
  'Independent result interpretation',
  'Patient-specific risk prediction',
  'Emergency advice or triage',
] as const;

export interface PersonalizationResponse {
  useCaseId: string;
  signals: PersonalizationSignal[];
  dimensionsUsed: string[];
  doesNotGenerate: string[];
}

export interface ComplianceCheckItem {
  label: string;
  status: 'pass' | 'review';
}

export interface ComplianceResponse {
  useCaseId: string;
  passed: boolean;
  checks: ComplianceCheckItem[];
  doesNotGenerate: string[];
  humanReviewRequired: true;
}

export interface VisualSceneSummary {
  index: number;
  visualType: string;
  component: string;
  motion: string;
}

export interface VisualScenesResponse {
  useCaseId: string;
  sceneCount: number;
  scenes: VisualSceneSummary[];
  renderTargets: string[];
}

export type JobStatus =
  | 'queued'
  | 'scripting'
  | 'personalizing'
  | 'storyboarding'
  | 'visual-generation'
  | 'compliance-review'
  | 'human-review-required'
  | 'preview-ready';

export interface VideoJobResponse {
  jobId: string;
  useCaseId: string;
  status: JobStatus;
  statusLabel: string;
  progress: number; // 0..1
  ready: boolean;
  humanReviewRequired: boolean;
}
