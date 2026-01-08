"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, User, Loader2 } from "lucide-react";

const mockAppointments = [
  { time: '9:00 AM', patient: 'Liam Johnson', type: 'prophy' },
  { time: '10:00 AM', patient: 'Noah Williams', type: 'crown_prep' },
  { time: '11:00 AM', patient: 'Emma Brown', type: 'emergency' },
  { time: '1:00 PM', patient: 'James Garcia', type: 'implant_consult' },
  { time: '2:00 PM', patient: 'Sophia Miller', type: 'fillings' }
];

const typeColors = {
  prophy: 'bg-blue-500/80',
  crown_prep: 'bg-purple-500/80',
  fillings: 'bg-green-500/80',
  emergency: 'bg-red-500/80',
  implant_consult: 'bg-yellow-500/80',
  default: 'bg-gray-500/80'
};

export default function CalendarWidget({ todaySchedule = [] }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const todayString = 'Friday, July 2, 1999'; // From the actual data

  useEffect(() => {
    console.log('📅 CalendarWidget received todaySchedule:', todaySchedule);
    if (todaySchedule && todaySchedule.length > 0) {
      const formattedAppointments = todaySchedule.map((apt, index) => ({
        time: apt.time,
        patient: apt.patient,
        type: 'appointment',
        id: index
      }));
      console.log('📅 Formatted appointments:', formattedAppointments);
      setAppointments(formattedAppointments);
      setLoading(false);
    } else {
      console.log('📅 No appointments data available');
      setAppointments([]);
      setLoading(false);
    }
  }, [todaySchedule]);

  return (
    <motion.div 
      className="fluid-surface rounded-[2rem] p-6 h-full"
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-6 h-6 text-purple-300" />
          <h3 className="text-xl font-light text-white">Today's Schedule</h3>
        </div>
        <div className="text-sm text-gray-400">{todayString}</div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-6 h-6 text-purple-300 animate-spin" />
          <span className="ml-2 text-gray-400">Loading appointments...</span>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {appointments.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No appointments scheduled for today</p>
            </div>
          ) : (
            appointments.map((appt) => (
              <div key={appt.id} className="flex items-center space-x-4 p-3 rounded-xl bg-black/20">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <div className={`w-2 h-8 rounded-full ${typeColors[appt.type] || typeColors.default}`}></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{appt.patient}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{appt.time}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full text-white capitalize ${typeColors[appt.type] || typeColors.default}`}>
                  {appt.type.replace('_', ' ')}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-sm">Error: {error}</p>
          <p className="text-red-400 text-xs mt-1">Showing fallback data</p>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-sm text-gray-400 text-center">
          {appointments.length} appointment{appointments.length !== 1 ? 's' : ''} scheduled
        </p>
      </div>
    </motion.div>
  );
}