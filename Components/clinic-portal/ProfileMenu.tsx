"use client";

/**
 * Top-right profile menu — avatar, account details, and the location
 * switcher for multi-location owners. Each location is its own portal;
 * switching re-issues the session and reloads into that location.
 */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, LogOut, MapPin, User } from "lucide-react";

interface LocationRow {
  clinicId: string;
  clinicName: string;
  address: string;
  active: boolean;
}

export default function ProfileMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [locations, setLocations] = useState<LocationRow[]>([]);
  const [switching, setSwitching] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

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
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const active = locations.find((l) => l.active);
  const initials = (active?.clinicName ?? "O")
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

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

  const logout = () => {
    document.cookie = "opera-clinic-token=; Max-Age=0; path=/";
    document.cookie = "opera-clinic-name=; Max-Age=0; path=/";
    router.push("/final/login");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        className="flex items-center gap-1.5 rounded-full border border-[#1a1a17]/12 bg-white py-1 pl-1 pr-2.5 transition-colors hover:border-[#5f7a61]/40"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5f7a61] text-[12px] font-semibold text-white">
          {initials || "O"}
        </span>
        <ChevronDown size={14} className="text-[#6e7a71]" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[300px] overflow-hidden rounded-2xl border border-[#1a1a17]/10 bg-white shadow-[0_24px_60px_-20px_rgba(26,26,23,0.3)]">
          <div className="border-b border-[#1a1a17]/[0.07] px-4 py-3.5">
            <p className="cf-body truncate text-[14.5px] font-medium text-[#1a1a17]">
              {active?.clinicName ?? "Your clinic"}
            </p>
            <p className="cf-body mt-0.5 truncate text-[12.5px] text-[#6e7a71]">{email}</p>
          </div>

          {locations.length > 1 && (
            <div className="border-b border-[#1a1a17]/[0.07] py-1.5">
              <p className="cf-mono px-4 pb-1 pt-1.5 text-[10px] uppercase tracking-[0.14em] text-[#6e7a71]">
                Locations
              </p>
              {locations.map((l) => (
                <button
                  key={l.clinicId}
                  onClick={() => !l.active && switchTo(l.clinicId)}
                  disabled={Boolean(switching)}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors ${
                    l.active ? "bg-[#5f7a61]/[0.06]" : "hover:bg-[#1a1a17]/[0.03]"
                  }`}
                >
                  <MapPin size={14} className="shrink-0 text-[#5f7a61]" />
                  <span className="cf-body min-w-0 flex-1 truncate text-[13.5px] text-[#1a1a17]">
                    {switching === l.clinicId ? "Switching…" : l.clinicName}
                  </span>
                  {l.active && <Check size={14} className="shrink-0 text-[#5f7a61]" />}
                </button>
              ))}
            </div>
          )}

          <div className="py-1.5">
            <a
              href="/clinic/dashboard/profile"
              className="cf-body flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#1a1a17] transition-colors hover:bg-[#1a1a17]/[0.03]"
            >
              <User size={14} className="text-[#6e7a71]" /> View profile
            </a>
            <button
              onClick={logout}
              className="cf-body flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13.5px] text-[#1a1a17] transition-colors hover:bg-[#1a1a17]/[0.03]"
            >
              <LogOut size={14} className="text-[#6e7a71]" /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
