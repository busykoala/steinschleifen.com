module.exports = {
  content: [
    "./pages/**/*.njk",
    "./templates/**/*.njk",
    "./assets/**/*.css"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Libre Franklin"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
