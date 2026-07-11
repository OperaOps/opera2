"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Video } from "lucide-react";
import { getTreatmentLabel } from "@/lib/constants/treatment-types";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  treatment_type: string | null;
  consultation_date: string | null;
  video_url: string | null;
  video_watched: number;
  survey_completed: number;
}

interface Stats {
  totalPatients: number;
  videosGenerated: number;
  videosWatched: number;
  surveysCompleted: number;
  avgLikelihood: number | null;
}

export default function ClinicDashboardHome() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalPatients: 0,
    videosGenerated: 0,
    videosWatched: 0,
    surveysCompleted: 0,
    avgLikelihood: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/clinic/patients?limit=10").then((r) => r.json()),
      fetch("/api/clinic/analytics/survey").then((r) => r.json()).catch(() => null),
    ]).then(([patientData, analytics]) => {
      const pts = patientData.patients || [];
      setPatients(pts);

      const total = patientData.pagination?.total || pts.length;
      const withVideo = pts.filter((p: Patient) => p.video_url).length;
      const watched = pts.filter((p: Patient) => p.video_watched).length;
      const surveyed = pts.filter((p: Patient) => p.survey_completed).length;

      setStats({
        totalPatients: total,
        videosGenerated: withVideo,
        videosWatched: watched,
        surveysCompleted: analytics?.summary?.totalSurveys || surveyed,
        avgLikelihood: analytics?.summary?.avgLikelihoodToProceed || null,
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Hero CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => router.push("/clinic/dashboard/pipeline")}
        className="w-full group relative overflow-hidden rounded-2xl p-8 md:p-10 text-left
          bg-gradient-to-br from-purple-50 via-white to-white
          border border-purple-200 hover:border-purple-300
          transition-all shadow-sm"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/60 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Video className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl md:text-2xl text-gray-900 font-semibold tracking-tight">
              Generate New Patient Video
            </h2>
          </div>
          <p className="text-gray-500 max-w-md">
            Create a personalized treatment video and send it to your patient in
            minutes.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
            bg-purple-600 group-hover:bg-purple-500
            text-white text-sm font-medium transition-all"
          >
            Start New Video
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.button>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Patients" value={String(stats.totalPatients)} delay={0.05} />
        <StatCard label="Videos Generated" value={String(stats.videosGenerated)} delay={0.1} />
        <StatCard
          label="Videos Watched"
          value={String(stats.videosWatched)}
          subtitle={
            stats.videosGenerated > 0
              ? `${Math.round((stats.videosWatched / stats.videosGenerated) * 100)}% watch rate`
              : undefined
          }
          delay={0.15}
        />
        <StatCard
          label="Avg Likelihood"
          value={stats.avgLikelihood != null ? `${stats.avgLikelihood}/10` : "—"}
          subtitle="to proceed"
          delay={0.2}
        />
      </div>

      {/* Recent patients */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-gray-500">Recent Patients</h3>
          <button
            onClick={() => router.push("/clinic/dashboard/patients")}
            className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-500 transition-colors"
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-2.5 text-gray-500 font-medium text-xs uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-2.5 text-gray-500 font-medium text-xs uppercase tracking-wider">Treatment</th>
                <th className="text-left px-4 py-2.5 text-gray-500 font-medium text-xs uppercase tracking-wider">Video</th>
                <th className="text-right px-4 py-2.5 text-gray-500 font-medium text-xs w-28"></th>
              </tr>
            </thead>
            <tbody>
              {patients.slice(0, 8).map((p) => (
                <tr
                  key={p.id}
                  onClick={() => router.push(`/clinic/dashboard/patients/${p.id}`)}
                  className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-2.5 text-gray-900">
                    {p.first_name} {p.last_name}
                  </td>
                  <td className="px-4 py-2.5 text-gray-500">
                    {p.treatment_type ? getTreatmentLabel(p.treatment_type) : "—"}
                  </td>
                  <td className="px-4 py-2.5">
                    {p.survey_completed ? (
                      <span className="text-xs text-green-700">Survey done</span>
                    ) : p.video_watched ? (
                      <span className="text-xs text-green-700">Watched</span>
                    ) : p.video_url ? (
                      <span className="text-xs text-purple-600">Ready</span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {!p.video_url && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/clinic/dashboard/pipeline?patient_id=${p.id}`
                          );
                        }}
                        className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-500 transition-colors"
                      >
                        Generate <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">
                    No patients yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
  delay,
}: {
  label: string;
  value: string;
  subtitle?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
    >
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-2xl text-gray-900 font-semibold tracking-tight mt-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </motion.div>
  );
}
