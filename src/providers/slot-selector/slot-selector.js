var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { TestSlotComponent } from '../../components/test-slot/test-slot/test-slot';
import { ActivitySlotComponent } from '../../pages/journal/components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../../pages/journal/components/empty-slot/empty-slot';
import { has, isEmpty, forOwn, isNil, isObject } from 'lodash';
import { PersonalCommitmentSlotComponent } from '../../pages/journal/personal-commitment/personal-commitment';
var SlotSelectorProvider = /** @class */ (function () {
    function SlotSelectorProvider() {
        var _this = this;
        this.ignoreBookingProperty = [
            'entitlementCheck',
            'extendedTest',
            'progressiveAccess',
            'specialNeeds',
            'vehicleSeats',
            'welshTest',
        ];
        this.getSlotTypes = function (slotItems) {
            if (!Array.isArray(slotItems)) {
                return [];
            }
            for (var _i = 0, slotItems_1 = slotItems; _i < slotItems_1.length; _i++) {
                var slotItem = slotItems_1[_i];
                slotItem.component = _this.resolveComponentName(slotItem);
            }
            return slotItems;
        };
        this.isBookingEmptyOrNull = function (slot) {
            var slotData = slot.slotData;
            if (!has(slotData, 'booking')) {
                return true;
            }
            var gotValue = false;
            if (isEmpty(slotData.booking)) {
                return true;
            }
            gotValue = _this.checkPropertiesHaveValues(slotData.booking);
            return !gotValue;
        };
        this.checkPropertiesHaveValues = function (obj) {
            var gotValue = false;
            forOwn(obj, function (value, key) {
                if (_this.ignoreBookingProperty.indexOf(key) < 0) {
                    if (isObject(value)) {
                        if (_this.checkPropertiesHaveValues(value)) {
                            gotValue = true;
                        }
                    }
                    else if (!isNil(value)) {
                        gotValue = true;
                    }
                }
            });
            return gotValue;
        };
        this.isTestSlot = function (slot) { return has(slot, 'vehicleTypeCode'); };
        this.resolveComponentName = function (slot) {
            var slotData = slot.slotData, personalCommitment = slot.personalCommitment;
            if (!isEmpty(personalCommitment)) {
                return PersonalCommitmentSlotComponent;
            }
            if (has(slotData, 'activityCode')) {
                return ActivitySlotComponent;
            }
            if (_this.isBookingEmptyOrNull(slot)) {
                return EmptySlotComponent;
            }
            return TestSlotComponent;
        };
    }
    SlotSelectorProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], SlotSelectorProvider);
    return SlotSelectorProvider;
}());
export { SlotSelectorProvider };
//# sourceMappingURL=slot-selector.js.map