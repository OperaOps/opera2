'use client';

/**
 * Coded treatment scenes — rendered in-app instead of an AI clip, for shots where perfect
 * typography matters (timelines, labeled diagrams). Registered by assetId; the player treats
 * these exactly like a real asset (they pass the manifest filter and render full-frame).
 */

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface CodedSceneProps {
  /** 0..1 progress within the scene, so the scene animates in step with the narration. */
  progress?: number;
  patientName?: string;
}

const TRIAL_MILESTONES = [
  { title: 'Enroll', desc: 'You choose to join' },
  { title: 'First visit', desc: 'Baseline checks' },
  { title: 'Check-ins', desc: 'Regular safety visits' },
  { title: 'Results', desc: 'Final check & thanks' },
];

/** A clean, animated clinical-trial journey timeline with pixel-perfect, legible text. */
export function ClinicalTrialTimeline({ progress = 0 }: CodedSceneProps) {
  const n = TRIAL_MILESTONES.length;
  const p = Math.min(1, Math.max(0, progress));
  const reached = (idx: number) => p >= (idx + 0.55) / n;
  const fill = p * 100;

  return (
    <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-br from-navy-900 via-navy-950 to-black px-[7%] pb-20 pt-10">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-300/80"
      >
        What taking part looks like
      </motion.p>

      <div className="relative">
        {/* connecting track between the first and last node centers */}
        <div className="absolute left-[12.5%] right-[12.5%] top-6 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/12">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-300"
            initial={{ width: '0%' }}
            animate={{ width: `${fill}%` }}
            transition={{ ease: 'linear', duration: 0.18 }}
          />
        </div>

        {/* milestones */}
        <div className="relative flex justify-between">
          {TRIAL_MILESTONES.map((m, idx) => {
            const on = reached(idx);
            return (
              <div key={m.title} className="flex w-1/4 flex-col items-center px-2">
                <motion.div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors ${
                    on
                      ? 'border-teal-300 bg-teal-400 text-navy-900'
                      : 'border-white/20 bg-navy-900 text-white/40'
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
                    on
                      ? 'border-teal-300/30 bg-teal-400/10 text-teal-50'
                      : 'border-white/10 bg-white/[0.03] text-white/40'
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

/** assetId → coded scene component. */
export const codedTreatmentScenes: Record<string, (props: CodedSceneProps) => JSX.Element> = {
  'clinical-trial-education-7': ClinicalTrialTimeline,
};

export function hasCodedScene(assetId: string): boolean {
  return assetId in codedTreatmentScenes;
}
