/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        accent:{
          1: "#E54065",
        },
        whitebg:{
          1: "#F4F5F9",
        },
        greyborder:{
          1: "#CFD2DC",
        },
        graytext:{
          1: "#636363",
        },
        filterbtn:{
          1: "#E1E4EA"
        },
        favorite:{
          1: "#F2F2F2"
        }
      }
    },
  },
  plugins: [],
}
