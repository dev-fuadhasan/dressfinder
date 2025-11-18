/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff88c6',
        secondary: '#ff5faa',
        accent: '#ffe5f3',
        'text-dark': '#5b2d42',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        pink: {
          primary: '#ff88c6',
          secondary: '#ff5faa',
          accent: '#ffe5f3',
          neutral: '#5b2d42',
          'base-100': '#ffffff',
        },
      },
    ],
  },
}

