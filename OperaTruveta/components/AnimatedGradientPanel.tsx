'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * A dark, cinematic gradient panel with slow-drifting light blooms.
 * Used for hero accents, CTAs, and the "evidence to understanding" sections.
 */
export function AnimatedGradientPanel({
  children,
  className,
  tone = 'navy',
}: {
  children?: ReactNode;
  className?: string;
  tone?: 'navy' | 'teal';
}) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-3xl',
        tone === 'navy'
          ? 'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950'
          : 'bg-gradient-to-br from-teal-700 via-navy-800 to-navy-900',
        className,
      )}
    >
      {/* Drifting light blooms */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Fine grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] noise-overlay" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
