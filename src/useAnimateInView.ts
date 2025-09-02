import { useEffect } from 'react';
import { DOMKeyframesDefinition, animate } from 'framer-motion';

export default function useAnimateInView(
    variants: Record<string, {
        initial: DOMKeyframesDefinition,
        animate: DOMKeyframesDefinition,
        exit?: DOMKeyframesDefinition
    }>
){
    useEffect(() => {

        const vw = window.innerWidth || document.documentElement.clientWidth;
        const vh = window.innerHeight || document.documentElement.clientHeight;

        const findElements = () =>
            Object.keys(variants)
                .map(selector => Array.from(document.body.querySelectorAll<HTMLElement>(`${selector}:not(.in-view)`)).map(element => ({selector, element})))
                .flat()
                .sort((a, b) => (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_PRECEDING) ? 1 : -1);

        const onScroll = () => {
            
            const elements = findElements();

            const visibles = elements.filter(({element}) => {
                const {top, left, bottom, right} = element.getBoundingClientRect();
                return (top >= 0) && (left >= 0) && (bottom <= vh) && (right <= vw);
            });

            if(visibles.length > 0) {
                visibles.forEach(({element}) => element.classList.add("in-view"));
                animate(visibles.map(({element, selector}) => [element, variants[selector].animate, {type: "spring", duration: 0.75, at: "-0.70"}]));
            }

            if(elements.length === 0)
                document.removeEventListener("scroll", onScroll, false);
        }

        const elements = findElements();

        if(elements.length > 0) {
            animate(elements.map(({element, selector}) => [element, variants[selector].initial, {at: 0, duration: 0}]));
            elements.forEach(({element}) => element.style.visibility = "visible");
        }

        requestAnimationFrame(() => onScroll());

        document.addEventListener("scroll", onScroll, {passive: true});

        return () => { document.removeEventListener("scroll", onScroll, false); }
    }, [variants]);
}