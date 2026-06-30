import { NextResponse } from 'next/server';
import { resolveUseCase, sleep } from '@/lib/pipeline/apiUtils';
import {
  DOES_NOT_GENERATE,
  PERSONALIZATION_DIMENSIONS,
  type PersonalizationResponse,
} from '@/lib/pipeline/types';

export async function POST(req: Request) {
  const res = await resolveUseCase(req);
  if ('error' in res) return res.error;
  const u = res.useCase;

  await sleep(750);

  // Surface the dimensions that actually apply to this synthetic patient.
  const dimensionsUsed = [...PERSONALIZATION_DIMENSIONS].filter((d) => {
    if (d === 'Caregiver involvement') return Boolean(u.patient.caregiver);
    if (d === 'Barriers to care') return u.patient.barriers.length > 0;
    return true;
  });

  const payload: PersonalizationResponse = {
    useCaseId: u.id,
    signals: u.personalizationSignals,
    dimensionsUsed,
    doesNotGenerate: [...DOES_NOT_GENERATE],
  };
  return NextResponse.json(payload);
}
