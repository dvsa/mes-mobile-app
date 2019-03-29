import { Component, Input } from '@angular/core';
import { OverlayCallback } from '../../test-report';

@Component({
  selector: 'competency-with-modal',
  templateUrl: 'competency-with-modal.html',
})
export class CompetencyWithModalComponent {

  @Input()
  controlLabel: String;

  @Input()
  clickCallback: OverlayCallback;

  displayPopover: boolean;
  constructor() {
    this.displayPopover = false;
  }

  togglePromote() {
    this.displayPopover = !this.displayPopover;
    this.toggleOverlay();
  }
  toggleOverlay() {
    if (this.clickCallback) {
      this.clickCallback.callbackMethod();
    }
  }
  ngOnInit(): void {
  }
}
