"use client";

/**
 * Clinic portal shell — matches the getopera.ai marketing site exactly:
 * white surfaces, sage #5f7a61 accent, Fraunces display / Archivo body /
 * Plex Mono labels (via Shell). Five items, nothing else.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Shell from "@/app/final/components/Shell";
import {
  Users,
  Film,
  Sparkles,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  { href: "/clinic/dashboard/patients", label: "Patients", icon: Users },
  { href: "/clinic/dashboard/videos", label: "Videos", icon: Film },
  { href: "/clinic/dashboard/pipeline", label: "Generate", icon: Sparkles },
  { href: "/clinic/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/clinic/dashboard/settings", label: "Settings", icon: Settings },
];

export default function ClinicDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [clinicName, setClinicName] = useState("Your clinic");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith("opera-clinic-name="));
    if (match) {
      try {
        setClinicName(decodeURIComponent(match.split("=")[1]));
      } catch {
        /* keep default */
      }
    }
  }, []);

  const logout = () => {
    document.cookie = "opera-clinic-token=; Max-Age=0; path=/";
    document.cookie = "opera-clinic-name=; Max-Age=0; path=/";
    router.push("/final/login");
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-2.5 px-5 pt-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/videos/sitepics/logo-mark.png" alt="" className="h-[30px] w-[30px]" />
        <span className="cf-display text-[21px] leading-none tracking-[-0.01em] text-[#1a1a17]">
          Opera<span className="text-[#5f7a61]">AI</span>
        </span>
      </Link>

      <p className="cf-mono mt-6 px-5 text-[11px] uppercase tracking-[0.16em] text-[#6e7a71]">
        {clinicName}
      </p>

      <nav className="mt-3 flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors ${
                active
                  ? "bg-[#5f7a61]/[0.09] text-[#3e5540]"
                  : "text-[#1a1a17]/60 hover:bg-[#1a1a17]/[0.04] hover:text-[#1a1a17]"
              }`}
            >
              <item.icon size={17} strokeWidth={active ? 2.2 : 1.9} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#1a1a17]/10 p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-[#1a1a17]/60 transition-colors hover:bg-[#1a1a17]/[0.04] hover:text-[#1a1a17]"
        >
          <LogOut size={17} strokeWidth={1.9} />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <Shell>
      <div className="flex min-h-screen bg-white">
        <aside className="hidden w-[236px] shrink-0 border-r border-[#1a1a17]/10 md:block">
          <div className="sticky top-0 h-screen">{sidebar}</div>
        </aside>

        <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-[#1a1a17]/10 bg-white px-4 md:hidden">
          <span className="cf-display text-[19px] text-[#1a1a17]">
            Opera<span className="text-[#5f7a61]">AI</span>
          </span>
          <button aria-label="Menu" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="fixed inset-0 z-30 bg-white pt-14 md:hidden">{sidebar}</div>
        )}

        <main className="min-w-0 flex-1 px-5 pb-16 pt-20 md:px-10 md:pt-10">
          {children}
        </main>
      </div>
    </Shell>
  );
}
