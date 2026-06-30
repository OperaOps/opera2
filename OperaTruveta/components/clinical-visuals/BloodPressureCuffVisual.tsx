'use client';

import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';
import { ClinicalVisualShell, type ClinicalVisualProps, ease, fadeUp, stagger, Chip } from './shell';

const isSpanish = (language?: string) => Boolean(language && /span|español|espanol/i.test(language));

export function BloodPressureCuffVisual(props: ClinicalVisualProps) {
  const es = isSpanish(props.language);
  const t = {
    cuff: es ? 'Brazalete' : 'Cuff',
    pulse: es ? 'Pulso' : 'Pulse',
    reading: es ? 'Lectura' : 'Reading',
  };

  return (
    <ClinicalVisualShell
      category="Blood pressure"
      icon={Gauge}
      {...props}
      title={props.title ?? 'How a blood pressure check works'}
      caption={
        props.caption ??
        'A soft cuff gently inflates around your arm to take a quick reading — it only takes a moment, and your care team will explain what your numbers mean.'
      }
    >
      <div className="w-full max-w-xl">
        <svg viewBox="0 0 600 320" className="h-auto max-h-[58vh] w-full">
          <defs>
            <linearGradient id="bp-arm" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e9d9c8" />
              <stop offset="100%" stopColor="#d9c2ab" />
            </linearGradient>
            <linearGradient id="bp-cuff" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2fd0c0" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* arm */}
          <rect x={40} y={120} width={300} height={70} rx={35} fill="url(#bp-arm)" opacity={0.9} />
          {/* hand hint */}
          <circle cx={355} cy={155} r={28} fill="url(#bp-arm)" opacity={0.9} />

          {/* cuff that inflates / squeezes */}
          <motion.g
            style={{ transformOrigin: '180px 155px' }}
            animate={{ scaleY: [1, 0.86, 1], scaleX: [1, 1.03, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x={120} y={104} width={120} height={102} rx={18} fill="url(#bp-cuff)" opacity={0.92} />
            <rect x={120} y={104} width={120} height={102} rx={18} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
            <line x1={140} y1={104} x2={140} y2={206} stroke="rgba(255,255,255,0.25)" strokeWidth={2} />
            <line x1={220} y1={104} x2={220} y2={206} stroke="rgba(255,255,255,0.25)" strokeWidth={2} />
          </motion.g>
          <text x={180} y={232} textAnchor="middle" className="fill-white/75" fontSize={14}>
            {t.cuff}
          </text>

          {/* pulse / ECG-ish line */}
          <g transform="translate(40 250)">
            <text x={0} y={-2} className="fill-white/70" fontSize={13}>
              {t.pulse}
            </text>
            <motion.path
              d="M0 20 L40 20 L52 4 L64 36 L78 20 L120 20 L132 6 L144 34 L158 20 L200 20 L212 4 L224 36 L238 20 L290 20"
              fill="none"
              stroke="#2fd0c0"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>

          {/* gauge: semicircle + needle, no zones / no interpretation */}
          <g transform="translate(470 200)">
            <path d="M-80 0 A80 80 0 0 1 80 0" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={14} strokeLinecap="round" />
            {[-80, -55, -25, 0, 25, 55, 80].map((x, i) => {
              const angle = Math.atan2(0, x);
              void angle;
              return <circle key={i} cx={x * 0.78} cy={-Math.sqrt(Math.max(0, 80 * 80 - (x * 0.78) ** 2)) * 0.78} r={2.5} fill="rgba(255,255,255,0.4)" />;
            })}
            <motion.line
              x1={0}
              y1={0}
              x2={0}
              y2={-66}
              stroke="#38bdf8"
              strokeWidth={4}
              strokeLinecap="round"
              style={{ transformOrigin: '0px 0px' }}
              initial={{ rotate: -78 }}
              animate={{ rotate: -22 }}
              transition={{ duration: 2.2, ease, delay: 0.6 }}
            />
            <circle cx={0} cy={0} r={7} fill="#fff" />
            <text x={0} y={34} textAnchor="middle" className="fill-white/75" fontSize={14}>
              {t.reading}
            </text>
          </g>
        </svg>

        <motion.div
          className="mt-1 flex flex-wrap items-center justify-center gap-2"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {[t.cuff, t.pulse, t.reading].map((label) => (
            <motion.div key={label} variants={fadeUp}>
              <Chip tone="teal">{label}</Chip>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ClinicalVisualShell>
  );
}
