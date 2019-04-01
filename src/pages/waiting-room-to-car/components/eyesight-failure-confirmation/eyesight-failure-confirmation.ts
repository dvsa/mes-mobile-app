import { Component, Input } from '@angular/core';

@Component({
  selector: 'eyesight-failure-confirmation',
  templateUrl: 'eyesight-failure-confirmation.html',
})
export class EyesightFailureConfirmationComponent {
  constructor() {}

  @Input()
  cancelFn: Function;

  onCancel(): void {
    this.cancelFn();
  }
}
