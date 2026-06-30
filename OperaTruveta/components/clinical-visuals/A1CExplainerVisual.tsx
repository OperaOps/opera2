'use client';

import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';
import { ClinicalVisualShell, type ClinicalVisualProps, ease, fadeUp, stagger, Chip } from './shell';

const CELLS = [
  { cx: 70, cy: 90, r: 13 },
  { cx: 120, cy: 150, r: 16 },
  { cx: 90, cy: 210, r: 12 },
  { cx: 160, cy: 100, r: 14 },
  { cx: 175, cy: 200, r: 11 },
];

const GLUCOSE = [
  { cx: 95, cy: 130 },
  { cx: 140, cy: 175 },
  { cx: 60, cy: 165 },
  { cx: 150, cy: 130 },
  { cx: 110, cy: 95 },
  { cx: 185, cy: 160 },
];

export function A1CExplainerVisual(props: ClinicalVisualProps) {
  return (
    <ClinicalVisualShell
      category="Understanding A1C"
      icon={Droplets}
      {...props}
      title={props.title ?? 'What your A1C test looks at'}
      caption={
        props.caption ??
        'A1C gives a general picture of your average blood sugar over the past few months — your care team will go over your results with you.'
      }
    >
      <div className="w-full max-w-xl">
        <svg viewBox="0 0 600 320" className="h-auto max-h-[58vh] w-full">
          <defs>
            <linearGradient id="a1c-fill" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>

          {/* drifting cells + glucose */}
          <g>
            {CELLS.map((c, i) => (
              <motion.g
                key={`cell-${i}`}
                animate={{ x: [0, 8, -6, 0], y: [0, -6, 6, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
              >
                <circle cx={c.cx} cy={c.cy} r={c.r} fill="#fb7185" opacity={0.85} />
                <circle cx={c.cx} cy={c.cy} r={c.r * 0.45} fill="#9f1239" opacity={0.45} />
              </motion.g>
            ))}
            {GLUCOSE.map((g, i) => (
              <motion.circle
                key={`glu-${i}`}
                cx={g.cx}
                cy={g.cy}
                r={5}
                fill="#fbbf24"
                animate={{ x: [0, -10, 10, 0], y: [0, 8, -8, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </g>

          {/* vial */}
          <g transform="translate(300 40)">
            <rect x={0} y={0} width={70} height={210} rx={26} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={3} />
            <rect x={-10} y={-14} width={90} height={20} rx={9} fill="rgba(255,255,255,0.18)" />
            <clipPath id="a1c-clip">
              <rect x={4} y={4} width={62} height={202} rx={22} />
            </clipPath>
            <motion.rect
              x={4}
              width={62}
              fill="url(#a1c-fill)"
              clipPath="url(#a1c-clip)"
              initial={{ y: 206, height: 0 }}
              animate={{ y: 70, height: 136 }}
              transition={{ duration: 2.4, ease, delay: 0.4 }}
            />
            {/* surface shimmer */}
            <motion.ellipse
              cx={35}
              rx={31}
              ry={5}
              fill="rgba(255,255,255,0.3)"
              initial={{ cy: 206 }}
              animate={{ cy: 70 }}
              transition={{ duration: 2.4, ease, delay: 0.4 }}
            />
          </g>

          {/* timeline */}
          <g transform="translate(420 110)">
            <motion.line
              x1={0}
              y1={50}
              x2={150}
              y2={50}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={3}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease, delay: 1 }}
            />
            {[0, 50, 100, 150].map((x, i) => (
              <motion.circle
                key={x}
                cx={x}
                cy={50}
                r={6}
                fill="#38bdf8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease, delay: 1.2 + i * 0.2 }}
              />
            ))}
            <text x={75} y={86} textAnchor="middle" className="fill-white/70" fontSize={14}>
              past few months
            </text>
          </g>
        </svg>

        <motion.div
          className="mt-2 flex flex-wrap items-center justify-center gap-2"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Chip tone="teal">A1C gives a general view over time</Chip>
          </motion.div>
        </motion.div>
      </div>
    </ClinicalVisualShell>
  );
}
