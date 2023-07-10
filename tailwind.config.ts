import type { Config } from 'tailwindcss'

export default {
    theme: {
        extend: {
            fontFamily: {
                poppins: "Poppins, 'monospace', sans-serif"
            }
        }
    },
    content: [
        "./src/**/*.{html,ts}"
    ],
    darkMode: 'class',
    plugins: [
        require("@tailwindcss/typography")
    ],
} satisfies Config