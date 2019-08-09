import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, ModalController, Modal } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { StartTest, ActivateTest, ResumingWriteUp } from '../../../pages/journal/journal.actions';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
import { StartE2EPracticeTest } from '../../../pages/fake-journal/fake-journal.actions';
import { startsWith } from 'lodash';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import {
  COMMUNICATION_PAGE,
  OFFICE_PAGE,
  PASS_FINALISATION_PAGE,
  JOURNAL_FORCE_CHECK_MODAL,
} from '../../../pages/page-names.constants';
import { ModalEvent } from '../../../pages/journal/journal-rekey-modal/journal-rekey-modal.constants';
import { DateTime, Duration } from '../../../shared/helpers/date-time';
import { SlotDetail } from '@dvsa/mes-journal-schema';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/B';
import { getCheckComplete } from '../../../pages/journal/journal.selector';
import { getJournalState } from '../../../pages/journal/journal.reducer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../../../shared/models/store.model';

@Component({
  selector: 'test-outcome',
  templateUrl: 'test-outcome.html',
})
export class TestOutcomeComponent implements OnInit {

  @Input()
  slotDetail: SlotDetail;

  @Input()
  canStartTest: boolean;

  @Input()
  testStatus: TestStatus;

  @Input()
  activityCode: ActivityCode;

  @Input()
  specialRequirements: boolean;

  modal: Modal;
  isRekey: boolean = false;

  candidateDetailsViewed: boolean;
  subscription: Subscription;
  seenCandidateDetails$: Observable<boolean>;

  constructor(
    private store$: Store<StoreModel>,
    public navController: NavController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    const seenCandidateDetails$ = this.store$.pipe(
      select(getJournalState),
      map(journalData => getCheckComplete(journalData, this.slotDetail.slotId)),
    );

    this.subscription = seenCandidateDetails$.subscribe(
      (candidateDetails: boolean) => {
        this.candidateDetailsViewed = candidateDetails;
      });
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showOutcome(): boolean {
    return [TestStatus.Completed, TestStatus.Submitted].includes(this.testStatus);
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
    return this.testStatus === TestStatus.WriteUp;
  }

  writeUpTest() {
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId));
    this.store$.dispatch(new ResumingWriteUp(this.slotDetail.slotId.toString()));
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

  displayForceCheckModal = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create(JOURNAL_FORCE_CHECK_MODAL, {}, options);
    this.modal.onDidDismiss(this.onModalDismiss);
    this.modal.present();
  }

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
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
    if (this.specialRequirements && !this.candidateDetailsViewed) {
      this.displayForceCheckModal();
      return;
    }
    if (this.shouldDisplayRekeyModal() && !this.isE2EPracticeMode()) {
      this.displayRekeyModal();
      return;
    }
    this.startOrResumeTestDependingOnStatus();
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
