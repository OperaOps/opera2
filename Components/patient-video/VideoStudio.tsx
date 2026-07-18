"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Video,
  User,
  Stethoscope,
  Building2,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  Download,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  FileText,
  Heart,
  Target,
  Zap,
  Clock,
  ArrowRight,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

type Specialty = "dental" | "orthodontic";
type Step = "start" | "form" | "generating" | "preview";

interface JobStatus {
  jobId: string;
  status: "processing" | "completed" | "failed";
  progress: number;
  videoUrl?: string;
  error?: string;
  step?: string;
}

// ============================================================================
// Config data (reused from existing page)
// ============================================================================

const APPOINTMENT_CONTEXTS: Record<Specialty, { value: string; label: string }[]> = {
  dental: [
    { value: "new_patient_consult", label: "New Patient Consult" },
    { value: "follow_up", label: "Follow-Up" },
    { value: "treatment_start", label: "Treatment Start" },
    { value: "emergency", label: "Emergency" },
    { value: "second_opinion", label: "Second Opinion" },
    { value: "financial_discussion", label: "Financial Discussion" },
  ],
  orthodontic: [
    { value: "new_patient_consult", label: "New Patient Consult" },
    { value: "follow_up", label: "Follow-Up" },
    { value: "treatment_start", label: "Treatment Start" },
    { value: "mid_treatment_check", label: "Mid-Treatment Check" },
    { value: "records_appointment", label: "Records Appointment" },
    { value: "treatment_complete", label: "Treatment Complete" },
  ],
};

const PATIENT_STATUSES = [
  { value: "undecided", label: "Undecided" },
  { value: "hesitant", label: "Hesitant" },
  { value: "accepted", label: "Accepted Treatment" },
  { value: "scheduled", label: "Scheduled" },
  { value: "in_treatment", label: "In Treatment" },
  { value: "post_treatment", label: "Post-Treatment" },
];

const VIDEO_GOALS = [
  { value: "educate", label: "Educate", icon: "📖" },
  { value: "reassure", label: "Reassure", icon: "🤝" },
  { value: "convince", label: "Convince", icon: "💡" },
  { value: "prepare", label: "Prepare", icon: "📋" },
  { value: "follow_up", label: "Follow Up", icon: "🔄" },
  { value: "celebrate", label: "Celebrate", icon: "🎉" },
];

const DENTAL_TREATMENTS = [
  { value: "crown", label: "Porcelain Crown" },
  { value: "filling", label: "Composite Filling" },
  { value: "root_canal", label: "Root Canal Therapy" },
  { value: "implant", label: "Dental Implant" },
  { value: "extraction", label: "Tooth Extraction" },
  { value: "bridge", label: "Dental Bridge" },
  { value: "veneers", label: "Porcelain Veneers" },
  { value: "whitening", label: "Professional Whitening" },
  { value: "gum_treatment", label: "Gum Disease Treatment" },
  { value: "full_mouth_rehab", label: "Full Mouth Rehab" },
];

const ORTHODONTIC_TREATMENTS = [
  { value: "braces", label: "Metal Braces" },
  { value: "invisalign", label: "Invisalign Clear Aligners" },
  { value: "ceramic_braces", label: "Ceramic Braces" },
  { value: "lingual_braces", label: "Lingual Braces" },
  { value: "expander", label: "Palatal Expander" },
  { value: "retainer", label: "Retainers" },
  { value: "jaw_surgery", label: "Jaw Surgery" },
];

const TREATMENT_OPTIONS: Record<Specialty, { value: string; label: string }[]> = {
  dental: DENTAL_TREATMENTS,
  orthodontic: ORTHODONTIC_TREATMENTS,
};

const TREATMENT_TO_DIAGNOSIS: Record<string, string> = {
  full_mouth_rehab: "missing_tooth", crown: "cracked_tooth", filling: "cavity",
  root_canal: "cavity", implant: "missing_tooth", extraction: "cracked_tooth",
  bridge: "missing_tooth", veneers: "spacing", whitening: "cavity",
  gum_treatment: "gum_disease", dentures: "missing_tooth", braces: "crowding",
  invisalign: "crowding", ceramic_braces: "crowding", lingual_braces: "crowding",
  expander: "crowding", retainer: "crowding", jaw_surgery: "underbite",
};

const GENERATION_STEPS = [
  { key: "Generating script", label: "Processing treatment context", icon: FileText },
  { key: "Generating voiceover audio", label: "Creating personalized voiceover", icon: Heart },
  { key: "Using Lambda render", label: "Preparing video engine", icon: Zap },
  { key: "Rendering video", label: "Rendering your video", icon: Video },
];

