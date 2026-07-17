"use client";

import { motion } from "framer-motion";
import { INTENT_ROWS, type IntentRow } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ——— Schema v3 data dictionary ——— */

const SCHEMA_FIELDS: { name: string; type: string }[] = [
  { name: "patient_id", type: "string" },
  { name: "treatment_type", type: "string" },
  { name: "primary_question", type: "string" },
  { name: "hesitation_reason", type: "string" },
  { name: "viewed_visual_modules", type: "string[]" },
  { name: "engagement_score", type: "int" },
  { name: "intent_signal", type: "enum" },
  { name: "likely_barrier", type: "string" },
  { name: "follow_up_outcome", type: "string" },
];

/* ——— Intent signal glyphs: ● high ◐ building ○ stalled ▲ at-risk ——— */

function SignalGlyph({ signal }: { signal: IntentRow["intent_signal"] }) {
  switch (signal) {
    case "high":
      return <span className="text-[11px] leading-none text-[#1a1a17]">●</span>;
    case "building":
      return <span className="text-[11px] leading-none text-[#1a1a17]">◐</span>;
    case "stalled":
      return <span className="text-[11px] leading-none text-[#8a8578]">○</span>;
    case "at-risk":
      return <span className="text-[11px] leading-none text-[#c2410c]">▲</span>;
  }
}

const ROW_GRID =
  "grid grid-cols-[68px_1.05fr_1.5fr_1fr_120px_96px_1.05fr] items-baseline gap-x-5";

export default function Dataset() {
  return (
    <section id="dataset" className="scroll-mt-14">
      <div className="mx-auto max-w-[1480px] px-6 py-24 md:px-10 md:py-32">
        {/* ——— Section head ——— */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-baseline justify-between border-b border-[#1a1a17]/25 pb-3"
        >
          <span className="cf-mono text-[10px] uppercase tracking-[0.24em] text-[#c2410c]">
            01 — Consult intelligence
          </span>
          <span className="cf-mono hidden text-[10px] uppercase tracking-[0.2em] text-[#8a8578] sm:inline">
            Field study · 25+ clinics · $420M+ clinical revenue analyzed
          </span>
        </motion.div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="cf-display max-w-2xl text-[clamp(2.2rem,4.6vw,3.9rem)] font-light leading-[1.0] tracking-[-0.025em]"
          >
            Every consult becomes <em className="italic text-[#c2410c]">intelligence</em>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
            className="cf-body max-w-md text-[14px] leading-relaxed text-[#1a1a17]/80"
          >
            What patients ask, where they hesitate, which visual finally made it
            make sense — captured row by row, not guessed. One record per
            consult, one label per outcome.
          </motion.p>
        </div>

        {/* ——— Schema v3 strip ——— */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="mt-14 border border-[#1a1a17]/25 bg-[#fdfcfa]"
        >
          <div className="flex items-baseline justify-between border-b border-[#1a1a17]/15 px-4 py-2">
            <span className="cf-mono text-[9px] uppercase tracking-[0.2em] text-[#c2410c]">
              Schema v3 — consult record
            </span>
            <span className="cf-mono hidden text-[9px] uppercase tracking-[0.16em] text-[#8a8578] md:inline">
              One row per consult · labeled by what happened next
            </span>
          </div>
          <div className="flex flex-wrap">
            {SCHEMA_FIELDS.map((f, i) => (
              <div
                key={f.name}
                className={`flex items-baseline gap-2 px-4 py-2.5 ${
                  i > 0 ? "border-l border-[#1a1a17]/10" : ""
                }`}
              >
                <span className="cf-mono text-[10px] tracking-[0.06em] text-[#1a1a17]">
                  {f.name}
                </span>
                <span className="cf-mono text-[9px] text-[#8a8578]">{f.type}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ——— The ledger — all 8 rows, done like a printed table ——— */}
        <div className="mt-10 overflow-x-auto">
          <div className="min-w-[1060px]">
            <div
              className={`${ROW_GRID} cf-mono border-b border-[#1a1a17]/40 pb-2.5 text-[9px] uppercase tracking-[0.18em] text-[#8a8578]`}
            >
              <span>ID</span>
              <span>Treatment</span>
              <span>Primary question</span>
              <span>Hesitation</span>
              <span>Engagement</span>
              <span>Signal</span>
              <span>Outcome</span>
            </div>

            {INTENT_ROWS.map((row, i) => (
              <motion.div
                key={row.patient_id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                className={`${ROW_GRID} border-b border-[#1a1a17]/15 py-5`}
              >
                <span className="cf-mono text-[11px] tracking-[0.08em] text-[#1a1a17]">
                  {row.patient_id}
                </span>
                <span className="cf-body text-[12px] text-[#1a1a17]/85">
                  {row.treatment_type}
                </span>
                <span className="cf-display text-[14px] italic leading-snug text-[#1a1a17]">
                  &ldquo;{row.primary_question}&rdquo;
                </span>
                <span className="cf-mono text-[10px] leading-relaxed tracking-[0.02em] text-[#8a8578]">
                  {row.hesitation_reason}
                </span>
                <span className="flex items-baseline gap-2.5">
                  <span className="cf-mono w-6 shrink-0 text-right text-[11px] tabular-nums text-[#1a1a17]">
                    {row.engagement_score}
                  </span>
                  <span className="relative top-[-3px] h-[2px] w-14 shrink-0 bg-[#1a1a17]/10">
                    <span
                      className={`absolute inset-y-0 left-0 ${
                        row.intent_signal === "at-risk" ? "bg-[#c2410c]" : "bg-[#1a1a17]/60"
                      }`}
                      style={{ width: `${row.engagement_score}%` }}
                    />
                  </span>
                </span>
                <span
                  className={`cf-mono flex items-baseline gap-2 text-[9px] uppercase tracking-[0.12em] ${
                    row.intent_signal === "at-risk" ? "text-[#c2410c]" : "text-[#1a1a17]"
                  }`}
                >
                  <SignalGlyph signal={row.intent_signal} />
                  {row.intent_signal}
                </span>
                <span className="cf-body text-[12px] text-[#1a1a17]/85">
                  {row.follow_up_outcome}
                </span>
              </motion.div>
            ))}

            {/* ledger footrule */}
            <div className="flex items-baseline justify-between pt-2.5">
              <span className="cf-mono text-[9px] uppercase tracking-[0.18em] text-[#8a8578]">
                Appendix A · 8 of 12,406 records shown
              </span>
              <span className="cf-mono text-[9px] uppercase tracking-[0.18em] text-[#8a8578]">
                ● high &nbsp; ◐ building &nbsp; ○ stalled &nbsp;{" "}
                <span className="text-[#c2410c]">▲ at-risk</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
