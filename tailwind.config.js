module.exports = {
  presets: [require('tailwind-react-native-preset')],
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-dark-mode')()],
};
