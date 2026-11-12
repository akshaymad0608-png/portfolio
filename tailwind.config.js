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
       * Light theme. A pale blue-white page, white cards, hairline rules and one
       * blue accent, with violet and cyan as supporting colour for gradients.
       * `ink` is the page colour (it is also the text colour used on top of the
       * blue accent, where it reads as near-white).
       */
      colors: {
        ink: '#F4F7FD',
        background: '#F4F7FD',
        panel: '#FFFFFF',
        section: '#FFFFFF',
        cards: '#FFFFFF',
        raised: '#F8FAFF',
        frame: '#EEF3FF',
        wire: '#1F5BFF',
        wireDim: '#E8EFFF',
        signal: '#1F5BFF',
        signalDim: '#1642D8',
        primary: '#1F5BFF',
        secondary: '#0B1220',
        accent: '#1F5BFF',
        success: '#059669',
        violet: '#7C3AED',
        cyan: '#0891B2',
        glass: 'rgba(255, 255, 255, 0.80)',
        border: 'rgba(15, 23, 42, 0.10)',
        text: '#0B1220',
        textSecondary: '#3B465C',
        /* >= 4.5:1 on the page and on white cards. */
        muted: '#5A6478',
        /* Light landing page (home route only). */
        lp: {
          bg: '#F4F7FD',
          ink: '#0B1220',
          body: '#3B465C',
          muted: '#5A6478',
          line: '#E2E8F4',
          blue: '#1F5BFF',
          deep: '#1642D8',
          navy: '#0A1A44',
          tint: '#E8EFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        /* The poster's marker hand. An accent face only — it carries one line,
           never body copy or a heading a reader has to work through. */
        hand: ['Caveat', 'Segoe Script', 'Bradley Hand', 'cursive'],
        /* Serif display face for the light landing page headings. */
        lp: ['"Instrument Serif"', 'Georgia', '"Times New Roman"', 'serif'],
      },
      letterSpacing: { tightest: '-0.04em' },
      maxWidth: { shell: '1240px' },
      spacing: { 13: '3.25rem' },
      borderRadius: { xl: '14px', '2xl': '20px', '3xl': '26px' },
    },
  },
  plugins: [],
};
