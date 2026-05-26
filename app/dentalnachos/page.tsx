"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Mail, Send, CheckCircle, ArrowRight } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  clinicName: string;
  role: string;
  practiceType: string;
  interests: string[];
}

const INTEREST_OPTIONS = [
  "I wanna learn more about Opera",
  "Patient videos",
  "Treatment acceptance",
];

const ROLE_OPTIONS = [
  "Owner / Dentist",
  "Orthodontist",
  "Office Manager",
  "Treatment Coordinator",
  "Operations / DSO Executive",
  "Other",
];

export default function DentalNachosPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    clinicName: "",
    role: "",
    practiceType: "",
    interests: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/leads/dentalnachos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "dental_nachos",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Still show success
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const isValid = form.name && form.email && form.clinicName && form.role;

  return (
    <div className="relative bg-white text-gray-900 min-h-screen overflow-hidden">
      {/* Subtle background accents */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-50/60 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-medium mb-6">
            <span>🌮</span> Dental Nachos Exclusive
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
            Opera <span className="text-purple-600">AI</span>
          </h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Basic Info */}
              <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 space-y-4">
                <h2 className="text-sm uppercase tracking-wider text-purple-600 font-medium mb-2">Your Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-colors text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-colors text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Clinic / practice name *"
                    value={form.clinicName}
                    onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-colors text-sm"
                    required
                  />
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-colors text-sm appearance-none"
                    required
                  >
                    <option value="" disabled className="text-gray-400">Your role *</option>
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={form.practiceType}
                    onChange={(e) => setForm({ ...form, practiceType: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-colors text-sm appearance-none"
                  >
                    <option value="" disabled className="text-gray-400">Practice type</option>
                    <option value="single">Single location</option>
                    <option value="multi">Multi-location</option>
                    <option value="dso">DSO</option>
                    <option value="pms">PMS</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Interests */}
              <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
                <h2 className="text-sm uppercase tracking-wider text-purple-600 font-medium mb-4">What are you most interested in?</h2>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((interest) => {
                    const selected = form.interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          selected
                            ? "bg-purple-100 border border-purple-300 text-purple-700"
                            : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Email note */}
              <div className="flex items-start gap-3 px-1">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  Want to reach out directly? Feel free to email us at{" "}
                  <a href="mailto:anish@getopera.ai" className="text-purple-600 font-medium hover:text-purple-500 transition-colors">
                    anish@getopera.ai
                  </a>
                  {" "}— we&apos;d love to hear from you.
                </p>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!isValid || submitting}
                whileHover={isValid ? { scale: 1.02 } : {}}
                whileTap={isValid ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-xl font-medium text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isValid
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-lg shadow-purple-300/30"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                }`}
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    Book a Time
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">You&apos;re all set!</h2>
              <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">
                Looking forward to connecting — pick a time that works for you.
              </p>
              <a
                href="https://calendly.com/anishsuvarna-berkeley/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-medium text-sm hover:from-purple-500 hover:to-violet-500 transition-all shadow-lg shadow-purple-300/30"
              >
                <Calendar className="w-4 h-4" />
                Book Your Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
