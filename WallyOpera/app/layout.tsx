import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Opera — Consult Intelligence",
  description:
    "AI that understands every consultation. Opera listens, assists clinicians in real time, generates personalized follow-up, and learns what drives treatment acceptance.",
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
