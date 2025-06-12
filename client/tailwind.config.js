module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@shadcn/ui/**/*.{ts,tsx}"],
  darkMode: "class",
    theme: {
    extend: {
      colors: {
        primary: "#2563eb", // синій
        secondary: "#64748b", // сірий
        accent: "#f97316", // помаранчевий
        background: "#f8fafc",
        foreground: "#0f172a",
      },

      fontFamily: {
        sans: "var(--font-sans)",
        saira: "var(--font-saira)"
      },

      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },

    borderRadius: {
      lg: "1rem",
      md: "0.5rem",
      sm: "0.25rem",
    },
    },
  },
  plugins: [],
}
