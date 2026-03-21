/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary))",
          text: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2E236C",
          text: "#CBC8CB",
        },
        tertiary: "#433D8B",
        accent: "#C8ACD6",
      },
    },
  },
  plugins: [],
};
