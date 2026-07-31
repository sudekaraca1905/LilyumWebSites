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
        navy: {
          DEFAULT: "#1E3A5F",
          soft: "#2A4A73",
          deep: "#152A45",
        },
        coral: {
          DEFAULT: "#FF6B6B",
          soft: "#FF8A8A",
          deep: "#E85555",
        },
        cream: {
          DEFAULT: "#FFF8F3",
          warm: "#FFF1E6",
          deep: "#F5E6D8",
        },
        gold: {
          DEFAULT: "#FFB84D",
          soft: "#FFC970",
          deep: "#E5A040",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(30, 58, 95, 0.12)",
        lift: "0 10px 30px rgba(255, 107, 107, 0.22)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        draw: {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease-out forwards",
        draw: "draw 1.4s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
