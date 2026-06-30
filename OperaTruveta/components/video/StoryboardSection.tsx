'use client';

import { useState } from 'react';
import type { StoryboardScene } from '@/lib/types';
import { StoryboardTimeline } from './StoryboardTimeline';
import { MotionDirectionCard } from './MotionDirectionCard';

/** Interactive storyboard: click a scene to inspect its motion/direction. */
export function StoryboardSection({ scenes }: { scenes: StoryboardScene[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <StoryboardTimeline scenes={scenes} activeIndex={active} onSelect={setActive} />
      <div className="lg:sticky lg:top-24 lg:self-start">
        <MotionDirectionCard scene={scenes[active]} />
      </div>
    </div>
  );
}
