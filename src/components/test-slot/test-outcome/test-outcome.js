var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { merge } from 'rxjs';
import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { StartTest, ActivateTest } from '../../../modules/tests/tests.actions';
import { EarlyStartModalDidEnter, ResumingWriteUp } from '../../../modules/journal/journal.actions';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
import { StartE2EPracticeTest } from '../../../pages/fake-journal/fake-journal.actions';
import { isEmpty, startsWith } from 'lodash';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { JOURNAL_EARLY_START_MODAL, JOURNAL_FORCE_CHECK_MODAL, CAT_B, CAT_BE, CAT_C, CAT_A_MOD1, CAT_A_MOD2, CAT_D, CAT_ADI_PART2, CAT_HOME_TEST, CAT_CPC, } from '../../../pages/page-names.constants';
import { ModalEvent } from '../../../pages/journal/journal-rekey-modal/journal-rekey-modal.constants';
import { DateTime, Duration } from '../../../shared/helpers/date-time';
import { map } from 'rxjs/operators';
import { getRekeySearchState } from '../../../pages/rekey-search/rekey-search.reducer';
import { getBookedTestSlot } from '../../../pages/rekey-search/rekey-search.selector';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { MarkAsNonRekey } from '../../../modules/tests/rekey/rekey.actions';
import { SetExaminerConducted } from '../../../modules/tests/examiner-conducted/examiner-conducted.actions';
import { SetExaminerBooked } from '../../../modules/tests/examiner-booked/examiner-booked.actions';
var TestOutcomeComponent = /** @class */ (function () {
    function TestOutcomeComponent(store$, navController, modalController) {
        var _this = this;
        this.store$ = store$;
        this.navController = navController;
        this.modalController = modalController;
        this.isDelegatedTest = false;
        this.startTestAsRekey = false;
        this.isTestSlotOnRekeySearch = false;
        this.displayRekeyModal = function () {
            var options = { cssClass: 'mes-modal-alert text-zoom-regular' };
            _this.modal = _this.modalController.create('JournalRekeyModal', {}, options);
            _this.modal.onDidDismiss(_this.onModalDismiss);
            _this.modal.present();
        };
        this.displayCheckStartModal = function () {
            _this.store$.dispatch(new EarlyStartModalDidEnter());
            var options = { cssClass: 'mes-modal-alert text-zoom-regular' };
            _this.modal = _this.modalController.create(JOURNAL_EARLY_START_MODAL, { slotData: _this.slotDetail }, options);
            _this.modal.onDidDismiss(function (event) {
                switch (event) {
                    case ModalEvent.START:
                        _this.startTestAsRekey = false;
                        _this.isRekey = false;
                        if (_this.testStatus !== null) {
                            _this.store$.dispatch(new MarkAsNonRekey());
                        }
                        _this.startOrResumeTestDependingOnStatus();
                        break;
                    case ModalEvent.CANCEL:
                        break;
                }
            });
            _this.modal.present();
        };
        this.displayForceCheckModal = function () {
            var options = { cssClass: 'mes-modal-alert text-zoom-regular' };
            _this.modal = _this.modalController.create(JOURNAL_FORCE_CHECK_MODAL, {}, options);
            _this.modal.onDidDismiss(_this.onModalDismiss);
            _this.modal.present();
        };
        this.onModalDismiss = function (event) {
            switch (event) {
                case ModalEvent.START:
                    _this.startTestAsRekey = false;
                    _this.isRekey = false;
                    if (_this.testStatus !== null) {
                        _this.store$.dispatch(new MarkAsNonRekey());
                    }
                    _this.startOrResumeTestDependingOnStatus();
                    break;
                case ModalEvent.REKEY:
                    _this.startTestAsRekey = true;
                    _this.startOrResumeTestDependingOnStatus();
                    break;
            }
        };
    }
    TestOutcomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var bookedTestSlot$ = this.store$.pipe(select(getRekeySearchState), map(getBookedTestSlot));
        var merged$ = merge(bookedTestSlot$.pipe(map(function (testSlot) {
            if (isEmpty(testSlot)) {
                _this.isTestSlotOnRekeySearch = false;
                return;
            }
            if (testSlot.slotDetail.slotId === _this.slotDetail.slotId) {
                _this.isTestSlotOnRekeySearch = true;
            }
        })));
        this.subscription = merged$.subscribe();
    };
    TestOutcomeComponent.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TestOutcomeComponent.prototype.showOutcome = function () {
        return [TestStatus.Completed, TestStatus.Submitted].includes(this.testStatus);
    };
    TestOutcomeComponent.prototype.showRekeyButton = function () {
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
    };
    TestOutcomeComponent.prototype.showStartTestButton = function () {
        return !this.isDelegatedTest && (this.testStatus === TestStatus.Booked);
    };
    TestOutcomeComponent.prototype.showDelegatedExaminerRekeyButton = function () {
        return this.isDelegatedTest && !this.showResumeButton();
    };
    TestOutcomeComponent.prototype.showResumeButton = function () {
        return this.testStatus === TestStatus.Started || this.testStatus === TestStatus.Decided;
    };
    TestOutcomeComponent.prototype.showWriteUpButton = function () {
        return this.testStatus === TestStatus.WriteUp || this.testStatus === TestStatus.Autosaved;
    };
    TestOutcomeComponent.prototype.writeUpTest = function () {
        this.store$.dispatch(new ActivateTest(this.slotDetail.slotId, this.category));
        this.store$.dispatch(new ResumingWriteUp(this.slotDetail.slotId.toString()));
        this.navController.push(this.getOfficePage());
    };
    TestOutcomeComponent.prototype.resumeTest = function () {
        this.store$.dispatch(new ActivateTest(this.slotDetail.slotId, this.category));
        if (this.testStatus === TestStatus.Started) {
            this.navController.push(this.getTestStartingPage());
        }
        else if (this.activityCode === ActivityCodes.PASS) {
            this.navController.push(this.getPassFinalisationPage());
        }
        else {
            this.navController.push(this.getNonPassFinalisationPage());
        }
    };
    TestOutcomeComponent.prototype.startTest = function () {
        if (this.isE2EPracticeMode()) {
            this.store$.dispatch(new StartE2EPracticeTest(this.slotDetail.slotId.toString()));
        }
        else {
            this.store$.dispatch(new StartTest(this.slotDetail.slotId, this.category, this.startTestAsRekey || this.isRekey));
        }
        this.navController.push(this.getTestStartingPage());
    };
    TestOutcomeComponent.prototype.rekeyTest = function () {
        if (this.testStatus === null || this.testStatus === TestStatus.Booked) {
            this.store$.dispatch(new StartTest(this.slotDetail.slotId, this.category, true, false));
        }
        else {
            this.store$.dispatch(new ActivateTest(this.slotDetail.slotId, this.category, true));
        }
        switch (this.category) {
            case "ADI2" /* ADI2 */:
                this.navController.push(CAT_ADI_PART2.WAITING_ROOM_PAGE);
                break;
            case "B" /* B */:
                this.navController.push(CAT_B.WAITING_ROOM_PAGE);
                break;
            case "B+E" /* BE */:
                this.navController.push(CAT_BE.WAITING_ROOM_PAGE);
                break;
            case "C+E" /* CE */:
            case "C1+E" /* C1E */:
            case "C1" /* C1 */:
            case "C" /* C */:
                this.navController.push(CAT_C.WAITING_ROOM_PAGE);
                break;
            case "CCPC" /* CCPC */:
            case "DCPC" /* DCPC */:
                this.navController.push(CAT_CPC.WAITING_ROOM_PAGE);
                break;
            case "D+E" /* DE */:
            case "D1+E" /* D1E */:
            case "D1" /* D1 */:
            case "D" /* D */:
                this.navController.push(CAT_D.WAITING_ROOM_PAGE);
                break;
            case "EUAM1" /* EUAM1 */:
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAMM1" /* EUAMM1 */:
                this.navController.push(CAT_A_MOD1.WAITING_ROOM_PAGE);
                break;
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                this.navController.push(CAT_A_MOD2.WAITING_ROOM_PAGE);
                break;
            case "K" /* K */:
            case "H" /* H */:
            case "G" /* G */:
            case "F" /* F */:
                this.navController.push(CAT_HOME_TEST.WAITING_ROOM_PAGE);
                break;
        }
    };
    TestOutcomeComponent.prototype.rekeyDelegatedTest = function () {
        this.store$.dispatch(new StartTest(this.slotDetail.slotId, this.category, true, true));
        this.store$.dispatch(new SetExaminerConducted(this.examinerId));
        this.store$.dispatch(new SetExaminerBooked(this.examinerId));
        switch (this.category) {
            case "B+E" /* BE */:
                this.navController.push(CAT_BE.WAITING_ROOM_TO_CAR_PAGE);
                break;
            case "C+E" /* CE */:
            case "C1+E" /* C1E */:
            case "C1" /* C1 */:
            case "C" /* C */:
                this.navController.push(CAT_C.WAITING_ROOM_TO_CAR_PAGE);
                break;
            case "CCPC" /* CCPC */:
            case "DCPC" /* DCPC */:
                this.navController.push(CAT_CPC.WAITING_ROOM_TO_CAR_PAGE);
                break;
            case "D+E" /* DE */:
            case "D1+E" /* D1E */:
            case "D1" /* D1 */:
            case "D" /* D */:
                this.navController.push(CAT_D.WAITING_ROOM_TO_CAR_PAGE);
                break;
        }
    };
    TestOutcomeComponent.prototype.shouldDisplayRekeyModal = function () {
        return this.isTestIncomplete() && this.isTodaysDate() && this.hasTestTimeFinished();
    };
    TestOutcomeComponent.prototype.clickStartOrResumeTest = function () {
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
    };
    TestOutcomeComponent.prototype.shouldDisplayCheckStartModal = function () {
        var minsUntilTest = new DateTime().compareDuration(this.slotDetail.start, Duration.MINUTE);
        return minsUntilTest > 5;
    };
    TestOutcomeComponent.prototype.isE2EPracticeMode = function () {
        return startsWith(this.slotDetail.slotId.toString(), end2endPracticeSlotId);
    };
    TestOutcomeComponent.prototype.isDateInPast = function () {
        return new DateTime().daysDiff(this.slotDetail.start) < 0;
    };
    TestOutcomeComponent.prototype.isTodaysDate = function () {
        return new DateTime().daysDiff(this.slotDetail.start) === 0;
    };
    TestOutcomeComponent.prototype.isTestIncomplete = function () {
        return [TestStatus.Booked, TestStatus.Started, TestStatus.Decided].includes(this.testStatus);
    };
    TestOutcomeComponent.prototype.hasTestTimeFinished = function () {
        var cutOffTime = new DateTime(this.slotDetail.start).add(10, Duration.MINUTE);
        return new DateTime() > cutOffTime;
    };
    TestOutcomeComponent.prototype.startOrResumeTestDependingOnStatus = function () {
        if (this.testStatus === TestStatus.Booked) {
            this.startTest();
        }
        else {
            this.resumeTest();
        }
    };
    TestOutcomeComponent.prototype.getTestStartingPage = function () {
        switch (this.category) {
            case "ADI2" /* ADI2 */:
                return CAT_ADI_PART2.WAITING_ROOM_PAGE;
            case "B" /* B */:
                return CAT_B.WAITING_ROOM_PAGE;
            case "B+E" /* BE */:
                return CAT_BE.WAITING_ROOM_PAGE;
            case "C1+E" /* C1E */:
            case "C+E" /* CE */:
            case "C1" /* C1 */:
            case "C" /* C */:
                return CAT_C.WAITING_ROOM_PAGE;
            case "CCPC" /* CCPC */:
            case "DCPC" /* DCPC */:
                return CAT_CPC.WAITING_ROOM_PAGE;
            case "EUAM1" /* EUAM1 */:
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAMM1" /* EUAMM1 */:
                return CAT_A_MOD1.WAITING_ROOM_PAGE;
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                return CAT_A_MOD2.WAITING_ROOM_PAGE;
            case "D" /* D */:
            case "D1" /* D1 */:
            case "D1+E" /* D1E */:
            case "D+E" /* DE */:
                return CAT_D.WAITING_ROOM_PAGE;
            case "K" /* K */:
            case "H" /* H */:
            case "G" /* G */:
            case "F" /* F */:
                return CAT_HOME_TEST.WAITING_ROOM_PAGE;
        }
    };
    TestOutcomeComponent.prototype.getPassFinalisationPage = function () {
        switch (this.category) {
            case "ADI2" /* ADI2 */:
                return CAT_ADI_PART2.PASS_FINALISATION_PAGE;
            case "B" /* B */:
                return CAT_B.PASS_FINALISATION_PAGE;
            case "B+E" /* BE */:
                return CAT_BE.PASS_FINALISATION_PAGE;
            case "C1+E" /* C1E */:
            case "C+E" /* CE */:
            case "C1" /* C1 */:
            case "C" /* C */:
                return CAT_C.PASS_FINALISATION_PAGE;
            case "CCPC" /* CCPC */:
            case "DCPC" /* DCPC */:
                return CAT_CPC.PASS_FINALISATION_PAGE;
            case "EUAM1" /* EUAM1 */:
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAMM1" /* EUAMM1 */:
                return CAT_A_MOD1.PASS_FINALISATION_PAGE;
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                return CAT_A_MOD2.PASS_FINALISATION_PAGE;
            case "D" /* D */:
            case "D1" /* D1 */:
            case "D1+E" /* D1E */:
            case "D+E" /* DE */:
                return CAT_D.PASS_FINALISATION_PAGE;
            case "K" /* K */:
            case "H" /* H */:
            case "G" /* G */:
            case "F" /* F */:
                return CAT_HOME_TEST.PASS_FINALISATION_PAGE;
        }
    };
    TestOutcomeComponent.prototype.getNonPassFinalisationPage = function () {
        switch (this.category) {
            case "ADI2" /* ADI2 */:
                return CAT_ADI_PART2.NON_PASS_FINALISATION_PAGE;
            case "B" /* B */:
                return CAT_B.NON_PASS_FINALISATION_PAGE;
            case "B+E" /* BE */:
                return CAT_BE.NON_PASS_FINALISATION_PAGE;
            case "C1+E" /* C1E */:
            case "C+E" /* CE */:
            case "C1" /* C1 */:
            case "C" /* C */:
                return CAT_C.NON_PASS_FINALISATION_PAGE;
            case "CCPC" /* CCPC */:
            case "DCPC" /* DCPC */:
                return CAT_CPC.NON_PASS_FINALISATION_PAGE;
            case "EUAM1" /* EUAM1 */:
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAMM1" /* EUAMM1 */:
                return CAT_A_MOD1.NON_PASS_FINALISATION_PAGE;
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                return CAT_A_MOD2.NON_PASS_FINALISATION_PAGE;
            case "D" /* D */:
            case "D1" /* D1 */:
            case "D1+E" /* D1E */:
            case "D+E" /* DE */:
                return CAT_D.NON_PASS_FINALISATION_PAGE;
            case "K" /* K */:
            case "H" /* H */:
            case "G" /* G */:
            case "F" /* F */:
                return CAT_HOME_TEST.NON_PASS_FINALISATION_PAGE;
        }
    };
    TestOutcomeComponent.prototype.getOfficePage = function () {
        switch (this.category) {
            case "ADI2" /* ADI2 */:
                return CAT_ADI_PART2.OFFICE_PAGE;
            case "B" /* B */:
                return CAT_B.OFFICE_PAGE;
            case "B+E" /* BE */:
                return CAT_BE.OFFICE_PAGE;
            case "C1+E" /* C1E */:
            case "C+E" /* CE */:
            case "C1" /* C1 */:
            case "C" /* C */:
                return CAT_C.OFFICE_PAGE;
            case "CCPC" /* CCPC */:
            case "DCPC" /* DCPC */:
                return CAT_CPC.OFFICE_PAGE;
            case "EUAM1" /* EUAM1 */:
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAMM1" /* EUAMM1 */:
                return CAT_A_MOD1.OFFICE_PAGE;
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                return CAT_A_MOD2.OFFICE_PAGE;
            case "D" /* D */:
            case "D1" /* D1 */:
            case "D1+E" /* D1E */:
            case "D+E" /* DE */:
                return CAT_D.OFFICE_PAGE;
            case "K" /* K */:
            case "H" /* H */:
            case "G" /* G */:
            case "F" /* F */:
                return CAT_HOME_TEST.OFFICE_PAGE;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TestOutcomeComponent.prototype, "slotDetail", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TestOutcomeComponent.prototype, "canStartTest", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TestOutcomeComponent.prototype, "testStatus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TestOutcomeComponent.prototype, "activityCode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TestOutcomeComponent.prototype, "specialRequirements", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TestOutcomeComponent.prototype, "hasSeenCandidateDetails", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TestOutcomeComponent.prototype, "isRekey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TestOutcomeComponent.prototype, "isDelegatedTest", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TestOutcomeComponent.prototype, "examinerId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TestOutcomeComponent.prototype, "category", void 0);
    TestOutcomeComponent = __decorate([
        Component({
            selector: 'test-outcome',
            templateUrl: 'test-outcome.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            ModalController])
    ], TestOutcomeComponent);
    return TestOutcomeComponent;
}());
export { TestOutcomeComponent };
//# sourceMappingURL=test-outcome.js.map