"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { INTENT_ROWS, SITE_PHOTOS } from "@/lib/concepts/shared";
import SignalBadge from "./SignalBadge";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SCHEMA_FIELDS = [
  "patient_id",
  "treatment_type",
  "consultation_stage",
  "primary_question",
  "hesitation_reason",
  "viewed_visual_modules[]",
  "engagement_score",
  "intent_signal",
  "likely_barrier",
  "follow_up_outcome",
];

function Field({
  label,
  children,
  note,
}: {
  label: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.22em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
        {label}
        {note && <sup className="ml-1 text-[#5b4fe8]">{note}</sup>}
      </p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export default function Intelligence() {
  const [open, setOpen] = useState<string>(INTENT_ROWS[0].patient_id);

  return (
    <section className="mx-auto max-w-[1480px] px-6 pt-32 md:px-12 md:pt-44">
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
          03 / Consult intelligence
        </span>
        <span className="h-px flex-1 bg-[#e4e1d6]" />
      </div>
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-[560px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#14161a] [font-family:var(--c4-font-display)]">
          Every consult becomes intelligence.
        </h2>
        <p className="max-w-[340px] text-[13px] font-light leading-relaxed text-[#5c5952]">
          Every question asked, module watched, and hesitation voiced is
          structured into the record — while the case is still warm.
        </p>
      </div>

      {/* The ledger */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="overflow-hidden rounded-2xl border border-[#e4e1d6] bg-white shadow-[0_24px_64px_-36px_rgba(20,22,26,0.25)]"
      >
        {/* header row */}
        <div className="grid grid-cols-[5rem_1fr_5.5rem_2rem] items-center gap-4 border-b border-[#eceadf] px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-[#a8a396] md:grid-cols-[5.5rem_1.1fr_1.5fr_6.5rem_9rem_2rem] [font-family:var(--c4-font-mono)]">
          <span>Patient</span>
          <span className="hidden md:block">Treatment</span>
          <span>Primary question</span>
          <span>Signal</span>
          <span className="hidden md:block">Engagement</span>
          <span />
        </div>

        {INTENT_ROWS.map((row, i) => {
          const isOpen = open === row.patient_id;
          return (
            <motion.div
              key={row.patient_id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className={i > 0 ? "border-t border-[#eceadf]" : ""}
            >
              <button
                onClick={() => setOpen(row.patient_id)}
                className={`grid w-full grid-cols-[5rem_1fr_5.5rem_2rem] items-center gap-4 px-5 py-4 text-left transition-colors duration-300 md:grid-cols-[5.5rem_1.1fr_1.5fr_6.5rem_9rem_2rem] ${
                  isOpen ? "bg-[#faf9f4]" : "hover:bg-[#fbfaf6]"
                }`}
              >
                <span className="text-[11px] tracking-[0.06em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
                  {row.patient_id}
                </span>
                <span className="hidden truncate text-[13px] font-medium tracking-[-0.01em] text-[#14161a] md:block [font-family:var(--c4-font-display)]">
                  {row.treatment_type}
                </span>
                <span className="truncate text-[13px] italic text-[#5c5952] [font-family:var(--c4-font-serif)]">
                  {row.primary_question === "(no questions asked)" ? (
                    <span className="not-italic text-[#a8a396] [font-family:var(--c4-font-mono)] text-[11px]">
                      — no questions asked
                    </span>
                  ) : (
                    <>&ldquo;{row.primary_question}&rdquo;</>
                  )}
                </span>
                <span>
                  <SignalBadge signal={row.intent_signal} />
                </span>
                <span className="hidden items-center gap-2.5 md:flex">
                  <span className="h-[3px] w-16 overflow-hidden rounded-full bg-[#ece9de]">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.engagement_score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.05, ease: EASE }}
                      className="block h-full rounded-full bg-[#5b4fe8]"
                    />
                  </span>
                  <span className="text-[10px] text-[#6b7280] [font-family:var(--c4-font-mono)]">
                    {row.engagement_score}
                  </span>
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`justify-self-end text-[#a8a396] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#5b4fe8]" : ""}`}
                />
              </button>

              {/* Annotated expansion */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden bg-[#faf9f4]"
                  >
                    <div className="border-t border-[#eceadf] px-5 py-6 md:px-8">
                      <div className="grid gap-6 md:grid-cols-3">
                        <Field label="Primary question" note="1">
                          <p className="text-[16px] italic leading-snug text-[#14161a] [font-family:var(--c4-font-serif)]">
                            {row.primary_question === "(no questions asked)"
                              ? "— silence. The most expensive signal of all."
                              : `“${row.primary_question}”`}
                          </p>
                        </Field>
                        <Field label="Hesitation" note="2">
                          <p className="text-[13px] text-[#14161a]">
                            {row.hesitation_reason}
                          </p>
                          <p className="mt-1 text-[11px] text-[#8a867b]">
                            stage: {row.consultation_stage}
                          </p>
                        </Field>
                        <Field label="Likely barrier" note="3">
                          <p className="text-[13px] text-[#14161a]">
                            {row.likely_barrier}
                          </p>
                        </Field>
                        <Field label="Modules viewed at home">
                          {row.viewed_visual_modules.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {row.viewed_visual_modules.map((m) => (
                                <span
                                  key={m}
                                  className="rounded-full border border-[#5b4fe8]/25 bg-[#5b4fe8]/[0.05] px-2.5 py-1 text-[10px] tracking-[0.04em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]"
                                >
                                  ▸ {m}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[11px] text-[#b4532a] [font-family:var(--c4-font-mono)]">
                              never opened materials
                            </p>
                          )}
                        </Field>
                        <Field label="Engagement">
                          <div className="flex items-center gap-3">
                            <span className="text-[22px] font-medium leading-none text-[#14161a] [font-family:var(--c4-font-mono)]">
                              {row.engagement_score}
                            </span>
                            <SignalBadge signal={row.intent_signal} />
                          </div>
                        </Field>
                        <Field label="Follow-up outcome">
                          <p className="flex items-center gap-2 text-[13px] font-medium text-[#14161a]">
                            <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[#5b4fe8]/10">
                              <Check size={9} strokeWidth={3} className="text-[#5b4fe8]" />
                            </span>
                            {row.follow_up_outcome}
                          </p>
                        </Field>
                      </div>
                      {/* Footnote annotations */}
                      <div className="mt-7 flex flex-col gap-1.5 border-t border-[#eceadf] pt-4 text-[10px] leading-relaxed text-[#8a867b] md:flex-row md:gap-8 [font-family:var(--c4-font-mono)]">
                        <span>
                          <sup className="text-[#5b4fe8]">1</sup> captured
                          verbatim from the patient&apos;s Ask Opera session
                        </span>
                        <span>
                          <sup className="text-[#5b4fe8]">2</sup> inferred from
                          viewing pattern — never asked directly
                        </span>
                        <span>
                          <sup className="text-[#5b4fe8]">3</sup> surfaced to
                          the TC before the case goes cold
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Schema ribbon — faint synapse texture behind the field names */}
      <div className="relative mt-8 overflow-hidden border-y border-[#e4e1d6] py-3">
        <img
          src={SITE_PHOTOS.neurons}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.06] grayscale contrast-125"
        />
        <div className="c4-ticker relative flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center text-[10px] tracking-[0.14em] text-[#a8a396] [font-family:var(--c4-font-mono)]"
            >
              {SCHEMA_FIELDS.map((f) => (
                <span key={f} className="flex items-center">
                  <span className="px-4">{f}</span>
                  <span className="text-[#5b4fe8]">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-[640px] text-center text-[clamp(1.2rem,2vw,1.6rem)] font-light leading-snug tracking-[-0.02em] text-[#14161a]">
        The dataset of how patients decide — question by question,{" "}
        <em className="italic text-[#5b4fe8] [font-family:var(--c4-font-serif)]">
          hesitation by hesitation
        </em>
        .
      </p>
    </section>
  );
}
