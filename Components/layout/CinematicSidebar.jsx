
"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPageUrl } from "@/utils";
import {
  Menu,
  X,
  Users,
  Shield,
  DollarSign,
  Lightbulb,
  Target,
  BarChart,
  ClipboardList,
  FileText,
  Settings,
  Zap,
  LayoutGrid,
  Home
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: BarChart, id: "dashboard" },
  { title: "Dental Workflow", url: createPageUrl("DentalWorkflow"), icon: LayoutGrid, id: "workflow" },
  { title: "People Ops", url: createPageUrl("PeopleOps"), icon: Users, id: "people" },
  { title: "Risk & Quality", url: createPageUrl("RiskOps"), icon: Shield, id: "risk" },
  { title: "Financial Ops", url: createPageUrl("FinancialOps"), icon: DollarSign, id: "finance" },
  { title: "Opportunities", url: createPageUrl("Opportunities"), icon: Lightbulb, id: "opportunities" },
  { title: "Compare", url: createPageUrl("Compare"), icon: Target, id: "compare" },
  { title: "Data Input", url: createPageUrl("DataInput"), icon: Zap, id: "integrations" }
];

export default function CinematicSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleHomeClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 p-2 bg-black/20 backdrop-blur-md border border-purple-500/30 rounded-xl hover:border-purple-500/60 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>

        <Menu className="w-5 h-5 text-purple-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen &&
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]" />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }} className="fixed left-0 top-0 h-full w-64 bg-black/80 backdrop-blur-xl border-r border-purple-500/20 z-[100] flex flex-col justify-between">

              <div> {/* Top Group */}
                <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
                  <Link href="/" onClick={handleHomeClick} className="flex items-center space-x-2">
                    <Home className="w-5 h-5 text-purple-400" />
                    <h2 className="text-lg font-thin text-white"

                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(160,32,240,0.8) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>Opera AI
                    </h2>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-purple-500/20 rounded-lg transition-colors">

                    <X className="w-4 h-4 text-purple-300" />
                  </button>
                </div>

                <nav className="p-3 space-y-1">
                  {navigationItems.map((item, index) => {
                    const isActive = pathname === item.url;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}>

                        <Link href={item.url} onClick={() => setIsOpen(false)}>
                          <div
                            className={`group flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                              isActive ?
                                'bg-purple-600/30 border border-purple-500/40' :
                                'hover:bg-purple-500/10'}`
                            }>

                            <item.icon className={`w-4 h-4 transition-colors duration-300 ${
                              isActive ?
                                'text-purple-200' :
                                'text-purple-400/70 group-hover:text-purple-300'}`
                            } />
                            <span className={`font-light text-sm transition-colors duration-300 ${
                              isActive ?
                                'text-purple-100' :
                                'text-purple-200/80 group-hover:text-purple-100'}`
                            }>
                              {item.title}
                            </span>
                          </div>
                        </Link>
                      </motion.div>);
                  })}
                </nav>
              </div>

              <div className="p-3 border-t border-purple-500/20">
                <Link href={createPageUrl("Settings")} onClick={() => setIsOpen(false)}>
                  <div className="group flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-purple-500/10 transition-all duration-300">
                    <Settings className="w-4 h-4 text-purple-400/70 group-hover:text-purple-300 transition-colors duration-300" />
                    <span className="text-purple-200/80 group-hover:text-purple-100 font-light text-sm transition-colors duration-300">
                      Settings
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </>
  );
}
