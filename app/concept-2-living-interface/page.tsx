"use client";

import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import WhySection from "./components/WhySection";
import AskOperaSection from "./components/AskOperaSection";
import IntentSection from "./components/IntentSection";
import PlatformSection from "./components/PlatformSection";
import CtaSection from "./components/CtaSection";

export default function LivingInterfacePage() {
  return (
    <main className="relative">
      <Nav />
      <HeroSection />
      <WhySection />
      <AskOperaSection />
      <IntentSection />
      <PlatformSection />
      <CtaSection />

      <footer className="border-t border-[#101418]/[0.06]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-8 lg:px-10">
          <span className="text-[17px] font-semibold tracking-tight text-[#101418] [font-family:var(--c2-font-display)]">
            Opera
          </span>
          <a
            href="mailto:opera@getopera.ai"
            className="text-[11px] tracking-[0.14em] text-[#101418]/50 transition-colors hover:text-[#4f46e5] [font-family:var(--c2-font-mono)]"
          >
            opera@getopera.ai
          </a>
          <span className="text-[11px] tracking-[0.14em] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
            © 2026 Opera AI
          </span>
        </div>
      </footer>
    </main>
  );
}
