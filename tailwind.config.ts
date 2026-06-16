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
        // Primärfarbe: Jobwish Royal-Blue (Header, Links, Standard-CTA).
        brand: {
          50: "#eef4ff",
          100: "#dbe7fe",
          200: "#bdd3fd",
          300: "#90b5fb",
          400: "#5b8df7",
          500: "#3b82f6", // helle Akzentfläche (z.B. Promo-Karte)
          600: "#2d6fd4", // Primär (Header, Buttons)
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#0a225a", // dunkles Navy (Footer, Headings)
        },
        // Akzent: Lila→Pink-Verlauf der Highlight-CTAs ("Jetzt bewerben" etc.).
        accent: {
          purple: "#9333ea", // purple-600
          fuchsia: "#c026d3",
          pink: "#db2777", // pink-600
          violet: "#7c3aed",
        },
        // Dunkler Hero-Hintergrund (Sternenfeld).
        night: {
          900: "#0a1336",
          800: "#111a4a",
          700: "#1a1f63",
          600: "#2a1f72",
        },
        // Neutraltöne (navy-Ink wie bei Jobwish).
        slate: {
          50: "#f6f8fc",
          100: "#eef2f9",
          200: "#dde5f0",
          300: "#c2cee0",
          400: "#8a99b5",
          500: "#5f6e8c",
          600: "#3f4c68",
          700: "#2c3756",
          800: "#1c2440",
          900: "#131a33",
        },
        ink: "#0a225a",
        body: "#3f4c68",
        muted: "#5f6e8c",
        hairline: "#dde5f0",
        canvas: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Display-Schrift für Überschriften (Jobwish-Look: Jost).
        display: ["var(--font-jost)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(19,26,51,0.04), 0 8px 24px rgba(19,26,51,0.06)",
        card: "0 2px 8px rgba(19,26,51,0.06), 0 16px 40px rgba(19,26,51,0.10)",
        glow: "0 10px 40px rgba(13,87,245,0.25)",
        cta: "0 10px 30px rgba(236,63,143,0.35)",
      },
      backgroundImage: {
        // Lila → Pink (purple-600 → pink-600), wie die Jobwish-Highlight-CTAs.
        "cta-gradient": "linear-gradient(90deg, #9333ea 0%, #db2777 100%)",
        "night-gradient":
          "radial-gradient(1200px 600px at 50% -10%, #2a1f72 0%, #111a4a 45%, #0a1336 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        // Laufband nach rechts (Inhalt ist verdoppelt -> nahtlose Schleife).
        marquee: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        marquee: "marquee 24s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
