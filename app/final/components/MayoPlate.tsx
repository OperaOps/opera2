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

        {/* ——— specialty index, one framed box on the photograph ——— */}
        <div className="relative flex min-h-[100svh] items-center px-6 py-20 md:px-14">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1, ease: EASE }}
            className="w-full max-w-[400px] border border-[#f7f5f0]/20 bg-[#141412]/85 px-9 py-9 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm md:px-11 md:py-10"
          >
            <p className="cf-mono text-[11px] uppercase tracking-[0.28em] text-[#f7f5f0]/65">
              In the field today
            </p>
            <ul className="mt-6 space-y-[7px]">
              {SPECIALTIES.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.04, ease: EASE }}
                  className="flex items-baseline gap-4"
                >
                  <span className="cf-mono w-6 shrink-0 text-[10px] tracking-[0.12em] text-[#a78bfa]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="cf-display text-[17px] leading-snug tracking-[-0.01em] text-[#f7f5f0]">
                    {s}
                  </span>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + SPECIALTIES.length * 0.04, ease: EASE }}
                className="flex items-baseline gap-4 border-t border-[#f7f5f0]/15 pt-3 mt-3"
              >
                <span className="cf-mono w-6 shrink-0 text-[10px] tracking-[0.12em] text-[#a78bfa]">
                  20
                </span>
                <span className="cf-display text-[17px] italic leading-snug text-[#a78bfa]">
                  More to come
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

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
              <p className="cf-mono mt-3 text-[10.5px] uppercase tracking-[0.22em] text-[#f7f5f0]/60">
                Mayo Clinic, Rochester MN
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
