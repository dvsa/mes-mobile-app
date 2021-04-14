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
import { VehicleRegistrationChanged, } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { map } from 'rxjs/operators';
import { InstructorAccompanimentToggled, OtherAccompanimentToggled, SupervisorAccompanimentToggled, InterpreterAccompanimentToggled, } from '../../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-d/vehicle-details.cat-d.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import { getRegistrationNumber, } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getInstructorAccompaniment, getSupervisorAccompaniment, getOtherAccompaniment, getInterpreterAccompaniment, } from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../../modules/tests/journal-data/cat-d/candidate/candidate.cat-d.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../providers/question/question';
import { getTestData } from '../../../modules/tests/test-data/cat-d/test-data.cat-d.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_D } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getVehicleChecksCatD, } from '../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.selector';
import { getSafetyQuestionsCatD, } from '../../../modules/tests/test-data/cat-d/safety-questions/safety-questions.cat-d.selector';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { VehicleChecksCatDComponent } from './components/vehicle-checks/vehicle-checks.cat-d';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import { getVehicleChecksCompleted, } from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.selector';
import { getPreTestDeclarations, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import { getCandidateDeclarationSignedStatus, getInsuranceDeclarationStatus, getResidencyDeclarationStatus, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.selector';
import { VehicleChecksCompletedToggled, VehicleChecksDrivingFaultsNumberChanged, } from '../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.action';
import { CandidateDeclarationSigned, SetDeclarationStatus, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
var WaitingRoomToCarCatDPage = /** @class */ (function (_super) {
    __extends(WaitingRoomToCarCatDPage, _super);
    function WaitingRoomToCarCatDPage(store$, navController, navParams, platform, authenticationProvider, faultCountProvider, questionProvider) {
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
        _this.createDelegatedQuestionResult = function (outcome) { return ({ outcome: outcome, code: 'DEL' }); };
        _this.displayLoadSecured = function () { return _this.testCategory === "D+E" /* DE */ ||
            _this.testCategory === "D1+E" /* D1E */; };
        _this.form = new FormGroup({});
        return _this;
    }
    WaitingRoomToCarCatDPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            registrationNumber$: currentTest$.pipe(select(getVehicleDetails), select(getRegistrationNumber)),
            instructorAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getInstructorAccompaniment)),
            supervisorAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getSupervisorAccompaniment)),
            otherAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getOtherAccompaniment)),
            interpreterAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getInterpreterAccompaniment)),
            vehicleChecksScore$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatD), map(function (vehicleChecks) { return _this.faultCountProvider.getVehicleChecksFaultCount(_this.testCategory, vehicleChecks); })),
            safetyQuestionsScore$: currentTest$.pipe(select(getTestData), select(getSafetyQuestionsCatD), map(function (safetyQuestions) {
                return _this.faultCountProvider.getSafetyQuestionsFaultCount(_this.testCategory, safetyQuestions);
            })),
            vehicleChecks$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatD)),
            safetyQuestions$: currentTest$.pipe(select(getTestData), select(getSafetyQuestionsCatD)),
            testCategory$: currentTest$.pipe(select(getTestCategory), map(function (result) { return _this.testCategory = result; })),
            delegatedTest$: currentTest$.pipe(select(getDelegatedTestIndicator), select(isDelegatedTest)),
            vehicleChecksCompleted$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatD), select(getVehicleChecksCompleted)),
            insuranceDeclarationAccepted$: currentTest$.pipe(select(getPreTestDeclarations), select(getInsuranceDeclarationStatus)),
            residencyDeclarationAccepted$: currentTest$.pipe(select(getPreTestDeclarations), select(getResidencyDeclarationStatus)),
            candidateDeclarationSigned$: currentTest$.pipe(select(getPreTestDeclarations), select(getCandidateDeclarationSignedStatus)),
        };
        this.setupSubscription();
    };
    WaitingRoomToCarCatDPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
    };
    WaitingRoomToCarCatDPage.prototype.ionViewWillLeave = function () {
        this.store$.dispatch(new PersistTests());
    };
    WaitingRoomToCarCatDPage.prototype.instructorAccompanimentToggled = function () {
        this.store$.dispatch(new InstructorAccompanimentToggled());
    };
    WaitingRoomToCarCatDPage.prototype.supervisorAccompanimentToggled = function () {
        this.store$.dispatch(new SupervisorAccompanimentToggled());
    };
    WaitingRoomToCarCatDPage.prototype.interpreterAccompanimentToggled = function () {
        this.store$.dispatch(new InterpreterAccompanimentToggled());
    };
    WaitingRoomToCarCatDPage.prototype.otherAccompanimentToggled = function () {
        this.store$.dispatch(new OtherAccompanimentToggled());
    };
    WaitingRoomToCarCatDPage.prototype.vehicleRegistrationChanged = function (vehicleRegistration) {
        this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
    };
    WaitingRoomToCarCatDPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    WaitingRoomToCarCatDPage.prototype.vehicleChecksCompletedOutcomeChanged = function (toggled) {
        this.store$.dispatch(new VehicleChecksCompletedToggled(toggled));
    };
    WaitingRoomToCarCatDPage.prototype.generateDelegatedQuestionResults = function (number, outcome) {
        var _this = this;
        return Array(number).fill(null).map(function () {
            return _this.createDelegatedQuestionResult(outcome);
        });
    };
    WaitingRoomToCarCatDPage.prototype.vehicleChecksDrivingFaultsNumberChanged = function (number) {
        this.store$.dispatch(new VehicleChecksDrivingFaultsNumberChanged(this.generateDelegatedQuestionResults(number, CompetencyOutcome.DF)));
    };
    WaitingRoomToCarCatDPage.prototype.candidateDeclarationOutcomeChanged = function (declaration) {
        this.store$.dispatch(new SetDeclarationStatus(declaration));
        this.store$.dispatch(new CandidateDeclarationSigned());
    };
    WaitingRoomToCarCatDPage.prototype.setupSubscription = function () {
        var _this = this;
        var _a = this.pageState, testCategory$ = _a.testCategory$, delegatedTest$ = _a.delegatedTest$;
        this.subscription = merge(testCategory$.pipe(map(function (result) { return _this.testCategory = result; })), delegatedTest$.pipe(map(function (result) { return _this.isDelegated = result; }))).subscribe();
    };
    WaitingRoomToCarCatDPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.navController.push(CAT_D.TEST_REPORT_PAGE).then(function () {
                var view = _this.navController.getViews().find(function (view) { return view.id === CAT_D.WAITING_ROOM_TO_CAR_PAGE; });
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
    WaitingRoomToCarCatDPage.prototype.updateForm = function (ctrl, value) {
        var _a;
        this.form.patchValue((_a = {},
            _a[ctrl] = value,
            _a));
    };
    WaitingRoomToCarCatDPage.prototype.isCtrlDirtyAndInvalid = function (controlName) {
        return !this.form.value[controlName] && this.form.get(controlName).dirty;
    };
    WaitingRoomToCarCatDPage.prototype.getDebriefPage = function () {
        return CAT_D.DEBRIEF_PAGE;
    };
    __decorate([
        ViewChild(VehicleChecksCatDComponent),
        __metadata("design:type", VehicleChecksCatDComponent)
    ], WaitingRoomToCarCatDPage.prototype, "vehicleChecks", void 0);
    WaitingRoomToCarCatDPage = __decorate([
        IonicPage(),
        Component({
            selector: '.waiting-room-to-car-cat-d-page',
            templateUrl: 'waiting-room-to-car.cat-d.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            FaultCountProvider,
            QuestionProvider])
    ], WaitingRoomToCarCatDPage);
    return WaitingRoomToCarCatDPage;
}(BasePageComponent));
export { WaitingRoomToCarCatDPage };
//# sourceMappingURL=waiting-room-to-car.cat-d.page.js.map