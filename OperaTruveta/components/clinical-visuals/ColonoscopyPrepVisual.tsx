'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Car, MapPin, CheckCircle2 } from 'lucide-react';
import { ClinicalVisualShell, type ClinicalVisualProps, ease, fadeUp, stagger, Chip } from './shell';

const PREP_PATH = 'M60 70 C140 30 200 110 280 70 C360 30 420 110 500 70';
const STEPS = ['Day before', 'Evening', 'Morning of'];

export function ColonoscopyPrepVisual(props: ClinicalVisualProps) {
  return (
    <ClinicalVisualShell
      category="Procedure prep"
      icon={ClipboardList}
      {...props}
      title={props.title ?? 'Getting ready for your procedure'}
      caption={
        props.caption ??
        'Good preparation makes your procedure smoother. Follow the instructions you were given, and arrange a ride home ahead of time.'
      }
    >
      <div className="w-full max-w-xl">
        {/* prep timeline */}
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
          {STEPS.map((label, i) => {
            const x = 70 + (i * 460) / (STEPS.length - 1);
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

        {/* soft digestive-tract path */}
        <svg viewBox="0 0 560 120" className="mx-auto h-auto max-h-[20vh] w-full">
          <defs>
            <linearGradient id="prep-tube" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2fd0c0" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <motion.path
            d={PREP_PATH}
            fill="none"
            stroke="url(#prep-tube)"
            strokeWidth={16}
            strokeLinecap="round"
            opacity={0.85}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease, delay: 0.5 }}
          />
          <motion.path
            d={PREP_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease, delay: 0.5 }}
          />
          <circle r={7} fill="#fff">
            <animateMotion dur="6s" repeatCount="indefinite" path={PREP_PATH} />
          </circle>
        </svg>

        <motion.div
          className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {[
            { icon: CheckCircle2, title: 'Approved instructions', sub: 'Follow exactly as given' },
            { icon: Car, title: 'Ride / support', sub: 'Arrange a ride home' },
            { icon: MapPin, title: 'Procedure center arrival', sub: 'Know when & where' },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur"
            >
              <card.icon className="mb-1.5 h-4 w-4 text-teal-300" />
              <p className="text-xs font-semibold text-white">{card.title}</p>
              <p className="text-[11px] text-white/60">{card.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-2 flex justify-center">
          <Chip tone="slate">Follow the instructions from your care team</Chip>
        </div>
      </div>
    </ClinicalVisualShell>
  );
}
