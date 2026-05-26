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
const PUBLIC_PATHS = new Set(["/landing", "/signin", "/demo", "/api/auth/login", "/dentalnachos"]);

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  // Allow static files, _next, and favicon
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/patient-video") ||
    pathname.startsWith("/patient-video") ||
    pathname.startsWith("/video-prototype") ||
    pathname.startsWith("/clinic") ||
    pathname.startsWith("/patient") ||
    pathname.startsWith("/api/clinic") ||
    pathname.startsWith("/api/patient") ||
    pathname.startsWith("/api/leads") ||
    pathname.startsWith("/dentalnachos") ||
    pathname.includes(".") // static files like .css, .js, .ico
  ) {
    return true;
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let public paths through
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Root redirects to landing (public)
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/landing", request.url));
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
