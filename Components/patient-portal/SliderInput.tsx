"use client";

interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  label?: string;
}

export default function SliderInput({
  value,
  onChange,
  min = 1,
  max = 10,
  minLabel = "Not likely",
  maxLabel = "Definitely will",
  label,
}: SliderInputProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      {label && (
        <p className="text-gray-200 text-sm mb-3 font-light">{label}</p>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-violet-500
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-violet-500/30
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-violet-300
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-violet-500
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-violet-300
            [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${percentage}%, #374151 ${percentage}%, #374151 100%)`,
          }}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">{minLabel}</span>
          <span className="text-lg font-semibold text-violet-400">{value}</span>
          <span className="text-xs text-gray-500">{maxLabel}</span>
        </div>
      </div>
    </div>
  );
}
