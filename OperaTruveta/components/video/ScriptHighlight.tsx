'use client';

import { Fragment, useMemo } from 'react';
import type { DemoUseCase } from '@/lib/types';

const COMMON = new Set([
  'about', 'because', 'before', 'after', 'their', 'these', 'those', 'where', 'which',
  'would', 'could', 'should', 'video', 'visit', 'questions', 'understand', 'really',
  'while', 'being', 'there', 'people', 'things', 'something', 'anything',
]);

/** Build the set of phrases worth highlighting as personalization moments. */
function highlightPhrases(u: DemoUseCase): string[] {
  const phrases = new Set<string>();
  phrases.add(u.patient.name.split(' ')[0]);
  if (u.patient.caregiver) phrases.add(u.patient.caregiver.name);

  const lc = u.patient.lifeContext;
  const pools = [lc.occupation, lc.schedule, lc.livingSituation, lc.familyHistoryMentioned]
    .filter(Boolean)
    .join(' ');
  pools
    .toLowerCase()
    .replace(/[^a-záéíóúñ\s-]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 5 && !COMMON.has(w))
    .forEach((w) => phrases.add(w));

  return Array.from(phrases).filter(Boolean);
}

/** Renders narration text with personalization moments softly highlighted. */
export function ScriptHighlight({
  text,
  useCase,
  className,
}: {
  text: string;
  useCase: DemoUseCase;
  className?: string;
}) {
  const parts = useMemo(() => {
    const phrases = highlightPhrases(useCase)
      .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .sort((a, b) => b.length - a.length);
    if (phrases.length === 0) return [{ t: text, hit: false }];

    const re = new RegExp(`\\b(${phrases.join('|')})\\b`, 'gi');
    const out: { t: string; hit: boolean }[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) out.push({ t: text.slice(last, m.index), hit: false });
      out.push({ t: m[0], hit: true });
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push({ t: text.slice(last), hit: false });
    return out;
  }, [text, useCase]);

  return (
    <p className={className}>
      {parts.map((p, i) =>
        p.hit ? (
          <mark
            key={i}
            className="rounded bg-teal-100/80 px-0.5 font-medium text-teal-900 decoration-clone"
          >
            {p.t}
          </mark>
        ) : (
          <Fragment key={i}>{p.t}</Fragment>
        ),
      )}
    </p>
  );
}
