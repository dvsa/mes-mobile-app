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
import { isNil } from 'lodash';
import { SlotItem } from '../../../providers/slot-selector/slot-item';
var PersonalCommitmentSlotComponent = /** @class */ (function () {
    function PersonalCommitmentSlotComponent() {
    }
    PersonalCommitmentSlotComponent.prototype.formatActivityCode = function (activityCode) {
        if (isNil(activityCode)) {
            return '0';
        }
        // Remove leading zeros (e.g. 089 -> 89)
        return activityCode.toString().replace(/^0+(?!$)/, '');
    };
    PersonalCommitmentSlotComponent.prototype.transformSlotTime = function (time, index) {
        return index === 0 ? time : null;
    };
    __decorate([
        Input(),
        __metadata("design:type", SlotItem)
    ], PersonalCommitmentSlotComponent.prototype, "slot", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PersonalCommitmentSlotComponent.prototype, "hasSlotChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PersonalCommitmentSlotComponent.prototype, "showLocation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PersonalCommitmentSlotComponent.prototype, "personalCommitments", void 0);
    PersonalCommitmentSlotComponent = __decorate([
        Component({
            selector: 'personal-commitment',
            templateUrl: 'personal-commitment.html',
        })
    ], PersonalCommitmentSlotComponent);
    return PersonalCommitmentSlotComponent;
}());
export { PersonalCommitmentSlotComponent };
//# sourceMappingURL=personal-commitment.js.map