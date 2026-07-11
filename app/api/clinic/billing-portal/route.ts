/**
 * POST /api/clinic/billing-portal — create a Stripe Billing Portal session
 * for the authenticated clinic. Finds-or-creates the Stripe customer by
 * clinic email. Responds 503 when Stripe is not configured.
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { getStripe } from "@/lib/connect/stripe";

export async function POST(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.STRIPE_SECRET_KEY?.trim()) {
    return NextResponse.json(
      { error: "Billing portal available once Stripe is connected" },
      { status: 503 }
    );
  }

  const db = getDb();
  const row = db
    .prepare("SELECT clinic_email, clinic_name FROM clinic_accounts WHERE id = ?")
    .get(clinic.clinicId) as
    | { clinic_email: string; clinic_name: string }
    | undefined;

  if (!row) {
    return NextResponse.json({ error: "Clinic not found" }, { status: 404 });
  }

  try {
    const stripe = getStripe();

    // Find-or-create customer by clinic email
    const existing = await stripe.customers.list({
      email: row.clinic_email,
      limit: 1,
    });
    const customer =
      existing.data[0] ??
      (await stripe.customers.create({
        email: row.clinic_email,
        name: row.clinic_name,
        metadata: { opera_clinic_id: clinic.clinicId },
      }));

    const returnUrl = `${request.nextUrl.origin}/clinic/dashboard/billing`;
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: returnUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Billing portal error:", err);
    return NextResponse.json(
      { error: "Failed to create billing portal session" },
      { status: 500 }
    );
  }
}
