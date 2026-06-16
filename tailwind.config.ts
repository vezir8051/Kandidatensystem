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
        // Primärfarbe: kräftiges Jobwish-Blau (Header, Links, Standard-CTA).
        brand: {
          50: "#eaf1ff",
          100: "#d4e2ff",
          200: "#aac6ff",
          300: "#75a3ff",
          400: "#3f7cff",
          500: "#1a63ff",
          600: "#0d57f5", // Primär
          700: "#0a45c7",
          800: "#0c3aa1",
          900: "#0e3380",
        },
        // Akzent: Pink→Lila-Verlauf der Highlight-CTAs ("Jetzt bewerben" etc.).
        accent: {
          pink: "#ec3f8f",
          fuchsia: "#d23bb4",
          purple: "#9c3cf0",
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
        ink: "#131a33",
        body: "#3f4c68",
        muted: "#5f6e8c",
        hairline: "#dde5f0",
        canvas: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Runde, fette Display-Schrift für Überschriften (Jobwish-Look).
        display: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(19,26,51,0.04), 0 8px 24px rgba(19,26,51,0.06)",
        card: "0 2px 8px rgba(19,26,51,0.06), 0 16px 40px rgba(19,26,51,0.10)",
        glow: "0 10px 40px rgba(13,87,245,0.25)",
        cta: "0 10px 30px rgba(236,63,143,0.35)",
      },
      backgroundImage: {
        "cta-gradient": "linear-gradient(90deg, #ec3f8f 0%, #9c3cf0 100%)",
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
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
