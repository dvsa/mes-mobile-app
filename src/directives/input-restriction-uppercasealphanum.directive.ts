import { Directive, ElementRef, HostListener } from '@angular/core';
import { includes } from 'lodash';

@Directive({
  selector: '[uppercaseAlphanumOnly]',
})
export class InputRestrictionUppercaseAlphanumDirective {
  constructor(public el: ElementRef) {}

  // Allow usage of control keys aswell as numbers, useful for the browser
  controlKeys = ['ArrowRight', 'ArrowLeft', 'Backspace'];

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    let { key } = e;

    if (includes(this.controlKeys, key)) {
      return;
    }

    // Transform lowercase alphas to uppercase, dispatch a replacement event
    if (this.isLowerCase(key)) {
      e.preventDefault();
      key = key.toUpperCase();
      e.target['value'] += key;
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('input', false, true);
      e.target.dispatchEvent(evt);
      return;
    }

    if (!this.isUppercaseAlphanum(key)) {
      e.preventDefault();
    }
  }

  isLowerCase(key: string): boolean {
    return key >= 'a' && key <= 'z';
  }

  isNumeric(key: string): boolean {
    return key >= '0' && key <= '9';
  }

  isUppercaseAlphanum(key: string): boolean {
    return (key >= '0' && key <= '9') || (key >= 'A' && key <= 'Z');
  }
}
