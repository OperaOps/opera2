'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Minus, MousePointerClick } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion';
import { mondayQueue, queueSummary } from '@/lib/intent';
import { cn } from '@/lib/utils';

/**
 * The provider screen: Monday morning, every pending case ranked by
 * recoverable value × flip probability — each with the reason and the move.
 * The coordinator's job changes from dialing a list to closing a queue.
 */
export function TheQueue() {
  return (
    <section>
      <Reveal>
        <SectionHeader
          eyebrow="The queue"
          title="Monday, 7:58am. The coordinator no longer guesses."
          description="Today every pending case looks identical, so follow-up runs alphabetically, days late, with one script. Opera Intent ranks the same list by what is actually recoverable this week — with the barrier named and the counter-move drafted. One tap each. Ground truth returns from the practice system on its own."
        />
      </Reveal>

      {/* Summary banner */}
      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 rounded-2xl border border-teal-200/60 bg-gradient-to-r from-teal-50/70 to-white px-6 py-5 shadow-soft">
          <p className="text-sm font-medium text-slate-500">
            Recoverable this week:{' '}
            <span className="text-xl font-semibold tracking-tight text-navy-900">
              {queueSummary.recoverable}
            </span>
          </p>
          <p className="text-sm font-medium text-slate-500">
            Actions: <span className="font-semibold text-navy-900">{queueSummary.actions}</span>
          </p>
          <p className="text-sm font-medium text-slate-500">
            Staff time:{' '}
            <span className="font-semibold text-navy-900">{queueSummary.staffMinutes}</span>
          </p>
        </div>
      </Reveal>

      {/* The queue itself */}
      <RevealGroup className="mt-6 space-y-3">
        {mondayQueue.map((c, i) => (
          <RevealItem key={c.id}>
            <div
              className={cn(
                'grid items-center gap-4 rounded-2xl border bg-white/80 px-5 py-4 shadow-soft backdrop-blur-xl transition-all sm:grid-cols-[auto_1fr_auto_1.4fr_auto]',
                c.onTrack
                  ? 'border-slate-200/60 opacity-70'
                  : i === 0
                    ? 'border-teal-300 shadow-glow'
                    : 'border-slate-200/70',
              )}
            >
              {/* Rank + patient */}
              <div className="flex items-center gap-4">
                <span className="w-5 text-center font-mono text-sm text-slate-300">{i + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{c.initials}</p>
                  <p className="text-[12px] text-slate-400">{c.caseLabel}</p>
                </div>
              </div>

              {/* Value */}
              <p className="font-mono text-sm font-semibold text-navy-800">{c.value}</p>

              {/* Intent */}
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'text-lg font-semibold tracking-tight',
                    c.intent >= 65
                      ? 'text-teal-600'
                      : c.intent >= 45
                        ? 'text-amber-600'
                        : 'text-rose-500',
                  )}
                >
                  {c.intent}
                </span>
                {c.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-rose-400" />}
                {c.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-teal-500" />}
                {c.trend === 'flat' && <Minus className="h-4 w-4 text-slate-300" />}
              </div>

              {/* Barrier + action */}
              <div>
                {c.barrier ? (
                  <p className="text-[12px] font-semibold text-rose-600">
                    {c.barrier.code} · {c.barrier.label}
                  </p>
                ) : (
                  <p className="text-[12px] font-semibold text-teal-600">on track</p>
                )}
                <p className="mt-0.5 text-[13px] leading-snug text-slate-600">{c.action}</p>
              </div>

              {/* One tap */}
              {!c.onTrack ? (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-medium transition-all',
                    i === 0
                      ? 'bg-navy-900 text-white shadow-soft hover:bg-navy-800'
                      : 'border border-slate-200 text-navy-800 hover:border-teal-300 hover:bg-teal-50/40',
                  )}
                >
                  <MousePointerClick className="h-3.5 w-3.5" />
                  Send
                </motion.button>
              ) : (
                <span className="text-[12px] font-medium text-slate-300">—</span>
              )}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <ArrowRight className="h-4 w-4 text-teal-500" /> No new data entry — signals arrive on their own
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ArrowRight className="h-4 w-4 text-teal-500" /> The physician is never interrupted
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ArrowRight className="h-4 w-4 text-teal-500" /> Every send is outcome-labeled by what the patient does next
          </span>
        </div>
      </Reveal>
    </section>
  );
}
