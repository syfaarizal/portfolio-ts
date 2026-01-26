export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0a", 
        light: "#f5f5f5", 
        primary: "#8b0000",
        accent: "#ff3333", 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'], // Untuk kesan tech-oriented
      }
    },
  },
  plugins: [],
}