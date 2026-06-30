'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Image as ImageIcon,
  Film,
  Box,
  Play,
  Clapperboard,
  Copy,
  Check,
  Search,
  Wand2,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import type { TreatmentAssetEntry, TreatmentAssetType } from '@/lib/types';
import { expectedAssetPath } from '@/lib/treatmentVisualAssetPlan';
import { cn } from '@/lib/utils';

const TYPE_ICON: Record<TreatmentAssetType, LucideIcon> = {
  'still-image': ImageIcon,
  'short-motion-video': Film,
  'medical-render': Box,
  'stock-video': Clapperboard,
  lottie: Play,
};

const closeupTone: Record<string, string> = {
  wide: 'bg-slate-100 text-slate-600',
  medium: 'bg-sky-50 text-sky-700',
  'close-up': 'bg-teal-50 text-teal-700',
  macro: 'bg-violet-50 text-violet-700',
};

const priorityTone: Record<string, string> = {
  high: 'bg-teal-50 text-teal-700',
  medium: 'bg-amber-50 text-amber-700',
  low: 'bg-slate-100 text-slate-500',
};

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return { copied, copy };
}

function CopyBtn({
  k,
  text,
  copied,
  onCopy,
  children,
  dark,
}: {
  k: string;
  text: string;
  copied: string | null;
  onCopy: (k: string, t: string) => void;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const isCopied = copied === k;
  return (
    <button
      onClick={() => onCopy(k, text)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
        isCopied
          ? 'bg-teal-500 text-white'
          : dark
            ? 'bg-white/10 text-white/80 hover:bg-white/20'
            : 'border border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:text-navy-800',
      )}
    >
      {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {isCopied ? 'Copied' : children}
    </button>
  );
}

/**
 * Polished placeholder for a clinical asset that hasn't been uploaded yet — shows exactly
 * what to provide (asset needed, filename, prompts, stock terms) with copy buttons.
 * Never fake art.
 *   variant="frame"    → fills a 16:9 video frame (player / scene preview)
 *   variant="detailed" → a production card (asset-slots manager / demo plan list)
 */
export function TreatmentAssetSlot({
  entry,
  variant = 'frame',
}: {
  entry: TreatmentAssetEntry;
  variant?: 'frame' | 'detailed';
}) {
  const Icon = TYPE_ICON[entry.assetType] ?? ImageIcon;
  const { copied, copy } = useCopy();
  const path = expectedAssetPath(entry);

  if (variant === 'frame') {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-4 rounded-2xl border-2 border-dashed border-white/12"
        />
        {entry.overlayLabels.map((l, i) => (
          <span
            key={i}
            className="pointer-events-none absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-300/40 bg-teal-400/20"
            style={{ left: `${l.x}%`, top: `${l.y}%` }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex w-full max-w-lg flex-col items-center text-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-teal-200 ring-1 ring-white/15">
            <Icon className="h-6 w-6" />
          </span>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-teal-200/90">
            Treatment visual asset needed
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{entry.visualDescription}</p>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
            <Chip>{entry.assetType}</Chip>
            <Chip className={closeupTone[entry.closeupLevel]}>{entry.closeupLevel}</Chip>
            <Chip className={priorityTone[entry.priority]}>{entry.priority} priority</Chip>
            <Chip>Scene {entry.sceneNumber}</Chip>
          </div>

          <p className="mt-3 font-mono text-[11px] text-white/55">{path}</p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <CopyBtn k={`${entry.assetId}-file`} text={entry.recommendedFileName} copied={copied} onCopy={copy} dark>
              Copy filename
            </CopyBtn>
            <CopyBtn k={`${entry.assetId}-img`} text={entry.exactImageGenerationPrompt} copied={copied} onCopy={copy} dark>
              Copy image prompt
            </CopyBtn>
            <CopyBtn k={`${entry.assetId}-vid`} text={entry.exactVideoGenerationPrompt} copied={copied} onCopy={copy} dark>
              Copy video prompt
            </CopyBtn>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-soft backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-white">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-teal-600">
              Treatment visual asset needed · Scene {entry.sceneNumber}
            </p>
            <p className="text-sm font-semibold text-navy-900">{entry.visualDescription}</p>
          </div>
        </div>
        <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide', priorityTone[entry.priority])}>
          {entry.priority}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <Chip light>{entry.assetType}</Chip>
        <Chip light className={closeupTone[entry.closeupLevel]}>
          {entry.closeupLevel}
        </Chip>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500">
          {entry.recommendedFileName}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        <span className="font-medium text-navy-800">Patient learns:</span> {entry.whatPatientLearns}
      </p>

      <PromptBlock label="Image generation prompt" icon={Wand2} text={entry.exactImageGenerationPrompt} k={`${entry.assetId}-img`} copied={copied} onCopy={copy} />
      <PromptBlock label="Video generation prompt" icon={Film} text={entry.exactVideoGenerationPrompt} k={`${entry.assetId}-vid`} copied={copied} onCopy={copy} />

      <div className="mt-3 flex items-center gap-2">
        <CopyBtn k={`${entry.assetId}-file`} text={entry.recommendedFileName} copied={copied} onCopy={copy}>
          <span className="inline-flex items-center gap-1"><FileText className="h-3 w-3" /> Copy filename</span>
        </CopyBtn>
      </div>

      <div className="mt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Stock search terms</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {entry.stockSearchTerms.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
              <Search className="h-2.5 w-2.5" />
              {t}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-3 text-[11px] text-slate-400">
        <span className="font-medium text-slate-500">Animation:</span> {entry.animationTreatment}
      </p>
    </div>
  );
}

function PromptBlock({
  label,
  icon: Icon,
  text,
  k,
  copied,
  onCopy,
}: {
  label: string;
  icon: LucideIcon;
  text: string;
  k: string;
  copied: string | null;
  onCopy: (k: string, t: string) => void;
}) {
  const isCopied = copied === k;
  return (
    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          <Icon className="h-3 w-3" />
          {label}
        </p>
        <button
          onClick={() => onCopy(k, text)}
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors',
            isCopied ? 'bg-teal-50 text-teal-700' : 'text-slate-400 hover:bg-slate-200 hover:text-navy-800',
          )}
        >
          {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

function Chip({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide',
        light ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-white/70',
        className,
      )}
    >
      {children}
    </span>
  );
}
