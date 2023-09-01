const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */ // @ts-check
module.exports = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-header)", ...fontFamily.sans],
        header: ["var(--font-header)", ...fontFamily.sans],
        body: ["var(--font-body)", ...fontFamily.sans],
      },

      colors: {
        l: {
          background: "#F5F5F5",
          foreground: "#EEEEEE",
          border: "#C1C1C1",
          text: {
            main: "#151515",
            second: "#262626",
          },
        },
        d: {
          background: "#191A1F",
          foreground: "#1F2026",
          border: "#373737",
          text: {
            main: "#F3F3F3",
            second: "#9A9A9A",
          },
          btn: {
            background: "#191A1F",
            "background-hover": "hsl(var(--btn-background-hover))",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
