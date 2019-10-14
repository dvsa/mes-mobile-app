import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, ModalController, Modal } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { StartTest, ActivateTest } from '../../../modules/tests/tests.actions';
import { ResumingWriteUp } from '../../../modules/journal/journal.actions';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
import { StartE2EPracticeTest } from '../../../pages/fake-journal/fake-journal.actions';
import { startsWith, isEmpty } from 'lodash';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { JOURNAL_FORCE_CHECK_MODAL, CAT_B } from '../../../pages/page-names.constants';
import { ModalEvent } from '../../../pages/journal/journal-rekey-modal/journal-rekey-modal.constants';
import { DateTime, Duration } from '../../../shared/helpers/date-time';
import { SlotDetail, TestSlot } from '@dvsa/mes-journal-schema';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/B';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../../../shared/models/store.model';
import { getRekeySearchState } from '../../../pages/rekey-search/rekey-search.reducer';
import { getBookedTestSlot } from '../../../pages/rekey-search/rekey-search.selector';
import { merge } from 'rxjs/observable/merge';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { MarkAsNonRekey } from '../../../modules/tests/rekey/rekey.actions';

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

  @Input()
  isRekey: boolean;

  modal: Modal;
  startTestAsRekey: boolean = false;
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
    const bookedTestSlot$ = this.store$.pipe(
      select(getRekeySearchState),
      map(getBookedTestSlot),
    );

    const merged$ = merge(
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
    if (this.testStatus === TestStatus.Completed || this.testStatus === TestStatus.Submitted) {
      return false; // because the test is complete
    }

    if (this.isTestSlotOnRekeySearch) {
      return true; // because the test is incomplete AND this is the rekey search
    }

    if (this.isRekey && this.isDateInPast()) {
      return true; // because the test is incomplete AND this is not the rekey search...
      // ...AND it was started as a rekey AND the test date is in the past
    }

    // the test is incomplete AND this is not the rekey search AND it was not started as a rekey
    if (this.isDateInPast() && (this.testStatus === null || this.testStatus === TestStatus.Booked)) {
      return true; // because the test date is in the past AND it has never been seen OR started
    }
    return false;
  }

  showStartTestButton(): boolean {
    return this.testStatus === TestStatus.Booked;
  }

  showResumeButton(): boolean {
    return this.testStatus === TestStatus.Started || this.testStatus === TestStatus.Decided;
  }

  showWriteUpButton(): boolean {
    return this.testStatus === TestStatus.WriteUp || this.testStatus === TestStatus.Autosaved;
  }

  writeUpTest() {
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId));
    this.store$.dispatch(new ResumingWriteUp(this.slotDetail.slotId.toString()));
    this.navController.push(CAT_B.OFFICE_PAGE);
  }

  resumeTest() {
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId));
    if (this.testStatus === TestStatus.Started) {
      this.navController.push(CAT_B.WAITING_ROOM_PAGE);
    } else if (this.activityCode === ActivityCodes.PASS) {
      this.navController.push(CAT_B.PASS_FINALISATION_PAGE);
    } else {
      this.navController.push(CAT_B.NON_PASS_FINALISATION_PAGE);
    }
  }

  startTest() {
    if (this.isE2EPracticeMode()) {
      this.store$.dispatch(new StartE2EPracticeTest(this.slotDetail.slotId.toString()));
    } else {
      this.store$.dispatch(new StartTest(this.slotDetail.slotId, this.startTestAsRekey || this.isRekey));
    }
    this.navController.push(CAT_B.WAITING_ROOM_PAGE);
  }

  rekeyTest() {
    if (this.testStatus === null || this.testStatus === TestStatus.Booked) {
      this.store$.dispatch(new StartTest(this.slotDetail.slotId, true));
    } else {
      this.store$.dispatch(new ActivateTest(this.slotDetail.slotId, true));
    }
    this.navController.push(CAT_B.WAITING_ROOM_PAGE);
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
        this.startTestAsRekey = false;
        this.isRekey = false;
        if (this.testStatus !== null) {
          this.store$.dispatch(new MarkAsNonRekey());
        }
        this.startOrResumeTestDependingOnStatus();
        break;
      case ModalEvent.REKEY:
        this.startTestAsRekey = true;
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
    const cutOffTime = new DateTime(this.slotDetail.start).add(10, Duration.MINUTE);
    return new DateTime() > cutOffTime;
  }

  startOrResumeTestDependingOnStatus() {
    if (this.testStatus === TestStatus.Booked) {
      this.startTest();
    } else {
      this.resumeTest();
    }
  }
}
