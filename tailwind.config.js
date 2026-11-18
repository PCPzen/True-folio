/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: "#060D1A",
          base: "#0A192F",
          surface: "#0F213D",
          elevated: "#13294B",
        },
        botnoi: {
          cyan: "#00AEEF",
          glow: "#38BDF8",
          soft: "rgba(0, 174, 239, 0.14)",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Thai"', "system-ui", "sans-serif"],
        display: ['"Plus Jakarta Sans"', '"Noto Sans Thai"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Noto Sans Thai"', "monospace"],
      },
      backgroundImage: {
        "tech-grid":
          "linear-gradient(to right, rgba(56, 189, 248, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.06) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
