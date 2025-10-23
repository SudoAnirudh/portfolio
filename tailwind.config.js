/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gh-dark': '#0d1117',
        'gh-dark-secondary': '#161b22',
        'gh-border': '#30363d',
        'gh-text': '#c9d1d9',
        'gh-text-secondary': '#8b949e',
        'gh-accent': '#58a6ff',
        'gh-green': '#238636',
      }
    },
  },
  plugins: [],
};
