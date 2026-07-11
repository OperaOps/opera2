/**
 * Clinic accounts + API keys for the Greyfinch Connect integration.
 *
 * Storage: DynamoDB single-table (set OPERA_CLINICS_TABLE) for production —
 * App Runner containers lose local disk on every deploy. Falls back to a JSON
 * file under data/ for local dev so signup flows survive dev-server restarts.
 *
 * Item layout (partition key `pk`):
 *   CLINIC#<clinicId>       → full ClinicAccount record
 *   KEY#<sha256(rawKey)>    → { clinicId } pointer for O(1) key auth
 *   SESSION#<checkoutId>    → { clinicId } pointer (Stripe success page)
 *   SUB#<subscriptionId>    → { clinicId } pointer (Stripe webhooks)
 *
 * The raw API key is stored on the clinic record (retrievable) — deliberate
 * beta tradeoff so clinics who lose their key can be re-sent it without
 * re-onboarding. Revisit before GA.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

export type ClinicStatus =
  | "pending" // signed up, checkout not completed
  | "trialing"
  | "active"
  | "past_due"
  | "canceled";

export interface ClinicAccount {
  clinicId: string;
  clinicName: string;
  contactName: string;
  email: string;
  phone?: string;
  practiceType?: string; // "orthodontic" | "dental" | ...
  status: ClinicStatus;
  plan: "monthly";
  activationMethod: "stripe" | "activation_code";
  termsAcceptedAt: string;
  trialEndsAt: string | null;
  // API key (issued once the account activates)
  apiKey: string | null;
  keyPrefix: string | null;
  keyHash: string | null;
  // Stripe linkage
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripeCheckoutSessionId?: string;
  // Usage
  videosGenerated: number;
  lastUsedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const TABLE = process.env.OPERA_CLINICS_TABLE?.trim() || "";
const FILE_PATH = path.join(process.cwd(), "data", "connect-clinics.json");

export function isDynamoClinicStoreEnabled(): boolean {
  return TABLE.length > 0;
}

export function hashKey(rawKey: string): string {
  return crypto.createHash("sha256").update(rawKey).digest("hex");
}

export function generateApiKey(): string {
  return "opk_" + crypto.randomBytes(20).toString("hex");
}

// ---------------------------------------------------------------------------
// DynamoDB backend
// ---------------------------------------------------------------------------

let docClient: DynamoDBDocumentClient | null = null;
function getDoc(): DynamoDBDocumentClient {
  if (!docClient) {
    const region =
      process.env.OPERA_AWS_REGION || process.env.AWS_REGION || "us-east-1";
    // Netlify reserves the standard AWS_* env names in functions, so hosts
    // without an IAM role pass credentials via OPERA_AWS_* instead.
    const accessKeyId = process.env.OPERA_AWS_ACCESS_KEY_ID?.trim();
    const secretAccessKey = process.env.OPERA_AWS_SECRET_ACCESS_KEY?.trim();
    const client = new DynamoDBClient(
      accessKeyId && secretAccessKey
        ? { region, credentials: { accessKeyId, secretAccessKey } }
        : { region }
    );
    docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: { removeUndefinedValues: true },
    });
  }
  return docClient;
}

async function dynamoGet(pk: string): Promise<Record<string, unknown> | null> {
  const r = await getDoc().send(new GetCommand({ TableName: TABLE, Key: { pk } }));
  return (r.Item as Record<string, unknown>) ?? null;
}

async function dynamoPut(item: Record<string, unknown>): Promise<void> {
  await getDoc().send(new PutCommand({ TableName: TABLE, Item: item }));
}

// ---------------------------------------------------------------------------
// File backend (local dev only)
// ---------------------------------------------------------------------------

type FileDb = Record<string, Record<string, unknown>>;

function fileRead(): FileDb {
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8")) as FileDb;
  } catch {
    return {};
  }
}

function fileWrite(db: FileDb): void {
  fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
  fs.writeFileSync(FILE_PATH, JSON.stringify(db, null, 2));
}

// ---------------------------------------------------------------------------
// Unified item access
// ---------------------------------------------------------------------------

async function getItem(pk: string): Promise<Record<string, unknown> | null> {
  if (isDynamoClinicStoreEnabled()) return dynamoGet(pk);
  return fileRead()[pk] ?? null;
}

async function putItem(pk: string, item: Record<string, unknown>): Promise<void> {
  if (isDynamoClinicStoreEnabled()) {
    await dynamoPut({ ...item, pk });
    return;
  }
  const db = fileRead();
  db[pk] = { ...item, pk };
  fileWrite(db);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function createClinic(input: {
  clinicName: string;
  contactName: string;
  email: string;
  phone?: string;
  practiceType?: string;
  activationMethod: "stripe" | "activation_code";
}): Promise<ClinicAccount> {
  const now = new Date().toISOString();
  const clinic: ClinicAccount = {
    clinicId: crypto.randomUUID(),
    clinicName: input.clinicName,
    contactName: input.contactName,
    email: input.email,
    phone: input.phone,
    practiceType: input.practiceType,
    status: "pending",
    plan: "monthly",
    activationMethod: input.activationMethod,
    termsAcceptedAt: now,
    trialEndsAt: null,
    apiKey: null,
    keyPrefix: null,
    keyHash: null,
    videosGenerated: 0,
    createdAt: now,
    updatedAt: now,
  };
  await putItem(`CLINIC#${clinic.clinicId}`, clinic as unknown as Record<string, unknown>);
  return clinic;
}

export async function getClinic(clinicId: string): Promise<ClinicAccount | null> {
  const item = await getItem(`CLINIC#${clinicId}`);
  return (item as ClinicAccount | null) ?? null;
}

export async function saveClinic(clinic: ClinicAccount): Promise<void> {
  clinic.updatedAt = new Date().toISOString();
  await putItem(`CLINIC#${clinic.clinicId}`, clinic as unknown as Record<string, unknown>);
}

/**
 * Activate a clinic: set status/trial window and issue its API key (idempotent
 * — an existing key is kept so re-activation never rotates it silently).
 */
