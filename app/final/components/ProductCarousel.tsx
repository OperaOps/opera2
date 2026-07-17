"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { AutoVideo } from "./media";
import AskOperaPanel from "./product/AskOperaPanel";
import {
  PATIENTS,
  SIGNAL_COLOR,
  SIGNAL_LABEL,
  type Signal,
} from "./product/data";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ————————————————————————————————————————————————————————————————
   The product, one idea per page. A single card with arrows: videos,
   then Ask Opera, then Intent. No scroll tricks; the arrows do
   everything.
   ———————————————————————————————————————————————————————————————— */

function SignalBadge({ signal }: { signal: Signal }) {
  return (
    <span
      className="cf-mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] uppercase tracking-[0.12em]"
      style={{ color: SIGNAL_COLOR[signal], background: `${SIGNAL_COLOR[signal]}14` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: SIGNAL_COLOR[signal] }} />
      {SIGNAL_LABEL[signal]}
    </span>
  );
}

/* ——— slide 1: one video, one sentence ——— */

function VideoSlide() {
  return (
    <div className="grid h-full items-center gap-10 p-8 md:p-14 lg:grid-cols-[1fr_1.35fr]">
      <div>
        <h3 className="cf-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-[#1a1a17]">
          Personalized videos, at your fingertips.
        </h3>
        <p className="cf-body mt-6 max-w-md text-[17px] leading-relaxed text-[#1a1a17]/85">
          Every patient sees their own treatment, in their own plan&rsquo;s
          terms.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl shadow-[0_40px_90px_-35px_rgba(26,26,23,0.45)]">
        <AutoVideo
          src="/videos/library/colonoscope-tip-closeup.mp4"
          className="aspect-video w-full object-cover"
        />
      </div>
    </div>
  );
}

/* ——— slide 2: Ask Opera, live ——— */

function AskSlide() {
  return (
    <div className="flex h-full flex-col p-8 md:p-14">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h3 className="cf-display text-[clamp(2rem,3.2vw,2.9rem)] font-light leading-[1.02] tracking-[-0.02em] text-[#1a1a17]">
          Ask Opera.
        </h3>
        <p className="cf-body max-w-md text-[16px] leading-relaxed text-[#1a1a17]/85 md:text-right">
          Click a question. It answers live, from that patient&rsquo;s own plan.
        </p>
      </div>
      <div className="mt-6 min-h-0 flex-1 overflow-hidden rounded-2xl border border-[#1a1a17]/10 bg-[#fdfcfa] shadow-[0_30px_70px_-35px_rgba(26,26,23,0.35)]">
        <AskOperaPanel />
      </div>
    </div>
  );
}

/* ——— slide 3: Intent, one clear read ——— */

function IntentSlide() {
  const [assigned, setAssigned] = useState<Record<string, boolean>>({});
  const rows = PATIENTS.slice(0, 4);

  return (
    <div className="flex h-full flex-col p-8 md:p-14">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h3 className="cf-display text-[clamp(2rem,3.2vw,2.9rem)] font-light leading-[1.02] tracking-[-0.02em] text-[#1a1a17]">
          Intent, read for you.
        </h3>
        <p className="cf-body max-w-md text-[16px] leading-relaxed text-[#1a1a17]/85 md:text-right">
          Engagement becomes a signal. The signal becomes one clear task.
        </p>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-[#1a1a17]/10 bg-white shadow-[0_30px_70px_-35px_rgba(26,26,23,0.35)]">
        {rows.map((p, i) => (
          <div
            key={p.id}
            className={`flex flex-wrap items-center gap-x-5 gap-y-2 px-6 py-4 md:flex-nowrap ${
              i > 0 ? "border-t border-[#1a1a17]/[0.07]" : ""
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5f7a61]/10 text-[13px] font-semibold text-[#5f7a61]">
              {p.initials}
            </span>
            <span className="min-w-0 md:w-[30%]">
              <span className="block truncate text-[15.5px] font-medium text-[#1a1a17]">
                {p.name} · {p.treatment}
              </span>
              <span className="cf-mono block text-[11.5px] uppercase tracking-[0.1em] text-[#6d6858]">
                {p.specialty}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <span className="cf-mono w-7 text-right text-[13.5px] tabular-nums text-[#1a1a17]">
                {p.engagement}
              </span>
              <span className="h-[4px] w-20 rounded-full bg-[#1a1a17]/10">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${p.engagement}%`, background: SIGNAL_COLOR[p.signal] }}
                />
              </span>
            </span>
            <SignalBadge signal={p.signal} />
            <span className="hidden min-w-0 flex-1 truncate text-[14px] text-[#1a1a17]/85 lg:block">
              {p.nextAction}
            </span>
            <button
              onClick={() => setAssigned((s) => ({ ...s, [p.id]: true }))}
              disabled={assigned[p.id]}
              className={`ml-auto shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                assigned[p.id]
                  ? "bg-[#15803d]/10 text-[#15803d]"
                  : "bg-[#1a1a17] text-white hover:bg-[#5f7a61]"
              }`}
            >
              {assigned[p.id] ? (
                <span className="flex items-center gap-1.5">
                  <Check size={12} /> Assigned
                </span>
              ) : (
                "Assign to TC"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ——— the carousel ——— */

const SLIDES = [
  { key: "videos", node: <VideoSlide /> },
  { key: "ask", node: <AskSlide /> },
  { key: "intent", node: <IntentSlide /> },
];

export default function ProductCarousel() {
  const [[index, dir], setIndex] = useState<[number, number]>([0, 0]);
  const go = (d: number) =>
    setIndex(([i]) => [(i + d + SLIDES.length) % SLIDES.length, d]);

  return (
    <section id="product" className="scroll-mt-16 border-t border-[#1a1a17]/10 bg-white py-16 md:py-24">
      <div className="relative px-5 md:px-12">
        {/* the card */}
        <div className="relative h-[640px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#f5efe6] via-[#f4f2ee] to-[#e9f0f3] md:h-[660px]">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={SLIDES[index].key}
              custom={dir}
              initial={{ x: dir >= 0 ? 120 : -120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir >= 0 ? -120 : 120, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute inset-0"
            >
              {SLIDES[index].node}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* arrows */}
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="absolute left-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a1a17] text-white shadow-lg transition-colors hover:bg-[#5f7a61] md:left-4"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="absolute right-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a1a17] text-white shadow-lg transition-colors hover:bg-[#5f7a61] md:right-4"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* pager */}
      <div className="mt-8 flex justify-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.key}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(([cur]) => [i, i > cur ? 1 : -1])}
            className={`h-[5px] rounded-full transition-all duration-400 ${
              i === index ? "w-12 bg-[#1a1a17]" : "w-8 bg-[#1a1a17]/15 hover:bg-[#1a1a17]/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
