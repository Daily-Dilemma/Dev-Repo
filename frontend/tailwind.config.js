{
  import("tailwindcss").Config;
}
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-400": "#60a5fa",
        "blue-500": "#3b82f6",
        "blue-600": "#2563eb",
        "purple-400": "#c084fc",
        "purple-500": "#a855f7",
        "purple-600": "#9333ea",
        "red-500": "#ef4444",
        "red-600": "#dc2626",
        "green-500": "#22c55e",
        "green-600": "#16a34a",
      },
      backgroundImage: {
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      },
      animation: {
        "scale-105": "scale 0.2s ease-in-out",
      },
      keyframes: {
        scale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      transitionProperty: {
        width: "width",
      },
    },
    fontFamily: {
      sans: ["Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
    },
  },
  plugins: [],
};
