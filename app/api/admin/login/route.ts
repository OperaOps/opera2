/**
 * POST /api/admin/login { email, password }
 * Anish's console login. On success returns the admin key the page uses
 * for subsequent x-admin-key requests.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const email = (process.env.OPERA_ADMIN_EMAIL || "anish@getopera.ai").toLowerCase();
  const password = process.env.OPERA_ADMIN_PASSWORD || "";
  const key = process.env.OPERA_ADMIN_KEY || "";
  if (!password || !key) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  if (body.email?.trim().toLowerCase() === email && body.password === password) {
    return NextResponse.json({ key });
  }
  return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
}
