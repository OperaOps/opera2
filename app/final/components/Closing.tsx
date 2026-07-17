"use client";

/** One line of footer, on white. The ask lives on the Mayo plate above. */
export default function Closing() {
  return (
    <footer className="border-t border-[#1a1a17]/10 bg-white">
      <div className="mx-auto flex max-w-[1560px] items-center justify-between px-6 py-7 md:px-10">
        <span className="cf-display text-[18px] text-[#1a1a17]">
          Opera<span className="text-[#5f7a61]">AI</span>
        </span>
        <span className="cf-body text-[14.5px] text-[#5e6a60]">OperaAI Inc. · 2026</span>
      </div>
    </footer>
  );
}
