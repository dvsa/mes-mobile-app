import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, ModalController, Modal } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { StartTest, ActivateTest } from '../../../modules/tests/tests.actions';
import { ResumingWriteUp } from '../../../pages/journal/journal.actions';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
import { StartE2EPracticeTest } from '../../../pages/fake-journal/fake-journal.actions';
import { startsWith, isEmpty } from 'lodash';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import {
  WAITING_ROOM_PAGE,
  OFFICE_PAGE,
  PASS_FINALISATION_PAGE,
  JOURNAL_FORCE_CHECK_MODAL,
  NON_PASS_FINALISATION_PAGE,
} from '../../../pages/page-names.constants';
import { ModalEvent } from '../../../pages/journal/journal-rekey-modal/journal-rekey-modal.constants';
import { DateTime, Duration } from '../../../shared/helpers/date-time';
import { SlotDetail, TestSlot } from '@dvsa/mes-journal-schema';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/B';
// import { getCheckComplete } from '../../../pages/journal/journal.selector';
// import { getJournalState } from '../../../pages/journal/journal.reducer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../../../shared/models/store.model';
import { getRekeySearchState } from '../../../pages/rekey-search/rekey-search.reducer';
import { getBookedTestSlot } from '../../../pages/rekey-search/rekey-search.selector';
import { merge } from 'rxjs/observable/merge';
import { ActivityCodes } from '../../../shared/models/activity-codes';

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

  @Input()
  hasSeenCandidateDetails: boolean;

  modal: Modal;
  isRekey: boolean = false;
  isTestSlotOnRekeySearch: boolean = false;

  candidateDetailsViewed: boolean;
  subscription: Subscription;
  seenCandidateDetails$: Observable<boolean>;

  constructor(
    private store$: Store<StoreModel>,
    public navController: NavController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    // const seenCandidateDetails$ = this.store$.pipe(
    //   select(getJournalState),
    //   map(journalData => getCheckComplete(journalData, this.slotDetail.slotId)),
    // );

    const bookedTestSlot$ = this.store$.pipe(
      select(getRekeySearchState),
      map(getBookedTestSlot),
    );

    const merged$ = merge(
      // seenCandidateDetails$.pipe(
      //   map(candidateDetails => this.candidateDetailsViewed = candidateDetails),
      // ),
      bookedTestSlot$.pipe(
        map((testSlot: TestSlot) => {
          if (isEmpty(testSlot)) {
            this.isTestSlotOnRekeySearch = false;
            return;
          }

          if (testSlot.slotDetail.slotId === this.slotDetail.slotId) {
            this.isTestSlotOnRekeySearch = true;
          }
        }),
      ),
    );

    this.subscription = merged$.subscribe();
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
    return this.isTestIncomplete() && this.isDateInPast() || this.isTestSlotOnRekeySearch;
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
    if (this.activityCode === ActivityCodes.PASS) {
      this.navController.push(PASS_FINALISATION_PAGE);
    } else {
      this.navController.push(NON_PASS_FINALISATION_PAGE);
    }
  }

  resumeTest() {
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId, this.isRekey));
    this.navController.push(WAITING_ROOM_PAGE);
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
    this.navController.push(WAITING_ROOM_PAGE);
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
    if (this.specialRequirements && !this.hasSeenCandidateDetails) {
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
