"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { getTreatmentLabel } from "@/lib/constants/treatment-types";
import AddPatientModal from "@/Components/clinic-portal/AddPatientModal";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  treatment_type: string | null;
  consultation_date: string | null;
  video_url: string | null;
  video_watched: number;
  survey_completed: number;
}

export default function PatientsListPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPatients = useCallback(async () => {
    try {
      const res = await fetch("/api/clinic/patients?limit=200");
      const data = await res.json();
      if (data.patients) setPatients(data.patients);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white font-extralight">Patients</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600
            hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium
            transition-all shadow-lg shadow-violet-600/20"
        >
          + Add Patient
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Treatment</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Consultation</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Video</th>
                <th className="text-right px-4 py-3 text-gray-400 font-medium w-28"></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => router.push(`/clinic/dashboard/patients/${p.id}`)}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-white">
                    {p.first_name} {p.last_name}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {p.treatment_type ? getTreatmentLabel(p.treatment_type) : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {p.consultation_date || "—"}
                  </td>
                  <td className="px-4 py-3">
                    {p.survey_completed ? (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Survey done
                      </span>
                    ) : p.video_watched ? (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Watched
                      </span>
                    ) : p.video_url ? (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        Ready
                      </span>
                    ) : (
                      <span className="text-gray-600 text-xs">&mdash;</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {!p.video_url ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/clinic/dashboard/pipeline?patient_id=${p.id}`);
                        }}
                        className="inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        Generate <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <a
                        href={p.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-500 hover:text-white transition-colors inline-block"
                        title="Preview video"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    )}
                  </td>
                </motion.tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    No patients yet. Click &ldquo;Add Patient&rdquo; to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <AddPatientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={fetchPatients}
      />
    </div>
  );
}
