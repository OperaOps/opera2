"use client";

/**
 * Profile — the owner's account details and location management. Each
 * location is a standalone portal (own patients, videos, branding); this
 * page shows which one you're in and lets you jump between them.
 */

import { useEffect, useState } from "react";
import { Check, MapPin } from "lucide-react";

interface LocationRow {
  clinicId: string;
  clinicName: string;
  address: string;
  status: string;
  active: boolean;
}

interface ClinicInfo {
  clinic_name?: string;
  clinic_email?: string;
  clinic_phone?: string;
  clinic_address?: string;
  created_at?: string;
}

interface BillingInfo {
  plan?: string;
  status?: string;
  videosGenerated?: number;
  hasSubscription?: boolean;
}

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [locations, setLocations] = useState<LocationRow[]>([]);
  const [clinic, setClinic] = useState<ClinicInfo>({});
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [switching, setSwitching] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/clinic/locations")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setEmail(d.email ?? "");
          setLocations(d.locations ?? []);
        }
      })
      .catch(() => {});
    fetch("/api/clinic/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setClinic(d.clinic ?? {});
          setBilling(d.billing ?? null);
        }
      })
      .catch(() => {});
  }, []);

  const switchTo = async (clinicId: string) => {
    if (switching) return;
    setSwitching(clinicId);
    try {
      const res = await fetch("/api/clinic/switch-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clinicId }),
      });
      if (res.ok) {
        window.location.href = "/clinic/dashboard/patients";
        return;
      }
    } catch {
      /* fall through */
    }
    setSwitching(null);
  };

  const comped = billing?.status === "active" && !billing?.hasSubscription;

  return (
    <div className="mx-auto max-w-[760px]">
      <h1 className="cf-display text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-[#1a1a17]">
        Profile
      </h1>
      <p className="cf-body mt-1.5 text-[15px] text-[#5e6a60]">
        Your account, and every location it can manage.
      </p>

      {/* account */}
      <div className="mt-8 rounded-2xl border border-[#1a1a17]/10 bg-white p-7">
        <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
          Account
        </p>
        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          <div>
            <p className="cf-mono text-[10.5px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Current location
            </p>
            <p className="cf-body mt-1 text-[15px] font-medium text-[#1a1a17]">
              {clinic.clinic_name ?? "—"}
            </p>
          </div>
          <div>
            <p className="cf-mono text-[10.5px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Login email
            </p>
            <p className="cf-body mt-1 text-[15px] text-[#1a1a17]">{email || "—"}</p>
          </div>
          <div>
            <p className="cf-mono text-[10.5px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Phone
            </p>
            <p className="cf-body mt-1 text-[15px] text-[#1a1a17]">
              {clinic.clinic_phone || "—"}
            </p>
          </div>
          <div>
            <p className="cf-mono text-[10.5px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Address
            </p>
            <p className="cf-body mt-1 text-[15px] text-[#1a1a17]">
              {clinic.clinic_address || "—"}
            </p>
          </div>
          <div>
            <p className="cf-mono text-[10.5px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Plan
            </p>
            <p className="cf-body mt-1 text-[15px] capitalize text-[#1a1a17]">
              {comped
                ? "Active — managed by Opera"
                : billing
                  ? `${billing.plan ?? "monthly"} · ${billing.status}`
                  : "Demo"}
            </p>
          </div>
          <div>
            <p className="cf-mono text-[10.5px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Member since
            </p>
            <p className="cf-body mt-1 text-[15px] text-[#1a1a17]">
              {clinic.created_at
                ? new Date(clinic.created_at).toLocaleDateString(undefined, {
                    month: "long",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* locations */}
      <div className="mt-6 rounded-2xl border border-[#1a1a17]/10 bg-white p-7">
        <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
          Locations
        </p>
        <p className="cf-body mt-2 text-[13.5px] text-[#5e6a60]">
          Each location is its own portal — separate patients, videos, and
          branding. Videos and patient pages always show the location
          they were made in.
        </p>
        <div className="mt-4 space-y-2.5">
          {locations.map((l) => (
            <div
              key={l.clinicId}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 ${
                l.active ? "border-[#5f7a61]/40 bg-[#5f7a61]/[0.05]" : "border-[#1a1a17]/10"
              }`}
            >
              <MapPin size={16} className="shrink-0 text-[#5f7a61]" />
              <div className="min-w-0 flex-1">
                <p className="cf-body truncate text-[14.5px] font-medium text-[#1a1a17]">
                  {l.clinicName}
                </p>
                {l.address && (
                  <p className="cf-body truncate text-[12.5px] text-[#6e7a71]">{l.address}</p>
                )}
              </div>
              {l.active ? (
                <span className="cf-mono inline-flex items-center gap-1.5 rounded-full bg-[#5f7a61]/10 px-3 py-1 text-[10.5px] uppercase tracking-[0.08em] text-[#3e5540]">
                  <Check size={11} /> Current
                </span>
              ) : (
                <button
                  onClick={() => switchTo(l.clinicId)}
                  disabled={Boolean(switching)}
                  className="cf-body rounded-full bg-[#5f7a61] px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-[#4e6650] disabled:opacity-60"
                >
                  {switching === l.clinicId ? "Switching…" : "Switch"}
                </button>
              )}
            </div>
          ))}
        </div>
        {locations.length <= 1 && (
          <p className="cf-body mt-4 text-[13px] text-[#6e7a71]">
            Running more than one office? Email{" "}
            <a href="mailto:opera@getopera.ai" className="underline underline-offset-2">
              opera@getopera.ai
            </a>{" "}
            and we&rsquo;ll add your other locations to this login.
          </p>
        )}
      </div>
    </div>
  );
}
