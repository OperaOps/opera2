'use client';

import { motion } from 'framer-motion';
import { Check, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface JourneyStop {
  label: string;
  caption?: string;
  icon?: LucideIcon;
  /** 'done' | 'current' | 'upcoming' */
  state?: 'done' | 'current' | 'upcoming';
}

/**
 * A compact animated patient-journey timeline. Descriptive context only —
 * it shows where the patient is on their care journey, never a prediction.
 */
export function PatientJourneyMiniMap({
  stops,
  className,
  orientation = 'horizontal',
}: {
  stops: JourneyStop[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}) {
  if (orientation === 'vertical') {
    return (
      <ol className={cn('relative space-y-5 pl-2', className)}>
        <span className="absolute left-[14px] top-2 h-[calc(100%-1rem)] w-px bg-slate-200" />
        {stops.map((s, i) => (
          <motion.li
            key={s.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative flex items-start gap-3"
          >
            <Dot state={s.state} icon={s.icon} />
            <div className="pt-0.5">
              <p
                className={cn(
                  'text-sm font-medium',
                  s.state === 'current' ? 'text-navy-900' : 'text-slate-600',
                )}
              >
                {s.label}
              </p>
              {s.caption && <p className="text-xs text-slate-400">{s.caption}</p>}
            </div>
          </motion.li>
        ))}
      </ol>
    );
  }

  return (
    <div className={cn('flex items-start', className)}>
      {stops.map((s, i) => (
        <div key={s.label} className="flex flex-1 flex-col items-center text-center">
          <div className="flex w-full items-center">
            <span
              className={cn(
                'h-px flex-1',
                i === 0 ? 'opacity-0' : 'bg-slate-200',
              )}
            />
            <Dot state={s.state} icon={s.icon} />
            <span
              className={cn(
                'h-px flex-1',
                i === stops.length - 1 ? 'opacity-0' : 'bg-slate-200',
              )}
            />
          </div>
          <p
            className={cn(
              'mt-2 px-1 text-xs font-medium leading-tight',
              s.state === 'current' ? 'text-navy-900' : 'text-slate-500',
            )}
          >
            {s.label}
          </p>
          {s.caption && (
            <p className="px-1 text-[10px] leading-tight text-slate-400">{s.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function Dot({
  state = 'upcoming',
  icon: Icon,
}: {
  state?: JourneyStop['state'];
  icon?: LucideIcon;
}) {
  return (
    <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
      {state === 'current' && (
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-teal-400/40" />
      )}
      <span
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-full border-2 bg-white',
          state === 'done' && 'border-teal-500 bg-teal-500 text-white',
          state === 'current' && 'border-teal-500 text-teal-600',
          state === 'upcoming' && 'border-slate-300 text-slate-400',
        )}
      >
        {state === 'done' ? (
          <Check className="h-3.5 w-3.5" />
        ) : Icon ? (
          <Icon className="h-3.5 w-3.5" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        )}
      </span>
    </span>
  );
}
