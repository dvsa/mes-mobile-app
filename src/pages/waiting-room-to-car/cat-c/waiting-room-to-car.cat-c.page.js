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
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-c/vehicle-details.cat-c.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import { getRegistrationNumber, } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getInstructorAccompaniment, getSupervisorAccompaniment, getOtherAccompaniment, getInterpreterAccompaniment, } from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { getTestData } from '../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_C } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getVehicleChecksCatC, getVehicleChecksCompleted, } from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.selector';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { VehicleChecksCatCComponent } from './components/vehicle-checks/vehicle-checks.cat-c';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import { VehicleChecksCompletedToggled, VehicleChecksDrivingFaultsNumberChanged, } from '../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import { getPreTestDeclarations, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.reducer';
import { getCandidateDeclarationSignedStatus, getInsuranceDeclarationStatus, getResidencyDeclarationStatus, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.selector';
import { CandidateDeclarationSigned, SetDeclarationStatus, } from '../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
var WaitingRoomToCarCatCPage = /** @class */ (function (_super) {
    __extends(WaitingRoomToCarCatCPage, _super);
    function WaitingRoomToCarCatCPage(store$, navController, navParams, platform, authenticationProvider, faultCountProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.faultCountProvider = faultCountProvider;
        _this.showEyesightFailureConfirmation = false;
        _this.closeVehicleChecksModal = function () {
            _this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
        };
        _this.createDelegatedQuestionResult = function (outcome) { return ({ outcome: outcome, code: 'DEL' }); };
        _this.displayCabLockDown = function () { return _this.testCategory === "C" /* C */ || _this.testCategory === "C+E" /* CE */; };
        _this.displayLoadSecured = function () { return _this.testCategory === "C" /* C */ ||
            _this.testCategory === "C+E" /* CE */ ||
            _this.testCategory === "C1+E" /* C1E */; };
        _this.form = new FormGroup({});
        return _this;
    }
    WaitingRoomToCarCatCPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            registrationNumber$: currentTest$.pipe(select(getVehicleDetails), select(getRegistrationNumber)),
            instructorAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getInstructorAccompaniment)),
            supervisorAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getSupervisorAccompaniment)),
            otherAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getOtherAccompaniment)),
            interpreterAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getInterpreterAccompaniment)),
            vehicleChecks$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatC)),
            testCategory$: currentTest$.pipe(select(getTestCategory), map(function (result) { return _this.testCategory = result; })),
            vehicleChecksScore$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatC), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount(_this.testCategory, vehicleChecks);
            })),
            delegatedTest$: currentTest$.pipe(select(getDelegatedTestIndicator), select(isDelegatedTest)),
            vehicleChecksCompleted$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatC), select(getVehicleChecksCompleted)),
            insuranceDeclarationAccepted$: currentTest$.pipe(select(getPreTestDeclarations), select(getInsuranceDeclarationStatus)),
            residencyDeclarationAccepted$: currentTest$.pipe(select(getPreTestDeclarations), select(getResidencyDeclarationStatus)),
            candidateDeclarationSigned$: currentTest$.pipe(select(getPreTestDeclarations), select(getCandidateDeclarationSignedStatus)),
        };
        this.setupSubscription();
    };
    WaitingRoomToCarCatCPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
    };
    WaitingRoomToCarCatCPage.prototype.ionViewWillLeave = function () {
        this.store$.dispatch(new PersistTests());
    };
    WaitingRoomToCarCatCPage.prototype.instructorAccompanimentToggled = function () {
        this.store$.dispatch(new InstructorAccompanimentToggled());
    };
    WaitingRoomToCarCatCPage.prototype.supervisorAccompanimentToggled = function () {
        this.store$.dispatch(new SupervisorAccompanimentToggled());
    };
    WaitingRoomToCarCatCPage.prototype.interpreterAccompanimentToggled = function () {
        this.store$.dispatch(new InterpreterAccompanimentToggled());
    };
    WaitingRoomToCarCatCPage.prototype.otherAccompanimentToggled = function () {
        this.store$.dispatch(new OtherAccompanimentToggled());
    };
    WaitingRoomToCarCatCPage.prototype.vehicleRegistrationChanged = function (vehicleRegistration) {
        this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
    };
    WaitingRoomToCarCatCPage.prototype.vehicleChecksCompletedOutcomeChanged = function (toggled) {
        this.store$.dispatch(new VehicleChecksCompletedToggled(toggled));
    };
    WaitingRoomToCarCatCPage.prototype.candidateDeclarationOutcomeChanged = function (declaration) {
        this.store$.dispatch(new SetDeclarationStatus(declaration));
        this.store$.dispatch(new CandidateDeclarationSigned());
    };
    WaitingRoomToCarCatCPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    WaitingRoomToCarCatCPage.prototype.generateDelegatedQuestionResults = function (number, outcome) {
        var _this = this;
        return Array(number).fill(null).map(function () {
            return _this.createDelegatedQuestionResult(outcome);
        });
    };
    WaitingRoomToCarCatCPage.prototype.vehicleChecksDrivingFaultsNumberChanged = function (number) {
        this.store$.dispatch(new VehicleChecksDrivingFaultsNumberChanged(this.generateDelegatedQuestionResults(number, CompetencyOutcome.DF)));
    };
    WaitingRoomToCarCatCPage.prototype.setupSubscription = function () {
        var _this = this;
        var _a = this.pageState, testCategory$ = _a.testCategory$, delegatedTest$ = _a.delegatedTest$;
        this.subscription = merge(testCategory$.pipe(map(function (result) { return _this.testCategory = result; })), delegatedTest$.pipe(map(function (result) { return _this.isDelegated = result; }))).subscribe();
    };
    WaitingRoomToCarCatCPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.navController.push(CAT_C.TEST_REPORT_PAGE).then(function () {
                // remove Waiting Room To Car Page
                var view = _this.navController.getViews().find(function (view) { return view.id === CAT_C.WAITING_ROOM_TO_CAR_PAGE; });
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
    WaitingRoomToCarCatCPage.prototype.updateForm = function (ctrl, value) {
        var _a;
        this.form.patchValue((_a = {},
            _a[ctrl] = value,
            _a));
    };
    WaitingRoomToCarCatCPage.prototype.isCtrlDirtyAndInvalid = function (controlName) {
        return !this.form.value[controlName] && this.form.get(controlName).dirty;
    };
    WaitingRoomToCarCatCPage.prototype.getDebriefPage = function () {
        return CAT_C.DEBRIEF_PAGE;
    };
    __decorate([
        ViewChild(VehicleChecksCatCComponent),
        __metadata("design:type", VehicleChecksCatCComponent)
    ], WaitingRoomToCarCatCPage.prototype, "vehicleChecks", void 0);
    WaitingRoomToCarCatCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.waiting-room-to-car-cat-c-page',
            templateUrl: 'waiting-room-to-car.cat-c.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            FaultCountProvider])
    ], WaitingRoomToCarCatCPage);
    return WaitingRoomToCarCatCPage;
}(BasePageComponent));
export { WaitingRoomToCarCatCPage };
//# sourceMappingURL=waiting-room-to-car.cat-c.page.js.map