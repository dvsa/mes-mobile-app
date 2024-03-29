import { merge, Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Modal, ModalController, NavController } from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { ActivateTest, StartTest } from '../../../modules/tests/tests.actions';
import { EarlyStartModalDidEnter, ResumingWriteUp } from '../../../modules/journal/journal.actions';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
import { StartE2EPracticeTest } from '../../../pages/fake-journal/fake-journal.actions';
import { isEmpty, startsWith } from 'lodash';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import {
  CAT_A_MOD1,
  CAT_A_MOD2,
  CAT_ADI_PART2,
  CAT_B,
  CAT_BE,
  CAT_C,
  CAT_CPC,
  CAT_D,
  CAT_HOME_TEST,
  CAT_MANOEUVRES,
  JOURNAL_EARLY_START_MODAL,
  JOURNAL_FORCE_CHECK_MODAL,
} from '../../../pages/page-names.constants';
import { ModalEvent } from '../../../pages/journal/journal-rekey-modal/journal-rekey-modal.constants';
import {
  ModalEvent as EarlyStartModalEvent,
} from '../../../pages/journal/components/journal-early-start-modal/journal-early-start-modal.constants';
import { DateTime, Duration } from '../../../shared/helpers/date-time';
import { SlotDetail, TestSlot } from '@dvsa/mes-journal-schema';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';
import { map } from 'rxjs/operators';
import { StoreModel } from '../../../shared/models/store.model';
import { getRekeySearchState } from '../../../pages/rekey-search/rekey-search.reducer';
import { getBookedTestSlot } from '../../../pages/rekey-search/rekey-search.selector';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { MarkAsNonRekey } from '../../../modules/tests/rekey/rekey.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { SetExaminerConducted } from '../../../modules/tests/examiner-conducted/examiner-conducted.actions';
import { SetExaminerBooked } from '../../../modules/tests/examiner-booked/examiner-booked.actions';

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

  @Input()
  isDelegatedTest: boolean = false;

  @Input()
  examinerId: number;

  @Input()
  category: TestCategory;

  @Input()
  catDisabled: boolean;

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
  ) {
  }

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

    if (this.isDelegatedTest) {
      return false;
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
    return !this.isDelegatedTest && (this.testStatus === TestStatus.Booked);
  }

  showDelegatedExaminerRekeyButton(): boolean {
    return this.isDelegatedTest && !this.showResumeButton();
  }

  showResumeButton(): boolean {
    return this.testStatus === TestStatus.Started || this.testStatus === TestStatus.Decided;
  }

  showWriteUpButton(): boolean {
    return this.testStatus === TestStatus.WriteUp || this.testStatus === TestStatus.Autosaved;
  }

  writeUpTest() {
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId, this.category));
    this.store$.dispatch(new ResumingWriteUp(this.slotDetail.slotId.toString()));
    this.navController.push(this.getOfficePage());
  }

  resumeTest() {
    this.store$.dispatch(new ActivateTest(this.slotDetail.slotId, this.category));
    if (this.testStatus === TestStatus.Started) {
      this.navController.push(this.getTestStartingPage());
    } else if (this.activityCode === ActivityCodes.PASS) {
      this.navController.push(this.getPassFinalisationPage());
    } else {
      this.navController.push(this.getNonPassFinalisationPage());
    }
  }

  startTest() {
    if (this.isE2EPracticeMode()) {
      this.store$.dispatch(new StartE2EPracticeTest(this.slotDetail.slotId.toString()));
    } else {
      this.store$.dispatch(new StartTest(this.slotDetail.slotId, this.category, this.startTestAsRekey || this.isRekey));
    }
    this.navController.push(this.getTestStartingPage());
  }

  rekeyTest() {
    if (this.testStatus === null || this.testStatus === TestStatus.Booked) {
      this.store$.dispatch(new StartTest(this.slotDetail.slotId, this.category, true, false));
    } else {
      this.store$.dispatch(new ActivateTest(this.slotDetail.slotId, this.category, true));
    }
    switch (this.category) {
      case TestCategory.ADI2:
        this.navController.push(CAT_ADI_PART2.WAITING_ROOM_PAGE);
        break;
      case TestCategory.B:
        this.navController.push(CAT_B.WAITING_ROOM_PAGE);
        break;
      case TestCategory.BE:
        this.navController.push(CAT_BE.WAITING_ROOM_PAGE);
        break;
      case TestCategory.CE:
      case TestCategory.C1E:
      case TestCategory.C1:
      case TestCategory.C:
        this.navController.push(CAT_C.WAITING_ROOM_PAGE);
        break;
      case TestCategory.CCPC:
      case TestCategory.DCPC:
        this.navController.push(CAT_CPC.WAITING_ROOM_PAGE);
        break;
      case TestCategory.DE:
      case TestCategory.D1E:
      case TestCategory.D1:
      case TestCategory.D:
        this.navController.push(CAT_D.WAITING_ROOM_PAGE);
        break;
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        this.navController.push(CAT_A_MOD1.WAITING_ROOM_PAGE);
        break;
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        this.navController.push(CAT_A_MOD2.WAITING_ROOM_PAGE);
        break;
      case TestCategory.K:
      case TestCategory.H:
      case TestCategory.G:
      case TestCategory.F:
        this.navController.push(CAT_HOME_TEST.WAITING_ROOM_PAGE);
        break;
      case TestCategory.C1EM:
      case TestCategory.C1M:
      case TestCategory.CEM:
      case TestCategory.CM:
      case TestCategory.D1EM:
      case TestCategory.D1M:
      case TestCategory.DEM:
      case TestCategory.DM:
        this.navController.push(CAT_MANOEUVRES.MANOEUVRES_PAGE);
        break;
    }
  }

  rekeyDelegatedTest(): void {
    this.store$.dispatch(new StartTest(this.slotDetail.slotId, this.category, true, true));
    this.store$.dispatch(new SetExaminerConducted(this.examinerId));
    this.store$.dispatch(new SetExaminerBooked(this.examinerId));

    switch (this.category) {
      case TestCategory.BE:
        this.navController.push(CAT_BE.WAITING_ROOM_TO_CAR_PAGE);
        break;
      case TestCategory.CE:
      case TestCategory.C1E:
      case TestCategory.C1:
      case TestCategory.C:
        this.navController.push(CAT_C.WAITING_ROOM_TO_CAR_PAGE);
        break;
      case TestCategory.CCPC:
      case TestCategory.DCPC:
        this.navController.push(CAT_CPC.WAITING_ROOM_TO_CAR_PAGE);
        break;
      case TestCategory.DE:
      case TestCategory.D1E:
      case TestCategory.D1:
      case TestCategory.D:
        this.navController.push(CAT_D.WAITING_ROOM_TO_CAR_PAGE);
        break;
    }
  }

  displayRekeyModal = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create('JournalRekeyModal', {}, options);
    this.modal.onDidDismiss(this.onModalDismiss);
    this.modal.present();
  }

  displayCheckStartModal = (): void => {
    this.store$.dispatch(new EarlyStartModalDidEnter());
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create(JOURNAL_EARLY_START_MODAL, { slotData: this.slotDetail }, options);
    this.modal.onDidDismiss((event: EarlyStartModalEvent) => {
      switch (event) {
        case ModalEvent.START:
          this.startTestAsRekey = false;
          this.isRekey = false;
          if (this.testStatus !== null) {
            this.store$.dispatch(new MarkAsNonRekey());
          }
          this.startOrResumeTestDependingOnStatus();
          break;
        case ModalEvent.CANCEL:
          break;
      }
    });
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
    if (this.shouldDisplayCheckStartModal()) {
      this.displayCheckStartModal();
      return;
    }
    this.startOrResumeTestDependingOnStatus();
  }

  shouldDisplayCheckStartModal(): boolean {
    const minsUntilTest = new DateTime().compareDuration(this.slotDetail.start, Duration.MINUTE);
    return minsUntilTest > 5;
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

  getTestStartingPage(): string {
    switch (this.category as TestCategory) {
      case TestCategory.ADI2:
        return CAT_ADI_PART2.WAITING_ROOM_PAGE;
      case TestCategory.B:
        return CAT_B.WAITING_ROOM_PAGE;
      case TestCategory.BE:
        return CAT_BE.WAITING_ROOM_PAGE;
      case TestCategory.C1E:
      case TestCategory.CE:
      case TestCategory.C1:
      case TestCategory.C:
        return CAT_C.WAITING_ROOM_PAGE;
      case TestCategory.CCPC:
      case TestCategory.DCPC:
        return CAT_CPC.WAITING_ROOM_PAGE;
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return CAT_A_MOD1.WAITING_ROOM_PAGE;
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        return CAT_A_MOD2.WAITING_ROOM_PAGE;
      case TestCategory.D:
      case TestCategory.D1:
      case TestCategory.D1E:
      case TestCategory.DE:
        return CAT_D.WAITING_ROOM_PAGE;
      case TestCategory.K:
      case TestCategory.H:
      case TestCategory.G:
      case TestCategory.F:
        return CAT_HOME_TEST.WAITING_ROOM_PAGE;
      case TestCategory.C1EM:
      case TestCategory.C1M:
      case TestCategory.CEM:
      case TestCategory.CM:
      case TestCategory.D1EM:
      case TestCategory.D1M:
      case TestCategory.DEM:
      case TestCategory.DM:
        return CAT_MANOEUVRES.MANOEUVRES_PAGE;
    }
  }

  getPassFinalisationPage(): string {
    switch (this.category as TestCategory) {
      case TestCategory.ADI2:
        return CAT_ADI_PART2.PASS_FINALISATION_PAGE;
      case TestCategory.B:
        return CAT_B.PASS_FINALISATION_PAGE;
      case TestCategory.BE:
        return CAT_BE.PASS_FINALISATION_PAGE;
      case TestCategory.C1E:
      case TestCategory.CE:
      case TestCategory.C1:
      case TestCategory.C:
        return CAT_C.PASS_FINALISATION_PAGE;
      case TestCategory.CCPC:
      case TestCategory.DCPC:
        return CAT_CPC.PASS_FINALISATION_PAGE;
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return CAT_A_MOD1.PASS_FINALISATION_PAGE;
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        return CAT_A_MOD2.PASS_FINALISATION_PAGE;
      case TestCategory.D:
      case TestCategory.D1:
      case TestCategory.D1E:
      case TestCategory.DE:
        return CAT_D.PASS_FINALISATION_PAGE;
      case TestCategory.K:
      case TestCategory.H:
      case TestCategory.G:
      case TestCategory.F:
        return CAT_HOME_TEST.PASS_FINALISATION_PAGE;
    }
  }

  getNonPassFinalisationPage(): string {
    switch (this.category as TestCategory) {
      case TestCategory.ADI2:
        return CAT_ADI_PART2.NON_PASS_FINALISATION_PAGE;
      case TestCategory.B:
        return CAT_B.NON_PASS_FINALISATION_PAGE;
      case TestCategory.BE:
        return CAT_BE.NON_PASS_FINALISATION_PAGE;
      case TestCategory.C1E:
      case TestCategory.CE:
      case TestCategory.C1:
      case TestCategory.C:
        return CAT_C.NON_PASS_FINALISATION_PAGE;
      case TestCategory.CCPC:
      case TestCategory.DCPC:
        return CAT_CPC.NON_PASS_FINALISATION_PAGE;
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return CAT_A_MOD1.NON_PASS_FINALISATION_PAGE;
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        return CAT_A_MOD2.NON_PASS_FINALISATION_PAGE;
      case TestCategory.D:
      case TestCategory.D1:
      case TestCategory.D1E:
      case TestCategory.DE:
        return CAT_D.NON_PASS_FINALISATION_PAGE;
      case TestCategory.K:
      case TestCategory.H:
      case TestCategory.G:
      case TestCategory.F:
        return CAT_HOME_TEST.NON_PASS_FINALISATION_PAGE;
    }
  }

  getOfficePage(): string {
    switch (this.category as TestCategory) {
      case TestCategory.ADI2:
        return CAT_ADI_PART2.OFFICE_PAGE;
      case TestCategory.B:
        return CAT_B.OFFICE_PAGE;
      case TestCategory.BE:
        return CAT_BE.OFFICE_PAGE;
      case TestCategory.C1E:
      case TestCategory.CE:
      case TestCategory.C1:
      case TestCategory.C:
        return CAT_C.OFFICE_PAGE;
      case TestCategory.CCPC:
      case TestCategory.DCPC:
        return CAT_CPC.OFFICE_PAGE;
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return CAT_A_MOD1.OFFICE_PAGE;
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        return CAT_A_MOD2.OFFICE_PAGE;
      case TestCategory.D:
      case TestCategory.D1:
      case TestCategory.D1E:
      case TestCategory.DE:
        return CAT_D.OFFICE_PAGE;
      case TestCategory.K:
      case TestCategory.H:
      case TestCategory.G:
      case TestCategory.F:
        return CAT_HOME_TEST.OFFICE_PAGE;
    }
  }
}
