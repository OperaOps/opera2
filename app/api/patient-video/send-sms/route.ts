/**
 * POST /api/patient-video/send-sms   — Greyfinch Comms (task 2)
 *
 * Texts a patient their generated video link via Greyfinch's `sendSms` mutation.
 *
 * Flow:
 *   1. Get a connection-scoped token for the org (mint client key + login).
 *   2. Look up the patient by name → pull their phone straight from the chart
 *      (no need for the provider to type a number).
 *   3. Fill the SMS template ({name}/{clinic}/{url}) and send.
 *
 * Training has no live outbound number, and Greyfinch confirmed real sends don't
 * happen in the test env — so when we can't actually dispatch, we return a
 * *simulated* success that echoes the exact payload (recipient + message) the
 * sandbox dev can verify. The request to Greyfinch is still attempted for real.
 *
 * The message is a fixed, built-in template (not clinic-configurable).
 *
 * Body: { videoUrl, patientName?, xid?, toNumber?, message?, clinicName? }
 */

import { NextRequest, NextResponse } from "next/server";
import { gql, connectionToken, findPatient, ORG_XID } from "../_lib/greyfinch";
import { authorizeVideoRequest } from "@/lib/connect/auth";

// Preset SMS templates the clinic can pick at install (by name), plus the
// default. The clinic can also write their own message (with {name}/{clinic}/{url}).
const PRESETS: Record<string, string> = {
  friendly: "Hi {name}! 😊 Your care team at {clinic} made a personalized video just for you — take a look: {url}",
  professional: "Hello {name}, your personalized treatment video from {clinic} is ready to view: {url}",
  brief: "Hi {name}, here's your personalized video from {clinic}: {url}",
};
const DEFAULT_PRESET = "brief";

/**
 * Resolve the clinic's `smsTemplate` app-property value into a template string:
 *   - blank / unresolved merge field  -> default preset
 *   - a preset name (friendly/etc.)   -> that preset
 *   - anything else                   -> their custom message (verbatim)
 * A custom message missing {url} gets the link appended so it's never dropped.
 */
function resolveTemplate(raw: string | undefined): string {
  const t = (raw ?? "").trim();
  if (!t || t.includes("{{")) return PRESETS[DEFAULT_PRESET];
  const preset = PRESETS[t.toLowerCase()];
  if (preset) return preset;
  return /\{url\}/i.test(t) ? t : `${t} {url}`;
}

function fillTemplate(tpl: string, vars: { name: string; clinic: string; url: string }): string {
  const who = vars.name && vars.name !== "there" ? vars.name : "there";
  return tpl
    .replace(/\{name\}/gi, who)
    .replace(/\{clinic\}/gi, vars.clinic)
    .replace(/\{url\}/gi, vars.url)
    .trim();
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const keyAuth = await authorizeVideoRequest(request, { body });
  if (!keyAuth.ok) {
    return NextResponse.json({ error: keyAuth.error, code: keyAuth.code }, { status: keyAuth.status });
  }

  const videoUrl = typeof body.videoUrl === "string" ? body.videoUrl : "";
  if (!videoUrl) {
    return NextResponse.json({ error: "videoUrl is required." }, { status: 400 });
  }
  const patientName = typeof body.patientName === "string" ? body.patientName : "";
  const xid = typeof body.xid === "string" ? body.xid : "";
  const clinicName = typeof body.clinicName === "string" && body.clinicName.trim() ? body.clinicName.trim() : "your care team";
  let toNumber = typeof body.toNumber === "string" ? body.toNumber.trim() : "";

  // Message = clinic's chosen template (preset name or custom, from the app
  // property via the launcher), filled with patient/clinic/url. An explicit
  // `message` override still wins (e.g. for testing).
  const template = typeof body.template === "string" ? body.template : "";
  const message =
    typeof body.message === "string" && body.message.trim()
      ? body.message.trim()
      : fillTemplate(resolveTemplate(template), { name: patientName || "there", clinic: clinicName, url: videoUrl });

  try {
    // 1. Connection-scoped token (also gates the phone lookup + real send).
    const auth = await connectionToken(ORG_XID);
    if (!auth) {
      return NextResponse.json({
        ok: true,
        simulated: true,
        reason: "no connection for org (app not installed/connected) — env may be resetting",
        payload: { message, toNumber: toNumber || "(no recipient)" },
      });
    }

    // 2. Pull the patient's phone from the chart when not supplied. Picks a
    //    textable CELL (preferring a comms-preference number) — see findPatient.
    let phoneSource: "provided" | "patient_record" | "none" = toNumber ? "provided" : "none";
    let phoneFrom: string | undefined;
    let phoneCount: number | undefined;
    if (!toNumber && patientName) {
      const patient = await findPatient(auth, { name: patientName, xid });
      phoneCount = patient?.phoneCount;
      if (patient?.phone) {
        toNumber = patient.phone;
        phoneSource = "patient_record";
        phoneFrom = patient.phoneFrom; // "comms_preference" | "cell"
      }
    }

    const payload = {
      message,
      toNumber: toNumber || "(no recipient configured)",
      phoneSource,
      phoneFrom,
      phoneCount,
    };

    // 3. Find an outbound number to send from.
    const nums = await gql<{ outboundNumbers: Array<{ id: string }> }>(
      `query{ outboundNumbers(limit:1){ id } }`,
      {},
      auth
    );
    const outboundNumberId = nums.data?.outboundNumbers?.[0]?.id;

    // 4. Real send only when we have both a recipient and a sending number.
    if (outboundNumberId && toNumber) {
      const sent = await gql<{ sendSms: { id: string; createdAt: string } }>(
        `mutation($m:String!,$o:uuid!,$t:String!){ sendSms(message:$m,outboundNumberId:$o,toNumber:$t){ id createdAt } }`,
        { m: message, o: outboundNumberId, t: toNumber },
        auth
      );
      if (sent.data?.sendSms?.id) {
        return NextResponse.json({ ok: true, simulated: false, smsId: sent.data.sendSms.id, payload });
      }
      return NextResponse.json({
        ok: true,
        simulated: true,
        reason: `sendSms returned no id: ${JSON.stringify(sent.errors ?? sent.data)}`,
        payload,
      });
    }

    // 5. POC fallback — prove the flow without a live number (expected on training).
    return NextResponse.json({
      ok: true,
      simulated: true,
      reason: !toNumber
        ? "no phone on the patient record (and none provided)"
        : "no outbound number configured on this tenant",
      payload,
    });
  } catch (e) {
    return NextResponse.json({
      ok: true,
      simulated: true,
      reason: e instanceof Error ? e.message : "send failed",
      payload: { message, toNumber: toNumber || "(no recipient)" },
    });
  }
}
