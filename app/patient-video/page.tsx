"use client";

import React, { useState, useRef, useEffect } from "react";
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
  ChevronDown,
  Sparkles,
  FileVideo,
  Clock,
  Volume2,
  FileText,
  Camera,
  Settings,
  Heart,
  MessageSquare,
  Shield,
  Zap,
  Target,
  BookOpen,
  Users,
  ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Specialty = "dental" | "orthodontic";

type ContentMode = "template" | "template_ai" | "full_ai";

type VideoMode = "standard" | "premium";

type AppointmentContext = string;
type PatientStatus = string;
type VideoGoal = string;

interface JobStatus {
  jobId: string;
  status: "processing" | "completed" | "failed";
  progress: number;
  videoUrl?: string;
  error?: string;
  step?: string;
}

// ---------------------------------------------------------------------------
// Config data
// ---------------------------------------------------------------------------

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

const PATIENT_STATUSES: { value: string; label: string }[] = [
  { value: "undecided", label: "Undecided" },
  { value: "hesitant", label: "Hesitant" },
  { value: "accepted", label: "Accepted Treatment" },
  { value: "scheduled", label: "Scheduled" },
  { value: "in_treatment", label: "In Treatment" },
  { value: "post_treatment", label: "Post-Treatment" },
];

const VIDEO_GOALS: { value: string; label: string }[] = [
  { value: "educate", label: "Educate" },
  { value: "reassure", label: "Reassure" },
  { value: "convince", label: "Convince" },
  { value: "prepare", label: "Prepare for Treatment" },
  { value: "follow_up", label: "Follow Up" },
  { value: "celebrate", label: "Celebrate" },
];

const DENTAL_TREATMENTS: { value: string; label: string }[] = [
  { value: "crown", label: "Porcelain Crown" },
  { value: "filling", label: "Composite Filling" },
  { value: "root_canal", label: "Root Canal Therapy" },
  { value: "implant", label: "Dental Implant" },
  { value: "extraction", label: "Tooth Extraction" },
  { value: "bridge", label: "Dental Bridge" },
  { value: "veneers", label: "Porcelain Veneers" },
  { value: "whitening", label: "Professional Whitening" },
  { value: "gum_treatment", label: "Gum Disease Treatment" },
  { value: "dentures", label: "Dentures" },
];

const ORTHODONTIC_TREATMENTS: { value: string; label: string }[] = [
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
  crown: "cracked_tooth",
  filling: "cavity",
  root_canal: "cavity",
  implant: "missing_tooth",
  extraction: "cracked_tooth",
  bridge: "missing_tooth",
  veneers: "spacing",
  whitening: "cavity",
  gum_treatment: "gum_disease",
  dentures: "missing_tooth",
  braces: "crowding",
  invisalign: "crowding",
  ceramic_braces: "crowding",
  lingual_braces: "crowding",
  expander: "crowding",
  retainer: "crowding",
  jaw_surgery: "underbite",
};

const CONTENT_MODES: { value: ContentMode; label: string; desc: string }[] = [
  { value: "template", label: "Template", desc: "Fastest" },
  { value: "template_ai", label: "Template + AI", desc: "Personalized" },
  { value: "full_ai", label: "Full AI Generation", desc: "Custom" },
];

