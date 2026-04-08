"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StarRating from "./StarRating";
import SliderInput from "./SliderInput";
import RadioCards from "./RadioCards";

interface SurveyData {
  q_consultation_clarity: number;
  q_comfort_level: number;
  q_staff_friendliness: number;
  q_understanding_before: number;
  q_understanding_after: number;
  q_video_helpfulness: number;
  q_video_would_recommend: boolean | null;
  q_most_helpful_resource: string;
  q_likelihood_to_proceed: number;
  q_primary_concern: string;
  q_additional_feedback: string;
}

interface SurveyFormProps {
  onSubmit: (data: SurveyData) => Promise<void>;
  onBackToVideo: () => void;
}

const resourceOptions = [
  { value: "in_person_consultation", label: "In-person consultation", icon: "\u{1F3E5}" },
  { value: "personalized_video", label: "Personalized video", icon: "\u{1F3AC}" },
  { value: "written_materials", label: "Written materials", icon: "\u{1F4C4}" },
  { value: "online_research", label: "My own online research", icon: "\u{1F310}" },
  { value: "friend_family", label: "Friends or family", icon: "\u{1F465}" },
  { value: "other", label: "Other", icon: "" },
];

const concernOptions = [
  { value: "cost", label: "Cost", icon: "\u{1F4B0}" },
  { value: "time_commitment", label: "Time commitment", icon: "\u{23F0}" },
  { value: "pain_discomfort", label: "Pain/discomfort", icon: "\u{1F630}" },
  { value: "unsure_if_needed", label: "Not sure if I need it", icon: "\u{1F914}" },
  { value: "want_second_opinion", label: "Want a second opinion", icon: "\u{1F50D}" },
  { value: "no_concerns", label: "No concerns!", icon: "\u{2705}" },
  { value: "other", label: "Other", icon: "" },
];

export default function SurveyForm({ onSubmit, onBackToVideo }: SurveyFormProps) {
  const [data, setData] = useState<SurveyData>({
    q_consultation_clarity: 0,
    q_comfort_level: 0,
    q_staff_friendliness: 0,
    q_understanding_before: 0,
    q_understanding_after: 0,
    q_video_helpfulness: 0,
    q_video_would_recommend: null,
    q_most_helpful_resource: "",
    q_likelihood_to_proceed: 5,
    q_primary_concern: "",
    q_additional_feedback: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof SurveyData>(key: K, value: SurveyData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  const requiredFilled =
    data.q_consultation_clarity > 0 &&
    data.q_comfort_level > 0 &&
    data.q_staff_friendliness > 0 &&
    data.q_likelihood_to_proceed > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!requiredFilled || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Back to video link */}
      <button
        type="button"
        onClick={onBackToVideo}
        className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" />
        </svg>
        Back to Video
      </button>

      {/* Section 1: Your Visit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 space-y-5"
      >
        <h3 className="text-lg text-white font-light">Your Visit</h3>
        <StarRating
          label="How clearly was your treatment plan explained during your consultation?"
          value={data.q_consultation_clarity}
          onChange={(v) => update("q_consultation_clarity", v)}
        />
        <StarRating
          label="How comfortable did you feel asking questions?"
          value={data.q_comfort_level}
          onChange={(v) => update("q_comfort_level", v)}
        />
        <StarRating
          label="How friendly was the staff?"
          value={data.q_staff_friendliness}
          onChange={(v) => update("q_staff_friendliness", v)}
        />
      </motion.div>

      {/* Section 2: Your Understanding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 space-y-5"
      >
        <h3 className="text-lg text-white font-light">Your Understanding</h3>
        <StarRating
          label="Before watching the video, how well did you understand your treatment?"
          value={data.q_understanding_before}
          onChange={(v) => update("q_understanding_before", v)}
        />
        <StarRating
          label="After watching the video, how well do you understand your treatment?"
          value={data.q_understanding_after}
          onChange={(v) => update("q_understanding_after", v)}
        />
        <StarRating
          label="How helpful was the personalized video?"
          value={data.q_video_helpfulness}
          onChange={(v) => update("q_video_helpfulness", v)}
        />
        {/* Would recommend toggle */}
        <div>
          <p className="text-gray-200 text-sm mb-3 font-light">
            Would you recommend the practice continue sending these videos?
          </p>
          <div className="flex gap-3">
            {[
              { label: "Yes", val: true },
              { label: "No", val: false },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => update("q_video_would_recommend", opt.val)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  data.q_video_would_recommend === opt.val
                    ? "bg-violet-600/20 border-violet-500/60 text-white"
                    : "bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-600"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section 3: Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 space-y-6"
      >
        <h3 className="text-lg text-white font-light">Next Steps</h3>
        <RadioCards
          label="What was the MOST helpful resource in understanding your treatment?"
          options={resourceOptions}
          value={data.q_most_helpful_resource}
          onChange={(v) => update("q_most_helpful_resource", v)}
          columns={2}
        />
        <SliderInput
          label="How likely are you to move forward with treatment?"
          value={data.q_likelihood_to_proceed}
          onChange={(v) => update("q_likelihood_to_proceed", v)}
          min={1}
          max={10}
          minLabel="Not likely"
          maxLabel="Definitely will"
        />
        <RadioCards
          label="What's your main concern right now?"
          options={concernOptions}
          value={data.q_primary_concern}
          onChange={(v) => update("q_primary_concern", v)}
          columns={2}
        />
        <div>
          <p className="text-gray-200 text-sm mb-2 font-light">
            Anything else you&apos;d like to share?
          </p>
          <textarea
            value={data.q_additional_feedback}
            onChange={(e) => update("q_additional_feedback", e.target.value)}
            rows={3}
            className="w-full rounded-xl bg-gray-900/80 border border-gray-700 text-white text-sm p-3
              focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 outline-none
              placeholder:text-gray-600 resize-none"
            placeholder="Optional"
          />
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          type="submit"
          disabled={!requiredFilled || submitting}
          className={`w-full py-4 rounded-xl text-white font-medium transition-all ${
            requiredFilled && !submitting
              ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-600/20"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </motion.div>
    </motion.form>
  );
}
