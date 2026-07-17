"use client";

import Nav from "./components/Nav";
import HeroWall from "./components/HeroWall";
import WhyVisual from "./components/WhyVisual";
import AskOperaConsole from "./components/AskOperaConsole";
import ConsultIntelligence from "./components/ConsultIntelligence";
import PlatformPreview from "./components/PlatformPreview";
import ClosingCta from "./components/ClosingCta";

export default function ClinicalCinematicPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#050607] text-[#f2f0eb]">
      <div className="c1-grain" aria-hidden />
      <Nav />
      <HeroWall />
      <WhyVisual />
      <AskOperaConsole />
      <ConsultIntelligence />
      <PlatformPreview />
      <ClosingCta />
    </main>
  );
}
