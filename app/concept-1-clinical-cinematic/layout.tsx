import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./local.css";

const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--c1-display",
  adjustFontFallback: false,
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--c1-mono",
});

export const metadata: Metadata = {
  title: "Opera — Clinical Cinematic",
  description:
    "The future of patient education is visual. Opera turns every treatment plan into a personal, visual explanation.",
};

export default function ConceptOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${display.variable} ${mono.variable} c1-root`}>
      {children}
    </div>
  );
}
