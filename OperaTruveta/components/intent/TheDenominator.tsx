'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Database, GitBranch, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal } from '@/components/motion';
import { denominatorFunnel, nonStartReasons, medicalTranslations } from '@/lib/intent';

/**
 * The Truveta screen: every clinical dataset on earth is conditioned on care
 * having happened. The recommended-but-never-started population — the
 * denominator — is invisible by construction. Intent captures it prospectively.
 */
export function TheDenominator() {
  const { recommended, started, invisible } = denominatorFunnel;
  const startedPct = Math.round((started / recommended) * 100);
  const invisiblePct = 100 - startedPct;

  return (
    <section>
      <Reveal>
        <SectionHeader
          eyebrow="The missing denominator"
          title="Every real-world dataset begins where care begins. That’s the flaw."
          description="Claims and EHR data are conditioned on care having happened — the recommended-but-never-started population is invisible by construction, not by coverage. You cannot mine a reason that was never recorded anywhere. Intent captures it prospectively, at the only moment it exists."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* What every dataset sees */}
        <Reveal>
          <div className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              What every dataset sees
            </p>
            <p className="mt-1 text-sm text-slate-500">
              1,000 recommendations, one specialty · synthetic cohort
            </p>

            <div className="mt-8 flex-1 space-y-6">
              {/* Recommended */}
              <div>
                <div className="flex items-baseline justify-between">
                  <p className="text-[13px] font-semibold text-navy-900">Recommended</p>
                  <p className="font-mono text-[12px] text-slate-500">{recommended.toLocaleString()}</p>
                </div>
                <div className="mt-1.5 h-8 w-full rounded-lg bg-slate-200/70" />
                <p className="mt-1 text-[11.5px] text-slate-400">
                  recorded once — then the window opens
                </p>
              </div>

              {/* Started */}
              <div>
                <div className="flex items-baseline justify-between">
                  <p className="text-[13px] font-semibold text-navy-900">Started</p>
                  <p className="font-mono text-[12px] text-slate-500">
                    {started.toLocaleString()} · {startedPct}%
                  </p>
                </div>
                <motion.div
                  className="mt-1.5 h-8 rounded-lg bg-navy-800"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${startedPct}%` }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
                <p className="mt-1 text-[11.5px] text-slate-400">
                  ← claims, EHR, registries, every RWD product: the data begins here
                </p>
              </div>

              {/* Never started */}
              <div>
                <div className="flex items-baseline justify-between">
                  <p className="text-[13px] font-semibold text-rose-600">Never started</p>
                  <p className="font-mono text-[12px] text-rose-400">
                    {invisible.toLocaleString()} · {invisiblePct}%
                  </p>
                </div>
                <motion.div
                  className="mt-1.5 h-8 rounded-lg border-2 border-dashed border-rose-200 bg-rose-50/50"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${invisiblePct}%` }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <p className="mt-1 text-[11.5px] italic text-rose-400">
                  no claim · no note · no reason · no record that they were ever deciding
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-25 px-4 py-3">
              <p className="font-mono text-[12.5px] text-navy-800">
                {invisiblePct}% of the funnel: <span className="text-rose-500">missing by construction</span>
              </p>
              <p className="mt-0.5 font-mono text-[12.5px] text-slate-400">
                every observational study is conditioned on the {startedPct}%
              </p>
            </div>
          </div>
        </Reveal>

        {/* What Intent adds */}
        <Reveal delay={0.12}>
          <div className="flex h-full flex-col rounded-3xl border border-teal-200/60 bg-gradient-to-b from-teal-50/60 to-white p-6 shadow-soft sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-teal-700">
              What Intent adds
            </p>
            <p className="mt-1 text-sm text-slate-500">
              The invisible {invisible.toLocaleString()} — reason-coded, at the moment they decided
            </p>
            <div className="mt-6 flex-1 space-y-3.5">
              {nonStartReasons.map((r, i) => (
                <div key={r.code}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-[13px] font-semibold text-navy-900">
                      <span className="mr-1.5 font-mono text-[11px] text-teal-600">{r.code}</span>
                      {r.label}
                    </p>
                    <p className="font-mono text-[12px] text-slate-500">{r.pct}%</p>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-teal-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.pct}%` }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <p className="mt-1 text-[11.5px] text-slate-400">→ {r.playbook}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-teal-100 pt-4 text-[13px] leading-relaxed text-slate-600">
              Barrier codes: a shared vocabulary for why care doesn’t happen. Identified, they
              recover cases for the clinic. De-identified at scale, they are a variable no
              real-world dataset has ever contained.
            </p>
          </div>
        </Reveal>
      </div>

      {/* The translation out of dentistry */}
      <Reveal delay={0.1}>
        <div className="mt-8 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            The same window, every specialty
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {medicalTranslations.map((t) => (
              <div
                key={t.from}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-25 px-4 py-3"
              >
                <p className="flex-1 text-[13px] text-slate-500">{t.from}</p>
                <ArrowRight className="h-4 w-4 shrink-0 text-teal-500" />
                <p className="flex-1 text-[13px] font-medium text-navy-900">{t.to}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
            Non-initiation is not a dental problem — 20–30% of new prescriptions are never
            filled, and screening follow-up fails at scale. The structure of the window is
            identical; dentistry is simply where it was instrumented first.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-teal-500" /> Captured as care delivery — consented, de-identified for research
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GitBranch className="h-4 w-4 text-teal-500" /> Attached to the recommendation event, not a survey window
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Database className="h-4 w-4 text-teal-500" /> Outcome-labeled — every window ends in started or didn’t
          </span>
        </div>
      </Reveal>
    </section>
  );
}
