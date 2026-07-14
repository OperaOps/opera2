// Seeded demo data for Organization Intelligence.
// All figures are fabricated for the demo and labeled as such in the UI.

export const orgStats = [
  { label: "Consults analyzed", value: "12,847", sub: "Across 43 locations", delta: "" },
  { label: "Avg. case acceptance", value: "61.4%", sub: "Trailing 90 days", delta: "+8.2 pts" },
  { label: "Avg. time to decision", value: "5.6 days", sub: "Was 9.2 days pre-Opera", delta: "−3.6 days" },
  { label: "Follow-up engagement", value: "84%", sub: "Recap opened within 48h", delta: "+31 pts" },
];

export const insights = [
  {
    title: "Financing before cost converts 13% more often",
    body: "Patients who heard payment options before the total fee accepted treatment 13% more often. The total is the same — the order isn't.",
    stat: "+13%",
    n: "n = 4,212 consults",
    confidence: "High confidence",
    tag: "Conversation order",
  },
  {
    title: "Spouse mentions delay decisions — but don't lose them",
    body: "Patients who mentioned a spouse decided 6.4 days later on average, but accepted at nearly identical rates (61% vs 63%). Chasing them early hurts; equipping them helps.",
    stat: "+6.4 days",
    n: "n = 2,891 consults",
    confidence: "High confidence",
    tag: "Decision dynamics",
  },
  {
    title: "Timeline before pricing lifts acceptance 9.4 points",
    body: "When patients saw their treatment timeline before hearing price, acceptance rose from 58.6% to 68.0%. Patients buy an outcome with a date, not a fee.",
    stat: "+9.4 pts",
    n: "n = 6,034 consults",
    confidence: "High confidence",
    tag: "Conversation order",
  },
  {
    title: "Goals before mechanics wins",
    body: "Doctors who addressed the patient's stated goal in the first 5 minutes — before clinical mechanics — converted 11% better. Patients decide emotionally, then justify clinically.",
    stat: "+11%",
    n: "n = 5,466 consults",
    confidence: "High confidence",
    tag: "Consult structure",
  },
  {
    title: "Matched before/after cases outperform generic ones",
    body: "Showing a completed case matched to the patient's age and malocclusion lifted acceptance 7.8 points vs. showing a generic smile gallery.",
    stat: "+7.8 pts",
    n: "n = 3,150 consults",
    confidence: "Medium confidence",
    tag: "Visual aids",
  },
  {
    title: "Unresolved objections rarely resolve themselves",
    body: "Only 22% of objections left unaddressed in the consult were overcome later. Objections addressed live converted at 71%.",
    stat: "22% vs 71%",
    n: "n = 7,912 objections",
    confidence: "High confidence",
    tag: "Objection handling",
  },
];

// 12-month acceptance trend — Opera-assisted vs. unassisted consults.
export const trend = {
  months: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  assisted: [52.1, 53.4, 55.0, 56.2, 55.8, 57.9, 59.3, 60.1, 61.0, 61.8, 62.5, 63.2],
  baseline: [51.8, 52.0, 51.5, 52.4, 51.9, 52.6, 52.2, 53.0, 52.7, 53.1, 52.9, 53.3],
};

// Objection frequency (%) by consult stage.
export const heatmap = {
  stages: ["Opening", "Exam", "Treatment plan", "Pricing", "Close"],
  objections: ["Cost", "Timing / duration", "Spouse / family", "Insurance", "Discomfort", "Necessity"],
  // rows follow `objections` order; values are share of consults where the
  // objection surfaced at that stage
  values: [
    [2, 4, 11, 38, 17],
    [5, 9, 22, 12, 8],
    [1, 2, 6, 14, 19],
    [8, 3, 7, 21, 6],
    [4, 14, 12, 3, 2],
    [6, 11, 9, 4, 3],
  ],
};

export const leaderboard = [
  { name: "Dr. Lauren Park", location: "Walnut Creek", acceptance: 74.2, consults: 312, decisionDays: 4.1, delta: "+6.8" },
  { name: "Dr. James Whitfield", location: "Pleasanton", acceptance: 69.8, consults: 287, decisionDays: 5.0, delta: "+5.2" },
  { name: "Dr. Priya Raman", location: "San Ramon", acceptance: 66.5, consults: 341, decisionDays: 5.4, delta: "+7.1" },
  { name: "Dr. Daniel Cho", location: "Dublin", acceptance: 62.1, consults: 268, decisionDays: 6.2, delta: "+3.9" },
  { name: "Dr. Maria Sandoval", location: "Concord", acceptance: 58.7, consults: 295, decisionDays: 6.8, delta: "+4.4" },
  { name: "Dr. Kevin O'Leary", location: "Livermore", acceptance: 54.3, consults: 249, decisionDays: 7.9, delta: "+2.1" },
];

// Conversation-order experiments: acceptance % by whether the behavior happened.
export const orderExperiments = [
  { label: "Timeline shown before pricing", with: 68.0, without: 58.6 },
  { label: "Financing offered before total fee", with: 66.1, without: 53.2 },
  { label: "Patient goal addressed in first 5 min", with: 65.4, without: 54.7 },
  { label: "Matched before/after case shown", with: 64.9, without: 57.1 },
];

export const coachingThemes = [
  { theme: "Price introduced before timeline anchor", count: 214, trend: "down" },
  { theme: "Patient goal not referenced at close", count: 168, trend: "down" },
  { theme: "Objection acknowledged but not resolved", count: 141, trend: "flat" },
  { theme: "No visual shown before pricing", count: 97, trend: "down" },
];
