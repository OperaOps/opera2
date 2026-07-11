/**
 * OPERA ATTRIBUTION METRICS (Internal Reference)
 *
 * The survey is designed to measure Opera's impact on case acceptance without
 * directly asking "did Opera help?" - here's what each metric tells us:
 *
 * 1. Understanding Delta (q_understanding_after - q_understanding_before)
 *    - Direct measure of how much the video improved comprehension
 *    - Target: +1.5 or higher = video is working
 *
 * 2. Opera Attribution Rate (% selecting 'personalized_video' as most helpful)
 *    - Organic signal - patient chose video over 5 other options unprompted
 *    - Target: >30% = strong signal, >50% = exceptional
 *
 * 3. Video Helpfulness Score (q_video_helpfulness avg)
 *    - Direct feedback on video quality
 *    - Target: 4.0+ out of 5
 *
 * 4. Video Recommend Rate (q_video_would_recommend % yes)
 *    - Social proof + retention signal
 *    - Target: >80% = video is a keeper
 *
 * 5. Correlation: Video Helpfulness x Likelihood to Proceed
 *    - If high video helpfulness correlates with high likelihood to proceed,
 *      that's the ROI story: Opera videos -> understanding -> acceptance -> revenue
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface AnalyticsData {
  summary: {
    totalSurveys: number;
    avgConsultationClarity: number | null;
    avgComfortLevel: number | null;
    avgStaffFriendliness: number | null;
    avgVideoHelpfulness: number | null;
    avgUnderstandingBefore: number | null;
    avgUnderstandingAfter: number | null;
    understandingDelta: number | null;
    avgLikelihoodToProceed: number | null;
    videoRecommendRate: number | null;
    operaAttributionRate: number | null;
  };
  resourceBreakdown: { resource: string; count: number }[];
  concernBreakdown: { concern: string; count: number }[];
  byTreatment: {
    treatment_type: string;
    survey_count: number;
    avg_video_helpfulness: number | null;
    understanding_delta: number | null;
    avg_likelihood: number | null;
  }[];
  weeklyTrend: {
    week: string;
    count: number;
    avg_likelihood: number | null;
    avg_video_helpfulness: number | null;
  }[];
}

const COLORS = [
  "#8B5CF6",
  "#A78BFA",
  "#C4B5FD",
  "#7C3AED",
  "#6D28D9",
  "#DDD6FE",
];

const resourceLabels: Record<string, string> = {
  in_person_consultation: "In-person",
  personalized_video: "Video",
  written_materials: "Written",
  online_research: "Online",
  friend_family: "Friends/Family",
  other: "Other",
};

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

export default function SurveyAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clinic/analytics/survey")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-100 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!data || data.summary.totalSurveys === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-700 text-lg">
          No survey responses yet
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Data will appear here once patients complete their surveys
        </p>
      </div>
    );
  }

  const s = data.summary;

  const understandingChart = [
    {
      name: "Before Video",
      score: s.avgUnderstandingBefore || 0,
    },
    {
      name: "After Video",
      score: s.avgUnderstandingAfter || 0,
    },
  ];

  const pieData = data.resourceBreakdown.map((r) => ({
    name: resourceLabels[r.resource] || r.resource,
    value: r.count,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl text-gray-900 font-semibold tracking-tight">
        Patient Experience Analytics
      </h2>

      {/* Top metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Video Helpfulness"
          value={s.avgVideoHelpfulness != null ? `${s.avgVideoHelpfulness}/5` : "—"}
          subtitle="avg score"
          delay={0}
        />
        <MetricCard
          title="Understanding Improvement"
          value={
            s.understandingDelta != null
              ? `+${s.understandingDelta}`
              : "—"
          }
          subtitle="avg delta"
          delay={0.05}
        />
        <MetricCard
          title="Opera Attribution Rate"
          value={
            s.operaAttributionRate != null
              ? `${s.operaAttributionRate}%`
              : "—"
          }
          subtitle="chose video as most helpful"
          delay={0.1}
        />
        <MetricCard
          title="Likelihood to Proceed"
          value={
            s.avgLikelihoodToProceed != null
              ? `${s.avgLikelihoodToProceed}/10`
              : "—"
          }
          subtitle="avg score"
          delay={0.15}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Understanding before/after */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
        >
          <h3 className="text-sm text-gray-500 mb-4">
            Understanding Before vs After
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={understandingChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis domain={[0, 5]} tick={{ fill: "#6b7280", fontSize: 12 }} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "#111827" }}
              />
              <Bar dataKey="score" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Resource distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
        >
          <h3 className="text-sm text-gray-500 mb-4">
            Most Helpful Resource
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Trend chart */}
      {data.weeklyTrend.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
        >
          <h3 className="text-sm text-gray-500 mb-4">
            Likelihood to Proceed Over Time
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="week" tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis domain={[0, 10]} tick={{ fill: "#6b7280", fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="avg_likelihood"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: "#8B5CF6", r: 4 }}
                name="Avg Likelihood"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Treatment breakdown table */}
      {data.byTreatment.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
        >
          <h3 className="text-sm text-gray-500 p-5 pb-3">
            Breakdown by Treatment Type
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-2 text-gray-500 font-medium text-xs uppercase tracking-wider">
                  Treatment
                </th>
                <th className="text-left px-5 py-2 text-gray-500 font-medium text-xs uppercase tracking-wider">
                  Surveys
                </th>
                <th className="text-left px-5 py-2 text-gray-500 font-medium text-xs uppercase tracking-wider">
                  Video Helpfulness
                </th>
                <th className="text-left px-5 py-2 text-gray-500 font-medium text-xs uppercase tracking-wider">
                  Understanding Delta
                </th>
                <th className="text-left px-5 py-2 text-gray-500 font-medium text-xs uppercase tracking-wider">
                  Likelihood
                </th>
              </tr>
            </thead>
            <tbody>
              {data.byTreatment.map((t) => (
                <tr
                  key={t.treatment_type}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="px-5 py-3 text-gray-900 capitalize">
                    {t.treatment_type.replace(/_/g, " ")}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {t.survey_count}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {t.avg_video_helpfulness?.toFixed(1) ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-green-700">
                    {t.understanding_delta != null
                      ? `+${t.understanding_delta.toFixed(1)}`
                      : "—"}
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {t.avg_likelihood?.toFixed(1) ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  delay,
}: {
  title: string;
  value: string;
  subtitle: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
    >
      <p className="text-xs text-gray-500 mb-1">{title}</p>
      <p className="text-2xl text-gray-900 font-semibold tracking-tight">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </motion.div>
  );
}
