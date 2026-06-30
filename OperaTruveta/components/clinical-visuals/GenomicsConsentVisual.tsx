'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Dna, ShieldCheck, FileText, Database } from 'lucide-react';
import { ClinicalVisualShell, type ClinicalVisualProps, ease, fadeUp, stagger, Chip } from './shell';

// Two offset sine paths form a simple double-helix.
const HELIX_A = 'M40 20 Q90 70 40 120 Q-10 170 40 220';
const HELIX_B = 'M40 20 Q-10 70 40 120 Q90 170 40 220';

export function GenomicsConsentVisual(props: ClinicalVisualProps) {
  const [deidentified, setDeidentified] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setDeidentified((v) => !v), 3000);
    return () => clearInterval(id);
  }, []);

  const identifiers = ['Name', 'DOB', 'ID'];

  return (
    <ClinicalVisualShell
      category="Research consent"
      icon={Dna}
      {...props}
      title={props.title ?? 'How your data helps research'}
      caption={
        props.caption ??
        'If you choose to take part, your information is de-identified before it’s used for research — your privacy is protected, and the choice is always yours.'
      }
    >
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-4">
          {/* DNA double helix */}
          <svg viewBox="0 0 80 240" className="h-auto max-h-[46vh] w-24 shrink-0">
            <motion.path
              d={HELIX_A}
              fill="none"
              stroke="#2fd0c0"
              strokeWidth={4}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease }}
            />
            <motion.path
              d={HELIX_B}
              fill="none"
              stroke="#38bdf8"
              strokeWidth={4}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease, delay: 0.2 }}
            />
            {/* rungs */}
            {[40, 75, 110, 145, 180, 215].map((y, i) => {
              const spread = Math.abs(Math.sin((y / 240) * Math.PI * 2)) * 40 + 6;
              return (
                <motion.line
                  key={y}
                  x1={40 - spread / 2}
                  x2={40 + spread / 2}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth={2.5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
                />
              );
            })}
          </svg>

          <div className="flex-1 space-y-3">
            {/* consent form card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur"
            >
              <div className="mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-teal-300" />
                <p className="text-xs font-semibold text-white">Consent form</p>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-white/15" />
                <div className="h-1.5 w-4/5 rounded-full bg-white/15" />
                <div className="h-1.5 w-3/5 rounded-full bg-white/15" />
              </div>
            </motion.div>

            {/* patient card: identifiers fade to dots */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur"
            >
              <p className="mb-2 text-xs font-semibold text-white">Your record</p>
              <div className="space-y-1.5">
                {identifiers.map((field) => (
                  <div key={field} className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-white/60">{field}</span>
                    <div className="relative h-4 w-24 overflow-hidden">
                      <motion.span
                        className="absolute inset-0 flex items-center justify-end text-[11px] font-medium text-white/85"
                        animate={{ opacity: deidentified ? 0 : 1 }}
                        transition={{ duration: 0.6, ease }}
                      >
                        •••• ••
                      </motion.span>
                      <motion.span
                        className="absolute inset-0 flex items-center justify-end gap-1"
                        animate={{ opacity: deidentified ? 1 : 0 }}
                        transition={{ duration: 0.6, ease }}
                      >
                        {[0, 1, 2, 3].map((d) => (
                          <span key={d} className="h-1.5 w-1.5 rounded-full bg-teal-300/70" />
                        ))}
                      </motion.span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* research contribution pathway */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.5 }}
            className="flex items-center gap-2 rounded-xl border-2 border-teal-300/40 bg-teal-400/10 px-3 py-2 backdrop-blur"
          >
            <ShieldCheck className="h-4 w-4 text-teal-200" />
            <span className="text-[11px] font-semibold text-teal-50">De-identified data</span>
          </motion.div>

          <svg viewBox="0 0 60 20" className="h-5 w-12 shrink-0">
            <motion.path
              d="M4 10 H44"
              stroke="#2fd0c0"
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.9 }}
            />
            <path d="M40 4 L52 10 L40 16" fill="none" stroke="#2fd0c0" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            <circle r={3} fill="#fff">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M4 10 H44" />
            </circle>
          </svg>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 1 }}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur"
          >
            <Database className="h-4 w-4 text-sky-200" />
            <span className="text-[11px] font-semibold text-white">Research database</span>
          </motion.div>
        </div>

        <motion.div
          className="mt-3 flex justify-center"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Chip tone="slate">Your privacy is protected — the choice is yours</Chip>
          </motion.div>
        </motion.div>
      </div>
    </ClinicalVisualShell>
  );
}
