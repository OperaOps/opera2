'use client';

import { motion } from 'framer-motion';
import { Baby, CheckCircle2, Users } from 'lucide-react';
import { ClinicalVisualShell, type ClinicalVisualProps, ease, fadeUp, stagger, Chip } from './shell';

const TIMELINE = ['Check-in', 'Visit', 'Next steps'];
const CHECKLIST = ['Bring your questions', 'List your medications', 'Note how you’re feeling'];

export function PrenatalVisitVisual(props: ClinicalVisualProps) {
  return (
    <ClinicalVisualShell
      category="Prenatal visit"
      icon={Baby}
      {...props}
      title={props.title ?? 'Getting ready for your prenatal visit'}
      caption={
        props.caption ??
        'A little prep helps your prenatal visit go smoothly. Bring your questions, and feel free to bring someone with you for support.'
      }
    >
      <div className="w-full max-w-xl">
        {/* timeline */}
        <svg viewBox="0 0 600 70" className="h-auto max-h-[14vh] w-full">
          <line x1={70} y1={35} x2={530} y2={35} stroke="rgba(255,255,255,0.15)" strokeWidth={4} strokeLinecap="round" />
          <motion.line
            x1={70}
            y1={35}
            x2={530}
            y2={35}
            stroke="#2fd0c0"
            strokeWidth={4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease, delay: 0.4 }}
          />
          {TIMELINE.map((label, i) => {
            const x = 70 + (i * 460) / (TIMELINE.length - 1);
            return (
              <g key={label}>
                <motion.circle
                  cx={x}
                  cy={35}
                  r={9}
                  fill="#2fd0c0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, ease, delay: 0.7 + i * 0.45 }}
                />
                <text x={x} y={64} textAnchor="middle" className="fill-white/80" fontSize={13}>
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-3 flex items-stretch gap-3">
          {/* ultrasound concept card — abstract soft screen with gentle waves */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="relative w-1/2 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-sky-400/10 to-teal-400/5 p-3 backdrop-blur"
          >
            <p className="mb-2 text-xs font-semibold text-white">Ultrasound (concept)</p>
            <svg viewBox="0 0 200 90" className="h-auto w-full">
              {[0, 1, 2].map((i) => (
                <motion.path
                  key={i}
                  d={`M10 ${45 + i * 0} Q60 ${15 + i * 8} 100 45 T190 45`}
                  fill="none"
                  stroke="rgba(56,189,248,0.5)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  animate={{ opacity: [0.2, 0.7, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                />
              ))}
              <motion.line
                x1={10}
                x2={190}
                y1={45}
                y2={45}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth={1}
              />
            </svg>
          </motion.div>

          {/* notes-app checklist */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="w-1/2 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur"
          >
            <p className="mb-2 text-xs font-semibold text-white">Notes</p>
            <div className="space-y-1.5">
              {CHECKLIST.map((item) => (
                <motion.div key={item} variants={fadeUp} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-300" />
                  <span className="text-[11px] text-white/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* partner / caregiver card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.9 }}
          className="mt-3 flex items-center gap-2 rounded-xl border border-sky-300/25 bg-sky-400/10 px-4 py-2.5 backdrop-blur"
        >
          <Users className="h-4 w-4 shrink-0 text-sky-200" />
          <p className="text-xs text-white/85">A partner or caregiver is welcome to join and ask questions.</p>
        </motion.div>

        <div className="mt-2 flex justify-center">
          <Chip tone="slate">Your care team will guide each visit</Chip>
        </div>
      </div>
    </ClinicalVisualShell>
  );
}
