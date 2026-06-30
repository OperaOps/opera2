import { NextResponse } from 'next/server';
import { resolveUseCase, sleep } from '@/lib/pipeline/apiUtils';
import { createJob } from '@/lib/pipeline/jobStore';

export async function POST(req: Request) {
  const res = await resolveUseCase(req);
  if ('error' in res) return res.error;

  await sleep(400);

  const job = createJob(res.useCase.id);
  return NextResponse.json(job);
}
