import { NextResponse } from 'next/server';
import { resolveUseCase, sleep } from '@/lib/pipeline/apiUtils';
import type { StoryboardResponse } from '@/lib/pipeline/types';

export async function POST(req: Request) {
  const res = await resolveUseCase(req);
  if ('error' in res) return res.error;
  const u = res.useCase;

  await sleep(800);

  const payload: StoryboardResponse = {
    useCaseId: u.id,
    sceneCount: u.storyboard.length,
    scenes: u.storyboard.map((s, index) => ({
      index,
      sceneTitle: s.sceneTitle,
      onScreenText: s.onScreenText,
      visualType: s.visualType,
      durationSec: s.durationSec,
    })),
  };
  return NextResponse.json(payload);
}
