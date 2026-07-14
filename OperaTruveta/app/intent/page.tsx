import type { Metadata } from 'next';
import { IntentHero } from '@/components/intent/IntentHero';
import { DecisionWindow } from '@/components/intent/DecisionWindow';
import { TheQueue } from '@/components/intent/TheQueue';
import { TheDenominator } from '@/components/intent/TheDenominator';
import { IntentCoda } from '@/components/intent/IntentCoda';

export const metadata: Metadata = {
  title: 'Opera Intent — the layer before the first yes',
  description:
    'The decision window between a recommendation and the patient’s action is invisible to every clinical system. Opera Intent reads it from behavior, names the barrier, recovers the case — and turns non-initiation into a variable real-world evidence has never had.',
};

/**
 * The third flagship. One continuous story in five screens:
 * the invisible window → the window instrumented → the queue that acts on it
 * → the denominator it produces → the close.
 */
export default function IntentPage() {
  return (
    <div className="space-y-28 sm:space-y-36">
      <IntentHero />
      <DecisionWindow />
      <TheQueue />
      <TheDenominator />
      <IntentCoda />
    </div>
  );
}
