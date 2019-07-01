import { Component, Input } from '@angular/core';
import { NavController, ModalController, Modal } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { StartTest, ActivateTest } from '../../journal.actions';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { StartE2EPracticeTest } from '../../../fake-journal/fake-journal.actions';
import { startsWith } from 'lodash';
import { end2endPracticeSlotId } from '../../../../shared/mocks/test-slot-ids.mock';
import { COMMUNICATION_PAGE, OFFICE_PAGE } from '../../../page-names.constants';
import { ModalEvent } from '../../journal-rekey-modal/journal-rekey-modal.constants';

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
  modal: Modal;

  constructor(
    private store$: Store<StoreModel>,
    public navController: NavController,
    private modalController: ModalController,
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
    // logic to show modal will be updated by Robert Hall as part of MES-2547
    this.showRekeyModal();
    if (startsWith(this.slotId.toString(), end2endPracticeSlotId)) {
      this.store$.dispatch(new StartE2EPracticeTest(this.slotId.toString()));
    } else {
      this.store$.dispatch(new StartTest(this.slotId));
    }
    this.navController.push(COMMUNICATION_PAGE);
  }

  writeUpTest() {
    this.store$.dispatch(new ActivateTest(this.slotId));
    this.navController.push(OFFICE_PAGE);
  }

  resumeTest() {
    this.store$.dispatch(new ActivateTest(this.slotId));
    this.navController.push(COMMUNICATION_PAGE);
  }

  needsWriteUp(): boolean {
    return this.testStatus === TestStatus.Decided;
  }

  showResumeTestButton(): boolean {
    return this.testStatus === TestStatus.Started;
  }

  showRekeyModal = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create('JournalRekeyModal', {}, options);
    this.modal.present();
  }

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.CANCEL:
        this.modal.dismiss();
        break;
      case ModalEvent.START:
        // todo: Logic to be impliment later
        break;
      case ModalEvent.REKEY:
        // todo: Logic to be impliment later
        break;
    }
  }
}
