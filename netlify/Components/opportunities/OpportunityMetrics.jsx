import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Heart, Clock, Users, GitPullRequest } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function OpportunityMetrics({ metrics, isLoading }) {
  const metricsData = [
    { title: "Unscheduled Tx Value", value: `$${(metrics.unscheduledTx / 1000000).toFixed(1)}M`, icon: DollarSign, color: "text-green-400" },
    { title: "Same-Day Dentistry %", value: `${metrics.sameDayDentistry}%`, icon: TrendingUp, color: "text-purple-400" },
    { title: "Active Hygiene Growth", value: `${metrics.activeHygieneGrowth}%`, icon: Users, color: "text-blue-400" },
    { title: "New Patient Conversion", value: `${metrics.newPatientConversion}%`, icon: GitPullRequest, color: "text-yellow-400" }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="fluid-surface rounded-[1.5rem] p-6 h-24 animate-pulse"><div className="h-full bg-white/5 rounded-xl"></div></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData.map((metric) => (
        <motion.div key={metric.title} variants={itemVariants} className="fluid-surface rounded-[1.5rem] p-5">
          <div className="flex items-center space-x-4">
            <div className="p-2.5 bg-black/20 rounded-xl">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <div>
              <p className="text-xs text-gray-400">{metric.title}</p>
              <p className="text-2xl font-light text-white">{metric.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}