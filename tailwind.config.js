/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tva: {
          orange: '#F07824',
          'orange-glow': '#FFA04D',
          'orange-dark': '#B84E0B',
          olive: '#42452C',
          'olive-light': '#5A5E3D',
          'olive-dark': '#2E301F',
          cream: '#E8DFCA',
          'cream-dim': '#C4BAA3',
          brown: '#29251F',
          'brown-dark': '#1B1814',
          gold: '#F6C453',
          'gold-light': '#FCE18B',
          black: '#100F0C',
          charcoal: '#171512',
          card: '#1B1915',
          panel: 'rgba(27, 25, 21, 0.85)',
          green: '#10B981',
          emerald: '#059669',
          amber: '#F59E0B',
          red: '#DC2626',
        },
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'radial-portal': 'radial-gradient(circle at center, rgba(240, 120, 36, 0.3) 0%, rgba(246, 196, 83, 0.15) 30%, rgba(16, 15, 12, 0.95) 75%)',
        'grid-pattern': 'linear-gradient(to right, rgba(240, 120, 36, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(240, 120, 36, 0.05) 1px, transparent 1px)',
        'scanlines': 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'spin-reverse': 'spin 40s linear infinite reverse',
        'timeline-flow': 'timelineFlow 20s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
      },
      keyframes: {
        timelineFlow: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(240, 120, 36, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(240, 120, 36, 0.9)) drop-shadow(0 0 40px rgba(246, 196, 83, 0.6))' },
        },
      },
      boxShadow: {
        'tva-glow': '0 0 25px -5px rgba(240, 120, 36, 0.45)',
        'tva-glow-lg': '0 0 50px -10px rgba(240, 120, 36, 0.65)',
        'gold-glow': '0 0 30px -5px rgba(246, 196, 83, 0.5)',
        'panel': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(240, 120, 36, 0.2)',
        'dossier': '0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(232, 223, 202, 0.1)',
      },
    },
  },
  plugins: [],
};
