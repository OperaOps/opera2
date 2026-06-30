'use client';

/**
 * clinicalScenes — the real-world clinical / treatment visual layer.
 *
 * Calm, NON-GRAPHIC medical-explainer scenes drawn entirely in code (SVG + Framer
 * Motion): simplified anatomy, procedure pathways, devices, scans, sample collection,
 * medication pathways, research visits, recovery timelines, care settings, and patient
 * experience. No gore, no surgery footage, no result interpretation, no recommendations.
 *
 * These blend WITH the personalized UI scenes (sceneVisuals.tsx) inside MockVideoPlayer.
 */

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  ScanLine,
  Home,
  Users,
  Activity,
  Microscope,
  Building2,
  HeartPulse,
  ClipboardList,
  Droplets,
  Dna,
  type LucideIcon,
} from 'lucide-react';
import type { ClinicalVisualCategory, ClinicalVisualPlan, DemoUseCase } from '@/lib/types';
import { cn } from '@/lib/utils';

export interface ClinicalSceneProps {
  plan: ClinicalVisualPlan;
  useCase?: DemoUseCase;
}

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORY_LABEL: Record<ClinicalVisualCategory, string> = {
  anatomy: 'Anatomy',
  'procedure-walkthrough': 'Procedure walkthrough',
  'medical-device': 'Medical device',
  'care-setting': 'Care setting',
  'patient-experience': 'Patient experience',
  'mechanism-of-action': 'How it works',
  'sample-collection': 'Sample collection',
  'imaging-scan': 'Imaging / scan',
  'recovery-home-care': 'Recovery at home',
  'research-visit': 'Research visit',
  'cellular-flow': 'In your blood',
  'dna-genomics': 'DNA & genomics',
};

const CATEGORY_ICON: Record<ClinicalVisualCategory, LucideIcon> = {
  anatomy: HeartPulse,
  'procedure-walkthrough': Activity,
  'medical-device': Stethoscope,
  'care-setting': Building2,
  'patient-experience': Users,
  'mechanism-of-action': Microscope,
  'sample-collection': FlaskConical,
  'imaging-scan': ScanLine,
  'recovery-home-care': Home,
  'research-visit': ClipboardList,
  'cellular-flow': Droplets,
  'dna-genomics': Dna,
};

/* ------------------------------------------------------------------------- shell */

