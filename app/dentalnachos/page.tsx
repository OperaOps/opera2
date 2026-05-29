"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronRight } from "lucide-react";

export default function DentalNachosPage() {

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

          {/* Right Column — Book a Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Book your demo</h3>
              <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
                See how Opera AI can help your practice in a quick 30-minute walkthrough — personalized to your clinic.
              </p>
              <a
                href="https://calendly.com/anishsuvarna-berkeley/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Schedule your demo
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-gray-400 mt-6">
                Or email us at{" "}
                <a href="mailto:anish@getopera.ai" className="text-purple-600 font-medium hover:text-purple-500 transition-colors">
                  anish@getopera.ai
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
