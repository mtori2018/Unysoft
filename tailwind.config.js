/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a', // Slate 900 - Navy Blueish
          foreground: '#f8fafc',
        },
        secondary: {
          DEFAULT: '#64748b', // Slate 500 - Engineering Gray
          foreground: '#f8fafc',
        },
        background: '#f1f5f9', // Slate 100
        surface: '#ffffff',
        accent: {
          DEFAULT: '#10b981', // Emerald 500 - Success/Green
          foreground: '#ffffff',
        },
        warning: '#eab308', // Yellow 500
        danger: '#ef4444', // Red 500
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
