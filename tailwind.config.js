/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        widescreen: { raw: '(min-aspect-ratio:3/2)' },
        tallscreen: { raw: '(max-aspect-ratio:13/20)' },
      },
      keyframes: {
        'open-menu': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '80%': { transform: 'scaleY(1.2)', transformOrigin: 'top' },

          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        'close-menu': {
          '0%': { transform: 'scaleY(1.2)', transformOrigin: 'top' },
          '20%': { transform: 'scaleY(1)', transformOrigin: 'top' },

          '100%': { transform: 'scaleY(0)', transformOrigin: 'top' },
        },
      },
      animation: {
        'open-menu': 'open-menu 0.5s ease-in-out forwards',
        'close-menu': 'close-menu 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
