import { NextResponse } from 'next/server';
import { getUseCaseById } from '@/lib/demoData';
import type { DemoUseCase } from '@/lib/types';

/** Small artificial latency so the pipeline feels like real work. */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Parse {useCaseId} from the request and resolve the synthetic use case. */
export async function resolveUseCase(
  req: Request,
): Promise<{ useCase: DemoUseCase } | { error: NextResponse }> {
  let body: { useCaseId?: string } = {};
  try {
    body = await req.json();
  } catch {
    // empty body
  }
  const id = body.useCaseId;
  if (!id) {
    return { error: NextResponse.json({ error: 'useCaseId is required' }, { status: 400 }) };
  }
  const useCase = getUseCaseById(id);
  if (!useCase) {
    return { error: NextResponse.json({ error: `Unknown useCaseId: ${id}` }, { status: 404 }) };
  }
  return { useCase };
}

/** Map a storyboard visualType to its rendering scene component name. */
export function componentForVisualType(visualType: string): string {
  const map: Record<string, string> = {
    'title-card': 'PatientIntroScene',
    'lab-card': 'LabCardScene',
    checklist: 'ChecklistRevealScene',
    'consent-panel': 'ConsentFormScene',
    'portal-mockup': 'PortalMessageScene',
    'journey-timeline': 'CareContextScene',
    'caregiver-card': 'CaregiverSummaryScene',
    'question-list': 'QuestionsToAskScene',
    'quote-card': 'QuoteScene',
    'source-panel': 'SourceTransparencyScene',
    comparison: 'PlainEnglishEducationScene',
    'icon-grid': 'CalendarReminderScene',
    'map-route': 'MapRouteScene',
    'closing-card': 'SafetyDisclaimerScene',
  };
  return map[visualType] ?? 'PatientIntroScene';
}
