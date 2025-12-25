/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // App Router pages
    "./components/**/*.{js,ts,jsx,tsx}", // Any components
    "./pages/**/*.{js,ts,jsx,tsx}",      // Legacy pages if any
  ],
  theme: {
    extend: {
      colors: {
        luxury: "#C9A24D", // gold
      },
    },
  },
  plugins: [],
};
