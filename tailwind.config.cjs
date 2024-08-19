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
        shake: {
          "10%, 90%": {
            transform: "translate3d(-2px, -2px, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 2px, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, -4px, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 4px, 0)",
          },
        },
        smallShake: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)",
          },
          "50%": {
            transform: "translate3d(-2px, -2px, 0)",
          },
        },
      },
      animation: {
        fadeUp: "fadeUp 1s",
        shake: "shake 1s cubic-bezier(.36,.07,.19,.97) both",
        smallShake: "smallShake 0.05s both",
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
