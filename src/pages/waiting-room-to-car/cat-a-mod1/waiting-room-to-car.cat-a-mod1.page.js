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
import { GearboxCategoryChanged, VehicleRegistrationChanged, SchoolBikeToggled, } from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { map } from 'rxjs/operators';
import { InstructorAccompanimentToggled, OtherAccompanimentToggled, SupervisorAccompanimentToggled, InterpreterAccompanimentToggled, } from '../../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-a-mod1/vehicle-details.cat-a-mod1.reducer';
import { getAccompaniment } from '../../../modules/tests/accompaniment/accompaniment.reducer';
import { getRegistrationNumber, getGearboxCategory, isAutomatic, isManual, } from '../../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getSchoolBike, } from '../../../modules/tests/vehicle-details/cat-a-mod1/vehicle-details.cat-a-mod1.selector';
import { getInstructorAccompaniment, getSupervisorAccompaniment, getOtherAccompaniment, getInterpreterAccompaniment, } from '../../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../providers/question/question';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { CAT_A_MOD1 } from '../../page-names.constants';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';
import { BikeCategoryTypeComponent } from '../../../components/common/bike-category-type/bike-category-type';
var WaitingRoomToCarCatAMod1Page = /** @class */ (function (_super) {
    __extends(WaitingRoomToCarCatAMod1Page, _super);
    function WaitingRoomToCarCatAMod1Page(store$, navController, navParams, platform, authenticationProvider, faultCountProvider, questionProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.faultCountProvider = faultCountProvider;
        _this.questionProvider = questionProvider;
        _this.form = new FormGroup({});
        return _this;
    }
    WaitingRoomToCarCatAMod1Page.prototype.ngOnInit = function () {
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
            gearboxAutomaticRadioChecked$: currentTest$.pipe(select(getVehicleDetails), map(isAutomatic)),
            gearboxManualRadioChecked$: currentTest$.pipe(select(getVehicleDetails), map(isManual)),
            testCategory$: currentTest$.pipe(select(getTestCategory)),
        };
        var testCategory$ = this.pageState.testCategory$;
        this.merged$ = merge(testCategory$.pipe(map(function (value) { return _this.category = value; })));
        this.subscription = this.merged$.subscribe();
    };
    WaitingRoomToCarCatAMod1Page.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
    };
    WaitingRoomToCarCatAMod1Page.prototype.ionViewWillLeave = function () {
        this.store$.dispatch(new PersistTests());
    };
    WaitingRoomToCarCatAMod1Page.prototype.ionViewDidLeave = function () {
        if (this.subscription !== null) {
            this.subscription.unsubscribe();
        }
    };
    WaitingRoomToCarCatAMod1Page.prototype.schoolBikeToggled = function () {
        this.store$.dispatch(new SchoolBikeToggled());
    };
    WaitingRoomToCarCatAMod1Page.prototype.transmissionChanged = function (transmission) {
        this.store$.dispatch(new GearboxCategoryChanged(transmission));
    };
    WaitingRoomToCarCatAMod1Page.prototype.instructorAccompanimentToggled = function () {
        this.store$.dispatch(new InstructorAccompanimentToggled());
    };
    WaitingRoomToCarCatAMod1Page.prototype.supervisorAccompanimentToggled = function () {
        this.store$.dispatch(new SupervisorAccompanimentToggled());
    };
    WaitingRoomToCarCatAMod1Page.prototype.interpreterAccompanimentToggled = function () {
        this.store$.dispatch(new InterpreterAccompanimentToggled());
    };
    WaitingRoomToCarCatAMod1Page.prototype.otherAccompanimentToggled = function () {
        this.store$.dispatch(new OtherAccompanimentToggled());
    };
    WaitingRoomToCarCatAMod1Page.prototype.vehicleRegistrationChanged = function (vehicleRegistration) {
        this.store$.dispatch(new VehicleRegistrationChanged(vehicleRegistration));
    };
    WaitingRoomToCarCatAMod1Page.prototype.onSubmit = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (controlName) { return _this.form.controls[controlName].markAsDirty(); });
        if (this.form.valid) {
            this.navController.push(CAT_A_MOD1.TEST_REPORT_PAGE).then(function () {
                // remove Waiting Room To Car Page
                var view = _this.navController.getViews().find(function (view) { return view.id === CAT_A_MOD1.WAITING_ROOM_TO_CAR_PAGE; });
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
    WaitingRoomToCarCatAMod1Page.prototype.updateForm = function (ctrl, value) {
        var _a;
        this.form.patchValue((_a = {},
            _a[ctrl] = value,
            _a));
    };
    WaitingRoomToCarCatAMod1Page.prototype.isCtrlDirtyAndInvalid = function (controlName) {
        return !this.form.value[controlName] && this.form.get(controlName).dirty;
    };
    WaitingRoomToCarCatAMod1Page.prototype.getDebriefPage = function () {
        return CAT_A_MOD1.DEBRIEF_PAGE;
    };
    WaitingRoomToCarCatAMod1Page.prototype.categoryCodeChanged = function (category) {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarBikeCategorySelected(category));
        if (this.category !== category) {
            this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarBikeCategoryChanged(category, this.category));
        }
        this.store$.dispatch(new PopulateTestCategory(category));
    };
    __decorate([
        ViewChild(BikeCategoryTypeComponent),
        __metadata("design:type", Object)
    ], WaitingRoomToCarCatAMod1Page.prototype, "pageState", void 0);
    WaitingRoomToCarCatAMod1Page = __decorate([
        IonicPage(),
        Component({
            selector: '.waiting-room-to-car-cat-a-mod1-page',
            templateUrl: 'waiting-room-to-car.cat-a-mod1.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            FaultCountProvider,
            QuestionProvider])
    ], WaitingRoomToCarCatAMod1Page);
    return WaitingRoomToCarCatAMod1Page;
}(BasePageComponent));
export { WaitingRoomToCarCatAMod1Page };
//# sourceMappingURL=waiting-room-to-car.cat-a-mod1.page.js.map