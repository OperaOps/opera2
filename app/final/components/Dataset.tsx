"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { INTENT_ROWS, type IntentRow } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Opera's read on each row, shown in the expansion panel. */
const READS: Record<string, string> = {
  "PT-4821":
    "High engagement and a cost shaped question, but no booking. Financing was never discussed at the consult, so Opera routed a payment conversation to the TC instead of another reminder.",
  "PT-3390":
    "The question is about pain, not price. Opera attached the sedation options visual and flagged the case for a gentler follow up. Anxiety barriers respond to seeing, not to persuading.",
  "PT-5177":
    "A stalled signal on an asymptomatic tooth. The patient feels no urgency, so Opera re-engaged with the fracture progression visual that shows why waiting has a cost.",
  "PT-6034":
    "Three modules watched and a same week acceptance. When a patient compares options on their own scan, the decision usually follows quickly. No intervention needed.",
  "PT-2856":
    "A parent deciding for a child, with the other parent absent from the consult. Opera made the plan shareable; the spouse watched that evening. That share is the strongest signal in this row.",
  "PT-7719":
    "An emergency visit with a scheduling barrier, not a clinical one. The recovery timeline visual answered the real question, and the next day slot closed the loop.",
  "PT-1204":
    "Cosmetic cases turn on outcome confidence. Ninety five engagement across shade match and smile design visuals preceded the deposit by a day.",
  "PT-8862":
    "Nothing opened in fourteen days. Silence is also a signal. Opera flagged the row for a personal call before the case quietly disappeared.",
};

const SIGNAL_GLYPH: Record<IntentRow["intent_signal"], { glyph: string; cls: string }> = {
  high: { glyph: "●", cls: "text-[#15803d]" },
  building: { glyph: "◐", cls: "text-[#7c3aed]" },
  stalled: { glyph: "○", cls: "text-[#b45309]" },
  "at-risk": { glyph: "▲", cls: "text-[#b91c1c]" },
};


const ROW_GRID =
  "grid grid-cols-[24px_64px_1fr_100px_120px] items-baseline gap-x-4 md:grid-cols-[24px_68px_1.05fr_1.5fr_120px_110px_1.05fr]";

const SHOWN_IDS = ["PT-4821", "PT-3390", "PT-5177", "PT-2856", "PT-8862"];

