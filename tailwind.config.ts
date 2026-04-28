import type { Config } from "tailwindcss";

/**
 * Charte graphique Acte 2 Théâtre — "Happy Culture"
 *
 *   Or rideau   : #F5C518   ← typographie d'enseigne, accents festifs
 *   Rouge sang  : #C9151E   ← rideau de scène, sièges, CTAs urgents
 *   Noir scène  : #0A0A0A   ← fonds dramatiques, contraste maximum
 *   Crème projo : #FFFBEC   ← lumière chaude, fond clair alternatif
 *
 * Les nuances `or` / `rouge` / `nuit` / `craie` sont les tokens primaires.
 * `stage` et `curtain` sont conservés (alias) pour rétrocompat avec les
 * composants existants jusqu'à refactor complet.
 */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
        // ── Tokens primaires Acte 2 ────────────────────────────────────────

        /** Or rideau — couleur d'enseigne ACTE 2 / HAPPY CULTURE */
        or: {
          50: "#fffbe9",
          100: "#fff6c2",
          200: "#ffec85",
          300: "#ffdc3d",
          400: "#ffc70a",
          500: "#f5c518", // base
          600: "#d49b00",
          700: "#a87404",
          800: "#8b5a0d",
          900: "#754a11",
          950: "#442700",
        },

        /** Rouge sang — sièges et rideau de scène */
        rouge: {
          50: "#fef2f3",
          100: "#fde3e5",
          200: "#facccf",
          300: "#f6a2a8",
          400: "#ee6c75",
          500: "#df3e49",
          600: "#c9151e", // base — rouge théâtre
          700: "#a91017",
          800: "#8c1118",
          900: "#74141a",
          950: "#3f060a",
        },

        /** Nuit scène — noir profond pour fonds dramatiques */
        nuit: {
          50: "#f6f6f7",
          100: "#e4e4e6",
          200: "#c8c8cd",
          300: "#a3a3aa",
          400: "#7a7a82",
          500: "#5e5e66",
          600: "#4a4a51",
          700: "#3a3a3f",
          800: "#252528",
          900: "#141416",
          950: "#0a0a0a", // base — noir scène
        },

        /** Craie projo — blanc cassé chaud, fond clair alternatif */
        craie: {
          50: "#fffef9",
          100: "#fffbec", // base
          200: "#fef3cf",
          300: "#fce8a3",
          400: "#fad776",
          500: "#f7c44e",
          600: "#e8a92a",
          700: "#c0851e",
          800: "#996a1c",
          900: "#7c581b",
          950: "#46300a",
        },

        // ── Alias rétrocompat (le code existant utilise stage/curtain) ────
        stage: {
          50: "#fef2f3",
          100: "#fde3e5",
          200: "#facccf",
          300: "#f6a2a8",
          400: "#ee6c75",
          500: "#df3e49",
          600: "#c9151e",
          700: "#a91017",
          800: "#8c1118",
          900: "#74141a",
          950: "#3f060a",
        },
        curtain: {
          50: "#fffef9",
          100: "#fffbec",
          200: "#fef3cf",
          300: "#a3a3aa",
          400: "#7a7a82",
          500: "#5e5e66",
          600: "#4a4a51",
          700: "#3a3a3f",
          800: "#252528",
          900: "#141416",
          950: "#0a0a0a",
        },

        // ── Tokens sémantiques thème-aware (utilisent les CSS variables) ──
        // Renommés pour éviter les conflits avec les préfixes Tailwind (bg-, border-).
        page: "rgb(var(--c-page) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--c-surface-2) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        "ink-muted": "rgb(var(--c-ink-muted) / <alpha-value>)",
        divider: "rgb(var(--c-divider) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
      boxShadow: {
        scene: "0 20px 50px -20px rgb(0 0 0 / 0.45)",
        glow: "0 0 0 1px rgb(245 197 24 / 0.4), 0 8px 24px -8px rgb(245 197 24 / 0.6)",
      },
      backgroundImage: {
        "gradient-rideau":
          "linear-gradient(180deg, rgb(201 21 30 / 1) 0%, rgb(116 20 26 / 1) 100%)",
        "gradient-scene":
          "radial-gradient(ellipse at top, rgb(245 197 24 / 0.15) 0%, transparent 60%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
