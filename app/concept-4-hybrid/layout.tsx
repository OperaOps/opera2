import type { Metadata } from "next";
import { Inter, Inter_Tight, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./local.css";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--c4-font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--c4-font-body",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--c4-font-serif",
  adjustFontFallback: false,
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--c4-font-mono",
});

export const metadata: Metadata = {
  title: "Opera — Hybrid",
  description:
    "Opera turns every treatment plan into a personalized visual experience — and every consult into intelligence.",
};

export default function ConceptFourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${body.variable} ${serif.variable} ${mono.variable} c4-root`}
    >
      {children}
    </div>
  );
}
