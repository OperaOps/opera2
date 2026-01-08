"use client"

import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label, title }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/90 backdrop-blur-sm p-3 rounded-lg border border-gray-700">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className="text-base font-light text-purple-300">
          {title === 'Busiest Hours' 
            ? `${payload[0].value} appointments`
            : `$${payload[0].value.toLocaleString()}`
          }
        </p>
      </div>
    );
  }
  return null;
};

export default function LiveChart({ title, data, type = 'area', color = '#9333ea' }) {
  const renderChart = () => {
    if (type === 'bar') {
      return (
        <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 300 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 300 }} 
            tickFormatter={(value) => `${value}`} 
          />
          <Tooltip 
            content={<CustomTooltip title={title} />} 
            cursor={{ 
              stroke: 'rgba(147, 51, 234, 0.2)', 
              strokeWidth: 1, 
              strokeDasharray: '3 3'
            }} 
          />
          <Bar
            dataKey="value"
            fill={color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      );
    } else {
      return (
        <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id={`colorGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.6}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 300 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 300 }} 
            tickFormatter={(value) => `$${(value / 1000)}k`} 
          />
          <Tooltip 
            content={<CustomTooltip title={title} />} 
            cursor={{ 
              stroke: 'rgba(147, 51, 234, 0.2)', 
              strokeWidth: 1, 
              strokeDasharray: '3 3'
            }} 
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#colorGradient-${color})`}
          />
        </AreaChart>
      );
    }
  };

  return (
    <div className="fluid-surface rounded-[2rem] p-6 h-full flex flex-col">
      <h3 className="text-xl font-light text-gray-200 mb-4 tracking-wide">{title}</h3>
      <div className="flex-grow h-72">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}