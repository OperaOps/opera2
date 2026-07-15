"use client";

/**
 * Clinic login — matches the marketing site's white/purple design language.
 * Same auth flow: POST /api/auth/clinic/login → JWT cookie → /clinic/dashboard.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

export default function ClinicLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/clinic/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/clinic/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 antialiased selection:bg-purple-100">
      {/* Minimal nav, same as the landing */}
      <nav className="border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-[17px] font-semibold tracking-tight">
            Opera<span className="text-purple-600">AI</span>
          </Link>
        </div>
      </nav>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <h1 className="text-center text-[26px] font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-center text-[13.5px] text-gray-500">
            Log in to your clinic portal.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="text-[12.5px] font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourclinic.com"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[14px] text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-[12.5px] font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[14px] text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-[12.5px] text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 py-3 text-[14px] font-medium text-white transition-colors hover:bg-purple-500 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Log in <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-gray-400">
            New to Opera?{" "}
            <Link href="/pricing" className="font-medium text-purple-600 hover:text-purple-500">
              Start your free trial →
            </Link>
          </p>

        </motion.div>
      </main>

      <footer className="border-t border-gray-100 py-6 text-center text-[12px] text-gray-300">
        © {new Date().getFullYear()} Opera AI
      </footer>
    </div>
  );
}
