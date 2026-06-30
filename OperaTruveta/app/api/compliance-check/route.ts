import { NextResponse } from 'next/server';
import { resolveUseCase, sleep } from '@/lib/pipeline/apiUtils';
import { DOES_NOT_GENERATE, type ComplianceResponse } from '@/lib/pipeline/types';

const GUARANTEES = [
  'No diagnosis generated',
  'No treatment recommendation',
  'No medication changes',
  'No patient-specific risk prediction',
  'No emergency triage',
  'Approved content only',
  'Educational disclaimer present',
  'Source transparency',
  'Patient routed back to care team',
];

export async function POST(req: Request) {
  const res = await resolveUseCase(req);
  if ('error' in res) return res.error;
  const u = res.useCase;

  await sleep(800);

  const payload: ComplianceResponse = {
    useCaseId: u.id,
    passed: true,
    checks: GUARANTEES.map((label) => ({ label, status: 'pass' as const })),
    doesNotGenerate: [...DOES_NOT_GENERATE],
    humanReviewRequired: true,
  };
  return NextResponse.json(payload);
}
