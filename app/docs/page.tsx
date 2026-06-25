"use client";

import React, { useState } from "react";

const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

const TREATMENTS = [
  "crown", "filling", "root_canal", "implant", "extraction", "bridge",
  "veneers", "whitening", "gum_treatment", "dentures", "full_mouth_rehab",
  "braces", "invisalign", "ceramic_braces", "lingual_braces", "expander",
  "retainer", "jaw_surgery",
];

const EXAMPLE_REQUEST = `{
  "patient_name": "Sarah Johnson",
  "doctor_name": "Dr. Martinez",
  "clinic_name": "Bright Smiles Dental",
  "treatment": "crown",
  "treatment_notes": "MOD composite #14",
  "video_goal": "educate",
  "patient_status": "undecided",
  "concerns": "worried about pain"
}`;

function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  return (
    <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-sm overflow-x-auto leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">{title}</h2>
      {children}
    </section>
  );
}

function ParamRow({ name, type, required, desc, def }: { name: string; type: string; required?: boolean; desc: string; def?: string }) {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-2.5 pr-4 font-mono text-sm text-purple-700">{name}</td>
      <td className="py-2.5 pr-4 text-sm text-gray-500">{type}</td>
      <td className="py-2.5 pr-4">{required ? <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-medium">required</span> : <span className="text-xs text-gray-400">optional</span>}</td>
      <td className="py-2.5 text-sm text-gray-700">{desc}{def && <span className="text-gray-400"> Default: {def}</span>}</td>
    </tr>
  );
}

