"use client";

import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Wall from "./components/Wall";
import MayoPlate from "./components/MayoPlate";
import ProductStory from "./components/ProductStory";
import Dataset from "./components/Dataset";
import Voice from "./components/Voice";
import Closing from "./components/Closing";

export default function FinalPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Nav />
        <Wall />
        <MayoPlate />
        <ProductStory />
        <Dataset />
        <Voice />
        <Closing />
      </main>
    </MotionConfig>
  );
}
