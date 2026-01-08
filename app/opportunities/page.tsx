"use client"

import React from "react";
import Opportunities from "@/Pages/Opportunities.jsx"
import CinematicSidebar from "@/Components/layout/CinematicSidebar";

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CinematicSidebar />
      <div className="relative z-10 p-8">
        <Opportunities />
      </div>
    </div>
  );
}