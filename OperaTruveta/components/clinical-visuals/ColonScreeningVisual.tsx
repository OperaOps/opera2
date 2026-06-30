'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { ClinicalVisualShell, type ClinicalVisualProps, ease, fadeUp, stagger, Chip } from './shell';

const COLON_PATH =
  'M70 250 C70 150 130 120 200 130 C280 142 240 220 300 235 C370 252 400 170 470 178 C540 186 540 270 470 280';

const LABELS = ['screening view', 'care team review', 'questions to ask'];

export function ColonScreeningVisual(props: ClinicalVisualProps) {
  return (
    <ClinicalVisualShell
      category="Colon screening"
      icon={Search}
      {...props}
      title={props.title ?? 'What a colon screening looks at'}
      caption={
        props.caption ??
        'A colon screening is a gentle, routine way to look at the lining of your colon — your care team reviews everything and walks you through any questions.'
      }
    >
      <div className="w-full max-w-xl">
        <svg viewBox="0 0 600 340" className="h-auto max-h-[58vh] w-full">
          <defs>
            <linearGradient id="cs-tube" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2fd0c0" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <radialGradient id="cs-dot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#2fd0c0" />
            </radialGradient>
          </defs>

          {/* soft glow underlay */}
          <motion.path
            d={COLON_PATH}
            fill="none"
            stroke="#2fd0c0"
            strokeWidth={34}
            strokeLinecap="round"
            opacity={0.12}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease }}
          />
          {/* main tube */}
          <motion.path
            d={COLON_PATH}
            fill="none"
            stroke="url(#cs-tube)"
            strokeWidth={20}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease }}
          />
          {/* inner highlight */}
          <motion.path
            d={COLON_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth={4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease }}
          />

          {/* gentle camera/device dot following the path */}
          <circle r={9} fill="url(#cs-dot)">
            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path={COLON_PATH} />
          </circle>
          <circle r={16} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5}>
            <animateMotion dur="6s" repeatCount="indefinite" path={COLON_PATH} />
          </circle>
        </svg>

        <motion.div
          className="mt-2 flex flex-wrap items-center justify-center gap-2"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {LABELS.map((label) => (
            <motion.div key={label} variants={fadeUp}>
              <Chip tone="teal">{label}</Chip>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ClinicalVisualShell>
  );
}
