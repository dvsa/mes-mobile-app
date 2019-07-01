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
import { MarkAsRekey } from '../../../../modules/tests/tests.actions';

@Component({
  selector: 'test-outcome',
  templateUrl: 'test-outcome.html',
})
export class TestOutcomeComponent {

  @Input()
  slotDetail: any;

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

  writeUpTest() {
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId));
    this.navController.push(OFFICE_PAGE);
  }

  resumeTest() {
    if (this.showRekeyModal()) {
      this.displayRekeyModal();
    } else {
      this.startTest(false);
    }
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId));
    this.navController.push(COMMUNICATION_PAGE);
  }

  needsWriteUp(): boolean {
    return this.testStatus === TestStatus.Decided;
  }

  showResumeTestButton(): boolean {
    return this.testStatus === TestStatus.Started;
  }

  displayRekeyModal = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create('JournalRekeyModal', {}, options);
    this.modal.onDidDismiss(this.onModalDismiss);
    this.modal.present();
  }

  startTest(rekey: boolean) {
    this.store$.dispatch(new StartTest(this.slotDetail.slotId));
    if (rekey) {
      this.store$.dispatch(new MarkAsRekey(this.slotDetail.slotId));
    }
    this.navController.push(COMMUNICATION_PAGE);
  }

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.CANCEL:
        this.modal.dismiss();
        break;
      case ModalEvent.START:
        this.startTest(false);
        break;
      case ModalEvent.REKEY:
        this.startTest(true);
        break;
    }
  }

  rekeyTest() {
    if (this.testStatus === TestStatus.Booked) {
      this.startTest(true);
    } else if (this.testStatus === TestStatus.Started) {
      this.store$.dispatch(new MarkAsRekey(this.slotDetail.slotId));
      this.resumeTest();
    } else if (this.testStatus === TestStatus.Decided) {
      this.writeUpTest();
    }
  }

  showRekeyModal(): boolean {
    const cutOffTime = new Date(this.slotDetail.start);
    cutOffTime.setMinutes(cutOffTime.getMinutes() + this.slotDetail.duration);
    const todaysDateTime = new Date();
    if (todaysDateTime > cutOffTime) {
      return true;
    }
    return false;
  }

  showRekeyButton(): boolean {
    if (
      this.testStatus === TestStatus.Completed ||
      this.testStatus === TestStatus.Decided ||
      this.testStatus === TestStatus.Submitted
    ) {
      return false;
    }
    const testDate = new Date(this.slotDetail.start).setUTCHours(0, 0, 0, 0);
    const todaysDate = new Date().setUTCHours(0, 0, 0, 0);
    if (testDate < todaysDate) {
      return true;
    }
    return false;
  }

  clickStartTest() {
    if (startsWith(this.slotDetail.slotId.toString(), end2endPracticeSlotId)) {
      this.store$.dispatch(new StartE2EPracticeTest(this.slotDetail.slotId.toString()));
    } else {
      if (this.showRekeyModal()) {
        this.displayRekeyModal();
      } else {
        this.startTest(false);
      }
    }
  }
}
