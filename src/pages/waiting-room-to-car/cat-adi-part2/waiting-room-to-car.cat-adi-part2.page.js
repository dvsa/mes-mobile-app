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
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { SchoolCarToggled, DualControlsToggled, GearboxCategoryChanged, VehicleRegistrationChanged, } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { map } from 'rxjs/operators';
import { InstructorAccompanimentToggled, OtherAccompanimentToggled, SupervisorAccompanimentToggled, InterpreterAccompanimentToggled, } from '../../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails, } from '../../../modules/tests/vehicle-details/cat-adi-part2/vehicle-details.cat-adi-part2.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import { getRegistrationNumber, getGearboxCategory, isAutomatic, isManual, } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getSchoolCar, getDualControls, } from '../../../modules/tests/vehicle-details/cat-adi-part2/vehicle-details.cat-adi-part2.selector';
import { getInstructorAccompaniment, getSupervisorAccompaniment, getOtherAccompaniment, getInterpreterAccompaniment, } from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../providers/question/question';
import { EyesightTestReset, EyesightTestPassed, EyesightTestFailed, } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { getVehicleChecksCatADIPart2, hasEyesightTestGotSeriousFault, hasEyesightTestBeenCompleted, } from '../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.selector';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { getTestData } from '../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_ADI_PART2 } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { OrditTrainedChanged, TrainerRegistrationNumberChanged, TrainingRecordsChanged, } from '../../../modules/tests/trainer-details/cat-adi-part2/trainer-details.cat-adi-part2.actions';
import { getTrainerDetails, } from '../../../modules/tests/trainer-details/cat-adi-part2/trainer-details.cat-adi-part2.reducer';
import { getOrditTrained, getTrainerRegistrationNumber, getTrainingRecords, } from '../../../modules/tests/trainer-details/cat-adi-part2/trainer-details.cat-adi-part2.selector';
var WaitingRoomToCarCatADIPart2Page = /** @class */ (function (_super) {
    __extends(WaitingRoomToCarCatADIPart2Page, _super);
    function WaitingRoomToCarCatADIPart2Page(store$, navController, navParams, platform, authenticationProvider, faultCountProvider, questionProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.faultCountProvider = faultCountProvider;
        _this.questionProvider = questionProvider;
        _this.showEyesightFailureConfirmation = false;
        _this.closeVehicleChecksModal = function () {
            _this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
        };
        _this.eyesightFailCancelled = function () {
            _this.form.get('eyesightCtrl') && _this.form.get('eyesightCtrl').reset();
            _this.store$.dispatch(new EyesightTestReset());
        };
        _this.tellMeQuestions = questionProvider.getTellMeQuestions("ADI2" /* ADI2 */);
        _this.form = new FormGroup({});
        return _this;
    }
    WaitingRoomToCarCatADIPart2Page.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            registrationNumber$: currentTest$.pipe(select(getVehicleDetails), select(getRegistrationNumber)),
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
            vehicleChecksScore$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatADIPart2), map(function (vehicleChecks) {
                return _this.faultCountProvider.getTellMeFaultCount("ADI2" /* ADI2 */, vehicleChecks);
            })),
            vehicleChecks$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatADIPart2)),
            orditTrained$: currentTest$.pipe(select(getTrainerDetails), select(getOrditTrained)),
            trainingRecords$: currentTest$.pipe(select(getTrainerDetails), select(getTrainingRecords)),
            trainerRegistrationNumber$: currentTest$.pipe(select(getTrainerDetails), select(getTrainerRegistrationNumber)),
        };
    };
    WaitingRoomToCarCatADIPart2Page.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
    };
    WaitingRoomToCarCatADIPart2Page.prototype.ionViewWillLeave = function () {
        this.store$.dispatch(new PersistTests());
    };
    WaitingRoomToCarCatADIPart2Page.prototype.schoolCarToggled = function () {
        this.store$.dispatch(new SchoolCarToggled());
    };
    WaitingRoomToCarCatADIPart2Page.prototype.dualControlsToggled = function () {
        this.store$.dispatch(new DualControlsToggled());
    };
    WaitingRoomToCarCatADIPart2Page.prototype.transmissionChanged = function (transmission) {
        this.store$.dispatch(new GearboxCategoryChanged(transmission));
    };
    WaitingRoomToCarCatADIPart2Page.prototype.instructorAccompanimentToggled = function () {
        this.store$.dispatch(new InstructorAccompanimentToggled());
    };
    WaitingRoomToCarCatADIPart2Page.prototype.supervisorAccompanimentToggled = function () {
        this.store$.dispatch(new SupervisorAccompanimentToggled());
    };
    WaitingRoomToCarCatADIPart2Page.prototype.interpreterAccompanimentToggled = function () {
        this.store$.dispatch(new InterpreterAccompanimentToggled());
    };
    WaitingRoomToCarCatADIPart2Page.prototype.otherAccompanimentToggled = function () {
        this.store$.dispatch(new OtherAccompanimentToggled());
    };
    WaitingRoomToCarCatADIPart2Page.prototype.vehicleRegistrationChanged = function (vehicleRegistration) {
        this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
    };
    WaitingRoomToCarCatADIPart2Page.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.navController.push(CAT_ADI_PART2.TEST_REPORT_PAGE).then(function () {
                // remove Waiting Room To Car Page
                var view = _this.navController.getViews().find(function (view) { return view.id === CAT_ADI_PART2.WAITING_ROOM_TO_CAR_PAGE; });
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
    WaitingRoomToCarCatADIPart2Page.prototype.updateForm = function (ctrl, value) {
        var _a;
        this.form.patchValue((_a = {},
            _a[ctrl] = value,
            _a));
    };
    WaitingRoomToCarCatADIPart2Page.prototype.isCtrlDirtyAndInvalid = function (controlName) {
        return !this.form.value[controlName] && this.form.get(controlName).dirty;
    };
    WaitingRoomToCarCatADIPart2Page.prototype.setEyesightFailureVisibility = function (show) {
        this.showEyesightFailureConfirmation = show;
    };
    WaitingRoomToCarCatADIPart2Page.prototype.eyesightTestResultChanged = function (passed) {
        var action = passed ? new EyesightTestPassed() : new EyesightTestFailed();
        this.store$.dispatch(action);
    };
    WaitingRoomToCarCatADIPart2Page.prototype.trainingRecordOutcomeChanged = function (hasRecords) {
        this.store$.dispatch(new TrainingRecordsChanged(hasRecords));
    };
    WaitingRoomToCarCatADIPart2Page.prototype.orditTrainedOutcomeChanged = function (wasOrditTrained) {
        this.store$.dispatch(new OrditTrainedChanged(wasOrditTrained));
    };
    WaitingRoomToCarCatADIPart2Page.prototype.trainerRegistrationNumberChanged = function (instructorRegistration) {
        this.store$.dispatch(new TrainerRegistrationNumberChanged(instructorRegistration));
    };
    WaitingRoomToCarCatADIPart2Page.prototype.getDebriefPage = function () {
        return CAT_ADI_PART2.DEBRIEF_PAGE;
    };
    __decorate([
        ViewChild('registrationInput'),
        __metadata("design:type", ElementRef)
    ], WaitingRoomToCarCatADIPart2Page.prototype, "regisrationInput", void 0);
    __decorate([
        ViewChild('instructorRegistrationInput'),
        __metadata("design:type", ElementRef)
    ], WaitingRoomToCarCatADIPart2Page.prototype, "instructorRegistrationInput", void 0);
    WaitingRoomToCarCatADIPart2Page = __decorate([
        IonicPage(),
        Component({
            selector: '.waiting-room-to-car-cat-adi-part2-page',
            templateUrl: 'waiting-room-to-car.cat-adi-part2.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            FaultCountProvider,
            QuestionProvider])
    ], WaitingRoomToCarCatADIPart2Page);
    return WaitingRoomToCarCatADIPart2Page;
}(BasePageComponent));
export { WaitingRoomToCarCatADIPart2Page };
//# sourceMappingURL=waiting-room-to-car.cat-adi-part2.page.js.map