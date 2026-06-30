'use client';

import { SafetyBadge, coreSafetyBadges, type SafetyBadgeDef } from './SafetyBadge';
import { cn } from '@/lib/utils';

export function TrustBadgeRow({
  badges = coreSafetyBadges,
  className,
}: {
  badges?: SafetyBadgeDef[];
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-2.5', className)}>
      {badges.map((b, i) => (
        <SafetyBadge key={b.label} {...b} index={i} />
      ))}
    </div>
  );
}
