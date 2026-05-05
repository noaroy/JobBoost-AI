import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd",
          400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8",
          800: "#1e40af", 900: "#1e3a8a",
        },
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      backgroundImage: {
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 50% -20%, #1e3a8a55, transparent)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
      },
      boxShadow: {
        "glow-blue": "0 0 40px -10px rgba(59,130,246,0.4)",
        "glow-violet": "0 0 40px -10px rgba(139,92,246,0.4)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
