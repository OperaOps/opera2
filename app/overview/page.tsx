"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Calendar,
  Globe,
  ArrowRight,
  Sparkles,
  Activity,
  Layers,
  Video,
  Brain,
  HeartHandshake,
  Plane,
  Database,
  Stethoscope,
} from "lucide-react";

const CALENDLY =
  "https://calendly.com/anishsuvarna-berkeley/30min?back=1&month=2026-06";
const VIDEO_SRC = "/videos/demo-veneers.mp4";
const WEBSITE = "https://getopera.ai";

const NAV_SECTIONS = [
  { id: "top", label: "Overview" },
  { id: "summary", label: "In Short" },
  { id: "problem", label: "The Problem" },
  { id: "product", label: "What We Do" },
  { id: "how", label: "How It Works" },
  { id: "demo", label: "Demo" },
  { id: "vision", label: "Vision" },
  { id: "traction", label: "Traction" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

function SideNav() {
  const [active, setActive] = React.useState(NAV_SECTIONS[0].id);

  React.useEffect(() => {
    const ids = NAV_SECTIONS.map((s) => s.id);
    const onScroll = () => {
      const line = window.innerHeight * 0.4; // "you are here" threshold
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="fixed left-8 top-1/2 z-30 hidden h-[78vh] -translate-y-1/2 xl:block">
      <div className="relative flex h-full flex-col justify-between py-2">
        {/* glowing vertical track */}
        <span className="absolute left-[5px] top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/70 to-transparent" />
        <span className="absolute left-[5px] top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent blur-[3px]" />
        {/* drifting glow that travels down the track */}
        <motion.span
          aria-hidden
          className="absolute left-[-9px] h-24 w-6 rounded-full bg-purple-500/40 blur-2xl"
          animate={{ top: ["0%", "92%", "0%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {NAV_SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center gap-4 pl-0"
            >
              {/* node */}
              <span className="relative z-10 flex h-3 w-3 items-center justify-center">
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-300 group-hover:bg-purple-400/30 group-hover:blur-md group-hover:[box-shadow:0_0_16px_6px_rgba(168,85,247,0.6)] ${
                    isActive
                      ? "bg-purple-400/30 blur-md [box-shadow:0_0_16px_6px_rgba(168,85,247,0.6)]"
                      : "bg-purple-400/0"
                  }`}
                />
                <span
                  className={`rounded-full ring-1 transition-all duration-300 group-hover:h-3 group-hover:w-3 group-hover:bg-purple-300 group-hover:ring-purple-300/60 group-hover:shadow-[0_0_12px_rgba(192,132,252,1)] ${
                    isActive
                      ? "h-3 w-3 bg-purple-300 ring-purple-300/60 shadow-[0_0_12px_rgba(192,132,252,1)]"
                      : "h-2 w-2 bg-gray-600 ring-white/10"
                  }`}
                />
              </span>
              {/* label */}
              <span
                className={`text-[13px] font-medium uppercase tracking-[0.14em] transition-all duration-300 group-hover:translate-x-0 group-hover:text-white group-hover:opacity-100 group-hover:[text-shadow:0_0_12px_rgba(168,85,247,0.8)] ${
                  isActive
                    ? "translate-x-0 text-white opacity-100 [text-shadow:0_0_12px_rgba(168,85,247,0.8)]"
                    : "-translate-x-1 text-gray-500 opacity-70"
                }`}
              >
                {s.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

const FORWARDABLE_SUMMARY = `Opera AI is building the patient education layer for modern healthcare. Every day, patients leave appointments uncertain about what comes next — they forget what their provider explained, struggle to relay it to family, or turn to generic AI tools that know nothing about their actual diagnosis. Using a patient's real clinical context — diagnoses, imaging, treatment recommendations, and physician notes — Opera automatically generates a hyper-personalized video within seconds that patients can revisit at home and share with family. In the last six months, Opera has delivered 130,000+ personalized patient videos and recovered $2.5M+ in previously unscheduled treatment for clinics across the U.S., with zero additional staff and zero workflow changes. The platform is used by 75+ dental and orthodontic clinics, is partnered with Greyfinch, and recently entered a partnership with Truveta — the $1B+ healthcare data company backed by many of the nation's leading health systems. Opera is now expanding into primary care, specialty medicine, ophthalmology, and hospital systems. It is led by Anish Suvarna of UC Berkeley M.E.T. and Ram Dosibhatla of Stanford CS — best friends of 10+ years — and backed by Joshua Browder, SV Angel, and Pareto Holdings.`;

// ---- small reusable building blocks -------------------------------------

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-purple-500" />
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-purple-400">
        {children}
      </span>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-colors hover:border-purple-500/40 ${className}`}
    >
      {children}
    </div>
  );
}

// ---- page ----------------------------------------------------------------

export default function OverviewPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);

  const playVideo = () => {
    setVideoStarted(true);
    videoRef.current?.play();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white antialiased overflow-x-hidden selection:bg-purple-500/30">
      {/* ambient background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute top-[40%] -right-40 h-[500px] w-[500px] rounded-full bg-fuchsia-700/10 blur-[140px]" />
        <div className="absolute bottom-0 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-700/10 blur-[140px]" />
      </div>

      <SideNav />

      <div className="relative z-10" id="top">
        {/* ===== Masthead ===== */}
        <header className="mx-auto max-w-6xl px-6 pt-10 md:px-10">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold tracking-tight">
              Opera <span className="text-purple-400">AI</span>
            </div>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-purple-500/50 hover:text-white"
            >
              <Calendar className="h-4 w-4" /> Book a Short Call
            </a>
          </div>
          {/* purple accent bar */}
          <div className="mt-5 h-[3px] w-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-transparent" />
          <p className="mt-3.5 text-base font-medium tracking-wide text-white">
            Ram Dosibhatla{" "}
            <span className="text-purple-400">·</span> Anish Suvarna
          </p>
        </header>

        {/* ===== Hero ===== */}
        <section className="mx-auto max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
          <motion.div {...reveal}>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
              Opera AI is building the patient education layer for{" "}
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
                modern healthcare.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-gray-400">
              Using a patient&apos;s actual clinical context — diagnoses,
              imaging, treatment recommendations, and physician notes — Opera
              automatically generates a hyper-personalized video in seconds.
              Patients finally understand what comes next, revisit it at home,
              and share it with family.
            </p>

            {/* punchy outcome band */}
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                In the last six months
              </p>
              <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-purple-500/25 bg-white/[0.02] sm:grid-cols-3">
                {[
                  { stat: "130,000+", label: "personalized patient videos delivered" },
                  { stat: "$2.5M+", label: "in unscheduled treatment recovered" },
                  { stat: "Zero", label: "added staff or workflow changes" },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.02] px-6 py-5">
                    <div className="bg-gradient-to-r from-purple-200 to-fuchsia-300 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
                      {s.stat}
                    </div>
                    <p className="mt-1.5 text-sm leading-snug text-gray-400">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-all hover:bg-purple-500"
              >
                <Play className="h-4 w-4 fill-white" /> Watch Demo
              </a>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-gray-100 transition-all hover:border-purple-500/50"
              >
                <Calendar className="h-4 w-4" /> Book a Short Call
              </a>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-500">
              Adopted by <span className="text-gray-300">75+ dental and
              orthodontic clinics</span>, partnered with{" "}
              <span className="text-gray-300">Greyfinch</span> and{" "}
              <span className="text-gray-300">Truveta</span>, and backed by{" "}
              <span className="text-gray-300">
                Joshua Browder, SV Angel, and Pareto Holdings.
              </span>
            </p>
          </motion.div>
        </section>

        {/* ===== Forwardable Summary ===== */}
        <section id="summary" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-16 md:px-10 md:pt-24">
          <motion.div {...reveal}>
            <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-600/[0.12] via-white/[0.02] to-transparent p-7 md:p-10">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
              <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
                <div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                      In Short
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-gray-300">
                    {FORWARDABLE_SUMMARY}
                  </p>
                </div>
                <figure className="shrink-0">
                  <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-purple-900/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/founders.jpg"
                      alt="Ram Dosibhatla and Anish Suvarna, founders of Opera AI"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-xs text-gray-400">
                    Ram Dosibhatla &amp; Anish Suvarna — Founders, Opera AI
                  </figcaption>
                </figure>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== The Problem ===== */}
        <section id="problem" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 md:px-10 md:pt-32">
          <motion.div {...reveal}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              The gap is not diagnosis.{" "}
              <span className="text-purple-300">
                It is patient understanding.
              </span>
            </h2>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-gray-400">
              Every day, patients leave appointments uncertain about what comes
              next. They forget what their provider explained, struggle to
              communicate it to the family members who help them decide, or turn
              to generic internet searches and AI tools that know nothing about
              their actual diagnosis. The result is delayed care, lower treatment
              acceptance, poorer outcomes, and significant lost revenue. Opera
              closes that gap.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {[
              "Patients forget most of what's explained in the room the moment they walk out.",
              "They can't relay the plan to the spouse or family member who helps them decide.",
              "So they turn to generic search and AI that know nothing about their real diagnosis.",
              "The result: delayed care, lower acceptance, worse outcomes, and lost revenue.",
            ].map((t, i) => (
              <Card key={i} className="flex gap-4">
                <span className="mt-0.5 font-mono text-sm text-purple-400">
                  0{i + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-gray-200">{t}</p>
              </Card>
            ))}
          </motion.div>
        </section>

        {/* ===== What We Do Today ===== */}
        <section id="product" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 md:px-10 md:pt-32">
          <motion.div {...reveal}>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              A hyper-personalized patient video, generated in{" "}
              <span className="text-purple-300">seconds</span>
            </h2>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-gray-400">
              Opera reads a patient&apos;s actual clinical context — diagnoses,
              imaging, treatment recommendations, and physician notes — and
              automatically generates a video explanation tailored to them, in
              seconds. Instead of leaving with a folder and a vague memory, the
              patient leaves with something they can revisit at home, share with
              family, and understand with confidence. No new hardware. No
              workflow changes.
            </p>
          </motion.div>

          <motion.div {...reveal} className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: HeartHandshake,
                title: "Before the visit",
                body: "Warm, personalized videos that cut anxiety and set expectations before they arrive.",
              },
              {
                icon: Video,
                title: "After the consult",
                body: "A tailored explanation of the diagnosis and plan — the moment that turns yes into treatment.",
              },
              {
                icon: Activity,
                title: "Follow-up & recovery",
                body: "Reactivation videos that pull back previously unscheduled treatment.",
              },
            ].map((u, i) => (
              <Card key={i}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                  <u.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {u.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {u.body}
                </p>
              </Card>
            ))}
          </motion.div>

          <motion.div
            {...reveal}
            className="mt-4 rounded-2xl border border-purple-500/25 bg-purple-500/[0.06] p-6"
          >
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-purple-300">
              Why it drives revenue
            </p>
            <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-gray-200">
              A patient who understands their plan is a patient who moves forward.
              Better understanding means faster decisions, higher treatment
              adherence, and improved outcomes — which is exactly how Opera has
              recovered $2.5M+ in previously unscheduled treatment, without adding
              a single hour of administrative burden.
            </p>
          </motion.div>
        </section>

        {/* ===== Product Flow ===== */}
        <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 md:px-10 md:pt-32">
          <motion.div {...reveal}>
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              From consult to confident decision
            </h2>
          </motion.div>

          <motion.div {...reveal} className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              {
                n: "1",
                t: "The visit happens as it always does",
                b: "No new hardware, no workflow changes, no extra staff.",
              },
              {
                n: "2",
                t: "Opera reads the clinical context",
                b: "Diagnoses, imaging, treatment recommendations, and physician notes.",
              },
              {
                n: "3",
                t: "A personalized video is generated in seconds",
                b: "Tailored to the patient's actual diagnosis and plan.",
              },
              {
                n: "4",
                t: "The patient understands and moves forward",
                b: "Revisits at home, shares with family, and says yes with confidence.",
              },
            ].map((s, i) => (
              <div key={i} className="relative">
                <Card className="h-full">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/40 bg-purple-500/10 text-sm font-semibold text-purple-200">
                    {s.n}
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-white">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {s.b}
                  </p>
                </Card>
                {i < 3 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-purple-500/60 md:block" />
                )}
              </div>
            ))}
          </motion.div>
        </section>

        {/* ===== Demo ===== */}
        <section
          id="demo"
          className="mx-auto max-w-6xl scroll-mt-10 px-6 pt-24 md:px-10 md:pt-32"
        >
          <motion.div {...reveal} className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <SectionLabel>The Demo</SectionLabel>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                See what the patient sees
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-gray-400">
                This is a real Opera video. It takes a patient named
                Jessica&apos;s veneers plan and turns it into a short, narrated
                explanation built entirely from her own clinical context —
                walking her from diagnosis to a confident yes. Multiply this by
                130,000 patients, and you have Opera. This is where it&apos;s
                most powerful: the moment between diagnosis and decision.
              </p>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-900/40">
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                controls={videoStarted}
                playsInline
                preload="metadata"
                onPlay={() => setVideoStarted(true)}
                className="absolute inset-0 h-full w-full bg-[#0a0a0f] object-contain"
              />

              {/* cinematic purple thumbnail overlay */}
              {!videoStarted && (
                <button
                  onClick={playVideo}
                  aria-label="Play demo video"
                  className="group absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden"
                >
                  {/* layered purple gradient backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0f0820] to-black" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(168,85,247,0.45),transparent_60%)]" />
                  <div className="absolute -bottom-16 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-fuchsia-600/30 blur-3xl" />
                  {/* subtle grid sheen */}
                  <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:36px_36px]" />

                  <div className="relative flex flex-col items-center">
                    {/* glowing play button */}
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <span className="absolute inset-0 animate-ping rounded-full bg-purple-500/30" />
                      <span className="absolute -inset-3 rounded-full bg-purple-500/20 blur-xl" />
                      <Play className="relative ml-1 h-8 w-8 fill-white text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
                    </span>
                    <p className="mt-6 text-base font-medium text-white drop-shadow">
                      Jessica&apos;s Veneers Plan
                    </p>
                    <p className="mt-1 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-purple-300">
                      <Sparkles className="h-3.5 w-3.5" /> Personalized patient video
                    </p>
                  </div>

                  {/* player chrome dots */}
                  <div className="absolute left-4 top-4 flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  </div>
                </button>
              )}
            </div>
          </motion.div>
        </section>

        {/* ===== Long Term Vision ===== */}
        <section id="vision" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 md:px-10 md:pt-32">
          <motion.div {...reveal}>
            <SectionLabel>Where This Goes</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              From a wedge to the{" "}
              <span className="text-purple-300">
                patient engagement layer across healthcare
              </span>
            </h2>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-gray-400">
              Dental and orthodontics is the wedge. The vision is a future where
              every patient — in any specialty — receives education generated
              directly from their own clinical data. Opera is already expanding
              from dental into primary care, specialty medicine, ophthalmology,
              and hospital systems, and its partnership with Truveta positions it
              to become the trusted patient engagement layer across all of
              healthcare.
            </p>
          </motion.div>

          <motion.div {...reveal} className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Database,
                title: "Truveta partnership",
                body: "Partnered with Truveta — the $1B+ healthcare data company backed by many of the nation's leading health systems — working toward education generated directly from clinical data.",
              },
              {
                icon: Layers,
                title: "Greyfinch & DSO groups",
                body: "Embedded with Greyfinch across its orthodontic network and multi-location DSO dental groups.",
              },
              {
                icon: Stethoscope,
                title: "Expanding specialties",
                body: "Extending from dental into primary care, specialty medicine, ophthalmology, and hospital systems.",
              },
              {
                icon: HeartHandshake,
                title: "The engagement layer",
                body: "Becoming the trusted patient engagement layer that sits between every patient and their care.",
              },
            ].map((c, i) => (
              <Card key={i}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {c.body}
                </p>
              </Card>
            ))}
          </motion.div>

          {/* Now vs Future */}
          <motion.div {...reveal} className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Now
              </p>
              <p className="mt-3 text-lg font-medium text-white">
                Hyper-personalized patient education that lifts treatment
                acceptance in dental &amp; ortho
              </p>
            </div>
            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/15 to-transparent p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                Future
              </p>
              <p className="mt-3 text-lg font-medium text-white">
                The trusted patient engagement layer across all of healthcare
              </p>
            </div>
          </motion.div>
        </section>

        {/* ===== Traction ===== */}
        <section id="traction" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 md:px-10 md:pt-32">
          <motion.div {...reveal}>
            <SectionLabel>Traction</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Six months. Real revenue.
            </h2>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-gray-400">
              In the last six months, Opera has delivered 130,000+ personalized
              patient videos and recovered $2.5M+ in previously unscheduled
              treatment for clinics across the U.S. — with zero additional staff
              and zero workflow changes. It&apos;s live in 75+ dental and
              orthodontic clinics and partnered with Greyfinch and Truveta.
            </p>
          </motion.div>

          <motion.div {...reveal} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: "130,000+", label: "personalized patient videos delivered" },
              { stat: "$2.5M+", label: "in previously unscheduled treatment recovered" },
              { stat: "75+", label: "dental & orthodontic clinics, plus a Greyfinch partnership" },
              { stat: "$1B+", label: "Truveta partnership — the health-data company behind leading U.S. health systems" },
            ].map((s, i) => (
              <Card key={i}>
                <div className="bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-3xl font-semibold text-transparent">
                  {s.stat}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {s.label}
                </p>
              </Card>
            ))}
          </motion.div>
        </section>

        {/* ===== Team ===== */}
        <section id="team" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 md:px-10 md:pt-32">
          <motion.div {...reveal}>
            <SectionLabel>The Team</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Built by operators and technical founders
            </h2>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-gray-400">
              Opera is built by two best friends of 10+ years — Ram Dosibhatla
              (Stanford CS) and Anish Suvarna (UC Berkeley M.E.T.) — at the
              intersection of clinical operations, enterprise software, and
              applied AI.
            </p>
          </motion.div>

          <motion.div {...reveal} className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                name: "Ram Dosibhatla",
                role: "CEO · Stanford CS",
                bio: "Has built and deployed clinical technology in international settings — including a retinal scanner now running across 30 clinics he helped set up in India. Sourced and evaluated deals at Florida Funders, and is part of ASES at Stanford. Studies Computer Science at Stanford.",
                photo: "/team/ram.jpg",
              },
              {
                name: "Anish Suvarna",
                role: "CTO · UC Berkeley M.E.T. (EECS + Business)",
                bio: "4+ years in AI research with 7 peer-reviewed papers in venues including Nature and BioData Mining. Has built medical tools end to end now in use at Dartmouth and Harvard, and previously worked at Blue Origin and PwC. Studies at UC Berkeley M.E.T. — EECS and Business.",
                photo: "/team/anish.jpg",
              },
            ].map((p, i) => (
              <Card key={i} className="flex flex-col">
                <div className="relative h-28 w-28 shrink-0">
                  {/* initials fallback shows until the photo loads (or if it's missing) */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-fuchsia-500/20 text-2xl font-semibold text-purple-100">
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="absolute inset-0 h-full w-full rounded-2xl object-cover ring-1 ring-white/10"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-purple-300">
                    {p.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {p.bio}
                  </p>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* personal connection callout */}
          <motion.div
            {...reveal}
            className="mt-4 flex items-start gap-4 rounded-2xl border border-purple-500/25 bg-purple-500/[0.06] p-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
              <Plane className="h-5 w-5" />
            </div>
            <p className="text-[15px] leading-relaxed text-gray-200">
              We build a real, personal relationship with everyone we work with.
              We love to fly out and meet our clinics, partners, and investors in
              person — sitting in the practice, understanding the workflow, and
              making sure Opera actually fits the people using it.
            </p>
          </motion.div>
        </section>

        {/* ===== Final CTA ===== */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 pb-28 md:px-10 md:pt-32">
          <motion.div
            {...reveal}
            className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 via-white/[0.02] to-transparent p-10 text-center md:p-16"
          >
            <div className="absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-purple-600/25 blur-3xl" />
            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300">
                <Brain className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
                Want to learn more?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-400">
                Whether you are an investor, clinic operator, PMS partner, or
                enterprise buyer, we would love to connect.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-all hover:bg-purple-500"
                >
                  <Calendar className="h-4 w-4" /> Book a Short Call
                </a>
                <a
                  href={WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-gray-100 transition-all hover:border-purple-500/50"
                >
                  <Globe className="h-4 w-4" /> Visit Website
                </a>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                <a
                  href="mailto:anish@getopera.ai"
                  className="text-purple-300 transition-colors hover:text-purple-200"
                >
                  anish@getopera.ai
                </a>
                <span className="mx-2 text-gray-600">·</span>
                <a
                  href="mailto:ram@getopera.ai"
                  className="text-purple-300 transition-colors hover:text-purple-200"
                >
                  ram@getopera.ai
                </a>
              </p>
            </div>
          </motion.div>

          <p className="mt-10 text-center text-xs text-gray-600">
            Opera AI · The patient education layer for modern healthcare
          </p>
        </section>
      </div>
    </div>
  );
}
