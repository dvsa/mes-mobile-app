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
import { DateTime } from '../../../../shared/helpers/date-time';
var RekeyDetailsCardComponent = /** @class */ (function () {
    function RekeyDetailsCardComponent() {
    }
    RekeyDetailsCardComponent.prototype.getScheduledStaffNumber = function () {
        return get(this.data, 'examinerBooked'.toString());
    };
    RekeyDetailsCardComponent.prototype.getConductedStaffNumber = function () {
        return get(this.data, 'examinerConducted'.toString());
    };
    RekeyDetailsCardComponent.prototype.getTestDate = function () {
        var testDate = new DateTime(get(this.data, 'journalData.testSlotAttributes.start'));
        return testDate.format('dddd Do MMMM YYYY');
    };
    RekeyDetailsCardComponent.prototype.getRekeyedStaffNumber = function () {
        return get(this.data, 'examinerKeyed'.toString());
    };
    RekeyDetailsCardComponent.prototype.getRekeyDate = function () {
        var rekeyDate = new DateTime(get(this.data, 'rekeyDate'));
        return rekeyDate.format('dddd Do MMMM YYYY');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RekeyDetailsCardComponent.prototype, "data", void 0);
    RekeyDetailsCardComponent = __decorate([
        Component({
            selector: 'rekey-details-card',
            templateUrl: 'rekey-details-card.html',
        })
    ], RekeyDetailsCardComponent);
    return RekeyDetailsCardComponent;
}());
export { RekeyDetailsCardComponent };
//# sourceMappingURL=rekey-details.js.map