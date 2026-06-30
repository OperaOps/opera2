import Link from 'next/link';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { navItems } from '@/lib/nav';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/70 bg-white/60">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy-800 to-teal-600 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-navy-900">
                Opera Patient Education Studio
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Turning real-world evidence into human understanding. A concept demo
              exploring how Opera AI could translate approved content and care
              context into personalized patient education for the Truveta ecosystem.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Educational only · Synthetic demo data · Human review required
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-500 transition-colors hover:text-navy-800"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200/70 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>© 2026 Opera AI · Concept demo. Not a medical device. Not clinical decision support.</p>
          <p>Not for use with real patient data in this build.</p>
        </div>
      </div>
    </footer>
  );
}
