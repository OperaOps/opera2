"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/** Username and password, nothing else. Signs into the actual platform. */
export default function FinalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/clinic/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        window.location.href = "/clinic/dashboard/patients";
      } else {
        setError("That login didn't work. Check your username and password.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px]"
      >
        <a href="/final" className="cf-display text-[26px] tracking-[-0.01em] text-[#1a1a17]">
          Opera<span className="text-[#5f7a61]">AI</span>
        </a>
        <p className="cf-body mt-2 text-[15.5px] text-[#5e6a60]">
          Log in to your clinic.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="cf-mono block text-[12px] uppercase tracking-[0.14em] text-[#5e6a60]">
              Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              className="cf-body mt-2 w-full rounded-xl border border-[#1a1a17]/15 bg-white px-4 py-3 text-[15.5px] text-[#1a1a17] outline-none transition-colors focus:border-[#5f7a61]"
            />
          </div>
          <div>
            <label className="cf-mono block text-[12px] uppercase tracking-[0.14em] text-[#5e6a60]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="cf-body mt-2 w-full rounded-xl border border-[#1a1a17]/15 bg-white px-4 py-3 text-[15.5px] text-[#1a1a17] outline-none transition-colors focus:border-[#5f7a61]"
            />
          </div>

          {error && (
            <p className="cf-body text-[14px] text-[#b91c1c]">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="cf-body w-full rounded-full bg-[#1a1a17] py-3.5 text-[15.5px] font-medium text-white transition-colors duration-300 hover:bg-[#5f7a61] disabled:opacity-60"
          >
            {busy ? "Logging in" : "Log in"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
