import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'eyesight-failure-confirmation',
  templateUrl: 'eyesight-failure-confirmation.html',
})
export class EyesightFailureConfirmationComponent {
  constructor(public navController: NavController) { }

  @Input()
  cancelFn: Function;

  onCancel(): void {
    this.cancelFn();
  }

  onContinue(): void {
    this.navController.push('DebriefPage', { outcome: 'fail' });
  }
}
