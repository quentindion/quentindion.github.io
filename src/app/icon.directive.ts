import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { FeatherIconNames, icons } from 'feather-icons';

@Directive({
  selector: 'i'
})
export class IconDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {

        const icon: FeatherIconNames = this.elementRef.nativeElement.innerHTML.trim();

        if(icons[icon])
            this.elementRef.nativeElement.innerHTML = icons[icon].toSvg();
    }
}
