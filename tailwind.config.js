/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
        border: "#E5E7EB",
        primary: "#8B5CF6",
        secondary: "#EC4899",
        accent: "#F59E0B",
        surface: "#FFFFFF",
        background: "#FAFAFA",
        foreground: "#1F2937",
        muted: "#6B7280",
        "muted-foreground": "#9CA3AF",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "heart-burst": "heart-burst 0.6s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
      keyframes: {
        "heart-burst": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.3)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        }
      }
    },
  },
  plugins: [],
}