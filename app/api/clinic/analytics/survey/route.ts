/**
 * GET /api/clinic/analytics/survey — aggregated survey analytics for clinic
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

export async function GET(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const clinicId = clinic.clinicId;

  // Overall averages
  const averages = db
    .prepare(
      `SELECT
        COUNT(*) as total_surveys,
        AVG(q_consultation_clarity) as avg_consultation_clarity,
        AVG(q_comfort_level) as avg_comfort_level,
        AVG(q_staff_friendliness) as avg_staff_friendliness,
        AVG(q_video_helpfulness) as avg_video_helpfulness,
        AVG(q_understanding_before) as avg_understanding_before,
        AVG(q_understanding_after) as avg_understanding_after,
        AVG(q_understanding_after - q_understanding_before) as understanding_delta,
        AVG(q_likelihood_to_proceed) as avg_likelihood_to_proceed,
        SUM(CASE WHEN q_video_would_recommend = 1 THEN 1 ELSE 0 END) as recommend_count,
        SUM(CASE WHEN q_video_would_recommend IS NOT NULL THEN 1 ELSE 0 END) as recommend_total
       FROM survey_responses
       WHERE clinic_id = ?`
    )
    .get(clinicId) as Record<string, number | null>;

  // Opera attribution rate
  const attribution = db
    .prepare(
      `SELECT
        COUNT(*) as total,
        SUM(CASE WHEN q_most_helpful_resource = 'personalized_video' THEN 1 ELSE 0 END) as video_count
       FROM survey_responses
       WHERE clinic_id = ? AND q_most_helpful_resource IS NOT NULL`
    )
    .get(clinicId) as { total: number; video_count: number };

  // Resource distribution
  const resourceBreakdown = db
    .prepare(
      `SELECT q_most_helpful_resource as resource, COUNT(*) as count
       FROM survey_responses
       WHERE clinic_id = ? AND q_most_helpful_resource IS NOT NULL
       GROUP BY q_most_helpful_resource`
    )
    .all(clinicId);

  // Concern distribution
  const concernBreakdown = db
    .prepare(
      `SELECT q_primary_concern as concern, COUNT(*) as count
       FROM survey_responses
       WHERE clinic_id = ? AND q_primary_concern IS NOT NULL
       GROUP BY q_primary_concern`
    )
    .all(clinicId);

  // Breakdown by treatment type
  const byTreatment = db
    .prepare(
      `SELECT
        p.treatment_type,
        COUNT(s.id) as survey_count,
        AVG(s.q_video_helpfulness) as avg_video_helpfulness,
        AVG(s.q_understanding_after - s.q_understanding_before) as understanding_delta,
        AVG(s.q_likelihood_to_proceed) as avg_likelihood
       FROM survey_responses s
       JOIN patient_accounts p ON p.id = s.patient_id
       WHERE s.clinic_id = ? AND p.treatment_type IS NOT NULL
       GROUP BY p.treatment_type`
    )
    .all(clinicId);

  // Weekly trend (last 12 weeks)
  const weeklyTrend = db
    .prepare(
      `SELECT
        strftime('%Y-%W', s.created_at) as week,
        COUNT(*) as count,
        AVG(s.q_likelihood_to_proceed) as avg_likelihood,
        AVG(s.q_video_helpfulness) as avg_video_helpfulness
       FROM survey_responses s
       WHERE s.clinic_id = ?
       GROUP BY week
       ORDER BY week DESC
       LIMIT 12`
    )
    .all(clinicId);

  return NextResponse.json({
    summary: {
      totalSurveys: averages.total_surveys || 0,
      avgConsultationClarity: round(averages.avg_consultation_clarity),
      avgComfortLevel: round(averages.avg_comfort_level),
      avgStaffFriendliness: round(averages.avg_staff_friendliness),
      avgVideoHelpfulness: round(averages.avg_video_helpfulness),
      avgUnderstandingBefore: round(averages.avg_understanding_before),
      avgUnderstandingAfter: round(averages.avg_understanding_after),
      understandingDelta: round(averages.understanding_delta),
      avgLikelihoodToProceed: round(averages.avg_likelihood_to_proceed),
      videoRecommendRate:
        averages.recommend_total
          ? round(((averages.recommend_count || 0) / averages.recommend_total) * 100)
          : null,
      operaAttributionRate:
        attribution.total > 0
          ? round((attribution.video_count / attribution.total) * 100)
          : null,
    },
    resourceBreakdown,
    concernBreakdown,
    byTreatment,
    weeklyTrend: weeklyTrend.reverse(),
  });
}

function round(val: number | null | undefined): number | null {
  if (val == null) return null;
  return Math.round(val * 100) / 100;
}
