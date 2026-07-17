"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHead from "./SectionHead";
import ClipVideo from "./ClipVideo";

const EASE = [0.22, 1, 0.36, 1];

type ConsolePatient = {
  id: string;
  initials: string;
  treatment: string;
  stage: string;
  signal: { glyph: string; label: string; cls: string };
  score: number;
  clip: string;
  clipLabel: string;
  phase: string;
  modules: string[];
  sent: string;
  question: string;
  questionAt: string;
  answer: string;
  answerModule: string;
};

const PATIENTS: ConsolePatient[] = [
  {
    id: "PT-4821",
    initials: "M.A.",
    treatment: "Invisalign — comprehensive",
    stage: "POST-CONSULT · DAY 2",
    signal: { glyph: "●", label: "HIGH", cls: "text-[#22d3ee]" },
    score: 87,
    clip: "/videos/invisalignseries.mp4",
    clipLabel: "Tray series — 22 stages",
    phase: "TIMELINE",
    modules: ["crowding-progression", "aligner-timeline"],
    sent: "SENT 14:22 · VIEWED 3×",
    question: "What happens if I wait 6 months?",
    questionAt: "21:04",
    answer:
      "Waiting typically means the rotation on #25 continues — treatment extends from 14 to roughly 18 months. Progression visual attached.",
    answerModule: "crowding-progression",
  },
  {
    id: "PT-3390",
    initials: "R.K.",
    treatment: "Implant — #19",
    stage: "TREATMENT PRESENTED",
    signal: { glyph: "◐", label: "BUILDING", cls: "text-amber-300/90" },
    score: 74,
    clip: "/videos/implant-step1-placement.mp4",
    clipLabel: "Implant placement",
    phase: "TREATMENT",
    modules: ["implant-placement", "sedation-options"],
    sent: "SENT 09:10 · VIEWED 2×",
    question: "Will this hurt?",
    questionAt: "19:37",
    answer:
      "You'll be numb throughout — most patients feel pressure, not pain. Soreness peaks the first evening and fades within 48 hours.",
    answerModule: "what-to-expect",
  },
  {
    id: "PT-5177",
    initials: "J.T.",
    treatment: "Crown — #30",
    stage: "POST-CONSULT · DAY 6",
    signal: { glyph: "○", label: "STALLED", cls: "text-white/40" },
    score: 41,
    clip: "/videos/crownproblem.mp4",
    clipLabel: "Fractured molar",
    phase: "PROBLEM",
    modules: ["fracture-progression"],
    sent: "SENT DAY 1 · RE-ENGAGED DAY 6",
    question: "Why do I need this now?",
    questionAt: "12:51",
    answer:
      "Your scan shows the crack reaching the dentin layer. Cracks like this deepen toward the nerve — a crown now avoids a root canal later.",
    answerModule: "fracture-progression",
  },
];

/** dimmed, non-interactive rows to make the day feel full */
const GHOST_PATIENTS = [
  { id: "PT-6034", treatment: "Perio — scaling + laser", glyph: "●", cls: "text-[#22d3ee]/50" },
  { id: "PT-8862", treatment: "Extraction + bridge", glyph: "▲", cls: "text-red-400/50" },
];

