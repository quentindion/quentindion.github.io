import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['"Noto Sans"', ...fontFamily.sans],
        }
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config

