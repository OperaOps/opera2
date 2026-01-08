"use client"

import React from "react";
import DentalWorkflow from "@/Pages/DentalWorkflow.jsx"
import CinematicSidebar from "@/Components/layout/CinematicSidebar";

export default function DentalWorkflowPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CinematicSidebar />
      <div className="relative z-10 p-8">
        <DentalWorkflow />
      </div>
    </div>
  );
}