"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";

const CALENDLY = "https://calendly.com/anishsuvarna-berkeley/30min";
const BASE = "";

const TREATMENTS = [
  "crown", "filling", "root_canal", "implant", "extraction", "bridge",
  "veneers", "whitening", "gum_treatment", "dentures", "full_mouth_rehab",
  "braces", "invisalign", "ceramic_braces", "lingual_braces", "expander",
  "retainer", "jaw_surgery",
];

const EXAMPLE_REQ = `{
  "patient_name": "Sarah Johnson",
  "doctor_name": "Dr. Martinez",
  "clinic_name": "Bright Smiles Dental",
  "treatment": "crown",
  "treatment_notes": "MOD composite #14",
  "video_goal": "educate",
  "concerns": "worried about pain"
}`;

const NAV = [
  { id: "quickstart", label: "Quick Start" },
  { id: "auth", label: "Authentication" },
  { id: "generate", label: "Generate" },
  { id: "status", label: "Status" },
  { id: "download", label: "Download" },
  { id: "treatments", label: "Treatments" },
  { id: "examples", label: "Examples" },
  { id: "errors", label: "Errors" },
  { id: "try", label: "Try It" },
];

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000); }}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
      {ok ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
    </button>
  );
}

function Code({ code }: { code: string }) {
  return (
    <div className="relative bg-[#0a0a0a] rounded-xl p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
      <CopyBtn text={code} />
      <pre className="text-gray-300">{code}</pre>
    </div>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="text-xl font-semibold tracking-tight text-gray-900 mt-14 mb-5 scroll-mt-24 pb-3 border-b border-gray-100">{children}</h2>;
}

function Param({ name, type, req, children, def }: { name: string; type: string; req?: boolean; children: React.ReactNode; def?: string }) {
  return (
    <div className="py-3 border-b border-gray-50 grid grid-cols-[160px_1fr] gap-4 items-start">
      <div>
        <code className="text-[13px] font-mono font-medium text-gray-900">{name}</code>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400">{type}</span>
          {req && <span className="text-[10px] font-medium text-red-500 uppercase tracking-wider">required</span>}
        </div>
      </div>
      <div className="text-sm text-gray-600 leading-relaxed">
        {children}
        {def && <span className="text-gray-400"> Default: <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">{def}</code></span>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Try It
// ---------------------------------------------------------------------------

function TryIt() {
  const [apiKey, setApiKey] = useState("");
  const [body, setBody] = useState(EXAMPLE_REQ);
  const [resp, setResp] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState("");

  const generate = async () => {
    setLoading(true); setResp(""); setJobId("");
    try {
      const r = await fetch("/api/v1/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body,
      });
      const d = await r.json();
      setResp(JSON.stringify(d, null, 2));
      if (d.id) setJobId(d.id);
    } catch (e) { setResp(`Error: ${e}`); }
    setLoading(false);
  };

  const poll = async () => {
    if (!jobId) return;
    const r = await fetch(`/api/v1/video/${jobId}`, { headers: { Authorization: `Bearer ${apiKey}` } });
    setResp(JSON.stringify(await r.json(), null, 2));
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">API Key</label>
        <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="opk_master_opera2026"
          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Request Body</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8}
          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 resize-none" />
      </div>
      <div className="flex gap-2">
        <button onClick={generate} disabled={loading || !apiKey}
          className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 disabled:opacity-40 transition-colors">
          {loading ? "Sending..." : "Generate Video"}
        </button>
        {jobId && (
          <button onClick={poll} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            Poll Status
          </button>
        )}
      </div>
      {resp && <Code code={resp} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar nav
// ---------------------------------------------------------------------------

function Sidebar() {
  const [active, setActive] = useState("quickstart");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const item of NAV) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-20 space-y-0.5">
      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3 px-3">On this page</p>
      {NAV.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          className={`block px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200 ${
            active === n.id
              ? "text-purple-700 bg-purple-50 font-medium"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          {n.label}
        </a>
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DocsV2() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ================================================================ */}
      {/* TOP NAV — same as landing page */}
      {/* ================================================================ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_0_40px_rgba(147,51,234,0.04)]"
            : "bg-white"
        }`}
        style={{ borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "1px solid rgba(0,0,0,0.05)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/landing-v2" className="text-lg font-bold tracking-tight text-gray-900">
            Opera<span className="text-purple-600">AI</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/docs-v2" className="text-[13px] text-purple-600 font-medium">API</Link>
            <Link href="/signin" className="text-[13px] text-gray-400 hover:text-gray-900 transition-colors">Log In</Link>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="text-[13px] font-medium text-white bg-gray-900 px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors">
              Book a Demo
            </a>
          </div>
        </div>
      </nav>

      {/* ================================================================ */}
      {/* LAYOUT — Sidebar + Content */}
      {/* ================================================================ */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12 flex gap-12">

        {/* Sidebar */}
        <aside className="hidden lg:block w-48 shrink-0 pt-6">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <p className="text-[13px] font-medium text-purple-600 tracking-[0.15em] uppercase mb-3">API Reference</p>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-3">Opera Video API</h1>
          <p className="text-lg text-gray-500 mb-2">Generate personalized patient education videos programmatically.</p>
          <p className="text-[13px] text-gray-400 mb-2" suppressHydrationWarning>Base URL: <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-600" suppressHydrationWarning>https://getopera.ai</code></p>

          {/* Quick Start */}
          <H2 id="quickstart">Quick Start</H2>
          <p className="text-sm text-gray-600 mb-4">Generate a video in 3 steps.</p>
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">1. Start generation</p>
              <Code code={`curl -X POST ${BASE}/api/v1/video/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"patient_name":"Sarah","doctor_name":"Dr. Martinez","clinic_name":"Bright Smiles","treatment":"crown"}'`} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">2. Poll until ready</p>
              <Code code={`curl ${BASE}/api/v1/video/JOB_ID \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Response when done:
# { "status": "completed", "video_url": "https://...mp4" }`} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">3. Use the video</p>
              <Code code={`# Direct link — plays in browser, embed in app, send to patient
https://opera-ai-videos.s3.amazonaws.com/videos/patient-video-xxx.mp4`} />
            </div>
          </div>

          {/* Auth */}
          <H2 id="auth">Authentication</H2>
          <p className="text-sm text-gray-600 mb-4">All endpoints require a Bearer token.</p>
          <Code code={`Authorization: Bearer opk_a1b2c3d4e5f6...`} />

          {/* Generate */}
          <H2 id="generate">Generate Video</H2>
          <div className="inline-block bg-[#09090b] text-white px-3 py-1.5 rounded-lg font-mono text-[13px] mb-4">POST /api/v1/video/generate</div>
          <div className="mt-4">
            <Param name="patient_name" type="string" req>Patient&apos;s full name.</Param>
            <Param name="doctor_name" type="string" req>Doctor&apos;s name (include &quot;Dr.&quot; prefix).</Param>
            <Param name="clinic_name" type="string" req>Practice name.</Param>
            <Param name="treatment" type="string" req>Treatment type. See supported list below.</Param>
            <Param name="treatment_notes" type="string">Clinical notes, e.g. &quot;MOD composite #14&quot;.</Param>
            <Param name="video_goal" type="string" def="educate">educate, reassure, convince, prepare, follow_up, celebrate.</Param>
            <Param name="patient_status" type="string" def="undecided">undecided, hesitant, accepted, scheduled, in_treatment, post_treatment.</Param>
            <Param name="content_mode" type="string" def="template">template (fastest), template_ai, full_ai (custom).</Param>
            <Param name="concerns" type="string">Patient concerns, e.g. &quot;afraid of needles&quot;.</Param>
            <Param name="financing" type="string">Financing info, e.g. &quot;accepts CareCredit&quot;.</Param>
            <Param name="urgency_level" type="string" def="routine">routine, moderate, urgent.</Param>
            <Param name="brand_primary_color" type="string" def="#7c3aed">Hex color for clinic branding.</Param>
          </div>
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mt-6 mb-2">Response — 202 Accepted</p>
          <Code code={`{
  "id": "uuid-job-id",
  "status": "processing",
  "poll_url": "/api/v1/video/uuid-job-id",
  "created_at": "2026-01-15T10:30:00.000Z"
}`} />

          {/* Status */}
          <H2 id="status">Check Status</H2>
          <div className="inline-block bg-[#09090b] text-white px-3 py-1.5 rounded-lg font-mono text-[13px] mb-4">GET /api/v1/video/:id</div>
          <p className="text-sm text-gray-600 mb-4">Poll every 3-5 seconds.</p>
          <Code code={`// Processing
{ "status": "processing", "progress": 0.65, "step": "Rendering video" }

// Completed
{ "status": "completed", "video_url": "https://...s3.amazonaws.com/videos/...",
  "download_url": "/api/v1/video/.../download" }

// Failed
{ "status": "failed", "error": "Description of what went wrong" }`} />

          {/* Download */}
          <H2 id="download">Download</H2>
          <div className="inline-block bg-[#09090b] text-white px-3 py-1.5 rounded-lg font-mono text-[13px] mb-4">GET /api/v1/video/:id/download</div>
          <p className="text-sm text-gray-600">Redirects (302) to the MP4 file.</p>

          {/* Treatments */}
          <H2 id="treatments">Supported Treatments</H2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {TREATMENTS.map((t) => (
              <div key={t} className="px-3 py-2 border border-gray-100 rounded-lg font-mono text-xs text-gray-700">{t}</div>
            ))}
          </div>

          {/* Examples */}
          <H2 id="examples">Code Examples</H2>
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Python</p>
              <Code code={`import requests, time

API_KEY = "opk_your_key"

job = requests.post("${BASE}/api/v1/video/generate",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={"patient_name": "Sarah", "doctor_name": "Dr. Martinez",
          "clinic_name": "Bright Smiles", "treatment": "crown"}).json()

while True:
    s = requests.get(f"${BASE}/api/v1/video/{job['id']}",
        headers={"Authorization": f"Bearer {API_KEY}"}).json()
    if s["status"] == "completed":
        print("Video:", s["video_url"])
        break
    time.sleep(3)`} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Node.js</p>
              <Code code={`const KEY = "opk_your_key";

const { id } = await fetch("${BASE}/api/v1/video/generate", {
  method: "POST",
  headers: { Authorization: \`Bearer \${KEY}\`, "Content-Type": "application/json" },
  body: JSON.stringify({ patient_name: "Sarah", doctor_name: "Dr. Martinez",
    clinic_name: "Bright Smiles", treatment: "crown" })
}).then(r => r.json());

while (true) {
  const s = await fetch(\`${BASE}/api/v1/video/\${id}\`,
    { headers: { Authorization: \`Bearer \${KEY}\` } }).then(r => r.json());
  if (s.status === "completed") { console.log(s.video_url); break; }
  await new Promise(r => setTimeout(r, 3000));
}`} />
            </div>
          </div>

          {/* Errors */}
          <H2 id="errors">Errors</H2>
          <div className="space-y-0">
            {[
              ["400", "invalid_json", "Request body is not valid JSON."],
              ["401", "unauthorized", "Missing or invalid API key."],
              ["404", "not_found", "Job ID does not exist."],
              ["422", "validation_error", "Input validation failed. Check details array."],
              ["429", "rate_limited", "Rate limit exceeded. Check Retry-After header."],
              ["500", "internal_error", "Unexpected server error."],
            ].map(([http, code, desc]) => (
              <div key={code} className="py-2.5 border-b border-gray-50 grid grid-cols-[50px_150px_1fr] gap-4 text-sm">
                <span className="text-gray-400">{http}</span>
                <code className="font-mono text-[13px] text-purple-600">{code}</code>
                <span className="text-gray-600">{desc}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">Default rate limits: <strong>10 req/min</strong>, <strong>500 req/day</strong>. Contact us for higher limits.</p>

          {/* Try It */}
          <H2 id="try">Try It Live</H2>
          <TryIt />
        </main>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-gray-100 flex items-center justify-between text-[13px] text-gray-400">
        <span>&copy; {new Date().getFullYear()} Opera<span className="text-purple-500">AI</span>, Inc. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="/landing-v2" className="hover:text-gray-600 transition-colors">Home</Link>
          <Link href="/signin" className="hover:text-gray-600 transition-colors">Log In</Link>
        </div>
      </footer>
    </div>
  );
}