export async function activateClinic(
  clinic: ClinicAccount,
  opts: { status?: ClinicStatus; trialDays?: number; trialEndsAt?: string | null } = {}
): Promise<ClinicAccount> {
  if (!clinic.apiKey) {
    const raw = generateApiKey();
    clinic.apiKey = raw;
    clinic.keyPrefix = raw.slice(0, 8);
    clinic.keyHash = hashKey(raw);
    await putItem(`KEY#${clinic.keyHash}`, { clinicId: clinic.clinicId });
  }
  clinic.status = opts.status ?? "trialing";
  if (opts.trialEndsAt !== undefined) {
    clinic.trialEndsAt = opts.trialEndsAt;
  } else if (opts.trialDays) {
    clinic.trialEndsAt = new Date(Date.now() + opts.trialDays * 86_400_000).toISOString();
  }
  await saveClinic(clinic);
  return clinic;
}

export async function findClinicByApiKey(rawKey: string): Promise<ClinicAccount | null> {
  const ptr = await getItem(`KEY#${hashKey(rawKey)}`);
  if (!ptr?.clinicId) return null;
  return getClinic(ptr.clinicId as string);
}

export async function linkCheckoutSession(clinicId: string, sessionId: string): Promise<void> {
  await putItem(`SESSION#${sessionId}`, { clinicId });
  const clinic = await getClinic(clinicId);
  if (clinic) {
    clinic.stripeCheckoutSessionId = sessionId;
    await saveClinic(clinic);
  }
}

export async function findClinicByCheckoutSession(sessionId: string): Promise<ClinicAccount | null> {
  const ptr = await getItem(`SESSION#${sessionId}`);
  if (!ptr?.clinicId) return null;
  return getClinic(ptr.clinicId as string);
}

export async function linkSubscription(clinicId: string, subscriptionId: string): Promise<void> {
  await putItem(`SUB#${subscriptionId}`, { clinicId });
}

export async function findClinicBySubscription(subscriptionId: string): Promise<ClinicAccount | null> {
  const ptr = await getItem(`SUB#${subscriptionId}`);
  if (!ptr?.clinicId) return null;
  return getClinic(ptr.clinicId as string);
}

/** Fire-and-forget usage bump after a successful video kickoff. */
export function recordVideoGenerated(clinicId: string): void {
  (async () => {
    const clinic = await getClinic(clinicId);
    if (!clinic) return;
    clinic.videosGenerated = (clinic.videosGenerated ?? 0) + 1;
    clinic.lastUsedAt = new Date().toISOString();
    await saveClinic(clinic);
  })().catch((err) => console.error("[connect] usage record failed", err));
}

/** All clinic records (admin/ops visibility). */
export async function listClinics(): Promise<ClinicAccount[]> {
  if (isDynamoClinicStoreEnabled()) {
    const out: ClinicAccount[] = [];
    let lastKey: Record<string, unknown> | undefined;
    do {
      const r = await getDoc().send(
        new ScanCommand({ TableName: TABLE, ExclusiveStartKey: lastKey })
      );
      for (const item of r.Items ?? []) {
        if (typeof item.pk === "string" && item.pk.startsWith("CLINIC#")) {
          out.push(item as unknown as ClinicAccount);
        }
      }
      lastKey = r.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (lastKey);
    return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }
  const db = fileRead();
  return Object.entries(db)
    .filter(([k]) => k.startsWith("CLINIC#"))
    .map(([, v]) => v as unknown as ClinicAccount)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
