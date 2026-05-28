"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckCircle, ArrowRight, ChevronRight } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
          name: `${form.firstName} ${form.lastName}`,
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

  const isValid = form.firstName && form.lastName && form.email && form.clinicName;

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Opera <span className="text-purple-600">AI</span>
          </h1>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest border border-gray-200 px-3 py-1 rounded-full">
            Partner
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left Column — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-medium mb-8">
              <span>🌮</span> Dental Nachos Exclusive
            </div>

            <h2 className="text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-tight mb-6">
              Opera AI + Dental Nachos:{" "}
              <span className="text-purple-600">
                Where Clinics Get Smarter
              </span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              See how practices in the Dental Nachos community are using personalized AI-generated videos to help patients understand their treatment — and saying yes to care.{" "}
              <span className="font-semibold text-gray-900">
                Exclusive for Dental Nachos members: book a personalized demo and see what Opera can do for your practice.
              </span>
            </p>

            <div className="space-y-5 mb-12">
              {[
                "Personalized AI videos for every patient — explain their specific diagnosis and treatment plan in a way they actually understand",
                "Clinics using Opera recover an average of $15k+/month in missed production and unscheduled treatments",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/landing/dental-nachos-logo.png"
                alt="Dental Nachos"
                className="w-16 h-16 object-contain"
              />
              <p className="text-sm text-gray-400">
                Have questions? Reach out directly at{" "}
                <a
                  href="mailto:anish@getopera.ai"
                  className="text-purple-600 font-medium hover:text-purple-500 transition-colors"
                >
                  anish@getopera.ai
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right Column — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-8"
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                          First name<span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                          Last name<span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                          Email<span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                          Phone number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                          Practice type<span className="text-purple-500">*</span>
                        </label>
                        <select
                          value={form.practiceType}
                          onChange={(e) => setForm({ ...form, practiceType: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
                          required
                        >
                          <option value="" disabled>Please select</option>
                          <option value="single">Single location</option>
                          <option value="multi">Multi-location</option>
                          <option value="dso">DSO</option>
                          <option value="pms">PMS</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                          Practice name<span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.clinicName}
                          onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                        Your role
                      </label>
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
                      >
                        <option value="" disabled>Please select</option>
                        {ROLE_OPTIONS.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        What are you interested in?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {INTEREST_OPTIONS.map((interest) => {
                          const selected = form.interests.includes(interest);
                          return (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggleInterest(interest)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                selected
                                  ? "bg-purple-100 border border-purple-300 text-purple-700"
                                  : "bg-white border border-gray-300 text-gray-500 hover:border-gray-400"
                              }`}
                            >
                              {interest}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={!isValid || submitting}
                      whileHover={isValid ? { scale: 1.01 } : {}}
                      whileTap={isValid ? { scale: 0.99 } : {}}
                      className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all mt-2 ${
                        isValid
                          ? "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          Schedule your demo
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  >
                    <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-5" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re all set!</h3>
                  <p className="text-gray-500 mb-8">
                    Looking forward to connecting — pick a time that works for you.
                  </p>
                  <a
                    href="https://calendly.com/anishsuvarna-berkeley/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm transition-all shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    Book your call
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
