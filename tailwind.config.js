/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          green: '#2D5A27',
          beige: '#FDFCF6',
          orange: '#D97706',
          lightGreen: '#4A7A44',
          darkGreen: '#1A3018'
        }
      }
    },
  },
  plugins: [],
}
