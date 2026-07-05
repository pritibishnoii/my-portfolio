import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0B0E14',
        surface: '#131822',
        'surface-alt': '#1B2230',
        'surface-hover': '#212A3B',
        border: {
          DEFAULT: '#262E3D',
          light: '#333D52',
        },
        text: {
          primary: '#E7EAF0',
          muted: '#8A93A6',
          dim: '#5B6478',
        },
        accent: {
          violet: '#8B7FFF',
          'violet-dim': '#6E62D9',
          mint: '#4ADE9C',
          amber: '#F2B84B',
          rose: '#F2617A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      animation: {
        'pulse-slow': 'pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
