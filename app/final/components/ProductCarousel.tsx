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
  patientById,
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
      <div className="mt-6 min-h-0 flex-1 overflow-hidden rounded-2xl border border-[#1a1a17]/10 bg-[#ffffff] shadow-[0_30px_70px_-35px_rgba(26,26,23,0.35)]">
        <AskOperaPanel />
      </div>
    </div>
  );
}

/* ——— slide 3: Intent, the data made explicit ——— */

function IntentSlide() {
  const [sel, setSel] = useState("PT-4821");
  const [assigned, setAssigned] = useState<Record<string, boolean>>({});
  const p = patientById(sel);
  const first = p.name.split(" ")[0];

  const FIELDS = [
    { label: "Patient sentiment", value: p.sentiment },
    { label: "Watch behavior", value: p.behavior },
    { label: "Their question", value: p.question || "No questions yet" },
    { label: "Likely barrier", value: p.barrier },
  ];

  return (
    <div className="flex h-full flex-col p-8 md:p-14">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h3 className="cf-display text-[clamp(2rem,3.2vw,2.9rem)] font-light leading-[1.02] tracking-[-0.02em] text-[#1a1a17]">
          The data behind intent.
        </h3>
        <p className="cf-body max-w-md text-[16px] leading-relaxed text-[#1a1a17]/85 md:text-right">
          Pick a patient. This is what Opera reads for you.
        </p>
      </div>

      {/* patient picker */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        {PATIENTS.slice(0, 4).map((x) => {
          const active = x.id === sel;
          return (
            <button
              key={x.id}
              onClick={() => setSel(x.id)}
              className={`flex items-center gap-2.5 rounded-full border px-4 py-2 transition-all duration-300 ${
                active
                  ? "border-[#5f7a61]/60 bg-[#5f7a61]/[0.07]"
                  : "border-[#1a1a17]/10 bg-white hover:border-[#5f7a61]/40"
              }`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: SIGNAL_COLOR[x.signal] }}
              />
              <span className="text-[14.5px] font-medium text-[#1a1a17]">{x.name}</span>
              <span className="cf-mono text-[11px] uppercase tracking-[0.08em] text-[#5e6a60]">
                {x.specialty}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={sel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-5 grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.5fr_1fr]"
        >
          {/* what Opera extracts */}
          <div className="overflow-hidden rounded-2xl border border-[#1a1a17]/10 bg-white shadow-[0_30px_70px_-35px_rgba(26,26,23,0.35)]">
            <div className="cf-mono border-b border-[#1a1a17]/10 px-6 py-3 text-[12px] uppercase tracking-[0.16em] text-[#5e6a60]">
              What Opera reads from {first}&rsquo;s engagement
            </div>
            <div className="grid sm:grid-cols-2">
              {FIELDS.map((f, i) => (
                <div
                  key={f.label}
                  className={`px-6 py-5 ${i % 2 === 1 ? "sm:border-l sm:border-[#1a1a17]/[0.07]" : ""} ${
                    i > 1 ? "border-t border-[#1a1a17]/[0.07]" : ""
                  }`}
                >
                  <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#5f7a61]">
                    {f.label}
                  </p>
                  <p className="mt-2 text-[16.5px] font-medium leading-snug text-[#1a1a17]">
                    {f.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* the read out */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#1a1a17]/10 bg-white p-6 shadow-[0_30px_70px_-35px_rgba(26,26,23,0.35)]">
            <div>
              <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#5e6a60]">
                Engagement
              </p>
              <div className="mt-2 flex items-end gap-3">
                <span className="cf-display text-[44px] font-light leading-none text-[#1a1a17]">
                  {p.engagement}
                </span>
                <div className="mb-2 h-[5px] flex-1 rounded-full bg-[#1a1a17]/10">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${p.engagement}%`, background: SIGNAL_COLOR[p.signal] }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <SignalBadge signal={p.signal} />
              </div>
            </div>
            <div>
              <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#5e6a60]">
                One clear task
              </p>
              <p className="mt-1.5 text-[16px] font-medium leading-snug text-[#1a1a17]">
                {p.nextAction}
              </p>
              <button
                onClick={() => setAssigned((s) => ({ ...s, [p.id]: true }))}
                disabled={assigned[p.id]}
                className={`mt-4 w-full rounded-full py-2.5 text-[14px] font-medium transition-colors ${
                  assigned[p.id]
                    ? "bg-[#15803d]/10 text-[#15803d]"
                    : "bg-[#1a1a17] text-white hover:bg-[#5f7a61]"
                }`}
              >
                {assigned[p.id] ? "Assigned to the TC" : "Assign to TC"}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
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
        <div className="relative h-[640px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#f1f6f1] via-[#fbfdfb] to-[#e9f1ea] md:h-[660px]">
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
