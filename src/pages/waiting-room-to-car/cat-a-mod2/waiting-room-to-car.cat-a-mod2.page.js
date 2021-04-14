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
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { SchoolBikeToggled, } from '../../../modules/tests/vehicle-details/cat-a-mod2/vehicle-details.cat-a-mod2.actions';
import { map } from 'rxjs/operators';
import { InstructorAccompanimentToggled, OtherAccompanimentToggled, SupervisorAccompanimentToggled, InterpreterAccompanimentToggled, } from '../../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-a-mod2/vehicle-details.cat-a-mod2.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import { getRegistrationNumber, getGearboxCategory, } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getSchoolBike, } from '../../../modules/tests/vehicle-details/cat-a-mod2/vehicle-details.cat-a-mod2.selector';
import { getInstructorAccompaniment, getSupervisorAccompaniment, getOtherAccompaniment, getInterpreterAccompaniment, } from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { hasEyesightTestGotSeriousFault, hasEyesightTestBeenCompleted, } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.selector';
import { EyesightTestReset, EyesightTestPassed, EyesightTestFailed, } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_A_MOD2 } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { VehicleChecksCatAMod2Component } from './components/vehicle-checks/vehicle-checks';
import { VehicleRegistrationChanged, GearboxCategoryChanged } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { getEyesightTest } from '../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.selector';
import { getSafetyAndBalanceQuestions } from '../../../modules/tests/test-data/cat-a-mod2/safety-and-balance/safety-and-balance.cat-a-mod2.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.reducer';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
var WaitingRoomToCarCatAMod2Page = /** @class */ (function (_super) {
    __extends(WaitingRoomToCarCatAMod2Page, _super);
    function WaitingRoomToCarCatAMod2Page(store$, navController, navParams, platform, authenticationProvider, faultCountProvider) {
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
        _this.eyesightFailCancelled = function () {
            _this.form.get('eyesightCtrl') && _this.form.get('eyesightCtrl').reset();
            _this.store$.dispatch(new EyesightTestReset());
        };
        _this.form = new FormGroup({});
        return _this;
    }
    WaitingRoomToCarCatAMod2Page.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            registrationNumber$: currentTest$.pipe(select(getVehicleDetails), select(getRegistrationNumber)),
            transmission$: currentTest$.pipe(select(getVehicleDetails), select(getGearboxCategory)),
            schoolBike$: currentTest$.pipe(select(getVehicleDetails), select(getSchoolBike)),
            instructorAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getInstructorAccompaniment)),
            supervisorAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getSupervisorAccompaniment)),
            otherAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getOtherAccompaniment)),
            interpreterAccompaniment$: currentTest$.pipe(select(getAccompaniment), select(getInterpreterAccompaniment)),
            eyesightTestComplete$: currentTest$.pipe(select(getTestData), select(getEyesightTest), select(hasEyesightTestBeenCompleted)),
            eyesightTestFailed$: currentTest$.pipe(select(getTestData), select(getEyesightTest), select(hasEyesightTestGotSeriousFault)),
            safetyAndBalanceQuestionsScore$: currentTest$.pipe(select(getTestData), select(getSafetyAndBalanceQuestions), map(function (safetyAndBalanceQuestions) {
                return _this.faultCountProvider.getSafetyAndBalanceFaultCount("EUAM2" /* EUAM2 */, safetyAndBalanceQuestions);
            })),
            safetyAndBalanceQuestions$: currentTest$.pipe(select(getTestData), select(getSafetyAndBalanceQuestions)),
            testCategory$: currentTest$.pipe(select(getTestCategory)),
        };
    };
    WaitingRoomToCarCatAMod2Page.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
    };
    WaitingRoomToCarCatAMod2Page.prototype.ionViewWillLeave = function () {
        this.store$.dispatch(new PersistTests());
    };
    WaitingRoomToCarCatAMod2Page.prototype.schoolBikeToggled = function () {
        this.store$.dispatch(new SchoolBikeToggled());
    };
    WaitingRoomToCarCatAMod2Page.prototype.transmissionChanged = function (transmission) {
        this.store$.dispatch(new GearboxCategoryChanged(transmission));
    };
    WaitingRoomToCarCatAMod2Page.prototype.instructorAccompanimentToggled = function () {
        this.store$.dispatch(new InstructorAccompanimentToggled());
    };
    WaitingRoomToCarCatAMod2Page.prototype.supervisorAccompanimentToggled = function () {
        this.store$.dispatch(new SupervisorAccompanimentToggled());
    };
    WaitingRoomToCarCatAMod2Page.prototype.interpreterAccompanimentToggled = function () {
        this.store$.dispatch(new InterpreterAccompanimentToggled());
    };
    WaitingRoomToCarCatAMod2Page.prototype.otherAccompanimentToggled = function () {
        this.store$.dispatch(new OtherAccompanimentToggled());
    };
    WaitingRoomToCarCatAMod2Page.prototype.vehicleRegistrationChanged = function (vehicleRegistration) {
        this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
    };
    WaitingRoomToCarCatAMod2Page.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.navController.push(CAT_A_MOD2.TEST_REPORT_PAGE).then(function () {
                // remove Waiting Room To Car Page
                var view = _this.navController.getViews().find(function (view) { return view.id === CAT_A_MOD2.WAITING_ROOM_TO_CAR_PAGE; });
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
    WaitingRoomToCarCatAMod2Page.prototype.updateForm = function (ctrl, value) {
        var _a;
        this.form.patchValue((_a = {},
            _a[ctrl] = value,
            _a));
    };
    WaitingRoomToCarCatAMod2Page.prototype.isCtrlDirtyAndInvalid = function (controlName) {
        return !this.form.value[controlName] && this.form.get(controlName).dirty;
    };
    WaitingRoomToCarCatAMod2Page.prototype.setEyesightFailureVisibility = function (show) {
        this.showEyesightFailureConfirmation = show;
    };
    WaitingRoomToCarCatAMod2Page.prototype.eyesightTestResultChanged = function (passed) {
        var action = passed ? new EyesightTestPassed() : new EyesightTestFailed();
        this.store$.dispatch(action);
    };
    WaitingRoomToCarCatAMod2Page.prototype.getDebriefPage = function () {
        return CAT_A_MOD2.DEBRIEF_PAGE;
    };
    WaitingRoomToCarCatAMod2Page.prototype.categoryCodeChanged = function (category) {
        this.store$.dispatch(new PopulateTestCategory(category));
    };
    __decorate([
        ViewChild(VehicleChecksCatAMod2Component),
        __metadata("design:type", VehicleChecksCatAMod2Component)
    ], WaitingRoomToCarCatAMod2Page.prototype, "vehicleChecks", void 0);
    WaitingRoomToCarCatAMod2Page = __decorate([
        IonicPage(),
        Component({
            selector: '.waiting-room-to-car-cat-a-mod2-page',
            templateUrl: 'waiting-room-to-car.cat-a-mod2.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            FaultCountProvider])
    ], WaitingRoomToCarCatAMod2Page);
    return WaitingRoomToCarCatAMod2Page;
}(BasePageComponent));
export { WaitingRoomToCarCatAMod2Page };
//# sourceMappingURL=waiting-room-to-car.cat-a-mod2.page.js.map