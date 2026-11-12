/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#2E3047',
          dark: '#26283B',
          card: '#363954',
          line: '#45486a',
        },
        accent: {
          DEFAULT: '#3bba9c',
          dark: '#2e9a80',
        },
        ink: {
          light: '#ccd6f6',
          DEFAULT: '#a8b2d1',
          muted: '#8892b0',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Prompt', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        site: '1100px',
      },
    },
  },
  plugins: [],
};
