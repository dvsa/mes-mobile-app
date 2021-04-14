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
import { AppConfigProvider } from '../../../../providers/app-config/app-config';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { SlotTypes } from '../../../../shared/models/slot-types';
import { getSlotType } from '../../../../shared/helpers/get-slot-type';
var FakeTestSlotComponent = /** @class */ (function () {
    function FakeTestSlotComponent(screenOrientation, appConfig, dateTimeProvider) {
        this.screenOrientation = screenOrientation;
        this.appConfig = appConfig;
        this.dateTimeProvider = dateTimeProvider;
    }
    FakeTestSlotComponent.prototype.isIndicatorNeededForSlot = function () {
        var specialNeeds = this.isSpecialNeedsSlot();
        var checkNeeded = this.slot.booking.application.entitlementCheck || false;
        var nonStandardTest = getSlotType(this.slot) !== SlotTypes.STANDARD_TEST;
        return specialNeeds || checkNeeded || nonStandardTest;
    };
    FakeTestSlotComponent.prototype.isSpecialNeedsSlot = function () {
        var specialNeeds = get(this.slot, 'booking.application.specialNeeds', '');
        return !isNil(specialNeeds) && specialNeeds.length > 0;
    };
    FakeTestSlotComponent.prototype.isPortrait = function () {
        return this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
            this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FakeTestSlotComponent.prototype, "slot", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FakeTestSlotComponent.prototype, "testStatus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FakeTestSlotComponent.prototype, "hasSlotChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FakeTestSlotComponent.prototype, "showLocation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FakeTestSlotComponent.prototype, "canStartTest", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FakeTestSlotComponent.prototype, "activityCode", void 0);
    FakeTestSlotComponent = __decorate([
        Component({
            selector: 'fake-test-slot',
            templateUrl: 'fake-test-slot.html',
        }),
        __metadata("design:paramtypes", [ScreenOrientation,
            AppConfigProvider,
            DateTimeProvider])
    ], FakeTestSlotComponent);
    return FakeTestSlotComponent;
}());
export { FakeTestSlotComponent };
//# sourceMappingURL=fake-test-slot.js.map