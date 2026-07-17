"use client";

import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import MayoPlate from "./components/MayoPlate";
import Dataset from "./components/Dataset";
import VideoMoment from "./components/VideoMoment";
import Journey from "./components/Journey";
import Voice from "./components/Voice";
import Closing from "./components/Closing";

export default function FinalPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Nav />
        <Hero />
        <MayoPlate />
        <Dataset />
        <VideoMoment />
        <Journey />
        <Voice />
        <Closing />
      </main>
    </MotionConfig>
  );
}
