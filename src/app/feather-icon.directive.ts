import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FeatherIconNames, icons } from 'feather-icons';

@Directive({
  selector: '[featherIcon]'
})
export class FeatherIconDirective implements OnChanges {

    @Input() featherIcon?: string;

    constructor(private elementRef: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
      
        const icon: FeatherIconNames = changes['featherIcon'].currentValue;

        if(icons[icon])
            this.elementRef.nativeElement.innerHTML = icons[icon].toSvg();
    }
}
