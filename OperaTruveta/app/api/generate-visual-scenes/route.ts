import { NextResponse } from 'next/server';
import { resolveUseCase, sleep, componentForVisualType } from '@/lib/pipeline/apiUtils';
import type { VisualScenesResponse } from '@/lib/pipeline/types';

export async function POST(req: Request) {
  const res = await resolveUseCase(req);
  if ('error' in res) return res.error;
  const u = res.useCase;

  await sleep(850);

  const payload: VisualScenesResponse = {
    useCaseId: u.id,
    sceneCount: u.storyboard.length,
    scenes: u.storyboard.map((s, index) => ({
      index,
      visualType: s.visualType,
      component: componentForVisualType(s.visualType),
      motion: s.motionDirection,
    })),
    renderTargets: u.motionPlan.renderTargets,
  };
  return NextResponse.json(payload);
}
