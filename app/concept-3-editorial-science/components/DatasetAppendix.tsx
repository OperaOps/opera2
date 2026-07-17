"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INTENT_ROWS, type IntentRow } from "@/lib/concepts/shared";
import SectionHead from "./SectionHead";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function IntentGlyph({ signal }: { signal: IntentRow["intent_signal"] }) {
  switch (signal) {
    case "high":
      return (
        <svg width="9" height="9" viewBox="0 0 10 10" className="shrink-0">
          <circle cx="5" cy="5" r="4" fill="#c2410c" />
        </svg>
      );
    case "building":
      return (
        <svg width="9" height="9" viewBox="0 0 10 10" className="shrink-0">
          <circle cx="5" cy="5" r="3.6" fill="none" stroke="#c2410c" strokeWidth="0.9" />
          <path d="M5 1.4 A3.6 3.6 0 0 1 5 8.6 Z" fill="#c2410c" />
        </svg>
      );
    case "stalled":
      return (
        <svg width="9" height="9" viewBox="0 0 10 10" className="shrink-0">
          <circle cx="5" cy="5" r="3.6" fill="none" stroke="#8a8578" strokeWidth="0.9" />
        </svg>
      );
    case "at-risk":
      return (
        <svg width="9" height="9" viewBox="0 0 10 10" className="shrink-0">
          <path d="M1.8 1.8 L8.2 8.2 M8.2 1.8 L1.8 8.2" stroke="#c2410c" strokeWidth="1.2" />
        </svg>
      );
  }
}

const SPECIMEN_FIELDS: {
  key: string;
  value: (r: IntentRow) => React.ReactNode;
  annotation: string;
}[] = [
  {
    key: "hesitation_reason",
    value: (r) => r.hesitation_reason,
    annotation: "Why patients stall — captured, not guessed",
  },
  {
    key: "intent_signal",
    value: (r) => (
      <span className="inline-flex items-center gap-2">
        <IntentGlyph signal={r.intent_signal} />
        {r.intent_signal.toUpperCase()}
      </span>
    ),
    annotation: "Predictive of acceptance within 14 days",
  },
  {
    key: "viewed_visual_modules",
    value: (r) =>
      r.viewed_visual_modules.length ? (
        <span className="flex flex-wrap gap-1.5">
          {r.viewed_visual_modules.map((m) => (
            <span
              key={m}
              className="c3-mono border border-[#1a1a17]/25 px-1.5 py-0.5 text-[9px] tracking-[0.06em]"
            >
              {m}
            </span>
          ))}
        </span>
      ) : (
        <span className="text-[#8a8578]">— none opened</span>
      ),
    annotation: "Which visuals moved them",
  },
  {
    key: "likely_barrier",
    value: (r) => r.likely_barrier,
    annotation: "What the treatment coordinator should address",
  },
  {
    key: "follow_up_outcome",
    value: (r) => r.follow_up_outcome,
    annotation: "What happened next — the label the model learns from",
  },
];

export default function DatasetAppendix() {
  const [pinned, setPinned] = useState(0);
  const specimen = INTENT_ROWS[pinned];

  return (
    <section id="dataset" className="scroll-mt-14">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <SectionHead
          index="03"
          label="Appendix A — The consult intelligence dataset"
          note="Field study · 25+ clinics · $420M+ clinical revenue analyzed"
          title={
            <>
              A record of how patients
              <br />
              actually decide.
            </>
          }
        />

        <p className="c3-body mt-10 max-w-xl text-[15px] leading-relaxed text-[#1a1a17]/80">
          Every question a patient asks Opera is a signal: what they fear, where
          they hesitate, which visual finally made it make sense. Row by row,
          Opera is assembling the definitive dataset of patient
          decision-making.
        </p>

        {/* The table */}
        <div className="mt-14 overflow-x-auto">
          <div className="min-w-[860px]">
            <div className="c3-mono grid grid-cols-[92px_1.25fr_1.55fr_1.15fr_64px_96px] gap-x-5 border-b border-[#1a1a17]/40 pb-2.5 text-[9px] uppercase tracking-[0.18em] text-[#8a8578]">
              <span>patient_id</span>
              <span>treatment_type</span>
              <span>primary_question</span>
              <span>hesitation_reason</span>
              <span className="text-right">engmt</span>
              <span>intent_signal</span>
            </div>

            {INTENT_ROWS.map((row, i) => {
              const isPinned = i === pinned;
              return (
                <motion.button
                  key={row.patient_id}
                  type="button"
                  onClick={() => setPinned(i)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                  className={`relative grid w-full grid-cols-[92px_1.25fr_1.55fr_1.15fr_64px_96px] items-baseline gap-x-5 border-b border-[#1a1a17]/15 py-4 text-left transition-colors duration-300 ${
                    isPinned ? "bg-[#fdfcfa]" : "hover:bg-[#fdfcfa]/70"
                  }`}
                >
                  {isPinned && (
                    <span className="absolute bottom-0 left-0 top-0 w-[2px] bg-[#c2410c]" />
                  )}
                  <span className="c3-mono text-[11px] tracking-[0.08em] text-[#1a1a17]">
                    {row.patient_id}
                  </span>
                  <span className="c3-body text-[12px] text-[#1a1a17]/85">
                    {row.treatment_type}
                  </span>
                  <span className="c3-display text-[14px] italic leading-snug text-[#1a1a17]">
                    “{row.primary_question}”
                  </span>
                  <span className="c3-body text-[12px] text-[#8a8578]">
                    {row.hesitation_reason}
                  </span>
                  <span className="c3-mono text-right text-[11px] tabular-nums text-[#1a1a17]">
                    {row.engagement_score}
                  </span>
                  <span className="c3-mono flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[#1a1a17]">
                    <IntentGlyph signal={row.intent_signal} />
                    {row.intent_signal}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* The pinned specimen, annotated */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="c3-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#8a8578]">
              Specimen — pinned from the table.
              <br />
              Select any row to examine it.
            </p>
            <p className="c3-display mt-6 text-[clamp(1.4rem,2vw,1.8rem)] italic leading-snug">
              “{specimen.primary_question}”
            </p>
            <p className="c3-mono mt-4 text-[10px] uppercase tracking-[0.16em] text-[#c2410c]">
              {specimen.patient_id} · {specimen.consultation_stage}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.dl
              key={specimen.patient_id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="border border-[#1a1a17]/25 bg-[#fdfcfa] lg:col-span-9"
            >
              {SPECIMEN_FIELDS.map((f, i) => (
                <div
                  key={f.key}
                  className={`grid grid-cols-1 gap-x-8 gap-y-2 px-6 py-4 sm:grid-cols-[190px_1fr_1fr] ${
                    i > 0 ? "border-t border-[#1a1a17]/15" : ""
                  }`}
                >
                  <dt className="c3-mono text-[10px] tracking-[0.1em] text-[#c2410c]">
                    {f.key}
                  </dt>
                  <dd className="c3-body text-[13px] leading-relaxed text-[#1a1a17]">
                    {f.value(specimen)}
                  </dd>
                  <dd className="c3-mono flex items-start gap-2.5 text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#8a8578]">
                    <span className="mt-[5px] h-px w-5 shrink-0 bg-[#8a8578]/60" />
                    {f.annotation}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
