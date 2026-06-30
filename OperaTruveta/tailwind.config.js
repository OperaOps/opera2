/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Opera x Truveta premium healthcare palette
        navy: {
          50: '#eef2f8',
          100: '#d8e0ee',
          200: '#b3c3dc',
          300: '#849bc2',
          400: '#5772a3',
          500: '#3a557f',
          600: '#2b416a',
          700: '#1f3257',
          800: '#16253f', // deep navy
          900: '#0e1a2e', // ink
          950: '#080f1c',
        },
        teal: {
          50: '#ecfdfb',
          100: '#cffaf3',
          200: '#a0f3e9',
          300: '#67e6d7',
          400: '#2fd0c0',
          500: '#14b5a8',
          600: '#0b9389',
          700: '#0e756f',
          800: '#115d59',
          900: '#134d4a',
        },
        slate: {
          25: '#fbfcfe',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(14,26,46,0.04), 0 8px 24px -8px rgba(14,26,46,0.10)',
        'soft-lg': '0 2px 4px rgba(14,26,46,0.05), 0 24px 48px -16px rgba(14,26,46,0.18)',
        glow: '0 0 0 1px rgba(20,181,168,0.18), 0 8px 32px -8px rgba(20,181,168,0.30)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-light':
          'radial-gradient(900px 500px at 10% -10%, rgba(20,181,168,0.10), transparent 60%), radial-gradient(800px 600px at 100% 0%, rgba(58,114,163,0.12), transparent 55%), radial-gradient(700px 500px at 50% 120%, rgba(20,181,168,0.06), transparent 60%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        dash: {
          to: { 'stroke-dashoffset': '0' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 2.2s infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
};
