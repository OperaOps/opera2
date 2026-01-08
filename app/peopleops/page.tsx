"use client"

import React from "react";
import PeopleOps from "@/Pages/PeopleOps.jsx"
import CinematicSidebar from "@/Components/layout/CinematicSidebar";

export default function PeopleOpsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CinematicSidebar />
      <div className="relative z-10 p-8">
        <PeopleOps />
      </div>
    </div>
  );
}