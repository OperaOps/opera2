'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { demoUseCases } from '@/lib/demoData';
import { DemoCard } from '@/components/DemoCard';
import { SectionHeader } from '@/components/SectionHeader';
import { RevealGroup } from '@/components/motion';
import { cn } from '@/lib/utils';

export default function DemoLibraryPage() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string>('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(demoUseCases.map((u) => u.category)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demoUseCases.filter((u) => {
      const matchCat = active === 'All' || u.category === active;
      const matchQ =
        !q ||
        u.title.toLowerCase().includes(q) ||
        u.patient.name.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        u.summary.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, active]);

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Demo Library"
        title="Twelve synthetic patients. Twelve personalized stories."
        description="Each demo is a personalized education asset generated from approved content and care-journey context. All patients are synthetic. Educational only — never clinical decision support."
      />

      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients, titles, departments…"
            className="w-full rounded-full border border-slate-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-navy-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all',
                active === c
                  ? 'border-navy-900 bg-navy-900 text-white shadow-soft'
                  : 'border-slate-200 bg-white/70 text-slate-500 hover:border-teal-200 hover:text-navy-800',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-400">
        Showing <span className="font-semibold text-navy-700">{filtered.length}</span> of{' '}
        {demoUseCases.length} education assets
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/50 py-20 text-center text-sm text-slate-400">
          No demos match your search.
        </div>
      ) : (
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((u) => (
            <DemoCard key={u.id} useCase={u} />
          ))}
        </RevealGroup>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-4 text-center text-xs text-slate-400"
      >
        All people, histories, and details shown are synthetic and created for this demo.
      </motion.p>
    </div>
  );
}
