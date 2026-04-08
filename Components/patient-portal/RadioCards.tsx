"use client";

interface RadioCardsOption {
  value: string;
  label: string;
  icon?: string;
}

interface RadioCardsProps {
  options: RadioCardsOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  columns?: number;
}

export default function RadioCards({
  options,
  value,
  onChange,
  label,
  columns = 2,
}: RadioCardsProps) {
  return (
    <div>
      {label && (
        <p className="text-gray-200 text-sm mb-3 font-light">{label}</p>
      )}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                p-3 rounded-xl text-left text-sm transition-all border
                ${
                  selected
                    ? "bg-violet-600/20 border-violet-500/60 text-white"
                    : "bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200"
                }
              `}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
