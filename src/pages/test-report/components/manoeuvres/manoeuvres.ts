import { Component, Input } from '@angular/core';
import { OverlayCallback } from '../../test-report';

@Component({
  selector: 'manoeuvres',
  templateUrl: 'manoeuvres.html',
})
export class ManoeuvresComponent {

  @Input()
  controlLabel: String;
  @Input()
  completed:boolean;

  @Input()
  clickCallback: OverlayCallback;
  displayPopover: boolean;

  constructor() {
    this.displayPopover = false;
  }

  togglePopoverDisplay(): void {
    this.displayPopover = !this.displayPopover;
    this.toggleOverlay();
  }
  toggleOverlay(): void {
    if (this.clickCallback) {
      this.clickCallback.callbackMethod();
    }
  }
  ngOnInit(): void {
  }
}
