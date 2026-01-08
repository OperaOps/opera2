import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function OpportunityWidget({ opportunity, icon: Icon }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const priorityColors = {
    high: "bg-red-500/10 text-red-300 border-red-500/20",
    medium: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    low: "bg-blue-500/10 text-blue-300 border-blue-500/20"
  };

  const categoryIcons = {
    Marketing: "📢",
    Financial: "💳",
    Operations: "⚙️",
    "Patient Experience": "❤️"
  };

  return (
    <>
      <motion.div
        onClick={() => setIsExpanded(true)}
        className="group fluid-surface rounded-[2rem] p-6 h-full flex flex-col cursor-pointer"
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
        layoutId={`opportunity-card-${opportunity.title}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-black/20 rounded-xl">
              <Icon className="w-6 h-6 text-purple-300" />
            </div>
            <div className="text-2xl">{categoryIcons[opportunity.category]}</div>
          </div>
          <div className={`px-2.5 py-1 text-[10px] font-medium rounded-full border ${priorityColors[opportunity.priority]}`}>
            {opportunity.priority.toUpperCase()} PRIORITY
          </div>
        </div>
        
        <h3 className="text-lg font-light text-white flex-grow mb-3">{opportunity.title}</h3>

        <p className="text-gray-400 text-xs mb-4 flex-grow">{opportunity.description}</p>
        
        <div className="flex items-center justify-between text-xs text-purple-400/80 group-hover:text-purple-300 transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`opportunity-card-${opportunity.title}`}
              className="fluid-surface rounded-[2.5rem] p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-black/20 rounded-xl">
                    <Icon className="w-7 h-7 text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-light text-white">{opportunity.title}</h2>
                    <p className={`text-sm font-medium capitalize ${priorityColors[opportunity.priority]}`}>
                      {opportunity.priority} Priority {opportunity.category} Opportunity
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsExpanded(false)} className="text-gray-500 hover:text-white text-2xl">&times;</button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-purple-300 mb-1 text-sm">🧠 AI Insight</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{opportunity.insight}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-300 mb-1 text-sm">📋 Action Plan</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">{opportunity.action_plan}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <h3 className="font-semibold text-green-300 mb-1 text-sm">📈 Projected Impact</h3>
                        <p className="text-xl font-light text-white">{opportunity.projected_impact}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-yellow-300 mb-1 text-sm">📊 Success Metrics</h3>
                        <p className="text-gray-300 text-sm">{opportunity.success_metrics.join(', ')}</p>
                    </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    onClick={() => { setIsActivated(true); setIsExpanded(false); }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition-all duration-300 rounded-xl py-3 text-base"
                    disabled={isActivated}
                  >
                    {isActivated ? <><CheckCircle className="w-5 h-5 mr-2" /> Activated</> : <><Play className="w-5 h-5 mr-2" /> Activate Idea</>}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}