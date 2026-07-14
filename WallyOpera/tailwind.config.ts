import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#111110",
          secondary: "#5f5e5a",
          muted: "#8a8984",
          faint: "#b3b2ac",
        },
        line: {
          DEFAULT: "#e8e7e3",
          strong: "#d6d5d0",
        },
        surface: {
          DEFAULT: "#ffffff",
          page: "#fafaf9",
          sunken: "#f4f4f2",
        },
        accent: {
          DEFAULT: "#2a78d6",
          deep: "#1c5cab",
          wash: "#eff5fd",
          border: "#c6dcf5",
        },
        good: "#0ca30c",
        goodtext: "#006300",
        warm: "#eb6834",
        aqua: "#1baf7a",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,17,16,0.04), 0 1px 1px rgba(17,17,16,0.03)",
        raised:
          "0 1px 2px rgba(17,17,16,0.05), 0 8px 24px -8px rgba(17,17,16,0.10)",
        frame:
          "0 2px 6px rgba(17,17,16,0.05), 0 24px 64px -24px rgba(17,17,16,0.18)",
      },
      letterSpacing: {
        display: "-0.025em",
      },
    },
  },
  plugins: [],
};
export default config;
