"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Eye, FileText, MessageCircle, Share2 } from "lucide-react";
import { CLIPS, type Clip } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const seriesClip: Clip =
  CLIPS.find((c) => c.src === "/videos/invisalignseries.mp4") ?? CLIPS[0];

type Mode = "old" | "opera";

/* ---------------------------- old way ------------------------------ */

function OldWay() {
  return (
    <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      {/* dead PDF */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-full max-w-[380px] -rotate-2 rounded-lg border border-[#101418]/[0.08] bg-white p-7 shadow-[0_24px_60px_-28px_rgba(16,20,24,0.25)] saturate-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#101418]/50">
              <FileText size={15} />
              <span className="text-[11px] [font-family:var(--c2-font-mono)]">
                Treatment_Plan_FINAL_v2.pdf
              </span>
            </div>
            <span className="rounded bg-[#101418]/[0.06] px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-[#101418]/40 [font-family:var(--c2-font-mono)]">
              9 pages
            </span>
          </div>
          <div className="mt-6 space-y-2.5">
            {[92, 100, 96, 88, 100, 72].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-[#101418]/[0.08]"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="mt-6 space-y-2.5">
            {[100, 94, 60].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-[#101418]/[0.06]"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="mt-7 flex items-center justify-between border-t border-dashed border-[#101418]/10 pt-4">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
              CDT codes · fees · fine print
            </span>
          </div>
        </div>
        <span className="absolute -right-1 top-3 rounded-full bg-[#101418]/[0.07] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#101418]/45 [font-family:var(--c2-font-mono)]">
          attachment
        </span>
      </div>

      {/* dead timeline */}
      <div className="flex flex-col justify-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
          after the consult
        </p>
        <ul className="mt-6 space-y-0">
          {[
            { t: "Tue 4:12 PM", label: "PDF emailed to patient", dead: false },
            { t: "—", label: "Opened", dead: true },
            { t: "—", label: "Understood", dead: true },
            { t: "day 14", label: "Silence. Flagged for a TC call.", dead: true },
          ].map((row, i, arr) => (
            <li key={row.label} className="relative flex gap-4 pb-7 last:pb-0">
              {i < arr.length - 1 && (
                <span className="absolute left-[5px] top-4 h-full w-px border-l border-dashed border-[#101418]/15" />
              )}
              <span
                className={`relative mt-1 h-[11px] w-[11px] shrink-0 rounded-full ${
                  row.dead
                    ? "border border-dashed border-[#101418]/30 bg-transparent"
                    : "bg-[#101418]/30"
                }`}
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
                  {row.t}
                </p>
                <p
                  className={`text-[15px] ${
                    row.dead ? "text-[#101418]/40" : "text-[#101418]/70"
                  }`}
                >
                  {row.label}
                  {row.dead && i !== 3 && (
                    <span className="ml-2 text-[11px] italic text-[#101418]/30">
                      never
                    </span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[340px] text-[14px] leading-relaxed text-[#101418]/50">
          The case was accepted in the chair — and lost in the inbox.
        </p>
      </div>
    </div>
  );
}

/* --------------------------- with opera ---------------------------- */

const OPERA_EVENTS = [
  { t: "+2m", label: "Opened 2 minutes after the consult", icon: Eye },
  { t: "8:41 PM", label: "Watched the tray series 3× that evening", icon: Check },
  { t: "9:05 PM", label: "Shared with spouse", icon: Share2 },
  { t: "9:12 PM", label: "Asked: “What happens if I wait 6 months?”", icon: MessageCircle },
  { t: "day 2", label: "Booked the records visit", icon: Check },
];

function WithOpera() {
  return (
    <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      {/* living module */}
      <div className="relative flex items-center justify-center">
        <div className="w-full max-w-[440px]">
          <ClipVideo
            clip={seriesClip}
            showLabel
            className="aspect-video rounded-2xl shadow-[0_28px_70px_-28px_rgba(79,70,229,0.4)] ring-1 ring-[#4f46e5]/15"
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#4f46e5] [font-family:var(--c2-font-mono)]">
              <span className="c2-live-dot" />
              personalized for maya r.
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
              narrated · dr. chen
            </span>
          </div>
        </div>
      </div>

      {/* living timeline */}
      <div className="flex flex-col justify-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#4f46e5] [font-family:var(--c2-font-mono)]">
          after the consult
        </p>
        <ul className="mt-6 space-y-0">
          {OPERA_EVENTS.map((row, i) => (
            <li key={row.label} className="relative flex gap-4 pb-6 last:pb-0">
              {i < OPERA_EVENTS.length - 1 && (
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.28, ease: EASE }}
                  className="absolute left-[10px] top-5 h-full w-px origin-top bg-[#4f46e5]/25"
                />
              )}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.28, ease: EASE }}
                className={`relative mt-0.5 flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full ${
                  i === OPERA_EVENTS.length - 1
                    ? "bg-[#10b981] text-white"
                    : "bg-[#4f46e5]/10 text-[#4f46e5]"
                }`}
              >
                <row.icon size={11} />
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.28, ease: EASE }}
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
                  {row.t}
                </p>
                <p className="text-[15px] text-[#101418]/80">{row.label}</p>
              </motion.div>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[340px] text-[14px] leading-relaxed text-[#101418]/55">
          The same plan, alive — every interaction becomes signal for the
          practice.
        </p>
      </div>
    </div>
  );
}

/* ----------------------------- section ----------------------------- */

export default function WhySection() {
  const [mode, setMode] = useState<Mode>("old");
  const [touched, setTouched] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.45 });

  // one automatic morph to make the argument, then the visitor drives
  useEffect(() => {
    if (!inView || touched) return;
    const t = setTimeout(() => setMode("opera"), 2600);
    return () => clearTimeout(t);
  }, [inView, touched]);

  const pick = (m: Mode) => {
    setTouched(true);
    setMode(m);
  };

  return (
    <section id="why" className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
            01 — why visual
          </p>
          <h2 className="mt-4 max-w-[620px] text-[38px] font-medium leading-[1.05] tracking-[-0.02em] text-[#101418] sm:text-[52px] [font-family:var(--c2-font-display)]">
            The consult ends.
            <br />
            <span className="text-[#101418]/40">The deciding starts at home.</span>
          </h2>
        </div>
        <p className="max-w-[320px] pb-2 text-[15px] leading-relaxed text-[#101418]/55">
          What you send into that gap decides the case. A PDF goes quiet. A
          visual keeps explaining.
        </p>
      </div>

      {/* segmented toggle */}
      <div className="mt-14 flex justify-center">
        <div className="relative flex rounded-full bg-[#eceef0] p-1.5">
          {(
            [
              { key: "old" as Mode, label: "The old way" },
              { key: "opera" as Mode, label: "With Opera" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              onClick={() => pick(opt.key)}
              className={`relative rounded-full px-6 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                mode === opt.key ? "text-[#101418]" : "text-[#101418]/45 hover:text-[#101418]/70"
              }`}
            >
              {mode === opt.key && (
                <motion.span
                  layoutId="c2-seg"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-white shadow-[0_6px_20px_-6px_rgba(16,20,24,0.2)]"
                />
              )}
              <span className="relative">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* morphing stage */}
      <div
        ref={stageRef}
        className={`mt-10 overflow-hidden rounded-[28px] border transition-colors duration-700 ${
          mode === "opera"
            ? "border-[#4f46e5]/10 bg-white shadow-[0_40px_110px_-40px_rgba(79,70,229,0.3)]"
            : "border-[#101418]/[0.06] bg-[#f1f4f6]"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {mode === "old" ? <OldWay /> : <WithOpera />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
