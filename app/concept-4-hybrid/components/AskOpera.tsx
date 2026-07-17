"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ASK_OPERA_QA } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Cited visual module for each exchange.
const MODULE_CLIPS: Record<string, { src: string; label: string }> = {
  "crowding-progression": { src: "/videos/bracesproblem.mp4", label: "Crowding — 6-month progression" },
  "what-to-expect": { src: "/videos/rootcanal-treatment.mp4", label: "What to expect in the chair" },
  "fracture-progression": { src: "/videos/crownproblem.mp4", label: "Fracture — progression risk" },
  "recovery-timeline": { src: "/videos/implant-step2-abutment.mp4", label: "Recovery — first 3 months" },
  "options-comparison": { src: "/videos/bridgeunit.mp4", label: "Your options, compared" },
};

const TYPE_STEP = 3; // chars per tick
const TYPE_MS = 22;

export default function AskOpera() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const qa = ASK_OPERA_QA[idx];
  const done = typed.length >= qa.a.length;
  const mod = MODULE_CLIPS[qa.module] ?? MODULE_CLIPS["crowding-progression"];

  // Type the answer out.
  useEffect(() => {
    setTyped("");
    let i = 0;
    const t = setInterval(() => {
      i += TYPE_STEP;
      setTyped(qa.a.slice(0, i));
      if (i >= qa.a.length) clearInterval(t);
    }, TYPE_MS);
    return () => clearInterval(t);
  }, [idx, qa.a]);

  // Idle auto-cycle; any click resets the timer by changing idx.
  useEffect(() => {
    const t = setTimeout(
      () => setIdx((i) => (i + 1) % ASK_OPERA_QA.length),
      11000
    );
    return () => clearTimeout(t);
  }, [idx]);

  const typeDuration = (qa.a.length / TYPE_STEP) * (TYPE_MS / 1000);

  return (
    <section className="mx-auto max-w-[1480px] px-6 pt-32 md:px-12 md:pt-44">
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
          02 / Ask Opera
        </span>
        <span className="h-px flex-1 bg-[#e4e1d6]" />
      </div>
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-[640px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#14161a] [font-family:var(--c4-font-display)]">
          Every patient leaves with questions. Opera answers them —{" "}
          <em className="italic text-[#5b4fe8] [font-family:var(--c4-font-serif)]">
            visually
          </em>
          .
        </h2>
        <p className="max-w-[300px] text-[13px] font-light leading-relaxed text-[#5c5952]">
          Not a chatbot. Every answer is grounded in the patient&apos;s own
          treatment plan and cites the visual their doctor would reach for.
        </p>
      </div>

      {/* The dark instrument — the theater returns as a contained object */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="overflow-hidden rounded-[1.6rem] border border-[#14161a]/10 bg-[#0a0b0e] shadow-[0_40px_100px_-40px_rgba(20,22,26,0.55)]"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-[#5b4fe8] text-[11px] font-semibold text-white [font-family:var(--c4-font-display)]">
              O
            </span>
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 [font-family:var(--c4-font-mono)]">
              Ask Opera · Maya R. · Invisalign — comprehensive
            </span>
          </div>
          <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/30 sm:block [font-family:var(--c4-font-mono)]">
            plan-grounded · Dr. Chen
          </span>
        </div>

        <div className="grid md:grid-cols-[minmax(280px,1fr)_1.5fr]">
          {/* Question tickets */}
          <div className="border-b border-white/[0.06] p-4 md:border-b-0 md:border-r md:p-6">
            <p className="mb-4 px-2 text-[9px] uppercase tracking-[0.24em] text-white/35 [font-family:var(--c4-font-mono)]">
              What patients actually ask
            </p>
            <div className="space-y-1">
              {ASK_OPERA_QA.map((item, i) => (
                <button
                  key={item.q}
                  onClick={() => setIdx(i)}
                  className={`group relative grid w-full grid-cols-[34px_1fr] items-baseline gap-2 rounded-lg px-3 py-3 text-left transition-colors duration-300 ${
                    i === idx ? "bg-white/[0.05]" : "hover:bg-white/[0.025]"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-2 bottom-2 w-[2px] rounded-full transition-all duration-300 ${
                      i === idx ? "bg-[#5b4fe8]" : "bg-transparent"
                    }`}
                  />
                  <span
                    className={`text-[9px] tracking-[0.14em] transition-colors duration-300 [font-family:var(--c4-font-mono)] ${
                      i === idx ? "text-[#8d83f2]" : "text-white/25"
                    }`}
                  >
                    Q-0{i + 1}
                  </span>
                  <span
                    className={`text-[14px] leading-snug tracking-[-0.01em] transition-colors duration-300 [font-family:var(--c4-font-display)] ${
                      i === idx
                        ? "text-[#f2efe8]"
                        : "text-white/45 group-hover:text-white/70"
                    }`}
                  >
                    {item.q}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Answer surface */}
          <div className="relative flex min-h-[380px] flex-col p-6 md:p-8">
            {/* sweep line while answering */}
            <motion.span
              key={`sweep-${idx}`}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: done ? 0 : 1 }}
              transition={{
                scaleX: { duration: typeDuration, ease: "linear" },
                opacity: { duration: 0.8, ease: "easeOut" },
              }}
              className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#5b4fe8] to-[#8d83f2]"
            />
            <div className="mb-5 flex items-center gap-2.5">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-[#5b4fe8] ${done ? "" : "c4-pulse"}`}
              />
              <span className="text-[9px] uppercase tracking-[0.24em] text-white/40 [font-family:var(--c4-font-mono)]">
                {done ? "Grounded in Maya's treatment plan" : "Answering…"}
              </span>
            </div>

            <p className="max-w-[560px] flex-1 text-[16px] font-light leading-[1.75] text-[#dcd8cd] md:text-[17px]">
              {typed}
              {!done && (
                <span className="c4-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-[#8d83f2]" />
              )}
            </p>

            {/* Cited visual module */}
            <AnimatePresence mode="wait">
              <motion.div
                key={qa.module}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                className="mt-8 flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 pr-5"
              >
                <div className="relative w-36 flex-none overflow-hidden rounded-lg md:w-44">
                  <ClipVideo
                    src={mod.src}
                    className="aspect-video w-full object-cover"
                  />
                  <span className="absolute bottom-1.5 right-1.5 rounded-[3px] bg-black/60 px-1 py-px text-[8px] tracking-[0.1em] text-white/80 [font-family:var(--c4-font-mono)]">
                    0:42
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#8d83f2] [font-family:var(--c4-font-mono)]">
                    Cited visual · {qa.module}
                  </p>
                  <p className="mt-1.5 truncate text-[14px] font-medium tracking-[-0.01em] text-[#f2efe8] [font-family:var(--c4-font-display)]">
                    {mod.label}
                  </p>
                  <p className="mt-1 text-[11px] text-white/40">
                    From the visuals shown at Maya&apos;s consult
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