function ClinicalShell({
  plan,
  children,
}: {
  plan: ClinicalVisualPlan;
  children: React.ReactNode;
}) {
  const Icon = CATEGORY_ICON[plan.visualCategory];
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-1/3 h-64 w-64 rounded-full bg-teal-400/12 blur-3xl"
        animate={{ x: [0, 26, 0], y: [0, -18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* header row */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-teal-200 backdrop-blur">
          <Icon className="h-3.5 w-3.5" />
          {CATEGORY_LABEL[plan.visualCategory]}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/60 backdrop-blur">
          <ShieldCheck className="h-3 w-3" />
          Educational illustration
        </span>
      </div>

      {/* visual stage */}
      <div className="relative z-10 flex flex-1 items-center justify-center py-3">{children}</div>

      {/* headline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <p className="text-balance text-lg font-semibold leading-snug text-white sm:text-xl">
          {plan.realWorldConceptShown}
        </p>
      </motion.div>
    </div>
  );
}

/* ====================================================================== 1. anatomy */

const COLON_PATH =
  'M40,150 C40,70 110,60 140,90 C170,120 110,150 150,150 C200,150 200,60 250,70 C300,80 290,150 330,150 C370,150 380,80 360,50';

export function AnatomyExplainerScene({ plan }: ClinicalSceneProps) {
  return (
    <ClinicalShell plan={plan}>
      <svg viewBox="0 0 400 190" className="h-full max-h-[180px] w-full">
        <path d={COLON_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="20" strokeLinecap="round" />
        <motion.path
          d={COLON_PATH}
          fill="none"
          stroke="url(#anatGrad)"
          strokeWidth="20"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease }}
        />
        <defs>
          <linearGradient id="anatGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2fd0c0" />
            <stop offset="100%" stopColor="#5772a3" />
          </linearGradient>
        </defs>
        {[
          { x: 60, y: 150, t: 'Lower' },
          { x: 200, y: 150, t: 'Middle' },
          { x: 350, y: 60, t: 'Upper' },
        ].map((l, i) => (
          <motion.g
            key={l.t}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.3 }}
          >
            <circle cx={l.x} cy={l.y} r="3.5" fill="#67e6d7" />
            <text x={l.x} y={l.y + 20} fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">
              {l.t}
            </text>
          </motion.g>
        ))}
      </svg>
    </ClinicalShell>
  );
}

/* ===================================================== 2. procedure walkthrough */

export function ProcedureWalkthroughScene({ plan }: ClinicalSceneProps) {
  return (
    <ClinicalShell plan={plan}>
      <svg viewBox="0 0 400 190" className="h-full max-h-[180px] w-full">
        <path d={COLON_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="22" strokeLinecap="round" />
        <path d={COLON_PATH} fill="none" stroke="rgba(47,208,192,0.25)" strokeWidth="3" strokeDasharray="3 7" />
        {/* traveling soft "camera" light */}
        <motion.circle r="9" fill="#67e6d7">
          <animateMotion dur="3.6s" repeatCount="indefinite" path={COLON_PATH} rotate="auto" />
        </motion.circle>
        <motion.circle r="20" fill="rgba(103,230,215,0.25)">
          <animateMotion dur="3.6s" repeatCount="indefinite" path={COLON_PATH} />
        </motion.circle>
      </svg>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-16 left-6 text-xs text-white/55"
      >
        A small, flexible camera gently follows the pathway — calm and simplified.
      </motion.p>
    </ClinicalShell>
  );
}

/* ============================================================= 3. medical device */

export function MedicalDeviceScene({ plan }: ClinicalSceneProps) {
  return (
    <ClinicalShell plan={plan}>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease }}
          className="flex items-center gap-5 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 ring-1 ring-white/10"
          >
            <Stethoscope className="h-10 w-10 text-teal-300" />
            <motion.span
              className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-teal-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>
          <div className="space-y-2">
            {['Simple to use', 'Quick & comfortable', 'Done by your care team'].map((t, i) => (
              <motion.p
                key={t}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.18 }}
                className="flex items-center gap-2 text-sm text-white/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                {t}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </ClinicalShell>
  );
}

/* ========================================================== 4. sample collection */

export function SampleCollectionScene({ plan }: ClinicalSceneProps) {
  return (
    <ClinicalShell plan={plan}>
      <div className="flex items-end gap-6">
        {/* falling drop */}
        <div className="relative h-28 w-10">
          <motion.span
            className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-teal-300"
            animate={{ y: [0, 60], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeIn' }}
          />
        </div>
        {/* vial */}
        <div className="relative h-36 w-16 overflow-hidden rounded-b-2xl rounded-t-md border-2 border-white/25 bg-white/5">
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-500 to-teal-400"
            initial={{ height: '0%' }}
            animate={{ height: '62%' }}
            transition={{ duration: 2.4, ease }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-2 bg-white/20"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ bottom: '60%' }}
          />
          <span className="absolute left-0 right-0 top-1.5 mx-auto h-1 w-10 rounded bg-white/30" />
        </div>
        <motion.p
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="max-w-[10rem] text-sm leading-relaxed text-white/70"
        >
          A small sample is all that’s needed — quick and routine.
        </motion.p>
      </div>
    </ClinicalShell>
  );
}

/* =========================================================== 5. imaging / scan */

export function ImagingExperienceScene({ plan }: ClinicalSceneProps) {
  return (
    <ClinicalShell plan={plan}>
      <div className="relative h-36 w-full max-w-md">
        {/* bore */}
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-[14px] border-navy-600 bg-navy-950" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-teal-400/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ borderTopColor: '#2fd0c0' }}
        />
        {/* table sliding in */}
        <motion.div
          className="absolute top-1/2 h-4 w-40 -translate-y-1/2 rounded-full bg-gradient-to-r from-slate-200 to-slate-400"
          initial={{ left: '-20%' }}
          animate={{ left: ['-20%', '34%', '-20%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-navy-700" />
        </motion.div>
        {/* scan sweep */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-32 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-teal-300/70"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-16 left-6 text-xs text-white/55"
      >
        You lie still while the table moves gently through the scanner.
      </motion.p>
    </ClinicalShell>
  );
}

/* ====================================================== 6. medication pathway */

export function MedicationPathwayScene({ plan }: ClinicalSceneProps) {
  return (
    <ClinicalShell plan={plan}>
      <div className="relative h-32 w-full max-w-md">
        {/* pill */}
        <motion.div
          className="absolute left-2 top-1/2 flex h-9 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-sky-400 text-navy-900"
          animate={{ x: [0, 120, 240] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Pill className="h-4 w-4" />
        </motion.div>
        {/* simplified body outline */}
        <svg viewBox="0 0 120 130" className="absolute right-0 top-1/2 h-28 -translate-y-1/2">
          <path
            d="M60,8 a14,14 0 1,0 0.1,0 M60,34 C40,40 38,70 44,100 L52,100 L54,72 L66,72 L68,100 L76,100 C82,70 80,40 60,34"
            fill="rgba(103,230,215,0.12)"
            stroke="rgba(103,230,215,0.5)"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="60"
            cy="58"
            r="5"
            fill="#67e6d7"
            animate={{ opacity: [0.2, 1, 0.2], r: [4, 7, 4] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
          />
        </svg>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-16 left-6 max-w-xs text-xs text-white/55"
      >
        A general idea of how a medication works — never a reason to change anything on
        your own.
      </motion.p>
    </ClinicalShell>
  );
}

/* ======================================================= 7. clinical trial visit */

export function ClinicalTrialVisitScene({ plan }: ClinicalSceneProps) {
  const visits = ['Screening', 'Visit 1', 'Visit 2', 'Follow-up'];
  return (
    <ClinicalShell plan={plan}>
      <div className="w-full max-w-md">
        <div className="flex items-center">
          {visits.map((v, i) => (
            <div key={v} className="flex flex-1 items-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.35, type: 'spring', stiffness: 300, damping: 18 }}
                className="flex flex-col items-center"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-teal-400 bg-teal-400/15 text-xs font-semibold text-teal-200">
                  {i + 1}
                </span>
                <span className="mt-1.5 w-16 text-center text-[10px] text-white/65">{v}</span>
              </motion.div>
              {i < visits.length - 1 && (
                <div className="relative mx-1 h-px flex-1 bg-white/15">
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-teal-400"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5 + i * 0.35, duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 1.3, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ delay: 1.6, type: 'spring', stiffness: 220, damping: 14 }}
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg border-2 border-teal-300/50 bg-teal-400/10 px-3 py-1.5 text-xs font-semibold text-teal-100"
        >
          <ShieldCheck className="h-4 w-4" />
          Participation is always voluntary
        </motion.div>
      </div>
    </ClinicalShell>
  );
}

/* ======================================================= 8. recovery at home */

export function RecoveryAtHomeScene({ plan }: ClinicalSceneProps) {
  const steps = ['Day 1 · Rest', 'Week 1 · Gentle activity', 'Follow-up · Check in'];
  return (
    <ClinicalShell plan={plan}>
      <div className="flex w-full max-w-md items-center gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease }}
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10"
        >
          <Home className="h-9 w-9 text-teal-300" />
        </motion.div>
        <ol className="flex-1 space-y-2.5">
          {steps.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.25 }}
              className="flex items-center gap-2.5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-400 text-[11px] font-semibold text-navy-900">
                {i + 1}
              </span>
              <span className="text-sm text-white/80">{s}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </ClinicalShell>
  );
}

/* ============================================================ 9. care setting */

export function CareSettingScene({ plan }: ClinicalSceneProps) {
  return (
    <ClinicalShell plan={plan}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease }}
        className="relative h-32 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-navy-700/40 to-navy-900/40"
      >
        {/* window */}
        <div className="absolute right-6 top-5 h-12 w-16 rounded-md border border-white/15 bg-sky-400/10" />
        {/* soft light */}
        <motion.div
          className="absolute right-2 top-2 h-20 w-20 rounded-full bg-teal-300/15 blur-2xl"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {/* chair */}
        <div className="absolute bottom-4 left-8 h-10 w-8 rounded-t-lg border border-white/15 bg-white/5" />
        <div className="absolute bottom-4 left-7 h-2 w-10 rounded bg-white/10" />
        {/* plant */}
        <div className="absolute bottom-4 right-10 h-8 w-1.5 bg-teal-400/40" />
        <motion.div
          className="absolute bottom-10 right-8 h-4 w-4 rounded-full bg-teal-400/50"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <p className="absolute bottom-3 right-4 text-[10px] text-white/40">A calm, supportive space</p>
      </motion.div>
    </ClinicalShell>
  );
}

/* ====================================================== 10. patient experience */

export function PatientExperienceScene({ plan }: ClinicalSceneProps) {
  const steps = ['You arrive & check in', 'You talk with your team', 'You leave with a plan'];
  return (
    <ClinicalShell plan={plan}>
      <div className="flex w-full max-w-md items-center gap-6">
        {/* person */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease }}
          className="flex flex-col items-center"
        >
          <span className="h-8 w-8 rounded-full bg-teal-300" />
          <span className="mt-1 h-12 w-14 rounded-t-2xl bg-teal-400/60" />
        </motion.div>
        <ol className="flex-1 space-y-2.5">
          {steps.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.25 }}
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur"
            >
              <HeartPulse className="h-4 w-4 text-teal-300" />
              <span className="text-sm text-white/80">{s}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </ClinicalShell>
  );
}

/* =================================================== 11. cellular / blood flow */

export function CellularFlowScene({ plan }: ClinicalSceneProps) {
  // Simplified cells + glucose dots drifting through a vessel. General, not a result.
  const cells = Array.from({ length: 6 });
  const glucose = Array.from({ length: 8 });
  return (
    <ClinicalShell plan={plan}>
      <div className="relative h-28 w-full max-w-md overflow-hidden rounded-full border border-white/10 bg-white/5">
        {cells.map((_, i) => (
          <motion.span
            key={`c${i}`}
            className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-rose-300/70 ring-2 ring-rose-200/40"
            initial={{ left: '-12%' }}
            animate={{ left: ['-12%', '110%'] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.5, ease: 'linear' }}
            style={{ top: `${30 + (i % 3) * 18}%` }}
          />
        ))}
        {glucose.map((_, i) => (
          <motion.span
            key={`g${i}`}
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-amber-300"
            initial={{ left: '-8%' }}
            animate={{ left: ['-8%', '110%'] }}
            transition={{ duration: 3.5 + (i % 4) * 0.6, repeat: Infinity, delay: i * 0.35, ease: 'linear' }}
            style={{ top: `${22 + (i % 5) * 14}%` }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-white/70">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-rose-300/70" /> Red blood cells
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" /> Sugar (glucose)
        </span>
      </div>
    </ClinicalShell>
  );
}

/* ========================================================= 12. DNA / genomics */

export function DnaStrandScene({ plan }: ClinicalSceneProps) {
  const rungs = Array.from({ length: 9 });
  return (
    <ClinicalShell plan={plan}>
      <div className="flex items-center gap-7">
        <svg viewBox="0 0 120 160" className="h-36 w-24">
          <defs>
            <linearGradient id="dnaA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2fd0c0" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <motion.path
            d="M30,10 C90,40 90,60 30,90 C-30,120 -30,140 30,150"
            fill="none"
            stroke="url(#dnaA)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease }}
          />
          <motion.path
            d="M90,10 C30,40 30,60 90,90 C150,120 150,140 90,150"
            fill="none"
            stroke="url(#dnaA)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.1 }}
          />
          {rungs.map((_, i) => (
            <motion.line
              key={i}
              x1={i % 2 ? 38 : 36}
              x2={i % 2 ? 84 : 82}
              y1={18 + i * 15}
              y2={18 + i * 15}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            />
          ))}
        </svg>

        {/* de-identification: name fades to dots */}
        <div className="space-y-2">
          <motion.div
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80"
            animate={{ opacity: [1, 1, 0.15, 0.15, 1] }}
            transition={{ duration: 5, repeat: Infinity, times: [0, 0.35, 0.5, 0.85, 1] }}
          >
            Name · DOB · ID
          </motion.div>
          <motion.div
            className="rounded-lg border border-teal-300/30 bg-teal-400/10 px-3 py-2 text-sm text-teal-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, times: [0, 0.4, 0.55, 0.85, 1] }}
          >
            •••• · de-identified
          </motion.div>
          <p className="flex items-center gap-1.5 text-[11px] text-white/55">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
            Identifiers removed before research
          </p>
        </div>
      </div>
    </ClinicalShell>
  );
}

/* ========================================================== renderer + catalog */

const CLINICAL_COMPONENTS: Record<ClinicalVisualCategory, (p: ClinicalSceneProps) => JSX.Element> = {
  anatomy: AnatomyExplainerScene,
  'procedure-walkthrough': ProcedureWalkthroughScene,
  'medical-device': MedicalDeviceScene,
  'sample-collection': SampleCollectionScene,
  'imaging-scan': ImagingExperienceScene,
  'mechanism-of-action': MedicationPathwayScene,
  'research-visit': ClinicalTrialVisitScene,
  'recovery-home-care': RecoveryAtHomeScene,
  'care-setting': CareSettingScene,
  'patient-experience': PatientExperienceScene,
  'cellular-flow': CellularFlowScene,
  'dna-genomics': DnaStrandScene,
};

/** Renders the right clinical scene for a ClinicalVisualPlan. */
export function ClinicalSceneRenderer({ plan, useCase }: ClinicalSceneProps) {
  const Comp = CLINICAL_COMPONENTS[plan.visualCategory] ?? AnatomyExplainerScene;
  return <Comp plan={plan} useCase={useCase} />;
}

export interface ClinicalCatalogEntry {
  name: string;
  category: ClinicalVisualCategory;
  blurb: string;
  Component: (p: ClinicalSceneProps) => JSX.Element;
}

export const clinicalSceneCatalog: ClinicalCatalogEntry[] = [
  { name: 'AnatomyExplainerScene', category: 'anatomy', blurb: 'Simplified, labeled anatomy', Component: AnatomyExplainerScene },
  { name: 'ProcedureWalkthroughScene', category: 'procedure-walkthrough', blurb: 'Calm device path animation', Component: ProcedureWalkthroughScene },
  { name: 'MedicalDeviceScene', category: 'medical-device', blurb: 'Clean device / tool', Component: MedicalDeviceScene },
  { name: 'SampleCollectionScene', category: 'sample-collection', blurb: 'A small sample, vial filling', Component: SampleCollectionScene },
  { name: 'ImagingExperienceScene', category: 'imaging-scan', blurb: 'Scanner table & sweep', Component: ImagingExperienceScene },
  { name: 'MedicationPathwayScene', category: 'mechanism-of-action', blurb: 'General medication pathway', Component: MedicationPathwayScene },
  { name: 'ClinicalTrialVisitScene', category: 'research-visit', blurb: 'Study-visit timeline, voluntary', Component: ClinicalTrialVisitScene },
  { name: 'RecoveryAtHomeScene', category: 'recovery-home-care', blurb: 'Home recovery timeline', Component: RecoveryAtHomeScene },
  { name: 'CareSettingScene', category: 'care-setting', blurb: 'A calm, supportive space', Component: CareSettingScene },
  { name: 'PatientExperienceScene', category: 'patient-experience', blurb: 'What to expect at the visit', Component: PatientExperienceScene },
  { name: 'CellularFlowScene', category: 'cellular-flow', blurb: 'Cells & glucose drifting (general)', Component: CellularFlowScene },
  { name: 'DnaStrandScene', category: 'dna-genomics', blurb: 'DNA helix + de-identification', Component: DnaStrandScene },
];

/** Build a representative plan for showcasing a category in isolation. */
export function sampleClinicalPlan(
  category: ClinicalVisualCategory,
  realWorldConceptShown: string,
): ClinicalVisualPlan {
  return {
    visualCategory: category,
    realWorldConceptShown,
    recommendedVisualStyle: 'Clean 2.5D, deep navy, teal accents, soft shadows',
    safeVisualBoundary: 'Educational and non-graphic',
    animationIdea: 'Calm coded Framer Motion animation',
    staticFallback: 'A still labeled diagram',
    assetSearchTerms: ['medical explainer', 'patient education', 'simplified anatomy'],
    scenePlacement: 'after-intro',
    patientFriendlyExplanation: 'A clear look at what this involves.',
    avoidShowing: ['graphic imagery', 'anything frightening'],
  };
}
