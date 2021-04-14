var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
var VehicleDetailsCardComponent = /** @class */ (function () {
    function VehicleDetailsCardComponent() {
        this.hideSchoolVehicleAndDualControlRow = false;
        this.hideSchoolBikeRow = true;
        this.schoolVehicleDetailsChange = new EventEmitter();
        this.dualVehicleDetailsChange = new EventEmitter();
        this.schoolBikeVehicleDetailsChange = new EventEmitter();
    }
    VehicleDetailsCardComponent.prototype.schoolVehicleDetailsChanged = function () {
        this.schoolVehicleDetailsChange.emit();
    };
    VehicleDetailsCardComponent.prototype.dualVehicleDetailsChanged = function () {
        this.dualVehicleDetailsChange.emit();
    };
    VehicleDetailsCardComponent.prototype.schoolBikeVehicleDetailsChanged = function () {
        this.schoolBikeVehicleDetailsChange.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleDetailsCardComponent.prototype, "schoolVehicleDetails", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleDetailsCardComponent.prototype, "dualVehicleDetails", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleDetailsCardComponent.prototype, "schoolBikeVehicleDetails", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleDetailsCardComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleDetailsCardComponent.prototype, "hideSchoolVehicleAndDualControlRow", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleDetailsCardComponent.prototype, "hideSchoolBikeRow", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleDetailsCardComponent.prototype, "schoolVehicleDetailsChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleDetailsCardComponent.prototype, "dualVehicleDetailsChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleDetailsCardComponent.prototype, "schoolBikeVehicleDetailsChange", void 0);
    VehicleDetailsCardComponent = __decorate([
        Component({
            selector: 'vehicle-details-card',
            templateUrl: 'vehicle-details-card.html',
        })
    ], VehicleDetailsCardComponent);
    return VehicleDetailsCardComponent;
}());
export { VehicleDetailsCardComponent };
//# sourceMappingURL=vehicle-details-card.js.map