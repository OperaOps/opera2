"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { INTENT_ROWS, type IntentRow } from "@/lib/concepts/shared";
import SectionHead from "./SectionHead";

const EASE = [0.22, 1, 0.36, 1];

const SIGNAL: Record<
  IntentRow["intent_signal"],
  { glyph: string; label: string; cls: string }
> = {
  high: { glyph: "●", label: "HIGH", cls: "text-[#22d3ee]" },
  building: { glyph: "◐", label: "BUILDING", cls: "text-amber-300/90" },
  stalled: { glyph: "○", label: "STALLED", cls: "text-white/40" },
  "at-risk": { glyph: "▲", label: "AT-RISK", cls: "text-red-400/90" },
};

const SCHEMA: [string, string][] = [
  ["patient_id", "string"],
  ["treatment_type", "string"],
  ["primary_question", "string"],
  ["hesitation_reason", "string"],
  ["viewed_visual_modules", "string[]"],
  ["engagement_score", "int"],
  ["intent_signal", "enum"],
  ["likely_barrier", "string"],
  ["follow_up_outcome", "string"],
];

const GRID =
  "grid grid-cols-[86px_1.25fr_1.5fr_1.15fr_150px_112px_1.2fr] items-center gap-x-5";

export default function ConsultIntelligence() {
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSweep((s) => (s + 1) % INTENT_ROWS.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-[#050607] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHead
          index="04"
          label="Consult intelligence"
          title="The black box recorder for the consult."
          sub="Every question, hesitation, replay, and share becomes signal. Opera is building the proprietary dataset of how patients decide — and where cases are won or lost."
        />

        {/* schema strip — the data dictionary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="overflow-x-auto border-y border-white/10 py-3.5"
        >
          <div className="flex min-w-max items-center gap-6 px-1">
            <span className="[font-family:var(--c1-mono)] text-[9px] tracking-[0.3em] text-white/30">
              SCHEMA v3
            </span>
            {SCHEMA.map(([field, type]) => (
              <span
                key={field}
                className="flex items-baseline gap-1.5 [font-family:var(--c1-mono)] text-[10px]"
              >
                <span className="tracking-[0.06em] text-[#67e8f9]/85">{field}</span>
                <span className="tracking-[0.06em] text-white/30">{type}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* telemetry feed */}
        <div className="overflow-x-auto">
          <div className="min-w-[1020px]">
            <div
              className={`${GRID} border-b border-white/10 px-4 py-3 [font-family:var(--c1-mono)] text-[8.5px] uppercase tracking-[0.25em] text-white/30`}
            >
              <span>ID</span>
              <span>Treatment</span>
              <span>Primary question</span>
              <span>Hesitation</span>
              <span>Engagement</span>
              <span>Signal</span>
              <span>Outcome</span>
            </div>

            {INTENT_ROWS.map((row, i) => {
              const sig = SIGNAL[row.intent_signal];
              const isActive = i === sweep;
              return (
                <motion.div
                  key={row.patient_id}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: i * 0.07, ease: EASE }}
                  className={`${GRID} relative border-b border-white/[0.06] px-4 py-4 transition-colors duration-500 ${
                    isActive ? "bg-white/[0.035]" : ""
                  }`}
                >
                  <span
                    className={`absolute bottom-0 left-0 top-0 w-[2px] transition-colors duration-500 ${
                      isActive ? "bg-[#22d3ee]" : "bg-transparent"
                    }`}
                  />
                  <span
                    className={`[font-family:var(--c1-mono)] text-[10.5px] tracking-[0.1em] transition-colors duration-500 ${
                      isActive ? "text-[#a5f3fc]" : "text-white/50"
                    }`}
                  >
                    {row.patient_id}
                  </span>
                  <span className="text-[13px] font-light text-white/70">
                    {row.treatment_type}
                  </span>
                  <span className="text-[13px] font-light italic text-white/60">
                    &ldquo;{row.primary_question}&rdquo;
                  </span>
                  <span className="[font-family:var(--c1-mono)] text-[10px] tracking-[0.04em] text-white/40">
                    {row.hesitation_reason}
                  </span>
                  <span className="flex items-center gap-2.5">
                    <span className="h-[3px] w-16 overflow-hidden bg-white/10">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.engagement_score}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.07, ease: EASE }}
                        className={`block h-full ${
                          row.engagement_score >= 70
                            ? "bg-[#22d3ee]"
                            : row.engagement_score >= 40
                            ? "bg-amber-300/80"
                            : "bg-red-400/80"
                        }`}
                      />
                    </span>
                    <span className="[font-family:var(--c1-mono)] text-[10.5px] text-white/55">
                      {String(row.engagement_score).padStart(2, "0")}
                    </span>
                  </span>
                  <span
                    className={`flex items-center gap-1.5 [font-family:var(--c1-mono)] text-[9.5px] tracking-[0.15em] ${sig.cls}`}
                  >
                    <span>{sig.glyph}</span>
                    {sig.label}
                  </span>
                  <span className="[font-family:var(--c1-mono)] text-[10px] tracking-[0.04em] text-white/40">
                    {row.follow_up_outcome}
                  </span>
                </motion.div>
              );
            })}

            {/* live tail */}
            <div className="flex items-center gap-3 px-4 py-4">
              <span className="c1-pulse h-1 w-1 rounded-full bg-[#22d3ee]" />
              <span className="[font-family:var(--c1-mono)] text-[9px] tracking-[0.25em] text-white/30">
                STREAMING · NEXT RECORD IN QUEUE
              </span>
              <span className="c1-caret h-3 w-[6px] bg-[#22d3ee]/70" />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8"
        >
          {[
            ["25+", "CLINICS LIVE"],
            ["$420M+", "CLINICAL REVENUE ANALYZED"],
            ["40+", "TREATMENT VISUAL MODULES"],
            ["EVERY CONSULT", "BECOMES SIGNAL"],
          ].map(([big, small]) => (
            <div key={small} className="flex flex-col gap-1.5">
              <span className="[font-family:var(--c1-mono)] text-[19px] font-medium tracking-[0.05em] text-[#f2f0eb]">
                {big}
              </span>
              <span className="[font-family:var(--c1-mono)] text-[8.5px] tracking-[0.28em] text-white/35">
                {small}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
