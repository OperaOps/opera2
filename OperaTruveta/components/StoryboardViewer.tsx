'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Film,
  Wand2,
  ArrowRightLeft,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import type { StoryboardScene } from '@/lib/types';
import { cn } from '@/lib/utils';

function iconFor(name: string): LucideIcon {
  const Comp = (Icons as unknown as Record<string, LucideIcon>)[name];
  return Comp ?? Film;
}

const bgFor = (visualType: string) => {
  switch (visualType) {
    case 'title-card':
    case 'closing-card':
      return 'from-navy-800 via-navy-900 to-navy-950';
    case 'lab-card':
    case 'comparison':
      return 'from-sky-700 via-navy-800 to-navy-900';
    case 'source-panel':
    case 'consent-panel':
      return 'from-slate-700 via-navy-800 to-navy-900';
    default:
      return 'from-teal-700 via-navy-800 to-navy-900';
  }
};

export function StoryboardViewer({ scenes }: { scenes: StoryboardScene[] }) {
  const [i, setI] = useState(0);
  const scene = scenes[i];
  const SceneIcon = iconFor(scene.iconName);

  const go = (dir: number) =>
    setI((prev) => (prev + dir + scenes.length) % scenes.length);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 shadow-soft backdrop-blur-xl">
      {/* Frame */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute inset-0 flex flex-col justify-between bg-gradient-to-br p-7 sm:p-10',
              bgFor(scene.visualType),
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
                <SceneIcon className="h-3.5 w-3.5" />
                {scene.visualType}
              </span>
              <span className="text-[11px] font-medium text-white/50">
                Scene {i + 1} / {scenes.length} · {scene.durationSec}s
              </span>
            </div>

            <div className="relative">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-teal-200 ring-1 ring-white/15 backdrop-blur"
              >
                <SceneIcon className="h-7 w-7" />
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mt-4 max-w-2xl text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl"
              >
                {scene.onScreenText}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
                className="mt-3 max-w-xl text-sm leading-relaxed text-white/60"
              >
                {scene.sceneTitle}
              </motion.p>
            </div>

            <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                key={i}
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-sky-400"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          aria-label="Previous scene"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-soft backdrop-blur transition-transform hover:scale-105"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-label="Next scene"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-soft backdrop-blur transition-transform hover:scale-105"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Scene thumbnails */}
      <div className="flex gap-1.5 overflow-x-auto border-b border-slate-200/70 px-4 py-3">
        {scenes.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={cn(
              'flex-1 rounded-full transition-all',
              idx === i ? 'h-1.5 bg-navy-900' : 'h-1.5 bg-slate-200 hover:bg-slate-300',
            )}
            title={s.sceneTitle}
          />
        ))}
      </div>

      {/* Scene detail */}
      <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-600">
            Narration
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">“{scene.narration}”</p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MetaTile icon={Wand2} label="Custom animation" value={scene.customAnimationIdea} />
            <MetaTile icon={ArrowRightLeft} label="Transition" value={scene.transition} />
            <MetaTile icon={Film} label="Motion" value={scene.motionDirection} />
            <MetaTile
              icon={iconFor(scene.iconName)}
              label="Lottie keyword"
              value={scene.lottieSearchKeyword}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-teal-700">
              <UserCheck className="h-3.5 w-3.5" />
              Why this is personalized
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-teal-900/80">
              {scene.personalizationReason}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5" />
              Safety boundary respected
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {scene.safetyBoundary}
            </p>
          </div>
          <p className="text-xs text-slate-400">
            Background: <span className="text-slate-500">{scene.backgroundStyle}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function MetaTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        <Icon className="h-3 w-3" />
        {label}
      </p>
      <p className="mt-1 text-xs leading-snug text-slate-600">{value}</p>
    </div>
  );
}
