"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const CALENDLY = "https://calendly.com/anishsuvarna-berkeley/30min";

// ---------------------------------------------------------------------------
// Hero canvas
// ---------------------------------------------------------------------------

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const resize = () => { canvas.width = canvas.offsetWidth * 1.5; canvas.height = canvas.offsetHeight * 1.5; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, w, h);
      const t = frame * 0.002;

      const blobs = [
        { x: w * (0.3 + Math.sin(t * 0.7) * 0.15), y: h * (0.4 + Math.cos(t * 0.5) * 0.15), r: w * 0.35, hue: 270, s: 50, l: 18, a: 0.5 },
        { x: w * (0.7 + Math.cos(t * 0.6) * 0.12), y: h * (0.3 + Math.sin(t * 0.8) * 0.12), r: w * 0.3, hue: 250, s: 40, l: 15, a: 0.4 },
        { x: w * (0.5 + Math.sin(t * 0.4) * 0.1), y: h * (0.7 + Math.cos(t * 0.3) * 0.1), r: w * 0.28, hue: 280, s: 35, l: 12, a: 0.35 },
      ];

      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `hsla(${b.hue}, ${b.s}%, ${b.l}%, ${b.a})`);
        grad.addColorStop(0.6, `hsla(${b.hue}, ${b.s}%, ${b.l * 0.5}%, ${b.a * 0.3})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      frame++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ---------------------------------------------------------------------------
// Stat
// ---------------------------------------------------------------------------

function Stat({ value, suffix = "", label, delay = 0 }: { value: string; suffix?: string; label: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.5 }}>
      <span className="text-5xl sm:text-6xl font-semibold tracking-tight text-gray-900">{value}<span className="text-purple-600">{suffix}</span></span>
      <p className="mt-2 text-sm text-gray-500">{label}</p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Built-for section — horizontal wave with glow + connectors
// ---------------------------------------------------------------------------

function WaveItems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const items = [
    { label: "Individual Clinics", y: 10, glow: "#a78bfa" },
    { label: "PMS Platforms", y: -30, glow: "#7c3aed" },
    { label: "DSOs", y: 16, glow: "#8b5cf6" },
    { label: "Treatment Coordinators", y: -24, glow: "#6d28d9" },
    { label: "Multi-Location Groups", y: 20, glow: "#a78bfa" },
    { label: "Oral Surgeons", y: -36, glow: "#7c3aed" },
  ];

  return (
    <div ref={ref} className="relative py-16 overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 70%)" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[250px] h-[180px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)" }}
        />
      </div>

      {/* Animated wavy connector */}
      <svg className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-32 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 120">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147,51,234,0)" />
            <stop offset="20%" stopColor="rgba(147,51,234,0.12)" />
            <stop offset="50%" stopColor="rgba(139,92,246,0.15)" />
            <stop offset="80%" stopColor="rgba(147,51,234,0.12)" />
            <stop offset="100%" stopColor="rgba(147,51,234,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,60 C80,30 160,90 280,55 C400,20 450,85 580,60 C700,35 760,80 880,55 C1000,30 1060,75 1200,60"
          fill="none" stroke="url(#lineGrad)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Second faint line offset */}
        <motion.path
          d="M0,65 C100,40 200,85 320,58 C440,30 500,78 620,55 C740,32 820,72 940,52 C1060,32 1120,70 1200,58"
          fill="none" stroke="rgba(147,51,234,0.04)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        />
      </svg>

      {/* Dot accents scattered */}
      {[
        { x: "8%", y: "30%", size: 4, delay: 0.5 },
        { x: "25%", y: "70%", size: 3, delay: 0.7 },
        { x: "45%", y: "25%", size: 5, delay: 0.6 },
        { x: "62%", y: "75%", size: 3, delay: 0.8 },
        { x: "78%", y: "28%", size: 4, delay: 0.9 },
        { x: "92%", y: "65%", size: 3, delay: 1.0 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-400/20"
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: dot.delay, duration: 0.3 }}
        />
      ))}

      {/* Pills */}
      <div className="flex items-center justify-between gap-4 relative z-10">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: item.y } : {}}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6, type: "spring", stiffness: 120 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              className="group relative cursor-default"
            >
              {/* Hover glow ring */}
              <div
                className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ background: `radial-gradient(circle, ${item.glow}18 0%, transparent 70%)` }}
              />
              {/* Pill */}
              <div className="relative px-5 py-2.5 bg-white rounded-full border border-gray-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] group-hover:border-purple-300 group-hover:shadow-[0_4px_24px_rgba(147,51,234,0.12)] transition-all duration-300">
                <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">{item.label}</span>
              </div>
              {/* Small dot below pill */}
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400/30 group-hover:bg-purple-500/50 transition-colors duration-300"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LandingV2() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">

      {/* ================================================================ */}
      {/* NAV — hidden initially, appears on scroll (white like API page) */}
      {/* ================================================================ */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: scrolled ? 0 : -60 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl shadow-[0_0_40px_rgba(147,51,234,0.04)]"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/landing-v2" className="text-lg font-bold tracking-tight text-gray-900">
            Opera<span className="text-purple-600">AI</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/docs-v2" className="text-[13px] text-gray-400 hover:text-gray-900 transition-colors">API</Link>
            <Link href="/signin" className="text-[13px] text-gray-400 hover:text-gray-900 transition-colors">Log In</Link>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="text-[13px] font-medium text-white bg-gray-900 px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors">
              Book a Demo
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ================================================================ */}
      {/* HERO — Full screen, nav links in hero itself */}
      {/* ================================================================ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#09090b]">
        <HeroCanvas />

        {/* Hero nav (visible when main nav is hidden) */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-6 w-full flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-white">
            Opera<span className="text-purple-400">AI</span>
          </span>
          <div className="flex items-center gap-6">
            <Link href="/docs-v2" className="text-[13px] text-white/40 hover:text-white transition-colors">API</Link>
            <Link href="/signin" className="text-[13px] text-white/40 hover:text-white transition-colors">Log In</Link>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="text-[13px] font-medium text-[#09090b] bg-white px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors">
              Book a Demo
            </a>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}>
              <p className="text-[13px] font-medium text-purple-400/80 tracking-[0.2em] uppercase mb-6">
                Intelligence for specialty healthcare
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-semibold tracking-tight leading-[1.06] text-white max-w-3xl">
                Personalized patient
                <br />
                videos that convert.
              </h1>
              <p className="mt-6 text-lg text-white/40 max-w-xl leading-relaxed">
                AI-powered education videos for dental, orthodontic, and oral surgery practices.
                Patients understand. Patients trust. Patients say yes.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[15px] font-medium text-[#09090b] bg-white px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors">
                  Book a Demo <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/docs-v2"
                  className="inline-flex items-center gap-2 text-[15px] font-medium text-white/50 px-7 py-3.5 rounded-full border border-white/10 hover:border-white/20 hover:text-white transition-colors">
                  API Documentation <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="relative z-10 max-w-6xl mx-auto px-6 pb-8 w-full flex items-center gap-5 text-[13px] text-white/30">
          <span>Currently serving</span>
          <span className="text-white/50 font-medium">Dental</span>
          <span className="w-1 h-1 rounded-full bg-purple-500/60" />
          <span className="text-white/50 font-medium">Orthodontics</span>
          <span className="w-1 h-1 rounded-full bg-purple-500/60" />
          <span className="text-white/50 font-medium">Oral Surgery</span>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* STATS */}
      {/* ================================================================ */}
      <section className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
          <Stat value="3x" label="case acceptance improvement" />
          <Stat value="60" suffix="s" label="video generation time" delay={0.1} />
          <Stat value="18" label="treatments supported" delay={0.2} />
        </div>
      </section>

      {/* ================================================================ */}
      {/* HOW IT WORKS */}
      {/* ================================================================ */}
      <section className="max-w-6xl mx-auto px-6 pb-24 sm:pb-32">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[13px] font-medium text-purple-600 tracking-[0.15em] uppercase mb-4">How it works</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-12">
          Patient walks in.<br />Video walks out.
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Enter patient details", desc: "Name, doctor, treatment. Optional notes for personalization. Takes 30 seconds." },
            { step: "02", title: "AI generates the video", desc: "Custom script, natural voiceover, clinical visuals. HD video in about a minute." },
            { step: "03", title: "Patient watches & accepts", desc: "They understand what's happening. Confidence rises. Case acceptance follows." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="border border-gray-200 rounded-2xl p-6 hover:border-purple-200 transition-colors">
              <span className="text-xs font-mono text-purple-600 mb-3 block">{item.step}</span>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* BUILT FOR — Horizontal wave */}
      {/* ================================================================ */}
      <section className="max-w-6xl mx-auto px-6 pb-24 sm:pb-32">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-14">
          Built for everyone.
        </motion.h2>
        <WaveItems />
      </section>

      {/* ================================================================ */}
      {/* BOTTOM BLACK SECTION — CTA + Trusted By + Footer */}
      {/* ================================================================ */}
      <section className="relative bg-black overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10">
          {/* CTA + Trusted by — side by side */}
          <div className="max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-20 sm:pb-24">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
              {/* Left — CTA repeat */}
              <div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-white mb-5">
                  Triple your case<br />acceptance.
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="text-white/40 text-lg leading-relaxed mb-8">
                  Every unaccepted treatment plan is lost revenue. Opera turns consultations into conversions.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[15px] font-medium text-black bg-white px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors">
                    Book a Demo <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>

              {/* Right — Trusted by with original image */}
              <div>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  className="text-[11px] font-medium text-white/25 uppercase tracking-[0.2em] mb-6 text-center">
                  Trusted by
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img src="/trusted-by.png" alt="Trusted by leading institutions" className="w-full h-auto" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-white/5 flex items-center justify-between text-[13px] text-white/30">
            <span>Opera<span className="text-purple-400">AI</span></span>
            <div className="flex gap-6">
              <Link href="/docs-v2" className="hover:text-white/60 transition-colors">API</Link>
              <Link href="/signin" className="hover:text-white/60 transition-colors">Log In</Link>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
