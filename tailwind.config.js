/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'light' : "#D8D8D8",  
        'primary-100': '#0C88EF',
        'primary-200': '#0D1D2E',
        'primary-300': '#0C141C'
      }
    },
  },
  plugins: [],
}

