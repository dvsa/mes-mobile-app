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
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { merge } from 'rxjs';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { SchoolCarToggled, DualControlsToggled, GearboxCategoryChanged, VehicleRegistrationChanged, } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { map } from 'rxjs/operators';
import { InstructorAccompanimentToggled, OtherAccompanimentToggled, SupervisorAccompanimentToggled, InterpreterAccompanimentToggled, } from '../../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import { getRegistrationNumber, getGearboxCategory, isAutomatic, isManual, } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getSchoolCar, getDualControls, } from '../../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.selector';
import { getInstructorAccompaniment, getSupervisorAccompaniment, getOtherAccompaniment, getInterpreterAccompaniment, } from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../../modules/tests/journal-data/cat-be/candidate/candidate.cat-be.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../providers/question/question';
import { EyesightTestReset, EyesightTestPassed, EyesightTestFailed, } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { TellMeQuestionSelected, TellMeQuestionCorrect, TellMeQuestionDrivingFault, QuestionOutcomes, } from '../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { hasEyesightTestGotSeriousFault, hasEyesightTestBeenCompleted, } from '../../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_BE } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getVehicleChecksCatBE, } from '../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.selector';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { VehicleChecksCatBEComponent } from './components/vehicle-checks/vehicle-checks';
import { getVehicleChecksCompleted, } from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.selector';
import { getPreTestDeclarations, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import { getCandidateDeclarationSignedStatus, getInsuranceDeclarationStatus, getResidencyDeclarationStatus, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.selector';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import { CandidateDeclarationSigned, SetDeclarationStatus, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import { VehicleChecksCompletedToggled, VehicleChecksDrivingFaultsNumberChanged, } from '../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.action';
import { getNextPageDebriefOffice } from '../../../shared/constants/getNextPageDebriefOffice.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
var WaitingRoomToCarCatBEPage = /** @class */ (function (_super) {
    __extends(WaitingRoomToCarCatBEPage, _super);
    function WaitingRoomToCarCatBEPage(store$, navController, navParams, platform, authenticationProvider, faultCountProvider, questionProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.faultCountProvider = faultCountProvider;
        _this.questionProvider = questionProvider;
        _this.testCategory = "B+E" /* BE */;
        _this.showEyesightFailureConfirmation = false;
        _this.closeVehicleChecksModal = function () {
            _this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
        };
        _this.eyesightFailCancelled = function () {
            _this.form.get('eyesightCtrl') && _this.form.get('eyesightCtrl').reset();
            _this.store$.dispatch(new EyesightTestReset());
        };
        _this.createDelegatedQuestionResult = function (outcome) { return ({ outcome: outcome, code: 'DEL' }); };
        _this.tellMeQuestions = questionProvider.getTellMeQuestions("B+E" /* BE */);
        _this.form = new FormGroup({});
        return _this;
    }
    WaitingRoomToCarCatBEPage.prototype.ngOnInit = function () {
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
            vehicleChecksScore$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatBE), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount("B+E" /* BE */, vehicleChecks);
            })),
            vehicleChecks$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatBE)),
            delegatedTest$: currentTest$.pipe(select(getDelegatedTestIndicator), select(isDelegatedTest)),
            vehicleChecksCompleted$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatBE), select(getVehicleChecksCompleted)),
            insuranceDeclarationAccepted$: currentTest$.pipe(select(getPreTestDeclarations), select(getInsuranceDeclarationStatus)),
            residencyDeclarationAccepted$: currentTest$.pipe(select(getPreTestDeclarations), select(getResidencyDeclarationStatus)),
            candidateDeclarationSigned$: currentTest$.pipe(select(getPreTestDeclarations), select(getCandidateDeclarationSignedStatus)),
        };
        this.setupSubscription();
    };
    WaitingRoomToCarCatBEPage.prototype.setupSubscription = function () {
        var _this = this;
        var delegatedTest$ = this.pageState.delegatedTest$;
        this.subscription = merge(delegatedTest$.pipe(map(function (value) { return _this.isDelegated = value; }))).subscribe();
    };
    WaitingRoomToCarCatBEPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
    };
    WaitingRoomToCarCatBEPage.prototype.ionViewWillLeave = function () {
        this.store$.dispatch(new PersistTests());
    };
    WaitingRoomToCarCatBEPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    WaitingRoomToCarCatBEPage.prototype.schoolCarToggled = function () {
        this.store$.dispatch(new SchoolCarToggled());
    };
    WaitingRoomToCarCatBEPage.prototype.dualControlsToggled = function () {
        this.store$.dispatch(new DualControlsToggled());
    };
    WaitingRoomToCarCatBEPage.prototype.transmissionChanged = function (transmission) {
        this.store$.dispatch(new GearboxCategoryChanged(transmission));
    };
    WaitingRoomToCarCatBEPage.prototype.instructorAccompanimentToggled = function () {
        this.store$.dispatch(new InstructorAccompanimentToggled());
    };
    WaitingRoomToCarCatBEPage.prototype.supervisorAccompanimentToggled = function () {
        this.store$.dispatch(new SupervisorAccompanimentToggled());
    };
    WaitingRoomToCarCatBEPage.prototype.interpreterAccompanimentToggled = function () {
        this.store$.dispatch(new InterpreterAccompanimentToggled());
    };
    WaitingRoomToCarCatBEPage.prototype.otherAccompanimentToggled = function () {
        this.store$.dispatch(new OtherAccompanimentToggled());
    };
    WaitingRoomToCarCatBEPage.prototype.vehicleRegistrationChanged = function (vehicleRegistration) {
        this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
    };
    WaitingRoomToCarCatBEPage.prototype.generateDelegatedQuestionResults = function (number, outcome) {
        var _this = this;
        return Array(number).fill(null).map(function () {
            return _this.createDelegatedQuestionResult(outcome);
        });
    };
    WaitingRoomToCarCatBEPage.prototype.vehicleChecksDrivingFaultsNumberChanged = function (number) {
        this.store$.dispatch(new VehicleChecksDrivingFaultsNumberChanged(this.generateDelegatedQuestionResults(number, CompetencyOutcome.DF)));
    };
    WaitingRoomToCarCatBEPage.prototype.candidateDeclarationOutcomeChanged = function (declaration) {
        this.store$.dispatch(new SetDeclarationStatus(declaration));
        this.store$.dispatch(new CandidateDeclarationSigned());
    };
    WaitingRoomToCarCatBEPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.navController.push(CAT_BE.TEST_REPORT_PAGE).then(function () {
                // remove Waiting Room To Car Page
                var view = _this.navController.getViews().find(function (view) { return view.id === CAT_BE.WAITING_ROOM_TO_CAR_PAGE; });
                if (view && !_this.isDelegated) {
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
    WaitingRoomToCarCatBEPage.prototype.updateForm = function (ctrl, value) {
        var _a;
        this.form.patchValue((_a = {},
            _a[ctrl] = value,
            _a));
    };
    WaitingRoomToCarCatBEPage.prototype.isCtrlDirtyAndInvalid = function (controlName) {
        return !this.form.value[controlName] && this.form.get(controlName).dirty;
    };
    WaitingRoomToCarCatBEPage.prototype.setEyesightFailureVisibility = function (show) {
        this.showEyesightFailureConfirmation = show;
    };
    WaitingRoomToCarCatBEPage.prototype.tellMeQuestionChanged = function (newTellMeQuestion) {
        this.store$.dispatch(new TellMeQuestionSelected(newTellMeQuestion));
        if (this.form.controls['tellMeQuestionOutcome']) {
            this.form.controls['tellMeQuestionOutcome'].setValue('');
        }
    };
    WaitingRoomToCarCatBEPage.prototype.tellMeQuestionOutcomeChanged = function (outcome) {
        if (outcome === QuestionOutcomes.Pass) {
            this.store$.dispatch(new TellMeQuestionCorrect());
            return;
        }
        this.store$.dispatch(new TellMeQuestionDrivingFault());
    };
    WaitingRoomToCarCatBEPage.prototype.eyesightTestResultChanged = function (passed) {
        var action = passed ? new EyesightTestPassed() : new EyesightTestFailed();
        this.store$.dispatch(action);
    };
    WaitingRoomToCarCatBEPage.prototype.vehicleChecksCompletedOutcomeChanged = function (toggled) {
        this.store$.dispatch(new VehicleChecksCompletedToggled(toggled));
    };
    WaitingRoomToCarCatBEPage.prototype.nextPage = function () {
        return getNextPageDebriefOffice(CAT_BE, this.isDelegated);
    };
    __decorate([
        ViewChild(VehicleChecksCatBEComponent),
        __metadata("design:type", VehicleChecksCatBEComponent)
    ], WaitingRoomToCarCatBEPage.prototype, "vehicleChecks", void 0);
    WaitingRoomToCarCatBEPage = __decorate([
        IonicPage(),
        Component({
            selector: '.waiting-room-to-car-cat-be-page',
            templateUrl: 'waiting-room-to-car.cat-be.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            FaultCountProvider,
            QuestionProvider])
    ], WaitingRoomToCarCatBEPage);
    return WaitingRoomToCarCatBEPage;
}(BasePageComponent));
export { WaitingRoomToCarCatBEPage };
//# sourceMappingURL=waiting-room-to-car.cat-be.page.js.map