/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
      extend: {
          screens: {
              'xs': '480px',
          },
          colors: {
              brand: {
                  DEFAULT: '#0e109f',
                  light: '#0e109f/10',
                  dark: '#0c0d8a',
              },
          },
      },
  },
  plugins: [],
};