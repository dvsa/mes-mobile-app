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
import { isNil, has } from 'lodash';
import { activities } from '../../../../providers/slot-selector/activity.constants';
import { removeLeadingZeros } from '../../../../shared/helpers/formatters';
var ActivitySlotComponent = /** @class */ (function () {
    function ActivitySlotComponent() {
    }
    ActivitySlotComponent.prototype.formatActivityCode = function () {
        var activityCode = this.slot.activityCode;
        if (isNil(activityCode)) {
            return '0';
        }
        return removeLeadingZeros(activityCode);
    };
    ActivitySlotComponent.prototype.getTitle = function () {
        var returnTitle = 'Unknown';
        var activityCode = this.slot.activityCode;
        var matchingActivity = activities.find(function (a) { return a.activityCode === activityCode; });
        if (matchingActivity) {
            return matchingActivity.displayName || matchingActivity.description;
        }
        if (has(this.slot, 'activityDescription') && this.slot.activityDescription !== '') {
            returnTitle = this.slot.activityDescription;
        }
        return returnTitle;
    };
    ActivitySlotComponent.prototype.isTravelSlot = function () {
        return this.slot.activityCode === '091';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ActivitySlotComponent.prototype, "slot", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ActivitySlotComponent.prototype, "hasSlotChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ActivitySlotComponent.prototype, "showLocation", void 0);
    ActivitySlotComponent = __decorate([
        Component({
            selector: 'activity-slot',
            templateUrl: 'activity-slot.html',
        }),
        __metadata("design:paramtypes", [])
    ], ActivitySlotComponent);
    return ActivitySlotComponent;
}());
export { ActivitySlotComponent };
//# sourceMappingURL=activity-slot.js.map