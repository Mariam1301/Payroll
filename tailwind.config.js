/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/primeng/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-primeui")],
};
