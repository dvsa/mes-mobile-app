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
import { SchoolCarToggled, DualControlsToggled, GearboxCategoryChanged, VehicleRegistrationChanged, } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { map } from 'rxjs/operators';
import { InstructorAccompanimentToggled, OtherAccompanimentToggled, SupervisorAccompanimentToggled, InterpreterAccompanimentToggled, } from '../../../modules/tests/accompaniment/accompaniment.actions';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import { getRegistrationNumber, getGearboxCategory, } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getInstructorAccompaniment, getSupervisorAccompaniment, getOtherAccompaniment, getInterpreterAccompaniment, } from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../providers/question/question';
import { EyesightTestReset, EyesightTestPassed, EyesightTestFailed, } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_HOME_TEST } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getVehicleChecksCatHomeTest, } from '../../../modules/tests/test-data/cat-home-test/vehicle-checks/vehicle-checks.cat-home-test.selector';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { VehicleChecksCatHomeTestComponent } from './components/vehicle-checks/vehicle-checks';
import { TestDataByCategoryProvider } from '../../../providers/test-data-by-category/test-data-by-category';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { getCandidate } from '../../../modules/tests/journal-data/cat-home/candidate/candidate.cat-home.reducer';
import { hasEyesightTestBeenCompleted, hasEyesightTestGotSeriousFault, } from '../../../modules/tests/test-data/common/eyesight-test/eyesight-test.selector';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/common/vehicle-details.reducer';
import { getEyesightTest } from '../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.selector';
var WaitingRoomToCarCatHomeTestPage = /** @class */ (function (_super) {
    __extends(WaitingRoomToCarCatHomeTestPage, _super);
    function WaitingRoomToCarCatHomeTestPage(store$, navController, navParams, platform, authenticationProvider, faultCountProvider, questionProvider, testDataByCategoryProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.faultCountProvider = faultCountProvider;
        _this.questionProvider = questionProvider;
        _this.testDataByCategoryProvider = testDataByCategoryProvider;
        _this.showEyesightFailureConfirmation = false;
        _this.closeVehicleChecksModal = function () {
            _this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
        };
        _this.eyesightFailCancelled = function () {
            _this.form.get('eyesightCtrl') && _this.form.get('eyesightCtrl').reset();
            _this.store$.dispatch(new EyesightTestReset());
        };
        _this.shouldDisplayEyesightBanner = function () {
            return _this.testCategory === "K" /* K */;
        };
        _this.form = new FormGroup({});
        return _this;
    }
    WaitingRoomToCarCatHomeTestPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var category$ = currentTest$.pipe(select(getTestCategory), map(function (category) { return category; }));
        this.subscription = category$.subscribe(function (categoryCode) {
            // This is so that the UnitTests can set the categoryCode before the OnInit without being overridden.
            if (!_this.testCategory) {
                _this.testCategory = categoryCode;
            }
        });
        this.tellMeQuestions = this.questionProvider.getTellMeQuestions(this.testCategory);
        var testData$ = currentTest$.pipe(map(function (data) { return _this.testDataByCategoryProvider.getTestDataByCategoryCode(_this.testCategory)(data); }));
        var vehicleDetails$ = currentTest$.pipe(select(getVehicleDetails));
        var accompaniment$ = currentTest$.pipe(select(getAccompaniment));
        this.pageState = {
            candidateName$: currentTest$.pipe(select(getJournalData), select(getCandidate), select(getUntitledCandidateName)),
            registrationNumber$: vehicleDetails$.pipe(select(getRegistrationNumber)),
            transmission$: vehicleDetails$.pipe(select(getGearboxCategory)),
            instructorAccompaniment$: accompaniment$.pipe(select(getInstructorAccompaniment)),
            supervisorAccompaniment$: accompaniment$.pipe(select(getSupervisorAccompaniment)),
            otherAccompaniment$: accompaniment$.pipe(select(getOtherAccompaniment)),
            interpreterAccompaniment$: accompaniment$.pipe(select(getInterpreterAccompaniment)),
            eyesightTestComplete$: testData$.pipe(select(getEyesightTest), select(hasEyesightTestBeenCompleted)),
            eyesightTestFailed$: testData$.pipe(select(getEyesightTest), select(hasEyesightTestGotSeriousFault)),
            vehicleChecksScore$: testData$.pipe(select(getVehicleChecksCatHomeTest), map(function (vehicleChecks) {
                return _this.faultCountProvider
                    .getVehicleChecksFaultCount(_this.testCategory, vehicleChecks);
            })),
            vehicleChecks$: testData$.pipe(select(getVehicleChecksCatHomeTest)),
        };
    };
    WaitingRoomToCarCatHomeTestPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
    };
    WaitingRoomToCarCatHomeTestPage.prototype.ionViewWillLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.store$.dispatch(new PersistTests());
    };
    WaitingRoomToCarCatHomeTestPage.prototype.schoolCarToggled = function () {
        this.store$.dispatch(new SchoolCarToggled());
    };
    WaitingRoomToCarCatHomeTestPage.prototype.dualControlsToggled = function () {
        this.store$.dispatch(new DualControlsToggled());
    };
    WaitingRoomToCarCatHomeTestPage.prototype.transmissionChanged = function (transmission) {
        this.store$.dispatch(new GearboxCategoryChanged(transmission));
    };
    WaitingRoomToCarCatHomeTestPage.prototype.instructorAccompanimentToggled = function () {
        this.store$.dispatch(new InstructorAccompanimentToggled());
    };
    WaitingRoomToCarCatHomeTestPage.prototype.supervisorAccompanimentToggled = function () {
        this.store$.dispatch(new SupervisorAccompanimentToggled());
    };
    WaitingRoomToCarCatHomeTestPage.prototype.interpreterAccompanimentToggled = function () {
        this.store$.dispatch(new InterpreterAccompanimentToggled());
    };
    WaitingRoomToCarCatHomeTestPage.prototype.otherAccompanimentToggled = function () {
        this.store$.dispatch(new OtherAccompanimentToggled());
    };
    WaitingRoomToCarCatHomeTestPage.prototype.vehicleRegistrationChanged = function (vehicleRegistration) {
        this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
    };
    WaitingRoomToCarCatHomeTestPage.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.navController.push(CAT_HOME_TEST.TEST_REPORT_PAGE).then(function () {
                // remove Waiting Room To Car Page
                var view = _this.navController.getViews().find(function (view) { return view.id === CAT_HOME_TEST.WAITING_ROOM_TO_CAR_PAGE; });
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
    WaitingRoomToCarCatHomeTestPage.prototype.updateForm = function (ctrl, value) {
        var _a;
        this.form.patchValue((_a = {},
            _a[ctrl] = value,
            _a));
    };
    WaitingRoomToCarCatHomeTestPage.prototype.isCtrlDirtyAndInvalid = function (controlName) {
        return !this.form.value[controlName] && this.form.get(controlName).dirty;
    };
    WaitingRoomToCarCatHomeTestPage.prototype.setEyesightFailureVisibility = function (show) {
        this.showEyesightFailureConfirmation = show;
    };
    WaitingRoomToCarCatHomeTestPage.prototype.eyesightTestResultChanged = function (passed) {
        var action = passed ? new EyesightTestPassed() : new EyesightTestFailed();
        this.store$.dispatch(action);
    };
    WaitingRoomToCarCatHomeTestPage.prototype.getDebriefPage = function () {
        return CAT_HOME_TEST.DEBRIEF_PAGE;
    };
    __decorate([
        ViewChild(VehicleChecksCatHomeTestComponent),
        __metadata("design:type", VehicleChecksCatHomeTestComponent)
    ], WaitingRoomToCarCatHomeTestPage.prototype, "vehicleChecks", void 0);
    WaitingRoomToCarCatHomeTestPage = __decorate([
        IonicPage(),
        Component({
            selector: '.waiting-room-to-car-cat-home-test-page',
            templateUrl: 'waiting-room-to-car.cat-home-test.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            FaultCountProvider,
            QuestionProvider,
            TestDataByCategoryProvider])
    ], WaitingRoomToCarCatHomeTestPage);
    return WaitingRoomToCarCatHomeTestPage;
}(BasePageComponent));
export { WaitingRoomToCarCatHomeTestPage };
//# sourceMappingURL=waiting-room-to-car.cat-home-test.page.js.map