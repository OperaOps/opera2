'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CircleSlash,
  Stethoscope,
  Pill,
  Activity,
  Eye,
  FileSearch,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type SafetyBadgeTone = 'guard' | 'allow';

export interface SafetyBadgeDef {
  label: string;
  icon?: LucideIcon;
  tone?: SafetyBadgeTone;
}

const toneMap: Record<SafetyBadgeTone, string> = {
  guard: 'border-slate-200 bg-white text-slate-600',
  allow: 'border-teal-100 bg-teal-50 text-teal-700',
};

export function SafetyBadge({
  label,
  icon: Icon = ShieldCheck,
  tone = 'guard',
  index = 0,
}: SafetyBadgeDef & { index?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium shadow-sm',
        toneMap[tone],
      )}
    >
      <Icon className="h-4 w-4 opacity-80" />
      {label}
    </motion.span>
  );
}

/** Canonical guardrail badge set used on the home + safety pages. */
export const coreSafetyBadges: SafetyBadgeDef[] = [
  { label: 'Educational only', icon: ShieldCheck, tone: 'allow' },
  { label: 'No diagnosis', icon: Stethoscope },
  { label: 'No treatment recommendation', icon: CircleSlash },
  { label: 'No medication changes', icon: Pill },
  { label: 'No patient-specific risk scoring', icon: Activity },
  { label: 'Human review required', icon: Eye, tone: 'allow' },
  { label: 'Source transparency', icon: FileSearch },
  { label: 'Synthetic demo data', icon: FlaskConical },
];
