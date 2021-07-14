module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'bounce1': 'bounce 0.5s linear infinite',
        'bounce2': 'bounce 0.7s linear infinite',
        'bounce3': 'bounce 0.9s linear infinite',
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
