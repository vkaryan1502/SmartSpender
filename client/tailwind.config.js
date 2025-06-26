/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        primary: '#E0531F',
        smoky: '#F5F5F5',
        success: '#4CAF50',
        error: '#F44336',
      },
    },
  },
  plugins: [],
}
