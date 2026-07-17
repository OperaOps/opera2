"use client";

import { CALENDLY_URL } from "@/lib/concepts/shared";

/** Full footer on white: wordmark and tagline left, links right, rule, rights line. */
export default function Closing() {
  return (
    <footer className="border-t border-[#1a1a17]/10 bg-white">
      <div className="mx-auto max-w-[1560px] px-6 pb-10 pt-16 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* wordmark + tagline */}
          <div>
            <span className="cf-display text-[26px] leading-none tracking-[-0.01em] text-[#1a1a17]">
              Opera<span className="text-[#5f7a61]">AI</span>
            </span>
            <p className="cf-body mt-4 max-w-sm text-[15.5px] leading-relaxed text-[#5e6a60]">
              The future of patient education.
            </p>
          </div>

          {/* links */}
          <div className="flex flex-col gap-4 md:items-end">
            <a
              href="#product"
              className="cf-body text-[15.5px] font-medium text-[#1a1a17]/75 transition-colors hover:text-[#1a1a17]"
            >
              Product
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cf-body text-[15.5px] font-medium text-[#1a1a17]/75 transition-colors hover:text-[#1a1a17]"
            >
              Demo
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-[#1a1a17]/10 pt-6">
          <p className="cf-body text-[14px] text-[#5e6a60]">
            © 2026 OperaAI Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
