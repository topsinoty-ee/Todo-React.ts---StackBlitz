/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,tsx,jsx, py}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': "linear-gradient(135deg, transparent 18.75%, theme('colors.base-300') 31.25%, transparent 0), repeating-linear-gradient(45deg, theme('colors.base-300') -6.25% 6.25%, theme('colors.base-200') 0 18.75%)",
      },
    },
  },
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
  plugins: [require('daisyui')],
};
