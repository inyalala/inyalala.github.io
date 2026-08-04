/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./courses/**/*.html",
    "./faq/**/*.html",
    "./work-with-me/**/*.html",
    "./media-kit/**/*.html",
    "./news/**/*.html",
    "./publications/**/*.html",
    "./research/**/*.html",
  ],
  darkMode: "class",
  safelist: [
    // Classes built dynamically in inline <script> blocks (news cards, badges,
    // theme toggle) are invisible to Tailwind's static content scan and must
    // be listed here explicitly, or the purge step deletes them.
    "bg-gold", "text-navy", "bg-blue-600", "text-white", "bg-green-600",
    "bg-gray-600", "bg-navy", "hover:bg-gold-dark",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C5A059",
        "gold-light": "#E5C07B",
        "gold-dark": "#A8813A",
        navy: "#0a1628",
        "navy-2": "#0f1f38",
        "navy-3": "#162040",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
