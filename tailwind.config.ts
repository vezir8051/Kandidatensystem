import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primär-Akzent: "Rausch" (Airbnb-Rot). Einziger Markenakzent.
        brand: {
          50: "#fff0f3",
          100: "#ffd1da", // Disabled-Tint
          200: "#ffb3c1",
          300: "#ff8aa0",
          400: "#ff6178",
          500: "#ff385c", // Rausch – Primärfarbe
          600: "#ff385c", // Primär (CTA-Standard)
          700: "#e00b41", // Active / Hover
          800: "#c50839",
          900: "#a30730",
        },
        // Kein zweiter Markenakzent in Airbnb-Mainline – auf Rausch gemappt,
        // damit etwaige Verläufe monochrom (rot) bleiben.
        accent: {
          50: "#fff0f3",
          100: "#ffd1da",
          200: "#ffb3c1",
          300: "#ff8aa0",
          400: "#ff6178",
          500: "#ff385c",
          600: "#e00b41",
          700: "#c50839",
        },
        // Neutral-Grau auf Airbnb-Töne umgemappt (warm, nicht kühl).
        // Cascadet automatisch über alle slate-* Klassen.
        slate: {
          50: "#f7f7f7", // surface-soft
          100: "#ebebeb", // hairline-soft
          200: "#dddddd", // hairline
          300: "#c1c1c1", // border-strong
          400: "#929292", // muted-soft
          500: "#6a6a6a", // muted
          600: "#3f3f3f", // body
          700: "#3f3f3f", // body
          800: "#222222", // ink
          900: "#222222", // ink
        },
        ink: "#222222",
        body: "#3f3f3f",
        muted: "#6a6a6a",
        hairline: "#dddddd",
        canvas: "#ffffff",
      },
      fontFamily: {
        // Airbnb Cereal VF nicht lizenzierbar – Inter ist der nächste Ersatz.
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Airbnb kennt genau eine Schatten-Stufe. soft/card/glow zeigen alle
        // denselben dezenten Schatten → keine harten Verläufe/Glows mehr.
        soft: "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px 0, rgba(0,0,0,0.10) 0 4px 8px 0",
        card: "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px 0, rgba(0,0,0,0.10) 0 4px 8px 0",
        glow: "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px 0, rgba(0,0,0,0.10) 0 4px 8px 0",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
