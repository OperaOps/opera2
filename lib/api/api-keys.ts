/**
 * API key management — validation, rate limiting, CRUD.
 *
 * Keys are `opk_` + 40 hex chars. Stored as SHA-256 hash in SQLite.
 * Master key `opk_master_opera2026` always works (no DB lookup, no rate limit).
 */

import crypto from "node:crypto";

// ---------------------------------------------------------------------------
// Master key (always works, no rate limits)
// ---------------------------------------------------------------------------

const MASTER_KEY = "opk_master_opera2026";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ApiKeyRecord {
  id: string;
  key_prefix: string;
  org_name: string;
  org_id: string | null;
  rate_limit_per_minute: number;
  rate_limit_per_day: number;
  is_active: boolean;
  last_used_at: string | null;
}

const MASTER_RECORD: ApiKeyRecord = {
  id: "master",
  key_prefix: "opk_mast",
  org_name: "Opera Internal",
  org_id: null,
  rate_limit_per_minute: 9999,
  rate_limit_per_day: 99999,
  is_active: true,
  last_used_at: null,
};

// ---------------------------------------------------------------------------
// Hashing
// ---------------------------------------------------------------------------

function hashKey(rawKey: string): string {
  return crypto.createHash("sha256").update(rawKey).digest("hex");
}

// ---------------------------------------------------------------------------
// DB helpers (lazy import to avoid SSR issues)
// ---------------------------------------------------------------------------

function getDb() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getDb: _getDb } = require("@/lib/db/patient-portal-schema");
    return _getDb();
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export function validateApiKey(authHeader: string | null): ApiKeyRecord | null {
  if (!authHeader) return null;

  const raw = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : authHeader.trim();

  if (!raw) return null;

  // Master key — always works
  if (raw === MASTER_KEY) return MASTER_RECORD;

  // Look up in DB
  const db = getDb();
  if (!db) return null;

  const hash = hashKey(raw);
  try {
    const row = db.prepare(
      "SELECT id, key_prefix, org_name, org_id, rate_limit_per_minute, rate_limit_per_day, is_active, last_used_at FROM api_keys WHERE key_hash = ?"
    ).get(hash) as ApiKeyRecord | undefined;

    if (!row || !row.is_active) return null;

    // Update last_used_at
    db.prepare("UPDATE api_keys SET last_used_at = datetime('now') WHERE id = ?").run(row.id);

    return row;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Rate limiting (in-memory sliding window)
// ---------------------------------------------------------------------------

const minuteWindows = new Map<string, number[]>();
const dayWindows = new Map<string, { count: number; windowStart: number }>();

export function checkRateLimit(key: ApiKeyRecord): { allowed: boolean; retryAfter?: number } {
  // Master key — no rate limits
  if (key.id === "master") return { allowed: true };

  const now = Date.now();

  // Per-minute check
  let timestamps = minuteWindows.get(key.id) || [];
  timestamps = timestamps.filter((t) => now - t < 60_000);
  if (timestamps.length >= key.rate_limit_per_minute) {
    const oldest = timestamps[0];
    return { allowed: false, retryAfter: Math.ceil((oldest + 60_000 - now) / 1000) };
  }

  // Per-day check
  let dayWindow = dayWindows.get(key.id);
  if (!dayWindow || now - dayWindow.windowStart > 86_400_000) {
    dayWindow = { count: 0, windowStart: now };
  }
  if (dayWindow.count >= key.rate_limit_per_day) {
    const resetIn = Math.ceil((dayWindow.windowStart + 86_400_000 - now) / 1000);
    return { allowed: false, retryAfter: resetIn };
  }

  // Record usage
  timestamps.push(now);
  minuteWindows.set(key.id, timestamps);
  dayWindow.count++;
  dayWindows.set(key.id, dayWindow);

  return { allowed: true };
}

// ---------------------------------------------------------------------------
// CRUD (for CLI script)
// ---------------------------------------------------------------------------

export function createApiKey(
  orgName: string,
  opts?: { orgId?: string; rateLimitPerMinute?: number; rateLimitPerDay?: number }
): { rawKey: string; keyId: string; prefix: string } {
  const db = getDb();
  if (!db) throw new Error("Database not available");

  const rawKey = "opk_" + crypto.randomBytes(20).toString("hex");
  const keyId = crypto.randomBytes(16).toString("hex");
  const prefix = rawKey.slice(0, 8);
  const hash = hashKey(rawKey);

  db.prepare(
    `INSERT INTO api_keys (id, key_prefix, key_hash, org_name, org_id, rate_limit_per_minute, rate_limit_per_day)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    keyId,
    prefix,
    hash,
    orgName,
    opts?.orgId ?? null,
    opts?.rateLimitPerMinute ?? 10,
    opts?.rateLimitPerDay ?? 500
  );

  return { rawKey, keyId, prefix };
}

export function revokeApiKey(keyId: string): boolean {
  const db = getDb();
  if (!db) return false;
  const result = db.prepare("UPDATE api_keys SET is_active = 0 WHERE id = ?").run(keyId);
  return result.changes > 0;
}

export function listApiKeys(): ApiKeyRecord[] {
  const db = getDb();
  if (!db) return [];
  return db.prepare(
    "SELECT id, key_prefix, org_name, org_id, rate_limit_per_minute, rate_limit_per_day, is_active, last_used_at FROM api_keys ORDER BY created_at DESC"
  ).all() as ApiKeyRecord[];
}
