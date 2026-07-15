/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "lato": ['Sixtyfour', 'sans-serif']
      }
    },
  },
  theme: {
    extend: {
      keyframes: {
        scrollAds: {
          "0%": {
            transform: "translateY(-150%)",
          },
          "100%": {
            transform: "translateY(180%)",
          },
        },
      },
      animation: {
        scrollAds: "scrollAds 8s linear infinite",
      },
    },
  },
  plugins: [],
}