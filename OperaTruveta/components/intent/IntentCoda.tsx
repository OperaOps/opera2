'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedGradientPanel } from '@/components/AnimatedGradientPanel';
import { Reveal } from '@/components/motion';

/**
 * The closing argument — and the line that ties all three flagships together:
 * the Studio explains care, Intent starts it, the Loop keeps it.
 */
export function IntentCoda() {
  return (
    <section>
      <Reveal>
        <AnimatedGradientPanel className="px-6 py-14 sm:px-12 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="space-y-1.5 text-lg font-medium text-white/45 sm:text-xl">
              <p>
                Not reminders — <span className="text-white/80">reminders assume the patient already decided.</span>
              </p>
              <p>
                Not a survey — <span className="text-white/80">nobody answers those honestly, or at all.</span>
              </p>
              <p>
                Not engagement analytics — <span className="text-white/80">opens don’t start treatment.</span>
              </p>
            </div>
            <h2 className="mt-8 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              A record of the decision itself — read from behavior, labeled by outcome,
              acted on while the window is still open.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-white/60">
              The Studio explains care. Intent starts it. The Loop keeps it. Together: the
              patient side of the record, from the first recommendation to the last refill —
              before the first fill and after it.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/loop"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-navy-900 shadow-soft transition-all hover:shadow-soft-lg"
              >
                Then see what happens after the yes — the Loop
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#demos"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
              >
                See the Studio that powers both
              </Link>
            </div>
          </div>
        </AnimatedGradientPanel>
      </Reveal>
    </section>
  );
}
