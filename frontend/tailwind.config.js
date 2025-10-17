/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // modalità dark via classe
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // eventuali estensioni future del tema
    },
  },
  plugins: [],
};
