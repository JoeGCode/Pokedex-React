/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#17153B",
        secondary: "#2E236C",
        tertiary: "#433D8B",
        accent: "#C8ACD6",
      },
    },
  },
  plugins: [],
};