const STEP_LABELS: Record<string, string> = {
  // Backend sends these human-readable step strings
  "Generating script": "Generating personalized script...",
  "Generating voiceover audio": "Creating voiceover audio...",
  "Bundling Remotion project": "Preparing video engine...",
  "Rendering video": "Rendering video...",
  "Complete": "Finalizing...",
  // Legacy keys kept for backwards compatibility
  script: "Generating personalized script...",
  tts: "Creating voiceover audio...",
  captions: "Building captions...",
  bundle: "Preparing video engine...",
  render: "Rendering video...",
  complete: "Finalizing...",
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SelectField({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  icon: React.ElementType;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-purple-300/80">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/[0.04] border border-purple-500/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:border-purple-500/40 focus:border-purple-500/60 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all text-sm"
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-gray-900 text-white"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60 pointer-events-none" />
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  optional,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon: React.ElementType;
  optional?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-purple-300/80">
        <Icon className="w-4 h-4" />
        {label}
        {optional && (
          <span className="text-white/20 font-normal">(optional)</span>
        )}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-white/20 hover:border-purple-500/40 focus:border-purple-500/60 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all text-sm"
      />
    </div>
  );
}

function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  badge,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-purple-400/70" />
          <h3 className="text-sm font-medium text-white/60">{title}</h3>
          {badge && (
            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 tracking-wider uppercase">
              {badge}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-4 h-4 text-white/30" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProgressBar({
  progress,
  step,
}: {
  progress: number;
  step?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-purple-300/80">
          {step ? STEP_LABELS[step] || step : "Processing..."}
        </span>
        <span className="text-white/60">{Math.round(progress * 100)}%</span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function PatientVideoPage() {
  // Specialty
  const [specialty, setSpecialty] = useState<Specialty>("dental");

  // Appointment & Context
  const [appointmentContext, setAppointmentContext] = useState<string>("new_patient_consult");
  const [patientStatus, setPatientStatus] = useState<string>("undecided");
  const [videoGoal, setVideoGoal] = useState<string>("educate");

  // Treatment Details
  const [treatment, setTreatment] = useState<string>("crown");
  const [contentMode, setContentMode] = useState<ContentMode>("template");

  // Patient & Clinic
  const [patientName, setPatientName] = useState("Sarah");
  const [doctorName, setDoctorName] = useState("Martinez");
  const [clinicName, setClinicName] = useState("Bright Smiles Dental");
  const [parentMode, setParentMode] = useState(false);

  // Personalization
  const [treatmentNotes, setTreatmentNotes] = useState("");
  const [concerns, setConcerns] = useState("");
  const [financing, setFinancing] = useState("");

  // Photos
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);

  // Video depth
  const [videoMode, setVideoMode] = useState<VideoMode>("premium");

  // Job state
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const pollFailCountRef = useRef<number>(0);
  const pollStartTimeRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const MAX_POLL_FAILURES = 10;
  const MAX_POLL_DURATION_MS = 11 * 60 * 1000; // 11 minutes (matches 10-min render timeout + buffer)

  // Reset treatment & appointment context when specialty changes
  useEffect(() => {
    const treatOpts = TREATMENT_OPTIONS[specialty];
    if (treatOpts.length > 0) setTreatment(treatOpts[0].value);
    const contextOpts = APPOINTMENT_CONTEXTS[specialty];
    if (contextOpts.length > 0) setAppointmentContext(contextOpts[0].value);
    setParentMode(false);
  }, [specialty]);

  // Photo upload handler
  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string)?.split(",")[1];
      if (type === "before") setBeforePhoto(base64);
      else setAfterPhoto(base64);
    };
    reader.readAsDataURL(file);
  };

  // Poll for job status
  useEffect(() => {
    if (
      !jobStatus ||
      jobStatus.status === "completed" ||
      jobStatus.status === "failed"
    ) {
      if (pollRef.current) clearInterval(pollRef.current);
      return;
    }

    // Record when polling started for this job
    if (pollStartTimeRef.current === 0) {
      pollStartTimeRef.current = Date.now();
    }
    pollFailCountRef.current = 0;

    pollRef.current = setInterval(async () => {
      // Check max poll duration (6 minutes)
      if (Date.now() - pollStartTimeRef.current > MAX_POLL_DURATION_MS) {
        if (pollRef.current) clearInterval(pollRef.current);
        pollStartTimeRef.current = 0;
        setJobStatus((prev) =>
          prev
            ? {
                ...prev,
                status: "failed",
                error:
                  "Video generation timed out after 6 minutes. Please try again or contact support if the issue persists.",
              }
            : null
        );
        return;
      }

      try {
        const res = await fetch(`/api/patient-video/${jobStatus.jobId}`);
        if (res.ok) {
          const data: JobStatus = await res.json();
          pollFailCountRef.current = 0; // Reset on success
          setJobStatus(data);
          if (data.status === "completed" || data.status === "failed") {
            if (pollRef.current) clearInterval(pollRef.current);
            pollStartTimeRef.current = 0;
          }
        } else {
          pollFailCountRef.current += 1;
          if (pollFailCountRef.current >= MAX_POLL_FAILURES) {
            if (pollRef.current) clearInterval(pollRef.current);
            pollStartTimeRef.current = 0;
            setJobStatus((prev) =>
              prev
                ? {
                    ...prev,
                    status: "failed",
                    error: `Lost connection to the server after ${MAX_POLL_FAILURES} failed attempts. Please check your network and try again.`,
                  }
                : null
            );
          }
        }
      } catch {
        pollFailCountRef.current += 1;
        if (pollFailCountRef.current >= MAX_POLL_FAILURES) {
          if (pollRef.current) clearInterval(pollRef.current);
          pollStartTimeRef.current = 0;
          setJobStatus((prev) =>
            prev
              ? {
                  ...prev,
                  status: "failed",
                  error: `Lost connection to the server after ${MAX_POLL_FAILURES} failed attempts. Please check your network and try again.`,
                }
              : null
          );
        }
      }
    }, 1500);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [jobStatus?.jobId, jobStatus?.status]);

  const handleGenerate = async () => {
    setIsSubmitting(true);
    setJobStatus(null);

    try {
      const inferredDiagnosis = TREATMENT_TO_DIAGNOSIS[treatment] || "cavity";

      const res = await fetch("/api/patient-video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          doctorName,
          clinicName,
          specialty,
          treatment,
          appointmentContext,
          patientStatus,
          videoGoal,
          contentMode,
          treatmentNotes: treatmentNotes.trim() || undefined,
          concerns: concerns.trim() || undefined,
          financing: financing.trim() || undefined,
          parentMode: parentMode || undefined,
          beforePhotoBase64: beforePhoto || undefined,
          afterPhotoBase64: afterPhoto || undefined,
          mode: videoMode,
          // backward compat
          category: specialty,
          diagnosis: inferredDiagnosis,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data = await res.json();
      setJobStatus({
        jobId: data.jobId,
        status: "processing",
        progress: 0,
        step: "script",
      });
    } catch (err) {
      setJobStatus({
        jobId: "",
        status: "failed",
        progress: 0,
        error:
          err instanceof Error ? err.message : "Failed to start generation",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setJobStatus(null);
    if (pollRef.current) clearInterval(pollRef.current);
    pollFailCountRef.current = 0;
    pollStartTimeRef.current = 0;
  };

  const isProcessing = jobStatus?.status === "processing" || isSubmitting;

  const generateButtonText = () => {
    if (isProcessing) return "Generating...";
    switch (contentMode) {
      case "template":
        return "Generate Video";
      case "template_ai":
        return "Generate Personalized Video";
      case "full_ai":
        return "Generate Custom Video";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-purple-600/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <Video className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-2xl font-extralight text-white">
              Patient Video
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 tracking-wider uppercase">
              Beta
            </span>
          </div>
          <p className="text-white/40 text-sm font-light max-w-xl">
            Generate personalized patient education videos with AI-powered
            scripts, professional voiceover, and animated dental visuals.
          </p>
        </motion.div>

        {/* Specialty Selector — two large cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {(["dental", "orthodontic"] as const).map((spec) => {
            const selected = specialty === spec;
            const meta = {
              dental: {
                label: "Dental",
                desc: "Restorative, preventive & cosmetic procedures",
                icon: Stethoscope,
                gradient: "from-purple-500/20 to-blue-500/20",
                treatments: "Crowns, fillings, implants, veneers, and more",
              },
              orthodontic: {
                label: "Orthodontics",
                desc: "Alignment, bite correction & smile transformation",
                icon: Sparkles,
                gradient: "from-cyan-500/20 to-purple-500/20",
                treatments: "Braces, Invisalign, expanders, retainers",
              },
            }[spec];

            return (
              <motion.button
                key={spec}
                onClick={() => setSpecialty(spec)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden ${
                  selected
                    ? "border-purple-500/60 bg-purple-500/10 shadow-lg shadow-purple-500/10"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-purple-500/30"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${meta.gradient} transition-opacity duration-300 ${
                    selected ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="relative flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl border transition-colors ${
                      selected
                        ? "bg-purple-500/20 border-purple-500/30"
                        : "bg-white/[0.04] border-white/[0.08]"
                    }`}
                  >
                    <meta.icon
                      className={`w-6 h-6 ${
                        selected ? "text-purple-300" : "text-white/40"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-medium text-base ${
                        selected ? "text-white" : "text-white/70"
                      }`}
                    >
                      {meta.label}
                    </h3>
                    <p className="text-xs text-white/40 mt-1">{meta.desc}</p>
                    <p className="text-[11px] text-white/25 mt-2">
                      {meta.treatments}
                    </p>
                  </div>
                  {selected && (
                    <motion.div
                      layoutId="specialtyIndicator"
                      className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-purple-400"
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT COLUMN: Structured Input System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Section 1: Appointment & Context */}
            <CollapsibleSection
              title="Appointment & Context"
              icon={BookOpen}
              defaultOpen={true}
            >
              <SelectField
                label="Appointment Context"
                value={appointmentContext}
                onChange={setAppointmentContext}
                options={APPOINTMENT_CONTEXTS[specialty]}
                icon={Settings}
              />
              <SelectField
                label="Patient Status"
                value={patientStatus}
                onChange={setPatientStatus}
                options={PATIENT_STATUSES}
                icon={Heart}
              />
              <SelectField
                label="Video Goal"
                value={videoGoal}
                onChange={setVideoGoal}
                options={VIDEO_GOALS}
                icon={Target}
              />
            </CollapsibleSection>

            {/* Section 2: Treatment Details */}
            <CollapsibleSection
              title="Treatment Details"
              icon={Stethoscope}
              defaultOpen={true}
            >
              <SelectField
                label="Treatment Type"
                value={treatment}
                onChange={setTreatment}
                options={TREATMENT_OPTIONS[specialty]}
                icon={Sparkles}
              />
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-purple-300/80">
                  <Zap className="w-4 h-4" />
                  Content Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CONTENT_MODES.map((mode) => (
                    <motion.button
                      key={mode.value}
                      onClick={() => setContentMode(mode.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-3 rounded-xl border text-center transition-all duration-200 ${
                        contentMode === mode.value
                          ? "border-purple-500/60 bg-purple-500/10"
                          : "border-white/[0.06] bg-white/[0.02] hover:border-purple-500/30"
                      }`}
                    >
                      <p
                        className={`text-xs font-medium ${
                          contentMode === mode.value
                            ? "text-white"
                            : "text-white/60"
                        }`}
                      >
                        {mode.label}
                      </p>
                      <p className="text-[10px] text-white/30 mt-0.5">
                        {mode.desc}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            {/* Section 3: Patient & Clinic */}
            <CollapsibleSection
              title="Patient & Clinic"
              icon={User}
              defaultOpen={true}
            >
              <InputField
                label="Patient Name"
                value={patientName}
                onChange={setPatientName}
                placeholder="First name"
                icon={User}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Doctor"
                  value={doctorName}
                  onChange={setDoctorName}
                  placeholder="Last name"
                  icon={Stethoscope}
                />
                <InputField
                  label="Clinic"
                  value={clinicName}
                  onChange={setClinicName}
                  placeholder="Clinic name"
                  icon={Building2}
                />
              </div>
              {specialty === "orthodontic" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <button
                    onClick={() => setParentMode(!parentMode)}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                      parentMode ? "bg-purple-500" : "bg-white/10"
                    }`}
                  >
                    <motion.div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
                      animate={{ left: parentMode ? 22 : 2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                  <div>
                    <p className="text-xs text-white/60 font-medium flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      Parent Mode
                    </p>
                    <p className="text-[10px] text-white/25">
                      Address video to parent/guardian
                    </p>
                  </div>
                </motion.div>
              )}
            </CollapsibleSection>

            {/* Section 4: Personalization */}
            <CollapsibleSection
              title="Personalization"
              icon={MessageSquare}
              defaultOpen={true}
            >
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-purple-300/80">
                  <FileText className="w-4 h-4" />
                  Treatment Notes
                  <span className="text-white/20 font-normal">(optional)</span>
                </label>
                <textarea
                  value={treatmentNotes}
                  onChange={(e) => setTreatmentNotes(e.target.value)}
                  placeholder="e.g. MOD composite #14, pt has sensitivity to cold, discussed crown option..."
                  rows={6}
                  className="w-full bg-white/[0.04] border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-white/20 hover:border-purple-500/40 focus:border-purple-500/60 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all resize-y text-sm"
                />
                <p className="text-[11px] text-white/25">
                  Clinical shorthand is fine — our AI understands dental
                  notation and will translate it into patient-friendly language.
                </p>
              </div>
              <InputField
                label="Patient Concerns"
                value={concerns}
                onChange={setConcerns}
                placeholder="e.g. Worried about pain, nervous about needles..."
                icon={Heart}
                optional
              />
              <InputField
                label="Financing Notes"
                value={financing}
                onChange={setFinancing}
                placeholder="e.g. Insurance covers 50%, payment plan available"
                icon={Shield}
                optional
              />
            </CollapsibleSection>

            {/* Section 5: Photos (collapsed by default) */}
            <CollapsibleSection
              title="Before & After Photos"
              icon={Camera}
              defaultOpen={false}
            >
              <p className="text-[11px] text-white/25">
                Upload patient photos or we&apos;ll use example images
              </p>
              <div className="flex gap-4">
                {/* Before photo */}
                <div className="flex-1">
                  <p className="text-xs text-purple-300/80 mb-2">Before</p>
                  {beforePhoto ? (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                      <img
                        src={`data:image/jpeg;base64,${beforePhoto}`}
                        alt="Before"
                        className="h-20 w-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setBeforePhoto(null)}
                        className="text-[11px] text-red-400/70 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:border-purple-500/30 transition-colors">
                      <Camera className="w-5 h-5 text-white/20 mx-auto mb-1" />
                      <span className="text-xs text-white/30">
                        Upload photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, "before")}
                      />
                    </label>
                  )}
                </div>
                {/* After photo */}
                <div className="flex-1">
                  <p className="text-xs text-purple-300/80 mb-2">After</p>
                  {afterPhoto ? (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                      <img
                        src={`data:image/jpeg;base64,${afterPhoto}`}
                        alt="After"
                        className="h-20 w-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setAfterPhoto(null)}
                        className="text-[11px] text-red-400/70 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:border-purple-500/30 transition-colors">
                      <Camera className="w-5 h-5 text-white/20 mx-auto mb-1" />
                      <span className="text-xs text-white/30">
                        Upload photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, "after")}
                      />
                    </label>
                  )}
                </div>
              </div>
            </CollapsibleSection>

            {/* Video Depth — always premium */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-purple-300/80 flex items-center gap-2 px-1">
                <FileVideo className="w-4 h-4" />
                Video Depth
              </label>
              <div className="p-4 rounded-2xl border border-purple-500/60 bg-purple-500/10">
                <div>
                  <h3 className="font-medium text-sm text-white">In-Depth Treatment Video</h3>
                  <p className="text-[11px] text-gray-400 mt-1">Comprehensive 8-scene video with deep dive, journey &amp; aftercare</p>
                </div>
              </div>
            </div>

            {/* Generate button */}
            <motion.button
              onClick={handleGenerate}
              disabled={isProcessing || !patientName || !doctorName}
              whileHover={{ scale: isProcessing ? 1 : 1.02 }}
              whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              className={`w-full py-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                isProcessing
                  ? "bg-purple-500/20 text-purple-300/60 cursor-not-allowed border border-purple-500/20"
                  : "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 border border-purple-400/20"
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {generateButtonText()}
                </>
              )}
            </motion.button>
          </motion.div>

          {/* RIGHT COLUMN: Preview / Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="sticky top-8">
              {/* Video preview area */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                {/* Video player or placeholder */}
                <div className="aspect-video bg-black/40 relative flex items-center justify-center">
                  {jobStatus?.status === "completed" && jobStatus.videoUrl ? (
                    <video
                      ref={videoRef}
                      src={jobStatus.videoUrl}
                      controls
                      className="w-full h-full object-contain"
                      autoPlay
                    />
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="mx-auto w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <FileVideo className="w-8 h-8 text-purple-400/40" />
                      </div>
                      <div>
                        <p className="text-white/30 text-sm font-light">
                          {isProcessing
                            ? "Your video is being generated..."
                            : "Your video preview will appear here"}
                        </p>
                        <p className="text-white/15 text-xs mt-1">
                          {isProcessing
                            ? "This typically takes 30-60 seconds"
                            : "Fill in the details and click Generate"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Processing overlay */}
                  <AnimatePresence>
                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                      >
                        <div className="text-center space-y-6 max-w-xs">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="mx-auto w-14 h-14 rounded-full border-2 border-purple-500/30 border-t-purple-400"
                          />
                          <div className="space-y-2">
                            <p className="text-sm text-white/70 font-light">
                              Generating your video
                            </p>
                            {jobStatus && (
                              <ProgressBar
                                progress={jobStatus.progress}
                                step={jobStatus.step}
                              />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom bar */}
                <div className="p-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~90-120 sec
                    </span>
                    <span className="flex items-center gap-1">
                      <Volume2 className="w-3 h-3" />
                      AI voiceover
                    </span>
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      HD Video
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {jobStatus?.status === "completed" &&
                      jobStatus.videoUrl && (
                        <a
                          href={jobStatus.videoUrl}
                          download
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-purple-300 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </a>
                      )}
                    {jobStatus && (
                      <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 bg-white/[0.04] rounded-lg border border-white/[0.06] hover:border-white/10 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        New
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Status messages */}
              <AnimatePresence>
                {jobStatus?.status === "completed" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-sm text-emerald-300">
                        Video generated successfully
                      </p>
                      <p className="text-xs text-emerald-300/50 mt-0.5">
                        Ready to download or share with your patient
                      </p>
                    </div>
                  </motion.div>
                )}

                {jobStatus?.status === "failed" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                  >
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <div>
                      <p className="text-sm text-red-300">Generation failed</p>
                      <p className="text-xs text-red-300/50 mt-0.5">
                        {jobStatus.error || "An unexpected error occurred"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feature cards */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  {
                    icon: Sparkles,
                    title: "Smart Templates",
                    desc: "Pre-written by specialists",
                  },
                  {
                    icon: Zap,
                    title: "AI Personalization",
                    desc: "Context-aware content",
                  },
                  {
                    icon: Volume2,
                    title: "Pro Voiceover",
                    desc: "Natural AI narration",
                  },
                ].map((feat) => (
                  <div
                    key={feat.title}
                    className="p-3 rounded-xl border border-white/[0.04] bg-white/[0.01]"
                  >
                    <feat.icon className="w-4 h-4 text-purple-400/60 mb-2" />
                    <p className="text-xs font-medium text-white/50">
                      {feat.title}
                    </p>
                    <p className="text-[10px] text-white/25 mt-0.5">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
