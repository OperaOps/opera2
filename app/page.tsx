"use client";

/**
 * getopera.ai — landing page.
 * Elegant, minimal, white with purple accents. No inflated metrics, no clutter —
 * clear statement of what Opera is, who it's for, and where to start.
 */

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  Smile,
  AlignCenterVertical,
  Scissors,
  Ribbon,
  Brain,
  Eye,
  ScanLine,
  HeartPulse,
  PawPrint,
  Stethoscope,
  Baby,
  Bone,
  Ear,
  Sun,
  Flower2,
  Activity,
  Wand2,
  HeartHandshake,
  Zap,
  Check,
} from "lucide-react";

const CALENDLY = "https://calendly.com/anishsuvarna-berkeley/30min";

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const SPECIALTIES = [
  { icon: Smile, name: "Dental" },
  { icon: AlignCenterVertical, name: "Orthodontics" },
  { icon: Scissors, name: "Oral Surgery" },
  { icon: Ribbon, name: "Oncology" },
  { icon: Brain, name: "Neurology" },
  { icon: Eye, name: "Ophthalmology" },
  { icon: ScanLine, name: "Radiology" },
  { icon: HeartPulse, name: "Cardiology" },
  { icon: Stethoscope, name: "General Medicine" },
  { icon: Baby, name: "Pediatrics" },
  { icon: PawPrint, name: "Veterinary" },
  { icon: Bone, name: "Orthopedics" },
  { icon: Ear, name: "ENT" },
  { icon: Sun, name: "Dermatology" },
  { icon: Flower2, name: "Women's Health" },
  { icon: Activity, name: "Physical Therapy" },
  { icon: Wand2, name: "Plastic Surgery" },
  { icon: HeartHandshake, name: "Behavioral Health" },
  { icon: Zap, name: "Pain Management" },
  { icon: Sparkles, name: "More to come" },
];

const CHIPS = ["Will it hurt?", "What happens if I wait?", "Will insurance cover this?"];