// ============================================================================
// Reusable UI Components
// ============================================================================

function FormField({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5f7a61]/20 focus:border-[#5f7a61] transition-all"
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5f7a61]/20 focus:border-[#5f7a61] transition-all resize-none"
    />
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5f7a61]/20 focus:border-[#5f7a61] transition-all appearance-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function ToggleGroup({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            value === o.value
              ? "bg-white text-[#3e5540] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ChipSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string; icon?: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${
            value === o.value
              ? "bg-[#5f7a61]/[0.08] border-[#5f7a61]/50 text-[#3e5540] shadow-sm"
              : "bg-white border-gray-200 text-gray-600 hover:border-[#5f7a61]/30 hover:bg-[#5f7a61]/[0.04]"
          }`}
        >
          {o.icon && <span className="mr-1.5">{o.icon}</span>}
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// Page 0: Start
// ============================================================================

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-[#f5f8f5] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5f7a61]/10 mb-6">
            <Video className="w-8 h-8 text-[#5f7a61]" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
            Patient Video Studio
          </h1>
          <p className="text-base text-gray-500 leading-relaxed max-w-md mx-auto">
            Create a personalized patient education video in a few simple steps.
            Powered by AI, ready in under a minute.
          </p>
        </div>

        <button
          onClick={onStart}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#5f7a61] text-white rounded-xl text-base font-medium hover:bg-[#4e6650] active:scale-[0.98] transition-all shadow-lg shadow-[#5f7a61]/20"
        >
          Start Generating Video
          <ArrowRight className="w-4.5 h-4.5" />
        </button>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>~45 seconds</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>AI-powered</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <span>HD quality</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// Page 1: Form Wizard
// ============================================================================

function FormWizard({
  onSubmit,
  onBack,
  embedded = false,
}: {
  onSubmit: (data: Record<string, any>) => void;
  onBack: () => void;
  embedded?: boolean;
}) {
  const [formStep, setFormStep] = useState(0);
  const [specialty, setSpecialty] = useState<Specialty>("dental");
  const [treatment, setTreatment] = useState("crown");
  const [appointmentContext, setAppointmentContext] = useState("new_patient_consult");
  const [patientStatus, setPatientStatus] = useState("undecided");
  const [videoGoal, setVideoGoal] = useState("educate");
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [treatmentNotes, setTreatmentNotes] = useState("");
  const [concerns, setConcerns] = useState("");

  useEffect(() => {
    const opts = TREATMENT_OPTIONS[specialty];
    const def = specialty === "dental" ? "crown" : "braces";
    setTreatment(opts.find((o) => o.value === def)?.value ?? opts[0].value);
    const ctx = APPOINTMENT_CONTEXTS[specialty];
    if (ctx.length) setAppointmentContext(ctx[0].value);
  }, [specialty]);

  const STEPS = [
    { title: "Patient & Clinic", icon: User },
    { title: "Treatment", icon: Stethoscope },
    { title: "Context & Goal", icon: Target },
    { title: "Review", icon: CheckCircle2 },
  ];

  const canProceed = () => {
    if (formStep === 0) return patientName.trim() && doctorName.trim() && clinicName.trim();
    return true;
  };

  const handleSubmit = () => {
    onSubmit({
      patientName: patientName.trim(),
      doctorName: doctorName.trim(),
      clinicName: clinicName.trim(),
      specialty,
      treatment,
      appointmentContext,
      patientStatus,
      videoGoal,
      treatmentNotes: treatmentNotes.trim() || undefined,
      concerns: concerns.trim() || undefined,
      mode: "premium",
      category: specialty,
      diagnosis: TREATMENT_TO_DIAGNOSIS[treatment] || "cavity",
    });
  };

  return (
    <div className={embedded ? "" : "min-h-screen bg-gradient-to-br from-white via-white to-[#f5f8f5]"}>
      {/* Header */}
      {embedded ? (
        <div className="max-w-2xl mx-auto px-4 pt-2 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Generate Video</h1>
            <p className="mt-1 text-sm text-gray-500">Create a personalized patient education video.</p>
          </div>
          <span className="text-sm font-medium text-gray-400">
            Step {formStep + 1} of {STEPS.length}
          </span>
        </div>
      ) : (
        <div className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1.5 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-sm font-medium text-gray-400">
              Step {formStep + 1} of {STEPS.length}
            </span>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-2 mb-2">
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => i <= formStep && setFormStep(i)}
                className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                  i === formStep ? "text-[#3e5540]" : i < formStep ? "text-[#5f7a61]/60 cursor-pointer" : "text-gray-300"
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  i === formStep
                    ? "bg-[#5f7a61] text-white"
                    : i < formStep
                    ? "bg-[#5f7a61]/10 text-[#5f7a61]"
                    : "bg-gray-100 text-gray-400"
                }`}>
                  {i < formStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s.title}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 rounded ${i < formStep ? "bg-[#5f7a61]/40" : "bg-gray-100"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={formStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {formStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Patient & Clinic Info</h2>
                  <p className="text-sm text-gray-500">Who is this video for?</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-sm">
                  <FormField label="Patient Name">
                    <TextInput value={patientName} onChange={setPatientName} placeholder="e.g. Sarah Johnson" />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Doctor Name">
                      <TextInput value={doctorName} onChange={setDoctorName} placeholder="e.g. Dr. Martinez" />
                    </FormField>
                    <FormField label="Clinic Name">
                      <TextInput value={clinicName} onChange={setClinicName} placeholder="e.g. Bright Smiles Dental" />
                    </FormField>
                  </div>
                </div>
              </div>
            )}

            {formStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Treatment Details</h2>
                  <p className="text-sm text-gray-500">What procedure or treatment is the video about?</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-sm">
                  <FormField label="Specialty">
                    <ToggleGroup
                      value={specialty}
                      onChange={(v) => setSpecialty(v as Specialty)}
                      options={[
                        { value: "dental", label: "Dental" },
                        { value: "orthodontic", label: "Orthodontic" },
                      ]}
                    />
                  </FormField>
                  <FormField label="Treatment">
                    <Select value={treatment} onChange={setTreatment} options={TREATMENT_OPTIONS[specialty]} />
                  </FormField>
                  <FormField label="Treatment Notes" hint="Optional. E.g. 'MOD composite #14' or 'patient had pain last week'">
                    <TextArea value={treatmentNotes} onChange={setTreatmentNotes} placeholder="Add any specific notes for the doctor..." rows={2} />
                  </FormField>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Context & Goal</h2>
                  <p className="text-sm text-gray-500">Help us tailor the video to the patient's situation.</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-sm">
                  <FormField label="Appointment Type">
                    <Select value={appointmentContext} onChange={setAppointmentContext} options={APPOINTMENT_CONTEXTS[specialty]} />
                  </FormField>
                  <FormField label="Patient Status">
                    <Select value={patientStatus} onChange={setPatientStatus} options={PATIENT_STATUSES} />
                  </FormField>
                  <FormField label="Video Goal">
                    <ChipSelect value={videoGoal} onChange={setVideoGoal} options={VIDEO_GOALS} />
                  </FormField>
                  <FormField label="Patient Concerns" hint="Optional. E.g. 'afraid of needles' or 'worried about cost'">
                    <TextArea value={concerns} onChange={setConcerns} placeholder="Any concerns the patient has..." rows={2} />
                  </FormField>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Review & Generate</h2>
                  <p className="text-sm text-gray-500">Confirm the details below, then generate your video.</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div><span className="text-gray-400">Patient</span><p className="font-medium text-gray-900 mt-0.5">{patientName || "—"}</p></div>
                    <div><span className="text-gray-400">Doctor</span><p className="font-medium text-gray-900 mt-0.5">{doctorName || "—"}</p></div>
                    <div><span className="text-gray-400">Clinic</span><p className="font-medium text-gray-900 mt-0.5">{clinicName || "—"}</p></div>
                    <div><span className="text-gray-400">Specialty</span><p className="font-medium text-gray-900 mt-0.5 capitalize">{specialty}</p></div>
                    <div><span className="text-gray-400">Treatment</span><p className="font-medium text-gray-900 mt-0.5">{TREATMENT_OPTIONS[specialty].find((t) => t.value === treatment)?.label}</p></div>
                    <div><span className="text-gray-400">Appointment</span><p className="font-medium text-gray-900 mt-0.5">{APPOINTMENT_CONTEXTS[specialty].find((a) => a.value === appointmentContext)?.label}</p></div>
                    <div><span className="text-gray-400">Patient Status</span><p className="font-medium text-gray-900 mt-0.5">{PATIENT_STATUSES.find((s) => s.value === patientStatus)?.label}</p></div>
                    <div><span className="text-gray-400">Goal</span><p className="font-medium text-gray-900 mt-0.5">{VIDEO_GOALS.find((g) => g.value === videoGoal)?.label}</p></div>
                    {treatmentNotes && <div className="col-span-2"><span className="text-gray-400">Notes</span><p className="font-medium text-gray-900 mt-0.5">{treatmentNotes}</p></div>}
                    {concerns && <div className="col-span-2"><span className="text-gray-400">Concerns</span><p className="font-medium text-gray-900 mt-0.5">{concerns}</p></div>}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {embedded && formStep === 0 ? (
            <span />
          ) : (
            <button
              onClick={() => (formStep > 0 ? setFormStep(formStep - 1) : onBack())}
              className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Back
            </button>
          )}

          {formStep < STEPS.length - 1 ? (
            <button
              onClick={() => setFormStep(formStep + 1)}
              disabled={!canProceed()}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5f7a61] text-white rounded-xl text-sm font-medium hover:bg-[#4e6650] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-sm"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#5f7a61] text-white rounded-xl text-sm font-semibold hover:bg-[#4e6650] active:scale-[0.98] transition-all shadow-lg shadow-[#5f7a61]/20"
            >
              <Sparkles className="w-4 h-4" /> Generate Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Page 2: Generating
// ============================================================================

function GeneratingScreen({ jobStatus, onCancel, embedded = false }: { jobStatus: JobStatus | null; onCancel: () => void; embedded?: boolean }) {
  const progress = jobStatus?.progress ?? 0;
  const currentStep = jobStatus?.step ?? "";

  const activeStepIndex = GENERATION_STEPS.findIndex((s) => currentStep.includes(s.key));

  return (
    <div className={`${embedded ? "min-h-[60vh]" : "min-h-screen bg-gradient-to-br from-white via-white to-[#f5f8f5]"} flex items-center justify-center px-4`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        {/* Animated ring */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f0ff" strokeWidth="6" />
            <motion.circle
              cx="50" cy="50" r="42" fill="none" stroke="#7c3aed" strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={264}
              strokeDashoffset={264 - 264 * progress}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-[#3e5540]">{Math.round(progress * 100)}%</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Video</h2>
        <p className="text-sm text-gray-500 mb-10">This usually takes about 45 seconds</p>

        {/* Steps */}
        <div className="text-left space-y-3 mb-10">
          {GENERATION_STEPS.map((step, i) => {
            const isActive = i === activeStepIndex;
            const isDone = i < activeStepIndex || (progress >= 0.95 && i <= activeStepIndex);
            const Icon = step.icon;

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? "bg-[#5f7a61]/[0.06] border border-[#5f7a61]/30" : isDone ? "bg-gray-50" : ""
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDone ? "bg-[#5f7a61]/10" : isActive ? "bg-[#5f7a61]" : "bg-gray-100"
                }`}>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-[#5f7a61]" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Icon className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <span className={`text-sm font-medium ${isDone ? "text-[#5f7a61]" : isActive ? "text-gray-900" : "text-gray-400"}`}>
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// Page 3: Preview
// ============================================================================

function PreviewScreen({
  jobStatus,
  onNewVideo,
  onEdit,
  embedded = false,
}: {
  jobStatus: JobStatus;
  onNewVideo: () => void;
  onEdit: () => void;
  embedded?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const isSuccess = jobStatus.status === "completed" && jobStatus.videoUrl;
  const isFailed = jobStatus.status === "failed";

  return (
    <div className={`${embedded ? "" : "min-h-screen bg-gradient-to-br from-white via-white to-[#f5f8f5] py-12"} flex items-center justify-center px-4`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        {isSuccess ? (
          <>
            {/* Success header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-4">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">Your Video is Ready</h2>
              <p className="text-sm text-gray-500">
                Send the patient link — their video plus Ask Opera, ready for questions.
              </p>
            </div>

            {/* Video player */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/10 mb-6">
              <video
                ref={videoRef}
                src={jobStatus.videoUrl}
                controls
                className="w-full aspect-video"
                autoPlay
              />
            </div>

            {/* Patient link — the thing clinics actually send */}
            <div className="mb-6 rounded-2xl border border-[#5f7a61]/30 bg-[#5f7a61]/[0.06] px-5 py-4">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[#3e5540] mb-2">
                Patient link
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 truncate rounded-lg border border-[#5f7a61]/20 bg-white px-3 py-2 text-[13px] text-gray-700">
                  {typeof window !== "undefined" ? `${window.location.origin}/v/${jobStatus.jobId}` : `/v/${jobStatus.jobId}`}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/v/${jobStatus.jobId}`);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-[#5f7a61] text-white rounded-lg text-[13px] font-medium hover:bg-[#5f7a61]/[0.07]0 transition-colors"
                >
                  {linkCopied ? "Copied!" : "Copy link"}
                </button>
              </div>
              <p className="mt-2 text-[12px] text-gray-500">
                The patient sees their video with the Ask Opera bar underneath — they can ask
                questions about their treatment right on the page.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <a
                href={`/v/${jobStatus.jobId}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5f7a61] text-white rounded-xl text-sm font-medium hover:bg-[#4e6650] active:scale-[0.98] transition-all shadow-lg shadow-[#5f7a61]/20"
              >
                <Sparkles className="w-4 h-4" /> Open Patient Page
              </a>
              <a
                href={jobStatus.videoUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:border-[#5f7a61]/30 hover:bg-[#5f7a61]/[0.04] active:scale-[0.98] transition-all"
              >
                <Download className="w-4 h-4" /> Download
              </a>
              <button
                onClick={onNewVideo}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:border-[#5f7a61]/30 hover:bg-[#5f7a61]/[0.04] active:scale-[0.98] transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Create Another
              </button>
            </div>
          </>
        ) : isFailed ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-100 mb-4">
              <XCircle className="w-7 h-7 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Generation Failed</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">{jobStatus.error || "Something went wrong. Please try again."}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onEdit}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5f7a61] text-white rounded-xl text-sm font-medium hover:bg-[#4e6650] active:scale-[0.98] transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}

// ============================================================================
// Main Page Controller
// ============================================================================

export function VideoStudio({ embedded = false }: { embedded?: boolean }) {
  // Embedded (clinic portal): no splash screen, no full-screen gradient shells —
  // the studio renders as a native portal page.
  const [step, setStep] = useState<Step>(embedded ? "form" : "start");
  const [formData, setFormData] = useState<Record<string, any> | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const pollFailCount = useRef(0);

  const stopPolling = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = null;
  }, []);

  // Poll for job status
  useEffect(() => {
    if (!jobStatus || jobStatus.status !== "processing") {
      stopPolling();
      return;
    }

    pollFailCount.current = 0;
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/patient-video/${jobStatus.jobId}`);
        if (res.ok) {
          const data: JobStatus = await res.json();
          pollFailCount.current = 0;
          setJobStatus(data);
          if (data.status === "completed" || data.status === "failed") {
            stopPolling();
            setStep("preview");
          }
        } else {
          pollFailCount.current++;
          if (pollFailCount.current >= 40) {
            stopPolling();
            setJobStatus((prev) => prev ? { ...prev, status: "failed", error: "Lost connection to server." } : null);
            setStep("preview");
          }
        }
      } catch {
        pollFailCount.current++;
        if (pollFailCount.current >= 40) {
          stopPolling();
          setJobStatus((prev) => prev ? { ...prev, status: "failed", error: "Lost connection to server." } : null);
          setStep("preview");
        }
      }
    }, 3000);

    return stopPolling;
  }, [jobStatus?.jobId, jobStatus?.status, stopPolling]);

  const handleSubmit = async (data: Record<string, any>) => {
    setFormData(data);
    setStep("generating");

    try {
      const res = await fetch("/api/patient-video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.text();
        setJobStatus({ jobId: "", status: "failed", progress: 0, error: `Server error: ${err}` });
        setStep("preview");
        return;
      }

      const job = await res.json();
      setJobStatus({ jobId: job.jobId, status: "processing", progress: 0, step: "Starting..." });

      // Keep the patient record durable: link this job to the patient so
      // their row shows the video link and Ask Opera activity.
      try {
        const [firstName, ...rest] = String(data.patientName ?? "").trim().split(/\s+/);
        if (firstName && job.jobId) {
          fetch("/api/clinic/patients/attach-job", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName,
              lastName: rest.join(" "),
              jobId: job.jobId,
              treatmentType: data.treatment,
              provider: data.doctorName,
            }),
          }).catch(() => {});
        }
      } catch {
        /* portal-only nicety */
      }
    } catch (err) {
      setJobStatus({ jobId: "", status: "failed", progress: 0, error: "Network error. Please try again." });
      setStep("preview");
    }
  };

  const handleReset = () => {
    setStep(embedded ? "form" : "start");
    setFormData(null);
    setJobStatus(null);
    stopPolling();
  };

  return (
    <AnimatePresence mode="wait">
      {step === "start" && (
        <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <StartScreen onStart={() => setStep("form")} />
        </motion.div>
      )}
      {step === "form" && (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <FormWizard onSubmit={handleSubmit} onBack={() => setStep("start")} embedded={embedded} />
        </motion.div>
      )}
      {step === "generating" && (
        <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <GeneratingScreen jobStatus={jobStatus} onCancel={handleReset} embedded={embedded} />
        </motion.div>
      )}
      {step === "preview" && jobStatus && (
        <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <PreviewScreen jobStatus={jobStatus} onNewVideo={handleReset} onEdit={() => setStep("form")} embedded={embedded} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
