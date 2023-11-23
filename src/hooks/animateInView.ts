import { DOMKeyframesDefinition, animate } from 'framer-motion';
import {useEffect} from 'react';

export default function useAnimateInView(
    selector: string,
    variants: {
        initial?: DOMKeyframesDefinition,
        animate?: DOMKeyframesDefinition,
        exit?: DOMKeyframesDefinition
    } = {}
){
    useEffect(() => {
        
        const elements = document.body.querySelectorAll(selector) as NodeListOf<HTMLElement>;

        if(variants.initial) {
            animate(Array.from(elements).map(e => [e, variants.initial as DOMKeyframesDefinition, {at: 0, duration: 0}]));
            elements.forEach(e => e.style.visibility = 'visible');
        }
        
        const observer = new IntersectionObserver(entries => {

            const visibles = entries.filter(({isIntersecting}) => isIntersecting).map(({target}) => target);

            if(visibles.length > 0 && variants.animate)
                animate(visibles.map(e => [e, variants.animate as DOMKeyframesDefinition, {type: 'spring', duration: 0.75, at: '-0.7'}]));
        
        }, {threshold: 0.3});

        elements.forEach(e => observer.observe(e));

        return () => {
            elements.forEach(e => observer.unobserve(e));
        }
    });
}