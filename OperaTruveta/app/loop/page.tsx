import type { Metadata } from 'next';
import { LoopHero } from '@/components/loop/LoopHero';
import { LivingPlan } from '@/components/loop/LivingPlan';
import { TheCatch } from '@/components/loop/TheCatch';
import { ReasonLayer } from '@/components/loop/ReasonLayer';
import { LoopCoda } from '@/components/loop/LoopCoda';

export const metadata: Metadata = {
  title: 'Opera Loop — the layer between visits',
  description:
    'One living plan per patient. Deviations caught from structured events. Reasons captured with a single tap — and turned into a new variable for real-world evidence.',
};

/**
 * The second flagship. One continuous story in five screens, each with a
 * single purpose: the gap → the artifact → the catch → the evidence → the close.
 */
export default function LoopPage() {
  return (
    <div className="space-y-28 sm:space-y-36">
      <LoopHero />
      <LivingPlan />
      <TheCatch />
      <ReasonLayer />
      <LoopCoda />
    </div>
  );
}
