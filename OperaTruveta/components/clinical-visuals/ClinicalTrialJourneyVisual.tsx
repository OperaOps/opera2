'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Users, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ClinicalVisualShell, type ClinicalVisualProps, ease, fadeUp, stagger, Chip } from './shell';

const STEPS = ['Learn', 'Ask', 'Consent review', 'Decide', 'Optional participation'];

export function ClinicalTrialJourneyVisual(props: ClinicalVisualProps) {
  return (
    <ClinicalVisualShell
      category="Research journey"
      icon={ClipboardList}
      {...props}
      title={props.title ?? 'Learning about a research study'}
      caption={
        props.caption ??
        'Taking part in research is always your choice. You can learn, ask questions, and review the consent before deciding — at your own pace, with support.'
      }
    >
      <div className="w-full max-w-xl">
        <svg viewBox="0 0 600 150" className="h-auto max-h-[26vh] w-full">
          {/* progress line */}
          <line x1={50} y1={60} x2={550} y2={60} stroke="rgba(255,255,255,0.15)" strokeWidth={4} strokeLinecap="round" />
          <motion.line
            x1={50}
            y1={60}
            x2={550}
            y2={60}
            stroke="#2fd0c0"
            strokeWidth={4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease, delay: 0.4 }}
          />
          {STEPS.map((step, i) => {
            const x = 50 + (i * 500) / (STEPS.length - 1);
            return (
              <g key={step}>
                <motion.circle
                  cx={x}
                  cy={60}
                  r={11}
                  fill="#0b1220"
                  stroke="#2fd0c0"
                  strokeWidth={3}
                  initial={{ scale: 0, fill: '#0b1220' }}
                  animate={{ scale: 1, fill: '#2fd0c0' }}
                  transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.55 }}
                />
                <motion.text
                  x={x}
                  y={i % 2 === 0 ? 36 : 96}
                  textAnchor="middle"
                  className="fill-white/80"
                  fontSize={13}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.55 }}
                >
                  {step}
                </motion.text>
              </g>
            );
          })}
        </svg>

        <motion.div
          className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
            <Users className="mb-1.5 h-4 w-4 text-teal-300" />
            <p className="text-xs font-semibold text-white">Study coordinator</p>
            <p className="text-[11px] text-white/60">Here to answer questions</p>
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
            <HeartHandshake className="mb-1.5 h-4 w-4 text-sky-300" />
            <p className="text-xs font-semibold text-white">Caregiver support</p>
            <p className="text-[11px] text-white/60">Bring someone you trust</p>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.7, rotate: -8 },
              show: { opacity: 1, scale: 1, rotate: -4, transition: { duration: 0.5, ease, delay: 0.4 } },
            }}
            className="flex items-center gap-2 rounded-xl border-2 border-teal-300/50 bg-teal-400/10 p-3 backdrop-blur"
          >
            <ShieldCheck className="h-5 w-5 text-teal-200" />
            <p className="text-xs font-bold uppercase tracking-wide text-teal-100">Voluntary participation</p>
          </motion.div>
        </motion.div>

        <div className="mt-2 flex justify-center">
          <Chip tone="slate">Always your choice</Chip>
        </div>
      </div>
    </ClinicalVisualShell>
  );
}
