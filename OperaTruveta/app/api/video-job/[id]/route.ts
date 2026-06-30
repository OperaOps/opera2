import { NextResponse } from 'next/server';
import { statusFor } from '@/lib/pipeline/jobStore';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const status = statusFor(params.id);
  if (!status) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }
  return NextResponse.json(status);
}
