"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AccessCodeInput from "@/Components/patient-portal/AccessCodeInput";

export default function PatientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (accessCode.length !== 6) {
      setError("Please enter your 6-digit access code");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/patient/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          date_of_birth: dob,
          access_code: accessCode,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            "We couldn't find your account. Please check your credentials or contact your dental office."
        );
        return;
      }

      // Store patient/clinic data in sessionStorage for the portal page
      sessionStorage.setItem("patientData", JSON.stringify(data));
      router.push("/patient/portal");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-light text-gray-100"
          >
            Welcome back
          </motion.h1>
          <p className="text-gray-500 text-sm mt-2">
            Access your treatment information
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 space-y-5"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl bg-gray-950/80 border border-gray-700 text-white text-base p-3.5
                focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 outline-none
                placeholder:text-gray-600"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full rounded-xl bg-gray-950/80 border border-gray-700 text-white text-base p-3.5
                focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 outline-none
                [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-3 block text-center">
              Access Code
            </label>
            <AccessCodeInput value={accessCode} onChange={setAccessCode} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600
              hover:from-violet-500 hover:to-purple-500 text-white font-medium
              transition-all shadow-lg shadow-violet-600/20
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "View My Treatment"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-700 text-xs mt-8">
          Powered by Opera AI
        </p>
      </motion.div>
    </div>
  );
}
