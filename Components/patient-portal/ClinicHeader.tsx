"use client";

import { motion } from "framer-motion";

interface ClinicHeaderProps {
  clinicName: string;
  clinicAddress: string;
  patientFirstName?: string;
}

export default function ClinicHeader({
  clinicName,
  clinicAddress,
  patientFirstName,
}: ClinicHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h1 className="text-2xl md:text-3xl font-extralight text-white tracking-wide">
        {clinicName}
      </h1>
      <p className="text-sm text-gray-500 mt-1">{clinicAddress}</p>
      <div className="w-16 h-px bg-gray-700 mx-auto my-4" />
      {patientFirstName && (
        <p className="text-gray-300 font-light">
          Hi {patientFirstName}, here&apos;s your personalized treatment
          information
        </p>
      )}
    </motion.div>
  );
}
