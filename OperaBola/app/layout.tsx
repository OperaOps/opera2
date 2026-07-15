import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Opera — Periodontal Patient Education",
  description:
    "Personalized periodontal treatment videos — scaling & root planing, laser therapy, and pocket reduction — delivered to each patient after their consult. Prepared for Bola.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <Nav />
        {children}
      </body>
    </html>
  );
}
