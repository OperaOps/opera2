'use client';

import { motion } from 'framer-motion';
import { Sparkles, UserCheck } from 'lucide-react';
import type { PersonalizationSignal } from '@/lib/types';

const sourceLabel: Record<PersonalizationSignal['source'], string> = {
  'patient-provided': 'Patient provided',
  'care-team-provided': 'Care team',
  'synthetic-demo': 'Synthetic',
  'approved-content': 'Approved content',
  'journey-context': 'Journey context',
};

/** Shows the personalization signals and how each was applied. */
export function PersonalizationSignalsCard({
  signals,
}: {
  signals: PersonalizationSignal[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-soft backdrop-blur-xl">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-teal-600">
        <Sparkles className="h-3.5 w-3.5" />
        Personalization signals
      </p>
      <div className="mt-4 space-y-3">
        {signals.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-slate-200 bg-white p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-navy-900">{s.label}</p>
              <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-700 ring-1 ring-teal-100">
                {sourceLabel[s.source]}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{s.value}</p>
            <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-teal-700">
              <UserCheck className="mt-0.5 h-3 w-3 shrink-0" />
              {s.appliedAs}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
