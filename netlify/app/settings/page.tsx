"use client"

import React from "react";
import Settings from "../../Pages/Settings.jsx"
import CinematicSidebar from "../../Components/layout/CinematicSidebar";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <CinematicSidebar />
      <div className="relative z-10 p-8">
        <Settings />
      </div>
    </div>
  );
}