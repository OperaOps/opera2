'use client';

/**
 * Coded treatment scenes — rendered in-app instead of an AI clip, for shots where perfect
 * typography matters (timelines, checklists, result layouts). Registered by assetId; the
 * player treats these like a real asset (they pass the manifest filter and render full-frame).
 *
 * Three reusable, premium components drive every coded scene via config:
 *   • StepsTimeline — a horizontal milestone timeline
 *   • ChecklistCard — a titled card whose items check in one by one
 *   • ResultReport  — an abstract "what a result looks like" layout (no real values)
 */

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface CodedSceneProps {
  /** 0..1 progress within the scene, so it animates in step with the narration. */
  progress?: number;
  patientName?: string;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const SHELL =
  'absolute inset-0 flex flex-col justify-center bg-gradient-to-br from-navy-900 via-navy-950 to-black px-[8%] pb-20 pt-10';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-300/80"
    >
      {children}
    </motion.p>
  );
}

/* ─────────────────────────── Steps timeline ─────────────────────────── */

interface Step {
  title: string;
  desc: string;
}

function StepsTimeline({
  eyebrow,
  steps,
  progress = 0,
}: {
  eyebrow: string;
  steps: Step[];
} & CodedSceneProps) {
  const n = steps.length;
  const p = clamp01(progress);
  const reached = (idx: number) => p >= (idx + 0.55) / n;

  return (
    <div className={SHELL}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="relative">
        <div className="absolute left-[12.5%] right-[12.5%] top-6 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/12">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-300"
            initial={{ width: '0%' }}
            animate={{ width: `${p * 100}%` }}
            transition={{ ease: 'linear', duration: 0.18 }}
          />
        </div>
        <div className="relative flex justify-between">
          {steps.map((m, idx) => {
            const on = reached(idx);
            return (
              <div key={m.title} className="flex flex-col items-center px-2" style={{ width: `${100 / n}%` }}>
                <motion.div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                    on ? 'border-teal-300 bg-teal-400 text-navy-900' : 'border-white/20 bg-navy-900 text-white/40'
                  }`}
                  animate={{ scale: on ? 1 : 0.88 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                >
                  {on && (
                    <motion.span
                      className="absolute inset-0 rounded-full ring-2 ring-teal-300/50"
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.6 }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                  {on ? <Check className="h-5 w-5" /> : <span className="text-sm font-semibold">{idx + 1}</span>}
                </motion.div>
                <motion.p
                  className={`mt-4 text-center text-sm font-semibold ${on ? 'text-white' : 'text-white/45'}`}
                  animate={{ opacity: on ? 1 : 0.55, y: on ? 0 : 3 }}
                  transition={{ duration: 0.4 }}
                >
                  {m.title}
                </motion.p>
                <motion.div
                  className={`mt-2 rounded-lg border px-3 py-2 text-center text-xs leading-snug ${
                    on ? 'border-teal-300/30 bg-teal-400/10 text-teal-50' : 'border-white/10 bg-white/[0.03] text-white/40'
                  }`}
                  animate={{ opacity: on ? 1 : 0.5, y: on ? 0 : 4 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  {m.desc}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Checklist card ─────────────────────────── */

function ChecklistCard({
  eyebrow,
  title,
  items,
  progress = 0,
}: {
  eyebrow: string;
  title: string;
  items: string[];
} & CodedSceneProps) {
  const n = items.length;
  const p = clamp01(progress);
  const on = (idx: number) => p >= (idx + 0.6) / n;

  return (
    <div className={SHELL}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
        <p className="mb-5 text-center text-lg font-semibold text-white">{title}</p>
        <ul className="space-y-3">
          {items.map((it, idx) => {
            const active = on(idx);
            return (
              <motion.li
                key={it}
                className="flex items-center gap-3"
                initial={false}
                animate={{ opacity: active ? 1 : 0.4, x: active ? 0 : -4 }}
                transition={{ duration: 0.35 }}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    active ? 'border-teal-300 bg-teal-400 text-navy-900' : 'border-white/25 text-white/30'
                  }`}
                >
                  {active && <Check className="h-3.5 w-3.5" />}
                </span>
                <span className={`text-sm ${active ? 'text-white' : 'text-white/50'}`}>{it}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────── Result report ─────────────────────────── */

function ResultReport({
  eyebrow,
  title,
  rows,
  progress = 0,
}: {
  eyebrow: string;
  title: string;
  rows: string[];
} & CodedSceneProps) {
  const n = rows.length;
  const p = clamp01(progress);
  const on = (idx: number) => p >= (idx + 0.6) / n;

  return (
    <div className={SHELL}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
        <p className="mb-5 text-center text-lg font-semibold text-white">{title}</p>
        <div className="space-y-5">
          {rows.map((label, idx) => {
            const active = on(idx);
            return (
              <div key={label} className="flex items-center gap-4">
                <span className={`w-24 shrink-0 text-sm ${active ? 'text-white/90' : 'text-white/40'}`}>{label}</span>
                <div className="relative h-2 flex-1 rounded-full bg-white/10">
                  {/* "in range" band */}
                  <div className="absolute inset-y-0 left-[28%] right-[28%] rounded-full bg-teal-400/25" />
                  {/* animated marker landing inside the band */}
                  <motion.span
                    className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300 ring-2 ring-navy-950"
                    initial={{ left: '0%', opacity: 0 }}
                    animate={{ left: active ? '50%' : '0%', opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
                <span className={`text-[11px] font-medium ${active ? 'text-teal-200' : 'text-white/30'}`}>In range</span>
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-center text-[11px] text-white/40">Layout only — your team explains the meaning</p>
      </div>
    </div>
  );
}

/* ─────────────────────────── Registry ─────────────────────────── */

export const codedTreatmentScenes: Record<string, (props: CodedSceneProps) => JSX.Element> = {
  'clinical-trial-education-7': (p) => (
    <StepsTimeline
      {...p}
      eyebrow="What taking part looks like"
      steps={[
        { title: 'Enroll', desc: 'You choose to join' },
        { title: 'First visit', desc: 'Baseline checks' },
        { title: 'Check-ins', desc: 'Regular safety visits' },
        { title: 'Results', desc: 'Final check & thanks' },
      ]}
    />
  ),
  'procedure-prep-2': (p) => (
    <StepsTimeline
      {...p}
      eyebrow="Your prep day"
      steps={[
        { title: 'Day before', desc: 'Light meals, then clear liquids' },
        { title: 'Evening', desc: 'Start the prep drink' },
        { title: 'Morning of', desc: 'Final dose, clear liquids' },
        { title: 'At the center', desc: "You're in good hands" },
      ]}
    />
  ),
  'prenatal-visit-prep-3': (p) => (
    <StepsTimeline
      {...p}
      eyebrow="Your visit rhythm"
      steps={[
        { title: 'Early', desc: 'Monthly check-ins' },
        { title: 'Midway', desc: 'Every few weeks' },
        { title: 'Near term', desc: 'Weekly visits' },
      ]}
    />
  ),
  'post-discharge-recovery-5': (p) => (
    <ChecklistCard
      {...p}
      eyebrow="Your follow-up plan"
      title="The week ahead"
      items={['Take medications as scheduled', 'Gentle daily walks', 'Follow-up visit booked', 'Message your team with questions']}
    />
  ),
  'lab-result-explanation-4': (p) => (
    <ResultReport {...p} eyebrow="What a result looks like" title="Your results" rows={['Panel A', 'Panel B', 'Panel C']} />
  ),
  'caregiver-education-2': (p) => (
    <ChecklistCard
      {...p}
      eyebrow="Appointment summary"
      title="Key points in one place"
      items={['What was discussed', 'Any changes to care', 'Next steps', 'Who to call']}
    />
  ),
  'caregiver-education-3': (p) => (
    <ChecklistCard
      {...p}
      eyebrow="Medication routine"
      title="A simple daily plan"
      items={['Morning doses', 'Evening doses', 'Take with food & water', 'Keep refills on track']}
    />
  ),
};

export function hasCodedScene(assetId: string): boolean {
  return assetId in codedTreatmentScenes;
}
