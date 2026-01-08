"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, Calendar, Clock, TrendingUp, Building, Activity, CalendarDays
} from "lucide-react";

import MetricCard from "../Components/dashboard/MetricCard";
import LiveChart from "../Components/dashboard/LiveChart";
import CalendarWidget from "../Components/dashboard/CalendarWidget";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

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

export default function Dashboard() {
  const [busiestHoursData, setBusiestHoursData] = useState([
    { name: '15:00', value: 160 }, { name: '08:00', value: 158 }, { name: '09:00', value: 128 },
    { name: '14:00', value: 123 }, { name: '16:00', value: 101 },
  ]);
  
  const [appointmentYearsData, setAppointmentYearsData] = useState([
    { name: '1999', value: 1000 },
  ]);

  const [metrics, setMetrics] = useState({
    totalPatients: '0',
    totalAppointments: '0',
    uniquePatients: '0',
    servicesOffered: '0',
    locations: '0',
    averageAppointmentsPerPatient: '0',
    mostPopularService: 'Loading...',
    appointmentYears: [],
    busiestHours: [],
    todaySchedule: [],
    dateRange: { earliest: 'Unknown', latest: 'Unknown' }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      console.log('🔄 Fetching dashboard data...');
      const response = await fetch('/api/dashboard/metrics');
      const result = await response.json();
      console.log('📊 Dashboard API response:', result);

      if (result.success && result.metrics) {
        const data = result.metrics;
        console.log('✅ Processing metrics data:', data);
        
        const newMetrics = {
          totalPatients: data.totalPatients.toLocaleString(),
          totalAppointments: data.totalAppointments.toLocaleString(),
          uniquePatients: data.uniquePatients.toLocaleString(),
          servicesOffered: data.servicesOffered.toString(),
          locations: data.locations.toString(),
          averageAppointmentsPerPatient: data.averageAppointmentsPerPatient.toString(),
          mostPopularService: data.mostPopularService,
          appointmentYears: data.appointmentYears,
          busiestHours: data.busiestHours,
          todaySchedule: data.todaySchedule,
          dateRange: data.dateRange
        };
        
        console.log('🎯 Setting new metrics:', newMetrics);
        setMetrics(newMetrics);

        // Update chart data
        if (data.busiestHours && data.busiestHours.length > 0) {
          setBusiestHoursData(data.busiestHours.slice(0, 5).map(item => ({
            name: item.hour,
            value: item.count
          })));
        }
        
        if (data.appointmentYears && data.appointmentYears.length > 0) {
          setAppointmentYearsData(data.appointmentYears.map(yearData => ({
            name: yearData.year,
            value: yearData.count
          })));
        }
      }
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-4xl font-extralight text-white tracking-wide">Dashboard</h1>
        <p className="text-base text-gray-400 font-light">Your clinic's vitals at a glance</p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard 
          title="Total Patients" 
          value={metrics.totalPatients} 
          trend="up" 
          trendPercentage={12} 
          icon={Users} 
        />
        <MetricCard 
          title="Total Appointments" 
          value={metrics.totalAppointments} 
          trend="up" 
          trendPercentage={8} 
          icon={Calendar} 
        />
        <MetricCard 
          title="Services Offered" 
          value={metrics.servicesOffered} 
          trend="stable" 
          trendPercentage={0} 
          icon={Activity} 
        />
        <MetricCard 
          title="Practice Locations" 
          value={metrics.locations} 
          trend="stable" 
          trendPercentage={0} 
          icon={Building} 
        />
      </motion.div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
            <motion.div variants={itemVariants}>
                <LiveChart 
                    title="Busiest Hours" 
                    data={busiestHoursData} 
                    type="bar" 
                    color="#9333ea" 
                />
            </motion.div>
            <motion.div variants={itemVariants}>
                <LiveChart 
                    title="Appointments by Year" 
                    data={appointmentYearsData} 
                    type="area" 
                    color="#3b82f6" 
                />
            </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
            <motion.div variants={itemVariants}>
                <CalendarWidget todaySchedule={metrics.todaySchedule || []} />
            </motion.div>
            <motion.div variants={itemVariants}>
                <MetricCard 
                    title="Unique Patients" 
                    value={metrics.uniquePatients} 
                    trend="up" 
                    trendPercentage={15} 
                    icon={Users} 
                />
            </motion.div>
            <motion.div variants={itemVariants}>
                <MetricCard 
                    title="Avg Appts per Patient" 
                    value={metrics.averageAppointmentsPerPatient} 
                    trend="stable" 
                    trendPercentage={0} 
                    icon={TrendingUp} 
                />
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
}