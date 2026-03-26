/**
 * POST /api/auth/login
 *
 * Authenticates a user against auth-users.json and returns a JWT cookie.
 */

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import fs from "node:fs";
import path from "node:path";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "opera-ai-secret-key-change-in-prod"
);

interface AuthUser {
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}

function getUsers(): AuthUser[] {
  const filePath = path.join(process.cwd(), "auth-users.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Create JWT
  const token = await new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  const response = NextResponse.json({
    success: true,
    user: { email: user.email, name: user.name },
  });

  response.cookies.set("opera-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return response;
}
