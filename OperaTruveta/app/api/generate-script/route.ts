import { NextResponse } from 'next/server';
import { resolveUseCase, sleep } from '@/lib/pipeline/apiUtils';
import { estimateNarrationSeconds } from '@/lib/utils';
import type { ScriptResponse } from '@/lib/pipeline/types';

export async function POST(req: Request) {
  const res = await resolveUseCase(req);
  if ('error' in res) return res.error;
  const u = res.useCase;

  await sleep(700);

  const fullText = `${u.script.opening} ${u.script.fullNarration} ${u.script.closing}`;
  const payload: ScriptResponse = {
    useCaseId: u.id,
    opening: u.script.opening,
    fullNarration: u.script.fullNarration,
    closing: u.script.closing,
    disclaimer: u.script.disclaimer,
    wordCount: fullText.trim().split(/\s+/).filter(Boolean).length,
    estimatedSeconds: estimateNarrationSeconds(fullText),
  };
  return NextResponse.json(payload);
}
