"use client";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhyVisual from "./components/WhyVisual";
import AskOpera from "./components/AskOpera";
import DatasetAppendix from "./components/DatasetAppendix";
import PhotoPlate from "./components/PhotoPlate";
import PlatformPlate from "./components/PlatformPlate";
import Closing from "./components/Closing";

export default function EditorialSciencePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhyVisual />
      <AskOpera />
      <DatasetAppendix />
      <PhotoPlate />
      <PlatformPlate />
      <Closing />
    </main>
  );
}