export default function PlatformPreview() {
  const [selected, setSelected] = useState(0);
  const p = PATIENTS[selected];

  return (
    <section id="platform" className="relative bg-[#050607] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHead
          index="05"
          label="The platform"
          title="A clinical console, not a dashboard."
          sub="Every consult becomes a visual plan, a live answer channel, and an intent signal — in one screen the practice actually opens."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.3, ease: EASE }}
          className="relative"
        >
          {/* monitor glow */}
          <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(34,211,238,0.06),transparent_70%)]" />

          {/* OR monitor frame */}
          <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#08090b] shadow-[0_60px_120px_rgba(0,0,0,0.7)]">
            {/* status bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0a0c0e] px-5 py-3 md:px-6">
              <span className="flex items-center gap-3 [font-family:var(--c1-mono)] text-[9.5px] tracking-[0.25em] text-white/60">
                <span className="c1-pulse h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                OPERA CONSOLE — LIFE ORTHODONTICS
              </span>
              <div className="hidden items-center gap-6 md:flex">
                {["PATIENTS", "MODULES", "SIGNALS"].map((t, i) => (
                  <span
                    key={t}
                    className={`[font-family:var(--c1-mono)] text-[9px] tracking-[0.25em] ${
                      i === 0
                        ? "border-b border-[#22d3ee] pb-0.5 text-[#a5f3fc]"
                        : "text-white/30"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="[font-family:var(--c1-mono)] text-[9.5px] tracking-[0.25em] text-white/40">
                08:42 · DR. CHEN · OP 3
              </span>
            </div>

            <div className="grid lg:grid-cols-12 lg:divide-x lg:divide-white/[0.07]">
              {/* left rail — today's consults */}
              <div className="border-b border-white/[0.07] lg:col-span-3 lg:border-b-0">
                <div className="px-5 pb-2 pt-5 [font-family:var(--c1-mono)] text-[8.5px] tracking-[0.3em] text-white/30">
                  TODAY · 5 CONSULTS
                </div>
                {PATIENTS.map((pt, i) => {
                  const isSel = i === selected;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setSelected(i)}
                      className={`relative flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors duration-300 ${
                        isSel ? "bg-white/[0.05]" : "hover:bg-white/[0.025]"
                      }`}
                    >
                      <span
                        className={`absolute bottom-0 left-0 top-0 w-[2px] ${
                          isSel ? "bg-[#22d3ee]" : "bg-transparent"
                        }`}
                      />
                      <span className="min-w-0">
                        <span
                          className={`block [font-family:var(--c1-mono)] text-[10.5px] tracking-[0.12em] ${
                            isSel ? "text-[#a5f3fc]" : "text-white/60"
                          }`}
                        >
                          {pt.id} · {pt.initials}
                        </span>
                        <span className="mt-1 block truncate text-[11.5px] font-light text-white/45">
                          {pt.treatment}
                        </span>
                      </span>
                      <span className={`[font-family:var(--c1-mono)] text-[11px] ${pt.signal.cls}`}>
                        {pt.signal.glyph}
                      </span>
                    </button>
                  );
                })}
                {GHOST_PATIENTS.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between gap-3 px-5 py-3.5 opacity-45"
                  >
                    <span className="min-w-0">
                      <span className="block [font-family:var(--c1-mono)] text-[10.5px] tracking-[0.12em] text-white/50">
                        {g.id}
                      </span>
                      <span className="mt-1 block truncate text-[11.5px] font-light text-white/40">
                        {g.treatment}
                      </span>
                    </span>
                    <span className={`[font-family:var(--c1-mono)] text-[11px] ${g.cls}`}>
                      {g.glyph}
                    </span>
                  </div>
                ))}
              </div>

              {/* center — consult summary */}
              <div className="border-b border-white/[0.07] lg:col-span-6 lg:border-b-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="flex h-full flex-col p-5 md:p-6"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <div className="text-[19px] font-medium tracking-[-0.01em] text-[#f2f0eb]">
                          {p.treatment}
                        </div>
                        <div className="mt-1.5 [font-family:var(--c1-mono)] text-[9px] tracking-[0.25em] text-white/35">
                          {p.id} · {p.stage}
                        </div>
                      </div>
                      <span
                        className={`flex items-center gap-1.5 [font-family:var(--c1-mono)] text-[9.5px] tracking-[0.18em] ${p.signal.cls}`}
                      >
                        {p.signal.glyph} {p.signal.label}
                      </span>
                    </div>

                    <div className="relative mt-5 aspect-video w-full overflow-hidden border border-white/10">
                      <ClipVideo
                        key={p.clip}
                        src={p.clip}
                        className="h-full w-full object-cover brightness-[0.92]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-3 [font-family:var(--c1-mono)] text-[9px] uppercase tracking-[0.2em] text-white/70">
                        {p.clipLabel}
                      </span>
                      <span className="absolute right-2.5 top-2.5 [font-family:var(--c1-mono)] text-[8px] tracking-[0.22em] text-[#67e8f9]/80">
                        {p.phase}
                      </span>
                    </div>

                    <div className="mt-5">
                      <span className="[font-family:var(--c1-mono)] text-[8.5px] tracking-[0.28em] text-white/30">
                        PLAN MODULES
                      </span>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {p.modules.map((m) => (
                          <span
                            key={m}
                            className="border border-white/12 px-3 py-1.5 [font-family:var(--c1-mono)] text-[9px] tracking-[0.12em] text-white/55"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/[0.07] pt-4">
                      <span className="[font-family:var(--c1-mono)] text-[8.5px] tracking-[0.2em] text-white/35">
                        {p.sent}
                      </span>
                      <span className="flex items-center gap-2.5">
                        <span className="[font-family:var(--c1-mono)] text-[8.5px] tracking-[0.2em] text-white/35">
                          ENGAGEMENT
                        </span>
                        <span className="h-[3px] w-20 overflow-hidden bg-white/10">
                          <span
                            className="block h-full bg-[#22d3ee] transition-all duration-700"
                            style={{ width: `${p.score}%` }}
                          />
                        </span>
                        <span className="[font-family:var(--c1-mono)] text-[10.5px] text-[#a5f3fc]">
                          {p.score}
                        </span>
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* right — Ask Opera panel */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, delay: 0.06, ease: EASE }}
                    className="flex h-full flex-col"
                  >
                    <div className="px-5 pb-2 pt-5 [font-family:var(--c1-mono)] text-[8.5px] tracking-[0.3em] text-white/30">
                      ASK OPERA · {p.id}
                    </div>

                    <div className="flex-1 space-y-5 px-5 py-3">
                      <div>
                        <div className="[font-family:var(--c1-mono)] text-[8px] tracking-[0.22em] text-white/30">
                          PATIENT · {p.questionAt}
                        </div>
                        <p className="mt-1.5 text-[12.5px] font-light leading-snug text-white/80">
                          &ldquo;{p.question}&rdquo;
                        </p>
                      </div>

                      <div className="border-l border-[#22d3ee]/50 pl-3.5">
                        <div className="[font-family:var(--c1-mono)] text-[8px] tracking-[0.22em] text-[#67e8f9]/70">
                          OPERA · GROUNDED IN PLAN
                        </div>
                        <p className="mt-1.5 text-[12px] font-light leading-relaxed text-white/55">
                          {p.answer}
                        </p>
                        <span className="mt-2.5 inline-block border border-[#67e8f9]/30 px-2.5 py-1 [font-family:var(--c1-mono)] text-[8px] tracking-[0.15em] text-[#a5f3fc]/80">
                          ▶ {p.answerModule}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-white/[0.07] px-5 py-4">
                      <div className="flex items-center gap-2 border border-white/12 px-3.5 py-2.5">
                        <span className="[font-family:var(--c1-mono)] text-[9.5px] tracking-[0.1em] text-white/30">
                          Ask about your plan
                        </span>
                        <span className="c1-caret h-3 w-[5px] bg-[#22d3ee]/80" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center [font-family:var(--c1-mono)] text-[9px] tracking-[0.3em] text-white/25">
            SELECT A PATIENT ON THE LEFT — THE CONSOLE FOLLOWS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
