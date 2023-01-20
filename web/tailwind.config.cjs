/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        darkbg: "#09090A",
      },

      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
      keyframes: {
        scaleUp: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
