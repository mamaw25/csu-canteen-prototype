/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#bcddff',
          300: '#8ec8ff',
          400: '#59a8ff',
          500: '#3184ff',
          600: '#1b63f5',
          700: '#144de1',
          800: '#1740b6',
          900: '#193a8f',
          950: '#142557',
        },
        mint: {
          50: '#effaf4',
          100: '#d8f3e2',
          200: '#b4e6ca',
          300: '#83d3ab',
          400: '#50b987',
          500: '#2d9d6c',
          600: '#1e7e56',
          700: '#186546',
          800: '#155039',
          900: '#124230',
        },
      },
    },
  },
  plugins: [],
}