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
import * as CatAMod1Types from '@dvsa/mes-test-schema/categories/AM1';
var VehicleDetailsCardCatAComponent = /** @class */ (function () {
    function VehicleDetailsCardCatAComponent() {
    }
    VehicleDetailsCardCatAComponent.prototype.shouldHideCard = function () {
        return (!this.getTransmission() &&
            !this.getRegistrationNumber() &&
            !this.getSchoolBike());
    };
    VehicleDetailsCardCatAComponent.prototype.getTransmission = function () {
        return get(this.data, 'gearboxCategory');
    };
    VehicleDetailsCardCatAComponent.prototype.getRegistrationNumber = function () {
        return get(this.data, 'registrationNumber');
    };
    VehicleDetailsCardCatAComponent.prototype.getSchoolBike = function () {
        return get(this.data, 'schoolBike');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleDetailsCardCatAComponent.prototype, "data", void 0);
    VehicleDetailsCardCatAComponent = __decorate([
        Component({
            selector: 'vehicle-details-card-cat-a',
            templateUrl: 'vehicle-details-card-cat-a.html',
        }),
        __metadata("design:paramtypes", [])
    ], VehicleDetailsCardCatAComponent);
    return VehicleDetailsCardCatAComponent;
}());
export { VehicleDetailsCardCatAComponent };
//# sourceMappingURL=vehicle-details-card-cat-a.js.map