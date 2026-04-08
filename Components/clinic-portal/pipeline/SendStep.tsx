"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Smartphone, Link2, Check } from "lucide-react";
import type { PipelinePatient, PipelineSent } from "@/lib/workflow/video-pipeline";

interface SendStepProps {
  patient: PipelinePatient;
  onBack: () => void;
  onDone: (sent: PipelineSent) => void;
}

export default function SendStep({ patient, onBack, onDone }: SendStepProps) {
  const [sent, setSent] = useState<PipelineSent | null>(null);
  const [emailBody, setEmailBody] = useState<string | null>(null);
  const [smsBody, setSmsBody] = useState<string | null>(null);
  const [loading, setLoading] = useState("");

  const portalUrl = typeof window !== "undefined"
    ? `${window.location.origin}/patient/login`
    : "/patient/login";

  async function handleSend(method: "email" | "sms") {
    setLoading(method);
    try {
      const res = await fetch(
        `/api/clinic/patients/${patient.id}/send-credentials`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method }),
        }
      );
      const data = await res.json();
      if (method === "email") {
        setEmailBody(data.body);
      } else {
        setSmsBody(data.message);
      }
    } catch {
      // silent
    } finally {
      setLoading("");
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(portalUrl);
    const now = new Date().toISOString();
    setSent({ method: "link_copied", sentAt: now });
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  function handleDone() {
    onDone(sent || { method: "link_copied", sentAt: new Date().toISOString() });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-xl mx-auto space-y-6"
    >
      <h2 className="text-lg text-white font-light">Send to Patient</h2>
      <p className="text-sm text-gray-400">
        Video is ready for {patient.firstName} {patient.lastName}
      </p>

      {/* Access credentials */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-3">
        <h3 className="text-sm text-gray-400">Patient Access Credentials</h3>
        <div className="space-y-2">
          <CredRow label="Email" value={patient.email} />
          <CredRow label="Date of Birth" value={patient.dateOfBirth} />
          <CredRow
            label="Access Code"
            value={patient.accessCode}
            large
            copyable
          />
          <CredRow label="Patient Portal" value={portalUrl} copyable />
        </div>
      </div>

      {/* Send options */}
      <div className="space-y-3">
        <h3 className="text-sm text-gray-400">Send Video</h3>

        <button
          onClick={() => handleSend("email")}
          disabled={!!loading}
          className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10
            hover:bg-white/[0.06] transition-colors text-left"
        >
          <Mail className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-white text-sm">Send via Email</p>
            <p className="text-gray-500 text-xs">
              Get a pre-written email to copy and send
            </p>
          </div>
          {loading === "email" && (
            <div className="ml-auto w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          )}
        </button>

        <button
          onClick={() => handleSend("sms")}
          disabled={!!loading}
          className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10
            hover:bg-white/[0.06] transition-colors text-left"
        >
          <Smartphone className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-white text-sm">Send via SMS</p>
            <p className="text-gray-500 text-xs">
              Get a text message to copy and send
            </p>
          </div>
          {loading === "sms" && (
            <div className="ml-auto w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          )}
        </button>

        <button
          onClick={handleCopyLink}
          className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10
            hover:bg-white/[0.06] transition-colors text-left"
        >
          <Link2 className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-white text-sm">Copy Patient Link</p>
            <p className="text-gray-500 text-xs">
              Copy the portal login URL to clipboard
            </p>
          </div>
        </button>
      </div>

      {/* Email preview */}
      {emailBody && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 space-y-2"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">Email Message</p>
            <button
              onClick={() => copyText(emailBody)}
              className="text-xs text-violet-400 hover:text-violet-300"
            >
              Copy All
            </button>
          </div>
          <pre className="text-xs text-gray-300 whitespace-pre-wrap font-sans">
            {emailBody}
          </pre>
        </motion.div>
      )}

      {smsBody && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 space-y-2"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">SMS Message</p>
            <button
              onClick={() => copyText(smsBody)}
              className="text-xs text-violet-400 hover:text-violet-300"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-300">{smsBody}</p>
        </motion.div>
      )}

      {sent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-sm text-emerald-400"
        >
          <Check className="w-4 h-4" /> Link copied to clipboard
        </motion.div>
      )}

      {/* Verbal sharing note */}
      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
        <p className="text-xs text-gray-500">
          Or share credentials verbally: just give the patient their access code.
          They&apos;ll use their email and date of birth to log in.
        </p>
      </div>

      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Preview
        </button>
        <button
          onClick={handleDone}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600
            hover:from-violet-500 hover:to-purple-500 text-white font-medium transition-all
            shadow-lg shadow-violet-600/20"
        >
          Done — Return to Dashboard
        </button>
      </div>
    </motion.div>
  );
}

function CredRow({
  label,
  value,
  large,
  copyable,
}: {
  label: string;
  value: string;
  large?: boolean;
  copyable?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p
          className={`${
            large ? "text-xl font-mono font-bold tracking-widest" : "text-sm"
          } text-white`}
        >
          {value}
        </p>
      </div>
      {copyable && (
        <button
          onClick={() => navigator.clipboard.writeText(value)}
          className="text-xs text-violet-400 hover:text-violet-300"
        >
          Copy
        </button>
      )}
    </div>
  );
}
