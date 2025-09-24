import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        'brand-pink': '#fd1eaa',
        'brand-blue': '#08cced',
        'brand-green': '#1bae46',
        'brand-black': '#111111',
        'brand-background': '#FAFAF9',
      },

      boxShadow: {
        'neo-sm': '4px 4px 0px #111111',
        'neo': '8px 8px 0px #111111',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      rotate: {
        '1': '1deg',
        '-1': '-1deg',
        '3': '3deg',
        '-3': '-3deg',
      }
    },
  },
  plugins: [],
};
export default config;