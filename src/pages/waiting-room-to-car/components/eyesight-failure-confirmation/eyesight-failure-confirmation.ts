import { Component, Input } from '@angular/core';

@Component({
  selector: 'eyesight-failure-confirmation',
  templateUrl: 'eyesight-failure-confirmation.html',
})
export class EyesightFailureConfirmationComponent {
  constructor() {}

  @Input()
  confirmFn: Function;

  @Input()
  cancelFn: Function;

  onConfirm(): void {
    this.confirmFn();
  }

  onCancel(): void {
    this.cancelFn();
  }
}
