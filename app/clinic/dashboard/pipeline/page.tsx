"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import type {
  PipelineState,
  PipelinePatient,
  PipelineVideoConfig,
  PipelineVideo,
  PipelineSent,
  PipelineStep,
} from "@/lib/workflow/video-pipeline";
import { INITIAL_PIPELINE_STATE } from "@/lib/workflow/video-pipeline";
import PipelineProgress from "@/Components/clinic-portal/pipeline/PipelineProgress";
import PatientStep from "@/Components/clinic-portal/pipeline/PatientStep";
import ConfigureStep from "@/Components/clinic-portal/pipeline/ConfigureStep";
import PreviewStep from "@/Components/clinic-portal/pipeline/PreviewStep";
import SendStep from "@/Components/clinic-portal/pipeline/SendStep";

export default function PipelinePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<PipelineState>(INITIAL_PIPELINE_STATE);
  const [loading, setLoading] = useState(false);

  // Deep-link: pre-select patient from query param
  useEffect(() => {
    const patientId = searchParams.get("patient_id");
    if (!patientId) return;

    setLoading(true);
    fetch(`/api/clinic/patients/${patientId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.patient) {
          const p = data.patient;
          const patient: PipelinePatient = {
            id: p.id,
            firstName: p.first_name,
            lastName: p.last_name,
            email: p.email,
            dateOfBirth: p.date_of_birth,
            phone: p.phone || undefined,
            accessCode: p.access_code,
            isNew: false,
            treatmentType: p.treatment_type || undefined,
            consultingProvider: p.consulting_provider || undefined,
            consultationDate: p.consultation_date || undefined,
          };
          setState((s) => ({
            ...s,
            patient,
            currentStep: "configure",
          }));
        }
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  const completedSteps = new Set<PipelineStep>();
  if (state.patient) completedSteps.add("patient");
  if (state.videoConfig) completedSteps.add("configure");
  if (state.video?.status === "completed") completedSteps.add("generating");
  if (state.sent) completedSteps.add("send");

  function handleStepClick(step: PipelineStep) {
    setState((s) => ({ ...s, currentStep: step }));
  }

  const handlePatientNext = useCallback((patient: PipelinePatient) => {
    setState((s) => ({ ...s, patient, currentStep: "configure" }));
  }, []);

  const handleConfigureNext = useCallback(
    async (config: PipelineVideoConfig) => {
      if (!state.patient) return;

      // Save consultation details
      await fetch(`/api/clinic/patients/${state.patient.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treatment_type: config.treatmentType,
          consulting_provider: config.consultingProvider,
          consultation_date: config.consultationDate,
        }),
      });

      // Trigger video generation
      const res = await fetch(
        `/api/clinic/patients/${state.patient.id}/generate-video`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            treatment_type: config.treatmentType,
            provider_notes: config.providerNotes,
          }),
        }
      );
      const data = await res.json();

      const video: PipelineVideo = {
        videoId: data.videoRecordId,
        renderJobId: data.jobId,
        status: "rendering",
      };

      setState((s) => ({
        ...s,
        videoConfig: config,
        video,
        currentStep: "generating",
      }));
    },
    [state.patient]
  );

  const handleVideoUpdate = useCallback((video: PipelineVideo) => {
    setState((s) => ({ ...s, video }));
  }, []);

  const handleRegenerate = useCallback(async () => {
    if (!state.patient || !state.videoConfig) return;

    const res = await fetch(
      `/api/clinic/patients/${state.patient.id}/generate-video`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treatment_type: state.videoConfig.treatmentType,
          provider_notes: state.videoConfig.providerNotes,
        }),
      }
    );
    const data = await res.json();

    setState((s) => ({
      ...s,
      video: {
        videoId: data.videoRecordId,
        renderJobId: data.jobId,
        status: "rendering",
      },
    }));
  }, [state.patient, state.videoConfig]);

  const handleSendDone = useCallback(
    (sent: PipelineSent) => {
      setState((s) => ({ ...s, sent, currentStep: "send" }));
      // Brief delay then redirect
      setTimeout(() => router.push("/clinic/dashboard"), 1500);
    },
    [router]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <PipelineProgress
        currentStep={state.currentStep}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
      />

      <div className="mt-4">
        <AnimatePresence mode="wait">
          {state.currentStep === "patient" && (
            <PatientStep
              key="patient"
              initial={state.patient}
              onNext={handlePatientNext}
            />
          )}

          {state.currentStep === "configure" && state.patient && (
            <ConfigureStep
              key="configure"
              patient={state.patient}
              initial={state.videoConfig}
              onBack={() =>
                setState((s) => ({ ...s, currentStep: "patient" }))
              }
              onNext={handleConfigureNext}
            />
          )}

          {state.currentStep === "generating" &&
            state.patient &&
            state.video &&
            state.videoConfig && (
              <PreviewStep
                key="generating"
                patient={state.patient}
                treatmentType={state.videoConfig.treatmentType}
                video={state.video}
                onVideoUpdate={handleVideoUpdate}
                onRegenerate={handleRegenerate}
                onNext={() =>
                  setState((s) => ({ ...s, currentStep: "send" }))
                }
              />
            )}

          {state.currentStep === "send" && state.patient && (
            <SendStep
              key="send"
              patient={state.patient}
              onBack={() =>
                setState((s) => ({ ...s, currentStep: "generating" }))
              }
              onDone={handleSendDone}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
