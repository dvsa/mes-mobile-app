import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[uppercaseAlphanumOnly]',
})
export class InputRestrictionUppercaseAlphanumDirective {
  constructor(public ref: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event) {
    this.ref.nativeElement.value = event.target.value
      .replace(/[^\w\s]/gi, '')
      .trim()
      .toUpperCase();
  }
}
