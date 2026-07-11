"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TREATMENT_TYPES } from "@/lib/constants/treatment-types";

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddPatientModal({
  open,
  onClose,
  onCreated,
}: AddPatientModalProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    phone: "",
    treatment_type: "",
    consulting_provider: "",
    consultation_date: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{
    email: string;
    dob: string;
    accessCode: string;
    patientId: string;
  } | null>(null);

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

      setSuccess({
        email: form.email,
        dob: form.date_of_birth,
        accessCode: data.accessCode,
        patientId: data.patient.id,
      });
      onCreated();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: "",
      phone: "",
      treatment_type: "",
      consulting_provider: "",
      consultation_date: "",
    });
    setSuccess(null);
    setError("");
    onClose();
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-gray-200 shadow-xl rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {success ? (
              <div className="p-6 space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-gray-900 font-semibold tracking-tight">Patient Created</h3>
                  <p className="text-sm text-gray-500">
                    Share these login credentials with the patient:
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-gray-900 text-sm">{success.email}</p>
                    </div>
                    <button onClick={() => copyToClipboard(success.email)} className="text-xs text-purple-600 hover:text-purple-500">Copy</button>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-gray-900 text-sm">{success.dob}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Access Code</p>
                      <p className="text-gray-900 text-2xl font-mono font-bold tracking-widest">{success.accessCode}</p>
                    </div>
                    <button onClick={() => copyToClipboard(success.accessCode)} className="text-xs text-purple-600 hover:text-purple-500">Copy</button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 text-gray-700 text-sm transition-colors"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      handleClose();
                      router.push(`/clinic/dashboard/pipeline?patient_id=${success.patientId}`);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-600
                      hover:bg-purple-500 text-white text-sm font-medium transition-colors"
                  >
                    Generate Video <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <h3 className="text-lg text-gray-900 font-semibold tracking-tight mb-2">Add Patient</h3>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg p-3">{error}</div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <Input label="First Name *" value={form.first_name} onChange={(v) => update("first_name", v)} required />
                  <Input label="Last Name *" value={form.last_name} onChange={(v) => update("last_name", v)} required />
                </div>
                <Input label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} required />
                <Input label="Date of Birth *" type="date" value={form.date_of_birth} onChange={(v) => update("date_of_birth", v)} required />
                <Input label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} />

                <div>
                  <label className="text-xs text-gray-700 font-medium mb-1 block">Treatment Type</label>
                  <select
                    value={form.treatment_type}
                    onChange={(e) => update("treatment_type", e.target.value)}
                    className="w-full rounded-xl bg-white border border-gray-200 text-gray-900 text-sm p-2.5 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
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

                <Input label="Consulting Provider" value={form.consulting_provider} onChange={(v) => update("consulting_provider", v)} placeholder="Dr. Smith" />
                <Input label="Consultation Date" type="date" value={form.consultation_date} onChange={(v) => update("consultation_date", v)} />

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={handleClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 text-gray-700 text-sm transition-colors">Cancel</button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Creating..." : "Create Patient"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({
  label, value, onChange, type = "text", required, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-700 font-medium mb-1 block">{label}</label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder}
        className="w-full rounded-xl bg-white border border-gray-200 text-gray-900 text-sm p-2.5 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none placeholder:text-gray-400 [color-scheme:light]"
      />
    </div>
  );
}
