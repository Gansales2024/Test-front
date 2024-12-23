/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'selector',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-pattern': "url('./src/assets/auth.png')",
      },
      colors: {
        mainTextColor: '#ACC5FF'
      }
    }
  },
  plugins: [],
}