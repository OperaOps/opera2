'use client';

import { motion } from 'framer-motion';
import { Database, FileCheck2, FileSearch, ShieldCheck } from 'lucide-react';
import type { DemoUseCase } from '@/lib/types';

/** Traces the asset back to approved content + real-world evidence themes. */
export function SourceTransparencyCard({ useCase }: { useCase: DemoUseCase }) {
  const items = [
    {
      icon: Database,
      label: 'Real-world evidence theme',
      title: useCase.evidenceTheme.theme,
      detail: useCase.evidenceTheme.educationalRelevance,
      meta: useCase.evidenceTheme.provenance,
    },
    {
      icon: FileCheck2,
      label: 'Approved clinical content',
      title: useCase.approvedContent.title,
      detail: useCase.approvedContent.summary,
      meta: `${useCase.approvedContent.owner} · ${useCase.approvedContent.version} · reviewed ${useCase.approvedContent.lastReviewed}`,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-soft backdrop-blur-xl">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-teal-600">
        <FileSearch className="h-3.5 w-3.5" />
        Source transparency
      </p>
      <div className="mt-4 space-y-3">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, rotateX: 18 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ transformPerspective: 800 }}
            className="rounded-xl border border-slate-200 bg-white p-3.5"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-navy-700">
                <it.icon className="h-3.5 w-3.5" />
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {it.label}
              </p>
            </div>
            <p className="mt-2 text-sm font-medium text-navy-900">{it.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{it.detail}</p>
            <p className="mt-2 text-[11px] text-slate-400">{it.meta}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-teal-50/70 px-3 py-2 text-[11px] font-medium text-teal-800">
        <ShieldCheck className="h-3.5 w-3.5" />
        Every claim in the video traces to one of these sources.
      </p>
    </div>
  );
}
