'use client';

import { motion } from 'framer-motion';
import { Pill, ShieldCheck, HelpCircle } from 'lucide-react';
import { ClinicalVisualShell, type ClinicalVisualProps, ease, fadeUp, stagger, Chip } from './shell';

const BODY_PATH = 'M150 40 C150 90 150 110 150 130 C150 180 130 230 150 290';

export function MedicationJourneyVisual(props: ClinicalVisualProps) {
  return (
    <ClinicalVisualShell
      category="Medication"
      icon={Pill}
      {...props}
      title={props.title ?? 'Understanding your medication'}
      caption={
        props.caption ??
        'Knowing how to take your medication and what to watch for helps you feel confident — your care team is your guide for any changes.'
      }
    >
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-4">
          {/* body pathway */}
          <svg viewBox="0 0 300 320" className="h-auto max-h-[46vh] w-1/2">
            <defs>
              <radialGradient id="med-dot" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="#38bdf8" />
              </radialGradient>
            </defs>
            {/* simple body outline */}
            <g fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={3} strokeLinecap="round">
              <circle cx={150} cy={50} r={26} />
              <path d="M118 95 Q150 80 182 95 L188 200 Q150 215 112 200 Z" />
              <line x1={120} y1={120} x2={80} y2={185} />
              <line x1={180} y1={120} x2={220} y2={185} />
              <line x1={130} y1={205} x2={120} y2={295} />
              <line x1={170} y1={205} x2={180} y2={295} />
            </g>
            {/* pathway */}
            <path d={BODY_PATH} fill="none" stroke="#2fd0c0" strokeWidth={3} strokeDasharray="2 8" strokeLinecap="round" opacity={0.6} />
            {/* pill following the path */}
            <g>
              <rect x={-12} y={-6} width={24} height={12} rx={6} fill="url(#med-dot)">
                <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path={BODY_PATH} />
              </rect>
            </g>
          </svg>

          {/* pill organizer + questions */}
          <div className="w-1/2 space-y-3">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur"
            >
              <div className="mb-2 flex items-center gap-2">
                <Pill className="h-4 w-4 text-teal-300" />
                <p className="text-xs font-semibold text-white">Pill organizer</p>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-[9px] text-white/50">{d}</span>
                    <div className="mt-0.5 h-5 w-5 rounded-md border border-teal-300/30 bg-teal-400/15" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {['Any side effects?', 'Questions or concerns?'].map((q) => (
                <motion.div
                  key={q}
                  variants={fadeUp}
                  className="flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-400/10 px-3 py-1.5 backdrop-blur"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-sky-200" />
                  <span className="text-[11px] text-white/80">{q}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* safety banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.8 }}
          className="mt-3 flex items-center gap-2 rounded-xl border-2 border-teal-300/40 bg-teal-400/10 px-4 py-2.5 backdrop-blur"
        >
          <ShieldCheck className="h-5 w-5 shrink-0 text-teal-200" />
          <p className="text-sm font-semibold text-teal-50">
            Talk to your care team before changing medication.
          </p>
        </motion.div>

        <div className="mt-2 flex justify-center">
          <Chip tone="slate">Never start, stop, or change on your own</Chip>
        </div>
      </div>
    </ClinicalVisualShell>
  );
}
