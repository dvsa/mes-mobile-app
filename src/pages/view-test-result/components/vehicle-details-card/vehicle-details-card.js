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
var VehicleDetailsCardComponent = /** @class */ (function () {
    function VehicleDetailsCardComponent() {
    }
    VehicleDetailsCardComponent.prototype.shouldHideCard = function () {
        return (!this.getTransmission() &&
            !this.getRegistrationNumber());
    };
    VehicleDetailsCardComponent.prototype.shouldHideDimensions = function () {
        switch (this.category) {
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
            case "K" /* K */:
                return true;
            default:
                return false;
        }
    };
    VehicleDetailsCardComponent.prototype.getTransmission = function () {
        return get(this.data, 'gearboxCategory');
    };
    VehicleDetailsCardComponent.prototype.getRegistrationNumber = function () {
        return get(this.data, 'registrationNumber');
    };
    VehicleDetailsCardComponent.prototype.getVehicleLength = function () {
        return get(this.data, 'vehicleLength'.toString(), '?');
    };
    VehicleDetailsCardComponent.prototype.getVehicleWidth = function () {
        return get(this.data, 'vehicleWidth'.toString(), '?');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleDetailsCardComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleDetailsCardComponent.prototype, "category", void 0);
    VehicleDetailsCardComponent = __decorate([
        Component({
            selector: 'vehicle-details-card',
            templateUrl: 'vehicle-details-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], VehicleDetailsCardComponent);
    return VehicleDetailsCardComponent;
}());
export { VehicleDetailsCardComponent };
//# sourceMappingURL=vehicle-details-card.js.map