function TryItPanel() {
  const [apiKey, setApiKey] = useState("");
  const [requestBody, setRequestBody] = useState(EXAMPLE_REQUEST);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setResponse("");
    setJobId("");
    try {
      const res = await fetch("/api/v1/video/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: requestBody,
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      if (data.id) setJobId(data.id);
    } catch (err) {
      setResponse(`Error: ${err}`);
    }
    setLoading(false);
  };

  const handlePoll = async () => {
    if (!jobId) return;
    try {
      const res = await fetch(`/api/v1/video/${jobId}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse(`Error: ${err}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Try It</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="opk_master_opera2026"
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Request Body</label>
        <textarea
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 resize-none"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={loading || !apiKey}
          className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40 transition-colors"
        >
          {loading ? "Sending..." : "Generate Video"}
        </button>
        {jobId && (
          <button
            onClick={handlePoll}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Poll Status
          </button>
        )}
      </div>
      {response && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Response</label>
          <CodeBlock code={response} lang="json" />
        </div>
      )}
    </div>
  );
}

export default function DocsPage() {
  const NAV = [
    { id: "quickstart", label: "Quick Start" },
    { id: "auth", label: "Authentication" },
    { id: "generate", label: "Generate Video" },
    { id: "status", label: "Check Status" },
    { id: "download", label: "Download" },
    { id: "treatments", label: "Treatments" },
    { id: "errors", label: "Errors" },
    { id: "limits", label: "Rate Limits" },
    { id: "try", label: "Try It" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-lg">O</div>
            <h1 className="text-3xl font-bold text-gray-900">Opera Video API</h1>
          </div>
          <p className="text-lg text-gray-500 max-w-2xl">
            Generate personalized patient education videos programmatically.
            One API call, ~60 seconds, HD video with voiceover.
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap gap-2 mb-10 sticky top-4 z-10 bg-gray-50/80 backdrop-blur-sm py-2">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="px-3 py-1.5 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="space-y-12">
          {/* Quick Start */}
          <Section id="quickstart" title="Quick Start">
            <p className="text-sm text-gray-600 mb-4">Generate a video in 3 steps:</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">1. Start generation</p>
                <CodeBlock code={`curl -X POST ${BASE_URL}/api/v1/video/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${EXAMPLE_REQUEST}'`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">2. Poll status (every 3-5 seconds)</p>
                <CodeBlock code={`curl ${BASE_URL}/api/v1/video/JOB_ID \\
  -H "Authorization: Bearer YOUR_API_KEY"`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">3. Download when ready</p>
                <CodeBlock code={`# video_url from the status response is a direct download link
curl -L ${BASE_URL}/api/v1/video/JOB_ID/download \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -o video.mp4`} />
              </div>
            </div>
          </Section>

          {/* Auth */}
          <Section id="auth" title="Authentication">
            <p className="text-sm text-gray-600 mb-4">
              All endpoints require a Bearer token in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-purple-700">Authorization</code> header.
            </p>
            <CodeBlock code={`Authorization: Bearer opk_a1b2c3d4e5f6...`} />
            <p className="text-sm text-gray-500 mt-3">Contact Opera to get your API key.</p>
          </Section>

          {/* Generate */}
          <Section id="generate" title="Generate Video">
            <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5 mb-4">
              <code className="text-sm font-mono text-purple-700">POST /api/v1/video/generate</code>
            </div>
            <table className="w-full text-left">
              <thead><tr className="border-b border-gray-200"><th className="pb-2 text-sm font-medium text-gray-500">Parameter</th><th className="pb-2 text-sm font-medium text-gray-500">Type</th><th className="pb-2 text-sm font-medium text-gray-500"></th><th className="pb-2 text-sm font-medium text-gray-500">Description</th></tr></thead>
              <tbody>
                <ParamRow name="patient_name" type="string" required desc="Patient's full name." />
                <ParamRow name="doctor_name" type="string" required desc="Doctor's name (include 'Dr.' prefix)." />
                <ParamRow name="clinic_name" type="string" required desc="Clinic or practice name." />
                <ParamRow name="treatment" type="string" required desc="Treatment type. See Treatments section." />
                <ParamRow name="treatment_notes" type="string" desc="Clinical notes (e.g. 'MOD composite #14')." />
                <ParamRow name="video_goal" type="string" desc="Video purpose." def='"educate"' />
                <ParamRow name="patient_status" type="string" desc="Where the patient is in their journey." def='"undecided"' />
                <ParamRow name="appointment_context" type="string" desc="Type of appointment." def='"new_patient_consult"' />
                <ParamRow name="content_mode" type="string" desc="Script generation mode." def='"template"' />
                <ParamRow name="concerns" type="string" desc="Patient concerns (e.g. 'afraid of needles')." />
                <ParamRow name="financing" type="string" desc="Financing info (e.g. 'accepts CareCredit')." />
                <ParamRow name="urgency_level" type="string" desc="Urgency: routine, moderate, urgent." def='"routine"' />
                <ParamRow name="parent_mode" type="boolean" desc="Video is for a child's parent." def="false" />
                <ParamRow name="brand_primary_color" type="string" desc="Hex color for clinic branding." def='"#7c3aed"' />
              </tbody>
            </table>
            <h4 className="text-sm font-medium text-gray-700 mt-6 mb-2">Response (202 Accepted)</h4>
            <CodeBlock code={`{
  "id": "uuid-job-id",
  "status": "processing",
  "poll_url": "/api/v1/video/uuid-job-id",
  "created_at": "2026-01-15T10:30:00.000Z"
}`} lang="json" />
          </Section>

          {/* Status */}
          <Section id="status" title="Check Status">
            <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5 mb-4">
              <code className="text-sm font-mono text-purple-700">GET /api/v1/video/:id</code>
            </div>
            <p className="text-sm text-gray-600 mb-4">Poll every 3-5 seconds until <code className="bg-gray-100 px-1 rounded">status</code> is <code className="bg-green-50 text-green-700 px-1 rounded">completed</code> or <code className="bg-red-50 text-red-700 px-1 rounded">failed</code>.</p>
            <CodeBlock code={`// Processing
{ "id": "...", "status": "processing", "progress": 0.65, "step": "Rendering video" }

// Completed
{ "id": "...", "status": "completed", "progress": 1.0,
  "video_url": "https://...s3.amazonaws.com/videos/...",
  "download_url": "/api/v1/video/.../download" }

// Failed
{ "id": "...", "status": "failed", "error": "Description of error" }`} lang="json" />
          </Section>

          {/* Download */}
          <Section id="download" title="Download Video">
            <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5 mb-4">
              <code className="text-sm font-mono text-purple-700">GET /api/v1/video/:id/download</code>
            </div>
            <p className="text-sm text-gray-600 mb-2">Redirects (302) to the video file. The <code className="bg-gray-100 px-1 rounded">video_url</code> from the status endpoint is also a direct link.</p>
          </Section>

          {/* Treatments */}
          <Section id="treatments" title="Supported Treatments">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TREATMENTS.map((t) => (
                <div key={t} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-mono text-gray-700">{t}</div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">Diagnosis and specialty are auto-derived from the treatment type.</p>
          </Section>

          {/* Errors */}
          <Section id="errors" title="Error Codes">
            <table className="w-full text-left">
              <thead><tr className="border-b border-gray-200"><th className="pb-2 text-sm font-medium text-gray-500">HTTP</th><th className="pb-2 text-sm font-medium text-gray-500">Code</th><th className="pb-2 text-sm font-medium text-gray-500">Description</th></tr></thead>
              <tbody>
                <tr className="border-b border-gray-100"><td className="py-2 text-sm">400</td><td className="py-2 text-sm font-mono text-purple-700">invalid_json</td><td className="py-2 text-sm text-gray-600">Request body is not valid JSON.</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2 text-sm">401</td><td className="py-2 text-sm font-mono text-purple-700">unauthorized</td><td className="py-2 text-sm text-gray-600">Missing or invalid API key.</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2 text-sm">404</td><td className="py-2 text-sm font-mono text-purple-700">not_found</td><td className="py-2 text-sm text-gray-600">Job ID does not exist.</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2 text-sm">422</td><td className="py-2 text-sm font-mono text-purple-700">validation_error</td><td className="py-2 text-sm text-gray-600">Input validation failed. Check <code>details</code> array.</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2 text-sm">429</td><td className="py-2 text-sm font-mono text-purple-700">rate_limited</td><td className="py-2 text-sm text-gray-600">Rate limit exceeded. Check <code>Retry-After</code> header.</td></tr>
                <tr><td className="py-2 text-sm">500</td><td className="py-2 text-sm font-mono text-purple-700">internal_error</td><td className="py-2 text-sm text-gray-600">Unexpected server error.</td></tr>
              </tbody>
            </table>
          </Section>

          {/* Rate Limits */}
          <Section id="limits" title="Rate Limits">
            <p className="text-sm text-gray-600 mb-2">Default limits per API key:</p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc ml-5">
              <li><strong>10 requests/minute</strong></li>
              <li><strong>500 requests/day</strong></li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">Contact Opera for higher limits. When rate limited, the response includes a <code className="bg-gray-100 px-1 rounded">Retry-After</code> header (seconds).</p>
          </Section>

          {/* Code Examples */}
          <Section id="examples" title="Code Examples">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Python</h4>
                <CodeBlock code={`import requests, time

API_KEY = "opk_your_key_here"
BASE = "${BASE_URL}"

# 1. Generate
resp = requests.post(f"{BASE}/api/v1/video/generate",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "patient_name": "Sarah Johnson",
        "doctor_name": "Dr. Martinez",
        "clinic_name": "Bright Smiles Dental",
        "treatment": "crown"
    })
job = resp.json()
job_id = job["id"]

# 2. Poll
while True:
    status = requests.get(f"{BASE}/api/v1/video/{job_id}",
        headers={"Authorization": f"Bearer {API_KEY}"}).json()
    if status["status"] == "completed":
        print("Video URL:", status["video_url"])
        break
    elif status["status"] == "failed":
        print("Error:", status["error"])
        break
    time.sleep(3)`} lang="python" />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Node.js</h4>
                <CodeBlock code={`const API_KEY = "opk_your_key_here";
const BASE = "${BASE_URL}";

// 1. Generate
const { id } = await fetch(\`\${BASE}/api/v1/video/generate\`, {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${API_KEY}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    patient_name: "Sarah Johnson",
    doctor_name: "Dr. Martinez",
    clinic_name: "Bright Smiles Dental",
    treatment: "crown"
  })
}).then(r => r.json());

// 2. Poll
while (true) {
  const status = await fetch(\`\${BASE}/api/v1/video/\${id}\`, {
    headers: { "Authorization": \`Bearer \${API_KEY}\` }
  }).then(r => r.json());

  if (status.status === "completed") {
    console.log("Video:", status.video_url);
    break;
  }
  if (status.status === "failed") throw new Error(status.error);
  await new Promise(r => setTimeout(r, 3000));
}`} lang="javascript" />
              </div>
            </div>
          </Section>

          {/* Try It */}
          <Section id="try" title="Try It Live">
            <TryItPanel />
          </Section>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
          Opera AI &mdash; Patient Video API v1
        </footer>
      </div>
    </div>
  );
}
