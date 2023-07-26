import { Directive, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { LottieComponent } from 'ngx-lottie';
import { Observable } from 'rxjs';

@Directive({
  selector: '[hoverInteractivityTrigger]'
})
export class LottieHoverInteractivityDirective implements OnInit, OnDestroy {

    @Input() hoverInteractivityTrigger?: HTMLElement;

    @AutoUnsubscribe()
    private animationCreated: Observable<AnimationItem> = this.lottie.animationCreated;
    private animationItem?: AnimationItem;

    private triggerMouseEnterUnsubscribe?: () => void;
    private triggerMouseLeaveUnsubscribe?: () => void;

    constructor(private renderer: Renderer2,
                private lottie: LottieComponent) {

        this.animationCreated.subscribe(item => {

            item.loop = false;
            item.autoplay = false;

            this.animationItem = item;
        });
    }

    ngOnInit(): void {
    
        this.triggerMouseEnterUnsubscribe = this.renderer.listen(this.hoverInteractivityTrigger, 'mouseenter', () => {

            this.animationItem?.setDirection(1);
            this.animationItem?.play();
        });

        this.triggerMouseLeaveUnsubscribe = this.renderer.listen(this.hoverInteractivityTrigger, 'mouseleave', () => {

            this.animationItem?.setDirection(-1);
            this.animationItem?.play();
        });

    }

    ngOnDestroy(): void {

        if(this.triggerMouseEnterUnsubscribe)
            this.triggerMouseEnterUnsubscribe();

        if(this.triggerMouseLeaveUnsubscribe)
            this.triggerMouseLeaveUnsubscribe();
    }
}
