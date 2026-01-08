"use client"

import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import MetricCard from "../Components/dashboard/MetricCard";
import { DollarSign, FileText, TrendingDown, Percent, Calendar } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const arAgingData = [
  { name: '0-30d', value: 120500 }, { name: '31-60d', value: 45200 }, 
  { name: '61-90d', value: 18900 }, { name: '91-120d', value: 7600 }, { name: '>120d', value: 3100 }
];

const payerMixData = [
  { name: 'Delta Dental', value: 45 }, { name: 'Cigna', value: 25 }, 
  { name: 'Self-Pay', value: 15 }, { name: 'Other', value: 15 }
];

const COLORS = ['#9333ea', '#3b82f6', '#10b981', '#f59e0b'];

export default function FinancialOps() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-4xl font-extralight text-white tracking-wide">Financial Operations</h1>
        <p className="text-base text-gray-400 font-light">Revenue cycle management and financial health</p>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Collections" value="$195,450" trend="up" trendPercentage={6.8} icon={DollarSign} />
        <MetricCard title="Adjusted Production" value="$218,580" trend="up" trendPercentage={7.5} icon={FileText} />
        <MetricCard title="Days in AR" value="28 days" trend="down" trendPercentage={10} icon={Calendar} />
        <MetricCard title="Clean Claim Rate" value="96.8%" trend="up" trendPercentage={2.1} icon={Percent} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-4 fluid-surface rounded-[2rem] p-8">
          <h3 className="text-2xl font-light text-gray-200 mb-6">AR Aging Flow</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arAgingData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }}/>
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(val) => `$${(val/1000)}k`}/>
                <Tooltip 
                  cursor={{fill: 'rgba(147, 51, 234, 0.1)'}} 
                  contentStyle={{
                    background: 'rgba(255,255,255,0.1)', 
                    backdropFilter: 'blur(20px)',
                    border: 'none', 
                    borderRadius: '16px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-3 fluid-surface rounded-[2rem] p-8">
          <h3 className="text-2xl font-light text-gray-200 mb-6">Payer Mix</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={payerMixData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={50} 
                  outerRadius={90} 
                  paddingAngle={5}
                >
                  {payerMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(255,255,255,0.1)', 
                    backdropFilter: 'blur(20px)',
                    border: 'none', 
                    borderRadius: '16px',
                    color: 'white'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}