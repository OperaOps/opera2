'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/** The base premium glass card used across the app. */
export function EnterpriseCard({
  children,
  className,
  hover = true,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'article' | 'li';
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 shadow-soft backdrop-blur-xl',
        hover &&
          'transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-soft-lg',
        className,
      )}
    >
      {children}
    </Comp>
  );
}
