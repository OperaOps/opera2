'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Home, Building2, Pill, CalendarClock, Phone } from 'lucide-react';
import { ClinicalVisualShell, type ClinicalVisualProps, ease, fadeUp, stagger, Chip } from './shell';

const TIMELINE = ['Day 1', 'Week 1', 'Follow-up'];

export function DischargeRecoveryVisual(props: ClinicalVisualProps) {
  const [atHome, setAtHome] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setAtHome((v) => !v), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <ClinicalVisualShell
      category="Recovery"
      icon={Home}
      {...props}
      title={props.title ?? 'Your recovery at home'}
      caption={
        props.caption ??
        'Going home is a big step. A simple plan helps you recover comfortably — and your care team is just a call away if anything comes up.'
      }
    >
      <div className="w-full max-w-xl">
        {/* hospital -> home transition */}
        <div className="relative mx-auto flex h-28 items-center justify-center">
          <AnimatePresence mode="wait">
            {atHome ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.7, ease }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-teal-300/40 bg-teal-400/10">
                  <Home className="h-9 w-9 text-teal-200" />
                </div>
                <span className="text-xs font-medium text-white/75">Home</span>
              </motion.div>
            ) : (
              <motion.div
                key="hospital"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.7, ease }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-sky-300/40 bg-sky-400/10">
                  <Building2 className="h-9 w-9 text-sky-200" />
                </div>
                <span className="text-xs font-medium text-white/75">Hospital</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* recovery timeline */}
        <svg viewBox="0 0 600 90" className="h-auto max-h-[18vh] w-full">
          <line x1={70} y1={45} x2={530} y2={45} stroke="rgba(255,255,255,0.15)" strokeWidth={4} strokeLinecap="round" />
          <motion.line
            x1={70}
            y1={45}
            x2={530}
            y2={45}
            stroke="#2fd0c0"
            strokeWidth={4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease, delay: 0.4 }}
          />
          {TIMELINE.map((label, i) => {
            const x = 70 + (i * 460) / (TIMELINE.length - 1);
            return (
              <g key={label}>
                <motion.circle
                  cx={x}
                  cy={45}
                  r={10}
                  fill="#2fd0c0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.45, ease, delay: 0.7 + i * 0.5 }}
                />
                <text x={x} y={80} textAnchor="middle" className="fill-white/80" fontSize={14}>
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        <motion.div
          className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {[
            { icon: Pill, title: 'Medication review', sub: 'Know your routine' },
            { icon: CalendarClock, title: 'Follow-up appointment', sub: 'Keep the date set' },
            { icon: Phone, title: 'Care team contact', sub: 'Call your team if…' },
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
          <Chip tone="slate">Call your team if anything feels off</Chip>
        </div>
      </div>
    </ClinicalVisualShell>
  );
}
