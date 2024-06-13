/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fade-in 2s ease-in-out',
        'slideInRight': 'slideInRight 1s ease-in-out',
        'slideInLeft': 'slideInLeft 1s ease-in-out',
      },
      aspectRatio: {
        'book': '6 / 9',
      },
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}

