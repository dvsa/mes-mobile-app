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
import { get } from 'lodash';
var RekeyReasonCardComponent = /** @class */ (function () {
    function RekeyReasonCardComponent() {
    }
    RekeyReasonCardComponent.prototype.getIPadIssue = function () {
        var isIpadIssueSelected = get(this.data, 'ipadIssue.selected', false);
        return isIpadIssueSelected ? this.getIpadIssueDisplayText(get(this.data, 'ipadIssue')) : 'None';
    };
    RekeyReasonCardComponent.prototype.getTransfer = function () {
        var isTransferSelected = get(this.data, 'transfer.selected', false);
        return isTransferSelected ? 'Yes' : 'No';
    };
    RekeyReasonCardComponent.prototype.getOther = function () {
        var isOtherSelected = get(this.data, 'other.selected', false);
        return isOtherSelected ? get(this.data, 'other.reason') : 'N/A';
    };
    RekeyReasonCardComponent.prototype.getIpadIssueDisplayText = function (reasonType) {
        var value = '';
        if (reasonType.broken) {
            value = 'Broken';
        }
        if (reasonType.lost) {
            value = 'Lost';
        }
        if (reasonType.technicalFault) {
            value = 'Technical fault';
        }
        if (reasonType.stolen) {
            value = 'Stolen';
        }
        return value;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RekeyReasonCardComponent.prototype, "data", void 0);
    RekeyReasonCardComponent = __decorate([
        Component({
            selector: 'rekey-reason-card',
            templateUrl: 'rekey-reason-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], RekeyReasonCardComponent);
    return RekeyReasonCardComponent;
}());
export { RekeyReasonCardComponent };
//# sourceMappingURL=rekey-reason.js.map