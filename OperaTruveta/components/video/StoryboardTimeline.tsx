'use client';

import type { StoryboardScene } from '@/lib/types';
import { SceneCard } from './SceneCard';

/** The full scene-by-scene storyboard, rendered as a vertical timeline of SceneCards. */
export function StoryboardTimeline({
  scenes,
  activeIndex,
  onSelect,
}: {
  scenes: StoryboardScene[];
  activeIndex?: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <ol className="relative space-y-3 border-l-2 border-dashed border-slate-200 pl-5 sm:pl-6">
      {scenes.map((s, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[26px] top-6 h-2.5 w-2.5 rounded-full bg-teal-400 ring-4 ring-white sm:-left-[30px]" />
          <SceneCard
            scene={s}
            index={i}
            active={activeIndex === i}
            onClick={onSelect ? () => onSelect(i) : undefined}
          />
        </li>
      ))}
    </ol>
  );
}
