"use client"

import React from "react";
import DataInput from "@/Pages/DataInput.jsx"
import CinematicSidebar from "@/Components/layout/CinematicSidebar";

export default function DataInputPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CinematicSidebar />
      <div className="relative z-10 p-8">
        <DataInput />
      </div>
    </div>
  );
}