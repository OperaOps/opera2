import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700',
            align === 'center' && 'mx-auto',
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-slate-500 sm:text-lg">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
