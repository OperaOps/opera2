"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail, Building2, User, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/patient-video");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#5f7a61] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Back to home */}
        <Link href="/">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-[#a9c0aa]/70 hover:text-[#a9c0aa] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back</span>
          </motion.button>
        </Link>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-black/80 backdrop-blur-xl border-2 border-[#5f7a61]/50 rounded-2xl p-8 shadow-2xl shadow-[#3e5540]/20"
        >
          <h1 className="text-3xl font-serif text-white mb-2">Sign In</h1>
          <p className="text-[#a9c0aa]/60 text-sm font-light mb-8">
            Enter your credentials to access Opera AI
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm text-[#a9c0aa]/70 mb-2 font-light">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5f7a61]/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-[#5f7a61]/30 rounded-lg text-white placeholder-[#5f7a61]/40 focus:outline-none focus:border-[#5f7a61]/50 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-[#a9c0aa]/70 mb-2 font-light">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5f7a61]/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-[#5f7a61]/30 rounded-lg text-white placeholder-[#5f7a61]/40 focus:outline-none focus:border-[#5f7a61]/50 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full py-3 bg-gradient-to-r from-[#5f7a61] to-[#3e5540] hover:from-[#4e6650] hover:to-[#3e5540] rounded-lg text-white font-medium shadow-lg shadow-[#5f7a61]/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          {/* Demo portal access */}
          <div className="mt-8 pt-6 border-t border-[#5f7a61]/30">
            <p className="text-xs uppercase tracking-wider text-[#5f7a61]/70/60 mb-4 text-center font-medium">
              Or try the demo portals
            </p>
            <div className="space-y-3">
              <Link href="/clinic/login">
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center justify-between p-4 bg-[#5f7a61]/5 hover:bg-[#5f7a61]/10 border border-[#5f7a61]/30 hover:border-[#5f7a61]/50 rounded-lg cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#5f7a61]/20 border border-[#5f7a61]/30 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#a9c0aa]" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">
                        Clinic Portal
                      </p>
                      <p className="text-xs text-[#a9c0aa]/60 font-light">
                        Generate and send patient videos
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#5f7a61]/70 group-hover:text-[#a9c0aa] transition-colors" />
                </motion.div>
              </Link>

              <Link href="/patient/login">
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center justify-between p-4 bg-[#5f7a61]/5 hover:bg-[#5f7a61]/10 border border-[#5f7a61]/30 hover:border-[#5f7a61]/50 rounded-lg cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#5f7a61]/20 border border-[#5f7a61]/30 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#a9c0aa]" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">
                        Patient Portal
                      </p>
                      <p className="text-xs text-[#a9c0aa]/60 font-light">
                        View your treatment video
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#5f7a61]/70 group-hover:text-[#a9c0aa] transition-colors" />
                </motion.div>
              </Link>
            </div>

            {/* Demo credentials */}
            <div className="mt-5 p-3 bg-black/40 border border-[#5f7a61]/20 rounded-lg">
              <p className="text-[10px] uppercase tracking-wider text-[#5f7a61]/70/60 mb-2 font-medium">
                Demo credentials
              </p>
              <div className="space-y-1.5 text-[11px] text-[#a9c0aa]/70 font-mono">
                <div>
                  <span className="text-[#5f7a61]/70/60">Clinic:</span>{" "}
                  demo@smileortho.com / opera2024
                </div>
                <div>
                  <span className="text-[#5f7a61]/70/60">Patient:</span>{" "}
                  sarah.johnson@example.com / 1995-06-15 / 482917
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
