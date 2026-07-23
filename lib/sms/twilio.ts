/**
 * Twilio SMS sender — plain REST (no SDK), so it works in any serverless
 * runtime. Configure with env vars on the host:
 *   TWILIO_ACCOUNT_SID    (starts with AC…)
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_FROM_NUMBER    a Twilio number in E.164, e.g. +15551234567
 *       (or TWILIO_MESSAGING_SERVICE_SID to use a Messaging Service)
 *
 * When unconfigured, send() returns { ok:false, configured:false } instead of
 * throwing, so the caller can tell the clinic "SMS isn't set up yet".
 */

export interface SmsResult {
  ok: boolean;
  configured: boolean;
  sid?: string;
  error?: string;
}

/** Normalize a US-style number to E.164 (+1…). Leaves already-+ numbers alone. */
export function toE164(raw: string): string | null {
  const t = raw.trim();
  if (/^\+[1-9]\d{7,14}$/.test(t)) return t;
  const digits = t.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

export function smsConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID?.trim() &&
      process.env.TWILIO_AUTH_TOKEN?.trim() &&
      (process.env.TWILIO_FROM_NUMBER?.trim() ||
        process.env.TWILIO_MESSAGING_SERVICE_SID?.trim())
  );
}

export async function sendSms(to: string, body: string): Promise<SmsResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const token = process.env.TWILIO_AUTH_TOKEN?.trim();
  const from = process.env.TWILIO_FROM_NUMBER?.trim();
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID?.trim();

  if (!sid || !token || (!from && !messagingServiceSid)) {
    return { ok: false, configured: false };
  }

  const e164 = toE164(to);
  if (!e164) return { ok: false, configured: true, error: "invalid_phone" };

  const params = new URLSearchParams({ To: e164, Body: body });
  if (messagingServiceSid) params.set("MessagingServiceSid", messagingServiceSid);
  else params.set("From", from!);

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        signal: AbortSignal.timeout(15000),
      }
    );
    const data = (await res.json().catch(() => ({}))) as { sid?: string; message?: string };
    if (res.ok && data.sid) return { ok: true, configured: true, sid: data.sid };
    return { ok: false, configured: true, error: data.message || `twilio_${res.status}` };
  } catch (err) {
    return { ok: false, configured: true, error: err instanceof Error ? err.message : "send_failed" };
  }
}
