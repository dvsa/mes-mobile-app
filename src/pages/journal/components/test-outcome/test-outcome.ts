import { Component, Input } from '@angular/core';
import { NavController, ModalController, Modal } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { StartTest, ActivateTest } from '../../journal.actions';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { StartE2EPracticeTest } from '../../../fake-journal/fake-journal.actions';
import { startsWith } from 'lodash';
import { end2endPracticeSlotId } from '../../../../shared/mocks/test-slot-ids.mock';
import { COMMUNICATION_PAGE, OFFICE_PAGE, PASS_FINALISATION_PAGE } from '../../../page-names.constants';
import { ModalEvent } from '../../journal-rekey-modal/journal-rekey-modal.constants';
import { DateTime, Duration } from '../../../../shared/helpers/date-time';

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

  outcome: string;
  modal: Modal;
  isRekey: boolean = false;

  constructor(
    private store$: Store<StoreModel>,
    public navController: NavController,
    private modalController: ModalController,
  ) { }

  showOutcome(): boolean {
    return this.outcome !== undefined || this.outcome != null;
  }

  showRekeyButton(): boolean {
    return this.isTestIncomplete() && this.isDateInPast();
  }

  showStartTestButton(): boolean {
    return this.testStatus === TestStatus.Booked;
  }

  showResumeTestButton(): boolean {
    return this.testStatus === TestStatus.Started;
  }

  showWriteUpButton(): boolean {
    return this.testStatus === TestStatus.Decided;
  }

  writeUpTest() {
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId));
    this.navController.push(OFFICE_PAGE);
  }

  debriefTest() {
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId));
    this.navController.push(PASS_FINALISATION_PAGE);
  }

  resumeTest() {
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId, this.isRekey));
    this.navController.push(COMMUNICATION_PAGE);
  }

  needsDebrief(): boolean {
    return this.testStatus === TestStatus.Decided;
  }

  needsWriteUp(): boolean {
    return this.testStatus === TestStatus.WriteUp;
  }

  startTest() {
    if (this.isE2EPracticeMode() && this.testStatus === TestStatus.Booked) {
      this.store$.dispatch(new StartE2EPracticeTest(this.slotDetail.slotId.toString()));
    } else {
      this.store$.dispatch(new StartTest(this.slotDetail.slotId, this.isRekey));
    }
    this.navController.push(COMMUNICATION_PAGE);
  }

  rekeyTest() {
    this.isRekey = true;
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId, this.isRekey));
    this.startOrResumeTestDependingOnStatus();
  }

  displayRekeyModal = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create('JournalRekeyModal', {}, options);
    this.modal.onDidDismiss(this.onModalDismiss);
    this.modal.present();
  }

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.CANCEL:
        this.modal.dismiss();
        break;
      case ModalEvent.START:
        this.startOrResumeTestDependingOnStatus();
        break;
      case ModalEvent.REKEY:
        this.isRekey = true;
        this.startOrResumeTestDependingOnStatus();
        break;
    }
  }

  shouldDisplayRekeyModal(): boolean {
    return this.isTestIncomplete() && this.isTodaysDate() && this.hasTestTimeFinished();
  }

  clickStartOrResumeTest() {
    if (this.shouldDisplayRekeyModal() && !this.isE2EPracticeMode()) {
      this.displayRekeyModal();
    } else {
      this.startOrResumeTestDependingOnStatus();
    }
  }

  isE2EPracticeMode(): boolean {
    return startsWith(this.slotDetail.slotId.toString(), end2endPracticeSlotId);
  }

  isDateInPast() {
    return new DateTime().daysDiff(this.slotDetail.start) < 0;
  }

  isTodaysDate() {
    return new DateTime().daysDiff(this.slotDetail.start) === 0;
  }

  isTestIncomplete(): boolean {
    return [TestStatus.Booked, TestStatus.Started, TestStatus.Decided].includes(this.testStatus);
  }

  hasTestTimeFinished(): boolean {
    const cutOffTime = new DateTime(this.slotDetail.start).add(this.slotDetail.duration, Duration.MINUTE);
    return new DateTime() > cutOffTime;
  }

  startOrResumeTestDependingOnStatus() {
    if (this.testStatus === TestStatus.Booked) {
      this.startTest();
    } else if (this.testStatus === TestStatus.Started) {
      this.resumeTest();
    }
  }
}
