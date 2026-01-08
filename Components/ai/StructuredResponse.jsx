"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Zap, TrendingUp, Lightbulb, Database } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const Step = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const SourceChip = ({ source }) => {
    const statusColors = {
        active: 'bg-green-500/20 text-green-300',
        synced: 'bg-blue-500/20 text-blue-300',
        live: 'bg-purple-500/20 text-purple-300',
        monitored: 'bg-yellow-500/20 text-yellow-300',
        current: 'bg-cyan-500/20 text-cyan-300',
        crm: 'bg-pink-500/20 text-pink-300',
        financial: 'bg-indigo-500/20 text-indigo-300',
        analytics: 'bg-orange-500/20 text-orange-300',
        tracking: 'bg-teal-500/20 text-teal-300',
        processor: 'bg-rose-500/20 text-rose-300',
        accounting: 'bg-lime-500/20 text-lime-300',
        scheduling: 'bg-sky-500/20 text-sky-300',
    };
    return (
        <div className={`flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs ${statusColors[source.status] || 'bg-gray-500/20 text-gray-300'}`}>
            <Database className="w-3 h-3" />
            <span>{source.name}</span>
        </div>
    )
};


const AnalysisWidget = ({ widget, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
        className="bg-black/20 p-3 rounded-xl border border-white/5"
    >
        <h4 className="text-purple-300 font-medium text-xs mb-1">{widget.title}</h4>
        <p className="text-gray-400 text-xs mb-2">{widget.description}</p>
        <div className="flex items-center space-x-3">
            {widget.metrics.map(metric => (
                <div key={metric.label} className="text-xs">
                    <span className="text-gray-500">{metric.label}: </span>
                    <span className="text-white font-semibold">{metric.value}</span>
                </div>
            ))}
        </div>
    </motion.div>
);

const InsightsCard = ({ insights }) => (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-4 rounded-xl border border-purple-500/20">
         <h4 className="text-purple-300 font-medium text-sm mb-2 flex items-center"><Lightbulb className="w-4 h-4 mr-2" /> {insights.title}</h4>
         <p className="text-gray-300 text-xs mb-4">{insights.content}</p>
         <div className="grid grid-cols-2 gap-4 mb-4">
             {insights.highlights.map(h => (
                 <div key={h.label} className="bg-black/20 p-2 rounded-lg">
                     <p className="text-gray-400 text-[10px]">{h.label}</p>
                     <p className="text-white text-sm font-medium">{h.value} <span className="text-green-400 text-xs">{h.change}</span></p>
                 </div>
             ))}
         </div>
         <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={insights.chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <XAxis dataKey="name" hide />
                    <Tooltip 
                        cursor={{ fill: 'rgba(147, 51, 234, 0.1)' }}
                        contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '12px' }}
                    />
                    <Bar dataKey="value" fill="rgba(147, 51, 234, 0.6)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
         </div>
    </div>
);

export default function StructuredResponse({ response }) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (response.type !== 'structured') return;
        
        const timers = [
            setTimeout(() => setCurrentStep(1), 0), // Quick Answer
            setTimeout(() => setCurrentStep(2), 800), // Data Lookup
            setTimeout(() => setCurrentStep(3), 1600), // Analysis
            setTimeout(() => setCurrentStep(4), 2400)  // Insights
        ];

        return () => timers.forEach(clearTimeout);
    }, [response]);

    if (response.type === 'simple') {
        return <p className="text-white text-sm font-light">{response.message}</p>;
    }
    if (response.type === 'error') {
        return <p className="text-red-400 text-sm font-light">{response.message}</p>;
    }
    if (response.type === 'help') {
        return (
            <div className="space-y-3">
                <h3 className="text-base font-medium text-white">Here are some things you can ask:</h3>
                {response.commands.map(cmd => (
                    <div key={cmd.query} className="bg-black/20 p-3 rounded-lg">
                        <p className="text-purple-300 text-sm font-medium">"{cmd.query}"</p>
                        <p className="text-gray-400 text-xs">{cmd.description}</p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {currentStep >= 1 && (
                    <Step key="quickAnswer">
                        <div className="flex items-center space-x-2 text-green-300">
                           <CheckCircle className="w-4 h-4" />
                           <p className="text-sm font-medium">{response.quickAnswer}</p>
                        </div>
                    </Step>
                )}

                {currentStep >= 2 && (
                    <Step key="dataLookup" delay={0.1}>
                        <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                            <h4 className="text-blue-300 font-medium text-xs mb-2">{response.dataLookup.title}</h4>
                            <div className="flex flex-wrap gap-2">
                                {response.dataLookup.sources.map((source, i) => <SourceChip key={i} source={source}/>)}
                            </div>
                        </div>
                    </Step>
                )}
                
                {currentStep >= 3 && (
                     <Step key="analysis" delay={0.1}>
                        <div className="space-y-2">
                           {response.analysis.widgets.map((widget, index) => (
                               <AnalysisWidget key={index} widget={widget} index={index}/>
                           ))}
                        </div>
                    </Step>
                )}

                {currentStep >= 4 && (
                     <Step key="insights" delay={0.1}>
                       <InsightsCard insights={response.insights} />
                    </Step>
                )}

            </AnimatePresence>
        </div>
    );
}