var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { get, isNil } from 'lodash';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { vehicleDetails } from './test-slot.constants';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestStatus, getActivityCodeBySlotId, getTestById } from '../../../modules/tests/tests.selector';
import { SlotTypes } from '../../../shared/models/slot-types';
import { map, filter } from 'rxjs/operators';
import { getSlotType } from '../../../shared/helpers/get-slot-type';
import { SlotProvider } from '../../../providers/slot/slot';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import * as moment from 'moment';
var TestSlotComponent = /** @class */ (function () {
    function TestSlotComponent(screenOrientation, appConfig, dateTimeProvider, store$, slotProvider) {
        this.screenOrientation = screenOrientation;
        this.appConfig = appConfig;
        this.dateTimeProvider = dateTimeProvider;
        this.store$ = store$;
        this.slotProvider = slotProvider;
        this.delegatedTest = false;
        this.derivedTestStatus = null;
        this.derivedActivityCode = null;
    }
    TestSlotComponent.prototype.ngOnInit = function () {
        var _this = this;
        var slotId = this.slot.slotDetail.slotId;
        this.componentState = {
            testStatus$: this.store$.pipe(select(getTests), select(function (tests) { return _this.derivedTestStatus || getTestStatus(tests, slotId); })),
            testActivityCode$: this.store$.pipe(select(getTests), map(function (tests) { return _this.derivedActivityCode || getActivityCodeBySlotId(tests, _this.slot.slotDetail.slotId); })),
            isRekey$: this.store$.pipe(select(getTests), map(function (tests) { return getTestById(tests, _this.slot.slotDetail.slotId.toString()); }), filter(function (test) { return test !== undefined; }), select(getRekeyIndicator), select(isRekey)),
        };
    };
    TestSlotComponent.prototype.isIndicatorNeededForSlot = function () {
        var specialNeeds = this.isSpecialNeedsSlot();
        var checkNeeded = this.slot.booking.application.entitlementCheck || false;
        var nonStandardTest = getSlotType(this.slot) !== SlotTypes.STANDARD_TEST;
        return specialNeeds || checkNeeded || nonStandardTest;
    };
    TestSlotComponent.prototype.isSpecialNeedsSlot = function () {
        var specialNeeds = get(this.slot, 'booking.application.specialNeeds', '');
        return !isNil(specialNeeds) && specialNeeds.length > 0;
    };
    TestSlotComponent.prototype.isPortrait = function () {
        return this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
            this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT;
    };
    TestSlotComponent.prototype.showVehicleDetails = function () {
        return vehicleDetails[this.slot.booking.application.testCategory];
    };
    TestSlotComponent.prototype.showAdditionalCandidateDetails = function () {
        return this.slot.booking.application.testCategory === "ADI2" /* ADI2 */;
    };
    TestSlotComponent.prototype.canStartTest = function () {
        return this.slotProvider.canStartTest(this.slot);
    };
    TestSlotComponent.prototype.canViewCandidateDetails = function () {
        var testPermissionPeriods = this.appConfig.getAppConfig().journal.testPermissionPeriods;
        var currentDateTime = new Date();
        var isWhitelistedForADI = testPermissionPeriods.some(function (period) {
            return (period.testCategory === "ADI2" /* ADI2 */ || period.testCategory === "ADI3" /* ADI3 */)
                && new Date(period.from) <= currentDateTime
                && (new Date(period.to) >= currentDateTime || period.to === null);
        });
        var slotStart = moment(this.slot.slotDetail.start).startOf('day');
        var maxViewStart = moment(this.getLatestViewableSlotDateTime()).startOf('day');
        return slotStart.isSameOrBefore(maxViewStart) || isWhitelistedForADI;
    };
    TestSlotComponent.prototype.getLatestViewableSlotDateTime = function () {
        var today = moment();
        // add 3 days if current day is friday, 2 if saturday, else add 1
        var daysToAdd = today.isoWeekday() === 5 ? 3 : today.isoWeekday() === 6 ? 2 : 1;
        return moment().add(daysToAdd, 'days').startOf('day').toDate();
    };
    TestSlotComponent.prototype.getExaminerId = function () {
        var returnValue = null;
        if (this.delegatedTest) {
            var slot = this.slot;
            returnValue = slot.examinerId;
        }
        return returnValue;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TestSlotComponent.prototype, "slot", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TestSlotComponent.prototype, "hasSlotChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TestSlotComponent.prototype, "hasSeenCandidateDetails", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TestSlotComponent.prototype, "showLocation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TestSlotComponent.prototype, "delegatedTest", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TestSlotComponent.prototype, "derivedTestStatus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TestSlotComponent.prototype, "derivedActivityCode", void 0);
    TestSlotComponent = __decorate([
        Component({
            selector: 'test-slot',
            templateUrl: 'test-slot.html',
        }),
        __metadata("design:paramtypes", [ScreenOrientation,
            AppConfigProvider,
            DateTimeProvider,
            Store,
            SlotProvider])
    ], TestSlotComponent);
    return TestSlotComponent;
}());
export { TestSlotComponent };
//# sourceMappingURL=test-slot.js.map