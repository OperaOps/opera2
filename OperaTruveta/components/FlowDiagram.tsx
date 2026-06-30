'use client';

import { motion } from 'framer-motion';
import {
  Database,
  FileCheck2,
  Route,
  Sparkles,
  Eye,
  MonitorPlay,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowStep {
  icon: LucideIcon;
  title: string;
  sub: string;
  tone: 'data' | 'gen' | 'review' | 'output';
}

const steps: FlowStep[] = [
  { icon: Database, title: 'Real-world evidence themes', sub: 'Population-level patterns', tone: 'data' },
  { icon: FileCheck2, title: 'Approved clinical content', sub: 'Reviewed source material', tone: 'data' },
  { icon: Route, title: 'Patient journey context', sub: 'Care stage & history', tone: 'data' },
  { icon: Sparkles, title: 'Opera education generator', sub: 'Personalized, human, warm', tone: 'gen' },
  { icon: Eye, title: 'Human review', sub: 'Care team approves', tone: 'review' },
  { icon: MonitorPlay, title: 'Video · Portal · SMS · Email', sub: 'Delivered to the patient', tone: 'output' },
];

const toneStyles: Record<FlowStep['tone'], string> = {
  data: 'from-slate-50 to-white text-slate-600 ring-slate-200',
  gen: 'from-teal-50 to-white text-teal-700 ring-teal-200',
  review: 'from-sky-50 to-white text-sky-700 ring-sky-200',
  output: 'from-navy-50 to-white text-navy-700 ring-navy-200',
};

export function FlowDiagram({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
        {steps.map((step, i) => (
          <div key={step.title} className="relative flex items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex w-full flex-col rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-soft backdrop-blur-xl"
            >
              <span
                className={cn(
                  'mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ring-1',
                  toneStyles[step.tone],
                )}
              >
                <step.icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold leading-snug text-navy-900">
                {step.title}
              </p>
              <p className="mt-1 text-xs text-slate-400">{step.sub}</p>
            </motion.div>

            {i < steps.length - 1 && (
              <div className="pointer-events-none absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 xl:block">
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-500 shadow-sm"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Animated connecting beam under the row (large screens) */}
      <div className="relative mt-4 hidden h-px w-full overflow-hidden xl:block">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
        <motion.div
          className="absolute top-0 h-px w-24 bg-gradient-to-r from-transparent via-teal-500 to-transparent"
          animate={{ x: ['-10%', '110%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
