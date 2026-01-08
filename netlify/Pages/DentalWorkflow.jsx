
"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  User,
  Phone,
  X,
  AlertCircle,
  MapPin,
  CalendarDays } from
"lucide-react";
import CinematicSidebar from "../Components/layout/CinematicSidebar.jsx";

const PatientCard = ({ patient, onClick }) =>
<motion.div
  onClick={onClick}
  className="group bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:border-purple-500/40 cursor-pointer transition-all duration-300 mb-2"
  whileHover={{ y: -2, scale: 1.01 }}
  whileTap={{ scale: 0.99 }}>

    <div className="flex items-center justify-between mb-2">
      <h4 className="text-white font-light text-sm">{patient.name}</h4>
      <div className="flex items-center space-x-1">
        {patient.highRisk &&
      <div className="px-1.5 py-0.5 bg-red-500/20 border border-red-500/30 rounded">
            <span className="text-red-300 text-[10px] font-semibold">RISK</span>
          </div>
      }
        {patient.noShow &&
      <div className="px-1.5 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded">
            <span className="text-yellow-300 text-[10px] font-semibold">NO SHOW</span>
          </div>
      }
      </div>
    </div>
    
    <div className="text-xs text-gray-400 space-y-1">
      <div className="flex items-center space-x-1.5">
        <Clock className="w-3 h-3" />
        <span>{patient.time}</span>
      </div>
      <div className="flex items-center space-x-1.5">
        <User className="w-3 h-3" />
        <span>{patient.procedure}</span>
      </div>
      {patient.notes &&
    <div className="text-[11px] text-purple-300 mt-1 p-1.5 bg-purple-600/10 rounded-md border border-purple-500/20">
          {patient.notes}
        </div>
    }
    </div>
  </motion.div>;


