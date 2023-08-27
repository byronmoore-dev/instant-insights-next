const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */ // @ts-check
module.exports = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-header)", ...fontFamily.sans],
        header: ["var(--font-header)", ...fontFamily.sans],
        body: ["var(--font-body)", ...fontFamily.sans],
      },
      colors: {
        background: "#191A1F",
        foreground: "#1F2026",
        border: "#373737",
        color: {
          main: "#E4E4E4",
          second: "#8D8D8D",
        },
        btn: {
          background: "#191A1F",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
