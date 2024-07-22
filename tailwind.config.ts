import type { Config } from 'tailwindcss'
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { KeyValuePair } from 'tailwindcss/types/config';
import plugin from 'tailwindcss/plugin'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                mobile: {
                    max: '639px'
                }
            },
            fontFamily: {
                sans: ['"Inter"', ...fontFamily.sans],
            },
            animation: {
                aurora: "aurora 60s linear infinite"
            },
            keyframes: {
                aurora: {
                    from: { backgroundPosition: "50% 50%, 50% 50%" },
                    to: { backgroundPosition: "350% 50%, 350% 50%" },
                }
            },
        },
    },
    darkMode: 'selector',
    plugins: [
        plugin(({addBase, theme}) => {
            addBase({":root": Object.fromEntries(
                Object.entries(flattenColorPalette(theme("colors")))
                      .map(([key, val]) => [`--${key}`, val])) as KeyValuePair
            });
        }),
    ],
} satisfies Config