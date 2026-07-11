"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTreatmentLabel } from "@/lib/constants/treatment-types";
import VideoHistoryList from "@/Components/clinic-portal/VideoHistoryList";
import VideoStatusBadge from "@/Components/clinic-portal/VideoStatusBadge";

interface PatientFull {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  phone: string | null;
  treatment_type: string | null;
  consulting_provider: string | null;
  consultation_date: string | null;
  video_url: string | null;
  video_title: string | null;
  video_watched: number;
  video_watched_at: string | null;
  video_watch_duration_seconds: number;
  survey_completed: number;
  survey_completed_at: string | null;
  access_code: string;
  created_at: string;
}

interface SurveyResponse {
  [key: string]: unknown;
}

interface VideoRecord {
  id: string;
  video_url: string | null;
  video_title: string | null;
  treatment_type: string;
  render_status: string;
  render_job_id: string | null;
  watched: number;
  watched_at: string | null;
  watch_duration_seconds: number;
  is_active: number;
  created_at: string;
}

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [patient, setPatient] = useState<PatientFull | null>(null);
  const [survey, setSurvey] = useState<SurveyResponse | null>(null);
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [patientRes, videosRes] = await Promise.all([
        fetch(`/api/clinic/patients/${id}`),
        fetch(`/api/clinic/patients/${id}/videos`),
      ]);
      const patientData = await patientRes.json();
      const videosData = await videosRes.json();
      setPatient(patientData.patient);
      setSurvey(patientData.survey);
      setVideos(videosData.videos || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!patient) {
    return <p className="text-gray-500">Patient not found</p>;
  }

  const activeVideo = videos.find((v) => v.is_active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-3xl"
    >
      {/* Back button */}
      <button
        onClick={() => router.push("/clinic/dashboard/patients")}
        className="text-sm text-purple-600 hover:text-purple-500 flex items-center gap-1.5"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patients
      </button>

      {/* Patient header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl text-gray-900 font-semibold tracking-tight">
          {patient.first_name} {patient.last_name}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {patient.treatment_type ? getTreatmentLabel(patient.treatment_type) : "No treatment"}
          {patient.consulting_provider && ` · ${patient.consulting_provider}`}
          {patient.consultation_date && ` · Consulted ${patient.consultation_date}`}
        </p>
      </div>

      {/* Access credentials */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-sm text-gray-500 mb-3">Access Credentials</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Email</p>
            <p className="text-gray-700">{patient.email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Access Code</p>
            <div className="flex items-center gap-2">
              <p className="text-gray-900 font-mono text-lg">{patient.access_code}</p>
              <button onClick={() => copyToClipboard(patient.access_code)} className="text-xs text-purple-600 hover:text-purple-500">Copy</button>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Date of Birth</p>
            <p className="text-gray-700">{patient.date_of_birth}</p>
          </div>
        </div>
      </div>

      {/* Video section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-gray-500">Video</h3>
          <VideoStatusBadge
            renderStatus={activeVideo?.render_status || (patient.video_url ? "completed" : "")}
            jobId={activeVideo?.render_job_id}
            videoUrl={patient.video_url}
            watched={!!patient.video_watched}
            surveyCompleted={!!patient.survey_completed}
          />
        </div>

        {patient.video_watched ? (
          <div className="text-sm space-y-1">
            <p className="text-gray-700">
              Watched{patient.video_watched_at && ` on ${new Date(patient.video_watched_at).toLocaleDateString()}`}
            </p>
            {patient.video_watch_duration_seconds > 0 && (
              <p className="text-gray-500">
                Duration: {Math.floor(patient.video_watch_duration_seconds / 60)}:
                {(patient.video_watch_duration_seconds % 60).toString().padStart(2, "0")}
              </p>
            )}
          </div>
        ) : patient.video_url ? (
          <p className="text-gray-500 text-sm">Video sent — not yet watched</p>
        ) : (
          <p className="text-gray-400 text-sm">No video assigned</p>
        )}

        <div className="flex gap-2 mt-4">
          {patient.video_url && (
            <a
              href={patient.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 text-gray-700 text-xs transition-colors"
            >
              Preview Video
            </a>
          )}
          <button
            onClick={() => router.push(`/clinic/dashboard/pipeline?patient_id=${patient.id}`)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100
              border border-purple-100 text-purple-700 text-xs transition-colors"
          >
            Generate New Video <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Video history */}
      {videos.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm text-gray-500 mb-3">Video History</h3>
          <VideoHistoryList videos={videos} />
        </div>
      )}

      {/* Survey response */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-sm text-gray-500 mb-3">Survey Response</h3>
        {survey ? (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {Object.entries(survey)
              .filter(([key]) => key.startsWith("q_") && survey[key] != null)
              .map(([key, value]) => (
                <div key={key}>
                  <p className="text-gray-500 text-xs capitalize">{key.replace(/^q_/, "").replace(/_/g, " ")}</p>
                  <p className="text-gray-700">{String(value)}</p>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Survey not yet completed</p>
        )}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-sm text-gray-500 mb-3">Timeline</h3>
        <div className="space-y-2 text-sm">
          <TimelineItem date={patient.created_at} text="Patient created" />
          {videos
            .filter((v) => v.render_status === "completed")
            .reverse()
            .map((v) => (
              <TimelineItem
                key={`gen-${v.id}`}
                date={v.created_at}
                text={`Video generated: ${v.video_title || getTreatmentLabel(v.treatment_type)}`}
              />
            ))}
          {patient.video_watched_at && (
            <TimelineItem
              date={patient.video_watched_at}
              text={`Video watched (${Math.floor(patient.video_watch_duration_seconds / 60)}:${(patient.video_watch_duration_seconds % 60).toString().padStart(2, "0")})`}
            />
          )}
          {patient.survey_completed_at && (
            <TimelineItem date={patient.survey_completed_at} text="Survey completed" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineItem({ date, text }: { date: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
      <div>
        <p className="text-gray-700">{text}</p>
        <p className="text-gray-400 text-xs">{new Date(date).toLocaleString()}</p>
      </div>
    </div>
  );
}
