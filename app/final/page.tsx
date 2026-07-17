"use client";

import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Wall from "./components/Wall";
import Voice from "./components/Voice";
import ProductCarousel from "./components/ProductCarousel";
import Dataset from "./components/Dataset";
import MayoPlate from "./components/MayoPlate";
import Closing from "./components/Closing";

export default function FinalPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Nav />
        <Wall />
        <Voice />
        <ProductCarousel />
        <Dataset />
        <MayoPlate />
        <Closing />
      </main>
    </MotionConfig>
  );
}
