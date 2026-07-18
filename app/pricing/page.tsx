"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Building2, Minus } from "lucide-react";

const CALENDLY = "https://calendly.com/anishsuvarna-berkeley/30min";

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

// ---------------------------------------------------------------------------
// Plans — confirmed pricing: Core $199 / Growth $999 / Enterprise custom
// ---------------------------------------------------------------------------

const PLANS = [
  {
    name: "Core",
    price: "$199",
    cadence: "/month",
    blurb: "For a single practice getting started with personalized patient videos.",
    cta: "Start free trial",
    href: "/connect?plan=core",
    highlight: false,
    features: [
      "1 practice location",
      "Up to 50 patient videos / month",
      "All 15+ treatment types",
      "Patient share links with Ask Opera",
      "ElevenLabs premium narration",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$999",
    cadence: "/month",
    blurb: "For busy and multi-location practices that run on patient education.",
    cta: "Start free trial",
    href: "/connect?plan=growth",
    highlight: true,
    features: [
      "Up to 5 locations",
      "Up to 500 patient videos / month",
      "Everything in Core",
      "Full API access with your own keys",
      "SMS + email video delivery",
      "Patient engagement analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    blurb: "For DSOs, large groups, and PMS platforms embedding Opera at scale.",
    cta: "Get in touch",
    href: CALENDLY,
    external: true,
    highlight: false,
    features: [
      "Unlimited locations & volume",
      "Everything in Growth",
      "PMS / EHR integrations (Greyfinch + more)",
      "White-label & co-branding",
      "BAA & security review",
      "Dedicated success manager",
      "Custom clip libraries per specialty",
    ],
  },
];

const COMPARISON: { label: string; core: string | boolean; growth: string | boolean; ent: string | boolean }[] = [
  { label: "Locations", core: "1", growth: "Up to 5", ent: "Unlimited" },
  { label: "Patient videos / month", core: "50", growth: "500", ent: "Unlimited" },
  { label: "Hyper-personalized scripts", core: true, growth: true, ent: true },
  { label: "Patient share links + Ask Opera", core: true, growth: true, ent: true },
  { label: "API access", core: false, growth: true, ent: true },
  { label: "SMS + email delivery", core: false, growth: true, ent: true },
  { label: "Engagement analytics", core: false, growth: true, ent: true },
  { label: "PMS / EHR integrations", core: false, growth: false, ent: true },
  { label: "White-label & co-branding", core: false, growth: false, ent: true },
  { label: "BAA & dedicated support", core: false, growth: false, ent: true },
];

const FAQS = [
  {
    q: "How does the free trial work?",
    a: "Every plan starts with a 30-day free trial — full access, no video limits held back. You add a card at signup through Stripe, and you can cancel any time before the trial ends without being charged.",
  },
  {
    q: "What do I need to start generating videos?",
    a: "Just your consult notes. Paste a scribe transcript or treatment notes, pick the treatment, and Opera generates a fully personalized education video in about three minutes — narration, visuals, and a patient share link included.",
  },
  {
    q: "How do patients receive their videos?",
    a: "Each video gets a private share link you can text or email from Opera. Patients open it in any browser — no app, no login — watch their video, and can ask Opera questions about their treatment right under the player.",
  },
  {
    q: "Can we upgrade, downgrade, or cancel later?",
    a: "Yes — plans are month-to-month and managed through Stripe. Upgrades take effect immediately; downgrades and cancellations apply at the end of your billing period.",
  },
  {
    q: "We're a DSO / platform — can Opera be embedded in our product?",
    a: "That's exactly what Enterprise is for. Opera already powers embedded experiences for PMS platforms like Greyfinch, with white-labeling, custom volume pricing, and API-first integration. Book a call and we'll scope it together.",
  },
];

// ---------------------------------------------------------------------------

function FeatureCheck({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-[#5f7a61]" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-gray-300" />;
  return <span className="text-[13px] font-medium text-gray-700">{v}</span>;
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased selection:bg-[#5f7a61]/10">
      {/* Nav — matches the landing page */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-gray-900">
            Opera<span className="text-[#5f7a61]">AI</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-[13px] font-medium text-gray-900">Pricing</Link>
            <Link href="/docs-v2" className="text-[13px] text-gray-400 transition-colors hover:text-gray-900">API</Link>
            <Link href="/signin" className="text-[13px] text-gray-400 transition-colors hover:text-gray-900">Log In</Link>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gray-900 px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-gray-800"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-32 text-center">
        <motion.div {...reveal}>
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#5f7a61]/30 bg-[#5f7a61]/[0.07] px-3.5 py-1.5 text-xs font-semibold text-[#3e5540]">
            <Sparkles className="h-3.5 w-3.5" />
            30-day free trial on every plan
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
            Pricing that pays for itself with{" "}
            <span className="bg-gradient-to-r from-[#5f7a61] to-[#5f7a61] bg-clip-text text-transparent">
              one accepted case
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-gray-500">
            One recovered treatment plan typically covers months of Opera. Start free,
            cancel anytime — billed simply through Stripe.
          </p>
        </motion.div>
      </section>

      {/* Plan cards */}
      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className={
                p.highlight
                  ? "relative rounded-3xl bg-gray-900 p-8 text-white shadow-[0_24px_80px_rgba(63,85,64,0.35)] ring-1 ring-[#5f7a61]/40"
                  : "relative rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)]"
              }
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#5f7a61] to-[#5f7a61] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Most popular
                </div>
              )}
              <div className="flex items-center gap-2">
                {p.name === "Enterprise" && (
                  <Building2 className={p.highlight ? "h-4 w-4 text-[#a9c0aa]" : "h-4 w-4 text-[#5f7a61]"} />
                )}
                <h3 className={`text-sm font-bold uppercase tracking-wider ${p.highlight ? "text-[#a9c0aa]" : "text-[#5f7a61]"}`}>
                  {p.name}
                </h3>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">{p.price}</span>
                {p.cadence && (
                  <span className={p.highlight ? "text-sm text-white/50" : "text-sm text-gray-400"}>{p.cadence}</span>
                )}
              </div>
              <p className={`mt-3 text-sm leading-relaxed ${p.highlight ? "text-white/60" : "text-gray-500"}`}>
                {p.blurb}
              </p>
              <a
                href={p.href}
                {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={
                  p.highlight
                    ? "mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5f7a61] to-[#5f7a61] px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                    : "mt-6 flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-[#5f7a61]/60 hover:text-[#3e5540]"
                }
              >
                {p.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <ul className="mt-7 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlight ? "text-[#a9c0aa]" : "text-[#5f7a61]"}`} />
                    <span className={`text-[13.5px] leading-snug ${p.highlight ? "text-white/80" : "text-gray-600"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.p {...reveal} className="mt-6 text-center text-xs text-gray-400">
          All plans include the full flagship video format, premium narration, and patient share links.
          Prices in USD. Cancel anytime.
        </motion.p>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-4xl px-6 pt-24">
        <motion.h2 {...reveal} className="text-center text-2xl font-bold tracking-tight md:text-3xl">
          Compare plans
        </motion.h2>
        <motion.div {...reveal} className="mt-8 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70">
                <th className="px-5 py-3.5 text-[13px] font-semibold text-gray-500">Feature</th>
                <th className="px-4 py-3.5 text-center text-[13px] font-semibold text-gray-900">Core</th>
                <th className="px-4 py-3.5 text-center text-[13px] font-semibold text-[#3e5540]">Growth</th>
                <th className="px-4 py-3.5 text-center text-[13px] font-semibold text-gray-900">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.label} className={i % 2 ? "bg-gray-50/40" : "bg-white"}>
                  <td className="px-5 py-3 text-[13.5px] text-gray-700">{row.label}</td>
                  <td className="px-4 py-3 text-center"><FeatureCheck v={row.core} /></td>
                  <td className="px-4 py-3 text-center"><FeatureCheck v={row.growth} /></td>
                  <td className="px-4 py-3 text-center"><FeatureCheck v={row.ent} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-6 pt-24">
        <motion.h2 {...reveal} className="text-center text-2xl font-bold tracking-tight md:text-3xl">
          Frequently asked questions
        </motion.h2>
        <motion.div {...reveal} className="mt-8 divide-y divide-gray-200 rounded-2xl border border-gray-200">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-[14.5px] font-semibold text-gray-900">{f.q}</span>
                <span className={`text-lg text-[#5f7a61] transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && (
                <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-gray-500">{f.a}</p>
              )}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-24">
        <motion.div
          {...reveal}
          className="relative overflow-hidden rounded-3xl bg-gray-950 px-8 py-14 text-center text-white"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[540px] -translate-x-1/2 rounded-full bg-[#5f7a61]/25 blur-3xl" />
          <h2 className="relative text-3xl font-bold tracking-tight md:text-4xl">
            Your patients are waiting to understand
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-white/60">
            Set up in minutes. First personalized video in your next consult.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5f7a61] to-[#5f7a61] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Start your free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/40"
            >
              Talk to us about Enterprise
            </a>
          </div>
        </motion.div>
        <p className="mt-10 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Opera AI · The patient education layer for modern healthcare
        </p>
      </section>
    </div>
  );
}
