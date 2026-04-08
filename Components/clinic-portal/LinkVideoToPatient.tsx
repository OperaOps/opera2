"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  treatment_type: string | null;
}

interface LinkVideoToPatientProps {
  videoUrl: string;
  videoTitle?: string;
  treatmentType: string;
  open: boolean;
  onClose: () => void;
  onLinked: () => void;
  onCreateNew: () => void;
}

export default function LinkVideoToPatient({
  videoUrl,
  videoTitle,
  treatmentType,
  open,
  onClose,
  onLinked,
  onCreateNew,
}: LinkVideoToPatientProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [linking, setLinking] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    fetch("/api/clinic/patients?limit=200")
      .then((r) => r.json())
      .then((d) => setPatients(d.patients || []))
      .catch(() => {});
  }, [open]);

  const filtered = patients.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.first_name.toLowerCase().includes(q) ||
      p.last_name.toLowerCase().includes(q) ||
      (p.treatment_type || "").toLowerCase().includes(q)
    );
  });

  async function linkToPatient(patientId: string) {
    setLinking(patientId);
    try {
      const res = await fetch("/api/clinic/videos/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_url: videoUrl,
          video_title: videoTitle,
          treatment_type: treatmentType,
          patient_id: patientId,
        }),
      });
      if (res.ok) {
        onLinked();
        onClose();
      }
    } finally {
      setLinking(null);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-950 border border-white/10 rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col"
          >
            <div className="p-5 border-b border-white/10">
              <h3 className="text-lg text-white font-light">
                Link Video to Patient
              </h3>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients..."
                className="w-full mt-3 rounded-lg bg-gray-900/80 border border-gray-700 text-white text-sm p-2.5
                  focus:border-violet-500 outline-none placeholder:text-gray-600"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => linkToPatient(p.id)}
                  disabled={linking === p.id}
                  className="w-full flex items-center justify-between p-3 rounded-lg
                    hover:bg-white/5 transition-colors text-left"
                >
                  <div>
                    <p className="text-sm text-white">
                      {p.first_name} {p.last_name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {p.treatment_type?.replace(/_/g, " ") || "No treatment"}
                    </p>
                  </div>
                  {linking === p.id && (
                    <span className="text-xs text-violet-400">Linking...</span>
                  )}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-gray-600 text-sm py-4">
                  No patients found
                </p>
              )}
            </div>

            <div className="p-3 border-t border-white/10">
              <button
                onClick={onCreateNew}
                className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10
                  text-violet-400 text-sm transition-colors"
              >
                + Create New Patient with this video
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
