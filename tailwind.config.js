/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // set as default font
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
