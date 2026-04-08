"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";

interface AccessCodeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AccessCodeInput({
  value,
  onChange,
}: AccessCodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");

  function handleChange(index: number, digit: string) {
    if (!/^\d?$/.test(digit)) return;
    const newDigits = [...digits];
    newDigits[index] = digit;
    onChange(newDigits.join("").trim());

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  }

  return (
    <div className="flex gap-3 justify-center">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          className="w-12 h-14 text-center text-2xl font-semibold rounded-xl
            bg-gray-900/80 border border-gray-700 text-white
            focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50
            outline-none transition-all"
        />
      ))}
    </div>
  );
}
