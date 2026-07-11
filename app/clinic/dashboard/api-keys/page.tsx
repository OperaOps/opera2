"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { KeyRound, Eye, EyeOff, Copy, Check, RefreshCw } from "lucide-react";

function maskKey(key: string): string {
  if (key.length <= 14) return key;
  return `${key.slice(0, 9)}${"•".repeat(24)}${key.slice(-4)}`;
}

function curlExample(key: string): string {
  return `curl -X POST https://getopera.ai/api/v1/video/generate \\
  -H "Authorization: Bearer ${key}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "patient_name": "Sarah Johnson",
    "doctor_name": "Dr. Smith",
    "clinic_name": "Bright Smiles Orthodontics",
    "diagnosis": "crowding",
    "treatment": "invisalign",
    "treatment_notes": "Moderate crowding, 14-month aligner plan",
    "content_mode": "full_ai",
    "mode": "premium"
  }'`;
}

export default function ApiKeysPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/clinic/api-key")
      .then((res) => res.json())
      .then((data) => setApiKey(data.apiKey ?? null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function generateKey(isRotation: boolean) {
    if (
      isRotation &&
      !window.confirm(
        "Rotate your API key? The current key will stop working immediately."
      )
    ) {
      return;
    }
    setRotating(true);
    setError("");
    try {
      const res = await fetch("/api/clinic/api-key", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setApiKey(data.apiKey);
      setRevealed(true);
    } catch {
      setError("Failed to generate key. Please try again.");
    } finally {
      setRotating(false);
    }
  }

  async function copyKey() {
    if (!apiKey) return;
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silent
    }
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl text-white font-extralight mb-1">API Keys</h2>
      <p className="text-sm text-gray-500 mb-6">
        Generate patient education videos programmatically from your own
        systems.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="w-4 h-4 text-violet-400" />
          <h3 className="text-white text-sm font-medium">Your API key</h3>
        </div>

        {loading ? (
          <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
        ) : apiKey ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <code
                className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10
                  text-sm text-violet-300 font-mono overflow-x-auto whitespace-nowrap"
              >
                {revealed ? apiKey : maskKey(apiKey)}
              </code>
              <button
                onClick={() => setRevealed((v) => !v)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400
                  hover:text-white hover:border-violet-500/40 transition-colors"
                title={revealed ? "Hide key" : "Reveal key"}
              >
                {revealed ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={copyKey}
                className={`p-2 rounded-lg border transition-colors ${
                  copied
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-violet-500/40"
                }`}
                title="Copy key"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <button
              onClick={() => generateKey(true)}
              disabled={rotating}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium
                bg-white/5 text-gray-300 border border-white/10 hover:text-white
                hover:border-violet-500/40 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${rotating ? "animate-spin" : ""}`}
              />
              Rotate key
            </button>
          </>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mb-4">
              No API key yet. Generate one to start using the Opera video API.
            </p>
            <button
              onClick={() => generateKey(false)}
              disabled={rotating}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600
                hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium
                transition-all shadow-lg shadow-violet-600/20 disabled:opacity-50"
            >
              {rotating ? "Generating…" : "Generate API key"}
            </button>
          </div>
        )}
        {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
      >
        <h3 className="text-white text-sm font-medium mb-1">Example request</h3>
        <p className="text-xs text-gray-500 mb-4">
          POST /api/v1/video/generate — generates a personalized patient video.
        </p>
        <pre
          className="px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-xs
            text-gray-300 font-mono overflow-x-auto leading-relaxed"
        >
          {curlExample(apiKey && revealed ? apiKey : "opk_live_YOUR_API_KEY")}
        </pre>
      </motion.div>
    </div>
  );
}
