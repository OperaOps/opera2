'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { fadeUp } from './motion';
import { cn } from '@/lib/utils';

const accentMap = {
  teal: 'from-teal-500/15 to-teal-500/0 text-teal-600 ring-teal-100',
  navy: 'from-navy-700/15 to-navy-700/0 text-navy-700 ring-navy-100',
  blue: 'from-sky-500/15 to-sky-500/0 text-sky-600 ring-sky-100',
};

export function ValueCard({
  icon: Icon,
  title,
  description,
  accent = 'teal',
  points,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: keyof typeof accentMap;
  points?: string[];
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-soft-lg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-teal-400/10 to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        className={cn(
          'mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ring-1',
          accentMap[accent],
        )}
      >
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-semibold tracking-tight text-navy-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
      {points && (
        <ul className="mt-4 space-y-2">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
              {p}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
