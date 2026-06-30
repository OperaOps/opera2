'use client';

import { motion } from 'framer-motion';
import { FlaskConical, Search } from 'lucide-react';
import { ClinicalVisualShell, type ClinicalVisualProps, ease, fadeUp, stagger, Chip } from './shell';

export function LabProcessVisual(props: ClinicalVisualProps) {
  return (
    <ClinicalVisualShell
      category="Lab test"
      icon={FlaskConical}
      {...props}
      title={props.title ?? 'What happens to your lab sample'}
      caption={
        props.caption ??
        'Your sample goes to a lab where it’s carefully analyzed. A report comes back to your care team, who will walk you through what the test looks at.'
      }
    >
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between gap-2">
          {/* 1. sample vial */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 60 120" className="h-28 w-auto">
              <rect x={16} y={6} width={28} height={108} rx={12} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2.5} />
              <rect x={10} y={-2} width={40} height={12} rx={5} fill="rgba(255,255,255,0.2)" />
              <motion.rect
                x={18}
                width={24}
                rx={9}
                fill="#fb7185"
                initial={{ y: 112, height: 0 }}
                animate={{ y: 60, height: 52 }}
                transition={{ duration: 1.6, ease, delay: 0.3 }}
              />
            </svg>
            <span className="text-[11px] text-white/70">Sample</span>
          </motion.div>

          <Arrow delay={0.6} />

          {/* 2. lab machine with scanning sweep */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease, delay: 0.8 } } }}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-2"
          >
            <div className="relative h-28 w-32 overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur">
              <div className="absolute inset-x-3 top-3 h-1.5 rounded-full bg-white/15" />
              <div className="absolute inset-x-3 top-7 h-1.5 w-1/2 rounded-full bg-white/15" />
              <FlaskConical className="absolute bottom-3 right-3 h-6 w-6 text-teal-300/70" />
              <motion.div
                className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-teal-300/30 to-transparent"
                animate={{ x: ['-64px', '128px'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <span className="text-[11px] text-white/70">Lab analysis</span>
          </motion.div>

          <Arrow delay={1.4} />

          {/* 3. report card with abstract blurred values */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 1.6 } } }}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-2"
          >
            <div className="relative h-28 w-28 rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur">
              <div className="mb-2 h-2 w-12 rounded-full bg-teal-300/50" />
              {[0, 1, 2].map((i) => (
                <div key={i} className="mb-1.5 flex items-center justify-between">
                  <div className="h-1.5 w-10 rounded-full bg-white/20" />
                  <div className="h-1.5 w-6 rounded-full bg-white/30 blur-[2px]" />
                </div>
              ))}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-3 -bottom-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-navy-900/70 backdrop-blur"
                animate={{ x: [0, -36, 0], y: [0, -22, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Search className="h-5 w-5 text-sky-200" />
              </motion.div>
            </div>
            <span className="text-[11px] text-white/70">Report</span>
          </motion.div>
        </div>

        <motion.div
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Chip tone="teal">what this test looks at</Chip>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Chip tone="slate">Questions for your care team</Chip>
          </motion.div>
        </motion.div>
      </div>
    </ClinicalVisualShell>
  );
}

function Arrow({ delay }: { delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 40 20"
      className="h-5 w-10 shrink-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.path
        d="M2 10 H30"
        stroke="#2fd0c0"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease, delay }}
      />
      <path d="M28 4 L38 10 L28 16" fill="none" stroke="#2fd0c0" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}
