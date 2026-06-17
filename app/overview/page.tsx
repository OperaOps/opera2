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
  MessageSquare,
  Search,
  Layers,
  Video,
  Brain,
  HeartHandshake,
  Plane,
} from "lucide-react";

const CALENDLY =
  "https://calendly.com/anishsuvarna-berkeley/30min?back=1&month=2026-06";
const VIDEO_SRC = "/videos/veneers-jessica.mp4";
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

const FORWARDABLE_SUMMARY = `Opera AI is building the digital COO for specialty dental and orthodontic practices. Our core product today helps clinics close the gap between diagnosis and patient understanding by turning treatment notes, appointment context, and consult transcripts into short personalized patient videos. These videos help patients understand what was recommended, why it matters, and what to do next, which improves case acceptance and reduces unscheduled treatment. Over time, Opera becomes the intelligence layer on top of the practice stack through Opera Score, Ask Opera, and an opportunity engine that helps practices monitor performance across revenue, scheduling, retention, and referrals. Opera is currently working with 45 individual clinics, is collaborating with Greyfinch on orthodontic integrations as well as multi-location DSO dental groups, is advancing additional licensing and enterprise partnerships, and touches more than $420M in clinical revenue across enterprise relationships. The company is led by Anish Suvarna of UC Berkeley M.E.T. and Ram Dosibhatla of Stanford CS, and is backed by Joshua Browder, SV Angel, and Pareto Holdings.`;

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
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
              <Sparkles className="h-3.5 w-3.5" />
              The digital COO for specialty healthcare
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
              Opera AI is the digital COO for specialty{" "}
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
                dental and orthodontic practices.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-gray-400">
              Today, Opera helps clinics turn confusing treatment plans into
              personalized patient videos that improve case acceptance and
              reduce unscheduled treatment. Longer term, Opera is building the
              intelligence layer above the practice stack, with Opera Score, Ask
              Opera, and real time operational insights.
            </p>

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
              Working with{" "}
              <span className="text-gray-300">45 clinics</span>, collaborating
              with <span className="text-gray-300">Greyfinch</span> on ortho
              integrations and{" "}
              <span className="text-gray-300">
                multi-location DSO dental groups
              </span>
              , and backed by{" "}
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
              Specialty dental and orthodontic practices run on fragmented
              systems for scheduling, imaging, billing, treatment planning, and
              patient communication. But the bigger problem is not just
              operational fragmentation. It is the communication gap between what
              the doctor recommends and what the patient actually understands.
              Patients often do not reject treatment in the room. They leave
              uncertain, overwhelmed, or unable to explain the plan later. That
              shows up as lower case acceptance, delayed decisions, and large
              amounts of unscheduled treatment.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {[
              "Most clinics do not have a demand problem. They have a decision problem.",
              "Patients rarely say no. They more often leave and do not decide.",
              "Practices already have the context. They just are not turning it into patient clarity.",
              "Owners still lack a unified view of practice performance and next best actions.",
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
            <SectionLabel>What We Do Today</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Our core product today:{" "}
              <span className="text-purple-300">personalized patient videos</span>
            </h2>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-gray-400">
              Opera takes information the clinic already has, including
              appointment type, treatment notes, patient concerns, and consult
              transcripts, and turns it into a short personalized video that the
              patient can actually understand. Instead of leaving the office with
              a folder, a vague memory, or unanswered questions, the patient
              leaves with a clear explanation they can rewatch, share, and act
              on.
            </p>
          </motion.div>

          <motion.div {...reveal} className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: HeartHandshake,
                title: "Before the first consult",
                body: "Welcoming videos that reduce anxiety and set expectations.",
              },
              {
                icon: Video,
                title: "After a consult",
                body: "Personalized treatment explanation videos that improve case acceptance.",
              },
              {
                icon: Activity,
                title: "Reactivation & follow up",
                body: "Videos that help recover unscheduled treatment.",
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
              Why patients engage
            </p>
            <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-gray-200">
              Video is easier to absorb than paperwork, easier to revisit than a
              verbal explanation, and easier to share with a spouse or family
              member.
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
                t: "Patient books or completes consult",
                b: "The visit happens as it always does.",
              },
              {
                n: "2",
                t: "Opera ingests the context",
                b: "Appointment context, treatment notes, and transcript details.",
              },
              {
                n: "3",
                t: "Opera generates the video",
                b: "A short, personalized patient explanation.",
              },
              {
                n: "4",
                t: "Patient moves forward",
                b: "Better understanding, more trust, higher likelihood to say yes.",
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
                In the sample demo, Opera takes a complex treatment plan and
                turns it into a short, clear, narrated explanation a patient can
                actually understand. The example walks a patient named Jessica
                through a personalized veneers treatment plan. This is where
                Opera is most powerful, the moment between diagnosis and
                decision.
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
            <SectionLabel>Long Term Vision</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Long term, Opera becomes the{" "}
              <span className="text-purple-300">
                intelligence layer for the clinic
              </span>
            </h2>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-gray-400">
              Personalized patient video is one of Opera&apos;s main product
              offerings today, but the long term vision is much broader. Opera is
              building the system that sits on top of the clinic&apos;s existing
              tools and turns scattered data into a real time operational command
              center.
            </p>
          </motion.div>

          <motion.div {...reveal} className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Activity,
                title: "Opera Score",
                body: "A single measure of practice health built around revenue efficiency, treatment acceptance, patient retention, schedule utilization, and referral conversion.",
              },
              {
                icon: MessageSquare,
                title: "Ask Opera",
                body: "A natural language interface that lets owners and teams query their practice data in plain English.",
              },
              {
                icon: Search,
                title: "Opportunity Engine",
                body: "Automatically surfaces revenue leaks, missed follow ups, scheduling inefficiencies, and other operational opportunities.",
              },
              {
                icon: Layers,
                title: "Practice Intelligence Layer",
                body: "Connects the software practices already use and turns it into clear action.",
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
                Personalized patient conversion and communication
              </p>
            </div>
            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/15 to-transparent p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                Future
              </p>
              <p className="mt-3 text-lg font-medium text-white">
                Full operational intelligence platform for specialty practices
              </p>
            </div>
          </motion.div>
        </section>

        {/* ===== Traction ===== */}
        <section id="traction" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-24 md:px-10 md:pt-32">
          <motion.div {...reveal}>
            <SectionLabel>Traction</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Early traction and momentum
            </h2>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-gray-400">
              Opera is already working with 45 individual clinics and generating
              roughly $35K in monthly recurring revenue. Across enterprise
              relationships, the company touches more than $420M in clinical
              revenue.
            </p>
          </motion.div>

          <motion.div {...reveal} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: "45", label: "individual clinics" },
              { stat: "$35K", label: "monthly recurring revenue" },
              { stat: "$420M+", label: "clinical revenue touched across enterprise relationships" },
              { stat: "3", label: "backers: Joshua Browder, SV Angel, Pareto Holdings" },
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
              Opera is being built at the intersection of clinical operations,
              enterprise software, and applied AI.
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
            Opera AI · The digital COO for specialty dental and orthodontic
            practices
          </p>
        </section>
      </div>
    </div>
  );
}
