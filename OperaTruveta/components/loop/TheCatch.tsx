'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Pause, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal } from '@/components/motion';
import { sarahLoop, catchReasons, sarahResolution, type LoopBeat } from '@/lib/loop';
import { cn } from '@/lib/utils';

const LAST_WEEK = sarahLoop[sarahLoop.length - 1].week;
const AUTOPLAY_MS = 4200;

/**
 * The interactive centerpiece: sixteen weeks of one journey, beat by beat.
 * Structured events come in; Sarah sees almost nothing; and at week six the
 * Loop catches the deviation every other system misses.
 */
export function TheCatch() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    setPlaying(true);
    setActive((a) => (a >= sarahLoop.length - 1 ? 0 : a));
    timer.current = setInterval(() => {
      setActive((a) => {
        if (a >= sarahLoop.length - 1) {
          stop();
          return a;
        }
        return a + 1;
      });
    }, AUTOPLAY_MS);
  }, [stop]);

  useEffect(() => () => stop(), [stop]);

  const beat = sarahLoop[active];

  return (
    <section>
      <Reveal>
        <SectionHeader
          eyebrow="The catch"
          title="Sixteen weeks. One tap. The moment everyone else misses."
          description="Sarah — 47, ICU nurse, night shifts, newly managing type 2 diabetes. This is her journey as the Loop sees it: structured events in, almost nothing sent, and one deviation caught while it still mattered."
        />
      </Reveal>

      {/* Scrubber */}
      <Reveal delay={0.1}>
        <div className="mt-12 flex items-center gap-5">
          <button
            onClick={() => (playing ? stop() : play())}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white shadow-soft transition-all hover:bg-navy-800 hover:shadow-soft-lg"
            aria-label={playing ? 'Pause the journey' : 'Play the journey'}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>

          <div className="relative flex-1 pb-9 pt-2">
            <div className="h-[3px] w-full rounded-full bg-slate-200" />
            <motion.div
              className="absolute left-0 top-2 h-[3px] rounded-full bg-teal-500"
              animate={{ width: `${(beat.week / LAST_WEEK) * 100}%` }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
            {sarahLoop.map((b, i) => {
              const x = (b.week / LAST_WEEK) * 100;
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    stop();
                    setActive(i);
                  }}
                  className="group absolute top-2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%` }}
                  aria-label={`Week ${b.week}: ${b.headline}`}
                >
                  <span
                    className={cn(
                      'block rounded-full border-2 bg-white transition-all duration-300',
                      isActive ? 'h-[18px] w-[18px]' : 'h-3 w-3 group-hover:scale-125',
                      b.isCatch
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
                      isActive ? (b.isCatch ? 'text-amber-600' : 'text-teal-700') : 'text-slate-400',
                    )}
                  >
                    wk {b.week}
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
                    beat.isCatch ? 'text-amber-600' : 'text-slate-400',
                  )}
                >
                  Week {beat.week} of {LAST_WEEK}
                </span>
              </div>

              <div className="grid gap-px bg-slate-100 md:grid-cols-3">
                <PanelCell label="Signal in" sub="structured event — no patient effort">
                  {beat.eventIn ? (
                    <div
                      className={cn(
                        'rounded-xl border px-4 py-3 font-mono text-[12.5px] leading-relaxed',
                        beat.isCatch
                          ? 'border-amber-200 bg-amber-50/60 text-amber-800'
                          : 'border-slate-200 bg-slate-25 text-navy-800',
                      )}
                    >
                      <p className="font-semibold">{beat.eventIn.code}</p>
                      <p className="mt-1 text-slate-500">{beat.eventIn.detail}</p>
                    </div>
                  ) : null}
                </PanelCell>

                <PanelCell label="What Sarah sees" sub="through channels she already uses">
                  <PatientView beat={beat} reason={reason} onReason={(r) => { stop(); setReason(r); }} />
                </PanelCell>

                <PanelCell label="The loop" sub="what it means">
                  {beat.isCatch ? (
                    <CatchOutcome reason={reason} loopText={beat.loop} />
                  ) : (
                    <p className="text-sm leading-relaxed text-slate-600">{beat.loop}</p>
                  )}
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

function PatientView({
  beat,
  reason,
  onReason,
}: {
  beat: LoopBeat;
  reason: string | null;
  onReason: (id: string) => void;
}) {
  if (!beat.patientSees) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 px-6 text-center">
        <p className="text-sm italic leading-relaxed text-slate-400">
          Nothing. The journey is on track — the Loop stays silent.
        </p>
      </div>
    );
  }

  const { kind, text, clip, clipCaption } = beat.patientSees;

  return (
    <div className="space-y-3">
      <div
        className={cn(
          'max-w-full rounded-2xl px-4 py-3 text-[13px] leading-snug',
          kind === 'sms'
            ? 'rounded-bl-md bg-slate-200/70 text-slate-700'
            : 'border border-slate-200 bg-slate-25 text-navy-800',
        )}
      >
        {text}
      </div>

      {clip && (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <video
            className="aspect-video w-full object-cover"
            src={withBasePath(clip)}
            autoPlay
            loop
            muted
            playsInline
          />
          {clipCaption && (
            <p className="border-t border-slate-100 bg-white px-3 py-1.5 text-[10.5px] font-medium text-slate-400">
              {clipCaption}
            </p>
          )}
        </div>
      )}

      {beat.isCatch && (
        <div className="space-y-1.5 pt-1">
          {catchReasons.map((r) => {
            const picked = reason === r.id;
            return (
              <motion.button
                key={r.id}
                onClick={() => onReason(r.id)}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl border px-3.5 py-2 text-left text-[13px] font-medium transition-all',
                  picked
                    ? 'border-teal-500 bg-teal-50 text-teal-800 shadow-glow'
                    : reason
                      ? 'border-slate-200 text-slate-400'
                      : 'border-slate-200 bg-white text-navy-800 hover:border-teal-300 hover:bg-teal-50/40',
                )}
              >
                {r.label}
                {picked && <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600" />}
              </motion.button>
            );
          })}
          {!reason && (
            <p className="pt-1 text-[11px] font-medium text-amber-600">
              ↑ One tap — try it. This is the entire ask, twice a journey at most.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function CatchOutcome({ reason, loopText }: { reason: string | null; loopText: string }) {
  const picked = catchReasons.find((r) => r.id === reason);
  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-slate-600">{loopText}</p>
      <AnimatePresence>
        {picked && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="rounded-xl border border-teal-200 bg-teal-50/70 p-4"
          >
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-teal-700">
              <Zap className="h-3.5 w-3.5" /> Loop closed
            </p>
            <div className="mt-2.5 space-y-1.5 text-[13px] text-navy-800">
              <p className="flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5 text-teal-500" />
                {picked.route}
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <ArrowRight className="h-3.5 w-3.5 text-teal-500" />
                {sarahResolution.outcome}
              </p>
            </div>
            <p className="mt-3 border-t border-teal-100 pt-2.5 text-[11.5px] leading-relaxed text-slate-500">
              The physician was never interrupted. And the reason just became structured,
              event-aligned data.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
