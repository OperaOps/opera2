"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CALENDLY_URL, SITE_PHOTOS } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ————————————————————————————————————————————————————————————————
   The Mayo Clinic plate, full screen. One vibrant box, bottom left,
   holding the only ask. The headline sits bottom right.
   ———————————————————————————————————————————————————————————————— */

export default function MayoPlate() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} id="specialties" className="scroll-mt-16">
      <div className="relative min-h-[100svh] overflow-hidden">
        <motion.img
          src={SITE_PHOTOS.mayoClinic}
          alt="Mayo Clinic, Rochester, Minnesota"
          style={{ y }}
          className="absolute inset-x-0 top-[-9%] h-[118%] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1a1a17]/70 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-[1560px] flex-col gap-8 px-6 pb-12 md:flex-row md:items-end md:justify-between md:px-10">
            {/* ——— the vibrant box ——— */}
            <motion.a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="group block w-full max-w-[440px] rounded-2xl bg-[#5f7a61] p-8 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:bg-[#516b53] md:p-10"
            >
              <span className="cf-display flex items-center gap-3 text-[clamp(2rem,3.4vw,3rem)] font-light leading-none tracking-[-0.02em] text-white">
                Book a demo
                <ArrowUpRight
                  size={34}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </span>
              <span className="cf-body mt-3 block text-[15.5px] font-medium text-white/85">
                20 minutes. Your cases, visualized.
              </span>
            </motion.a>

            {/* ——— the line ——— */}
            <div className="md:text-right">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: EASE }}
                className="cf-display max-w-2xl text-[clamp(1.9rem,4vw,3.4rem)] font-light italic leading-[1.06] tracking-[-0.02em] text-white md:ml-auto"
              >
                Built for teams who take understanding seriously.
              </motion.h2>
              <p className="cf-mono mt-3 text-[12px] uppercase tracking-[0.22em] text-white/60">
                Mayo Clinic, Rochester MN
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
