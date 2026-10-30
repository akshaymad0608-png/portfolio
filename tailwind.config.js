/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './constants.tsx',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      /**
       * Dark stage. Near-black ink, hairline rules, a neon green as the main
       * accent with violet and cyan as supporting light for gradients and glows.
       */
      colors: {
        ink: '#05070D',
        background: '#05070D',
        panel: '#0A0E18',
        section: '#080B14',
        cards: '#0E1322',
        raised: '#121829',
        frame: '#10162A',
        wire: '#39FF88',
        wireDim: '#0F3D25',
        signal: '#39FF88',
        signalDim: '#22C96B',
        primary: '#39FF88',
        secondary: '#F3F6FB',
        accent: '#39FF88',
        success: '#39FF88',
        violet: '#8B5CF6',
        cyan: '#22D3EE',
        glass: 'rgba(5, 7, 13, 0.72)',
        border: 'rgba(255, 255, 255, 0.10)',
        text: '#F3F6FB',
        textSecondary: '#A9B1C4',
        /* >= 4.5:1 on the page and on the raised surfaces. */
        muted: '#8C95AB',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        /* The poster's marker hand. An accent face only — it carries one line,
           never body copy or a heading a reader has to work through. */
        hand: ['Caveat', 'Segoe Script', 'Bradley Hand', 'cursive'],
      },
      letterSpacing: { tightest: '-0.04em' },
      maxWidth: { shell: '1240px' },
      spacing: { 13: '3.25rem' },
      borderRadius: { xl: '4px', '2xl': '4px', '3xl': '6px' },
    },
  },
  plugins: [],
};
