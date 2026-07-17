import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
import "../local.css";

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

/** Font variables + base theme for the marketing site, shared by / and /final. */
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable} cf-root cf-body min-h-screen bg-[#ffffff] text-[#1a1a17] antialiased`}
    >
      {children}
    </div>
  );
}
