"use client"

import React from "react";
import FinancialOps from "../../Pages/FinancialOps.jsx"
import CinematicSidebar from "../../Components/layout/CinematicSidebar";

export default function FinancialOpsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CinematicSidebar />
      <div className="relative z-10 p-8">
        <FinancialOps />
      </div>
    </div>
  );
}