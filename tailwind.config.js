/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F8F7FF",
        mist: "#EEEAF8",
        indigo: {
          DEFAULT: "#6C63FF",
          deep: "#1E1B4B",
          light: "#A78BFA",
        },
        electric: "#3B82F6",
        ink: "#1E1B4B",
      },
      fontFamily: {
        display: ["'Clash Display'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
