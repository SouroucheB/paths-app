import type { Config } from "tailwindcss";
const { fontFamily, spacing } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const blue = {
  "50": "#ecf6fd",
  "100": "#d9ecfb",
  "200": "#b3daf7",
  "300": "#8cc7f3",
  "400": "#66b5ef",
  "500": "#40a2eb",
  "600": "#3382bc",
  "700": "#26618d",
  "800": "#1a415e",
  "900": "#0d202f",
};

const green = {
  "50": "#edf9f9",
  "100": "#dbf2f2",
  "200": "#b7e6e6",
  "300": "#93d9d9",
  "400": "#6fcdcd",
  "500": "#4bc0c0",
  "600": "#3c9a9a",
  "700": "#2d7373",
  "800": "#1e4d4d",
  "900": "#0f2626",
};

const red = {
  "50": "#ffeff3",
  "100": "#ffe0e6",
  "200": "#ffc1ce",
  "300": "#ffa1b5",
  "400": "#ff829d",
  "500": "#ff6384",
  "600": "#cc4f6a",
  "700": "#993b4f",
  "800": "#662835",
  "900": "#33141a",
};

const config: Config = {
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
      },
      colors: {
        brandPrimary: {
          default: blue["500"],
          hover: blue["600"],
          disabled: colors.gray["500"],
        },
        blue,
        green,
        red,
      },
      spacing: {
        auto: "auto",
        xs: spacing["1"],
        s: spacing["2"],
        m: spacing["6"],
        halfL: spacing["4"],
        l: spacing["8"],
        xl: spacing["16"],
      },
      transitionDelay: {
        "2000": "2000ms",
        "3000": "3000ms",
      },
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwindcss-animate")],
};
export default config;
