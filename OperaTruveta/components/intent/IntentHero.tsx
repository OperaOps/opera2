'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * The opening statement of the third flagship: care that happens leaves a
 * record; care that almost happens leaves one word — "pending" — forever.
 */
export function IntentHero() {
  return (
    <section className="pt-10 sm:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700"
      >
        <Sparkles className="h-3.5 w-3.5" />
        Opera Intent · The layer before the first yes
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-navy-900 sm:text-6xl lg:text-[4.4rem]"
      >
        Care that happens leaves a record.
        <br />
        <span className="text-slate-400">Care that almost happens leaves</span>{' '}
        <span className="text-gradient-teal">nothing.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-slate-500"
      >
        Between a recommendation and the patient’s decision there is a window — days long,
        completely invisible to every clinical system, and where nearly half of recommended
        care quietly dies. The Loop explains why patients stop. Opera Intent explains why
        they never start.
      </motion.p>

      {/* The recommendation, the invisible window, and the two endings */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mt-16 sm:mt-20"
      >
        <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center">
          {/* Recommended */}
          <div className="flex flex-col items-center">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy-800 shadow-soft sm:text-sm">
              Recommended
            </span>
            <span className="mt-2 text-[10px] font-medium uppercase tracking-widest text-slate-300">
              recorded
            </span>
          </div>

          {/* The window */}
          <div className="relative flex-1">
            <div className="h-px w-full border-t border-dashed border-slate-300" />
            <motion.div
              className="absolute inset-x-0 -top-px h-[3px] rounded-full bg-gradient-to-r from-teal-400/0 via-teal-400 to-teal-400/0"
              initial={{ opacity: 0, scaleX: 0.4 }}
              whileInView={{ opacity: [0, 1, 0.55], scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
            />
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute left-1/2 top-3 w-max -translate-x-1/2 text-center text-[11px] font-medium italic text-teal-600"
            >
              the decision window · day 0–14 · invisible to every system
            </motion.span>
          </div>

          {/* The two endings */}
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-teal-800 shadow-soft sm:text-sm">
                Started
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-300">
                the record begins here
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.75, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-rose-700 shadow-soft sm:text-sm">
                Never started
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-rose-300">
                nothing. ever.
              </span>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2, duration: 0.7 }}
          className="mt-12 text-sm font-medium text-slate-400"
        >
          ICD codes exist for every disease. No code exists for why treatment never happened.
          Until now.
        </motion.p>
      </motion.div>
    </section>
  );
}
