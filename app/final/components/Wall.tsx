"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CALENDLY_URL, SITE_PHOTOS } from "@/lib/concepts/shared";
import { WallVideo, useIsMobile } from "./media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ————————————————————————————————————————————————————————————————
   The wall. One full screen of treatment footage resting in shadowed
   black and white, with one lit sentence at its center. Hovering a
   tile brings it back to color and size. No other copy.

   Composition is deliberately medicine wide: dental appears exactly
   six times; everything else is orthopedics, GI, cardiology,
   neurology, radiology, and general medicine.
   ———————————————————————————————————————————————————————————————— */

const NONDENTAL_VIDEOS = [
  "/videos/knee-anatomy-acl.mp4",
  "/videos/knee2.mp4",
  "/videos/knee3.mp4",
  "/videos/knee4.mp4",
  "/videos/knee5.mp4",
  "/videos/knee6.mp4",
  "/videos/library/cardio-stent.mp4",
  "/videos/library/scope-device.mp4",
  "/videos/library/colonoscopy-patient-video.mp4",
  "/videos/library/medication-routine.mp4",
  "/videos/library/patient-watching-home.mp4",
  "/videos/sitepics/patient-watching-veo.mp4",
];

// Photography plus scene stills pulled from different moments of the long
// clips, so the wall reads as far more footage than the clip count alone.
const PHOTOS = [
  SITE_PHOTOS.anatomyHeart,
  "/videos/posters/scene-colonoscopy-patient-video-1.jpg",
  SITE_PHOTOS.surgeryBW,
  "/videos/posters/scene-knee6-2.jpg",
  "/videos/posters/scene-patient-watching-home-2.jpg",
  SITE_PHOTOS.neurons,
  "/videos/posters/scene-colonoscopy-patient-video-3.jpg",
  SITE_PHOTOS.xrayOk,
  "/videos/posters/scene-medication-routine-1.jpg",
  "/videos/posters/scene-cardio-stent-2.jpg",
  SITE_PHOTOS.surgeryTeal,
  "/videos/posters/scene-colonoscopy-patient-video-5.jpg",
  "/videos/posters/scene-patient-watching-veo-2.jpg",
  SITE_PHOTOS.anatomyHeartAlt,
  "/videos/posters/scene-knee6-3.jpg",
  "/videos/posters/scene-colonoscopy-patient-video-7.jpg",
  SITE_PHOTOS.surgeryLights,
  "/videos/posters/scene-scope-device-1.jpg",
  "/videos/posters/scene-medication-routine-3.jpg",
  SITE_PHOTOS.newborn,
  "/videos/posters/scene-colonoscopy-patient-video-8.jpg",
  "/videos/posters/scene-cardio-stent-3.jpg",
  "/videos/posters/scene-patient-watching-home-3.jpg",
  "/videos/posters/scene-colonoscopy-patient-video-2.jpg",
];

// The full dental allowance for the entire wall.
const DENTAL_VIDEOS = [
  "/videos/hero-tooth.mp4",
  "/videos/invisalignseries.mp4",
  "/videos/crown-outcome.mp4",
  "/videos/bracesoutcome.mp4",
  "/videos/ceramic-smile.mp4",
  "/videos/expander-device.mp4",
];

const POSITIONS = [
  "object-center",
  "object-[25%_50%]",
  "object-[75%_50%]",
  "object-[50%_30%]",
  "object-[50%_70%]",
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  const rnd = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type WallTile =
  | { kind: "video"; src: string; live: boolean; posterVariant: "a" | "b"; position: string }
  | { kind: "photo"; src: string; position: string };

function buildTiles(count: number, dentalAt: number[]): WallTile[] {
  const order = shuffled(NONDENTAL_VIDEOS, 11);
  const tiles: WallTile[] = [];
  let v = 0;
  let ph = 0;
  let d = 0;
  for (let i = 0; i < count; i++) {
    if (dentalAt.includes(i) && d < DENTAL_VIDEOS.length) {
      tiles.push({
        kind: "video",
        src: DENTAL_VIDEOS[d++],
        live: true,
        posterVariant: "a",
        position: "object-center",
      });
    } else if (i % 5 === 2) {
      tiles.push({ kind: "photo", src: PHOTOS[ph++ % PHOTOS.length], position: POSITIONS[ph % POSITIONS.length] });
    } else {
      const src = order[v % order.length];
      const wrap = Math.floor(v / order.length);
      tiles.push({
        kind: "video",
        src,
        live: v % 3 === 1,
        posterVariant: (wrap + v) % 2 === 0 ? "a" : "b",
        position: POSITIONS[(wrap * 2 + v) % POSITIONS.length],
      });
      v++;
    }
  }
  return tiles;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Wall() {
  const isMobile = useIsMobile();

  const rows = useMemo(() => {
    const cols = isMobile ? 4 : 12;
    const rowCount = isMobile ? 8 : 9;
    const dentalAt = isMobile ? [5, 17, 27] : [7, 25, 47, 63, 82, 101];
    return chunk(buildTiles(cols * rowCount, dentalAt), cols);
  }, [isMobile]);

  return (
    <section id="top" className="relative h-[100svh] overflow-hidden bg-[#0c0c0b]">
      {/* ——— the grid, edge to edge ——— */}
      <div className="flex h-full flex-col gap-px">
        {rows.map((row, r) => (
          <div key={r} className="cf-wallrow flex min-h-0 gap-px">
            {row.map((tile, c) => (
              <motion.div
                key={`${r}-${c}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.05 * r + 0.03 * c, ease: EASE }}
                className="cf-walltile relative min-w-0 overflow-hidden bg-[#161614]"
              >
                {tile.kind === "video" ? (
                  <WallVideo
                    src={tile.src}
                    live={tile.live}
                    posterVariant={tile.posterVariant}
                    position={tile.position}
                    mediaClassName="cf-bw"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tile.src}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className={`cf-bw h-full w-full object-cover ${tile.position}`}
                  />
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* ——— shadow over the field ——— */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ——— the opening: OPERA AI across the page, then the sentence ——— */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6">
        <h1
          aria-label="Opera AI"
          className="cf-display flex w-[93vw] max-w-full items-baseline justify-between font-light leading-none text-[#f7f5f0]"
          style={{ textShadow: "0 4px 60px rgba(0,0,0,0.65)" }}
        >
          {["O", "P", "E", "R", "A"].map((ch, i) => (
            <motion.span
              key={`o-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 + i * 0.09, ease: EASE }}
              className="text-[clamp(3.4rem,12.5vw,12.5rem)]"
            >
              {ch}
            </motion.span>
          ))}
          {["A", "I"].map((ch, i) => (
            <motion.span
              key={`a-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 + (5 + i) * 0.09, ease: EASE }}
              className="text-[clamp(3.4rem,12.5vw,12.5rem)] text-[#a78bfa]"
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          className="pointer-events-auto mt-9 bg-[#f7f5f0] px-9 py-7 text-center shadow-[0_0_130px_16px_rgba(247,245,240,0.22),0_40px_90px_-30px_rgba(0,0,0,0.7)] md:px-14 md:py-8"
        >
          <p className="cf-display text-[clamp(1.4rem,2.7vw,2.2rem)] font-light leading-[1.06] tracking-[-0.02em]">
            Understanding is a{" "}
            <em className="italic text-[#7c3aed]">visual</em> act.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cf-link group cf-mono mt-6 inline-flex gap-2 text-[12px] uppercase tracking-[0.24em] text-[#7c3aed]"
          >
            Book a demo
            <ArrowRight
              size={13}
              strokeWidth={1.75}
              className="translate-y-[1.5px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