const PatientProfile = ({ patient, onClose }) =>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
  onClick={onClose}>

    <motion.div
    initial={{ scale: 0.95, y: 10 }}
    animate={{ scale: 1, y: 0 }}
    exit={{ scale: 0.95, y: 10 }}
    onClick={(e) => e.stopPropagation()}
    className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto">

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-light text-white mb-1">{patient.name}</h2>
          <p className="text-sm text-gray-400">{patient.procedure} • {patient.time}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {patient.highRisk &&
      <div className="flex items-center space-x-1.5 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span className="text-red-300 text-xs">High Risk Patient</span>
          </div>
      }
        {patient.noShow &&
      <div className="flex items-center space-x-1.5 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
            <AlertCircle className="w-3 h-3 text-yellow-400" />
            <span className="text-yellow-300 text-xs">No-Show History</span>
          </div>
      }
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h3 className="text-sm font-light text-white border-b border-white/10 pb-1">Contact Info</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 text-purple-400" />
              <span className="text-gray-300">{patient.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 h-3 text-purple-400" />
              <span className="text-gray-300">{patient.address}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-light text-white border-b border-white/10 pb-1">Medical History</h3>
          <div className="space-y-1 text-xs">
            {patient.medicalHistory.map((item, index) =>
          <p key={index} className="text-gray-300">- {item}</p>
          )}
          </div>
        </div>

        <div className="space-y-3 md:col-span-2">
          <h3 className="text-sm font-light text-white border-b border-white/10 pb-1">Recent Appointments</h3>
          <div className="space-y-2 text-xs">
            {patient.appointmentHistory.map((appointment, index) =>
          <div key={index} className="p-2 bg-white/5 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{appointment.date}</span>
                  <span className="text-purple-300">{appointment.procedure}</span>
                </div>
                <p className="text-gray-400 mt-1">{appointment.notes}</p>
              </div>
          )}
          </div>
        </div>

        <div className="space-y-3 md:col-span-2">
          <h3 className="text-sm font-light text-white border-b border-white/10 pb-1">AI Suggestions</h3>
          <div className="p-3 bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-lg">
            <p className="text-gray-300 text-xs">{patient.suggestions}</p>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>;


export default function DentalWorkflow() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreatmentData();
  }, []);

  const fetchTreatmentData = async () => {
    try {
      const response = await fetch('/api/greyfinch/treatment-workflow');
      const data = await response.json();
      
      if (data.treatmentWorkflow) {
        setProcedures(data.treatmentWorkflow);
      }
    } catch (error) {
      console.error('Error fetching treatment data:', error);
      // Fallback to original data
      setProcedures([
        {
          title: "Orthodontic",
          color: "from-purple-600/20 to-purple-800/10",
          borderColor: "border-purple-500/30",
          patients: [
            { name: "Sarah Johnson", time: "9:00 AM", procedure: "Braces Adjustment", notes: "Monthly adjustment", phone: "(555) 123-4567", address: "123 Main St, City, State", medicalHistory: ["None"], appointmentHistory: [{ date: "2024-01-15", procedure: "Cleaning", notes: "Routine cleaning" }], suggestions: "Patient has history of missed appointments. Confirm 24 hours prior." },
            { name: "Kevin Smith", time: "10:30 AM", procedure: "Retainer Fitting", notes: "New retainer", phone: "(555) 876-5432", address: "21B Baker St, City, State", medicalHistory: ["None"], appointmentHistory: [{ date: "2023-12-10", procedure: "Braces Removal", notes: "Treatment completed" }], suggestions: "Treatment completed successfully. Discuss long-term retention." }
          ]
        },
        {
          title: "Preventive",
          color: "from-cyan-600/20 to-cyan-800/10",
          borderColor: "border-cyan-500/30",
          patients: [
            { name: "Michael Chen", time: "10:00 AM", procedure: "Hygiene Cleaning", notes: "6-month checkup", phone: "(555) 234-5678", address: "456 Oak Ave, City, State", medicalHistory: ["None"], appointmentHistory: [{ date: "2024-01-20", procedure: "Exam", notes: "Cavity detected" }], suggestions: "Very punctual. Good candidate for extended procedures." },
            { name: "Lisa Wang", time: "11:30 AM", procedure: "Fluoride Treatment", notes: "High caries risk", phone: "(555) 345-6789", address: "789 Pine St, City, State", medicalHistory: ["None"], appointmentHistory: [{ date: "2024-01-10", procedure: "Cleaning", notes: "Good oral health" }], suggestions: "High caries risk patient. Reinforce oral hygiene." }
          ]
        },
        {
          title: "Restorative",
          color: "from-blue-600/20 to-blue-800/10",
          borderColor: "border-blue-500/30",
          patients: [
            { name: "Brian O'Connell", time: "1:00 PM", procedure: "Crown Placement", notes: "Upper molar", phone: "(555) 112-2334", address: "88 Lighthouse Rd, City, State", medicalHistory: ["None"], appointmentHistory: [{ date: "2024-02-15", procedure: "Crown Prep", notes: "Crown preparation completed" }], suggestions: "High-value case. Ensure crown is ready." },
            { name: "Emily White", time: "2:30 PM", procedure: "Composite Filling", notes: "Two-surface filling", phone: "(555) 445-5667", address: "101 River Run, City, State", medicalHistory: ["None"], appointmentHistory: [{ date: "2023-10-05", procedure: "Exam", notes: "Cavity detected" }], suggestions: "Standard filling procedure. Good patient compliance." }
          ]
        },
        {
          title: "Emergency",
          color: "from-red-600/20 to-red-800/10",
          borderColor: "border-red-500/30",
          patients: [
            { name: "Robert Davis", time: "2:00 PM", procedure: "Emergency Consultation", notes: "Severe pain", phone: "(555) 456-7890", address: "321 Elm St, City, State", medicalHistory: ["None"], appointmentHistory: [{ date: "2024-01-25", procedure: "Exam", notes: "Routine exam" }], suggestions: "Emergency case. Prioritize pain management." },
            { name: "Karen Miller", time: "3:00 PM", procedure: "Pain Management", notes: "Toothache", phone: "(555) 654-3210", address: "90 School Lane, City, State", medicalHistory: ["None"], appointmentHistory: [{ date: "2024-02-01", procedure: "Cleaning", notes: "Routine cleaning" }], suggestions: "Pain management priority. Assess for root canal." }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <CinematicSidebar />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">

          <h1 className="text-4xl font-extralight text-white tracking-wide">Treatment Workflow</h1>
          <p className="text-base text-gray-400 font-light">Today's patient schedule and treatment procedures</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">

          {procedures.map((procedure, index) =>
          <motion.div
            key={procedure.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`bg-black/20 backdrop-blur-md border ${procedure.borderColor} rounded-xl p-3`}>

              <h3 className="text-base font-light text-white mb-3 border-b border-white/10 pb-2">
                {procedure.title}
              </h3>
              
              <div className="space-y-2 h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {procedure.patients.map((patient, patientIndex) =>
              <PatientCard
                key={patientIndex}
                patient={patient}
                onClick={() => setSelectedPatient(patient)} />

              )}
                {procedure.patients.length === 0 &&
              <div className="text-center py-6 text-gray-600">
                    <CalendarDays className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-xs">No appointments</p>
                  </div>
              }
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPatient &&
        <PatientProfile
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)} />

        }
      </AnimatePresence>
    </div>);

}
