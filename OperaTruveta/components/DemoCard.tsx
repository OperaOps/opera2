'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Play } from 'lucide-react';
import type { DemoUseCase } from '@/lib/types';
import { fadeUp } from './motion';
import { formatSeconds } from '@/lib/utils';
import { cn } from '@/lib/utils';

const accentBar: Record<DemoUseCase['accent'], string> = {
  teal: 'from-teal-400 to-teal-600',
  navy: 'from-navy-600 to-navy-900',
  blue: 'from-sky-400 to-sky-600',
  slate: 'from-slate-400 to-slate-600',
};

const accentChip: Record<DemoUseCase['accent'], string> = {
  teal: 'bg-teal-50 text-teal-700 ring-teal-100',
  navy: 'bg-navy-50 text-navy-700 ring-navy-100',
  blue: 'bg-sky-50 text-sky-700 ring-sky-100',
  slate: 'bg-slate-100 text-slate-600 ring-slate-200',
};

export function DemoCard({ useCase }: { useCase: DemoUseCase }) {
  const p = useCase.patient;
  return (
    <motion.article variants={fadeUp} className="h-full">
      <Link
        href={`/demo/${useCase.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-soft-lg"
      >
        <span className={cn('h-1 w-full bg-gradient-to-r', accentBar[useCase.accent])} />
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                'pill ring-1 ring-inset',
                accentChip[useCase.accent],
              )}
            >
              {useCase.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              {formatSeconds(useCase.estimatedRuntimeSec)}
            </span>
          </div>

          <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-navy-900">
            {useCase.title}
          </h3>
          <p className="mt-1.5 text-xs font-medium text-slate-400">{useCase.department}</p>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {useCase.summary}
          </p>

          {/* patient chip */}
          <div className="mt-auto flex items-center gap-3 pt-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-xs font-semibold text-navy-700">
              {p.name.slice(0, 1)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-navy-900">
                {p.name}, {p.age}
              </p>
              <p className="truncate text-xs text-slate-400">{p.language}</p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-white transition-transform group-hover:scale-105">
              <Play className="h-3.5 w-3.5 translate-x-px" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
