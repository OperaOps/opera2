import type { Metadata } from "next";
import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./local.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--c3-font-display",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--c3-font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--c3-font-mono",
});

export const metadata: Metadata = {
  title: "Opera — Editorial Science",
  description:
    "Opera is a visual system for patient understanding. Treatment explained in moving images, questions answered from the patient's own plan, and the definitive dataset of how patients decide.",
};

export default function EditorialScienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable} c3-root c3-body min-h-screen bg-[#f7f5f0] text-[#1a1a17] antialiased`}
    >
      {children}
    </div>
  );
}
