"use client"

import React from "react";
import CinematicSidebar from "./layout/CinematicSidebar";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <CinematicSidebar />
      <div className="relative z-10 p-8">
        {children}
      </div>
    </div>
  );
}
