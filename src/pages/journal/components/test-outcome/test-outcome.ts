import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { StartTest } from '../../journal.actions';

@Component({
  selector: 'test-outcome',
  templateUrl: 'test-outcome.html',
})
export class TestOutcomeComponent {

  @Input()
  slotId: number;

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
    this.store$.dispatch(new StartTest(this.slotId));
    this.navController.push('WaitingRoomPage');
  }
}
