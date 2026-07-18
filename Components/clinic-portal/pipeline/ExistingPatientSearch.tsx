"use client";

import { useState, useEffect, useRef } from "react";

interface PatientResult {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  phone: string | null;
  treatment_type: string | null;
  consulting_provider: string | null;
  consultation_date: string | null;
  access_code?: string;
}

interface ExistingPatientSearchProps {
  onSelect: (patient: PatientResult) => void;
}

export default function ExistingPatientSearch({ onSelect }: ExistingPatientSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PatientResult[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/clinic/patients?search=${encodeURIComponent(query)}&limit=8`
        );
        const data = await res.json();
        setResults(data.patients || []);
        setOpen(true);
      } catch {
        setResults([]);
      }
    }, 300);
  }, [query]);

  function handleSelect(patient: PatientResult) {
    setQuery("");
    setOpen(false);
    // Fetch full patient details (including access_code)
    fetch(`/api/clinic/patients/${patient.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.patient) onSelect(data.patient);
      });
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500 shrink-0">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setOpen(true)}
          placeholder="Search existing patients..."
          className="w-full rounded-lg bg-gray-900/80 border border-gray-700 text-white text-sm p-2.5
            focus:border-[#5f7a61] outline-none placeholder:text-gray-600"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-gray-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors text-left"
            >
              <div>
                <p className="text-sm text-white">
                  {p.first_name} {p.last_name}
                </p>
                <p className="text-xs text-gray-500">{p.email}</p>
              </div>
              <span className="text-xs text-gray-600 capitalize">
                {p.treatment_type?.replace(/_/g, " ") || ""}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && query && results.length === 0 && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-gray-950 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-500 text-center">No patients found</p>
        </div>
      )}
    </div>
  );
}
