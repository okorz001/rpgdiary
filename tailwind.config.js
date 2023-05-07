// @ts-check

const theme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.tsx",
    "./src/pages/**/*.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        wallpaper: 'url(/assets/abandoned-castle.jpg)',
      },
      colors: {
        header: 'black',
        card: 'hsl(255, 30%, 20%)',
        primary: 'hsl(186, 94%, 82%)',
        secondary: 'hsl(0, 91%, 71%)',
        figure: 'hsl(0, 0%, 5%)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...theme.fontFamily.sans],
        serif: ['var(--font-serif)', ...theme.fontFamily.serif],
      }
    },
  },
  plugins: [],
}
