"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronRight } from "lucide-react";

export default function ClinicsPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Opera <span className="text-purple-600">AI</span>
          </h1>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest border border-gray-200 px-3 py-1 rounded-full">
            For Modern Practices
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 text-xs font-medium mb-8">
              <span>✨</span> The Digital COO for Specialty Clinics
            </div>

            <h2 className="text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-tight mb-6">
              Opera AI:{" "}
              <span className="text-purple-600">
                Where Clinics Get Smarter
              </span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              See how leading practices are using personalized AI-generated videos to help patients understand their treatment — and saying yes to care.{" "}
              <span className="font-semibold text-gray-900">
                Book a personalized demo and see what Opera can do for your practice.
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

          {/* Right Column — Sample Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-sm font-semibold text-gray-900 mb-3">See it in action</p>
            <div className="relative aspect-video bg-black border border-gray-200 rounded-2xl overflow-hidden">
              <video
                src="https://opera-ai-videos-075483.s3.amazonaws.com/videos/patient-video-1781629102055.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 mt-3">A sample AI-generated patient education video — personalized for each patient&apos;s diagnosis and treatment plan.</p>
            <a
              href="https://calendly.com/anishsuvarna-berkeley/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-full justify-center mt-6 px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Schedule your first meeting
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Or reach out at{" "}
              <a href="mailto:anish@getopera.ai" className="text-purple-600 font-medium hover:text-purple-500 transition-colors">
                anish@getopera.ai
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
