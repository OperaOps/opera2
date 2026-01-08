"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function MetricCard({ title, value, trend, trendPercentage, icon: Icon }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="fluid-surface rounded-[1.5rem] p-5 group cursor-pointer overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-1">
            <h3 className="text-sm font-light text-gray-400 tracking-wide">{title}</h3>
            <p className="text-2xl font-light text-white">{value}</p>
          </div>
          <div className="p-2.5 fluid-surface rounded-lg">
            <Icon className="w-5 h-5 text-purple-300" />
          </div>
        </div>
        
        <div className={`flex items-center space-x-1.5 text-xs ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="font-light">
            {trendPercentage ? `${Math.abs(trendPercentage)}% ${trend === 'up' ? 'increase' : 'decrease'}` : 'No change'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}