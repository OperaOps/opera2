"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ParsedData {
  patient_first_name?: string | null;
  patient_last_name?: string | null;
  patient_email?: string | null;
  patient_date_of_birth?: string | null;
  patient_phone?: string | null;
  treatment_type?: string | null;
  consulting_provider?: string | null;
  consultation_date?: string | null;
  clinical_notes?: string | null;
}

interface ConsultImageUploadProps {
  onAccept: (data: ParsedData) => void;
}

export default function ConsultImageUpload({ onAccept }: ConsultImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState<ParsedData | null>(null);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setError("Please upload an image (PNG, JPG) or PDF");
      return;
    }
    setError("");
    setParsing(true);
    setParsed(null);

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch("/api/clinic/parse-consult-image", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to parse image");
        return;
      }
      setParsed(data.parsed || {});
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setParsing(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  const hasData = parsed && Object.values(parsed).some((v) => v != null);

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-4">
      <h4 className="text-sm text-gray-300 font-medium flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
        Quick Fill from Image
      </h4>
      <p className="text-xs text-gray-500">
        Drop a consult note, PMS screenshot, or treatment card to auto-populate fields
      </p>

      {!parsed && !parsing && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            dragging
              ? "border-violet-500 bg-violet-500/5"
              : "border-gray-700 hover:border-gray-600"
          }`}
        >
          <p className="text-gray-400 text-sm">
            Drag & drop or click to upload
          </p>
          <p className="text-gray-600 text-xs mt-1">PNG, JPG, PDF supported</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {parsing && (
        <div className="flex items-center justify-center py-6 gap-2">
          <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-400">Analyzing document...</span>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <AnimatePresence>
        {hasData && parsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-sm text-emerald-400">Detected fields:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {parsed.patient_first_name && (
                <Field label="First Name" value={parsed.patient_first_name} />
              )}
              {parsed.patient_last_name && (
                <Field label="Last Name" value={parsed.patient_last_name} />
              )}
              {parsed.patient_email && (
                <Field label="Email" value={parsed.patient_email} />
              )}
              {parsed.patient_date_of_birth && (
                <Field label="DOB" value={parsed.patient_date_of_birth} />
              )}
              {parsed.treatment_type && (
                <Field label="Treatment" value={parsed.treatment_type} />
              )}
              {parsed.consulting_provider && (
                <Field label="Provider" value={parsed.consulting_provider} />
              )}
            </div>
            {parsed.clinical_notes && (
              <div>
                <p className="text-xs text-gray-500">Clinical Notes</p>
                <p className="text-xs text-gray-300 mt-0.5">{parsed.clinical_notes}</p>
              </div>
            )}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onAccept(parsed)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600
                  hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium transition-all"
              >
                Accept & Fill
              </button>
              <button
                onClick={() => setParsed(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm transition-colors"
              >
                Try Another
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-gray-200 capitalize">{value.replace(/_/g, " ")}</p>
    </div>
  );
}
