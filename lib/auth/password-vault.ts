/**
 * Password vault — lets the Profile page show the clinic their own login
 * password (eye-toggle reveal). Login stores the password AES-256-GCM
 * encrypted under a key derived from NEXTAUTH_SECRET; only the signed-in
 * clinic's session can read its own entry back.
 */

import crypto from "node:crypto";

function vaultKey(): Buffer {
  const secret = process.env.NEXTAUTH_SECRET || "opera-ai-secret-key-change-in-prod";
  return crypto.createHash("sha256").update(`opera-password-vault:${secret}`).digest();
}

export function encryptPassword(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", vaultKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString("base64");
}

export function decryptPassword(vault: string): string | null {
  try {
    const raw = Buffer.from(vault, "base64");
    const iv = raw.subarray(0, 12);
    const tag = raw.subarray(12, 28);
    const enc = raw.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", vaultKey(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
  } catch {
    return null;
  }
}
