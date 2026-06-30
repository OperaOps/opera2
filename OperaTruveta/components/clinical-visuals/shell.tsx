'use client';

/**
 * Shared frame + contract for the condition-specific clinical explainer visuals.
 * Every visual in components/clinical-visuals/ renders its animated SVG/motion content
 * as children of <ClinicalVisualShell>, so they all share the same premium 16:9 frame,
 * captions, and safety/personalization chips.
 *
 * Education only — calm, non-graphic, no clinical claims, no result interpretation.
 */

import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ClinicalVisualProps {
  patientName?: string;
  title?: string;
  caption?: string;
  language?: string;
  safetyNote?: string;
  personalizationNote?: string;
}

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const isSpanish = (language?: string) => Boolean(language && /span|español|espanol/i.test(language));

export function ClinicalVisualShell({
  patientName,
  title,
  caption,
  language,
  safetyNote,
  personalizationNote,
  category,
  icon: Icon,
  children,
}: ClinicalVisualProps & {
  category: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  const es = isSpanish(language);
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
      {/* texture + ambient bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-teal-400/12 blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* header */}
      <div className="relative z-10 flex items-center justify-between gap-3 px-6 pt-5 sm:px-8">
        <div className="min-w-0">
          {patientName && (
            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-teal-300/80">
              {es ? 'Para' : 'For'} {patientName}
            </p>
          )}
          {title && (
            <p className="truncate text-base font-semibold leading-snug text-white sm:text-lg">
              {title}
            </p>
          )}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-teal-200 backdrop-blur">
          <Icon className="h-3.5 w-3.5" />
          {category}
        </span>
      </div>

      {/* animated visual stage */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-3 sm:px-8">
        {children}
      </div>

      {/* caption + chips */}
      <div className="relative z-10 space-y-2 px-6 pb-5 sm:px-8">
        {caption && (
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-white/75">{caption}</p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {personalizationNote && (
            <Chip tone="teal" icon={Sparkles}>
              {personalizationNote}
            </Chip>
          )}
          <Chip tone="slate" icon={ShieldCheck}>
            {safetyNote ?? (es ? 'Solo educativo' : 'Educational only')}
          </Chip>
        </div>
      </div>
    </div>
  );
}

export function Chip({
  children,
  tone = 'slate',
  icon: Icon,
}: {
  children: React.ReactNode;
  tone?: 'teal' | 'slate';
  icon?: LucideIcon;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium backdrop-blur',
        tone === 'teal'
          ? 'border-teal-300/30 bg-teal-400/10 text-teal-100'
          : 'border-white/10 bg-white/5 text-white/60',
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}
