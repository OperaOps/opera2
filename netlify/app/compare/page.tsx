"use client"

import React from "react";
import Compare from "../../Pages/Compare.jsx"
import CinematicSidebar from "../../Components/layout/CinematicSidebar";

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CinematicSidebar />
      <div className="relative z-10 p-8">
        <Compare />
      </div>
    </div>
  );
}