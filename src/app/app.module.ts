import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FeatherIconDirective } from './feather-icon.directive';
import { DropdownTriggerForDirective } from './dropdown-trigger-for.directive';
import { LottieModule, LottieCacheModule } from 'ngx-lottie';
import lottieWeb from 'lottie-web/build/player/lottie_svg';
import { LottieHoverInteractivityDirective } from './lottie-hover-interactivity.directive';


declare global {
    interface Number {
        clamp(min: number, max: number): number
        percentBetween(min: number, max: number, inverted?: boolean): number
    }
}

Object.defineProperties(Number.prototype, {
    clamp: {
        enumerable: false,
        value: function (min: number, max: number): number {
            return Math.min(max, Math.max(min, this));
        }
    },
    percentBetween: {
        enumerable: false,
        value: function (min: number, max: number, inverted: boolean = false): number {
            return min + ((max - min) / 100 * (inverted ? 100 - this : this));
        }
    }
});

export function player () { return lottieWeb; };

@NgModule({
  declarations: [
    AppComponent,
    FeatherIconDirective,
    DropdownTriggerForDirective,
    LottieHoverInteractivityDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule.withConfig({
        disableAnimations: matchMedia('print').matches || matchMedia('(prefers-reduced-motion)').matches
    }),
    LottieModule.forRoot({player}),
    LottieCacheModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
