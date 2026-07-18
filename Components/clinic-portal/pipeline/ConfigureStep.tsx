"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TREATMENT_TYPES } from "@/lib/constants/treatment-types";
import type { PipelinePatient, PipelineVideoConfig } from "@/lib/workflow/video-pipeline";

interface ConfigureStepProps {
  patient: PipelinePatient;
  initial?: PipelineVideoConfig | null;
  onBack: () => void;
  onNext: (config: PipelineVideoConfig) => void;
}

export default function ConfigureStep({
  patient,
  initial,
  onBack,
  onNext,
}: ConfigureStepProps) {
  const [treatmentType, setTreatmentType] = useState(
    initial?.treatmentType || patient.treatmentType || ""
  );
  const [provider, setProvider] = useState(
    initial?.consultingProvider || patient.consultingProvider || ""
  );
  const [date, setDate] = useState(
    initial?.consultationDate || patient.consultationDate || ""
  );
  const [notes, setNotes] = useState(initial?.providerNotes || "");
  const [error, setError] = useState("");

  function handleGenerate() {
    if (!treatmentType) {
      setError("Please select a treatment type");
      return;
    }
    setError("");
    onNext({
      treatmentType,
      providerNotes: notes || undefined,
      consultingProvider: provider || undefined,
      consultationDate: date || undefined,
      autoFilledFrom: initial?.autoFilledFrom || "manual",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-xl mx-auto space-y-6"
    >
      <h2 className="text-lg text-white font-light">Configure Video</h2>

      {/* Patient summary */}
      <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-lg p-3">
        <div>
          <p className="text-white text-sm">
            {patient.firstName} {patient.lastName}
          </p>
          <p className="text-gray-500 text-xs">{patient.email}</p>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-[#5f7a61] hover:text-[#5f7a61]/70 transition-colors"
        >
          Edit
        </button>
      </div>

      {/* Treatment */}
      <div>
        <label className="text-xs text-gray-400 mb-1 block">
          Treatment Type *
        </label>
        <select
          value={treatmentType}
          onChange={(e) => setTreatmentType(e.target.value)}
          className="w-full rounded-lg bg-gray-900/80 border border-gray-700 text-white text-sm p-2.5
            focus:border-[#5f7a61] outline-none"
        >
          <option value="">Select treatment...</option>
          <optgroup label="Dental">
            {TREATMENT_TYPES.filter((t) => t.specialty === "dental").map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </optgroup>
          <optgroup label="Orthodontic">
            {TREATMENT_TYPES.filter((t) => t.specialty === "orthodontic").map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Consultation details */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Consulting Provider</label>
          <input
            type="text"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            placeholder="Dr. Martinez"
            className="w-full rounded-lg bg-gray-900/80 border border-gray-700 text-white text-sm p-2.5
              focus:border-[#5f7a61] outline-none placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Consultation Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg bg-gray-900/80 border border-gray-700 text-white text-sm p-2.5
              focus:border-[#5f7a61] outline-none [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Provider notes */}
      <div>
        <label className="text-xs text-gray-400 mb-1 block">
          Provider Notes <span className="text-gray-600">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="e.g. patient has mild crowding on lower arch, concerned about treatment duration. Discussed 12-month estimate with refinements."
          className="w-full rounded-lg bg-gray-900/80 border border-gray-700 text-white text-sm p-2.5
            focus:border-[#5f7a61] focus:ring-1 focus:ring-[#5f7a61]/40 outline-none
            placeholder:text-gray-600 resize-none"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Patient
        </button>
        <button
          onClick={handleGenerate}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5f7a61] to-[#5f7a61]
            hover:from-[#4e6650] hover:to-[#4e6650] text-white font-medium transition-all
            shadow-lg shadow-[#5f7a61]/20"
        >
          Generate Video <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
