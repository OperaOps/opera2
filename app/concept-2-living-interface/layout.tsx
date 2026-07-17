import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./local.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--c2-font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--c2-font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--c2-font-mono",
});

export const metadata: Metadata = {
  title: "Opera — Living Interface",
  description:
    "Visual patient education. Every treatment explained visually — personalized videos, Ask Opera, and the consult intelligence layer behind case acceptance.",
};

export default function Concept2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-[#fafaf8] text-[#101418] antialiased [font-family:var(--c2-font-body)]`}
    >
      {children}
    </div>
  );
}
