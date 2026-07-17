"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { INTENT_ROWS, type IntentRow } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SIGNAL: Record<
  IntentRow["intent_signal"],
  { color: string; soft: string; bars: number }
> = {
  high: { color: "#10b981", soft: "rgba(16,185,129,0.12)", bars: 4 },
  building: { color: "#6366f1", soft: "rgba(99,102,241,0.12)", bars: 3 },
  stalled: { color: "#f59e0b", soft: "rgba(245,158,11,0.14)", bars: 2 },
  "at-risk": { color: "#ef4444", soft: "rgba(239,68,68,0.12)", bars: 1 },
};

function SignalBadge({ signal }: { signal: IntentRow["intent_signal"] }) {
  const s = SIGNAL[signal];
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{ background: s.soft }}
    >
      <span className="flex items-end gap-[2.5px]">
        {[5, 8, 11, 14].map((h, i) => (
          <span
            key={h}
            className="w-[3px] rounded-sm"
            style={{
              height: h,
              background: i < s.bars ? s.color : "rgba(16,20,24,0.12)",
            }}
          />
        ))}
      </span>
      <span
        className="text-[10.5px] font-medium uppercase tracking-[0.12em] [font-family:var(--c2-font-mono)]"
        style={{ color: s.color }}
      >
        {signal}
      </span>
    </span>
  );
}

function Field({
  name,
  type,
  children,
}: {
  name: string;
  type: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] tracking-wide text-[#101418]/40 [font-family:var(--c2-font-mono)]">
        {name}
        <span className="ml-1.5 text-[#4f46e5]/60">{type}</span>
      </p>
      <div className="mt-1.5 text-[13.5px] leading-relaxed text-[#101418]/80">
        {children}
      </div>
    </div>
  );
}

function Inspector({ row }: { row: IntentRow }) {
  return (
    <div className="grid gap-x-10 gap-y-5 border-t border-dashed border-[#101418]/10 px-6 pb-6 pt-5 sm:grid-cols-2 lg:grid-cols-4">
      <Field name="hesitation_reason" type="string">
        {row.hesitation_reason}
      </Field>
      <Field name="likely_barrier" type="string">
        {row.likely_barrier}
      </Field>
      <Field name="viewed_visual_modules" type="string[]">
        {row.viewed_visual_modules.length === 0 ? (
          <span className="italic text-[#101418]/40">[] — never opened</span>
        ) : (
          <span className="flex flex-wrap gap-1.5">
            {row.viewed_visual_modules.map((m) => (
              <span
                key={m}
                className="rounded-md bg-[#4f46e5]/[0.07] px-2 py-0.5 text-[11px] text-[#4f46e5] [font-family:var(--c2-font-mono)]"
              >
                {m}
              </span>
            ))}
          </span>
        )}
      </Field>
      <Field name="follow_up_outcome" type="string">
        <span className="font-medium text-[#101418]">{row.follow_up_outcome}</span>
      </Field>
    </div>
  );
}

