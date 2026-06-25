"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronRight } from "lucide-react";

export default function DentalPracticeMatchmakerPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Opera <span className="text-[#134e6f]">AI</span>
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#3a9168] text-xs font-medium mb-8">
              <span>🦷</span> Dental Practice Matchmaker Exclusive
            </div>

            <h2 className="text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-tight mb-6">
              Opera AI + Dental Practice Matchmaker:{" "}
              <span className="text-[#4caf7c]">
                Where Clinics Get Smarter
              </span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              See how practices in the Dental Practice Matchmaker community are using personalized AI-generated videos to help patients understand their treatment — and saying yes to care.{" "}
              <span className="font-semibold text-gray-900">
                Exclusive for Dental Practice Matchmaker members: book a personalized demo and see what Opera can do for your practice.
              </span>
            </p>

            <div className="space-y-5 mb-12">
              {[
                "Personalized AI videos for every patient — explain their specific diagnosis and treatment plan in a way they actually understand",
                "Clinics using Opera recover an average of $15k+/month in missed production and unscheduled treatments",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-[#134e6f]/10 flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-[#134e6f]" />
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/landing/dpm-logo.png"
                alt="Dental Practice Matchmaker"
                className="h-12 w-auto object-contain"
              />
              <p className="text-sm text-gray-400">
                Have questions? Reach out directly at{" "}
                <a
                  href="mailto:opera@getopera.ai"
                  className="text-[#134e6f] font-medium hover:text-[#0e3c57] transition-colors"
                >
                  opera@getopera.ai
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right Column — See it in action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="text-sm font-bold text-gray-900 mb-4">See it in action</h3>

            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src="/landing/dpm-demo-video.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-video rounded-2xl bg-black border border-gray-200 shadow-sm"
            />

            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              A sample AI-generated patient education video — personalized for each patient&apos;s diagnosis and treatment plan.
            </p>

            <a
              href="https://calendly.com/anishsuvarna-berkeley/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#134e6f] hover:bg-[#0e3c57] text-white rounded-xl font-semibold text-sm transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Schedule your first meeting
              <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-xs text-gray-400 mt-6 text-center">
              Or reach out at{" "}
              <a href="mailto:opera@getopera.ai" className="text-[#134e6f] font-medium hover:text-[#0e3c57] transition-colors">
                opera@getopera.ai
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
