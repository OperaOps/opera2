'use client';

import Link from 'next/link';
import {
  HeartHandshake,
  Megaphone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Video,
  MonitorSmartphone,
  MessageSquare,
  Mail,
} from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { SectionHeader } from '@/components/SectionHeader';
import { ValueCard } from '@/components/ValueCard';
import { AnimatedGradientPanel } from '@/components/AnimatedGradientPanel';
import { Reveal, RevealGroup } from '@/components/motion';
import { demoUseCases } from '@/lib/demoData';

const categories = Array.from(new Set(demoUseCases.map((u) => u.category)));
const departments = Array.from(new Set(demoUseCases.map((u) => u.department.split(' / ')[0])));
const languages = Array.from(
  new Set(demoUseCases.map((u) => u.patient.language.replace(/\s*\+.*/, '').trim())),
);

export default function HomePage() {
  return (
    <div className="space-y-24">
      <HeroSection />

      {/* What Opera adds — mission alignment */}
      <section>
        <Reveal>
          <SectionHeader
            eyebrow="Opera × Truveta"
            title="Turning real-world evidence into human understanding"
            description="Truveta understands patient journeys at scale. Opera is the layer that turns that approved, evidence-informed content into education a single patient actually feels — in their language, at their literacy level, ready to act on with their care team."
          />
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          <ValueCard
            icon={HeartHandshake}
            accent="teal"
            title="Made for one person"
            description="Warm, specific, plain-language education that meets each patient where they are."
          />
          <ValueCard
            icon={Megaphone}
            accent="blue"
            title="Evidence to action"
            description="Population-level evidence becomes a clear next step the patient can take with their team."
          />
          <ValueCard
            icon={ShieldCheck}
            accent="navy"
            title="Safe by default"
            description="Education only — source-transparent, never diagnosis, treatment advice, or risk prediction."
          />
        </RevealGroup>
      </section>

      {/* Versatility — works for any patient moment */}
      <section>
        <Reveal>
          <SectionHeader
            eyebrow="One engine, every patient moment"
            title="Drop it into any care journey Truveta touches"
            description="Screening, chronic care, oncology research, discharge, medications, genomics, language access — the same engine personalizes them all, then delivers to whatever channel the patient uses."
          />
        </Reveal>
        <Reveal className="mt-10">
          <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-soft backdrop-blur-xl sm:p-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-teal-50/70 px-3 py-1.5 text-sm font-medium text-teal-800"
                >
                  <Sparkles className="h-3.5 w-3.5 text-teal-500" />
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-7 grid gap-5 border-t border-slate-100 pt-7 sm:grid-cols-2 lg:grid-cols-4">
              <Stat value={`${demoUseCases.length}`} label="Patient journeys" />
              <Stat value={`${departments.length}`} label="Specialties" />
              <Stat value={`${languages.length}`} label="Languages" sub={languages.join(' · ')} />
              <div>
                <p className="text-2xl font-semibold tracking-tight text-navy-900">4</p>
                <p className="text-sm text-slate-500">Delivery channels</p>
                <div className="mt-2 flex gap-1.5 text-teal-500">
                  <Video className="h-4 w-4" />
                  <MonitorSmartphone className="h-4 w-4" />
                  <MessageSquare className="h-4 w-4" />
                  <Mail className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The line we won't cross */}
      <section>
        <Reveal>
          <AnimatedGradientPanel className="px-6 py-12 sm:px-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-teal-200">
                <Sparkles className="h-3.5 w-3.5" />
                The line we will not cross
              </div>
              <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Personalized — without becoming clinical decision support
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-white/70">
                Opera personalizes <span className="text-white">how</span> a patient understands
                their care — never <span className="text-white">what</span> their care should be.
                It prepares patients for a better conversation with the people who decide that.
              </p>
            </div>
          </AnimatedGradientPanel>
        </Reveal>
      </section>

      {/* CTA */}
      <section>
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-slate-200/70 bg-white/70 px-6 py-12 text-center shadow-soft backdrop-blur-xl">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
              See it on twelve real patient moments
            </h2>
            <p className="max-w-xl text-slate-500">
              Every demo is a synthetic patient with a personalized, narrated education video.
            </p>
            <Link
              href="/demo-library"
              className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-medium text-white shadow-soft transition-all hover:bg-navy-800 hover:shadow-soft-lg"
            >
              Open the demo library
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Stat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div>
      <p className="text-2xl font-semibold tracking-tight text-navy-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
      {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}
