"use client"

import React from "react";
import RiskOps from "../../Pages/RiskOps.jsx"
import CinematicSidebar from "../../Components/layout/CinematicSidebar";

export default function RiskOpsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CinematicSidebar />
      <div className="relative z-10 p-8">
        <RiskOps />
      </div>
    </div>
  );
}