// Specialty-grid lattice geometry: centers of the 4 rows / 5 columns (lg layout).
const ROW_YS = [12.5, 37.5, 62.5, 87.5];
const COL_XS = [10, 30, 50, 70, 90];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased selection:bg-purple-100">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-[17px] font-semibold tracking-tight">
            Opera<span className="text-purple-600">AI</span>
          </Link>
          <div className="flex items-center gap-7">
            <Link href="/docs-v2" className="hidden text-[13.5px] text-gray-500 transition-colors hover:text-gray-900 sm:block">
              API
            </Link>
            <Link href="/clinic/login" className="text-[13.5px] text-gray-500 transition-colors hover:text-gray-900">
              Log in
            </Link>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gray-900 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-gray-700"
            >
              Book a demo
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pt-40 text-center">
        <motion.p {...fade} className="text-[12px] font-semibold uppercase tracking-[0.24em] text-purple-600">
          Patient engagement &amp; education platform
        </motion.p>
        <motion.h1
          {...fade}
          transition={{ ...fade.transition, delay: 0.05 }}
          className="mx-auto mt-6 max-w-3xl text-[44px] font-semibold leading-[1.06] tracking-tight sm:text-6xl"
        >
          Patients who understand
          <br />
          <span className="text-purple-600">say yes.</span>
        </motion.h1>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-gray-500"
        >
          Opera turns every consult into a personalized video your patient can watch,
          share with family, and ask questions about — so more of them move forward
          with the care you recommend.
        </motion.p>
        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.15 }}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <Link
            href="/clinic/login"
            className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-purple-500"
          >
            Log in <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-[14px] font-medium text-gray-700 transition-colors hover:border-gray-300"
          >
            Book a demo
          </a>
        </motion.div>
      </section>

      {/* ── Product visual — the patient experience ─────────── */}
      <section className="mx-auto max-w-4xl px-6 pt-20">
        <motion.div
          {...fade}
          className="overflow-hidden rounded-2xl border border-gray-200 shadow-[0_30px_90px_rgba(88,28,135,0.12)]"
        >
          {/* browser chrome */}
          <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50/80 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
            <span className="mx-auto rounded-md bg-white px-4 py-0.5 text-[11px] text-gray-400 ring-1 ring-gray-100">
              getopera.ai/v/jessica
            </span>
          </div>
          {/* the real patient page, in miniature */}
          <div className="bg-gradient-to-b from-purple-50/50 to-white px-6 pb-8 pt-6 sm:px-12">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-purple-600">
              Made for Jessica
            </p>
            <p className="mt-1.5 text-center text-[19px] font-semibold tracking-tight">
              Your Porcelain Veneers, Step by Step
            </p>
            <div className="pointer-events-none relative mx-auto mt-5 max-w-xl overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <HeroClip />
            </div>
            {/* ask bar mock */}
            <div className="mx-auto mt-5 flex max-w-xl items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
              <span className="text-[13px] text-gray-400">Ask about my treatment...</span>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {CHIPS.map((c) => (
                <span key={c} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11.5px] text-gray-500">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.p {...fade} className="mt-5 text-center text-[13px] text-gray-400">
          Every patient gets a private link — their video on top, answers underneath.{" "}
          <Link href="/v/demo" className="font-medium text-purple-600 hover:text-purple-500">
            Try the live demo →
          </Link>
        </motion.p>
      </section>

      {/* ── Trusted by — black band ─────────────────────────── */}
      <section className="pt-24">
        <motion.div {...fade} className="bg-black py-14">
          <p className="pb-8 text-center text-xl font-semibold uppercase tracking-[0.35em] text-purple-300 sm:text-2xl">
            Trusted By
          </p>
          <div className="mx-auto flex max-w-4xl justify-center px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/trusted-by.png"
              alt="Trusted by practices across the country"
              className="w-full max-w-3xl"
            />
          </div>
        </motion.div>
      </section>

      {/* ── How it works — three quiet steps ────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pt-28">
        <motion.h2 {...fade} className="text-center text-[28px] font-semibold tracking-tight sm:text-4xl">
          From consult to confident yes
        </motion.h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {[
            {
              t: "Share your consult notes",
              d: "Paste the visit notes or scribe transcript. That's the whole input — no editing, no templates.",
            },
            {
              t: "Opera makes it personal",
              d: "A narrated video built around this patient — their diagnosis, their plan, their questions — in minutes.",
            },
            {
              t: "Patients watch, ask, decide",
              d: "They get a private link to watch at home, share with family, and ask Opera anything about their treatment.",
            },
          ].map((s, i) => (
            <motion.div key={s.t} {...fade} transition={{ ...fade.transition, delay: i * 0.07 }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-[13px] font-semibold text-purple-700">
                {i + 1}
              </div>
              <h3 className="mt-4 text-[16px] font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-gray-500">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Specialties grid ────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pt-28">
        <motion.h2 {...fade} className="text-center text-[28px] font-semibold tracking-tight sm:text-4xl">
          Built for the conversations
          <br className="hidden sm:block" /> patients think about all week
        </motion.h2>
        <motion.p {...fade} className="mx-auto mt-4 max-w-lg text-center text-[14.5px] text-gray-500">
          Wherever a treatment plan needs a calm, clear explanation — Opera speaks the specialty.
        </motion.p>
        <div className="relative mt-14">
          {/* Connecting lattice — lines run through the gaps between tiles,
              with glow pulses traveling along them on repeat. lg only (5×4 grid). */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {ROW_YS.map((y) => (
                <line key={`h${y}`} x1="2" y1={y} x2="98" y2={y} stroke="#a855f7" strokeOpacity="0.14" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
              ))}
              {COL_XS.map((x) => (
                <line key={`v${x}`} x1={x} y1="4" x2={x} y2="96" stroke="#a855f7" strokeOpacity="0.10" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            {ROW_YS.flatMap((y, i) =>
              [0, 1].map((k) => (
                <motion.div
                  key={`pulse-h${y}-${k}`}
                  initial={{ left: "-10%", opacity: 0 }}
                  animate={{
                    left: i % 2 === 0 ? ["-10%", "104%"] : ["104%", "-10%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 5.5,
                    delay: i * 0.7 + k * 2.75,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_14px_2px_rgba(168,85,247,0.45)]"
                  style={{ top: `calc(${y}% - 1px)` }}
                />
              ))
            )}
            {COL_XS.map((x, i) => (
              <motion.div
                key={`pulse-v${x}`}
                initial={{ top: "-10%", opacity: 0 }}
                animate={{ top: ["-10%", "104%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 6.5, delay: i * 1.3, repeat: Infinity, ease: "linear" }}
                className="absolute w-[2px] h-24 rounded-full bg-gradient-to-b from-transparent via-purple-400 to-transparent shadow-[0_0_14px_2px_rgba(168,85,247,0.35)]"
                style={{ left: `calc(${x}% - 1px)` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:grid-cols-5 lg:gap-6">
            {SPECIALTIES.map((s, i) => (
              <motion.div
                key={s.name}
                {...fade}
                transition={{ ...fade.transition, delay: i * 0.04 }}
                className="group relative z-10 flex flex-col items-center gap-2.5 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-7 transition-all hover:-translate-y-0.5 hover:border-purple-200 hover:bg-white hover:shadow-[0_16px_40px_rgba(88,28,135,0.10)]"
              >
                <s.icon className="h-5 w-5 text-purple-600" strokeWidth={1.7} />
                <span className="text-[13.5px] font-medium text-gray-700">{s.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quiet reassurance row ───────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 pt-24">
        <motion.div {...fade} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["Education only — never medical advice", "Your data stays yours", "Set up in one afternoon"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2 text-[13px] text-gray-500">
              <Check className="h-3.5 w-3.5 text-purple-600" /> {t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-24">
        <motion.div {...fade} className="rounded-3xl bg-gray-950 px-8 py-16 text-center">
          <h2 className="text-[28px] font-semibold tracking-tight text-white sm:text-4xl">
            Give every patient a reason to say yes
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-white/60">
            Your first personalized video is a consult away.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/clinic/login"
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-purple-500"
            >
              Log in <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-[14px] font-medium text-white/90 transition-colors hover:border-white/40"
            >
              Book a demo
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <p className="text-[14px] font-semibold tracking-tight">
            Opera<span className="text-purple-600">AI</span>
          </p>
          <div className="flex items-center gap-6 text-[12.5px] text-gray-400">
            <Link href="/docs-v2" className="hover:text-gray-700">API</Link>
            <Link href="/overview" className="hover:text-gray-700">Company</Link>
            <Link href="/clinic/login" className="hover:text-gray-700">Log in</Link>
          </div>
          <p className="text-[12px] text-gray-300">© {new Date().getFullYear()} Opera AI</p>
        </div>
      </footer>
    </div>
  );
}

/** Auto-plays a short highlight of a real Opera video, then freezes on a good frame. */
function HeroClip() {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <video
      ref={ref}
      src="/videos/hero-tooth.mp4"
      autoPlay
      muted
      playsInline
      preload="auto"
      loop
      onTimeUpdate={() => {
        const v = ref.current;
        if (v && v.currentTime >= 3.5) v.currentTime = 0; // loop the glowing-tooth moment
      }}
      className="w-full"
    />
  );
}
