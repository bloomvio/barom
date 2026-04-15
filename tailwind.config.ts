import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "Fira Code", "monospace"],
        sans: ["var(--font-inter)", "-apple-system", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#0c0a09",
          warm: "#100d0b",
        },
        surface: {
          DEFAULT: "#16120f",
          2: "#1c1714",
        },
        border: {
          DEFAULT: "#2a2520",
          strong: "#3d352e",
        },
        amber: {
          DEFAULT: "#f59e0b",
          bright: "#fbbf24",
        },
        text: {
          DEFAULT: "#f5f4f2",
          muted: "#a8a29e",
          dim: "#6b6157",
          faint: "#44403c",
        },
      },
      animation: {
        "pulse-amber": "pulse-amber 2s ease-in-out infinite",
        "needle-sweep": "needle-sweep 1.2s ease-out forwards",
      },
      keyframes: {
        "pulse-amber": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
