import { Injectable } from '@angular/core';
import ScrollReveal from 'scrollreveal';

@Injectable({
  providedIn: 'root'
})
export class ScrollRevealService {

    private sr: scrollReveal.ScrollRevealObject = ScrollReveal();
    private animations: {[selector: string]: scrollReveal.ScrollRevealObjectOptions} = {
        '.reveal, .reveal-fade, .reveal-slide-up, .reveal-slide-right': {interval: 100},
        '.reveal': {afterReveal: this.cleanAnimation, scale: 0.85, opacity: 0},
        '.reveal-fade': {afterReveal: this.cleanAnimation, opacity: 0},
        '.reveal-slide-up': {afterReveal: this.cleanAnimation, distance: '80px', origin: 'bottom', opacity: 0},
        '.reveal-slide-right': {afterReveal: this.cleanAnimation, distance: '80px', origin: 'right', opacity: 0}
    }
    
    private prefersReducedMotion: boolean = matchMedia('(prefers-reduced-motion)').matches;

    private cleanAnimation (element: HTMLElement) {
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
        element.style.removeProperty('transition');
    }

    sync () {
        
        if(!this.prefersReducedMotion)
            Object.keys(this.animations).forEach(selector =>
                setTimeout(() => this.sr.reveal(selector, this.animations[selector]), 0)
            );
    }
}