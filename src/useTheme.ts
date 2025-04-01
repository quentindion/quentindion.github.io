import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export type Theme = undefined | "light" | "dark";

export default function useTheme() {
    
    const [themeState, setThemeState] = useState<Theme>();
    const [storedTheme, setStoredTheme, removeStoredTheme] = useLocalStorage<Theme>("theme", undefined, {
        serializer: value => `${value}`,
        deserializer: value => value as Theme,
    });

    const detectTheme = (): Theme => (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) ? "dark" : "light";

    const toggleTheme = () => {
        if(storedTheme === undefined && window.matchMedia("screen and (prefers-color-scheme: dark)").matches)
            setStoredTheme("light");
        else if(storedTheme === undefined && !window.matchMedia("screen and (prefers-color-scheme: dark)").matches)
            setStoredTheme("dark");
        else
            removeStoredTheme();

        window.applyTheme();
    }

    useEffect(() => { setThemeState(storedTheme); }, [storedTheme]);
    useEffect(() => { setThemeState(detectTheme()); }, []);

    return [themeState, toggleTheme] as [typeof themeState, typeof toggleTheme];
}