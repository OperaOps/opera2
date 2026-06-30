'use client';

import { motion } from 'framer-motion';
import { Film, ArrowRightLeft, Wand2, Search } from 'lucide-react';
import type { StoryboardScene } from '@/lib/types';

/** Shows the motion / direction language for the current scene. */
export function MotionDirectionCard({ scene }: { scene: StoryboardScene }) {
  const rows = [
    { icon: Film, label: 'Motion direction', value: scene.motionDirection },
    { icon: ArrowRightLeft, label: 'Transition', value: scene.transition },
    { icon: Wand2, label: 'Custom animation', value: scene.customAnimationIdea },
    { icon: Search, label: 'Lottie keyword', value: scene.lottieSearchKeyword },
  ];
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-soft backdrop-blur-xl">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-teal-600">
        <Film className="h-3.5 w-3.5" />
        Motion & direction
      </p>
      <p className="mt-1 text-xs text-slate-400">{scene.backgroundStyle}</p>
      <div className="mt-4 space-y-2.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-2.5"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <r.icon className="h-3 w-3" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {r.label}
              </p>
              <p className="text-sm leading-snug text-slate-700">{r.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
