'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Film, Sparkles, ShieldCheck, UserCheck, type LucideIcon } from 'lucide-react';
import type { StoryboardScene } from '@/lib/types';
import { cn } from '@/lib/utils';

function iconFor(name: string): LucideIcon {
  return (Icons as unknown as Record<string, LucideIcon>)[name] ?? Film;
}

/** One storyboard scene rendered as a rich, scannable card. */
export function SceneCard({
  scene,
  index,
  active,
  onClick,
}: {
  scene: StoryboardScene;
  index: number;
  active?: boolean;
  onClick?: () => void;
}) {
  const Icon = iconFor(scene.iconName);
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        'w-full overflow-hidden rounded-2xl border bg-white/80 text-left shadow-soft backdrop-blur-xl transition-all',
        active ? 'border-teal-300 ring-2 ring-teal-100' : 'border-slate-200/70 hover:border-teal-200',
      )}
    >
      <div className="flex items-start gap-4 p-4">
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-xs font-semibold text-white">
            {index + 1}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-100">
            <Icon className="h-4 w-4" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-navy-900">{scene.onScreenText}</p>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
              {scene.visualType}
            </span>
            <span className="text-[11px] text-slate-400">{scene.durationSec}s</span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">“{scene.narration}”</p>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Mini icon={Film} label="Visual & motion" value={`${scene.motionDirection} · ${scene.transition}`} />
            <Mini icon={Sparkles} label="Custom animation" value={scene.customAnimationIdea} />
          </div>

          <div className="mt-3 flex flex-col gap-1.5 sm:flex-row">
            <span className="inline-flex items-start gap-1.5 rounded-lg bg-teal-50 px-2.5 py-1.5 text-[11px] leading-snug text-teal-800">
              <UserCheck className="mt-0.5 h-3 w-3 shrink-0" />
              {scene.personalizationReason}
            </span>
            <span className="inline-flex items-start gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] leading-snug text-slate-600">
              <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" />
              {scene.safetyBoundary}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Mini({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
      <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
        <Icon className="h-2.5 w-2.5" />
        {label}
      </p>
      <p className="mt-0.5 text-[11px] leading-snug text-slate-600">{value}</p>
    </div>
  );
}
