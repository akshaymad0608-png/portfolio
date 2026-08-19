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
       * Swiss technical: white paper, near-black ink, hairline rules and exactly
       * one accent — the green sampled from the brand poster. It carries every
       * emphasis on the site, so it stays a single green rather than a family of
       * tints; nothing else is allowed to compete for attention.
       */
      colors: {
        ink: '#FFFFFF',
        background: '#FFFFFF',
        panel: '#FFFFFF',
        section: '#FAFAFA',
        cards: '#FFFFFF',
        raised: '#FFFFFF',
        frame: '#F5F5F5',
        wire: '#107808',
        wireDim: '#BFE3B8',
        signal: '#107808',
        signalDim: '#0B5A06',
        primary: '#107808',
        secondary: '#0A0A0A',
        accent: '#107808',
        success: '#0A0A0A',
        glass: 'rgba(255, 255, 255, 0.82)',
        border: 'rgba(10, 10, 10, 0.12)',
        text: '#0A0A0A',
        textSecondary: '#525252',
        /* Clears 4.5:1 on white AND on the off-white bands (#FAFAFA/#F5F5F5).
           The previous #767676 passed on white but fell to 4.35 on a band. */
        muted: '#6E6E6E',
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
