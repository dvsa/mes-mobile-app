import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { SetActivityCode } from '../../../../modules/tests/tests.actions';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { DEBRIEF_PAGE } from '../../../page-names.constants';

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
    this.navController.push(DEBRIEF_PAGE);
    this.store$.dispatch(new SetActivityCode(ActivityCodes.FAIL_EYESIGHT));
  }
}
