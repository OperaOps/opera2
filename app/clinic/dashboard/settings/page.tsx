"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function SettingsPage() {
  const [clinicName, setClinicName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/clinic/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.clinic) {
          setClinicName(data.clinic.clinic_name || "");
          setLogoUrl(data.clinic.clinic_logo_url || "");
          setEmail(data.clinic.clinic_email || "");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/clinic/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinic_name: clinicName,
          clinic_logo_url: logoUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      // Keep the layout's clinic-name cookie in sync
      document.cookie = `opera-clinic-name=${encodeURIComponent(
        clinicName
      )}; path=/; max-age=${7 * 24 * 60 * 60}`;
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl text-gray-900 font-semibold tracking-tight mb-1">Settings</h2>
      <p className="text-sm text-gray-500 mb-6">
        Your clinic profile, shown to patients on their video pages.
      </p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSave}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5"
      >
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div>
              <label
                htmlFor="clinic_name"
                className="block text-sm text-gray-700 font-medium mb-1.5"
              >
                Clinic name
              </label>
              <input
                id="clinic_name"
                type="text"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200
                  text-gray-900 text-sm placeholder:text-gray-400 outline-none
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-colors"
                placeholder="Bright Smiles Orthodontics"
              />
            </div>

            <div>
              <label
                htmlFor="clinic_logo_url"
                className="block text-sm text-gray-700 font-medium mb-1.5"
              >
                Logo URL
              </label>
              <input
                id="clinic_logo_url"
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200
                  text-gray-900 text-sm placeholder:text-gray-400 outline-none
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-colors"
                placeholder="https://yourclinic.com/logo.png"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Optional. Used for co-branding on patient video pages.
              </p>
            </div>

            {email && (
              <div>
                <label className="block text-sm text-gray-700 font-medium mb-1.5">
                  Account email
                </label>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500
                  text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
              <AnimatePresence>
                {saved && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-sm text-green-700"
                  >
                    <Check className="w-4 h-4" /> Saved
                  </motion.span>
                )}
              </AnimatePresence>
              {error && <span className="text-sm text-red-600">{error}</span>}
            </div>
          </>
        )}
      </motion.form>
    </div>
  );
}
