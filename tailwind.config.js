/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,js}"],
  theme: {
    extend: {
      fontFamily: {
        'afacad-flux': ['"Afacad Flux"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

