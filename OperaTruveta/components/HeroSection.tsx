'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { AnimatedGradientPanel } from './AnimatedGradientPanel';
import { PatientJourneyMiniMap } from './PatientJourneyMiniMap';
import { HeartPulse, FileText, CalendarClock, MessageSquare } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Opera AI × Truveta · Concept Demo
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.4rem]"
          >
            Turning real-world evidence into{' '}
            <span className="text-gradient-teal">human understanding</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-slate-500"
          >
            Opera transforms approved healthcare content, patient journey context,
            and care-team guidance into personalized education videos that help
            patients understand, prepare, and take the next appropriate step with
            their care team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="#demos"
              className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-medium text-white shadow-soft transition-all hover:bg-navy-800 hover:shadow-soft-lg"
            >
              <Play className="h-4 w-4" />
              Explore the demo library
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-400"
          >
            Educational only · No diagnosis · Human review required · Synthetic demo data
          </motion.p>
        </div>

        {/* Right: cinematic preview card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedGradientPanel className="p-1.5">
            <div className="rounded-[20px] bg-navy-950/40 p-5">
              {/* mock video frame */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-navy-800 to-navy-900 p-6">
                <div className="flex items-center gap-2 text-[11px] text-white/50">
                  <span className="h-2 w-2 rounded-full bg-teal-400" />
                  Personalized education video · Preview
                </div>

                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-teal-300/80">
                    For James, 52
                  </p>
                  <p className="mt-1.5 text-2xl font-semibold leading-tight text-white">
                    Understanding your colon cancer screening reminder
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                    “You mentioned travel makes appointments hard to schedule — here
                    are clear next steps and questions to bring to your care team.”
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-500 text-white shadow-glow">
                    <Play className="h-5 w-5 translate-x-px" />
                  </span>
                  <div className="flex-1">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-teal-400 to-sky-400"
                        animate={{ width: ['12%', '74%', '12%'] }}
                        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-white/40">
                      <span>0:18</span>
                      <span>1:14</span>
                    </div>
                  </div>
                </div>

                {/* floating chips */}
                <motion.div
                  className="absolute right-4 top-4 rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Plain language
                </motion.div>
              </div>

              {/* journey under the frame */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-white/50">
                  Care journey context
                </p>
                <JourneyDark />
              </div>
            </div>
          </AnimatedGradientPanel>
        </motion.div>
      </div>
    </section>
  );
}

/** Dark-variant mini journey for the hero preview. */
function JourneyDark() {
  const stops = [
    { label: 'Reminder', icon: CalendarClock, state: 'done' as const },
    { label: 'Education', icon: HeartPulse, state: 'current' as const },
    { label: 'Visit prep', icon: FileText, state: 'upcoming' as const },
    { label: 'Care team', icon: MessageSquare, state: 'upcoming' as const },
  ];
  return (
    <div className="flex items-start">
      {stops.map((s, i) => (
        <div key={s.label} className="flex flex-1 flex-col items-center text-center">
          <div className="flex w-full items-center">
            <span className={i === 0 ? 'h-px flex-1 opacity-0' : 'h-px flex-1 bg-white/15'} />
            <span
              className={
                'relative flex h-7 w-7 items-center justify-center rounded-full border-2 ' +
                (s.state === 'done'
                  ? 'border-teal-400 bg-teal-400 text-navy-900'
                  : s.state === 'current'
                    ? 'border-teal-400 text-teal-300'
                    : 'border-white/25 text-white/40')
              }
            >
              {s.state === 'current' && (
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-teal-400/40" />
              )}
              <s.icon className="h-3.5 w-3.5" />
            </span>
            <span
              className={
                i === stops.length - 1 ? 'h-px flex-1 opacity-0' : 'h-px flex-1 bg-white/15'
              }
            />
          </div>
          <p className="mt-2 text-[10px] font-medium text-white/70">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
