"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Users,
  Wand2,
  Video,
  BarChart3,
  KeyRound,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/clinic/dashboard", icon: Home },
  { label: "Patients", href: "/clinic/dashboard/patients", icon: Users },
  { label: "Generate Video", href: "/clinic/dashboard/pipeline", icon: Wand2 },
  { label: "Videos", href: "/clinic/dashboard/videos", icon: Video },
  { label: "Analytics", href: "/clinic/dashboard/analytics", icon: BarChart3 },
  { label: "API Keys", href: "/clinic/dashboard/api-keys", icon: KeyRound },
  { label: "Billing", href: "/clinic/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/clinic/dashboard/settings", icon: Settings },
];

export default function ClinicDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [clinicName, setClinicName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const cookieClinicName = document.cookie
      .split("; ")
      .find((c) => c.startsWith("opera-clinic-name="))
      ?.split("=")[1];
    if (cookieClinicName) setClinicName(decodeURIComponent(cookieClinicName));
  }, []);

  // Close the mobile sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  function handleLogout() {
    document.cookie =
      "opera-clinic-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "opera-clinic-name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/clinic/login");
  }

  const nav = (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive =
          href === "/clinic/dashboard"
            ? pathname === "/clinic/dashboard"
            : (pathname ?? "").startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-violet-500/15 text-violet-300"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  const sidebarFooter = (
    <div className="px-3 py-4 border-t border-white/10 space-y-2">
      {clinicName && (
        <div className="px-3 text-sm text-gray-500 truncate" title={clinicName}>
          {clinicName}
        </div>
      )}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        Log out
      </button>
    </div>
  );

  const logo = (
    <Link href="/clinic/dashboard" className="flex items-center gap-2.5">
      <span className="text-lg font-semibold text-white tracking-tight">
        Opera
      </span>
      <span className="text-[11px] text-violet-400 font-medium bg-violet-500/10 px-2 py-0.5 rounded-full">
        Clinic
      </span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="px-4 h-14 flex items-center justify-between">
          {logo}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-60 flex flex-col
          border-r border-white/10 bg-black/80 backdrop-blur-xl
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0 pt-14 md:pt-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <div className="hidden md:flex items-center px-6 h-14 border-b border-white/10">
          {logo}
        </div>
        {nav}
        {sidebarFooter}
      </aside>

      {/* Main content */}
      <main className="md:pl-60">
        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
