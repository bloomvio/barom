import type { Config } from "tailwindcss";

// Tailwind v4: colors & fonts are defined in globals.css @theme block.
// This file is kept minimal — only non-CSS config goes here.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./emails/**/*.{ts,tsx}",
  ],
};

export default config;
