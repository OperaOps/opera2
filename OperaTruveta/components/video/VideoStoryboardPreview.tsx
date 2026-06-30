'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Layers,
  UserCheck,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Loader2,
  Play,
  FileText,
  HeartPulse,
  Quote,
  Target,
  AlertTriangle,
  Users,
  FileCheck2,
  type LucideIcon,
} from 'lucide-react';
import type { DemoUseCase } from '@/lib/types';
import { MockVideoPlayer } from './MockVideoPlayer';
import { PersonalizationSignalsCard } from './PersonalizationSignalsCard';
import { firstName } from '@/components/scenes/sceneVisuals';
import { cn } from '@/lib/utils';

const genSteps: { icon: LucideIcon; label: string }[] = [
  { icon: FileText, label: 'Script generated' },
  { icon: Layers, label: 'Storyboard generated' },
  { icon: UserCheck, label: 'Personalization applied' },
  { icon: ShieldCheck, label: 'Compliance checked' },
  { icon: Eye, label: 'Human review required' },
  { icon: Sparkles, label: 'Preview ready' },
];

type Phase = 'idle' | 'generating' | 'ready';

export function VideoStoryboardPreview({ useCase }: { useCase: DemoUseCase }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const generate = () => {
    setPhase('generating');
    setStep(0);
    timers.current.forEach(clearTimeout);
    timers.current = [];
    genSteps.forEach((_, i) => {
      const t = setTimeout(() => {
        setStep(i + 1);
        if (i === genSteps.length - 1) {
          const r = setTimeout(() => setPhase('ready'), 650);
          timers.current.push(r);
        }
      }, 700 * (i + 1));
      timers.current.push(t);
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      {/* LEFT — patient context */}
      <aside className="space-y-4">
        <ContextCard icon={HeartPulse} title="Synthetic patient">
          <p className="text-base font-semibold text-navy-900">
            {useCase.patient.name}, {useCase.patient.age}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
            <Tag>{useCase.patient.language}</Tag>
            <Tag>{useCase.patient.healthLiteracy} literacy</Tag>
            <Tag>{useCase.patient.emotionalState}</Tag>
          </div>
          {useCase.patient.lifeContext.notes && (
            <p className="mt-3 rounded-lg bg-slate-50 p-2.5 text-xs leading-relaxed text-slate-500">
              {useCase.patient.lifeContext.notes}
            </p>
          )}
        </ContextCard>

        <ContextCard icon={Quote} title="What they’re worried about" tone="amber">
          <p className="text-sm italic leading-relaxed text-navy-900">
            “{useCase.patient.concerns[0]?.quote}”
          </p>
        </ContextCard>

        <ContextCard icon={Target} title="What they want">
          <ul className="space-y-1.5">
            {useCase.patient.goals.slice(0, 3).map((g) => (
              <li key={g} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-500" />
                {g}
              </li>
            ))}
          </ul>
        </ContextCard>

        {useCase.patient.barriers.length > 0 && (
          <ContextCard icon={AlertTriangle} title="Barriers" tone="slate">
            <ul className="space-y-1.5">
              {useCase.patient.barriers.slice(0, 2).map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  {b}
                </li>
              ))}
            </ul>
          </ContextCard>
        )}

        {useCase.patient.caregiver && (
          <ContextCard icon={Users} title="Caregiver">
            <p className="text-sm text-slate-700">
              <span className="font-medium text-navy-900">{useCase.patient.caregiver.name}</span> ·{' '}
              {useCase.patient.caregiver.relationship}
            </p>
            <p className="mt-1 text-xs text-slate-500">{useCase.patient.caregiver.involvement}</p>
          </ContextCard>
        )}

        <ContextCard icon={FileCheck2} title="Approved content used">
          <p className="text-sm font-medium text-navy-900">{useCase.approvedContent.title}</p>
          <p className="mt-1 text-xs text-slate-400">
            {useCase.approvedContent.owner} · {useCase.approvedContent.version}
          </p>
        </ContextCard>

        <ContextCard icon={ShieldCheck} title="Safety boundary" tone="teal">
          <p className="text-xs leading-relaxed text-slate-600">
            {useCase.safetyBoundary.explanation}
          </p>
        </ContextCard>
      </aside>

      {/* RIGHT — player / generator */}
      <div className="space-y-5">
        <AnimatePresence mode="wait">
          {phase === 'ready' ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MockVideoPlayer useCase={useCase} />
            </motion.div>
          ) : (
            <motion.div
              key="poster"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 shadow-soft-lg"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
                animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* idle poster */}
              {phase === 'idle' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-xs font-medium uppercase tracking-wide text-teal-300/80">
                    For {firstName(useCase)} · {useCase.estimatedRuntimeSec}s
                  </p>
                  <p className="mt-2 max-w-md text-balance text-xl font-semibold text-white sm:text-2xl">
                    {useCase.title}
                  </p>
                  <button
                    onClick={generate}
                    className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 shadow-glow transition-all hover:scale-[1.02]"
                  >
                    <Sparkles className="h-4 w-4 text-teal-600" />
                    Generate preview
                  </button>
                  <p className="mt-4 text-[11px] text-white/40">
                    Educational only · Human review required before delivery
                  </p>
                </div>
              )}

              {/* generating sequence */}
              {phase === 'generating' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-full max-w-sm space-y-2.5">
                    {genSteps.map((s, i) => {
                      const state = i < step ? 'done' : i === step ? 'active' : 'idle';
                      return (
                        <motion.div
                          key={s.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: state === 'idle' ? 0.4 : 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={cn(
                            'flex items-center gap-3 rounded-xl border px-3.5 py-2.5 backdrop-blur',
                            state === 'active'
                              ? 'border-teal-300/40 bg-teal-400/10'
                              : 'border-white/10 bg-white/5',
                          )}
                        >
                          <span
                            className={cn(
                              'flex h-7 w-7 items-center justify-center rounded-full',
                              state === 'done'
                                ? 'bg-teal-400 text-navy-900'
                                : state === 'active'
                                  ? 'bg-white/10 text-teal-200'
                                  : 'bg-white/10 text-white/40',
                            )}
                          >
                            {state === 'done' ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : state === 'active' ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <s.icon className="h-4 w-4" />
                            )}
                          </span>
                          <span className="text-sm font-medium text-white/90">{s.label}</span>
                          {s.label === 'Human review required' && state !== 'idle' && (
                            <span className="ml-auto rounded-full bg-amber-300/15 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                              gate
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {phase === 'ready' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between gap-3 rounded-2xl border border-teal-100 bg-teal-50/60 px-4 py-3"
          >
            <p className="flex items-center gap-2 text-sm font-medium text-teal-800">
              <CheckCircle2 className="h-4 w-4" />
              Preview generated — awaiting human review before any delivery.
            </p>
            <button
              onClick={generate}
              className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white px-3 py-1.5 text-xs font-medium text-teal-700 hover:bg-teal-50"
            >
              <Play className="h-3 w-3" />
              Regenerate
            </button>
          </motion.div>
        )}

        <PersonalizationSignalsCard signals={useCase.personalizationSignals} />
      </div>
    </div>
  );
}

function ContextCard({
  icon: Icon,
  title,
  tone = 'default',
  children,
}: {
  icon: LucideIcon;
  title: string;
  tone?: 'default' | 'amber' | 'teal' | 'slate';
  children: React.ReactNode;
}) {
  const toneCls = {
    default: 'text-slate-500',
    amber: 'text-amber-600',
    teal: 'text-teal-600',
    slate: 'text-slate-500',
  }[tone];
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-soft backdrop-blur-xl">
      <p className={cn('flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide', toneCls)}>
        <Icon className="h-3.5 w-3.5" />
        {title}
      </p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium capitalize text-slate-600">
      {children}
    </span>
  );
}
