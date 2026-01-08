"use client"

import React from "react";
import Dashboard from "@/Pages/Dashboard.jsx"
import CinematicSidebar from "@/Components/layout/CinematicSidebar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CinematicSidebar />
      <div className="relative z-10 p-8">
        <Dashboard />
      </div>
    </div>
  );
}
