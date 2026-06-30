'use client';

import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, HeartPulse, FileCheck2 } from 'lucide-react';
import type { OverlayLabel } from '@/lib/types';

/**
 * An animated medical callout anchored to a point on a clinical asset: a pulsing
 * highlight ring + a short leader line to a patient-friendly label (with optional
 * one-line explanation). Reveals on a delay so callouts appear in sequence.
 */
export function AnimatedMedicalCallout({
  label,
  delay = 0,
}: {
  label: OverlayLabel;
  delay?: number;
}) {
  const flip = label.x > 58; // put the label on the left when the point is near the right edge
  return (
    <div
      className="pointer-events-none absolute z-20"
      style={{ left: `${label.x}%`, top: `${label.y}%` }}
    >
      {/* pulsing highlight at the anchor point */}
      <motion.span
        className="absolute -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
      >
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400/70" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-teal-400 ring-2 ring-white/80" />
        </span>
      </motion.span>

      {/* leader line + label, offset from the anchor */}
      <motion.div
        className="absolute flex items-center gap-2"
        style={{
          transform: `translateY(-50%) ${flip ? 'translateX(-100%)' : ''}`,
          flexDirection: flip ? 'row-reverse' : 'row',
          [flip ? 'right' : 'left']: 0,
        }}
        initial={{ opacity: 0, x: flip ? 10 : -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay + 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="h-px w-7 bg-gradient-to-r from-teal-400/80 to-transparent" />
        <span className="max-w-[14rem] rounded-lg bg-navy-950/85 px-2.5 py-1.5 shadow-lg ring-1 ring-white/10 backdrop-blur">
          <span className="block whitespace-nowrap text-xs font-semibold text-white">
            {label.text}
          </span>
          {label.explanation && (
            <span className="mt-0.5 block text-[10px] leading-snug text-white/65">
              {label.explanation}
            </span>
          )}
        </span>
      </motion.div>
    </div>
  );
}

/** Bottom caption band — large, readable over any photo/render. */
export function SceneCaptionOverlay({
  caption,
  title,
}: {
  caption?: string;
  title?: string;
}) {
  if (!caption && !title) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 pt-16 sm:p-7 sm:pt-20">
      {title && (
        <p className="text-balance text-lg font-semibold leading-tight text-white drop-shadow sm:text-2xl">
          {title}
        </p>
      )}
      {caption && (
        <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-relaxed text-white/85 drop-shadow sm:text-base">
          {caption}
        </p>
      )}
    </div>
  );
}

/** Top-left patient personalization chip. */
export function PatientPersonalizationOverlay({
  patientName,
  note,
}: {
  patientName?: string;
  note?: string;
}) {
  if (!note && !patientName) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="pointer-events-none absolute left-4 top-4 z-20 max-w-[72%]"
    >
      <span className="inline-flex items-start gap-1.5 rounded-full border border-teal-300/30 bg-navy-950/60 px-3 py-1.5 text-[11px] font-medium text-teal-100 shadow-lg backdrop-blur">
        <Sparkles className="mt-px h-3.5 w-3.5 shrink-0" />
        <span className="line-clamp-2">{note ?? `Personalized for ${patientName}`}</span>
      </span>
    </motion.div>
  );
}

/** Top-right "real-world clinical · educational/source" markers. */
export function TreatmentTopChips() {
  return (
    <div className="pointer-events-none absolute right-4 top-4 z-20 flex items-center gap-1.5">
      <span className="inline-flex items-center gap-1 rounded-full border border-sky-300/30 bg-navy-950/60 px-2.5 py-1 text-[10px] font-semibold text-sky-100 backdrop-blur">
        <HeartPulse className="h-3 w-3" />
        Real-world clinical
      </span>
      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-navy-950/50 px-2.5 py-1 text-[10px] font-medium text-white/70 backdrop-blur">
        <FileCheck2 className="h-3 w-3" />
        Approved · educational
      </span>
    </div>
  );
}

/** Thin scene-progress bar across the top of a treatment scene. */
export function SceneProgressBar({ progress }: { progress: number }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1 bg-white/10">
      <div
        className="h-full bg-gradient-to-r from-teal-400 to-sky-400"
        style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
      />
    </div>
  );
}
