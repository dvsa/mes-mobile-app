import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { StartTest, ActivateTest } from '../../journal.actions';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { StartE2EPracticeTest } from '../../../fake-journal/fake-journal.actions';
import { startsWith } from 'lodash';
import { end2endPracticeSlotId } from '../../../../shared/mocks/test-slot-ids.mock';

@Component({
  selector: 'test-outcome',
  templateUrl: 'test-outcome.html',
})
export class TestOutcomeComponent {

  @Input()
  slotId: number;

  @Input()
  canStartTest: boolean;

  @Input()
  testStatus: TestStatus;

  canSubmitTest: boolean = false;
  outcome: string;

  constructor(
    private store$: Store<StoreModel>,
    public navController: NavController,
  ) { }

  showOutcome(): boolean {
    return this.outcome !== undefined || this.outcome != null;
  }

  showStartTestButton(): boolean {
    return this.testStatus === TestStatus.Booked;
  }

  showSubmitTestButton(): boolean {
    return this.canSubmitTest;
  }

  startTest() {
    if (startsWith(this.slotId.toString(), end2endPracticeSlotId)) {
      this.store$.dispatch(new StartE2EPracticeTest(this.slotId.toString()));
    } else {
      this.store$.dispatch(new StartTest(this.slotId));
    }
    this.navController.push('CommunicationPage');
  }

  writeUpTest() {
    this.store$.dispatch(new ActivateTest(this.slotId));
    this.navController.push('OfficePage');
  }

  resumeTest() {
    this.store$.dispatch(new ActivateTest(this.slotId));
    this.navController.push('CommunicationPage');
  }

  needsWriteUp(): boolean {
    return this.testStatus === TestStatus.Decided;
  }

  showResumeTestButton(): boolean {
    return this.testStatus === TestStatus.Started;
  }
}
