import { useEffect, useRef, useState } from 'react';
import { DOMKeyframesDefinition, animate } from 'framer-motion';
import { useLocalStorage } from "usehooks-ts";

export type Theme = undefined | "light" | "dark";

export function useTheme() {

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

export function useAnimateInView(
    variants: Record<string, {
        initial: DOMKeyframesDefinition,
        animate: DOMKeyframesDefinition,
        exit?: DOMKeyframesDefinition
    }>
) {
    const queueRef = useRef<{element: HTMLElement; selector: string, index: number}[]>([]);
    const isFlushingRef = useRef(false);

    useEffect(() => {
        const elements = Object.keys(variants)
            .flatMap(selector =>
                Array.from(document.querySelectorAll<HTMLElement>(selector))
                    .map(element => ({ element, selector }))
            )
            .sort((a, b) => a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1)
            .map((item, index) => ({ ...item, index }));;

        if (elements.length === 0)
            return;

        animate(elements.map(({ element, selector }) => [element, variants[selector].initial, { duration: 0 }]));

        elements.forEach(({ element }) => {
            element.style.visibility = "visible";
        });

        const flushQueue = () => {
            if (isFlushingRef.current)
                return;
            
            isFlushingRef.current = true;

            const run = () => {
                const queue = queueRef.current;

                if (queue.length === 0) {
                    isFlushingRef.current = false;
                    return;
                }

                queue.sort((a, b) => a.index - b.index);

                const item = queue.shift();

                if (!item)
                    return;

                animate([
                    [
                        item.element,
                        variants[item.selector].animate,
                        {
                            type: "spring",
                            duration: 0.75
                        }
                    ]
                ]);

                setTimeout(run, 60);
            };
            run();
        };

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    const element = entry.target as HTMLElement;

                    const item = elements.find(e => e.element === element);

                    if (!item)
                        return;

                    element.classList.remove(item.selector.slice(1));

                    queueRef.current.push(item);

                    observer.unobserve(element);
                });

                flushQueue();
            },
            {
                threshold: 1
            }
        );

        elements.forEach(({ element }) => observer.observe(element));

        return () => {
            observer.disconnect();
            queueRef.current = [];
        }
    }, [variants]);
}