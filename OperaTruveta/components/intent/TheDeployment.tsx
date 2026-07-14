'use client';

import { ArrowDown, FileSpreadsheet, ShieldCheck, Timer } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion';
import { deploySteps, dataConsumers } from '@/lib/intent';

/**
 * The "how" screen: what a deployment actually is (a worklist and a text
 * message, not an integration project) — and who consumes the data it
 * produces, mapped to the audiences a real-world-data platform already serves.
 */
export function TheDeployment() {
  return (
    <section>
      <Reveal>
        <SectionHeader
          eyebrow="How it deploys"
          title="A worklist in. A text message out. Evidence back."
          description="No EHR project, no app, no new software for clinical staff. A site can be live inside two weeks — because every hard part of this pipeline already runs in production dentistry. This is the entire technical footprint:"
        />
      </Reveal>

      {/* The pipeline */}
      <RevealGroup className="mt-12 space-y-3">
        {deploySteps.map((s, i) => (
          <RevealItem key={s.step}>
            <div className="relative rounded-2xl border border-slate-200/70 bg-white/80 px-6 py-5 shadow-soft backdrop-blur-xl sm:px-8">
              <div className="grid gap-4 sm:grid-cols-[auto_1.1fr_1fr]">
                <p className="font-mono text-sm font-semibold text-teal-600">{s.step}</p>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-navy-900">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">
                    {s.detail}
                  </p>
                </div>
                {s.mono && (
                  <div className="flex items-center">
                    <p className="w-full rounded-xl border border-slate-200 bg-slate-25 px-4 py-3 font-mono text-[11.5px] leading-relaxed text-navy-800">
                      {s.mono}
                    </p>
                  </div>
                )}
              </div>
              {i < deploySteps.length - 1 && (
                <div className="absolute -bottom-3 left-8 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-soft">
                  <ArrowDown className="h-3 w-3 text-teal-500" />
                </div>
              )}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.08}>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <FileSpreadsheet className="h-4 w-4 text-teal-500" /> Flat file first — FHIR later, only where it earns its keep
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Timer className="h-4 w-4 text-teal-500" /> Pilot to measurable lift in 90 days, against a randomized holdout
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-teal-500" /> Deployed as care delivery under the provider’s BAA
          </span>
        </div>
      </Reveal>

      {/* Who consumes the data */}
      <Reveal delay={0.1}>
        <div className="mt-16">
          <SectionHeader
            eyebrow="One variable, four research audiences"
            title="The same audiences real-world data already serves — with a question none of them could ask before"
            description="Life sciences, member health systems, public health, academia: each already consumes de-identified clinical data. Decision records add the column that data has never contained — why care did or didn’t happen."
          />
        </div>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2">
        {dataConsumers.map((c) => (
          <RevealItem key={c.audience}>
            <div className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-teal-700">
                {c.audience}
              </p>
              <h3 className="mt-2 text-balance text-lg font-semibold leading-snug tracking-tight text-navy-900">
                “{c.question}”
              </h3>
              <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-500">
                {c.detail}
              </p>
              <p className="mt-4 border-t border-slate-100 pt-3 font-mono text-[11.5px] text-slate-400">
                {c.example}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
