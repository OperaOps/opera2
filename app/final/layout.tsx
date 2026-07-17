import type { Metadata } from "next";
import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./local.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--cf-font-display",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--cf-font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--cf-font-mono",
});

export const metadata: Metadata = {
  title: "Opera. Understanding is a visual act",
  description:
    "Opera turns every treatment plan into moving, medically true images, in every specialty, and works the interval between the consult and the yes.",
};

export default function FinalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable} cf-root cf-body min-h-screen bg-[#ffffff] text-[#1a1a17] antialiased`}
    >
      {children}
    </div>
  );
}
