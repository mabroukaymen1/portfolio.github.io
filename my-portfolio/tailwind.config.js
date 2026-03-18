/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: 'var(--terminal-bg)',
          text: 'var(--terminal-text)',
        },
        arcade: {
          bg: 'var(--arcade-bg)',
          primary: 'var(--accent-purple)',
          secondary: 'var(--accent-gold)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Share Tech Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
