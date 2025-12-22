/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background tokens
        'bg-0': '#F7FBFF',
        'bg-1': '#DFF1FF',
        'bg-2': '#7CCBFF',
        // Text tokens
        'text-0': '#0A1020',
        'text-1': '#334155',
        'text-2': '#64748B',
        // Accent
        'accent': '#D5FF4F',
        'accent-ink': '#0A1020',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // H1: 56-72 desktop / 36-44 mobile
        'h1-mobile': ['36px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1-desktop': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        // H2: 32-40 desktop / 26-32 mobile
        'h2-mobile': ['28px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2-desktop': ['36px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        // Body
        'body': ['17px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
      },
      spacing: {
        'section-mobile': '64px',
        'section-desktop': '96px',
      },
      maxWidth: {
        'content': '1200px',
      },
      borderRadius: {
        'card': '24px',
      },
    },
  },
  plugins: [],
}
