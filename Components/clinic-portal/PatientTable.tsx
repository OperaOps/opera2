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
      <span className="px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-700 border border-green-100">
        Survey done
      </span>
    );
  }
  if (p.video_watched) {
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-700 border border-green-100">
        Watched
      </span>
    );
  }
  if (p.video_url) {
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-purple-50 text-purple-700 border border-purple-100">
        Ready
      </span>
    );
  }
  return <span className="text-gray-400 text-xs">&mdash;</span>;
}

export default function PatientTable({
  patients,
  onSelect,
  onAddPatient,
}: PatientTableProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-gray-900 font-semibold tracking-tight">Patients</h2>
        <button
          onClick={onAddPatient}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500
            text-white text-sm font-medium transition-colors"
        >
          + Add Patient
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Treatment</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Consultation</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider">Video</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium w-16"></th>
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
                className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 text-gray-900">
                  {p.first_name} {p.last_name}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {p.treatment_type ? getTreatmentLabel(p.treatment_type) : "—"}
                </td>
                <td className="px-4 py-3 text-gray-500">
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
                      className="text-gray-400 hover:text-gray-900 transition-colors"
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
                <td colSpan={5} className="text-center py-12 text-gray-400">
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
