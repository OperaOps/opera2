'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const events = ['Diagnosis', 'Medication', 'Procedure', 'Outcome'];
const gaps = ['confusion', 'silence', 'drop-off'];

/**
 * The opening statement. One idea, stated as plainly as possible:
 * the record captures the events; the product lives in the gaps.
 */
export function LoopHero() {
  return (
    <section className="pt-10 sm:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700"
      >
        <Sparkles className="h-3.5 w-3.5" />
        Opera Loop · A second flagship
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-navy-900 sm:text-6xl lg:text-[4.4rem]"
      >
        Healthcare records what happened.
        <br />
        <span className="text-slate-400">It never learns</span>{' '}
        <span className="text-gradient-teal">why.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-slate-500"
      >
        Between every recorded event, a patient is deciding — quietly — whether the plan
        survives. Opera Loop lives in that space: one living plan per patient, the moment a
        journey deviates it captures the reason with a single tap, and every reason becomes
        evidence no one else has.
      </motion.p>

      {/* The record, and the gaps it can't see */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mt-16 sm:mt-20"
      >
        <div className="flex items-center">
          {events.map((e, i) => (
            <div key={e} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy-800 shadow-soft sm:text-sm">
                  {e}
                </span>
                <span className="mt-2 text-[10px] font-medium uppercase tracking-widest text-slate-300">
                  recorded
                </span>
              </div>
              {i < events.length - 1 && (
                <div className="relative mx-3 flex-1 sm:mx-5">
                  <div className="h-px w-full border-t border-dashed border-slate-300" />
                  <motion.div
                    className="absolute inset-x-0 -top-px h-[3px] rounded-full bg-gradient-to-r from-teal-400/0 via-teal-400 to-teal-400/0"
                    initial={{ opacity: 0, scaleX: 0.4 }}
                    whileInView={{ opacity: [0, 1, 0.55], scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.7 + i * 0.35, ease: 'easeOut' }}
                  />
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.35, duration: 0.5 }}
                    className="absolute left-1/2 top-3 -translate-x-1/2 text-[11px] font-medium italic text-teal-600"
                  >
                    {gaps[i]}
                  </motion.span>
                </div>
              )}
            </div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.1, duration: 0.7 }}
          className="mt-12 text-sm font-medium text-slate-400"
        >
          The gaps are where journeys break. The gaps are the product.
        </motion.p>
      </motion.div>
    </section>
  );
}
