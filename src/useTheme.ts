import { useState } from "react";

export type Theme = undefined | "light" | "dark";

export default function useTheme() {

    const [theme, setTheme] = useState<Theme>(window.isDarkMode() ? "dark" : "light");

    const toggleTheme = () => {

        const storedTheme = (localStorage.getItem("theme") ?? undefined) as Theme;

        if(storedTheme === undefined && window.matchMedia("screen and (prefers-color-scheme: dark)").matches) {
            localStorage.setItem("theme", "light");
            setTheme("light");
        } else if(storedTheme === undefined && !window.matchMedia("screen and (prefers-color-scheme: dark)").matches) {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            localStorage.removeItem("theme");
            setTheme(undefined);
        }

        console.log(
            localStorage.getItem("theme")
        )

        window.applyTheme();
    }

    return [theme, toggleTheme] as [typeof theme, typeof toggleTheme];
}