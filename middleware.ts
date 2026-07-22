/**
 * Auth middleware — protects all routes except public ones.
 * Checks for opera-token JWT cookie.
 */

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "opera-ai-secret-key-change-in-prod"
);

// Public routes that don't need auth
const PUBLIC_PATHS = new Set(["/landing", "/signin", "/demo", "/api/auth/login", "/dentalnachos", "/dpm", "/dig", "/overview"]);

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  // Allow static files, _next, and favicon
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/patient-video") ||
    pathname.startsWith("/patient-video") ||
    pathname.startsWith("/greyfinch-embed") ||
    pathname.startsWith("/greyfinch-patient-videos") ||
    pathname.startsWith("/connect") ||
    pathname.startsWith("/api/connect") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/video-prototype") ||
    pathname.startsWith("/clinic") ||
    pathname.startsWith("/patient") ||
    pathname.startsWith("/api/clinic") ||
    pathname.startsWith("/api/patient") ||
    pathname.startsWith("/api/leads") ||
    pathname.startsWith("/api/v1/") ||
    pathname.startsWith("/docs") ||
    pathname.startsWith("/dentalnachos") ||
    pathname.startsWith("/dpm") ||
    pathname.startsWith("/dig") ||
    pathname.startsWith("/overview") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/v/") ||
    pathname.startsWith("/api/v/") ||
    pathname.startsWith("/api/patient-context") ||
    pathname.startsWith("/docs-v2") ||
    pathname.startsWith("/concepts") ||
    pathname.startsWith("/concept-") ||
    pathname.startsWith("/final") ||
    pathname.startsWith("/lightwall") ||
    pathname.startsWith("/live") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/live") ||
    pathname.startsWith("/terms") ||
    pathname.includes(".") // static files like .css, .js, .ico
  ) {
    return true;
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Clinic portal pages need a clinic session (its own cookie, separate from
  // the main opera-token). APIs under /api/clinic verify per-route.
  if (pathname.startsWith("/clinic/dashboard")) {
    const clinicToken = request.cookies.get("opera-clinic-token")?.value;
    if (!clinicToken) {
      return NextResponse.redirect(new URL("/clinic/login", request.url));
    }
    try {
      await jwtVerify(clinicToken, JWT_SECRET);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/clinic/login", request.url));
      response.cookies.delete("opera-clinic-token");
      return response;
    }
  }

  // Let public paths through
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Root is the public marketing site (app/page.tsx)
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get("opera-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    // Token invalid or expired — redirect to signin
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.delete("opera-token");
    return response;
  }
}

export const config = {
  matcher: [
    // Match everything except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
