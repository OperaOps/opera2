"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE_PHOTOS } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ————————————————————————————————————————————————————————————————
   Page two: the Mayo Clinic plate, full screen. The specialty index
   sits on the photograph itself as a shadowed column of type on the
   left. Nothing else on the page.
   ———————————————————————————————————————————————————————————————— */

const SPECIALTIES = [
  "Dental",
  "Orthodontics",
  "Oral Surgery",
  "Oncology",
  "Neurology",
  "Ophthalmology",
  "Radiology",
  "Cardiology",
  "General Medicine",
  "Pediatrics",
  "Veterinary",
  "Orthopedics",
  "ENT",
  "Dermatology",
  "Women's Health",
  "Physical Therapy",
  "Plastic Surgery",
  "Behavioral Health",
  "Pain Management",
];

export default function MayoPlate() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} id="specialties" className="scroll-mt-14">
      <div className="relative min-h-[100svh] overflow-hidden">
        <motion.img
          src={SITE_PHOTOS.mayoClinic}
          alt="Mayo Clinic, Rochester, Minnesota"
          style={{ y }}
          className="absolute inset-x-0 top-[-9%] h-[118%] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#1a1a17]/70 to-transparent" />

        {/* ——— specialty column, shadowed onto the photograph ——— */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative flex min-h-[100svh] w-full max-w-[400px] flex-col justify-center bg-gradient-to-r from-[#141412]/80 via-[#141412]/60 to-transparent px-8 py-16 md:px-12"
        >
          <p className="cf-mono text-[9px] uppercase tracking-[0.28em] text-[#f7f5f0]/55">
            In the field today
          </p>
          <ul className="mt-6 space-y-[7px]">
            {SPECIALTIES.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.045, ease: EASE }}
                className="flex items-baseline gap-3.5"
              >
                <span className="cf-mono w-5 shrink-0 text-[8.5px] tracking-[0.12em] text-[#a78bfa]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="cf-display text-[15px] leading-snug tracking-[-0.01em] text-[#f7f5f0]/90">
                  {s}
                </span>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 + SPECIALTIES.length * 0.045, ease: EASE }}
              className="flex items-baseline gap-3.5 pt-1.5"
            >
              <span className="cf-mono w-5 shrink-0 text-[8.5px] tracking-[0.12em] text-[#a78bfa]">
                20
              </span>
              <span className="cf-display text-[15px] italic leading-snug text-[#a78bfa]">
                More to come
              </span>
            </motion.li>
          </ul>
        </motion.div>

        {/* ——— one line, bottom right ——— */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-[1480px] flex-col gap-2 px-6 pb-10 md:flex-row md:items-end md:justify-end md:px-10">
            <div className="md:text-right">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: EASE }}
                className="cf-display max-w-2xl text-[clamp(1.9rem,4vw,3.4rem)] font-light italic leading-[1.06] tracking-[-0.02em] text-[#f7f5f0] md:ml-auto"
              >
                Built for teams who take understanding seriously.
              </motion.h2>
              <p className="cf-mono mt-3 text-[9px] uppercase tracking-[0.22em] text-[#f7f5f0]/55">
                Mayo Clinic, Rochester MN
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