export default function IntentSection() {
  const [expanded, setExpanded] = useState(0);
  const [locked, setLocked] = useState(false);
  const ledgerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ledgerRef, { amount: 0.3 });

  // the ledger inspects itself, row by row, until the visitor takes over
  useEffect(() => {
    if (!inView || locked) return;
    const id = setInterval(
      () => setExpanded((e) => (e + 1) % INTENT_ROWS.length),
      3400
    );
    return () => clearInterval(id);
  }, [inView, locked]);

  return (
    <section
      id="intelligence"
      className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36"
    >
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
            03 — the consult intelligence layer
          </p>
          <h2 className="mt-4 text-[38px] font-medium leading-[1.05] tracking-[-0.02em] text-[#101418] sm:text-[52px] [font-family:var(--c2-font-display)]">
            Understanding,{" "}
            <span className="text-[#4f46e5]">structured.</span>
          </h2>
          <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-[#101418]/55">
            Every question asked, module watched, and hesitation left behind
            becomes structured signal — a proprietary dataset of how patients
            actually decide.
          </p>
        </div>

        {/* schema annotation */}
        <div className="rounded-2xl border border-[#101418]/[0.07] bg-white p-5 shadow-[0_18px_50px_-28px_rgba(16,20,24,0.2)]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
            schema
          </p>
          <pre className="mt-2.5 text-[11px] leading-[1.9] text-[#101418]/65 [font-family:var(--c2-font-mono)]">
            <span className="text-[#4f46e5]">intent_signal</span>
            {": "}&ldquo;high&rdquo; | &ldquo;building&rdquo; |{"\n"}
            {"  "}&ldquo;stalled&rdquo; | &ldquo;at-risk&rdquo;{"\n"}
            <span className="text-[#4f46e5]">engagement_score</span>
            {": int · 0–100"}
          </pre>
        </div>
      </div>

      {/* the ledger */}
      <div
        ref={ledgerRef}
        className="mt-14 overflow-hidden rounded-[24px] border border-[#101418]/[0.06] bg-white shadow-[0_50px_120px_-50px_rgba(16,20,24,0.25)]"
      >
        {/* column header chips */}
        <div className="hidden grid-cols-[110px_1.2fr_1.6fr_170px_150px] gap-4 border-b border-[#101418]/[0.06] bg-[#fafaf8] px-6 py-3.5 lg:grid">
          {["patient", "treatment", "primary_question", "intent_signal", "engagement"].map(
            (h) => (
              <span
                key={h}
                className="text-[10px] uppercase tracking-[0.18em] text-[#101418]/40 [font-family:var(--c2-font-mono)]"
              >
                {h}
              </span>
            )
          )}
        </div>

        {INTENT_ROWS.map((row, i) => {
          const open = expanded === i;
          const s = SIGNAL[row.intent_signal];
          return (
            <motion.div
              key={row.patient_id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className={`border-b border-[#101418]/[0.05] transition-colors duration-500 last:border-b-0 ${
                open ? "bg-[#4f46e5]/[0.025]" : "bg-white hover:bg-[#fafaf8]"
              }`}
            >
              <button
                onClick={() => {
                  setLocked(true);
                  setExpanded(open ? -1 : i);
                }}
                className="grid w-full grid-cols-1 items-center gap-x-4 gap-y-2 px-6 py-4 text-left lg:grid-cols-[110px_1.2fr_1.6fr_170px_150px]"
              >
                <span className="flex items-center gap-2 text-[12px] text-[#101418]/70 [font-family:var(--c2-font-mono)]">
                  <span
                    className={`h-1 w-1 rounded-full transition-all duration-300 ${
                      open ? "scale-[1.8]" : ""
                    }`}
                    style={{ background: s.color }}
                  />
                  {row.patient_id}
                </span>
                <span className="text-[13.5px] font-medium text-[#101418]/85">
                  {row.treatment_type}
                </span>
                <span className="truncate text-[13.5px] italic text-[#101418]/55">
                  &ldquo;{row.primary_question}&rdquo;
                </span>
                <span>
                  <SignalBadge signal={row.intent_signal} />
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="h-[4px] w-14 overflow-hidden rounded-full bg-[#101418]/[0.07]">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.engagement_score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.05, ease: EASE }}
                      className="block h-full rounded-full"
                      style={{ background: s.color }}
                    />
                  </span>
                  <span className="text-[12px] text-[#101418]/60 [font-family:var(--c2-font-mono)]">
                    {row.engagement_score}
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <Inspector row={row} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        <div className="flex items-center justify-between bg-[#fafaf8] px-6 py-3.5">
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
            <span className="c2-live-dot" />
            streaming from 25+ clinics
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
            8 of 12,400 consults shown
          </span>
        </div>
      </div>
    </section>
  );
}
