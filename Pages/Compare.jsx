
"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Building,
  Award,
  RefreshCw,
  Loader2
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function Compare() {
  const [comparisonType, setComparisonType] = useState('regional');
  const [isLoading, setIsLoading] = useState(true);
  
  // Static data for demonstration
  const comparisonData = {
    clinic_stats: { revenue: 125000, patients: 342, case_acceptance: 68, avg_case_value: 4800, patient_satisfaction: 92, referral_rate: 15 },
    comparison_stats: { revenue: 98000, patients: 285, case_acceptance: 62, avg_case_value: 4200, patient_satisfaction: 87, referral_rate: 12 },
    ranking: { percentile: 75, position: "Top 25%" },
    insights: ["Your clinic outperforms 75% of regional competitors", "Case acceptance rate is 6% above average", "Revenue per patient is significantly higher"]
  };

  useEffect(() => {
    loadComparisonData();
  }, [comparisonType]);

  const loadComparisonData = () => {
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 500);
  };

  const prepareChartData = () => [
    { metric: 'Revenue', clinic: comparisonData.clinic_stats.revenue, comparison: comparisonData.comparison_stats.revenue },
    { metric: 'Patients', clinic: comparisonData.clinic_stats.patients, comparison: comparisonData.comparison_stats.patients },
    { metric: 'Case Accept', clinic: comparisonData.clinic_stats.case_acceptance, comparison: comparisonData.comparison_stats.case_acceptance },
    { metric: 'Avg Case', clinic: comparisonData.clinic_stats.avg_case_value, comparison: comparisonData.comparison_stats.avg_case_value },
  ];

  const prepareRadarData = () => [
    { subject: 'Revenue', clinic: 85, comparison: 65, fullMark: 100 },
    { subject: 'Patients', clinic: 78, comparison: 70, fullMark: 100 },
    { subject: 'Case Rate', clinic: 68, comparison: 62, fullMark: 100 },
    { subject: 'Satisfaction', clinic: 92, comparison: 87, fullMark: 100 },
    { subject: 'Referrals', clinic: 75, comparison: 60, fullMark: 100 }
  ];

  const MetricComparison = ({ title, value, comparisonValue, unit = '', isHigherBetter = true }) => {
    const difference = value - comparisonValue;
    const percentDiff = comparisonValue !== 0 ? ((difference / comparisonValue) * 100).toFixed(1) : 0;
    const isPositive = isHigherBetter ? difference > 0 : difference < 0;

    return (
      <div className="fluid-surface rounded-[1.5rem] p-6">
        <h3 className="text-base font-light text-gray-400 mb-2">{title}</h3>
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-2xl font-light text-white">{unit}{value.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Your Clinic</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-light text-gray-300">{unit}{comparisonValue.toLocaleString()}</p>
            <p className="text-xs text-gray-500">{comparisonType === 'regional' ? 'Regional Avg' : 'National Avg'}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(percentDiff)}% {isPositive ? 'above' : 'below'} average</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-extralight text-white tracking-wide">Benchmark</h1>
          <p className="text-base text-gray-400 font-light">
            Compare your clinic against regional and national averages
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-black/20 rounded-xl p-1">
            <button
              onClick={() => setComparisonType('regional')}
              className={`px-4 py-1.5 rounded-lg text-sm transition-all duration-300 flex items-center space-x-2 ${
                comparisonType === 'regional' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Regional</span>
            </button>
            <button
              onClick={() => setComparisonType('national')}
              className={`px-4 py-1.5 rounded-lg text-sm transition-all duration-300 flex items-center space-x-2 ${
                comparisonType === 'national' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>National</span>
            </button>
          </div>
          <button onClick={loadComparisonData} className="fluid-surface rounded-xl p-2 hover:bg-white/10 transition-all duration-300">
            <RefreshCw className={`w-5 h-5 text-purple-400 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-20"><Loader2 className="w-8 h-8 mx-auto animate-spin text-purple-400" /></div>
      ) : (
        <>
          <motion.div variants={itemVariants} className="fluid-surface rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-gray-200">Performance Ranking</h2>
              <div className="flex items-center space-x-4">
                <Award className="w-7 h-7 text-yellow-400" />
                <div>
                  <p className="text-xl font-light text-white">{comparisonData.ranking.position}</p>
                  <p className="text-sm text-gray-400">{comparisonData.ranking.percentile}th Percentile</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisonData.insights.map((insight, index) => (
                <div key={index} className="bg-black/20 rounded-xl p-4">
                  <p className="text-gray-300 text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricComparison title="Monthly Revenue" value={comparisonData.clinic_stats.revenue} comparisonValue={comparisonData.comparison_stats.revenue} unit="$" />
            <MetricComparison title="Active Patients" value={comparisonData.clinic_stats.patients} comparisonValue={comparisonData.comparison_stats.patients} />
            <MetricComparison title="Case Acceptance" value={comparisonData.clinic_stats.case_acceptance} comparisonValue={comparisonData.comparison_stats.case_acceptance} unit="%" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-4 fluid-surface rounded-[2rem] p-8">
              <h3 className="text-2xl font-light text-gray-200 mb-6">Performance Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={prepareChartData()} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }}/>
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }}/>
                    <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '16px', color: 'white' }} />
                    <Bar dataKey="clinic" fill="#9333ea" name="Your Clinic" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="comparison" fill="#6b7280" name="Average" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="lg:col-span-3 fluid-surface rounded-[2rem] p-8">
              <h3 className="text-2xl font-light text-gray-200 mb-6">Performance Radar</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={prepareRadarData()}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                    <Radar name="Your Clinic" dataKey="clinic" stroke="#9333ea" fill="#9333ea" fillOpacity={0.4} strokeWidth={2} />
                    <Radar name="Average" dataKey="comparison" stroke="#6b7280" fill="#6b7280" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}
