import { Directive, ElementRef, HostListener, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AnimationTriggerMetadata, animate, group, query, stagger, style, transition, trigger } from "@angular/animations";

export const panelAnimation: AnimationTriggerMetadata = trigger('panel', [
    transition(':enter', [
        group([
            style({opacity: 0, transform: 'scale(0.8)'}),
            animate('120ms cubic-bezier(0, 0, .2, 1)', style({opacity: 1, transform: 'scale(1)'})),
            query('li', [
                style({opacity: 0, transform: 'translateY(25%)'}),
                stagger(50, [
                    animate('500ms 25ms cubic-bezier(.35, 0, .25, 1)',
                    style({ opacity: 1, transform: 'none' }))
                ])
            ])
        ])
    ]),
    transition(':leave', [
        animate('100ms 25ms linear', style({opacity: 0}))
    ])
]);

@Directive({
  selector: '[dropdownTriggerFor]'
})
export class DropdownTriggerForDirective implements OnDestroy {

    private overlayRef!: OverlayRef;

    @HostListener('click') onClick () {
        this.open();
    }

    @Input() dropdownTriggerFor!: TemplateRef<HTMLElement>;

    constructor(private overlay: Overlay,
                private elementRef: ElementRef<HTMLElement>,
                private viewContainerRef: ViewContainerRef) { }

    open (): void {

        if(!this.overlayRef || !this.overlayRef.hasAttached()) {

            const positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(this.elementRef)
                .withPositions([{
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top'
                }]);

            const scrollStrategy = this.overlay.scrollStrategies.close();

            this.overlayRef = this.overlay.create({
                scrollStrategy,
                positionStrategy, 
                hasBackdrop: true,
                backdropClass: 'cdk-overlay-transparent-backdrop'
            });

            this.overlayRef.attach(
                new TemplatePortal(this.dropdownTriggerFor, this.viewContainerRef)
            );

            this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
            this.overlayRef.overlayElement.addEventListener('click', () => this.overlayRef.detach());
        }
    }

    ngOnDestroy(): void {
        
        if(this.overlayRef && this.overlayRef.hasAttached())
            this.overlayRef.detach();
    }
}
