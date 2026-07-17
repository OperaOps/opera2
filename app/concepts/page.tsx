"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CONCEPTS, CLIPS } from "@/lib/concepts/shared";

const previewClips = [
  ["/videos/bracesproblem.mp4", "/videos/rootcanalnerve.mp4", "/videos/ceramic-smile.mp4"],
  ["/videos/invisalignseries.mp4", "/videos/implant-step1-placement.mp4", "/videos/knee-anatomy-acl.mp4"],
  ["/videos/hero-tooth.mp4", "/videos/expander-device.mp4", "/videos/whitening-step2-detail.mp4"],
  ["/videos/bracesdeep-dive.mp4", "/videos/crown-outcome.mp4", "/videos/invisalignonteeth.mp4"],
];

export default function ConceptsIndex() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white antialiased">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] tracking-[0.35em] uppercase text-white/40">
            getopera.ai — redesign explorations
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-light tracking-tight">
            Four concept directions
          </h1>
          <p className="mt-3 max-w-xl text-white/50 font-light">
            Each route is a complete one-page site with its own matching product-UI
            direction. Built local-only. Nothing is deployed.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <Link
            href="/final"
            className="group flex items-center justify-between gap-6 rounded-2xl border border-amber-200/30 bg-gradient-to-r from-amber-100/10 to-transparent p-6 transition-colors duration-500 hover:border-amber-200/60"
          >
            <div>
              <p className="text-[11px] tracking-[0.35em] uppercase text-amber-200/70">
                The composed site
              </p>
              <h2 className="mt-2 text-2xl font-light tracking-tight">Final — /final</h2>
              <p className="mt-1 max-w-2xl text-sm font-light text-white/50">
                Editorial system · dense cross-specialty wall · Mayo plate · intent dataset ·
                full-screen patient video · the journey · Dr. Zitterkopf · OR-room close.
              </p>
            </div>
            <span className="text-2xl text-amber-200/60 transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {CONCEPTS.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={c.slug}
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:border-white/30 hover:bg-white/[0.06]"
              >
                <div className="relative grid h-44 grid-cols-3 gap-px overflow-hidden bg-black">
                  {previewClips[i].map((src) => (
                    <video
                      key={src}
                      src={src}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      className="h-full w-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-90"
                    />
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 font-mono text-[52px] leading-none text-white/20 transition-colors duration-500 group-hover:text-white/40">
                    {c.number}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h2 className="text-lg font-light tracking-tight">{c.name}</h2>
                    <p className="mt-1 text-sm font-light leading-relaxed text-white/45">
                      {c.tagline}
                    </p>
                  </div>
                  <span className="mt-1 text-white/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white/70">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-14 text-xs font-light text-white/30">
          Asset library: {CLIPS.length} treatment clips · CTA constant:{" "}
          <code className="text-white/50">lib/concepts/shared.ts → CALENDLY_URL</code>
        </p>
      </div>
    </main>
  );
}
