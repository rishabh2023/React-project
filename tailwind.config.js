

module.exports = {
  mode:'jit',
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    
    extend: {
      gradientColorStops: theme => ({
        'primary': '#FF8C00',
        'secondary': '#FFA500',
        'danger': '#FFD700',
    }),
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [ require('tailwind-scrollbar-hide'),require('@tailwindcss/aspect-ratio'),]
}
