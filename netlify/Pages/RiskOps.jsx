"use client"

import React from "react";
import { motion } from "framer-motion";
import MetricCard from "../Components/dashboard/MetricCard";
import LiveChart from "../Components/dashboard/LiveChart";
import { Shield, Smile, AlertTriangle, Target, FileCheck } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const acceptanceData = [
  { name: 'Accepted', value: 82, fill: '#34d399' },
  { name: 'Pending', value: 10, fill: '#fbbf24' },
  { name: 'Declined', value: 8, fill: '#f87171' }
];

export default function RiskOps() {
  const complianceData = [
    { name: 'Jan', value: 95 }, { name: 'Feb', value: 96 }, { name: 'Mar', value: 96 },
    { name: 'Apr', value: 97 }, { name: 'May', value: 98 }, { name: 'Jun', value: 99 },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-4xl font-extralight text-white tracking-wide">Risk & Quality</h1>
        <p className="text-base text-gray-400 font-light">Clinical compliance and patient safety analytics</p>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Radiograph Compliance" value="99%" trend="up" trendPercentage={1} icon={FileCheck} />
        <MetricCard title="Perio % of Adults" value="32%" trend="up" trendPercentage={3} icon={Target} />
        <MetricCard title="X-Ray Retake Rate" value="1.2%" trend="down" trendPercentage={15} icon={AlertTriangle} />
        <MetricCard title="Unscheduled Tx Value" value="$1.2M" trend="stable" trendPercentage={0} icon={Shield} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <LiveChart title="Compliance Flow" data={complianceData} color="#9333ea" />
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-3 fluid-surface rounded-[2rem] p-8">
          <h3 className="text-2xl font-light text-gray-200 mb-6">Treatment Acceptance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="20%" outerRadius="80%" data={acceptanceData} startAngle={180} endAngle={0} barSize={16}>
                <RadialBar minAngle={15} background clockWise dataKey="value" />
                <Legend 
                  iconSize={10} 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right" 
                  wrapperStyle={{fontSize: '12px', color: '#a1a1aa'}}
                />
                <Tooltip 
                  cursor={false}
                  contentStyle={{
                    background: 'rgba(0,0,0,0.5)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '16px',
                    color: 'white'
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}