export default function Dataset() {
  const [open, setOpen] = useState<string | null>(null);
  const rows = INTENT_ROWS.filter((r) => SHOWN_IDS.includes(r.patient_id));

  return (
    <section id="dataset" className="scroll-mt-14 border-t border-[#1a1a17]/15 bg-[#f2f0e9]">
      <div className="mx-auto max-w-[1480px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="cf-display max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)] font-light leading-[1.04] tracking-[-0.025em]"
          >
            Every consult becomes a row. Here are eight of{" "}
            <em className="italic text-[#7c3aed]">12,406</em>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="cf-body max-w-sm text-[15px] leading-relaxed text-[#1a1a17]/75"
          >
            Open a row for Opera&rsquo;s read. From 25+ clinics and $420M+ of
            analyzed clinical revenue.
          </motion.p>
        </div>

        {/* ledger */}
        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[760px] md:min-w-[1060px]">
            <div
              className={`${ROW_GRID} cf-mono border-b border-[#1a1a17]/35 pb-2.5 text-[10.5px] uppercase tracking-[0.16em] text-[#8a8578]`}
            >
              <span />
              <span>ID</span>
              <span className="hidden md:block">Treatment</span>
              <span>Primary question</span>
              <span className="hidden md:block">Hesitation</span>
              <span>Engagement</span>
              <span>Signal</span>
            </div>

            {rows.map((row, i) => {
              const isOpen = open === row.patient_id;
              const sig = SIGNAL_GLYPH[row.intent_signal];
              return (
                <motion.div
                  key={row.patient_id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                  className="border-b border-[#1a1a17]/10"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : row.patient_id)}
                    aria-expanded={isOpen}
                    className={`${ROW_GRID} w-full py-4 text-left transition-colors duration-300 hover:bg-[#1a1a17]/[0.025] ${
                      isOpen ? "bg-[#1a1a17]/[0.025]" : ""
                    }`}
                  >
                    <ChevronDown
                      size={13}
                      className={`relative top-[2px] text-[#8a8578] transition-transform duration-400 ${
                        isOpen ? "rotate-180 text-[#7c3aed]" : ""
                      }`}
                    />
                    <span className="cf-mono text-[12px] tracking-[0.06em] text-[#1a1a17]">
                      {row.patient_id}
                    </span>
                    <span className="cf-body hidden text-[13px] text-[#1a1a17]/85 md:block">
                      {row.treatment_type}
                    </span>
                    <span className="cf-display text-[15px] italic leading-snug text-[#1a1a17]">
                      &ldquo;{row.primary_question}&rdquo;
                    </span>
                    <span className="cf-mono hidden text-[11px] leading-relaxed tracking-[0.02em] text-[#8a8578] md:block">
                      {row.hesitation_reason}
                    </span>
                    <span className="flex items-baseline gap-2">
                      <span className="cf-mono w-6 shrink-0 text-right text-[11px] tabular-nums text-[#1a1a17]">
                        {row.engagement_score}
                      </span>
                      <span className="relative top-[-3px] h-[2px] w-12 shrink-0 bg-[#1a1a17]/10">
                        <span
                          className={`absolute inset-y-0 left-0 ${
                            row.intent_signal === "at-risk" ? "bg-[#b91c1c]" : "bg-[#7c3aed]"
                          }`}
                          style={{ width: `${row.engagement_score}%` }}
                        />
                      </span>
                    </span>
                    <span className={`cf-mono flex items-baseline gap-1.5 text-[10px] uppercase tracking-[0.1em] ${sig.cls}`}>
                      <span className="text-[11px] leading-none">{sig.glyph}</span>
                      {row.intent_signal}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="relative mb-5 mt-1 rounded-lg border border-[#1a1a17]/10 bg-[#fdfcfa] p-5">
                          <button
                            onClick={() => setOpen(null)}
                            aria-label="Close"
                            className="absolute right-3 top-3 rounded-full p-1.5 text-[#8a8578] transition-colors hover:bg-[#1a1a17]/[0.05] hover:text-[#1a1a17]"
                          >
                            <X size={13} />
                          </button>
                          <div className="grid gap-5 pr-8 md:grid-cols-[1.4fr_1fr_1fr]">
                            <div>
                              <p className="cf-mono text-[10px] uppercase tracking-[0.18em] text-[#7c3aed]">
                                Opera&rsquo;s read
                              </p>
                              <p className="cf-body mt-2 text-[14px] leading-relaxed text-[#1a1a17]/80">
                                {READS[row.patient_id]}
                              </p>
                            </div>
                            <div>
                              <p className="cf-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8578]">
                                Context
                              </p>
                              <div className="cf-mono mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#1a1a17]/75">
                                <p>stage · {row.consultation_stage}</p>
                                <p>barrier · {row.likely_barrier}</p>
                                <p>
                                  modules ·{" "}
                                  {row.viewed_visual_modules.length > 0
                                    ? row.viewed_visual_modules.join(", ")
                                    : "none opened"}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="cf-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8578]">
                                What happened next
                              </p>
                              <p className="cf-display mt-2 text-[16px] italic leading-snug text-[#1a1a17]">
                                {row.follow_up_outcome}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            <div className="flex items-baseline justify-between pt-2.5">
              <span className="cf-mono text-[10.5px] uppercase tracking-[0.16em] text-[#8a8578]">
                5 of 12,406 records shown
              </span>
              <span className="cf-mono text-[10.5px] uppercase tracking-[0.16em] text-[#8a8578]">
                <span className="text-[#15803d]">●</span> high&ensp;
                <span className="text-[#7c3aed]">◐</span> building&ensp;
                <span className="text-[#b45309]">○</span> stalled&ensp;
                <span className="text-[#b91c1c]">▲</span> at risk
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
