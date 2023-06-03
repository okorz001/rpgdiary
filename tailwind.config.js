// @ts-check

const theme = require('tailwindcss/defaultTheme')

/** @param {string} name */
function defineColor(name) {
  return { [name]: `rgb(var(--color-${name}) / <alpha-value>)` }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.tsx",
  ],
  theme: {
    extend: {
      // material-ish theme
      colors: {
        primary: 'hsl(189, 100%, 25%)',
        primaryContrast: 'hsl(0, 0%, 100%)',
        secondary: 'hsl(28, 95%, 45%)',
        secondaryContrast: 'hsl(0, 0%, 0%)',
        tertiary: 'hsl(38, 80%, 60%)',
        tertiaryContrast: 'hsl(0, 0%, 0%)',
        background: {
          DEFAULT: 'hsl(0, 0%, 90%)',
          dark: 'hsl(0, 0%, 10%)',
        },
        paper: {
          DEFAULT: 'hsl(0, 0%, 95%)',
          dark: 'hsl(0, 0%, 15%)',
        },
        text: {
          DEFAULT: 'hsl(0, 0%, 0%)',
          dark: 'hsl(0, 0%, 100%)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...theme.fontFamily.sans],
        serif: ['var(--font-serif)', ...theme.fontFamily.serif],
      },
      gridTemplateColumns: {
        liked1: 'minmax(min-content, max-content)',
        liked2: 'repeat(2, minmax(min-content, max-content))',
        list: 'max-content minmax(min-content, max-content)',
        pageNav: '2.5rem 2.5rem minmax(min-content, max-content) 2.5rem 2.5rem',
      },
      gridTemplateRows: {
        layout: 'max-content 1fr max-content',
      },
      maxHeight: {
        figure: '200px',
      },
      maxWidth: {
        main: '768px',
        figure: '200px',
      },
      minWidth: {
        body: '280px',
      },
      screens: {
        // nb = navbar, at this width links are moved from dropdown into navbar itself
        nb: '480px',
      },
      zIndex: {
        // default 0
        modal: '1',
      }
    },
  },
  plugins: [],
}
