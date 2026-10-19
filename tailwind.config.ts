import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // Verde quadra (court) — tema tênis/padel
        court: {
          50: "#ecfdf2",
          100: "#d1fae0",
          200: "#a7f3c6",
          300: "#6ee7a6",
          400: "#34d27f",
          500: "#16b866",
          600: "#0c9a53",
          700: "#0a7c45",
          800: "#0b623a",
          900: "#0a4f31",
          950: "#052e1d",
        },
        // Amarelo-limão da bola de tênis
        ball: {
          300: "#e9ff6b",
          400: "#d8f84a",
          500: "#c6ef22",
          600: "#a7d108",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-22px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(8deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "bounce-ball": {
          "0%,100%": { transform: "translateY(0) scale(1,1)" },
          "10%": { transform: "translateY(0) scale(1.15,0.82)" },
          "50%": { transform: "translateY(-120px) scale(0.95,1.05)" },
          "90%": { transform: "translateY(0) scale(1.15,0.82)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "rise-in": "rise-in 0.7s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "bounce-ball": "bounce-ball 2.6s cubic-bezier(0.5,0.05,0.5,0.95) infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
