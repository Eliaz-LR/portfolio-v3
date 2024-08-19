/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(0)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-60px)",
          },
        },
      },
      animation: {
        fadeUp: "fadeUp 1s",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          primary: "#7d3eea",
          "base-content": "#d1d5db",
          "base-300": "#6b7280",
        },
      },
    ],
  },
};
