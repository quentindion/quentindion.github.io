import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors'
// import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';
// import plugin from 'tailwindcss/plugin'

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
                sans: ['"Inter Sans"', ...fontFamily.sans],
            },
            colors: {
                primary: colors.emerald,
                accent: colors.lime
            }
        },
    },
    darkMode: 'selector',
    plugins: [
        // plugin(({theme, addUtilities}) => {
        //     addUtilities(
        //         Object.entries(flattenColorPalette(theme("colors")))
        //             .reduce((values, [key, val]) => ({
        //                 ...values,
        //                 [`.spotlight-${key}`]: {'--spotlight-color': `${val}${Math.floor(255 * 0.1).toString(16)}`},
        //                 [`.spotlight-border-${key}`]: {'--spotlight-border': `${val}${Math.floor(255 * 0.75).toString(16)}`}
        //             }), {})
        //     );
        // }),
    ],
} satisfies Config