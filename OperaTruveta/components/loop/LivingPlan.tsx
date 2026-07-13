'use client';

import { motion } from 'framer-motion';
import { Link2, BellOff, PlayCircle } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal } from '@/components/motion';

/**
 * The patient-side artifact: one living plan, delivered through the texts
 * a patient already receives. One screen, one purpose — show what Sarah sees.
 */
export function LivingPlan() {
  return (
    <section className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <Reveal>
          <SectionHeader
            eyebrow="The living plan"
            title="One link. Always current. Nothing to install."
            description="After every clinical event, Sarah’s plan quietly updates — what changed, in plain words, with a reviewed clip where it helps. It rides the text messages she already gets. No app, no password, no homework."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-8 space-y-4">
            {[
              {
                icon: Link2,
                title: 'The link is the product',
                text: 'A secure web page that becomes her memory of the whole journey — what the doctor said three weeks ago, kept.',
              },
              {
                icon: PlayCircle,
                title: 'The Studio powers every moment',
                text: 'Clips come from Opera’s medically reviewed library — matched, not generated. That’s what makes it scale.',
              },
              {
                icon: BellOff,
                title: 'Silence by default',
                text: 'When the journey is on track, the Loop says nothing. It earns attention by spending it rarely.',
              },
            ].map((f) => (
              <li key={f.title} className="flex gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                  <f.icon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{f.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-500">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Sarah's phone */}
      <Reveal delay={0.15} className="mx-auto w-full max-w-[340px]">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="rounded-[2.6rem] border border-slate-200 bg-white p-3 shadow-soft-lg"
        >
          <div className="rounded-[2rem] bg-slate-25 p-4 ring-1 ring-slate-100">
            <p className="text-center text-[11px] font-medium text-slate-400">Today 8:12 AM</p>

            {/* SMS in */}
            <div className="mt-3 max-w-[85%] rounded-2xl rounded-bl-md bg-slate-200/70 px-3.5 py-2.5 text-[13px] leading-snug text-slate-700">
              Hi Sarah — your dose steps up today, as planned. Forty seconds on why:{' '}
              <span className="font-medium text-teal-700 underline decoration-teal-300 underline-offset-2">
                opera.care/s/sarah
              </span>
            </div>

            {/* The living plan card */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                  Your plan · updated
                </p>
                <span className="text-[10px] font-medium text-slate-400">Week 3 of 16</span>
              </div>
              <video
                className="aspect-video w-full object-cover"
                src={withBasePath('/medical-assets/medication/taking-pill-with-water.mp4')}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="px-4 py-3.5">
                <p className="text-[13px] font-medium leading-snug text-navy-900">
                  Your dose changes today — that was always the plan.
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
                  Next: nothing to do until your 3-month check. We’ll remind you the week of.
                </p>
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] font-medium text-slate-300">
              Reviewed by her care team · educational only
            </p>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
