"use client"

import React from "react";
import { motion } from "framer-motion";
import MetricCard from "@/Components/dashboard/MetricCard";
import LiveChart from "@/Components/dashboard/LiveChart";
import { Users, UserCheck, Clock, UserX, Activity } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const ProviderLeaderboard = ({ providers }) => (
  <div className="space-y-4">
    {providers.map((provider, index) => (
      <motion.div 
        key={provider.name} 
        variants={itemVariants} 
        className="fluid-surface p-6 rounded-[1.5rem] flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <UserCheck className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <p className="text-base font-light text-gray-100">{provider.name}</p>
            <p className="text-sm text-gray-400">{provider.role}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-light text-flow">${provider.pph.toLocaleString()}/hr</p>
          <p className="text-xs text-gray-500">Production Per Hour</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-light text-white">{provider.utilization}%</p>
          <p className="text-xs text-gray-500">Utilization</p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default function PeopleOps() {
  const recallData = [
    { name: 'Wk 1', value: 85 }, { name: 'Wk 2', value: 87 }, 
    { name: 'Wk 3', value: 88 }, { name: 'Wk 4', value: 89 }
  ];
  
  const providers = [
    { name: "Dr. Chloe Davis", role: "Dentist", pph: 750, utilization: 92 },
    { name: "Dr. Anya Sharma", role: "Dentist", pph: 810, utilization: 88 },
    { name: "Jessica Day", role: "Hygienist", pph: 250, utilization: 95 }
  ];
  
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-4xl font-extralight text-white tracking-wide">People Operations</h1>
        <p className="text-base text-gray-400 font-light">Team performance and patient care analytics</p>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Active Patients" value="1,842" trend="up" trendPercentage={5} icon={Users} />
        <MetricCard title="Hygiene Reappointment" value="89%" trend="up" trendPercentage={4} icon={Activity} />
        <MetricCard title="No-Show Rate" value="3.8%" trend="down" trendPercentage={8} icon={UserX} />
        <MetricCard title="Daily Appointments" value="56" trend="up" trendPercentage={12} icon={UserCheck} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-4 fluid-surface rounded-[2rem] p-8">
          <h3 className="text-2xl font-light text-gray-200 mb-6">Provider Productivity</h3>
          <ProviderLeaderboard providers={providers} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <LiveChart title="Recall Compliance %" data={recallData} color="#3b82f6" />
        </motion.div>
      </div>
    </motion.div>
  );
}