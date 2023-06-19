// @ts-check

const theme = require('tailwindcss/defaultTheme')

/** @param {string} name */
function defineColor(name) {
  return { [name]: `rgb(var(--color-${name}) / <alpha-value>)` }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      // material-ish theme
      colors: {
        primary: 'hsl(var(--color-primary))',
        primaryContrast: 'hsl(var(--color-primaryContrast))',
        secondary: 'hsl(var(--color-secondary))',
        secondaryContrast: 'hsl(var(--color-secondaryContrast))',
        tertiary: 'hsl(var(--color-tertiary))',
        tertiaryContrast: 'hsl(var(--color-tertiaryContrast))',
        background: 'hsl(var(--color-background))',
        paper: 'hsl(var(--color-paper))',
        text: 'hsl(var(--color-text))',
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
