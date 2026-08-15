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
       * one accent. The accent carries every emphasis on the site, so it stays a
       * single red rather than a family of tints — nothing else is allowed to
       * compete for attention.
       */
      colors: {
        ink: '#FFFFFF',
        background: '#FFFFFF',
        panel: '#FFFFFF',
        section: '#FAFAFA',
        cards: '#FFFFFF',
        raised: '#FFFFFF',
        frame: '#F5F5F5',
        wire: '#DC2B26',
        wireDim: '#F5B3B1',
        signal: '#DC2B26',
        signalDim: '#BA1C18',
        primary: '#DC2B26',
        secondary: '#0A0A0A',
        accent: '#DC2B26',
        success: '#0A0A0A',
        glass: 'rgba(255, 255, 255, 0.82)',
        border: 'rgba(10, 10, 10, 0.12)',
        text: '#0A0A0A',
        textSecondary: '#525252',
        muted: '#767676',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { tightest: '-0.04em' },
      maxWidth: { shell: '1240px' },
      spacing: { 13: '3.25rem' },
      borderRadius: { xl: '4px', '2xl': '4px', '3xl': '6px' },
    },
  },
  plugins: [],
};
