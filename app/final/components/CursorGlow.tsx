"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft sage glow that trails the cursor. Two layers on different
 * springs so the light stretches behind the movement, then settles.
 * Desktop pointers only.
 */
export default function CursorGlow() {
  const [on, setOn] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);

  const x1 = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const y1 = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const x2 = useSpring(x, { stiffness: 70, damping: 22, mass: 1 });
  const y2 = useSpring(y, { stiffness: 70, damping: 22, mass: 1 });

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setOn(true);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!on) return null;

  return (
    <>
      {/* the trailing wash */}
      <motion.div
        aria-hidden
        style={{ x: x2, y: y2, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-72 w-72 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(169,192,170,0.22) 0%, rgba(169,192,170,0.07) 45%, transparent 70%)",
            filter: "blur(14px)",
          }}
        />
      </motion.div>
      {/* the light itself */}
      <motion.div
        aria-hidden
        style={{ x: x1, y: y1, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-24 w-24 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(224,236,225,0.4) 0%, rgba(169,192,170,0.16) 50%, transparent 72%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </>
  );
}
