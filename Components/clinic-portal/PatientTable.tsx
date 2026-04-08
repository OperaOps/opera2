"use client";

import { motion } from "framer-motion";
import { getTreatmentLabel } from "@/lib/constants/treatment-types";

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

interface PatientTableProps {
  patients: Patient[];
  onSelect: (patient: Patient) => void;
  onAddPatient: () => void;
}

function videoStatusDisplay(p: Patient) {
  if (p.survey_completed) {
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        Survey done
      </span>
    );
  }
  if (p.video_watched) {
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        Watched
      </span>
    );
  }
  if (p.video_url) {
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
        Ready
      </span>
    );
  }
  return <span className="text-gray-600 text-xs">&mdash;</span>;
}

export default function PatientTable({
  patients,
  onSelect,
  onAddPatient,
}: PatientTableProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white font-extralight">Patients</h2>
        <button
          onClick={onAddPatient}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600
            hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium
            transition-all shadow-lg shadow-violet-600/20"
        >
          + Add Patient
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-4 py-3 text-gray-400 font-medium">Name</th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium">Treatment</th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium">Consultation</th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium">Video</th>
              <th className="text-right px-4 py-3 text-gray-400 font-medium w-16"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onSelect(p)}
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
                <td className="px-4 py-3">{videoStatusDisplay(p)}</td>
                <td className="px-4 py-3 text-right">
                  {p.video_url && (
                    <a
                      href={p.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-500 hover:text-white transition-colors"
                      title="Preview video"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
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
    </div>
  );
}
