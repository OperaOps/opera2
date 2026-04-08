"use client";

import { useState } from "react";
import { TREATMENT_TYPES } from "@/lib/constants/treatment-types";

interface GenerateVideoFormProps {
  patientId: string;
  defaultTreatment?: string;
  onStarted: (jobId: string, videoRecordId: string) => void;
  onError: (error: string) => void;
  compact?: boolean;
}

export default function GenerateVideoForm({
  patientId,
  defaultTreatment,
  onStarted,
  onError,
  compact = false,
}: GenerateVideoFormProps) {
  const [treatment, setTreatment] = useState(defaultTreatment || "");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleGenerate() {
    if (!treatment) {
      onError("Please select a treatment type");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(
        `/api/clinic/patients/${patientId}/generate-video`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            treatment_type: treatment,
            provider_notes: notes || undefined,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        onError(data.error || "Failed to start video generation");
        return;
      }
      onStarted(data.jobId, data.videoRecordId);
    } catch {
      onError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <div>
        <label className="text-xs text-gray-400 mb-1 block">
          Treatment Type
        </label>
        <select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="w-full rounded-lg bg-gray-900/80 border border-gray-700 text-white text-sm p-2.5
            focus:border-violet-500 outline-none"
        >
          <option value="">Select treatment...</option>
          <optgroup label="Dental">
            {TREATMENT_TYPES.filter((t) => t.specialty === "dental").map(
              (t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              )
            )}
          </optgroup>
          <optgroup label="Orthodontic">
            {TREATMENT_TYPES.filter((t) => t.specialty === "orthodontic").map(
              (t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              )
            )}
          </optgroup>
        </select>
      </div>

      <div>
        <label className="text-xs text-gray-400 mb-1 block">
          Provider notes for video{" "}
          <span className="text-gray-600">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={compact ? 2 : 3}
          placeholder="e.g. patient has mild crowding on lower arch, concerned about treatment duration"
          className="w-full rounded-lg bg-gray-900/80 border border-gray-700 text-white text-sm p-2.5
            focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 outline-none
            placeholder:text-gray-600 resize-none"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={!treatment || submitting}
        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600
          hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium
          transition-all shadow-lg shadow-violet-600/20
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Starting..." : "Generate Video"}
      </button>
    </div>
  );
}
