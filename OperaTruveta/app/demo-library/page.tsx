'use client';

import { motion } from 'framer-motion';
import { demoUseCases } from '@/lib/demoData';
import { DemoCard } from '@/components/DemoCard';
import { SectionHeader } from '@/components/SectionHeader';
import { RevealGroup } from '@/components/motion';

export default function DemoLibraryPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Demo Library"
        title="Twelve synthetic patients. Twelve personalized stories."
        description="Each demo is a personalized education asset generated from approved content and care-journey context. All patients are synthetic. Educational only — never clinical decision support."
      />

      <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {demoUseCases.map((u) => (
          <DemoCard key={u.id} useCase={u} />
        ))}
      </RevealGroup>

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
