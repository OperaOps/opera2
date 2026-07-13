'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Database, GitBranch } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal } from '@/components/motion';
import { persistenceCurve, reasonBreakdown } from '@/lib/loop';

const W = 560;
const H = 230;
const PAD = { l: 40, r: 24, t: 18, b: 30 };

function curvePath() {
  const n = persistenceCurve.length - 1;
  const x = (i: number) => PAD.l + (i / n) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + (1 - v / 100) * (H - PAD.t - PAD.b);
  return persistenceCurve
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(' ');
}

/**
 * The Truveta screen: the same persistence curve claims data already shows,
 * with the one variable claims can never contain — the stated reason,
 * captured at the moment of deviation.
 */
export function ReasonLayer() {
  return (
    <section>
      <Reveal>
        <SectionHeader
          eyebrow="The reason layer"
          title="A variable real-world evidence has never had"
          description="Claims and EHR data can show that half of patients leave a therapy by month six. They record the gap — never the cause. Every catch in the Loop attaches a patient-stated reason to the exact clinical event, longitudinally, at scale."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* What the record already shows */}
        <Reveal>
          <div className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              What the record already shows
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Six-month persistence, new oral therapy · synthetic cohort
            </p>
            <div className="mt-6 flex-1">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
                {[100, 75, 50].map((v) => {
                  const y = PAD.t + (1 - v / 100) * (H - PAD.t - PAD.b);
                  return (
                    <g key={v}>
                      <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 5" />
                      <text x={PAD.l - 8} y={y + 3.5} textAnchor="end" fontSize="10" fill="#94a3b8">
                        {v}%
                      </text>
                    </g>
                  );
                })}
                {persistenceCurve.map((_, i) => (
                  <text
                    key={i}
                    x={PAD.l + (i / (persistenceCurve.length - 1)) * (W - PAD.l - PAD.r)}
                    y={H - 8}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#94a3b8"
                  >
                    {i}mo
                  </text>
                ))}
                <motion.path
                  d={curvePath()}
                  fill="none"
                  stroke="#0e1a2e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.circle
                  cx={W - PAD.r}
                  cy={PAD.t + (1 - persistenceCurve[persistenceCurve.length - 1] / 100) * (H - PAD.t - PAD.b)}
                  r="4"
                  fill="#0e1a2e"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                />
              </svg>
            </div>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-25 px-4 py-3">
              <p className="font-mono text-[12.5px] text-navy-800">
                52% persistent at 6 months
              </p>
              <p className="mt-0.5 font-mono text-[12.5px] text-slate-400">
                discontinuation reason: <span className="text-rose-500">unknown</span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* What the Loop adds */}
        <Reveal delay={0.12}>
          <div className="flex h-full flex-col rounded-3xl border border-teal-200/60 bg-gradient-to-b from-teal-50/60 to-white p-6 shadow-soft sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-teal-700">
              What the Loop adds
            </p>
            <p className="mt-1 text-sm text-slate-500">
              The same discontinuations — with the stated reason attached
            </p>
            <div className="mt-6 flex-1 space-y-3.5">
              {reasonBreakdown.map((r, i) => (
                <div key={r.label}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-[13px] font-semibold text-navy-900">{r.label}</p>
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
              Each reason maps to a playbook that recovers journeys — and, in aggregate,
              answers questions pharma and health systems currently answer with guesswork.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-teal-500" /> De-identified & consented
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GitBranch className="h-4 w-4 text-teal-500" /> Aligned to the clinical event, not a survey window
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Database className="h-4 w-4 text-teal-500" /> Longitudinal by construction — it lives on the journey
          </span>
        </div>
      </Reveal>
    </section>
  );
}
