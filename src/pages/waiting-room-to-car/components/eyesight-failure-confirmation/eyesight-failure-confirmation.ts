import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { SetActivityCode } from '../../../../modules/tests/tests.actions';

@Component({
  selector: 'eyesight-failure-confirmation',
  templateUrl: 'eyesight-failure-confirmation.html',
})
export class EyesightFailureConfirmationComponent {
  constructor(
    public navController: NavController,
    private store$: Store<StoreModel>,
  ) { }

  @Input()
  cancelFn: Function;

  onCancel(): void {
    this.cancelFn();
  }

  onContinue(): void {
    this.navController.push('DebriefPage');
    this.store$.dispatch(new SetActivityCode('3'));
  }
}
