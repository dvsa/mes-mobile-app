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
import { FormGroup, FormControl } from '@angular/forms';
var VehicleDetailsComponent = /** @class */ (function () {
    function VehicleDetailsComponent() {
        this.vehicleDetailsChange = new EventEmitter();
    }
    VehicleDetailsComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl(this.formControlName, this.formControl);
        }
        this.formControl.patchValue(this.vehicleDetails);
    };
    VehicleDetailsComponent.prototype.vehicleDetailsChanged = function () {
        if (this.formControl.valid) {
            this.vehicleDetailsChange.emit();
        }
    };
    Object.defineProperty(VehicleDetailsComponent.prototype, "formControlName", {
        get: function () {
            var vehicleDetails = this.vehicleDetailsType.replace(' ', '-').toLowerCase();
            return "vehicle-details-" + vehicleDetails;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleDetailsComponent.prototype, "vehicleDetails", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleDetailsComponent.prototype, "vehicleDetailsType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleDetailsComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleDetailsComponent.prototype, "vehicleDetailsChange", void 0);
    VehicleDetailsComponent = __decorate([
        Component({
            selector: 'vehicle-details',
            templateUrl: 'vehicle-details.html',
        })
    ], VehicleDetailsComponent);
    return VehicleDetailsComponent;
}());
export { VehicleDetailsComponent };
//# sourceMappingURL=vehicle-details.js.map