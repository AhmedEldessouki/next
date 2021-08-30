/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  images: {
    deviceSizes: [500, 1440],
  },
  theme: {
    screens: {
      sm: '500px',
      md: [{min: '100px', max: '767px'}],
      lg: [{min: '767px', max: '1100px'}],
      xl: '1440px',
    },
    extend: {
      colors: {
        'primary-color-moderate': 'var(--primary-color-moderate)',
        'primary-color-dark': 'var(--primary-color-dark)',
        'neutral-color-moderate': 'var(--neutral-color-moderate)',
        'neutral-color-dark': 'var(--neutral-color-dark)',
      },
      fontFamily: {
        commissioner: ['Commissioner'],
      },
    },
  },
  variants: {
    extend: {},
  },
}
