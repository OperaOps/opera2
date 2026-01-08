"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "../Entities/User";
import {
  TrendingUp, DollarSign, Users, Heart, Zap, Sparkles, Lightbulb, RefreshCw, Calendar } from
"lucide-react";
import OpportunityWidget from "../Components/opportunities/OpportunityWidget.jsx";
import OpportunityMetrics from "../Components/opportunities/OpportunityMetrics.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};


export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    // In a real app, you'd fetch this data. Here we use defaults.
    setOpportunities(defaultOpportunities);
    setMetrics(calculateMetrics());
    setIsLoading(false);
  };

  const calculateMetrics = () => ({
    unscheduledTx: 1200000,
    sameDayDentistry: 45,
    activeHygieneGrowth: 8,
    newPatientConversion: 65
  });

  const defaultOpportunities = [
    { title: "Mine Unscheduled Treatment Plans", priority: "high", category: "Financial", icon: "DollarSign", insight: "Over $1M in unscheduled treatment represents the single biggest revenue opportunity.", description: "Systematically contact patients with outstanding treatment plans, starting with high-value procedures like crowns and implants.", action_plan: "1. Generate a list of unscheduled tx >$1000. 2. Assign team members to call patients. 3. Offer a small incentive for booking within 2 weeks.", projected_impact: "+$50,000/month", success_metrics: ["Unscheduled Tx Scheduled ($)", "Contact-to-Schedule Rate"] },
    { title: "Launch a Hygiene Reactivation Campaign", priority: "high", category: "Patient Experience", icon: "Users", insight: "Reactivating dormant hygiene patients boosts production and prevents patient churn.", description: "Target patients who are overdue for their 6-month recall with a multi-touch email and text campaign.", action_plan: "1. Identify patients 7-18 months overdue. 2. Create a 'We Miss You!' campaign. 3. Simplify online booking for recall appointments.", projected_impact: "+40 hygiene appts/month", success_metrics: ["Reactivated Patients", "Hygiene Production"] },
    { title: "Optimize Same-Day Dentistry", priority: "medium", category: "Operations", icon: "Zap", insight: "Increasing same-day treatment improves efficiency and case acceptance.", description: "Offer and incentivize patients to begin treatment immediately after diagnosis, especially for single-visit procedures.", action_plan: "1. Block flexible 'same-day' slots in the schedule. 2. Offer a 5% courtesy for same-day commitment. 3. Prepare common treatment kits in advance.", projected_impact: "+10% Same-Day Tx", success_metrics: ["Same-Day Acceptance %", "Production per Visit"] },
    { title: "Introduce In-House Membership Plan", priority: "medium", category: "Financial", icon: "Heart", insight: "A membership plan captures the uninsured patient market and creates recurring revenue.", description: "Create a simple annual plan covering preventative care (2 cleanings, exams, x-rays) and a discount on other treatments.", action_plan: "1. Define plan pricing and benefits. 2. Market the plan on your website and in-office. 3. Train the front office to offer it to all self-pay patients.", projected_impact: "+$12,000/month recurring", success_metrics: ["Members Enrolled", "Self-Pay Production"] },
    { title: "Analyze Family Member Gaps", priority: "low", category: "Marketing", icon: "Users", insight: "Often, only one member of a family is an active patient, representing a referral opportunity.", description: "Identify active patients whose family members are not patients at your clinic and send a targeted family offer.", action_plan: "1. Cross-reference addresses/last names in your PMS. 2. Create a 'Family & Friends' promotion. 3. Mention the offer during patient check-out.", projected_impact: "+15 new patients/month", success_metrics: ["Internal Referrals", "New Patients from Existing Families"] },
    { title: "Boost Online Reviews for High-Value Services", priority: "low", category: "Marketing", icon: "TrendingUp", insight: "Targeted reviews for services like implants or cosmetic dentistry attract higher-value new patients.", description: "Automate review requests specifically to patients who have just completed significant cosmetic or restorative cases.", action_plan: "1. Create separate review request templates for different procedures. 2. Send the request via text/email post-op. 3. Feature these specific reviews on service pages.", projected_impact: "+0.2 Star Rating", success_metrics: ["Avg. Google Rating", "Leads from Cosmetic Services"] }
  ];


  const iconMap = { TrendingUp, DollarSign, Users, Heart, Zap };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-extralight text-white tracking-wide">Growth Opportunities</h1>
          <p className="text-base text-gray-400 font-light">
            AI-powered insights to enhance your dental practice
          </p>
        </div>
        <button onClick={loadData} className="fluid-surface rounded-xl p-2 hover:bg-white/10 transition-all duration-300">
          <RefreshCw className={`w-5 h-5 text-purple-400 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <OpportunityMetrics 
          metrics={metrics}
          isLoading={isLoading} 
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-light text-gray-200">Targeted Initiatives</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Ranked by clinic impact</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ?
          [...Array(6)].map((_, i) =>
          <div key={i} className="fluid-surface rounded-[2rem] p-6 h-64 animate-pulse"><div className="h-full bg-white/5 rounded-xl"></div></div>
          ) :

          opportunities.map((opp, index) =>
          <OpportunityWidget
            key={index}
            opportunity={opp}
            icon={iconMap[opp.icon] || Lightbulb} />

          )
          }
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="fluid-surface rounded-[2rem] p-8">
        <h3 className="text-2xl font-light text-gray-200 mb-6">Initiatives Tracker</h3>
        <div className="text-center py-10">
          <Calendar className="w-12 h-12 mx-auto text-gray-600 mb-4" />
          <p className="text-gray-500 text-base">
            Once you activate ideas, their performance will be tracked here.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            The AI learns from your results to improve future recommendations.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}