module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "moro-dark-blue": "#002384",
        "moro-dark-green": "#033730",
        "moro-dark-orange": "#033730",
        "moro-dark-red": "#990000",
        "moro-dark-purple": "#260023",
        "moro-dark-yellow": "#ffa500",
        "moro-purple": "#d3caee",
        "moro-green": "#d7ffd7",
        "moro-red": "#ffb7fc",
        "moro-blue": "#D5E3F2",
        "moro-orange": "#ffe8dc",
        "moro-yellow": "#fffdba",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
