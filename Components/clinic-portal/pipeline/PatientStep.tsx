"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PipelinePatient } from "@/lib/workflow/video-pipeline";
import ConsultImageUpload from "./ConsultImageUpload";
import ExistingPatientSearch from "./ExistingPatientSearch";

interface PatientStepProps {
  initial?: PipelinePatient | null;
  onNext: (patient: PipelinePatient) => void;
}

export default function PatientStep({ initial, onNext }: PatientStepProps) {
  const [form, setForm] = useState({
    first_name: initial?.firstName || "",
    last_name: initial?.lastName || "",
    email: initial?.email || "",
    date_of_birth: initial?.dateOfBirth || "",
    phone: initial?.phone || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedExisting, setSelectedExisting] = useState<PipelinePatient | null>(
    initial?.isNew === false ? initial : null
  );

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSelectedExisting(null);
  }

  function handleImageParsed(data: Record<string, string | null | undefined>) {
    setForm({
      first_name: data.patient_first_name || form.first_name,
      last_name: data.patient_last_name || form.last_name,
      email: data.patient_email || form.email,
      date_of_birth: data.patient_date_of_birth || form.date_of_birth,
      phone: data.patient_phone || form.phone,
    });
    setSelectedExisting(null);
  }

  function handleExistingSelect(patient: Record<string, unknown>) {
    const p: PipelinePatient = {
      id: patient.id as string,
      firstName: patient.first_name as string,
      lastName: patient.last_name as string,
      email: patient.email as string,
      dateOfBirth: patient.date_of_birth as string,
      phone: (patient.phone as string) || undefined,
      accessCode: patient.access_code as string,
      isNew: false,
      treatmentType: (patient.treatment_type as string) || undefined,
      consultingProvider: (patient.consulting_provider as string) || undefined,
      consultationDate: (patient.consultation_date as string) || undefined,
    };
    setSelectedExisting(p);
    setForm({
      first_name: p.firstName,
      last_name: p.lastName,
      email: p.email,
      date_of_birth: p.dateOfBirth,
      phone: p.phone || "",
    });
  }

  async function handleNext() {
    // If existing patient, skip creation
    if (selectedExisting) {
      onNext(selectedExisting);
      return;
    }

    // Validate
    if (!form.first_name || !form.last_name || !form.email || !form.date_of_birth) {
      setError("First name, last name, email, and date of birth are required");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/clinic/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create patient");
        return;
      }

      onNext({
        id: data.patient.id,
        firstName: form.first_name,
        lastName: form.last_name,
        email: form.email,
        dateOfBirth: form.date_of_birth,
        phone: form.phone || undefined,
        accessCode: data.accessCode,
        isNew: true,
      });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-xl mx-auto space-y-6"
    >
      <h2 className="text-lg text-white font-light">Patient Information</h2>

      {/* Image auto-fill */}
      <ConsultImageUpload onAccept={handleImageParsed} />

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-600">Or enter manually</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Manual form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormInput label="First Name *" value={form.first_name} onChange={(v) => update("first_name", v)} />
          <FormInput label="Last Name *" value={form.last_name} onChange={(v) => update("last_name", v)} />
        </div>
        <FormInput label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} />
        <FormInput label="Date of Birth *" type="date" value={form.date_of_birth} onChange={(v) => update("date_of_birth", v)} />
        <FormInput label="Phone (optional)" type="tel" value={form.phone} onChange={(v) => update("phone", v)} />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-600">Or select existing patient</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <ExistingPatientSearch onSelect={handleExistingSelect} />

      {selectedExisting && (
        <div className="bg-[#5f7a61]/10 border border-[#5f7a61]/20 rounded-lg p-3 text-sm text-[#5f7a61]/70">
          Selected: {selectedExisting.firstName} {selectedExisting.lastName} ({selectedExisting.email})
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <div className="flex justify-end pt-2">
        <button
          onClick={handleNext}
          disabled={submitting}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5f7a61] to-[#5f7a61]
            hover:from-[#4e6650] hover:to-[#4e6650] text-white font-medium transition-all
            shadow-lg shadow-[#5f7a61]/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Creating..." : "Next: Configure Video"}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
}

function FormInput({
  label, value, onChange, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-gray-900/80 border border-gray-700 text-white text-sm p-2.5
          focus:border-[#5f7a61] focus:ring-1 focus:ring-[#5f7a61]/40 outline-none
          placeholder:text-gray-600 [color-scheme:dark]"
      />
    </div>
  );
}
