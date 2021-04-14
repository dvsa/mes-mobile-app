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
var VehicleDetailsComponent = /** @class */ (function () {
    function VehicleDetailsComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], VehicleDetailsComponent.prototype, "length", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], VehicleDetailsComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], VehicleDetailsComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], VehicleDetailsComponent.prototype, "seats", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleDetailsComponent.prototype, "transmission", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleDetailsComponent.prototype, "showNumberOfSeats", void 0);
    VehicleDetailsComponent = __decorate([
        Component({
            selector: 'vehicle-details',
            templateUrl: 'vehicle-details.html',
        }),
        __metadata("design:paramtypes", [])
    ], VehicleDetailsComponent);
    return VehicleDetailsComponent;
}());
export { VehicleDetailsComponent };
//# sourceMappingURL=vehicle-details.js.map