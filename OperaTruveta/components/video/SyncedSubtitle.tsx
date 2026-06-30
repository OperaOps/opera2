'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Splits a spoken line into short, single-line caption chunks (~one screen line each),
 * breaking on word boundaries so no chunk wraps. Chunks are revealed one at a time in
 * step with the scene's progress, so the subtitle reads like clean broadcast captions
 * and stays roughly in sync with the narration audio.
 */
export function splitCaption(text: string, max = 48): string[] {
  const words = (text || '').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/** One short caption line at the bottom of the player, advanced by scene progress. */
export function SyncedSubtitle({ caption, progress }: { caption?: string; progress: number }) {
  const lines = useMemo(() => splitCaption(caption ?? ''), [caption]);
  if (!lines.length) return null;
  const idx = Math.min(lines.length - 1, Math.max(0, Math.floor(progress * lines.length)));
  const line = lines[idx];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4 sm:pb-5">
      <AnimatePresence mode="wait">
        <motion.p
          key={`${idx}:${line}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          className="max-w-[92%] truncate rounded-md bg-black/55 px-3 py-1.5 text-center text-[13px] font-medium leading-snug text-white/95 shadow-sm backdrop-blur-sm sm:text-sm"
        >
          {line}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
