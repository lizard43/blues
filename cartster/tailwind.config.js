/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js,json}'],
  theme: {
    extend: {
      colors: {
        brown: {
          500: '#bfa094',
        },
        purple: {
          500: '#a855f7',
        },
        silver: {
          500: '#ecebff',
        },
        salmon: {
          500: '#fa8072',
        },
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(red|green|blue|yellow|orange|purple|silver|salmon)-500|600|700|800|900/,
    },
  ],
  variants: {
    // The 'active' variant will be generated in addition to the defaults
    extend: {
      textColor: ['active', 'hover'],
      borderColor: ['active', 'hover']
    }
  },
}
