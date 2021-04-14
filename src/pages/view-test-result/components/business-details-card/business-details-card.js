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
var BusinessDetailsCardComponent = /** @class */ (function () {
    function BusinessDetailsCardComponent() {
    }
    BusinessDetailsCardComponent.prototype.shouldHideCard = function () {
        return (!get(this.data, 'businessName') &&
            !get(this.data, 'businessTelephone') &&
            !get(this.data, 'businessAddress'));
    };
    BusinessDetailsCardComponent.prototype.getBusinessName = function () {
        return get(this.data, 'businessName', 'Not supplied');
    };
    BusinessDetailsCardComponent.prototype.getPhoneNumber = function () {
        return get(this.data, 'businessTelephone', 'Not supplied');
    };
    BusinessDetailsCardComponent.prototype.getAddress = function () {
        return get(this.data, 'businessAddress');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BusinessDetailsCardComponent.prototype, "data", void 0);
    BusinessDetailsCardComponent = __decorate([
        Component({
            selector: 'business-details-card',
            templateUrl: 'business-details-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], BusinessDetailsCardComponent);
    return BusinessDetailsCardComponent;
}());
export { BusinessDetailsCardComponent };
//# sourceMappingURL=business-details-card.js.map