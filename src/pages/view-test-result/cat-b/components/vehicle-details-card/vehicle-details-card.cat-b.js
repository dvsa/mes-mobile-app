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
import { flattenArray } from '../../../view-test-result-helpers';
var VehicleDetailsCardCatBComponent = /** @class */ (function () {
    function VehicleDetailsCardCatBComponent() {
        this.getFlattenArray = function (data) { return flattenArray(data); };
    }
    VehicleDetailsCardCatBComponent.prototype.shouldHideCard = function () {
        return (!this.data.instructorRegistrationNumber &&
            !this.data.registrationNumber &&
            !this.data.transmission);
    };
    VehicleDetailsCardCatBComponent.prototype.calculateClass = function (field) {
        return field ? 'mes-data-row-with-separator' : 'mes-data-row';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleDetailsCardCatBComponent.prototype, "data", void 0);
    VehicleDetailsCardCatBComponent = __decorate([
        Component({
            selector: 'vehicle-details-cat-b-card',
            templateUrl: 'vehicle-details-card.cat-b.html',
        }),
        __metadata("design:paramtypes", [])
    ], VehicleDetailsCardCatBComponent);
    return VehicleDetailsCardCatBComponent;
}());
export { VehicleDetailsCardCatBComponent };
//# sourceMappingURL=vehicle-details-card.cat-b.js.map