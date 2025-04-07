import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export type Theme = undefined | "light" | "dark";

export default function useTheme() {

    const [theme, setTheme] = useState<Theme>(window.isDark() ? "dark" : "light");
    
    const [storedTheme, setStoredTheme, removeStoredTheme] = useLocalStorage<Theme>("theme", undefined, {
        serializer: value => `${value}`,
        deserializer: value => value as Theme,
    });

    const toggleTheme = () => {

        if(storedTheme === undefined && window.matchMedia("screen and (prefers-color-scheme: dark)").matches)
            setStoredTheme("light");
        else if(storedTheme === undefined && !window.matchMedia("screen and (prefers-color-scheme: dark)").matches)
            setStoredTheme("dark");
        else
            removeStoredTheme();

        window.applyTheme();
    }

    useEffect(() => { setTheme(storedTheme); }, [storedTheme]);

    return [theme, toggleTheme] as [typeof theme, typeof toggleTheme];
}