import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Stage red — primary accent for CTAs / "à l'affiche"
        stage: {
          50: "#fdf2f3",
          100: "#fbe2e4",
          200: "#f7cace",
          300: "#f0a4ab",
          400: "#e6727c",
          500: "#d94553",
          600: "#c52e3d",
          700: "#a52431",
          800: "#88222d",
          900: "#73212c",
          950: "#3f0c14",
        },
        // Curtain — deep neutral for backgrounds
        curtain: {
          50: "#f7f6f5",
          100: "#e8e6e0",
          200: "#d3cec4",
          300: "#b6ad9e",
          400: "#9b8f7c",
          500: "#867967",
          600: "#71655a",
          700: "#5d534a",
          800: "#4f463f",
          900: "#443c37",
          950: "#26211d",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
