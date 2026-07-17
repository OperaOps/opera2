"use client";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Why from "./components/Why";
import AskOpera from "./components/AskOpera";
import Journey from "./components/Journey";
import Intelligence from "./components/Intelligence";
import Platform from "./components/Platform";
import Voices from "./components/Voices";
import Cta from "./components/Cta";

/**
 * Concept 4 — Hybrid.
 * Cinematic dark hero → warm-white editorial body → dark finale.
 * The light "sheet" slides up over the pinned hero: theater to daylight.
 */
export default function ConceptFourPage() {
  return (
    <div className="overflow-x-clip">
      <Nav />
      <Hero />
      <main className="relative z-10 -mt-[58vh] rounded-t-[2.5rem] bg-[#faf9f6] pb-40 shadow-[0_-32px_90px_rgba(0,0,0,0.5)]">
        <Why />
        <AskOpera />
        <Journey />
        <Intelligence />
        <Platform />
        <Voices />
      </main>
      <Cta />
    </div>
  );
}
