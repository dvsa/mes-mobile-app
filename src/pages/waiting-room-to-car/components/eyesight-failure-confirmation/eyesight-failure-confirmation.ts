import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { SetActivityCode } from '../../../../modules/tests/activity-code/activity-code.actions';

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

  @Input()
  nextPageOnFail: string;

  onCancel(): void {
    this.cancelFn();
  }

  onContinue(): void {
    this.navController.push(this.nextPageOnFail);
    this.store$.dispatch(new SetActivityCode(ActivityCodes.FAIL_EYESIGHT));
  }
}
