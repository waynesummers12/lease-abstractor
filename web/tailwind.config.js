/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./web/src/app/**/*.{js,ts,jsx,tsx}",
    "./web/src/components/**/*.{js,ts,jsx,tsx}",
    "./web/src/**/*.{js,ts,jsx,tsx}",

    // 👇 SAFE CATCH-ALL (important)
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


