module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',     // синій
        secondary: '#FACC15',   // жовтий
        danger: '#DC2626',      // червоний
        bg: '#0F172A',          // темний фон
        surface: '#1E293B'      // для карток
      },
    },
  },
  plugins: [],
}
