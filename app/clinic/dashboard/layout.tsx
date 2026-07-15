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
    if (cookieClinicName) {
      setClinicName(decodeURIComponent(cookieClinicName));
      return;
    }
    // Sessions from before the name cookie existed — resolve via the API.
    fetch("/api/clinic/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.clinic?.clinic_name) setClinicName(d.clinic.clinic_name);
      })
      .catch(() => {});
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
                ? "bg-purple-50 text-purple-700"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
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
    <div className="px-3 py-4 border-t border-gray-100 space-y-2">
      {clinicName && (
        <div className="px-3 text-sm text-gray-400 truncate" title={clinicName}>
          {clinicName}
        </div>
      )}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        Log out
      </button>
    </div>
  );

  const logo = (
    <Link href="/clinic/dashboard" className="flex items-center gap-2.5">
      <span className="text-lg font-semibold text-gray-900 tracking-tight">
        Opera<span className="text-purple-600">AI</span>
      </span>
      <span className="text-[11px] text-purple-700 font-medium bg-purple-50 px-2 py-0.5 rounded-full">
        Clinic
      </span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-xl">
        <div className="px-4 h-14 flex items-center justify-between">
          {logo}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
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
          className="md:hidden fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-60 flex flex-col
          border-r border-gray-100 bg-white
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0 pt-14 md:pt-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <div className="hidden md:flex items-center px-6 h-14 border-b border-gray-100">
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
