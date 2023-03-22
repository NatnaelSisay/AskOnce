/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'theme':'#3F51B5',
      },

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
