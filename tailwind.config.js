/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      screens: {
        xs: { min: "260px", max: "915px" },
        xxl:{min:"1200px",max:"1500px"}
      },
    },
  },
  plugins: [],
};
