'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Pause, Zap, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal } from '@/components/motion';
import { mayaWindow, dentalProof, type IntentBeat } from '@/lib/intent';
import { cn } from '@/lib/utils';

const LAST_DAY = mayaWindow[mayaWindow.length - 1].day;
const AUTOPLAY_MS = 4200;

/**
 * The interactive centerpiece: nine days of one decision, beat by beat.
 * The middle column — what the practice system sees — never changes.
 * That is the entire argument.
 */
export function DecisionWindow() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    setPlaying(true);
    setActive((a) => (a >= mayaWindow.length - 1 ? 0 : a));
    timer.current = setInterval(() => {
      setActive((a) => {
        if (a >= mayaWindow.length - 1) {
          stop();
          return a;
        }
        return a + 1;
      });
    }, AUTOPLAY_MS);
  }, [stop]);

  useEffect(() => () => stop(), [stop]);

  const beat = mayaWindow[active];

  return (
    <section>
      <Reveal>
        <SectionHeader
          eyebrow="The decision window"
          title="Nine days. One decision. The record sees one word the entire time."
          description="Maya, 34 — recommended an implant, $4,850, and she “needs to think about it.” This is her decision as Opera sees it: every signal below is behavioral, none of it is a survey, and the practice system’s view never changes until the very end."
        />
      </Reveal>

      {/* Proof strip — the mechanism already runs in production */}
      <Reveal delay={0.08}>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-100 shadow-soft sm:grid-cols-4">
          {dentalProof.map((p) => (
            <div key={p.label} className="bg-white px-5 py-4">
              <p className="text-xl font-semibold tracking-tight text-navy-900">{p.value}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-slate-500">{p.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] font-medium text-slate-400">
          Not a concept — this mechanism runs in production dentistry today. Dentistry is where
          it was industrialized. The mechanism doesn’t care which specialty it runs in.
        </p>
      </Reveal>

      {/* Scrubber */}
      <Reveal delay={0.1}>
        <div className="mt-12 flex items-center gap-5">
          <button
            onClick={() => (playing ? stop() : play())}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white shadow-soft transition-all hover:bg-navy-800 hover:shadow-soft-lg"
            aria-label={playing ? 'Pause the decision window' : 'Play the decision window'}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>

          <div className="relative flex-1 pb-9 pt-2">
            <div className="h-[3px] w-full rounded-full bg-slate-200" />
            <motion.div
              className="absolute left-0 top-2 h-[3px] rounded-full bg-teal-500"
              animate={{ width: `${(beat.day / LAST_DAY) * 100}%` }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
            {mayaWindow.map((b, i) => {
              const x = (b.day / LAST_DAY) * 100;
              const isActive = i === active;
              const isPast = i < active;
              const special = b.isIntervention || b.isFlip;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    stop();
                    setActive(i);
                  }}
                  className="group absolute top-2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%` }}
                  aria-label={`Day ${b.day}: ${b.headline}`}
                >
                  <span
                    className={cn(
                      'block rounded-full border-2 bg-white transition-all duration-300',
                      isActive ? 'h-[18px] w-[18px]' : 'h-3 w-3 group-hover:scale-125',
                      special
                        ? isActive || isPast
                          ? 'border-amber-500 bg-amber-400'
                          : 'border-amber-300'
                        : isActive || isPast
                          ? 'border-teal-500 bg-teal-400'
                          : 'border-slate-300',
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider transition-colors',
                      isActive ? (special ? 'text-amber-600' : 'text-teal-700') : 'text-slate-400',
                    )}
                  >
                    day {b.day}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Beat panel */}
      <Reveal delay={0.15}>
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-soft backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 px-6 py-4 sm:px-8">
                <h3 className="text-lg font-semibold tracking-tight text-navy-900">
                  {beat.headline}
                </h3>
                <span
                  className={cn(
                    'text-[11px] font-semibold uppercase tracking-widest',
                    beat.isIntervention || beat.isFlip ? 'text-amber-600' : 'text-slate-400',
                  )}
                >
                  Day {beat.day} of {LAST_DAY}
                </span>
              </div>

              <div className="grid gap-px bg-slate-100 md:grid-cols-3">
                <PanelCell label="What Maya does" sub="behavioral — never a survey">
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed text-slate-600">{beat.patientDoes}</p>
                    {beat.telemetry && (
                      <div className="rounded-xl border border-slate-200 bg-slate-25 px-4 py-3 font-mono text-[12px] leading-relaxed text-navy-800">
                        {beat.telemetry}
                      </div>
                    )}
                  </div>
                </PanelCell>

                <PanelCell label="What the record sees" sub="the practice system, the claim, the EHR">
                  <RecordView beat={beat} />
                </PanelCell>

                <PanelCell label="The decision record" sub="intent, live — with the reason attached">
                  <DecisionRead beat={beat} />
                </PanelCell>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

function PanelCell({
  label,
  sub,
  children,
}: {
  label: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[220px] flex-col bg-white px-6 py-5 sm:px-7">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-0.5 text-[11px] text-slate-300">{sub}</p>
      <div className="mt-4 flex-1">{children}</div>
    </div>
  );
}

function RecordView({ beat }: { beat: IntentBeat }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 px-6 text-center">
      <p
        className={cn(
          'font-mono text-sm font-semibold',
          beat.isFlip ? 'text-teal-700' : 'text-slate-400',
        )}
      >
        {beat.recordSees}
      </p>
      {!beat.isFlip && (
        <p className="text-[11.5px] italic leading-relaxed text-slate-300">
          Unchanged since the consult. “Deciding,” “scared,” “can’t afford it,” and “gone
          forever” all look exactly like this.
        </p>
      )}
      {beat.isFlip && (
        <p className="text-[11.5px] leading-relaxed text-slate-400">
          The first thing the record has seen in nine days — and Opera’s ground-truth label.
        </p>
      )}
    </div>
  );
}

function DecisionRead({ beat }: { beat: IntentBeat }) {
  const tone =
    beat.intent >= 65 ? 'text-teal-600' : beat.intent >= 45 ? 'text-amber-600' : 'text-rose-500';
  return (
    <div className="space-y-3.5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Intent
          </p>
          <p className={cn('mt-0.5 text-3xl font-semibold tracking-tight', tone)}>
            {beat.intent}
          </p>
        </div>
        {beat.barrier && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-[11px] font-semibold text-rose-700">
            {beat.barrier.code} · {beat.barrier.label}
          </span>
        )}
        {beat.isFlip && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-[11px] font-semibold text-teal-700">
            <CheckCircle2 className="h-3.5 w-3.5" /> outcome: started
          </span>
        )}
      </div>

      {/* Intent sparkline up to the active beat */}
      <div className="flex h-10 items-end gap-1.5">
        {mayaWindow.map((b, i) => {
          const reached = b.day <= beat.day;
          return (
            <div
              key={b.id}
              className={cn(
                'flex-1 rounded-t-sm transition-all duration-500',
                reached
                  ? b.intent >= 65
                    ? 'bg-teal-400'
                    : b.intent >= 45
                      ? 'bg-amber-300'
                      : 'bg-rose-300'
                  : 'bg-slate-100',
              )}
              style={{ height: `${reached ? Math.max(b.intent, 12) : 12}%` }}
              title={`Day ${b.day}: ${b.intent}`}
            />
          );
        })}
      </div>

      <p
        className={cn(
          'text-[13px] leading-relaxed',
          beat.isIntervention ? 'text-navy-800' : 'text-slate-600',
        )}
      >
        {beat.isIntervention && (
          <Zap className="mb-0.5 mr-1 inline h-3.5 w-3.5 text-amber-500" />
        )}
        {beat.read}
      </p>
    </div>
  );
}
