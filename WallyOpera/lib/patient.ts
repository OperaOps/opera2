// Seeded demo patient for the Consult Intelligence story.
// Sarah Mitchell — adult ortho consult, Invisalign candidate.

export const patient = {
  name: "Sarah Mitchell",
  initials: "SM",
  age: 34,
  occupation: "Marketing Director",
  location: "Walnut Creek, CA",
  referral: "Referred by Dr. Amanda Osei, DDS (general dentist)",
  insurance: "Delta Dental PPO — $1,500 lifetime ortho maximum",
  appointment: {
    date: "Thursday, July 16",
    time: "2:30 PM",
    type: "New patient consultation — 45 min",
    provider: "Dr. Lauren Park",
    tc: "Maya Torres, Treatment Coordinator",
    operatory: "Consult Room 2",
  },
  clinicalSummary: {
    diagnosis: "Moderate lower anterior crowding, mild Class II overbite",
    candidate: "Invisalign comprehensive",
    alternative: "Ceramic braces (if refinement compliance is a concern)",
    estLength: "10–12 months, 26–32 aligners",
    records: "Panoramic X-ray and referral note received from Dr. Osei",
  },
  concerns: [
    {
      title: "Visible appliances at work",
      detail:
        "Leads client presentations weekly. Intake response: “I can't show up to pitches with metal braces.”",
    },
    {
      title: "Lower crowding getting worse",
      detail:
        "Reports her lower front teeth have shifted noticeably in the last three years. Flossing is getting harder.",
    },
    {
      title: "Total cost vs. what her dentist estimated",
      detail:
        "Dr. Osei mentioned “around $4,000–5,000.” Sticker shock risk if quoted above that range without framing.",
    },
  ],
  goals: [
    {
      title: "Straight smile before her sister's wedding",
      detail: "Wedding is June 2027 — an 11-month window. She's the maid of honor.",
      weight: "Primary motivator",
    },
    {
      title: "Fix lower front crowding",
      detail: "Functional + aesthetic. Mentioned flossing difficulty twice in intake.",
      weight: "Clinical driver",
    },
    {
      title: "Nearly invisible treatment",
      detail: "Strong preference for aligners over brackets of any kind.",
      weight: "Hard constraint",
    },
  ],
  budget: {
    signal: "Price-sensitive but not price-blocked",
    detail:
      "Asked about monthly payment plans in intake before asking total cost — payment structure matters more than sticker price. Household income supports treatment; spouse is part of financial decisions.",
    insuranceNote: "Delta Dental PPO covers $1,500 lifetime ortho — verify before consult.",
  },
  readiness: {
    score: 72,
    label: "High readiness",
    factors: [
      { name: "Motivation clarity", value: 92, note: "Hard deadline (wedding) + functional concern" },
      { name: "Financial preparedness", value: 61, note: "Asked about financing early; spouse involved" },
      { name: "Treatment understanding", value: 68, note: "Researched Invisalign; unsure about duration" },
      { name: "Urgency", value: 78, note: "11-month window forces a decision in ~6 weeks" },
    ],
  },
  objections: [
    {
      objection: "“My dentist said this would cost around $4,000.”",
      likelihood: 85,
      counter:
        "Anchor on monthly payment first ($189/mo), then explain what comprehensive treatment includes vs. a GP estimate.",
    },
    {
      objection: "“Will it really be done before the wedding?”",
      likelihood: 75,
      counter:
        "Show the 10–12 month plan against her June 2027 date. Starting within 6 weeks leaves a 2-month buffer plus refinements.",
    },
    {
      objection: "“I need to talk to my husband first.”",
      likelihood: 60,
      counter:
        "Don't fight it — equip it. Offer the shareable consult recap so Mark sees the same plan, pricing, and timeline she did.",
    },
  ],
  strategy: [
    {
      step: "Open with the wedding, not the teeth",
      why: "Her motivation is the June 2027 date. Anchor everything — treatment length, start date, refinements — to it.",
    },
    {
      step: "Show aligners on teeth in the first 10 minutes",
      why: "Her top intake question was visibility. Seeing aligners on a real smile disarms the biggest objection early.",
    },
    {
      step: "Present monthly payment before total fee",
      why: "She asked about financing before cost. Patients matching this pattern accept 13% more often when financing leads.",
    },
    {
      step: "Give her something to bring home to Mark",
      why: "Spouse consultation is likely. A shareable recap converts “I'll think about it” into a second informed decision-maker.",
    },
  ],
  timeline: [
    { date: "Jun 28", event: "Requested consult via clinic website", detail: "Source: Invisalign provider search" },
    { date: "Jun 30", event: "Completed smart intake", detail: "14 questions answered, 3 concerns flagged" },
    { date: "Jul 2", event: "Records received from Dr. Osei", detail: "Panoramic X-ray + referral note" },
    { date: "Jul 8", event: "Asked 3 questions via patient portal", detail: "All answered by Opera assistant, reviewed by staff" },
    { date: "Jul 16", event: "Consultation — Dr. Park", detail: "Today, 2:30 PM" },
  ],
  preAnswered: [
    {
      q: "Will people be able to tell I'm wearing aligners?",
      a: "Most people won't notice. The aligners are clear, thin plastic — we'll show you exactly how they look on teeth during your visit.",
      when: "Jul 8, 9:14 PM",
    },
    {
      q: "How long does treatment take for crowding like mine?",
      a: "Moderate crowding typically takes 10–14 months. Dr. Park will give you an exact estimate after your 3D scan on Thursday.",
      when: "Jul 8, 9:16 PM",
    },
    {
      q: "Do you take Delta Dental?",
      a: "Yes — and we've already verified your plan. You have $1,500 in lifetime orthodontic coverage that applies to treatment here.",
      when: "Jul 8, 9:19 PM",
    },
  ],
};

export type Patient = typeof patient;
