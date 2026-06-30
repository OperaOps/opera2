import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

/** Global page chrome: ambient background, sticky nav, content, footer. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Ambient background mesh — calm, premium, healthcare. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-slate-25 bg-mesh-light"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.015] noise-overlay"
      />
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pt-14">
        {children}
      </main>
      <Footer />
    </div>
  );
}
