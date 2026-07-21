import { NextRequest } from "next/server";

export function isAdmin(request: NextRequest): boolean {
  const key = process.env.OPERA_ADMIN_KEY?.trim();
  if (!key) return false;
  return request.headers.get("x-admin-key")?.trim() === key;
}
