/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "primary-200": "#FFD6F8",
        "primary-300": "#FFA0F0",
        primary: "#DE0FBD",
        "primary-700":"#BB10A0",
        "primary-900": "#70025E",
        background: "#FAFAFA",
        "background-dark": "#0A0008",
        "background-500": "#F9F4F4",
        blur: "#627EEA",
        "blur-dark": "#5B054D",
        "holder": "#24111F"
      },
      fontFamily: {
        "satoshi-light": ["Satoshi-Light", "sans-serif"],
        "satoshi-italic": ["Satoshi-Italic", "sans-serif"],
         satoshi: ["Satoshi", "sans-serif"],
        "satoshi-medium": ["Satoshi-Medium", "sans-serif"],
        "satoshi-bold": ["Satoshi-Bold", "sans-serif"],
        "satoshi-black": ["Satoshi-Black", "sans-serif"],
       },
    },
  },
  plugins: [],
};
