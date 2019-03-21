import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { TestOutcomeStartTest } from './test-outcome.actions';
import { testActionForSlot } from '../../../../modules/test/test.reducer';

@Component({
  selector: 'test-outcome',
  templateUrl: 'test-outcome.html',
})
export class TestOutcomeComponent {
  @Input()
  slot: any;

  @Input()
  canStartTest: boolean;

  canSubmitTest: boolean = false;
  outcome: string;

  constructor(
    private store$: Store<StoreModel>,
    public navController: NavController,
  ) {}

  showOutcome(): boolean {
    return this.outcome !== undefined || this.outcome != null;
  }

  showStartTestButton(): boolean {
    return (this.outcome === undefined || this.outcome == null) && !this.canSubmitTest;
  }

  showSubmitTestButton(): boolean {
    return this.canSubmitTest;
  }

  startTest() {
    this.store$.dispatch(testActionForSlot('111', new TestOutcomeStartTest(this.slot)));
    this.navController.push('WaitingRoomPage');
  }
}
