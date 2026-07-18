"use client";

import { motion } from "framer-motion";
import type { PipelineStep } from "@/lib/workflow/video-pipeline";

const STEPS: { key: PipelineStep; label: string }[] = [
  { key: "patient", label: "Patient" },
  { key: "configure", label: "Configure" },
  { key: "generating", label: "Preview" },
  { key: "send", label: "Send" },
];

interface PipelineProgressProps {
  currentStep: PipelineStep;
  onStepClick: (step: PipelineStep) => void;
  completedSteps: Set<PipelineStep>;
}

export default function PipelineProgress({
  currentStep,
  onStepClick,
  completedSteps,
}: PipelineProgressProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-0 py-6 px-4">
      {STEPS.map((step, i) => {
        const isCompleted = completedSteps.has(step.key);
        const isCurrent = step.key === currentStep;
        const isUpcoming = !isCompleted && !isCurrent;
        const canClick = isCompleted && !isCurrent;

        return (
          <div key={step.key} className="flex items-center">
            {/* Step circle + label */}
            <button
              onClick={() => canClick && onStepClick(step.key)}
              disabled={!canClick}
              className={`flex flex-col items-center gap-1.5 ${
                canClick ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="relative">
                {isCompleted && (
                  <div className="w-8 h-8 rounded-full bg-[#5f7a61] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                )}
                {isCurrent && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full border-2 border-[#5f7a61] flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-3 h-3 rounded-full bg-[#5f7a61]"
                    />
                  </motion.div>
                )}
                {isUpcoming && (
                  <div className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center">
                    <span className="text-xs text-gray-600">{i + 1}</span>
                  </div>
                )}
              </div>
              <span
                className={`text-xs whitespace-nowrap ${
                  isCurrent
                    ? "text-white font-medium"
                    : isCompleted
                    ? "text-[#5f7a61]"
                    : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </button>

            {/* Connecting line */}
            {i < STEPS.length - 1 && (
              <div className="w-12 md:w-20 h-0.5 mx-2 mt-[-18px]">
                <div
                  className={`h-full rounded-full ${
                    i < currentIndex ? "bg-[#5f7a61]" : "bg-gray-800"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
