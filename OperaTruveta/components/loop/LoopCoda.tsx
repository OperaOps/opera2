'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedGradientPanel } from '@/components/AnimatedGradientPanel';
import { Reveal } from '@/components/motion';

/**
 * The closing argument: what the Loop is not, in three lines,
 * and the single sentence that ties both flagships together.
 */
export function LoopCoda() {
  return (
    <section>
      <Reveal>
        <AnimatedGradientPanel className="px-6 py-14 sm:px-12 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="space-y-1.5 text-lg font-medium text-white/45 sm:text-xl">
              <p>
                Not a portal — <span className="text-white/80">you have to go to those.</span>
              </p>
              <p>
                Not a chatbot — <span className="text-white/80">those need you to keep talking.</span>
              </p>
              <p>
                Not another app — <span className="text-white/80">there is nothing to install.</span>
              </p>
            </div>
            <h2 className="mt-8 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              A loop. It comes to you — once, when it matters — and every catch makes the
              whole system smarter.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-white/60">
              Structured events in. A living plan out. Reasons back. And every moment a patient
              sees is drawn from the Studio’s medically reviewed library — the two flagships are
              one product: understanding on the way out, evidence on the way back.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#demos"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-navy-900 shadow-soft transition-all hover:shadow-soft-lg"
              >
                See the Studio that powers it
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/demo/chronic-care-followup"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
              >
                Watch Sarah’s education video
              </Link>
            </div>
          </div>
        </AnimatedGradientPanel>
      </Reveal>
    </section>
  );
}
