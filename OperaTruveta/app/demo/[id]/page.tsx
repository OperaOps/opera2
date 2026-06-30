import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Languages,
  GraduationCap,
  HeartPulse,
  Users,
  Sparkles,
  Video,
  MonitorSmartphone,
  MessageSquare,
  Mail,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { demoUseCases, getUseCaseById } from '@/lib/demoData';
import { MockVideoPlayer } from '@/components/video/MockVideoPlayer';
import { formatSeconds } from '@/lib/utils';

export function generateStaticParams() {
  return demoUseCases.map((u) => ({ id: u.id }));
}

export default function DemoDetailPage({ params }: { params: { id: string } }) {
  const u = getUseCaseById(params.id);
  if (!u) notFound();

  const p = u.patient;
  const first = p.name.split(' ')[0];

  const outputs: { icon: LucideIcon; label: string }[] = [
    { icon: Video, label: 'Video' },
    { icon: MonitorSmartphone, label: 'Portal' },
    { icon: MessageSquare, label: 'SMS' },
    { icon: Mail, label: 'Email' },
  ];

  return (
    <div className="space-y-10">
      <Link
        href="/demo-library"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-navy-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Demo Library
      </Link>

      {/* Header */}
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <span className="pill bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100">
            {u.category}
          </span>
          <span className="pill bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200">
            {u.department}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            {formatSeconds(u.estimatedRuntimeSec)}
          </span>
        </div>
        <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          {u.title}
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-slate-500">
          {u.summary}
        </p>
      </header>

      {/* The video */}
      <MockVideoPlayer useCase={u} />

      {/* Patient + what's personalized — the only two context cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-soft backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-teal-600 text-base font-semibold text-white">
              {p.name.slice(0, 1)}
            </span>
            <div>
              <p className="text-base font-semibold text-navy-900">
                {p.name}, {p.age}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700 ring-1 ring-amber-100">
                Synthetic patient
              </span>
            </div>
          </div>
          <dl className="mt-4 space-y-2.5 text-sm">
            <Row icon={Languages} label="Language" value={p.language} />
            <Row icon={GraduationCap} label="Health literacy" value={p.healthLiteracy} />
            <Row icon={HeartPulse} label="Emotional state" value={p.emotionalState} />
          </dl>
        </div>

        <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-teal-700">
            <Sparkles className="h-3.5 w-3.5" />
            Personalized for {first}
          </p>
          <ul className="mt-3 space-y-2">
            {u.personalizationSignals.slice(0, 5).map((s) => (
              <li key={s.label} className="flex items-start gap-2 text-sm text-teal-900/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                {s.label}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-teal-100 pt-4">
            {outputs.map((o) => (
              <span
                key={o.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                <o.icon className="h-3.5 w-3.5 text-teal-500" />
                {o.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <Link
          href="/demo-library"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-navy-800 transition-all hover:border-teal-200 hover:bg-teal-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all demos
        </Link>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="inline-flex items-center gap-2 text-slate-400">
        <Icon className="h-4 w-4" />
        {label}
      </dt>
      <dd className="text-right font-medium capitalize text-navy-900">{value}</dd>
    </div>
  );
}
