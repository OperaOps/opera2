'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, CheckCircle2, Clock, ShieldCheck, PenLine } from 'lucide-react';
import type { DemoUseCase } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * The human-review gate, shown as a reviewer panel. Approval is the only way an
 * asset reaches a patient. The "Approve" here is a demo affordance.
 */
export function HumanReviewCard({ useCase }: { useCase: DemoUseCase }) {
  const [approved, setApproved] = useState(false);

  const checks = [
    'Education only — no diagnosis or advice',
    'Sources are approved and current',
    'Personalization is consent-based',
    'Disclaimer present · routes to care team',
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 shadow-soft backdrop-blur-xl">
      <div className="flex items-center gap-2.5 border-b border-slate-200/70 bg-sky-50/50 px-5 py-3.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
          <Eye className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-navy-900">Human review</p>
          <p className="text-[11px] text-slate-500">Required before delivery</p>
        </div>
        <span
          className={cn(
            'ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors',
            approved
              ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-100'
              : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
          )}
        >
          {approved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
          {approved ? 'Approved' : 'Pending review'}
        </span>
      </div>

      <div className="p-5">
        <ul className="space-y-2">
          {checks.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <CheckCircle2
                className={cn('h-4 w-4', approved ? 'text-teal-500' : 'text-slate-300')}
              />
              {c}
            </motion.li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setApproved((v) => !v)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
              approved
                ? 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                : 'bg-navy-900 text-white shadow-soft hover:bg-navy-800',
            )}
          >
            {approved ? <PenLine className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
            {approved ? 'Withdraw approval' : 'Approve for delivery'}
          </button>
          <AnimatePresence>
            {approved && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-slate-400"
              >
                Reviewed by Dr. (demo) · {useCase.department}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
