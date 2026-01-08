"use client"

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { MessageSquare, Shield, Mail, Lock, Sparkles, Brain, Database, Zap, ChevronRight, Activity } from "lucide-react";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 border-b border-purple-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-2.5 text-center">
          <p className="text-sm text-purple-200">
            Opera AI is now available for multi-location clinics<Link href="#" className="text-white hover:text-purple-300 transition-colors underline underline-offset-2"></Link>
          </p>
        </div>
      </motion.div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-purple-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="text-2xl font-serif bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-blue-300 transition-all">
              Opera AI
            </h1>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <motion.a 
              href="#product" 
              whileHover={{ y: -2, color: "#c084fc" }}
              className="text-xs uppercase tracking-wider text-purple-200/70 hover:text-purple-300 transition-colors font-medium"
            >
              Product
            </motion.a>
            <motion.a 
              href="#use-cases" 
              whileHover={{ y: -2, color: "#c084fc" }}
              className="text-xs uppercase tracking-wider text-purple-200/70 hover:text-purple-300 transition-colors font-medium"
            >
              Use Cases
            </motion.a>
            <motion.a 
              href="#security" 
              whileHover={{ y: -2, color: "#c084fc" }}
              className="text-xs uppercase tracking-wider text-purple-200/70 hover:text-purple-300 transition-colors font-medium"
            >
              Security
            </motion.a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" }}
                transition={{ duration: 0.2 }}
                className="px-5 py-2 text-xs uppercase tracking-wider text-white bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded transition-colors font-medium"
              >
                Sign In
              </motion.button>
            </Link>
            <Link href="/demo">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="px-5 py-2 text-xs uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded font-medium shadow-lg shadow-purple-500/30"
              >
                Book a Demo
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Two Column Layout */}
      <section className="w-full bg-gradient-to-b from-black via-purple-950/10 to-black border-b border-purple-500/20 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-5xl font-serif text-white leading-tight mb-4"
              >
                AI Agents that turn clinical data into <span className="text-purple-700">opera</span>tional intelligence
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-8"
              />
            </motion.div>

            {/* Right: Description + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col gap-8"
            >
              <p className="text-lg md:text-xl text-purple-100 leading-relaxed font-light">
                The all-in-one AI-native platform for doctors that understands your clinic and drives impact.
              </p>
              <Link href="/demo">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full md:w-auto px-12 py-5 text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-medium shadow-xl shadow-purple-500/40 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Book a Demo
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section with Background Image */}
      <section className="relative w-full min-h-[600px] bg-black overflow-hidden border-y border-purple-500/20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/landing/unn.jpg"
            alt="City background"
            className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: Problem Statement */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">
              Every year, clinics leave millions on the table not to medicine, but to chaos hiding in their data.
              </p>
            </motion.div>

            {/* Right: Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center justify-center md:justify-end"
            >
              <p className="text-2xl md:text-3xl font-serif text-purple-200 italic">
                Don't be one of those clinics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Scroll */}
      <TrustedByScroll />

      {/* Core Product Features - 4 Box Grid */}
      <section id="product" className="w-full bg-gradient-to-b from-black via-purple-950/5 to-black border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Everything runs through <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">us</span>
            </h2>
            <p className="text-xl text-purple-200/70 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              One LLM conversational assistant that powers your entire clinic. Opera is the brain that ingests everything.
            </p>
          </motion.div>

          {/* Two Column Layout: Features on Left, Image Centered on Right */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left: Stacked Feature Boxes */}
            <div className="space-y-4">
              {[
                {
                  icon: MessageSquare,
                  title: "LLM Conversational Assistant",
                  command: "Why was my production down last week?"
                },
                {
                  icon: Mail,
                  title: "Communications & Email",
                  command: "Send follow-up to patients who missed appointments"
                },
                {
                  icon: Database,
                  title: "Insurance & Billing",
                  command: "Show me claims pending over 30 days"
                },
                {
                  icon: Shield,
                  title: "Security & Compliance",
                  command: "Audit access logs for patient data this month"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ x: 4 }}
                  className="p-6 bg-black/50 border border-purple-500/30 rounded-lg hover:border-purple-400/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg border border-purple-500/30 flex items-center justify-center flex-shrink-0 group-hover:border-purple-400 transition-colors">
                      <feature.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-serif text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-purple-300/70 font-light italic">"{feature.command}"</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Ingest Visual - Centered Vertically */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/landing/ingest.png"
                  alt="Opera AI - The Brain That Ingests Everything"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>

          {/* Product Visual - Full Width Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-16 w-full"
          >
            <div className="relative p-8 bg-black/50 border border-purple-500/40 rounded-2xl hover:border-purple-400/60 transition-all shadow-2xl shadow-purple-500/30">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-purple-500/20 blur-2xl opacity-60" />
              
              {/* Image container */}
              <div className="relative z-10 max-w-6xl mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/landing/convers.png"
                  alt="Product Demo - Conversational Assistant"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="w-full bg-black border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Empowering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Clinic Team</span>
            </h2>
            <p className="text-xl text-purple-200/70 max-w-3xl mx-auto leading-relaxed font-light">
              From production analysis to revenue leakage detection, Opera helps clinic teams make smarter, data-driven decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {[
              {
                title: "Production Analysis",
                desc: "Understand why production is down, which chairs are underperforming, and where opportunities exist.",
                questions: [
                  "Why was my production down last week?",
                  "Which chairs are underperforming today?",
                  "Are we fully booked or just looking busy?"
                ],
                gradient: "from-purple-500/20 to-blue-500/20"
              },
              {
                title: "Patient Communication",
                desc: "Management, insurance claims, billing, and front desk operations seamlessly within one platform.",
                questions: [
                  "How can I send messages and emails to patients easily?",
                  "Which insurance claims need attention?",
                  "How is my front desk handling the patient flow?",
                  "Are we staying on top of patient follow-ups?"
                ],
                gradient: "from-blue-500/20 to-cyan-500/20"
              },
              {
                title: "Staff Optimization",
                desc: "Identify staffing gaps, optimize schedules, and ensure the right people are in the right place.",
                questions: [
                  "Are we staffing correctly today?",
                  "How is my front desk performing?",
                  "What's slowing my clinic down?"
                ],
                gradient: "from-cyan-500/20 to-purple-500/20"
              },
              {
                title: "Growth Planning",
                desc: "Prioritize growth initiatives based on data-driven impact projections.",
                questions: [
                  "What should I fix first for more revenue?",
                  "If I do nothing, how will this month end?",
                  "Which procedures hurt schedule efficiency?"
                ],
                gradient: "from-purple-500/20 to-pink-500/20"
              }
            ].map((useCase, i) => (
              <UseCaseCard key={i} useCase={useCase} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* Testimonial Scroll */}
      <TestimonialScroll />

      {/* Security Section - 4 Box Grid */}
      <section id="security" className="w-full bg-gradient-to-b from-black via-purple-950/5 to-black border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Enterprise-grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">security</span>
            </h2>
            <p className="text-xl text-purple-200/70 max-w-3xl mx-auto leading-relaxed font-light">
              Your data stays yours. We never train on your clinic's data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Lock,
                title: "End-to-End Encryption",
                desc: "256-bit encryption at rest and in transit. Your data is always protected."
              },
              {
                icon: Shield,
                title: "HIPAA Compliant",
                desc: "Full HIPAA compliance with BAA agreements. Built for healthcare from day one."
              },
              {
                icon: Activity,
                title: "Guardrails",
                desc: "Built-in safety controls and content filters ensure AI responses stay accurate, compliant, and appropriate for healthcare contexts."
              },
              {
                icon: Database,
                title: "Data Privacy",
                desc: "Your data never leaves your control. Zero-knowledge architecture."
              }
            ].map((item, i) => (
              <SecurityCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full bg-gradient-to-b from-black via-purple-950/10 to-black border-b border-purple-500/20">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-3xl md:text-4xl lg:text-5xl text-purple-200/90 mb-12 mx-auto font-serif whitespace-nowrap">
              Let's see Opera AI in action.
            </p>
            <Link href="/demo">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(168, 85, 247, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="px-12 py-5 text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-medium shadow-2xl shadow-purple-500/40"
              >
                Book a Demo
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <p className="text-purple-400/40 text-sm font-light">
              © 2026 Opera AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ feature, index }: { feature: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`p-8 bg-gradient-to-br ${feature.color} bg-opacity-10 border border-purple-500/30 rounded-2xl hover:border-purple-400/50 transition-all cursor-pointer group relative overflow-hidden`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500"
      />
      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
        >
          <feature.icon className="w-7 h-7 text-white" />
        </motion.div>
        <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-purple-200 transition-colors">{feature.title}</h3>
        <p className="text-purple-200/70 leading-relaxed font-light">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

// Use Case Card Component
function UseCaseCard({ useCase, index }: { useCase: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className={`p-8 bg-gradient-to-br ${useCase.gradient} border border-purple-500/20 rounded-2xl hover:border-purple-400/40 transition-all group`}
    >
      <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-purple-200 transition-colors">{useCase.title}</h3>
      <p className="text-purple-200/70 mb-6 leading-relaxed font-light">{useCase.desc}</p>
      <div className="space-y-3">
        {useCase.questions.map((q: string, j: number) => (
          <motion.div 
            key={j} 
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * j }}
          >
            <Zap className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
            <p className="text-sm text-purple-300/60 font-light italic">"{q}"</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Security Card Component
function SecurityCard({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="p-8 bg-black border-2 border-purple-700/50 rounded-2xl hover:border-purple-600 transition-all cursor-pointer group relative"
    >
      <div className="relative z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-14 h-14 rounded-xl border-2 border-purple-700/50 flex items-center justify-center mb-6 group-hover:border-purple-600 transition-colors"
        >
          <item.icon className="w-7 h-7 text-purple-500" />
        </motion.div>
        <h3 className="text-xl font-serif text-white mb-3 group-hover:text-purple-300 transition-colors">{item.title}</h3>
        <p className="text-purple-200/70 text-sm leading-relaxed font-light">{item.desc}</p>
      </div>
    </motion.div>
  );
}

// Trusted By Scroll Component
function TrustedByScroll() {
  const logosRow1 = [
    { src: "/landing/stannew.png", alt: "Stanford" },
    { src: "/landing/berk.png", alt: "UC Berkeley" },
    { src: "/landing/cedars.png", alt: "Cedars-Sinai" },
    { src: "/landing/grey.png", alt: "Greyfinch" },
    { src: "/landing/opend.png", alt: "OpenDental" }
  ];

  const logosRow2 = [
    { src: "/landing/pwc3.png", alt: "PWC" },
    { src: "/landing/ysec.png", alt: "YSEC" },
    { src: "/landing/falc2.png", alt: "Falcon" },
    { src: "/landing/pars.png", alt: "Pars" }
  ];

  return (
    <section className="w-full bg-black border-b border-purple-500/20 py-24 md:py-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-purple-400/80 text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider mb-12 font-serif"
      >
        Trusted By
      </motion.p>
      <div className="max-w-7xl mx-auto px-6">
        {/* First Row */}
        <div className="flex items-center justify-center gap-12 md:gap-16 lg:gap-24 flex-wrap mb-12">
          {logosRow1.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 0.8 }}
              className="flex-shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className={`w-auto object-contain transition-all duration-300 opacity-100 grayscale-0 brightness-110 hover:brightness-125 ${logo.src === "/landing/stannew.png" ? "h-20 md:h-32 lg:h-40" : "h-12 md:h-16 lg:h-20"}`}
                style={{ maxWidth: logo.src === "/landing/stannew.png" ? "400px" : "200px" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Second Row */}
        <div className="flex items-center justify-center gap-12 md:gap-16 lg:gap-24 flex-wrap">
          {logosRow2.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (logosRow1.length + i) * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 0.8 }}
              className="flex-shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-auto object-contain transition-all duration-300 opacity-100 grayscale-0 brightness-110 hover:brightness-125 h-12 md:h-16 lg:h-20"
                style={{ maxWidth: "200px" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial Scroll Component
function TestimonialScroll() {
  const testimonials = [
    {
      quote: "If I had this when I opened my second location, we would've scaled 6 months faster.",
      author: "Dr. Venkat Chalasani",
      role: "Owner, Parsons Pointe Dental"
    },
    {
      quote: "Showed it to our finance guy. Jaw dropped.",
      author: "Jake Gulick",
      role: "CEO, Greyfinch"
    },
    {
      quote: "My mornings would be 10x easier with Opera; it gives me insights we didn't even know we needed!",
      author: "Dr. Jacob Zitterkopf",
      role: "Owner, Falcon Orthodontics"
    },
    {
      quote: "Opera AI's text and email integration has streamlined communication with patients.",
      author: "Jon McLachlan",
      role: "CEO, YSecurity"
    },
    {
      quote: "We're always confident that our communication via Opera complies with HIPAA, protecting privacy.",
      author: "Dr. Mahathi Nanduri",
      role: "Dentist, Smilezone Cosmetics"
    },
    {
      quote: "This level of unification and technology in healthcare is unbelievable.",
      author: "Bipul Sinha",
      role: "CEO, Rubrik"
    }
  ];

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="w-full bg-gradient-to-b from-black via-purple-950/5 to-black border-b border-purple-500/20 py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">operators</span>
        </h2>
      </motion.div>

      <div className="relative">
        <motion.div
          className="flex gap-8"
          animate={{
            x: [0, -3000]
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {doubled.map((testimonial, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="flex-shrink-0 w-[500px] p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl hover:border-purple-400/50 transition-all"
            >
              <p className="text-lg font-serif text-white mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              {testimonial.author && (
                <div>
                  <p className="text-purple-200 font-medium">{testimonial.author}</p>
                  {testimonial.role && <p className="text-purple-400/60 text-sm font-light">{testimonial.role}</p>}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
