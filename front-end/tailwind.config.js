/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#58aa8b",
        secondary: "#9ed6c1",
        accent: "#74cfac",
        muted: "#64748b",
        warning: "#fbbf24",
        danger: "#ef4444",
        success: "#10b981",
        text: "#0b0f0e",
        bg: "#f4f8f7",
      },
    },
  },
  plugins: [],
};
