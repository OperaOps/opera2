'use client';

import { motion } from 'framer-motion';
import { demoUseCases } from '@/lib/demoData';
import { DemoCard } from '@/components/DemoCard';
import { SectionHeader } from '@/components/SectionHeader';
import { RevealGroup } from '@/components/motion';

/** Curated groupings — treatments first, then the most visual explainers, then the rest. */
const GROUPS: { title: string; ids: string[] }[] = [
  {
    title: 'Treatments',
    ids: ['preventive-screening', 'lasik', 'coronary-stent'],
  },
  {
    title: 'Procedures & Conditions',
    ids: [
      'chronic-care-followup',
      'language-access',
      'genomics-consent',
      'procedure-prep',
      'prenatal-visit-prep',
    ],
  },
  {
    title: 'Care & Support',
    ids: [
      'clinical-trial-education',
      'medication-journey',
      'lab-result-explanation',
      'post-discharge-recovery',
    ],
  },
];

const byId = Object.fromEntries(demoUseCases.map((u) => [u.id, u]));

export default function DemoLibraryPage() {
  return (
    <div className="space-y-14">
      <SectionHeader
        eyebrow="Demo Library"
        title="Twelve synthetic patients. Twelve personalized stories."
        description="Each demo is a personalized education asset generated from approved content and care-journey context. All patients are synthetic. Educational only — never clinical decision support."
      />

      {GROUPS.map((group) => {
        const items = group.ids.map((id) => byId[id]).filter(Boolean);
        if (!items.length) return null;
        return (
          <section key={group.title} className="space-y-6">
            <GroupHeader title={group.title} />
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((u) => (
                <DemoCard key={u.id} useCase={u} />
              ))}
            </RevealGroup>
          </section>
        );
      })}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-2 text-center text-xs text-slate-400"
      >
        All people, histories, and details shown are synthetic and created for this demo.
      </motion.p>
    </div>
  );
}

function GroupHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-10 bg-slate-200 sm:w-16" />
      <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-700">{title}</h2>
      <span className="h-px w-10 bg-slate-200 sm:w-16" />
    </div>
  );
}
