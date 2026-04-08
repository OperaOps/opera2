"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Home, Users, BarChart3, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/clinic/dashboard", icon: Home },
  { label: "Patients", href: "/clinic/dashboard/patients", icon: Users },
  { label: "Analytics", href: "/clinic/dashboard/analytics", icon: BarChart3 },
];

export default function ClinicDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [clinicName, setClinicName] = useState("");

  useEffect(() => {
    const cookieClinicName = document.cookie
      .split("; ")
      .find((c) => c.startsWith("opera-clinic-name="))
      ?.split("=")[1];
    if (cookieClinicName) setClinicName(decodeURIComponent(cookieClinicName));
  }, []);

  function handleLogout() {
    document.cookie =
      "opera-clinic-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "opera-clinic-name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/clinic/login");
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Top nav bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Left: Logo + nav */}
          <div className="flex items-center gap-8">
            <Link
              href="/clinic/dashboard"
              className="flex items-center gap-2.5"
            >
              <span className="text-lg font-semibold text-white tracking-tight">
                Opera
              </span>
              <span className="text-[11px] text-violet-400 font-medium bg-violet-500/10 px-2 py-0.5 rounded-full">
                Clinic
              </span>
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map(({ label, href, icon: Icon }) => {
                let isActive = false;
                if (href === "/clinic/dashboard") {
                  isActive =
                    pathname === "/clinic/dashboard" ||
                    pathname.startsWith("/clinic/dashboard/pipeline");
                } else {
                  isActive = pathname.startsWith(href);
                }

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-violet-500/15 text-violet-300"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Clinic name + logout */}
          <div className="flex items-center gap-4">
            {clinicName && (
              <span className="text-sm text-gray-500 hidden md:inline">
                {clinicName}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main content — full width, no sidebar */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
