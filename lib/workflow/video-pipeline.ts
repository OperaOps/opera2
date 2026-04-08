/**
 * Pipeline state machine types for the clinic video generation workflow.
 * State lives in React — not persisted to DB.
 */

export type PipelineStep = "patient" | "configure" | "generating" | "send";

export interface PipelinePatient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone?: string;
  accessCode: string;
  isNew: boolean;
  treatmentType?: string;
  consultingProvider?: string;
  consultationDate?: string;
}

export interface PipelineVideoConfig {
  treatmentType: string;
  providerNotes?: string;
  consultingProvider?: string;
  consultationDate?: string;
  autoFilledFrom?: "image_parse" | "manual";
}

export interface PipelineVideo {
  videoId: string;
  renderJobId?: string;
  status: "pending" | "rendering" | "completed" | "failed";
  videoUrl?: string;
  videoTitle?: string;
}

export interface PipelineSent {
  method: "email" | "sms" | "link_copied";
  sentAt: string;
}

export interface PipelineState {
  currentStep: PipelineStep;
  patient: PipelinePatient | null;
  videoConfig: PipelineVideoConfig | null;
  video: PipelineVideo | null;
  sent: PipelineSent | null;
}

export const INITIAL_PIPELINE_STATE: PipelineState = {
  currentStep: "patient",
  patient: null,
  videoConfig: null,
  video: null,
  sent: null,
};
