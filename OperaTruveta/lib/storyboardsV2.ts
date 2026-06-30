/**
 * Upgraded storyboards — treatment-specific real-world clinical scenes blended with
 * personalized UI scenes. Merged from two authored parts and applied over the base
 * dataset in demoData.ts.
 *
 * Post-process: for use cases that have a dedicated high-fidelity clinical explainer,
 * tag the FIRST clinical scene with that `clinicalVisualKey` so the player renders the
 * rich condition-specific visual there (remaining clinical scenes keep their generic
 * category visuals for variety).
 */

import type { StoryboardScene } from './types';
import { clinicalVisualKeyForUseCase } from './clinicalVisualMap';
import { storyboardsPart1 } from './storyboards/part1';
import { storyboardsPart2 } from './storyboards/part2';

const merged: Record<string, StoryboardScene[]> = {
  ...storyboardsPart1,
  ...storyboardsPart2,
};

export const storyboardsById: Record<string, StoryboardScene[]> = Object.fromEntries(
  Object.entries(merged).map(([id, scenes]) => {
    const key = clinicalVisualKeyForUseCase(id);
    if (!key) return [id, scenes];
    let assigned = false;
    const tagged = scenes.map((s) => {
      if (!assigned && s.clinicalVisualCategory) {
        assigned = true;
        return { ...s, clinicalVisualKey: key };
      }
      return s;
    });
    return [id, tagged];
  }),
);
