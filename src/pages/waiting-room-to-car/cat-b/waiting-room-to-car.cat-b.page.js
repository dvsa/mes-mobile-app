var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { SchoolCarToggled, DualControlsToggled, GearboxCategoryChanged, VehicleRegistrationChanged, } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { map } from 'rxjs/operators';
import { InstructorAccompanimentToggled, OtherAccompanimentToggled, SupervisorAccompanimentToggled, InterpreterAccompanimentToggled, } from '../../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-b/vehicle-details.cat-b.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import { InstructorRegistrationNumberChanged, } from '../../../modules/tests/instructor-details/instructor-details.actions';
import { getRegistrationNumber, getGearboxCategory, isAutomatic, isManual, } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getSchoolCar, getDualControls, } from '../../../modules/tests/vehicle-details/cat-b/vehicle-details.cat-b.selector';
import { getInstructorAccompaniment, getSupervisorAccompaniment, getOtherAccompaniment, getInterpreterAccompaniment, } from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../providers/question/question';
import { getInstructorDetails } from '../../../modules/tests/instructor-details/instructor-details.reducer';
import { getInstructorRegistrationNumber } from '../../../modules/tests/instructor-details/instructor-details.selector';
import { TellMeQuestionSelected, TellMeQuestionCorrect, TellMeQuestionDrivingFault, QuestionOutcomes, } from '../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { EyesightTestReset, EyesightTestPassed, EyesightTestFailed, } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { isTellMeQuestionSelected, isTellMeQuestionDrivingFault, isTellMeQuestionCorrect, tellMeQuestionOutcome, getVehicleChecks, getTellMeQuestion, hasEyesightTestGotSeriousFault, hasEyesightTestBeenCompleted, } from '../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-b/test-data.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_B } from '../../page-names.constants';
var WaitingRoomToCarCatBPage = /** @class */ (function (_super) {
    __extends(WaitingRoomToCarCatBPage, _super);
    function WaitingRoomToCarCatBPage(store$, navController, navParams, platform, authenticationProvider, questionProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider, store$) || this;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.questionProvider = questionProvider;
        _this.showEyesightFailureConfirmation = false;
        _this.eyesightFailCancelled = function () {
            _this.form.get('eyesightCtrl') && _this.form.get('eyesightCtrl').reset();
            _this.store$.dispatch(new EyesightTestReset());
        };
        _this.tellMeQuestions = questionProvider.getTellMeQuestions("B" /* B */);
        _this.form = new FormGroup({});
        return _this;
    }
    WaitingRoomToCarCatBPage.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            registrationNumber$: currentTest$.pipe(select(getVehicleDetails), select(getRegistrationNumber)),
            instructorRegistrationNumber$: currentTest$.pipe(select(getInstructorDetails), map(getInstructorRegistrationNumber)),
            transmission$: currentTest$.pipe(select(getVehicleDetails), select(getGearboxCategory)),
            schoolCar$: currentTest$.pipe(select(getVehicleDetails), select(getSchoolCar)),
            dualControls$: currentTest$.pipe(select(getVehicleDetails), select(getDualControls)),
            instructorAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getInstructorAccompaniment)),
            supervisorAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getSupervisorAccompaniment)),
            otherAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getOtherAccompaniment)),
            interpreterAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getInterpreterAccompaniment)),
            eyesightTestComplete$: currentTest$.pipe(select(getTestData), select(hasEyesightTestBeenCompleted)),
            eyesightTestFailed$: currentTest$.pipe(select(getTestData), select(hasEyesightTestGotSeriousFault)),
            gearboxAutomaticRadioChecked$: currentTest$.pipe(select(getVehicleDetails), map(isAutomatic)),
            gearboxManualRadioChecked$: currentTest$.pipe(select(getVehicleDetails), map(isManual)),
            tellMeQuestionSelected$: currentTest$.pipe(select(getTestData), select(getVehicleChecks), map(isTellMeQuestionSelected)),
            tellMeQuestionOutcome$: currentTest$.pipe(select(getTestData), select(getVehicleChecks), map(tellMeQuestionOutcome)),
            tellMeQuestionCorrect$: currentTest$.pipe(select(getTestData), select(getVehicleChecks), map(isTellMeQuestionCorrect)),
            tellMeQuestionDrivingFault$: currentTest$.pipe(select(getTestData), select(getVehicleChecks), map(isTellMeQuestionDrivingFault)),
            tellMeQuestion$: currentTest$.pipe(select(getTestData), select(getVehicleChecks), map(getTellMeQuestion)),
        };
    };
    WaitingRoomToCarCatBPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
    };
    WaitingRoomToCarCatBPage.prototype.ionViewWillLeave = function () {
        this.store$.dispatch(new PersistTests());
    };
    WaitingRoomToCarCatBPage.prototype.schoolCarToggled = function () {
        this.store$.dispatch(new SchoolCarToggled());
    };
    WaitingRoomToCarCatBPage.prototype.dualControlsToggled = function () {
        this.store$.dispatch(new DualControlsToggled());
    };
    WaitingRoomToCarCatBPage.prototype.transmissionChanged = function (transmission) {
        this.store$.dispatch(new GearboxCategoryChanged(transmission));
    };
    WaitingRoomToCarCatBPage.prototype.instructorAccompanimentToggled = function () {
        this.store$.dispatch(new InstructorAccompanimentToggled());
    };
    WaitingRoomToCarCatBPage.prototype.supervisorAccompanimentToggled = function () {
        this.store$.dispatch(new SupervisorAccompanimentToggled());
    };
    WaitingRoomToCarCatBPage.prototype.interpreterAccompanimentToggled = function () {
        this.store$.dispatch(new InterpreterAccompanimentToggled());
    };
    WaitingRoomToCarCatBPage.prototype.otherAccompanimentToggled = function () {
        this.store$.dispatch(new OtherAccompanimentToggled());
    };
    WaitingRoomToCarCatBPage.prototype.vehicleRegistrationChanged = function (vehicleRegistration) {
        this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
    };
    WaitingRoomToCarCatBPage.prototype.instructorRegistrationChanged = function (instructorRegistration) {
        this.store$.dispatch(new InstructorRegistrationNumberChanged(instructorRegistration));
    };
    WaitingRoomToCarCatBPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.navController.push(CAT_B.TEST_REPORT_PAGE).then(function () {
                // remove Waiting Room To Car Page
                var view = _this.navController.getViews().find(function (view) { return view.id === CAT_B.WAITING_ROOM_TO_CAR_PAGE; });
                if (view) {
                    _this.navController.removeView(view);
                }
            });
        }
        else {
            Object.keys(this.form.controls).forEach(function (controlName) {
                if (_this.form.controls[controlName].invalid) {
                    _this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarValidationError(controlName + " is blank"));
                }
            });
        }
    };
    WaitingRoomToCarCatBPage.prototype.updateForm = function (ctrl, value) {
        var _a;
        this.form.patchValue((_a = {},
            _a[ctrl] = value,
            _a));
    };
    WaitingRoomToCarCatBPage.prototype.isCtrlDirtyAndInvalid = function (controlName) {
        return !this.form.value[controlName] && this.form.get(controlName).dirty;
    };
    WaitingRoomToCarCatBPage.prototype.setEyesightFailureVisibility = function (show) {
        this.showEyesightFailureConfirmation = show;
    };
    WaitingRoomToCarCatBPage.prototype.tellMeQuestionChanged = function (newTellMeQuestion) {
        this.store$.dispatch(new TellMeQuestionSelected(newTellMeQuestion));
        if (this.form.controls['tellMeQuestionOutcome']) {
            this.form.controls['tellMeQuestionOutcome'].setValue('');
        }
    };
    WaitingRoomToCarCatBPage.prototype.tellMeQuestionOutcomeChanged = function (outcome) {
        if (outcome === QuestionOutcomes.Pass) {
            this.store$.dispatch(new TellMeQuestionCorrect());
            return;
        }
        this.store$.dispatch(new TellMeQuestionDrivingFault());
    };
    WaitingRoomToCarCatBPage.prototype.eyesightTestResultChanged = function (passed) {
        var action = passed ? new EyesightTestPassed() : new EyesightTestFailed();
        this.store$.dispatch(action);
    };
    WaitingRoomToCarCatBPage.prototype.getDebriefPage = function () {
        return CAT_B.DEBRIEF_PAGE;
    };
    __decorate([
        ViewChild('registrationInput'),
        __metadata("design:type", ElementRef)
    ], WaitingRoomToCarCatBPage.prototype, "regisrationInput", void 0);
    __decorate([
        ViewChild('instructorRegistrationInput'),
        __metadata("design:type", ElementRef)
    ], WaitingRoomToCarCatBPage.prototype, "instructorRegistrationInput", void 0);
    WaitingRoomToCarCatBPage = __decorate([
        IonicPage(),
        Component({
            selector: '.waiting-room-to-car-cat-b-page',
            templateUrl: 'waiting-room-to-car.cat-b.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            QuestionProvider])
    ], WaitingRoomToCarCatBPage);
    return WaitingRoomToCarCatBPage;
}(PracticeableBasePageComponent));
export { WaitingRoomToCarCatBPage };
//# sourceMappingURL=waiting-room-to-car.cat-b.page.js.map