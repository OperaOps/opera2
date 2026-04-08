"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  label?: string;
}

export default function StarRating({
  value,
  onChange,
  max = 5,
  label,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div>
      {label && (
        <p className="text-gray-200 text-sm mb-2 font-light">{label}</p>
      )}
      <div className="flex gap-1.5">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
          const filled = star <= (hovered || value);
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110 focus:outline-none"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill={filled ? "#8B5CF6" : "none"}
                stroke={filled ? "#8B5CF6" : "#4B5563"}
                strokeWidth="1.5"
                className="transition-colors"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
