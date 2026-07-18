"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ClinicHeader from "@/Components/patient-portal/ClinicHeader";
import VideoPlayer from "@/Components/patient-portal/VideoPlayer";
import SurveyForm from "@/Components/patient-portal/SurveyForm";

type PortalState =
  | "VIDEO_PLAYING"
  | "VIDEO_COMPLETED"
  | "SURVEY"
  | "SURVEY_COMPLETED"
  | "REWATCH";

interface PatientInfo {
  firstName: string;
  lastName: string;
  videoUrl: string | null;
  videoTitle: string | null;
  treatmentType: string | null;
  videoWatched: boolean;
  surveyCompleted: boolean;
}

interface ClinicInfo {
  name: string;
  address: string;
}

export default function PatientPortalPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<PatientInfo | null>(null);
  const [clinic, setClinic] = useState<ClinicInfo | null>(null);
  const [state, setState] = useState<PortalState>("VIDEO_PLAYING");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("patientData");
    if (!stored) {
      router.push("/patient/login");
      return;
    }

    try {
      const data = JSON.parse(stored);
      setPatient(data.patient);
      setClinic(data.clinic);

      // Determine initial state based on existing progress
      if (data.patient.surveyCompleted) {
        setState("SURVEY_COMPLETED");
      } else if (data.patient.videoWatched) {
        setState("VIDEO_COMPLETED");
      }
    } catch {
      router.push("/patient/login");
      return;
    }

    setLoading(false);
  }, [router]);

  const handleVideoComplete = useCallback(
    async (durationSeconds: number) => {
      setState("VIDEO_COMPLETED");
      try {
        await fetch("/api/patient/video/watched", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ duration_seconds: durationSeconds }),
        });
      } catch {
        // non-blocking
      }
    },
    []
  );

  const handleSurveySubmit = useCallback(
    async (data: Record<string, unknown>) => {
      const res = await fetch("/api/patient/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit survey");
      }
      setState("SURVEY_COMPLETED");
    },
    []
  );

  if (loading || !patient || !clinic) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#5f7a61] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!patient.videoUrl) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <ClinicHeader
            clinicName={clinic.name}
            clinicAddress={clinic.address}
            patientFirstName={patient.firstName}
          />
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-8">
            <p className="text-gray-400 font-light">
              Your personalized video is being prepared. Please check back
              soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5f7a61]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5f7a61]/3 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 md:py-12">
        <ClinicHeader
          clinicName={clinic.name}
          clinicAddress={clinic.address}
          patientFirstName={patient.firstName}
        />

        <AnimatePresence mode="wait">
          {/* VIDEO_PLAYING state */}
          {state === "VIDEO_PLAYING" && (
            <motion.div
              key="video-playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <VideoPlayer
                src={patient.videoUrl}
                onComplete={handleVideoComplete}
              />
            </motion.div>
          )}

          {/* VIDEO_COMPLETED state */}
          {state === "VIDEO_COMPLETED" && (
            <motion.div
              key="video-completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Smaller video */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 0.9, opacity: 0.8 }}
                transition={{ duration: 0.5 }}
                className="origin-top"
              >
                <VideoPlayer
                  src={patient.videoUrl}
                  onComplete={() => {}}
                />
              </motion.div>

              {/* CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 text-center"
              >
                <p className="text-gray-200 font-light mb-4">
                  Thank you for watching! We&apos;d love to hear about your
                  experience.
                </p>
                <button
                  onClick={() => setState("SURVEY")}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#5f7a61] to-[#5f7a61]
                    hover:from-[#4e6650] hover:to-[#4e6650] text-white font-medium
                    transition-all shadow-lg shadow-[#5f7a61]/20 text-lg"
                >
                  Take a Quick Survey
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* SURVEY state */}
          {state === "SURVEY" && (
            <motion.div
              key="survey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SurveyForm
                onSubmit={handleSurveySubmit}
                onBackToVideo={() => setState("VIDEO_COMPLETED")}
              />
            </motion.div>
          )}

          {/* REWATCH state (after survey completed, with download) */}
          {state === "REWATCH" && (
            <motion.div
              key="rewatch"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <VideoPlayer
                src={patient.videoUrl}
                onComplete={() => {}}
                showDownload
              />
              <button
                onClick={() => setState("SURVEY_COMPLETED")}
                className="text-sm text-[#5f7a61] hover:text-[#3e5540] transition-colors flex items-center gap-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6" />
                </svg>
                Back
              </button>
            </motion.div>
          )}

          {/* SURVEY_COMPLETED state */}
          {state === "SURVEY_COMPLETED" && (
            <motion.div
              key="survey-completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 py-8"
            >
              {/* Confetti-like particles */}
              <div className="relative">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 1,
                      y: 0,
                      x: 0,
                      scale: 1,
                    }}
                    animate={{
                      opacity: 0,
                      y: -100 - Math.random() * 200,
                      x: (Math.random() - 0.5) * 300,
                      scale: 0,
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      delay: Math.random() * 0.5,
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-0 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        i % 3 === 0
                          ? "#8B5CF6"
                          : i % 3 === 1
                          ? "#C084FC"
                          : "#FCD34D",
                    }}
                  />
                ))}

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-[#5f7a61]/20 flex items-center justify-center mx-auto"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-light text-white">
                  Thank you for your feedback!
                </h2>
                <p className="text-gray-400 mt-2">
                  Your responses help {clinic.name} provide the best possible
                  care.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={() => setState("REWATCH")}
                  className="px-6 py-3 rounded-xl bg-gray-900/80 border border-gray-800
                    hover:border-gray-700 text-gray-300 hover:text-white font-light
                    transition-all"
                >
                  Rewatch Your Video
                </button>
              </motion.div>

              {/* Powered by */}
              <p className="text-gray-700 text-xs pt-8">
                Powered by Opera AI
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
